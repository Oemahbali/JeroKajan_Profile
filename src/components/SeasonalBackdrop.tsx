import React, { useEffect, useRef } from "react";

export type Season = "hujan" | "kemarau";

export function getSeasonByMonth(m: number): Season {
  // Indonesia: hujan ~Nov-Mar (9,10,11,0,1,2,3 0-indexed Oct-Apr inclusive buffer), kemarau Apr-Okt
  if (m >= 9 || m <= 2) return "hujan";
  return "kemarau";
}

interface P { x: number; y: number; len: number; speed: number; op: number; drift: number; phase: number; size: number; rot: number; vr: number; ch: string; }

const LEAVES = ["\u{1F342}", "\u{1F343}", "\u{1F33E}"];

export default function SeasonalBackdrop({ force }: { force?: Season }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    let w = 0, h = 0, raf = 0;
    const season: Season = force ?? getSeasonByMonth(new Date().getMonth());
    const N = season === "hujan" ? 90 : 26;
    const parts: P[] = [];
    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    const rnd = (a: number, b: number) => a + Math.random() * (b - a);
    for (let i = 0; i < N; i++) {
      parts.push({
        x: rnd(0, window.innerWidth), y: rnd(0, window.innerHeight),
        len: rnd(10, 22), speed: season === "hujan" ? rnd(9, 16) : rnd(0.6, 1.6),
        op: season === "hujan" ? rnd(0.15, 0.45) : rnd(0.5, 0.95),
        drift: rnd(-1, 1), phase: rnd(0, Math.PI * 2),
        size: rnd(12, 22), rot: rnd(0, Math.PI * 2), vr: rnd(-0.02, 0.02),
        ch: LEAVES[i % LEAVES.length],
      });
    }
    let t = 0;
    const tick = () => {
      t += 0.016;
      ctx.clearRect(0, 0, w, h);
      if (season === "hujan") {
        ctx.lineWidth = 1.2;
        ctx.lineCap = "round";
        for (const p of parts) {
          p.y += p.speed; p.x += p.drift + -2;
          if (p.y > h + 24) { p.y = -24; p.x = rnd(0, w); }
          if (p.x < -24) p.x = w + 20;
          ctx.strokeStyle = `rgba(174,194,224,${p.op})`;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x + 3, p.y + p.len);
          ctx.stroke();
        }
      } else {
        ctx.textAlign = "center"; ctx.textBaseline = "middle";
        for (const p of parts) {
          p.y += p.speed; p.x += Math.sin(t * 1.5 + p.phase) * 0.8 + p.drift * 0.3; p.rot += p.vr;
          if (p.y > h + 30) { p.y = -30; p.x = rnd(0, w); }
          if (p.x < -30) p.x = w + 30; if (p.x > w + 30) p.x = -30;
          ctx.save();
          ctx.globalAlpha = p.op;
          ctx.translate(p.x, p.y); ctx.rotate(p.rot + Math.sin(t + p.phase) * 0.4);
          ctx.font = `${p.size}px serif`;
          ctx.fillText(p.ch, 0, 0);
          ctx.restore();
        }
        ctx.globalAlpha = 1;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, [force]);

  return <canvas ref={ref} className="season-canvas" aria-hidden="true" />;
}
