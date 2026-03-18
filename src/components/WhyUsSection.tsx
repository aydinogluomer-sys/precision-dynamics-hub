import { Check, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { TextReveal } from "./ScrollReveal";
import cncWorkshop from "@/assets/cnc-workshop.jpg";
import qualityControl from "@/assets/quality-control.jpg";

const advantages = [
  {
    title: "Akıllı Üretim Yönetimi",
    desc: "IoT sensörleri ile gerçek zamanlı makine izleme ve otomatik proses optimizasyonu.",
  },
  {
    title: "Tasarımdan Üretime Entegrasyon",
    desc: "DFM analizi ile tasarım doğrulama, maliyet düşürme ve üretim süresini kısaltma.",
  },
  {
    title: "Hızlı Prototipleme",
    desc: "48 saat içinde prototip üretim ve iteratif tasarım geliştirme desteği.",
  },
  {
    title: "Sürdürülebilir Üretim",
    desc: "ISO 14001 uyumlu çevresel yönetim ve malzeme atık minimizasyonu.",
  },
];

const stats = [
  { value: "45+", label: "CNC Tezgâh" },
  { value: "24/7", label: "Kesintisiz Üretim" },
  { value: "3500+", label: "Tamamlanan Proje" },
  { value: "15+", label: "Yıl Tecrübe" },
];

const WhyUsSection = () => {
  return (
    <section id="neden-biz" className="relative overflow-hidden dark:bg-section-dark" style={{ backgroundColor: "hsl(var(--sw-neutral))" }}>
      <style>{`.dark #neden-biz { background-color: hsl(var(--sw-neutral)) !important; }`}</style>
      {/* Stats Bar */}
      <div className="border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className={`text-center py-8 md:py-10 ${i < 3 ? "border-r border-border/30" : ""}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="text-3xl md:text-4xl font-bold mb-1 font-mono" style={{ color: "#d4a574" }}>
                  {stat.value}
                </div>
                <div className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-medium text-foreground/40">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-primary" />
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary font-mono">
                Avantajlar
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
              Endüstri Liderlerinin<br />
              Mas Technic'i<br />
              Tercih Etme Nedenleri.
            </h2>
            <p className="text-sm leading-relaxed mb-10 max-w-md text-foreground/60">
              Mikron seviyesinde üretim hassasiyetini, uçtan uca dijital izlenebilirlik ve şeffaf süreç yönetimiyle müşterilerimize sunuyoruz.
            </p>

            <div className="space-y-6">
              {advantages.map((adv, i) => (
                <motion.div
                  key={adv.title}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i }}
                >
                  <div className="w-5 h-5 mt-0.5 flex items-center justify-center shrink-0 bg-primary/15">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-foreground mb-0.5">{adv.title}</h4>
                    <p className="text-xs leading-relaxed text-foreground/50">{adv.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Images */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="relative">
              <img
                src={cncWorkshop}
                alt="CNC Üretim Atölyesi"
                className="w-full h-[350px] md:h-[450px] object-cover"
                loading="lazy"
              />
              {/* Overlapping smaller image */}
              <motion.div
                className="absolute -bottom-8 -left-4 md:-left-8 w-40 md:w-52 border-4 border-section-mist dark:border-section-dark shadow-2xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <img
                  src={qualityControl}
                  alt="Kalite Kontrol"
                  className="w-full h-32 md:h-40 object-cover"
                  loading="lazy"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
