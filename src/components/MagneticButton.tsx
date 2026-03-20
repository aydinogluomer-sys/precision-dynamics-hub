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

const MagneticButton = forwardRef<HTMLDivElement, MagneticButtonProps>(
  ({ children, className = "", as = "a", href, onClick, strength = 0.3 }, forwardedRef) => {
    const innerRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouse = (e: MouseEvent) => {
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

    const Tag = as;

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
        animate={{
          x: position.x,
          y: position.y,
          boxShadow: isHovered
            ? "0 0 20px rgba(232, 97, 10, 0.3)"
            : "0 0 0px rgba(232, 97, 10, 0)",
        }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
        className="inline-block"
      >
        <Tag className={className} href={href} onClick={onClick}>
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
  }
);

MagneticButton.displayName = "MagneticButton";

export default MagneticButton;
