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
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 88%",
      end: "top 32%",
      onUpdate: (self) => {
        window.dispatchEvent(new CustomEvent("mas:scroll-debug", {
          detail: { type: "inset", id: el.id || "scene", progress: self.progress },
        }));
      },
    });
    return () => {
      trigger.kill();
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
        style={{ zIndex: z, ...style }}
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
        style={{ zIndex: z, ...style }}
      >
        {children}
      </div>
    );
  },
);

FlowScene.displayName = "FlowScene";