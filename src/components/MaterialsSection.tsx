import { useState } from "react";
import { Check, ArrowRight, Layers } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import materialAluminium from "@/assets/material-aluminium.jpg";
import materialSteel from "@/assets/material-steel.jpg";
import materialStainless from "@/assets/material-stainless.jpg";
import materialBrass from "@/assets/material-brass.jpg";
import { BlurImage } from "./BlurImage";

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

/* ── Flip card CSS (respects prefers-reduced-motion) ── */
const flipStyles = `
.flip-card { perspective: 1000px; }
.flip-card-inner {
  position: relative;
  transition: transform 0.7s cubic-bezier(0.76, 0, 0.24, 1);
  transform-style: preserve-3d;
}
.flip-card:hover .flip-card-inner { transform: rotateY(180deg); }
.flip-card-front,
.flip-card-back {
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}
.flip-card-back { transform: rotateY(180deg); }
@media (prefers-reduced-motion: reduce) {
  .flip-card-inner { transition: none; }
  .flip-card:hover .flip-card-inner { transform: none; }
}
`;

/* ── Mobile Material Card ── */
const MobileMaterialCard = ({ mat }: { mat: typeof materials[number] }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="relative h-[240px] overflow-hidden border border-border/30 cursor-pointer"
      onClick={() => setFlipped(!flipped)}
    >
      <div className="absolute inset-0 z-10">
        <BlurImage src={mat.image} alt={mat.name} className="w-full h-full object-cover" disableScaleTransform />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.1) 100%)",
          }}
        />
      </div>

      <div className="absolute top-3 left-3 z-20">
        <span
          className="px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.15em] text-white/90 font-mono"
          style={{ background: mat.color, opacity: 0.9 }}
        >
          {mat.tag}
        </span>
      </div>

      <div className="absolute top-3 right-3 z-20">
        <Layers className="w-3.5 h-3.5 text-white/40" />
      </div>

      <div className="absolute inset-0 p-4 flex flex-col justify-end z-20">
        <div className={`transition-opacity duration-200 ${flipped ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
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
        </div>

        <div className={`absolute inset-0 p-4 flex flex-col justify-end transition-opacity duration-200 ${flipped ? "opacity-100" : "opacity-0"}`}>
          <div className="pt-2">
            {mat.specs.map((spec) => (
              <div key={spec.label} className="flex justify-between mb-2 font-mono" style={{ fontSize: "10px" }}>
                <span className="text-white/60">{spec.label}</span>
                <span className="text-white font-semibold">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ── Desktop Material Card — 3D CSS Flip ── */
const DesktopMaterialCard = ({ mat, index }: { mat: typeof materials[number]; index: number }) => {
  return (
    <div className="flip-card h-[400px] md:h-[440px] cursor-pointer group/card">
      <div className="flip-card-inner w-full h-full" style={{ filter: "drop-shadow(0 0 0px transparent)" }} onMouseEnter={(e) => { e.currentTarget.style.filter = "drop-shadow(0 0 12px rgba(232,97,10,0.25))"; }} onMouseLeave={(e) => { e.currentTarget.style.filter = "drop-shadow(0 0 0px transparent)"; }}>
        {/* Front face */}
        <div className="flip-card-front absolute inset-0 overflow-hidden border border-border/30 group">
          <div className="absolute inset-0 z-10">
            <BlurImage
              src={mat.image}
              alt={mat.name}
              className="w-full h-full object-cover transition-transform duration-700"
              disableScaleTransform
            />
            <div
              className="absolute inset-0 transition-all duration-500"
              style={{
                background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.15) 100%)",
              }}
            />
          </div>

          <div className="absolute inset-0 bg-card" />

          <div className="absolute top-4 left-4 z-20">
            <span
              className="inline-block px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.15em] text-white/90 font-mono"
              style={{ background: mat.color, opacity: 0.9 }}
            >
              {mat.tag}
            </span>
          </div>

          <div className="absolute top-0 right-0 p-5 text-[10px] z-20 font-mono text-foreground/20">
            {String(index + 1).padStart(2, "0")}
          </div>

          <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end z-20">
            <div
              className="w-12 h-1 mb-5 transition-all duration-300"
              style={{ background: mat.color }}
            />
            <h3 className="text-2xl font-bold text-white mb-2 leading-tight">{mat.name}</h3>
            <div className="text-[10px] tracking-[0.2em] mb-4 font-mono text-white/50">{mat.typeCode}</div>

            <div className="flex gap-2 mb-5 flex-wrap">
              {mat.applications.map((app) => (
                <span key={app} className="text-[9px] px-2 py-0.5 border border-white/15 text-white/50 font-mono">
                  {app}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Back face — specs table */}
        <div className="flip-card-back absolute inset-0 overflow-hidden border border-border/30 bg-card flex flex-col justify-center p-8 md:p-10">
          <div className="w-12 h-1 mb-6" style={{ background: mat.color }} />
          <h3 className="text-xl font-bold text-foreground mb-2">{mat.name}</h3>
          <div className="text-[10px] tracking-[0.2em] mb-6 font-mono text-muted-foreground">{mat.typeCode}</div>

          <div className="border-t border-border pt-4">
            {mat.specs.map((spec) => (
              <div key={spec.label} className="flex justify-between py-3 border-b border-border/50 font-mono">
                <span className="text-xs text-muted-foreground">{spec.label}</span>
                <span className="text-sm font-semibold text-foreground">{spec.value}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 flex gap-2 flex-wrap">
            {mat.applications.map((app) => (
              <span key={app} className="text-[9px] px-2 py-1 border border-primary/30 text-primary font-mono">
                {app}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const MaterialsSection = () => {
  const isMobile = useIsMobile();

  return (
    <section id="malzemeler" className="py-24 md:py-32 lg:py-40 min-h-screen flex flex-col justify-center" style={{ backgroundColor: "hsl(var(--forge-mist))" }}>
      <style>{flipStyles}{`.dark #malzemeler { background-color: hsl(var(--forge-mist)) !important; }`}</style>
      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, hsl(var(--border) / 0.15) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--border) / 0.15) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container mx-auto px-4 md:px-8 relative z-10 max-w-7xl">
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-10 h-px bg-primary" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.5em] text-primary font-mono">
              {isMobile ? "Malzeme Kütüphanesi" : "İŞLENEN MALZEMELER"}
            </span>
            <div className="w-10 h-px bg-primary" />
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3 md:mb-4">
            {"Çalıştığımız Malzemeler"}
          </h2>
          <p className="text-sm md:text-base max-w-lg mx-auto text-foreground/60">
            {isMobile
              ? <>{"50'den fazla malzeme seçeneği · "}<span className="text-foreground/80">{"Dokunarak detayları görün"}</span></>
              : "50'den fazla materyal seçeneği ile projelerinizin teknik gereksinimlerine ve sektör standartlarına yanıt veren geniş hammadde kütüphanesi"
            }
          </p>
        </div>

        <div className={`grid ${isMobile ? "grid-cols-2 gap-3" : "sm:grid-cols-2 lg:grid-cols-4 gap-4"} mb-8 md:mb-12`}>
          {materials.map((mat, i) =>
            isMobile
              ? <MobileMaterialCard key={mat.name} mat={mat} />
              : <DesktopMaterialCard key={mat.name} mat={mat} index={i} />
          )}
        </div>

        <div className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-4 md:gap-6 pt-6 border-t border-border/30">
          {badges.map((badge, i) => (
            <span key={badge} className="inline-flex items-center gap-2 text-xs md:text-sm text-foreground/70">
              <Check className="w-3.5 md:w-4 h-3.5 md:h-4 text-primary flex-shrink-0" />
              {badge}
              {!isMobile && i < 2 && <span className="ml-4 text-foreground/15">{"·"}</span>}
            </span>
          ))}
          <a
            href="/malzemeler"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all duration-300 group md:ml-2"
          >
            {isMobile ? "Tüm Malzeme Kütüphanesi" : "Malzeme Kütüphanesi"}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default MaterialsSection;
