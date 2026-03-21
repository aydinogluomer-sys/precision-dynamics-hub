import { useRef, forwardRef } from "react";
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";

interface SectionDividerProps {
  fillColor?: string;
  flip?: boolean;
  className?: string;
}

const SectionDivider = forwardRef<HTMLDivElement, SectionDividerProps>(
  ({ fillColor = "hsl(var(--forge-obsidian))", flip = false, className = "" }, _forwardedRef) => {
    const ref = useRef<HTMLDivElement>(null);
    const prefersReduced = usePrefersReducedMotion();

    const { scrollYProgress } = useScroll({
      target: ref,
      offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], prefersReduced ? [0, 0] : [50, -50]);

    const rotate = useTransform(scrollYProgress, [0, 1], prefersReduced ? [0, 0] : [0, flip ? -2 : 2]);

    const rotateStr = useMotionTemplate`${rotate}deg`;

    return (
      <div
        ref={ref}
        className={`relative w-full overflow-hidden pointer-events-none ${className}`}
        style={{ height: 160, marginTop: -2, marginBottom: -2 }}
      >
        <motion.div style={{ y, rotateZ: rotateStr }} className="w-full h-full">
          <svg
            viewBox="0 0 1440 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
            preserveAspectRatio="none"
            style={{ transform: flip ? "scaleY(-1)" : undefined }}
          >
            {/* Background layer — subtle depth */}
            <path d="M0 120C200 60 500 30 720 50C940 70 1200 100 1440 80V160H0V120Z" fill={fillColor} opacity={0.3} />
            {/* Foreground layer — main curve */}
            <path d="M0 90C240 30 480 0 720 15C960 30 1200 75 1440 60V160H0V90Z" fill={fillColor} />
          </svg>
        </motion.div>
      </div>
    );
  },
);

SectionDivider.displayName = "SectionDivider";

export { SectionDivider };
