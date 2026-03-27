import { useState, useRef, useCallback } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { useNavigate } from "react-router-dom";
import { Upload, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { ElegantShape } from "@/components/ui/ElegantShape";

const ACCEPTED_EXTENSIONS = [".step", ".stp", ".stl", ".obj", ".iges", ".igs", ".3mf"];
const MAX_FILE_SIZE = 50 * 1024 * 1024;

export const QuickQuoteSection = () => {
  const navigate = useNavigate();
  const [isDragging, setIsDragging] = useState(false);
  const [uploadState, setUploadState] = useState<"idle" | "success" | "error">("idle");
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const navigateWithFile = useCallback(
    (file: File) => {
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
    },
    [navigate],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) navigateWithFile(file);
    },
    [navigateWithFile],
  );

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) navigateWithFile(file);
    e.target.value = "";
  };

  const shakeVariants = {
    error: { x: [-8, 8, -4, 4, 0], transition: { duration: 0.4 } },
    idle: { x: 0 },
  };

  return (
    <section
      id="hizli-teklif"
      className="relative section-industrial min-h-screen flex flex-col justify-center overflow-hidden py-24"
      style={{ backgroundColor: "hsl(var(--forge-mist))" }}
    >
      {/* Subtle gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 50%, rgba(0,113,144,0.06) 0%, transparent 60%)",
        }}
      />

      {/* Geometric shape decorations — based on kokonutui/shape-hero */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <ElegantShape
          borderRadius={24}
          className="top-[-10%] left-[-15%]"
          delay={0.3}
          gradient="from-primary/[0.15]"
          height={500}
          rotate={-8}
          width={300}
        />
        <ElegantShape
          borderRadius={20}
          className="right-[-20%] bottom-[-5%]"
          delay={0.5}
          gradient="from-primary/[0.12]"
          height={200}
          rotate={15}
          width={600}
        />
        <ElegantShape
          borderRadius={32}
          className="top-[40%] left-[-5%]"
          delay={0.4}
          gradient="from-white/[0.08]"
          height={300}
          rotate={24}
          width={300}
        />
        <ElegantShape
          borderRadius={12}
          className="top-[5%] right-[10%]"
          delay={0.6}
          gradient="from-primary/[0.1]"
          height={100}
          rotate={-20}
          width={250}
        />
        <ElegantShape
          borderRadius={16}
          className="top-[45%] right-[-10%]"
          delay={0.7}
          gradient="from-white/[0.06]"
          height={150}
          rotate={35}
          width={400}
        />
        <ElegantShape
          borderRadius={28}
          className="bottom-[10%] left-[20%]"
          delay={0.2}
          gradient="from-primary/[0.08]"
          height={200}
          rotate={-25}
          width={200}
        />
        <ElegantShape
          borderRadius={10}
          className="top-[15%] left-[40%]"
          delay={0.8}
          gradient="from-white/[0.05]"
          height={80}
          rotate={45}
          width={150}
        />
        <ElegantShape
          borderRadius={18}
          className="top-[60%] left-[25%]"
          delay={0.9}
          gradient="from-primary/[0.07]"
          height={120}
          rotate={-12}
          width={450}
        />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 md:px-8">
        <div className="w-full">
          {/* Header */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2
              className="text-2xl md:text-3xl font-bold mb-2 font-mono uppercase tracking-[0.3em]"
              style={{ color: "hsl(var(--forge-gunmetal))" }}
            >
              {"CAD DOSYANIZI YÜKLEYİN"}
            </h2>
            <p className="text-sm" style={{ color: "hsl(var(--forge-steel) / 0.6)" }}>{"3D modelinizi sürükleyin, 48 saat içinde detaylı teklif alın."}</p>
          </motion.div>

          {/* Upload Card */}
          <motion.div
            className="relative overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.7)",
              backdropFilter: "blur(20px)",
              border: `1px solid ${isDragging ? "rgba(0,113,144,0.4)" : "rgba(0,113,144,0.18)"}`,
              boxShadow: "0 0 60px rgba(0,113,144,0.08)",
              transition: "border-color 0.3s",
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            variants={shakeVariants}
            animate={uploadState === "error" ? "error" : "idle"}
          >
            {/* Header bar */}
            <div
              className="flex items-center justify-between px-5 py-3 border-b"
              style={{
                borderColor: "rgba(0,113,144,0.12)",
                background: "rgba(0,113,144,0.04)",
              }}
            >
              <span
                className="text-[10px] uppercase tracking-[0.2em] font-mono"
                style={{ color: "hsl(var(--forge-steel) / 0.5)" }}
              >
                {"YÜKLEME ARAYÜZÜ V2.4.0"}
              </span>
              <motion.div
                className="w-2 h-2 rounded-full bg-primary"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
            </div>

            {/* Drop Zone */}
              <div
               className={`relative p-8 md:p-12 cursor-pointer group ${isDragging ? "bg-primary/5" : ""}`}
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
                accept=".step,.stp,.stl,.obj,.iges,.igs,.3mf"
                onChange={handleFileSelect}
              />

              {/* Animated dashed border with pulse on drag */}
              <motion.div
                className="absolute inset-6 md:inset-8 pointer-events-none"
                style={{
                  border: `2px dashed ${isDragging ? "#007190" : "rgba(0,113,144,0.2)"}`,
                  transition: "border-color 0.3s",
                }}
                animate={isDragging ? { scale: [1, 1.02, 1], borderColor: ["#007190", "#0a9bb8", "#007190"] } : {}}
                transition={{ repeat: Infinity, duration: 1.2 }}
              />

              {/* Scanning line */}
              <motion.div
                className="absolute left-6 right-6 md:left-8 md:right-8 h-px pointer-events-none"
                style={{
                  background: "linear-gradient(90deg, transparent, hsl(var(--primary)), transparent)",
                  opacity: 0.4,
                }}
                animate={{ top: ["15%", "85%", "15%"] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              />

              <div className="relative flex flex-col items-center text-center gap-4 py-6">
                <AnimatePresence mode="wait">
                  {uploadState === "success" ? (
                    <motion.div
                      key="check"
                      className="w-14 h-14 rounded-full flex items-center justify-center bg-green-500/20"
                      style={{ border: "1px solid rgba(34,197,94,0.4)" }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <CheckCircle className="w-7 h-7 text-green-400" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="upload"
                     className={`w-14 h-14 rounded-full flex items-center justify-center ${isDragging ? "bg-primary/20" : "bg-primary/5"}`}
                      style={{ border: `1px solid ${isDragging ? "#007190" : "rgba(0,113,144,0.2)"}` }}
                      animate={{
                        y: [0, -6, 0],
                        scale: isDragging ? 1.15 : 1,
                      }}
                      transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                    >
                      <Upload className="w-6 h-6 text-primary" />
                    </motion.div>
                  )}
                </AnimatePresence>

                <div>
                  <p className="text-base font-bold uppercase tracking-wider font-mono mb-1" style={{ color: "hsl(var(--forge-gunmetal))" }}>
                    {"DOSYAYI BURAYA SÜRÜKLE"}
                  </p>
                  <p className="text-xs" style={{ color: "hsl(var(--forge-steel) / 0.5)" }}>{"veya tıklayarak dosya seçin"}</p>
                </div>

                <div className="flex flex-wrap justify-center gap-2">
                  {["STEP", "STL", "OBJ", "IGES", "3MF"].map((fmt) => (
                    <span
                      key={fmt}
                      className="text-[10px] uppercase tracking-wider px-2 py-1 font-mono"
                      style={{
                        color: "hsl(var(--forge-steel) / 0.6)",
                        border: "1px solid rgba(0,113,144,0.15)",
                        background: "rgba(0,113,144,0.05)",
                      }}
                    >
                      {fmt}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer bar */}
            <div
              className="flex items-center justify-between px-5 py-3 border-t"
              style={{
                borderColor: "rgba(0,113,144,0.15)",
                background: "rgba(0,113,144,0.03)",
              }}
            >
              <span
                className="text-[10px] uppercase tracking-[0.15em] font-mono flex items-center gap-2"
                style={{ color: "hsl(var(--forge-steel) / 0.45)" }}
              >
                {"UÇTAN UCA ŞİFRELEME AKTİF"}
                <motion.span
                  className="w-1.5 h-1.5 rounded-full bg-green-400"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                />
              </span>
              <span
                className="text-[10px] uppercase tracking-[0.15em] font-mono"
                style={{ color: "hsl(var(--forge-steel) / 0.45)" }}
              >
                {"100% IP KORUMASI"}
              </span>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-3 mt-4">
            {[
              { value: "±0.005", label: "mm Tolerans" },
              { value: "48h", label: "Teklif Süresi" },
              { value: "50+", label: "Malzeme" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                className="text-center py-3"
                style={{
                  background: "rgba(255,255,255,0.6)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(0,113,144,0.12)",
                }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="text-lg font-bold font-mono" style={{ color: "hsl(var(--forge-molten))" }}>
                  {stat.value}
                </div>
                <div className="text-[9px] uppercase tracking-wider mt-0.5" style={{ color: "rgba(255,255,255,0.5)" }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
