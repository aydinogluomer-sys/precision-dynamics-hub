

## Root Cause Analysis: Blurry Text in "Neden Mas Technic?" and "Kabiliyetler" Sections

The blur is caused by **Framer Motion's scroll-linked `y` transforms** applied to elements inside `sticky` containers. When `useTransform` produces sub-pixel values (e.g., `y: 12.7px`), the browser's GPU compositor renders text on fractional pixel boundaries, causing anti-aliasing artifacts that appear as blur. This affects both sections because they share the same sticky + scroll-driven animation pattern.

Other sections without this sticky scroll-animation pattern don't have the issue, even with identical colors/fonts.

## Fix

Add `transform: translateZ(0)` and `backfaceVisibility: 'hidden'` to all `motion.div` elements that use scroll-linked `style={{ y, opacity }}` in both components. This forces proper GPU layer isolation and pixel-snapping.

### Files to edit:

1. **`src/components/WhyUsSection.tsx`**
   - On header `motion.div` (line 126): add `backfaceVisibility: 'hidden', translateZ: 0` to style
   - On each `WhyUsCard` `motion.div` (line 173): same treatment
   - On badges `motion.div` elements (lines 141, 151): same treatment

2. **`src/components/CapabilitiesSection.tsx`**
   - On header `motion.div` (line 134): add `backfaceVisibility: 'hidden', translateZ: 0` to style
   - On each `CapabilityCard` `motion.div` (line 162): same treatment

This is the same class of issue previously fixed by removing the global `will-change: transform` rule, but these components re-introduce GPU compositing through Framer Motion's inline transforms.

