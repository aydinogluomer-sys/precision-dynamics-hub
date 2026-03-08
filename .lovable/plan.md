

## Sohbet Botunu Ücretsiz Hale Getirme Planı

### Mevcut Durum
- FAQ eşleştirme sistemi zaten mevcut (`chatFaqData.ts`) — sorularının çoğu burada yakalanıyor (maliyet: 0)
- AI fallback Lovable AI Gateway üzerinden çalışıyor — **her çağrı kredi harcıyor**
- Günlük 5 mesaj limiti var ama yine de maliyet oluşuyor

### Çözüm: Google Gemini API Free Tier Kullanımı

Google, Gemini API için **ücretsiz katman** sunuyor (günlük 1500 istek, dakikada 15 istek). Edge function'ı Lovable AI Gateway yerine doğrudan Google Gemini API'ye yönlendireceğiz.

### Değişiklikler

**1. Google Gemini API Anahtarı Ekleme**
- Google AI Studio'dan (aistudio.google.com) ücretsiz API key alınacak
- Supabase secrets'a `GOOGLE_GEMINI_API_KEY` olarak eklenecek

**2. Edge Function Güncelleme (`supabase/functions/chat/index.ts`)**
- Lovable AI Gateway yerine `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:streamGenerateContent` endpoint'i kullanılacak
- Google'ın API formatına uygun istek yapısı (messages → contents dönüşümü)
- SSE stream parse mantığı Google formatına uyarlanacak

**3. ChatBot.tsx Güncelleme**
- Stream parse mantığı Google'ın response formatına uyarlanacak (Google farklı SSE formatı kullanıyor)
- Mevcut FAQ + AI fallback + günlük limit mantığı aynen kalacak

### Maliyet Özeti
- FAQ eşleştirme: **Ücretsiz** (soruların ~%70-80'i)
- Google Gemini Free Tier: **Ücretsiz** (günlük 1500 istek)
- Lovable AI Gateway: **Devre dışı** — artık kredi harcamaz

### Gerekli Adım (Sizden)
Google AI Studio'dan ücretsiz API key almanız gerekecek. Onay verirseniz sizi yönlendiririm.

