# Definition of Done — Mas Technic Precision Dynamics Hub

Her task / feature bu kriterleri karşılamadan "tamamlandı" sayılmaz.

## Mühendislik Kriteri

- [ ] `npm run build` temiz çıkış — TypeScript hatası yok
- [ ] `npm run test -- --run` geçiyor (eğer test yazıldıysa)
- [ ] Yeni component `usePrefersReducedMotion()` kontrolü yapıyor
- [ ] GSAP kullanıyorsa `gsap.context()` + cleanup (`return () => ctx.revert()`)
- [ ] Three.js canvas varsa `IntersectionObserver` lazy mount
- [ ] Hardcoded renk yok (GLSL sabitleri hariç)
- [ ] Z-index yalnızca `Z` objesinden
- [ ] Yeni npm paketi eklenmedi
- [ ] `docs/lean/task-backlog.md` güncellendi (phase kaydı)
- [ ] Branch: `claude/[kısa-açıklama]`, commit mesajı Conventional Commits

## Tasarım / UX Kriteri

- [ ] Mobile `<768px` görünüm kontrol edildi (responsive)
- [ ] Hover state mevcut (cursor pointer: fine device)
- [ ] Focus state mevcut (keyboard nav)
- [ ] Loading state mevcut (async data varsa)
- [ ] Error state mevcut (fetch fail durumu)
- [ ] Türkçe copy eksiksiz ve doğru

## Performans Kriteri

- [ ] Above-fold görsel: `loading="eager"`, `fetchpriority="high"`
- [ ] New animation: `will-change` statik elemanda değil
- [ ] ScrollTrigger sayısı artıyorsa `ctx.revert()` route change'de çalışıyor
- [ ] Three.js canvas varsa `dpr={[1, 1.5]}` (2x değil)

## Erişilebilirlik Kriteri

- [ ] Semantik HTML (`section`, `article`, `nav`, `main`)
- [ ] Dekoratif görsel/canvas: `aria-hidden="true"`
- [ ] Form alanları: `label` + `id` bağlantısı
- [ ] Renk kontrastı: WCAG AA minimum (metin/arka plan ≥4.5:1)

## Release Kriteri

- [ ] `docs/lean/release-checklist.md` 20 madde gözden geçirildi
- [ ] `ACTIVE_TASK.md` sonraki phase için hazır
- [ ] Commit + push `claude/[branch]` → PR oluşturulabilir
- [ ] Lovable preview'da test edildi (mümkünse)

## Headless Kısıt Notları

Aşağıdaki kriterler canlı tarayıcıda kontrol edilmeli (CI'da skip):
- Browser console'da "already registered" uyarısı yok
- Animasyon timing görsel doğrulama
- GSAP ScrollTrigger.getAll().length route geçişten sonra artmıyor
- Lighthouse Performance skoru
