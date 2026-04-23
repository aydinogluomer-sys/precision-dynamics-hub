import { MessageCircle, ArrowLeft, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { MarqueeBand } from "./MarqueeBand";
import { footerLinks, type FooterLinkGroup } from "./footer/footerLinks";
import { FooterBrand } from "./footer/FooterBrand";
import { FooterBackdrop } from "./footer/FooterBackdrop";
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

type FooterVariant = "reveal" | "static";

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } } };

export const Footer = ({ variant = "static" }: { variant?: FooterVariant } = {}) => {
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

  // Scroll-aware: up-arrow buton, footer alt-bar henüz viewport'a girmemişken görünür.
  // Footer'a yaklaşıldığında gizlenir → mobile'da legal linklerle çakışmaz.
  const [showScrollTop, setShowScrollTop] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      // Görünür: %30 < scroll < (max - 200px footer reserve)
      const reserve = 220;
      setShowScrollTop(max > 0 && scrolled > max * 0.3 && scrolled < max - reserve);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {isReveal && <div data-footer-spacer aria-hidden="true" style={{ height: footerHeight }} />}

      <footer
        ref={footerRef}
        className={`${isReveal ? "footer-reveal fixed bottom-0 left-0" : "relative"} w-full overflow-hidden font-mono`}
        style={{ backgroundColor: "hsl(var(--forge-obsidian))", zIndex: isReveal ? 30 : 0 }}
      >
        <MarqueeBand reverse />
        <FooterBackdrop />

        <div className="relative z-10 container-industrial pt-20 pb-10">
          <FooterNewsletter />

          {/* Mobile: Brand + Accordion */}
          <div className="md:hidden mb-12">
            <FooterBrand centered />
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
              <FooterBrand />
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

        {/* Floating Scroll-to-Top - sol alt, sadece scroll>%50 sonrası */}
        <div
          className={`fixed bottom-6 left-6 z-50 transition-all duration-300 ${
            showScrollTop ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"
          }`}
        >
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
