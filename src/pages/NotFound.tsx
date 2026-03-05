import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Search, FileQuestion, HelpCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";

const NotFound = () => {
  const location = useLocation();
  const [countdown, setCountdown] = useState(15);

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          window.location.href = "/";
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const quickLinks = [
    { label: "Ana Sayfa", to: "/", icon: Home },
    { label: "Hizmetlerimiz", to: "/#hizmetler", icon: Search },
    { label: "Teklif Al", to: "/teklif-al", icon: FileQuestion },
    { label: "SSS", to: "/sss", icon: HelpCircle },
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden px-6 pt-20 pb-12">
        {/* Animated background grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(to right, hsl(var(--primary)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--primary)) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Radial glow */}
        <motion.div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, hsl(var(--primary) / 0.08) 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative z-10 text-center max-w-lg">
          {/* Giant 404 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, filter: "blur(20px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative mb-8"
          >
            <span className="text-[140px] sm:text-[180px] font-black leading-none text-primary/[0.07] select-none block">
              404
            </span>
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
            >
              <span className="text-6xl sm:text-7xl font-black text-primary drop-shadow-[0_0_40px_hsl(var(--primary)/0.3)]">
                404
              </span>
            </motion.div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5 }}
          >
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3 text-foreground">
              Sayfa Bulunamadı
            </h1>
            <p className="text-muted-foreground leading-relaxed mb-2">
              Aradığınız sayfa taşınmış, silinmiş veya hiç var olmamış olabilir.
            </p>
            <p className="text-xs text-muted-foreground/50 mb-10">
              <code className="bg-muted px-2 py-1 rounded text-[11px] font-mono">{location.pathname}</code>
              <span className="mx-2">·</span>
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={countdown}
                  initial={{ y: -8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 8, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="inline-block tabular-nums font-semibold text-primary"
                >
                  {countdown}
                </motion.span>
              </AnimatePresence>
              {" "}saniye içinde yönlendirileceksiniz
            </p>
          </motion.div>

          {/* Quick links */}
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {quickLinks.map((link, i) => (
              <motion.div
                key={link.to}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 + i * 0.08 }}
              >
                <Link
                  to={link.to}
                  className="flex flex-col items-center gap-2.5 p-4 rounded-xl border border-border/60 bg-card/50 backdrop-blur-sm hover:border-primary/40 hover:bg-accent/60 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group"
                >
                  <link.icon
                    size={20}
                    className="text-muted-foreground group-hover:text-primary group-hover:scale-110 transition-all duration-300"
                  />
                  <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                    {link.label}
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.4 }}
          >
            <Button asChild size="lg" className="font-semibold uppercase tracking-wider text-sm group">
              <Link to="/">
                Ana Sayfaya Dön
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            className="mt-10 mx-auto max-w-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <div className="h-1 w-full rounded-full bg-muted overflow-hidden">
              <motion.div
                className="h-full bg-primary/60 rounded-full"
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 15, ease: "linear" }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
