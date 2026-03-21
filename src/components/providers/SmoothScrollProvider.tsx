import { useEffect, useRef, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

declare global {
  interface Window { __lenis?: Lenis; }
}

interface SmoothScrollProviderProps {
  children: ReactNode;
}

const shouldDisable =
  import.meta.env.DEV && import.meta.env.VITE_DISABLE_LENIS === "true";

export const SmoothScrollProvider = ({ children }: SmoothScrollProviderProps) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (shouldDisable) return;

    const isAutomation = (navigator as unknown as { webdriver?: boolean }).webdriver === true;

    const lenis = new Lenis({
      lerp: isAutomation ? 1 : 0.08,
      duration: isAutomation ? 0 : 1.4,
      smoothWheel: !isAutomation,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;
    window.__lenis = lenis;

    lenis.on("scroll", () => {
      ScrollTrigger.update();
      window.dispatchEvent(new Event("scroll"));
    });

    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
      delete window.__lenis;
    };
  }, []);

  return <>{children}</>;
};
