import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Package, Loader2 } from "lucide-react";

interface Order {
  id: string;
  rfq_ref: string | null;
  customer: string | null;
  part_name: string | null;
  quantity: number | null;
  order_date: string | null;
  deadline: string | null;
  status: string | null;
  progress: number | null;
}

const statusColors: Record<string, string> = {
  Hazırlık: "bg-blue-500/20 text-blue-400",
  Üretimde: "bg-amber-500/20 text-amber-400",
  "Kalite Kontrol": "bg-purple-500/20 text-purple-400",
  Tamamlandı: "bg-emerald-500/20 text-emerald-400",
};

const OrdersView = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
      if (data) setOrders(data as Order[]);
      setLoading(false);
    };
    fetch();
  }, []);

  if (loading) return <div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-[#0AA2CD]" /></div>;

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-500 animate-[fadeInUp_0.4s_ease-out]">
        <Package className="w-12 h-12 mb-3" />
        <p className="font-medium">Henüz sipariş kaydı yok</p>
        <p className="text-xs mt-1">Teklif onaylandıktan sonra siparişler burada görünür</p>
      </div>
    );
  }

  return (
    <div className="bg-[#1E293B] rounded-xl border border-[#334155] overflow-hidden animate-[fadeInUp_0.4s_ease-out]">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-[#334155]">
              <th className="text-left p-4">Sipariş No</th>
              <th className="text-left p-4">RFQ Ref</th>
              <th className="text-left p-4">Müşteri</th>
              <th className="text-left p-4">Parça</th>
              <th className="text-left p-4">Adet</th>
              <th className="text-left p-4">Sipariş Tarihi</th>
              <th className="text-left p-4">Termin</th>
              <th className="text-left p-4">Durum</th>
              <th className="text-left p-4">İlerleme</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="border-b border-[#334155]/50 hover:bg-white/5 transition-colors">
                <td className="p-4 font-bold text-[#0AA2CD]">{o.id}</td>
                <td className="p-4 text-slate-400">{o.rfq_ref || "-"}</td>
                <td className="p-4 text-white">{o.customer || "-"}</td>
                <td className="p-4 text-slate-300">{o.part_name || "-"}</td>
                <td className="p-4 text-white font-bold">{o.quantity || "-"}</td>
                <td className="p-4 text-slate-400">{o.order_date || "-"}</td>
                <td className="p-4 text-slate-400">{o.deadline || "-"}</td>
                <td className="p-4">
                  <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold ${statusColors[o.status || ""] || "bg-slate-500/20 text-slate-400"}`}>
                    {o.status || "-"}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-[#0F172A] rounded-full overflow-hidden">
                      <div className="h-full bg-[#0AA2CD] rounded-full" style={{ width: `${o.progress || 0}%` }} />
                    </div>
                    <span className="text-xs font-bold text-white">{o.progress || 0}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersView;
