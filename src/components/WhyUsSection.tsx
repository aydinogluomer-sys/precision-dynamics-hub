import { Target, RefreshCw, Clock, Wrench, Check, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import qualityControl from "@/assets/quality-control.jpg";

const values = [
  {
    icon: Target,
    title: "Hassasiyet & Tolerans Disiplini",
    subtitle: "±0.01mm",
    description: "±0.01mm hassasiyetle çalışan CNC tezgahlarımız ve CMM ölçüm sistemimiz ile tolerans garantisi sağlıyoruz.",
  },
  {
    icon: RefreshCw,
    title: "Proses Kontrollü Üretim",
    subtitle: "100% İzlenebilirlik",
    description: "Her üretim adımı izlenir, kaydedilir ve raporlanır. Tekrarlanabilir kalite için sistematik yaklaşım.",
  },
  {
    icon: Clock,
    title: "Zamanında Teslimat",
    subtitle: "98% Oran",
    description: "Söz verilen tarihte teslimat. Proje planınızı aksatmayacak güvenilir lojistik süreçleri.",
  },
  {
    icon: Wrench,
    title: "Mühendislik Desteği",
    subtitle: "24h Yanıt",
    description: "DFM analizi, malzeme seçimi ve tasarım optimizasyonu konularında uzman mühendislik desteği.",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const WhyUsSection = () => {
  return (
    <section id="neden-biz" className="section-industrial bg-secondary">
      <div className="container-industrial">
        {/* Hero Banner with Image */}
        <motion.div
          className="relative overflow-hidden mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative h-64 md:h-80 overflow-hidden">
            <img
              src={qualityControl}
              alt="Quality control and precision measurement"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to right, hsl(220 15% 12%) 0%, hsl(220 15% 12% / 0.85) 40%, hsl(220 15% 12% / 0.4) 100%)" }}
            />
            <div className="absolute inset-0 flex items-center">
              <div className="p-8 md:p-12 max-w-xl">
                <span className="text-xs font-semibold uppercase tracking-[0.4em] mb-3 block text-primary">
                  Avantajlar
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Neden Mas Technic?</h2>
                <p className="text-lg" style={{ color: "rgba(255, 255, 255, 0.7)" }}>
                  Hassasiyet, güvenilirlik ve mühendislik mükemmelliği ile fark yaratıyoruz
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {values.map((value) => (
            <motion.div
              key={value.title}
              variants={cardVariants}
              className="relative bg-background border border-border p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-primary group"
            >
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center text-primary">
                <value.icon className="w-12 h-12" />
              </div>

              <h4 className="font-bold text-lg mb-1">{value.title}</h4>
              <span className="text-sm font-semibold text-primary block mb-4">{value.subtitle}</span>
              <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom badges */}
        <div className="flex flex-wrap justify-center items-center gap-6 pt-8 border-t border-border">
          {["ISO 9001:2015 Sertifikalı", "24 Saat Teknik Destek", "Ücretsiz DFM Analizi", "Zamanında Teslimat Garantisi"].map(
            (badge, i) => (
              <span key={badge} className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                <Check className="w-4 h-4 text-primary flex-shrink-0" />
                {badge}
                {i < 3 && <span className="ml-4 text-border">·</span>}
              </span>
            )
          )}
        </div>

        {/* CTA */}
        <div className="flex items-center justify-center gap-8 mt-10 pt-10 border-t border-border">
          <span className="text-lg font-medium">Projeleriniz için doğru partner</span>
          <a href="#teklif" className="btn-industrial-primary inline-flex items-center gap-2">
            Teklif Al
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
