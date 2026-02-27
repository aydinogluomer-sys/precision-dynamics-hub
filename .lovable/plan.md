

# Guvenlik Taramasi Bulgulari - Duzeltme Plani

## Ozet

Guvenlik taramasi guncellendi. Onceki kritik bulgular (customers ve support_tickets tablolarinin anonim erisime acik olmasi) aslinda **zaten RLS politikalariyla korunuyor** - bu tablolara yalnizca staff/admin erisebilir. Ancak asil duzeltilmesi gereken onemli bir sorun var:

---

## 1. Kritik: customer-files Storage Guvenlik Sorunu (STORAGE_EXPOSURE)

**Sorun:** `TeknikArsivTab.tsx` dosyasinda ozel (private) bir bucket uzerinde `getPublicUrl()` kullaniliyor. Bu, dosyalarin indirilemeyecegi (403 hatasi) ve guvenlik modeli acisindan yanlis oldugu anlamina gelir.

**Cozum:**
- Veritabanina URL yerine yalnizca dosya yolunu (path) kaydet
- Dosyalari gosterirken `createSignedUrl()` ile gecici (1 saatlik) imzali URL olustur
- Indirme linklerini imzali URL'leri kullanacak sekilde guncelle

**Degisecek dosya:** `src/components/musteri/TeknikArsivTab.tsx`

### Teknik Detaylar

```text
Mevcut Akis (Hatali):
Upload -> getPublicUrl() -> DB'ye public URL kaydet -> 403 hatasi

Yeni Akis (Dogru):
Upload -> DB'ye sadece path kaydet -> Gosterirken createSignedUrl() -> Calisan link
```

Degisiklikler:
- `handleUpload` fonksiyonunda `getPublicUrl()` satirini kaldirip, `file_url` alanina sadece `path` degiskenini kaydet
- `CustomerFile` interface'ine `signedUrl?: string` ekle
- `fetchFiles` fonksiyonunda dosyalar cekildikten sonra her dosya icin `createSignedUrl(file.file_url, 3600)` cagir
- Indirme linkinde `f.file_url` yerine `f.signedUrl` kullan

---

## 2. Bilgilendirme: Mevcut RLS Durumu

Tarama sonuclarina gore asagidaki tablolar **zaten korunuyor**:
- `customers` - Yalnizca staff okuyabilir, admin silebilir
- `support_tickets` - Yalnizca sahip ve staff erisebilir
- `profiles`, `rfqs`, `financial_documents` - Uygun RLS politikalari mevcut

Bu bulgular "info" seviyesinde ve ek islem gerektirmiyor.

