# Code Style Guide — Mas Technic Precision Dynamics Hub

## TypeScript

- Strict mode aktif (`tsconfig.json` — `"strict": true`)
- `type` değil `interface` kullan (union type için `type` ok)
- `any` yasak; bilinmeyenler için `unknown` + type guard
- Fonksiyon return type her zaman explicit (public API'de)
- Props interface adı: `ComponentNameProps`
- Event handler prop adı: `onActionName` (camelCase)

```typescript
// ✅
interface CardProps { title: string; onSelect: (id: string) => void }
// ❌
type CardProps = { title: any; onSelect: Function }
```

## React Component Kuralları

- Functional component, arrow function: `export const MyComp = () => { ... }`
- Default export yasak — named export zorunlu
- `useRef` generic: `useRef<HTMLDivElement>(null)` (null başlatma)
- `useEffect` dependency array her zaman eksiksiz (eslint-plugin-react-hooks)
- Component dosyası: tek component, ≤180 satır (aşarsa sub-component dosyasına böl)
- Sub-component aynı dosyada kalabilir ama 180 satır sınırı geçersiz sayılır

## Dosya/Klasör İsimlendirme

| Tür | Format | Örnek |
|-----|--------|-------|
| Component | PascalCase.tsx | `HeroSection.tsx` |
| Hook | camelCase, `use-` prefix | `use-gsap.ts` |
| Util | camelCase | `useLocalTexture.ts` |
| Doc | kebab-case | `042-code-style-guide.md` |
| Asset | kebab-case | `cnc-workshop.jpg` |
| CSS class (custom) | kebab-case | `.forge-iron`, `.section-industrial` |

## Tailwind CSS Kuralları

- Hardcoded renk yasak: `text-[#e8610a]` ❌ → `text-[hsl(var(--forge-molten))]` ✅
- CSS custom property syntax: `hsl(var(--token-name))` — parantez dahil
- Utility sınırı aşılırsa `@layer components` bloğu kullan (`src/index.css`)
- `!important` (`!` prefix) yasak
- Responsive: `md:` / `lg:` prefix, mobil önce yaz

## Animation Değişken İsimlendirme

```typescript
// GSAP ref'leri
const sectionRef = useRef<HTMLElement>(null)     // section root
const headerRef  = useRef<HTMLHeadingElement>(null)
const ctx        = gsap.context(...)             // tek harf değil

// Framer Motion variants
const containerVariants: Variants = { ... }
const itemVariants: Variants = { ... }

// ScrollTrigger
const st = ScrollTrigger.create({ ... })
st.kill()   // cleanup
```

## Import Sıralaması (prettier-plugin-organize-imports değil — elle)

```typescript
// 1. React core
import { useRef, useEffect } from "react"

// 2. Üçüncü taraf kütüphaneler
import { motion } from "framer-motion"
import { gsap } from "@/lib/animation-manager"

// 3. İç component'ler — @/ alias
import { Button } from "@/components/ui/button"

// 4. Relative import'lar
import { SectionHeader } from "./SectionHeader"

// 5. Asset'ler
import heroBg from "@/assets/hero-cnc.jpg"
```

## Yorum Kuralı

Yorum yazma — açıklayıcı değişken adları yeterli.
Tek istisna: Neden açık değilse, kısıtlama/workaround varsa, bir satır max.

```typescript
// ❌
// Get the element and animate it
const el = containerRef.current
gsap.from(el, { opacity: 0 })

// ✅ (sadece non-obvious WHY)
// gsap.context scope = containerRef → cleanup includes all child tweens
const ctx = gsap.context(() => { ... }, containerRef)
```
