

## Light Mode Beyaz Alan Düzeltmesi — Revize Plan

### Yapılacak Değişiklikler

#### 1. ParallaxSection.tsx — `text-xs` kaldır
Satır 112'deki `className="relative text-xs"` → `className="relative"` olarak değiştir. `backgroundColor` zaten mevcut, dokunma.

#### 2. SectionDivider.tsx — margin güncelle
Satır 42'deki `marginTop: -1, marginBottom: -1` → `marginTop: -2, marginBottom: -2` olarak değiştir. `backgroundColor` ekleme — transparent kalacak.

#### 3. IndustriesSection.tsx — `bg-background` kaldır
Satır 71: `className="bg-background border-y border-border"` → section'a koyu arka plan ver: `style={{ backgroundColor: "hsl(var(--forge-obsidian))" }}` ve text renklerini uyumlu yap.

Satır 146: Kartlardaki `bg-background` → `bg-card` olarak değiştir (bu zaten tema uyumlu).

#### 4. MaterialMorphScroll.tsx — Container'a arka plan ekle
Satır 181-182: `className="relative"` olan `motion.div`'e `backgroundColor: "hsl(var(--forge-obsidian))"` ekle (style prop'una).

#### 5. Grup 5 — text-white değişikliklerine dokunma
Kullanıcının talimatı: koyu bölümlerdeki `text-white` kasıtlı, değiştirme.

### Özet
- 4 dosya değişecek
- Index.tsx'e dokunulmayacak
- Tüm düzeltmeler bileşen seviyesinde

