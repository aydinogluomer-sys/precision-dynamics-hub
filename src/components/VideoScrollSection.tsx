import { useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import cncVideo from "@/assets/cnc-factory-zoom.mp4";
import cncWorkshop from "@/assets/cnc-workshop.jpg";
import { Settings, Target, Layers, Zap } from "lucide-react";

const features = [
{
  icon: Target,
  title: "Mikron Hassasiyet",
  desc: "±0.005mm tolerans ile üretim kapasitesi."
},
{
  icon: Settings,
  title: "Çok Eksenli İşleme",
  desc: "5 eksenli CNC ile karmaşık geometriler."
},
{
  icon: Layers,
  title: "Geniş Malzeme Yelpazesi",
  desc: "Alüminyum, paslanmaz çelik, titanyum ve daha fazlası..."
},
{
  icon: Zap,
  title: "Hızlı Teslimat",
  desc: "Prototipten seriye optimum üretim süreleri."
}];


const VideoScrollSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Zoom: starts at scale 1, zooms to 2.5 as user scrolls
  const scale = useTransform(scrollYProgress, [0, 0.6], [1, 2.5]);
  // Opacity: fully visible from start, fade out at end
  const opacity = useTransform(scrollYProgress, [0, 0.7, 0.9], [1, 1, 0]);

  // Content always visible from start
  const labelOpacity = 1;
  const titleOpacity = 1;
  const titleY = 0;
  const descOpacity = 1;
  const cardsOpacity = 1;
  const cardsY = 0;

  // Exit transition overlay
  const exitOpacity = useTransform(scrollYProgress, [0.75, 0.9], [0, 1]);
  const exitY = useTransform(scrollYProgress, [0.78, 1], [0, -60]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    videoRef.current?.play().catch(() => {});
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-[200vh]"
      style={{ background: "hsl(var(--forge-obsidian))" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        {/* Video: paused by default, plays on hover, zooms on scroll */}
        <motion.div
          className="absolute inset-0 will-change-transform"
          style={{ scale, opacity }}>
          
          <video
            ref={videoRef}
            src={cncVideo}
            poster={cncWorkshop}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
            style={{ background: `url(${cncWorkshop}) center/cover no-repeat` }} />
          
        </motion.div>

        {/* Dark overlay */}
        <div
          className="absolute inset-0"
          style={{ background: "rgba(13, 28, 67, 0.6)" }} />
        

        {/* ON.energy-style content layout */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-8">
          {/* Top label */}
          <motion.span
            className="text-xs uppercase tracking-[0.3em] mb-6 block"
            style={{
              color: "hsl(var(--primary))",
              fontFamily: "'JetBrains Mono', monospace",
              opacity: labelOpacity
            }}>ÜÜHENDİSLİK & ÜRETİM


          </motion.span>

          {/* Big heading - on.energy style */}
          <motion.h2
            className="text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-white mb-4"
            style={{ lineHeight: 1, opacity: titleOpacity, y: titleY }}>
            
            Hassas İşleme
          </motion.h2>

          {/* Description */}
          <motion.p
            className="text-base md:text-lg max-w-xl mb-12"
            style={{ color: "rgba(255,255,255,0.6)", opacity: descOpacity }}>
            Gelişmiş çok eksenli CNC tezgâhlarımızla mikron düzeyinde hassasiyetle en karmaşık parça geometrilerini üretiyoruz.


          </motion.p>

          {/* Feature cards grid - on.energy style */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
            style={{ opacity: cardsOpacity, y: cardsY }}>
            
            {features.map((f) =>
            <div
              key={f.title}
              className="p-4 md:p-5"
              style={{
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.03)",
                backdropFilter: "blur(8px)"
              }}>
              
                <f.icon
                className="w-6 h-6 mb-3"
                style={{ color: "hsl(var(--primary))" }}
                strokeWidth={1.5} />
              
                <h3 className="text-sm font-semibold text-white mb-1">
                  {f.title}
                </h3>
                <p
                className="text-xs leading-relaxed"
                style={{ color: "rgba(255,255,255,0.45)" }}>
                
                  {f.desc}
                </p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Exit transition overlay */}
        <motion.div
          className="absolute inset-0 z-20 pointer-events-none"
          style={{
            opacity: exitOpacity,
            background: "hsl(var(--background))",
            y: exitY
          }} />
        
      </div>
    </div>);

};

export default VideoScrollSection;