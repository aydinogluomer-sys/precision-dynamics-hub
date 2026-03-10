import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { TextReveal } from "./ScrollReveal";

const modules = ["Teklif", "Üretim", "Finans", "TPM", "Envanter", "Planlama"];

const stats = [
  { val: "14", label: "Modül" },
  { val: "AI", label: "Asistan" },
  { val: "∞", label: "Entegrasyon" },
];

const descriptionWords = "Teklif yönetimi, üretim takibi, finansal analitik, TPM & bakım, envanter kontrolü ve AI destekli asistan — tek ekrandan.".split(" ");

const NexusPromoSection = () => {
  return (
    <section className="relative overflow-hidden py-16 md:py-24" style={{ background: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 100%)" }}>
      {/* Grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.08) 0%, transparent 60%)",
        }}
      />

      <div className="container-industrial relative z-10 max-w-4xl mx-auto px-6">
        <TextReveal>
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span
                className="text-[10px] tracking-[0.3em] uppercase text-emerald-400"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                NEXUS — Aktif
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-5">
              Endüstriyel Yönetim Paneli
            </h2>
            {/* Word-by-word animated description */}
            <p className="text-sm md:text-base max-w-xl mx-auto leading-relaxed flex flex-wrap justify-center gap-x-1.5 gap-y-0.5">
              {descriptionWords.map((word, i) => (
                <motion.span
                  key={i}
                  className="text-white/70"
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
            className="group block relative overflow-hidden border border-primary/20 hover:border-primary/50 transition-all duration-500 p-6 sm:p-8"
            style={{ background: "rgba(255,255,255,0.08)" }}
          >
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-6 h-6">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-primary/40" />
              <div className="absolute top-0 left-0 h-full w-[1px] bg-primary/40" />
            </div>
            <div className="absolute bottom-0 right-0 w-6 h-6">
              <div className="absolute bottom-0 right-0 w-full h-[1px] bg-primary/40" />
              <div className="absolute bottom-0 right-0 h-full w-[1px] bg-primary/40" />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="text-center py-3 border border-white/15"
                  style={{ background: "rgba(255,255,255,0.1)" }}
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

            {/* Module tags */}
            <div className="flex flex-wrap gap-2 mb-6 justify-center">
              {modules.map((t, i) => (
                <motion.span
                  key={t}
                  className="text-[10px] px-3 py-1 border border-white/20 text-white/70"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.5 + i * 0.06 }}
                >
                  {t}
                </motion.span>
              ))}
            </div>

            {/* CTA */}
            <div className="flex items-center justify-center">
              <span
                className="text-sm text-primary font-semibold group-hover:tracking-wider transition-all duration-300"
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
        <div className="absolute top-0 left-0 w-full h-[1px] bg-primary/20" />
        <div className="absolute top-0 left-0 h-full w-[1px] bg-primary/20" />
      </div>
      <div className="absolute bottom-8 right-8 w-12 h-12 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-full h-[1px] bg-primary/20" />
        <div className="absolute bottom-0 right-0 h-full w-[1px] bg-primary/20" />
      </div>
    </section>
  );
};

export default NexusPromoSection;
