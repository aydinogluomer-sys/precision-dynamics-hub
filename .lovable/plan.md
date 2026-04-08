Bu plan doğru teşhis edilmiş. Lovable prompt:

---

```
Fix critical z-index stacking issue. All middle sections 
(NexusPromo through FinalCTA) are invisible during scroll — 
early FlowScenes (z=10-12) are covering later sections (z=4-9).

DO NOT change any visual design, animations, colors, or content.
ONLY change z-index values and remove duplicate z-index declarations.

═══════════════════════════════════════════════════════
CHANGE 1 — src/styles/z-index.ts
═══════════════════════════════════════════════════════

Keep ALL existing utility z-index values (header, cursor, modal etc.) 
exactly as they are. ADD this new export at the bottom of the file:

```ts
export const SECTION_Z = {
  hero:                    1,
  lavaTypography:          2,
  moldCast:                3,
  cncStory:                4,
  nexus:                   5,
  nexusToHwwGlow:          6,
  howWeWork:               7,
  hwwToCertGlow:           8,
  certifications:          9,
  videoScroll:             10,
  videoToServicesGlow:     11,
  services:                12,
  glowLine:                12,
  industries:              13,
  industriesToProjectGlow: 14,
  projectShowcase:         15,
  materialMorph:           16,
  materials:               17,
  wave:                    18,
  whyUs:                   19,
  whyToCapGlow:            20,
  capabilities:            21,
  testimonials:            22,
  faqBlog:                 23,
  faqToCtaGlow:            24,
  finalCta:                25,
} as const

```

═══════════════════════════════════════════════════════ CHANGE 2 — src/pages/Index.tsx ═══════════════════════════════════════════════════════

Add import at top:

```ts
import { SECTION_Z } from '@/styles/z-index'

```

Find every Scene and FlowScene wrapper that has a z prop or zIndex value. Replace each with the corresponding SECTION_Z value:


| Component / wrapper      | Old z value | New z value                                 |
| ------------------------ | ----------- | ------------------------------------------- |
| Hero Scene/wrapper       | any         | SECTION_Z.hero                              |
| LavaTypography FlowScene | 10          | SECTION_Z.lavaTypography                    |
| MoldCast FlowScene       | 11          | SECTION_Z.moldCast                          |
| CNCScrollStory FlowScene | 12          | SECTION_Z.cncStory                          |
| NexusPromo Scene         | 4           | SECTION_[Z.nexus](http://Z.nexus)           |
| nexusToHwwGlow           | any         | SECTION_Z.nexusToHwwGlow                    |
| HowWeWork Scene          | 5           | SECTION_Z.howWeWork                         |
| hwwToCertGlow            | any         | SECTION_Z.hwwToCertGlow                     |
| Certifications Scene     | 6           | SECTION_Z.certifications                    |
| VideoScroll Scene        | 7           | SECTION_Z.videoScroll                       |
| videoToServicesGlow      | any         | SECTION_Z.videoToServicesGlow               |
| Services Scene           | 8           | SECTION_[Z.services](http://Z.services)     |
| glowLine                 | any         | SECTION_Z.glowLine                          |
| Industries Scene         | 9           | SECTION_[Z.industries](http://Z.industries) |
| industriesToProjectGlow  | any         | SECTION_Z.industriesToProjectGlow           |
| ProjectShowcase Scene    | any         | SECTION_Z.projectShowcase                   |
| MaterialMorph FlowScene  | any         | SECTION_Z.materialMorph                     |
| Materials Scene          | any         | SECTION_Z.materials                         |
| wave/transition          | any         | SECTION_Z.wave                              |
| WhyUs Scene              | any         | SECTION_Z.whyUs                             |
| whyToCapGlow             | any         | SECTION_Z.whyToCapGlow                      |
| Capabilities Scene       | any         | SECTION_Z.capabilities                      |
| Testimonials Scene       | any         | SECTION_Z.testimonials                      |
| FaqBlog Scene            | any         | SECTION_Z.faqBlog                           |
| faqToCtaGlow             | any         | SECTION_Z.faqToCtaGlow                      |
| FinalCTA Scene           | 17          | SECTION_Z.finalCta                          |


═══════════════════════════════════════════════════════ CHANGE 3 — src/components/LavaTypographyScene.tsx ═══════════════════════════════════════════════════════

Find the root div of this component. If it has any of these:

- style={{ zIndex: ... }}
- style={{ zIndex: Z.lavaTypography }}
- className containing z-10, z-[10], or any z-index Tailwind class

REMOVE the zIndex from the root div entirely. The z-index is now controlled by the FlowScene wrapper in Index.tsx. Do not touch any other styles or logic in this file.

═══════════════════════════════════════════════════════ CHANGE 4 — src/components/MoldCastScene.tsx ═══════════════════════════════════════════════════════

Same as CHANGE 3. Find root div, remove any inline zIndex style or Tailwind z-index class from it. Leave everything else unchanged.

═══════════════════════════════════════════════════════ CHANGE 5 — src/components/LiquidImage.tsx: forwardRef fix ═══════════════════════════════════════════════════════

Wrap the component with React.forwardRef:

```tsx
import { forwardRef } from 'react'

export const LiquidImage = forwardRef<HTMLDivElement, LiquidImageProps>(
  ({ ...props }, ref) => {
    return (
      <div ref={ref} {...props}>
        {/* existing implementation unchanged */}
      </div>
    )
  }
)
LiquidImage.displayName = 'LiquidImage'

```

═══════════════════════════════════════════════════════ VERIFICATION CHECKLIST ═══════════════════════════════════════════════════════

After applying changes, confirm:

1. No two sections (excluding glowLine/services) share the same z-index
2. SECTION_Z values range from 1-25 only
3. Existing utility z-index values (header=50, cursor=90 etc.) are untouched
4. LavaTypographyScene and MoldCastScene root divs have NO inline zIndex style
5. FinalCTA z-index is 25, NOT 17

Do NOT modify: animations, scroll behavior, colors, component logic, or any file not listed above. Report the exact z-index value applied to each section after completion.

```

---

**Performans Notu:** Bu fix sonrası muhtemelen bazı glow/transition elemanları yanlış katmanda görünebilir — section'ların arasına sıkışabilirler. Build sonrası ekran görüntüsü at, kontrol edelim.
 
```