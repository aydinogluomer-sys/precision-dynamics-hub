import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import cncVideo from "@/assets/cnc-machining-video.mp4";
import { Settings, Target, Layers, Zap } from "lucide-react";

const features = [
  {
    icon: Target,
    title: "Mikron Hassasiyet",
    desc: "±0.005mm tolerans ile üretim kapasitesi.",
  },
  {
    icon: Settings,
    title: "Çok Eksenli İşleme",
    desc: "5 eksenli CNC ile karmaşık geometriler.",
  },
  {
    icon: Layers,
    title: "Geniş Malzeme Yelpazesi",
    desc: "Alüminyum, paslanmaz çelik, titanyum ve daha fazlası.",
  },
  {
    icon: Zap,
    title: "Hızlı Teslimat",
    desc: "Prototipten seriye optimum üretim süreleri.",
  },
];

const VideoScrollSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Zoom: starts at scale 1 (far), zooms in to 2.5 as user scrolls
  const scale = useTransform(scrollYProgress, [0.1, 0.7], [1, 2.5]);
  // Opacity: fade in at start, stay visible, fade out at end for transition
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.75, 0.95], [0, 1, 1, 0]);

  // Content reveal (on.energy style - staggered appearance)
  const labelOpacity = useTransform(scrollYProgress, [0.12, 0.22], [0, 1]);
  const titleOpacity = useTransform(scrollYProgress, [0.15, 0.28], [0, 1]);
  const titleY = useTransform(scrollYProgress, [0.15, 0.28], [40, 0]);
  const descOpacity = useTransform(scrollYProgress, [0.22, 0.35], [0, 1]);
  const cardsOpacity = useTransform(scrollYProgress, [0.3, 0.45], [0, 1]);
  const cardsY = useTransform(scrollYProgress, [0.3, 0.45], [30, 0]);

  // Exit transition overlay
  const exitOpacity = useTransform(scrollYProgress, [0.78, 0.95], [0, 1]);
  const exitY = useTransform(scrollYProgress, [0.8, 1], [0, -60]);

  return (
    <div
      ref={containerRef}
      className="relative h-[200vh]"
      style={{ background: "#020617" }}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        {/* Static video with scroll-driven zoom */}
        <motion.div
          className="absolute inset-0 will-change-transform"
          style={{ scale, opacity }}
        >
          <video
            src={cncVideo}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Dark overlay */}
        <div
          className="absolute inset-0"
          style={{ background: "rgba(2, 6, 23, 0.6)" }}
        />

        {/* ON.energy-style content layout */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-8">
          {/* Top label */}
          <motion.span
            className="text-xs uppercase tracking-[0.3em] mb-6 block"
            style={{
              color: "hsl(var(--primary))",
              fontFamily: "'JetBrains Mono', monospace",
              opacity: labelOpacity,
            }}
          >
            Mühendislik & Üretim
          </motion.span>

          {/* Big heading - on.energy style */}
          <motion.h2
            className="text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-white mb-4"
            style={{ lineHeight: 1, opacity: titleOpacity, y: titleY }}
          >
            Hassas İşleme
          </motion.h2>

          {/* Description */}
          <motion.p
            className="text-base md:text-lg max-w-xl mb-12"
            style={{ color: "rgba(255,255,255,0.6)", opacity: descOpacity }}
          >
            Çok eksenli CNC tezgâhlarımızla mikron düzeyinde hassasiyet sağlıyor,
            en karmaşık geometrileri üretiyoruz.
          </motion.p>

          {/* Feature cards grid - on.energy style */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
            style={{ opacity: cardsOpacity, y: cardsY }}
          >
            {features.map((f) => (
              <div
                key={f.title}
                className="p-4 md:p-5"
                style={{
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "rgba(255,255,255,0.03)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <f.icon
                  className="w-6 h-6 mb-3"
                  style={{ color: "hsl(var(--primary))" }}
                  strokeWidth={1.5}
                />
                <h3 className="text-sm font-semibold text-white mb-1">
                  {f.title}
                </h3>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.45)" }}
                >
                  {f.desc}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Exit transition overlay */}
        <motion.div
          className="absolute inset-0 z-20 pointer-events-none"
          style={{
            opacity: exitOpacity,
            background: "hsl(var(--background))",
            y: exitY,
          }}
        />
      </div>
    </div>
  );
};

export default VideoScrollSection;
