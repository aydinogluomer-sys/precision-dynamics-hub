import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const equipment = [
  { category: "CNC Frezeleme", model: "DMG MORI 5-Eksen", size: "1200 × 800 × 600", tolerance: "±0.005 mm", speed: "24,000 RPM" },
  { category: "CNC Torna", model: "Doosan Puma 400", size: "Ø 400 × 1000L", tolerance: "±0.01 mm", speed: "4,500 RPM" },
  { category: "Taşlama", model: "Studer S33", size: "Ø 350 × 1000L", tolerance: "±0.002 mm", speed: "—" },
  { category: "Tel Erozyon", model: "Sodick ALC600G", size: "600 × 400 × 350", tolerance: "±0.005 mm", speed: "—" },
  { category: "CMM Ölçüm", model: "Zeiss Contura", size: "900 × 1200 × 800", tolerance: "±0.001 mm", speed: "—" },
];

const CapabilitiesSection = () => {
  return (
    <section id="kabiliyetler" className="py-16 md:py-24 px-4 dark:bg-section-dark border-t border-border" style={{ backgroundColor: "#f8ed43" }}>
      <style>{`.dark #kabiliyetler { background-color: hsl(var(--section-warm)) !important; }`}</style>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-px bg-primary" />
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary font-mono">
                Teknik Yetkinlik
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Makine Parkuru
            </h2>
          </div>
          <Link
            to="/iletisim"
            className="text-sm font-medium text-primary hover:text-primary/80 flex items-center gap-1.5 transition-colors whitespace-nowrap"
          >
            Teknik Kapasiteyi İncele <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Table */}
        <motion.div
          className="border border-border overflow-x-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          {/* Table Header */}
          <div className="grid grid-cols-5 gap-4 px-5 py-3 border-b border-border min-w-[640px]" style={{ backgroundColor: "rgba(180,205,194,0.2)" }}>
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-foreground/50">Kategori</span>
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-foreground/50">Ekipman</span>
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-foreground/50">Boyut</span>
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-foreground/50">Tolerans</span>
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-foreground/50">Hız</span>
          </div>

          {/* Table Rows */}
          {equipment.map((eq, i) => (
            <motion.div
              key={eq.category}
              className="grid grid-cols-5 gap-4 px-5 py-4 border-b border-border last:border-0 hover:bg-muted/10 transition-colors min-w-[640px]"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 * i }}
            >
              <span className="text-sm font-semibold text-foreground">{eq.category}</span>
              <span className="text-sm text-foreground/70">{eq.model}</span>
              <span className="text-sm text-foreground/60 font-mono">{eq.size}</span>
              <span className="text-sm text-primary font-semibold font-mono">{eq.tolerance}</span>
              <span className="text-sm text-foreground/60 font-mono">{eq.speed}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CapabilitiesSection;
