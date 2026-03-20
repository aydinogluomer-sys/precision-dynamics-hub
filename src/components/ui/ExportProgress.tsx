import { motion, AnimatePresence } from "framer-motion";

interface ExportProgressProps {
  visible: boolean;
  fileName: string;
  progress?: number;
}

const ExportProgress = ({ visible, fileName, progress = 0 }: ExportProgressProps) => (
  <AnimatePresence>
    {visible && (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20, transition: { duration: 0.3, delay: 0.8 } }}
        className="fixed bottom-0 left-0 right-0 z-50 h-10 flex items-center px-4"
        style={{ backgroundColor: "hsl(var(--forge-obsidian))" }}
      >
        {/* Progress bar */}
        <motion.div
          className="absolute left-0 top-0 h-full"
          style={{
            background: "linear-gradient(90deg, hsl(var(--forge-molten)), hsl(var(--forge-amber)))",
            opacity: 0.2,
          }}
          initial={{ width: "0%" }}
          animate={{ width: `${Math.max(progress * 100, 10)}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
        {/* Text */}
        <span
          className="relative z-10 text-xs tracking-wide"
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            color: "hsl(var(--forge-silver))",
          }}
        >
          <span>{"Rapor hazırlanıyor... "}</span>
          <span style={{ color: "hsl(var(--forge-molten))" }}>{fileName}</span>
        </span>
      </motion.div>
    )}
  </AnimatePresence>
);

export { ExportProgress };
