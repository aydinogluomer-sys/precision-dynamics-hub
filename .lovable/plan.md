Amaç: Neden hâlâ aynı göründüğünü netleştirip, tüm divider geçişlerini tutarlı hale getirmek.

1. Neden hâlâ aynı renk görünüyor olabilir?

- Ana neden büyük olasılıkla `src/components/WhyUsSection.tsx` içindeki hardcoded arka plan: `backgroundColor: "#3d3d5c"`.
- Önceki değişiklik sadece `src/pages/Index.tsx` içindeki dalga `fill` rengini değiştirdi; ama altındaki bölümün gerçek arka planı aynı kaldı.
- `WhyUsSection` içinde sadece `.dark #neden-biz { ... }` override var. Yani açık temada `#3d3d5c` aktif kalıyor.
- Sorunlu geçiş ortak `SectionDivider` bileşeniyle değil, `Index.tsx` içindeki elle yazılmış özel SVG dalga ile yapılıyor; bu yüzden sadece `SectionDivider` mantığını düzeltmek tek başına yetmiyor.
- Dalga sarmalayıcısının `backgroundColor: "hsl(var(--forge-mist))"` olması, üstte açık bir bant gösteriyor; bu da “renk değişmedi” hissi yaratıyor.
- `SectionDivider` içinde bir path `opacity={0.3}` ile çizildiği ve wrapper’larda arka plan rengi eksik olduğu için bazı geçişlerde alttan/üstten renk sızması olabilir.
- Daha nadir ihtimal: preview cache / eski bundle / hot reload gecikmesi. Bunu son aşamada görsel kontrolle doğrulamak gerekir.

2. Uygulama planı

- `WhyUsSection` için tek bir “source of truth” renk belirleyeceğim.
- Kullanıcı referansı stats alanının mevcut gri tonu olduğu için, dalgayı bu bölümün gerçek arka planıyla birebir eşleştireceğim.
- `WhyUsSection` içindeki hardcoded `#3d3d5c` kaldırılacak; yerine aynı ton bir theme token veya ortak değişken kullanılacak.
- `Index.tsx` içindeki WhyUs üstü özel SVG divider da aynı renge bağlanacak:
  - wrapper background
  - SVG path fill
  - alt bölüm arka planı
  bunların üçü de aynı olacak.
- Gerekirse özel SVG dalga, ortak `SectionDivider` standardına yaklaştırılacak; değilse en azından aynı renk kaynağını paylaşacak.

3. Tüm divider geçişleri için kontrol ve düzeltme

`src/pages/Index.tsx` içindeki tüm geçişleri tek tek normalize edeceğim:

- Nexus → HowWeWork
- Video → Services
- Industries → ProjectShowcase
- MaterialMorph → Materials
- Materials → WhyUs
- FAQ/Blog → Final CTA

Her biri için kural:

- Standart dalga ise `fillColor` alt bölümle eşleşecek.
- `flip` dalga ise `fillColor` üst bölümle eşleşecek.
- Wrapper `backgroundColor` mutlaka hedeflenen bölüm rengiyle eşleşecek.
- Böylece scroll/parallax sırasında beyaz, lacivert ya da açık gri sızıntı kalmayacak.

4. Neleri özellikle düzelteceğim?

- `src/components/WhyUsSection.tsx`
  - hardcoded `#3d3d5c` kaldırılacak
  - dark-only style hack sadeleştirilecek veya kaldırılacak
  - bölüm rengi token bazlı hale getirilecek
- `src/pages/Index.tsx`
  - tüm `SectionDivider` wrapper’larına doğru `backgroundColor` verilecek
  - WhyUs üstündeki özel SVG divider, bölümle aynı renge sabitlenecek
  - elle yazılmış divider ile ortak divider standardı uyumlu hale getirilecek

5. Görsel doğrulama

Değişiklikten sonra preview’de şu kontrol yapılacak:

- WhyUs üstündeki dalga ile stats arka planı tek parça gibi görünüyor mu?
- Dalganın üstünde açık bant kalıyor mu?
- Scroll sırasında renk kayması / sızma oluyor mu?
- Diğer divider’larda da benzer ton farkı var mı?

6. Teknik not

Şu an en kritik kök neden `Index.tsx` değil, `WhyUsSection.tsx` içindeki hardcoded arka plan. Yani sadece dalga rengini değiştirmek yetmez; alt bölüm ve divider aynı renk kaynağına bağlanmalı. En güvenli çözüm bu üç alanı tek token üzerinden birleştirmek.

**Önemli teknik kısıt:** SVG `path` elementinin `fill` attribute'unda `hsl(var(--forge-gunmetal))` gibi CSS custom property syntax'ı çalışmaz. Tüm SVG fill değerleri için hardcoded hex kullan. `forge-gunmetal` = `#1a1a2e`, `forge-mist` = `#dde3e8`, `forge-obsidian` = `#0f0f0f`.