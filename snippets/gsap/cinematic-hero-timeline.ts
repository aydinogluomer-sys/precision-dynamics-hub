/**
 * Cinematic cold-load entrance pattern — ref: adrianhajdin/award-winning-website
 * Adapted for Mas Technic: React 18 + GSAP 3.14 + TypeScript
 *
 * Key pattern: gsap.timeline() (not scroll-driven) gated by isFirstVisit.
 * FM and GSAP on different elements — no conflict.
 */
import { gsap } from "@/lib/animation-manager";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";
import { type RefObject, useEffect } from "react";

export function useCinematicEntrance(
  containerRef: RefObject<HTMLElement>,
  isFirstVisit: boolean,
  onStep: (step: number) => void,
) {
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!isFirstVisit || prefersReduced) { onStep(99); return; }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // t=0:   grid / line element scaleX reveal
      // t=0.3: tag slide-up stagger
      // t=0.6: step(1) → triggers HeadlineStagger via state
      // t=1.0: CTA clip-path left→right
      // t=1.2: canvas/media fade-in (0.5s, total 1.7s)

      tl.call(() => onStep(0), [], 0);     // grid
      tl.call(() => onStep(1), [], 0.3);   // tags
      tl.call(() => onStep(2), [], 0.6);   // headline
      tl.call(() => onStep(3), [], 1.0);   // CTA
      tl.call(() => onStep(4), [], 1.2);   // canvas

      return tl;
    }, containerRef);

    return () => ctx.revert();
  }, [isFirstVisit, prefersReduced]);
}
