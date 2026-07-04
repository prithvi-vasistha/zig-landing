import { chromium } from "playwright";
const OUT = "/private/tmp/claude-501/-Users-ppv-Projects-Zen-i-Guess/d7b1b3ae-f055-46fc-8d59-41ea860cc4be/scratchpad";
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1.5 });
const p = await ctx.newPage();
const errors = [];
p.on("pageerror", (e) => errors.push("PAGEERROR " + e.message));
p.on("console", (m) => m.type() === "error" && errors.push(m.text()));
await p.goto("http://localhost:5173/", { waitUntil: "networkidle" });
await p.evaluate(() => document.fonts.ready);

// Scroll gradually so IntersectionObservers fire like a real user.
await p.evaluate(async () => {
  const step = 400;
  for (let y = 0; y <= document.body.scrollHeight; y += step) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 60));
  }
});
await p.waitForTimeout(500);

// Every heading + CTA/footer must be visible (opacity 1) after the pass.
const vis = await p.evaluate(() => {
  const bad = [];
  document.querySelectorAll("h1,h2,h3").forEach((h) => {
    let el = h, op = 1;
    while (el) { const o = parseFloat(getComputedStyle(el).opacity); if (o < op) op = o; el = el.parentElement; }
    if (op < 0.99) bad.push({ text: h.textContent.slice(0, 40), op });
  });
  return bad;
});

// Capture CTA + footer region
await p.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await p.waitForTimeout(500);
await p.screenshot({ path: `${OUT}/qa-bottom.png` });

console.log("hidden headings:", JSON.stringify(vis));
console.log("errors:", errors.length ? errors : "none");
await b.close();
