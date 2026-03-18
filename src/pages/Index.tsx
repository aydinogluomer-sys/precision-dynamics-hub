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
        {/* Hero — sticky dark */}
        <ParallaxSection sticky>
          <HeroSection />
        </ParallaxSection>

        {/* NexusPromo — slides over hero with 3D tilt */}
        <ParallaxSection>
          <NexusPromoSection />
        </ParallaxSection>

        {/* HowWeWork — light, slides in */}
        <ParallaxSection>
          <HowWeWorkSection />
        </ParallaxSection>

        {/* Certifications — dark band */}
        <ParallaxSection>
          <CertificationsSection />
        </ParallaxSection>

        {/* Video — sticky dark */}
        <ParallaxSection sticky>
          <VideoScrollSection />
        </ParallaxSection>

        {/* Services — light, slides over video */}
        <ParallaxSection>
          <ServicesSection />
        </ParallaxSection>

        {/* Industries — white */}
        <ParallaxSection>
          <IndustriesSection />
        </ParallaxSection>

        {/* Materials — warm light */}
        <ParallaxSection>
          <MaterialsSection />
        </ParallaxSection>

        {/* WhyUs — dark gunmetal */}
        <ParallaxSection>
          <WhyUsSection />
        </ParallaxSection>

        {/* Capabilities — cool light */}
        <ParallaxSection>
          <CapabilitiesSection />
        </ParallaxSection>

        {/* Stats — sticky dark */}
        <ParallaxSection sticky>
          <StatsSection />
        </ParallaxSection>

        {/* Testimonials — warm light, slides over */}
        <ParallaxSection>
          <TestimonialsSection />
        </ParallaxSection>

        {/* FAQ — cool mist */}
        <ParallaxSection>
          <FAQBlogSection />
        </ParallaxSection>

        {/* FinalCTA — sticky dark */}
        <ParallaxSection sticky>
          <FinalCTASection />
        </ParallaxSection>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
