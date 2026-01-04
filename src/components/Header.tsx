import { Menu, X, Phone, Mail } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: "Hizmetler", href: "#hizmetler" },
    { label: "Kabiliyetler", href: "#kabiliyetler" },
    { label: "Malzemeler", href: "#malzemeler" },
    { label: "Hakkımızda", href: "#neden-biz" },
    { label: "SSS", href: "#sss" },
    { label: "İletişim", href: "#iletisim" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
      {/* Top Bar */}
      <div className="bg-foreground text-background">
        <div className="container-industrial">
          <div className="flex items-center justify-between py-2 text-sm">
            <div className="flex items-center gap-6">
              <a href="tel:+902121234567" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Phone className="w-3 h-3" />
                <span className="text-technical">+90 212 123 45 67</span>
              </a>
              <a href="mailto:info@mastechnic.com" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Mail className="w-3 h-3" />
                <span className="text-technical">info@mastechnic.com</span>
              </a>
            </div>
            <div className="hidden md:flex items-center gap-4 text-technical text-xs">
              <span>ISO 9001:2015</span>
              <span className="text-muted-foreground">|</span>
              <span>AS9100D</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="bg-background">
        <div className="container-industrial">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="/" className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">MT</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl tracking-tight">MAS TECHNIC</span>
                <span className="text-xs text-muted-foreground tracking-widest uppercase">Precision CNC</span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <a href="#teklif" className="btn-industrial-primary">
                Teklif Al
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 hover:bg-muted transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-border">
            <nav className="container-industrial py-4 flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <a href="#teklif" className="btn-industrial-primary text-center mt-4">
                Teklif Al
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
