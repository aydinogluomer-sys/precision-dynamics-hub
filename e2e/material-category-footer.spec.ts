import { test, expect } from "@playwright/test";
import { gotoAndSettle, revealFooterCopyright } from "./helpers";

test.describe("/malzemeler/:slug footer overlap regression", () => {
  test("local CTA and hero do not overlap footer on aluminyum", async ({ page }, testInfo) => {
    await gotoAndSettle(page, "/malzemeler/aluminyum");
    await revealFooterCopyright(page);

    const footer = page.locator("footer").first();
    const heroHeading = page.getByRole("heading", { level: 1 }).first();
    const localCta = page.locator("section", { has: page.getByRole("link", { name: /teklif al/i }) }).last();

    await expect(footer).toBeVisible();
    await expect(heroHeading).toBeVisible();
    await expect(localCta).toBeVisible();

    const [footerBox, heroBox, ctaBox] = await Promise.all([
      footer.boundingBox(),
      heroHeading.boundingBox(),
      localCta.boundingBox(),
    ]);

    expect(footerBox, "footer bounding box must exist").not.toBeNull();
    expect(heroBox, "hero heading bounding box must exist").not.toBeNull();
    expect(ctaBox, "local CTA bounding box must exist").not.toBeNull();

    expect(heroBox!.y + heroBox!.height).toBeLessThanOrEqual(footerBox!.y + 1);
    expect(ctaBox!.y + ctaBox!.height).toBeLessThanOrEqual(footerBox!.y + 1);

    await testInfo.attach(`material-category-footer-${testInfo.project.name}.png`, {
      body: await page.screenshot({ fullPage: false }),
      contentType: "image/png",
    });
  });
});