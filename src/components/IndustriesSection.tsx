import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { lazy, Suspense, useState, useCallback, useRef } from "react";
import { TextReveal } from "./ScrollReveal";
import { useIsMobile } from "@/hooks/use-mobile";
import type { IndustryType } from "./IndustryModels";

const IndustryCanvas = lazy(() => import("./IndustryModels"));

interface Industry {
  name: string;
  description: string;
  highlight: string;
  modelType: IndustryType;
}

const industries: Industry[] = [
  { name: "Havacılık & Uzay", description: "AS9100D sertifikalı havacılık parçaları", highlight: "±0.005mm tolerans", modelType: "aerospace" },
  { name: "Savunma Sanayi", description: "MIL-SPEC standartlarında kritik bileşenler", highlight: "Yüksek güvenilirlik", modelType: "defense" },
  { name: "Robotik", description: "Hassas hareket sistemleri ve aktüatörler", highlight: "Yüksek tekrarlanabilirlik", modelType: "robotics" },
  { name: "Otomotiv", description: "IATF 16949 kalite standartlarında üretim", highlight: "Seri üretim kapasitesi", modelType: "automotive" },
  { name: "Medikal", description: "ISO 13485 uyumlu medikal bileşenler", highlight: "Biyouyumlu malzemeler", modelType: "medical" },
  { name: "Yelken & Yat Sistemleri", description: "Deniz koşullarına dayanıklı parçalar", highlight: "Korozyon direnci", modelType: "marine" },
  { name: "Hidrolik & Pnömatik", description: "Yüksek basınç sistemleri bileşenleri", highlight: "350+ bar dayanım", modelType: "hydraulic" },
  { name: "Boru & Bağlantı Parçaları", description: "Endüstriyel boru sistemleri ve fittings", highlight: "Sızdırmazlık garantisi", modelType: "piping" },
  { name: "İklim Teknolojileri", description: "HVAC sistem komponentleri üretimi", highlight: "Enerji verimli tasarım", modelType: "hvac" },
  { name: "Prototip Üretim", description: "Hızlı prototipleme ve küçük seri üretim", highlight: "48 saat teslimat", modelType: "prototype" },
  { name: "Yenilenebilir Enerji", description: "Rüzgar ve güneş enerjisi sistem parçaları", highlight: "Sürdürülebilir üretim", modelType: "renewable" },
  { name: "Petrol & Gaz", description: "Rafineri ve boru hattı ekipmanları", highlight: "API standartları", modelType: "oilgas" },
  { name: "Güç Dağıtım Sistemleri", description: "Enerji iletim ve dağıtım bileşenleri", highlight: "Yüksek iletkenlik", modelType: "power" },
  { name: "Madencilik Ekipmanları", description: "Ağır hizmet madencilik komponentleri", highlight: "Aşınma direnci", modelType: "mining" },
];

const IndustriesSection = () => {
  const [activeModel, setActiveModel] = useState<IndustryType | null>(null);
  const isMobile = useIsMobile();
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleActivate = useCallback((type: IndustryType) => {
    setActiveModel((prev) => (prev === type ? null : type));
  }, []);

  const handleDeactivate = useCallback(() => {
    if (!isMobile) setActiveModel(null);
  }, [isMobile]);

  const scroll = (dir: number) => {
    scrollRef.current?.scrollBy({ left: dir * 300, behavior: "smooth" });
  };

  return (
    <section id="endustriler" className="py-16 md:py-20 bg-muted border-y border-border">
      <div className="container-industrial">
        <TextReveal className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-8 h-px bg-border" />
            <span className="text-technical text-muted-foreground uppercase tracking-widest text-sm">Sektörler</span>
            <div className="w-8 h-px bg-border" />
          </div>
          <h2 className="heading-industrial text-3xl md:text-4xl mb-4">Hizmet Verdiğimiz Endüstriler</h2>
          <p className="subheading-industrial text-lg max-w-2xl mx-auto">Kritik sektörlerde güvenilir üretim ortağınız</p>
        </TextReveal>

        {/* Scroll buttons */}
        <div className="flex justify-end gap-2 mb-4">
          <button onClick={() => scroll(-1)} className="p-2 border border-border bg-background hover:bg-accent rounded transition-colors" aria-label="Sola kaydır">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={() => scroll(1)} className="p-2 border border-border bg-background hover:bg-accent rounded transition-colors" aria-label="Sağa kaydır">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Horizontally scrollable cards */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-primary/30 scrollbar-track-transparent"
          style={{ scrollbarWidth: "thin" }}
        >
          {industries.map((industry) => (
            <div key={industry.modelType} className="snap-start flex-shrink-0 w-[280px] sm:w-[300px]">
              <IndustryCard
                industry={industry}
                isActive={activeModel === industry.modelType}
                isMobile={isMobile}
                onActivate={handleActivate}
                onDeactivate={handleDeactivate}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const IndustryCard = ({
  industry,
  isActive,
  isMobile,
  onActivate,
  onDeactivate,
}: {
  industry: Industry;
  isActive: boolean;
  isMobile: boolean;
  onActivate: (type: IndustryType) => void;
  onDeactivate: () => void;
}) => {
  return (
    <motion.div
      className="group bg-background border border-border overflow-hidden hover:border-primary transition-all duration-300 hover:shadow-xl flex flex-col h-full rounded-sm cursor-pointer"
      whileHover={isMobile ? undefined : { y: -6 }}
      transition={{ type: "spring", stiffness: 300 }}
      onMouseEnter={() => !isMobile && onActivate(industry.modelType)}
      onMouseLeave={() => !isMobile && onDeactivate()}
      onClick={() => isMobile && onActivate(industry.modelType)}
    >
      {/* 3D model area */}
      <div className="relative h-48 overflow-hidden bg-muted/50">
        <AnimatePresence mode="wait">
          {isActive ? (
            <motion.div
              key="canvas"
              className="absolute inset-0 z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
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
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-center text-muted-foreground/50">
                <div className="w-12 h-12 mx-auto mb-2 border border-border/50 rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-primary/20 rounded-sm" />
                </div>
                <span className="text-xs">{isMobile ? "Dokunun" : "Hover"}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none z-20" />
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <h3 className="font-semibold text-base mb-1.5">{industry.name}</h3>
        <p className="text-sm text-muted-foreground mb-4 flex-1 leading-relaxed">{industry.description}</p>
        <div className="pt-3 border-t border-border">
          <a href="#teklif" className="text-sm font-semibold text-primary hover:text-accent flex items-center gap-1.5 transition-colors">
            Detaylı Bilgi <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      <div className="px-6 py-2.5 border-t border-border" style={{ backgroundColor: "hsl(var(--primary) / 0.06)" }}>
        <span className="text-technical text-xs text-primary font-semibold">{industry.highlight}</span>
      </div>
    </motion.div>
  );
};

export default IndustriesSection;
