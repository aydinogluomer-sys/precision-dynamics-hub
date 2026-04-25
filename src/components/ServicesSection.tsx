import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useRef, useState, useEffect, useCallback } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { gsap } from "@/hooks/use-gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionHeader } from "./SectionHeader";
import { OverlayReveal } from "./ui/OverlayReveal";
import { BlurImage } from "./BlurImage";
import { BentoTilt } from "./ui/BentoTilt";
import { useStaggeredReveal } from "@/hooks/useStaggeredReveal";
import serviceFrze from "@/assets/service-cnc-freze.jpg";
import serviceTorna from "@/assets/service-cnc-torna.jpg";
import serviceImalat from "@/assets/service-imalat.jpg";
import serviceLazer from "@/assets/service-lazer.jpg";
import serviceKalip from "@/assets/service-kalip.jpg";

// ── Tip tanımları ────────────────────────────────────────────
interface ServiceSpec { k: string; v: string; }

interface Service {
  image: string;
  title: string;
  description: string;
  link: string;
  cta: string;
  slug: string;
  specs: ServiceSpec[];
}

const services: Service[] = [
  {
    image: serviceFrze,
    title: "5 Eksen CNC Frezeleme",
    description:
      "Karmaşık geometrilerde üstün yüzey kalitesi; havacılık ve enerji standartlarında hassas imalat.",
    link: "/hizmetler/cnc-frezeleme",
    cta: "Frezeleme Detayları",
    slug: "/hizmetler/cnc-frezeleme",
    specs: [
      { k: "Tolerans", v: "±0.005 mm" },
      { k: "Eksen",    v: "5-axis" },
      { k: "Kapasite", v: "Ø800 mm" },
    ],
  },
  {
    image: serviceTorna,
    title: "CNC Torna İşleme",
    description:
      "Mikron düzeyinde tolerans sınırlarını yakalayan yüksek nitelikli silindirik parça işleme.",
    link: "/hizmetler/cnc-tornalama",
    cta: "Torna Detayları",
    slug: "/hizmetler/cnc-tornalama",
    specs: [
      { k: "Tolerans", v: "±0.01 mm" },
      { k: "Tip",      v: "Çift kafa" },
      { k: "Uzunluk",  v: "1600 mm" },
    ],
  },
  {
    image: serviceImalat,
    title: "Talaşlı İmalat",
    description:
      "Hidrolik ve pnömatik sistem entegrasyonlarıyla tam işlevsel modüller ve üretim hatları.",
    link: "/hizmetler/talasli-imalat",
    cta: "İmalat Detayları",
    slug: "/hizmetler/talasli-imalat",
    specs: [
      { k: "Proses",  v: "Hybrid" },
      { k: "Montaj",  v: "Dahil" },
      { k: "Batch",   v: "1–5000+" },
    ],
  },
  {
    image: serviceLazer,
    title: "Lazer Kesim",
    description:
      "Yüksek hassasiyetli lazer teknolojisi ile metal ve alaşım malzemelerde temiz ve hızlı kesim.",
    link: "/hizmetler/lazer-kazima",
    cta: "Lazer Kesim Detayları",
    slug: "/hizmetler/lazer-kazima",
    specs: [
      { k: "Güç",      v: "12 kW fiber" },
      { k: "Kalınlık", v: "0.5–25 mm" },
      { k: "Alan",     v: "3000×1500" },
    ],
  },
  {
    image: serviceKalip,
    title: "Kalıp & Döküm",
    description:
      "Enjeksiyon ve basınçlı döküm kalıplarında tasarımdan üretime mühendislik çözümleri.",
    link: "/hizmetler/enjeksiyon-kalibi",
    cta: "Kalıp Detayları",
    slug: "/hizmetler/enjeksiyon-kalibi",
    specs: [
      { k: "Tip",    v: "Enj. + basınç" },
      { k: "Sınıf",  v: "H13 / 1.2738" },
      { k: "Teslim", v: "6–12 hf" },
    ],
  },
];

// archived — dual-column variant (Spec Ledger layout devraldı, referans için tutuluyor)
/* ── Desktop: Dual-Column Hover-Linked Layout ── */
const ServicesDualColumn = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const visualRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const barRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleHover = useCallback(
    (index: number) => {
      if (index === activeIndex) return;
      setActiveIndex(index);

      barRefs.current.forEach((bar, i) => {
        if (!bar) return;
        gsap.to(bar, {
          scaleY: i === index ? 1 : 0,
          duration: 0.4,
          ease: "power4.out",
        });
      });

      const container = visualRef.current;
      if (!container) return;
      const imgs = container.querySelectorAll<HTMLElement>("[data-service-img]");
      imgs.forEach((img, i) => {
        gsap.to(img, {
          opacity: i === index ? 1 : 0,
          scale: i === index ? 1 : 1.08,
          duration: 1,
          ease: "power2.out",
        });
      });
    },
    [activeIndex]
  );

  useEffect(() => {
    barRefs.current.forEach((bar, i) => {
      if (bar) gsap.set(bar, { scaleY: i === 0 ? 1 : 0 });
    });
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8 lg:gap-12">
      <div className="flex flex-col">
        {services.map((s, i) => (
          <div
            key={s.title}
            ref={(el) => { itemRefs.current[i] = el; }}
            className="relative group cursor-pointer border-b border-border/30 py-6 first:pt-0 last:border-b-0"
            onMouseEnter={() => handleHover(i)}
          >
            <div
              ref={(el) => { barRefs.current[i] = el; }}
              className="absolute left-0 top-0 bottom-0 w-[2px] origin-top"
              style={{ backgroundColor: "hsl(var(--primary))", transform: "scaleY(0)" }}
            />
            <div className="pl-5">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-[10px] font-mono tracking-widest text-muted-foreground/50">
                  {String(i + 1).padStart(2, "0")}/{String(services.length).padStart(2, "0")}
                </span>
                <span className="text-[10px] text-muted-foreground/30">·</span>
              </div>
              <h3
                className="text-lg font-bold tracking-tight transition-colors duration-300"
                style={{ color: i === activeIndex ? "hsl(var(--primary))" : "hsl(var(--foreground))" }}
              >
                {s.title}
              </h3>
              <div
                className="overflow-hidden transition-all duration-500"
                style={{
                  maxHeight: i === activeIndex ? "120px" : "0px",
                  opacity: i === activeIndex ? 1 : 0,
                }}
              >
                <p className="text-sm text-muted-foreground leading-relaxed mt-2 mb-3">
                  {s.description}
                </p>
                <Link
                  to={s.link}
                  className="text-sm font-semibold text-primary hover:text-primary/80 flex items-center gap-1.5 transition-colors cta-arrow"
                >
                  {s.cta}
                  <ArrowRight className="w-3.5 h-3.5 arrow-icon" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <OverlayReveal className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[500px] overflow-hidden" direction="right">
        <div ref={visualRef} className="relative w-full h-full">
          {services.map((s, i) => (
            <div
              key={s.title}
              data-service-img
              className="absolute inset-0 transition-none"
              style={{ opacity: i === 0 ? 1 : 0, transform: i === 0 ? "scale(1)" : "scale(1.08)" }}
            >
              <BlurImage src={s.image} alt={s.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-card/60 via-transparent to-transparent" />
            </div>
          ))}

          <div className="absolute bottom-6 left-6 right-6 z-10">
            <span className="inline-block px-3 py-1 text-[9px] font-bold uppercase tracking-[0.15em] font-mono mb-3"
              style={{ backgroundColor: "hsl(var(--primary) / 0.85)", color: "var(--text-primary)" }}
            >
              {services[activeIndex].title}
            </span>
          </div>
        </div>
      </OverlayReveal>
    </div>
  );
};

/* ── Desktop: Spec Ledger Layout (Claude Design v2.0) ── */
const ServicesLedger = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const prefersReduced = usePrefersReducedMotion();

  return (
    <div>
      {/* ── Section başlık: sol eyebrow+H2 / sağ açıklama+link ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "48px",
          alignItems: "end",
          marginBottom: "56px",
          paddingBottom: "28px",
          borderBottom: "1px solid var(--surface-border-light, rgba(26,24,20,0.10))",
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "10px",
              letterSpacing: "0.5em",
              color: "var(--heat-molten)",
              textTransform: "uppercase",
              fontWeight: 600,
              marginBottom: "16px",
            }}
          >
            <span
              style={{
                width: "32px",
                height: "1px",
                background: "var(--heat-molten)",
                display: "inline-block",
                flexShrink: 0,
              }}
            />
            Kabiliyetler
          </div>
          <h2
            style={{
              fontWeight: 700,
              fontSize: "clamp(40px, 5vw, 64px)",
              lineHeight: 0.95,
              letterSpacing: "-0.025em",
              margin: 0,
              color: "var(--text-inverse, #1a1814)",
            }}
          >
            Üretim hizmetleri.
          </h2>
        </div>

        <div style={{ paddingBottom: "4px" }}>
          <p
            style={{
              margin: "0 0 16px",
              fontSize: "16px",
              lineHeight: 1.6,
              color: "var(--text-inverse-secondary, rgba(26,24,20,0.65))",
              maxWidth: "44ch",
            }}
          >
            Tasarımdan seri üretime: 5 çekirdek kabiliyet, beş ayrı hassasiyet
            sınıfı, tek bir mühendislik disiplini.
          </p>
          <Link
            to="/hizmetler/cnc-frezeleme"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "11px",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "var(--precision-blue, #1a4d8f)",
              textDecoration: "none",
              borderBottom: "1px solid var(--precision-blue, #1a4d8f)",
              paddingBottom: "4px",
              fontWeight: 600,
            }}
          >
            Tüm kabiliyetler →
          </Link>
        </div>
      </div>

      {/* ── Ledger tablosu ── */}
      <BentoTilt disabled={prefersReduced} className="overflow-hidden">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "72px 1fr 2.1fr 1fr 200px",
            borderTop: "1px solid var(--text-inverse, #1a1814)",
            borderBottom: "1px solid var(--text-inverse, #1a1814)",
          }}
        >
        {/* Header row */}
        {["—", "Hizmet", "Kapsam", "Spec", "Detay"].map((col) => (
          <div
            key={col}
            style={{
              padding: "14px 20px",
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "10px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "var(--text-inverse-muted, rgba(26,24,20,0.40))",
              borderBottom: "1px solid var(--text-inverse, #1a1814)",
              background: "var(--bg-light-workshop, #f0ede8)",
            }}
          >
            {col}
          </div>
        ))}

        {/* Service rows — display:contents wrapper için event bubbling ile hover */}
        {services.map((s, i) => {
          const isHovered = hoveredIndex === i;
          const isLast = i === services.length - 1;

          const sharedCell: React.CSSProperties = {
            borderBottom: isLast
              ? "none"
              : "1px solid var(--surface-border-light, rgba(26,24,20,0.10))",
            background: isHovered
              ? "var(--surface-hover-light, rgba(26,24,20,0.06))"
              : "transparent",
            transition: "background 120ms ease",
          };

          return (
            <div
              key={s.title}
              style={{ display: "contents", cursor: "pointer" }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* idx */}
              <div
                style={{
                  ...sharedCell,
                  padding: "26px 20px 18px",
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "12px",
                  letterSpacing: "0.1em",
                  color: "var(--text-inverse-muted, rgba(26,24,20,0.40))",
                  alignSelf: "start",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>

              {/* name + slug */}
              <div style={{ ...sharedCell, padding: "22px 20px" }}>
                <h3
                  style={{
                    margin: "0 0 6px",
                    fontSize: "22px",
                    fontWeight: 600,
                    letterSpacing: "-0.01em",
                    lineHeight: 1.15,
                    color: isHovered
                      ? "var(--heat-molten)"
                      : "var(--text-inverse, #1a1814)",
                    transition: "color 120ms ease",
                  }}
                >
                  {s.title}
                </h3>
                <div
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "10px",
                    letterSpacing: "0.2em",
                    color: "var(--text-inverse-muted, rgba(26,24,20,0.40))",
                    textTransform: "uppercase",
                  }}
                >
                  {s.slug}
                </div>
              </div>

              {/* desc */}
              <div
                style={{
                  ...sharedCell,
                  padding: "26px 20px 22px",
                  fontSize: "14px",
                  lineHeight: 1.55,
                  color: "var(--text-inverse-secondary, rgba(26,24,20,0.65))",
                  maxWidth: "48ch",
                }}
              >
                {s.description}
              </div>

              {/* specs */}
              <div
                style={{
                  ...sharedCell,
                  padding: "22px 20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                }}
              >
                {s.specs.map((spec) => (
                  <div
                    key={spec.k}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr auto",
                      gap: "12px",
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: "11px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "10px",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: "var(--text-inverse-muted, rgba(26,24,20,0.40))",
                        alignSelf: "center",
                      }}
                    >
                      {spec.k}
                    </span>
                    <span
                      style={{
                        fontWeight: 500,
                        color: "var(--text-inverse, #1a1814)",
                      }}
                    >
                      {spec.v}
                    </span>
                  </div>
                ))}
              </div>

              {/* action */}
              <div style={{ ...sharedCell, padding: "24px 20px 22px" }}>
                <Link
                  to={s.link}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: isHovered ? "18px" : "8px",
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "11px",
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    color: isHovered
                      ? "var(--heat-molten)"
                      : "var(--text-inverse, #1a1814)",
                    textDecoration: "none",
                    fontWeight: 600,
                    paddingBottom: "10px",
                    borderBottom: `1px solid ${
                      isHovered
                        ? "var(--heat-molten)"
                        : "var(--text-inverse, #1a1814)"
                    }`,
                    transition:
                      "color 120ms ease, border-color 120ms ease, gap 180ms cubic-bezier(.16,1,.3,1)",
                  }}
                >
                  {s.cta}
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: 0 }}>
                    →
                  </span>
                </Link>
              </div>
            </div>
          );
        })}
        </div>
      </BentoTilt>

      {/* ── Bottom CTA ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: "40px",
          alignItems: "center",
          marginTop: "48px",
          padding: "40px 32px",
          border: "1px solid var(--surface-border-hover-light, rgba(26,24,20,0.18))",
          background: "var(--bg-light-workshop, #f0ede8)",
          position: "relative",
        }}
      >
        {/* Sol Heat bar */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: "3px",
            background: "var(--heat-molten)",
          }}
        />

        <div>
          <h3
            style={{
              fontSize: "22px",
              margin: "0 0 6px",
              fontWeight: 600,
              letterSpacing: "-0.01em",
              color: "var(--text-inverse, #1a1814)",
            }}
          >
            Üretim hattınızı optimize etmeye hazır mısınız?
          </h3>
          <p
            style={{
              margin: 0,
              fontSize: "14px",
              lineHeight: 1.55,
              color: "var(--text-inverse-secondary, rgba(26,24,20,0.65))",
              maxWidth: "60ch",
            }}
          >
            Kapsamlı teknik danışmanlık için baş mühendislerimizle görüşün.
            48 saat içinde yanıt garantili.
          </p>
        </div>

        <div style={{ display: "flex", gap: "12px" }}>
          <Link
            to="/teklif-al"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              padding: "16px 28px",
              textDecoration: "none",
              background: "var(--heat-molten)",
              color: "var(--text-primary, #f0efed)",
              border: "2px solid var(--heat-molten)",
              whiteSpace: "nowrap",
              transition: "background 120ms ease, border-color 120ms ease",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = "var(--heat-char, #b8451a)";
              el.style.borderColor = "var(--heat-char, #b8451a)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = "var(--heat-molten)";
              el.style.borderColor = "var(--heat-molten)";
            }}
          >
            Danışmanlık Al
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: 0 }}>
              →
            </span>
          </Link>

          <Link
            to="/iletisim"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              padding: "16px 28px",
              textDecoration: "none",
              background: "transparent",
              color: "var(--text-inverse, #1a1814)",
              border: "2px solid var(--text-inverse, #1a1814)",
              whiteSpace: "nowrap",
              transition: "background 120ms ease, color 120ms ease",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = "var(--text-inverse, #1a1814)";
              el.style.color = "var(--bg-light-workshop, #f0ede8)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = "transparent";
              el.style.color = "var(--text-inverse, #1a1814)";
            }}
          >
            Bize Ulaşın
          </Link>
        </div>
      </div>
    </div>
  );
};

/* ── Mobile: Compact card list ── */
const ServicesMobileList = () => {
  const listRef = useRef<HTMLDivElement>(null);
  useStaggeredReveal(listRef, 0.07);

  return (
    <div ref={listRef} className="flex flex-col gap-4">
      {services.map((s, i) => (
        <Link key={s.title} to={s.link} className="group block" data-stagger>
          <div className="flex gap-4 border border-border/30 bg-card overflow-hidden hover:border-primary/40 transition-colors">
            <div className="w-24 h-24 flex-shrink-0 overflow-hidden">
              <BlurImage src={s.image} alt={s.title} className="w-full h-full object-cover" />
            </div>
            <div className="py-3 pr-4 flex flex-col justify-center">
              <span className="text-[9px] font-mono text-muted-foreground/50 mb-1">
                {String(i + 1).padStart(2, "0")}/{String(services.length).padStart(2, "0")}
              </span>
              <h3 className="text-sm font-bold tracking-tight mb-1">{s.title}</h3>
              <span className="text-xs text-primary flex items-center gap-1 cta-arrow">
                {"Detaylar"}
                <ArrowRight className="w-3 h-3 arrow-icon" />
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export const ServicesSection = () => {
  const isMobile = useIsMobile();
  const prefersReduced = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // Bölüm girişi — GSAP fade+slide, reduced-motion'da atlanır
  useEffect(() => {
    if (prefersReduced) return;
    const el = sectionRef.current;
    if (!el) return;

    gsap.set(el, { opacity: 0, y: 40 });
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(el, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" });
      },
    });

    return () => { trigger.kill(); };
  }, [prefersReduced]);

  return (
    <section
      ref={sectionRef}
      id="hizmetler"
      className="section-industrial py-24 md:py-32 lg:py-40 flex flex-col justify-center"
      style={{ backgroundColor: "var(--bg-light-concrete, #e8e4de)" }}
    >
      <div className="container-industrial">
        {isMobile ? (
          <>
            <SectionHeader
              tag="Kabiliyetler"
              title="Üretim Hizmetlerimiz"
              description="Tasarımdan seri üretime kadar her adımda mühendislik odaklı çözümler sunuyoruz"
              sectionNumber={1}
            />
            <div className="mt-8">
              <ServicesMobileList />
            </div>
            {/* Mobile bottom CTA */}
            <div
              className="mt-8 p-8 flex flex-col gap-4"
              style={{
                border: "1px solid var(--surface-border-hover-light, rgba(26,24,20,0.18))",
                background: "var(--bg-light-workshop, #f0ede8)",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: 0, top: 0, bottom: 0,
                  width: "3px",
                  background: "var(--heat-molten)",
                }}
              />
              <div>
                <h3
                  className="heading-industrial text-xl mb-1"
                  style={{ color: "var(--text-inverse, #1a1814)" }}
                >
                  Üretim hattınızı optimize etmeye hazır mısınız?
                </h3>
                <p
                  className="text-sm"
                  style={{ color: "var(--text-inverse-secondary, rgba(26,24,20,0.65))" }}
                >
                  Kapsamlı teknik danışmanlık için baş mühendislerimizle görüşün.
                </p>
              </div>
              <div className="flex gap-3">
                <Link
                  to="/teklif-al"
                  className="flex-1 py-3 text-center font-semibold uppercase tracking-wider text-xs font-mono"
                  style={{
                    background: "var(--heat-molten)",
                    color: "var(--text-primary, #f0efed)",
                    border: "2px solid var(--heat-molten)",
                  }}
                >
                  Danışmanlık Al
                </Link>
                <Link
                  to="/iletisim"
                  className="flex-1 py-3 text-center font-semibold uppercase tracking-wider text-xs font-mono"
                  style={{
                    background: "transparent",
                    color: "var(--text-inverse, #1a1814)",
                    border: "2px solid var(--text-inverse, #1a1814)",
                  }}
                >
                  Bize Ulaşın
                </Link>
              </div>
            </div>
          </>
        ) : (
          <ServicesLedger />
        )}
      </div>
    </section>
  );
};
