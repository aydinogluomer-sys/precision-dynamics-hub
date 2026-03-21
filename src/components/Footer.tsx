import { Linkedin, Instagram, ArrowRight, Mail, MapPin, Phone, MessageCircle, ArrowLeft, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

const footerLinks = [
  {
    title: "Endüstriyel",
    titleHref: null as string | null,
    items: [
      { label: "Yüksek Teknoloji", href: "/endustriyel/kategori/yuksek-teknoloji" },
      { label: "Seri Üretim", href: "/endustriyel/kategori/seri-uretim" },
      { label: "Endüstriyel Sistemler", href: "/endustriyel/kategori/endustriyel-sistemler" },
      { label: "Üretim Çözümleri", href: "/endustriyel/kategori/uretim-cozumleri" },
      { label: "Enerji & Altyapı", href: "/endustriyel/kategori/enerji-altyapi" },
    ],
  },
  {
    title: "Kabiliyetler",
    titleHref: null as string | null,
    items: [
      { label: "Üretim Altyapısı", href: "/kabiliyetler/kategori/uretim-altyapisi" },
      { label: "Kalite & Standartlar", href: "/kabiliyetler/kategori/kalite-standartlar" },
      { label: "Mühendislik Desteği", href: "/kabiliyetler/kategori/muhendislik-destegi" },
      { label: "Prototipten Seri Üretime", href: "/kabiliyetler/kategori/prototipten-seri-uretime" },
      { label: "Süreç & Operasyon", href: "/kabiliyetler/kategori/surec-operasyon" },
    ],
  },
  {
    title: "Hizmetler",
    titleHref: null as string | null,
    items: [
      { label: "Talaşlı İmalat", href: "/hizmetler/kategori/talasli-imalat" },
      { label: "Ön Üretim", href: "/hizmetler/kategori/on-uretim" },
      { label: "Yüzey İşlemleri", href: "/hizmetler/kategori/yuzey-islemleri" },
      { label: "İşaretleme & Tanımlama", href: "/hizmetler/kategori/isaretleme-tanimlama" },
      { label: "Montaj & Birleştirme", href: "/hizmetler/kategori/montaj-birlestirme" },
    ],
  },
  {
    title: "Kurumsal & Destek",
    titleHref: null as string | null,
    items: [
      { label: "Ana Sayfa", href: "/" },
      { label: "Hakkımızda", href: "/hakkimizda" },
      { label: "Teklif & Üretim Süreci", href: "/#nasil-calisiyoruz" },
      { label: "Kapasite", href: "/#kabiliyetler" },
      { label: "Sevkiyat Standartları", href: "/#kabiliyetler" },
      { label: "Kalite Güvencesi", href: "/#sertifikalar" },
      { label: "SSS", href: "/sss" },
      { label: "İletişim", href: "/iletisim" },
    ],
  },
];

const FooterAccordion = ({ group }: { group: typeof footerLinks[number] }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/10">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-center"
      >
        <h4 className="font-semibold uppercase tracking-wider text-xs text-white flex-1 text-center">{group.title}</h4>
        <ChevronDown className={`w-4 h-4 text-white/50 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-96 pb-4" : "max-h-0"}`}>
        <ul className="space-y-2.5 text-center">
          {group.items.map((l) => (
            <li key={l.label}>
              <Link to={l.href} className="text-xs hover:text-primary transition-colors duration-200" style={{ color: "hsl(210 8% 48%)" }}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
  };

  return (
    <footer className="relative overflow-hidden font-mono" style={{ backgroundColor: "hsl(var(--forge-obsidian))" }}>
      {/* Grid Pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0, 113, 144, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 113, 144, 0.05) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Radial Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, rgba(0, 113, 144, 0.12) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 container-industrial pt-20 pb-10">
        {/* Newsletter Glass Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative overflow-hidden rounded-2xl p-8 md:p-12 mb-16"
          style={{
            background: "rgba(22, 32, 56, 0.4)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
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
              <span
                className="text-xs font-bold uppercase tracking-[0.2em] mb-3 block"
                style={{ color: "hsl(var(--primary))" }}
              >
                E-Bülten
              </span>
              <p className="text-sm leading-relaxed max-w-md mx-auto md:mx-0" style={{ color: "hsl(210 8% 60%)" }}>
                Sektörel yenilikler, teknik analizler ve daha fazlası... Son gelişmelerden haberdar olmak için bültenimize abone olun.
              </p>
            </div>
            <div className="w-full md:w-auto">
              <form onSubmit={(e) => e.preventDefault()} className="flex gap-0">
                <div className="relative flex-1 md:w-72">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "hsl(210 8% 40%)" }} />
                  <input
                    type="email"
                    placeholder="E-posta adresiniz"
                    className="w-full pl-11 pr-4 py-3.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-primary rounded-l-lg"
                    style={{
                      background: "rgba(255, 255, 255, 0.05)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRight: "none",
                    }}
                  />
                </div>
                <button className="px-6 py-3.5 font-bold text-xs uppercase tracking-widest flex items-center gap-2 transition-all duration-200 bg-primary text-primary-foreground hover:brightness-110 rounded-r-lg whitespace-nowrap">
                  ABONE OL
                </button>
              </form>
              <p className="text-[11px] mt-2" style={{ color: "hsl(210 8% 35%)" }}>
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

        {/* Mobile: Accordion links */}
        <div className="md:hidden mb-12">
          {/* Brand */}
          <div className="mb-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="w-10 h-10 bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">MT</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-base tracking-tight text-white">MAS TECHNIC</span>
                <span className="text-[10px] tracking-[0.15em] uppercase" style={{ color: "hsl(210 8% 45%)" }}>
                  Precision CNC
                </span>
              </div>
            </div>
            <p className="text-xs leading-relaxed mb-5 max-w-xs mx-auto" style={{ color: "hsl(210 8% 50%)" }}>
              CNC Freze, Torna ve Talaşlı İmalatta; ölçü hassasiyeti, yüksek doğruluk ve proses kontrollü üretim anlayışıyla hizmet veriyoruz.
            </p>
            <div className="flex flex-col items-center gap-2.5 mb-5">
              {[
                { icon: Phone, text: "+90 (536) 564 51 94" },
                { icon: Mail, text: "info@mastechnic.com" },
                { icon: MapPin, text: "İzmir, Türkiye" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2.5 text-xs" style={{ color: "hsl(210 8% 50%)" }}>
                  <Icon className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-2">
              {[
                { icon: Linkedin, label: "in" },
                { icon: null, label: "X" },
                { icon: Instagram, label: null },
              ].map((item, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-8 h-8 flex items-center justify-center text-xs font-semibold transition-all duration-200 hover:bg-primary hover:text-primary-foreground"
                  style={{ border: "1px solid rgba(255, 255, 255, 0.1)", color: "hsl(210 8% 50%)" }}
                >
                  {item.label ? item.label : item.icon && <item.icon className="w-3.5 h-3.5" />}
                </a>
              ))}
            </div>
          </div>

          {/* Accordion groups */}
          {footerLinks.map((group) => (
            <FooterAccordion key={group.title} group={group} />
          ))}
        </div>

        {/* Desktop: Grid links */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="hidden md:grid md:grid-cols-3 lg:grid-cols-5 gap-8 sm:gap-10 mb-16"
        >
          {/* Brand & Contact */}
          <motion.div variants={fadeUp} className="md:col-span-3 lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">MT</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-base tracking-tight text-white">MAS TECHNIC</span>
                <span className="text-[10px] tracking-[0.15em] uppercase" style={{ color: "hsl(210 8% 45%)" }}>
                  Precision CNC
                </span>
              </div>
            </div>
            <p className="text-xs leading-relaxed mb-5 max-w-xs" style={{ color: "hsl(210 8% 50%)" }}>
              CNC Freze, Torna ve Talaşlı İmalatta; ölçü hassasiyeti, yüksek doğruluk ve proses kontrollü üretim anlayışıyla hizmet veriyoruz.
            </p>
            <div className="space-y-2.5 mb-5">
              {[
                { icon: Phone, text: "+90 (536) 564 51 94" },
                { icon: Mail, text: "info@mastechnic.com" },
                { icon: MapPin, text: "İzmir, Türkiye" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2.5 text-xs" style={{ color: "hsl(210 8% 50%)" }}>
                  <Icon className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              {[
                { icon: Linkedin, label: "in" },
                { icon: null, label: "X" },
                { icon: Instagram, label: null },
              ].map((item, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-8 h-8 flex items-center justify-center text-xs font-semibold transition-all duration-200 hover:bg-primary hover:text-primary-foreground"
                  style={{ border: "1px solid rgba(255, 255, 255, 0.1)", color: "hsl(210 8% 50%)" }}
                >
                  {item.label ? item.label : item.icon && <item.icon className="w-3.5 h-3.5" />}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Link groups */}
          {footerLinks.map((group) => (
            <motion.div key={group.title} variants={fadeUp}>
              <h4 className="font-semibold mb-4 uppercase tracking-wider text-xs text-white">{group.title}</h4>
              <ul className="space-y-2.5">
                {group.items.map((l) => (
                  <li key={l.label}>
                    <Link to={l.href} className="text-xs hover:text-primary transition-colors duration-200" style={{ color: "hsl(210 8% 48%)" }}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Glass Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative overflow-hidden rounded-2xl p-8 md:p-12 mb-12"
          style={{
            background: "rgba(22, 32, 56, 0.4)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
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

          <div className="relative text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Projenizi Hayata Geçirmeye{" "}
              <br className="hidden md:block" />
              <span className="text-primary">Hazır mısınız?</span>
            </h3>
            <p className="text-sm max-w-xl mx-auto mb-8" style={{ color: "hsl(210 8% 55%)" }}>
              Uzman mühendislik ekibimiz ve yüksek teknolojili üretim altyapımızla projelerinizi en yüksek kalitede gerçeğe dönüştürüyoruz.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <a
                href="/teklif-al"
                className="px-8 py-3.5 bg-primary text-primary-foreground font-semibold text-sm uppercase tracking-wider inline-flex items-center justify-center gap-2 hover:brightness-110 transition-all"
              >
                Hemen Teklif Al
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="/iletisim"
                className="px-8 py-3.5 font-semibold text-sm uppercase tracking-wider inline-flex items-center justify-center text-white transition-all hover:bg-white/5"
                style={{ border: "1px solid rgba(255, 255, 255, 0.15)" }}
              >
                Bize Ulaşın
              </a>
            </div>
          </div>

          <div className="absolute bottom-4 right-4 grid grid-cols-3 gap-1 opacity-20">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="w-1 h-1 rounded-full bg-primary" />
            ))}
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="pt-6" style={{ borderTop: "1px solid rgba(255, 255, 255, 0.06)" }}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <div className="text-xs" style={{ color: "hsl(210 8% 35%)" }}>
              © {currentYear} MAS TECHNIC. Tüm hakları saklıdır.
            </div>
            <div className="flex gap-5 text-xs" style={{ color: "hsl(210 8% 35%)" }}>
              <Link to="/gizlilik-politikasi" className="hover:text-primary transition-colors">Gizlilik Politikası</Link>
              <Link to="/kvkk" className="hover:text-primary transition-colors">KVKK Aydınlatma Metni</Link>
              <Link to="/cerez-politikasi" className="hover:text-primary transition-colors">Çerez Politikası</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Scroll-to-Top Button - Left */}
      <div className="fixed bottom-6 left-6 z-50">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="w-12 h-12 bg-card border border-border rounded-full flex items-center justify-center shadow-lg transition-all text-foreground hover:shadow-xl hover:border-primary"
          aria-label="Yukarı çık"
        >
          <ArrowLeft className="w-5 h-5 rotate-90" />
        </button>
      </div>

      {/* Floating Chat Button - Right */}
      <div className="fixed bottom-6 right-6 z-50">
        <a
          href="#"
          className="w-14 h-14 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg hover:brightness-110 transition-all"
        >
          <MessageCircle className="w-6 h-6" />
        </a>
      </div>
    </footer>
  );
};
