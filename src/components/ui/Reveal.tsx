import { forwardRef, type ReactNode } from "react";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";

interface RevealProps {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right";
  variant?: "clip" | "word-stagger";
  delay?: number;
  duration?: number;
  className?: string;
}

const clipPaths: Record<string, { hidden: string; visible: string }> = {
  up:    { hidden: "inset(0 0 100% 0)", visible: "inset(0 0 0% 0)" },
  down:  { hidden: "inset(100% 0 0 0)", visible: "inset(0 0 0% 0)" },
  left:  { hidden: "inset(0 100% 0 0)", visible: "inset(0 0 0 0)" },
  right: { hidden: "inset(0 0 0 100%)", visible: "inset(0 0 0 0)" },
};

const EASE = [0.76, 0, 0.24, 1] as const;

const WordStagger = ({
  children,
  delay = 0,
  duration = 0.7,
  className = "",
}: Pick<RevealProps, "children" | "delay" | "duration" | "className">) => {
  const text = typeof children === "string" ? children : "";
  if (!text) return <span className={className}>{children}</span>;

  const words = text.split(" ");

  return (
    <motion.span
      className={`inline-flex flex-wrap gap-x-[0.25em] ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.05, delayChildren: delay } },
      }}
    >
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className="inline-block whitespace-nowrap font-bold tracking-tight"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration, ease: EASE },
            },
          }}
        >
          <span>{word}</span>
        </motion.span>
      ))}
    </motion.span>
  );
};

const Reveal = forwardRef<HTMLDivElement, RevealProps>(({
  children,
  direction = "up",
  variant = "clip",
  delay = 0,
  duration = 0.7,
  className = "",
}, _forwardedRef) => {
  const prefersReduced = usePrefersReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  if (variant === "word-stagger") {
    return (
      <WordStagger delay={delay} duration={duration} className={className}>
        {children}
      </WordStagger>
    );
  }

  const clip = clipPaths[direction];

  return (
    <motion.div
      className={className}
      initial={{ clipPath: clip.hidden, opacity: 0 }}
      whileInView={{ clipPath: clip.visible, opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
};

export { Reveal };
