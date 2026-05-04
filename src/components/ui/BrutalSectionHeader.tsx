import { forwardRef } from "react";
import { motion } from "framer-motion";
import { useClipReveal } from "@/hooks/useClipReveal";

interface BrutalSectionHeaderProps {
  /** Mono index, e.g. "02 / 17" */
  index: string;
  /** Mega editorial headline (ALL CAPS recommended) */
  headline: string;
  /** Right-aligned mono meta label */
  meta?: string;
  /** Optional eyebrow line above headline */
  eyebrow?: string;
  className?: string;
}

const wordVariants = {
  hidden: { y: "100%", opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { delay: i * 0.05, duration: 0.7, ease: [0.76, 0, 0.24, 1] },
  }),
};

export const BrutalSectionHeader = forwardRef<HTMLDivElement, BrutalSectionHeaderProps>(
  ({ index, headline, meta, eyebrow, className = "" }, fwdRef) => {
    const { ref, style } = useClipReveal<HTMLDivElement>();
    const words = headline.split(" ");

    return (
      <div ref={fwdRef} className={`w-full ${className}`}>
        {/* Top mono bar */}
        <div
          className="flex items-center justify-between border-t border-foreground/15 pt-3 mb-8 md:mb-12 font-mono text-[11px] tracking-[0.25em] uppercase text-foreground/60"
        >
          <span>[{index}]</span>
          {eyebrow && <span className="hidden md:inline">{eyebrow}</span>}
          {meta && <span>{meta}</span>}
        </div>

        {/* Mega headline with word-stagger */}
        <div ref={ref} style={style} className="overflow-hidden">
          <h2
            className="font-mono font-bold uppercase leading-[0.85] tracking-[-0.04em] text-foreground"
            style={{ fontSize: "clamp(2.5rem, 9vw, 8rem)" }}
          >
            {words.map((word, i) => (
              <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.25em]">
                <motion.span
                  className="inline-block"
                  custom={i}
                  variants={wordVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.4 }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h2>
        </div>

        {/* Bottom hairline */}
        <div className="border-b border-foreground/15 mt-8 md:mt-12" />
      </div>
    );
  },
);

BrutalSectionHeader.displayName = "BrutalSectionHeader";