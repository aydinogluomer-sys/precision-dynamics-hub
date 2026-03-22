import { useRef, useState, forwardRef, type ReactNode, type MouseEvent } from "react";
import { motion } from "framer-motion";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  as?: "a" | "button";
  href?: string;
  onClick?: () => void;
  strength?: number;
}

export const MagneticButton = forwardRef<HTMLDivElement, MagneticButtonProps>(
  ({ children, className = "", as = "a", href, onClick, strength = 0.3 }, forwardedRef) => {
    const innerRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const handleMouse = (e: MouseEvent) => {
      // Disable magnetic effect during keyboard focus
      if (isFocused) return;
      if (!innerRef.current) return;
      const { left, top, width, height } = innerRef.current.getBoundingClientRect();
      const x = (e.clientX - left - width / 2) * strength;
      const y = (e.clientY - top - height / 2) * strength;
      setPosition({ x, y });
    };

    const reset = () => {
      setPosition({ x: 0, y: 0 });
      setIsHovered(false);
    };

    const Tag = as as React.ElementType;

    return (
      <motion.div
        ref={(node) => {
          (innerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
          if (typeof forwardedRef === "function") forwardedRef(node);
          else if (forwardedRef) forwardedRef.current = node;
        }}
        onMouseMove={handleMouse}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={reset}
        onFocus={() => {
          setIsFocused(true);
          reset();
        }}
        onBlur={() => {
          setIsFocused(false);
          reset();
        }}
        animate={{
          x: position.x,
          y: position.y,
          boxShadow: isHovered ? "0 0 20px rgba(232, 97, 10, 0.3)" : "0 0 0px rgba(232, 97, 10, 0)",
        }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
        className="inline-block"
      >
        <Tag
          className={`${className} focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background outline-none`}
          href={href}
          onClick={onClick}
        >
          {/* Inner text moves opposite direction for parallax */}
          <motion.span
            className="inline-block"
            animate={{
              x: -position.x * 0.4,
              y: -position.y * 0.4,
            }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
          >
            {children}
          </motion.span>
        </Tag>
      </motion.div>
    );
  },
);

MagneticButton.displayName = "MagneticButton";
