import { Reveal } from "@/components/ui/Reveal";

interface SectionHeaderProps {
  tag: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  titleClassName?: string;
}

const toKebab = (str: string) =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9\u00C0-\u024F]+/gi, "-")
    .replace(/(^-|-$)/g, "");

export const SectionHeader = ({
  tag,
  title,
  description,
  align = "left",
  titleClassName,
}: SectionHeaderProps) => {
  const isCenter = align === "center";
  const headingId = `section-${toKebab(tag)}`;

  return (
    <div className={isCenter ? "text-center" : ""}>
      {/* Level 1: Tag — small, mono, primary accent */}
      <Reveal direction="up" duration={0.5}>
        <div
          className={`flex items-center gap-3 mb-4 ${
            isCenter ? "justify-center" : ""
          }`}
        >
          <div className="w-8 h-px bg-primary" />
          <span className="text-[10px] uppercase tracking-[0.5em] font-mono text-primary font-semibold">
            {tag}
          </span>
        </div>
      </Reveal>

      {/* Level 2: Title — large, bold, foreground */}
      <Reveal variant="word-stagger" delay={0.1} duration={0.6}>
        <h2
          id={headingId}
          className={
            titleClassName ||
            "text-4xl md:text-6xl font-bold tracking-tighter mb-4 leading-[0.95] text-foreground"
          }
        >
          {title}
        </h2>
      </Reveal>

      {/* Level 3: Description — medium, muted color */}
      {description && (
        <Reveal direction="up" delay={0.3} duration={0.5}>
          <p className="text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed">
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
};
