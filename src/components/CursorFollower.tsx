import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useLocation } from "react-router-dom";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";

const CURSOR_PATHS = [
  "/", "/hakkimizda", "/hizmetler", "/malzemeler",
  "/teklif-al", "/blog", "/kabiliyetler", "/endustriyel",
  "/sss", "/iletisim",
];

const DISABLED_PATHS = ["/admin", "/musteri-paneli", "/giris", "/sifremi-unuttum", "/sifre-sifirla"];

const isActivePath = (pathname: string): boolean => {
  if (DISABLED_PATHS.some((p) => pathname.startsWith(p))) return false;
  return CURSOR_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/"));
};

export const CursorFollower = () => {
  const location = useLocation();
  const prefersReduced = usePrefersReducedMotion();

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Dot follows mouse directly (no spring)
  const dotX = cursorX;
  const dotY = cursorY;

  // Ring lags behind with spring
  const ringX = useSpring(cursorX, { stiffness: 150, damping: 15 });
  const ringY = useSpring(cursorY, { stiffness: 150, damping: 15 });

  const ringSize = useMotionValue(40);
  const springRingSize = useSpring(ringSize, { stiffness: 300, damping: 25 });

  const isHovering = useRef(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const active = isActivePath(location.pathname);
  const isCoarse = useRef(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
      isCoarse.current = true;
    }
  }, []);

  // Toggle body cursor:none
  useEffect(() => {
    if (isCoarse.current || prefersReduced) return;

    if (active) {
      document.body.classList.add("cursor-none-active");
    } else {
      document.body.classList.remove("cursor-none-active");
    }

    return () => {
      document.body.classList.remove("cursor-none-active");
    };
  }, [active, prefersReduced]);

  useEffect(() => {
    if (isCoarse.current || prefersReduced || !active) return;

    const handleMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button'], input, textarea, select, label")) {
        if (!isHovering.current) {
          isHovering.current = true;
          ringSize.set(60);
          if (ringRef.current) ringRef.current.dataset.hover = "true";
          if (dotRef.current) dotRef.current.dataset.hover = "true";
        }
      }
    };

    const handleOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button'], input, textarea, select, label")) {
        if (isHovering.current) {
          isHovering.current = false;
          ringSize.set(40);
          if (ringRef.current) ringRef.current.dataset.hover = "false";
          if (dotRef.current) dotRef.current.dataset.hover = "false";
        }
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
  }, [active, prefersReduced, cursorX, cursorY, ringSize]);

  // Don't render on touch devices, reduced motion, or inactive paths
  if (
    (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) ||
    prefersReduced ||
    !active
  ) {
    return null;
  }

  return (
    <>
      {/* Inner dot — 12px, forge-molten, follows instantly */}
      <motion.div
        ref={dotRef}
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[9999] cursor-dot"
        style={{
          x: dotX,
          y: dotY,
          width: 12,
          height: 12,
          borderRadius: "50%",
          translateX: "-50%",
          translateY: "-50%",
          willChange: "transform",
        }}
      />
      {/* Outer ring — 40px (60px on hover), lagging spring */}
      <motion.div
        ref={ringRef}
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[9998] cursor-ring"
        style={{
          x: ringX,
          y: ringY,
          width: springRingSize,
          height: springRingSize,
          borderRadius: "50%",
          translateX: "-50%",
          translateY: "-50%",
          willChange: "transform",
        }}
      />
    </>
  );
};
