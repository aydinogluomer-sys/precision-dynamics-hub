import { useRef, forwardRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";

interface SectionDividerProps {
  /** Fill color for the curve (next section's bg) */
  fillColor?: string;
  /** Whether to flip the curve */
  flip?: boolean;
  className?: string;
}

const SectionDivider = ({
  fillColor = "hsl(var(--forge-obsidian))",
  flip = false,
  className = "",
}: SectionDividerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReduced ? [0, 0] : [20, -20]
  );

  return (
    <div
      ref={ref}
      className={`relative w-full overflow-hidden pointer-events-none ${className}`}
      style={{ height: 100, marginTop: -1, marginBottom: -1 }}
    >
      <motion.div style={{ y }} className="w-full h-full">
        <svg
          viewBox="0 0 1440 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          preserveAspectRatio="none"
          style={{ transform: flip ? "scaleY(-1)" : undefined }}
        >
          <path
            d="M0 60C240 20 480 0 720 10C960 20 1200 50 1440 40V100H0V60Z"
            fill={fillColor}
          />
        </svg>
      </motion.div>
    </div>
  );
};

export { SectionDivider };
