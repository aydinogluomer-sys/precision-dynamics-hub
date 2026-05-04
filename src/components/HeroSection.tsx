/**
 * HeroSection.tsx — FAZ 05 Brutalist Hero
 * Editorial industrial layout: massive rotating display headline,
 * hairline metric column, brutalist CTAs, forge background image.
 * No more MAS-mask / 200vw slide / lava pour.
 */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";
import { ArrowUpRight } from "lucide-react";
import forgeBg from "@/assets/forge/01-billet-raw.jpg";

const headlines = [
  ["PRECISION", "FORGED"],
  ["TITANIUM", "ENGINEERED"],
  ["TOLERANCE", "±0.005MM"],
];

const metrics = [
  { k: "TOLERANCE", v: "±5 µm" },
  { k: "MATERIALS", v: "120+" },
  { k: "AXES", v: "3 / 4 / 5" },
  { k: "LEAD-TIME", v: "48 H" },
];

const EASE = [0.76, 0, 0.24, 1] as const;

interface HeroSectionProps {
  isFirstVisit?: boolean;
}

export const HeroSection = ({ isFirstVisit = false }: HeroSectionProps) => {
  const [idx, setIdx] = useState(0);
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;
    const t = setInterval(() => setIdx((p) => (p + 1) % headlines.length), 4200);
    return () => clearInterval(t);
  }, [prefersReduced]);

  const heroDelay = isFirstVisit ? 0.3 : 0;
  const current = headlines[idx];

  return (
    <section
      className="relative w-full min-h-screen overflow-hidden"
      style={{ backgroundColor: "#0a0a0a", color: "hsl(var(--brutalist-bone))" }}
    >
      {/* Background image — desaturated, dimmed */}
      <div className="absolute inset-0 z-0">
        <img
          src={forgeBg}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover"
          style={{ filter: "grayscale(0.55) brightness(0.45) contrast(1.15)" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.35) 45%, rgba(10,10,10,0.92) 100%)",
          }}
        />
      </div>

      {/* Top hairline meta bar */}
      <div
        className="absolute top-0 left-0 right-0 z-20 border-hairline-b"
        style={{ paddingTop: "max(env(safe-area-inset-top), 0px)" }}
      >
        <div className="container-industrial flex items-center justify-between py-4 font-mono text-[10px] tracking-[0.4em] uppercase">
          <span style={{ color: "hsl(var(--brutalist-bone) / 0.7)" }}>
            ◆ Index / 01 — Forge Sequence
          </span>
          <span className="hidden md:inline" style={{ color: "hsl(var(--brutalist-molten))" }}>
            ● LIVE · ESKİŞEHİR · TR
          </span>
        </div>
      </div>

      {/* Main grid */}
      <div className="relative z-10 container-industrial min-h-screen flex flex-col justify-end pb-24 pt-32">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: heroDelay, ease: EASE }}
          className="font-mono text-[11px] uppercase tracking-[0.5em] mb-6"
          style={{ color: "hsl(var(--brutalist-molten))" }}
        >
          [ 001 ] — CNC HASSAS İŞLEME · ISO 9001 · AS9100
        </motion.div>

        {/* Massive rotating headline */}
        <div
          className="relative mb-10 select-none"
          style={{ minHeight: "min(40vh, 28rem)" }}
        >
          <AnimatePresence mode="wait">
            <motion.h1
              key={idx}
              className="font-sans font-bold uppercase leading-[0.82] tracking-[-0.06em]"
              style={{ fontSize: "clamp(3.5rem, 14vw, 18rem)" }}
              initial={prefersReduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={prefersReduced ? undefined : { opacity: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              {current.map((word, wi) => (
                <span key={wi} className="block overflow-hidden">
                  <motion.span
                    className="block"
                    initial={prefersReduced ? false : { y: "110%" }}
                    animate={{ y: "0%" }}
                    exit={prefersReduced ? undefined : { y: "-110%" }}
                    transition={{
                      duration: 0.85,
                      ease: EASE,
                      delay: wi * 0.08 + (prefersReduced ? 0 : 0.05),
                    }}
                    style={{
                      color:
                        wi === 1
                          ? "hsl(var(--brutalist-molten))"
                          : "hsl(var(--brutalist-bone))",
                    }}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </motion.h1>
          </AnimatePresence>
        </div>

        {/* Bottom row: CTAs + metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <motion.div
            className="lg:col-span-7 flex flex-col gap-6"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: heroDelay + 0.5, ease: EASE }}
          >
            <p
              className="max-w-xl text-base md:text-lg leading-relaxed"
              style={{ color: "hsl(var(--brutalist-bone) / 0.78)" }}
            >
              Havacılık, savunma ve medikal sektörler için 5-eksen CNC işleme,
              titanyum & inconel üretimi. 48 saatte teklif, AS9100 sertifikalı süreç.
            </p>

            <div className="flex flex-wrap gap-0">
              <Link
                to="/teklif-al"
                className="group inline-flex items-center gap-3 px-7 py-5 font-mono text-xs uppercase tracking-[0.32em] transition-transform duration-300"
                style={{
                  backgroundColor: "hsl(var(--brutalist-molten))",
                  color: "hsl(var(--brutalist-void))",
                }}
              >
                <span>Teklif Al</span>
                <ArrowUpRight
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </Link>
              <Link
                to="/hizmetler"
                className="group inline-flex items-center gap-3 px-7 py-5 font-mono text-xs uppercase tracking-[0.32em] border-hairline-strong border-l-0 transition-colors duration-300 hover:bg-white/5"
                style={{ color: "hsl(var(--brutalist-bone))" }}
              >
                <span>Hizmetleri Keşfet</span>
                <span aria-hidden>→</span>
              </Link>
            </div>
          </motion.div>

          {/* Metric column */}
          <motion.div
            className="lg:col-span-5 lg:border-l border-hairline-strong lg:pl-8"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: heroDelay + 0.7, ease: EASE }}
          >
            <div className="font-mono text-[10px] uppercase tracking-[0.5em] mb-4" style={{ color: "hsl(var(--brutalist-bone) / 0.5)" }}>
              ◆ Spec Sheet
            </div>
            <ul className="flex flex-col">
              {metrics.map((m) => (
                <li
                  key={m.k}
                  className="flex items-baseline justify-between border-hairline-t py-3 font-mono"
                >
                  <span className="text-[11px] uppercase tracking-[0.32em]" style={{ color: "hsl(var(--brutalist-bone) / 0.55)" }}>
                    {m.k}
                  </span>
                  <span className="text-xl md:text-2xl tabular-nums" style={{ color: "hsl(var(--brutalist-molten))" }}>
                    {m.v}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Bottom hairline scroll indicator */}
      <div className="absolute bottom-0 left-0 right-0 z-20 border-hairline-t">
        <div className="container-industrial flex items-center justify-between py-4 font-mono text-[10px] uppercase tracking-[0.4em]" style={{ color: "hsl(var(--brutalist-bone) / 0.55)" }}>
          <span>↓ Scroll · Forge Sequence</span>
          <span className="hidden md:inline">© 2026 / MAS TECHNIC</span>
        </div>
      </div>
    </section>
  );
};
