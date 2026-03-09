

## Analiz

Şu anda istatistikler (35+ CNC Tezgâh, ±0.005mm, 15+ Yıl) bu intro bölümünde tekrar ediyor ve sayfanın başka yerlerinde de benzer rakamlar var. Bu bölüm bir **manifesto/vizyon** alanı — rakamlar değil, güven ve yönlendirme vermeli.

## Öneri: CTA (Aksiyon) Butonları

İstatistikler yerine **iki adet CTA butonu** koyulmalı. Sebepleri:

1. Bu bölüm kullanıcının firmanızı tanıdığı ilk derinlikli alan — okuduktan sonra bir sonraki adıma yönlendirilmeli
2. İstatistikler zaten sayfanın diğer bölümlerinde (StatsSection, WhyUs, Capabilities) mevcut — tekrar gereksiz
3. Scroll-driven bir sticky bölümde kullanıcı "tamam, anladım" dedikten sonra aksiyon alabilmeli

### Buton tasarımı:
- **"Teklif Al"** — primary, dolgu renkli, `/teklif-al` sayfasına yönlendirir
- **"Hizmetlerimizi İncele"** — outline/ghost stil, aşağıdaki services bölümüne smooth scroll yapar

Her iki buton da mevcut JetBrains Mono tipografisi ve primary renk temasıyla uyumlu olacak. Scroll animasyonuyla (statsOpacity/statsY kullanılarak) belirerek görünecek.

### Teknik değişiklik
- `src/components/StickyIntroReveal.tsx`: Satır 128-153 arası stats grid silinecek, yerine iki butonlu bir flex container eklenecek. `react-router-dom`'dan `Link` import edilecek.

