/**
 * BlueprintLines.tsx — Diagonal blueprint grid overlay.
 * SVG pattern tile, forge-teal stroke, Framer Motion fade-in.
 * Pointer-events: none. Absolute positioned inside relative parent.
 */
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";

interface BlueprintLinesProps {
  opacity?: number;
  className?: string;
}

export const BlueprintLines = ({ opacity = 0.06, className = "" }: BlueprintLinesProps) => {
  const prefersReduced = usePrefersReducedMotion();

  return (
    <motion.div
      className={`absolute inset-0 pointer-events-none ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity }}
      viewport={{ once: true, amount: 0 }}
      transition={prefersReduced ? { duration: 0 } : { duration: 1.4, ease: "easeOut" }}
      aria-hidden
    >
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern
            id="blueprint-diagonal"
            x="0"
            y="0"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            {/* NW → SE primary diagonal */}
            <line
              x1="0" y1="0" x2="60" y2="60"
              stroke="hsl(var(--forge-teal))"
              strokeWidth="0.75"
            />
            {/* SW → NE secondary diagonal (lighter) */}
            <line
              x1="0" y1="60" x2="60" y2="0"
              stroke="hsl(var(--forge-teal))"
              strokeWidth="0.4"
              strokeOpacity="0.45"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#blueprint-diagonal)" />
      </svg>
    </motion.div>
  );
};
