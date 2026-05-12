# Prompt Library — Mas Technic
> Gerçek copy-paste prompt'lar. Teori değil, çalışan komutlar.
> Claude Code için optimize edilmiş (Lovable terk edildi — 2026-05-12).

---

## Session Yönetimi

### Session Başlatma
```
CLAUDE.md ve ACTIVE_TASK.md oku.
Aktif constraint'leri ve şu anki task'ı söyle.
Onayımı bekle, sonra başla.
```

### Codebase Doğrulama
```
Şu komutları çalıştır ve çıktıyı ver:
find src/hooks -name "*.ts" | sort
find src/components -name "*.tsx" | sort  
find src/lib -name "*.ts" | sort
```

### Mid-Session Anchor
```
Şu ana kadar ne yaptık?
Aktif constraint'ler neler?
Bir sonraki adım ne?
```

### Phase Cleanup
```
Bu phase'de oluşturulan/değiştirilen tüm dosyaları listele.
Şunları kontrol et:
- Duplicate import var mı?
- Dead code var mı?
- Hardcoded renk değeri var mı?
- npm run build temiz geçiyor mu?
Sorun varsa düzelt, sonra rapor ver.
```

---

## Animasyon Prompt'ları

### GSAP ScrollTrigger Reveal Ekle
```
@docs/lean/14-animation-architecture.md yükle.

[ComponentName].tsx'e scroll reveal ekle:
- gsap.context() ile cleanup
- containerRef scope
- reduced-motion check (usePrefersReducedMotion)
- scrub: 1, start: 'top 80%'
- transform+opacity only, layout property yok
- Mevcut 4-phase hero scroll'u etkileme
```

### Yeni Section Ekle
```
@docs/lean/06-design-system.md ve @docs/lean/13-forbidden-patterns.md yükle.

[SectionName] adında yeni section bileşeni oluştur:
- BrutalSectionHeader kullan
- gsap.context ile scroll reveal
- forge renk paleti (hardcoded hex yok)
- border-radius: 0
- Reduced-motion: animasyon yok, layout sağlam
- 180 satır limit
```

### Hero Entrance Sequence
```
@docs/lean/07-motion-system.md yükle.

HeroSection.tsx'e cold-load entrance sequence ekle:
- isFirstVisit prop ile gate et (prop var mı önce doğrula)
- gsap.timeline() — scroll-driven değil
- t=0: grid lines scaleX 0→1 stagger 0.05s
- t=0.3s: .typo-tag elementleri slide up
- t=0.6s: HeadlineStagger tetikle
- t=1.0s: CTA clip-path reveal
- t=1.2s: HeroCanvas fade in
- reduced-motion: instant state
- 4-phase scroll choreography'yi bozma
```

### Kinetic Typography
```
@docs/lean/07-motion-system.md yükle.

HeadlineStagger.tsx'e scroll velocity reaktif skew ekle:
- useScrollVelocity hook'u kullan (src/hooks/useScrollVelocity.ts — önce var mı doğrula)
- skewX: velocity * 0.05, max ±3deg
- Framer Motion ile GSAP conflict yok (ayrı property'ler)
- reduced-motion: skew yok
```

---

## Component Prompt'ları

### Yeni Hook Oluştur
```
@docs/lean/ai-coding-rules.md yükle.

src/hooks/use[HookName].ts oluştur:
- TypeScript, named export
- usePrefersReducedMotion() check
- gsap.context ile cleanup (gerekiyorsa)
- 100 satır limit
- Mevcut hookları tekrar etme: önce find src/hooks yap
```

### Cursor Güncelle
```
@docs/lean/07-motion-system.md ve @docs/lean/design-tokens.json yükle.

CustomCursor.tsx'e velocity-reactive scale ekle:
- useScrollVelocity hook'u kullan
- scale map: slow=1.0, normal=1.2, fast=1.5
- gsap.quickTo ile smooth scale
- mix-blend-mode: difference — cursor dot'a
- reduced-motion: scale yok, blend mode kalsın
- MagneticButton ile koordinasyon bozulmasın
```

---

## GitHub Repo → Snippet Çıkarma

### adrianhajdin Pattern
```
/tmp/ref-adrian/src/ klasörünü analiz et.
Animation singleton pattern'ini çıkar.
Mas Technic stack'ine uyarla (React 18 + GSAP 3.14 + Lenis 1.3 + TypeScript 5.8).
snippets/gsap/animation-manager-reference.ts'e minimal snippet olarak yaz.
MASTER_CONTEXT.md'deki forbidden patterns'a uy.
50 satır max.
```

### GSAP ScrollTrigger Batch
```
/tmp/ref-fullstack/src/ klasörünü analiz et.
ScrollTrigger.batch() kullanım pattern'ini çıkar.
snippets/gsap/scrolltrigger-batch.ts'e yaz.
Mas Technic'te kullanılacak context: card/list reveal, 3 element per batch, 0.08s stagger.
```

---

## Supabase / Backend Prompt'ları

### Yeni Query Hook
```
@src/integrations/supabase/types.ts yükle.

src/hooks/use[TableName].ts oluştur:
- TanStack Query useQuery kullan
- Supabase client import: '@/integrations/supabase/client'
- TypeScript tipleri types.ts'den al
- Hata state'i handle et
- Supabase schema'yı değiştirme
```

---

## Debug Prompt'ları

### ScrollTrigger Debug
```
Console'da ScrollTrigger instance sayısını göster:
console.log(ScrollTrigger.getAll().length)

Şu sayfada kaç aktif ScrollTrigger var ve bunlar hangi trigger elementleri hedefliyor?
```

### Build Hata Analizi
```
npm run build çıktısını ver.
TypeScript hataları varsa sadece ilgili dosyaları düzelt.
Unused import varsa kaldır.
Başka dosyalara dokunma.
```

### Lighthouse Score
```
Mevcut index.html'deki preload ve font-display değerlerini göster.
LCP optimizasyonu için hangi elementler above-the-fold?
will-change kullanan CSS class'larını listele.
```
