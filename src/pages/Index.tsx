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

/**
 * Thin shadow separator between consecutive dark sections.
 * Creates visual depth where color alone cannot differentiate.
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
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <JsonLdSchema type="organization" />
      <main>
        {/* 1 — Hero (dark) */}
        <ParallaxSection index={1}>
          <HeroSection />
        </ParallaxSection>

        {/* 2 — NexusPromo (dark) — shadow separator after dark→dark */}
        <DarkSeparator />
        <ParallaxSection index={2}>
          <NexusPromoSection />
        </ParallaxSection>

        {/* 3 — HowWeWork (light) */}
        <ParallaxSection index={3}>
          <HowWeWorkSection />
        </ParallaxSection>

        {/* 4 — Certifications (dark) */}
        <ParallaxSection index={4}>
          <CertificationsSection />
        </ParallaxSection>

        {/* 5 — Video (dark) — shadow after dark→dark */}
        <DarkSeparator />
        <ParallaxSection index={5}>
          <VideoScrollSection />
        </ParallaxSection>

        {/* 6 — Services (light) */}
        <ParallaxSection index={6}>
          <ServicesSection />
        </ParallaxSection>

        {/* 7 — Industries (light) */}
        <ParallaxSection index={7}>
          <IndustriesSection />
        </ParallaxSection>

        {/* 8 — Materials (light) */}
        <ParallaxSection index={8}>
          <MaterialsSection />
        </ParallaxSection>

        {/* 9 — WhyUs (dark) */}
        <ParallaxSection index={9}>
          <WhyUsSection />
        </ParallaxSection>

        {/* 10 — Capabilities (light) */}
        <ParallaxSection index={10}>
          <CapabilitiesSection />
        </ParallaxSection>

        {/* 11 — Stats (dark) */}
        <ParallaxSection index={11}>
          <StatsSection />
        </ParallaxSection>

        {/* 12 — Testimonials (light) */}
        <ParallaxSection index={12}>
          <TestimonialsSection />
        </ParallaxSection>

        {/* 13 — FAQ (light) */}
        <ParallaxSection index={13}>
          <FAQBlogSection />
        </ParallaxSection>

        {/* 14 — FinalCTA (dark, last — no scale-down) */}
        <ParallaxSection index={14} isLast>
          <FinalCTASection />
        </ParallaxSection>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
