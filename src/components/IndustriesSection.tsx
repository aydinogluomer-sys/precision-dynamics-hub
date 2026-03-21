import { ArrowRight } from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";
import { motion } from "framer-motion";
import { Reveal as TextReveal } from "./ui/Reveal";
import { BlurImage } from "./BlurImage";
import { Badge } from "./ui/badge";

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

interface Industry {
  name: string;
  description: string;
  highlight: string;
  image: string;
}

const primaryIndustries: Industry[] = [
  { name: "Havacılık & Uzay", description: "AS9100D sertifikalı havacılık parçaları. Kritik uçuş bileşenlerinde kanıtlanmış üretim yetkinliği.", highlight: "±0.005mm tolerans", image: imgAerospace },
  { name: "Savunma Sanayi", description: "MIL-SPEC standartlarında kritik bileşenler. Yüksek güvenilirlik gerektiren savunma projeleri.", highlight: "Yüksek güvenilirlik", image: imgDefense },
  { name: "Otomotiv", description: "IATF 16949 kalite standartlarında seri ve prototip üretim kapasitesi.", highlight: "Seri üretim kapasitesi", image: imgAutomotive },
  { name: "Medikal", description: "ISO 13485 uyumlu, biyouyumlu malzemelerle medikal cihaz bileşenleri.", highlight: "Biyouyumlu malzemeler", image: imgMedical },
  { name: "Robotik", description: "Hassas hareket sistemleri, aktüatörler ve yüksek tekrarlanabilirlik gerektiren parçalar.", highlight: "Yüksek tekrarlanabilirlik", image: imgRobotics },
];

const secondaryIndustries: Industry[] = [
  { name: "Yelken & Yat", description: "", highlight: "Korozyon direnci", image: imgMarine },
  { name: "Hidrolik & Pnömatik", description: "", highlight: "350+ bar dayanım", image: imgHydraulic },
  { name: "Boru & Bağlantı", description: "", highlight: "Sızdırmazlık garantisi", image: imgPiping },
  { name: "İklim Teknolojileri", description: "", highlight: "Enerji verimli tasarım", image: imgHvac },
  { name: "Yenilenebilir Enerji", description: "", highlight: "Sürdürülebilir üretim", image: imgRenewable },
  { name: "Petrol & Gaz", description: "", highlight: "API standartları", image: imgOilgas },
  { name: "Güç Dağıtım", description: "", highlight: "Yüksek iletkenlik", image: imgPower },
  { name: "Madencilik", description: "", highlight: "Aşınma direnci", image: imgMining },
];

const EASE = [0.16, 1, 0.3, 1] as const;

const cardVariants = {
  hidden: { opacity: 0, scale: 0.85, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.06, ease: EASE as unknown as [number, number, number, number] },
  }),
};

const chipVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.35, delay: 0.4 + i * 0.05, ease: EASE as unknown as [number, number, number, number] },
  }),
};

export const IndustriesSection = () => {
  return (
    <section id="endustriler" className="border-y border-border" style={{ backgroundColor: "hsl(var(--forge-obsidian))" }}>
      <div className="container-industrial py-24 md:py-32 lg:py-40">
        {/* Header */}
        <TextReveal className="text-center mb-12 md:mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-8 h-px bg-border" />
            <span className="text-technical text-foreground/70 uppercase tracking-widest text-sm">Sektörler</span>
            <div className="w-8 h-px bg-border" />
          </div>
          <h2 className="heading-industrial text-2xl sm:text-3xl md:text-4xl mb-4">Hizmet Verdiğimiz Endüstriler</h2>
          <p className="subheading-industrial text-base sm:text-lg max-w-2xl mx-auto">Talaşlı imalatın öncelikli olduğu sektörlerde kanıtlanmış operasyonel yetkinlik.</p>
        </TextReveal>

        {/* Primary Industries — Large Cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 mb-12 md:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
        >
          {primaryIndustries.map((industry, i) => (
            <PrimaryIndustryCard key={industry.name} industry={industry} index={i} isWide={i >= 3} />
          ))}
        </motion.div>

        {/* Secondary Industries — Chip/Badge Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05, delayChildren: 0.4 } } }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-px bg-border" />
            <span className="text-technical text-foreground/50 uppercase tracking-widest text-xs">Diğer Sektörler</span>
            <div className="flex-1 h-px bg-border" />
          </div>
          <div className="flex flex-wrap gap-3">
            {secondaryIndustries.map((industry, i) => (
              <motion.div key={industry.name} custom={i} variants={chipVariants}>
                <a
                  href="#teklif"
                  className="group inline-flex items-center gap-2.5 px-4 py-2.5 border border-border bg-card hover:border-primary/50 hover:bg-accent/50 rounded-sm transition-all duration-300"
                >
                  <div className="w-8 h-8 rounded-sm overflow-hidden flex-shrink-0">
                    <BlurImage src={industry.image} alt={industry.name} className="w-full h-full object-cover" />
                  </div>
                  <span className="text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors">{industry.name}</span>
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-5 border-border text-foreground/50 hidden sm:inline-flex">
                    {industry.highlight}
                  </Badge>
                </a>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* Primary card — large image + content */
const PrimaryIndustryCard = ({
  industry,
  index,
  isWide,
}: {
  industry: Industry;
  index: number;
  isWide: boolean;
}) => (
  <motion.div
    custom={index}
    variants={cardVariants}
    className={`group bg-background border border-border overflow-hidden hover:border-primary/40 transition-all duration-300 hover:shadow-lg rounded-sm flex flex-col ${isWide ? "sm:col-span-1 lg:col-span-1" : ""}`}
  >
    <div className="relative h-52 md:h-60 overflow-hidden bg-card">
      <BlurImage
        src={industry.image}
        alt={industry.name}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent pointer-events-none" />
      <div className="absolute bottom-3 left-4 z-10">
        <div className="px-2.5 py-1 border border-border/60 backdrop-blur-sm inline-block" style={{ backgroundColor: "hsl(var(--forge-molten) / 0.12)" }}>
          <span className="text-technical text-[11px] font-semibold" style={{ color: "hsl(var(--forge-steel))" }}>{industry.highlight}</span>
        </div>
      </div>
    </div>
    <div className="p-5 md:p-6 flex-1 flex flex-col">
      <h3 className="font-semibold text-base md:text-lg mb-2">{industry.name}</h3>
      <p className="text-sm text-foreground/70 mb-4 flex-1 leading-relaxed">{industry.description}</p>
      <a href="#teklif" className="text-sm font-semibold text-primary hover:text-accent flex items-center gap-1.5 transition-colors mt-auto">
        <span>Detaylı Bilgi</span> <ArrowRight className="w-3.5 h-3.5" />
      </a>
    </div>
  </motion.div>
);
