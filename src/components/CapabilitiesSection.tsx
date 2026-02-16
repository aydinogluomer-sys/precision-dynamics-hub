import { Monitor, Ruler, CheckCircle, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import cncWorkshop from "@/assets/cnc-workshop.jpg";

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

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const CapabilitiesSection = () => {
  return (
    <section
      id="kabiliyetler"
      className="relative bg-secondary"
      style={{ padding: "120px 0" }}
    >
      {/* Blueprint grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(6, 136, 173, 0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 136, 173, 0.025) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container-industrial relative z-10">
        {/* Header with Workshop Image */}
        <motion.div
          className="relative overflow-hidden mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative h-56 md:h-72 overflow-hidden">
            <img
              src={cncWorkshop}
              alt="CNC machine workshop"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to top, hsl(220 15% 12%) 0%, hsl(220 15% 12% / 0.7) 40%, hsl(220 15% 12% / 0.3) 100%)" }}
            />
            <div className="absolute inset-0 flex items-end justify-center pb-8">
              <div className="text-center">
                <span className="text-xs font-semibold uppercase tracking-[0.4em] mb-3 block text-primary">
                  Teknik
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-white">Kabiliyetlerimiz</h2>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {capabilities.map((cap) => (
            <motion.div
              key={cap.title}
              variants={cardVariants}
              className="bg-background border border-border p-8"
            >
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
                <div className="w-10 h-10 bg-primary flex items-center justify-center">
                  <cap.icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <h3 className="font-bold">{cap.title}</h3>
              </div>

              <div className="space-y-4">
                {cap.items.map((item) => (
                  <div key={item.label} className="flex justify-between items-start gap-2">
                    <span className="text-sm text-muted-foreground">{item.label}</span>
                    <span
                      className="text-sm font-medium text-right"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Blueprint CTA */}
        <div className="flex items-center justify-center gap-0 mt-16">
          <div className="flex-1 h-px relative" style={{ background: "rgba(6, 136, 173, 0.18)" }}>
            <div
              className="absolute right-0 top-1/2 -translate-y-1/2 w-[7px] h-[7px] rounded-full bg-secondary"
              style={{ border: "1.5px solid rgba(6, 136, 173, 0.35)" }}
            />
          </div>
          <a
            href="#teklif"
            className="px-10 py-3.5 text-xs font-bold uppercase tracking-[0.08em] text-primary transition-all duration-300 hover:bg-primary hover:text-white whitespace-nowrap"
            style={{ border: "1px solid rgba(6, 136, 173, 0.35)" }}
          >
            Teknik Kapasiteyi İncele
          </a>
          <div className="flex-1 h-px relative" style={{ background: "rgba(6, 136, 173, 0.18)" }}>
            <div
              className="absolute left-0 top-1/2 -translate-y-1/2 w-[7px] h-[7px] rounded-full bg-secondary"
              style={{ border: "1.5px solid rgba(6, 136, 173, 0.35)" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CapabilitiesSection;
