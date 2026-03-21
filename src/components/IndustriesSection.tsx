import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { lazy, Suspense, useState, useCallback, useRef } from "react";
import { Reveal as TextReveal } from "./ui/Reveal";
import { useIsMobile } from "@/hooks/use-mobile";
import type { IndustryType } from "./IndustryModels";
import { BlurImage } from "./BlurImage";
import { IndustryStackCard } from "./IndustryStackCard";

import imgAerospace from "@/assets/industry-aerospace.jpg";
import imgDefense from "@/assets/industry-defense.jpg";
import imgRobotics from "@/assets/industry-robotics.jpg";
import imgAutomotive from "@/assets/industry-automotive.jpg";
import imgMedical from "@/assets/industry-medical.jpg";
import imgMarine from "@/assets/industry-marine.jpg";
import imgHydraulic from "@/assets/industry-hydraulic.jpg";
import imgPiping from "@/assets/industry-piping.jpg";
import imgHvac from "@/assets/industry-hvac.jpg";
import imgRenewable from "@/assets/industry-renewable.jpg";
import imgOilgas from "@/assets/industry-oilgas.jpg";
import imgPower from "@/assets/industry-power.jpg";
import imgMining from "@/assets/industry-mining.jpg";

const IndustryCanvas = lazy(() => import("./IndustryModels"));

interface Industry {
  name: string;
  description: string;
  highlight: string;
  modelType: IndustryType;
  image: string;
}

const industries: Industry[] = [
  { name: "Havacılık & Uzay", description: "AS9100D sertifikalı havacılık parçaları", highlight: "±0.005mm tolerans", modelType: "aerospace", image: imgAerospace },
  { name: "Savunma Sanayi", description: "MIL-SPEC standartlarında kritik bileşenler", highlight: "Yüksek güvenilirlik", modelType: "defense", image: imgDefense },
  { name: "Robotik", description: "Hassas hareket sistemleri ve aktüatörler", highlight: "Yüksek tekrarlanabilirlik", modelType: "robotics", image: imgRobotics },
  { name: "Otomotiv", description: "IATF 16949 kalite standartlarında üretim", highlight: "Seri üretim kapasitesi", modelType: "automotive", image: imgAutomotive },
  { name: "Medikal", description: "ISO 13485 uyumlu medikal bileşenler", highlight: "Biyouyumlu malzemeler", modelType: "medical", image: imgMedical },
  { name: "Yelken & Yat Sistemleri", description: "Deniz koşullarına dayanıklı parçalar", highlight: "Korozyon direnci", modelType: "marine", image: imgMarine },
  { name: "Hidrolik & Pnömatik", description: "Yüksek basınç sistemleri bileşenleri", highlight: "350+ bar dayanım", modelType: "hydraulic", image: imgHydraulic },
  { name: "Boru & Bağlantı Parçaları", description: "Endüstriyel boru sistemleri ve fittings", highlight: "Sızdırmazlık garantisi", modelType: "piping", image: imgPiping },
  { name: "İklim Teknolojileri", description: "HVAC sistem komponentleri üretimi", highlight: "Enerji verimli tasarım", modelType: "hvac", image: imgHvac },
  { name: "Yenilenebilir Enerji", description: "Rüzgar ve güneş enerjisi sistem parçaları", highlight: "Sürdürülebilir üretim", modelType: "renewable", image: imgRenewable },
  { name: "Petrol & Gaz", description: "Rafineri ve boru hattı ekipmanları", highlight: "API standartları", modelType: "oilgas", image: imgOilgas },
  { name: "Güç Dağıtım Sistemleri", description: "Enerji iletim ve dağıtım bileşenleri", highlight: "Yüksek iletkenlik", modelType: "power", image: imgPower },
  { name: "Madencilik Ekipmanları", description: "Ağır hizmet madencilik komponentleri", highlight: "Aşınma direnci", modelType: "mining", image: imgMining },
];

const IndustriesSection = () => {
  const [activeModel, setActiveModel] = useState<IndustryType | null>(null);
  const isMobile = useIsMobile();
  const scrollRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);

  // Desktop card stack scroll
  const { scrollYProgress } = useScroll({
    target: stackRef,
    offset: ["start start", "end end"],
  });

  const handleActivate = useCallback((type: IndustryType) => {
    setActiveModel((prev) => prev === type ? null : type);
  }, []);

  const handleDeactivate = useCallback(() => {
    if (!isMobile) setActiveModel(null);
  }, [isMobile]);

  const scroll = (dir: number) => {
    scrollRef.current?.scrollBy({ left: dir * 300, behavior: "smooth" });
  };

  return (
    <section id="endustriler" className="bg-background border-y border-border">
      <div className="container-industrial py-24 md:py-32 lg:py-40">
        <TextReveal className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-8 h-px bg-border" />
            <span className="text-technical text-foreground/70 uppercase tracking-widest text-sm">{"Sektörler"}</span>
            <div className="w-8 h-px bg-border" />
          </div>
          <h2 className="heading-industrial text-2xl sm:text-3xl md:text-4xl mb-4">{"Hizmet Verdiğimiz Endüstriler"}</h2>
          <p className="subheading-industrial text-base sm:text-lg max-w-2xl mx-auto">{"Talaşlı imalatın öncelikli olduğu sektörlerde kanıtlanmış operasyonel yetkinlik."}</p>
        </TextReveal>
      </div>

      {/* Desktop: Card Stack */}
      {!isMobile && (
        <div ref={stackRef} style={{ height: `${industries.length * 40}vh` }}>
          <div className="sticky top-0 h-screen overflow-hidden">
            {industries.map((industry, i) => (
              <IndustryStackCard
                key={industry.modelType}
                industry={industry}
                index={i}
                total={industries.length}
                scrollYProgress={scrollYProgress}
                isActive={activeModel === industry.modelType}
                isMobile={isMobile}
                onActivate={handleActivate}
                onDeactivate={handleDeactivate}
              />
            ))}
          </div>
        </div>
      )}

      {/* Mobile: Horizontal scroll */}
      {isMobile && (
        <div className="container-industrial pb-16">
          <div className="flex justify-end gap-2 mb-4">
            <button onClick={() => scroll(-1)} className="p-2 border border-border bg-background hover:bg-accent rounded transition-colors" aria-label="Sola kaydır">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={() => scroll(1)} className="p-2 border border-border bg-background hover:bg-accent rounded transition-colors" aria-label="Sağa kaydır">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          <div
            ref={scrollRef}
            className="flex gap-4 sm:gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-primary/30 scrollbar-track-transparent"
            style={{ scrollbarWidth: "thin" }}
          >
            {industries.map((industry) => (
              <div key={industry.modelType} className="snap-start flex-shrink-0 w-[calc(50%-8px)] sm:w-[300px]">
                <MobileIndustryCard
                  industry={industry}
                  isActive={activeModel === industry.modelType}
                  onActivate={handleActivate}
                  onDeactivate={handleDeactivate}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

/* Mobile card — simplified, no scroll transforms */
const MobileIndustryCard = ({
  industry,
  isActive,
  onActivate,
  onDeactivate,
}: {
  industry: Industry;
  isActive: boolean;
  onActivate: (type: IndustryType) => void;
  onDeactivate: () => void;
}) => (
  <motion.div
    className="group bg-background border border-border overflow-hidden hover:border-primary transition-all duration-300 hover:shadow-xl flex flex-col h-full rounded-sm cursor-pointer"
    onClick={() => onActivate(industry.modelType)}
  >
    <div className="relative h-48 overflow-hidden bg-card">
      <AnimatePresence mode="wait">
        {isActive ? (
          <motion.div
            key="canvas"
            className="absolute inset-0 z-10"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div className="absolute inset-0" style={{
              background: "radial-gradient(ellipse at center, hsl(var(--primary) / 0.08) 0%, transparent 70%)",
            }} />
            <Suspense fallback={
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            }>
              <IndustryCanvas type={industry.modelType} />
            </Suspense>
          </motion.div>
        ) : (
          <motion.div
            key="placeholder"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <BlurImage src={industry.image} alt={industry.name} className="w-full h-full object-cover" />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none z-20" />
    </div>
    <div className="p-6 flex-1 flex flex-col">
      <h3 className="font-semibold text-base mb-1.5">{industry.name}</h3>
      <p className="text-sm text-foreground/70 mb-4 flex-1 leading-relaxed">{industry.description}</p>
      <div className="pt-3 border-t border-border">
        <a href="#teklif" className="text-sm font-semibold text-primary hover:text-accent flex items-center gap-1.5 transition-colors">
          <span>{"Detaylı Bilgi"}</span> <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
    <div className="px-6 py-2.5 border-t border-border" style={{ backgroundColor: "hsl(var(--forge-molten) / 0.08)" }}>
      <span className="text-technical text-xs font-semibold" style={{ color: "hsl(var(--forge-steel))" }}>{industry.highlight}</span>
    </div>
  </motion.div>
);

export default IndustriesSection;
