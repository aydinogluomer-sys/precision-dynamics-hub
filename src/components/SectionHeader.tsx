/**
 * SectionHeader.tsx — CLEAN SEPARATED
 *
 * FIX: Was concatenated inside GlowLineDivider.tsx file by Lovable.
 * Now standalone at src/components/SectionHeader.tsx
 */
import { Reveal } from "@/components/ui/Reveal";
import { motion } from "framer-motion";

interface SectionHeaderProps {
  tag: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  titleClassName?: string;
  /** Editorial section number — renders as "— 01" format */
  sectionNumber?: number;
}

const toKebab = (str: string) =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9\u00C0-\u024F]+/gi, "-")
    .replace(/(^-|-$)/g, "");

const formatNumber = (n: number) => `— ${n.toString().padStart(2, "0")}`;

export const SectionHeader = ({
  tag,
  title,
  description,
  align = "left",
  titleClassName,
  sectionNumber,
}: SectionHeaderProps) => {
  const isCenter = align === "center";
  const headingId = `section-${toKebab(tag)}`;
  const hasNumber = typeof sectionNumber === "number";

  return (
    <div className={isCenter ? "text-center" : ""}>
      {/* Tag row — with optional section number on the right */}
      <Reveal direction="up" duration={0.5}>
        <div className={`flex items-center gap-3 mb-4 ${isCenter ? "justify-center" : ""}`}>
          <div className="w-8 h-px bg-primary" />
          <span className="text-[10px] uppercase tracking-[0.5em] font-mono text-primary font-semibold">{tag}</span>
          {/* Section number — editorial style, pushed right */}
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

      {/* Title */}
      <Reveal variant="word-stagger" delay={0.1} duration={0.6}>
        <h2
          id={headingId}
          className={
            titleClassName || "text-4xl md:text-6xl font-bold tracking-tighter mb-4 leading-[0.95] text-foreground"
          }
        >
          {title}
        </h2>
      </Reveal>

      {/* Description */}
      {description && (
        <Reveal direction="up" delay={0.3} duration={0.5}>
          <p className="text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed">{description}</p>
        </Reveal>
      )}
    </div>
  );
};
