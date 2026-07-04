# ZiG — landing page

The official landing page for **[ZiG (Zen i Guess)](https://github.com/prithvi-vasistha/zen-i-guess)**, an on-device Android notification interceptor.

**Live:** https://prithvi-vasistha.github.io/zig-landing/

## Stack

- React + TypeScript + Vite
- Tailwind CSS v4
- Framer Motion
- Self-hosted fonts (General Sans + Spline Sans Mono) — no third-party requests

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build      # → dist/
npm run preview
```

## Assets

Marketing screenshots are processed (cropped, converted to AVIF/WebP) entirely
offline by `scripts/process-images.mjs` — source captures never leave the machine.

```bash
node scripts/process-images.mjs
```

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site
and publishes it to GitHub Pages.

## License

MIT © 2026 Prithvi P Vasistha
