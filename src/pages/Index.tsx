import { Suspense, lazy, useState, useEffect, useRef, forwardRef, type ReactNode } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { JsonLdSchema } from "@/components/JsonLdSchema";
import { PageLoader } from "@/components/PageLoader";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { useGPUCapability } from "@/hooks/useGPUCapability";
import { Z, SECTION_Z } from "@/styles/z-index";

const NexusPromoSection = lazy(() =>
  import("@/components/NexusPromoSection").then((m) => ({ default: m.NexusPromoSection })),
);
const HowWeWorkSection = lazy(() =>
  import("@/components/HowWeWorkSection").then((m) => ({ default: m.HowWeWorkSection })),
);
const Footer = lazy(() => import("@/components/Footer").then((m) => ({ default: m.Footer })));
const GlowLineDivider = lazy(() =>
  import("@/components/ui/GlowLineDivider").then((m) => ({ default: m.GlowLineDivider })),
);
const SectionDotNav = lazy(() =>
  import("@/components/SectionDotNav").then((m) => ({ default: m.SectionDotNav })),
);
const SectionTransitionGlow = lazy(() =>
  import("@/components/ui/SectionTransitionGlow").then((m) => ({ default: m.SectionTransitionGlow })),
);
const CNCScrollStory = lazy(() =>
  import("@/components/CNCScrollStory").then((m) => ({ default: m.CNCScrollStory })),
);
const LavaTypographyScene = lazy(() =>
  import("@/components/LavaTypographyScene").then((m) => ({ default: m.LavaTypographyScene })),
);
const MoldCastScene = lazy(() =>
  import("@/components/MoldCastScene").then((m) => ({ default: m.MoldCastScene })),
);

const VideoScrollSection = lazy(() =>
  import("@/components/VideoScrollSection").then((m) => ({ default: m.VideoScrollSection })),
);
const TestimonialsSection = lazy(() =>
  import("@/components/TestimonialsSection").then((m) => ({ default: m.TestimonialsSection })),
);
const MaterialMorphScroll = lazy(() =>
  import("@/components/MaterialMorphScroll").then((m) => ({ default: m.MaterialMorphScroll })),
);
const ProjectShowcase = lazy(() =>
  import("@/components/ProjectShowcase").then((m) => ({ default: m.ProjectShowcase })),
);
const ServicesSection = lazy(() =>
  import("@/components/ServicesSection").then((m) => ({ default: m.ServicesSection })),
);
const IndustriesSection = lazy(() =>
  import("@/components/IndustriesSection").then((m) => ({ default: m.IndustriesSection })),
);
const MaterialsSection = lazy(() =>
  import("@/components/MaterialsSection").then((m) => ({ default: m.MaterialsSection })),
);
const WhyUsSection = lazy(() => import("@/components/WhyUsSection").then((m) => ({ default: m.WhyUsSection })));
const CapabilitiesSection = lazy(() =>
  import("@/components/CapabilitiesSection").then((m) => ({ default: m.CapabilitiesSection })),
);
const FAQBlogSection = lazy(() => import("@/components/FAQBlogSection").then((m) => ({ default: m.FAQBlogSection })));
const FinalCTASection = lazy(() =>
  import("@/components/FinalCTASection").then((m) => ({ default: m.FinalCTASection })),
);

/* ── Fallback spinner ── */
const SectionLoader = forwardRef<HTMLDivElement>((_, ref) => (
  <div
    ref={ref}
    className="min-h-screen flex items-center justify-center"
    style={{ backgroundColor: "hsl(var(--forge-obsidian))" }}
  >
    <div className="w-8 h-8 border-2 border-primary border-t-transparent animate-spin" />
  </div>
));
SectionLoader.displayName = "SectionLoader";

/* ── Dot-nav labels ── */
const SECTIONS = [
  { id: "hero", label: "Ana Sayfa" },
  { id: "lav-sahne", label: "Ergitme" },
  { id: "dokum-sahne", label: "Döküm" },
  { id: "cnc-story", label: "CNC Story" },
  { id: "nexus", label: "Nexus" },
  { id: "nasil-calisiyoruz", label: "Nasıl Çalışıyoruz" },
  { id: "sertifikalar", label: "Sertifikalar" },
  { id: "video", label: "Video" },
  { id: "hizmetler", label: "Hizmetler" },
  { id: "endustriler", label: "Endüstriler" },
  { id: "projeler", label: "Projeler" },
  { id: "malzeme-morph", label: "Malzeme" },
  { id: "malzemeler", label: "Malzemeler" },
  { id: "neden-biz", label: "Neden Biz" },
  { id: "kabiliyetler", label: "Kabiliyetler" },
  { id: "referanslar", label: "Referanslar" },
  { id: "sss-blog", label: "SSS & Blog" },
  { id: "iletisim", label: "İletişim" },
];

/* ── Scene wrappers ── */

/** Sticky scene — pins at top, next section scrolls over it */
const Scene = ({
  children,
  z,
  className = "",
  style,
}: {
  children: ReactNode;
  z: number;
  className?: string;
  style?: React.CSSProperties;
}) => (
  <div
    className={`sticky top-0 min-h-screen w-full overflow-hidden ${className}`}
    style={{ zIndex: z, ...style }}
  >
    {children}
  </div>
);

/** Flow scene — for sections with internal scroll/pin logic */
const FlowScene = ({
  children,
  z,
  className = "",
  style,
}: {
  children: ReactNode;
  z: number;
  className?: string;
  style?: React.CSSProperties;
}) => (
  <div className={`relative w-full ${className}`} style={{ zIndex: z, ...style }}>
    {children}
  </div>
);

export const Index = () => {
  const [isFirstVisit] = useState(() => {
    const visited = sessionStorage.getItem("mas_visited");
    if (!visited) {
      sessionStorage.setItem("mas_visited", "1");
      return true;
    }
    return false;
  });

  const gpu = useGPUCapability();
  const mainRef = useRef<HTMLDivElement>(null);

  // ResizeObserver on <main> — refresh ScrollTrigger when lazy sections load
  useEffect(() => {
    const el = mainRef.current;
    if (!el) return;

    let lastHeight = el.offsetHeight;
    let debounceTimer: ReturnType<typeof setTimeout>;

    const ro = new ResizeObserver(() => {
      const newHeight = el.offsetHeight;
      if (newHeight === lastHeight) return;
      lastHeight = newHeight;

      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 200);
    });

    ro.observe(el);
    return () => {
      ro.disconnect();
      clearTimeout(debounceTimer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <PageLoader isFirstVisit={isFirstVisit} />
      <Header isFirstVisit={isFirstVisit} />
      <JsonLdSchema type="organization" />
      <Suspense fallback={null}>
        <SectionDotNav sections={SECTIONS} />
      </Suspense>

      <main id="main-content" ref={mainRef} className="relative">
        {/* 1 — Hero + QuickQuote */}
        <FlowScene z={SECTION_Z.hero}>
          <HeroSection isFirstVisit={isFirstVisit} />
        </FlowScene>

        {/* Lava Typography Scene */}
        {gpu !== 'none' && (
          <FlowScene z={SECTION_Z.lavaTypography}>
            <ErrorBoundary>
              <Suspense fallback={<SectionLoader />}>
                <LavaTypographyScene />
              </Suspense>
            </ErrorBoundary>
          </FlowScene>
        )}

        {/* Mold Cast Scene */}
        {gpu !== 'none' && (
          <FlowScene z={SECTION_Z.moldCast}>
            <ErrorBoundary>
              <Suspense fallback={<SectionLoader />}>
                <MoldCastScene />
              </Suspense>
            </ErrorBoundary>
          </FlowScene>
        )}

        {/* CNCScrollStory */}
        <FlowScene z={SECTION_Z.cncStory}>
          <ErrorBoundary>
            <Suspense fallback={<SectionLoader />}>
              <CNCScrollStory />
            </Suspense>
          </ErrorBoundary>
        </FlowScene>

        {/* 4 — NexusPromo */}
        <FlowScene z={SECTION_Z.nexus} style={{ backgroundColor: "hsl(var(--forge-obsidian))" }}>
          <Suspense fallback={<SectionLoader />}>
            <NexusPromoSection />
          </Suspense>
        </FlowScene>

        {/* Glow: Nexus (dark) → HowWeWork (light) */}
        <Suspense fallback={null}>
          <SectionTransitionGlow variant="dark-to-light" z={SECTION_Z.nexusToHwwGlow} fromColor="hsl(var(--forge-obsidian))" />
        </Suspense>

        {/* 5 — HowWeWork (flow, GSAP pin inside) */}
        <FlowScene z={SECTION_Z.howWeWork} style={{ backgroundColor: "hsl(var(--forge-workshop))" }}>
          <Suspense fallback={<SectionLoader />}>
            <HowWeWorkSection />
          </Suspense>
        </FlowScene>

        {/* 7 — VideoScroll (flow, scroll-linked video) */}
        <FlowScene z={SECTION_Z.videoScroll}>
          <Suspense fallback={<SectionLoader />}>
            <VideoScrollSection />
          </Suspense>
        </FlowScene>

        {/* Glow: VideoScroll (dark) → Services (light) */}
        <Suspense fallback={null}>
          <SectionTransitionGlow variant="dark-to-light" z={SECTION_Z.videoToServicesGlow} fromColor="hsl(var(--forge-obsidian))" />
        </Suspense>

        {/* 8 — Services (sticky) */}
        <Scene z={SECTION_Z.services} style={{ backgroundColor: "hsl(var(--forge-concrete))" }}>
          <Suspense fallback={<SectionLoader />}>
            <ServicesSection />
          </Suspense>
        </Scene>

        {/* GlowLine: Services → Industries (Açık → Açık) */}
        <div className="relative" style={{ zIndex: SECTION_Z.glowLine, backgroundColor: "hsl(var(--forge-concrete))" }}>
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <Suspense fallback={null}>
              <GlowLineDivider />
            </Suspense>
          </div>
        </div>

        {/* 9 — Industries */}
        <FlowScene z={SECTION_Z.industries} style={{ backgroundColor: "hsl(var(--forge-concrete))" }}>
          <Suspense fallback={<SectionLoader />}>
            <IndustriesSection />
          </Suspense>
        </FlowScene>

        {/* Glow: Industries (light) → ProjectShowcase (dark) */}
        <Suspense fallback={null}>
          <SectionTransitionGlow variant="light-to-dark" z={SECTION_Z.industriesToProjectGlow} toColor="hsl(var(--forge-obsidian))" />
        </Suspense>

        {/* 10 — ProjectShowcase (flow, internal pin) */}
        <FlowScene z={SECTION_Z.projectShowcase}>
          <Suspense fallback={<SectionLoader />}>
            <ProjectShowcase />
          </Suspense>
        </FlowScene>

        {/* 11 — MaterialMorphScroll (flow, scroll-linked) */}
        <FlowScene z={SECTION_Z.materialMorph}>
          <Suspense fallback={<SectionLoader />}>
            <MaterialMorphScroll />
          </Suspense>
        </FlowScene>

        {/* 12 — Materials */}
        <FlowScene z={SECTION_Z.materials} style={{ backgroundColor: "hsl(var(--forge-gunmetal))" }}>
          <Suspense fallback={<SectionLoader />}>
            <MaterialsSection />
          </Suspense>
        </FlowScene>

        {/* SVG wave: Materials → WhyUs (dark → dark subtle transition) */}
        <div
          className="relative"
          style={{
            height: 80,
            overflow: "hidden",
            backgroundColor: "hsl(var(--forge-gunmetal))",
            zIndex: SECTION_Z.wave,
          }}
        >
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
            <path d="M0 40C240 10 480 0 720 10C960 20 1200 50 1440 40V80H0Z" style={{ fill: 'hsl(var(--forge-gunmetal))' }} />
          </svg>
        </div>

        {/* 13 — WhyUs (sticky) */}
        <Scene z={SECTION_Z.whyUs} style={{ backgroundColor: "hsl(var(--forge-gunmetal))" }}>
          <Suspense fallback={<SectionLoader />}>
            <WhyUsSection />
          </Suspense>
        </Scene>

        {/* Glow: WhyUs (dark) → Capabilities (light) */}
        <Suspense fallback={null}>
          <SectionTransitionGlow variant="dark-to-light" z={SECTION_Z.whyToCapGlow} fromColor="hsl(var(--forge-gunmetal))" />
        </Suspense>

        {/* 14 — Capabilities */}
        <FlowScene z={SECTION_Z.capabilities} style={{ backgroundColor: "hsl(var(--forge-workshop))" }}>
          <Suspense fallback={<SectionLoader />}>
            <CapabilitiesSection />
          </Suspense>
        </FlowScene>

        {/* 15 — Testimonials */}
        <FlowScene z={SECTION_Z.testimonials} style={{ backgroundColor: "hsl(var(--forge-concrete))" }}>
          <Suspense fallback={<SectionLoader />}>
            <TestimonialsSection />
          </Suspense>
        </FlowScene>

        {/* 16 — FAQ/Blog (sticky) */}
        <FlowScene z={SECTION_Z.faqBlog} style={{ backgroundColor: "hsl(var(--forge-mist))" }}>
          <Suspense fallback={<SectionLoader />}>
            <FAQBlogSection />
          </Suspense>
        </FlowScene>

        {/* Glow: FAQ/Blog (light) → FinalCTA (dark) */}
        <Suspense fallback={null}>
          <SectionTransitionGlow variant="light-to-dark" z={SECTION_Z.faqToCtaGlow} toColor="hsl(var(--forge-obsidian))" />
        </Suspense>

        {/* 17 — FinalCTA */}
        <FlowScene z={SECTION_Z.finalCta} style={{ backgroundColor: "hsl(var(--forge-obsidian))" }}>
          <Suspense fallback={<SectionLoader />}>
            <FinalCTASection />
          </Suspense>
        </FlowScene>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
};
