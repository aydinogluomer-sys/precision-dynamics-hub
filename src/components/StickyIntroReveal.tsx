import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/**
 * ON Energy-style full-screen intro reveal.
 * Text is masked and reveals word-by-word as user scrolls through a pinned viewport.
 * Uses a tall scroll container (200vh) with sticky inner to create the "scrollytelling" effect.
 */
const StickyIntroReveal = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Text reveal progress
  const textOpacity = useTransform(scrollYProgress, [0, 0.15, 0.4], [0, 1, 1]);
  const textY = useTransform(scrollYProgress, [0, 0.15, 0.4], [60, 0, 0]);

  // Line accent width
  const lineWidth = useTransform(scrollYProgress, [0.1, 0.3], [0, 200]);

  // Badge appearance
  const badgeOpacity = useTransform(scrollYProgress, [0.25, 0.4], [0, 1]);
  const badgeY = useTransform(scrollYProgress, [0.25, 0.4], [20, 0]);

  // Stats reveal
  const statsOpacity = useTransform(scrollYProgress, [0.35, 0.5], [0, 1]);
  const statsY = useTransform(scrollYProgress, [0.35, 0.5], [30, 0]);

  // Background gradient shift
  const bgGradient = useTransform(
    scrollYProgress,
    [0, 0.5],
    [
      "radial-gradient(ellipse at 50% 80%, rgba(6, 136, 173, 0.08) 0%, transparent 60%)",
      "radial-gradient(ellipse at 50% 50%, rgba(6, 136, 173, 0.15) 0%, transparent 50%)",
    ]
  );

  return (
    <div ref={containerRef} className="relative" style={{ height: "200vh" }}>
      <div
        className="sticky top-0 h-screen flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: "#020617" }}
      >
        {/* Grid pattern */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(6, 136, 173, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(6, 136, 173, 0.04) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Animated radial glow */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ background: bgGradient }}
        />

        <div className="container-industrial relative z-10 max-w-5xl text-center px-6">
          {/* Accent line */}
          <motion.div
            className="h-[2px] bg-primary mx-auto mb-10"
            style={{ width: lineWidth }}
          />

          {/* Main text */}
          <motion.p
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.25] tracking-tight text-white"
            style={{ opacity: textOpacity, y: textY }}
          >
            <span style={{ color: "hsl(var(--primary))" }}>Mas Technic</span>, CNC Freze,
            Torna ve Talaşlı İmalat alanlarında{" "}
            <span className="italic" style={{ color: "rgba(255, 255, 255, 0.5)" }}>
              ölçü hassasiyeti
            </span>
            , yüksek doğruluk ve{" "}
            <span style={{ color: "hsl(var(--primary))" }}>proses kontrollü üretim</span>{" "}
            anlayışıyla en zorlu mühendislik problemlerine çözüm sunar.
          </motion.p>

          {/* Badge */}
          <motion.div
            className="flex justify-center mt-10"
            style={{ opacity: badgeOpacity, y: badgeY }}
          >
            <span
              className="inline-flex items-center gap-3 px-6 py-3 text-sm font-semibold"
              style={{
                border: "1px solid rgba(6, 136, 173, 0.3)",
                color: "hsl(var(--primary))",
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              2010'dan beri endüstri lideri
            </span>
          </motion.div>

          {/* Stats row */}
          <motion.div
            className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-14"
            style={{ opacity: statsOpacity, y: statsY }}
          >
            {[
              { value: "35+", label: "CNC Tezgâh" },
              { value: "±0.005mm", label: "Hassasiyet" },
              { value: "15+", label: "Yıl Tecrübe" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div
                  className="text-2xl md:text-3xl font-bold text-primary mb-1"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {stat.value}
                </div>
                <div
                  className="text-[10px] uppercase tracking-[0.2em]"
                  style={{ color: "rgba(255, 255, 255, 0.4)" }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Corner decorations */}
        <div className="absolute top-8 left-8 w-12 h-12 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-[1px]" style={{ background: "rgba(6, 136, 173, 0.2)" }} />
          <div className="absolute top-0 left-0 h-full w-[1px]" style={{ background: "rgba(6, 136, 173, 0.2)" }} />
        </div>
        <div className="absolute bottom-8 right-8 w-12 h-12 pointer-events-none">
          <div className="absolute bottom-0 right-0 w-full h-[1px]" style={{ background: "rgba(6, 136, 173, 0.2)" }} />
          <div className="absolute bottom-0 right-0 h-full w-[1px]" style={{ background: "rgba(6, 136, 173, 0.2)" }} />
        </div>
      </div>
    </div>
  );
};

export default StickyIntroReveal;
