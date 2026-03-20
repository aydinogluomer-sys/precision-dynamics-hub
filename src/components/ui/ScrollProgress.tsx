import { motion, useScroll, useSpring } from "framer-motion";
import { useLocation } from "react-router-dom";

const ScrollProgress = () => {
  const { pathname } = useLocation();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const isHidden =
    pathname.startsWith("/admin") || pathname.startsWith("/musteri-paneli");

  if (isHidden) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 h-[2px] origin-left"
      style={{
        scaleX,
        background:
          "linear-gradient(90deg, hsl(var(--forge-molten)), hsl(var(--forge-amber)))",
      }}
    />
  );
};

export { ScrollProgress };
