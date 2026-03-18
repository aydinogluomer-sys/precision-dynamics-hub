import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  index?: number;
  style?: React.CSSProperties;
}

/**
 * Stacking-cards parallax wrapper (OneDollarLesson style).
 *
 * Every section is `position: sticky; top: 0` with an increasing z-index.
 * As the user scrolls past a section it scales down, fades, and gains
 * border-radius — looking like a card being pushed to the back of a stack
 * while the next section slides up naturally over it.
 */
const ParallaxSection = ({
  children,
  className = "",
  index = 0,
  style,
}: ParallaxSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);

  // Track when the section starts leaving (top of section hits top of viewport
  // → bottom of section hits top of viewport)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // As the section scrolls away: scale down, fade, round corners
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0.4]);
  const borderRadius = useTransform(scrollYProgress, [0, 1], [0, 16]);

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
          willChange: "transform, opacity",
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
