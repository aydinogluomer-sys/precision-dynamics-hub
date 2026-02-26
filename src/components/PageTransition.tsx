import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { type ReactNode } from "react";

const pageVariants = {
  initial: { opacity: 0, rotateY: 6, scale: 0.97, transformPerspective: 1200 },
  enter: {
    opacity: 1,
    rotateY: 0,
    scale: 1,
    transformPerspective: 1200,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
  exit: {
    opacity: 0,
    rotateY: -6,
    scale: 0.97,
    transformPerspective: 1200,
    transition: { duration: 0.3, ease: [0.55, 0.06, 0.68, 0.19] as [number, number, number, number] },
  },
};

const PageTransition = ({ children }: { children: ReactNode }) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="enter"
        exit="exit"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;
