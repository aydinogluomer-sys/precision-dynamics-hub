import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

// Single registration point — all other registerPlugin calls are removed
gsap.registerPlugin(ScrollTrigger, SplitText);

export const ANIMATION_DEFAULTS = {
  duration: 0.6,
  ease: "power3.out",
  stagger: 0.08,
} as const;

export function batchReveal(
  elements: string | Element[],
  vars?: gsap.TweenVars,
  _batchSize = 3,
) {
  return ScrollTrigger.batch(elements, {
    onEnter: (batch) =>
      gsap.from(batch, {
        opacity: 0,
        y: 40,
        stagger: ANIMATION_DEFAULTS.stagger,
        duration: ANIMATION_DEFAULTS.duration,
        ease: ANIMATION_DEFAULTS.ease,
        ...vars,
      }),
    start: "top 85%",
    once: true,
  });
}

export function killAll() {
  ScrollTrigger.getAll().forEach((t) => t.kill());
}

export { gsap, ScrollTrigger };
