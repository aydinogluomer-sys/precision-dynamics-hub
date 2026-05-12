import { type RefObject, useEffect } from "react";
import { gsap } from "@/lib/animation-manager";
import { usePrefersReducedMotion } from "./use-reduced-motion";

interface ScrollAnimationVars {
  from: gsap.TweenVars;
  trigger?: Element | string | null;
  scrub?: boolean | number;
  start?: string;
  end?: string;
  once?: boolean;
}

export function useScrollAnimation(
  ref: RefObject<HTMLElement>,
  vars: ScrollAnimationVars,
) {
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReduced) {
      gsap.set(el, { opacity: 1, y: 0, x: 0, scale: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from(el, {
        ...vars.from,
        scrollTrigger: {
          trigger: vars.trigger ?? el,
          start: vars.start ?? "top 80%",
          end: vars.end ?? "bottom 20%",
          scrub: vars.scrub ?? false,
          once: vars.once ?? true,
        },
      });
    }, ref);

    return () => ctx.revert();
    // vars is stable (defined at call site) — intentional omission
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefersReduced]);
}
