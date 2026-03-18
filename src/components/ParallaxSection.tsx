import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  index?: number;
  /** Last section — disables scale-down effect */
  isLast?: boolean;
  style?: React.CSSProperties;
}

/**
 * Stacking-cards parallax wrapper (OneDollarLesson style).
 *
 * Every section is `position: sticky; top: 0` with an increasing z-index.
 * As the user scrolls past a section it scales down, fades, and gains
 * border-radius — looking like a card being pushed to the back of a stack
 * while the next section slides up naturally over it.
 *
 * Performance: `will-change` is only applied while the section is actively
 * animating to avoid holding GPU memory for off-screen sections.
 */
const ParallaxSection = ({
  children,
  className = "",
  index = 0,
  isLast = false,
  style,
}: ParallaxSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Activate will-change only while in animation range
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const active = v > 0.01 && v < 0.99;
    if (active !== isAnimating) setIsAnimating(active);
  });

  // Last section: no scale-down (nothing comes after)
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    isLast ? [1, 1] : [1, 0.92]
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    isLast ? [1, 1, 1] : [1, 1, 0.4]
  );
  const borderRadius = useTransform(
    scrollYProgress,
    [0, 1],
    isLast ? [0, 0] : [0, 16]
  );

  return (
    <div
      ref={ref}
      className="relative"
      style={{ height: "auto", zIndex: index }}
    >
      <motion.div
        className={className}
        style={{
          position: "sticky",
          top: 0,
          scale,
          opacity,
          borderRadius,
          transformOrigin: "center center",
          willChange: isAnimating ? "transform, opacity" : "auto",
          overflow: "hidden",
          ...style,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default ParallaxSection;
