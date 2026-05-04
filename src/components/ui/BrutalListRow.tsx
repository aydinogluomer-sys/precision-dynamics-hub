import { forwardRef } from "react";
import { ArrowRight } from "lucide-react";

interface BrutalListRowProps {
  /** Two-digit numeric index, e.g. "01" */
  index: string;
  title: string;
  /** Right-side meta (mono): tolerance, axis count, certification, etc. */
  meta?: string;
  /** Optional href — renders as <a>. Otherwise <button>. */
  href?: string;
  onClick?: () => void;
  className?: string;
}

/**
 * Brutalist editorial list row: `01 ─ TITLE ─── meta ─── →`
 * Hover: molten background invert, arrow translates right.
 * Hairline border-bottom, no border-radius.
 */
export const BrutalListRow = forwardRef<HTMLElement, BrutalListRowProps>(
  ({ index, title, meta, href, onClick, className = "" }, ref) => {
    const baseClass = `group flex items-center gap-4 md:gap-8 w-full text-left
      border-b border-foreground/15 py-6 md:py-8 px-2 md:px-4
      transition-colors duration-300
      hover:bg-[hsl(var(--brutalist-molten))] hover:text-[hsl(var(--brutalist-void))]
      focus-visible:outline-none focus-visible:bg-[hsl(var(--brutalist-molten))]
      focus-visible:text-[hsl(var(--brutalist-void))]
      ${className}`;

    const content = (
      <>
        <span className="font-mono text-xs md:text-sm tracking-[0.25em] opacity-60 shrink-0">
          {index}
        </span>
        <span className="font-mono text-xs opacity-40 shrink-0 hidden md:inline">─</span>
        <span
          className="font-mono uppercase tracking-[-0.01em] flex-1 truncate"
          style={{ fontSize: "clamp(1.25rem, 3vw, 2.25rem)" }}
        >
          {title}
        </span>
        {meta && (
          <span className="font-mono text-[11px] md:text-xs tracking-[0.2em] opacity-60 hidden md:inline shrink-0">
            {meta}
          </span>
        )}
        <ArrowRight
          className="w-5 h-5 md:w-6 md:h-6 shrink-0 transition-transform duration-300 group-hover:translate-x-2"
          aria-hidden="true"
        />
      </>
    );

    if (href) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={baseClass}
        >
          {content}
        </a>
      );
    }
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type="button"
        onClick={onClick}
        className={baseClass}
      >
        {content}
      </button>
    );
  },
);

BrutalListRow.displayName = "BrutalListRow";