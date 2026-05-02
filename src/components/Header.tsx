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
  Menu,
  X,
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
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 40);
      // Hide header when Hero MAS mask starts growing (scrollY > 200)
      const header = document.getElementById("main-header");
      if (header) {
        const heroHeight = window.innerHeight * 3; // 300vh Hero
        const progress = Math.min(y / heroHeight, 1);
        if (progress > 0.07) {
          header.style.transform = `translateY(-100%)`;
          header.style.opacity = "0";
          header.style.pointerEvents = "none";
        } else {
          header.style.transform = `translateY(0)`;
          header.style.opacity = "1";
          header.style.pointerEvents = "auto";
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
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

  let hoverTimeout: any;
  const handleDropdownEnter = (index: number) => {
    clearTimeout(hoverTimeout);
    setActiveDropdown(index);
  };
  const handleDropdownLeave = () => {
    hoverTimeout = setTimeout(() => setActiveDropdown(null), 120);
  };

  return (
    <>
      <header id="main-header" className="fixed top-0 left-0 right-0 z-50 transition-all duration-500">
        <motion.div
          className="transition-shadow"
          animate={{
            backgroundColor: isScrolled ? "hsl(var(--background) / 0.6)" : "hsl(var(--background) / 0)",
            backdropFilter: isScrolled ? "blur(16px)" : "blur(0px)",
            boxShadow: isScrolled ? "0 4px 30px hsl(var(--foreground) / 0.08)" : "0 0 0 transparent",
          }}
        >
          <div className="container-industrial px-4 mx-auto">
            <div
              className={`flex items-center justify-between transition-all duration-300 ${isScrolled ? "h-14" : "h-20"}`}
            >
              {/* Logo */}
              <Link to="/" className="flex items-center gap-2 shrink-0">
                <div className="bg-primary w-8 h-8 flex items-center justify-center font-bold text-primary-foreground">
                  MT
                </div>
                <div className="flex flex-col pt-1.5">
                   <span className="font-bold text-base tracking-tight leading-tight mt-1 text-[#0a7d8a]">MAS TECHNIC</span>
                   <span className="text-[10px] tracking-widest uppercase text-[#0a7d8a]">Precision CNC</span>
                </div>
              </Link>

              {/* Actions */}
              <div className="hidden lg:flex items-center gap-3">
                <SoundToggle />
                <ThemeToggle />
                <Link
                  to="/giris"
                  className="text-xs font-bold border border-primary px-4 py-2 hover:bg-primary hover:text-white transition-all"
                >
                  Giriş Yap
                </Link>
                <Link to="/teklif-al" className="bg-primary text-white text-xs font-bold px-4 py-2">
                  Teklif Al
                </Link>
                <button
                  aria-label={isMenuOpen ? "Menüyü kapat" : "Menüyü aç"}
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="relative z-[9991] ml-2 inline-flex items-center gap-2 border border-border px-3 py-2 text-xs font-bold uppercase tracking-widest hover:border-primary hover:text-primary transition-all"
                >
                   {isMenuOpen ? <X size={16} /> : <Menu size={16} className="text-[#0a7d8a]" />}
                  <span>{isMenuOpen ? "Kapat" : "Menü"}</span>
                </button>
              </div>

              {/* Mobile Trigger */}
              <button
                aria-label={isMenuOpen ? "Menüyü kapat" : "Menüyü aç"}
                className="lg:hidden relative z-[9991] inline-flex items-center gap-2 border border-border px-3 py-2 text-xs font-bold uppercase tracking-widest"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                 {isMenuOpen ? <X size={16} /> : <Menu size={16} className="text-[#0a7d8a]" />}
                <span>{isMenuOpen ? "Kapat" : "Menü"}</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Fullscreen Menu — Awwwards-style (Desktop + Mobile) */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ clipPath: "inset(0 0 100% 0)" }}
              animate={{ clipPath: "inset(0 0 0% 0)" }}
              exit={{ clipPath: "inset(0 0 100% 0)" }}
              transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
              className="fixed inset-0 z-[9990] overflow-y-auto"
              style={{ backgroundColor: "hsl(var(--background) / 0.98)", backdropFilter: "blur(20px)" }}
            >
              <div className="min-h-screen container-industrial mx-auto px-6 lg:px-12 pt-28 pb-16 grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Primary nav */}
                <nav className="lg:col-span-7 flex flex-col gap-1">
                  {navItems.map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ delay: 0.15 + idx * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      onMouseEnter={() => item.hasDropdown && setActiveDropdown(idx)}
                    >
                      <Link
                        to={item.path}
                        onClick={() => setIsMenuOpen(false)}
                        className={`group flex items-baseline gap-4 py-2 lg:py-3 tracking-tight transition-colors ${item.isFire ? "text-orange-500" : "text-foreground hover:text-primary"}`}
                        style={{
                          fontSize: "clamp(36px, 7vw, 88px)",
                          fontFamily: "IBM Plex Mono, monospace",
                          letterSpacing: "-0.03em",
                          lineHeight: 1,
                        }}
                      >
                        <span className="text-[10px] text-muted-foreground font-mono mt-2 hidden sm:inline">
                          0{idx + 1}
                        </span>
                        <span>{item.label}</span>
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                {/* Sub-links panel */}
                <aside className="lg:col-span-5 lg:border-l lg:border-border lg:pl-10">
                  <AnimatePresence mode="wait">
                    {activeDropdown !== null && navItems[activeDropdown]?.hasDropdown ? (
                      <motion.div
                        key={navItems[activeDropdown].label}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                      >
                        {navItems[activeDropdown].children?.map((col, cIdx) => (
                          <div key={cIdx}>
                            <div className="flex items-center gap-2 text-primary mb-3 text-xs font-bold uppercase tracking-widest">
                              {col.icon}
                              <span>{col.label}</span>
                            </div>
                            <ul className="flex flex-col gap-1.5">
                              {col.links.map((link, lIdx) => (
                                <li key={lIdx}>
                                  <Link
                                    to={link.path}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                  >
                                    {link.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </motion.div>
                    ) : (
                      <motion.div
                        key="meta"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col gap-6 text-xs uppercase tracking-widest text-muted-foreground"
                      >
                        <div>
                          <div className="text-[10px] mb-2 opacity-60">İletişim</div>
                          <a href="mailto:info@mastechnic.com" className="text-foreground hover:text-primary block">
                            info@mastechnic.com
                          </a>
                          <a href="tel:+902121234567" className="text-foreground hover:text-primary block mt-1">
                            +90 212 123 45 67
                          </a>
                        </div>
                        <div>
                          <div className="text-[10px] mb-2 opacity-60">İpucu</div>
                          <p className="text-foreground/70 normal-case tracking-normal text-sm">
                            Bir kategori başlığının üzerine gelerek alt bağlantıları görüntüleyin.
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </aside>

                {/* Bottom details */}
                <div className="lg:col-span-12 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 pt-10 border-t border-border mt-4">
                  <LiveClock />
                  <div className="flex items-center gap-4 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                    <Link to="/giris" onClick={() => setIsMenuOpen(false)} className="hover:text-primary">
                      Giriş Yap
                    </Link>
                    <Link to="/teklif-al" onClick={() => setIsMenuOpen(false)} className="hover:text-primary">
                      Teklif Al
                    </Link>
                    <span>MAS TECHNIC © {new Date().getFullYear()}</span>
                  </div>
                </div>
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
