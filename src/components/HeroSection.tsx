import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Upload, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import heroBg from "@/assets/hero-cnc.jpg";
import MagneticButton from "./MagneticButton";
import { TextReveal } from "./ScrollReveal";
import { toast } from "sonner";

const headlines = [
"Profesyonel CNC\nOperasyonları",
"Yüksek Hassasiyetli\nÜretim",
"Stabil Kalite &\nGüvenilir Teslimat"];


const ACCEPTED_EXTENSIONS = [".step", ".stp", ".stl", ".obj", ".iges", ".igs", ".3mf"];
const MAX_FILE_SIZE = 50 * 1024 * 1024;

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } }
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" as const }
  }
};

const statVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.5 } }
};

const statItem = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const }
  }
};

const HeroSection = () => {
  const [currentHeadline, setCurrentHeadline] = useState(0);
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 800], [0, 200]);
  const overlayOpacity = useTransform(scrollY, [0, 600], [0.85, 1]);
  const navigate = useNavigate();

  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeadline((prev) => (prev + 1) % headlines.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

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

  const navigateWithFile = (file: File) => {
    const error = validateFile(file);
    if (error) {
      toast.error(error);
      return;
    }
    // Store file temporarily for TeklifAl to pick up
    (window as any).__heroUploadFile = file;
    navigate("/teklif-al");
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) navigateWithFile(file);
  }, [navigate]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) navigateWithFile(file);
    e.target.value = "";
  };

  return (
    <section
      className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden"
      style={{ backgroundColor: "#0d1c43" }}>
      
      {/* Parallax Background */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <img src={heroBg} alt="CNC precision machining" className="w-full h-full object-cover scale-110" loading="eager" />
      </motion.div>

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          backgroundImage: "linear-gradient(to right, rgba(9,145,151,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(9,145,151,0.06) 1px, transparent 1px)",
          backgroundSize: "40px 40px"
        }} />
      

      {/* Dark Overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-[2]"
        style={{
          background: "linear-gradient(to right, rgba(13,28,67,0.92) 0%, rgba(13,28,67,0.7) 50%, rgba(13,28,67,0.85) 100%)",
          opacity: overlayOpacity
        }} />
      

      <div className="container-industrial relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            className="relative p-4 sm:p-8 rounded-2xl"
            style={{
              background: "radial-gradient(circle at center, rgba(13,28,67,0.6) 0%, transparent 100%)",
              backdropFilter: "blur(4px)"
            }}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}>
            
            <motion.div variants={fadeUpVariants} className="flex items-center gap-4 mb-6">
              <motion.div className="h-1 bg-primary" initial={{ width: 0 }} animate={{ width: 64 }} transition={{ duration: 0.8, delay: 0.3 }} />
              <span className="text-xs uppercase tracking-widest" style={{ fontFamily: "'JetBrains Mono', monospace", color: "rgba(255,255,255,0.5)" }}>
                CNC Hassas İşleme
              </span>
            </motion.div>

            <motion.div variants={fadeUpVariants} className="relative h-28 sm:h-36 md:h-48 overflow-hidden mb-6">
              {headlines.map((headline, index) =>
              <h1
                key={index}
                className={`absolute inset-0 font-extrabold uppercase leading-[1] tracking-tight transition-all duration-700 whitespace-pre-line flex items-start ${index === currentHeadline ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{
                  fontSize: "clamp(1.75rem, 4.5vw, 4rem)",
                  color: "white",
                  letterSpacing: "-0.03em",
                  clipPath: index === currentHeadline ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)",
                  transition: "clip-path 0.7s cubic-bezier(0.77,0,0.175,1), opacity 0.5s, transform 0.5s"
                }}>
                  {headline}
                </h1>
              )}
            </motion.div>

            <TextReveal delay={0.4}>
              <p className="text-base sm:text-lg leading-relaxed max-w-xl mb-6" style={{ color: "rgba(255,255,255,0.7)", fontStyle: "italic" }}>
                CNC Freze, Torna ve Talaşlı İmalatta; ölçü hassasiyeti, yüksek doğruluk ve proses kontrollü üretim anlayışıyla, stabil kalite ve zamanında teslimat odaklı mühendislik çözümleri sunuyoruz.
              </p>
            </TextReveal>

            <motion.div variants={fadeUpVariants} className="mb-8">
              <span className="inline-block px-5 py-2 text-white font-semibold text-sm" style={{ background: "linear-gradient(135deg, #f37420 0%, #fdbf68 100%)", transform: "skewX(-5deg)" }}>
                <span style={{ display: "block", transform: "skewX(5deg)" }}>"Disiplinli Operasyon, Güvenilir Üretim."</span>
              </span>
            </motion.div>

            <motion.div variants={fadeUpVariants} className="flex flex-col sm:flex-row gap-4">
              <MagneticButton href="/teklif-al" className="bg-primary text-primary-foreground font-bold px-8 py-4 uppercase tracking-wider text-sm flex items-center justify-center gap-2 hover:brightness-110 transition-all">
                Teklif Al <ArrowRight className="w-4 h-4" />
              </MagneticButton>
              <MagneticButton href="#kabiliyetler" className="font-semibold px-8 py-4 uppercase tracking-wider text-sm flex items-center justify-center gap-2 transition-all hover:bg-white/10 border-2 border-white text-white" strength={0.2}>
                Kabiliyetleri Gör
              </MagneticButton>
            </motion.div>
          </motion.div>

          {/* Right Content - CAD Drop Zone (Upload Interface) */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" as const, delay: 0.3 }}>
            
            {/* Blue glow behind the card */}
            <div
              className="absolute -inset-4 sm:-inset-6 pointer-events-none z-0"
              style={{
                background: "radial-gradient(ellipse at center, rgba(9,145,151,0.25) 0%, rgba(253,191,104,0.08) 40%, transparent 70%)",
                filter: "blur(30px)"
              }} />
            
            <div
              className="relative overflow-hidden z-10"
              style={{
                background: "rgba(13,28,67,0.6)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(9,145,151,0.15)",
                boxShadow: "0 0 60px rgba(9,145,151,0.15), 0 0 120px rgba(253,191,104,0.05), inset 0 1px 0 rgba(9,145,151,0.1)"
              }}>
              
              {/* Header bar */}
              <div className="flex items-center justify-between px-5 py-3 border-b" style={{ borderColor: "rgba(6,136,172,0.15)", background: "rgba(6,136,172,0.03)" }}>
                <span className="text-[10px] uppercase tracking-[0.2em] font-mono" style={{ color: "rgba(255,255,255,0.5)" }}>YÜKLEME ARAYÜZÜ V2.4.0

                </span>
                <motion.div
                  className="w-2 h-2 rounded-full bg-primary"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }} />
                
              </div>

              {/* CAD Drop Zone */}
              <div
                className={`relative p-6 sm:p-10 cursor-pointer group ${
                isDragging ? "bg-primary/10" : ""}`
                }
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => {e.preventDefault();setIsDragging(true);}}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept=".step,.stp,.stl,.obj,.iges,.igs,.3mf"
                  onChange={handleFileSelect} />
                

                {/* Animated dashed border */}
                <motion.div
                  className="absolute inset-4 sm:inset-6 pointer-events-none"
                  style={{
                    border: `2px dashed ${isDragging ? "hsl(var(--primary))" : "rgba(255,255,255,0.12)"}`,
                    transition: "border-color 0.3s"
                  }}
                  animate={isDragging ? { scale: [1, 1.02, 1] } : {}}
                  transition={{ repeat: Infinity, duration: 1.5 }} />
                

                {/* Scanning line animation */}
                <motion.div
                  className="absolute left-4 right-4 sm:left-6 sm:right-6 h-px pointer-events-none"
                  style={{ background: "linear-gradient(90deg, transparent, hsl(var(--primary)), transparent)", opacity: 0.4 }}
                  animate={{ top: ["15%", "85%", "15%"] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} />
                

                <div className="relative flex flex-col items-center text-center gap-5 py-6 sm:py-10">
                  {/* Icon */}
                  <motion.div
                    className={`w-16 h-16 rounded-full flex items-center justify-center ${
                    isDragging ? "bg-primary/20" : "bg-white/5"}`
                    }
                    style={{ border: `1px solid ${isDragging ? "hsl(var(--primary))" : "rgba(6,136,172,0.2)"}` }}
                    animate={{ y: [0, -6, 0] }}
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}>
                    <Upload className="w-7 h-7 text-primary" />
                  </motion.div>

                  {/* Text */}
                  <div>
                    <p className="text-base sm:text-lg font-bold uppercase tracking-wider text-white/90 group-hover:text-white transition-colors mb-1" style={{ fontFamily: "'JetBrains Mono', monospace" }}>DOSYAYI BURAYA SÜRÜKLE
                    </p>
                    <p className="text-xs text-white/40">
                      veya tıklayarak dosya seçin
                    </p>
                  </div>
                  <div className="flex flex-wrap justify-center gap-2">
                    {["STEP", "STL", "OBJ", "IGES", "3MF"].map((fmt) =>
                      <span key={fmt} className="text-[10px] uppercase tracking-wider text-white/40 px-2 py-1 font-mono" style={{ border: "1px solid rgba(6,136,172,0.15)", background: "rgba(6,136,172,0.05)" }}>
                        {fmt}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Footer bar */}
              <div className="flex items-center justify-between px-5 py-3 border-t" style={{ borderColor: "rgba(6,136,172,0.15)", background: "rgba(6,136,172,0.03)" }}>
                <span className="text-[10px] uppercase tracking-[0.15em] font-mono flex items-center gap-2" style={{ color: "rgba(255,255,255,0.4)" }}>UÇTAN UCA ŞİFRELEME AKTİF
                  <motion.span className="w-1.5 h-1.5 rounded-full bg-green-400"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }} />
                </span>
                <span className="text-[10px] uppercase tracking-[0.15em] font-mono" style={{ color: "rgba(255,255,255,0.4)" }}>100% IP KORUMASI

                </span>
              </div>
            </div>

            {/* Quick Stats */}
            <motion.div
              className="grid grid-cols-3 gap-3 mt-3"
              variants={statVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}>
              
              {[
              { value: "±0.005", label: "mm Tolerans" },
              { value: "48h", label: "Teklif Süresi" },
              { value: "50+", label: "Malzeme" }].
              map((stat) =>
              <motion.div
                key={stat.label}
                variants={statItem}
                className="text-center py-3"
                style={{
                  background: "rgba(15,23,42,0.4)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(6,136,172,0.1)"
                }}>
                
                  <div className="text-lg sm:text-xl font-bold text-primary" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    {stat.value}
                  </div>
                  <div className="text-[9px] uppercase tracking-wider mt-0.5" style={{ color: "rgba(255,255,255,0.5)" }}>
                    {stat.label}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}>
        
        <span className="text-xs uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'JetBrains Mono', monospace" }}>
          Keşfet
        </span>
        <motion.div className="w-5 h-8 border border-white/20 rounded-full flex justify-center pt-1" animate={{ y: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          <div className="w-1 h-2 bg-primary rounded-full" />
        </motion.div>
      </motion.div>
    </section>);

};

export default HeroSection;