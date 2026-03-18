const certifications = [
  "ISO 9001:2015",
  "AS9100D",
  "IATF 16949",
  "ISO 13485",
  "NIST 800-171",
];

const separator = " · ";
const marqueeContent = certifications.flatMap((cert, i) => [
  cert,
  ...(i < certifications.length - 1 ? [separator] : [separator]),
]);

const CertificationsSection = () => {
  return (
    <section
      id="sertifikalar"
      className="py-6 border-y border-border overflow-hidden"
      style={{ backgroundColor: "hsl(var(--forge-iron))" }}
    >
      <style>{`
        .dark #sertifikalar { background-color: hsl(var(--forge-iron)) !important; }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .marquee-track {
          animation: marquee 30s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>
      <div className="relative">
        <div className="marquee-track flex whitespace-nowrap">
          {/* Render content 2x for seamless loop */}
          {[...marqueeContent, ...marqueeContent].map((item, i) => (
            <span
              key={i}
              className="text-3xl md:text-4xl font-bold uppercase tracking-[0.15em] opacity-50 cursor-default mx-5"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                color: "hsl(var(--forge-silver))",
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
