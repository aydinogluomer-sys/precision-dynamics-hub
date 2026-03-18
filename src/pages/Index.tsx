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
        <HeroSection isFirstVisit={isFirstVisit} />

        {/* 2 — NexusPromo */}
        <NexusPromoSection />

        {/* 3 — HowWeWork — horizontal scroll timeline */}
        <HowWeWorkSection />

        {/* 4 — Certifications */}
        <CertificationsSection />

        {/* 5 — Video scroll */}
        <VideoScrollSection />

        {/* 5.5 — Aurora transition */}
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

        {/* 6 — Services */}
        <ServicesSection />

        {/* 7 — Industries — card stack */}
        <IndustriesSection />

        {/* 8 — Materials — 3D flip cards */}
        <MaterialsSection />

        {/* 9 — WhyUs */}
        <WhyUsSection />

        {/* 10 — Capabilities — split screen */}
        <CapabilitiesSection />

        {/* 11 — Stats */}
        <StatsSection />

        {/* 12 — Testimonials */}
        <TestimonialsSection />

        {/* 13 — FAQ */}
        <FAQBlogSection />

        {/* 14 — FinalCTA */}
        <FinalCTASection />
      </main>
      <div className="sticky bottom-0 z-0">
        <Footer />
      </div>
    </div>
  );
};

export default Index;
