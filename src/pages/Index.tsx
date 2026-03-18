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

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <JsonLdSchema type="organization" />
      <main>
        <ParallaxSection index={1}>
          <HeroSection />
        </ParallaxSection>

        <ParallaxSection index={2}>
          <NexusPromoSection />
        </ParallaxSection>

        <ParallaxSection index={3}>
          <HowWeWorkSection />
        </ParallaxSection>

        <ParallaxSection index={4}>
          <CertificationsSection />
        </ParallaxSection>

        <ParallaxSection index={5}>
          <VideoScrollSection />
        </ParallaxSection>

        <ParallaxSection index={6}>
          <ServicesSection />
        </ParallaxSection>

        <ParallaxSection index={7}>
          <IndustriesSection />
        </ParallaxSection>

        <ParallaxSection index={8}>
          <MaterialsSection />
        </ParallaxSection>

        <ParallaxSection index={9}>
          <WhyUsSection />
        </ParallaxSection>

        <ParallaxSection index={10}>
          <CapabilitiesSection />
        </ParallaxSection>

        <ParallaxSection index={11}>
          <StatsSection />
        </ParallaxSection>

        <ParallaxSection index={12}>
          <TestimonialsSection />
        </ParallaxSection>

        <ParallaxSection index={13}>
          <FAQBlogSection />
        </ParallaxSection>

        <ParallaxSection index={14}>
          <FinalCTASection />
        </ParallaxSection>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
