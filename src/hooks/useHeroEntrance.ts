import { type RefObject, useEffect } from "react";
import { gsap } from "@/lib/animation-manager";
import { usePrefersReducedMotion } from "./use-reduced-motion";

interface HeroEntranceRefs {
  gridRef: RefObject<HTMLDivElement | null>;
  ctaRef: RefObject<HTMLElement | null>;
  canvasRef: RefObject<HTMLElement | null>;
  containerRef: RefObject<HTMLDivElement | null>;
}

export function useHeroEntrance(
  refs: HeroEntranceRefs,
  isFirstVisit: boolean,
  onHeadlineTrigger: () => void,
) {
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!isFirstVisit) {
      onHeadlineTrigger();
      return;
    }

    if (prefersReduced) {
      onHeadlineTrigger();
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // t=0: Grid lines scaleX 0→1
      if (refs.gridRef.current) {
        tl.fromTo(
          refs.gridRef.current,
          { scaleX: 0, transformOrigin: "left center" },
          { scaleX: 1, duration: 0.8 },
          0,
        );
      }

      // t=0.3s: .typo-tag elements slide up
      const typoTags = refs.containerRef.current?.querySelectorAll(".typo-tag");
      if (typoTags?.length) {
        tl.from(
          Array.from(typoTags),
          { y: 20, opacity: 0, duration: 0.5, stagger: 0.06 },
          0.3,
        );
      }

      // t=0.6s: HeadlineStagger tetikle via state gate
      tl.call(onHeadlineTrigger, [], 0.6);

      // t=1.0s: CTA clip-path left→right reveal
      if (refs.ctaRef.current) {
        tl.fromTo(
          refs.ctaRef.current,
          { clipPath: "inset(0 100% 0 0)" },
          { clipPath: "inset(0 0% 0 0)", duration: 0.6 },
          1.0,
        );
      }

      // t=1.2s: HeroCanvas fade in (total: 1.7s)
      if (refs.canvasRef.current) {
        tl.from(refs.canvasRef.current, { opacity: 0, duration: 0.5 }, 1.2);
      }
    }, refs.containerRef);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFirstVisit, prefersReduced]); // refs are stable GSAP targets; onHeadlineTrigger is a state setter
}
