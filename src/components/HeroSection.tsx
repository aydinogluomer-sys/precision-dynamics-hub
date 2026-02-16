import { useState, useEffect, lazy, Suspense } from "react";
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import heroBg from "@/assets/hero-cnc.jpg";
import MagneticButton from "./MagneticButton";
import { TextReveal } from "./ScrollReveal";

const CNCModel = lazy(() => import("./CNCModel"));

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
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 800], [0, 200]);
  const overlayOpacity = useTransform(scrollY, [0, 600], [0.85, 1]);

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
      {/* Parallax Background Image */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <img
          src={heroBg}
          alt="CNC precision machining"
          className="w-full h-full object-cover scale-110"
          loading="eager"
        />
      </motion.div>

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(6, 136, 172, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(6, 136, 172, 0.05) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Dark Overlay with scroll-linked opacity */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-[2]"
        style={{
          background: "linear-gradient(to right, rgba(2, 6, 23, 0.92) 0%, rgba(2, 6, 23, 0.7) 50%, rgba(2, 6, 23, 0.85) 100%)",
          opacity: overlayOpacity,
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
              <motion.div
                className="h-1 bg-primary"
                initial={{ width: 0 }}
                animate={{ width: 64 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
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

            {/* Rotating Headline with clip-path reveal */}
            <motion.div variants={fadeUpVariants} className="relative h-40 md:h-52 overflow-hidden mb-6">
              {headlines.map((headline, index) => (
                <h1
                  key={index}
                  className={`absolute inset-0 font-extrabold uppercase leading-[0.9] tracking-tight transition-all duration-700 whitespace-pre-line ${
                    index === currentHeadline
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{
                    fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                    color: "white",
                    letterSpacing: "-0.03em",
                    clipPath: index === currentHeadline ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)",
                    transition: "clip-path 0.7s cubic-bezier(0.77, 0, 0.175, 1), opacity 0.5s, transform 0.5s",
                  }}
                >
                  {headline}
                </h1>
              ))}
            </motion.div>

            {/* Description */}
            <TextReveal delay={0.4}>
              <p
                className="text-lg leading-relaxed max-w-xl mb-6"
                style={{
                  color: "rgba(255, 255, 255, 0.7)",
                  fontStyle: "italic",
                }}
              >
                CNC Freze, Torna ve Talaşlı İmalatta; ölçü hassasiyeti, yüksek doğruluk ve
                proses kontrollü üretim anlayışıyla, stabil kalite ve zamanında teslimat
                odaklı mühendislik çözümleri sunuyoruz.
              </p>
            </TextReveal>

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

            {/* CTA Buttons with magnetic effect */}
            <motion.div variants={fadeUpVariants} className="flex flex-col sm:flex-row gap-4">
              <MagneticButton
                href="#teklif"
                className="bg-primary text-primary-foreground font-bold px-8 py-4 uppercase tracking-wider text-sm flex items-center justify-center gap-2 hover:brightness-110 transition-all"
              >
                Teklif Al
                <ArrowRight className="w-4 h-4" />
              </MagneticButton>
              <MagneticButton
                href="#kabiliyetler"
                className="font-semibold px-8 py-4 uppercase tracking-wider text-sm flex items-center justify-center gap-2 transition-all hover:bg-white/10 border-2 border-white text-white"
                strength={0.2}
              >
                Kabiliyetleri Gör
              </MagneticButton>
            </motion.div>
          </motion.div>

          {/* Right Content - 3D CNC Model */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" as const, delay: 0.3 }}
          >
            <div
              className="relative transition-all duration-300 overflow-hidden"
              style={{
                background: "rgba(15, 23, 42, 0.4)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 255, 255, 0.05)",
                boxShadow: "0 0 40px rgba(0, 0, 0, 0.5)",
              }}
            >
              {/* 3D Model */}
              <div className="h-[350px] md:h-[400px]">
                <Suspense
                  fallback={
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-16 h-16 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    </div>
                  }
                >
                  <CNCModel />
                </Suspense>
              </div>

              {/* Quick Stats */}
              <motion.div
                className="grid grid-cols-3 gap-4 p-8 pt-0"
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
                  <motion.div key={stat.label} variants={statItem} className="text-center pt-6">
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

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <span className="text-xs uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'JetBrains Mono', monospace" }}>
          Keşfet
        </span>
        <motion.div
          className="w-5 h-8 border border-white/20 rounded-full flex justify-center pt-1"
          animate={{ y: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <div className="w-1 h-2 bg-primary rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
