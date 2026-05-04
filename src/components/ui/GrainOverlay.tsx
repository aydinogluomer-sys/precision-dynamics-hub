import { memo } from "react";

interface GrainOverlayProps {
  /** Üstüne ince CRT scanline bindir (default: false) */
  scanline?: boolean;
}

/**
 * Brutalist film grain + opsiyonel CRT scanline overlay.
 * Fixed full-viewport, pointer-events:none, z-index:5.
 * CSS class'ları `index.css` içindeki `.brutalist-grain` ve
 * `.brutalist-scanline` tarafından sağlanır (FAZ 03).
 * `prefers-reduced-motion` aktifken CSS opacity'yi 0'a indirir.
 */
export const GrainOverlay = memo(({ scanline = false }: GrainOverlayProps) => (
  <>
    <div className="brutalist-grain" aria-hidden="true" />
    {scanline && <div className="brutalist-scanline" aria-hidden="true" />}
  </>
));

GrainOverlay.displayName = "GrainOverlay";