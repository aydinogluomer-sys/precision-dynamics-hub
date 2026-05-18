import { forwardRef } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { motion, useReducedMotion } from "framer-motion";

interface SectionHeaderProps {
  tag: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  titleClassName?: string;
  sectionNumber?: number;
}

const toKebab = (str: string) =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9À-ɏ]+/gi, "-")
    .replace(/(^-|-$)/g, "");

const formatNumber = (n: number) => `— ${n.toString().padStart(2, "0")}`;

// Polygon clip-path wipe left→right (ref-fullstack BenefitSection pattern)
const POLY_HIDDEN = "polygon(0 0, 0 0, 0 100%, 0% 100%)";
const POLY_VISIBLE = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";

export const SectionHeader = forwardRef<HTMLDivElement, SectionHeaderProps>(
  ({ tag, title, description, align = "left", titleClassName, sectionNumber }, ref) => {
    const isCenter = align === "center";
    const headingId = `section-${toKebab(tag)}`;
    const hasNumber = typeof sectionNumber === "number";
    const prefersReduced = useReducedMotion();

    return (
      <div ref={ref} className={isCenter ? "text-center" : ""}>
        <Reveal direction="up" duration={0.5}>
          <div className={`flex items-center gap-3 mb-4 ${isCenter ? "justify-center" : ""}`}>
            <div className="w-8 h-px bg-primary" />
            <span className="text-[10px] uppercase tracking-[0.5em] font-mono text-primary font-semibold">{tag}</span>
            {hasNumber && !isCenter && (
              <>
                <div className="flex-1" />
                <span className="text-xs font-mono tracking-widest text-muted-foreground/60 select-none">
                  {formatNumber(sectionNumber)}
                </span>
              </>
            )}
          </div>
        </Reveal>

        <h2
          id={headingId}
          className={
            titleClassName ||
            "text-display-2 mb-4 text-foreground aw-optical-x"
          }
        >
          {title.split(' ').map((word, i) => (
            <motion.span
              key={i}
              className="inline-block mr-[0.3em] overflow-hidden"
              initial={prefersReduced ? false : { clipPath: POLY_HIDDEN, opacity: 0 }}
              whileInView={prefersReduced ? {} : { clipPath: POLY_VISIBLE, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.08 + i * 0.09,
                duration: 0.65,
                ease: [0.76, 0, 0.24, 1],
              }}
            >
              {word}
            </motion.span>
          ))}
        </h2>

        {description && (
          <Reveal direction="up" delay={0.3} duration={0.5}>
            <p className="text-base md:text-lg max-w-xl leading-relaxed text-neutral-400">{description}</p>
          </Reveal>
        )}
      </div>
    );
  }
);

SectionHeader.displayName = "SectionHeader";
