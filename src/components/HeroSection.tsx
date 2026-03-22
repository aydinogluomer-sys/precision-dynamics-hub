import { useState, useEffect, useCallback, useRef } from "react";
import { ArrowRight, Upload, CheckCircle } from "lucide-react";
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";
import heroBg from "@/assets/hero-cnc.jpg";
import cncVideo from "@/assets/cnc-factory-zoom.mp4";
import { MagneticButton } from "./MagneticButton";
import { Reveal as TextReveal } from "./ui/Reveal";
import { HeadlineStagger } from "./HeadlineStagger";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const headlines = [
  "Profesyonel CNC\nOperasyonları",
  "Yüksek Hassasiyetli\nÜretim",
  "Stabil Kalite &\nGüvenilir Teslimat",
];

const ACCEPTED_EXTENSIONS = [".step", ".stp", ".stl", ".obj", ".iges", ".igs", ".3mf"];
const MAX_FILE_SIZE = 50 * 1024 * 1024;

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

interface HeroSectionProps {
  isFirstVisit?: boolean;
}

export const HeroSection = ({ isFirstVisit = false }: HeroSectionProps) => {
  const [currentHeadline, setCurrentHeadline] = useState(0);
  const { scrollY } = useScroll();
  const prefersReduced = usePrefersReducedMotion();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadState, setUploadState] = useState<"idle" | "success" | "error">("idle");

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

  // File upload logic
  const validateFile = (file: File): string | null => {
    const ext = "." + file.name.split(".").pop()?.toLowerCase();
    if (!ACCEPTED_EXTENSIONS.includes(ext)) {
      return `Desteklenmeyen dosya formatı. Kabul edilen: ${ACCEPTED_EXTENSIONS.join(", ")}`;
    }
    if (file.size > MAX_FILE_SIZE) {
      return "Dosya boyutu 50MB'ı aşıyor.";
    }
    return null;
  };

  const navigateWithFile = useCallback((file: File) => {
    const error = validateFile(file);
    if (error) {
      setUploadState("error");
      toast.error(error);
      setTimeout(() => setUploadState("idle"), 600);
      return;
    }
    setUploadState("success");
    (window as unknown as Record<string, File>).__heroUploadFile = file;
    setTimeout(() => navigate("/teklif-al"), 500);
  }, [navigate]);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) navigateWithFile(file);
    },
    [navigateWithFile]
  );

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) navigateWithFile(file);
    e.target.value = "";
  };

  const heroDelay = isFirstVisit ? 0.3 : 0;

  return (
    <section
      id="hero"
      className="relative flex items-center justify-center pt-24 pb-28"
      style={{ backgroundColor: "hsl(var(--forge-obsidian))", minHeight: "100svh" }}
    >
      {!prefersReduced && (
        <motion.div
          className="absolute inset-0 z-[50] pointer-events-none"
          initial={{ opacity: 1, filter: "brightness(3) blur(8px)" }}
          animate={{ opacity: 0, filter: "brightness(1) blur(0px)" }}
          transition={{ duration: 0.5, ease: "easeOut", delay: isFirstVisit ? 2.6 : 0.1 }}
          style={{ backgroundColor: "white" }}
        />
      )}
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

      <motion.div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          y: gridY,
          backgroundImage:
            "linear-gradient(to right, rgba(0,113,144,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,113,144,0.06) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <motion.div
        className="absolute inset-0 pointer-events-none z-[2]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(15,15,15,0.88) 0%, rgba(15,15,15,0.65) 50%, rgba(15,15,15,0.9) 100%)",
          opacity: overlayOpacity,
        }}
      />

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
                fontFamily: "'IBM Plex Mono', monospace",
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

          <motion.div variants={fadeUpVariants} className="relative h-44 sm:h-56 md:h-64 overflow-hidden mb-6">
            <AnimatePresence mode="wait">
              <HeadlineStagger key={currentHeadline} text={headlines[currentHeadline]} scrollRotateX={headlineRotateX} />
            </AnimatePresence>
          </motion.div>

          <TextReveal delay={0.4 + heroDelay}>
            <p
              className="text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-6"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              {"CNC Freze, Torna ve Talaşlı İmalatta; ölçü hassasiyeti, yüksek doğruluk ve proses kontrollü üretim anlayışıyla, stabil kalite ve zamanında teslimat odaklı mühendislik çözümleri sunuyoruz."}
            </p>
          </TextReveal>

          <motion.div variants={fadeUpVariants} className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
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

          {/* Inline Quick Quote Drag & Drop */}
          <motion.div
            variants={fadeUpVariants}
            className="max-w-xl mx-auto"
          >
            <motion.div
              className={`relative overflow-hidden cursor-pointer group ${isDragging ? "ring-2 ring-primary" : ""}`}
              style={{
                background: "rgba(15,15,15,0.5)",
                backdropFilter: "blur(16px)",
                border: `1px solid ${isDragging ? "rgba(0,113,144,0.5)" : "rgba(0,113,144,0.15)"}`,
                transition: "border-color 0.3s, box-shadow 0.3s",
              }}
              animate={uploadState === "error" ? { x: [-8, 8, -4, 4, 0] } : {}}
              transition={{ duration: 0.4 }}
              role="button"
              tabIndex={0}
              aria-label="CAD dosyası yükle — sürükle bırak veya tıkla"
              onClick={() => fileInputRef.current?.click()}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  fileInputRef.current?.click();
                }
              }}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
            >
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept=".step,.stp,.stl,.obj,.iges,.igs,.3mf"
                onChange={handleFileSelect}
              />

              <div className="flex items-center gap-4 px-6 py-4">
                <AnimatePresence mode="wait">
                  {uploadState === "success" ? (
                    <motion.div
                      key="check"
                      className="w-10 h-10 rounded-full flex items-center justify-center bg-green-500/20 shrink-0"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    >
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="upload"
                      className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${isDragging ? "bg-primary/20" : "bg-white/5"}`}
                      style={{ border: `1px solid ${isDragging ? "hsl(var(--primary))" : "rgba(0,113,144,0.2)"}` }}
                      animate={{ y: [0, -3, 0] }}
                      transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                    >
                      <Upload className="w-5 h-5 text-primary" />
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="text-left flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white/90 font-mono uppercase tracking-wider">
                    CAD Dosyanızı Sürükleyin
                  </p>
                  <p className="text-xs text-white/40">
                    STEP · STL · OBJ · IGES · 3MF — 48 saat içinde teklif alın
                  </p>
                </div>

                <ArrowRight className="w-4 h-4 text-primary shrink-0 group-hover:translate-x-1 transition-transform" />
              </div>

              {/* Scanning line */}
              <motion.div
                className="absolute left-0 right-0 h-px pointer-events-none"
                style={{
                  background: "linear-gradient(90deg, transparent, hsl(var(--primary)), transparent)",
                  opacity: 0.3,
                }}
                animate={{ top: ["0%", "100%", "0%"] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Wave divider at bottom of hero */}
      <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none">
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          preserveAspectRatio="none"
          style={{ display: "block", height: 80 }}
        >
          <path
            d="M0 50C240 20 480 0 720 10C960 20 1200 50 1440 40V80H0V50Z"
            fill="hsl(var(--forge-obsidian))"
          />
        </svg>
      </div>

      <motion.div
        className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 + heroDelay, duration: 0.6 }}
      >
        <span
          className="text-xs uppercase tracking-widest"
          style={{
            color: "rgba(255,255,255,0.4)",
            fontFamily: "'IBM Plex Mono', monospace",
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
