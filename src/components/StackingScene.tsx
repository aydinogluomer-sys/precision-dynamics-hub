import { forwardRef, useEffect, useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/hooks/use-gsap";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";

interface StackingSceneProps {
  children: ReactNode;
  z: number;
  className?: string;
  style?: React.CSSProperties;
}

const useInsetReveal = (ref: React.RefObject<HTMLDivElement>) => {
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReduced || !ref.current) return;
    if (window.matchMedia("(max-width: 768px), (pointer: coarse)").matches) return;
    const el = ref.current;
    window.dispatchEvent(new CustomEvent("mas:scroll-debug", {
      detail: { type: "inset:init", id: el.dataset.sceneId || el.id || "scene", progress: 0 },
    }));
    const tween = gsap.fromTo(el,
      { clipPath: "inset(3% 0% 3% 0%)" },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        ease: "none",
        immediateRender: false,
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          end: "top 32%",
          scrub: 0.8,
          onUpdate: (self) => {
            window.dispatchEvent(new CustomEvent("mas:scroll-debug", {
              detail: { type: "inset", id: el.dataset.sceneId || el.id || "scene", progress: self.progress },
            }));
          },
        },
      },
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      ScrollTrigger.refresh();
    };
  }, [prefersReduced, ref]);
};

const setForwardedRef = (forwardedRef: React.ForwardedRef<HTMLDivElement>, node: HTMLDivElement | null) => {
  if (typeof forwardedRef === "function") forwardedRef(node);
  else if (forwardedRef) forwardedRef.current = node;
};

export const Scene = forwardRef<HTMLDivElement, StackingSceneProps>(
  ({ children, z, className = "", style }, forwardedRef) => {
    const localRef = useRef<HTMLDivElement>(null);
    useInsetReveal(localRef);

    return (
      <div
        ref={(node) => {
          localRef.current = node;
          setForwardedRef(forwardedRef, node);
        }}
        className={`sticky top-0 min-h-[100dvh] w-full ${className}`}
        data-gsap-reveal="inset"
        data-scene-id={style?.zIndex ? undefined : undefined}
        style={{ clipPath: "inset(0% 0% 0% 0%)", zIndex: z, ...style }}
      >
        {children}
      </div>
    );
  },
);

Scene.displayName = "Scene";

export const FlowScene = forwardRef<HTMLDivElement, StackingSceneProps>(
  ({ children, z, className = "", style }, forwardedRef) => {
    const localRef = useRef<HTMLDivElement>(null);
    useInsetReveal(localRef);

    return (
      <div
        ref={(node) => {
          localRef.current = node;
          setForwardedRef(forwardedRef, node);
        }}
        className={`relative w-full ${className}`}
        data-gsap-reveal="inset"
        style={{ clipPath: "inset(0% 0% 0% 0%)", zIndex: z, ...style }}
      >
        {children}
      </div>
    );
  },
);

FlowScene.displayName = "FlowScene";