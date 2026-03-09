import { Monitor, Ruler, CheckCircle, TrendingUp, ArrowUpRight } from "lucide-react";

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
] as const;

const CapabilitiesSection = () => {
  return (
    <section id="kabiliyetler" className="py-16 px-4 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.4em] mb-2 block text-primary">
              Teknik Yetkinlik
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">ÜRETİM KAPASİTESİ</h2>
            <p className="text-sm max-w-lg text-foreground/80">
              Endüstriyel standartlara uygun modern makine parkuru ve güçlü üretim altyapısı.
            </p>
          </div>
          <a
            href="#teklif"
            className="text-sm font-medium text-primary hover:text-accent flex items-center gap-1.5 transition-colors whitespace-nowrap"
          >
            Teknik Kapasiteyi İncele <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {capabilities.map((cap) => (
            <div
              key={cap.title}
              className="bg-background border border-border p-5 h-[280px] sm:h-[300px] md:h-[320px] transition-colors duration-200 hover:border-primary overflow-hidden"
            >
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-border">
                <div className="w-9 h-9 bg-primary flex items-center justify-center flex-shrink-0">
                  <cap.icon className="w-4 h-4 text-primary-foreground" />
                </div>
                <h3 className="font-bold text-sm">{cap.title}</h3>
              </div>

              <div className="space-y-3">
                {cap.items.map((item) => (
                  <div key={item.label} className="flex justify-between items-baseline gap-2">
                    <span className="text-xs text-foreground/80">{item.label}</span>
                    <span className="text-xs font-medium text-right font-mono">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CapabilitiesSection;

{
  icon: Monitor,
  title: "Makine Parkuru",
  items: [
  { label: "5 Eksen CNC Freze", value: "DMG MORI, Mazak" },
  { label: "CNC Torna", value: "Doosan, Haas" },
  { label: "EDM/Tel Erozyon", value: "Sodick, Makino" },
  { label: "Taşlama", value: "Studer, Kellenberger" }]

},
{
  icon: Ruler,
  title: "Tolerans Aralıkları",
  items: [
  { label: "Standart Tolerans", value: "±0.05mm" },
  { label: "Hassas Tolerans", value: "±0.01mm" },
  { label: "Ultra Hassas", value: "±0.005mm" },
  { label: "Yüzey Kalitesi", value: "Ra 0.4 µm" }]

},
{
  icon: CheckCircle,
  title: "CMM & Kalite Kontrol",
  items: [
  { label: "CMM Ölçüm", value: "Zeiss, Hexagon" },
  { label: "Optik Ölçüm", value: "Keyence, OGP" },
  { label: "Yüzey Pürüzlülük", value: "Mitutoyo" },
  { label: "Sertlik Testi", value: "Rockwell, Brinell" }]

},
{
  icon: TrendingUp,
  title: "Üretim Kapasitesi",
  items: [
  { label: "Prototip", value: "1-10 adet" },
  { label: "Küçük Seri", value: "10-100 adet" },
  { label: "Orta Seri", value: "100-1000 adet" },
  { label: "Seri Üretim", value: "1000+ adet" }]

}];


const CapabilitiesSection = () => {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const headerOpacity = useTransform(scrollYProgress, [0, 0.08], [0, 1]);

  const card0Opacity = useTransform(scrollYProgress, [0.08, 0.18], [0, 1]);
  const card1Opacity = useTransform(scrollYProgress, [0.20, 0.30], [0, 1]);
  const card2Opacity = useTransform(scrollYProgress, [0.32, 0.42], [0, 1]);
  const card3Opacity = useTransform(scrollYProgress, [0.44, 0.54], [0, 1]);

  const cardAnimations = [
  { opacity: card0Opacity },
  { opacity: card1Opacity },
  { opacity: card2Opacity },
  { opacity: card3Opacity }];


  if (isMobile) {
    return (
      <section id="kabiliyetler" className="py-16 px-4 bg-[#e8edf4] dark:bg-[#0d1929]">
        <div className="max-w-7xl mx-auto">
          <motion.div className="flex items-start justify-between mb-8" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.4em] mb-3 block text-primary">Teknik Yetkinlik</span>
              <h2 className="text-2xl font-bold mb-2">ÜRETİM KAPASİTESİ</h2>
              <p className="text-xs text-foreground/80">Endüstriyel standartlara uygun modern makine parkuru ve güçlü üretim altyapısı.</p>
            </div>
            <a href="#teklif" className="text-xs font-medium text-primary flex items-center gap-1 whitespace-nowrap mt-1">
              Teknik Kapasiteyi İncele <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </motion.div>
          <div className="grid grid-cols-2 gap-3 mb-8">
            {capabilities.map((cap, i) =>
            <motion.div 
              key={cap.title} 
              className="bg-background border border-border p-4 overflow-hidden text-rendering-fix" 
              initial={{ opacity: 0 }} 
              whileInView={{ opacity: 1 }} 
              viewport={{ once: true }} 
              transition={{ delay: i * 0.1 }}
              style={{
                backfaceVisibility: 'hidden',
                willChange: 'opacity'
              }}>
                <div className="flex items-center gap-2 mb-3 pb-3 border-b border-border">
                  <div className="w-8 h-8 bg-primary flex items-center justify-center flex-shrink-0">
                    <cap.icon className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <h3 className="font-bold text-xs">{cap.title}</h3>
                </div>
                <div className="space-y-2.5">
                  {cap.items.map((item) =>
                <div key={item.label} className="flex justify-between items-baseline gap-1">
                      <span className="text-[10px] text-foreground/70 leading-tight">{item.label}</span>
                      <span className="text-[10px] font-medium font-mono text-right leading-tight whitespace-nowrap">{item.value}</span>
                    </div>
                )}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>);

  }

  return (
    <div ref={containerRef} className="relative" style={{ height: "400vh" }}>
      <section
        id="kabiliyetler"
        className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center bg-[#e8edf4] dark:bg-[#0d1929]">
        
        <div className="container mx-auto px-4 md:px-8 relative z-10 max-w-7xl">
          <motion.div 
            className="flex flex-col md:flex-row md:items-end md:justify-between mb-6 md:mb-8 text-rendering-fix" 
            style={{ 
              opacity: headerOpacity,
              backfaceVisibility: 'hidden',
              willChange: 'opacity'
            }}>
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.4em] mb-2 block text-primary">Teknik Yetkinlik</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">ÜRETİM KAPASİTESİ</h2>
              <p className="text-sm max-w-lg text-foreground/80">Endüstriyel standartlara uygun modern makine parkuru ve güçlü üretim altyapısı.</p>
            </div>
            <a href="#teklif" className="mt-3 md:mt-0 text-sm font-medium text-primary hover:text-accent flex items-center gap-1.5 transition-colors whitespace-nowrap">
              Teknik Kapasiteyi İncele <ArrowUpRight className="w-4 h-4" />
            </a>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {capabilities.map((cap, i) =>
            <CapabilityCard key={cap.title} cap={cap} anim={cardAnimations[i]} />
            )}
          </div>
        </div>
      </section>
    </div>);

};

interface CardProps {
  cap: (typeof capabilities)[number];
  anim: {opacity: any;};
}

const CapabilityCard = ({ cap, anim }: CardProps) => {
  return (
    <motion.div
      className="bg-background border border-border p-5 h-[280px] sm:h-[300px] md:h-[320px] transition-all duration-300 hover:border-primary hover:-translate-y-1 hover:shadow-lg overflow-hidden text-rendering-fix"
      style={{ 
        opacity: anim.opacity,
        backfaceVisibility: 'hidden',
        willChange: 'opacity'
      }}>
      
      <div className="flex items-center gap-3 mb-4 pb-3 border-b border-border">
        <div className="w-9 h-9 bg-primary flex items-center justify-center flex-shrink-0">
          <cap.icon className="w-4 h-4 text-primary-foreground" />
        </div>
        <h3 className="font-bold text-sm">{cap.title}</h3>
      </div>

      <div className="space-y-3">
        {cap.items.map((item) =>
        <div key={item.label} className="flex justify-between items-baseline gap-2">
            <span className="text-xs text-foreground/80">{item.label}</span>
            <span className="text-xs font-medium text-right font-mono">{item.value}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default CapabilitiesSection;