import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Loader2, CreditCard, AlertCircle, Landmark, FileCheck, Copy, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

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

const BANK_ACCOUNTS = [
  { bank: "Ziraat Bankası", iban: "TR00 0000 0000 0000 0000 0000 01", branch: "Ankara Şubesi" },
  { bank: "İş Bankası", iban: "TR00 0000 0000 0000 0000 0000 02", branch: "OSB Şubesi" },
];

const OdemeTab = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "havale" | "cek" | null>(null);
  const [showMethodDialog, setShowMethodDialog] = useState(false);
  const [showHavaleDialog, setShowHavaleDialog] = useState(false);
  const [showCekDialog, setShowCekDialog] = useState(false);
  const [showCardDialog, setShowCardDialog] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

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

  const handlePayClick = (p: Payment) => {
    setSelectedPayment(p);
    setPaymentMethod(null);
    setShowMethodDialog(true);
  };

  const handleMethodSelect = () => {
    setShowMethodDialog(false);
    if (paymentMethod === "card") {
      setShowCardDialog(true);
    } else if (paymentMethod === "havale") {
      setShowHavaleDialog(true);
    } else if (paymentMethod === "cek") {
      setShowCekDialog(true);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text.replace(/\s/g, ""));
    setCopied(id);
    toast.success("IBAN kopyalandı");
    setTimeout(() => setCopied(null), 2000);
  };

  if (loading) return <div className="flex justify-center py-12"><Loader2 className="animate-spin text-primary" size={24} /></div>;

  const unpaid = payments.filter(p => p.payment_status !== "ödendi");
  const paid = payments.filter(p => p.payment_status === "ödendi");
  const totalUnpaid = unpaid.reduce((a, p) => a + (p.total_amount || 0), 0);
  const totalPaid = paid.reduce((a, p) => a + (p.total_amount || 0), 0);

  const isOverdue = (due: string | null) => {
    if (!due) return false;
    return new Date(due) < new Date();
  };

  return (
    <div className="space-y-6">
      {/* Payment Method Buttons - Always visible */}
      <div>
        <h3 className="text-sm font-semibold mb-3 uppercase tracking-wider text-muted-foreground">Ödeme Yöntemleri</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={() => { setSelectedPayment(null); setPaymentMethod("card"); setShowCardDialog(true); }}
            className="flex items-center gap-3 border border-border bg-background p-4 hover:border-primary/40 transition-colors text-left"
          >
            <CreditCard size={20} className="text-primary shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium">Kredi / Banka Kartı</p>
              <p className="text-xs text-muted-foreground">Visa, Mastercard, Stripe</p>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              {/* Visa */}
              <svg viewBox="0 0 48 32" className="h-6 w-auto" xmlns="http://www.w3.org/2000/svg">
                <rect width="48" height="32" rx="4" fill="#1A1F71"/>
                <path d="M19.5 21h-3l1.9-11.5h3L19.5 21zm8-11.5l-2.8 7.9-.3-1.6-1-5.3s-.1-1-1.4-1h-4.7l-.1.3s1.5.3 3.2 1.4l2.7 10.3h3.1l4.7-12h-3.1l-.3 0zm12.3 11.5h2.7l-2.4-11.5h-2.4c-1.1 0-1.3.8-1.3.8l-4.5 10.7h3.1l.6-1.7h3.8l.4 1.7zm-3.3-4l1.6-4.3.9 4.3h-2.5zM29 13.5l.4-2.5s-1.3-.5-2.6-.5c-1.4 0-4.8.6-4.8 3.6 0 2.8 3.9 2.8 3.9 4.3 0 1.4-3.5 1.2-4.6.3l-.4 2.6s1.3.6 3.3.6c2 0 4.9-.8 4.9-3.7 0-2.8-3.9-3.1-3.9-4.3 0-1.2 2.7-1 3.8-.4z" fill="white"/>
              </svg>
              {/* Mastercard */}
              <svg viewBox="0 0 48 32" className="h-6 w-auto" xmlns="http://www.w3.org/2000/svg">
                <rect width="48" height="32" rx="4" fill="#252525"/>
                <circle cx="19" cy="16" r="8" fill="#EB001B"/>
                <circle cx="29" cy="16" r="8" fill="#F79E1B"/>
                <path d="M24 10.3a8 8 0 0 1 0 11.4 8 8 0 0 1 0-11.4z" fill="#FF5F00"/>
              </svg>
              {/* Stripe */}
              <svg viewBox="0 0 48 32" className="h-6 w-auto" xmlns="http://www.w3.org/2000/svg">
                <rect width="48" height="32" rx="4" fill="#635BFF"/>
                <path d="M22.5 13.3c0-.8.7-1.1 1.8-1.1 1.6 0 3.6.5 5.2 1.4V9.2c-1.7-.7-3.5-1-5.2-1-4.3 0-7.1 2.2-7.1 6 0 5.8 8 4.9 8 7.4 0 1-.8 1.3-2 1.3-1.7 0-4-.7-5.7-1.7v4.5c1.9.8 3.9 1.2 5.7 1.2 4.4 0 7.4-2.2 7.4-6 0-6.3-8-5.2-8-7.6z" fill="white"/>
              </svg>
            </div>
          </button>
          <button
            onClick={() => { setSelectedPayment(null); setShowHavaleDialog(true); }}
            className="flex items-center gap-3 border border-border bg-background p-4 hover:border-primary/40 transition-colors text-left"
          >
            <Landmark size={20} className="text-primary shrink-0" />
            <div>
              <p className="text-sm font-medium">Havale / EFT</p>
              <p className="text-xs text-muted-foreground">Banka hesap bilgileri</p>
            </div>
          </button>
          <button
            onClick={() => { setSelectedPayment(null); setShowCekDialog(true); }}
            className="flex items-center gap-3 border border-border bg-background p-4 hover:border-primary/40 transition-colors text-left"
          >
            <FileCheck size={20} className="text-primary shrink-0" />
            <div>
              <p className="text-sm font-medium">Çek</p>
              <p className="text-xs text-muted-foreground">Çek bilgisi bildirin</p>
            </div>
          </button>
        </div>
      </div>

      {/* Summary */}
      {payments.length > 0 && (
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
      )}

      {/* Overdue warning */}
      {unpaid.some(p => isOverdue(p.due_date)) && (
        <div className="flex items-center gap-2 bg-destructive/10 border border-destructive/20 text-destructive p-3 text-sm">
          <AlertCircle size={16} />
          <span>Vadesi geçmiş ödemeniz bulunmaktadır.</span>
        </div>
      )}

      {/* Payment list or empty */}
      {payments.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-muted-foreground border border-border bg-background">
          <CreditCard size={32} className="mb-2 opacity-30" />
          <p className="text-sm font-medium">Henüz fatura kaydı bulunmuyor.</p>
          <p className="text-xs mt-1">Fatura oluşturulduğunda burada görünecektir.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs text-muted-foreground uppercase tracking-wider">
                <th className="pb-3 pr-4">Belge No</th>
                <th className="pb-3 pr-4">Açıklama</th>
                <th className="pb-3 pr-4">Fatura Tarihi</th>
                <th className="pb-3 pr-4">Vade</th>
                <th className="pb-3 pr-4 text-right">Tutar</th>
                <th className="pb-3 pr-4">Durum</th>
                <th className="pb-3">İşlem</th>
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
                  <td className="py-3 pr-4">
                    <Badge variant="outline" className={statusColor(p.payment_status)}>
                      {statusLabel(p.payment_status)}
                    </Badge>
                  </td>
                  <td className="py-3">
                    {p.payment_status !== "ödendi" ? (
                      <Button size="sm" variant="outline" onClick={() => handlePayClick(p)} className="text-xs">
                        Öde
                      </Button>
                    ) : (
                      <span className="text-xs text-muted-foreground">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* Method Selection Dialog */}
      <Dialog open={showMethodDialog} onOpenChange={setShowMethodDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Ödeme Yöntemi Seçin</DialogTitle>
            <DialogDescription>
              {selectedPayment?.doc_number || ""} — ₺{(selectedPayment?.total_amount || 0).toLocaleString("tr-TR")}
            </DialogDescription>
          </DialogHeader>
          <RadioGroup value={paymentMethod || ""} onValueChange={(v) => setPaymentMethod(v as "card" | "havale" | "cek")} className="space-y-3 mt-2">
            <label className="flex items-center gap-3 border border-border p-4 cursor-pointer hover:border-primary/40 transition-colors">
              <RadioGroupItem value="card" id="card" />
              <CreditCard size={18} className="text-primary shrink-0" />
              <div>
                <p className="text-sm font-medium">Kredi / Banka Kartı</p>
                <p className="text-xs text-muted-foreground">Visa, Mastercard — Stripe ile güvenli ödeme</p>
              </div>
            </label>
            <label className="flex items-center gap-3 border border-border p-4 cursor-pointer hover:border-primary/40 transition-colors">
              <RadioGroupItem value="havale" id="havale" />
              <Landmark size={18} className="text-primary shrink-0" />
              <div>
                <p className="text-sm font-medium">Havale / EFT</p>
                <p className="text-xs text-muted-foreground">Banka hesap bilgilerini görüntüle</p>
              </div>
            </label>
            <label className="flex items-center gap-3 border border-border p-4 cursor-pointer hover:border-primary/40 transition-colors">
              <RadioGroupItem value="cek" id="cek" />
              <FileCheck size={18} className="text-primary shrink-0" />
              <div>
                <p className="text-sm font-medium">Çek</p>
                <p className="text-xs text-muted-foreground">Çek bilgilerinizi bildirin</p>
              </div>
            </label>
          </RadioGroup>
          <Button className="w-full mt-4" disabled={!paymentMethod} onClick={handleMethodSelect}>
            Devam Et
          </Button>
        </DialogContent>
      </Dialog>

      {/* Card Payment Dialog (Stripe - placeholder) */}
      <Dialog open={showCardDialog} onOpenChange={setShowCardDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Kart ile Ödeme</DialogTitle>
            <DialogDescription>
              {selectedPayment?.doc_number || ""} — ₺{(selectedPayment?.total_amount || 0).toLocaleString("tr-TR")}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 border border-border p-3">
              <AlertCircle size={14} />
              <span>Stripe entegrasyonu yakında aktif olacaktır. Şu an için havale veya çek ile ödeme yapabilirsiniz.</span>
            </div>
            <div className="flex items-center gap-3">
              {/* Visa */}
              <svg viewBox="0 0 48 32" className="h-8" xmlns="http://www.w3.org/2000/svg">
                <rect width="48" height="32" rx="4" fill="#1A1F71"/>
                <path d="M19.5 21h-3l1.9-11.5h3L19.5 21zm8-11.5l-2.8 7.9-.3-1.6-1-5.3s-.1-1-1.4-1h-4.7l-.1.3s1.5.3 3.2 1.4l2.7 10.3h3.1l4.7-12h-3.1l-.3 0zm12.3 11.5h2.7l-2.4-11.5h-2.4c-1.1 0-1.3.8-1.3.8l-4.5 10.7h3.1l.6-1.7h3.8l.4 1.7zm-3.3-4l1.6-4.3.9 4.3h-2.5zM29 13.5l.4-2.5s-1.3-.5-2.6-.5c-1.4 0-4.8.6-4.8 3.6 0 2.8 3.9 2.8 3.9 4.3 0 1.4-3.5 1.2-4.6.3l-.4 2.6s1.3.6 3.3.6c2 0 4.9-.8 4.9-3.7 0-2.8-3.9-3.1-3.9-4.3 0-1.2 2.7-1 3.8-.4z" fill="white"/>
              </svg>
              {/* Mastercard */}
              <svg viewBox="0 0 48 32" className="h-8" xmlns="http://www.w3.org/2000/svg">
                <rect width="48" height="32" rx="4" fill="#252525"/>
                <circle cx="19" cy="16" r="8" fill="#EB001B"/>
                <circle cx="29" cy="16" r="8" fill="#F79E1B"/>
                <path d="M24 10.3a8 8 0 0 1 0 11.4 8 8 0 0 1 0-11.4z" fill="#FF5F00"/>
              </svg>
              {/* Stripe */}
              <svg viewBox="0 0 48 32" className="h-8" xmlns="http://www.w3.org/2000/svg">
                <rect width="48" height="32" rx="4" fill="#635BFF"/>
                <path d="M22.5 13.3c0-.8.7-1.1 1.8-1.1 1.6 0 3.6.5 5.2 1.4V9.2c-1.7-.7-3.5-1-5.2-1-4.3 0-7.1 2.2-7.1 6 0 5.8 8 4.9 8 7.4 0 1-.8 1.3-2 1.3-1.7 0-4-.7-5.7-1.7v4.5c1.9.8 3.9 1.2 5.7 1.2 4.4 0 7.4-2.2 7.4-6 0-6.3-8-5.2-8-7.6z" fill="white"/>
              </svg>
            </div>
            <Button variant="outline" className="w-full" onClick={() => { setShowCardDialog(false); setShowMethodDialog(true); }}>
              Geri Dön
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Havale/EFT Dialog */}
      <Dialog open={showHavaleDialog} onOpenChange={setShowHavaleDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Havale / EFT Bilgileri</DialogTitle>
            <DialogDescription>
              Aşağıdaki hesaplardan birine ödemenizi yapabilirsiniz. Açıklama kısmına fatura numaranızı eklemeyi unutmayın.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div className="bg-muted/30 border border-border p-3 text-sm">
              <span className="font-medium">Fatura:</span> {selectedPayment?.doc_number || selectedPayment?.id.slice(0, 8)} — <span className="font-mono font-semibold">₺{(selectedPayment?.total_amount || 0).toLocaleString("tr-TR")}</span>
            </div>
            {BANK_ACCOUNTS.map((acc, i) => (
              <div key={i} className="border border-border p-4 space-y-2">
                <p className="font-semibold text-sm">{acc.bank}</p>
                <p className="text-xs text-muted-foreground">{acc.branch}</p>
                <div className="flex items-center gap-2">
                  <code className="text-xs bg-muted px-2 py-1 flex-1 font-mono">{acc.iban}</code>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => copyToClipboard(acc.iban, `iban-${i}`)}>
                    {copied === `iban-${i}` ? <CheckCircle2 size={14} className="text-green-600" /> : <Copy size={14} />}
                  </Button>
                </div>
              </div>
            ))}
            <p className="text-xs text-muted-foreground">Havale yaptıktan sonra dekontunuzu Destek sekmesinden iletebilirsiniz.</p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Çek Dialog */}
      <Dialog open={showCekDialog} onOpenChange={setShowCekDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Çek ile Ödeme</DialogTitle>
            <DialogDescription>
              Çek bilgilerinizi aşağıya girin. Ekibimiz en kısa sürede sizinle iletişime geçecektir.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div className="bg-muted/30 border border-border p-3 text-sm">
              <span className="font-medium">Fatura:</span> {selectedPayment?.doc_number || selectedPayment?.id.slice(0, 8)} — <span className="font-mono font-semibold">₺{(selectedPayment?.total_amount || 0).toLocaleString("tr-TR")}</span>
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Çek Numarası</Label>
              <Input placeholder="Çek seri numarası" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Banka</Label>
              <Input placeholder="Çeki düzenleyen banka" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Vade Tarihi</Label>
              <Input type="date" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Tutar (₺)</Label>
              <Input type="number" defaultValue={selectedPayment?.total_amount || 0} />
            </div>
            <Button className="w-full" onClick={() => { setShowCekDialog(false); toast.success("Çek bilgileriniz iletildi. Ekibimiz sizinle iletişime geçecektir."); }}>
              Çek Bilgilerini Gönder
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OdemeTab;
