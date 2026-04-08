import { Suspense, lazy, useState, forwardRef, type ReactNode } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { JsonLdSchema } from "@/components/JsonLdSchema";
import { PageLoader } from "@/components/PageLoader";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { useGPUCapability } from "@/hooks/useGPUCapability";
import { Z } from "@/styles/z-index";

const NexusPromoSection = lazy(() =>
  import("@/components/NexusPromoSection").then((m) => ({ default: m.NexusPromoSection })),
);
const HowWeWorkSection = lazy(() =>
  import("@/components/HowWeWorkSection").then((m) => ({ default: m.HowWeWorkSection })),
);
const CertificationsSection = lazy(() =>
  import("@/components/CertificationsSection").then((m) => ({ default: m.CertificationsSection })),
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

  return (
    <div className="min-h-screen bg-background">
      <PageLoader isFirstVisit={isFirstVisit} />
      <Header isFirstVisit={isFirstVisit} />
      <JsonLdSchema type="organization" />
      <Suspense fallback={null}>
        <SectionDotNav sections={SECTIONS} />
      </Suspense>

      <main id="main-content" className="relative">
        {/* 1 — Hero + QuickQuote */}
        <FlowScene z={Z.content}>
          <HeroSection isFirstVisit={isFirstVisit} />
        </FlowScene>

        {/* Lava Typography Scene */}
        {gpu !== 'none' && (
          <FlowScene z={Z.lavaTypography}>
            <ErrorBoundary>
              <Suspense fallback={<SectionLoader />}>
                <LavaTypographyScene />
              </Suspense>
            </ErrorBoundary>
          </FlowScene>
        )}

        {/* Mold Cast Scene */}
        {gpu !== 'none' && (
          <FlowScene z={Z.moldCast}>
            <ErrorBoundary>
              <Suspense fallback={<SectionLoader />}>
                <MoldCastScene />
              </Suspense>
            </ErrorBoundary>
          </FlowScene>
        )}

        {/* CNCScrollStory */}
        <FlowScene z={Z.cncStory}>
          <ErrorBoundary>
            <Suspense fallback={<SectionLoader />}>
              <CNCScrollStory />
            </Suspense>
          </ErrorBoundary>
        </FlowScene>

        {/* 4 — NexusPromo (sticky) */}
        <Scene z={4} style={{ backgroundColor: "hsl(var(--forge-obsidian))" }}>
          <Suspense fallback={<SectionLoader />}>
            <NexusPromoSection />
          </Suspense>
        </Scene>

        {/* Glow: Nexus (dark) → HowWeWork (light) */}
        <Suspense fallback={null}>
          <SectionTransitionGlow variant="dark-to-light" z={5} fromColor="hsl(var(--forge-obsidian))" />
        </Suspense>

        {/* 5 — HowWeWork (flow, GSAP pin inside) */}
        <FlowScene z={5} style={{ backgroundColor: "hsl(var(--forge-workshop))" }}>
          <Suspense fallback={<SectionLoader />}>
            <HowWeWorkSection />
          </Suspense>
        </FlowScene>

        {/* Glow: HowWeWork (light) → Certifications (dark) */}
        <Suspense fallback={null}>
          <SectionTransitionGlow variant="light-to-dark" z={6} toColor="hsl(var(--forge-obsidian))" />
        </Suspense>

        {/* 6 — Certifications (sticky) */}
        <Scene z={6} style={{ backgroundColor: "hsl(var(--forge-obsidian))" }}>
          <Suspense fallback={<SectionLoader />}>
            <CertificationsSection />
          </Suspense>
        </Scene>

        {/* 7 — VideoScroll (flow, scroll-linked video) */}
        <FlowScene z={7}>
          <Suspense fallback={<SectionLoader />}>
            <VideoScrollSection />
          </Suspense>
        </FlowScene>

        {/* Glow: VideoScroll (dark) → Services (light) */}
        <SectionTransitionGlow variant="dark-to-light" z={8} fromColor="hsl(var(--forge-obsidian))" />

        {/* 8 — Services (sticky) */}
        <Scene z={8} style={{ backgroundColor: "hsl(var(--forge-concrete))" }}>
          <Suspense fallback={<SectionLoader />}>
            <ServicesSection />
          </Suspense>
        </Scene>

        {/* GlowLine: Services → Industries (Açık → Açık) */}
        <div className="relative" style={{ zIndex: 8, backgroundColor: "hsl(var(--forge-concrete))" }}>
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <GlowLineDivider />
          </div>
        </div>

        {/* 9 — Industries (sticky) */}
        <Scene z={9} style={{ backgroundColor: "hsl(var(--forge-concrete))" }}>
          <Suspense fallback={<SectionLoader />}>
            <IndustriesSection />
          </Suspense>
        </Scene>

        {/* Glow: Industries (light) → ProjectShowcase (dark) */}
        <SectionTransitionGlow variant="light-to-dark" z={10} toColor="hsl(var(--forge-obsidian))" />

        {/* 10 — ProjectShowcase (flow, internal pin) */}
        <FlowScene z={10}>
          <Suspense fallback={<SectionLoader />}>
            <ProjectShowcase />
          </Suspense>
        </FlowScene>

        {/* 11 — MaterialMorphScroll (flow, scroll-linked) */}
        <FlowScene z={11}>
          <Suspense fallback={<SectionLoader />}>
            <MaterialMorphScroll />
          </Suspense>
        </FlowScene>

        {/* 12 — Materials (sticky) */}
        <Scene z={12} style={{ backgroundColor: "hsl(var(--forge-gunmetal))" }}>
          <Suspense fallback={<SectionLoader />}>
            <MaterialsSection />
          </Suspense>
        </Scene>

        {/* SVG wave: Materials → WhyUs (dark → dark subtle transition) */}
        <div
          className="relative"
          style={{
            height: 80,
            overflow: "hidden",
            backgroundColor: "hsl(var(--forge-gunmetal))",
            zIndex: 13,
          }}
        >
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
            <path d="M0 40C240 10 480 0 720 10C960 20 1200 50 1440 40V80H0Z" fill="#1a1a2e" />
          </svg>
        </div>

        {/* 13 — WhyUs (sticky) */}
        <Scene z={13} style={{ backgroundColor: "hsl(var(--forge-gunmetal))" }}>
          <Suspense fallback={<SectionLoader />}>
            <WhyUsSection />
          </Suspense>
        </Scene>

        {/* Glow: WhyUs (dark) → Capabilities (light) */}
        <SectionTransitionGlow variant="dark-to-light" z={14} fromColor="hsl(var(--forge-gunmetal))" />

        {/* 14 — Capabilities (sticky) */}
        <Scene z={14} style={{ backgroundColor: "hsl(var(--forge-workshop))" }}>
          <Suspense fallback={<SectionLoader />}>
            <CapabilitiesSection />
          </Suspense>
        </Scene>

        {/* 15 — Testimonials (sticky, subtle grain/tone shift from Capabilities) */}
        <Scene z={15} style={{ backgroundColor: "hsl(var(--forge-concrete))" }}>
          <Suspense fallback={<SectionLoader />}>
            <TestimonialsSection />
          </Suspense>
        </Scene>

        {/* 16 — FAQ/Blog (sticky) */}
        <Scene z={16} style={{ backgroundColor: "hsl(var(--forge-mist))" }}>
          <Suspense fallback={<SectionLoader />}>
            <FAQBlogSection />
          </Suspense>
        </Scene>

        {/* Glow: FAQ/Blog (light) → FinalCTA (dark) */}
        <SectionTransitionGlow variant="light-to-dark" z={17} toColor="hsl(var(--forge-obsidian))" />

        {/* 17 — FinalCTA (sticky, last) */}
        <Scene z={17} style={{ backgroundColor: "hsl(var(--forge-obsidian))" }}>
          <Suspense fallback={<SectionLoader />}>
            <FinalCTASection />
          </Suspense>
        </Scene>
      </main>

      <Footer />
    </div>
  );
};
