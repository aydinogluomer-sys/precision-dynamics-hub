import { Suspense, lazy, useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import NexusPromoSection from "@/components/NexusPromoSection";
import HowWeWorkSection from "@/components/HowWeWorkSection";
import CertificationsSection from "@/components/CertificationsSection";
import Footer from "@/components/Footer";
import JsonLdSchema from "@/components/JsonLdSchema";
import ParallaxSection from "@/components/ParallaxSection";
import PageLoader from "@/components/PageLoader";
import QuickQuoteSection from "@/components/QuickQuoteSection";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { SectionDotNav } from "@/components/SectionDotNav";

import CNCScrollStory from "@/components/CNCScrollStory";

const VideoScrollSection = lazy(() => import("@/components/VideoScrollSection"));
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection"));
const MaterialMorphScroll = lazy(() => import("@/components/MaterialMorphScroll"));
const ProjectShowcase = lazy(() => import("@/components/ProjectShowcase"));
const ServicesSection = lazy(() => import("@/components/ServicesSection"));
const IndustriesSection = lazy(() => import("@/components/IndustriesSection"));
const MaterialsSection = lazy(() => import("@/components/MaterialsSection"));
const WhyUsSection = lazy(() => import("@/components/WhyUsSection"));
const CapabilitiesSection = lazy(() => import("@/components/CapabilitiesSection"));
const FAQBlogSection = lazy(() => import("@/components/FAQBlogSection"));
const FinalCTASection = lazy(() => import("@/components/FinalCTASection"));

const SectionLoader = () => (
  <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "hsl(var(--forge-obsidian))" }}>
    <div className="w-8 h-8 border-2 border-primary border-t-transparent animate-spin" />
  </div>
);

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

const Index = () => {
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
        <ParallaxSection index={1} variant="zoom-out-blur">
          <HeroSection isFirstVisit={isFirstVisit} />
        </ParallaxSection>

        <QuickQuoteSection />

        <SectionDivider fillColor="hsl(var(--forge-obsidian))" />

        <div className="relative" style={{ zIndex: 2 }}>
          <CNCScrollStory />
        </div>

        <SectionDivider fillColor="hsl(var(--forge-gunmetal))" flip />

        <ParallaxSection index={2} variant="color-fade">
          <NexusPromoSection />
        </ParallaxSection>

        <SectionDivider fillColor="hsl(var(--forge-concrete))" />

        <ParallaxSection index={3} variant="slide-up">
          <HowWeWorkSection />
        </ParallaxSection>

        <ParallaxSection index={4} variant="stack">
          <CertificationsSection />
        </ParallaxSection>

        <SectionDivider fillColor="hsl(var(--forge-deep-iron))" />

        <ParallaxSection index={5} variant="zoom-in">
          <Suspense fallback={<SectionLoader />}>
            <VideoScrollSection />
          </Suspense>
        </ParallaxSection>

        <SectionDivider fillColor="hsl(var(--forge-concrete))" flip />

        <ParallaxSection index={6} variant="slide-up">
          <Suspense fallback={<SectionLoader />}>
            <ServicesSection />
          </Suspense>
        </ParallaxSection>

        <SectionDivider fillColor="hsl(var(--forge-deep-iron))" />

        <ParallaxSection index={7} variant="stack">
          <Suspense fallback={<SectionLoader />}>
            <IndustriesSection />
          </Suspense>
        </ParallaxSection>

        <SectionDivider fillColor="hsl(var(--forge-gunmetal))" />
        <ParallaxSection index={8} variant="stack">
          <Suspense fallback={<SectionLoader />}>
            <ProjectShowcase />
          </Suspense>
        </ParallaxSection>

        <SectionDivider fillColor="hsl(var(--forge-obsidian))" flip />

        <div className="relative" style={{ zIndex: 9 }}>
          <Suspense fallback={<SectionLoader />}>
            <MaterialMorphScroll />
          </Suspense>
        </div>

        <SectionDivider fillColor="hsl(var(--forge-steel-mist))" />

        <ParallaxSection index={8} variant="slide-up">
          <Suspense fallback={<SectionLoader />}>
            <MaterialsSection />
          </Suspense>
        </ParallaxSection>

        <ParallaxSection index={9} variant="wipe-mask">
          <Suspense fallback={<SectionLoader />}>
            <WhyUsSection />
          </Suspense>
        </ParallaxSection>

        <SectionDivider fillColor="hsl(var(--forge-obsidian))" />

        <ParallaxSection index={10} variant="depth-3d" videoBg="/machine-loop.mp4">
          <Suspense fallback={<SectionLoader />}>
            <CapabilitiesSection />
          </Suspense>
        </ParallaxSection>

        <SectionDivider fillColor="hsl(var(--forge-obsidian))" flip />

        <ParallaxSection index={12} variant="stack">
          <Suspense fallback={<SectionLoader />}>
            <TestimonialsSection />
          </Suspense>
        </ParallaxSection>

        <SectionDivider fillColor="hsl(var(--forge-obsidian))" flip />

        <ParallaxSection index={13} variant="color-fade">
          <Suspense fallback={<SectionLoader />}>
            <FAQBlogSection />
          </Suspense>
        </ParallaxSection>

        <SectionDivider fillColor="hsl(var(--forge-obsidian))" />
        <ParallaxSection index={14} isLast variant="stack">
          <Suspense fallback={<SectionLoader />}>
            <FinalCTASection />
          </Suspense>
        </ParallaxSection>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
