

## "Rapor Al" - Bağlama Duyarlı Detaylı Rapor Sistemi

### Mevcut Durum
"Rapor Al" butonu şu anda sadece tarih içeren boş bir CSV indiriyor. Gerçek veri çekmiyor.

### Plan

**Yaklaşım:** "Rapor Al" butonuna tıklandığında, aktif sekmeye (activeTab) göre ilgili Supabase tablosundan veri çekip detaylı CSV oluşturacak bir sistem.

**Her sekme için rapor içeriği:**

| Sekme | Tablo | Rapor Kolonları |
|-------|-------|-----------------|
| dashboard | rfqs + orders + issues | Özet: toplam RFQ, sipariş, açık sorun sayıları |
| rfq | rfqs | ID, Müşteri, Firma, Malzeme, Hizmet, Miktar, Durum, Tarih, Fiyat |
| orders | orders | ID, Parça, Müşteri, Miktar, Durum, İlerleme, Makine, Termin |
| wbs | wbs | ID, Sipariş, Parça, Müşteri, Adım, Durum, Termin |
| scheduling | machine_schedule | Makine, Gün, Hafta, İş Adı, Saat |
| financial | financial_documents | No, Tür, Başlık, Tutar, KDV, Toplam, Durum, Vade |
| pipeline | pipeline_leads | Firma, Kişi, Aşama, Değer, Olasılık |
| tpm | maintenance_logs + machine_health | Makine, Tür, Tarih, Teknisyen, Maliyet, Durum |
| inventory | raw_materials + tool_inventory | Kod, Ad, Stok, Birim Fiyat, Toplam Değer |
| issues | issues | ID, İş, Makine, Kategori, Ciddiyet, Durum, Maliyet |
| customers | customers | Ad, Firma, Şehir, Telefon, Email, Bakiye |
| financedocs | financial_documents | Belge no, tür, tutar, ödeme durumu |
| support | support_tickets | Konu, Öncelik, Durum, Tarih |

**Teknik uygulama:**

1. **AdminDashboard.tsx**: `handleExportCSV` fonksiyonunu `activeTab`'a göre Supabase'den veri çeken async bir fonksiyona dönüştür. Her sekme için ilgili tablodan `.select("*")` ile veri çek.

2. **CSV oluşturma yardımcı fonksiyonu**: Veriyi kolonlarla eşleştirip BOM + UTF-8 CSV formatında dışa aktar. Türkçe kolon başlıkları kullan. Sayısal değerlerde Türk biçimlendirmesi (nokta ayırıcı yerine virgül).

3. **AdminHeader.tsx**: Butona loading state ekle (Loader2 spinner). Dışa aktarım sırasında buton disable olsun.

4. Dosya adı formatı: `MasTechnic_{SekmeAdı}_{tarih}.csv`

**Değişecek dosyalar:**
- `src/pages/AdminDashboard.tsx` — async veri çekme + CSV üretimi
- `src/components/admin/AdminHeader.tsx` — loading prop ekle

