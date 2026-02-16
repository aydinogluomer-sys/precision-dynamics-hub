import { Linkedin, Instagram, Youtube, ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    hizmetler: [
      { label: "CNC Freze", href: "#" },
      { label: "CNC Torna", href: "#" },
      { label: "Talaşlı İmalat", href: "#" },
      { label: "Lazer Kesim", href: "#" },
      { label: "Kalıp & Döküm", href: "#" },
    ],
    sirket: [
      { label: "Hakkımızda", href: "#" },
      { label: "Kabiliyetlerimiz", href: "#" },
      { label: "Kalite", href: "#" },
      { label: "Kariyer", href: "#" },
      { label: "İletişim", href: "#" },
    ],
    kaynaklar: [
      { label: "Blog", href: "#" },
      { label: "Teknik Dökümanlar", href: "#" },
      { label: "SSS", href: "#" },
      { label: "Malzeme Kılavuzu", href: "#" },
    ],
  };

  const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
  };

  return (
    <footer className="relative overflow-hidden" style={{ backgroundColor: "hsl(220 15% 8%)" }}>
      {/* Grid Pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, hsl(var(--primary) / 0.05) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--primary) / 0.05) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Radial Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, hsl(var(--primary) / 0.12) 0%, transparent 70%)",
        }}
      />

      {/* Newsletter Glass Card */}
      <div className="relative z-10 container-industrial pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative overflow-hidden p-8 md:p-12 mb-16"
          style={{
            background: "rgba(15, 23, 42, 0.6)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
          }}
        >
          {/* Top shiny edge */}
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{
              background: "linear-gradient(90deg, transparent, hsl(var(--primary)), transparent)",
            }}
          />

          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                Teknik bültenimize abone olun
              </h3>
              <p className="text-sm" style={{ color: "hsl(210 8% 60%)" }}>
                Endüstriyel üretim trendleri, teknik makaleler ve yeni hizmetlerimizden haberdar olun.
              </p>
            </div>
            <div className="flex w-full md:w-auto gap-0">
              <input
                type="email"
                placeholder="E-posta adresiniz"
                className="flex-1 md:w-72 px-5 py-3.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-1"
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRight: "none",
                }}
              />
              <button
                className="px-6 py-3.5 font-semibold text-sm uppercase tracking-wider flex items-center gap-2 transition-all duration-200 bg-primary text-primary-foreground hover:brightness-110"
              >
                Abone Ol
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 container-industrial pb-10">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16"
        >
          {/* Logo & Description */}
          <motion.div variants={fadeUp} className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">MT</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl tracking-tight text-white">MAS TECHNIC</span>
                <span className="text-xs tracking-widest uppercase" style={{ color: "hsl(210 8% 50%)" }}>
                  Precision CNC
                </span>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-6 max-w-sm" style={{ color: "hsl(210 8% 55%)" }}>
              Yüksek hassasiyetli CNC işleme ve talaşlı imalat çözümleri.
              Havacılık, otomotiv, tıbbi ve robotik sektörlerine hizmet veriyoruz.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-sm" style={{ color: "hsl(210 8% 55%)" }}>
                <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                <span>OSB Mah. 3. Cadde No:42, Kayseri, Türkiye</span>
              </div>
              <div className="flex items-center gap-3 text-sm" style={{ color: "hsl(210 8% 55%)" }}>
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <span>+90 (352) 321 00 00</span>
              </div>
              <div className="flex items-center gap-3 text-sm" style={{ color: "hsl(210 8% 55%)" }}>
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <span>info@mastechnic.com</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              {[Linkedin, Instagram, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 flex items-center justify-center transition-all duration-200 hover:bg-primary hover:text-primary-foreground"
                  style={{
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    color: "hsl(210 8% 55%)",
                  }}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Hizmetler */}
          <motion.div variants={fadeUp}>
            <h4 className="font-semibold mb-5 uppercase tracking-wider text-sm text-white">Hizmetler</h4>
            <ul className="space-y-3">
              {footerLinks.hizmetler.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm hover:text-primary transition-colors duration-200"
                    style={{ color: "hsl(210 8% 50%)" }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Şirket */}
          <motion.div variants={fadeUp}>
            <h4 className="font-semibold mb-5 uppercase tracking-wider text-sm text-white">Şirket</h4>
            <ul className="space-y-3">
              {footerLinks.sirket.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm hover:text-primary transition-colors duration-200"
                    style={{ color: "hsl(210 8% 50%)" }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Kaynaklar */}
          <motion.div variants={fadeUp}>
            <h4 className="font-semibold mb-5 uppercase tracking-wider text-sm text-white">Kaynaklar</h4>
            <ul className="space-y-3">
              {footerLinks.kaynaklar.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm hover:text-primary transition-colors duration-200"
                    style={{ color: "hsl(210 8% 50%)" }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="pt-8" style={{ borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm" style={{ color: "hsl(210 8% 40%)" }}>
              © {currentYear} Mas Technic. Tüm hakları saklıdır.
            </div>
            <div className="flex gap-6 text-sm" style={{ color: "hsl(210 8% 40%)" }}>
              <a href="#" className="hover:text-primary transition-colors">Gizlilik Politikası</a>
              <a href="#" className="hover:text-primary transition-colors">Kullanım Koşulları</a>
              <a href="#" className="hover:text-primary transition-colors">KVKK</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
