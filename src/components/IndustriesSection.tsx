import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { lazy, Suspense, useState } from "react";
import industryAerospace from "@/assets/industry-aerospace.jpg";
import industryAutomotive from "@/assets/industry-automotive.jpg";
import industryMedical from "@/assets/industry-medical.jpg";
import industryRobotics from "@/assets/industry-robotics.jpg";
import { TextReveal, StaggerContainer, StaggerItem } from "./ScrollReveal";
import type { IndustryType } from "./IndustryModels";

const IndustryCanvas = lazy(() => import("./IndustryModels"));

const industries: { image: string; name: string; description: string; highlight: string; modelType: IndustryType }[] = [
  {
    image: industryAerospace,
    name: "Havacılık & Uzay",
    description: "AS9100D sertifikalı havacılık parçaları",
    highlight: "±0.005mm tolerans",
    modelType: "aerospace",
  },
  {
    image: industryAutomotive,
    name: "Otomotiv",
    description: "IATF 16949 kalite standartlarında üretim",
    highlight: "Seri üretim kapasitesi",
    modelType: "automotive",
  },
  {
    image: industryMedical,
    name: "Tıbbi",
    description: "ISO 13485 uyumlu medikal bileşenler",
    highlight: "Biyouyumlu malzemeler",
    modelType: "medical",
  },
  {
    image: industryRobotics,
    name: "Robotik",
    description: "Hassas hareket sistemleri ve aktüatörler",
    highlight: "Yüksek tekrarlanabilirlik",
    modelType: "robotics",
  },
];

const IndustriesSection = () => {
  return (
    <section id="endustriler" className="py-16 md:py-20 bg-muted border-y border-border">
      <div className="container-industrial">
        {/* Header */}
        <TextReveal className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-8 h-px bg-border" />
            <span className="text-technical text-muted-foreground uppercase tracking-widest text-sm">
              Sektörler
            </span>
            <div className="w-8 h-px bg-border" />
          </div>
          <h2 className="heading-industrial text-3xl md:text-4xl mb-4">Hizmet Verdiğimiz Endüstriler</h2>
          <p className="subheading-industrial text-lg max-w-2xl mx-auto">
            Kritik sektörlerde güvenilir üretim ortağınız
          </p>
        </TextReveal>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {industries.map((industry) => (
            <StaggerItem key={industry.name}>
              <IndustryCard industry={industry} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

const IndustryCard = ({ industry }: { industry: typeof industries[number] }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="group bg-background border border-border overflow-hidden hover:border-primary transition-all duration-300 hover:shadow-xl flex flex-col h-full"
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image → 3D model on hover */}
      <div className="relative h-48 overflow-hidden bg-muted">
        {/* Static image (fades out on hover) */}
        <motion.img
          src={industry.image}
          alt={industry.name}
          className="w-full h-full object-cover absolute inset-0"
          loading="lazy"
          animate={{ opacity: hovered ? 0 : 1, scale: hovered ? 1.05 : 1 }}
          transition={{ duration: 0.4 }}
        />
        {/* 3D Canvas (fades in on hover) */}
        <motion.div
          className="absolute inset-0"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        >
          {hovered && (
            <Suspense fallback={
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            }>
              <IndustryCanvas type={industry.modelType} />
            </Suspense>
          )}
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent pointer-events-none" />
      </div>

      <div className="p-8 flex-1 flex flex-col">
        <h3 className="font-semibold text-lg mb-2">{industry.name}</h3>
        <p className="text-sm text-muted-foreground mb-4 flex-1">{industry.description}</p>

        <div className="pt-4 border-t border-border">
          <a
            href="#teklif"
            className="text-sm font-semibold text-primary hover:text-accent flex items-center gap-1.5 transition-colors"
          >
            Detaylı Bilgi
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Bottom highlight band */}
      <div className="px-8 py-3 border-t border-border" style={{ backgroundColor: "hsl(var(--primary) / 0.06)" }}>
        <span className="text-technical text-xs text-primary font-semibold">
          {industry.highlight}
        </span>
      </div>
    </motion.div>
  );
};

export default IndustriesSection;
