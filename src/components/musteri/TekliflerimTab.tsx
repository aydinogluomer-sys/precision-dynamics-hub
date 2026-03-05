import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Loader2, Check, Upload } from "lucide-react";
import { TableSkeleton } from "./MusteriSkeletons";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface RFQ {
  id: string;
  service: string | null;
  material: string | null;
  quantity: number | null;
  status: string | null;
  date: string | null;
  quoted_price: number | null;
  price_valid_until: string | null;
  customer_approved: boolean | null;
  rejection_reason: string | null;
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
  const [approving, setApproving] = useState<string | null>(null);

  const fetchRfqs = async () => {
    const { data } = await supabase
      .from("rfqs")
      .select("id, service, material, quantity, status, date, quoted_price, price_valid_until, customer_approved, rejection_reason")
      .order("created_at", { ascending: false });
    setRfqs((data as RFQ[]) || []);
    setLoading(false);
  };

  useEffect(() => { fetchRfqs(); }, []);

  const handleApprove = async (rfqId: string) => {
    setApproving(rfqId);
    const { error } = await supabase.from("rfqs").update({
      customer_approved: true,
      customer_approved_at: new Date().toISOString(),
      status: "Onaylandı",
    }).eq("id", rfqId);
    if (error) {
      toast.error("Onaylama başarısız oldu.");
    } else {
      toast.success("Teklif onaylandı! Siparişe dönüştürülecek.");
      fetchRfqs();
    }
    setApproving(null);
  };

  const pending = rfqs.filter(r => !r.status || r.status === "Beklemede" || r.status === "Değerlendiriliyor");
  const approved = rfqs.filter(r => r.status === "Onaylandı" || r.customer_approved);
  const rejected = rfqs.filter(r => r.status === "Reddedildi");

  if (loading) return <TableSkeleton rows={4} cols={7} />;

  if (rfqs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
        <FileText size={40} className="mb-3 opacity-30" />
        <p className="text-sm font-medium">Henüz teklif talebiniz bulunmuyor.</p>
        <Link to="/teklif-al" className="mt-4">
          <Button size="sm" className="gap-2"><Upload size={16} /> Teknik Çizim Yükle & Teklif Al</Button>
        </Link>
      </div>
    );
  }

  const RfqTable = ({ items }: { items: RFQ[] }) => {
    if (items.length === 0) return <p className="text-sm text-muted-foreground py-8 text-center">Bu kategoride teklif bulunmuyor.</p>;
    return (
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs text-muted-foreground uppercase tracking-wider">
              <th className="pb-3 pr-4">ID</th>
              <th className="pb-3 pr-4">Hizmet</th>
              <th className="pb-3 pr-4">Malzeme</th>
              <th className="pb-3 pr-4">Adet</th>
              <th className="pb-3 pr-4">Fiyat Teklifi</th>
              <th className="pb-3 pr-4">Durum</th>
              <th className="pb-3 pr-4">Tarih</th>
              <th className="pb-3">İşlem</th>
            </tr>
          </thead>
          <tbody>
              {items.map((r) => (
                <tr key={r.id} className="border-b border-border/50 last:border-0">
                  <td className="py-3 pr-4 font-mono text-xs">{r.id.slice(0, 8)}</td>
                  <td className="py-3 pr-4">{r.service || "—"}</td>
                  <td className="py-3 pr-4">{r.material || "—"}</td>
                  <td className="py-3 pr-4 font-mono">{r.quantity ?? "—"}</td>
                  <td className="py-3 pr-4 font-mono font-semibold">
                    {r.quoted_price ? `₺${r.quoted_price.toLocaleString("tr-TR")}` : "Bekleniyor"}
                  </td>
                  <td className="py-3 pr-4">
                    <Badge variant="outline" className={statusColor(r.status)}>{r.status || "Beklemede"}</Badge>
                    {r.status === "Reddedildi" && r.rejection_reason && (
                      <p className="text-[10px] text-destructive mt-1 max-w-[200px]">Sebep: {r.rejection_reason}</p>
                    )}
                  </td>
                  <td className="py-3 pr-4 text-muted-foreground">{r.date || "—"}</td>
                  <td className="py-3">
                    {r.quoted_price && !r.customer_approved && r.status !== "Reddedildi" && (
                      <Button
                        size="sm"
                        variant="default"
                        className="gap-1.5 text-xs h-8"
                        disabled={approving === r.id}
                        onClick={() => handleApprove(r.id)}
                      >
                        {approving === r.id ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
                        Onayla
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-sm">Teklif Taleplerim</h3>
        <Link to="/teklif-al">
          <Button size="sm" variant="outline" className="gap-2 text-xs"><Upload size={14} /> Yeni Teklif Talebi</Button>
        </Link>
      </div>

      <Tabs defaultValue="bekleyen" className="w-full">
        <TabsList className="bg-muted/50 h-auto p-1">
          <TabsTrigger value="bekleyen" className="text-xs">Fiyat Bekleyenler ({pending.length})</TabsTrigger>
          <TabsTrigger value="onaylanan" className="text-xs">Onaylananlar ({approved.length})</TabsTrigger>
          <TabsTrigger value="reddedilen" className="text-xs">Reddedilenler ({rejected.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="bekleyen"><RfqTable items={pending} /></TabsContent>
        <TabsContent value="onaylanan"><RfqTable items={approved} /></TabsContent>
        <TabsContent value="reddedilen"><RfqTable items={rejected} /></TabsContent>
      </Tabs>
    </div>
  );
};

export default TekliflerimTab;
