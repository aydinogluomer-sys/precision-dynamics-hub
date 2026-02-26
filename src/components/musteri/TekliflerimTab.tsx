import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { FileText, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

interface RFQ {
  id: string;
  service: string | null;
  material: string | null;
  quantity: number | null;
  status: string | null;
  date: string | null;
}

const statusColor = (s: string | null) => {
  switch (s) {
    case "Onaylandı": return "bg-green-500/10 text-green-600 border-green-200";
    case "Değerlendiriliyor": return "bg-blue-500/10 text-blue-600 border-blue-200";
    case "Reddedildi": return "bg-red-500/10 text-red-600 border-red-200";
    default: return "bg-amber-500/10 text-amber-600 border-amber-200";
  }
};

const TekliflerimTab = () => {
  const [rfqs, setRfqs] = useState<RFQ[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from("rfqs")
        .select("id, service, material, quantity, status, date")
        .order("created_at", { ascending: false });
      setRfqs((data as RFQ[]) || []);
      setLoading(false);
    };
    fetch();
  }, []);

  if (loading) return <div className="flex justify-center py-12"><Loader2 className="animate-spin text-primary" size={24} /></div>;

  if (rfqs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
        <FileText size={40} className="mb-3 opacity-30" />
        <p className="text-sm font-medium">Henüz teklif talebiniz bulunmuyor.</p>
        <Link to="/teklif-al" className="text-xs text-primary mt-2 hover:underline">Yeni teklif talebi oluşturun →</Link>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border text-left text-xs text-muted-foreground uppercase tracking-wider">
            <th className="pb-3 pr-4">ID</th>
            <th className="pb-3 pr-4">Hizmet</th>
            <th className="pb-3 pr-4">Malzeme</th>
            <th className="pb-3 pr-4">Adet</th>
            <th className="pb-3 pr-4">Durum</th>
            <th className="pb-3">Tarih</th>
          </tr>
        </thead>
        <tbody>
          {rfqs.map((r) => (
            <tr key={r.id} className="border-b border-border/50 last:border-0">
              <td className="py-3 pr-4 font-mono text-xs">{r.id.slice(0, 8)}</td>
              <td className="py-3 pr-4">{r.service || "—"}</td>
              <td className="py-3 pr-4">{r.material || "—"}</td>
              <td className="py-3 pr-4 font-mono">{r.quantity ?? "—"}</td>
              <td className="py-3 pr-4">
                <Badge variant="outline" className={statusColor(r.status)}>{r.status || "Beklemede"}</Badge>
              </td>
              <td className="py-3 text-muted-foreground">{r.date || "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TekliflerimTab;
