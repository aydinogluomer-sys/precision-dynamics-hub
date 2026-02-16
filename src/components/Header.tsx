import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Hizmetler", href: "#hizmetler" },
    { label: "Kabiliyetler", href: "#kabiliyetler" },
    { label: "Malzemeler", href: "#malzemeler" },
    { label: "Hakkımızda", href: "#neden-biz" },
    { label: "SSS", href: "#sss" },
    { label: "İletişim", href: "#iletisim" },
  ];

  const menuVariants = {
    closed: { height: 0, opacity: 0 },
    open: { height: "auto", opacity: 1, transition: { duration: 0.3, ease: "easeOut" as const } },
    exit: { height: 0, opacity: 0, transition: { duration: 0.2, ease: "easeIn" as const } },
  };

  const itemVariants = {
    closed: { x: -20, opacity: 0 },
    open: (i: number) => ({ x: 0, opacity: 1, transition: { delay: i * 0.06, duration: 0.3 } }),
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">

      {/* Main Navigation */}
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
            animate={{ height: isScrolled ? 64 : 80 }}
            transition={{ duration: 0.25 }}
          >
            {/* Logo */}
            <a href="/" className="flex items-center gap-3">
              <motion.div
                className="bg-primary flex items-center justify-center"
                animate={{ width: isScrolled ? 40 : 48, height: isScrolled ? 40 : 48 }}
                transition={{ duration: 0.25 }}
              >
                <span className="text-primary-foreground font-bold text-xl">MT</span>
              </motion.div>
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

            {/* Animated Hamburger Button */}
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
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="exit"
            >
              <nav className="container-industrial py-4 flex flex-col gap-2">
                {navItems.map((item, i) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    className="text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors uppercase tracking-wider py-3 px-4"
                    variants={itemVariants}
                    custom={i}
                    initial="closed"
                    animate="open"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </motion.a>
                ))}
                <motion.a
                  href="#teklif"
                  className="btn-industrial-primary text-center mt-4"
                  variants={itemVariants}
                  custom={navItems.length}
                  initial="closed"
                  animate="open"
                >
                  Teklif Al
                </motion.a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  );
};

export default Header;
