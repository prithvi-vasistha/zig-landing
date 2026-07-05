import { motion, useReducedMotion } from "framer-motion";
import { Download, ShieldCheck } from "lucide-react";
import { Button } from "../primitives/Button";
import { GithubMark } from "../primitives/GithubMark";
import { PhoneMockup } from "../primitives/PhoneMockup";
import { EASE_ENTER } from "../../lib/motion";
import { SITE } from "../../lib/site";

const TRUST = ["No internet permission", "100% on-device", "Open source · MIT"];

export function Hero() {
  const reduce = useReducedMotion();

  // A single orchestrated page-load, not fade-on-scroll for every element.
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
  };
  const item = {
    hidden: { opacity: 0, y: reduce ? 0 : 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_ENTER } },
  };

  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-16 sm:pt-32 lg:pt-40 lg:pb-24">
      <AmbientDepth />

      <div className="mx-auto grid w-full max-w-[var(--container-page)] grid-cols-1 items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:px-10">
        {/* Copy */}
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-xl">
          <motion.div variants={item}>
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-3 py-1.5 text-[0.78rem] text-muted backdrop-blur">
              <ShieldCheck className="h-3.5 w-3.5 text-accent" strokeWidth={1.8} aria-hidden />
              On-device notification filtering for Android
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-6 text-balance text-[clamp(2.6rem,1.3rem+4.6vw,4.6rem)] font-medium leading-[1.02] tracking-[-0.035em] text-ink"
          >
            Only the notifications
            <br className="hidden sm:block" /> that{" "}
            <span className="text-accent">matter.</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-[42ch] text-pretty text-[1.075rem] leading-relaxed text-muted"
          >
            ZiG intercepts every notification and decides right on your phone —
            deterministic rules first, a small on-device model only when they
            miss. No cloud. No tracking. No internet permission, at all.
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-3">
            <Button href={SITE.download} variant="primary" size="lg" external>
              <Download className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.8} aria-hidden />
              Download APK
            </Button>
            <Button href={SITE.repo} variant="secondary" size="lg" external>
              <GithubMark className="h-[1.15rem] w-[1.15rem]" />
              View source
            </Button>
          </motion.div>

          <motion.ul variants={item} className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
            {TRUST.map((t) => (
              <li key={t} className="flex items-center gap-2 text-[0.85rem] text-faint">
                <span className="h-1 w-1 rounded-full bg-accent" aria-hidden />
                {t}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Device */}
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE_ENTER, delay: 0.15 }}
          className="relative mx-auto w-full max-w-[300px] sm:max-w-[330px] lg:max-w-[360px]"
        >
          <PhoneMockup name="classify" alt="ZiG classifying notifications on-device, showing a block probability for each." priority tilt />
        </motion.div>
      </div>
    </section>
  );
}

// Subtle animated depth: a soft accent bloom, a settling grain field, and a few
// faint notification fragments drifting to stillness — the page's thesis.
function AmbientDepth() {
  const reduce = useReducedMotion();
  const chips = [
    { top: "18%", left: "8%", w: 120, delay: 0 },
    { top: "62%", left: "14%", w: 90, delay: 1.4 },
    { top: "30%", left: "78%", w: 110, delay: 0.7 },
    { top: "72%", left: "82%", w: 80, delay: 2.1 },
    { top: "48%", left: "46%", w: 100, delay: 1.1 },
  ];
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 u-grain overflow-hidden">
      {/* Accent bloom, upper area */}
      <div
        className="absolute -top-32 left-1/2 h-[520px] w-[820px] -translate-x-1/3 rounded-full blur-[110px]"
        style={{ background: "radial-gradient(closest-side, oklch(0.74 0.11 160 / 0.14), transparent 72%)" }}
      />
      {/* Cool depth, lower-left */}
      <div
        className="absolute bottom-0 left-0 h-[380px] w-[520px] rounded-full blur-[120px]"
        style={{ background: "radial-gradient(closest-side, oklch(0.4 0.03 220 / 0.1), transparent 70%)" }}
      />
      {/* Fade to page toward the bottom edge */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg" />

      {chips.map((c, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full"
          style={{
            top: c.top,
            left: c.left,
            width: c.w,
            height: 22,
            background: "oklch(0.9 0.01 160 / 0.05)",
            border: "1px solid oklch(1 0 0 / 0.04)",
            filter: "blur(0.4px)",
          }}
          animate={reduce ? undefined : { y: [0, -14, 0], opacity: [0.5, 0.14, 0.5] }}
          transition={
            reduce
              ? undefined
              : { duration: 9 + i, repeat: Infinity, ease: "easeInOut", delay: c.delay }
          }
        />
      ))}
    </div>
  );
}
