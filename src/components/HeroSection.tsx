import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import cncVideo from "@/assets/cnc-machining-video.mp4";

const SUBTITLES = ["5 Eksen Frezeleme", "Titanyum ve İnconel", "3 Günde Teslim"];

const SERVICE_CHIPS = [
  "5 Eksen Frezeleme",
  "Tornalama",
  "EDM",
  "Yüzey İşleme",
  "Kalite Kontrol",
];

const STATS = [
  { value: "25+", label: "Yıl" },
  { value: "10K+", label: "Parça" },
  { value: "0.002mm", label: "Tolerans" },
];

const chipVariants = {
  rest: { scale: 1, boxShadow: "0 0 0px rgba(251,191,36,0)" },
  hover: {
    scale: 1.12,
    boxShadow: "0 0 22px rgba(251,191,36,0.45)",
    backgroundColor: "rgba(251,191,36,0.1)",
  },
  tap: { scale: 0.97 },
};

const chipTransition = { type: "spring" as const, stiffness: 350, damping: 20 };

const HeroSection = () => {
  const [currentSub, setCurrentSub] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSub((p) => (p + 1) % SUBTITLES.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ backgroundColor: "hsl(var(--forge-bg))" }}
    >
      {/* Layer 1 — Video Background (z-0) */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-40"
        >
          <source src={cncVideo} type="video/mp4" />
        </video>
      </div>

      {/* Layer 2 — Shader / Metal Pulse (z-10) */}
      <div
        className="absolute inset-0 z-10 pointer-events-none animate-metal-pulse"
        style={{
          opacity: 0.35,
          background:
            "radial-gradient(ellipse at 30% 50%, hsl(var(--forge-gold) / 0.1) 0%, transparent 50%), " +
            "radial-gradient(ellipse at 70% 60%, hsl(var(--forge-muted-steel) / 0.08) 0%, transparent 50%)",
        }}
      />

      {/* Layer 3 — Content (z-20) */}
      <div className="relative z-20 container-industrial py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — Headline + Typewriter */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h1
              className="text-white leading-[1.05] mb-5"
              style={{
                fontFamily: "'Exo 2', sans-serif",
                fontSize: "clamp(36px, 5vw, 56px)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
              }}
            >
              0.001mm Hassasiyet
            </h1>

            <div className="h-10 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentSub}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.3 }}
                  className="text-lg"
                  style={{
                    color: "hsl(var(--forge-muted-steel))",
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  {SUBTITLES[currentSub]}
                </motion.p>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Right — Floating Stats */}
          <div className="grid grid-cols-3 gap-4">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.15, duration: 0.5, ease: "easeOut" }}
                className="text-center p-4 rounded-lg"
                style={{
                  backgroundColor: "hsl(var(--forge-surface-alt))",
                  border: "1px solid hsl(var(--forge-gold) / 0.12)",
                }}
              >
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 32,
                    fontWeight: 600,
                    color: "hsl(var(--forge-gold))",
                  }}
                >
                  {s.value}
                </div>
                <div
                  className="text-[11px] uppercase mt-1"
                  style={{
                    letterSpacing: "0.08em",
                    color: "hsl(var(--forge-muted-steel))",
                  }}
                >
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Layer 4 — Service Chips (z-20) */}
      <div className="relative z-20 container-industrial pb-24">
        <div
          className="flex gap-3 md:flex-wrap md:justify-center overflow-x-auto scrollbar-none"
          style={{ touchAction: "pan-x" }}
        >
          {SERVICE_CHIPS.map((chip) => (
            <motion.span
              key={chip}
              variants={chipVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              transition={chipTransition}
              className="px-4 py-2 text-sm cursor-pointer whitespace-nowrap rounded"
              style={{
                border: "1px solid rgba(251,191,36,0.3)",
                background: "transparent",
                color: "rgba(255,255,255,0.8)",
              }}
            >
              {chip}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Layer 5 — Scroll Indicator (z-20) */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
      >
        <ChevronDown className="w-6 h-6" style={{ color: "rgba(255,255,255,0.5)" }} />
      </motion.div>
    </section>
  );
};

export default HeroSection;
