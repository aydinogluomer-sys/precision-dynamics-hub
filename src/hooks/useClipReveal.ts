import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "./use-reduced-motion";

/**
 * Brutalist clip-path reveal hook.
 * Element starts at `inset(0 100% 0 0)` (fully clipped from right),
 * reveals to `inset(0)` over 0.9s with custom cubic-bezier when it
 * enters the viewport. Reduced-motion → instant.
 */
export const useClipReveal = <T extends HTMLElement = HTMLDivElement>(
  options: { threshold?: number; once?: boolean; delay?: number } = {},
) => {
  const { threshold = 0.2, once = true, delay = 0 } = options;
  const ref = useRef<T>(null);
  const [revealed, setRevealed] = useState(false);
  const reduce = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduce) {
      setRevealed(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          if (once) io.disconnect();
        } else if (!once) {
          setRevealed(false);
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, once, reduce]);

  const style: React.CSSProperties = {
    clipPath: revealed ? "inset(0 0 0 0)" : "inset(0 100% 0 0)",
    transition: reduce
      ? "none"
      : `clip-path 0.9s cubic-bezier(0.76,0,0.24,1) ${delay}ms`,
    willChange: "clip-path",
  };

  return { ref, style, revealed };
};