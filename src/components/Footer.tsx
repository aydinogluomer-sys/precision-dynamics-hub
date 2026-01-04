import { Linkedin, Instagram, Youtube } from "lucide-react";

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

  return (
    <footer className="bg-foreground text-background">
      {/* Main Footer */}
      <div className="container-industrial py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Logo & Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">MT</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl tracking-tight">MAS TECHNIC</span>
                <span className="text-xs text-muted-foreground tracking-widest uppercase">Precision CNC</span>
              </div>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-sm">
              Yüksek hassasiyetli CNC işleme ve talaşlı imalat çözümleri. 
              Havacılık, otomotiv, tıbbi ve robotik sektörlerine hizmet veriyoruz.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 border border-muted-foreground/30 flex items-center justify-center hover:border-primary hover:text-primary transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 border border-muted-foreground/30 flex items-center justify-center hover:border-primary hover:text-primary transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 border border-muted-foreground/30 flex items-center justify-center hover:border-primary hover:text-primary transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Hizmetler */}
          <div>
            <h4 className="font-semibold mb-4 uppercase tracking-wider text-sm">Hizmetler</h4>
            <ul className="space-y-3">
              {footerLinks.hizmetler.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Şirket */}
          <div>
            <h4 className="font-semibold mb-4 uppercase tracking-wider text-sm">Şirket</h4>
            <ul className="space-y-3">
              {footerLinks.sirket.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Kaynaklar */}
          <div>
            <h4 className="font-semibold mb-4 uppercase tracking-wider text-sm">Kaynaklar</h4>
            <ul className="space-y-3">
              {footerLinks.kaynaklar.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-muted-foreground/20">
        <div className="container-industrial py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">
              © {currentYear} Mas Technic. Tüm hakları saklıdır.
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">
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
