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
        {/* 1 — Hero */}
        <ParallaxSection index={0} variant="zoom-out-blur">
          <HeroSection isFirstVisit={isFirstVisit} />
        </ParallaxSection>

        {/* 2 — NexusPromo */}
        <ParallaxSection index={1} variant="stack">
          <NexusPromoSection />
        </ParallaxSection>

        {/* 3 — HowWeWork — internal sticky, NOT wrapped */}
        <HowWeWorkSection />

        {/* 4 — Certifications */}
        <ParallaxSection index={3} variant="slide-up">
          <CertificationsSection />
        </ParallaxSection>

        {/* 5 — Video scroll — internal sticky, NOT wrapped */}
        <VideoScrollSection />

        {/* 5.5 — Aurora transition */}
        <ParallaxSection index={5} variant="stack">
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

        {/* 6 — Services */}
        <ParallaxSection index={6} variant="wipe-mask">
          <ServicesSection />
        </ParallaxSection>

        {/* 7 — Industries — internal sticky, NOT wrapped */}
        <IndustriesSection />

        {/* 8 — Materials */}
        <ParallaxSection index={8} variant="color-fade">
          <MaterialsSection />
        </ParallaxSection>

        {/* 9 — WhyUs */}
        <ParallaxSection index={9} variant="stack">
          <WhyUsSection />
        </ParallaxSection>

        {/* 10 — Capabilities — internal sticky, NOT wrapped */}
        <CapabilitiesSection />

        {/* 11 — Stats */}
        <ParallaxSection index={11} variant="zoom-out-blur">
          <StatsSection />
        </ParallaxSection>

        {/* 12 — Testimonials */}
        <ParallaxSection index={12} variant="stack">
          <TestimonialsSection />
        </ParallaxSection>

        {/* 13 — FAQ */}
        <ParallaxSection index={13} variant="slide-up">
          <FAQBlogSection />
        </ParallaxSection>

        {/* 14 — FinalCTA */}
        <ParallaxSection index={14} isLast variant="stack">
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
