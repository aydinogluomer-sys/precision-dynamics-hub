import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { type ReactNode } from "react";
import { Z } from "@/styles/z-index";

const ROUTE_NAMES: Record<string, string> = {
  '/': 'ANASAYFA',
  '/hakkimizda': 'HAKKIMIZDA',
  '/iletisim': 'İLETİŞİM',
  '/teklif-al': 'TEKLİF',
  '/malzemeler': 'MALZEMELER',
  '/sss': 'SSS',
  '/blog': 'BLOG',
};

// CTA routes get molten accent; all others get forge-teal
const CTA_ROUTES = new Set(['/teklif-al', '/iletisim']);

const EASE: [number, number, number, number] = [0.77, 0, 0.18, 1];

const variants = {
  initial: { clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' },
  enter: {
    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
    transition: { duration: 0.6, ease: EASE },
  },
  exit: {
    clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)',
    transition: { duration: 0.4, ease: EASE },
  },
};

export const PageTransition = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const pageName = ROUTE_NAMES[location.pathname] ?? '';
  const overlayColor = CTA_ROUTES.has(location.pathname)
    ? 'hsl(var(--forge-molten) / 0.18)'
    : 'hsl(var(--forge-teal) / 0.18)';

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        variants={variants}
        initial="initial"
        animate="enter"
        exit="exit"
        style={{ willChange: 'clip-path' }}
      >
        {pageName && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center pointer-events-none"
            style={{ zIndex: Z.pageTransition }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.6, times: [0, 0.3, 1] }}
          >
            <span
              className="font-mono font-bold select-none"
              style={{
                fontSize: 'clamp(32px, 8vw, 100px)',
                color: overlayColor,
              }}
            >
              {pageName}
            </span>
          </motion.div>
        )}
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
