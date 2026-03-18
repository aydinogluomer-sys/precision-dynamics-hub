

# Sayfalama Ekleme Planı — 6 Müşteri Paneli Tab'ı (Düzeltilmiş)

Önceki planla aynı, tek fark: TekliflerimTab bekleyen filtresi düzeltildi.

---

## Ortak Pattern (tüm tab'larda)

```typescript
const PAGE_SIZE = 20;
const [page, setPage] = useState(0);
const [hasMore, setHasMore] = useState(true);
const [loadingMore, setLoadingMore] = useState(false);
```

Realtime 3-event pattern:
- **INSERT** → prepend
- **UPDATE** → map
- **DELETE** → filter

"Daha Fazla Yükle" butonu: `hasMore && items.length > 0` koşuluyla listenin altında.

---

## 1. TekliflerimTab.tsx

Server-side filtre. `activeFilter` state + `fetchRfqs(pageNum, append, statusFilter)`.

| Filter | Supabase koşulu |
|--------|----------------|
| **bekleyen** | `.or('status.in.(Yeni,pending,Beklemede,Değerlendiriliyor),status.is.null')` |
| fiyat_verildi | `.eq("status", "Fiyat Verildi").eq("customer_approved", false)` |
| onaylanan | `.eq("status", "Onaylandı")` |
| reddedilen | `.eq("status", "Reddedildi")` |

Tab değişiminde: `setPage(0); setRfqs([]); fetchRfqs(0, false, yeniFilter)`.
Tab count'ları kaldırılır.

Realtime INSERT → aktif filtreye uyuyorsa prepend. UPDATE → map (filtreye uymuyorsa filter ile çıkar). DELETE → filter.

---

## 2. SiparislerimTab.tsx

`fetchOrders(pageNum, append)` — `.range(from, to)`. Tablo altına buton.

Realtime: INSERT → prepend. UPDATE → map. DELETE → filter.

---

## 3. OdemeFaturaTab.tsx

İki ayrı sorgu:
- `fetchSummary()` — sayfalanmaz, `total_amount, payment_status` select. Özet kartları hesaplar.
- `fetchDocs(pageNum, append)` — `.range(from, to)` ile sayfalanır.

İlk yüklemede `Promise.all([fetchSummary(), fetchDocs(0, false)])`.

Realtime: INSERT → prepend + fetchSummary(). UPDATE → map + fetchSummary(). DELETE → filter + fetchSummary().

---

## 4. KaliteRaporTab.tsx

`fetchReports(pageNum, append)` — `.range(from, to)`. Liste sonuna buton.

Realtime: INSERT → prepend. UPDATE → map. DELETE → filter.

---

## 5. TeknikArsivTab.tsx

- `customer_files` → `.range(from, to)` sayfalanır.
- `rfqs` dosyaları → sayfalanmaz (tamamı çekilir).
- `hasMore` sadece `customer_files` sonuç sayısına göre.

Realtime (customer_files): INSERT → prepend. UPDATE → map. DELETE → filter.

---

## 6. DestekTab.tsx

`fetchTickets(pageNum, append)` — `.range(from, to)`. Ticket listesi altına buton.
`loadMessages` sayfalanmaz (mevcut davranış korunur).

Realtime (support_tickets): INSERT → prepend. UPDATE → map. DELETE → filter.
Realtime (support_messages): mevcut INSERT handler aynen kalır.

---

## Etkilenen Dosyalar (sadece 6)

| Dosya | Değişiklik |
|-------|-----------|
| `TekliflerimTab.tsx` | Server-side filtre (düzeltilmiş .or syntax) + range + 3-event realtime |
| `SiparislerimTab.tsx` | range + 3-event realtime |
| `OdemeFaturaTab.tsx` | İki sorgu (summary + list) + range + 3-event realtime |
| `KaliteRaporTab.tsx` | range + 3-event realtime |
| `TeknikArsivTab.tsx` | customer_files'a range, rfqs sayfalanmaz + 3-event realtime |
| `DestekTab.tsx` | range + 3-event realtime |

Skeleton'lar değişmez. "Daha Fazla Yükle" sırasında buton'da Loader2 spinner.

