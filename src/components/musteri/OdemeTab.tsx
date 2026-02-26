import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Loader2, CreditCard, AlertCircle } from "lucide-react";

interface Payment {
  id: string;
  doc_number: string | null;
  title: string | null;
  total_amount: number | null;
  currency: string | null;
  payment_status: string | null;
  due_date: string | null;
  doc_date: string | null;
}

const statusColor = (s: string | null) => {
  switch (s) {
    case "ödendi": return "bg-green-500/10 text-green-600 border-green-200";
    case "kısmi": return "bg-amber-500/10 text-amber-600 border-amber-200";
    default: return "bg-red-500/10 text-red-600 border-red-200";
  }
};
const statusLabel = (s: string | null) => {
  switch (s) {
    case "ödendi": return "Ödendi";
    case "kısmi": return "Kısmi";
    default: return "Ödenmedi";
  }
};

const OdemeTab = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("financial_documents")
        .select("id, doc_number, title, total_amount, currency, payment_status, due_date, doc_date")
        .order("due_date", { ascending: true });
      setPayments((data as Payment[]) || []);
      setLoading(false);
    };
    load();
  }, []);

  if (loading) return <div className="flex justify-center py-12"><Loader2 className="animate-spin text-primary" size={24} /></div>;

  const unpaid = payments.filter(p => p.payment_status !== "ödendi");
  const paid = payments.filter(p => p.payment_status === "ödendi");
  const totalUnpaid = unpaid.reduce((a, p) => a + (p.total_amount || 0), 0);
  const totalPaid = paid.reduce((a, p) => a + (p.total_amount || 0), 0);

  if (payments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
        <CreditCard size={40} className="mb-3 opacity-30" />
        <p className="text-sm font-medium">Henüz ödeme kaydı bulunmuyor.</p>
        <p className="text-xs mt-1">Fatura ve ödeme durumlarınızı bu sekmeden takip edebileceksiniz.</p>
      </div>
    );
  }

  const isOverdue = (due: string | null) => {
    if (!due) return false;
    return new Date(due) < new Date();
  };

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-background border border-border p-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">Toplam Ödeme</p>
          <p className="text-xl font-bold font-mono mt-1">{payments.length} adet</p>
        </div>
        <div className="bg-background border border-border p-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">Ödenen Toplam</p>
          <p className="text-xl font-bold font-mono mt-1 text-green-600">₺{totalPaid.toLocaleString("tr-TR")}</p>
        </div>
        <div className="bg-background border border-border p-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">Bekleyen Borç</p>
          <p className="text-xl font-bold font-mono mt-1 text-red-600">₺{totalUnpaid.toLocaleString("tr-TR")}</p>
        </div>
      </div>

      {/* Overdue warning */}
      {unpaid.some(p => isOverdue(p.due_date)) && (
        <div className="flex items-center gap-2 bg-destructive/10 border border-destructive/20 text-destructive p-3 text-sm">
          <AlertCircle size={16} />
          <span>Vadesi geçmiş ödemeniz bulunmaktadır.</span>
        </div>
      )}

      {/* Payment list */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs text-muted-foreground uppercase tracking-wider">
              <th className="pb-3 pr-4">Belge No</th>
              <th className="pb-3 pr-4">Açıklama</th>
              <th className="pb-3 pr-4">Fatura Tarihi</th>
              <th className="pb-3 pr-4">Vade</th>
              <th className="pb-3 pr-4 text-right">Tutar</th>
              <th className="pb-3">Durum</th>
            </tr>
          </thead>
          <tbody>
            {payments.map(p => (
              <tr key={p.id} className={`border-b border-border/50 last:border-0 ${p.payment_status !== "ödendi" && isOverdue(p.due_date) ? "bg-destructive/5" : ""}`}>
                <td className="py-3 pr-4 font-mono text-xs">{p.doc_number || p.id.slice(0, 8)}</td>
                <td className="py-3 pr-4">{p.title || "—"}</td>
                <td className="py-3 pr-4 text-muted-foreground">{p.doc_date || "—"}</td>
                <td className="py-3 pr-4 text-muted-foreground">
                  {p.due_date || "—"}
                  {p.payment_status !== "ödendi" && isOverdue(p.due_date) && (
                    <span className="ml-1 text-destructive text-[10px] font-semibold">GECİKMİŞ</span>
                  )}
                </td>
                <td className="py-3 pr-4 text-right font-mono font-semibold">
                  ₺{(p.total_amount || 0).toLocaleString("tr-TR")}
                </td>
                <td className="py-3">
                  <Badge variant="outline" className={statusColor(p.payment_status)}>
                    {statusLabel(p.payment_status)}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OdemeTab;
