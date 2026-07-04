// Deterministic, offline image pipeline for the ZiG landing page.
// Crops dead margins, emits modern formats (AVIF + WebP) at responsive widths.
// No network, no external service — screenshots never leave the machine.
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const RAW = resolve(root, "assets-raw");
const OUT = resolve(root, "public/screens");
await mkdir(OUT, { recursive: true });

// Full-screen phone captures (1440x3120). Kept whole for device realism.
const phones = ["managed", "classify", "rules"];
const PHONE_W = 760; // ~2x the largest CSS render width

async function emit(pipeline, name, width) {
  const base = pipeline.clone().resize({ width, withoutEnlargement: true });
  await base.clone().avif({ quality: 62, effort: 6 }).toFile(resolve(OUT, `${name}.avif`));
  await base.clone().webp({ quality: 80, effort: 6 }).toFile(resolve(OUT, `${name}.webp`));
}

for (const p of phones) {
  await emit(sharp(resolve(RAW, `${p}.jpg`)), p, PHONE_W);
  console.log(`phone: ${p}`);
}

// The notification-shade "heads-up" card, cropped from the clean shade capture
// (1440x2519) and given rounded corners so it floats cleanly over the hero.
const cardW = 1336, cardH = 300, cardX = 52, cardY = 78, radius = 46;
const mask = await sharp(
  Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${cardW}" height="${cardH}"><rect width="${cardW}" height="${cardH}" rx="${radius}" ry="${radius}" fill="#fff"/></svg>`
  )
)
  .resize(cardW, cardH)
  .png()
  .toBuffer();
const cardBuf = await sharp(resolve(RAW, "shade.jpg"))
  .extract({ left: cardX, top: cardY, width: cardW, height: cardH })
  .composite([{ input: mask, blend: "dest-in" }])
  .png()
  .toBuffer();
await sharp(cardBuf).resize({ width: 900 }).webp({ quality: 88, effort: 6 }).toFile(resolve(OUT, "notif-card.webp"));
await sharp(cardBuf).resize({ width: 900 }).png().toFile(resolve(OUT, "notif-card-preview.png"));
console.log("card: notif-card");

// App logo (the real ZiG enso). Emit brand-mark sizes for nav/footer/CTA…
const logoSrc = resolve(RAW, "logo.png");
await sharp(logoSrc).resize({ width: 96 }).webp({ quality: 92 }).toFile(resolve(OUT, "logo.webp"));
await sharp(logoSrc).resize({ width: 192 }).webp({ quality: 92 }).toFile(resolve(OUT, "logo@2x.webp"));
await sharp(logoSrc).resize({ width: 256 }).png().toFile(resolve(OUT, "logo.png"));

// …and favicons into public/ root.
const PUB = resolve(root, "public");
await sharp(logoSrc).resize(32, 32).png().toFile(resolve(PUB, "favicon-32.png"));
await sharp(logoSrc).resize(180, 180).png().toFile(resolve(PUB, "apple-touch-icon.png"));
await sharp(logoSrc).resize(512, 512).png().toFile(resolve(PUB, "icon-512.png"));
console.log("logo + favicons done");

// Open Graph share card (1200x630). Logo composited over a dark brand panel.
const ogBg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs>
    <radialGradient id="g" cx="26%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#12241b"/>
      <stop offset="55%" stop-color="#0A0B0A"/>
      <stop offset="100%" stop-color="#0A0B0A"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <rect x="0.5" y="0.5" width="1199" height="629" fill="none" stroke="#ffffff" stroke-opacity="0.06"/>
  <g font-family="Helvetica Neue, Arial, sans-serif">
    <text x="248" y="300" font-size="64" font-weight="600" letter-spacing="-2" fill="#F1F3F1">Only the notifications</text>
    <text x="248" y="374" font-size="64" font-weight="600" letter-spacing="-2" fill="#F1F3F1">that <tspan fill="#6FC998">matter.</tspan></text>
    <text x="250" y="452" font-size="26" fill="#A7ADA8">On-device notification filtering for Android</text>
    <text x="250" y="516" font-size="22" letter-spacing="1" fill="#5DB187" font-family="monospace">NO CLOUD · NO TRACKING · NO INTERNET PERMISSION</text>
  </g>
</svg>`);
const ogLogo = await sharp(logoSrc).resize(150, 150).png().toBuffer();
await sharp(ogBg)
  .composite([{ input: ogLogo, left: 80, top: 200 }])
  .png()
  .toFile(resolve(OUT, "og.png"));
console.log("og card done");
