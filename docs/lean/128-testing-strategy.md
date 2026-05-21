# Testing Strategy — Mas Technic Precision Dynamics Hub

## Test Katmanları

| Katman | Araç | Kapsam | Hız |
|--------|------|--------|-----|
| Unit | Vitest | Utility, hook, pure function | <10s |
| Component | @testing-library/react | UI render, interaction | <30s |
| E2E / Screenshot | Puppeteer | Critical user flow, visual regression | <2min |
| Build | Vite (`npm run build`) | TypeScript, bundle | <45s |
| Performance | Lighthouse CI | Core Web Vitals | <5min |

## Vitest — Unit Test

```typescript
// src/hooks/__tests__/use-reduced-motion.test.ts
import { renderHook } from "@testing-library/react"
import { usePrefersReducedMotion } from "../use-reduced-motion"

it("returns false when no media query preference", () => {
  const { result } = renderHook(() => usePrefersReducedMotion())
  expect(result.current).toBe(false)
})
```

**Koşturmak için:** `npm run test` (vitest watch) veya `npm run test -- --run` (CI)

## Component Test — @testing-library/react

```typescript
// src/components/__tests__/CertificationsSection.test.tsx
import { render, screen } from "@testing-library/react"
import { CertificationsSection } from "../CertificationsSection"

it("renders all 5 certifications", () => {
  render(<CertificationsSection />)
  expect(screen.getByText("ISO 9001:2015")).toBeInTheDocument()
  expect(screen.getByText("AS9100D")).toBeInTheDocument()
})
```

**Mock zorunluluğu:**
- GSAP mock: `vi.mock("gsap", () => ({ default: { context: () => ({ revert: vi.fn() }) } }))`
- Three.js canvas: `jsdom` WebGL desteklemez — `HeroCanvas` test'te skip
- Framer Motion: `vi.mock("framer-motion", () => ({ motion: { div: "div" } }))` (snapshot)

## Motion Test Yaklaşımı

GSAP/Framer Motion animasyonları headless'ta çalışmaz. Strateji:

1. **Animation props doğrulaması** — `gsap.from` çağrıldı mı? (spy)
2. **Reduced motion branch** — `prefers-reduced-motion: reduce` media query mock
3. **Görsel regression** — Puppeteer screenshot, CI'da referans image karşılaştırma

```typescript
// GSAP spy örneği
vi.mock("@/lib/animation-manager", () => ({
  gsap: {
    context: vi.fn(() => ({ revert: vi.fn() })),
    from: vi.fn(),
    to: vi.fn(),
  },
  ScrollTrigger: { create: vi.fn(), getAll: vi.fn(() => []) },
}))
```

## Mobile Test

- `useIsMobile` hook: `window.innerWidth` mock
- Lenis guard: `<768px` → Lenis init çağrılmıyor
- Touch event simulation: `@testing-library/user-event`

## Performance Test

```bash
# Lokal Lighthouse
npx lighthouse http://localhost:8080 \
  --only-categories=performance \
  --output=json \
  --chrome-flags="--headless --no-sandbox"

# Core Web Vitals threshold
# Performance ≥90, LCP <2.5s, CLS <0.1
```

## Supabase Test (Admin / Müşteri Panel)

- `.env.test` — test Supabase projesi (üretim verisi değil)
- `msw` (Mock Service Worker) — Supabase API mock (opsiyonel)
- RLS kuralları: sadece üretim'de tam test — CI skip

## CI Zorunlu Adımlar

```bash
npm run build      # TypeScript + bundle — blocker
npm run test -- --run  # Vitest unit — blocker
# npx lighthouse ... # performance — advisory (not blocker yet)
```
