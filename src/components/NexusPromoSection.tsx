import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { TextReveal } from "./ScrollReveal";
import {
  LayoutDashboard, FileText, Package, Factory, FolderArchive,
  ShieldCheck, Receipt, MessageSquare, ArrowRight, Grid3X3, List,
  Cpu, Brain, Sparkles, Lock
} from "lucide-react";

import cncWorkshop from "@/assets/cnc-workshop.jpg";
import serviceImalat from "@/assets/service-imalat.jpg";
import heroSeriUretim from "@/assets/hero-seri-uretim.jpg";
import heroMakineParkuru from "@/assets/hero-makine-parkuru.jpg";
import heroDfm from "@/assets/hero-dfm-tasarim.jpg";
import qualityControl from "@/assets/quality-control.jpg";
import heroTedarik from "@/assets/hero-tedarik-zinciri.jpg";
import heroProje from "@/assets/hero-proje-yonetimi.jpg";

const modules = [
  { label: "Genel Bakış", desc: "Anlık durum izleme ve performans metrikleri.", icon: LayoutDashboard, img: cncWorkshop },
  { label: "Tekliflerim", desc: "Hızlı fiyatlandırma ve güncel teklif yönetimi.", icon: FileText, img: serviceImalat },
  { label: "Siparişlerim", desc: "Sipariş durumları ve teslimat çizelgesi.", icon: Package, img: heroSeriUretim },
  { label: "Üretim Takip", desc: "Canlı üretim hattı izleme ve veri analizi.", icon: Factory, img: heroMakineParkuru },
  { label: "Teknik Arşiv", desc: "Tüm proje dosyaları ve CAD dökümanları.", icon: FolderArchive, img: heroDfm },
  { label: "Kalite Raporları", desc: "Sertifika, test ve denetim raporları.", icon: ShieldCheck, img: qualityControl },
  { label: "Ödeme & Faturalar", desc: "Finansal yönetim ve e-fatura arşivi.", icon: Receipt, img: heroTedarik },
  { label: "Destek AI", desc: "Yapay zeka asistanı ile 7/24 teknik destek.", icon: MessageSquare, img: heroProje, highlight: true },
];

const stats = [
  { label: "AKTİF KAPASİTE", val: "8 Modül", icon: Cpu, color: "primary" },
  { label: "ZEKA TİPİ", val: "Destek AI", sub: "Yapay zeka asistanı aktif", icon: Brain, color: "primary" },
  { label: "SİSTEM DURUMU", val: "Tam Entegrasyon", sub: "Çevrimiçi", icon: Sparkles, color: "primary", online: true },
];

const NexusPromoSection = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <section className="relative overflow-hidden py-16 md:py-24 bg-primary">
      {/* Top gradient transition from hero */}
      <div
        className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, hsl(var(--background)), hsl(var(--primary)))",
        }}
      />

      <div className="container-industrial relative z-10 max-w-6xl mx-auto px-6">
        {/* Header Area */}
        <TextReveal>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
            <div>
              <motion.span
                className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary-foreground mb-5"
                style={{
                  background: "rgba(255,255,255,0.15)",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Sparkles className="w-3.5 h-3.5" />
                YENİ NESİL ÜRETİM
              </motion.span>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                Endüstriyel{" "}
                <span className="text-white/60">Yönetim</span>
                <br />
                Paneli
              </h2>

              <p className="text-sm md:text-base text-white/70 max-w-lg mt-4 leading-relaxed">
                Üretim süreçlerinizi cam saydamlığı ve modern teknoloji ile tek noktadan yönetin. İş akışınızı optimize edin, verimliliğinizi %40 artırın.
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

        {/* Stats Cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="relative p-5 border border-white/15 overflow-hidden group"
              style={{ background: "rgba(255,255,255,0.07)", backdropFilter: "blur(10px)" }}
            >
              <div className="flex items-start justify-between mb-3">
                <span
                  className="text-[10px] uppercase tracking-[0.15em] font-mono text-white/50"
                >
                  {s.label}
                </span>
                <s.icon className="w-5 h-5 text-white/40" />
              </div>
              <div className="text-xl md:text-2xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {s.val}
              </div>
              {s.sub && (
                <div className="flex items-center gap-2 mt-1.5">
                  {s.online && (
                    <motion.span
                      className="w-2 h-2 rounded-full bg-green-400"
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    />
                  )}
                  <span className={`text-xs ${s.online ? "text-green-400" : "text-white/50"}`}>
                    {s.sub}
                  </span>
                </div>
              )}
              {/* Bottom accent line */}
              {i === 0 && (
                <div className="absolute bottom-0 left-0 w-16 h-1 bg-primary" style={{ filter: "brightness(1.5)" }} />
              )}
            </div>
          ))}
        </motion.div>

        {/* Modules Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg md:text-xl font-bold text-white">
            Yönetim Modülleri
          </h3>
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

        {/* Module Cards - Grid View */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
            {modules.map((m, i) => (
              <motion.div
                key={m.label}
                className={`group relative overflow-hidden border transition-all duration-300 hover:border-white/30 ${
                  m.highlight
                    ? "border-primary/50 bg-primary/20"
                    : "border-white/10"
                }`}
                style={!m.highlight ? { background: "rgba(255,255,255,0.05)" } : {}}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 * i, duration: 0.4 }}
              >
                {/* Image */}
                <div className="relative h-36 overflow-hidden">
                  <img
                    src={m.img}
                    alt={m.label}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0" style={{ background: m.highlight ? "rgba(6,136,172,0.3)" : "rgba(0,0,0,0.2)" }} />
                  <div className="absolute bottom-2 left-2 w-8 h-8 flex items-center justify-center" style={{ background: m.highlight ? "hsl(var(--primary))" : "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}>
                    <m.icon className="w-4 h-4 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h4 className={`font-bold text-sm mb-1 ${m.highlight ? "text-primary" : "text-white"}`} style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {m.label}
                  </h4>
                  <p className="text-xs text-white/50 leading-relaxed">
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
              </motion.div>
            ))}
          </div>
        ) : (
          /* List View */
          <div className="flex flex-col gap-2 mb-14">
            {modules.map((m, i) => (
              <motion.div
                key={m.label}
                className={`group flex items-center gap-4 p-4 border transition-all duration-300 hover:border-white/30 ${
                  m.highlight ? "border-primary/50 bg-primary/20" : "border-white/10"
                }`}
                style={!m.highlight ? { background: "rgba(255,255,255,0.05)" } : {}}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.03 * i }}
              >
                <div className="w-12 h-12 shrink-0 flex items-center justify-center" style={{ background: m.highlight ? "hsl(var(--primary))" : "rgba(255,255,255,0.1)" }}>
                  <m.icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className={`font-bold text-sm ${m.highlight ? "text-primary" : "text-white"}`}>
                    {m.label}
                  </h4>
                  <p className="text-xs text-white/50 truncate">{m.desc}</p>
                </div>
                {m.highlight && (
                  <div className="flex items-center gap-1.5">
                    <motion.span className="w-1.5 h-1.5 rounded-full bg-primary" animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 1.5 }} />
                    <span className="text-[10px] uppercase tracking-wider text-primary font-bold">AKTİF</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {/* Bottom Trust/Security Bar */}
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
              <Lock className="w-5 h-5 text-white/60 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white text-sm mb-1">
                  Verilerinizi Güvence Altına Alın
                </h4>
                <p className="text-xs text-white/50 max-w-lg leading-relaxed">
                  Bulut tabanlı altyapımız ile tüm üretim verileriniz uçtan uca şifrelenir. 256-bit SSL koruması ve günlük yedekleme ile işiniz her zaman güvende.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <div className="flex -space-x-2">
                {["AD", "MK", "BÇ"].map((initials, i) => (
                  <div
                    key={initials}
                    className="w-8 h-8 flex items-center justify-center text-[10px] font-bold text-white border-2 border-primary"
                    style={{
                      background: i === 0 ? "hsl(var(--primary))" : i === 1 ? "hsl(var(--accent))" : "#0F172A",
                    }}
                  >
                    {initials}
                  </div>
                ))}
              </div>
              <div>
                <div className="text-sm font-bold text-white">+250 Şirket</div>
                <div className="text-[10px] text-white/50">Tarafından güveniliyor</div>
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
