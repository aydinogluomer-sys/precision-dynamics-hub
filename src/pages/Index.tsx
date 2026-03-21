import { Suspense, lazy, useState, forwardRef } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { NexusPromoSection } from "@/components/NexusPromoSection";
import { HowWeWorkSection } from "@/components/HowWeWorkSection";
import { CertificationsSection } from "@/components/CertificationsSection";
import { Footer } from "@/components/Footer";
import { JsonLdSchema } from "@/components/JsonLdSchema";
import { ParallaxSection } from "@/components/ParallaxSection";
import { PageLoader } from "@/components/PageLoader";
import { QuickQuoteSection } from "@/components/QuickQuoteSection";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { SectionDotNav } from "@/components/SectionDotNav";

import { CNCScrollStory } from "@/components/CNCScrollStory";

const VideoScrollSection = lazy(() => import("@/components/VideoScrollSection").then(m => ({ default: m.VideoScrollSection })));
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection").then(m => ({ default: m.TestimonialsSection })));
const MaterialMorphScroll = lazy(() => import("@/components/MaterialMorphScroll").then(m => ({ default: m.MaterialMorphScroll })));
const ProjectShowcase = lazy(() => import("@/components/ProjectShowcase").then(m => ({ default: m.ProjectShowcase })));
const ServicesSection = lazy(() => import("@/components/ServicesSection").then(m => ({ default: m.ServicesSection })));
const IndustriesSection = lazy(() => import("@/components/IndustriesSection").then(m => ({ default: m.IndustriesSection })));
const MaterialsSection = lazy(() => import("@/components/MaterialsSection").then(m => ({ default: m.MaterialsSection })));
const WhyUsSection = lazy(() => import("@/components/WhyUsSection").then(m => ({ default: m.WhyUsSection })));
const CapabilitiesSection = lazy(() => import("@/components/CapabilitiesSection").then(m => ({ default: m.CapabilitiesSection })));
const FAQBlogSection = lazy(() => import("@/components/FAQBlogSection").then(m => ({ default: m.FAQBlogSection })));
const FinalCTASection = lazy(() => import("@/components/FinalCTASection").then(m => ({ default: m.FinalCTASection })));

const SectionLoader = forwardRef<HTMLDivElement>((_, ref) => (
  <div ref={ref} className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "hsl(var(--forge-obsidian))" }}>
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
        {/* z-index 1 */}
        <ParallaxSection index={1} variant="zoom-out-blur">
          <HeroSection isFirstVisit={isFirstVisit} />
        </ParallaxSection>

        {/* z-index 2 */}
        <div className="relative" style={{ zIndex: 2, backgroundColor: "hsl(var(--forge-obsidian))" }}>
          <QuickQuoteSection />
        </div>

        <div className="relative" style={{ zIndex: 2 }}>
          <SectionDivider fillColor="hsl(var(--forge-obsidian))" />
        </div>

        {/* z-index 3 */}
        <div className="relative" style={{ zIndex: 3 }}>
          <CNCScrollStory />
        </div>

        <div className="relative" style={{ zIndex: 4 }}>
          <SectionDivider fillColor="hsl(var(--forge-gunmetal))" flip />
        </div>

        {/* z-index 4 */}
        <ParallaxSection index={4} variant="color-fade">
          <NexusPromoSection />
        </ParallaxSection>

        <div className="relative" style={{ zIndex: 5 }}>
          <SectionDivider fillColor="hsl(var(--forge-concrete))" />
        </div>

        {/* 5 — HowWeWork (sticky içeride, ParallaxSection yok) */}
        <div className="relative" style={{ zIndex: 5 }}>
          <HowWeWorkSection />
        </div>

        {/* z-index 6 */}
        <ParallaxSection index={6} variant="stack">
          <CertificationsSection />
        </ParallaxSection>

        <div className="relative" style={{ zIndex: 7 }}>
          <SectionDivider fillColor="hsl(var(--forge-iron))" />
        </div>

        {/* z-index 7 */}
        <ParallaxSection index={7} variant="zoom-in">
          <Suspense fallback={<SectionLoader />}>
            <VideoScrollSection />
          </Suspense>
        </ParallaxSection>

        <div className="relative" style={{ zIndex: 8 }}>
          <SectionDivider fillColor="hsl(var(--forge-concrete))" flip />
        </div>

        {/* z-index 8 */}
        <ParallaxSection index={8} variant="slide-up">
          <Suspense fallback={<SectionLoader />}>
            <ServicesSection />
          </Suspense>
        </ParallaxSection>

        <div className="relative" style={{ zIndex: 9 }}>
          <SectionDivider fillColor="hsl(var(--forge-iron))" />
        </div>

        {/* z-index 9 */}
        <ParallaxSection index={9} variant="stack">
          <Suspense fallback={<SectionLoader />}>
            <IndustriesSection />
          </Suspense>
        </ParallaxSection>

        <div className="relative" style={{ zIndex: 10 }}>
          <SectionDivider fillColor="hsl(var(--forge-gunmetal))" />
        </div>

        {/* 10 — ProjectShowcase (pin içeride, ParallaxSection yok) */}
        <div className="relative" style={{ zIndex: 10 }}>
          <Suspense fallback={<SectionLoader />}>
            <ProjectShowcase />
          </Suspense>
        </div>

        <div className="relative" style={{ zIndex: 11, backgroundColor: "hsl(var(--forge-obsidian))" }}>
          <SectionDivider fillColor="hsl(var(--forge-obsidian))" flip />
        </div>

        {/* z-index 12 */}
        <div className="relative" style={{ zIndex: 12 }}>
          <Suspense fallback={<SectionLoader />}>
            <MaterialMorphScroll />
          </Suspense>
        </div>

        <div className="relative" style={{ zIndex: 13 }}>
          <SectionDivider fillColor="hsl(var(--forge-mist))" />
        </div>

        {/* z-index 13 */}
        <ParallaxSection index={13} variant="slide-up">
          <Suspense fallback={<SectionLoader />}>
            <MaterialsSection />
          </Suspense>
        </ParallaxSection>

        <div className="relative" style={{ zIndex: 14, backgroundColor: "hsl(var(--forge-mist))" }}>
          <SectionDivider fillColor="hsl(var(--forge-gunmetal))" />
        </div>

        {/* z-index 14 */}
        <ParallaxSection index={14} variant="wipe-mask">
          <Suspense fallback={<SectionLoader />}>
            <WhyUsSection />
          </Suspense>
        </ParallaxSection>

        {/* z-index 15 — StatsSection */}
        <ParallaxSection index={15} variant="zoom-out-blur">
          <StatsSection />
        </ParallaxSection>

        <div className="relative" style={{ zIndex: 16 }}>
          <SectionDivider fillColor="hsl(var(--forge-iron))" />
        </div>

        {/* z-index 16 */}
        <ParallaxSection index={16} variant="depth-3d" videoBg="/machine-loop.mp4">
          <Suspense fallback={<SectionLoader />}>
            <CapabilitiesSection />
          </Suspense>
        </ParallaxSection>

        <div className="relative" style={{ zIndex: 17 }}>
          <SectionDivider fillColor="hsl(var(--forge-gunmetal))" flip />
        </div>

        {/* z-index 17 */}
        <ParallaxSection index={17} variant="stack">
          <Suspense fallback={<SectionLoader />}>
            <TestimonialsSection />
          </Suspense>
        </ParallaxSection>

        <div className="relative" style={{ zIndex: 18 }}>
          <SectionDivider fillColor="hsl(var(--forge-iron))" flip />
        </div>

        {/* z-index 18 */}
        <ParallaxSection index={18} variant="color-fade">
          <Suspense fallback={<SectionLoader />}>
            <FAQBlogSection />
          </Suspense>
        </ParallaxSection>

        <div className="relative" style={{ zIndex: 19 }}>
          <SectionDivider fillColor="hsl(var(--forge-gunmetal))" />
        </div>

        {/* z-index 20 — last section */}
        <ParallaxSection index={20} isLast variant="stack">
          <Suspense fallback={<SectionLoader />}>
            <FinalCTASection />
          </Suspense>
        </ParallaxSection>
      </main>
      <Footer />
    </div>
  );
};
