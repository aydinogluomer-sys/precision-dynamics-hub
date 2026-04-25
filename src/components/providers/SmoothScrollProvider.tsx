import { useEffect, useRef, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

declare global {
  interface Window {
    __lenis?: Lenis;
    __gsapSmoothScrollFallback?: boolean;
  }
}

interface SmoothScrollProviderProps {
  children: ReactNode;
}

const shouldDisable =
  (import.meta.env.DEV && import.meta.env.VITE_DISABLE_LENIS === "true") || typeof window === "undefined";

export const SmoothScrollProvider = ({ children }: SmoothScrollProviderProps) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    // Mobilde Lenis başlatma — native scroll + scroll-snap aktif
    const isMobile =
      typeof window !== 'undefined' &&
      window.matchMedia('(max-width: 768px)').matches;

    if (isMobile) return;

    if (shouldDisable) {
      let current = window.scrollY;
      let target = current;
      const onWheel = (event: WheelEvent) => {
        event.preventDefault();
        const max = document.documentElement.scrollHeight - window.innerHeight;
        target = Math.max(0, Math.min(max, target + event.deltaY * 0.8));
      };
      const onNativeScroll = () => {
        if (Math.abs(window.scrollY - current) > 24) {
          current = window.scrollY;
          target = window.scrollY;
        }
      };
      const tick = () => {
        current += (target - current) * 0.12;
        if (Math.abs(target - current) > 0.5) window.scrollTo(0, current);
        ScrollTrigger.update();
      };
      window.__gsapSmoothScrollFallback = true;
      window.addEventListener("wheel", onWheel, { passive: false });
      window.addEventListener("scroll", onNativeScroll, { passive: true });
      gsap.ticker.add(tick);
      return () => {
        window.removeEventListener("wheel", onWheel);
        window.removeEventListener("scroll", onNativeScroll);
        gsap.ticker.remove(tick);
        delete window.__gsapSmoothScrollFallback;
      };
    }

    const lenis = new Lenis({
      lerp: 0.08,
      duration: 1.4,
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;
    window.__lenis = lenis;

    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateLenis);
      ScrollTrigger.getAll().forEach((t) => t.kill());
      lenis.destroy();
      lenisRef.current = null;
      delete window.__lenis;
    };
  }, []);

  return <>{children}</>;
};
