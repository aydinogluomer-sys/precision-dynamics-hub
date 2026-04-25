import { useState, useEffect, useRef } from "react";
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
import { ThemeToggle } from "./ThemeToggle";
import { SoundToggle } from "./SoundToggle";
import { LiveClock } from "./LiveClock";

// --- Types & Data (Senin verilerin korundu) ---
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
        path: "/hizmetler/kategori/talasli-imalat",
        icon: <Wrench size={18} />,
        links: [
          { label: "CNC Frezeleme", path: "/hizmetler/cnc-frezeleme" },
          { label: "CNC Tornalama", path: "/hizmetler/cnc-tornalama" },
          { label: "Hassas Mikro İşleme", path: "/hizmetler/hassas-mikro-isleme" },
          { label: "Derin Delik & Raybalama", path: "/hizmetler/derin-delik-raybalama" },
        ],
      },
      {
        label: "Ön Üretim",
        path: "/hizmetler/kategori/on-uretim",
        icon: <Layers size={18} />,
        links: [
          { label: "Enjeksiyon Kalıbı", path: "/hizmetler/enjeksiyon-kalibi" },
          { label: "Basınçlı Döküm", path: "/hizmetler/basinçli-dokum" },
          { label: "Silikon Kalıplama", path: "/hizmetler/silikon-kaliplama" },
          { label: "Fikstür & Aparat Tasarımı", path: "/hizmetler/fikstur-aparat-tasarimi" },
        ],
      },
      {
        label: "Yüzey İşlemleri",
        path: "/hizmetler/kategori/yuzey-islemleri",
        icon: <Sparkles size={18} />,
        links: [
          { label: "Mekanik Yüzey İşlemleri", path: "/hizmetler/mekanik-yuzey-islemleri" },
          { label: "Anodizasyon", path: "/hizmetler/anodizasyon" },
          { label: "Kimyasal İşlemler", path: "/hizmetler/kimyasal-islemler" },
          { label: "Boya & Koruyucu Kaplamalar", path: "/hizmetler/boya-koruyucu-kaplamalar" },
        ],
      },
      {
        label: "İşaretleme & Tanımlama",
        path: "/hizmetler/kategori/isaretleme-tanimlama",
        icon: <Tag size={18} />,
        links: [
          { label: "Lazer Kazıma", path: "/hizmetler/lazer-kazima" },
          { label: "Tavlama", path: "/hizmetler/tavlama" },
          { label: "QR & DataMatrix Kodları", path: "/hizmetler/qr-datamatrix-kodlari" },
          { label: "Logo & Markalama", path: "/hizmetler/logo-markalama" },
        ],
      },
      {
        label: "Montaj & Birleştirme",
        path: "/hizmetler/kategori/montaj-birlestirme",
        icon: <Package size={18} />,
        links: [
          { label: "Insert Uygulama", path: "/hizmetler/insert-uygulama" },
          { label: "Mekanik Montaj", path: "/hizmetler/mekanik-montaj" },
          { label: "Kitting & Paketleme", path: "/hizmetler/kitting-paketleme" },
          { label: "Kaynaklı İmalat", path: "/hizmetler/kaynakli-imalat" },
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
        path: "/kabiliyetler/kategori/uretim-altyapisi",
        icon: <Factory size={18} />,
        links: [
          { label: "Makine Parkuru", path: "/kabiliyetler/makine-parkuru" },
          { label: "Malzeme Kütüphanesi", path: "/malzemeler" },
        ],
      },
      {
        label: "Kalite & Standartlar",
        path: "/kabiliyetler/kategori/kalite-standartlar",
        icon: <Shield size={18} />,
        links: [
          { label: "Kalite Kontrol", path: "/kabiliyetler/kalite-kontrol" },
          { label: "Tolerans & Hassasiyet", path: "/kabiliyetler/tolerans-hassasiyet" },
        ],
      },
      {
        label: "Mühendislik Desteği",
        path: "/kabiliyetler/kategori/muhendislik-destegi",
        icon: <Settings size={18} />,
        links: [
          { label: "Tasarım Rehberi (DFM)", path: "/kabiliyetler/tasarim-rehberi-dfm" },
          { label: "Yüzey İşlemleri", path: "/kabiliyetler/yuzey-islemleri-muhendislik" },
        ],
      },
      {
        label: "Prototipten Seri Üretime",
        path: "/kabiliyetler/kategori/prototipten-seri-uretime",
        icon: <Target size={18} />,
        links: [
          { label: "Düşük Hacimli Üretim", path: "/kabiliyetler/dusuk-hacimli-uretim" },
          { label: "Seri İmalat", path: "/kabiliyetler/seri-imalat" },
        ],
      },
      {
        label: "Süreç & Operasyon",
        path: "/kabiliyetler/kategori/surec-operasyon",
        icon: <Cog size={18} />,
        links: [
          { label: "Proje Yönetimi", path: "/kabiliyetler/proje-yonetimi" },
          { label: "Tedarik Zinciri", path: "/kabiliyetler/tedarik-zinciri" },
          { label: "Operasyonel Verimlilik", path: "/kabiliyetler/operasyonel-verimlilik" },
        ],
      },
    ],
  },
  {
    label: "Endüstriyel",
    path: "/endustriyel/havacilik-uzay",
    hasDropdown: true,
    children: [
      {
        label: "Yüksek Teknoloji",
        path: "/endustriyel/kategori/yuksek-teknoloji",
        icon: <Rocket size={18} />,
        links: [
          { label: "Havacılık & Uzay", path: "/endustriyel/havacilik-uzay" },
          { label: "Savunma Sanayi", path: "/endustriyel/savunma-sanayi" },
          { label: "Robotik", path: "/endustriyel/robotik" },
        ],
      },
      {
        label: "Seri Üretim",
        path: "/endustriyel/kategori/seri-uretim-endustriyel",
        icon: <Car size={18} />,
        links: [
          { label: "Otomotiv", path: "/endustriyel/otomotiv" },
          { label: "Medikal", path: "/endustriyel/medikal" },
          { label: "Yelken & Yat Sistemleri", path: "/endustriyel/yelken-yat-sistemleri" },
        ],
      },
      {
        label: "Endüstriyel Sistemler",
        path: "/endustriyel/kategori/endustriyel-sistemler",
        icon: <Cpu size={18} />,
        links: [
          { label: "Hidrolik & Pnömatik", path: "/endustriyel/hidrolik-pnomatik" },
          { label: "Boru & Bağlantı Parçaları", path: "/endustriyel/boru-baglanti-parcalari" },
          { label: "İklim Teknolojileri", path: "/endustriyel/iklim-teknolojileri" },
        ],
      },
      {
        label: "Üretim Çözümleri",
        path: "/endustriyel/kategori/uretim-cozumleri",
        icon: <Cog size={18} />,
        links: [
          { label: "Prototip Üretim", path: "/endustriyel/prototip-uretim" },
          { label: "Küçük Seri", path: "/endustriyel/kucuk-seri" },
          { label: "Seri Üretim", path: "/endustriyel/seri-uretim" },
          { label: "Özel Projeler", path: "/endustriyel/ozel-projeler" },
        ],
      },
      {
        label: "Enerji & Altyapı",
        path: "/endustriyel/kategori/enerji-altyapi",
        icon: <Zap size={18} />,
        links: [
          { label: "Yenilenebilir Enerji", path: "/endustriyel/yenilenebilir-energy" },
          { label: "Petrol & Gaz", path: "/endustriyel/petrol-gaz" },
          { label: "Güç Dağıtım Sistemleri", path: "/endustriyel/guc-dagitim-sistemleri" },
          { label: "Madencilik Ekipmanları", path: "/endustriyel/madencilik-ekipmanlari" },
        ],
      },
    ],
  },
  { label: "İletişim", path: "/iletisim", hasDropdown: false },
  { label: "SSS", path: "/sss", hasDropdown: false },
  { label: "Blog", path: "/blog", hasDropdown: false, isFire: true },
];

export const Header = ({ isFirstVisit = false }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [mobileAccordion, setMobileAccordion] = useState<number | null>(null);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 24);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
    setMobileAccordion(null);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const handleNavClick = (item: NavItem) => {
    if (item.path.startsWith("#")) {
      if (location.pathname !== "/") {
        navigate("/" + item.path);
      } else {
        const el = document.querySelector(item.path);
        el?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleDropdownEnter = (index: number) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setActiveDropdown(index);
  };
  const handleDropdownLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => setActiveDropdown(null), 120);
  };

  const useDifferenceBlend = location.pathname === "/" && !isScrolled && !isMenuOpen && activeDropdown === null;
  const contrastClass = useDifferenceBlend
    ? "text-primary-foreground [&_.text-muted-foreground]:text-primary-foreground/80"
    : "text-foreground";
  const solidHeader = isScrolled || activeDropdown !== null || isMenuOpen;

  return (
    <>
      <header id="main-header" className="fixed top-0 left-0 right-0 z-50 transition-all duration-500">
        <motion.div
          className="border-b border-border transition-shadow"
          animate={{
            backgroundColor: solidHeader ? "hsl(var(--background) / 0.96)" : "hsl(var(--background) / 0)",
            backdropFilter: solidHeader ? "blur(16px)" : "blur(0px)",
            boxShadow: isScrolled ? "0 4px 30px hsl(var(--foreground) / 0.08)" : "0 0 0 transparent",
          }}
        >
          <div
            className={`container-industrial px-4 mx-auto ${contrastClass}`}
            style={{
              mixBlendMode: useDifferenceBlend ? "difference" : "normal",
            }}
          >
            <div
              className={`flex items-center justify-between transition-all duration-300 ${isScrolled ? "h-14" : "h-20"}`}
            >
              {/* Logo */}
              <Link to="/" className="flex items-center gap-2 shrink-0">
                <div className="bg-primary w-8 h-8 flex items-center justify-center font-bold text-primary-foreground">
                  MT
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-base tracking-tight leading-tight">MAS TECHNIC</span>
                  <span className="text-[10px] text-muted-foreground tracking-widest uppercase">Precision CNC</span>
                </div>
              </Link>

              {/* Desktop Nav */}
              <nav className="hidden lg:flex items-center gap-2">
                {navItems.map((item, index) => (
                  <div
                    key={index}
                    className="relative"
                    onMouseEnter={() => item.hasDropdown && handleDropdownEnter(index)}
                    onMouseLeave={handleDropdownLeave}
                  >
                    <Link
                      to={item.path}
                      className={`nav-link-animated px-3 py-2 text-xs font-semibold ${item.isFire ? "text-primary" : "text-muted-foreground hover:text-primary"}`}
                    >
                      {item.label}
                    </Link>
                    {/* Mega Menu Render (Desktop) */}
                    <AnimatePresence>
                      {item.hasDropdown && activeDropdown === index && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="fixed left-0 right-0 bg-background border-b shadow-xl top-[inherit] mt-4"
                          style={{ mixBlendMode: "normal" }}
                        >
                          <div className="container-industrial mx-auto p-8 grid grid-cols-5 gap-6">
                            {item.children?.map((col, cIdx) => (
                              <div key={cIdx}>
                                <div className="flex items-center gap-2 font-bold text-primary mb-4">
                                  {col.icon} {col.label}
                                </div>
                                <div className="flex flex-col gap-2">
                                  {col.links.map((link, lIdx) => (
                                    <Link
                                      key={lIdx}
                                      to={link.path}
                                      className="nav-link-animated text-sm text-muted-foreground hover:text-primary transition-all"
                                    >
                                      {link.label}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </nav>

              {/* Actions */}
              <div className="hidden lg:flex items-center gap-3">
                {isScrolled && <SoundToggle />}
                {isScrolled && <ThemeToggle />}
                <Link
                  to="/giris"
                  className="text-xs font-bold border border-primary px-4 py-2 hover:bg-primary hover:text-primary-foreground transition-all"
                >
                  Giriş Yap
                </Link>
                <Link to="/teklif-al" className="bg-primary text-primary-foreground text-xs font-bold px-4 py-2">
                  Teklif Al
                </Link>
              </div>

              {/* Mobile Trigger */}
              <button className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? "Kapat" : "Menü"}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Mobile Menu — Fullscreen Takeover */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ clipPath: "inset(0 0 100% 0)" }}
              animate={{ clipPath: "inset(0 0 0% 0)" }}
              exit={{ clipPath: "inset(0 0 100% 0)" }}
              transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
              className="lg:hidden fixed inset-0 z-[9990] flex flex-col justify-center px-8"
              style={{ backgroundColor: "hsl(var(--background) / 0.97)" }}
            >
              <nav className="flex flex-col gap-2">
                {navItems.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + idx * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      to={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className="block py-3 font-bold tracking-tight text-foreground"
                      style={{
                        fontSize: "clamp(32px, 8vw, 64px)",
                        fontFamily: "IBM Plex Mono, monospace",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              {/* Bottom details */}
              <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                <LiveClock />
                <span
                  style={{
                    fontFamily: "IBM Plex Mono, monospace",
                    fontSize: "10px",
                    color: "var(--text-hint)",
                  }}
                >
                  MAS TECHNIC © {new Date().getFullYear()}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

interface HeaderProps {
  isFirstVisit?: boolean;
}
