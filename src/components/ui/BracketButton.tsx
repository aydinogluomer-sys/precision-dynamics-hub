import { type ReactNode, type ElementType } from "react";

interface BracketButtonProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  onClick?: () => void;
  href?: string;
}

export const BracketButton = ({
  children,
  as: Component = "button",
  className = "",
  ...props
}: BracketButtonProps) => {
  return (
    <Component
      className={`group inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground font-mono text-sm uppercase tracking-[0.18em] transition-all duration-300 hover:border-primary hover:text-primary ${className}`}
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
};
