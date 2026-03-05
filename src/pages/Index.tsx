import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import StickyIntroReveal from "@/components/StickyIntroReveal";
import HowWeWorkSection from "@/components/HowWeWorkSection";
import CertificationsSection from "@/components/CertificationsSection";
import VideoScrollSection from "@/components/VideoScrollSection";
import ServicesSection from "@/components/ServicesSection";
import IndustriesSection from "@/components/IndustriesSection";
import MaterialsSection from "@/components/MaterialsSection";
import WhyUsSection from "@/components/WhyUsSection";
import CapabilitiesSection from "@/components/CapabilitiesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
// StatsSection is now integrated into TestimonialsSection
import FAQBlogSection from "@/components/FAQBlogSection";
import FinalCTASection from "@/components/FinalCTASection";
import Footer from "@/components/Footer";
import JsonLdSchema from "@/components/JsonLdSchema";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <JsonLdSchema type="organization" />
      <main>
        <HeroSection />
        <StickyIntroReveal />
        <HowWeWorkSection />
        <CertificationsSection />
        <VideoScrollSection />
        <ServicesSection />
        <IndustriesSection />
        <MaterialsSection />
        <WhyUsSection />
        <CapabilitiesSection />
        <TestimonialsSection />
        {/* StatsSection merged into TestimonialsSection */}
        <FAQBlogSection />
        <FinalCTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
