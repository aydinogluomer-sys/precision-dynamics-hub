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
import { AuroraBackground } from "@/components/ui/aurora-background";

const VideoScrollSection = lazy(() => import("@/components/VideoScrollSection"));
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection"));
const CNCScrollStory = lazy(() => import("@/components/CNCScrollStory"));
const MaterialMorphScroll = lazy(() => import("@/components/MaterialMorphScroll"));

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
      <Header isFirstVisit={isFirstVisit} />
      <JsonLdSchema type="organization" />
      <main id="main-content" className="relative">
        <ParallaxSection index={1} variant="zoom-out-blur">
          <HeroSection isFirstVisit={isFirstVisit} />
        </ParallaxSection>

        <div className="relative" style={{ zIndex: 2 }}>
          <Suspense fallback={<SectionLoader />}>
            <CNCScrollStory />
          </Suspense>
        </div>

        <ParallaxSection index={2} variant="color-fade">
          <NexusPromoSection />
        </ParallaxSection>

        <ParallaxSection index={3} variant="slide-up">
          <HowWeWorkSection />
        </ParallaxSection>

        <ParallaxSection index={4} variant="stack">
          <CertificationsSection />
        </ParallaxSection>

        <ParallaxSection index={5} variant="zoom-in">
          <Suspense fallback={<SectionLoader />}>
            <VideoScrollSection />
          </Suspense>
        </ParallaxSection>

        <ParallaxSection index={6} variant="color-fade">
          <section style={{ backgroundColor: "hsl(var(--forge-obsidian))" }}>
            <AuroraBackground className="min-h-[50vh] w-full" style={{ backgroundColor: "hsl(var(--forge-obsidian))" }}>
              <div className="relative z-10 flex min-h-[50vh] flex-col items-center justify-center px-4 text-center">
                <span className="mb-4 text-xs font-mono uppercase tracking-[0.3em] text-primary">
                  {"Mühendislik Hizmetleri"}
                </span>
                <h2 className="text-3xl font-bold text-primary-foreground md:text-5xl">
                  <span>{"Çözümlerimizi Keşfedin"}</span>
                </h2>
              </div>
            </AuroraBackground>
          </section>
        </ParallaxSection>

        <ParallaxSection index={7} variant="slide-up">
          <ServicesSection />
        </ParallaxSection>

        <ParallaxSection index={8} variant="stack">
          <IndustriesSection />
        </ParallaxSection>

        <Suspense fallback={<SectionLoader />}>
          <MaterialMorphScroll />
        </Suspense>

        <ParallaxSection index={9} variant="slide-up">
          <MaterialsSection />
        </ParallaxSection>

        <ParallaxSection index={10} variant="wipe-mask">
          <WhyUsSection />
        </ParallaxSection>

        <ParallaxSection index={11} variant="depth-3d">
          <CapabilitiesSection />
        </ParallaxSection>

        <ParallaxSection index={12} variant="zoom-out-blur">
          <StatsSection />
        </ParallaxSection>

        <ParallaxSection index={13} variant="stack">
          <Suspense fallback={<SectionLoader />}>
            <TestimonialsSection />
          </Suspense>
        </ParallaxSection>

        <ParallaxSection index={14} variant="color-fade">
          <FAQBlogSection />
        </ParallaxSection>

        <ParallaxSection index={15} isLast variant="stack">
          <FinalCTASection />
        </ParallaxSection>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
