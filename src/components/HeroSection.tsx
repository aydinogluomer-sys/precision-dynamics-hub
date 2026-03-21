import { useState, useEffect, useCallback } from "react";
import { ArrowRight } from "lucide-react";
// Lens flare overlay animation
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";
import heroBg from "@/assets/hero-cnc.jpg";
import cncVideo from "@/assets/cnc-factory-zoom.mp4";
import MagneticButton from "./MagneticButton";
import { Reveal as TextReveal } from "./ui/Reveal";

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

/* ── Character Stagger Headline with 3D Perspective ──────── */

const charVariants = {
  enter: (i: number) => ({
    y: 0,
    opacity: 1,
    scaleY: 1,
    rotateX: 0,
    transition: { delay: i * 0.035, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  }),
  initial: { y: "-120%", opacity: 0, scaleY: 0.8, rotateX: 40 },
  exit: (i: number) => ({
    y: "120%",
    opacity: 0,
    scaleY: 0.8,
    rotateX: -40,
    transition: { delay: i * 0.02, duration: 0.4, ease: "easeIn" as const },
  }),
};

const HeadlineStagger = ({ text, scrollRotateX }: { text: string; scrollRotateX?: ReturnType<typeof useTransform> }) => {
  const allWords = text.replace(/\n/g, " ").split(" ");
  const staggerWords = allWords.slice(0, 2);
  const restWords = allWords.slice(2);

  let charIndex = 0;

  return (
    <motion.div
      className="flex flex-col items-center"
      style={{
        perspective: 800,
        transformStyle: "preserve-3d" as const,
        rotateX: scrollRotateX,
      }}
    >
      <span className="inline-flex flex-wrap justify-center gap-x-[0.3em]">
        {staggerWords.map((word, wi) => (
          <span key={wi} className="inline-flex whitespace-nowrap">
            {word.split("").map((char) => {
              const i = charIndex++;
              return (
                <motion.span
                  key={`${char}-${i}`}
                  custom={i}
                  variants={charVariants}
                  initial="initial"
                  animate="enter"
                  exit="exit"
                  className="inline-block font-extrabold uppercase"
                  style={{
                    fontSize: "clamp(3.5rem, 9vw, 8.75rem)",
                    color: "white",
                    letterSpacing: "-0.03em",
                    lineHeight: 1,
                  }}
                >
                  {char}
                </motion.span>
              );
            })}
          </span>
        ))}
      </span>
      {restWords.length > 0 && (
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ delay: charIndex * 0.02 + 0.1, duration: 0.4 }}
          className="font-extrabold uppercase whitespace-pre-line text-center"
          style={{
            fontSize: "clamp(3.5rem, 9vw, 8.75rem)",
            color: "white",
            letterSpacing: "-0.03em",
            lineHeight: 1,
          }}
        >
          {restWords.join(" ")}
        </motion.span>
      )}
    </motion.div>
  );
};

/* ── Main Component ────────────────────────────────────────── */

interface HeroSectionProps {
  isFirstVisit?: boolean;
}

const HeroSection = ({ isFirstVisit = false }: HeroSectionProps) => {
  const [currentHeadline, setCurrentHeadline] = useState(0);
  const { scrollY } = useScroll();
  const prefersReduced = usePrefersReducedMotion();

  const videoY = useTransform(scrollY, [0, 800], prefersReduced ? [0, 0] : [0, 160]);
  const gridY = useTransform(scrollY, [0, 800], prefersReduced ? [0, 0] : [0, 400]);
  const overlayOpacity = useTransform(scrollY, [0, 600], prefersReduced ? [0.85, 0.85] : [0.85, 1]);
  const headlineRotateX = useTransform(scrollY, [0, 400], prefersReduced ? [0, 0] : [0, -12]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rawRotateX = useTransform(mouseY, [-0.5, 0.5], prefersReduced ? [0, 0] : [3, -3]);
  const rawRotateY = useTransform(mouseX, [-0.5, 0.5], prefersReduced ? [0, 0] : [-3, 3]);
  const rotateX = useSpring(rawRotateX, { stiffness: 150, damping: 20 });
  const rotateY = useSpring(rawRotateY, { stiffness: 150, damping: 20 });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeadline((prev) => (prev + 1) % headlines.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }, [mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  const heroDelay = isFirstVisit ? 0.3 : 0;

  return (
    <section
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden"
      style={{ backgroundColor: "hsl(var(--forge-obsidian))" }}
    >
      {/* Lens flare overlay — delayed to fire after PageLoader */}
      {!prefersReduced && (
        <motion.div
          className="absolute inset-0 z-[50] pointer-events-none"
          initial={{ opacity: 1, filter: "brightness(3) blur(8px)" }}
          animate={{ opacity: 0, filter: "brightness(1) blur(0px)" }}
          transition={{ duration: 0.5, ease: "easeOut", delay: isFirstVisit ? 2.6 : 0.1 }}
          style={{ backgroundColor: "white" }}
        />
      )}
      {/* Video Background */}
      <motion.div className="absolute inset-0 z-0" style={{ y: videoY }}>
        <video
          src={cncVideo}
          poster={heroBg}
          muted
          autoPlay
          loop
          playsInline
          preload="none"
          className="w-full h-[120%] object-cover hidden md:block"
        />
        <img
          src={heroBg}
          alt="CNC Factory"
          className="w-full h-[120%] object-cover md:hidden"
        />
      </motion.div>

      {/* Grid Pattern */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          y: gridY,
          backgroundImage:
            "linear-gradient(to right, rgba(0,113,144,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,113,144,0.06) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Dark Overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-[2]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(15,15,15,0.88) 0%, rgba(15,15,15,0.65) 50%, rgba(15,15,15,0.9) 100%)",
          opacity: overlayOpacity,
        }}
      />

      {/* 3D Mouse Perspective Wrapper */}
      <motion.div
        className="container-industrial relative z-10 w-full"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformPerspective: 1200,
          transformStyle: "preserve-3d" as const,
        }}
      >
        {/* Full-width single column — centered */}
        <motion.div
          className="max-w-6xl mx-auto text-center"
          variants={containerVariants}
          initial={isFirstVisit ? "hidden" : false}
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: heroDelay }}
        >
          <motion.div variants={fadeUpVariants} className="flex items-center justify-center gap-4 mb-8">
            <motion.div
              className="h-1 bg-primary"
              initial={{ width: 0 }}
              animate={{ width: 64 }}
              transition={{ duration: 0.8, delay: 0.3 + heroDelay }}
            />
            <span
              className="text-xs uppercase tracking-widest"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                color: "rgba(255,255,255,0.5)",
              }}
            >
              {"CNC Hassas İşleme"}
            </span>
            <motion.div
              className="h-1 bg-primary"
              initial={{ width: 0 }}
              animate={{ width: 64 }}
              transition={{ duration: 0.8, delay: 0.3 + heroDelay }}
            />
          </motion.div>

          {/* Character Stagger Headlines */}
          <motion.div variants={fadeUpVariants} className="relative h-56 sm:h-72 md:h-80 overflow-hidden mb-8">
            <AnimatePresence mode="wait">
              <HeadlineStagger key={currentHeadline} text={headlines[currentHeadline]} scrollRotateX={headlineRotateX} />
            </AnimatePresence>
          </motion.div>

          <TextReveal delay={0.4 + heroDelay}>
            <p
              className="text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-10"
              style={{ color: "rgba(255,255,255,0.7)", fontStyle: "italic" }}
            >
              {"CNC Freze, Torna ve Talaşlı İmalatta; ölçü hassasiyeti, yüksek doğruluk ve proses kontrollü üretim anlayışıyla, stabil kalite ve zamanında teslimat odaklı mühendislik çözümleri sunuyoruz."}
            </p>
          </TextReveal>

          <motion.div variants={fadeUpVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
            <MagneticButton
              href="/teklif-al"
              className="bg-primary text-primary-foreground font-bold px-10 py-4 uppercase tracking-wider text-sm flex items-center justify-center gap-2 hover:brightness-110 transition-all"
            >
              <span>{"Teklif Al"}</span>
              <ArrowRight className="w-4 h-4" />
            </MagneticButton>
            <MagneticButton
              href="#kabiliyetler"
              className="font-semibold px-10 py-4 uppercase tracking-wider text-sm flex items-center justify-center gap-2 transition-all hover:bg-white/10 border-2 border-white text-white"
              strength={0.2}
            >
              <span>{"Kabiliyetleri Gör"}</span>
            </MagneticButton>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 + heroDelay, duration: 0.6 }}
      >
        <span
          className="text-xs uppercase tracking-widest"
          style={{
            color: "rgba(255,255,255,0.4)",
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          {"Keşfet"}
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
