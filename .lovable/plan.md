

## Mevcut Durum Analizi

**Admin tarafı (WBSView):** 6 adımlı iş akışı var:
- Hammadde → Hazırlık → İşleme → Final → K. Kontrol → Tamamlandı (step 0-5)

Admin "Sonraki Adım" butonuna bastığında `orders` tablosunu şu mapping ile günceller:

```text
WBS Step    → Order Status      → Order Progress
─────────────────────────────────────────────────
0 Hammadde  → Hazırlık          → %0
1 Hazırlık  → Hazırlık          → %10
2 İşleme    → Üretimde          → %30
3 Final     → Üretimde          → %50
4 K.Kontrol → Kalite Kontrol    → %75
5 Tamamlandı→ Tamamlandı        → %100
```

**Müşteri tarafı (UretimTab):** 5 adımlı farklı bir progress bar var ve `progress` yüzdesinden threshold ile aktif adımı hesaplıyor:

```text
Müşteri Step  Threshold
─────────────────────────
Malzeme       ≥0%
CAM           ≥20%
CNC Tezgah    ≥40%
Kalite        ≥70%
Sevkiyat      ≥90%
```

## Sorun

İki taraf arasında **adım isimleri ve sayıları uyumsuz**. Admin 6 adım işaretliyor, müşteri 5 farklı adım görüyor. Progress yüzdeleri de tutarsız (admin %10,%30,%50,%75,%100 gönderiyor ama müşteri tarafında threshold'lar 0,20,40,70,90).

## Önerilen Çözüm: Tek Kaynak, Tutarlı Mapping

Müşteri panelindeki adımları, admin WBS adımlarına **birebir** eşleştireceğiz. Tek doğru kaynak `wbs.current_step` olacak.

### Yeni Progress Matematiği

Admin WBS'teki 6 adımı müşteriye **aynı 6 adım** olarak yansıtacağız:

```text
WBS Step  Admin Adı       Müşteri Görünümü    Progress%
──────────────────────────────────────────────────────────
0         Hammadde        Malzeme Tedarik      0%
1         Hazırlık        CAM & Hazırlık       16%
2         İşleme          CNC İşleme           33%
3         Final           Final İşlem          50%
4         K. Kontrol      Kalite Kontrol       75%
5         Tamamlandı      Sevkiyata Hazır      100%
```

Progress formülü: `Math.round((current_step / 5) * 100)` — linear mapping.

### Yapılacak Değişiklikler

**1. WBSView.tsx (Admin) — Progress mapping güncelleme**
- `progressMap`'i yeni formüle göre güncelle: `{0:0, 1:16, 2:33, 3:50, 4:75, 5:100}`
- Her adım değiştiğinde `orders.progress` doğru yansısın

**2. UretimTab.tsx (Müşteri) — Adımları WBS ile eşle**
- 5 adımlı threshold-based sistemi kaldır
- 6 adımlı, `current_step` bazlı sisteme geç
- Müşteri paneli `orders` tablosundan hem `progress` hem `status` okuyacak (zaten okuyor)
- Yeni adım tanımları:

```typescript
const STEPS = [
  { key: "malzeme", label: "Malzeme Tedarik", progress: 0 },
  { key: "hazirlık", label: "CAM & Hazırlık", progress: 16 },
  { key: "isleme", label: "CNC İşleme", progress: 33 },
  { key: "final", label: "Final İşlem", progress: 50 },
  { key: "kalite", label: "Kalite Kontrol", progress: 75 },
  { key: "sevkiyat", label: "Tamamlandı", progress: 100 },
];
```

- `getActiveStep` fonksiyonu: progress değerine en yakın eşleşen adımı bulacak

**3. Realtime zaten çalışıyor** — `orders` tablosundaki `postgres_changes` dinleniyor, admin adım ilerletttiğinde müşteri paneli anında güncelleniyor.

### Özet

- Kod değişikliği sadece 2 dosyada: `WBSView.tsx` (progress map) ve `UretimTab.tsx` (adım tanımları)
- Veritabanı değişikliği yok
- Admin her "Sonraki Adım" bastığında müşteri paneline realtime yansıyacak

