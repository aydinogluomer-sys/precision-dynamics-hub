import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Loader2, Activity } from "lucide-react";

interface WBS {
  id: string;
  part_name: string | null;
  customer: string | null;
  status: string | null;
  current_step: number | null;
  total_qty: number | null;
  machine: string | null;
  deadline: string | null;
}

const UretimTab = () => {
  const [items, setItems] = useState<WBS[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      // WBS doesn't have user_id yet — will show empty for customers until admin links data
      const { data } = await supabase
        .from("wbs")
        .select("id, part_name, customer, status, current_step, total_qty, machine, deadline")
        .order("created_at", { ascending: false });
      setItems((data as WBS[]) || []);
      setLoading(false);
    };
    fetch();
  }, []);

  if (loading) return <div className="flex justify-center py-12"><Loader2 className="animate-spin text-primary" size={24} /></div>;

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
        <Activity size={40} className="mb-3 opacity-30" />
        <p className="text-sm font-medium">Aktif üretim kaydı bulunmuyor.</p>
        <p className="text-xs mt-1">Siparişleriniz üretime girdiğinde burada takip edebilirsiniz.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border text-left text-xs text-muted-foreground uppercase tracking-wider">
            <th className="pb-3 pr-4">Parça</th>
            <th className="pb-3 pr-4">Durum</th>
            <th className="pb-3 pr-4">Adım</th>
            <th className="pb-3 pr-4">Makine</th>
            <th className="pb-3">Termin</th>
          </tr>
        </thead>
        <tbody>
          {items.map((w) => (
            <tr key={w.id} className="border-b border-border/50 last:border-0">
              <td className="py-3 pr-4 font-medium">{w.part_name || "—"}</td>
              <td className="py-3 pr-4">
                <Badge variant="outline">{w.status || "—"}</Badge>
              </td>
              <td className="py-3 pr-4">
                <div className="flex items-center gap-2">
                  <Progress value={w.current_step ? (w.current_step / 10) * 100 : 0} className="h-2 w-20" />
                  <span className="text-xs text-muted-foreground">{w.current_step || 0}/10</span>
                </div>
              </td>
              <td className="py-3 pr-4 text-muted-foreground">{w.machine || "—"}</td>
              <td className="py-3 text-muted-foreground">{w.deadline || "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UretimTab;
