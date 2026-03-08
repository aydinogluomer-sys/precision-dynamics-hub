import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { FileText, Package, Clock, MessageSquare, AlertTriangle, CheckCircle2 } from "lucide-react";
import { StatsSkeleton, CardListSkeleton } from "./MusteriSkeletons";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface Stats {
  totalRfqs: number;
  pendingRfqs: number;
  approvedRfqs: number;
  totalOrders: number;
  activeOrders: number;
  openTickets: number;
}

interface RecentOrder {
  id: string;
  part_name: string | null;
  status: string | null;
  progress: number | null;
}

interface RecentRfq {
  id: string;
  service: string | null;
  status: string | null;
  quoted_price: number | null;
}

const StatCard = ({ icon: Icon, label, value, color }: { icon: React.ElementType; label: string; value: number; color: string }) => (
  <div className="bg-card border border-border p-5 flex items-start gap-4">
    <div className={`w-10 h-10 flex items-center justify-center ${color}`}>
      <Icon size={18} />
    </div>
    <div>
      <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">{label}</p>
      <p className="text-2xl font-bold font-mono mt-1">{value}</p>
    </div>
  </div>
);

const statusColor = (s: string | null) => {
  switch (s) {
    case "Onaylandı": case "Tamamlandı": return "bg-green-500/10 text-green-600 border-green-200";
    case "Üretimde": case "Değerlendiriliyor": return "bg-blue-500/10 text-blue-600 border-blue-200";
    case "Reddedildi": return "bg-red-500/10 text-red-600 border-red-200";
    default: return "bg-amber-500/10 text-amber-600 border-amber-200";
  }
};

const GenelBakisTab = () => {
  const [stats, setStats] = useState<Stats>({ totalRfqs: 0, pendingRfqs: 0, approvedRfqs: 0, totalOrders: 0, activeOrders: 0, openTickets: 0 });
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [recentRfqs, setRecentRfqs] = useState<RecentRfq[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const [rfqRes, orderRes, ticketRes] = await Promise.all([
        supabase.from("rfqs").select("id, service, status, quoted_price"),
        supabase.from("orders").select("id, part_name, status, progress"),
        supabase.from("support_tickets").select("id, status"),
      ]);

      const rfqs = (rfqRes.data || []) as RecentRfq[];
      const orders = (orderRes.data || []) as RecentOrder[];
      const tickets = ticketRes.data || [];

      setStats({
        totalRfqs: rfqs.length,
        pendingRfqs: rfqs.filter(r => !r.status || r.status === "Beklemede" || r.status === "Değerlendiriliyor").length,
        approvedRfqs: rfqs.filter(r => r.status === "Onaylandı").length,
        totalOrders: orders.length,
        activeOrders: orders.filter(o => o.status === "Üretimde" || o.status === "Beklemede").length,
        openTickets: tickets.filter(t => t.status === "open" || t.status === "in_progress").length,
      });

      setRecentOrders(orders.slice(0, 5));
      setRecentRfqs(rfqs.slice(0, 5));
      setLoading(false);
    };
    load();
  }, []);

  if (loading) return (
    <div className="space-y-6">
      <StatsSkeleton />
      <div>
        <div className="h-4 w-28 bg-muted rounded mb-3" />
        <CardListSkeleton count={3} />
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard icon={FileText} label="Toplam Teklif" value={stats.totalRfqs} color="bg-primary/10 text-primary" />
        <StatCard icon={Clock} label="Bekleyen Teklifler" value={stats.pendingRfqs} color="bg-amber-500/10 text-amber-600" />
        <StatCard icon={CheckCircle2} label="Onaylanan Teklifler" value={stats.approvedRfqs} color="bg-green-500/10 text-green-600" />
        <StatCard icon={Package} label="Toplam Sipariş" value={stats.totalOrders} color="bg-blue-500/10 text-blue-600" />
        <StatCard icon={AlertTriangle} label="Aktif Siparişler" value={stats.activeOrders} color="bg-orange-500/10 text-orange-600" />
        <StatCard icon={MessageSquare} label="Açık Destek Talepleri" value={stats.openTickets} color="bg-purple-500/10 text-purple-600" />
      </div>

      {/* Recent Orders */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">Son Siparişler</h3>
        {recentOrders.length === 0 ? (
          <p className="text-sm text-muted-foreground py-4">Henüz sipariş bulunmuyor.</p>
        ) : (
          <div className="space-y-2">
            {recentOrders.map(o => (
              <div key={o.id} className="flex items-center gap-4 p-3 border border-border bg-background">
                <span className="font-medium text-sm flex-1 truncate">{o.part_name || "—"}</span>
                <div className="w-24 flex items-center gap-2">
                  <Progress value={o.progress || 0} className="h-2 flex-1" />
                  <span className="text-xs text-muted-foreground font-mono">{o.progress || 0}%</span>
                </div>
                <Badge variant="outline" className={statusColor(o.status)}>{o.status || "Beklemede"}</Badge>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent RFQs */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">Son Teklif Talepleri</h3>
        {recentRfqs.length === 0 ? (
          <p className="text-sm text-muted-foreground py-4">Henüz teklif talebi bulunmuyor.</p>
        ) : (
          <div className="space-y-2">
            {recentRfqs.map(r => (
              <div key={r.id} className="flex items-center gap-4 p-3 border border-border bg-background">
                <span className="font-medium text-sm flex-1 truncate">{r.service || "Genel"}</span>
                {r.quoted_price && <span className="text-sm font-mono font-semibold">₺{r.quoted_price.toLocaleString("tr-TR")}</span>}
                <Badge variant="outline" className={statusColor(r.status)}>{r.status || "Beklemede"}</Badge>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GenelBakisTab;
