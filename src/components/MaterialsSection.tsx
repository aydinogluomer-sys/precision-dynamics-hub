import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Check } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import materialAluminium from "@/assets/material-aluminium.jpg";
import materialSteel from "@/assets/material-steel.jpg";
import materialStainless from "@/assets/material-stainless.jpg";
import materialBrass from "@/assets/material-brass.jpg";

const materials = [
  {
    name: "Alüminyum",
    typeCode: "6061-T6 / 7075-T6 / 2024",
    color: "hsl(var(--primary))",
    image: materialAluminium,
    specs: [
      { label: "SERTLIK", value: "95 HB" },
      { label: "YOĞUNLUK", value: "2.7 g/cm³" },
      { label: "ÇEKME", value: "310 MPa" },
    ],
  },
  {
    name: "Çelik",
    typeCode: "1045 / 4140 / A36",
    color: "#EA580C",
    image: materialSteel,
    specs: [
      { label: "SERTLIK", value: "201 HB" },
      { label: "YOĞUNLUK", value: "7.85 g/cm³" },
      { label: "ÇEKME", value: "585 MPa" },
    ],
  },
  {
    name: "Paslanmaz",
    typeCode: "304 / 316L / 17-4 PH",
    color: "#64748B",
    image: materialStainless,
    specs: [
      { label: "SERTLIK", value: "201 HB" },
      { label: "YOĞUNLUK", value: "8.0 g/cm³" },
      { label: "ÇEKME", value: "515 MPa" },
    ],
  },
  {
    name: "Pirinç",
    typeCode: "C360 / C260 / C280",
    color: "#D97706",
    image: materialBrass,
    specs: [
      { label: "SERTLIK", value: "78 HB" },
      { label: "YOĞUNLUK", value: "8.5 g/cm³" },
      { label: "ÇEKME", value: "338 MPa" },
    ],
  },
];

const badges = ["50+ Malzeme Seçeneği", "Sertifikalı Tedarikçiler", "Malzeme Test Raporları"];

const MaterialsSection = () => {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Header
  const headerOpacity = useTransform(scrollYProgress, [0, 0.08], [0, 1]);
  const headerY = useTransform(scrollYProgress, [0, 0.08], [40, 0]);

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

  const badgesOpacity = useTransform(scrollYProgress, [0.60, 0.70], [0, 1]);
  const badgesY = useTransform(scrollYProgress, [0.60, 0.70], [30, 0]);

  if (isMobile) {
    return (
      <section id="malzemeler" className="py-16 px-4" style={{ backgroundColor: "#020617" }}>
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-8" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="text-xs font-semibold uppercase tracking-[0.4em] mb-3 block" style={{ color: "hsl(var(--primary))" }}>Malzeme</span>
            <h2 className="text-2xl font-bold text-white mb-3">Çalıştığımız Malzemeler</h2>
            <p className="text-sm max-w-lg mx-auto" style={{ color: "rgba(255, 255, 255, 0.6)" }}>50'den fazla malzeme ve alaşım seçeneği ile endüstriyel ihtiyaçlarınıza çözüm</p>
          </motion.div>
          <div className="grid grid-cols-2 gap-3 mb-8">
            {materials.map((mat, i) => (
              <motion.div key={mat.name} className="relative h-[220px] overflow-hidden" style={{ background: "rgba(15, 23, 42, 0.5)", border: "1px solid rgba(255, 255, 255, 0.05)" }} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div className="absolute inset-0 z-10">
                  <img src={mat.image} alt={mat.name} className="w-full h-full object-cover" loading="lazy" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(2, 6, 23, 0.95) 0%, rgba(2, 6, 23, 0.4) 50%, rgba(2, 6, 23, 0.2) 100%)" }} />
                </div>
                <div className="absolute inset-0 p-4 flex flex-col justify-end z-20">
                  <div className="w-8 h-1 mb-3" style={{ background: mat.color }} />
                  <h3 className="text-lg font-bold text-white mb-1">{mat.name}</h3>
                  <div className="text-[9px] tracking-[0.2em] mb-3 font-mono" style={{ color: "#64748b" }}>{mat.typeCode}</div>
                  <div className="pt-3" style={{ borderTop: "1px solid rgba(255, 255, 255, 0.1)" }}>
                    {mat.specs.map((spec) => (
                      <div key={spec.label} className="flex justify-between mb-1.5 font-mono" style={{ fontSize: "9px" }}>
                        <span style={{ color: "#94a3b8" }}>{spec.label}</span>
                        <span className="text-white font-medium">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div className="flex flex-wrap justify-center items-center gap-4 pt-4" style={{ borderTop: "1px solid rgba(255, 255, 255, 0.1)" }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            {badges.map((badge) => (
              <span key={badge} className="inline-flex items-center gap-1.5 text-xs" style={{ color: "rgba(255, 255, 255, 0.85)" }}>
                <Check className="w-3.5 h-3.5 text-primary flex-shrink-0" />{badge}
              </span>
            ))}
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <div ref={containerRef} className="relative" style={{ height: "400vh" }}>
      <section
        id="malzemeler"
        className="sticky top-0 h-screen overflow-hidden flex flex-col justify-start pt-16 md:pt-20"
        style={{ backgroundColor: "#020617" }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(to right, rgba(6, 136, 173, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(6, 136, 173, 0.04) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at 30% 70%, rgba(6, 136, 173, 0.12) 0%, transparent 50%)" }} />
        <div className="container mx-auto px-4 md:px-8 relative z-10 max-w-7xl">
          <motion.div className="text-center mb-8 md:mb-12" style={{ opacity: headerOpacity, y: headerY }}>
            <span className="text-xs font-semibold uppercase tracking-[0.4em] mb-3 block" style={{ color: "hsl(var(--primary))" }}>Malzeme</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Çalıştığımız Malzemeler</h2>
            <p className="text-base max-w-lg mx-auto" style={{ color: "rgba(255, 255, 255, 0.6)" }}>50'den fazla malzeme ve alaşım seçeneği ile endüstriyel ihtiyaçlarınıza çözüm</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 md:mb-12">
            {materials.map((mat, i) => (
              <MaterialCard key={mat.name} mat={mat} index={i} anim={cardAnimations[i]} />
            ))}
          </div>
          <motion.div className="flex flex-wrap justify-center items-center gap-6 pt-6" style={{ borderTop: "1px solid rgba(255, 255, 255, 0.1)", opacity: badgesOpacity, y: badgesY }}>
            {badges.map((badge, i) => (
              <span key={badge} className="inline-flex items-center gap-2 text-sm" style={{ color: "rgba(255, 255, 255, 0.85)" }}>
                <Check className="w-4 h-4 text-primary flex-shrink-0" />{badge}
                {i < 2 && <span className="ml-4" style={{ color: "rgba(255, 255, 255, 0.3)" }}>·</span>}
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
  mat: (typeof materials)[number];
  index: number;
  anim: { opacity: any; y: any; specs: any };
}

const MaterialCard = ({ mat, index, anim }: CardProps) => {
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
      {/* Background image — revealed by scroll */}
      <motion.div className="absolute inset-0 z-10" style={{ opacity: anim.specs }}>
        <img
          src={mat.image}
          alt={mat.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(2, 6, 23, 0.95) 0%, rgba(2, 6, 23, 0.4) 50%, rgba(2, 6, 23, 0.2) 100%)",
          }}
        />
      </motion.div>

      {/* Index */}
      <div
        className="absolute top-0 right-0 p-6 text-[10px] z-20 font-mono"
        style={{ color: "#1e293b" }}
      >
        {String(index + 1).padStart(2, "0")}
      </div>

      {/* Content */}
      <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end z-20">
        <div className="w-12 h-1 mb-6" style={{ background: mat.color }} />
        <h3 className="text-2xl font-bold text-white mb-2 leading-tight">{mat.name}</h3>
        <div
          className="text-[10px] tracking-[0.2em] mb-6 font-mono"
          style={{ color: "#64748b" }}
        >
          {mat.typeCode}
        </div>

        {/* Specs — revealed by scroll */}
        <motion.div
          className="pt-6"
          style={{ borderTop: "1px solid rgba(255, 255, 255, 0.1)", opacity: anim.specs }}
        >
          {mat.specs.map((spec) => (
            <div
              key={spec.label}
              className="flex justify-between mb-3 font-mono"
              style={{ fontSize: "10px" }}
            >
              <span style={{ color: "#94a3b8" }}>{spec.label}</span>
              <span className="text-white font-medium">{spec.value}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MaterialsSection;
