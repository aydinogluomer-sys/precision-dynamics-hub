
## Kısa cevap

Sorun “boş section var ama içerik yok” değil; ana sebep, bazı section’ların gerçekten render edilmesine rağmen **başlangıçta bilinçli olarak gizlenmesi** veya **yanlış wrapper içinde ikinci kez animasyonlanması**. Bu yüzden “yapıldı” dense bile görünürde değişmiyor.

## Net teşhis

### 1) Doğrudan silinebilecek parça var
Evet: `StatsSection` şu anda fazladan geri eklenmiş.

- `src/pages/Index.tsx`
  - `import { StatsSection } ...`
  - `SECTIONS` içinde `rakamlar`
  - `WhyUsSection`’dan sonra ayrı bir `<ParallaxSection index={15}> <StatsSection /> </ParallaxSection>`

Bu, mevcut sayfa düzeni hafızasıyla çelişiyor. Güncel kurala göre istatistikler artık `WhyUsSection` içine entegre; ayrı `StatsSection` olmamalı. Bu bölüm **doğrudan kaldırılmalı**.

### 2) Silinmemesi gereken ama yanlış kurgulanmış parçalar var
Bunlar “çalışmayan/ölü kod” değil; aktifler ama görünürlük mantığı boşluk gibi davranıyor.

#### A. `WhyUsSection` boş görünmesinin ana nedeni
- `src/pages/Index.tsx`: `WhyUsSection` şu an `variant="wipe-mask"` ile sarılmış.
- `src/components/ParallaxSection.tsx`: `wipe-mask` için clipPath başlangıçta fiilen `0%`.

Yani section doküman akışında yer kaplıyor ama içerik ilk anda görünmüyor. Kullanıcı bunu “boş alan” olarak görüyor.

Bu yüzden `WhyUsSection` silinmemeli; **`wipe-mask` kaldırılmalı**.

#### B. `HowWeWorkSection` boş giriş hissi veriyor
- `src/components/HowWeWorkSection.tsx`
  - `height: "300vh"`
  - içerik `sticky`
  - header başlangıçta opacity 0
  - kart şeridi başlangıçta `x: "60%"`

Yani section başlıyor ama içerik ilk bölümde ya görünmüyor ya da ekran dışında. Bu da boşluk hissi yaratıyor.

Bu section silinmemeli; **giriş animasyonu daha erken görünür hale getirilmeli**.

#### C. `ProjectShowcase` / sticky-scroll bölümleri yanlış dış sarmalayıcıyla çakışıyor
- `ProjectShowcase` kendi içinde `ScrollTrigger pin` kullanıyor.
- `HowWeWorkSection` kendi içinde sticky/uzun scroll yapıyor.
- Bunlar ayrıca `ParallaxSection` ile de sarılmış.

Bu, aynı section’a iki ayrı scroll mantığı bindiriyor:
1. section’ın kendi sticky/pin davranışı  
2. dış `ParallaxSection` opacity/scale/y davranışı

Sonuç: kullanıcı bazı aralıklarda içerik yerine “ölü scroll alanı” görüyor.

Bu bölümler silinmemeli; **sticky/pinned section’lar `ParallaxSection` dışına alınmalı**.

## Bu boşlukların kaynağı “md olarak eklenmiş ama yapılmamış” bir şey mi?

Hayır, ana neden markdown/placeholder değil. Kod içinde ana sayfa için “unfinished md block” tipi bir yapı görmüyorum. Sorun canlı bileşenlerde:

- yanlışlıkla geri eklenen `StatsSection`
- aşırı agresif reveal/clip animasyonları
- sticky/pin section’ların dıştan tekrar animasyonlanması

Yani mesele “eksik içerik” değil, **yanlış görünürlük mimarisi**.

## Uygulama planı

### 1. Fazladan geri eklenen kısmı kaldır
`src/pages/Index.tsx`
- `StatsSection` import’unu kaldır
- ayrı `StatsSection` render’ını kaldır
- `SECTIONS` listesinden `rakamlar` maddesini kaldır
- z-index zincirini tekrar sıkı ve ardışık hale getir

### 2. Boş görünen reveal’i kaldır
`src/pages/Index.tsx`
- `WhyUsSection` için `variant="wipe-mask"` yerine görünürlüğü bozmayan bir varyant kullan
- gerekirse tamamen düz wrapper’a indir

`src/components/ParallaxSection.tsx`
- `wipe-mask` başlangıçta section’ı tamamen görünmez yaptığı için bu varyantı landing page’de yalnızca dekoratif ve kısa bloklarda kullan
- tam ekran section’larda kullanma

### 3. Sticky/pinned section mimarisini düzelt
`src/pages/Index.tsx`
Aşağıdaki section’ları `ParallaxSection` dışına al:
- `HowWeWorkSection`
- `ProjectShowcase`
- gerekirse `CapabilitiesSection` da aynı prensiple sade wrapper’a geçir

Bunlar `relative` kapsayıcı + doğru `zIndex` ile düz akışta durmalı. Kendi sticky/pin mantıkları zaten içeride var.

### 4. “Boş başlangıç” hissini azalt
`src/components/HowWeWorkSection.tsx`
- header opacity başlangıcını daha erken aç
- kart şeridinin ilk offset’ini daha az agresif yap
- section’ın ilk viewport’unda kullanıcı en azından başlık ve ilk kartı hemen görmeli

Gerekirse `300vh` korunur ama ilk %10–15’lik kısım görünür başlar.

### 5. Mimariyi tek kaynağa geri getir
Ana sayfa sırasını şu hale sabitle:
1. Hero
2. QuickQuote
3. CNCScrollStory
4. Nexus
5. HowWeWork
6. Certifications
7. Video
8. Services
9. Industries
10. ProjectShowcase
11. MaterialMorph
12. Materials
13. WhyUs (istatistikler bunun içinde)
14. Capabilities
15. Testimonials
16. FAQ/Blog
17. Final CTA

## Teknik notlar

- `WhyUsSection` şu an gerçek anlamda “boş” değil; `clipPath` nedeniyle ilk anda saklanıyor.
- `StatsSection` gerçekten gereksiz ikinci bir tam ekran blok; kaldırılması doğru.
- `HowWeWorkSection` ve `ProjectShowcase` “çalışmıyor” değil; scroll başlangıç davranışları yüzünden boş alan hissi veriyor.
- Konsoldaki `ref` warning’leri (`FinalCTASection`, `SectionDotNav`) ayrı bir kalite sorunu; boşlukların ana sebebi değil ama sonrasında temizlenmeli.

## Beklenen sonuç

Bu plan uygulanınca:
- sahte/fazladan tam ekran blok kalkar,
- görünmez başlayıp boşluk gibi duran section’lar normale döner,
- kullanıcı artık “orada içerik var mı yok mu” diye hissetmez,
- gerçekten silinmesi gereken tek parça ile sadece yanlış davranan parçalar net biçimde ayrılmış olur.
