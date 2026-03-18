import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CursorFollower = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 400, damping: 30 });
  const springY = useSpring(cursorY, { stiffness: 400, damping: 30 });
  const scaleValue = useMotionValue(1);
  const springScale = useSpring(scaleValue, { stiffness: 400, damping: 25 });
  const isCoarse = useRef(false);

  useEffect(() => {
    // Check for touch/coarse pointer — don't render on mobile
    if (window.matchMedia("(pointer: coarse)").matches) {
      isCoarse.current = true;
      return;
    }

    const handleMove = (e: MouseEvent) => {
      cursorX.set(e.clientX - 4);
      cursorY.set(e.clientY - 4);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a, button, [role='button'], input, textarea, select, label")
      ) {
        scaleValue.set(3);
      }
    };

    const handleOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a, button, [role='button'], input, textarea, select, label")
      ) {
        scaleValue.set(1);
      }
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    document.addEventListener("mouseover", handleOver, { passive: true });
    document.addEventListener("mouseout", handleOut, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
    };
  }, [cursorX, cursorY, scaleValue]);

  // Don't render on touch devices
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{
        x: springX,
        y: springY,
        scale: springScale,
        width: 8,
        height: 8,
        borderRadius: "50%",
        backgroundColor: "hsl(var(--primary))",
        backdropFilter: "invert(0.8)",
        willChange: "transform",
      }}
    />
  );
};

export default CursorFollower;
