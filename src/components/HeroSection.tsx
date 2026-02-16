import { useState, useEffect } from "react";
import { Upload, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const headlines = [
  "Profesyonel CNC\nOperasyonları",
  "Yüksek Hassasiyetli\nÜretim",
  "Stabil Kalite &\nGüvenilir Teslimat",
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
};

const slideInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" as const, delay: 0.3 },
  },
};

const statVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.5 } },
};

const statItem = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const HeroSection = () => {
  const [currentHeadline, setCurrentHeadline] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeadline((prev) => (prev + 1) % headlines.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden"
      style={{ backgroundColor: "#020617" }}
    >
      {/* Grid Pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(6, 136, 172, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(6, 136, 172, 0.05) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Radial Overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-[2]"
        style={{
          background: "radial-gradient(circle at center, rgba(2, 6, 23, 0.5) 0%, #020617 100%)",
        }}
      />

      <div className="container-industrial relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div
            className="relative p-8 rounded-2xl"
            style={{
              background: "radial-gradient(circle at center, rgba(15, 23, 42, 0.6) 0%, transparent 100%)",
              backdropFilter: "blur(4px)",
            }}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Overline */}
            <motion.div variants={fadeUpVariants} className="flex items-center gap-4 mb-6">
              <div className="w-16 h-1 bg-primary" />
              <span
                className="text-xs uppercase tracking-widest"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  color: "rgba(255, 255, 255, 0.5)",
                }}
              >
                CNC Hassas İşleme
              </span>
            </motion.div>

            {/* Rotating Headline */}
            <motion.div variants={fadeUpVariants} className="relative h-40 md:h-52 overflow-hidden mb-6">
              {headlines.map((headline, index) => (
                <h1
                  key={index}
                  className={`absolute inset-0 font-extrabold uppercase leading-[0.9] tracking-tight transition-all duration-500 whitespace-pre-line ${
                    index === currentHeadline
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{
                    fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                    color: "white",
                    letterSpacing: "-0.03em",
                  }}
                >
                  {headline}
                </h1>
              ))}
            </motion.div>

            {/* Description */}
            <motion.p
              variants={fadeUpVariants}
              className="text-lg leading-relaxed max-w-xl mb-6"
              style={{
                color: "rgba(255, 255, 255, 0.7)",
                fontStyle: "italic",
              }}
            >
              CNC Freze, Torna ve Talaşlı İmalatta; ölçü hassasiyeti, yüksek doğruluk ve
              proses kontrollü üretim anlayışıyla, stabil kalite ve zamanında teslimat
              odaklı mühendislik çözümleri sunuyoruz.
            </motion.p>

            {/* Slogan */}
            <motion.div variants={fadeUpVariants} className="mb-8">
              <span
                className="inline-block px-5 py-2 text-white font-semibold text-sm"
                style={{
                  background: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 100%)",
                  transform: "skewX(-5deg)",
                }}
              >
                <span style={{ display: "block", transform: "skewX(5deg)" }}>
                  "Disiplinli Operasyon, Güvenilir Üretim."
                </span>
              </span>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={fadeUpVariants} className="flex flex-col sm:flex-row gap-4">
              <a
                href="#teklif"
                className="bg-primary text-primary-foreground font-bold px-8 py-4 uppercase tracking-wider text-sm flex items-center justify-center gap-2 hover:brightness-110 transition-all"
                style={{ boxShadow: "8px 8px 0 0 hsl(var(--primary) / 0.2)" }}
              >
                Teklif Al
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#kabiliyetler"
                className="font-semibold px-8 py-4 uppercase tracking-wider text-sm flex items-center justify-center gap-2 transition-all hover:bg-white/10"
                style={{
                  border: "2px solid white",
                  color: "white",
                }}
              >
                Kabiliyetleri Gör
              </a>
            </motion.div>
          </motion.div>

          {/* Right Content - CAD Upload Widget (Glass) */}
          <motion.div
            className="relative"
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div
              className="relative p-10 transition-all duration-300 hover:-translate-y-1 group"
              style={{
                background: "rgba(15, 23, 42, 0.6)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 255, 255, 0.05)",
                boxShadow: "0 0 40px rgba(0, 0, 0, 0.5)",
              }}
            >
              {/* Upload Zone */}
              <div
                className="border-2 border-dashed p-12 text-center cursor-pointer transition-colors duration-200"
                style={{ borderColor: "rgba(255, 255, 255, 0.1)" }}
              >
                <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                  <Upload className="w-10 h-10 text-primary" />
                </div>
                <h3
                  className="text-xl font-bold mb-2"
                  style={{ color: "hsl(var(--primary))" }}
                >
                  CAD Dosyası Sürükle & Bırak
                </h3>
                <p className="text-sm mb-4" style={{ color: "rgba(255, 255, 255, 0.7)" }}>
                  STEP, IGES, DXF, DWG formatları desteklenir
                </p>
                <span
                  className="text-xs"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    color: "hsl(var(--primary))",
                  }}
                >
                  veya dosya seçmek için tıklayın
                </span>
              </div>

              {/* Quick Stats */}
              <motion.div
                className="grid grid-cols-3 gap-4 mt-8 pt-8"
                style={{ borderTop: "1px solid rgba(255, 255, 255, 0.1)" }}
                variants={statVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {[
                  { value: "±0.01", label: "mm Tolerans" },
                  { value: "24h", label: "Teklif Süresi" },
                  { value: "50+", label: "Malzeme" },
                ].map((stat) => (
                  <motion.div key={stat.label} variants={statItem} className="text-center">
                    <div
                      className="text-2xl font-bold text-primary"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {stat.value}
                    </div>
                    <div
                      className="text-xs uppercase tracking-wider mt-1"
                      style={{ color: "rgba(255, 255, 255, 0.5)" }}
                    >
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
