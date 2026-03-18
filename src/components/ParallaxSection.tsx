import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, useMotionTemplate } from "framer-motion";
import { useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";

type TransitionVariant = "stack" | "zoom-out-blur" | "slide-up" | "zoom-in" | "wipe-mask" | "color-fade" | "depth-3d";

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
  const prefersReduced = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const active = v > 0.01 && v < 0.99;
    if (active !== isAnimating) setIsAnimating(active);
  });

  const scale = useTransform(scrollYProgress, [0, 1], isLast || prefersReduced ? [1, 1] :
    variant === "zoom-out-blur" ? [1, 0.85] :
    variant === "zoom-in" ? [1, 1.08] :
    variant === "slide-up" ? [1, 1] :
    variant === "depth-3d" ? [1, 0.8] :
    variant === "wipe-mask" ? [1, 1] :
    variant === "color-fade" ? [1, 0.92] :
    [1, 0.92]
  );

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], isLast || prefersReduced ? [1, 1, 1] :
    variant === "zoom-out-blur" ? [1, 1, 0] :
    variant === "zoom-in" ? [1, 1, 0] :
    variant === "slide-up" ? [1, 1, 0] :
    variant === "color-fade" ? [1, 0.8, 0] :
    variant === "depth-3d" ? [1, 1, 0] :
    variant === "wipe-mask" ? [1, 1, 1] :
    [1, 1, 0.4]
  );

  const borderRadius = useTransform(scrollYProgress, [0, 1],
    isLast || variant !== "stack" ? [0, 0] : [0, 16]
  );

  const y = useTransform(scrollYProgress, [0, 1],
    variant === "slide-up" && !isLast ? [0, -60] : [0, 0]
  );

  const blurValue = useTransform(scrollYProgress, [0, 1],
    variant === "zoom-out-blur" && !isLast ? [0, 8] : [0, 0]
  );

  // Wipe mask clip path
  const clipProgress = useTransform(scrollYProgress, [0, 1],
    variant === "wipe-mask" && !isLast ? [0, 100] : [0, 0]
  );
  const clipPath = useMotionTemplate`inset(0 0 ${clipProgress}% 0)`;

  const filter = useMotionTemplate`blur(${blurValue}px)`;

  const useBlur = variant === "zoom-out-blur" && !isLast;
  const useClip = variant === "wipe-mask" && !isLast;

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
          filter: useBlur ? filter : undefined,
          clipPath: useClip ? clipPath : undefined,
          transformOrigin: variant === "depth-3d" ? "center bottom" : "center center",
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
