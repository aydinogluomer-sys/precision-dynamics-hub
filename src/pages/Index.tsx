import { Suspense, lazy, useState, useEffect, useRef, forwardRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { JsonLdSchema } from "@/components/JsonLdSchema";
import { PageLoader } from "@/components/PageLoader";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { SectionDotNav } from "@/components/SectionDotNav";
import { useGPUCapability } from "@/hooks/useGPUCapability";
import { Scene, FlowScene } from "@/components/StackingScene";
import { SECTION_Z } from "@/styles/z-index";

const Footer = lazy(() => import("@/components/Footer").then((m) => ({ default: m.Footer })));
const GlowLineDivider = lazy(() =>
  import("@/components/ui/GlowLineDivider").then((m) => ({ default: m.GlowLineDivider })),
);
const TransitionBridge = lazy(() =>
  import("@/components/ui/TransitionBridge").then((m) => ({ default: m.TransitionBridge })),
);
const TestimonialsSection = lazy(() =>
  import("@/components/TestimonialsSection").then((m) => {
    const Component = m.TestimonialsSection;
    return { default: function LazyTestimonialsSection() { return <Component />; } };
  }),
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
    style={{ backgroundColor: "var(--bg-dark-obsidian)" }}
  >
    <div className="w-8 h-8 border-2 border-primary border-t-transparent animate-spin" />
  </div>
));
SectionLoader.displayName = "SectionLoader";

/* ── Dot-nav labels ── */
const SECTIONS = [
  { id: "hero", label: "Ana Sayfa" },
  { id: "hizmetler", label: "Hizmetler" },
  { id: "endustriler", label: "Endüstriler" },
  { id: "malzemeler", label: "Malzemeler" },
  { id: "neden-biz", label: "Neden Biz" },
  { id: "kabiliyetler", label: "Kabiliyetler" },
  { id: "referanslar", label: "Referanslar" },
  { id: "sss-blog", label: "SSS & Blog" },
  { id: "iletisim", label: "İletişim" },
];

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
      <SectionDotNav sections={SECTIONS} />

      <main id="main-content" ref={mainRef} className="relative">
        {/* 1 — Hero + QuickQuote */}
        <FlowScene id="hero" z={SECTION_Z.hero}>
          <HeroSection isFirstVisit={isFirstVisit} />
        </FlowScene>



        {/* CNCScrollStory */}
        <FlowScene id="cnc-story" z={SECTION_Z.cncStory}>
          <ErrorBoundary>
            <Suspense fallback={<SectionLoader />}>
              <CNCScrollStory />
            </Suspense>
          </ErrorBoundary>
        </FlowScene>

        {/* 4 — NexusPromo (sticky) */}
        <Scene id="nexus" z={SECTION_Z.nexus} style={{ backgroundColor: "var(--bg-dark-gunmetal)" }}>
          <Suspense fallback={<SectionLoader />}>
            <NexusPromoSection />
          </Suspense>
        </Scene>

        {/* Bridge: Nexus (dark) → HowWeWork (light) */}
        <Suspense fallback={null}>
          <TransitionBridge variant="dark-to-light" z={SECTION_Z.bridgeNexusHww} fromColor="var(--bg-dark-gunmetal)" toColor="var(--bg-light-workshop)" />
        </Suspense>

        {/* 5 — HowWeWork (flow, GSAP pin inside) */}
        <FlowScene z={SECTION_Z.howWeWork} style={{ backgroundColor: "var(--bg-light-workshop)" }}>
          <Suspense fallback={<SectionLoader />}>
            <HowWeWorkSection />
          </Suspense>
        </FlowScene>

        {/* Bridge: HowWeWork (light) → Certifications (dark) */}
        <Suspense fallback={null}>
          <TransitionBridge variant="light-to-dark" z={SECTION_Z.bridgeHwwCert} fromColor="var(--bg-light-workshop)" toColor="var(--bg-dark-obsidian)" />
        </Suspense>

        {/* 6 — Certifications (sticky) */}
        <Scene z={SECTION_Z.certifications} style={{ backgroundColor: "var(--bg-dark-obsidian)" }}>
          <Suspense fallback={<SectionLoader />}>
            <CertificationsSection />
          </Suspense>
        </Scene>

        {/* 7 — VideoScroll (flow, scroll-linked video) */}
        <FlowScene id="video" z={SECTION_Z.videoScroll}>
          <Suspense fallback={<SectionLoader />}>
            <VideoScrollSection />
          </Suspense>
        </FlowScene>

        {/* Bridge: VideoScroll (dark) → Services (light) */}
        <Suspense fallback={null}>
          <TransitionBridge variant="dark-to-light" z={SECTION_Z.bridgeVideoCert} fromColor="var(--bg-dark-obsidian)" toColor="var(--bg-light-concrete)" />
        </Suspense>

        {/* 8 — Services (flow — content exceeds viewport) */}
        <FlowScene z={SECTION_Z.services} style={{ backgroundColor: "var(--bg-light-concrete)" }}>
          <Suspense fallback={<SectionLoader />}>
            <ServicesSection />
          </Suspense>
        </FlowScene>

        {/* GlowLine: Services → Industries (Açık → Açık) */}
        <div className="relative" style={{ zIndex: SECTION_Z.glowLine, backgroundColor: "var(--bg-light-concrete)" }}>
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <Suspense fallback={null}>
              <GlowLineDivider />
            </Suspense>
          </div>
        </div>

        {/* 9 — Industries (flow — content exceeds viewport) */}
        <FlowScene z={SECTION_Z.industries} style={{ backgroundColor: "var(--bg-light-concrete)" }}>
          <Suspense fallback={<SectionLoader />}>
            <IndustriesSection />
          </Suspense>
        </FlowScene>

        {/* Bridge: Industries (light) → ProjectShowcase (dark) */}
        <Suspense fallback={null}>
          <TransitionBridge variant="light-to-dark" z={SECTION_Z.bridgeIndProject} fromColor="var(--bg-light-concrete)" toColor="var(--bg-dark-obsidian)" />
        </Suspense>

        {/* 10 — ProjectShowcase (flow, internal pin) */}
        <FlowScene id="projeler" z={SECTION_Z.projectShowcase}>
          <Suspense fallback={<SectionLoader />}>
            <ProjectShowcase />
          </Suspense>
        </FlowScene>

        {/* 11 — MaterialMorphScroll (flow, scroll-linked) */}
        <FlowScene id="malzeme-morph" z={SECTION_Z.materialMorph}>
          <Suspense fallback={<SectionLoader />}>
            <MaterialMorphScroll />
          </Suspense>
        </FlowScene>

        {/* 12 — Materials (flow — content exceeds viewport) */}
        <FlowScene z={SECTION_Z.materials} style={{ backgroundColor: "var(--bg-dark-gunmetal)" }}>
          <Suspense fallback={<SectionLoader />}>
            <MaterialsSection />
          </Suspense>
        </FlowScene>

        {/* Bridge: Materials → WhyUs (dark → dark) */}
        <Suspense fallback={null}>
          <TransitionBridge variant="dark-to-dark" z={SECTION_Z.bridgeMaterialsWhy} fromColor="var(--bg-dark-gunmetal)" toColor="var(--bg-dark-gunmetal)" />
        </Suspense>

        {/* 13 — WhyUs (sticky) */}
        <Scene z={SECTION_Z.whyUs} style={{ backgroundColor: "var(--bg-dark-gunmetal)" }}>
          <Suspense fallback={<SectionLoader />}>
            <WhyUsSection />
          </Suspense>
        </Scene>

        {/* Bridge: WhyUs (dark) → Capabilities (light) */}
        <Suspense fallback={null}>
          <TransitionBridge variant="dark-to-light" z={SECTION_Z.bridgeWhyCap} fromColor="var(--bg-dark-gunmetal)" toColor="var(--bg-light-workshop)" />
        </Suspense>

        {/* 14 — Capabilities (sticky) */}
        <Scene z={SECTION_Z.capabilities} style={{ backgroundColor: "var(--bg-light-workshop)" }}>
          <Suspense fallback={<SectionLoader />}>
            <CapabilitiesSection />
          </Suspense>
        </Scene>

        {/* 15 — Testimonials (flow — content exceeds viewport) */}
        <FlowScene z={SECTION_Z.testimonials} style={{ backgroundColor: "var(--bg-light-testimonial)" }}>
          <Suspense fallback={<SectionLoader />}>
            <TestimonialsSection />
          </Suspense>
        </FlowScene>

        {/* 16 — FAQ/Blog (flow — content exceeds viewport) */}
        <FlowScene z={SECTION_Z.faqBlog} style={{ backgroundColor: "var(--bg-light-mist)" }}>
          <Suspense fallback={<SectionLoader />}>
            <FAQBlogSection />
          </Suspense>
        </FlowScene>

        {/* Bridge: FAQ/Blog (light) → FinalCTA (dark) */}
        <Suspense fallback={null}>
          <TransitionBridge variant="light-to-dark" z={SECTION_Z.bridgeFaqCta} fromColor="var(--bg-light-mist)" toColor="var(--bg-dark-obsidian)" />
        </Suspense>

        {/* 17 — FinalCTA (sticky, last) */}
        <Scene z={SECTION_Z.finalCta} style={{ backgroundColor: "var(--bg-dark-obsidian)" }}>
          <Suspense fallback={<SectionLoader />}>
            <FinalCTASection />
          </Suspense>
        </Scene>
      </main>

      <Suspense fallback={null}>
        <Footer variant="reveal" />
      </Suspense>
    </div>
  );
};
