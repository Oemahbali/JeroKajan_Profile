import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import SeasonalBackdrop from "./SeasonalBackdrop";

interface LinkItem {
  id: string;
  title: string;
  subtitle: string;
  url: string;
  type: "instagram" | "menu" | "map" | "tiktok";
}

const links: LinkItem[] = [
  {
    id: "instagram",
    title: "Instagram",
    subtitle: "@jerokajanan",
    url: "https://www.instagram.com/jerokajanan/",
    type: "instagram",
  },
  {
    id: "menu",
    title: "Menu Makanan & Minuman",
    subtitle: "Lihat daftar lengkap",
    url: "https://drive.google.com/file/d/1havxY8twoDxbfJiVEx-_aBONhCjtXTSX/view?usp=sharing",
    type: "menu",
  },
  {
    id: "map",
    title: "Lokasi",
    subtitle: "Buka di Google Maps",
    url: "https://maps.app.goo.gl/PhsrNy9MDBtrQt4RA",
    type: "map",
  },
  {
    id: "tiktok",
    title: "TikTok",
    subtitle: "@jerokajanan",
    url: "https://www.tiktok.com/@jerokajanan",
    type: "tiktok",
  },
];

// Inline glyphs replace the icon font, so the page ships no third party CSS.
function LinkGlyph({ type }: { type: LinkItem["type"] }) {
  switch (type) {
    case "instagram":
      return (
        <>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17" cy="7" r="0.9" fill="currentColor" stroke="none" />
        </>
      );
    case "menu":
      return (
        <>
          <path d="M3 2v6.5c0 1.4 1.1 2.5 2.5 2.5h3c1.4 0 2.5-1.1 2.5-2.5V2" />
          <path d="M7 2v20" />
          <ellipse cx="17.5" cy="7" rx="2.8" ry="4.6" />
          <path d="M17.5 11.6V22" />
        </>
      );
    case "map":
      return (
        <>
          <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 0 1 16 0Z" />
          <circle cx="12" cy="10" r="3" />
        </>
      );
    case "tiktok":
      return (
        <path
          fill="currentColor"
          stroke="none"
          d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"
        />
      );
  }
}

// Finite opening gesture per link type. Each one settles under a second.
const getIconOpeningAnimation = (type: LinkItem["type"], delay: number) => {
  switch (type) {
    case "map":
      return {
        initial: { scale: 0, y: -18, opacity: 0 },
        animate: { scale: [0, 1.12, 0.97, 1], y: [-18, 0, -4, 0], opacity: 1 },
        transition: { delay: delay + 0.1, duration: 0.7, ease: "easeOut" },
      };
    case "tiktok":
      return {
        initial: { scale: 0, rotate: -18, opacity: 0 },
        animate: { scale: [0, 1.15, 0.94, 1], rotate: [-18, 8, -4, 0], opacity: 1 },
        transition: { delay: delay + 0.1, duration: 0.65, ease: "easeOut" },
      };
    case "instagram":
      return {
        initial: { scale: 0, rotate: -35, opacity: 0 },
        animate: { scale: [0, 1.12, 0.96, 1], rotate: [-35, 10, -4, 0], opacity: 1 },
        transition: { delay: delay + 0.08, duration: 0.6, ease: "easeOut" },
      };
    case "menu":
      return {
        initial: { scale: 0, rotate: 25, opacity: 0 },
        animate: { scale: [0, 1.12, 0.96, 1], rotate: [25, -10, 4, 0], opacity: 1 },
        transition: { delay: delay + 0.1, duration: 0.6, ease: "easeOut" },
      };
  }
};

// Single short response on hover, no repeating loop.
const getIconHoverAnimation = (type: LinkItem["type"]) => {
  switch (type) {
    case "instagram":
      return { scale: 1.1, rotate: 8, transition: { duration: 0.25 } };
    case "tiktok":
      return { scale: 1.12, rotate: -6, transition: { duration: 0.25 } };
    case "menu":
      return { scale: 1.1, rotate: -6, transition: { duration: 0.25 } };
    case "map":
      return { scale: 1.12, y: -3, transition: { duration: 0.25 } };
  }
};

export default function ProfileCard() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const closePopup = useCallback(() => setIsPopupOpen(false), []);

  // Dialog behavior: initial focus, focus trap, Escape, scroll lock, focus return.
  useEffect(() => {
    if (!isPopupOpen) return;

    const opener = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closePopup();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      );
      if (focusable.length === 0) {
        event.preventDefault();
        panelRef.current.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || active === panelRef.current)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      opener?.focus();
    };
  }, [isPopupOpen, closePopup]);

  const fadeIn = (delay: number, distance = 12) =>
    reduceMotion
      ? { initial: false as const, animate: { opacity: 1, y: 0 } }
      : {
          initial: { opacity: 0, y: distance },
          animate: { opacity: 1, y: 0 },
          transition: { delay, duration: 0.4, ease: [0.16, 1, 0.3, 1] as const },
        };

  return (
    <div className="page">
      <SeasonalBackdrop />
      {/* Main Profile Card */}
      <motion.section
        className="card"
        aria-hidden={isPopupOpen || undefined}
        inert={isPopupOpen || undefined}
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={reduceMotion ? { duration: 0 } : { duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Profile Picture */}
        <motion.button
          id="profilePicture"
          type="button"
          onClick={() => setIsPopupOpen(true)}
          aria-label="Lihat logo Jero Kajanan"
          initial={reduceMotion ? false : { scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { type: "spring", stiffness: 260, damping: 20, delay: 0.1 }
          }
          whileHover={reduceMotion ? undefined : { scale: 1.04 }}
          whileTap={reduceMotion ? undefined : { scale: 0.97 }}
        >
          <picture>
            <source srcSet="/photo/logo-108w.webp 1x, /photo/logo-216w.webp 2x" type="image/webp" />
            <source srcSet="/photo/logo.avif 1x" type="image/avif" />
            <img
              src="/photo/logo-optimized.png"
              alt="Logo Jero Kajanan"
              width={108}
              height={108}
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
          </picture>
        </motion.button>

        {/* Text Header */}
        <motion.p className="eyebrow" {...fadeIn(0.18, 8)}>
          Kuliner rumahan
        </motion.p>

        <motion.h1 id="userName" {...fadeIn(0.24)}>
          Jero Kajanan
        </motion.h1>

        <motion.p className="tagline" {...fadeIn(0.3, 8)}>
          rasa yang bikin kangen pulang.
        </motion.p>

        {/* Navigation Links */}
        <nav id="links" aria-label="Tautan Jero Kajanan">
          {links.map((link, index) => {
            const cardDelay = 0.3 + index * 0.08;
            const iconAnim = getIconOpeningAnimation(link.type, cardDelay);
            const iconHover = getIconHoverAnimation(link.type);

            return (
              <motion.a
                key={link.id}
                className={`link group link--${link.type}`}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : { duration: 0.4, delay: cardDelay, ease: [0.22, 1, 0.36, 1] }
                }
                whileHover={reduceMotion ? undefined : { y: -2 }}
                whileTap={reduceMotion ? undefined : { scale: 0.99 }}
              >
                {/* Icon Container */}
                <span className={`link-icon ${link.type}`}>
                  <motion.svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    focusable="false"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.8}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={reduceMotion ? false : iconAnim.initial}
                    animate={reduceMotion ? undefined : iconAnim.animate}
                    transition={iconAnim.transition}
                    whileHover={reduceMotion ? undefined : iconHover}
                  >
                    <LinkGlyph type={link.type} />
                  </motion.svg>
                </span>

                {/* Link Text */}
                <span className="link-text">
                  <strong>{link.title}</strong>
                  <small>{link.subtitle}</small>
                </span>

                {/* External link marker */}
                <svg
                  className="link-arrow"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  focusable="false"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 3h6v6" />
                  <path d="M10 14 21 3" />
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                </svg>
              </motion.a>
            );
          })}
        </nav>
      </motion.section>

      {/* Credit line */}
      <motion.p id="hashtag" {...fadeIn(0.7)} aria-hidden={isPopupOpen || undefined} inert={isPopupOpen || undefined}>
        #MadeWith<span className="heart">❤</span>
      </motion.p>

      {/* Profile popup */}
      <AnimatePresence>
        {isPopupOpen && (
          <motion.div
            className="overlay"
            role="presentation"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
            onClick={closePopup}
          >
            <motion.div
              className="popup"
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="popup-title"
              tabIndex={-1}
              initial={reduceMotion ? false : { scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={reduceMotion ? { opacity: 1 } : { scale: 0.96, opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.22, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="popup-photo">
                <a href="/photo/logo-optimized.png" target="_blank" rel="noopener noreferrer">
                  <picture>
                    <source srcSet="/photo/logo-168w.webp 1x, /photo/logo-336w.webp 2x" type="image/webp" />
                    <source srcSet="/photo/logo.avif 1x" type="image/avif" />
                    <img
                      src="/photo/logo-optimized.png"
                      alt="Logo Jero Kajanan"
                      width={168}
                      height={168}
                    />
                  </picture>
                </a>
              </div>
              <p className="popup-quote" id="popup-title">
                Selamat datang di Jero Kajanan 😋
              </p>
              <button
                ref={closeButtonRef}
                className="popup-close"
                type="button"
                onClick={closePopup}
                aria-label="Tutup"
              >
                &times;
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
