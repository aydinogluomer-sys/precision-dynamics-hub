import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

/**
 * GSAP text split reveal — splits text into words/chars and animates them in.
 */
export function useGsapTextReveal(
  options: {
    splitType?: "words" | "chars";
    stagger?: number;
    duration?: number;
    y?: number;
    scrollTrigger?: boolean;
    delay?: number;
  } = {}
) {
  const ref = useRef<HTMLElement>(null);
  const {
    splitType = "words",
    stagger = 0.04,
    duration = 0.8,
    y = 60,
    scrollTrigger: useST = true,
    delay = 0,
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Check reduced motion
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const text = el.textContent || "";
    el.setAttribute("aria-label", text);

    // Split into spans
    const units =
      splitType === "chars"
        ? text.split("").map((c) => (c === " " ? "&nbsp;" : c))
        : text.split(/(\s+)/).filter(Boolean);

    el.innerHTML = units
      .map((u) => {
        if (/^\s+$/.test(u)) return u;
        return `<span class="gsap-split-unit" style="display:inline-block;overflow:hidden"><span class="gsap-split-inner" style="display:inline-block">${u}</span></span>`;
      })
      .join("");

    const inners = el.querySelectorAll<HTMLElement>(".gsap-split-inner");

    const tl = gsap.timeline({
      scrollTrigger: useST
        ? {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          }
        : undefined,
      delay,
    });

    tl.fromTo(
      inners,
      { y, opacity: 0, rotateX: 20 },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration,
        stagger,
        ease: "power3.out",
      }
    );

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
      // Restore original text
      el.textContent = text;
    };
  }, [splitType, stagger, duration, y, useST, delay]);

  return ref;
}

/**
 * GSAP ScrollTrigger pin + scrub for horizontal scroll
 */
export function useGsapHorizontalScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const getScrollAmount = () => -(track.scrollWidth - window.innerWidth);

    const tween = gsap.to(track, {
      x: getScrollAmount,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: () => `+=${track.scrollWidth - window.innerWidth}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === container) st.kill();
      });
    };
  }, []);

  return { containerRef, trackRef };
}

/**
 * GSAP parallax scrub on an element
 */
export function useGsapParallax(
  options: { y?: number; scale?: number; opacity?: [number, number] } = {}
) {
  const ref = useRef<HTMLDivElement>(null);
  const { y = 80, scale, opacity } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const props: gsap.TweenVars = { y, ease: "none" };
    if (scale !== undefined) props.scale = scale;
    if (opacity) props.opacity = opacity[1];

    const fromProps: gsap.TweenVars = { y: 0 };
    if (scale !== undefined) fromProps.scale = 1;
    if (opacity) fromProps.opacity = opacity[0];

    const tween = gsap.fromTo(el, fromProps, {
      ...props,
      scrollTrigger: {
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
    };
  }, [y, scale, opacity]);

  return ref;
}
