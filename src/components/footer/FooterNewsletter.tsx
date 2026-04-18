import { Mail } from "lucide-react";
import { motion } from "framer-motion";

export const FooterNewsletter = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative overflow-hidden rounded-2xl p-8 md:p-12 mb-16"
      style={{
        background: "var(--precision-glow-subtle)",
        backdropFilter: "blur(10px)",
        border: "1px solid var(--surface-border)",
        boxShadow: "0 8px 32px 0 var(--overlay-vignette-light)",
      }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, hsl(var(--primary)), transparent)" }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(135deg, transparent 40%, hsl(var(--primary) / 0.04) 50%, transparent 60%)",
        }}
      />

      <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex-1 text-center md:text-left">
          <span className="text-xs font-bold uppercase tracking-[0.2em] mb-3 block" style={{ color: "hsl(var(--primary))" }}>
            E-Bülten
          </span>
          <p className="text-sm leading-relaxed max-w-md mx-auto md:mx-0" style={{ color: "var(--text-secondary)" }}>
            Sektörel yenilikler, teknik analizler ve daha fazlası... Son gelişmelerden haberdar olmak için bültenimize abone olun.
          </p>
        </div>
        {/* RC-9: min-w-0 + w-full ile mobil overflow guard */}
        <div className="w-full md:w-auto min-w-0">
          <form onSubmit={(e) => e.preventDefault()} className="flex gap-0 w-full">
            <div className="relative flex-1 min-w-0 md:w-72">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--text-muted)" }} />
              <input
                type="email"
                placeholder="E-posta adresiniz"
                className="w-full min-w-0 pl-11 pr-4 py-3.5 text-sm placeholder:opacity-30 focus:outline-none focus:ring-1 focus:ring-primary rounded-l-lg"
                style={{
                  background: "var(--surface-glass)",
                  border: "1px solid var(--surface-border)",
                  borderRight: "none",
                  color: "var(--text-primary)",
                }}
              />
            </div>
            <button className="px-4 sm:px-6 py-3.5 font-bold text-xs uppercase tracking-widest flex items-center gap-2 transition-all duration-200 bg-primary text-primary-foreground hover:brightness-110 rounded-r-lg whitespace-nowrap shrink-0">
              ABONE OL
            </button>
          </form>
          <p className="text-[11px] mt-2" style={{ color: "var(--text-hint)" }}>
            * Verileriniz KVKK kapsamında korunmaktadır.
          </p>
        </div>
      </div>

      <div className="absolute bottom-4 right-4 grid grid-cols-3 gap-1 opacity-20">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="w-1 h-1 rounded-full bg-primary" />
        ))}
      </div>
    </motion.div>
  );
};
