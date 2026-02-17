import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ChevronDown,
  Wrench,
  Layers,
  Sparkles,
  Tag,
  Package,
  Factory,
  Shield,
  Cpu,
  Rocket,
  Car,
  Zap,
  Settings,
  Target,
  Cog,
  Flame,
} from "lucide-react";

// ── Mega menu data ──────────────────────────────────────────────

interface MegaLink {
  label: string;
  path: string;
}

interface MegaColumn {
  label: string;
  path: string;
  icon: React.ReactNode;
  links: MegaLink[];
}

interface NavItem {
  label: string;
  path: string;
  hasDropdown: boolean;
  isBold?: boolean;
  isFire?: boolean;
  children?: MegaColumn[];
}

const navItems: NavItem[] = [
  { label: "Ana sayfa", path: "/", hasDropdown: false, isBold: true },
  {
    label: "Hizmetler",
    path: "#hizmetler",
    hasDropdown: true,
    children: [
      {
        label: "Talaşlı İmalat",
        path: "#",
        icon: <Wrench size={18} />,
        links: [
          { label: "CNC Frezeleme", path: "#" },
          { label: "CNC Tornalama", path: "#" },
          { label: "Hassas Mikro İşleme", path: "#" },
          { label: "Derin Delik & Raybalama", path: "#" },
        ],
      },
      {
        label: "Ön Üretim",
        path: "#",
        icon: <Layers size={18} />,
        links: [
          { label: "Enjeksiyon Kalıbı", path: "#" },
          { label: "Basınçlı Döküm", path: "#" },
          { label: "Silikon Kalıplama", path: "#" },
          { label: "Fikstür & Aparat Tasarımı", path: "#" },
        ],
      },
      {
        label: "Yüzey İşlemleri",
        path: "#",
        icon: <Sparkles size={18} />,
        links: [
          { label: "Mekanik Yüzey İşlemleri", path: "#" },
          { label: "Anodizasyon", path: "#" },
          { label: "Kimyasal İşlemler", path: "#" },
          { label: "Boya & Koruyucu Kaplamalar", path: "#" },
        ],
      },
      {
        label: "İşaretleme & Tanımlama",
        path: "#",
        icon: <Tag size={18} />,
        links: [
          { label: "Lazer Kazıma", path: "#" },
          { label: "Tavlama", path: "#" },
          { label: "QR & DataMatrix Kodları", path: "#" },
          { label: "Logo & Markalama", path: "#" },
        ],
      },
      {
        label: "Montaj & Birleştirme",
        path: "#",
        icon: <Package size={18} />,
        links: [
          { label: "Insert Uygulama", path: "#" },
          { label: "Mekanik Montaj", path: "#" },
          { label: "Kitting & Paketleme", path: "#" },
          { label: "Kaynaklı İmalat", path: "#" },
        ],
      },
    ],
  },
  {
    label: "Kabiliyetler",
    path: "#kabiliyetler",
    hasDropdown: true,
    children: [
      {
        label: "Üretim Altyapısı",
        path: "#",
        icon: <Factory size={18} />,
        links: [
          { label: "Makine Parkuru", path: "#" },
          { label: "Malzeme Kütüphanesi", path: "#" },
        ],
      },
      {
        label: "Kalite & Standartlar",
        path: "#",
        icon: <Shield size={18} />,
        links: [
          { label: "Kalite Kontrol", path: "#" },
          { label: "Tolerans & Hassasiyet", path: "#" },
        ],
      },
      {
        label: "Mühendislik Desteği",
        path: "#",
        icon: <Settings size={18} />,
        links: [
          { label: "Tasarım Rehberi (DFM)", path: "#" },
          { label: "Yüzey İşlemleri", path: "#" },
        ],
      },
      {
        label: "Prototipten Seri Üretime",
        path: "#",
        icon: <Target size={18} />,
        links: [
          { label: "Düşük Hacimli Üretim", path: "#" },
          { label: "Seri İmalat", path: "#" },
        ],
      },
      {
        label: "Süreç & Operasyon",
        path: "#",
        icon: <Cog size={18} />,
        links: [
          { label: "Proje Yönetimi", path: "#" },
          { label: "Tedarik Zinciri", path: "#" },
          { label: "Operasyonel Verimlilik", path: "#" },
        ],
      },
    ],
  },
  {
    label: "Endüstriyel",
    path: "#",
    hasDropdown: true,
    children: [
      {
        label: "Yüksek Teknoloji",
        path: "#",
        icon: <Rocket size={18} />,
        links: [
          { label: "Havacılık & Uzay", path: "#" },
          { label: "Savunma Sanayi", path: "#" },
          { label: "Robotik", path: "#" },
        ],
      },
      {
        label: "Seri Üretim",
        path: "#",
        icon: <Car size={18} />,
        links: [
          { label: "Otomotiv", path: "#" },
          { label: "Medikal", path: "#" },
          { label: "Yelken & Yat Sistemleri", path: "#" },
        ],
      },
      {
        label: "Endüstriyel Sistemler",
        path: "#",
        icon: <Cpu size={18} />,
        links: [
          { label: "Hidrolik & Pnömatik", path: "#" },
          { label: "Boru & Bağlantı Parçaları", path: "#" },
          { label: "İklim Teknolojileri", path: "#" },
        ],
      },
      {
        label: "Üretim Çözümleri",
        path: "#",
        icon: <Cog size={18} />,
        links: [
          { label: "Prototip Üretim", path: "#" },
          { label: "Küçük Seri", path: "#" },
          { label: "Seri Üretim", path: "#" },
          { label: "Özel Projeler", path: "#" },
        ],
      },
      {
        label: "Enerji & Altyapı",
        path: "#",
        icon: <Zap size={18} />,
        links: [
          { label: "Yenilenebilir Enerji", path: "#" },
          { label: "Petrol & Gaz", path: "#" },
          { label: "Güç Dağıtım Sistemleri", path: "#" },
          { label: "Madencilik Ekipmanları", path: "#" },
        ],
      },
    ],
  },
  { label: "İletişim", path: "/iletisim", hasDropdown: false },
  { label: "Blog", path: "#", hasDropdown: false, isFire: true },
];

// ── Component ───────────────────────────────────────────────────

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [mobileAccordion, setMobileAccordion] = useState<number | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
    setMobileAccordion(null);
  }, [location]);

  const handleNavClick = (item: NavItem) => {
    if (item.path.startsWith("#") && item.path !== "#") {
      if (location.pathname !== "/") {
        navigate("/" + item.path);
      } else {
        const el = document.querySelector(item.path);
        el?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // ── Desktop mega menu open/close ──
  let hoverTimeout: ReturnType<typeof setTimeout>;

  const handleDropdownEnter = (index: number) => {
    clearTimeout(hoverTimeout);
    setActiveDropdown(index);
  };

  const handleDropdownLeave = () => {
    hoverTimeout = setTimeout(() => setActiveDropdown(null), 120);
  };

  // ── Animations ──
  const megaMenuVariants = {
    hidden: { opacity: 0, y: -8 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2, ease: "easeOut" as const } },
    exit: { opacity: 0, y: -8, transition: { duration: 0.15, ease: "easeIn" as const } },
  };

  const mobileMenuVariants = {
    closed: { height: 0, opacity: 0 },
    open: { height: "auto", opacity: 1, transition: { duration: 0.3, ease: "easeOut" as const } },
    exit: { height: 0, opacity: 0, transition: { duration: 0.2, ease: "easeIn" as const } },
  };

  const mobileItemVariants = {
    closed: { x: -20, opacity: 0 },
    open: (i: number) => ({ x: 0, opacity: 1, transition: { delay: i * 0.04, duration: 0.25 } }),
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <motion.div
        className="border-b border-border transition-shadow"
        animate={{
          backgroundColor: isScrolled ? "hsl(var(--background) / 0.95)" : "hsl(var(--background))",
          backdropFilter: isScrolled ? "blur(12px)" : "blur(0px)",
          boxShadow: isScrolled ? "0 4px 20px hsl(var(--foreground) / 0.08)" : "0 0 0 transparent",
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="container-industrial">
          <motion.div
            className="flex items-center justify-between"
            animate={{ height: isScrolled ? 60 : 70 }}
            transition={{ duration: 0.25 }}
          >
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <motion.div
                className="bg-primary flex items-center justify-center"
                animate={{ width: isScrolled ? 36 : 40, height: isScrolled ? 36 : 40 }}
                transition={{ duration: 0.25 }}
              >
                <span className="text-primary-foreground font-bold text-lg">MT</span>
              </motion.div>
              <div className="flex flex-col">
                <span className="font-bold text-lg tracking-tight leading-tight">MAS TECHNIC</span>
                <span className="text-[10px] text-muted-foreground tracking-widest uppercase leading-tight">
                  Precision CNC
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-0">
              {navItems.map((item, index) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.hasDropdown && handleDropdownEnter(index)}
                  onMouseLeave={handleDropdownLeave}
                >
                  {item.path.startsWith("/") && !item.hasDropdown ? (
                    <Link
                      to={item.path}
                      className={`flex items-center gap-1.5 px-4 py-2 text-[0.8125rem] font-medium transition-colors whitespace-nowrap ${
                        item.isBold
                          ? "font-bold text-primary"
                          : item.isFire
                          ? "font-extrabold animate-fire-text"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {item.isFire && <Flame size={14} className="animate-fire-text" />}
                      {item.label}
                    </Link>
                  ) : (
                    <button
                      onClick={() => !item.hasDropdown && handleNavClick(item)}
                      className={`flex items-center gap-1.5 px-4 py-2 text-[0.8125rem] font-medium transition-colors whitespace-nowrap bg-transparent border-none ${
                        item.isBold
                          ? "font-bold text-primary"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {item.label}
                      {item.hasDropdown && (
                        <motion.span
                          animate={{ rotate: activeDropdown === index ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="flex"
                        >
                          <ChevronDown size={14} />
                        </motion.span>
                      )}
                    </button>
                  )}

                  {/* Desktop Mega Menu */}
                  <AnimatePresence>
                    {item.hasDropdown && activeDropdown === index && item.children && (
                      <motion.div
                        className="fixed left-0 right-0 bg-background border-b border-border shadow-lg z-50"
                        style={{ top: isScrolled ? 60 : 70 }}
                        variants={megaMenuVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onMouseEnter={() => handleDropdownEnter(index)}
                        onMouseLeave={handleDropdownLeave}
                      >
                        <div className="container-industrial py-6">
                          <div className="grid grid-cols-5 gap-6">
                            {item.children.map((col) => (
                              <div key={col.label} className="flex flex-col gap-2">
                                {/* Column title */}
                                <a
                                  href={col.path}
                                  className="flex items-start gap-2 text-primary font-bold text-sm pb-2 border-b-2 border-muted mb-1 min-h-[2.5rem] hover:text-accent transition-colors"
                                >
                                  <span className="mt-0.5 shrink-0">{col.icon}</span>
                                  {col.label}
                                </a>
                                {/* Column links */}
                                <div className="flex flex-col gap-1">
                                  {col.links.map((link) => (
                                    <a
                                      key={link.label}
                                      href={link.path}
                                      className="text-[0.85rem] text-muted-foreground hover:text-primary hover:translate-x-1 transition-all duration-150 py-1 px-2"
                                    >
                                      {link.label}
                                    </a>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden lg:block shrink-0">
              <Link to="/iletisim" className="btn-industrial-primary whitespace-nowrap text-xs px-5 py-2.5">
                Teklif Al
              </Link>
            </div>

            {/* Hamburger */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 hover:bg-muted transition-colors relative w-10 h-10 flex items-center justify-center"
              aria-label="Menü"
            >
              <div className="w-6 h-5 relative flex flex-col justify-between">
                <motion.span
                  className="block h-0.5 w-6 bg-foreground origin-center"
                  animate={isMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.25 }}
                />
                <motion.span
                  className="block h-0.5 w-6 bg-foreground"
                  animate={isMenuOpen ? { opacity: 0, x: -12 } : { opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="block h-0.5 w-6 bg-foreground origin-center"
                  animate={isMenuOpen ? { rotate: -45, y: -10 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.25 }}
                />
              </div>
            </button>
          </motion.div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="lg:hidden border-t border-border overflow-hidden"
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="exit"
            >
              <nav className="container-industrial py-4 flex flex-col gap-1">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.label}
                    variants={mobileItemVariants}
                    custom={i}
                    initial="closed"
                    animate="open"
                    className="border-b border-border last:border-b-0"
                  >
                    {/* Nav item header */}
                    <div className="flex items-center justify-between">
                      {item.path.startsWith("/") && !item.hasDropdown ? (
                        <Link
                          to={item.path}
                          className={`flex-1 text-sm font-semibold uppercase tracking-wider py-3 px-4 transition-colors ${
                            item.isFire
                              ? "animate-fire-text font-extrabold"
                              : item.isBold
                              ? "text-primary font-bold"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item.label}
                        </Link>
                      ) : (
                        <button
                          className={`flex-1 text-left text-sm font-semibold uppercase tracking-wider py-3 px-4 transition-colors bg-transparent border-none ${
                            item.isBold ? "text-primary font-bold" : "text-muted-foreground hover:text-foreground"
                          }`}
                          onClick={() => {
                            if (!item.hasDropdown) {
                              handleNavClick(item);
                              setIsMenuOpen(false);
                            }
                          }}
                        >
                          {item.label}
                        </button>
                      )}

                      {item.hasDropdown && (
                        <button
                          onClick={() => setMobileAccordion(mobileAccordion === i ? null : i)}
                          className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 mr-2 ${
                            mobileAccordion === i
                              ? "bg-primary text-primary-foreground rotate-180"
                              : "bg-muted text-primary"
                          }`}
                          aria-label="Alt menüyü aç"
                        >
                          <ChevronDown size={16} />
                        </button>
                      )}
                    </div>

                    {/* Mobile accordion children */}
                    <AnimatePresence>
                      {item.hasDropdown && mobileAccordion === i && item.children && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="pl-4 pb-4 flex flex-col gap-4">
                            {item.children.map((col) => (
                              <div key={col.label}>
                                <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider mb-2">
                                  {col.icon}
                                  {col.label}
                                </div>
                                <div className="flex flex-col gap-1 pl-6">
                                  {col.links.map((link) => (
                                    <a
                                      key={link.label}
                                      href={link.path}
                                      className="text-sm text-muted-foreground hover:text-primary py-1 transition-colors"
                                      onClick={() => setIsMenuOpen(false)}
                                    >
                                      {link.label}
                                    </a>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}

                {/* Mobile CTA */}
                <motion.div variants={mobileItemVariants} custom={navItems.length} initial="closed" animate="open">
                  <Link
                    to="/iletisim"
                    className="btn-industrial-primary text-center mt-4 block"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Teklif Al
                  </Link>
                </motion.div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  );
};

export default Header;
