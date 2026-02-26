import { Target, RefreshCw, Clock, Wrench, Check, ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import qualityControl from "@/assets/quality-control.jpg";
import { TextReveal } from "./ScrollReveal";
import MagneticButton from "./MagneticButton";

const values = [
  {
    icon: Target,
    title: "Hassasiyet & Tolerans Disiplini",
    subtitle: "±0.01mm",
    description: "±0.01mm hassasiyetle çalışan CNC tezgahlarımız ve CMM ölçüm sistemimiz ile tolerans garantisi sağlıyoruz.",
    color: "hsl(var(--primary))",
  },
  {
    icon: RefreshCw,
    title: "Proses Kontrollü Üretim",
    subtitle: "100% İzlenebilirlik",
    description: "Her üretim adımı izlenir, kaydedilir ve raporlanır. Tekrarlanabilir kalite için sistematik yaklaşım.",
    color: "#EA580C",
  },
  {
    icon: Clock,
    title: "Zamanında Teslimat",
    subtitle: "98% Oran",
    description: "Söz verilen tarihte teslimat. Proje planınızı aksatmayacak güvenilir lojistik süreçleri.",
    color: "#64748B",
  },
  {
    icon: Wrench,
    title: "Mühendislik Desteği",
    subtitle: "24h Yanıt",
    description: "DFM analizi, malzeme seçimi ve tasarım optimizasyonu konularında uzman mühendislik desteği.",
    color: "#D97706",
  },
];

const badges = ["ISO 9001:2015 Sertifikalı", "24 Saat Teknik Destek", "Ücretsiz DFM Analizi", "Zamanında Teslimat Garantisi"];

const WhyUsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Header
  const headerOpacity = useTransform(scrollYProgress, [0, 0.08], [0, 1]);
  const headerY = useTransform(scrollYProgress, [0, 0.08], [40, 0]);

  // Image parallax
  const imageY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  // Each card gets its own reveal window
  const card0Opacity = useTransform(scrollYProgress, [0.08, 0.18], [0, 1]);
  const card0Y = useTransform(scrollYProgress, [0.08, 0.18], [60, 0]);
  const card0Detail = useTransform(scrollYProgress, [0.16, 0.22], [0, 1]);

  const card1Opacity = useTransform(scrollYProgress, [0.20, 0.30], [0, 1]);
  const card1Y = useTransform(scrollYProgress, [0.20, 0.30], [60, 0]);
  const card1Detail = useTransform(scrollYProgress, [0.28, 0.34], [0, 1]);

  const card2Opacity = useTransform(scrollYProgress, [0.32, 0.42], [0, 1]);
  const card2Y = useTransform(scrollYProgress, [0.32, 0.42], [60, 0]);
  const card2Detail = useTransform(scrollYProgress, [0.40, 0.46], [0, 1]);

  const card3Opacity = useTransform(scrollYProgress, [0.44, 0.54], [0, 1]);
  const card3Y = useTransform(scrollYProgress, [0.44, 0.54], [60, 0]);
  const card3Detail = useTransform(scrollYProgress, [0.52, 0.58], [0, 1]);

  const cardAnimations = [
    { opacity: card0Opacity, y: card0Y, detail: card0Detail },
    { opacity: card1Opacity, y: card1Y, detail: card1Detail },
    { opacity: card2Opacity, y: card2Y, detail: card2Detail },
    { opacity: card3Opacity, y: card3Y, detail: card3Detail },
  ];

  // Badges & CTA
  const badgesOpacity = useTransform(scrollYProgress, [0.60, 0.70], [0, 1]);
  const badgesY = useTransform(scrollYProgress, [0.60, 0.70], [30, 0]);

  return (
    <div ref={containerRef} className="relative" style={{ height: "400vh" }}>
      <section
        id="neden-biz"
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
            background: "radial-gradient(circle at 70% 30%, rgba(6, 136, 173, 0.12) 0%, transparent 50%)",
          }}
        />

        <div className="container mx-auto px-4 md:px-8 relative z-10 max-w-7xl">
          {/* Header */}
          <motion.div className="text-center mb-8 md:mb-12" style={{ opacity: headerOpacity, y: headerY }}>
            <span
              className="text-xs font-semibold uppercase tracking-[0.4em] mb-3 block"
              style={{ color: "hsl(var(--primary))" }}
            >
              Avantajlar
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Neden Mas Technic?
            </h2>
            <p className="text-base max-w-lg mx-auto" style={{ color: "rgba(255, 255, 255, 0.6)" }}>
              Hassasiyet, güvenilirlik ve mühendislik mükemmelliği ile fark yaratıyoruz
            </p>
          </motion.div>

          {/* Cards Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 md:mb-12">
            {values.map((value, i) => (
              <WhyUsCard key={value.title} value={value} index={i} anim={cardAnimations[i]} />
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
                {i < 3 && (
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
  value: (typeof values)[number];
  index: number;
  anim: { opacity: any; y: any; detail: any };
}

const WhyUsCard = ({ value, index, anim }: CardProps) => {
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
        <div className="w-12 h-1 mb-6" style={{ background: value.color }} />

        <motion.div
          className="w-12 h-12 mb-4 flex items-center justify-center"
          style={{ opacity: anim.detail }}
        >
          <value.icon className="w-10 h-10" style={{ color: value.color }} />
        </motion.div>

        <h3 className="text-xl font-bold text-white mb-1 leading-tight">{value.title}</h3>
        <div
          className="text-sm font-semibold font-mono mb-4"
          style={{ color: value.color }}
        >
          {value.subtitle}
        </div>

        {/* Description — revealed by scroll */}
        <motion.div
          className="pt-4"
          style={{ borderTop: "1px solid rgba(255, 255, 255, 0.1)", opacity: anim.detail }}
        >
          <p className="text-sm leading-relaxed" style={{ color: "#94a3b8" }}>
            {value.description}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default WhyUsSection;
