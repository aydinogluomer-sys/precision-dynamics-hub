# Known Issue — Footer Reveal Pattern Bug

**Tarih:** 2026-04-19
**Durum:** ACTIVE — Index.tsx'te bypass uygulandı, Footer.tsx'te root cause duruyor
**Öncelik:** HIGH (görsel regresyon riski taşır)

## Özet

Footer component'i `variant="reveal"` ile çağrıldığında landing page'de (`/`) tüm
üst section'ları örtbas ediyor. Acil çözüm olarak `Index.tsx` içinde
`variant="static"` ile bypass edildi. Diğer sayfalar STEP 4'te taranacak.

## Tespit edilen root cause'lar

### RC-A — Z-index çakışması
- `Footer.tsx` reveal variant: `position: fixed`, `zIndex: 30`
- `Index.tsx` `SECTION_Z` değerleri: 1–24
- Footer tüm sticky section'ların üstünde fixed olarak yapışıyor

### RC-B — Spacer + lazy loading yarışı
- Footer `<Suspense fallback={null}>` içinde lazy yükleniyor
- İlk render: Footer DOM'da yok → spacer `useEffect` mount anında boş ölçüm alıyor
- Lazy chunk yüklendikten sonra Footer genişliyor
- `scrollHeight > viewport` durumunda spacer tüm ekranı eziyor

### RC-C — Default variant prop
- `Index.tsx`'te `<Footer />` çağrısı — `variant` verilmemiş
- Footer default olarak `"reveal"` kullanıyor
- Her sayfa explicit `variant` vermeli — default güvensiz

## Uygulanan geçici fix

`src/pages/Index.tsx` — tek satır:

```tsx
<Footer variant="static" />
```

Bu yalnızca Index.tsx'te bypass. Footer.tsx'in kendisi düzeltilmedi.

## Kalıcı çözüm (gelecek session)

### Yaklaşım 1 — Footer default variant'ını `"static"` yap
Düşük risk. Reveal kullanan sayfalar explicit `variant="reveal"` vermeli.

### Yaklaşım 2 — Doğru reveal pattern mimarisi (ÖNERİ)
Footer'ı `position: fixed` yerine `position: sticky` + `bottom: 0` yap.
Spacer tamamen kaldırılır. Z-index çakışması ve lazy yarışı çözülür.

### Yaklaşım 3 — Spacer + lazy koordinasyonu
Footer'ı `<Suspense>` dışında tut, ResizeObserver'ı `document.fonts.ready` ile genişlet.

## Taranacak sayfalar (STEP 4)

- [ ] /malzemeler
- [ ] /malzemeler/:slug
- [ ] /blog
- [ ] /iletisim
- [ ] /hakkimizda
- [ ] /sss
- [ ] /kvkk, /gizlilik-politikasi, /cerez-politikasi
- [ ] /teklif-al (footer yok olabilir)
- [ ] /hizmetler/:slug
- [ ] /404

## Taranan sayfalar

| Sayfa | Variant | Kategori | Aynı bug? |
|---|---|---|---|
| / (Index.tsx) | static (bypassed) | A | ✅ FIXED |

(STEP 4 tamamlandığında güncellenecek)

## İlgili commit'ler
- `fix(v3): footer variant=static on Index — emergency bypass`
- `docs(v3): footer reveal bug tracking`
