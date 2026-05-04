import { ArrowRight, X, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { BlurImage } from "./BlurImage";
import { getPageBySlug } from "@/data/servicePages";

export interface QuickViewService {
  image: string;
  title: string;
  description: string;
  link: string; // e.g. /hizmetler/cnc-frezeleme
  cta: string;
}

interface Props {
  service: QuickViewService | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ServiceQuickViewModal = ({ service, open, onOpenChange }: Props) => {
  if (!service) return null;
  const slug = service.link.split("/").filter(Boolean).pop() ?? "";
  const detail = getPageBySlug(slug);
  const features = detail?.features?.slice(0, 5) ?? [];
  const specs = detail?.technicalSpecs?.slice(0, 4) ?? [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-4xl p-0 gap-0 border-border bg-card overflow-hidden max-h-[90vh] overflow-y-auto rounded-none"
        aria-describedby={undefined}
      >
        <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr]">
          <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[460px] overflow-hidden bg-muted">
            <BlurImage src={service.image} alt={service.title} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent" />
            <span
              className="absolute top-4 left-4 inline-block px-3 py-1 text-[9px] font-bold uppercase tracking-[0.15em] text-primary-foreground font-mono"
              style={{ backgroundColor: "hsl(var(--primary) / 0.9)" }}
            >
              {detail?.categoryLabel ?? "Hizmet"}
            </span>
          </div>

          <div className="relative p-6 md:p-8 flex flex-col">
            <DialogClose className="absolute top-4 right-4 w-8 h-8 inline-flex items-center justify-center border border-border hover:bg-muted transition-colors">
              <X className="w-4 h-4" />
              <span className="sr-only">Kapat</span>
            </DialogClose>

            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3 pr-10 heading-industrial">
              {service.title}
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">
              {detail?.description ?? service.description}
            </p>

            {features.length > 0 && (
              <ul className="space-y-2 mb-5">
                {features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-xs text-foreground/80">
                    <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 shrink-0 text-primary" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            )}

            {specs.length > 0 && (
              <div className="grid grid-cols-2 gap-3 mb-6 pt-4 border-t border-border/50">
                {specs.map((s) => (
                  <div key={s.label}>
                    <div className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground/60 mb-0.5">
                      {s.label}
                    </div>
                    <div className="text-sm font-semibold text-foreground">{s.value}</div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-auto flex flex-col sm:flex-row gap-3 pt-4">
              <Link
                to={service.link}
                onClick={() => onOpenChange(false)}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-5 py-3 text-xs font-semibold uppercase tracking-wider border-2 border-foreground text-foreground hover:bg-foreground hover:text-background transition-colors"
              >
                Detay Sayfası
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                to={`/teklif-al?hizmet=${encodeURIComponent(slug)}`}
                onClick={() => onOpenChange(false)}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-5 py-3 text-xs font-semibold uppercase tracking-wider border-2 transition-colors"
                style={{
                  backgroundColor: "hsl(var(--forge-molten))",
                  borderColor: "hsl(var(--forge-molten))",
                  color: "#ffffff",
                }}
              >
                Teklif Al
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};