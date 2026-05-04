import { useEffect, useState } from "react";
import { LiveClock } from "@/components/LiveClock";

interface Props {
  sections: { id: string; label: string }[];
}

/**
 * SectionIndex — Awwwards signature overlay
 * - Bottom-left: live timestamp + location
 * - Bottom-right: section index (01 / N) synced to scroll
 * Hidden on mobile (<768px), pointer-events-none, z-[60].
 */
export const SectionIndex = ({ sections }: Props) => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.innerWidth < 768) return;

    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = els.indexOf(entry.target as HTMLElement);
            if (idx >= 0) setActive(idx);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 },
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [sections]);

  const total = String(sections.length).padStart(2, "0");
  const current = String(active + 1).padStart(2, "0");
  const label = sections[active]?.label ?? "";

  return (
    <div
      className="hidden md:block fixed inset-x-0 bottom-0 pointer-events-none select-none"
      style={{ zIndex: 60 }}
      aria-hidden="true"
    >
      {/* Bottom-left — live clock + location */}
      <div
        className="absolute bottom-6 left-6 flex items-center gap-3"
        style={{ color: "hsl(var(--foreground) / 0.55)" }}
      >
        <span
          className="block w-1.5 h-1.5 rounded-full bg-primary animate-pulse"
          style={{ boxShadow: "0 0 8px hsl(var(--primary) / 0.8)" }}
        />
        <LiveClock />
      </div>

      {/* Bottom-right — section index */}
      <div
        className="absolute bottom-6 right-6 flex items-baseline gap-3"
        style={{ fontFamily: "IBM Plex Mono, monospace" }}
      >
        <span
          className="text-[10px] uppercase tracking-[0.4em] truncate max-w-[200px]"
          style={{ color: "hsl(var(--foreground) / 0.45)" }}
        >
          {label}
        </span>
        <span
          className="text-sm tabular-nums"
          style={{ color: "hsl(var(--foreground) / 0.85)" }}
        >
          {current}
        </span>
        <span
          className="text-[10px] tabular-nums"
          style={{ color: "hsl(var(--foreground) / 0.35)" }}
        >
          / {total}
        </span>
      </div>
    </div>
  );
};