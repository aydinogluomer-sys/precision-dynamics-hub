import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Link } from "react-router-dom";

const STORAGE_KEY = "mas-cookie-consent";

export const CookieBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setVisible(false);
  };

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, "dismissed");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-sm z-[9999] border border-border bg-background/95 p-4"
          style={{ backdropFilter: "blur(12px)" }}
          role="dialog"
          aria-label="Çerez bildirimi"
        >
          <button
            onClick={dismiss}
            aria-label="Kapat"
            className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X size={14} />
          </button>
          <p className="text-xs text-muted-foreground leading-relaxed pr-4">
            Bu site deneyiminizi iyileştirmek için çerez kullanmaktadır.{" "}
            <Link
              to="/cerez-politikasi"
              className="underline hover:text-primary transition-colors"
            >
              Çerez Politikası
            </Link>
          </p>
          <div className="flex gap-2 mt-3">
            <button
              onClick={accept}
              className="flex-1 text-[11px] font-bold uppercase tracking-widest py-2 px-3 text-white transition-colors"
              style={{ backgroundColor: "hsl(var(--forge-molten))" }}
            >
              Kabul Et
            </button>
            <button
              onClick={dismiss}
              className="text-[11px] font-bold uppercase tracking-widest py-2 px-3 border border-border hover:border-primary transition-colors"
            >
              Reddet
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
