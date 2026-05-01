import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

/**
 * Regression: top-level marketing sections must use the standard vertical
 * rhythm (`py-24 md:py-32 lg:py-40`) — directly or via `.section-industrial`
 * — and align inner containers to `px-6 lg:px-8`.
 */
const STANDARD_PY = "py-24 md:py-32 lg:py-40";
const STANDARD_PX = /px-6\s+lg:px-8/;

const SECTIONS: { file: string; mobileBranchOnly?: boolean }[] = [
  { file: "src/components/CapabilitiesSection.tsx" },
  { file: "src/components/MaterialsSection.tsx" },
  { file: "src/components/StatsSection.tsx" },
  { file: "src/components/TestimonialsSection.tsx" },
  { file: "src/components/FinalCTASection.tsx" },
  { file: "src/components/WhyUsSection.tsx" },
  { file: "src/components/NexusPromoSection.tsx" },
  { file: "src/components/HowWeWorkSection.tsx", mobileBranchOnly: true },
];

const SECTION_INDUSTRIAL_USERS = [
  "src/components/ServicesSection.tsx",
  "src/components/QuickQuoteSection.tsx",
  "src/components/FAQBlogSection.tsx",
  "src/components/IndustriesSection.tsx",
  "src/components/ProjectShowcase.tsx",
];

const read = (rel: string) => readFileSync(resolve(process.cwd(), rel), "utf8");

describe("Section vertical padding standard", () => {
  for (const { file } of SECTIONS) {
    it(`${file} uses py-24 md:py-32 lg:py-40`, () => {
      expect(read(file)).toContain(STANDARD_PY);
    });
  }

  for (const file of SECTION_INDUSTRIAL_USERS) {
    it(`${file} uses .section-industrial token`, () => {
      expect(read(file)).toContain("section-industrial");
    });
  }
});

describe("Container horizontal padding standard", () => {
  const FILES_WITH_INLINE_CONTAINER = [
    "src/components/CapabilitiesSection.tsx",
    "src/components/NexusPromoSection.tsx",
    "src/components/QuickQuoteSection.tsx",
  ];
  for (const file of FILES_WITH_INLINE_CONTAINER) {
    it(`${file} uses px-6 lg:px-8`, () => {
      expect(read(file)).toMatch(STANDARD_PX);
    });
  }
});