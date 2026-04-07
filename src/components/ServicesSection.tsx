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

import serviceFrze from "@/assets/service-cnc-freze.jpg";
import serviceTorna from "@/assets/service-cnc-torna.jpg";
import serviceImalat from "@/assets/service-imalat.jpg";
import serviceLazer from "@/assets/service-lazer.jpg";
import serviceKalip from "@/assets/service-kalip.jpg";

const services = [
  {
    image: serviceFrze,
    title: "5 Eksen CNC Frezeleme",
    description:
      "Karmaşık geometrilerde üstün yüzey kalitesi; havacılık ve enerji standartlarında hassas imalat.",
    link: "/hizmetler/cnc-frezeleme",
    cta: "Frezeleme Detayları",
  },
  {
    image: serviceTorna,
    title: "CNC Torna İşleme",
    description:
      "Mikron düzeyinde tolerans sınırlarını yakalayan yüksek nitelikli silindirik parça işleme.",
    link: "/hizmetler/cnc-tornalama",
    cta: "Torna Detayları",
  },
  {
    image: serviceImalat,
    title: "Talaşlı İmalat",
    description:
      "Hidrolik ve pnömatik sistem entegrasyonlarıyla tam işlevsel modüller ve üretim hatları.",
    link: "/hizmetler/talasli-imalat",
    cta: "İmalat Detayları",
  },
  {
    image: serviceLazer,
    title: "Lazer Kesim",
    description:
      "Yüksek hassasiyetli lazer teknolojisi ile metal ve alaşım malzemelerde temiz ve hızlı kesim.",
    link: "/hizmetler/lazer-kazima",
    cta: "Lazer Kesim Detayları",
  },
  {
    image: serviceKalip,
    title: "Kalıp & Döküm",
    description:
      "Enjeksiyon ve basınçlı döküm kalıplarında tasarımdan üretime mühendislik çözümleri.",
    link: "/hizmetler/enjeksiyon-kalibi",
    cta: "Kalıp Detayları",
  },
];

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

      // Animate active bar
      barRefs.current.forEach((bar, i) => {
        if (!bar) return;
        gsap.to(bar, {
          scaleY: i === index ? 1 : 0,
          duration: 0.4,
          ease: "power4.out",
        });
      });

      // Animate images
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

  // Initialize first bar
  useEffect(() => {
    barRefs.current.forEach((bar, i) => {
      if (bar) gsap.set(bar, { scaleY: i === 0 ? 1 : 0 });
    });
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8 lg:gap-12">
      {/* Left: Service list */}
      <div className="flex flex-col">
        {services.map((s, i) => (
          <div
            key={s.title}
            ref={(el) => { itemRefs.current[i] = el; }}
            className="relative group cursor-pointer border-b border-border/30 py-6 first:pt-0 last:border-b-0"
            onMouseEnter={() => handleHover(i)}
          >
            {/* Active bar indicator */}
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

      {/* Right: Visual panel */}
      <OverlayReveal className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[500px] overflow-hidden" direction="right">
        <div ref={visualRef} className="relative w-full h-full">
          {services.map((s, i) => (
            <div
              key={s.title}
              data-service-img
              className="absolute inset-0 transition-none"
              style={{ opacity: i === 0 ? 1 : 0, transform: i === 0 ? "scale(1)" : "scale(1.08)" }}
            >
              <BlurImage
                src={s.image}
                alt={s.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card/60 via-transparent to-transparent" />
            </div>
          ))}

          {/* Overlay info */}
          <div className="absolute bottom-6 left-6 right-6 z-10">
            <span className="inline-block px-3 py-1 text-[9px] font-bold uppercase tracking-[0.15em] text-white/90 font-mono mb-3"
              style={{ backgroundColor: "hsl(var(--primary) / 0.85)" }}
            >
              {services[activeIndex].title}
            </span>
          </div>
        </div>
      </OverlayReveal>
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

  // Section entrance via GSAP
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
      className="section-industrial min-h-screen flex flex-col justify-center"
      style={{ backgroundColor: "hsl(var(--forge-concrete))" }}
    >
      <style>{`.dark #hizmetler { background-color: hsl(var(--forge-concrete)) !important; }`}</style>
      <div className="container-industrial">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <SectionHeader
            tag="Kabiliyetler"
            title="Üretim Hizmetlerimiz"
            description="Tasarımdan seri üretime kadar her adımda mühendislik odaklı çözümler sunuyoruz"
            sectionNumber={1}
          />
          <Link
            to="/hizmetler/cnc-frezeleme"
            className="text-sm font-medium text-primary hover:text-primary/80 flex items-center gap-1.5 transition-colors whitespace-nowrap"
          >
            {"Tüm Hizmetler"}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="mb-12">
          {isMobile ? <ServicesMobileList /> : <ServicesDualColumn />}
        </div>

        {/* Bottom CTA */}
        <div className="border border-border bg-card p-8 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h3 className="heading-industrial text-xl mb-1">
              {"Üretim hattınızı optimize etmeye hazır mısınız?"}
            </h3>
            <p className="text-foreground/60 text-sm">
              {"Kapsamlı teknik danışmanlık için baş mühendislerimizle görüşün."}
            </p>
          </div>
          <div className="flex gap-4 shrink-0">
            <Link
              to="/teklif-al"
              className="whitespace-nowrap px-8 py-4 font-semibold uppercase tracking-wider text-sm border-2 transition-all duration-200"
              style={{
                backgroundColor: "hsl(var(--forge-molten))",
                borderColor: "hsl(var(--forge-molten))",
                color: "#ffffff",
              }}
            >
              {"Danışmanlık Al"}
            </Link>
            <Link
              to="/iletisim"
              className="btn-industrial-secondary whitespace-nowrap"
            >
              {"Bize Ulaşın"}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
