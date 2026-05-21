import { Shield, Plane, Car, HeartPulse, Lock } from "lucide-react";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";
import { HexPrecisionBg } from "./r3f/HexPrecisionBg";

const certifications = [
  {
    name: "ISO 9001:2015",
    description: "Kalite Yönetim Sistemi",
    icon: Shield,
  },
  {
    name: "AS9100D",
    description: "Havacılık Kalite Standardı",
    icon: Plane,
  },
  {
    name: "IATF 16949",
    description: "Otomotiv Kalite Standardı",
    icon: Car,
  },
  {
    name: "ISO 13485",
    description: "Medikal Cihaz Kalitesi",
    icon: HeartPulse,
  },
  {
    name: "NIST 800-171",
    description: "Siber Güvenlik Uyumu",
    icon: Lock,
  },
];

const VENETIAN_STRIPS = 6;

export const CertificationsSection = () => {
  const prefersReduced = usePrefersReducedMotion();

  const gridContent = (
    <div className="container-industrial py-12 md:py-16">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-px bg-white/10">
        {certifications.map((cert, i) => (
          <motion.div
            key={cert.name}
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{
              duration: 0.6,
              delay: i * 0.07,
              ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
            }}
            className="group relative flex flex-col items-center justify-center text-center p-6 md:p-8 transition-colors duration-500"
            style={{ backgroundColor: "hsl(var(--forge-iron))" }}
          >
            <div
              className="w-12 h-12 md:w-14 md:h-14 mb-4 flex items-center justify-center transition-all duration-500 group-hover:bg-white/10"
              style={{
                border: "1px solid rgba(255,255,255,0.14)",
                backgroundColor: "rgba(255,255,255,0.04)",
              }}
            >
              <cert.icon
                className="w-6 h-6 md:w-7 md:h-7 transition-colors duration-500 group-hover:text-[hsl(var(--forge-molten))]"
                style={{ color: "hsl(var(--forge-silver) / 0.7)" }}
                strokeWidth={1.5}
              />
            </div>
            <span
              className="text-sm md:text-base font-bold uppercase tracking-[0.12em] mb-1.5 opacity-90 group-hover:opacity-100 transition-opacity"
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                color: "hsl(var(--forge-silver))",
              }}
            >
              {cert.name}
            </span>
            <span
              className="text-[10px] md:text-[11px] uppercase tracking-[0.15em] leading-snug"
              style={{ color: "hsl(var(--forge-silver) / 0.5)" }}
            >
              {cert.description}
            </span>
            <span
              className="absolute top-2 right-2 text-[9px] font-mono"
              style={{ color: "hsl(var(--forge-silver) / 0.25)" }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );

  return (
    <section
      id="sertifikalar"
      className="section-industrial min-h-screen flex flex-col justify-center border-y border-border overflow-hidden relative"
      style={{ backgroundColor: "hsl(var(--forge-iron))" }}
    >
      <style>{`
        /* .dark #sertifikalar { background-color: hsl(var(--forge-iron)) !important; } */
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .cert-marquee-track {
          animation: marquee 30s linear infinite;
        }
        .cert-marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.02) 0%, transparent 50%, rgba(255,255,255,0.01) 100%)",
        }}
      />
      <HexPrecisionBg opacity={0.12} className="absolute inset-0 z-0" />

      {/* Venetian blind reveal: colored strips that slide away to reveal marquee */}
      <div className="relative">
        {gridContent}
        {Array.from({ length: VENETIAN_STRIPS }).map((_, idx) => (
          <motion.div
            key={idx}
            className="absolute left-0 right-0 pointer-events-none z-10"
            style={{
              top: `${(idx / VENETIAN_STRIPS) * 100}%`,
              height: `${100 / VENETIAN_STRIPS}%`,
              backgroundColor: "hsl(var(--forge-iron))",
              willChange: "clip-path",
            }}
            initial={prefersReduced ? { clipPath: "inset(0 0 100% 0)" } : { clipPath: "inset(0 0 0% 0)" }}
            whileInView={{ clipPath: "inset(0 0 100% 0)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.5,
              delay: idx * 0.08,
              ease: [0.76, 0, 0.24, 1] as [number, number, number, number],
            }}
          />
        ))}
      </div>
    </section>
  );
};
