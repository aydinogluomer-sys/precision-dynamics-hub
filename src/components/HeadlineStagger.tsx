import { forwardRef, useEffect } from "react";
import { motion, useTransform, useMotionValue, useSpring } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";
import { useScrollVelocity } from "@/hooks/useScrollVelocity";

const charVariants = {
  enter: (i: number) => ({
    y: 0,
    opacity: 1,
    scaleY: 1,
    rotateX: 0,
    transition: { delay: i * 0.035, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  }),
  initial: { y: "-120%", opacity: 0, scaleY: 0.8, rotateX: 40 },
  exit: (i: number) => ({
    y: "120%",
    opacity: 0,
    scaleY: 0.8,
    rotateX: -40,
    transition: { delay: i * 0.02, duration: 0.4, ease: "easeIn" as const },
  }),
};

interface HeadlineStaggerProps {
  text: string;
  scrollRotateX?: ReturnType<typeof useTransform>;
}

export const HeadlineStagger = forwardRef<HTMLDivElement, HeadlineStaggerProps>(
  ({ text, scrollRotateX }, ref) => {
    const prefersReduced = usePrefersReducedMotion();
    const { velocity, direction } = useScrollVelocity();

    // Velocity-reactive skewX (±3deg max) — wrapper element, not chars
    const velocityMV = useMotionValue(0);
    const skewTransform = useTransform(velocityMV, [-10, 0, 10], [3, 0, -3]);
    const skewX = useSpring(skewTransform, { stiffness: 200, damping: 30 });

    useEffect(() => {
      if (prefersReduced) { velocityMV.set(0); return; }
      velocityMV.set(direction === "down" ? -velocity : velocity);
    }, [velocity, direction, prefersReduced, velocityMV]);

    const allWords = text.replace(/\n/g, " ").split(" ");
    const staggerWords = allWords.slice(0, 2);
    const restWords = allWords.slice(2);
    const staggerWordChars = staggerWords.join("").length;

    return (
      <motion.div
        ref={ref}
        className="flex flex-col items-center"
        style={{
          perspective: 800,
          transformStyle: "preserve-3d" as const,
          rotateX: scrollRotateX,
          skewX,
          wordBreak: "break-word",
          overflowWrap: "break-word",
          hyphens: "auto",
        }}
        initial={prefersReduced ? undefined : { letterSpacing: "0.2em", opacity: 0 }}
        animate={{ letterSpacing: "-0.05em", opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="inline-flex flex-wrap justify-center gap-x-[0.3em]">
          {staggerWords.map((word, wi) => (
            <span key={wi} className="inline-flex whitespace-nowrap">
              {word.split("").map((char, ci) => {
                const i = staggerWords.slice(0, wi).join("").length + ci;
                const isFirstWord = wi === 0;
                return (
                  <motion.span
                    key={`${char}-${i}`}
                    custom={i}
                    variants={charVariants}
                    initial={prefersReduced ? "enter" : "initial"}
                    animate="enter"
                    exit={prefersReduced ? "enter" : "exit"}
                    className="inline-block font-extrabold uppercase"
                    style={{
                      fontSize: "clamp(2.2rem, 7.5vw, 9rem)",
                      letterSpacing: "inherit",
                      lineHeight: 1,
                      ...(isFirstWord
                        ? {
                            WebkitTextStroke: "2px #0688AD",
                            color: "transparent",
                          }
                        : {
                            color: "#0688AD",
                          }),
                      textShadow: "0 4px 30px rgba(6, 136, 173, 0.15)",
                    }}
                  >
                    {char}
                  </motion.span>
                );
              })}
            </span>
          ))}
        </span>
        {restWords.length > 0 && (
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ delay: staggerWordChars * 0.02 + 0.1, duration: 0.4 }}
            className="font-extrabold uppercase whitespace-pre-line text-center"
            style={{
              fontSize: "clamp(2.2rem, 7.5vw, 9rem)",
              color: "#0688AD",
              letterSpacing: "inherit",
              lineHeight: 1,
              textShadow: "0 4px 30px rgba(6, 136, 173, 0.15)",
            }}
          >
            {restWords.join(" ")}
          </motion.span>
        )}
      </motion.div>
    );
  }
);

HeadlineStagger.displayName = "HeadlineStagger";
