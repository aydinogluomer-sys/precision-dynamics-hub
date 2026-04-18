import { Linkedin, Instagram, Mail, MapPin, Phone, MessageCircle, ArrowLeft, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { MarqueeBand } from "./MarqueeBand";
import { footerLinks, type FooterLinkGroup } from "./footer/footerLinks";
import { FooterNewsletter } from "./footer/FooterNewsletter";
import { FooterCTA } from "./footer/FooterCTA";
import { FooterBottomBar } from "./footer/FooterBottomBar";

const FooterAccordion = ({ group }: { group: FooterLinkGroup }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b" style={{ borderColor: "var(--surface-border)" }}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-4 text-center">
        <h4 className="font-semibold uppercase tracking-wider text-xs flex-1 text-center" style={{ color: "var(--text-primary)" }}>
          {group.title}
        </h4>
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`} style={{ color: "var(--text-technical)" }} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-96 pb-4" : "max-h-0"}`}>
        <ul className="space-y-2.5 text-center">
          {group.items.map((l) => (
            <li key={l.label}>
              <Link to={l.href} className="text-xs hover:text-primary transition-colors duration-200" style={{ color: "var(--text-technical)" }}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const BrandBlock = ({ centered = false }: { centered?: boolean }) => {
  const align = centered ? "items-center text-center" : "";
  const justify = centered ? "justify-center" : "";
  return (
    <div className={centered ? "mb-8 text-center" : ""}>
      <div className={`flex items-center gap-3 mb-5 ${justify}`}>
        <div className="w-10 h-10 bg-primary flex items-center justify-center">
          <span className="text-primary-foreground font-bold text-lg">MT</span>
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-base tracking-tight" style={{ color: "var(--text-primary)" }}>MAS TECHNIC</span>
          <span className="text-[10px] tracking-[0.15em] uppercase" style={{ color: "var(--text-technical)" }}>Precision CNC</span>
        </div>
      </div>
      <p className={`text-xs leading-relaxed mb-5 max-w-xs ${centered ? "mx-auto" : ""}`} style={{ color: "var(--text-secondary)" }}>
        CNC Freze, Torna ve Talaşlı İmalatta; ölçü hassasiyeti, yüksek doğruluk ve proses kontrollü üretim anlayışıyla hizmet veriyoruz.
      </p>
      <div className={`${centered ? "flex flex-col items-center" : "space-y-2.5"} gap-2.5 mb-5`}>
        {[
          { icon: Phone, text: "+90 (536) 564 51 94" },
          { icon: Mail, text: "info@mastechnic.com" },
          { icon: MapPin, text: "İzmir, Türkiye" },
        ].map(({ icon: Icon, text }) => (
          <div key={text} className="flex items-center gap-2.5 text-xs" style={{ color: "var(--text-secondary)" }}>
            <Icon className="w-3.5 h-3.5 text-primary flex-shrink-0" />
            <span>{text}</span>
          </div>
        ))}
      </div>
      <div className={`flex gap-2 ${justify}`}>
        {[{ icon: Linkedin, label: "in" }, { icon: null, label: "X" }, { icon: Instagram, label: null }].map((item, i) => (
          <a
            key={i}
            href="#"
            className="w-8 h-8 flex items-center justify-center text-xs font-semibold transition-all duration-200 hover:bg-primary hover:text-primary-foreground"
            style={{ border: "1px solid var(--surface-border)", color: "var(--text-secondary)" }}
          >
            {item.label ? item.label : item.icon && <item.icon className="w-3.5 h-3.5" />}
          </a>
        ))}
      </div>
    </div>
  );
};

type FooterVariant = "reveal" | "static";

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } } };

export const Footer = ({ variant = "reveal" }: { variant?: FooterVariant } = {}) => {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef<HTMLElement>(null);
  const [footerHeight, setFooterHeight] = useState(0);

  // RC-1: scrollHeight (taşan içerik dahil) · RC-3: ResizeObserver + fonts.ready
  useEffect(() => {
    if (variant !== "reveal") return;
    const el = footerRef.current;
    if (!el) return;

    let lastH = 0;
    const updateHeight = () => {
      requestAnimationFrame(() => {
        if (!footerRef.current) return;
        const h = footerRef.current.scrollHeight;
        if (h === lastH) return;
        lastH = h;
        setFooterHeight(h);
        document.documentElement.style.setProperty("--footer-height", h + "px");
      });
    };

    updateHeight();
    const ro = new ResizeObserver(updateHeight);
    ro.observe(el);
    if (typeof document !== "undefined" && "fonts" in document) {
      document.fonts.ready.then(updateHeight);
    }
    return () => ro.disconnect();
  }, [variant]);

  const isReveal = variant === "reveal";

  return (
    <>
      {isReveal && <div data-footer-spacer aria-hidden="true" style={{ height: footerHeight }} />}

      <footer
        ref={footerRef}
        className={`${isReveal ? "footer-reveal fixed bottom-0 left-0" : "relative"} w-full overflow-hidden font-mono`}
        style={{ backgroundColor: "hsl(var(--forge-obsidian))", zIndex: isReveal ? 30 : 0 }}
      >
        <MarqueeBand reverse />

        {/* RC-9: watermark mobil clip */}
        <div className="pointer-events-none select-none overflow-hidden relative w-full max-w-full" style={{ zIndex: 0 }} aria-hidden="true">
          <div
            style={{
              fontSize: "clamp(40px, 12vw, 160px)",
              fontFamily: "IBM Plex Mono, monospace",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: "var(--text-vignette)",
              lineHeight: 1,
              whiteSpace: "nowrap",
              padding: "20px 0",
              textAlign: "center",
            }}
          >
            MAS TECHNIC
          </div>
        </div>

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgb(var(--precision-steel-rgb) / 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgb(var(--precision-steel-rgb) / 0.05) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(circle at center, rgb(var(--precision-steel-rgb) / 0.12) 0%, transparent 70%)" }}
        />

        <div className="relative z-10 container-industrial pt-20 pb-10">
          <FooterNewsletter />

          {/* Mobile: Brand + Accordion */}
          <div className="md:hidden mb-12">
            <BrandBlock centered />
            {footerLinks.map((group) => (
              <FooterAccordion key={group.title} group={group} />
            ))}
          </div>

          {/* Desktop: Brand + 4 link kolonu */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="hidden md:grid md:grid-cols-3 lg:grid-cols-5 gap-8 sm:gap-10 mb-16"
          >
            <motion.div variants={fadeUp} className="md:col-span-3 lg:col-span-1">
              <BrandBlock />
            </motion.div>
            {footerLinks.map((group) => (
              <motion.div key={group.title} variants={fadeUp}>
                <h4 className="font-semibold mb-4 uppercase tracking-wider text-xs" style={{ color: "var(--text-primary)" }}>
                  {group.title}
                </h4>
                <ul className="space-y-2.5">
                  {group.items.map((l) => (
                    <li key={l.label}>
                      <Link to={l.href} className="text-xs hover:text-primary transition-colors duration-200" style={{ color: "var(--text-technical)" }}>
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>

          <FooterCTA />
          <FooterBottomBar currentYear={currentYear} />
        </div>

        {/* Floating Scroll-to-Top - sol alt */}
        <div className="fixed bottom-6 left-6 z-50">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="w-12 h-12 bg-card border border-border rounded-full flex items-center justify-center shadow-lg transition-all text-foreground hover:shadow-xl hover:border-primary"
            aria-label="Yukarı çık"
          >
            <ArrowLeft className="w-5 h-5 rotate-90" />
          </button>
        </div>

        {/* Floating Chat - sağ alt (FooterBottomBar lg:pr-20 ile rezerve eder) */}
        <div className="fixed bottom-6 right-6 z-50">
          <a
            href="#"
            className="w-14 h-14 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg hover:brightness-110 transition-all"
            aria-label="Sohbet"
          >
            <MessageCircle className="w-6 h-6" />
          </a>
        </div>
      </footer>
    </>
  );
};
