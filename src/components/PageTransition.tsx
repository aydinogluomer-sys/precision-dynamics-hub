import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { type ReactNode } from "react";

const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];
const DURATION = 0.6;

const pageVariants = {
  initial: {
    clipPath: "inset(100% 0 0 0)",
    opacity: 1,
  },
  enter: {
    clipPath: "inset(0 0 0 0)",
    opacity: 1,
    transition: {
      duration: DURATION,
      ease: EASE,
    },
  },
  exit: {
    clipPath: "inset(0 0 100% 0)",
    opacity: 1,
    transition: {
      duration: DURATION,
      ease: EASE,
    },
  },
} as const;

export const PageTransition = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="enter"
        exit="exit"
        style={{ willChange: "clip-path" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
