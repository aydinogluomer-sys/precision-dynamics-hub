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
    color: "hsl(var(--accent-warm))",
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
    color: "hsl(var(--accent-slate))",
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
    color: "hsl(var(--accent-copper))",
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

  const headerOpacity = useTransform(scrollYProgress, [0, 0.08], [0, 1]);
  const headerY = useTransform(scrollYProgress, [0, 0.08], [40, 0]);

  const card0Opacity = useTransform(scrollYProgress, [0.08, 0.18], [0, 1]);
  const card0Y = useTransform(scrollYProgress, [0.08, 0.18], [60, 0]);
  const card0Specs = useTransform(scrollYProgress, [0.16, 0.22], [0, 1]);

  const card1Opacity = useTransform(scrollYProgress, [0.2, 0.3], [0, 1]);
  const card1Y = useTransform(scrollYProgress, [0.2, 0.3], [60, 0]);
  const card1Specs = useTransform(scrollYProgress, [0.28, 0.34], [0, 1]);

  const card2Opacity = useTransform(scrollYProgress, [0.32, 0.42], [0, 1]);
  const card2Y = useTransform(scrollYProgress, [0.32, 0.42], [60, 0]);
  const card2Specs = useTransform(scrollYProgress, [0.4, 0.46], [0, 1]);

  const card3Opacity = useTransform(scrollYProgress, [0.44, 0.54], [0, 1]);
  const card3Y = useTransform(scrollYProgress, [0.44, 0.54], [60, 0]);
  const card3Specs = useTransform(scrollYProgress, [0.52, 0.58], [0, 1]);

  const cardAnimations = [
    { opacity: card0Opacity, y: card0Y, specs: card0Specs },
    { opacity: card1Opacity, y: card1Y, specs: card1Specs },
    { opacity: card2Opacity, y: card2Y, specs: card2Specs },
    { opacity: card3Opacity, y: card3Y, specs: card3Specs },
  ];

  const badgesOpacity = useTransform(scrollYProgress, [0.6, 0.7], [0, 1]);
  const badgesY = useTransform(scrollYProgress, [0.6, 0.7], [30, 0]);

  if (isMobile) {
    return (
      <section id="malzemeler" className="py-16 px-4 bg-section-cool dark:bg-section-dark">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-xs font-semibold uppercase tracking-[0.4em] mb-3 block text-primary">
              Malzeme
            </span>
            <h2 className="text-2xl font-bold text-foreground mb-3">Çalıştığımız Malzemeler</h2>
            <p className="text-sm max-w-lg mx-auto text-foreground/60">
              50'den fazla malzeme ve alaşım seçeneği ile endüstriyel ihtiyaçlarınıza çözüm
            </p>
          </motion.div>
          <div className="grid grid-cols-2 gap-3 mb-8">
            {materials.map((mat, i) => (
              <motion.div
                key={mat.name}
                className="relative h-[220px] overflow-hidden border border-border/30"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="absolute inset-0 z-10">
                  <img src={mat.image} alt={mat.name} className="w-full h-full object-cover" loading="lazy" />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.1) 100%)",
                    }}
                  />
                </div>
                <div className="absolute inset-0 p-4 flex flex-col justify-end z-20">
                  <div className="w-8 h-1 mb-3" style={{ background: mat.color }} />
                  <h3 className="text-lg font-bold text-white mb-1">{mat.name}</h3>
                  <div className="text-[9px] tracking-[0.2em] mb-3 font-mono text-white/50">{mat.typeCode}</div>
                  <div className="pt-3 border-t border-white/10">
                    {mat.specs.map((spec) => (
                      <div key={spec.label} className="flex justify-between mb-1.5 font-mono" style={{ fontSize: "9px" }}>
                        <span className="text-white/60">{spec.label}</span>
                        <span className="text-white font-medium">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div
            className="flex flex-wrap justify-center items-center gap-4 pt-4 border-t border-border/30"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {badges.map((badge) => (
              <span key={badge} className="inline-flex items-center gap-1.5 text-xs text-foreground/80">
                <Check className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                {badge}
              </span>
            ))}
            <a
              href="/malzemeler"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline transition-colors"
            >
              Malzeme Kütüphanesi →
            </a>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <div ref={containerRef} className="relative" style={{ height: "400vh" }}>
      <section
        id="malzemeler"
        className="sticky top-0 h-screen overflow-hidden flex flex-col justify-start pt-16 md:pt-20 bg-section-cool dark:bg-section-dark"
      >
        {/* Subtle grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, hsl(var(--border) / 0.2) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--border) / 0.2) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="container mx-auto px-4 md:px-8 relative z-10 max-w-7xl">
          <motion.div className="text-center mb-8 md:mb-12" style={{ opacity: headerOpacity, y: headerY }}>
            <span className="text-xs font-semibold uppercase tracking-[0.4em] mb-3 block text-primary">
              İŞLENEN MALZEMELER
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Çalıştığımız Malzemeler</h2>
            <p className="text-base max-w-lg mx-auto text-foreground/60">
              50'den fazla materyal seçeneği ile projelerinizin teknik gereksinimlerine ve sektör standartlarına yanıt
              veren geniş hammadde kütüphanesi
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 md:mb-12">
            {materials.map((mat, i) => (
              <MaterialCard key={mat.name} mat={mat} index={i} anim={cardAnimations[i]} />
            ))}
          </div>
          <motion.div
            className="flex flex-wrap justify-center items-center gap-6 pt-6 border-t border-border/30"
            style={{ opacity: badgesOpacity, y: badgesY }}
          >
            {badges.map((badge, i) => (
              <span key={badge} className="inline-flex items-center gap-2 text-sm text-foreground/80">
                <Check className="w-4 h-4 text-primary flex-shrink-0" />
                {badge}
                {i < 2 && <span className="ml-4 text-foreground/20">·</span>}
              </span>
            ))}
            <a
              href="/malzemeler"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline transition-colors ml-2"
            >
              Malzeme Kütüphanesi →
            </a>
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
      className="relative h-[380px] md:h-[420px] overflow-hidden border border-border/30"
      style={{
        opacity: anim.opacity,
        y: anim.y,
      }}
    >
      {/* Background image — revealed by scroll */}
      <motion.div className="absolute inset-0 z-10" style={{ opacity: anim.specs }}>
        <img src={mat.image} alt={mat.name} className="w-full h-full object-cover" loading="lazy" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.15) 100%)",
          }}
        />
      </motion.div>

      {/* Fallback background for before image loads */}
      <div className="absolute inset-0 bg-card" />

      {/* Index */}
      <div className="absolute top-0 right-0 p-6 text-[10px] z-20 font-mono text-foreground/20">
        {String(index + 1).padStart(2, "0")}
      </div>

      {/* Content */}
      <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end z-20">
        <div className="w-12 h-1 mb-6" style={{ background: mat.color }} />
        <h3 className="text-2xl font-bold text-white mb-2 leading-tight">{mat.name}</h3>
        <div className="text-[10px] tracking-[0.2em] mb-6 font-mono text-white/50">{mat.typeCode}</div>

        {/* Specs — revealed by scroll */}
        <motion.div className="pt-6 border-t border-white/10" style={{ opacity: anim.specs }}>
          {mat.specs.map((spec) => (
            <div key={spec.label} className="flex justify-between mb-3 font-mono" style={{ fontSize: "10px" }}>
              <span className="text-white/60">{spec.label}</span>
              <span className="text-white font-medium">{spec.value}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MaterialsSection;
