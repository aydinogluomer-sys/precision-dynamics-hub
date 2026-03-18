import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { TextReveal } from "./ScrollReveal";
import LogoLoop from "./LogoLoop";
import { useIsMobile } from "@/hooks/use-mobile";
import { TestimonialsColumn } from "./ui/testimonials-columns-1";

const testimonials = [
  {
    text: "Mas Technic ile 5 yıldır çalışıyoruz. Havacılık parçalarımızda hiç kalite sorunu yaşamadık. Tolerans disiplinleri ve zamanında teslimatları ile güvenilir bir iş ortağı.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    name: "Mehmet Yılmaz",
    role: "Satınalma Müdürü — TAI",
  },
  {
    text: "Prototip süreçlerimizde hız ve kalite dengesini mükemmel sağlıyorlar. DFM analizleri sayesinde tasarımlarımızı optimize ettik ve maliyetlerimizi düşürdük.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    name: "Ayşe Kaya",
    role: "Ar-Ge Mühendisi — Ford Otosan",
  },
  {
    text: "Medikal implant üretiminde güvenilirlik kritik. ISO 13485 uyumlu süreçleri ve izlenebilirlik sistemi tam aradığımız standartları karşılıyor.",
    image: "https://randomuser.me/api/portraits/men/52.jpg",
    name: "Dr. Can Öztürk",
    role: "Üretim Direktörü — Medtronic",
  },
  {
    text: "Savunma sanayii projelerimizde hassasiyet ve gizlilik ön planda. Mas Technic bu iki konuda da beklentilerimizi fazlasıyla karşılıyor.",
    image: "https://randomuser.me/api/portraits/men/18.jpg",
    name: "Ali Demir",
    role: "Proje Yöneticisi — ASELSAN",
  },
  {
    text: "Küçük partilerden seri üretime geçişte hiç aksama yaşamadık. Esnek üretim kapasiteleri ve hızlı iletişimleri çok değerli.",
    image: "https://randomuser.me/api/portraits/women/67.jpg",
    name: "Elif Arslan",
    role: "Tedarik Zinciri Uzmanı — Bosch",
  },
  {
    text: "Alüminyum ve paslanmaz çelik işlemede üstün kalite sunuyorlar. Yüzey işlem seçenekleri de oldukça geniş ve profesyonel.",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    name: "Burak Şahin",
    role: "Kalite Müdürü — Arçelik",
  },
  {
    text: "CNC torna ve frezeleme kapasiteleri Türkiye'nin en iyileri arasında. 24/7 üretim imkânı projelerin zamanında teslimini garantiliyor.",
    image: "https://randomuser.me/api/portraits/women/23.jpg",
    name: "Selin Yıldırım",
    role: "Operasyon Müdürü — Vestel",
  },
  {
    text: "Teknik ekipleri her zaman çözüm odaklı yaklaşıyor. Karmaşık geometrilerde bile mükemmel sonuçlar alıyoruz.",
    image: "https://randomuser.me/api/portraits/men/41.jpg",
    name: "Kemal Aydın",
    role: "Mühendislik Müdürü — TUSAŞ",
  },
  {
    text: "Fiyat-performans dengesi mükemmel. Kaliteden ödün vermeden rekabetçi fiyatlar sunuyorlar. Uzun vadeli çözüm ortağımız.",
    image: "https://randomuser.me/api/portraits/women/38.jpg",
    name: "Deniz Koç",
    role: "Genel Müdür — Hidromek",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

const clients = [
  "Emir Alüminyum", "Mert Teknik", "BDM", "Akbaşlar",
  "EMOR", "Batı Isıl İşlem", "Yaka Döküm", "Değer Galvano",
  "Çağdaş Teknik", "C.T.M", "Ege Teknik", "Maktest",
  "Eksen Hassas Döküm", "Era Metalurji", "Xtremex Kimya", "DPM Boya",
  "Ahmet Tezcan", "Ali Galip", "Mikrosan Makina", "Dösan Isıl İşlem",
  "Asil Oltulu", "Akon Hidrolik", "ENTEA", "Amade Metal", "De-Taş",
];

const stats = [
  { value: "1000+", label: "Tamamlanan Proje" },
  { value: "15+", label: "Yıllık Uzmanlık" },
  { value: "24/7", label: "Kesintisiz Üretim" },
  { value: "%100", label: "Zamanında Teslimat" },
];

const TestimonialsSection = () => {
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLElement>(null);

  const logoItems = clients.map((name) => ({
    node: (
      <span
        className="text-lg md:text-xl font-bold tracking-wider select-none whitespace-nowrap"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        {name}
      </span>
    ),
    alt: name,
  }));

  return (
    <section
      ref={sectionRef}
      id="referanslar"
      className="relative overflow-hidden py-20 md:py-28"
      style={{ backgroundColor: "#f0ebe3" }}
    >
      <style>{`.dark #referanslar { background-color: hsl(var(--section-linen)) !important; }`}</style>

      {/* Decorative corner accents */}
      <div className="absolute top-0 left-0 w-24 h-24 border-l-2 border-t-2 pointer-events-none" style={{ borderColor: "rgba(0,113,144,0.1)" }} />
      <div className="absolute bottom-0 right-0 w-24 h-24 border-r-2 border-b-2 pointer-events-none" style={{ borderColor: "rgba(0,113,144,0.1)" }} />

      <div className="container-industrial relative z-10">
        {/* Header */}
        <TextReveal className="text-center mb-10 md:mb-14">
          <div className="inline-flex items-center gap-3 mb-5">
            <div className="w-10 h-px" style={{ backgroundColor: "#007190" }} />
            <span className="text-[10px] font-semibold uppercase tracking-[0.5em] font-mono" style={{ color: "#007190" }}>
              Güvenilir Partnerler
            </span>
            <div className="w-10 h-px" style={{ backgroundColor: "#007190" }} />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5" style={{ color: "#162038" }}>
            Bizi Tercih Edenler
          </h2>
          <p className="text-sm md:text-base max-w-xl mx-auto leading-relaxed" style={{ color: "rgba(22,32,56,0.6)" }}>
            Türkiye'nin önde gelen sanayi kuruluşlarının hassas CNC üretim partneri olarak
            <span className="font-semibold" style={{ color: "#c17f59" }}> 1000+ projeyi </span>
            başarıyla teslim ettik.
          </p>
        </TextReveal>

        {/* Stats Bar */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="relative text-center py-6 md:py-8 px-4 group overflow-hidden border"
              style={{
                backgroundColor: "rgba(255,255,255,0.6)",
                borderColor: "rgba(0,113,144,0.15)",
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="absolute top-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" style={{ backgroundColor: "#c17f59" }} />
              <div
                className="text-2xl md:text-3xl font-bold mb-1.5"
                style={{ fontFamily: "'JetBrains Mono', monospace", color: "#007190" }}
              >
                {stat.value}
              </div>
              <div className="text-[10px] md:text-xs uppercase tracking-[0.15em] font-medium" style={{ color: "rgba(13,28,67,0.4)" }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Logo Marquee */}
        <div className="mb-3">
          <LogoLoop
            logos={logoItems}
            speed={70}
            direction="left"
            logoHeight={36}
            gap={isMobile ? 40 : 72}
            pauseOnHover
            fadeOut
            style={{ height: 44 }}
            renderItem={(item) => (
              <div className="transition-all duration-300 cursor-default hover:scale-110" style={{ color: "rgba(13,28,67,0.15)" }}>
                {item.node}
              </div>
            )}
          />
        </div>
        <div className="w-full h-px mb-3" style={{ backgroundColor: "rgba(0,113,144,0.1)" }} />
        <div className="mb-16 md:mb-20">
          <LogoLoop
            logos={logoItems}
            speed={50}
            direction="right"
            logoHeight={36}
            gap={isMobile ? 40 : 72}
            pauseOnHover
            fadeOut
            style={{ height: 44 }}
            renderItem={(item) => (
              <div className="transition-all duration-300 cursor-default hover:scale-110" style={{ color: "rgba(13,28,67,0.1)" }}>
                {item.node}
              </div>
            )}
          />
        </div>

        {/* Testimonial Columns — vertical infinite scroll */}
        <div className="relative max-w-5xl mx-auto">
          <motion.div
            className="flex justify-center gap-4 md:gap-6 max-h-[600px] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <TestimonialsColumn
              testimonials={firstColumn}
              duration={15}
              className="hidden md:block"
            />
            <TestimonialsColumn
              testimonials={secondColumn}
              duration={19}
            />
            <TestimonialsColumn
              testimonials={thirdColumn}
              duration={17}
              className="hidden md:block"
            />
          </motion.div>

          {/* CTA */}
          <motion.div
            className="text-center mt-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <a
              href="/iletisim"
              className="inline-flex items-center gap-2 text-sm font-semibold hover:gap-3 transition-all duration-300 group"
              style={{ color: "#007190" }}
            >
              Siz de partnerimiz olun
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
