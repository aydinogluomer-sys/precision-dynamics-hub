import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useInView } from "framer-motion";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:',.<>?/\\`~";

interface TextScrambleProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  /** ms per character resolve */
  speed?: number;
  /** trigger: "inView" or "immediate" */
  trigger?: "inView" | "immediate";
  /** scramble character set override */
  charset?: string;
  /** once: true => only animate first time */
  once?: boolean;
}

export const TextScramble = ({
  text,
  className = "",
  style,
  speed = 40,
  trigger = "inView",
  charset = CHARS,
  once = true,
}: TextScrambleProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once, amount: 0.5 });
  const [displayText, setDisplayText] = useState(text);
  const hasAnimated = useRef(false);

  const scramble = useCallback(() => {
    if (hasAnimated.current && once) return;
    hasAnimated.current = true;

    const length = text.length;
    let resolved = 0;
    const chars = text.split("");
    const scrambled = chars.map(() =>
      charset[Math.floor(Math.random() * charset.length)],
    );

    const interval = setInterval(() => {
      // Resolve next character
      scrambled[resolved] = chars[resolved];
      resolved++;

      // Scramble remaining
      for (let i = resolved; i < length; i++) {
        if (chars[i] === " " || chars[i] === "\n") {
          scrambled[i] = chars[i];
        } else {
          scrambled[i] = charset[Math.floor(Math.random() * charset.length)];
        }
      }

      setDisplayText(scrambled.join(""));

      if (resolved >= length) {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, charset, once]);

  useEffect(() => {
    if (trigger === "immediate") {
      return scramble();
    }
    if (trigger === "inView" && isInView) {
      return scramble();
    }
  }, [trigger, isInView, scramble]);

  return (
    <motion.span
      ref={ref}
      className={`font-mono ${className}`}
      style={style}
      initial={{ opacity: 0 }}
      animate={isInView || trigger === "immediate" ? { opacity: 1 } : {}}
      transition={{ duration: 0.3 }}
    >
      {displayText}
    </motion.span>
  );
};
