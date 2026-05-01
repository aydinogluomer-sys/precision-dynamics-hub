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
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        padding: "14px 0",
        background: "rgba(0,0,0,0.2)",
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
              color: "rgba(255,255,255,0.35)",
              whiteSpace: "nowrap",
            }}
          >
            {term}
            <span style={{ margin: "0 24px", color: "rgba(255,255,255,0.12)" }}>•</span>
          </span>
        ))}
      </div>
    </div>
  );
};
