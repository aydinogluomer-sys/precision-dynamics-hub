import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  sticky?: boolean;
  /** Extra style to forward (e.g. backgroundColor) */
  style?: React.CSSProperties;
}

/**
 * 3D "door-opening" parallax wrapper.
 *
 * - Non-sticky sections: as the section enters the viewport from below it
 *   rotates from -4° → 0° around the X axis (perspective tilt) and scales
 *   from 0.96 → 1, creating a "page flipping open" reveal.
 * - Sticky sections: pinned with `position: sticky` so subsequent sections
 *   slide over them — no tilt applied to the sticky section itself.
 *
 * Respects prefers-reduced-motion automatically via framer-motion.
 */
const ParallaxSection = ({
  children,
  className = "",
  sticky = false,
  style,
}: ParallaxSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.15"],
  });

  // 3D tilt values for non-sticky sections
  const rotateX = useTransform(scrollYProgress, [0, 1], [-4, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.96, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  if (sticky) {
    return (
      <div
        ref={ref}
        className={`relative ${className}`}
        style={{ position: "sticky", top: 0, zIndex: 1, ...style }}
      >
        {children}
      </div>
    );
  }

  return (
    <div ref={ref} className="relative" style={{ perspective: "1200px", zIndex: 2 }}>
      <motion.div
        className={className}
        style={{
          rotateX,
          scale,
          opacity,
          transformOrigin: "center bottom",
          willChange: "transform, opacity",
          ...style,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default ParallaxSection;
