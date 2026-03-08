import { useEffect, useState, lazy, Suspense, Fragment } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Loader2, Check, Upload, Paperclip, ChevronDown, ChevronUp } from "lucide-react";
import { TableSkeleton } from "./MusteriSkeletons";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const CustomerCadPreview = lazy(() => import("./CustomerCadPreview"));

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
  created_at: string;
  files: string[] | null;
  user_id: string | null;
}

const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;
const CAD_EXTS = ["stl", "obj", "step", "stp", "iges", "igs"];

const getDisplayStatus = (r: RFQ): string => {
  const s = r.status;
  if (!s || s === "Yeni" || s === "pending") {
    const age = Date.now() - new Date(r.created_at).getTime();
    return age > SEVEN_DAYS_MS ? "Beklemede" : "Yeni";
  }
  return s;
};

const statusColor = (s: string) => {
  switch (s) {
    case "Onaylandı": return "bg-green-500/10 text-green-600 border-green-200";
    case "Değerlendiriliyor": return "bg-blue-500/10 text-blue-600 border-blue-200";
    case "Fiyat Verildi": return "bg-cyan-500/10 text-cyan-600 border-cyan-200";
    case "Reddedildi": return "bg-red-500/10 text-red-600 border-red-200";
    case "Yeni": return "bg-indigo-500/10 text-indigo-600 border-indigo-200";
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
      .select("id, service, material, quantity, status, date, quoted_price, price_valid_until, customer_approved, rejection_reason, created_at, files, user_id")
      .order("created_at", { ascending: false });
    setRfqs((data as RFQ[]) || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchRfqs();
    const channel = supabase
      .channel("customer-rfqs-tab")
      .on("postgres_changes", { event: "*", schema: "public", table: "rfqs" }, () => fetchRfqs())
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

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

  const pending = rfqs.filter(r => {
    const ds = getDisplayStatus(r);
    return ds === "Yeni" || ds === "Beklemede" || ds === "Değerlendiriliyor";
  });
  const priced = rfqs.filter(r => r.status === "Fiyat Verildi" && !r.customer_approved);
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
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [signedUrls, setSignedUrls] = useState<Record<string, string>>({});

    const loadSignedUrls = async (rfq: RFQ) => {
      if (!rfq.files?.length || signedUrls[rfq.id]) return;
      const urls: Record<string, string> = {};
      for (const filePath of rfq.files) {
        const rawPath = filePath.replace(/^\/+/, "").replace(/^cad-uploads\//, "").split("?")[0];
        const { data } = await supabase.storage.from("cad-uploads").createSignedUrl(rawPath, 3600);
        if (data?.signedUrl) urls[filePath] = data.signedUrl;
        else {
          // Try user/rfq folder
          const baseName = rawPath.split("/").pop() || rawPath;
          const dirs = [rfq.user_id ? `${rfq.user_id}/${rfq.id}` : null, `anonymous/${rfq.id}`].filter(Boolean) as string[];
          for (const dir of dirs) {
            const { data: files } = await supabase.storage.from("cad-uploads").list(dir, { limit: 200 });
            const match = files?.find((f) => f.name === baseName || f.name.includes(baseName.replace(/^\d+_/, "")));
            if (match) {
              const { data: sd } = await supabase.storage.from("cad-uploads").createSignedUrl(`${dir}/${match.name}`, 3600);
              if (sd?.signedUrl) { urls[filePath] = sd.signedUrl; break; }
            }
          }
        }
      }
      setSignedUrls((prev) => ({ ...prev, [rfq.id]: "loaded", ...Object.fromEntries(Object.entries(urls).map(([k, v]) => [`${rfq.id}:${k}`, v])) }));
    };

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
              {items.map((r) => {
                const displayStatus = getDisplayStatus(r);
                const cadFiles = (r.files || []).filter((f) => {
                  const ext = f.split(".").pop()?.toLowerCase() || "";
                  return CAD_EXTS.includes(ext);
                });
                const isExpanded = expandedId === r.id;

                return (
                  <Fragment key={r.id}>
                    <tr className="border-b border-border/50 last:border-0">
                      <td className="py-3 pr-4 font-mono text-xs">{r.id.slice(0, 8)}</td>
                      <td className="py-3 pr-4">{r.service || "—"}</td>
                      <td className="py-3 pr-4">{r.material || "—"}</td>
                      <td className="py-3 pr-4 font-mono">{r.quantity ?? "—"}</td>
                      <td className="py-3 pr-4 font-mono font-semibold">
                        {r.quoted_price ? `₺${r.quoted_price.toLocaleString("tr-TR")}` : "Bekleniyor"}
                      </td>
                      <td className="py-3 pr-4">
                        <Badge variant="outline" className={statusColor(displayStatus)}>{displayStatus}</Badge>
                        {r.status === "Reddedildi" && r.rejection_reason && (
                          <p className="text-[10px] text-destructive mt-1 max-w-[200px]">Sebep: {r.rejection_reason}</p>
                        )}
                      </td>
                      <td className="py-3 pr-4 text-muted-foreground">{r.date || "—"}</td>
                      <td className="py-3 flex items-center gap-1.5">
                        {r.quoted_price && !r.customer_approved && r.status !== "Reddedildi" && (
                          <Button size="sm" variant="default" className="gap-1.5 text-xs h-8" disabled={approving === r.id} onClick={() => handleApprove(r.id)}>
                            {approving === r.id ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />} Onayla
                          </Button>
                        )}
                        {cadFiles.length > 0 && (
                          <Button size="sm" variant="ghost" className="h-8 gap-1 text-xs text-primary" onClick={() => {
                            if (isExpanded) { setExpandedId(null); } else { setExpandedId(r.id); loadSignedUrls(r); }
                          }}>
                            <Paperclip size={13} /> {cadFiles.length}
                            {isExpanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                          </Button>
                        )}
                      </td>
                    </tr>
                    {isExpanded && cadFiles.length > 0 && (
                      <tr>
                        <td colSpan={8} className="px-4 pb-4 pt-1">
                          <div className="space-y-2">
                            {cadFiles.map((filePath, idx) => {
                              const url = signedUrls[`${r.id}:${filePath}`];
                              const fileName = filePath.split("/").pop() || filePath;
                              return (
                                <div key={idx}>
                                  <p className="text-[11px] font-medium text-muted-foreground mb-1">{fileName}</p>
                                  {url ? (
                                    <Suspense fallback={<div className="flex justify-center py-3"><Loader2 className="w-4 h-4 animate-spin text-primary" /></div>}>
                                      <CustomerCadPreview signedUrl={url} fileName={fileName} />
                                    </Suspense>
                                  ) : (
                                    <div className="flex items-center gap-2 py-2 text-xs text-muted-foreground">
                                      <Loader2 size={14} className="animate-spin" /> URL yükleniyor…
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })}
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
          <TabsTrigger value="fiyatVerildi" className="text-xs">Fiyat Verildi ({priced.length})</TabsTrigger>
          <TabsTrigger value="onaylanan" className="text-xs">Onaylananlar ({approved.length})</TabsTrigger>
          <TabsTrigger value="reddedilen" className="text-xs">Reddedilenler ({rejected.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="bekleyen"><RfqTable items={pending} /></TabsContent>
        <TabsContent value="fiyatVerildi"><RfqTable items={priced} /></TabsContent>
        <TabsContent value="onaylanan"><RfqTable items={approved} /></TabsContent>
        <TabsContent value="reddedilen"><RfqTable items={rejected} /></TabsContent>
      </Tabs>
    </div>
  );
};

export default TekliflerimTab;
