import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newContext({ viewport: { width: 1440, height: 900 } }).then((c) => c.newPage());
await p.goto("http://localhost:5173/", { waitUntil: "networkidle" });
await p.waitForTimeout(500);
const info = await p.evaluate(() => {
  const out = [];
  document.querySelectorAll("main > section, footer").forEach((el) => {
    const r = el.getBoundingClientRect();
    // find a heading inside and its opacity
    const h = el.querySelector("h1,h2,h3");
    const cs = h ? getComputedStyle(h) : null;
    out.push({
      id: el.id || el.tagName,
      top: Math.round(r.top + window.scrollY),
      height: Math.round(r.height),
      headingOpacity: cs ? cs.opacity : "n/a",
    });
  });
  return { body: document.documentElement.scrollHeight, sections: out };
});
console.log("scrollHeight:", info.body);
console.table(info.sections);
await b.close();
