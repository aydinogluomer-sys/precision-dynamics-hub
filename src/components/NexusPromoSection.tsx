import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { TextReveal } from "./ScrollReveal";
import {
  LayoutDashboard, FileText, Package, Factory, FolderArchive,
  ShieldCheck, Receipt, MessageSquare, ArrowRight, Grid3X3, List,
  Cpu, Brain, Sparkles, Lock, ChevronRight
} from "lucide-react";

import moduleDashboard from "@/assets/module-dashboard.jpg";
import moduleQuotes from "@/assets/module-quotes.jpg";
import moduleOrders from "@/assets/module-orders.jpg";
import heroMakineParkuru from "@/assets/hero-makine-parkuru.jpg";
import heroDfm from "@/assets/hero-dfm-tasarim.jpg";
import qualityControl from "@/assets/quality-control.jpg";
import moduleFinance from "@/assets/module-finance.jpg";
import moduleAiSupport from "@/assets/module-ai-support.jpg";

const modules = [
  { label: "Genel Bakış", desc: "Anlık performans metrikleri ve üretim dashboard'u.", icon: LayoutDashboard, img: moduleDashboard, accent: "hsl(var(--primary))" },
  { label: "Tekliflerim", desc: "Hızlı fiyatlandırma ve teklif takip sistemi.", icon: FileText, img: moduleQuotes, accent: "hsl(195, 80%, 50%)" },
  { label: "Siparişlerim", desc: "Sipariş durumları ve teslimat takibi.", icon: Package, img: moduleOrders, accent: "hsl(160, 60%, 45%)" },
  { label: "Üretim Takip", desc: "Canlı üretim hattı izleme ve analiz.", icon: Factory, img: heroMakineParkuru, accent: "hsl(35, 90%, 55%)" },
  { label: "Teknik Arşiv", desc: "CAD dosyaları ve teknik dökümanlar.", icon: FolderArchive, img: heroDfm, accent: "hsl(250, 60%, 60%)" },
  { label: "Kalite Raporları", desc: "Sertifika, test ve denetim raporları.", icon: ShieldCheck, img: qualityControl, accent: "hsl(340, 65%, 55%)" },
  { label: "Ödeme & Faturalar", desc: "E-fatura arşivi ve finansal yönetim.", icon: Receipt, img: moduleFinance, accent: "hsl(45, 85%, 55%)" },
  { label: "Destek AI", desc: "7/24 yapay zeka destekli teknik asistan.", icon: MessageSquare, img: moduleAiSupport, highlight: true, accent: "hsl(var(--primary))" },
];

const stats = [
  { label: "AKTİF KAPASİTE", val: "8 Modül", icon: Cpu },
  { label: "ZEKA TİPİ", val: "Destek AI", sub: "Yapay zeka asistanı aktif", icon: Brain },
  { label: "SİSTEM DURUMU", val: "Tam Entegrasyon", sub: "Çevrimiçi", icon: Sparkles, online: true },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 } as const,
  visible: (i: number) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { delay: 0.08 * i, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
};

const listVariants = {
  hidden: { opacity: 0, x: -30 } as const,
  visible: (i: number) => ({
    opacity: 1, x: 0,
    transition: { delay: 0.05 * i, duration: 0.4, ease: "easeOut" as const },
  }),
};

const NexusPromoSection = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section className="relative overflow-hidden py-16 md:py-24 bg-primary">
      {/* Top gradient transition */}
      <div
        className="absolute top-0 left-0 right-0 h-32 pointer-events-none z-10"
        style={{ background: "linear-gradient(to bottom, hsl(var(--background)), hsl(var(--primary)))" }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <TextReveal>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
            <div>
              <motion.span
                className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary-foreground mb-5 border border-white/20"
                style={{ background: "rgba(255,255,255,0.12)" }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Sparkles className="w-3.5 h-3.5" />
                YENİ NESİL ÜRETİM
              </motion.span>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                <span className="text-white">Endüstriyel </span>
                <span className="text-accent">Yönetim</span>
                <br />
                <span className="text-white/80">Paneli</span>
              </h2>

              <p className="text-sm md:text-base max-w-lg mt-4 leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
                Üretim süreçlerinizi{" "}
                <span className="text-primary-foreground font-semibold">cam saydamlığı</span>{" "}
                ve modern teknoloji ile tek noktadan yönetin.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Link
                to="/musteri-paneli"
                className="group inline-flex items-center gap-2 px-7 py-3.5 bg-white text-foreground font-bold text-sm uppercase tracking-wider hover:bg-white/90 transition-all"
                style={{ transform: "skewX(-4deg)" }}
              >
                <span style={{ transform: "skewX(4deg)" }} className="flex items-center gap-2">
                  Hemen Keşfedin <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </motion.div>
          </div>
        </TextReveal>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              className="relative p-5 border border-border overflow-hidden group cursor-default bg-background"
              whileHover={{ borderColor: "hsl(var(--primary))", y: -2 }}
              transition={{ duration: 0.25 }}
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-[10px] uppercase tracking-[0.15em] font-mono text-muted-foreground">
                  {s.label}
                </span>
                <s.icon className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="text-xl md:text-2xl font-bold text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {s.val}
              </div>
              {s.sub && (
                <div className="flex items-center gap-2 mt-1.5">
                  {s.online && (
                    <motion.span
                      className="w-2 h-2 rounded-full bg-green-500"
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    />
                  )}
                  <span className={`text-xs ${s.online ? "text-green-600" : "text-muted-foreground"}`}>
                    {s.sub}
                  </span>
                  </span>
                </div>
              )}
              {i === 0 && (
                <motion.div
                  className="absolute bottom-0 left-0 h-1 bg-accent"
                  initial={{ width: 0 }}
                  whileInView={{ width: 64 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
                />
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Modules Header */}
        <div className="flex items-center justify-between mb-6">
          <motion.h3
            className="text-lg md:text-xl font-bold"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <span className="text-white">Yönetim </span>
            <span className="text-accent">Modülleri</span>
          </motion.h3>
          <div className="flex items-center border border-white/15 overflow-hidden">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 transition-colors ${viewMode === "grid" ? "bg-white/15 text-white" : "text-white/40 hover:text-white/60"}`}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 transition-colors ${viewMode === "list" ? "bg-white/15 text-white" : "text-white/40 hover:text-white/60"}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Module Cards */}
        <AnimatePresence mode="wait">
          {viewMode === "grid" ? (
            <motion.div
              key="grid"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {modules.map((m, i) => (
                <motion.div
                  key={m.label}
                  className="group relative overflow-hidden border border-border cursor-pointer bg-background"
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={cardVariants}
                  onMouseEnter={() => setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  whileHover={{ y: -6, borderColor: "hsl(var(--primary))" }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Image */}
                  <div className="relative h-36 overflow-hidden">
                    <motion.img
                      src={m.img}
                      alt={m.label}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      animate={hoveredIdx === i ? { scale: 1.08 } : { scale: 1 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                    <div
                      className="absolute inset-0 transition-opacity duration-300"
                      style={{
                        background: `linear-gradient(135deg, ${m.accent}40 0%, rgba(0,0,0,0.4) 100%)`,
                        opacity: hoveredIdx === i ? 0.9 : 0.6,
                      }}
                    />
                    {/* Icon badge */}
                    <motion.div
                      className="absolute bottom-2 left-2 w-9 h-9 flex items-center justify-center"
                      style={{ background: m.accent, boxShadow: `0 4px 12px ${m.accent}50` }}
                      animate={hoveredIdx === i ? { scale: 1.1 } : { scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <m.icon className="w-4 h-4 text-white" />
                    </motion.div>

                    {/* Hover arrow */}
                    <motion.div
                      className="absolute top-2 right-2"
                      initial={{ opacity: 0, x: -5 }}
                      animate={hoveredIdx === i ? { opacity: 1, x: 0 } : { opacity: 0, x: -5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronRight className="w-4 h-4 text-white/80" />
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h4
                      className="font-bold text-sm mb-1"
                      style={{ fontFamily: "'Space Grotesk', sans-serif", color: m.highlight ? m.accent : "hsl(var(--foreground))" }}
                    >
                      {m.label}
                    </h4>
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      {m.desc}
                    </p>
                    {m.highlight && (
                      <div className="flex items-center gap-1.5 mt-3">
                        <motion.span
                          className="w-1.5 h-1.5 rounded-full bg-primary"
                          animate={{ opacity: [1, 0.3, 1] }}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                        />
                        <span className="text-[10px] uppercase tracking-wider text-primary font-bold">
                          AI AKTİF
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Bottom accent line on hover */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-[2px]"
                    style={{ background: m.accent }}
                    initial={{ width: "0%" }}
                    animate={hoveredIdx === i ? { width: "100%" } : { width: "0%" }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="list"
              className="flex flex-col gap-2 mb-14"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {modules.map((m, i) => (
                <motion.div
                  key={m.label}
                  className="group flex items-center gap-4 p-4 border border-border cursor-pointer bg-background"
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={listVariants}
                  whileHover={{ x: 6, borderColor: "hsl(var(--primary))" }}
                  transition={{ duration: 0.25 }}
                >
                  <div
                    className="w-12 h-12 shrink-0 flex items-center justify-center"
                    style={{ background: m.accent, boxShadow: `0 4px 12px ${m.accent}30` }}
                  >
                    <m.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="w-14 h-14 shrink-0 overflow-hidden hidden sm:block">
                    <img src={m.img} alt={m.label} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm" style={{ color: m.highlight ? m.accent : "white", fontFamily: "'Space Grotesk', sans-serif" }}>
                      {m.label}
                    </h4>
                    <p className="text-xs truncate" style={{ color: "rgba(255,255,255,0.5)" }}>{m.desc}</p>
                  </div>
                  {m.highlight && (
                    <div className="flex items-center gap-1.5">
                      <motion.span className="w-1.5 h-1.5 rounded-full bg-primary" animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 1.5 }} />
                      <span className="text-[10px] uppercase tracking-wider text-primary font-bold">AKTİF</span>
                    </div>
                  )}
                  <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-white/70 transition-colors shrink-0" />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Security Bar */}
        <motion.div
          className="relative p-6 border border-white/10 overflow-hidden"
          style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(10px)" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-start gap-3">
              <Lock className="w-5 h-5 mt-0.5 shrink-0" style={{ color: "rgba(255,255,255,0.6)" }} />
              <div>
                <h4 className="font-bold text-sm mb-1">
                  <span className="text-white">Verilerinizi </span>
                  <span className="text-accent">Güvence Altına Alın</span>
                </h4>
                <p className="text-xs max-w-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                  Bulut tabanlı altyapımız ile tüm üretim verileriniz{" "}
                  <span className="text-primary-foreground font-medium">uçtan uca şifrelenir</span>.
                  256-bit SSL koruması ve günlük yedekleme.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <div className="flex -space-x-2">
                {["AD", "MK", "BÇ"].map((initials, i) => (
                  <motion.div
                    key={initials}
                    className="w-8 h-8 flex items-center justify-center text-[10px] font-bold text-white border-2 border-primary"
                    style={{
                      background: i === 0 ? "hsl(var(--primary))" : i === 1 ? "hsl(var(--accent))" : "#0F172A",
                    }}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                  >
                    {initials}
                  </motion.div>
                ))}
              </div>
              <div>
                <div className="text-sm font-bold text-white">+250 Şirket</div>
                <div className="text-[10px]" style={{ color: "rgba(255,255,255,0.5)" }}>Tarafından güveniliyor</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-8 left-8 w-12 h-12 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-white/20" />
        <div className="absolute top-0 left-0 h-full w-[1px] bg-white/20" />
      </div>
      <div className="absolute bottom-8 right-8 w-12 h-12 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-full h-[1px] bg-white/20" />
        <div className="absolute bottom-0 right-0 h-full w-[1px] bg-white/20" />
      </div>
    </section>
  );
};

export default NexusPromoSection;
