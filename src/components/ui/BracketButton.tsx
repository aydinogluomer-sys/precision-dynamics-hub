import { forwardRef, type ReactNode, type ElementType } from "react";
import { useSoundEngine } from "@/hooks/use-sound";

interface BracketButtonProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  onClick?: () => void;
  href?: string;
}

export const BracketButton = forwardRef<HTMLElement, BracketButtonProps>(
  ({ children, as: Component = "button", className = "", onClick, ...props }, ref) => {
    const { play } = useSoundEngine();

    return (
      <Component
        ref={ref}
        className={`group inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground font-mono text-sm uppercase tracking-[0.18em] transition-all duration-300 hover:border-primary hover:text-primary ${className}`}
        onMouseEnter={() => play("tick")}
        onClick={() => {
          play("click");
          onClick?.();
        }}
        {...props}
      >
        <span className="inline-block transition-transform duration-300 group-hover:-translate-x-1 text-muted-foreground group-hover:text-primary">
          {"["}
        </span>
        <span>{children}</span>
        <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 text-muted-foreground group-hover:text-primary">
          {"]"}
        </span>
      </Component>
    );
  },
);

BracketButton.displayName = "BracketButton";
