import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

interface MusteriHeaderProps {
  displayName: string;
  onLogout: () => void;
}

const MusteriHeader = ({ displayName, onLogout }: MusteriHeaderProps) => (
  <header className="border-b border-border bg-card">
    <div className="container mx-auto px-6 h-16 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-3">
        <div className="w-9 h-9 bg-primary flex items-center justify-center">
          <span className="text-primary-foreground font-bold text-sm">MT</span>
        </div>
        <div>
          <div className="font-bold text-sm tracking-tight">MAS TECHNIC</div>
          <div className="text-[9px] text-muted-foreground uppercase tracking-widest">Müşteri Portalı</div>
        </div>
      </Link>
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground hidden sm:block">
          Merhaba, <span className="font-semibold text-foreground">{displayName}</span>
        </span>
        <Button variant="ghost" size="sm" onClick={onLogout} className="gap-2 text-muted-foreground hover:text-destructive">
          <LogOut size={16} />
          <span className="hidden sm:inline">Çıkış</span>
        </Button>
      </div>
    </div>
  </header>
);

export default MusteriHeader;
