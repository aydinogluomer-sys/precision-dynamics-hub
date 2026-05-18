/* eslint-disable */
const puppeteer = require('puppeteer');
const { mkdirSync, existsSync, readdirSync, statSync } = require('fs');
const path = require('path');

const BASE = 'http://localhost:8081';
const OUT = '/tmp/section-screenshots';
const VIEWPORT_W = 1440;
const VIEWPORT_H = 900;

if (!existsSync(OUT)) mkdirSync(OUT, { recursive: true });

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--use-gl=swiftshader',
      '--enable-webgl',
      '--ignore-gpu-blocklist',
    ],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: VIEWPORT_W, height: VIEWPORT_H, deviceScaleFactor: 1 });

  // Disable animations for clean screenshots
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);

  console.log('Loading page...');
  await page.goto(BASE, { waitUntil: 'networkidle0', timeout: 60000 });

  // Wait for React + lazy sections to mount
  await page.waitForSelector('#main-content', { timeout: 20000 });
  console.log('React mounted.');

  // Pre-scroll to trigger all lazy-loaded sections
  console.log('Pre-scrolling to trigger lazy loading...');
  const pageH = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y <= pageH; y += VIEWPORT_H) {
    await page.evaluate(yy => window.scrollTo(0, yy), y);
    await new Promise(r => setTimeout(r, 250));
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise(r => setTimeout(r, 2000));

  // Helper: scroll to element and capture viewport screenshot
  async function screenshotSection(elId, outName) {
    const el = await page.$('#' + elId);
    if (!el) { console.log('❌ Not found: #' + elId); return false; }

    // Scroll element to top of viewport
    await page.evaluate(id => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
    }, elId);
    await new Promise(r => setTimeout(r, 1800)); // wait for whileInView animations

    // Get current scroll position (= document y of current viewport top)
    const scrollY = await page.evaluate(() => window.scrollY);
    const elHeight = await page.evaluate(id => {
      const el = document.getElementById(id);
      return el ? el.offsetHeight : VIEWPORT_H;
    }, elId);

    const clipH = Math.min(elHeight, VIEWPORT_H);

    await page.screenshot({
      path: path.join(OUT, outName + '.png'),
      clip: { x: 0, y: scrollY, width: VIEWPORT_W, height: clipH },
    });
    console.log('✅ ' + outName + '.png (' + VIEWPORT_W + '×' + clipH + ') @scrollY=' + scrollY);
    return true;
  }

  // Dismiss cookie banner
  try {
    await page.evaluate(() => {
      document.querySelectorAll('button').forEach(b => {
        if (b.textContent.match(/Kabul|Accept|OK|Anladım/i)) b.click();
      });
    });
    await new Promise(r => setTimeout(r, 500));
  } catch(e) {}

  // Section targets
  const targets = [
    { id: 'hero', name: '01-hero' },
    { id: 'neden-biz', name: '02-why-us' },
    { id: 'nasil-calisiyoruz', name: '03-how-we-work' },
    { id: 'sertifikalar', name: '04-certifications' },
    { id: 'video', name: '05-video-scroll' },
    { id: 'hizmetler', name: '06-services' },
    { id: 'endustriler', name: '07-industries' },
    { id: 'projeler', name: '08-project-showcase' },
    { id: 'malzeme-morph', name: '09-materials', fallback: 'malzemeler' },
    { id: 'kabiliyetler', name: '10-capabilities' },
    { id: 'muhendislik-uretim', name: '11-engineering' },
    { id: 'referanslar', name: '12-testimonials' },
    { id: 'sss-blog', name: '13-faq-blog', fallback: 'sss' },
  ];

  for (const t of targets) {
    let ok = await screenshotSection(t.id, t.name);
    if (!ok && t.fallback) {
      ok = await screenshotSection(t.fallback, t.name);
    }
    if (!ok) console.log('❌ Not found: ' + t.name);
  }

  // Final CTA — scroll to bottom
  await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' }));
  await new Promise(r => setTimeout(r, 1500));
  const finalScrollY = await page.evaluate(() => window.scrollY);
  const finalDocH = await page.evaluate(() => document.documentElement.scrollHeight);
  const ctaClipY = Math.max(0, finalDocH - VIEWPORT_H);
  await page.screenshot({
    path: path.join(OUT, '14-final-cta.png'),
    clip: { x: 0, y: ctaClipY, width: VIEWPORT_W, height: VIEWPORT_H },
  });
  console.log('✅ 14-final-cta.png @bottom');

  await browser.close();

  // List output
  const files = readdirSync(OUT).filter(f => f.endsWith('.png') && !f.startsWith('test-') && !f.startsWith('full-'));
  console.log('\n=== Output files ===');
  files.sort().forEach(f => {
    const stat = statSync(path.join(OUT, f));
    console.log(f, Math.round(stat.size / 1024) + 'KB');
  });
})();
