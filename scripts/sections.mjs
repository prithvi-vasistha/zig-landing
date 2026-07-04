import { chromium } from "playwright";
const OUT = "/private/tmp/claude-501/-Users-ppv-Projects-Zen-i-Guess/d7b1b3ae-f055-46fc-8d59-41ea860cc4be/scratchpad";
const width = Number(process.argv[2] || 1440);
const tag = process.argv[3] || "sec";
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width, height: 900 }, deviceScaleFactor: 1.5 });
const p = await ctx.newPage();
await p.goto("http://localhost:5173/", { waitUntil: "networkidle" });
await p.evaluate(() => document.fonts.ready);
await p.waitForTimeout(400);
const ids = ["top", "how", "features", "privacy", "engineering"];
for (const id of ids) {
  await p.evaluate((i) => {
    const el = i === "top" ? document.body : document.getElementById(i);
    el?.scrollIntoView({ block: "start", behavior: "instant" });
    window.scrollBy(0, i === "top" ? 0 : -30);
  }, id);
  await p.waitForTimeout(650);
  await p.screenshot({ path: `${OUT}/${tag}-${id}.png` });
  console.log("shot", id);
}
// FAQ + CTA near bottom
await p.evaluate(() => window.scrollTo(0, document.body.scrollHeight - 1700));
await p.waitForTimeout(650);
await p.screenshot({ path: `${OUT}/${tag}-faqcta.png` });
console.log("shot faqcta");
await b.close();
