import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { lazy, Suspense, useState, useCallback, useRef, useEffect } from "react";
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
  const [activeModel, setActiveModel] = useState<IndustryType | null>(null);
  const [canvasRect, setCanvasRect] = useState<DOMRect | null>(null);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const handleHover = useCallback((type: IndustryType | null, el?: HTMLDivElement | null) => {
    setActiveModel(type);
    if (type && el) {
      const imageArea = el.querySelector(".industry-image-area") as HTMLElement;
      if (imageArea) {
        setCanvasRect(imageArea.getBoundingClientRect());
      }
    } else {
      setCanvasRect(null);
    }
  }, []);

  return (
    <section id="endustriler" className="py-16 md:py-20 bg-muted border-y border-border">
      <div className="container-industrial">
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
              <IndustryCard
                industry={industry}
                isActive={activeModel === industry.modelType}
                onHover={handleHover}
                ref={(el) => { cardRefs.current[industry.modelType] = el; }}
              />
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Single floating Canvas — positioned over the active card's image area */}
        <AnimatePresence>
          {activeModel && canvasRect && (
            <motion.div
              key="industry-canvas"
              className="pointer-events-none"
              style={{
                position: "fixed",
                top: canvasRect.top,
                left: canvasRect.left,
                width: canvasRect.width,
                height: canvasRect.height,
                zIndex: 50,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Suspense fallback={
                <div className="w-full h-full flex items-center justify-center bg-muted">
                  <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
              }>
                <IndustryCanvas type={activeModel} />
              </Suspense>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

import { forwardRef } from "react";

const IndustryCard = forwardRef<HTMLDivElement, {
  industry: typeof industries[number];
  isActive: boolean;
  onHover: (type: IndustryType | null, el?: HTMLDivElement | null) => void;
}>(({ industry, isActive, onHover }, ref) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Merge refs
  useEffect(() => {
    if (typeof ref === "function") ref(cardRef.current);
    else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = cardRef.current;
  }, [ref]);

  return (
    <motion.div
      ref={cardRef}
      className="group bg-background border border-border overflow-hidden hover:border-primary transition-all duration-300 hover:shadow-xl flex flex-col h-full"
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300 }}
      onMouseEnter={() => onHover(industry.modelType, cardRef.current)}
      onMouseLeave={() => onHover(null)}
    >
      <div className="relative h-48 overflow-hidden bg-muted industry-image-area">
        <motion.img
          src={industry.image}
          alt={industry.name}
          className="w-full h-full object-cover absolute inset-0"
          loading="lazy"
          animate={{ opacity: isActive ? 0 : 1, scale: isActive ? 1.05 : 1 }}
          transition={{ duration: 0.4 }}
        />
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

      <div className="px-8 py-3 border-t border-border" style={{ backgroundColor: "hsl(var(--primary) / 0.06)" }}>
        <span className="text-technical text-xs text-primary font-semibold">
          {industry.highlight}
        </span>
      </div>
    </motion.div>
  );
});

IndustryCard.displayName = "IndustryCard";

export default IndustriesSection;
