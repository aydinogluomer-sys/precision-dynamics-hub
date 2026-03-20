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
  style
}: ParallaxSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const prefersReduced = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const active = v > 0.01 && v < 0.99;
    if (active !== isAnimating) setIsAnimating(active);
  });

  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    isLast || prefersReduced ?
    [1, 1] :
    variant === "zoom-out-blur" ?
    [1, 0.92] :
    variant === "zoom-in" ?
    [1, 1.05] :
    variant === "slide-up" ?
    [1, 1] :
    variant === "depth-3d" ?
    [1, 0.88] :
    variant === "wipe-mask" ?
    [1, 1] :
    variant === "color-fade" ?
    [1, 0.95] :
    [1, 0.95]
  );

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.6, 1],
    isLast || prefersReduced ?
    [1, 1, 1] :
    variant === "zoom-out-blur" ?
    [1, 1, 0.3] :
    variant === "zoom-in" ?
    [1, 1, 0.3] :
    variant === "slide-up" ?
    [1, 1, 0.3] :
    variant === "color-fade" ?
    [1, 0.9, 0.3] :
    variant === "depth-3d" ?
    [1, 1, 0.3] :
    variant === "wipe-mask" ?
    [1, 1, 1] :
    [1, 1, 0.6]
  );

  const borderRadius = useTransform(scrollYProgress, [0, 1], isLast || variant !== "stack" ? [0, 0] : [0, 16]);

  const y = useTransform(scrollYProgress, [0, 1], variant === "slide-up" && !isLast ? [0, -60] : [0, 0]);

  const blurValue = useTransform(scrollYProgress, [0, 1], variant === "zoom-out-blur" && !isLast ? [0, 6] : [0, 0]);

  const useSlideUpClip = variant === "slide-up" && !isLast;
  const clipProgress = useTransform(
    scrollYProgress,
    [0, 1],
    (variant === "wipe-mask" || useSlideUpClip) && !isLast ? [0, 100] : [0, 0]
  );
  const clipPath = useMotionTemplate`inset(0 0 ${clipProgress}% 0)`;

  const filter = useMotionTemplate`blur(${blurValue}px)`;

  const useBlur = variant === "zoom-out-blur" && !isLast;
  const useClip = variant === "wipe-mask" && !isLast;

  return (
    <div ref={ref} className="relative text-xs" style={{ zIndex: index }}>
      <motion.div
        className={className}
        style={{
          scale,
          opacity,
          borderRadius,
          y,
          filter: useBlur ? filter : undefined,
          clipPath: useClip ? clipPath : undefined,
          transformOrigin: variant === "depth-3d" ? "center bottom" : "center center",
          willChange: isAnimating ? "transform, opacity" : "auto",
          ...style
        }}>
        
        {children}
      </motion.div>
    </div>);

};

export default ParallaxSection;