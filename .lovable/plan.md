

# "Neden Mas Technic" ve "Kabiliyetlerimiz" Renk Planı

## Mevcut Landing Page Renk Akışı (yukarıdan aşağıya)

```text
Bölüm                      Light Mode           Dark Mode
─────────────────────────── ──────────────────── ────────────────────
1. Hero                     #020617 (koyu navy)  #020617
2. StickyIntroReveal        #020617 (koyu navy)  #020617
3. HowWeWork                #FAFAF9 (sıcak beyaz) muted/50
4. Certifications           #f8fafc (soğuk beyaz) #0a1628
5. VideoScroll              #020617 (koyu navy)  #020617
6. Services                 bg-background (beyaz) bg-background
7. Industries               bg-muted (açık gri)  bg-muted
8. Materials                #020617 (koyu navy)  #020617
─── BURASI ───
9. WhyUs (Neden Mas)        #0d1f2d (koyu navy)  secondary
10. Capabilities            #e8edf4 (açık mavi-gri) bg-background
─── BURASI ───
11. Testimonials            #0F172A (koyu navy)  #0F172A
12. FAQ/Blog                bg-card              bg-card
13. FinalCTA                primary gradient     primary gradient
```

## Sorun

Materials (#020617) → WhyUs (#0d1f2d) → Capabilities (#e8edf4) → Testimonials (#0F172A) geçişinde:
- Materials ve WhyUs arasında koyu→koyu geçiş var, neredeyse aynı tonlar — monoton.
- Capabilities aniden açık renge atlıyor, sonra tekrar Testimonials'da karanlığa düşüyor — tutarsız ritim.
- Üst üste 3 koyu bölüm (Materials, WhyUs, Testimonials) arasına sıkışmış tek açık bölüm kopuk duruyor.

## Önerilen Renk Stratejisi

Landing page'de doğal bir **koyu-açık-koyu-açık** ritmi oluşturmak gerekiyor. Mevcut akışa bakıldığında en uygun yaklaşım:

### Seçenek: İkisini de açık tonlarda tutmak

Materials (koyu) → **WhyUs (açık)** → **Capabilities (açık, farklı ton)** → Testimonials (koyu)

Bu sayede koyu Materials'dan açık bölümlere geçilir, sonra Testimonials ile tekrar karanlığa inilir — temiz bir ritim.

**Önerilen renkler:**

| Bölüm | Light Mode | Dark Mode | Neden |
|-------|-----------|-----------|-------|
| WhyUs | `#f0f4f8` (soğuk mavi-gri) | `#0f1a2a` (koyu lacivert) | Materials'ın koyu navy'sinden yumuşak geçiş; Services/Industries ile uyumlu açık ton |
| Capabilities | `#e8edf4` (biraz daha koyu mavi-gri) | `#0d1929` (koyu lacivert) | WhyUs'tan hafif ton farkıyla ayrılır, Testimonials'a geçiş hazırlar |

**Ama kritik sorun:** WhyUs şu anda koyu arka plan üzerine beyaz metin kullanıyor. Açık tonlara geçince tüm metin renkleri, kart stilleri, badge stilleri tersine çevrilmeli.

### Detaylı Değişiklikler

**WhyUsSection.tsx:**
- Arka plan: `bg-[#f0f4f8] dark:bg-[#0f1a2a]`
- Başlık/alt başlıklar: `text-foreground` (koyu metin, açık arka plan için)
- Açıklamalar: `text-muted-foreground`
- Kartlar: `bg-background border border-border` (standart tema kartları)
- Hakkımızda banner: `bg-background border border-border`
- Alt badges: standart `text-muted-foreground`
- Dark mode'da mevcut koyu stil korunur (`dark:` prefix'leri ile)

**CapabilitiesSection.tsx:**
- Arka plan: `bg-[#e8edf4] dark:bg-[#0d1929]` (mevcut light zaten uygun, dark eklenir)
- Mevcut stil zaten açık tema üzerine kurulu, büyük değişiklik gerekmez
- Dark mode kartlarına koyu lacivert ton eklenir

### Sonuç Akışı

```text
Materials  (#020617)  ████████████  KOYU
WhyUs      (#f0f4f8)  ░░░░░░░░░░░░  AÇIK  ← yumuşak geçiş
Capabilities(#e8edf4) ░░░░░░░░░░░░  AÇIK  ← hafif ton fark
Testimonials(#0F172A) ████████████  KOYU  ← dramatik kontrast
FAQ/Blog   (bg-card)  ░░░░░░░░░░░░  AÇIK
FinalCTA   (gradient) ████████████  RENK
```

Bu ritim, sayfada temiz bir "nefes alma" alanı yaratır ve bölümler arasında doğal geçişler sağlar.

