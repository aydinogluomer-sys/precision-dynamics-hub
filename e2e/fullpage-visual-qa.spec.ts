import { test, expect, type Locator } from "@playwright/test";
import { assertLovableAuthWasNotCaptured, freezeVisualState, gotoAndSettle } from "./helpers";

const LANDING_ROUTES = ["/"] as const;
const SNAPSHOT_DIR = "test-results/fullpage-static";

async function assertNoCriticalOverlap(subject: Locator, blockers: Locator[], label: string) {
  const subjectBox = await subject.boundingBox();
  expect(subjectBox, `${label} target must be measurable`).not.toBeNull();
  if (!subjectBox) return;

  for (const blocker of blockers) {
    const count = await blocker.count();
    for (let index = 0; index < count; index += 1) {
      const box = await blocker.nth(index).boundingBox();
      if (!box) continue;
      const xOverlap = Math.max(0, Math.min(subjectBox.x + subjectBox.width, box.x + box.width) - Math.max(subjectBox.x, box.x));
      const yOverlap = Math.max(0, Math.min(subjectBox.y + subjectBox.height, box.y + box.height) - Math.max(subjectBox.y, box.y));
      const overlapArea = xOverlap * yOverlap;
      expect(overlapArea, `${label} overlaps blocker #${index}`).toBeLessThan(1);
    }
  }
}

test.describe("Static full-page screenshot visual QA", () => {
  for (const route of LANDING_ROUTES) {
    test(`captures ${route} without login page or fixed-control collisions`, async ({ page }, testInfo) => {
      await gotoAndSettle(page, route);
      await freezeVisualState(page);
      await assertLovableAuthWasNotCaptured(page);

      await expect(page.locator("header")).toBeVisible();
      await expect(page.locator("footer")).toBeVisible();

      const floatingControls = [page.locator('a[aria-label="Sohbet"]'), page.locator('button[aria-label="Yukarı çık"]')];
      await assertNoCriticalOverlap(page.locator("footer").first(), floatingControls, "footer");

      const safeRoute = route === "/" ? "index" : route.replace(/\W+/g, "_");
      const fileName = `${testInfo.project.name}-${safeRoute}-fullpage.png`;
      await page.screenshot({ path: `${SNAPSHOT_DIR}/${fileName}`, fullPage: true, animations: "disabled" });
    });
  }
});