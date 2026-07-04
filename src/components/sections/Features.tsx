import { Check, BrainCircuit, CalendarClock } from "lucide-react";
import { Section } from "../primitives/Section";
import { PhoneMockup } from "../primitives/PhoneMockup";
import { MonoLabel } from "../primitives/Text";
import { Reveal, RevealGroup, RevealItem } from "../primitives/Reveal";

type Feature = {
  id: string;
  tag: string;
  title: string;
  body: string;
  bullets: string[];
  screen: string;
  alt: string;
};

const FEATURES: Feature[] = [
  {
    id: "managed-apps",
    tag: "Managed apps",
    title: "Nothing is watched until you say so.",
    body: "ZiG ignores every app by default. Switch on the handful worth attention — a bank, a messenger, a delivery app — and the rest pass through untouched. The gate is a native Rust set, so the check costs microseconds and no battery.",
    bullets: [
      "Opt-in, one app at a time",
      "Unmanaged apps are never inspected",
      "Backed by a thread-safe Rust engine",
    ],
    screen: "managed",
    alt: "ZiG's Managed Apps screen with Gmail and Messages switched on.",
  },
  {
    id: "keyword-rules",
    tag: "Keyword rules",
    title: "Words that always get through.",
    body: "Some things you never want filtered. Define deterministic keyword rules that skip the model entirely and run first. Chain words with a comma — a “cab, arriving” rule fires only when both appear — then drag to reorder or edit in place.",
    bullets: [
      "AND-chained multi-word rules",
      "Evaluated before any ML runs",
      "OTP, PNR, boarding pass — your call",
    ],
    screen: "rules",
    alt: "ZiG's Custom Rules Vault with OTP, PNR and Boarding Pass keywords.",
  },
  {
    id: "on-device-ai",
    tag: "On-device classification",
    title: "A model that runs on your phone — and only when it must.",
    body: "When no rule decides, a small TensorFlow Lite classifier scores how likely a notification is noise. Every verdict shows its P(block), so nothing is a black box. If the model is ever unavailable, ZiG fails open and lets the notification through — it never disappears silently.",
    bullets: [
      "Deterministic rules always run first",
      "A visible P(block) on every decision",
      "Fails open — never a silent drop",
    ],
    screen: "classify",
    alt: "ZiG's notification list showing a block probability for each item.",
  },
];

export function Features() {
  return (
    <Section id="features" space="lg">
      <Reveal className="max-w-2xl">
        <MonoLabel tone="accent">What it does</MonoLabel>
        <h2 className="mt-4 text-balance text-[clamp(2rem,1.2rem+3.2vw,3rem)] font-medium leading-[1.08] tracking-[-0.02em] text-ink">
          Five layers of quiet. Each one you can see.
        </h2>
      </Reveal>

      <div className="mt-16 flex flex-col gap-24 sm:gap-32 lg:mt-24">
        {FEATURES.map((f, i) => (
          <FeatureRow key={f.id} feature={f} reverse={i % 2 === 1} />
        ))}
      </div>

      <SecondaryFeatures />
    </Section>
  );
}

function FeatureRow({ feature, reverse }: { feature: Feature; reverse: boolean }) {
  return (
    <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
      {/* Copy */}
      <Reveal className={reverse ? "lg:order-2 lg:pl-6" : "lg:pr-6"}>
        <MonoLabel tone="muted">{feature.tag}</MonoLabel>
        <h3 className="mt-3 max-w-[16ch] text-balance text-[clamp(1.5rem,1.1rem+1.7vw,2.15rem)] font-medium leading-[1.12] tracking-[-0.02em] text-ink">
          {feature.title}
        </h3>
        <p className="mt-5 max-w-[46ch] text-pretty leading-relaxed text-muted">
          {feature.body}
        </p>
        <ul className="mt-7 flex flex-col gap-3">
          {feature.bullets.map((b) => (
            <li key={b} className="flex items-start gap-3 text-[0.95rem] text-ink/90">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                <Check className="h-3.5 w-3.5" strokeWidth={2.2} aria-hidden />
              </span>
              {b}
            </li>
          ))}
        </ul>
      </Reveal>

      {/* Device */}
      <Reveal className={reverse ? "lg:order-1" : ""}>
        <div className="mx-auto w-full max-w-[268px] sm:max-w-[300px]">
          <PhoneMockup name={feature.screen} alt={feature.alt} tilt />
        </div>
      </Reveal>
    </div>
  );
}

const SECONDARY = [
  {
    icon: BrainCircuit,
    tag: "Personal memory",
    title: "It learns from you, not a server.",
    body: "Every time you override a decision, ZiG embeds that notification on-device and keeps the vector locally. A k-nearest-neighbours lookup lets your own history veto the model — under strict guards, so a sparse history can never destabilise it.",
  },
  {
    icon: CalendarClock,
    tag: "Daily summary",
    title: "One quiet digest a day.",
    body: "An optional once-a-day recap of everything ZiG filtered, scheduled with WorkManager and delivered as a local notification. No feed to open, no badge to clear — just a note that the noise was handled.",
  },
];

function SecondaryFeatures() {
  return (
    <RevealGroup className="mt-24 grid grid-cols-1 gap-4 sm:mt-32 md:grid-cols-2" gap={0.08}>
      {SECONDARY.map((s) => (
        <RevealItem
          key={s.tag}
          className="group relative overflow-hidden rounded-[var(--radius-lg)] border border-line bg-surface/50 p-7 sm:p-9"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
            style={{ background: "radial-gradient(closest-side, oklch(0.74 0.11 160 / 0.18), transparent)" }}
          />
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] border border-line bg-bg text-accent">
            <s.icon className="h-5 w-5" strokeWidth={1.6} aria-hidden />
          </span>
          <div className="mt-5">
            <MonoLabel tone="muted">{s.tag}</MonoLabel>
            <h3 className="mt-2 text-[1.3rem] font-medium tracking-[-0.01em] text-ink">
              {s.title}
            </h3>
            <p className="mt-3 max-w-[48ch] text-pretty leading-relaxed text-muted">
              {s.body}
            </p>
          </div>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
