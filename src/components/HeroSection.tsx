import { useState, useEffect, lazy, Suspense, useCallback, useRef } from "react";
import { ArrowRight, Upload, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import heroBg from "@/assets/hero-cnc.jpg";
import MagneticButton from "./MagneticButton";
import { TextReveal } from "./ScrollReveal";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const CNCModel = lazy(() => import("./CNCModel"));

const headlines = [
  "Profesyonel CNC\nOperasyonları",
  "Yüksek Hassasiyetli\nÜretim",
  "Stabil Kalite &\nGüvenilir Teslimat",
];

const ACCEPTED_EXTENSIONS = [".step", ".stp", ".iges", ".igs", ".dxf", ".sldprt", ".sldasm", ".pdf"];
const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

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

  // CAD Upload state
  const [isDragging, setIsDragging] = useState(false);
  const [uploadState, setUploadState] = useState<"idle" | "uploading" | "success" | "error">("idle");
  const [uploadedFileName, setUploadedFileName] = useState("");
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

  const uploadFile = async (file: File) => {
    const error = validateFile(file);
    if (error) {
      toast.error(error);
      setUploadState("error");
      return;
    }

    setUploadState("uploading");
    setUploadedFileName(file.name);

    const fileName = `${Date.now()}_${file.name}`;
    const { error: uploadError } = await supabase.storage
      .from("cad-uploads")
      .upload(fileName, file);

    if (uploadError) {
      toast.error("Dosya yüklenirken hata oluştu: " + uploadError.message);
      setUploadState("error");
      return;
    }

    // Create RFQ record
    const rfqId = `RFQ-${Date.now()}`;
    const { error: dbError } = await supabase.from("rfqs").insert({
      id: rfqId,
      files: [fileName],
      status: "Yeni",
      date: new Date().toISOString().split("T")[0],
      notes: `CAD dosyası yüklendi: ${file.name}`,
    });

    if (dbError) {
      console.error("RFQ kaydı oluşturulamadı:", dbError);
    }

    setUploadState("success");
    toast.success("Dosya başarıyla yüklendi! En kısa sürede sizinle iletişime geçeceğiz.");

    setTimeout(() => setUploadState("idle"), 4000);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) uploadFile(file);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
    e.target.value = "";
  };

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

      {/* Dark Overlay */}
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
            className="relative p-4 sm:p-8 rounded-2xl"
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

            {/* Rotating Headline */}
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
                className="text-base sm:text-lg leading-relaxed max-w-xl mb-6"
                style={{ color: "rgba(255, 255, 255, 0.7)", fontStyle: "italic" }}
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

            {/* CTA Buttons */}
            <motion.div variants={fadeUpVariants} className="flex flex-col sm:flex-row gap-4">
              <MagneticButton
                href="/iletisim"
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

            {/* Functional CAD File Drop Zone */}
            <motion.div
              variants={fadeUpVariants}
              className={`mt-8 p-4 sm:p-6 border-2 border-dashed transition-all duration-300 cursor-pointer group ${
                isDragging
                  ? "border-primary bg-primary/10"
                  : uploadState === "success"
                  ? "border-green-500/50 bg-green-500/5"
                  : uploadState === "error"
                  ? "border-red-500/50 bg-red-500/5"
                  : "border-white/20 hover:border-primary/60"
              }`}
              onClick={() => uploadState === "idle" && fileInputRef.current?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
            >
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept={ACCEPTED_EXTENSIONS.join(",")}
                onChange={handleFileSelect}
              />
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 border border-white/20 group-hover:border-primary/50 flex items-center justify-center transition-colors shrink-0">
                  {uploadState === "uploading" ? (
                    <Loader2 className="w-5 h-5 text-primary animate-spin" />
                  ) : uploadState === "success" ? (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  ) : uploadState === "error" ? (
                    <AlertCircle className="w-5 h-5 text-red-400" />
                  ) : (
                    <Upload className="w-5 h-5 text-white/50 group-hover:text-primary transition-colors" />
                  )}
                </div>
                <div className="min-w-0">
                  {uploadState === "uploading" ? (
                    <>
                      <p className="text-sm font-medium text-white/80 truncate">Yükleniyor: {uploadedFileName}</p>
                      <p className="text-xs text-white/40">Lütfen bekleyin...</p>
                    </>
                  ) : uploadState === "success" ? (
                    <>
                      <p className="text-sm font-medium text-green-400">Dosya başarıyla yüklendi!</p>
                      <p className="text-xs text-white/40 truncate">{uploadedFileName}</p>
                    </>
                  ) : (
                    <>
                      <p className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                        CAD Dosyanızı Sürükleyin
                      </p>
                      <p className="text-xs text-white/40">
                        STEP, IGES, DXF, SOLIDWORKS — Hızlı teklif için
                      </p>
                    </>
                  )}
                </div>
                {uploadState === "idle" && (
                  <ArrowRight className="w-4 h-4 text-white/30 ml-auto group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
                )}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - 3D CNC Model (hidden on mobile for perf) */}
          <motion.div
            className="relative hidden md:block"
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
