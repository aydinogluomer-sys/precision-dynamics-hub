import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { TextReveal } from "./ScrollReveal";
import {
  LayoutDashboard, FileText, Package, Factory, FolderArchive,
  ShieldCheck, Receipt, MessageSquare
} from "lucide-react";

const modules = [
  { label: "Genel Bakış", icon: LayoutDashboard },
  { label: "Tekliflerim", icon: FileText },
  { label: "Siparişlerim", icon: Package },
  { label: "Üretim Takip", icon: Factory },
  { label: "Teknik Arşiv", icon: FolderArchive },
  { label: "Kalite Raporları", icon: ShieldCheck },
  { label: "Ödeme & Faturalar", icon: Receipt },
  { label: "Destek (AI)", icon: MessageSquare },
];

const stats = [
  { val: "8", label: "Modül" },
  { val: "AI", label: "Asistan" },
  { val: "∞", label: "Entegrasyon" },
];

const descriptionWords = "Teklif yönetimi, üretim takibi, kalite kontrol, teknik arşiv, ödeme & fatura ve AI destekli destek — tek ekrandan yönetin.".split(" ");

const NexusPromoSection = () => {
  return (
    <section className="relative overflow-hidden py-16 md:py-24 bg-primary">
      {/* Top gradient transition from hero */}
      <div
        className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, hsl(var(--background)), hsl(var(--primary)))",
        }}
      />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.06) 0%, transparent 60%)",
        }}
      />

      <div className="container-industrial relative z-10 max-w-4xl mx-auto px-6">
        <TextReveal>
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-5">
              Endüstriyel Yönetim Paneli
            </h2>
            {/* Word-by-word animated description */}
            <p className="text-sm md:text-base max-w-xl mx-auto leading-relaxed flex flex-wrap justify-center gap-x-1.5 gap-y-0.5">
              {descriptionWords.map((word, i) => (
                <motion.span
                  key={i}
                  className="text-white/80"
                  initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: 0.1 + i * 0.04,
                    ease: "easeOut",
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </p>
          </div>
        </TextReveal>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Link
            to="/admin/login"
            className="group block relative overflow-hidden border border-white/15 hover:border-white/30 transition-all duration-500 p-6 sm:p-8"
            style={{ background: "#0F172A" }}
          >
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-6 h-6">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-white/40" />
              <div className="absolute top-0 left-0 h-full w-[1px] bg-white/40" />
            </div>
            <div className="absolute bottom-0 right-0 w-6 h-6">
              <div className="absolute bottom-0 right-0 w-full h-[1px] bg-white/40" />
              <div className="absolute bottom-0 right-0 h-full w-[1px] bg-white/40" />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="text-center py-3 border border-white/15"
                  style={{ background: "rgba(255,255,255,0.05)" }}
                >
                  <div
                    className="text-xl font-bold text-primary"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {s.val}
                  </div>
                  <div className="text-[10px] text-white/40 uppercase tracking-wider">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Module tags with icons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
              {modules.map((m, i) => (
                <motion.div
                  key={m.label}
                  className="flex items-center gap-2 px-3 py-2 border border-white/10 text-white/70 hover:text-white hover:border-white/25 transition-colors"
                  style={{ background: "rgba(255,255,255,0.03)" }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.5 + i * 0.06 }}
                >
                  <m.icon className="w-3.5 h-3.5 shrink-0 text-primary" />
                  <span
                    className="text-[10px] font-medium truncate"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {m.label}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex items-center justify-center">
              <span
                className="text-sm text-white font-semibold group-hover:tracking-wider transition-all duration-300"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                Panele Giriş →
              </span>
            </div>
          </Link>
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
