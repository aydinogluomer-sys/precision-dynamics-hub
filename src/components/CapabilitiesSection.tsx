import { Monitor, Ruler, CheckCircle, TrendingUp, Check } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const capabilities = [
  {
    icon: Monitor,
    title: "Makine Parkuru",
    color: "hsl(var(--primary))",
    items: [
      { label: "5 Eksen CNC Freze", value: "DMG MORI, Mazak" },
      { label: "CNC Torna", value: "Doosan, Haas" },
      { label: "EDM/Tel Erozyon", value: "Sodick, Makino" },
      { label: "Taşlama", value: "Studer, Kellenberger" },
    ],
  },
  {
    icon: Ruler,
    title: "Tolerans Aralıkları",
    color: "#EA580C",
    items: [
      { label: "Standart Tolerans", value: "±0.05mm" },
      { label: "Hassas Tolerans", value: "±0.01mm" },
      { label: "Ultra Hassas", value: "±0.005mm" },
      { label: "Yüzey Kalitesi", value: "Ra 0.4 µm" },
    ],
  },
  {
    icon: CheckCircle,
    title: "CMM & Kalite Kontrol",
    color: "#64748B",
    items: [
      { label: "CMM Ölçüm", value: "Zeiss, Hexagon" },
      { label: "Optik Ölçüm", value: "Keyence, OGP" },
      { label: "Yüzey Pürüzlülük", value: "Mitutoyo" },
      { label: "Sertlik Testi", value: "Rockwell, Brinell" },
    ],
  },
  {
    icon: TrendingUp,
    title: "Üretim Kapasitesi",
    color: "#D97706",
    items: [
      { label: "Prototip", value: "1-10 adet" },
      { label: "Küçük Seri", value: "10-100 adet" },
      { label: "Orta Seri", value: "100-1000 adet" },
      { label: "Seri Üretim", value: "1000+ adet" },
    ],
  },
];

const badges = ["50+ CNC Tezgah", "7/24 Üretim Kapasitesi", "ISO 9001 Kalite Sistemi"];

const CapabilitiesSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Header
  const headerOpacity = useTransform(scrollYProgress, [0, 0.08], [0, 1]);
  const headerY = useTransform(scrollYProgress, [0, 0.08], [40, 0]);

  // Each card gets its own reveal window
  const card0Opacity = useTransform(scrollYProgress, [0.08, 0.18], [0, 1]);
  const card0Y = useTransform(scrollYProgress, [0.08, 0.18], [60, 0]);
  const card0Specs = useTransform(scrollYProgress, [0.16, 0.22], [0, 1]);

  const card1Opacity = useTransform(scrollYProgress, [0.20, 0.30], [0, 1]);
  const card1Y = useTransform(scrollYProgress, [0.20, 0.30], [60, 0]);
  const card1Specs = useTransform(scrollYProgress, [0.28, 0.34], [0, 1]);

  const card2Opacity = useTransform(scrollYProgress, [0.32, 0.42], [0, 1]);
  const card2Y = useTransform(scrollYProgress, [0.32, 0.42], [60, 0]);
  const card2Specs = useTransform(scrollYProgress, [0.40, 0.46], [0, 1]);

  const card3Opacity = useTransform(scrollYProgress, [0.44, 0.54], [0, 1]);
  const card3Y = useTransform(scrollYProgress, [0.44, 0.54], [60, 0]);
  const card3Specs = useTransform(scrollYProgress, [0.52, 0.58], [0, 1]);

  const cardAnimations = [
    { opacity: card0Opacity, y: card0Y, specs: card0Specs },
    { opacity: card1Opacity, y: card1Y, specs: card1Specs },
    { opacity: card2Opacity, y: card2Y, specs: card2Specs },
    { opacity: card3Opacity, y: card3Y, specs: card3Specs },
  ];

  // Badges
  const badgesOpacity = useTransform(scrollYProgress, [0.60, 0.70], [0, 1]);
  const badgesY = useTransform(scrollYProgress, [0.60, 0.70], [30, 0]);

  return (
    <div ref={containerRef} className="relative" style={{ height: "400vh" }}>
      <section
        id="kabiliyetler"
        className="sticky top-0 h-screen overflow-hidden flex items-center"
        style={{ backgroundColor: "#020617" }}
      >
        {/* Blueprint grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(6, 136, 173, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(6, 136, 173, 0.04) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(circle at 30% 70%, rgba(6, 136, 173, 0.12) 0%, transparent 50%)",
          }}
        />

        <div className="container mx-auto px-4 md:px-8 relative z-10 max-w-7xl">
          {/* Header */}
          <motion.div className="text-center mb-8 md:mb-12" style={{ opacity: headerOpacity, y: headerY }}>
            <span
              className="text-xs font-semibold uppercase tracking-[0.4em] mb-3 block"
              style={{ color: "hsl(var(--primary))" }}
            >
              Teknik
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Kabiliyetlerimiz
            </h2>
            <p className="text-base max-w-lg mx-auto" style={{ color: "rgba(255, 255, 255, 0.6)" }}>
              İleri teknoloji makine parkuru ve hassas ölçüm sistemleri ile endüstriyel çözümler
            </p>
          </motion.div>

          {/* Cards Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 md:mb-12">
            {capabilities.map((cap, i) => (
              <CapabilityCard key={cap.title} cap={cap} index={i} anim={cardAnimations[i]} />
            ))}
          </div>

          {/* Bottom badges */}
          <motion.div
            className="flex flex-wrap justify-center items-center gap-6 pt-6"
            style={{ borderTop: "1px solid rgba(255, 255, 255, 0.1)", opacity: badgesOpacity, y: badgesY }}
          >
            {badges.map((badge, i) => (
              <span
                key={badge}
                className="inline-flex items-center gap-2 text-sm"
                style={{ color: "rgba(255, 255, 255, 0.85)" }}
              >
                <Check className="w-4 h-4 text-primary flex-shrink-0" />
                {badge}
                {i < 2 && (
                  <span className="ml-4" style={{ color: "rgba(255, 255, 255, 0.3)" }}>·</span>
                )}
              </span>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

/* ── Individual Card ── */
interface CardProps {
  cap: (typeof capabilities)[number];
  index: number;
  anim: { opacity: any; y: any; specs: any };
}

const CapabilityCard = ({ cap, index, anim }: CardProps) => {
  return (
    <motion.div
      className="relative h-[380px] md:h-[420px] overflow-hidden"
      style={{
        opacity: anim.opacity,
        y: anim.y,
        background: "rgba(15, 23, 42, 0.5)",
        border: "1px solid rgba(255, 255, 255, 0.05)",
      }}
    >
      {/* Index */}
      <div
        className="absolute top-0 right-0 p-6 text-[10px] z-20 font-mono"
        style={{ color: "#1e293b" }}
      >
        {String(index + 1).padStart(2, "0")}
      </div>

      {/* Content */}
      <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end z-20">
        <div className="w-12 h-1 mb-6" style={{ background: cap.color }} />

        <motion.div
          className="w-10 h-10 mb-4 flex items-center justify-center"
          style={{ opacity: anim.specs }}
        >
          <cap.icon className="w-8 h-8" style={{ color: cap.color }} />
        </motion.div>

        <h3 className="text-2xl font-bold text-white mb-2 leading-tight">{cap.title}</h3>

        {/* Specs — revealed by scroll */}
        <motion.div
          className="pt-6"
          style={{ borderTop: "1px solid rgba(255, 255, 255, 0.1)", opacity: anim.specs }}
        >
          {cap.items.map((item) => (
            <div
              key={item.label}
              className="flex justify-between mb-3 font-mono"
              style={{ fontSize: "10px" }}
            >
              <span style={{ color: "#94a3b8" }}>{item.label}</span>
              <span className="text-white font-medium">{item.value}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CapabilitiesSection;
