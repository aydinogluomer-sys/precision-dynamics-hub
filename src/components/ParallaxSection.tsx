import { useRef, forwardRef, useState, type ReactNode } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, useMotionTemplate } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";

type TransitionVariant = "stack" | "zoom-out-blur" | "slide-up" | "zoom-in" | "wipe-mask" | "color-fade" | "depth-3d";

interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  index?: number;
  isLast?: boolean;
  variant?: TransitionVariant;
  style?: React.CSSProperties;
  videoBg?: string;
}

const ParallaxSection = forwardRef<HTMLDivElement, ParallaxSectionProps>(({
  children,
  className = "",
  index = 0,
  isLast = false,
  variant = "stack",
  style,
  videoBg
}, _forwardedRef) => {
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

  const none = isLast || prefersReduced;

  // --- Scale ---
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    none ? [1, 1] :
    variant === "zoom-out-blur" ? [1, 0.85] :
    variant === "zoom-in" ? [1, 1.05] :
    variant === "slide-up" ? [1, 1] :
    variant === "depth-3d" ? [1, 0.88] :
    variant === "wipe-mask" ? [1, 1] :
    variant === "color-fade" ? [1, 0.90] :
    variant === "stack" ? [1, 0.88] :
    [1, 0.88]
  );

  // --- Opacity ---
  const opacity = useTransform(
    scrollYProgress,
    variant === "zoom-out-blur" && !none ? [0, 0.3, 1] : [0, 0.6, 1],
    none ? [1, 1, 1] :
    variant === "zoom-out-blur" ? [1, 0.8, 0.15] :
    variant === "zoom-in" ? [1, 1, 0.2] :
    variant === "slide-up" ? [1, 1, 0.2] :
    variant === "color-fade" ? [1, 0.85, 0.2] :
    variant === "depth-3d" ? [1, 1, 0.2] :
    variant === "wipe-mask" ? [1, 1, 1] :
    variant === "stack" ? [1, 1, 0.3] :
    [1, 1, 0.4]
  );

  // --- BorderRadius ---
  const borderRadius = useTransform(scrollYProgress, [0, 1], none || variant !== "stack" ? [0, 0] : [0, 20]);

  // --- TranslateY ---
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    variant === "slide-up" && !none ? [0, -120] :
    variant === "stack" && !none ? [0, -40] :
    [0, 0]
  );

  // --- Blur ---
  const blurValue = useTransform(
    scrollYProgress,
    [0, 1],
    variant === "zoom-out-blur" && !none ? [0, 10] : [0, 0]
  );

  // --- Wipe mask (diagonal polygon) ---
  const clipProgress = useTransform(
    scrollYProgress,
    [0, 1],
    variant === "wipe-mask" && !none ? [0, 100] : [0, 0]
  );
  // Diagonal wipe: top-right corner sweeps down-left
  const clipPath = useMotionTemplate`polygon(0 0, 100% 0, 100% ${clipProgress}%, 0 ${clipProgress}%)`;

  // --- Depth-3d: rotateX ---
  const rotateXValue = useTransform(
    scrollYProgress,
    [0, 1],
    variant === "depth-3d" && !none ? [0, 6] : [0, 0]
  );
  const rotateX = useMotionTemplate`${rotateXValue}deg`;

  const filter = useMotionTemplate`blur(${blurValue}px)`;

  const useBlur = variant === "zoom-out-blur" && !none;
  const useClip = variant === "wipe-mask" && !none;
  const useDepth3d = variant === "depth-3d" && !none;

  return (
    <div
      ref={ref}
      className="relative text-xs"
      style={{
        zIndex: index,
        perspective: useDepth3d ? 1200 : undefined,
      }}
    >
      <motion.div
        className={`${className} relative`}
        style={{
          scale,
          opacity,
          borderRadius,
          y,
          rotateX: useDepth3d ? rotateX : undefined,
          filter: useBlur ? filter : undefined,
          clipPath: useClip ? clipPath : undefined,
          transformOrigin: variant === "depth-3d" ? "center bottom" : "center center",
          willChange: isAnimating ? "transform, opacity" : "auto",
          ...style
        }}>
        {/* Ghost video background for depth-3d variant */}
        {videoBg && variant === "depth-3d" && (
          <video
            src={videoBg}
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            className="absolute inset-0 w-full h-full object-cover opacity-[0.08] pointer-events-none hidden md:block z-0"
            style={{ mixBlendMode: "luminosity" }}
            aria-hidden="true"
          />
        )}
        {children}
      </motion.div>
    </div>
  );
});

ParallaxSection.displayName = "ParallaxSection";

export default ParallaxSection;
