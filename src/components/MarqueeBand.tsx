const TERMS = [
  "HASSAS ÜRETİM",
  "CNC FREZELEME",
  "5 EKSEN TORNA",
  "Ti-6Al-4V",
  "EDM KESİM",
  "Inconel 718",
  "±0.002mm TOLERANS",
  "H13 TAKIM ÇELİĞİ",
  "PPAP SERTİFİKASYON",
  "AEROSPACE GRADE",
];

interface MarqueeBandProps {
  reverse?: boolean;
  className?: string;
}

export const MarqueeBand = ({ reverse = false, className = "" }: MarqueeBandProps) => {
  const content = [...TERMS, ...TERMS];

  return (
    <div
      className={`marquee-outer ${className}`}
      style={{
        overflow: "hidden",
        borderTop: "1px solid var(--surface-border)",
        borderBottom: "1px solid var(--surface-border)",
        padding: "14px 0",
        background: "var(--overlay-vignette-light)",
      }}
    >
      <div className={reverse ? "marquee-inner marquee-reverse" : "marquee-inner"}>
        {content.map((term, i) => (
          <span
            key={i}
            style={{
              fontFamily: "IBM Plex Mono, monospace",
              fontSize: "clamp(10px, 1.5vw, 13px)",
              letterSpacing: "0.25em",
              color: "var(--text-muted)",
              whiteSpace: "nowrap",
            }}
          >
            {term}
            <span style={{ margin: "0 24px", color: "var(--text-hint)" }}>•</span>
          </span>
        ))}
      </div>
    </div>
  );
};
