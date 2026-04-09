```
Fix light mode color inconsistency. Dark sections appear pure black
in light mode, creating visual dissonance with lighter sections.
DO NOT change dark mode values, animations, layout, or z-index.

═══════════════════════════════════════════════════════
CHANGE 1 — src/index.css — Light mode forge variables
═══════════════════════════════════════════════════════

Find the :root block (light mode defaults).
Change ONLY these three variable values:

--forge-obsidian: 0 0% 6%        → 215 10% 24%
--forge-gunmetal: 240 28% 14%    → 220 12% 30%
--forge-iron:     220 46% 16%    → 215 18% 27%

Do NOT touch the .dark block. Dark mode values stay exactly
as they are.

═══════════════════════════════════════════════════════
CHANGE 2 — Cinematic scenes: hardcoded dark background
═══════════════════════════════════════════════════════

In each of the following 6 files, find ALL occurrences of:
  hsl(var(--forge-obsidian))
  hsl(var(--forge-gunmetal))
  hsl(var(--forge-iron))

used as background-color or backgroundColor values.
Replace each with: #0f0f0f

These scenes always require pure black — they contain
video, canvas, or white text overlays that must never
be affected by theme changes.

Files to update:
  - src/components/LavaTypographyScene.tsx
  - src/components/MoldCastScene.tsx
  - src/components/CNCScrollStory.tsx
  - src/components/VideoScrollSection.tsx
  - src/components/MaterialMorphScroll.tsx
  - src/components/HeroSection.tsx  ← includes QuickQuote panel

For HeroSection.tsx specifically: ALL forge variable
background references become #0f0f0f — including the
QuickQuote panel background set in the previous fix.
The QuickQuote panel must stay pure black in both themes.

Do NOT replace forge variables used for text color,
border color, or non-background purposes in these files.
ONLY replace background/backgroundColor usages.

═══════════════════════════════════════════════════════
CHANGE 3 — src/pages/Index.tsx — Wave SVG fill
═══════════════════════════════════════════════════════

Find the Wave SVG element. It has a hardcoded:
  fill="#1a1a2e"

Replace with a theme-aware value:
  style={{ fill: 'hsl(var(--forge-gunmetal))' }}

Remove the hardcoded fill attribute after adding the style prop.

═══════════════════════════════════════════════════════
CHANGE 4 — src/components/CertificationsSection.tsx
═══════════════════════════════════════════════════════

Find the <style> block containing:
  .dark #sertifikalar { background-color: ... !important; }

Do NOT delete it. Comment it out:
  {/* .dark #sertifikalar { background-color: ... !important; } */}

Reason: CSS variable now handles theme difference automatically.
Keeping it commented allows quick revert if dark mode regression
appears during testing.

═══════════════════════════════════════════════════════
CHANGE 5 — src/components/NexusPromoSection.tsx
═══════════════════════════════════════════════════════

Find the root element that has BOTH:
  className="... bg-[hsl(var(--forge-gunmetal))] ..."
  style={{ backgroundColor: "hsl(var(--forge-gunmetal))" }}

Remove the inline style={{ backgroundColor }} declaration.
Keep the className version only.

The Tailwind class already handles theme-awareness via
the CSS variable — the duplicate inline style is redundant
and can cause specificity conflicts.

═══════════════════════════════════════════════════════
VERIFICATION CHECKLIST
═══════════════════════════════════════════════════════

After applying all changes confirm:

1. :root block has updated forge-obsidian/gunmetal/iron values
2. .dark block is completely unchanged
3. All 6 cinematic scene files use #0f0f0f for backgrounds
4. HeroSection + QuickQuote backgrounds are #0f0f0f (not CSS var)
5. Wave SVG uses style={{ fill }} not hardcoded hex
6. CertificationsSection dark override is COMMENTED, not deleted
7. NexusPromo has single className background declaration
8. No forge variable background references remain in the 6
   cinematic scene files
9. Text colors, border colors, non-background forge usages
   in cinematic files are untouched

DO NOT modify: dark mode values, animations, scroll behavior,
typography, section order, z-index, or any component not
listed above.

```