import { cn } from "@/lib/utils";
import React, { type ReactNode } from "react";

interface AuroraBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center transition-bg",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={cn(
            `
            [--aurora:repeating-linear-gradient(100deg,var(--forge-teal-raw,0_113_144)_10%,var(--forge-molten-raw,217_72_15)_15%,var(--forge-amber-raw,245_158_11)_20%,var(--forge-teal-raw,0_113_144)_25%,var(--forge-ember-raw,180_83_9)_30%)]
            [background-image:var(--aurora)]
            [background-size:300%,_200%]
            [background-position:50%_50%,50%_50%]
            filter
            blur-[10px]
            invert
            dark:invert-0
            after:content-[""]
            after:absolute
            after:inset-0
            after:[background-image:var(--aurora)]
            after:[background-size:200%,_100%]
            after:animate-aurora
            after:mix-blend-difference
            after:[background-attachment:fixed]
            after:filter
            after:blur-[10px]
            pointer-events-none
            absolute
            -inset-[10px]
            opacity-50
            will-change-transform`,
            showRadialGradient &&
              `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]`
          )}
        />
      </div>
      {children}
    </div>
  );
};
