// Screenshot the running dev server across breakpoints + report console errors.
// Usage: node scripts/shoot.mjs [url] [outDir] [tag]
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const url = process.argv[2] || "http://localhost:5173/";
const outDir = process.argv[3] || "/private/tmp/claude-501/-Users-ppv-Projects-Zen-i-Guess/d7b1b3ae-f055-46fc-8d59-41ea860cc4be/scratchpad";
const tag = process.argv[4] || "shot";
await mkdir(outDir, { recursive: true });

const viewports = [
  { name: "mobile", width: 390, height: 844 },
  { name: "tablet", width: 834, height: 1112 },
  { name: "desktop", width: 1440, height: 900 },
];

const browser = await chromium.launch();
const errors = [];

for (const vp of viewports) {
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 2,
    reducedMotion: "no-preference",
  });
  const page = await ctx.newPage();
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(`[${vp.name}] ${m.text()}`);
  });
  page.on("pageerror", (e) => errors.push(`[${vp.name}] PAGEERROR ${e.message}`));
  await page.goto(url, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(700);
  const file = `${outDir}/${tag}-${vp.name}.png`;
  await page.screenshot({ path: file, fullPage: true });
  console.log("shot:", file);
  // horizontal overflow check
  const overflow = await page.evaluate(() => {
    const de = document.documentElement;
    return { scrollW: de.scrollWidth, clientW: de.clientWidth };
  });
  if (overflow.scrollW > overflow.clientW + 1)
    errors.push(`[${vp.name}] H-OVERFLOW scrollW=${overflow.scrollW} clientW=${overflow.clientW}`);
  await ctx.close();
}

await browser.close();
if (errors.length) {
  console.log("\n=== ISSUES ===");
  errors.forEach((e) => console.log(e));
  process.exit(2);
} else {
  console.log("\nNo console errors or horizontal overflow.");
}
