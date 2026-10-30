import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LinkItem {
  id: string;
  title: string;
  subtitle: string;
  url: string;
  iconClass: string;
  type: "instagram" | "menu" | "map" | "tiktok";
}

const links: LinkItem[] = [
  {
    id: "instagram",
    title: "Instagram",
    subtitle: "@jerokajanan",
    url: "https://www.instagram.com/jerokajanan/",
    iconClass: "fab fa-instagram",
    type: "instagram",
  },
  {
    id: "menu",
    title: "Menu Makanan & Minuman",
    subtitle: "Lihat daftar lengkap",
    url: "https://drive.google.com/file/d/1havxY8twoDxbfJiVEx-_aBONhCjtXTSX/view?usp=sharing",
    iconClass: "fas fa-utensils",
    type: "menu",
  },
  {
    id: "map",
    title: "Lokasi",
    subtitle: "Buka di Google Maps",
    url: "https://maps.app.goo.gl/PhsrNy9MDBtrQt4RA",
    iconClass: "fas fa-location-dot",
    type: "map",
  },
  {
    id: "tiktok",
    title: "TikTok",
    subtitle: "@jerokajanan",
    url: "https://www.tiktok.com/@jerokajanan",
    iconClass: "fa-brands fa-tiktok",
    type: "tiktok",
  },
];

// Specific opening animations for each icon type
const getIconOpeningAnimation = (type: LinkItem["type"], delay: number) => {
  switch (type) {
    case "map":
      // Map Pin Drop bounce animation on page load
      return {
        initial: { scale: 0, y: -28, opacity: 0, rotate: -15 },
        animate: {
          scale: [0, 1.25, 0.9, 1.1, 1],
          y: [-28, 0, -8, 0, -3, 0],
          opacity: 1,
          rotate: [-15, 8, -5, 2, 0],
        },
        transition: {
          delay: delay + 0.15,
          duration: 0.95,
          ease: "easeOut",
        },
      };
    case "tiktok":
      // TikTok rhythmic beat & shake animation on page load
      return {
        initial: { scale: 0, rotate: -25, opacity: 0 },
        animate: {
          scale: [0, 1.35, 0.85, 1.2, 0.95, 1],
          rotate: [-25, 15, -12, 8, -4, 0],
          opacity: 1,
        },
        transition: {
          delay: delay + 0.15,
          duration: 0.9,
          ease: "easeOut",
        },
      };
    case "instagram":
      // Instagram camera pop & spin animation on page load
      return {
        initial: { scale: 0, rotate: -50, opacity: 0 },
        animate: {
          scale: [0, 1.25, 0.9, 1.08, 1],
          rotate: [-50, 15, -8, 0],
          opacity: 1,
        },
        transition: {
          delay: delay + 0.1,
          duration: 0.85,
          ease: "easeOut",
        },
      };
    case "menu":
      // Menu utensils tilt & clink animation on page load
      return {
        initial: { scale: 0, rotate: 35, opacity: 0 },
        animate: {
          scale: [0, 1.25, 0.9, 1.05, 1],
          rotate: [35, -20, 10, -5, 0],
          opacity: 1,
        },
        transition: {
          delay: delay + 0.12,
          duration: 0.85,
          ease: "easeOut",
        },
      };
  }
};

// Micro-interaction hover animation for each icon
const getIconHoverAnimation = (type: LinkItem["type"]) => {
  switch (type) {
    case "map":
      return {
        y: [-2, -6, 0],
        scale: 1.15,
        transition: { duration: 0.35, repeat: Infinity, repeatType: "reverse" as const },
      };
    case "tiktok":
      return {
        rotate: [-8, 8, -6, 6, 0],
        scale: 1.15,
        transition: { duration: 0.35 },
      };
    case "instagram":
      return {
        rotate: 360,
        scale: 1.15,
        transition: { duration: 0.5, ease: "easeInOut" },
      };
    case "menu":
      return {
        rotate: [-15, 15, -8, 8, 0],
        scale: 1.15,
        transition: { duration: 0.4 },
      };
  }
};

export default function ProfileCard() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Close popup with Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsPopupOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="page">
      {/* Main Profile Card with Entrance Spring */}
      <motion.section
        className="card"
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Profile Picture with Pulse & Hover Spring */}
        <motion.button
          id="profilePicture"
          type="button"
          onClick={() => setIsPopupOpen(true)}
          aria-label="Lihat foto profil"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.1,
          }}
          whileHover={{ scale: 1.06, rotate: 2 }}
          whileTap={{ scale: 0.95 }}
        >
          <img src="/photo/logo.png" alt="Logo Jero Kajanan" />
        </motion.button>

        {/* Text Header */}
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22, duration: 0.45 }}
        >
          Kuliner rumahan
        </motion.p>

        <motion.h1
          id="userName"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Jero Kajanan
        </motion.h1>

        <motion.p
          className="tagline"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.38, duration: 0.5 }}
        >
          rasa yang bikin kangen pulang.
        </motion.p>

        {/* Navigation Links with Framer Motion Stagger */}
        <nav id="links" aria-label="Tautan Jero Kajanan">
          {links.map((link, index) => {
            const cardDelay = 0.35 + index * 0.12;
            const iconAnim = getIconOpeningAnimation(link.type, cardDelay);
            const iconHover = getIconHoverAnimation(link.type);

            return (
              <motion.a
                key={link.id}
                className="link group"
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.55,
                  delay: cardDelay,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{
                  y: -3,
                  scale: 1.015,
                  boxShadow: "0 12px 24px rgba(90, 40, 16, 0.14)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Icon Container with Opening and Hover Animations */}
                <span className={`link-icon ${link.type}`}>
                  {/* Subtle radar ripple specifically for Map to make it pop even more */}
                  {link.type === "map" && (
                    <motion.span
                      aria-hidden="true"
                      className="absolute inset-0 rounded-xl bg-emerald-500/20"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{
                        scale: [1, 1.45, 1.8],
                        opacity: [0.6, 0.3, 0],
                      }}
                      transition={{
                        delay: cardDelay + 0.6,
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 3,
                        ease: "easeOut",
                      }}
                    />
                  )}

                  {/* Subtle music beat ring specifically for TikTok */}
                  {link.type === "tiktok" && (
                    <motion.span
                      aria-hidden="true"
                      className="absolute inset-0 rounded-xl bg-cyan-500/20"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{
                        scale: [1, 1.35, 1.6],
                        opacity: [0.5, 0.25, 0],
                      }}
                      transition={{
                        delay: cardDelay + 0.7,
                        duration: 1.8,
                        repeat: Infinity,
                        repeatDelay: 3.5,
                        ease: "easeOut",
                      }}
                    />
                  )}

                  <motion.i
                    className={link.iconClass}
                    initial={iconAnim.initial}
                    animate={iconAnim.animate}
                    transition={iconAnim.transition}
                    whileHover={iconHover}
                  />
                </span>

                {/* Link Text */}
                <span className="link-text">
                  <strong>{link.title}</strong>
                  <small>{link.subtitle}</small>
                </span>

                {/* Arrow Icon with diagonal slide hover */}
                <motion.i
                  className="fas fa-arrow-up-right-from-square link-arrow"
                  whileHover={{ x: 3, y: -3 }}
                />
              </motion.a>
            );
          })}
        </nav>
      </motion.section>

      {/* Heart Hashtag with gentle heartbeat animation */}
      <motion.p
        id="hashtag"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
      >
        #MadeWith
        <motion.span
          animate={{ scale: [1, 1.28, 1, 1.2, 1] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatDelay: 1,
            ease: "easeInOut",
          }}
          style={{ display: "inline-block", color: "#e11d48" }}
        >
          ❤
        </motion.span>
      </motion.p>

      {/* Interactive Profile Popup Modal with Framer Motion AnimatePresence */}
      <AnimatePresence>
        {isPopupOpen && (
          <motion.div
            className="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setIsPopupOpen(false)}
          >
            <motion.div
              className="popup"
              initial={{ scale: 0.82, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="popup-photo">
                <a href="/photo/logo.png" target="_blank" rel="noopener noreferrer">
                  <motion.img
                    src="/photo/logo.png"
                    alt="Logo Jero Kajanan"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  />
                </a>
              </div>
              <p className="popup-quote">Selamat datang di Jero Kajanan 😋</p>
              <button
                className="popup-close"
                type="button"
                onClick={() => setIsPopupOpen(false)}
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

