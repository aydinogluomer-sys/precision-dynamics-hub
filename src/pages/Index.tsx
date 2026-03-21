import { Suspense, lazy, useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import NexusPromoSection from "@/components/NexusPromoSection";
import HowWeWorkSection from "@/components/HowWeWorkSection";
import CertificationsSection from "@/components/CertificationsSection";
import ServicesSection from "@/components/ServicesSection";
import IndustriesSection from "@/components/IndustriesSection";
import MaterialsSection from "@/components/MaterialsSection";
import WhyUsSection from "@/components/WhyUsSection";
import CapabilitiesSection from "@/components/CapabilitiesSection";
import StatsSection from "@/components/StatsSection";
import FAQBlogSection from "@/components/FAQBlogSection";
import FinalCTASection from "@/components/FinalCTASection";
import Footer from "@/components/Footer";
import JsonLdSchema from "@/components/JsonLdSchema";
import ParallaxSection from "@/components/ParallaxSection";
import PageLoader from "@/components/PageLoader";
import QuickQuoteSection from "@/components/QuickQuoteSection";
import { SectionDivider } from "@/components/ui/SectionDivider";

import CNCScrollStory from "@/components/CNCScrollStory";

const VideoScrollSection = lazy(() => import("@/components/VideoScrollSection"));
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection"));
const MaterialMorphScroll = lazy(() => import("@/components/MaterialMorphScroll"));
const ProjectShowcase = lazy(() => import("@/components/ProjectShowcase"));

const SectionLoader = () => (
  <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "hsl(var(--forge-obsidian))" }}>
    <div className="w-8 h-8 border-2 border-primary border-t-transparent animate-spin" />
  </div>
);

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
      <main id="main-content" className="relative">
        <ParallaxSection index={1} variant="zoom-out-blur">
          <HeroSection isFirstVisit={isFirstVisit} />
        </ParallaxSection>

        <QuickQuoteSection />

        <SectionDivider fillColor="hsl(var(--forge-obsidian))" />

        <div className="relative" style={{ zIndex: 2 }}>
          <CNCScrollStory />
        </div>

        <SectionDivider fillColor="hsl(var(--forge-obsidian))" flip />

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

        <SectionDivider fillColor="hsl(var(--forge-obsidian))" />

        <ParallaxSection index={5} variant="zoom-in">
          <Suspense fallback={<SectionLoader />}>
            <VideoScrollSection />
          </Suspense>
        </ParallaxSection>

        {/* Aurora section removed — ServicesSection has its own header */}

        <SectionDivider fillColor="hsl(var(--forge-concrete))" flip />

        <ParallaxSection index={6} variant="slide-up">
          <ServicesSection />
        </ParallaxSection>

        <SectionDivider fillColor="hsl(var(--forge-obsidian))" />

        <ParallaxSection index={7} variant="stack">
          <IndustriesSection />
        </ParallaxSection>

        {/* Project Showcase — horizontal scroll */}
        <SectionDivider fillColor="hsl(var(--forge-obsidian))" />
        <div className="relative" style={{ zIndex: 8 }}>
          <Suspense fallback={<SectionLoader />}>
            <ProjectShowcase />
          </Suspense>
        </div>

        <SectionDivider fillColor="hsl(var(--forge-obsidian))" flip />

        <div className="relative" style={{ zIndex: 9 }}>
          <Suspense fallback={<SectionLoader />}>
            <MaterialMorphScroll />
          </Suspense>
        </div>

        <SectionDivider fillColor="hsl(var(--forge-concrete))" />

        <ParallaxSection index={8} variant="slide-up">
          <MaterialsSection />
        </ParallaxSection>

        <SectionDivider fillColor="hsl(var(--forge-obsidian))" flip />

        <ParallaxSection index={9} variant="wipe-mask">
          <WhyUsSection />
        </ParallaxSection>

        <SectionDivider fillColor="hsl(var(--forge-obsidian))" />

        <ParallaxSection index={10} variant="depth-3d">
          <CapabilitiesSection />
        </ParallaxSection>

        <SectionDivider fillColor="hsl(var(--forge-obsidian))" flip />

        <ParallaxSection index={11} variant="zoom-out-blur">
          <StatsSection />
        </ParallaxSection>

        <SectionDivider fillColor="hsl(var(--forge-obsidian))" />

        <ParallaxSection index={12} variant="stack">
          <Suspense fallback={<SectionLoader />}>
            <TestimonialsSection />
          </Suspense>
        </ParallaxSection>

        <SectionDivider fillColor="hsl(var(--forge-obsidian))" flip />

        <ParallaxSection index={13} variant="color-fade">
          <FAQBlogSection />
        </ParallaxSection>

        <SectionDivider fillColor="hsl(var(--forge-obsidian))" />
        <ParallaxSection index={14} isLast variant="stack">
          <FinalCTASection />
        </ParallaxSection>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
