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
      <main>
        <HeroSection isFirstVisit={isFirstVisit} />
        <NexusPromoSection />
        <HowWeWorkSection />
        <CertificationsSection />
        <VideoScrollSection />
        <ServicesSection />
        <IndustriesSection />
        <MaterialsSection />
        <WhyUsSection />
        <CapabilitiesSection />
        <StatsSection />
        <TestimonialsSection />
        <FAQBlogSection />
        <FinalCTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
