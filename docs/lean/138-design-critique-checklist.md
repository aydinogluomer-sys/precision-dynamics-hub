# Design Critique Checklist — Mas Technic Precision Dynamics Hub

Awwwards Honorable Mention hedefi için her section değerlendirmesi.

## Hiyerarşi (Typographic & Visual)

- [ ] Tek bir güçlü odak noktası var — göz nereye gidecek biliniyor
- [ ] Başlık, alt başlık, body metin üç kademeli boyut farkı var
- [ ] En önemli aksiyon (CTA) sayfada en belirgin element
- [ ] Grid hizalaması tutarlı — 8-kolonlu sistem, 2rem gap
- [ ] Negatif alan (boşluk) kompansasyon için değil, ritim için kullanılıyor

## Tipografi

- [ ] Display: Space Grotesk Bold, `clamp(4rem, 10vw, 14rem)` (veya uygun scale)
- [ ] Mono etiketler: IBM Plex Mono, `tracking-[0.2em]`, uppercase
- [ ] Body: max 65 karakter / satır (`max-w-prose` veya eşdeğer)
- [ ] Italik vurgu sadece kilit kelimelerde (aşırı değil)
- [ ] Heading `leading-[0.9]–[1.1]` — sıkı, gazete gibi

## Renk & Kontrast

- [ ] Arka plan: sadece forge paletinden (`obsidian`, `gunmetal`, `workshop`, `concrete`, `mist`)
- [ ] Teal sadece interactive / primary — dekorasyon için değil
- [ ] Molten (turuncu) sadece CTA / accent — en fazla 1-2 kez/section
- [ ] WCAG AA: beyaz metin koyu bg'de ✅, koyu metin açık bg'de ✅
- [ ] Gölge: shadow-1/2/3 scale kullanılıyor (CSS var token)

## Hareket & Animasyon

- [ ] Her section'da en az 1 anlamlı animasyon (sadece decorative değil)
- [ ] Animasyon hiyerarşi destekliyor (büyük → küçük, dış → iç)
- [ ] Easing: `cubic-bezier(0.76, 0, 0.24, 1)` endüstriyel ton
- [ ] Reduced motion: tüm animasyonlar skip edilebilir, içerik kaybolmuyor
- [ ] Hiçbir animasyon içerik okunmadan önce tamamlanmıyor (legibility > drama)

## Premium Industrial Estetik

- [ ] Keskin kenarlar (border-radius: 0) — tüm kartlar ve kutular
- [ ] Grid çizgileri veya ince border divider'lar var
- [ ] Mono font teknik/sayısal değerlerde (stat, metrik, tolerans)
- [ ] Arka plan dokusu var (grain overlay, shader, blueprint lines)
- [ ] Cursor interaction var (desktop) — hover state özel

## Usability

- [ ] CTA açık ve okunabilir — ne olacağı net
- [ ] Mobile'da touch target ≥44px
- [ ] Loading skeleton veya placeholder var (async içerik)
- [ ] Hata mesajı kullanıcıya yol gösteriyor (ne yapmalı?)
- [ ] Nav'a keyboard ile erişilebilir

## İçerik & Güvenilirlik

- [ ] Türkçe metin dilbilgisi kontrol edildi
- [ ] Stat değerleri (45 CNC, 3500+ proje) doğrulanmış / placeholder değil
- [ ] Sertifika isimleri doğru (ISO 9001:2015, AS9100D, IATF 16949, vb.)
- [ ] İletişim bilgileri gerçek (telefon, email, adres)
