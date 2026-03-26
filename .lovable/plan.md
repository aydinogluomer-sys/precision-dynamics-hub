

# Video & Ses Sistemi Düzeltme + Animasyon QA

## Sorun Analizi

**"Header'daki video bozuldu"**: Mevcut viewport 606px genişliğinde — bu `md` (768px) breakpoint'in altında. Hero bölümündeki video ve ghost video (`machine-loop.mp4`) dahil tüm videolar `hidden md:block` class'ına sahip, yani bu viewport'ta videolar gösterilmiyor. Bunun yerine statik poster görseli (`hero-cnc.jpg`) gösteriliyor. Bu bir bug değil, mevcut responsive tasarımın sonucu.

Ancak kullanıcı "bozuldu" diyor — muhtemelen iki sorun var:
1. Hero videosunda `preload="none"` kullanılıyor ki bu `autoPlay` ile çelişebilir (bazı tarayıcılar video'yu hiç yüklemeyebilir)
2. Desktop'ta bile video oynatılmıyor olabilir

**Ses sistemi**: `useSoundEngine` hook'u oluşturulmuş ama sadece sayfa geçişlerinde (`whoosh`) kullanılıyor. Buton hover/click sesleri henüz hiçbir bileşene bağlanmamış.

## Plan

### Adım 1 — Video düzeltmesi
- HeroSection'daki `preload="none"` → `preload="metadata"` olarak değiştir (autoplay uyumluluğu için)
- VideoScrollSection'daki video zaten `preload="auto"` — doğru
- Index.tsx'deki ghost video (`machine-loop.mp4`) → `preload="metadata"` yap
- Mobil viewport'ta (606px) video yerine gösterilen poster görselinin düzgün render edildiğini doğrula

### Adım 2 — Ses efektlerini bileşenlere bağla
- `MagneticButton` ve `BracketButton` bileşenlerine hover'da `tick`, click'te `click` sesi ekle
- `Header.tsx`'deki nav link hover'larına `tick` sesi ekle
- Sound toggle (`SoundToggle`) zaten Header'da var — `localStorage` kontrolünü `useSoundEngine`'e entegre et (şu an hook ve toggle bağımsız çalışıyor, birbirini tanımıyor)

### Adım 3 — Ses toggle + hook entegrasyonu
- `useSoundEngine` hook'una `enabled` state ekle — `localStorage.getItem("mas_sound")` oku
- `play()` fonksiyonu `enabled === false` ise ses çalmasın
- `SoundToggle` bileşenini güncelle — toggle değiştiğinde `CustomEvent` dispatch et, hook dinlesin

### Adım 4 — Animasyon QA kontrolleri
- GlowLineDivider: GSAP sweep tetiklenmesini doğrula (ScrollTrigger `once: true`)
- BracketButton: `forwardRef` düzeltmesi yapıldı — hover bracket animasyonunu kontrol et
- TextHighlight: WhyUsSection'daki `background-size` scroll animasyonunu kontrol et
- HowWeWork: Pin+scrub yatay scroll'un desktop'ta çalıştığını doğrula
- FinalCTA: Karakter stagger animasyonunun tetiklendiğini kontrol et

## Dosya Değişiklikleri

| Dosya | Değişiklik |
|-------|-----------|
| `src/components/HeroSection.tsx` | `preload="none"` → `preload="metadata"` (2 yerde) |
| `src/pages/Index.tsx` | Ghost video `preload="none"` → `preload="metadata"` |
| `src/hooks/use-sound.ts` | `enabled` state ekle, `localStorage` + `CustomEvent` dinle |
| `src/components/SoundToggle.tsx` | Toggle'da `CustomEvent('mas_sound_change')` dispatch et |
| `src/components/MagneticButton.tsx` | Hover'da `tick`, click'te `click` sesi |
| `src/components/ui/BracketButton.tsx` | Hover'da `tick` sesi |

