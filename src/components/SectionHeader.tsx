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
    <Reveal direction="up" duration={0.6}>
      <div className={isCenter ? "text-center" : ""}>
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
        <h2
          className={
            titleClassName ||
            "text-3xl md:text-5xl font-bold tracking-tight mb-4"
          }
        >
          <span>{title}</span>
        </h2>
        {description && (
          <p className="text-sm text-foreground/60 max-w-lg leading-relaxed">
            <span>{description}</span>
          </p>
        )}
      </div>
    </Reveal>
  );
};

export default SectionHeader;
