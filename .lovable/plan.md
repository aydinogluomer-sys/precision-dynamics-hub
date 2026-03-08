

## Sohbet Botunu Maliyetsiz / Düşük Maliyetli Hale Getirme Planı

### Problem
Her müşteri mesajı Lovable AI Gateway üzerinden token harcıyor. Yoğun kullanımda maliyet hızla artar.

### Çözüm: Hibrit Yaklaşım — Önce Yerel FAQ, Gerekirse AI

Projede zaten **zengin bir FAQ veritabanı** var (`servicePages.ts` içinde 100+ soru-cevap). Chatbot'u şöyle dönüştüreceğiz:

1. **Yerel FAQ Eşleştirme (Maliyet: 0)**
   - Tüm `servicePages` ve `blogData` içindeki FAQ verilerini bir arama havuzuna topla
   - Kullanıcının mesajını basit keyword/fuzzy matching ile FAQ'lara karşı eşleştir
   - Eşleşme skoru yeterli yüksekse (örn. %60+), doğrudan FAQ cevabını göster — **AI çağrısı yapılmaz**

2. **Hızlı Cevap Şablonları (Maliyet: 0)**
   - "Fiyat", "teklif", "iletişim", "adres", "telefon" gibi sık sorulan konular için sabit yanıtlar
   - Kullanıcıyı ilgili sayfaya yönlendiren linkler

3. **AI Fallback — Sadece Eşleşme Yoksa (Düşük maliyet)**
   - Yerel eşleşme bulunamazsa, kullanıcıya "Daha detaylı yanıt için AI asistanı kullanılsın mı?" diye sor
   - Kullanıcı onaylarsa AI çağrısı yap
   - Günlük AI çağrı limiti koy (örn. IP/session başına 5 mesaj)

### Teknik Değişiklikler

**Yeni dosya: `src/data/chatFaqData.ts`**
- `servicePages` ve diğer kaynaklardan tüm FAQ'ları düz bir diziye toplar
- Sık sorulan sorular için sabit şablonlar ekler

**Güncelleme: `src/components/ChatBot.tsx`**
- `send()` fonksiyonuna FAQ arama mantığı ekle
- Keyword matching fonksiyonu (basit TF-IDF benzeri skor)
- Eşleşme varsa anında yerel yanıt göster
- Eşleşme yoksa AI fallback (kullanıcı onayıyla)
- Session başına AI mesaj sayacı (localStorage)

**Edge function değişikliği yok** — mevcut `chat` fonksiyonu aynı kalır, sadece daha az çağrılır.

### Beklenen Maliyet Etkisi
- Tahminen müşteri sorularının **%70-80'i** FAQ ile cevaplanır → AI maliyeti %70-80 düşer
- Kalan %20-30 için de günlük limit ile kontrol altında tutulur

