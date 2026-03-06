import { Monitor, Ruler, CheckCircle, TrendingUp } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import cncWorkshop from "@/assets/cnc-workshop.jpg";
import { TextReveal } from "./ScrollReveal";

const capabilities = [
  {
    icon: Monitor,
    title: "Makine Parkuru",
    items: [
      { label: "5 Eksen CNC Freze", value: "DMG MORI, Mazak" },
      { label: "CNC Torna", value: "Doosan, Haas" },
      { label: "EDM/Tel Erozyon", value: "Sodick, Makino" },
      { label: "Taşlama", value: "Studer, Kellenberger" },
    ],
  },
  {
    icon: Ruler,
    title: "Tolerans Aralıkları",
    items: [
      { label: "Standart Tolerans", value: "±0.05mm" },
      { label: "Hassas Tolerans", value: "±0.01mm" },
      { label: "Ultra Hassas", value: "±0.005mm" },
      { label: "Yüzey Kalitesi", value: "Ra 0.4 µm" },
    ],
  },
  {
    icon: CheckCircle,
    title: "CMM & Kalite Kontrol",
    items: [
      { label: "CMM Ölçüm", value: "Zeiss, Hexagon" },
      { label: "Optik Ölçüm", value: "Keyence, OGP" },
      { label: "Yüzey Pürüzlülük", value: "Mitutoyo" },
      { label: "Sertlik Testi", value: "Rockwell, Brinell" },
    ],
  },
  {
    icon: TrendingUp,
    title: "Üretim Kapasitesi",
    items: [
      { label: "Prototip", value: "1-10 adet" },
      { label: "Küçük Seri", value: "10-100 adet" },
      { label: "Orta Seri", value: "100-1000 adet" },
      { label: "Seri Üretim", value: "1000+ adet" },
    ],
  },
];

const CapabilitiesSection = () => {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const headerOpacity = useTransform(scrollYProgress, [0, 0.08], [0, 1]);
  const headerY = useTransform(scrollYProgress, [0, 0.08], [40, 0]);

  const card0Opacity = useTransform(scrollYProgress, [0.08, 0.18], [0, 1]);
  const card0Y = useTransform(scrollYProgress, [0.08, 0.18], [60, 0]);
  const card0Specs = useTransform(scrollYProgress, [0.16, 0.22], [0, 1]);

  const card1Opacity = useTransform(scrollYProgress, [0.20, 0.30], [0, 1]);
  const card1Y = useTransform(scrollYProgress, [0.20, 0.30], [60, 0]);
  const card1Specs = useTransform(scrollYProgress, [0.28, 0.34], [0, 1]);

  const card2Opacity = useTransform(scrollYProgress, [0.32, 0.42], [0, 1]);
  const card2Y = useTransform(scrollYProgress, [0.32, 0.42], [60, 0]);
  const card2Specs = useTransform(scrollYProgress, [0.40, 0.46], [0, 1]);

  const card3Opacity = useTransform(scrollYProgress, [0.44, 0.54], [0, 1]);
  const card3Y = useTransform(scrollYProgress, [0.44, 0.54], [60, 0]);
  const card3Specs = useTransform(scrollYProgress, [0.52, 0.58], [0, 1]);

  const cardAnimations = [
    { opacity: card0Opacity, y: card0Y, specs: card0Specs },
    { opacity: card1Opacity, y: card1Y, specs: card1Specs },
    { opacity: card2Opacity, y: card2Y, specs: card2Specs },
    { opacity: card3Opacity, y: card3Y, specs: card3Specs },
  ];

  const ctaOpacity = useTransform(scrollYProgress, [0.60, 0.70], [0, 1]);
  const ctaY = useTransform(scrollYProgress, [0.60, 0.70], [30, 0]);

  if (isMobile) {
    return (
      <section id="kabiliyetler" className="py-16 px-4 bg-[#e8edf4] dark:bg-[#0d1929]">
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-8" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="text-xs font-semibold uppercase tracking-[0.4em] mb-3 block text-primary">Teknik</span>
            <h2 className="text-2xl font-bold mb-4">Kabiliyetlerimiz</h2>
          </motion.div>
          <div className="grid grid-cols-2 gap-3 mb-8">
            {capabilities.map((cap, i) => (
              <motion.div key={cap.title} className="bg-background border border-border p-4 overflow-hidden" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div className="flex items-center gap-2 mb-3 pb-3 border-b border-border">
                  <div className="w-8 h-8 bg-primary flex items-center justify-center flex-shrink-0">
                    <cap.icon className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <h3 className="font-bold text-xs">{cap.title}</h3>
                </div>
                <div className="space-y-2.5">
                  {cap.items.map((item) => (
                    <div key={item.label} className="flex justify-between items-baseline gap-1">
                      <span className="text-[10px] text-muted-foreground leading-tight">{item.label}</span>
                      <span className="text-[10px] font-medium font-mono text-right leading-tight whitespace-nowrap">{item.value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div className="flex items-center justify-center mb-8" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <a href="#teklif" className="px-8 py-3 text-xs font-bold uppercase tracking-[0.08em] text-primary border border-primary/40 transition-all duration-300 hover:bg-primary hover:text-white">
              Teknik Kapasiteyi İncele
            </a>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <div ref={containerRef} className="relative" style={{ height: "400vh" }}>
      <section
        id="kabiliyetler"
        className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center bg-[#e8edf4] dark:bg-[#0d1929]"
      >
        <div className="container mx-auto px-4 md:px-8 relative z-10 max-w-7xl">
          <motion.div className="text-center mb-6 md:mb-8" style={{ opacity: headerOpacity, y: headerY }}>
            <span className="text-xs font-semibold uppercase tracking-[0.4em] mb-2 block text-primary">Teknik</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Kabiliyetlerimiz</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {capabilities.map((cap, i) => (
              <CapabilityCard key={cap.title} cap={cap} anim={cardAnimations[i]} />
            ))}
          </div>
          <motion.div className="flex items-center justify-center gap-0" style={{ opacity: ctaOpacity, y: ctaY }}>
            <div className="flex-1 h-px relative bg-border">
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[7px] h-[7px] rounded-full bg-[#e8edf4] dark:bg-background border border-primary/40" />
            </div>
            <a href="#teklif" className="px-10 py-3 text-xs font-bold uppercase tracking-[0.08em] text-primary border border-primary/40 transition-all duration-300 hover:bg-primary hover:text-primary-foreground whitespace-nowrap">
              Teknik Kapasiteyi İncele
            </a>
            <div className="flex-1 h-px relative bg-border">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[7px] h-[7px] rounded-full bg-[#e8edf4] dark:bg-background border border-primary/40" />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

interface CardProps {
  cap: (typeof capabilities)[number];
  anim: { opacity: any; y: any; specs: any };
}

const CapabilityCard = ({ cap, anim }: CardProps) => {
  return (
    <motion.div
      className="bg-background border border-border p-5 h-[280px] sm:h-[300px] md:h-[320px] transition-all duration-300 hover:border-primary hover:-translate-y-1 hover:shadow-lg overflow-hidden"
      style={{ opacity: anim.opacity, y: anim.y }}
    >
      <div className="flex items-center gap-3 mb-4 pb-3 border-b border-border">
        <div className="w-9 h-9 bg-primary flex items-center justify-center flex-shrink-0">
          <cap.icon className="w-4 h-4 text-primary-foreground" />
        </div>
        <h3 className="font-bold text-sm">{cap.title}</h3>
      </div>

      <motion.div className="space-y-3" style={{ opacity: anim.specs }}>
        {cap.items.map((item) => (
          <div key={item.label} className="flex justify-between items-baseline gap-2">
            <span className="text-xs text-muted-foreground">{item.label}</span>
            <span className="text-xs font-medium text-right font-mono">{item.value}</span>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default CapabilitiesSection;
