import { Reveal } from "@/components/ui/Reveal";

interface SectionHeaderProps {
  tag: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  titleClassName?: string;
}

const SectionHeader = ({
  tag,
  title,
  description,
  align = "left",
  titleClassName,
}: SectionHeaderProps) => {
  const isCenter = align === "center";

  return (
    <div className={isCenter ? "text-center" : ""}>
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
      <Reveal variant="word-stagger" delay={0.1} duration={0.6}>
        <h2
          className={
            titleClassName ||
            "text-3xl md:text-5xl font-bold tracking-tight mb-4"
          }
        >
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal direction="up" delay={0.3} duration={0.5}>
          <p className="text-sm text-foreground/60 max-w-lg leading-relaxed">
            <span>{description}</span>
          </p>
        </Reveal>
      )}
    </div>
  );
};

export default SectionHeader;
