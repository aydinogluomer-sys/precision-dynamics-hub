import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";
import { gsap } from "@/hooks/use-gsap";

interface PageLoaderProps {
  isFirstVisit: boolean;
}

export const PageLoader = ({ isFirstVisit }: PageLoaderProps) => {
  const prefersReduced = usePrefersReducedMotion();
  const [isVisible, setIsVisible] = useState(isFirstVisit && !prefersReduced);
  const counterRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isFirstVisit || prefersReduced) return;

    const counter = counterRef.current;
    const bar = barRef.current;
    if (!counter || !bar) return;

    const obj = { val: 0 };

    const tl = gsap.timeline({
      onComplete: () => {
        // Small pause then exit
        gsap.delayedCall(0.3, () => setIsVisible(false));
      },
    });

    // Counter 0 → 100
    tl.to(obj, {
      val: 100,
      duration: 2,
      ease: "power2.inOut",
      onUpdate: () => {
        counter.textContent = String(Math.round(obj.val));
      },
    });

    // Bar width synced
    tl.to(
      bar,
      {
        width: "100%",
        duration: 2,
        ease: "power2.inOut",
      },
      "<"
    );

    return () => {
      tl.kill();
    };
  }, [isFirstVisit, prefersReduced]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ backgroundColor: "hsl(var(--forge-obsidian))" }}
          exit={{
            y: "-100%",
            transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          {/* Subtle grid */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          <div className="relative flex flex-col items-center">
            {/* Big monospace counter */}
            <span
              ref={counterRef}
              className="font-mono font-bold text-white/90 select-none"
              style={{
                fontSize: "clamp(4rem, 12vw, 9rem)",
                fontVariantNumeric: "tabular-nums",
                lineHeight: 1,
              }}
            >
              0
            </span>

            {/* Percent sign */}
            <span
              className="text-sm font-mono text-white/30 tracking-[0.3em] uppercase mt-2"
            >
              {"loading"}
            </span>

            {/* Progress bar */}
            <div
              className="mt-6 h-px overflow-hidden"
              style={{ width: 120, backgroundColor: "rgba(255,255,255,0.1)" }}
            >
              <div
                ref={barRef}
                className="h-full"
                style={{
                  width: "0%",
                  background:
                    "linear-gradient(90deg, hsl(var(--forge-molten)), hsl(var(--forge-amber)))",
                }}
              />
            </div>

            {/* Brand */}
            <motion.span
              className="text-[10px] uppercase tracking-[0.4em] text-white/25 font-mono mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {"MAS TECHNIC"}
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
