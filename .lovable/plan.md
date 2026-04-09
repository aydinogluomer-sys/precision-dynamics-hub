```
Fix QuickQuote panel background to match the dark hero theme.
DO NOT change any animations, layout, component logic, or content.
ONLY change the specific values listed below.

═══════════════════════════════════════════════════════
CHANGE 1 — src/components/HeroSection.tsx
═══════════════════════════════════════════════════════

Find line ~444:
backgroundColor: "hsl(var(--forge-mist))"
Change to:
backgroundColor: "hsl(var(--forge-obsidian))"

Find the MotionGradientBg block (~line 447-450).
Delete the entire MotionGradientBg JSX element including
its opening tag, props, and closing tag. Remove its import
statement at the top of the file if it becomes unused.

═══════════════════════════════════════════════════════
CHANGE 2 — src/components/QuickQuoteSection.tsx
═══════════════════════════════════════════════════════

──────────────────────────────────────────────────────
2A — Section background (~line 70)
──────────────────────────────────────────────────────
Find the section-level backgroundColor value.
Change to:
backgroundColor: "hsl(var(--forge-obsidian))"

Do NOT use transparent — the panel must have its own
solid dark background to prevent scroll bleed-through
from sections below.

──────────────────────────────────────────────────────
2B — Radial gradient opacity (~line 76)
──────────────────────────────────────────────────────
Find the radial gradient definition.
Change opacity from 0.06 to 0.08.
Keep teal/primary color tone unchanged.

──────────────────────────────────────────────────────
2C — Delete ElegantShape block (~line 81-154)
──────────────────────────────────────────────────────
Find the ElegantShape JSX block. Delete the entire block
including all nested elements. Remove its import statement
at the top of the file if it becomes unused.

──────────────────────────────────────────────────────
2D — Text colors (~line 167-171)
──────────────────────────────────────────────────────
Find heading color:
"hsl(var(--forge-gunmetal))"
Change to:
"white"

Find subtext color:
"hsl(var(--forge-steel) / 0.6)"
Change to:
"rgba(255,255,255,0.5)"

──────────────────────────────────────────────────────
2E — Card backgrounds (~line 178-180)
──────────────────────────────────────────────────────
Find main card background:
"rgba(255,255,255,0.7)"
Change to:
"rgba(255,255,255,0.08)"

Find card border:
"rgba(0,113,144,0.18)"
Change to:
"rgba(0,113,144,0.25)"

For any nested cards or form input backgrounds within
this component, apply:
background: rgba(255,255,255,0.06)
border: 1px solid rgba(255,255,255,0.12)

──────────────────────────────────────────────────────
2F — Drop zone texts (~line 293-296)
──────────────────────────────────────────────────────
Find all text color values inside the drop zone area
that reference dark colors (forge-gunmetal, forge-steel,
or any dark hex/hsl values).
Change all of them to white or rgba(255,255,255,0.X):
- Primary drop zone text → "white"
- Secondary drop zone text → "rgba(255,255,255,0.5)"
- Icon colors inside drop zone → "rgba(255,255,255,0.4)"

──────────────────────────────────────────────────────
2G — Quick stats cards (~line 356-357)
──────────────────────────────────────────────────────
Find quick stats card backgrounds:
White or light backgrounds → "rgba(255,255,255,0.06)"
Find quick stats text colors:
Dark text colors → "white" or "rgba(255,255,255,0.6)"

──────────────────────────────────────────────────────
2H — Global forge color sweep
──────────────────────────────────────────────────────
After applying all above changes, scan the entire
QuickQuoteSection.tsx file for any remaining references to:
- "hsl(var(--forge-gunmetal))"
- "hsl(var(--forge-steel))"
- "hsl(var(--forge-mist))"
- Any rgba with dark values used as text on dark background

Replace each with the appropriate light equivalent:
- Heading/label text → "white"
- Body/secondary text → "rgba(255,255,255,0.6)"
- Muted/placeholder text → "rgba(255,255,255,0.35)"

═══════════════════════════════════════════════════════
VERIFICATION
═══════════════════════════════════════════════════════

After applying all changes confirm:
1. MotionGradientBg is fully removed from HeroSection.tsx
   and its import is cleaned up
2. ElegantShape is fully removed from QuickQuoteSection.tsx
   and its import is cleaned up
3. No light-colored text remains on dark background
4. Section background is solid obsidian, NOT transparent
5. Card opacity is 0.08 (not 0.06 — too invisible)
6. No blue wave effects remain in either component

DO NOT modify: layout, spacing, animation logic, form
functionality, file upload behavior, or any other component.
 
```