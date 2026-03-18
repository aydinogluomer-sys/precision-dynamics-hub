import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import NexusPromoSection from "@/components/NexusPromoSection";
import HowWeWorkSection from "@/components/HowWeWorkSection";
import CertificationsSection from "@/components/CertificationsSection";
import VideoScrollSection from "@/components/VideoScrollSection";
import ServicesSection from "@/components/ServicesSection";
import IndustriesSection from "@/components/IndustriesSection";
import MaterialsSection from "@/components/MaterialsSection";
import WhyUsSection from "@/components/WhyUsSection";
import CapabilitiesSection from "@/components/CapabilitiesSection";
import StatsSection from "@/components/StatsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQBlogSection from "@/components/FAQBlogSection";
import FinalCTASection from "@/components/FinalCTASection";
import Footer from "@/components/Footer";
import JsonLdSchema from "@/components/JsonLdSchema";
import ParallaxSection from "@/components/ParallaxSection";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { useState } from "react";

/**
 * Thin shadow separator between consecutive dark sections.
 */
const DarkSeparator = () => (
  <div
    className="relative"
    style={{
      height: 1,
      zIndex: 50,
      boxShadow: "0 -8px 32px 8px rgba(0,0,0,0.4)",
    }}
  />
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
      <main className="relative z-10">
        {/* 1 — Hero (dark) */}
        <ParallaxSection index={1} variant="zoom-out-blur">
          <HeroSection isFirstVisit={isFirstVisit} />
        </ParallaxSection>

        {/* 2 — NexusPromo (dark) */}
        <DarkSeparator />
        <ParallaxSection index={2}>
          <NexusPromoSection />
        </ParallaxSection>

        {/* 3 — HowWeWork (light) — has its own sticky horizontal scroll, no ParallaxSection */}
        <div className="relative" style={{ zIndex: 3 }}>
          <HowWeWorkSection />
        </div>

        {/* 4 — Certifications (dark) */}
        <ParallaxSection index={4} variant="slide-up">
          <CertificationsSection />
        </ParallaxSection>

        {/* 5 — Video (dark) — has its own sticky scroll, no ParallaxSection */}
        <DarkSeparator />
        <div className="relative" style={{ zIndex: 5 }}>
          <VideoScrollSection />
        </div>

        {/* 5.5 — Aurora transition (dark→light bridge) */}
        <ParallaxSection index={6}>
          <AuroraBackground
            className="min-h-[50vh] w-full"
            style={{ backgroundColor: "hsl(var(--forge-obsidian))" }}
          >
            <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
              <span className="text-xs uppercase tracking-[0.3em] font-mono mb-4" style={{ color: "hsl(var(--primary))" }}>
                {"Mühendislik Hizmetleri"}
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-white">
                <span>{"Çözümlerimizi Keşfedin"}</span>
              </h2>
            </div>
          </AuroraBackground>
        </ParallaxSection>

        {/* 6 — Services (light) */}
        <ParallaxSection index={7} variant="wipe-mask">
          <ServicesSection />
        </ParallaxSection>

        {/* 7 — Industries (light) — has its own sticky card stack, no ParallaxSection */}
        <div className="relative" style={{ zIndex: 8 }}>
          <IndustriesSection />
        </div>

        {/* 8 — Materials (light) */}
        <ParallaxSection index={9} variant="slide-up">
          <MaterialsSection />
        </ParallaxSection>

        {/* 9 — WhyUs (dark) */}
        <ParallaxSection index={10}>
          <WhyUsSection />
        </ParallaxSection>

        {/* 10 — Capabilities (light) — has internal sticky panel, no ParallaxSection */}
        <div className="relative" style={{ zIndex: 11 }}>
          <CapabilitiesSection />
        </div>

        {/* 11 — Stats (dark) */}
        <ParallaxSection index={12} variant="zoom-out-blur">
          <StatsSection />
        </ParallaxSection>

        {/* 12 — Testimonials (light) */}
        <ParallaxSection index={13}>
          <TestimonialsSection />
        </ParallaxSection>

        {/* 13 — FAQ (light) */}
        <ParallaxSection index={14}>
          <FAQBlogSection />
        </ParallaxSection>

        {/* 14 — FinalCTA (dark, last) */}
        <ParallaxSection index={15} isLast className="relative z-10">
          <FinalCTASection />
        </ParallaxSection>
      </main>
      <div className="sticky bottom-0 z-0">
        <Footer />
      </div>
    </div>
  );
};

export default Index;
