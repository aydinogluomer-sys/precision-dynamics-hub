import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import cncVideo from "@/assets/cnc-machining-video.mp4";

const VideoScrollSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.3, 1.5]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3]);
  const textOpacity = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], [0, 1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0.2, 0.4], [40, 0]);

  return (
    <div
      ref={containerRef}
      className="relative h-[200vh]"
      style={{ background: "#020617" }}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        {/* Video with scroll-driven zoom */}
        <motion.div
          className="absolute inset-0"
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
          style={{ background: "rgba(2, 6, 23, 0.5)" }}
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
      </div>
    </div>
  );
};

export default VideoScrollSection;
