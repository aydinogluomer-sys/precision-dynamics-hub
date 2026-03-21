import { useGsapTextReveal } from "@/hooks/use-gsap";
import { type HTMLAttributes } from "react";

interface GsapTextRevealProps extends HTMLAttributes<HTMLElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  splitType?: "words" | "chars";
  stagger?: number;
  duration?: number;
  y?: number;
  delay?: number;
  children: string;
}

export const GsapTextReveal = ({
  as: Tag = "div",
  splitType = "words",
  stagger = 0.04,
  duration = 0.8,
  y = 60,
  delay = 0,
  children,
  ...rest
}: GsapTextRevealProps) => {
  const ref = useGsapTextReveal({ splitType, stagger, duration, y, delay });

  return (
    <Tag ref={ref as React.RefObject<HTMLElement & HTMLDivElement & HTMLHeadingElement & HTMLParagraphElement & HTMLSpanElement>} {...rest}>
      {children}
    </Tag>
  );
};
