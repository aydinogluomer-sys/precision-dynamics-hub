import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import cncVideo from "@/assets/cnc-machining-video.mp4";

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
  // Text appears mid-scroll
  const textOpacity = useTransform(scrollYProgress, [0.25, 0.4, 0.6, 0.75], [0, 1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0.25, 0.4], [30, 0]);
  // Exit transition: slide up the next section smoothly
  const exitY = useTransform(scrollYProgress, [0.8, 1], [0, -60]);

  return (
    <div
      ref={containerRef}
      className="relative h-[200vh]"
      style={{ background: "#020617" }}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        {/* Static video with scroll-driven zoom only */}
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
          style={{ background: "rgba(2, 6, 23, 0.45)" }}
        />

        {/* Text overlay */}
        <motion.div
          className="relative z-10 text-center px-6"
          style={{ opacity: textOpacity, y: textY }}
        >
          <span
            className="text-xs uppercase tracking-[0.3em] mb-4 block"
            style={{ color: "hsl(var(--primary))", fontFamily: "'JetBrains Mono', monospace" }}
          >
            Mühendislik & Üretim
          </span>
          <h2
            className="text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-white mb-4"
            style={{ lineHeight: 1 }}
          >
            Hassas İşleme
          </h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.6)" }}>
            Çok eksenli CNC tezgâhlarımızla mikron düzeyinde hassasiyet
          </p>
        </motion.div>

        {/* Exit transition overlay - fades to dark as zoom completes */}
        <motion.div
          className="absolute inset-0 z-20 pointer-events-none"
          style={{
            opacity: useTransform(scrollYProgress, [0.78, 0.95], [0, 1]),
            background: "hsl(var(--background))",
            y: exitY,
          }}
        />
      </div>
    </div>
  );
};

export default VideoScrollSection;
