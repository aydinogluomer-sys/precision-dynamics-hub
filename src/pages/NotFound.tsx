import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Search, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
    { label: "Teklif Al", to: "/teklif-al", icon: ArrowLeft },
    { label: "SSS", to: "/sss", icon: HelpCircle },
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-background px-6 pt-20">
        <div className="text-center max-w-lg">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="relative inline-block mb-6">
              <span className="text-[120px] sm:text-[160px] font-black leading-none text-primary/10 select-none">
                404
              </span>
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <span className="text-5xl sm:text-6xl font-black text-primary">404</span>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
              Sayfa Bulunamadı
            </h1>
            <p className="text-muted-foreground leading-relaxed mb-2">
              Aradığınız sayfa taşınmış, silinmiş veya hiç var olmamış olabilir.
            </p>
            <p className="text-xs text-muted-foreground/60 mb-8">
              <code className="bg-muted px-2 py-1 rounded text-[11px]">{location.pathname}</code>
              {" "}— {countdown} saniye içinde ana sayfaya yönlendirileceksiniz.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.4 }}
          >
            {quickLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border bg-card hover:border-primary/40 hover:bg-accent/50 transition-all group"
              >
                <link.icon size={20} className="text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                  {link.label}
                </span>
              </Link>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Button asChild size="lg" className="font-semibold uppercase tracking-wider text-sm">
              <Link to="/">
                <Home size={16} className="mr-2" />
                Ana Sayfaya Dön
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NotFound;
