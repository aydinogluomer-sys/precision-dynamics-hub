import * as XLSX from "xlsx";
import { supabase } from "@/integrations/supabase/client";

type ColDef = { key: string; label: string; num?: boolean; date?: boolean };

const fmtDate = (v: any) => (v ? String(v).split("T")[0] : "");

/* ── Pivot helper: group rows by a key, count or sum ── */
function pivot(
  rows: Record<string, any>[],
  groupKey: string,
  valueKey?: string
): { label: string; count: number; total: number }[] {
  const map: Record<string, { count: number; total: number }> = {};
  rows.forEach((r) => {
    const k = String(r[groupKey] || "Belirsiz");
    if (!map[k]) map[k] = { count: 0, total: 0 };
    map[k].count++;
    if (valueKey) map[k].total += Number(r[valueKey]) || 0;
  });
  return Object.entries(map).map(([label, v]) => ({ label, ...v }));
}

/* ── Build a data sheet with auto-filter & column widths ── */
function buildSheet(rows: Record<string, any>[], cols: ColDef[]): XLSX.WorkSheet {
  const header = cols.map((c) => c.label);
  const data = rows.map((r) =>
    cols.map((c) => {
      const raw = r[c.key];
      if (c.date) return fmtDate(raw);
      if (c.num) return raw != null ? Number(raw) : "";
      return raw ?? "";
    })
  );
  const ws = XLSX.utils.aoa_to_sheet([header, ...data]);
  // Auto-filter
  ws["!autofilter"] = { ref: XLSX.utils.encode_range({ s: { r: 0, c: 0 }, e: { r: data.length, c: cols.length - 1 } }) };
  // Column widths
  ws["!cols"] = cols.map((c) => ({ wch: Math.max(c.label.length + 2, c.num ? 14 : c.date ? 12 : 20) }));
  return ws;
}

/* ── KPI card row for dashboard sheet ── */
function kpiRow(category: string, metric: string, value: number | string) {
  return [category, metric, value];
}

/* ── MAIN EXPORT ── */
export async function exportExcelReport(activeTab: string) {
  const now = new Date().toISOString().split("T")[0];
  const wb = XLSX.utils.book_new();

  const tabTR: Record<string, string> = {
    dashboard: "Genel Özet",
    rfq: "Talepler",
    orders: "Siparişler",
    wbs: "İş Akışı",
    scheduling: "Planlama",
    financial: "Finansal",
    pipeline: "Pipeline",
    tpm: "TPM & Bakım",
    inventory: "Envanter",
    financedocs: "Nakit Akışı",
    issues: "Olaylar",
    customers: "Çözüm Ortakları",
    support: "Destek",
  };

  /* ════════════════════════════════════════════
     DASHBOARD — multi-sheet professional report
     ════════════════════════════════════════════ */
  if (activeTab === "dashboard") {
    const [rfqAll, ordersAll, issuesAll, finAll, custAll, pipeAll, maintAll, schedAll, rawMatAll, toolAll, supportAll, wbsAll, meetAll] = await Promise.all([
      supabase.from("rfqs").select("*"),
      supabase.from("orders").select("*"),
      supabase.from("issues").select("*"),
      supabase.from("financial_documents").select("*"),
      supabase.from("customers").select("*"),
      supabase.from("pipeline_leads").select("*"),
      supabase.from("maintenance_logs").select("*"),
      supabase.from("machine_schedule").select("*"),
      supabase.from("raw_materials").select("*"),
      supabase.from("tool_inventory").select("*"),
      supabase.from("support_tickets").select("*"),
      supabase.from("wbs").select("*"),
      supabase.from("meetings").select("*"),
    ]);

    const rfqs = rfqAll.data || [];
    const orders = ordersAll.data || [];
    const issues = issuesAll.data || [];
    const fins = finAll.data || [];
    const custs = custAll.data || [];
    const pipes = pipeAll.data || [];
    const maints = maintAll.data || [];
    const scheds = schedAll.data || [];
    const raws = rawMatAll.data || [];
    const tools = toolAll.data || [];
    const tickets = supportAll.data || [];
    const wbsItems = wbsAll.data || [];
    const meetings = meetAll.data || [];

    // ── SHEET 1: İÇİNDEKİLER (Table of Contents) ──
    const tocData = [
      ["MAS TECHNİC — YÖNETİM RAPORU"],
      [`Rapor Tarihi: ${new Date().toLocaleString("tr-TR", { dateStyle: "long", timeStyle: "short" })}`],
      [""],
      ["Sayfa No", "Sayfa Adı", "Açıklama"],
      [1, "İçindekiler", "Bu sayfa"],
      [2, "Dashboard KPI", "Tüm modüllerin özet metrikleri"],
      [3, "RFQ Pivot", "Talep durumlarına göre dağılım"],
      [4, "Sipariş Pivot", "Sipariş durumlarına göre dağılım"],
      [5, "Finansal Özet", "Gelir, gider, KDV analizi"],
      [6, "Pipeline Pivot", "Satış aşamalarına göre dağılım"],
      [7, "Sorunlar Pivot", "Ciddiyet dağılımı"],
      [8, "Bakım Pivot", "Bakım türlerine göre dağılım"],
      [9, "Envanter Özet", "Hammadde & takım stok durumu"],
      [10, "WBS Pivot", "İş akışı durum dağılımı"],
      [11, "Destek & Toplantı", "Destek talepleri ve toplantı özeti"],
      [12, "Talepler (Ham)", "Tüm RFQ verileri"],
      [13, "Siparişler (Ham)", "Tüm sipariş verileri"],
      [14, "Müşteriler (Ham)", "Tüm müşteri verileri"],
    ];
    const wsToc = XLSX.utils.aoa_to_sheet(tocData);
    wsToc["!cols"] = [{ wch: 10 }, { wch: 22 }, { wch: 42 }];
    wsToc["!merges"] = [
      { s: { r: 0, c: 0 }, e: { r: 0, c: 2 } },
      { s: { r: 1, c: 0 }, e: { r: 1, c: 2 } },
    ];
    XLSX.utils.book_append_sheet(wb, wsToc, "İçindekiler");

    // ── SHEET 2: DASHBOARD KPI ──
    const avgProgress = orders.length ? Math.round(orders.reduce((s, o) => s + (o.progress || 0), 0) / orders.length) : 0;
    const overdueOrders = orders.filter((o) => o.deadline && new Date(o.deadline) < new Date() && o.status !== "Tamamlandı").length;
    const totalIncome = fins.filter((f) => f.doc_type === "fatura" || f.doc_type === "gelir").reduce((s, f) => s + (Number(f.total_amount) || 0), 0);
    const totalExpense = fins.filter((f) => f.doc_type === "gider" || f.doc_type === "masraf").reduce((s, f) => s + (Number(f.total_amount) || 0), 0);
    const totalVat = fins.reduce((s, f) => s + (Number(f.vat_amount) || 0), 0);
    const unpaidDocs = fins.filter((f) => f.payment_status === "ödenmedi").length;
    const totalPipeValue = pipes.reduce((s, p) => s + (Number(p.value) || 0), 0);
    const weightedPipe = pipes.reduce((s, p) => s + (Number(p.value) || 0) * ((p.probability || 0) / 100), 0);
    const openIssues = issues.filter((i) => i.status === "Açık").length;
    const issueCost = issues.reduce((s, i) => s + (Number(i.cost) || 0), 0);
    const maintCost = maints.reduce((s, m) => s + (Number(m.cost) || 0), 0);
    const rawValue = raws.reduce((s, r) => s + (Number(r.stock) || 0) * (Number(r.unit_cost) || 0), 0);
    const toolValue = tools.reduce((s, t) => s + (Number(t.stock) || 0) * (Number(t.unit_cost) || 0), 0);
    const lowStockTools = tools.filter((t) => (t.stock || 0) <= (t.min_stock || 5)).length;
    const openTickets = tickets.filter((t) => t.status === "open").length;
    const closedTickets = tickets.filter((t) => t.status === "closed" || t.status === "resolved").length;
    const totalBalance = custs.reduce((s, c) => s + (Number(c.balance) || 0), 0);
    const pendingMeetings = meetings.filter((m) => m.status === "pending").length;
    const confirmedMeetings = meetings.filter((m) => m.status === "confirmed").length;
    const totalQuoted = rfqs.reduce((s, r) => s + (Number(r.quoted_price) || 0), 0);

    const kpiData = [
      ["DASHBOARD — KPI TABLOSU"],
      [""],
      ["Kategori", "Metrik", "Değer"],
      ...([
        kpiRow("Genel", "Toplam RFQ Talebi", rfqs.length),
        kpiRow("Genel", "Toplam Sipariş", orders.length),
        kpiRow("Genel", "Toplam Müşteri", custs.length),
        kpiRow("Genel", "Açık Sorun", openIssues),
        kpiRow("Genel", "Açık Destek Talebi", openTickets),
        ["", "", ""],
        kpiRow("RFQ", "Toplam Teklif Tutarı (₺)", totalQuoted),
        ["", "", ""],
        kpiRow("Sipariş", "Ortalama İlerleme (%)", avgProgress),
        kpiRow("Sipariş", "Geciken Sipariş", overdueOrders),
        ["", "", ""],
        kpiRow("Finansal", "Toplam Gelir (₺)", totalIncome),
        kpiRow("Finansal", "Toplam Gider (₺)", totalExpense),
        kpiRow("Finansal", "Net (₺)", totalIncome - totalExpense),
        kpiRow("Finansal", "Toplam KDV (₺)", Math.round(totalVat * 100) / 100),
        kpiRow("Finansal", "Ödenmemiş Belge", unpaidDocs),
        ["", "", ""],
        kpiRow("Pipeline", "Toplam Değer (₺)", totalPipeValue),
        kpiRow("Pipeline", "Ağırlıklı Değer (₺)", Math.round(weightedPipe)),
        ["", "", ""],
        kpiRow("Sorunlar", "Toplam Sorun", issues.length),
        kpiRow("Sorunlar", "Toplam Maliyet (₺)", issueCost),
        ["", "", ""],
        kpiRow("Bakım", "Toplam Kayıt", maints.length),
        kpiRow("Bakım", "Toplam Maliyet (₺)", maintCost),
        ["", "", ""],
        kpiRow("Envanter", "Hammadde Çeşidi", raws.length),
        kpiRow("Envanter", "Hammadde Toplam Değer (₺)", Math.round(rawValue)),
        kpiRow("Envanter", "Takım Çeşidi", tools.length),
        kpiRow("Envanter", "Takım Toplam Değer (₺)", Math.round(toolValue)),
        kpiRow("Envanter", "Kritik Stok Takım", lowStockTools),
        ["", "", ""],
        kpiRow("İş Akışı", "Toplam WBS Kaydı", wbsItems.length),
        ["", "", ""],
        kpiRow("Destek", "Toplam Talep", tickets.length),
        kpiRow("Destek", "Açık Talep", openTickets),
        kpiRow("Destek", "Çözülen Talep", closedTickets),
        ["", "", ""],
        kpiRow("Toplantı", "Toplam Toplantı", meetings.length),
        kpiRow("Toplantı", "Bekleyen", pendingMeetings),
        kpiRow("Toplantı", "Onaylanan", confirmedMeetings),
        ["", "", ""],
        kpiRow("Müşteri", "Toplam Bakiye (₺)", Math.round(totalBalance)),
        kpiRow("Planlama", "Aktif Çizelge Kaydı", scheds.length),
      ] as any[]),
    ];
    const wsKpi = XLSX.utils.aoa_to_sheet(kpiData);
    wsKpi["!cols"] = [{ wch: 14 }, { wch: 32 }, { wch: 18 }];
    wsKpi["!merges"] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 2 } }];
    XLSX.utils.book_append_sheet(wb, wsKpi, "Dashboard KPI");

    // ── PIVOT SHEETS ──
    const addPivotSheet = (name: string, data: { label: string; count: number; total: number }[], showTotal: boolean, totalLabel: string) => {
      const headers = showTotal ? ["Durum / Tür", "Adet", totalLabel] : ["Durum / Tür", "Adet"];
      const rows = data.map((d) => showTotal ? [d.label, d.count, d.total] : [d.label, d.count]);
      const sumRow = showTotal
        ? ["TOPLAM", data.reduce((s, d) => s + d.count, 0), data.reduce((s, d) => s + d.total, 0)]
        : ["TOPLAM", data.reduce((s, d) => s + d.count, 0)];
      const ws = XLSX.utils.aoa_to_sheet([headers, ...rows, [], sumRow]);
      ws["!cols"] = [{ wch: 22 }, { wch: 10 }, ...(showTotal ? [{ wch: 18 }] : [])];
      XLSX.utils.book_append_sheet(wb, ws, name);
    };

    addPivotSheet("RFQ Pivot", pivot(rfqs, "status", "quoted_price"), true, "Tutar (₺)");
    addPivotSheet("Sipariş Pivot", pivot(orders, "status"), false, "");
    
    // Finansal Özet pivot
    const finPivot = pivot(fins, "doc_type", "total_amount");
    addPivotSheet("Finansal Özet", finPivot, true, "Toplam (₺)");

    const pipePivot = pivot(pipes, "stage", "value");
    addPivotSheet("Pipeline Pivot", pipePivot, true, "Değer (₺)");

    addPivotSheet("Sorunlar Pivot", pivot(issues, "severity", "cost"), true, "Maliyet (₺)");
    addPivotSheet("Bakım Pivot", pivot(maints, "type", "cost"), true, "Maliyet (₺)");

    // Envanter özet
    const envData = [
      ["HAMMADDE STOK DURUMU"],
      [""],
      ["Kod", "Ad", "Stok", "Birim Fiyat (₺)", "Toplam Değer (₺)", "Birim"],
      ...raws.map((r) => [r.code, r.name, r.stock || 0, Number(r.unit_cost) || 0, (r.stock || 0) * (Number(r.unit_cost) || 0), r.unit || ""]),
      [],
      ["TOPLAM", "", raws.reduce((s, r) => s + (r.stock || 0), 0), "", Math.round(rawValue), ""],
      [],
      ["TAKIM STOK DURUMU"],
      [""],
      ["Kod", "Ad", "Stok", "Min Stok", "Birim Fiyat (₺)", "Durum"],
      ...tools.map((t) => [t.code, t.name, t.stock || 0, t.min_stock || 5, Number(t.unit_cost) || 0, (t.stock || 0) <= (t.min_stock || 5) ? "⚠ KRİTİK" : "✓ Normal"]),
      [],
      ["TOPLAM", "", tools.reduce((s, t) => s + (t.stock || 0), 0), "", Math.round(toolValue), ""],
    ];
    const wsEnv = XLSX.utils.aoa_to_sheet(envData);
    wsEnv["!cols"] = [{ wch: 14 }, { wch: 26 }, { wch: 10 }, { wch: 14 }, { wch: 18 }, { wch: 14 }];
    wsEnv["!merges"] = [
      { s: { r: 0, c: 0 }, e: { r: 0, c: 5 } },
      { s: { r: raws.length + 4, c: 0 }, e: { r: raws.length + 4, c: 5 } },
    ];
    XLSX.utils.book_append_sheet(wb, wsEnv, "Envanter Özet");

    // WBS Pivot
    addPivotSheet("WBS Pivot", pivot(wbsItems, "status"), false, "");

    // Destek & Toplantı
    const destekData = [
      ["DESTEK & TOPLANTI ÖZETİ"],
      [""],
      ["Destek Metrikleri", "Değer"],
      ["Toplam Talep", tickets.length],
      ["Açık", openTickets],
      ["Çözülen", closedTickets],
      [],
      ["Toplantı Metrikleri", "Değer"],
      ["Toplam", meetings.length],
      ["Bekleyen", pendingMeetings],
      ["Onaylanan", confirmedMeetings],
    ];
    const wsDestek = XLSX.utils.aoa_to_sheet(destekData);
    wsDestek["!cols"] = [{ wch: 24 }, { wch: 14 }];
    wsDestek["!merges"] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 1 } }];
    XLSX.utils.book_append_sheet(wb, wsDestek, "Destek & Toplantı");

    // ── RAW DATA SHEETS ──
    XLSX.utils.book_append_sheet(wb, buildSheet(rfqs, [
      { key: "id", label: "ID" }, { key: "customer", label: "Müşteri" }, { key: "company", label: "Firma" },
      { key: "material", label: "Malzeme" }, { key: "service", label: "Hizmet" },
      { key: "quantity", label: "Miktar", num: true }, { key: "status", label: "Durum" },
      { key: "date", label: "Tarih", date: true }, { key: "quoted_price", label: "Fiyat (₺)", num: true },
    ]), "Talepler (Ham)");

    XLSX.utils.book_append_sheet(wb, buildSheet(orders, [
      { key: "id", label: "ID" }, { key: "part_name", label: "Parça" }, { key: "customer", label: "Müşteri" },
      { key: "quantity", label: "Miktar", num: true }, { key: "status", label: "Durum" },
      { key: "progress", label: "İlerleme (%)", num: true }, { key: "machine", label: "Makine" },
      { key: "deadline", label: "Termin", date: true },
    ]), "Siparişler (Ham)");

    XLSX.utils.book_append_sheet(wb, buildSheet(custs, [
      { key: "name", label: "Ad" }, { key: "company", label: "Firma" }, { key: "city", label: "Şehir" },
      { key: "phone", label: "Telefon" }, { key: "email", label: "Email" },
      { key: "balance", label: "Bakiye (₺)", num: true },
    ]), "Müşteriler (Ham)");

  } else {
    /* ════════════════════════════════════════════
       SINGLE-TAB EXPORT — data sheet + pivot
       ════════════════════════════════════════════ */
    switch (activeTab) {
      case "rfq": {
        const { data } = await supabase.from("rfqs").select("*").order("created_at", { ascending: false });
        const rows = data || [];
        XLSX.utils.book_append_sheet(wb, buildSheet(rows, [
          { key: "id", label: "ID" }, { key: "customer", label: "Müşteri" }, { key: "company", label: "Firma" },
          { key: "material", label: "Malzeme" }, { key: "service", label: "Hizmet" },
          { key: "quantity", label: "Miktar", num: true }, { key: "status", label: "Durum" },
          { key: "date", label: "Tarih", date: true }, { key: "quoted_price", label: "Fiyat (₺)", num: true },
        ]), "Talepler");
        // Pivot: status
        const pv = pivot(rows, "status", "quoted_price");
        const pvWs = XLSX.utils.aoa_to_sheet([
          ["Durum", "Adet", "Toplam Tutar (₺)"],
          ...pv.map((p) => [p.label, p.count, p.total]),
          [], ["TOPLAM", pv.reduce((s, p) => s + p.count, 0), pv.reduce((s, p) => s + p.total, 0)],
        ]);
        pvWs["!cols"] = [{ wch: 20 }, { wch: 10 }, { wch: 18 }];
        XLSX.utils.book_append_sheet(wb, pvWs, "Durum Pivot");
        break;
      }
      case "orders": {
        const { data } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
        const rows = data || [];
        XLSX.utils.book_append_sheet(wb, buildSheet(rows, [
          { key: "id", label: "ID" }, { key: "part_name", label: "Parça" }, { key: "customer", label: "Müşteri" },
          { key: "quantity", label: "Miktar", num: true }, { key: "status", label: "Durum" },
          { key: "progress", label: "İlerleme (%)", num: true }, { key: "machine", label: "Makine" },
          { key: "deadline", label: "Termin", date: true },
        ]), "Siparişler");
        const pv = pivot(rows, "status");
        const pvWs = XLSX.utils.aoa_to_sheet([["Durum", "Adet"], ...pv.map((p) => [p.label, p.count]), [], ["TOPLAM", pv.reduce((s, p) => s + p.count, 0)]]);
        pvWs["!cols"] = [{ wch: 20 }, { wch: 10 }];
        XLSX.utils.book_append_sheet(wb, pvWs, "Durum Pivot");
        break;
      }
      case "wbs": {
        const { data } = await supabase.from("wbs").select("*").order("created_at", { ascending: false });
        XLSX.utils.book_append_sheet(wb, buildSheet(data || [], [
          { key: "id", label: "ID" }, { key: "order_id", label: "Sipariş" }, { key: "part_name", label: "Parça" },
          { key: "customer", label: "Müşteri" }, { key: "current_step", label: "Adım", num: true },
          { key: "status", label: "Durum" }, { key: "deadline", label: "Termin", date: true },
        ]), "İş Akışı");
        break;
      }
      case "scheduling": {
        const { data } = await supabase.from("machine_schedule").select("*").order("week_start", { ascending: false });
        const rows = data || [];
        XLSX.utils.book_append_sheet(wb, buildSheet(rows, [
          { key: "machine", label: "Makine" }, { key: "day", label: "Gün" },
          { key: "week_start", label: "Hafta Başı", date: true }, { key: "job_name", label: "İş Adı" },
          { key: "hours", label: "Saat", num: true },
        ]), "Planlama");
        // Pivot by machine
        const pv = pivot(rows, "machine", "hours");
        const pvWs = XLSX.utils.aoa_to_sheet([["Makine", "İş Sayısı", "Toplam Saat"], ...pv.map((p) => [p.label, p.count, p.total]), [], ["TOPLAM", pv.reduce((s, p) => s + p.count, 0), pv.reduce((s, p) => s + p.total, 0)]]);
        pvWs["!cols"] = [{ wch: 22 }, { wch: 12 }, { wch: 14 }];
        XLSX.utils.book_append_sheet(wb, pvWs, "Makine Pivot");
        break;
      }
      case "financial": {
        const { data } = await supabase.from("financial_documents").select("*").order("created_at", { ascending: false });
        const rows = data || [];
        XLSX.utils.book_append_sheet(wb, buildSheet(rows, [
          { key: "doc_number", label: "Belge No" }, { key: "doc_type", label: "Tür" },
          { key: "title", label: "Başlık" }, { key: "amount", label: "Tutar (₺)", num: true },
          { key: "vat_amount", label: "KDV (₺)", num: true }, { key: "total_amount", label: "Toplam (₺)", num: true },
          { key: "payment_status", label: "Ödeme Durumu" }, { key: "due_date", label: "Vade", date: true },
        ]), "Finansal");
        // Pivot by type
        const pv = pivot(rows, "doc_type", "total_amount");
        const pvWs = XLSX.utils.aoa_to_sheet([["Tür", "Adet", "Toplam (₺)"], ...pv.map((p) => [p.label, p.count, p.total]), [], ["TOPLAM", pv.reduce((s, p) => s + p.count, 0), pv.reduce((s, p) => s + p.total, 0)]]);
        pvWs["!cols"] = [{ wch: 20 }, { wch: 10 }, { wch: 18 }];
        XLSX.utils.book_append_sheet(wb, pvWs, "Tür Pivot");
        // Pivot by payment status
        const pv2 = pivot(rows, "payment_status", "total_amount");
        const pvWs2 = XLSX.utils.aoa_to_sheet([["Ödeme Durumu", "Adet", "Toplam (₺)"], ...pv2.map((p) => [p.label, p.count, p.total]), [], ["TOPLAM", pv2.reduce((s, p) => s + p.count, 0), pv2.reduce((s, p) => s + p.total, 0)]]);
        pvWs2["!cols"] = [{ wch: 20 }, { wch: 10 }, { wch: 18 }];
        XLSX.utils.book_append_sheet(wb, pvWs2, "Ödeme Pivot");
        break;
      }
      case "pipeline": {
        const { data } = await supabase.from("pipeline_leads").select("*").order("created_at", { ascending: false });
        const rows = data || [];
        XLSX.utils.book_append_sheet(wb, buildSheet(rows, [
          { key: "company", label: "Firma" }, { key: "contact_name", label: "Kişi" },
          { key: "stage", label: "Aşama" }, { key: "value", label: "Değer (₺)", num: true },
          { key: "probability", label: "Olasılık (%)", num: true },
        ]), "Pipeline");
        const pv = pivot(rows, "stage", "value");
        const pvWs = XLSX.utils.aoa_to_sheet([["Aşama", "Adet", "Toplam Değer (₺)"], ...pv.map((p) => [p.label, p.count, p.total]), [], ["TOPLAM", pv.reduce((s, p) => s + p.count, 0), pv.reduce((s, p) => s + p.total, 0)]]);
        pvWs["!cols"] = [{ wch: 20 }, { wch: 10 }, { wch: 18 }];
        XLSX.utils.book_append_sheet(wb, pvWs, "Aşama Pivot");
        break;
      }
      case "tpm": {
        const [m, h] = await Promise.all([
          supabase.from("maintenance_logs").select("*").order("date", { ascending: false }),
          supabase.from("machine_health").select("*"),
        ]);
        XLSX.utils.book_append_sheet(wb, buildSheet(m.data || [], [
          { key: "machine", label: "Makine" }, { key: "type", label: "Tür" },
          { key: "date", label: "Tarih", date: true }, { key: "technician", label: "Teknisyen" },
          { key: "cost", label: "Maliyet (₺)", num: true }, { key: "status", label: "Durum" },
        ]), "Bakım Kayıtları");
        XLSX.utils.book_append_sheet(wb, buildSheet(h.data || [], [
          { key: "name", label: "Makine" }, { key: "status", label: "Durum" },
          { key: "spindle_hours", label: "Spindle Saat", num: true },
          { key: "oil_level", label: "Yağ (%)", num: true },
          { key: "filter_life", label: "Filtre (%)", num: true },
        ]), "Makine Sağlığı");
        const pv = pivot(m.data || [], "type", "cost");
        const pvWs = XLSX.utils.aoa_to_sheet([["Tür", "Adet", "Maliyet (₺)"], ...pv.map((p) => [p.label, p.count, p.total]), [], ["TOPLAM", pv.reduce((s, p) => s + p.count, 0), pv.reduce((s, p) => s + p.total, 0)]]);
        pvWs["!cols"] = [{ wch: 20 }, { wch: 10 }, { wch: 16 }];
        XLSX.utils.book_append_sheet(wb, pvWs, "Bakım Pivot");
        break;
      }
      case "inventory": {
        const [r, t] = await Promise.all([
          supabase.from("raw_materials").select("*").order("created_at", { ascending: false }),
          supabase.from("tool_inventory").select("*").order("created_at", { ascending: false }),
        ]);
        XLSX.utils.book_append_sheet(wb, buildSheet(r.data || [], [
          { key: "code", label: "Kod" }, { key: "name", label: "Ad" },
          { key: "stock", label: "Stok", num: true }, { key: "unit_cost", label: "Birim Fiyat (₺)", num: true },
          { key: "unit", label: "Birim" },
        ]), "Hammaddeler");
        XLSX.utils.book_append_sheet(wb, buildSheet(t.data || [], [
          { key: "code", label: "Kod" }, { key: "name", label: "Ad" },
          { key: "stock", label: "Stok", num: true }, { key: "unit_cost", label: "Birim Fiyat (₺)", num: true },
          { key: "category", label: "Kategori" },
        ]), "Takımlar");
        break;
      }
      case "issues": {
        const { data } = await supabase.from("issues").select("*").order("created_at", { ascending: false });
        const rows = data || [];
        XLSX.utils.book_append_sheet(wb, buildSheet(rows, [
          { key: "id", label: "ID" }, { key: "job", label: "İş" }, { key: "machine", label: "Makine" },
          { key: "category", label: "Kategori" }, { key: "severity", label: "Ciddiyet" },
          { key: "status", label: "Durum" }, { key: "cost", label: "Maliyet (₺)", num: true },
        ]), "Olaylar");
        const pv = pivot(rows, "severity", "cost");
        const pvWs = XLSX.utils.aoa_to_sheet([["Ciddiyet", "Adet", "Maliyet (₺)"], ...pv.map((p) => [p.label, p.count, p.total]), [], ["TOPLAM", pv.reduce((s, p) => s + p.count, 0), pv.reduce((s, p) => s + p.total, 0)]]);
        pvWs["!cols"] = [{ wch: 16 }, { wch: 10 }, { wch: 16 }];
        XLSX.utils.book_append_sheet(wb, pvWs, "Ciddiyet Pivot");
        break;
      }
      case "customers": {
        const { data } = await supabase.from("customers").select("*").order("created_at", { ascending: false });
        const rows = data || [];
        XLSX.utils.book_append_sheet(wb, buildSheet(rows, [
          { key: "name", label: "Ad" }, { key: "company", label: "Firma" }, { key: "city", label: "Şehir" },
          { key: "phone", label: "Telefon" }, { key: "email", label: "Email" },
          { key: "balance", label: "Bakiye (₺)", num: true },
        ]), "Müşteriler");
        const pv = pivot(rows, "city", "balance");
        const pvWs = XLSX.utils.aoa_to_sheet([["Şehir", "Müşteri Sayısı", "Toplam Bakiye (₺)"], ...pv.map((p) => [p.label, p.count, p.total]), [], ["TOPLAM", pv.reduce((s, p) => s + p.count, 0), pv.reduce((s, p) => s + p.total, 0)]]);
        pvWs["!cols"] = [{ wch: 20 }, { wch: 16 }, { wch: 18 }];
        XLSX.utils.book_append_sheet(wb, pvWs, "Şehir Pivot");
        break;
      }
      case "financedocs": {
        const { data } = await supabase.from("financial_documents").select("*").order("created_at", { ascending: false });
        XLSX.utils.book_append_sheet(wb, buildSheet(data || [], [
          { key: "doc_number", label: "Belge No" }, { key: "doc_type", label: "Tür" },
          { key: "total_amount", label: "Tutar (₺)", num: true }, { key: "payment_status", label: "Ödeme Durumu" },
        ]), "Nakit Akışı");
        break;
      }
      case "support": {
        const { data } = await supabase.from("support_tickets").select("*").order("created_at", { ascending: false });
        const rows = data || [];
        XLSX.utils.book_append_sheet(wb, buildSheet(rows, [
          { key: "subject", label: "Konu" }, { key: "priority", label: "Öncelik" },
          { key: "status", label: "Durum" }, { key: "created_at", label: "Tarih", date: true },
        ]), "Destek");
        const pv = pivot(rows, "priority");
        const pvWs = XLSX.utils.aoa_to_sheet([["Öncelik", "Adet"], ...pv.map((p) => [p.label, p.count]), [], ["TOPLAM", pv.reduce((s, p) => s + p.count, 0)]]);
        pvWs["!cols"] = [{ wch: 16 }, { wch: 10 }];
        XLSX.utils.book_append_sheet(wb, pvWs, "Öncelik Pivot");
        break;
      }
      default: {
        const ws = XLSX.utils.aoa_to_sheet([["Bu sekme için rapor mevcut değil."]]);
        XLSX.utils.book_append_sheet(wb, ws, "Rapor");
      }
    }
  }

  const fileName = `MasTechnic_${tabTR[activeTab] || "Rapor"}_${now}.xlsx`;
  XLSX.writeFile(wb, fileName);
  return fileName;
}
