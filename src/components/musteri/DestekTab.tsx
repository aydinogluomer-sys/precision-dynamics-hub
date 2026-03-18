import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, MessageSquare, Plus, Send, ChevronDown, ChevronUp } from "lucide-react";
import { TicketSkeleton } from "./MusteriSkeletons";
import { toast } from "sonner";

interface Ticket {
  id: string;
  subject: string;
  message: string;
  status: string | null;
  priority: string | null;
  order_id: string | null;
  created_at: string;
}

interface Message {
  id: string;
  message: string;
  is_staff: boolean | null;
  created_at: string;
}

const PAGE_SIZE = 20;

const statusColor = (s: string | null) => {
  switch (s) {
    case "open": return "bg-amber-500/10 text-amber-600 border-amber-200";
    case "in_progress": case "in-progress": return "bg-blue-500/10 text-blue-600 border-blue-200";
    case "resolved": return "bg-green-500/10 text-green-600 border-green-200";
    case "closed": return "bg-muted text-muted-foreground";
    default: return "bg-muted text-muted-foreground";
  }
};

const statusLabel = (s: string | null) => {
  switch (s) {
    case "open": return "Açık";
    case "in_progress": case "in-progress": return "İşlemde";
    case "resolved": return "Çözüldü";
    case "closed": return "Kapalı";
    default: return s || "—";
  }
};

const DestekTab = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ subject: "", message: "" });
  const [expandedTicket, setExpandedTicket] = useState<string | null>(null);
  const [messages, setMessages] = useState<Record<string, Message[]>>({});
  const [reply, setReply] = useState("");
  const [sendingReply, setSendingReply] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchTickets = useCallback(async (pageNum: number, append: boolean) => {
    const from = pageNum * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    const { data } = await supabase
      .from("support_tickets")
      .select("id, subject, message, status, priority, order_id, created_at")
      .order("created_at", { ascending: false })
      .range(from, to);
    const newItems = (data as Ticket[]) || [];
    setHasMore(newItems.length === PAGE_SIZE);
    if (append) setTickets(prev => [...prev, ...newItems]);
    else setTickets(newItems);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchTickets(0, false);

    const ticketChannel = supabase
      .channel("customer-tickets-realtime")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "support_tickets" }, (payload) => {
        setTickets(prev => [payload.new as Ticket, ...prev]);
      })
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "support_tickets" }, (payload) => {
        const updated = payload.new as Ticket;
        setTickets(prev => prev.map(t => t.id === updated.id ? updated : t));
      })
      .on("postgres_changes", { event: "DELETE", schema: "public", table: "support_tickets" }, (payload) => {
        const deleted = payload.old as { id: string };
        setTickets(prev => prev.filter(t => t.id !== deleted.id));
      })
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "support_messages" }, (payload) => {
        const newMsg = payload.new as { id: string; message: string; is_staff: boolean | null; created_at: string; ticket_id: string };
        if (newMsg.ticket_id) {
          setMessages(prev => ({
            ...prev,
            [newMsg.ticket_id]: [...(prev[newMsg.ticket_id] || []), {
              id: newMsg.id,
              message: newMsg.message,
              is_staff: newMsg.is_staff,
              created_at: newMsg.created_at,
            }],
          }));
        }
      })
      .subscribe();

    return () => { supabase.removeChannel(ticketChannel); };
  }, [fetchTickets]);

  const loadMore = async () => {
    setLoadingMore(true);
    const nextPage = page + 1;
    setPage(nextPage);
    await fetchTickets(nextPage, true);
    setLoadingMore(false);
  };

  const handleSubmit = async () => {
    if (!form.subject.trim() || !form.message.trim()) { toast.error("Konu ve mesaj zorunludur."); return; }
    setSubmitting(true);
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { toast.error("Oturum bulunamadı."); setSubmitting(false); return; }

    const { error } = await supabase.from("support_tickets").insert({
      user_id: session.user.id,
      subject: form.subject,
      message: form.message,
    });
    if (error) { toast.error("Talep oluşturulamadı."); } else {
      toast.success("Destek talebi oluşturuldu!");
      setForm({ subject: "", message: "" });
      setShowForm(false);
    }
    setSubmitting(false);
  };

  const loadMessages = async (ticketId: string) => {
    if (expandedTicket === ticketId) { setExpandedTicket(null); return; }
    setExpandedTicket(ticketId);
    const { data } = await supabase
      .from("support_messages")
      .select("id, message, is_staff, created_at")
      .eq("ticket_id", ticketId)
      .order("created_at", { ascending: true });
    setMessages(prev => ({ ...prev, [ticketId]: (data as Message[]) || [] }));
  };

  const handleReply = async (ticketId: string) => {
    if (!reply.trim()) return;
    setSendingReply(true);
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { toast.error("Oturum bulunamadı."); setSendingReply(false); return; }

    const { error } = await supabase.from("support_messages").insert({
      ticket_id: ticketId,
      user_id: session.user.id,
      message: reply,
      is_staff: false,
    });
    if (error) { toast.error("Mesaj gönderilemedi."); } else {
      setReply("");
    }
    setSendingReply(false);
  };

  if (loading) return <TicketSkeleton count={3} />;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-sm">Destek Talepleri</h3>
        <Button size="sm" variant={showForm ? "secondary" : "outline"} className="gap-2 text-xs" onClick={() => setShowForm(!showForm)}>
          <Plus size={14} /> Yeni Talep
        </Button>
      </div>

      {showForm && (
        <div className="border border-border p-4 bg-background space-y-3">
          <Input placeholder="Konu" value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} />
          <Textarea placeholder="Mesajınız..." value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} rows={4} />
          <div className="flex justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={() => setShowForm(false)}>İptal</Button>
            <Button size="sm" disabled={submitting} onClick={handleSubmit} className="gap-2">
              {submitting ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />} Gönder
            </Button>
          </div>
        </div>
      )}

      {tickets.length === 0 && !showForm ? (
        <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
          <MessageSquare size={40} className="mb-3 opacity-30" />
          <p className="text-sm font-medium">Henüz destek talebiniz bulunmuyor.</p>
          <p className="text-xs mt-1">Teknik sorularınız veya sorunlarınız için destek talebi oluşturun.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {tickets.map((t) => (
            <div key={t.id} className="border border-border bg-background">
              <button
                className="w-full flex items-center gap-4 p-4 text-left hover:bg-muted/30 transition-colors"
                onClick={() => loadMessages(t.id)}
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{t.subject}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{t.message}</p>
                </div>
                <Badge variant="outline" className={statusColor(t.status)}>{statusLabel(t.status)}</Badge>
                <span className="text-[10px] text-muted-foreground whitespace-nowrap">{new Date(t.created_at).toLocaleDateString("tr-TR")}</span>
                {expandedTicket === t.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>

              {expandedTicket === t.id && (
                <div className="border-t border-border p-4 space-y-3">
                  <div className="bg-muted/30 p-3 text-sm">{t.message}</div>

                  {(messages[t.id] || []).map(m => (
                    <div key={m.id} className={`p-3 text-sm ${m.is_staff ? "bg-primary/5 border-l-2 border-primary" : "bg-muted/20"}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                          {m.is_staff ? "MAS Technic" : "Siz"}
                        </span>
                        <span className="text-[10px] text-muted-foreground">{new Date(m.created_at).toLocaleString("tr-TR")}</span>
                      </div>
                      <p>{m.message}</p>
                    </div>
                  ))}

                  {t.status !== "closed" && t.status !== "resolved" && (
                    <div className="flex gap-2">
                      <Input
                        placeholder="Yanıtınızı yazın..."
                        value={reply}
                        onChange={e => setReply(e.target.value)}
                        onKeyDown={e => e.key === "Enter" && handleReply(t.id)}
                      />
                      <Button size="sm" disabled={sendingReply} onClick={() => handleReply(t.id)}>
                        {sendingReply ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
          {hasMore && tickets.length > 0 && (
            <div className="flex justify-center pt-4">
              <Button variant="outline" size="sm" disabled={loadingMore} onClick={loadMore}>
                {loadingMore ? <Loader2 size={14} className="animate-spin" /> : "Daha Fazla Yükle"}
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DestekTab;
