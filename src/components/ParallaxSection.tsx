import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

type TransitionVariant = "stack" | "zoom-out-blur" | "slide-up" | "zoom-in";

interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  index?: number;
  isLast?: boolean;
  variant?: TransitionVariant;
  style?: React.CSSProperties;
}

const ParallaxSection = ({
  children,
  className = "",
  index = 0,
  isLast = false,
  variant = "stack",
  style,
}: ParallaxSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const active = v > 0.01 && v < 0.99;
    if (active !== isAnimating) setIsAnimating(active);
  });

  // --- Variant-based transforms ---
  const scale = useTransform(scrollYProgress, [0, 1], isLast ? [1, 1] :
    variant === "zoom-out-blur" ? [1, 0.85] :
    variant === "zoom-in" ? [1, 1.08] :
    variant === "slide-up" ? [1, 1] :
    [1, 0.92]
  );

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], isLast ? [1, 1, 1] :
    variant === "zoom-out-blur" ? [1, 1, 0] :
    variant === "zoom-in" ? [1, 1, 0] :
    variant === "slide-up" ? [1, 1, 0] :
    [1, 1, 0.4]
  );

  const borderRadius = useTransform(scrollYProgress, [0, 1],
    isLast || variant !== "stack" ? [0, 0] : [0, 16]
  );

  const y = useTransform(scrollYProgress, [0, 1],
    variant === "slide-up" && !isLast ? [0, -60] : [0, 0]
  );

  const blur = useTransform(scrollYProgress, [0, 1],
    variant === "zoom-out-blur" && !isLast ? [0, 8] : [0, 0]
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
          y,
          filter: variant === "zoom-out-blur" && !isLast
            ? blur.get() > 0 ? `blur(${blur.get()}px)` : "none"
            : undefined,
          transformOrigin: "center center",
          willChange: isAnimating ? "transform, opacity, filter" : "auto",
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
