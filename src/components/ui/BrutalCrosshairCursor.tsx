import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

/**
 * Brutalist crosshair cursor: 3px square + contextual mono label.
 * Mounts only on desktop (>=768px, fine pointer). Uses gsap.quickTo
 * for performant lerp. Hidden on touch devices and reduced-motion.
 */
export const BrutalCrosshairCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string>("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setVisible(true);

    const dot = dotRef.current;
    const lbl = labelRef.current;
    if (!dot || !lbl) return;

    const xTo = gsap.quickTo(dot, "x", { duration: 0.18, ease: "power3.out" });
    const yTo = gsap.quickTo(dot, "y", { duration: 0.18, ease: "power3.out" });
    const lxTo = gsap.quickTo(lbl, "x", { duration: 0.28, ease: "power3.out" });
    const lyTo = gsap.quickTo(lbl, "y", { duration: 0.28, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      lxTo(e.clientX + 16);
      lyTo(e.clientY + 16);

      const target = e.target as HTMLElement | null;
      const interactive = target?.closest("a,button,[role=button],input,textarea,select");
      if (interactive) {
        const tag = interactive.tagName.toLowerCase();
        setLabel(tag === "a" ? "VIEW" : "CLICK");
      } else {
        setLabel("SCROLL");
      }
    };

    // scroll velocity → dot scale 1.0→1.5
    let lastScrollY = window.scrollY;
    let resetTimer: ReturnType<typeof setTimeout>;
    const onScroll = () => {
      const delta = Math.abs(window.scrollY - lastScrollY);
      lastScrollY = window.scrollY;
      const scale = 1 + Math.min(delta / 80, 1) * 0.5;
      if (dot) gsap.to(dot, { scale, duration: 0.15, ease: "power2.out" });
      clearTimeout(resetTimer);
      resetTimer = setTimeout(() => {
        if (dot) gsap.to(dot, { scale: 1, duration: 0.4, ease: "power2.out" });
      }, 200);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
      clearTimeout(resetTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none mix-blend-difference"
        style={{
          width: 3,
          height: 3,
          backgroundColor: "#fff",
          transform: "translate(-50%,-50%)",
          zIndex: 90,
        }}
      />
      <div
        ref={labelRef}
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none font-mono text-[10px] tracking-[0.25em] uppercase mix-blend-difference"
        style={{ color: "#fff", zIndex: 90 }}
      >
        {label}
      </div>
    </>
  );
};

BrutalCrosshairCursor.displayName = "BrutalCrosshairCursor";