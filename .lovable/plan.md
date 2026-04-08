Raporu okudum. Lovable için direkt execute edilebilir prompt yazıyorum — analiz değil, komut formatında.

---

```
You are working on a React + Vite + GSAP + Three.js + Framer Motion project. 
Apply ALL of the following fixes in order. Do NOT change any section's visual 
design, color scheme, or content. Only fix the technical and UX issues listed.

═══════════════════════════════════════════════════════
PHASE 1 — CRITICAL FIXES (apply first, these break functionality)
═══════════════════════════════════════════════════════

──────────────────────────────────────────────────────
FIX 1 — HeadlineStagger.tsx: Add forwardRef
──────────────────────────────────────────────────────
Find HeadlineStagger.tsx. Wrap the component with React.forwardRef:

```tsx
import { forwardRef } from 'react'

export const HeadlineStagger = forwardRef<HTMLDivElement, HeadlineStaggerProps>(
  ({ text, scrollRotateX, ...props }, ref) => {
    return (
      <div ref={ref} {...props}>
        {/* existing implementation unchanged */}
      </div>
    )
  }
)
HeadlineStagger.displayName = 'HeadlineStagger'

```

────────────────────────────────────────────────────── FIX 2 — SectionHeader.tsx: Add forwardRef ────────────────────────────────────────────────────── Find SectionHeader.tsx. Apply identical forwardRef pattern:

```tsx
export const SectionHeader = forwardRef<HTMLDivElement, SectionHeaderProps>(
  ({ ...props }, ref) => {
    return (
      <div ref={ref} {...props}>
        {/* existing implementation unchanged */}
      </div>
    )
  }
)
SectionHeader.displayName = 'SectionHeader'

```

────────────────────────────────────────────────────── FIX 3 — HeadlineStagger.tsx: Fix mobile overflow ────────────────────────────────────────────────────── Find where fontSize is set (likely clamp(3.5rem, 9vw, 9rem)). Change to:

```tsx
fontSize: 'clamp(2.2rem, 7.5vw, 9rem)'

```

Also add:

```tsx
wordBreak: 'break-word',
overflowWrap: 'break-word',
hyphens: 'auto',

```

────────────────────────────────────────────────────── FIX 4 — SectionDotNav.tsx: Add rAF throttle to scroll listener ────────────────────────────────────────────────────── Find the scroll event listener that calls updateActive(). Replace it with:

```tsx
useEffect(() => {
  if (isHidden) return
  let ticking = false

  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateActive()
        ticking = false
      })
      ticking = true
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true })
  return () => window.removeEventListener('scroll', onScroll)
}, [updateActive, isHidden])

```

Also replace any document.getElementById calls inside updateActive with IntersectionObserver. If updateActive uses a loop of getElementById calls, replace with:

```tsx
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setActive(entry.target.id)
      }
    })
  },
  { threshold: 0.5 }
)

sectionIds.forEach((id) => {
  const el = document.getElementById(id)
  if (el) observer.observe(el)
})

return () => observer.disconnect()

```

────────────────────────────────────────────────────── FIX 5 — Delete CursorFollower.tsx ────────────────────────────────────────────────────── Delete the file CursorFollower.tsx entirely. Remove any import of CursorFollower from App.tsx or any other file. Keep CustomCursor.tsx — it is the single cursor system.

═══════════════════════════════════════════════════════ PHASE 2 — PERFORMANCE FIXES ═══════════════════════════════════════════════════════

────────────────────────────────────────────────────── FIX 6 — HeroCanvas.tsx: Change position from fixed to absolute ────────────────────────────────────────────────────── Find HeroCanvas.tsx. Find className or style containing "fixed inset-0" or "position: fixed". Change to "absolute inset-0" or "position: absolute". Do not change any other styles.

────────────────────────────────────────────────────── FIX 7 — HeroSection.tsx: Remove duplicate hero-cnc.jpg loads ────────────────────────────────────────────────────── hero-cnc.jpg is currently loaded 3 times:

1. As video poster attribute
2. As a masked layer img/div
3. As a bgImg layer

Keep only ONE instance — the masked layer. Remove the bgImg layer element entirely. For the video poster, use a low-quality placeholder (solid dark color or inline base64 1x1 pixel) instead of the full image.

────────────────────────────────────────────────────── FIX 8 — HeroSection.tsx: Reduce scroll height from 650vh to 450vh ────────────────────────────────────────────────────── Find where Hero section height is defined as 650vh (likely in style={{ height: '650vh' }} or a className). Change to 450vh.

Then find the GSAP ScrollTrigger phases. There are 4 phases. Remove Phase 2 entirely (the pause/hold phase, typically 45-60% of scroll progress). Compress the remaining 3 phases to fill 0-100%:

- Phase 1 (mask reveal): 0% → 45%
- Phase 3 (horizontal slide): 45% → 85%
- Phase 4 (lava/exit): 85% → 100%

────────────────────────────────────────────────────── FIX 9 — MotionGradientBg.tsx: Pause WebGL when not in viewport ────────────────────────────────────────────────────── Find MotionGradientBg.tsx. Add IntersectionObserver to pause the rAF loop when not visible:

```tsx
const containerRef = useRef<HTMLDivElement>(null)
const isVisibleRef = useRef(false)

useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => { isVisibleRef.current = entry.isIntersecting },
    { threshold: 0 }
  )
  if (containerRef.current) observer.observe(containerRef.current)
  return () => observer.disconnect()
}, [])

// Inside the rAF loop, add at the top:
// if (!isVisibleRef.current) return

```

────────────────────────────────────────────────────── FIX 10 — servicePages.ts: Convert to lazy import ────────────────────────────────────────────────────── Find all files that import from servicePages.ts at the top level. Convert to dynamic imports inside the component:

```tsx
// BEFORE:
import { servicePages } from '@/data/servicePages'

// AFTER:
const [servicePages, setServicePages] = useState(null)
useEffect(() => {
  import('@/data/servicePages').then((m) => setServicePages(m.servicePages))
}, [])

```

═══════════════════════════════════════════════════════ PHASE 3 — SCROLL SYSTEM FIXES ═══════════════════════════════════════════════════════

────────────────────────────────────────────────────── FIX 11 — PageLoader.tsx: Lock scroll during loader ────────────────────────────────────────────────────── Find PageLoader.tsx. Add scroll locking logic:

```tsx
useEffect(() => {
  if (isVisible) {
    // Lock scroll when loader is active
    document.body.style.overflow = 'hidden'
    if (window.__lenis) window.__lenis.stop()
  } else {
    // Unlock scroll when loader finishes
    document.body.style.overflow = ''
    
    setTimeout(() => {
      if (window.__lenis) {
        window.__lenis.scrollTo(0, { immediate: true })
        window.__lenis.start()
      } else {
        window.scrollTo(0, 0)
      }
      // Recalculate all ScrollTrigger positions
      ScrollTrigger.refresh()
    }, 100)
  }
}, [isVisible])

```

Add this type declaration at the top of the file (outside component):

```tsx
declare global {
  interface Window { __lenis?: import('lenis').default }
}

```

────────────────────────────────────────────────────── FIX 12 — SmoothScrollProvider.tsx: Start Lenis in stopped state ────────────────────────────────────────────────────── Find SmoothScrollProvider.tsx. After lenis is initialized, immediately call lenis.stop() on first visit:

```tsx
const isFirstVisit = !sessionStorage.getItem('visited')

// After lenis initialization:
if (isFirstVisit) {
  lenis.stop()
} else {
  lenis.start()
}

sessionStorage.setItem('visited', 'true')

// Expose lenis instance globally for PageLoader
;(window as Window & { __lenis?: typeof lenis }).__lenis = lenis

```

────────────────────────────────────────────────────── FIX 13 — Index.tsx: ResizeObserver for ScrollTrigger.refresh() ────────────────────────────────────────────────────── Find Index.tsx (or the main page component). Add ResizeObserver on the main container:

```tsx
const mainRef = useRef<HTMLElement>(null)

useEffect(() => {
  const el = mainRef.current
  if (!el) return

  let prevHeight = el.offsetHeight
  let debounceTimer: ReturnType<typeof setTimeout>

  const observer = new ResizeObserver(() => {
    const newHeight = el.offsetHeight
    // Only fire on actual height change, not first render
    if (newHeight !== prevHeight) {
      prevHeight = newHeight
      clearTimeout(debounceTimer)
      debounceTimer = setTimeout(() => {
        ScrollTrigger.refresh()
      }, 200)
    }
  })

  observer.observe(el)
  return () => {
    observer.disconnect()
    clearTimeout(debounceTimer)
  }
}, [])

// Add ref to main element:
// <main ref={mainRef}>

```

═══════════════════════════════════════════════════════ PHASE 4 — CONTENT & STRUCTURAL FIXES ═══════════════════════════════════════════════════════

────────────────────────────────────────────────────── FIX 14 — IndustriesSection.tsx: Fix empty content ────────────────────────────────────────────────────── Find IndustriesSection.tsx. The section has a marquee band and title but no cards are rendering.

Check if:

1. Card data array exists but map() is not called
2. Conditional render is blocking (e.g. data is null/undefined)
3. CSS is hiding cards (overflow:hidden + height:0)

Fix whichever is the cause. If card data is missing entirely, add placeholder cards with this structure:

```tsx
const industries = [
  { id: 1, title: 'Savunma Sanayii', icon: '⚙️' },
  { id: 2, title: 'Havacılık', icon: '✈️' },
  { id: 3, title: 'Medikal', icon: '🔬' },
  { id: 4, title: 'Otomotiv', icon: '🚗' },
  { id: 5, title: 'Denizcilik', icon: '⚓' },
  { id: 6, title: 'Enerji', icon: '⚡' },
]

```

────────────────────────────────────────────────────── FIX 15 — Sticky z-index stacking order ────────────────────────────────────────────────────── Find all section components that use position:sticky and have z-index values. There are approximately 18 such sections with z-index 1-17.

Ensure z-index values are assigned in DESCENDING order — the FIRST section should have the HIGHEST z-index so it appears on top when sections stack:

```
HeroSection:        z-index: 18
LavaTypography:     z-index: 17
MoldCast:           z-index: 16
CNCScrollStory:     z-index: 15
NexusPromo:         z-index: 14
HowWeWork:          z-index: 13
Certifications:     z-index: 12
VideoScroll:        z-index: 11
Services:           z-index: 10
Industries:         z-index: 9
ProjectShowcase:    z-index: 8
MaterialMorph:      z-index: 7
Materials:          z-index: 6
WhyUs:              z-index: 5
Capabilities:       z-index: 4
Testimonials:       z-index: 3
FAQ:                z-index: 2
FinalCTA:           z-index: 1

```

Apply these z-index values to each section's wrapper element.

═══════════════════════════════════════════════════════ EXECUTION ORDER — IMPORTANT ═══════════════════════════════════════════════════════

Apply fixes in this exact order:

1. FIX 5 (delete CursorFollower) — prevents conflicts
2. FIX 1, FIX 2 (forwardRef) — stops console spam
3. FIX 15 (z-index) — structural
4. FIX 11, FIX 12, FIX 13 (scroll system) — scroll lock
5. FIX 4 (SectionDotNav) — scroll performance
6. FIX 3 (mobile font) — visual
7. FIX 6, FIX 7, FIX 8 (hero fixes) — hero performance
8. FIX 9, FIX 10 (lazy/IO fixes) — general performance
9. FIX 14 (Industries content) — content fix

Do NOT modify: color scheme, typography choices, animation easing curves, section order, or any content/copy. Do NOT add new dependencies. Report which files were modified after completion.

```

---

**Performans Notu:** Bu prompt'u **tek seferde** verme — Lovable 15 fix'i aynı anda almak yerine bazen yarısında karışıyor. Phase 1 → build al → Phase 2 → build al → Phase 3+4 şeklinde ver. Her phase sonrası build log'unu paylaş, sıradakini buna göre ayarlayalım.

```