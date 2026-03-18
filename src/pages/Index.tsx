import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ParallaxSection from "@/components/ParallaxSection";
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
import ScrollStack from "@/components/ScrollStack";
import { AuroraBackground } from "@/components/ui/aurora-background";

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
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <JsonLdSchema type="organization" />
      <main>
        {/* 1 — Hero (dark) */}
        <ScrollStack index={1} variant="zoom-out-blur">
          <HeroSection />
        </ScrollStack>

        {/* 1.5 — Parallax Content Section */}
        <ParallaxSection />

        {/* 2 — NexusPromo (dark) */}
        <DarkSeparator />
        <ScrollStack index={2}>
          <NexusPromoSection />
        </ScrollStack>

        {/* 3 — HowWeWork (light) */}
        <ScrollStack index={3} variant="slide-up">
          <HowWeWorkSection />
        </ScrollStack>

        {/* 4 — Certifications (dark) */}
        <ScrollStack index={4}>
          <CertificationsSection />
        </ScrollStack>

        {/* 5 — Video (dark) */}
        <DarkSeparator />
        <ScrollStack index={5} variant="zoom-in">
          <VideoScrollSection />
        </ScrollStack>

        {/* 5.5 — Aurora transition */}
        <ScrollStack index={6}>
          <AuroraBackground
            className="min-h-[50vh] w-full"
            style={{ backgroundColor: "hsl(var(--forge-obsidian))" }}
          >
            <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
              <span className="text-xs uppercase tracking-[0.3em] font-mono mb-4" style={{ color: "hsl(var(--primary))" }}>
                Mühendislik Hizmetleri
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-white">
                <span>Çözümlerimizi Keşfedin</span>
              </h2>
            </div>
          </AuroraBackground>
        </ScrollStack>

        {/* 6 — Services (light) */}
        <ScrollStack index={7}>
          <ServicesSection />
        </ScrollStack>

        {/* 7 — Industries (light) */}
        <ScrollStack index={8}>
          <IndustriesSection />
        </ScrollStack>

        {/* 8 — Materials (light) */}
        <ScrollStack index={9} variant="slide-up">
          <MaterialsSection />
        </ScrollStack>

        {/* 9 — WhyUs (dark) */}
        <ScrollStack index={10}>
          <WhyUsSection />
        </ScrollStack>

        {/* 10 — Capabilities (light) */}
        <ScrollStack index={11}>
          <CapabilitiesSection />
        </ScrollStack>

        {/* 11 — Stats (dark) */}
        <ScrollStack index={12} variant="zoom-out-blur">
          <StatsSection />
        </ScrollStack>

        {/* 12 — Testimonials (light) */}
        <ScrollStack index={13}>
          <TestimonialsSection />
        </ScrollStack>

        {/* 13 — FAQ (light) */}
        <ScrollStack index={14}>
          <FAQBlogSection />
        </ScrollStack>

        {/* 14 — FinalCTA (dark, last) */}
        <ScrollStack index={15} isLast>
          <FinalCTASection />
        </ScrollStack>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
