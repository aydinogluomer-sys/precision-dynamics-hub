import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Check, ArrowRight, Layers } from "lucide-react";
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
    tag: "En Popüler",
    specs: [
      { label: "SERTLIK", value: "95 HB" },
      { label: "YOĞUNLUK", value: "2.7 g/cm³" },
      { label: "ÇEKME", value: "310 MPa" },
    ],
    applications: ["Havacılık", "Otomotiv", "Elektronik"],
  },
  {
    name: "Çelik",
    typeCode: "1045 / 4140 / A36",
    color: "hsl(var(--accent-warm))",
    image: materialSteel,
    tag: "Yüksek Mukavemet",
    specs: [
      { label: "SERTLIK", value: "201 HB" },
      { label: "YOĞUNLUK", value: "7.85 g/cm³" },
      { label: "ÇEKME", value: "585 MPa" },
    ],
    applications: ["Makine", "Konstrüksiyon", "Kalıp"],
  },
  {
    name: "Paslanmaz",
    typeCode: "304 / 316L / 17-4 PH",
    color: "hsl(var(--accent-slate))",
    image: materialStainless,
    tag: "Korozyon Direnci",
    specs: [
      { label: "SERTLIK", value: "201 HB" },
      { label: "YOĞUNLUK", value: "8.0 g/cm³" },
      { label: "ÇEKME", value: "515 MPa" },
    ],
    applications: ["Medikal", "Gıda", "Kimya"],
  },
  {
    name: "Pirinç",
    typeCode: "C360 / C260 / C280",
    color: "hsl(var(--accent-copper))",
    image: materialBrass,
    tag: "Kolay İşlenir",
    specs: [
      { label: "SERTLIK", value: "78 HB" },
      { label: "YOĞUNLUK", value: "8.5 g/cm³" },
      { label: "ÇEKME", value: "338 MPa" },
    ],
    applications: ["Hidrolik", "Elektrik", "Dekoratif"],
  },
];

const badges = ["50+ Malzeme Seçeneği", "Sertifikalı Tedarikçiler", "Malzeme Test Raporları"];

/* ── Mobile Material Card ── */
const MobileMaterialCard = ({ mat, i }: { mat: typeof materials[number]; i: number }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      className="relative h-[240px] overflow-hidden border border-border/30 cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.1 }}
      onClick={() => setFlipped(!flipped)}
    >
      {/* Image background */}
      <div className="absolute inset-0 z-10">
        <img src={mat.image} alt={mat.name} className="w-full h-full object-cover" loading="lazy" />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.1) 100%)",
          }}
        />
      </div>

      {/* Tag */}
      <div className="absolute top-3 left-3 z-20">
        <span
          className="px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.15em] text-white/90 font-mono"
          style={{ background: mat.color, opacity: 0.9 }}
        >
          {mat.tag}
        </span>
      </div>

      {/* Flip indicator */}
      <div className="absolute top-3 right-3 z-20">
        <Layers className="w-3.5 h-3.5 text-white/40" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 p-4 flex flex-col justify-end z-20">
        <motion.div
          animate={{ opacity: flipped ? 0 : 1 }}
          transition={{ duration: 0.2 }}
          className={flipped ? "pointer-events-none" : ""}
        >
          <div className="w-8 h-1 mb-3" style={{ background: mat.color }} />
          <h3 className="text-lg font-bold text-white mb-1">{mat.name}</h3>
          <div className="text-[9px] tracking-[0.2em] mb-2 font-mono text-white/50">{mat.typeCode}</div>
          <div className="flex gap-1.5 flex-wrap">
            {mat.applications.map((app) => (
              <span key={app} className="text-[8px] px-1.5 py-0.5 border border-white/15 text-white/60 font-mono">
                {app}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="absolute inset-0 p-4 flex flex-col justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: flipped ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="pt-2">
            {mat.specs.map((spec) => (
              <div key={spec.label} className="flex justify-between mb-2 font-mono" style={{ fontSize: "10px" }}>
                <span className="text-white/60">{spec.label}</span>
                <span className="text-white font-semibold">{spec.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

/* ── Desktop Material Card ── */
const DesktopMaterialCard = ({ mat, index, anim }: {
  mat: typeof materials[number];
  index: number;
  anim: { opacity: ReturnType<typeof useTransform>; y: ReturnType<typeof useTransform>; specs: ReturnType<typeof useTransform> };
}) => {
  return (
    <motion.div
      className="relative h-[400px] md:h-[440px] overflow-hidden border border-border/30 group cursor-pointer"
      style={{ opacity: anim.opacity, y: anim.y }}
    >
      {/* Background image */}
      <motion.div className="absolute inset-0 z-10" style={{ opacity: anim.specs }}>
        <img
          src={mat.image}
          alt={mat.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div
          className="absolute inset-0 transition-all duration-500"
          style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.15) 100%)",
          }}
        />
      </motion.div>

      {/* Fallback background */}
      <div className="absolute inset-0 bg-card" />

      {/* Tag badge */}
      <div className="absolute top-4 left-4 z-20">
        <motion.span
          className="inline-block px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.15em] text-white/90 font-mono"
          style={{ background: mat.color, opacity: 0.9 }}
          initial={{ x: -20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 0.9 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 + index * 0.1 }}
        >
          {mat.tag}
        </motion.span>
      </div>

      {/* Index */}
      <div className="absolute top-0 right-0 p-5 text-[10px] z-20 font-mono text-foreground/20">
        {String(index + 1).padStart(2, "0")}
      </div>

      {/* Content */}
      <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end z-20">
        <div
          className="w-12 h-1 mb-5 transition-all duration-300 group-hover:w-20"
          style={{ background: mat.color }}
        />
        <h3 className="text-2xl font-bold text-white mb-2 leading-tight">{mat.name}</h3>
        <div className="text-[10px] tracking-[0.2em] mb-4 font-mono text-white/50">{mat.typeCode}</div>

        {/* Application tags */}
        <div className="flex gap-2 mb-5 flex-wrap">
          {mat.applications.map((app) => (
            <span key={app} className="text-[9px] px-2 py-0.5 border border-white/15 text-white/50 font-mono transition-colors duration-300 group-hover:border-white/30 group-hover:text-white/70">
              {app}
            </span>
          ))}
        </div>

        {/* Specs */}
        <motion.div className="pt-5 border-t border-white/10" style={{ opacity: anim.specs }}>
          {mat.specs.map((spec) => (
            <div key={spec.label} className="flex justify-between mb-2.5 font-mono" style={{ fontSize: "10px" }}>
              <span className="text-white/50">{spec.label}</span>
              <span className="text-white font-semibold">{spec.value}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Hover overlay glow */}
      <div
        className="absolute inset-0 z-15 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at bottom, ${mat.color}15 0%, transparent 70%)`,
        }}
      />
    </motion.div>
  );
};

const MaterialsSection = () => {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const headerOpacity = useTransform(scrollYProgress, [0, 0.08], [0, 1]);
  const headerY = useTransform(scrollYProgress, [0, 0.08], [40, 0]);

  const cardAnimations = [0, 1, 2, 3].map((i) => {
    const start = 0.08 + i * 0.12;
    return {
      opacity: useTransform(scrollYProgress, [start, start + 0.1], [0, 1]),
      y: useTransform(scrollYProgress, [start, start + 0.1], [60, 0]),
      specs: useTransform(scrollYProgress, [start + 0.08, start + 0.14], [0, 1]),
    };
  });

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
            <div className="inline-flex items-center gap-2 mb-3">
              <div className="w-6 h-px bg-primary" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.4em] text-primary font-mono">
                Malzeme Kütüphanesi
              </span>
              <div className="w-6 h-px bg-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-3">Çalıştığımız Malzemeler</h2>
            <p className="text-sm max-w-lg mx-auto text-foreground/60">
              50'den fazla malzeme seçeneği · <span className="text-foreground/80">Dokunarak detayları görün</span>
            </p>
          </motion.div>
          <div className="grid grid-cols-2 gap-3 mb-8">
            {materials.map((mat, i) => (
              <MobileMaterialCard key={mat.name} mat={mat} i={i} />
            ))}
          </div>
          <motion.div
            className="flex flex-col items-center gap-4 pt-6 border-t border-border/30"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-wrap justify-center gap-3">
              {badges.map((badge) => (
                <span key={badge} className="inline-flex items-center gap-1.5 text-xs text-foreground/70">
                  <Check className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                  {badge}
                </span>
              ))}
            </div>
            <a
              href="/malzemeler"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all duration-300 group"
            >
              Tüm Malzeme Kütüphanesi
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
              "linear-gradient(to right, hsl(var(--border) / 0.15) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--border) / 0.15) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Decorative corner elements */}
        <div className="absolute top-6 left-6 w-16 h-16 border-l border-t border-primary/10 pointer-events-none" />
        <div className="absolute bottom-6 right-6 w-16 h-16 border-r border-b border-primary/10 pointer-events-none" />

        <div className="container mx-auto px-4 md:px-8 relative z-10 max-w-7xl">
          <motion.div className="text-center mb-8 md:mb-12" style={{ opacity: headerOpacity, y: headerY }}>
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-10 h-px bg-primary" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.5em] text-primary font-mono">
                İŞLENEN MALZEMELER
              </span>
              <div className="w-10 h-px bg-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Çalıştığımız Malzemeler</h2>
            <p className="text-base max-w-lg mx-auto text-foreground/60">
              50'den fazla materyal seçeneği ile projelerinizin teknik gereksinimlerine ve sektör standartlarına yanıt
              veren geniş hammadde kütüphanesi
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 md:mb-12">
            {materials.map((mat, i) => (
              <DesktopMaterialCard key={mat.name} mat={mat} index={i} anim={cardAnimations[i]} />
            ))}
          </div>

          <motion.div
            className="flex flex-wrap justify-center items-center gap-6 pt-6 border-t border-border/30"
            style={{ opacity: badgesOpacity, y: badgesY }}
          >
            {badges.map((badge, i) => (
              <span key={badge} className="inline-flex items-center gap-2 text-sm text-foreground/70">
                <Check className="w-4 h-4 text-primary flex-shrink-0" />
                {badge}
                {i < 2 && <span className="ml-4 text-foreground/15">·</span>}
              </span>
            ))}
            <a
              href="/malzemeler"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all duration-300 group ml-2"
            >
              Malzeme Kütüphanesi
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default MaterialsSection;
