import { Suspense, lazy, useState, forwardRef } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { NexusPromoSection } from "@/components/NexusPromoSection";
import { QuickQuoteSection } from "@/components/QuickQuoteSection";
import { HowWeWorkSection } from "@/components/HowWeWorkSection";
import { CertificationsSection } from "@/components/CertificationsSection";
import { Footer } from "@/components/Footer";
import { JsonLdSchema } from "@/components/JsonLdSchema";
import { ParallaxSection } from "@/components/ParallaxSection";
import { PageLoader } from "@/components/PageLoader";

import { SectionDivider } from "@/components/ui/SectionDivider";
import { GlowLineDivider } from "@/components/ui/GlowLineDivider";
import { SectionDotNav } from "@/components/SectionDotNav";

import { CNCScrollStory } from "@/components/CNCScrollStory";

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

const SECTIONS = [
  { id: "hero", label: "Ana Sayfa" },
  { id: "hizli-teklif", label: "Hızlı Teklif" },
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

export const Index = () => {
  const [isFirstVisit] = useState(() => {
    const visited = sessionStorage.getItem("mas_visited");
    if (!visited) {
      sessionStorage.setItem("mas_visited", "1");
      return true;
    }
    return false;
  });

  return (
    <div className="min-h-screen bg-background">
      <PageLoader isFirstVisit={isFirstVisit} />
      <Header isFirstVisit={isFirstVisit} />
      <JsonLdSchema type="organization" />
      <SectionDotNav sections={SECTIONS} />
      <main id="main-content" className="relative">
        {/* z-index 1 — Hero with built-in scroll mask (300vh scroller) */}
        <div className="relative" style={{ zIndex: 1 }}>
          <HeroSection isFirstVisit={isFirstVisit} />
        </div>

        {/* z-index 2 */}
        <div className="relative" style={{ zIndex: 2, backgroundColor: "hsl(var(--forge-obsidian))" }}>
          <QuickQuoteSection />
        </div>

        {/* z-index 3 — CNCScrollStory */}
        <div className="relative" style={{ zIndex: 3 }}>
          <CNCScrollStory />
        </div>

        {/* z-index 4 — NexusPromo */}
        <ParallaxSection index={4} variant="color-fade">
          <NexusPromoSection />
        </ParallaxSection>

        {/* Divider: dark → light (gunmetal → workshop) */}
        <div className="relative" style={{ zIndex: 5 }}>
          <SectionDivider fillColor="hsl(var(--forge-workshop))" />
        </div>

        {/* 5 — HowWeWork (sticky içeride, ParallaxSection yok) */}
        <div className="relative" style={{ zIndex: 5 }}>
          <HowWeWorkSection />
        </div>

        {/* z-index 6 — Certifications */}
        <ParallaxSection index={6} variant="stack">
          <CertificationsSection />
        </ParallaxSection>

        {/* z-index 7 — VideoScroll */}
        <ParallaxSection index={7} variant="zoom-in">
          <Suspense fallback={<SectionLoader />}>
            <VideoScrollSection />
          </Suspense>
        </ParallaxSection>

        {/* Divider: flip → dalga yukarı bakıyor → üstteki (Video/obsidian) rengi */}
        <div className="relative" style={{ zIndex: 8 }}>
          <SectionDivider fillColor="hsl(var(--forge-obsidian))" flip />
        </div>

        {/* z-index 8 — Services */}
        <ParallaxSection index={8} variant="slide-up">
          <Suspense fallback={<SectionLoader />}>
            <ServicesSection />
          </Suspense>
        </ParallaxSection>

        {/* z-index 9 — Industries */}
        <ParallaxSection index={9} variant="stack">
          <Suspense fallback={<SectionLoader />}>
            <IndustriesSection />
          </Suspense>
        </ParallaxSection>

        {/* Divider: light → dark (workshop → obsidian) */}
        <div className="relative" style={{ zIndex: 10 }}>
          <SectionDivider fillColor="hsl(var(--forge-obsidian))" />
        </div>

        {/* 10 — ProjectShowcase (pin içeride, ParallaxSection yok) */}
        <div className="relative" style={{ zIndex: 10 }}>
          <Suspense fallback={<SectionLoader />}>
            <ProjectShowcase />
          </Suspense>
        </div>

        {/* z-index 12 — MaterialMorphScroll */}
        <div className="relative" style={{ zIndex: 12 }}>
          <Suspense fallback={<SectionLoader />}>
            <MaterialMorphScroll />
          </Suspense>
        </div>

        {/* Divider: flip → dalga yukarı bakıyor → üstteki (MaterialMorph/obsidian) rengi */}
        <div className="relative" style={{ zIndex: 13 }}>
          <SectionDivider fillColor="hsl(var(--forge-obsidian))" flip />
        </div>

        {/* z-index 13 — Materials */}
        <ParallaxSection index={13} variant="slide-up">
          <Suspense fallback={<SectionLoader />}>
            <MaterialsSection />
          </Suspense>
        </ParallaxSection>

        {/* Divider: light → dark */}

        <div
          style={{
            height: 80,
            overflow: "hidden",
            backgroundColor: "#dde3e8",
            zIndex: 14,
            position: "relative",
          }}
        >
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
            <path d="M0 40C240 10 480 0 720 10C960 20 1200 50 1440 40V80H0Z" fill="#1a1a2e" />
          </svg>
        </div>

        {/* 14 — WhyUs */}
        <div className="relative" style={{ zIndex: 14 }}>
          <Suspense fallback={<SectionLoader />}>
            <WhyUsSection />
          </Suspense>
        </div>

        {/* 15 — Capabilities + Testimonials — tek ghost video */}
        <div className="relative" style={{ zIndex: 15, backgroundColor: "hsl(var(--forge-workshop))" }}>
          <video
            src="/machine-loop.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none hidden md:block"
            style={{ opacity: 0.5, zIndex: 0 }}
            aria-hidden="true"
          />
          <div style={{ position: "relative", zIndex: 1 }}>
            <Suspense fallback={<SectionLoader />}>
              <CapabilitiesSection />
            </Suspense>
            <Suspense fallback={<SectionLoader />}>
              <TestimonialsSection />
            </Suspense>
          </div>
        </div>

        {/* 16 — FAQ/Blog */}
        <ParallaxSection index={17} variant="color-fade">
          <Suspense fallback={<SectionLoader />}>
            <FAQBlogSection />
          </Suspense>
        </ParallaxSection>

        {/* Divider: light → dark (mist → obsidian) — final dramatic transition */}
        <div className="relative" style={{ zIndex: 18 }}>
          <SectionDivider fillColor="hsl(var(--forge-obsidian))" />
        </div>

        {/* 17 — Final CTA (last) */}
        <ParallaxSection index={18} isLast variant="stack">
          <Suspense fallback={<SectionLoader />}>
            <FinalCTASection />
          </Suspense>
        </ParallaxSection>
      </main>
      <Footer />
    </div>
  );
};
