import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { TextReveal } from "./ScrollReveal";
import {
  LayoutDashboard, FileText, Package, Factory, FolderArchive,
  ShieldCheck, Receipt, MessageSquare, ArrowRight, Grid3X3, List,
  Cpu, Brain, Sparkles, ChevronRight, Settings, MessageCircle
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
  { label: "Genel Bakış", desc: "Üretim hattındaki tüm makinelerin anlık durumlarını ve verimlilik grafiklerini inceleyin.", icon: LayoutDashboard, img: moduleDashboard, accent: "hsl(var(--primary))" },
  { label: "Tekliflerim", desc: "Bekleyen tekliflerinizi görüntüleyin, revize edin veya yeni projeler için fiyatlandırma talep edin.", icon: FileText, img: moduleQuotes, accent: "hsl(195, 80%, 50%)" },
  { label: "Siparişlerim", desc: "Onaylanmış tüm siparişlerinizin hazırlık, üretim ve sevkiyat aşamalarını adım adım takip edin.", icon: Package, img: moduleOrders, accent: "hsl(160, 60%, 45%)" },
  { label: "Üretim Takip", desc: "Parçaların işleme istasyonlarındaki gerçek zamanlı ilerlemesini ve tahmini bitiş sürelerini görün.", icon: Factory, img: heroMakineParkuru, accent: "hsl(35, 90%, 55%)" },
  { label: "Teknik Çizimler", desc: "CAD/CAM dosyalarınızı güvenle yükleyin ve versiyon kontrolü ile tüm revizyonları yönetin.", icon: FolderArchive, img: heroDfm, accent: "hsl(250, 60%, 60%)" },
  { label: "Kalite Raporları", desc: "Üretilen her parça için CMM ölçüm sonuçlarına ve kalite sertifikalarına anında erişin.", icon: ShieldCheck, img: qualityControl, accent: "hsl(340, 65%, 55%)" },
  { label: "Finans ve Faturalar", desc: "Cari hesap özetlerinizi takip edin, e-faturalarınızı indirin ve ödeme durumlarını kontrol edin.", icon: Receipt, img: moduleFinance, accent: "hsl(45, 85%, 55%)" },
  { label: "Destek AI", desc: "7/24 yapay zeka destekli teknik asistan ile sorularınıza anında yanıt alın.", icon: MessageSquare, img: moduleAiSupport, highlight: true, accent: "hsl(var(--primary))" },
];

const stats = [
  { label: "AKTİF MODÜLLER", val: "8 Modül", sub: "Tümü aktif ve senkronize", icon: Cpu },
  { label: "DESTEK TALEBİ", val: "Destek AI", sub: "Hızlı çözüm merkezi 7/24", icon: Brain },
  { label: "VERİ AKIŞI", val: "Tam Entegrasyon", sub: "Çevrimiçi", icon: Sparkles, online: true },
];

const NexusPromoSection = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <section className="relative py-16 md:py-24 bg-background">
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <TextReveal>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
            <div>
              <h2
                className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-foreground"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Endüstriyel Yönetim Paneli
              </h2>
              <p className="text-sm md:text-base max-w-xl mt-4 leading-relaxed text-foreground/60">
                Üretim süreçlerinizi, tekliflerinizi ve sipariş durumlarınızı tek bir noktadan, gerçek zamanlı verilerle takip edin. Hassas mühendislik için optimize edilmiş dijital yönetim arayüzü.
              </p>
            </div>

            <motion.div
              className="flex items-center gap-3 shrink-0"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Link
                to="/musteri-paneli"
                className="group inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground font-semibold text-sm transition-all hover:border-primary"
                style={{ transform: "skewX(-4deg)" }}
              >
                <span style={{ transform: "skewX(4deg)" }} className="flex items-center gap-2">
                  Rapor İndir
                </span>
              </Link>
              <Link
                to="/teklif-al"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold text-sm transition-all hover:bg-primary/90"
                style={{ transform: "skewX(-4deg)" }}
              >
                <span style={{ transform: "skewX(4deg)" }} className="flex items-center gap-2">
                  Yeni Talep Oluştur
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
          {stats.map((s) => (
            <motion.div
              key={s.label}
              className="relative p-5 border border-border overflow-hidden group cursor-default bg-card"
              whileHover={{ borderColor: "hsl(var(--primary))", y: -2 }}
              transition={{ duration: 0.25 }}
            >
              <div className="flex items-start justify-between mb-2">
                <span className="text-[10px] uppercase tracking-[0.15em] font-mono text-primary">
                  {s.label}
                </span>
                <s.icon className="w-5 h-5 text-muted-foreground" />
              </div>
              <div
                className="text-xl md:text-2xl font-bold text-foreground"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
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
                  <span className={`text-xs ${s.online ? "text-green-600" : "text-foreground/50"}`}>
                    {s.sub}
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Modules Header */}
        <div className="flex items-center justify-between mb-6 border-b border-border pb-4">
          <motion.h3
            className="text-lg md:text-xl font-bold text-foreground"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Modüller
          </motion.h3>
          <div className="flex items-center border border-border overflow-hidden">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 transition-colors ${viewMode === "grid" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"}`}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 transition-colors ${viewMode === "list" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"}`}
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
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {modules.map((m, i) => (
                <motion.div
                  key={m.label}
                  className="group relative overflow-hidden border border-border cursor-pointer bg-card"
                  custom={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.06 * i, duration: 0.4 }}
                  whileHover={{ y: -4, borderColor: "hsl(var(--primary))" }}
                >
                  {/* Image */}
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={m.img}
                      alt={m.label}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    {m.highlight && (
                      <div className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                    )}
                    {i === 0 && (
                      <div className="absolute bottom-3 left-3 px-2 py-0.5 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wider">
                        AKTİF
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h4
                      className="font-bold text-sm mb-2 text-foreground"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {m.label}
                    </h4>
                    <p className="text-xs leading-relaxed text-foreground/60 mb-4 line-clamp-3">
                      {m.desc}
                    </p>
                    <div className="flex items-center gap-1 text-xs font-semibold text-primary group-hover:gap-2 transition-all">
                      İncele <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
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
                  className="group flex items-center gap-4 p-4 border border-border cursor-pointer bg-card"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.04 * i, duration: 0.3 }}
                  whileHover={{ x: 4, borderColor: "hsl(var(--primary))" }}
                >
                  <div className="w-10 h-10 shrink-0 flex items-center justify-center bg-primary/10">
                    <m.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="w-14 h-14 shrink-0 overflow-hidden hidden sm:block">
                    <img src={m.img} alt={m.label} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4
                      className="font-bold text-sm text-foreground"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {m.label}
                    </h4>
                    <p className="text-xs truncate text-foreground/60">{m.desc}</p>
                  </div>
                  {m.highlight && (
                    <div className="flex items-center gap-1.5">
                      <motion.span
                        className="w-1.5 h-1.5 rounded-full bg-primary"
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                      />
                      <span className="text-[10px] uppercase tracking-wider text-primary font-bold">AKTİF</span>
                    </div>
                  )}
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom CTA Bar */}
        <motion.div
          className="relative p-6 md:p-8 border border-border overflow-hidden bg-primary/5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h4
                className="font-bold text-lg mb-1 text-foreground"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Yönetim Panelini Özelleştirin
              </h4>
              <p className="text-sm text-foreground/60 max-w-lg">
                Hangi modüllerin ana sayfanızda görüneceğini ve bildirim ayarlarınızı kullanıcı profilinizden yönetebilirsiniz.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Link
                to="/musteri-paneli"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-border text-foreground font-semibold text-sm transition-all hover:border-primary"
                style={{ transform: "skewX(-4deg)" }}
              >
                <span style={{ transform: "skewX(4deg)" }} className="flex items-center gap-2">
                  <Settings className="w-4 h-4" /> Ayarları Düzenle
                </span>
              </Link>
              <Link
                to="/iletisim"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground font-semibold text-sm transition-all hover:bg-primary/90"
                style={{ transform: "skewX(-4deg)" }}
              >
                <span style={{ transform: "skewX(4deg)" }} className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" /> Geri Bildirim Yap
                </span>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NexusPromoSection;
