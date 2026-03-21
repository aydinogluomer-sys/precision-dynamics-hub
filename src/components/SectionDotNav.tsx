import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";

interface Section {
  id: string;
  label: string;
}

interface SectionDotNavProps {
  sections: Section[];
}

export const SectionDotNav = ({ sections }: SectionDotNavProps) => {
  const { pathname } = useLocation();
  const prefersReduced = usePrefersReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const isHidden =
    pathname !== "/" ||
    typeof window === "undefined" ||
    window.matchMedia("(pointer: coarse)").matches;

  const updateActive = useCallback(() => {
    if (isHidden) return;
    const viewportH = window.innerHeight;

    for (let i = sections.length - 1; i >= 0; i--) {
      const el = document.getElementById(sections[i].id);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= viewportH * 0.5) {
          setActiveIndex(i);
          break;
        }
      }
    }

    setIsVisible(window.scrollY > viewportH * 0.3);
  }, [sections, isHidden]);

  useEffect(() => {
    if (isHidden) return;
    window.addEventListener("scroll", updateActive, { passive: true });
    updateActive();
    return () => window.removeEventListener("scroll", updateActive);
  }, [updateActive, isHidden]);

  if (isHidden) return null;

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          className="fixed right-3 top-1/2 -translate-y-1/2 z-50 flex flex-col items-end gap-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.3 }}
          aria-label="Sayfa bölüm navigasyonu"
        >
          {sections.map((section, i) => {
            const isActive = i === activeIndex;
            const isHovered = i === hoveredIndex;

            return (
              <button
                key={section.id}
                onClick={() => handleClick(section.id)}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="flex items-center gap-2 group focus-visible:outline-none"
                aria-label={section.label}
                aria-current={isActive ? "true" : undefined}
              >
                {/* Label tooltip */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.span
                      className="text-[10px] font-mono uppercase tracking-wider whitespace-nowrap px-2 py-1"
                      style={{
                        color: "hsl(var(--primary-foreground))",
                        backgroundColor: "hsl(var(--forge-steel))",
                      }}
                      initial={{ opacity: 0, x: 8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 8 }}
                      transition={{ duration: 0.15 }}
                    >
                      {section.label}
                    </motion.span>
                  )}
                </AnimatePresence>

                {/* Dot */}
                <motion.div
                  className="rounded-full transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary"
                  style={{
                    width: isActive ? 10 : 6,
                    height: isActive ? 10 : 6,
                    backgroundColor: isActive
                      ? "hsl(var(--primary))"
                      : "hsl(var(--forge-silver) / 0.4)",
                  }}
                  layout={!prefersReduced}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              </button>
            );
          })}
        </motion.nav>
      )}
    </AnimatePresence>
  );
};
