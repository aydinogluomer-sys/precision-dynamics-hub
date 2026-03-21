import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PageLoaderProps {
  isFirstVisit: boolean;
}

const PageLoader = ({ isFirstVisit }: PageLoaderProps) => {
  const [isVisible, setIsVisible] = useState(isFirstVisit);

  useEffect(() => {
    if (!isFirstVisit) return;
    const timer = setTimeout(() => setIsVisible(false), 1800);
    return () => clearTimeout(timer);
  }, [isFirstVisit]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ backgroundColor: "hsl(var(--forge-obsidian))" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Subtle grid */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          <div className="relative flex flex-col items-center gap-4">
            {/* Logo box */}
            <motion.div
              className="bg-primary flex items-center justify-center"
              style={{ width: 64, height: 64 }}
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="text-primary-foreground font-bold text-2xl">
                {"MT"}
              </span>
            </motion.div>

            {/* Brand text */}
            <motion.div
              className="flex flex-col items-center"
              initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
              animate={{ clipPath: "inset(0 0 0% 0)", opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1], delay: 0.3 }}
            >
              <span className="font-bold text-xl tracking-tight text-white">
                {"MAS TECHNIC"}
              </span>
              <span className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-mono mt-1">
                {"Precision CNC"}
              </span>
            </motion.div>

            {/* Loading bar */}
            <motion.div
              className="w-32 h-px mt-4 overflow-hidden"
              style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
            >
              <motion.div
                className="h-full"
                style={{
                  background: "linear-gradient(90deg, hsl(var(--forge-molten)), hsl(var(--forge-amber)))",
                }}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageLoader;
