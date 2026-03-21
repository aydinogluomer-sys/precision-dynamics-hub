import { motion, useScroll, useSpring, useMotionValueEvent } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const ScrollProgress = () => {
  const { pathname } = useLocation();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const [progress, setProgress] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setProgress(Math.round(v * 100));
  });

  const isHidden =
    pathname.startsWith("/admin") || pathname.startsWith("/musteri-paneli");

  if (isHidden) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 h-[2px] origin-left"
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Sayfa ilerleme durumu"
      style={{
        scaleX,
        background:
          "linear-gradient(90deg, hsl(var(--forge-molten)), hsl(var(--forge-amber)))",
      }}
    />
  );
};

export { ScrollProgress };
