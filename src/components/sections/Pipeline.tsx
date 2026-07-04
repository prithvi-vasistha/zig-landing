import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import { Bell, LayoutGrid, Contact, KeyRound, Cpu, BellRing } from "lucide-react";
import { Section } from "../primitives/Section";
import { MonoLabel } from "../primitives/Text";
import { Reveal } from "../primitives/Reveal";

type Stage = {
  icon: typeof Bell;
  tag: string;
  title: string;
  body: string;
  verdict?: string;
  cost?: string;
};

const STAGES: Stage[] = [
  {
    icon: Bell,
    tag: "Input",
    title: "A notification is posted",
    body: "Every incoming notification is intercepted before it reaches you. Service and duplicate events are dropped up front.",
  },
  {
    icon: LayoutGrid,
    tag: "Layer 1 · Rust",
    title: "Is this app managed?",
    body: "Only apps you opted in to continue. Everything else leaves the pipeline immediately.",
    verdict: "not managed → passes through",
    cost: "microseconds",
  },
  {
    icon: Contact,
    tag: "Layer 2 · Rust",
    title: "Is the sender a contact?",
    body: "Titles are matched against your contacts, kept in sync in real time by a native observer.",
    verdict: "known contact → delivered",
    cost: "microseconds",
  },
  {
    icon: KeyRound,
    tag: "Layer 3 · Rust",
    title: "Does a keyword rule match?",
    body: "Your deterministic, AND-chained rules are checked next — OTP, PNR, anything you defined.",
    verdict: "keyword hit → delivered",
    cost: "microseconds",
  },
  {
    icon: Cpu,
    tag: "Layer 4 · On-device ML",
    title: "How likely is this noise?",
    body: "Only when every rule misses does the TFLite classifier score it, with your Personal Memory able to veto.",
    verdict: "allow → delivered · block → suppressed",
    cost: "milliseconds",
  },
  {
    icon: BellRing,
    tag: "Output",
    title: "Only what matters surfaces",
    body: "Kept notifications are re-published as a heads-up banner. Every step is logged with its reason.",
  },
];

export function Pipeline() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 65%", "end 65%"],
  });
  const fill = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const idx = Math.min(STAGES.length - 1, Math.max(0, Math.round(p * (STAGES.length - 1))));
    setActive((cur) => (cur === idx ? cur : idx));
  });

  return (
    <Section id="how" space="lg" className="u-grain">
      <Reveal className="max-w-2xl">
        <MonoLabel tone="accent">How it works</MonoLabel>
        <h2 className="mt-4 text-balance text-[clamp(2rem,1.2rem+3.2vw,3rem)] font-medium leading-[1.08] tracking-[-0.02em] text-ink">
          A notification takes the cheapest path to a verdict.
        </h2>
        <p className="mt-5 max-w-[52ch] text-pretty leading-relaxed text-muted">
          Layers run in order of cost. The moment one is confident, the
          notification exits — the model runs only when nothing simpler could
          decide.
        </p>
      </Reveal>

      <div ref={ref} className="relative mt-14 lg:mt-20">
        {/* Spine */}
        <div className="absolute left-[19px] top-2 bottom-2 w-px bg-line sm:left-[23px]" aria-hidden />
        <motion.div
          className="absolute left-[19px] top-2 w-px origin-top bg-accent sm:left-[23px]"
          style={{ height: reduce ? "100%" : fill }}
          aria-hidden
        />

        <ol className="flex flex-col gap-3">
          {STAGES.map((s, i) => {
            const on = reduce || i <= active;
            return (
              <li key={s.title} className="relative flex gap-5 sm:gap-6">
                {/* Node */}
                <div className="relative z-10 shrink-0">
                  <motion.span
                    className="flex h-10 w-10 items-center justify-center rounded-full border sm:h-12 sm:w-12"
                    animate={{
                      backgroundColor: on ? "oklch(0.74 0.11 160 / 0.14)" : "oklch(0.194 0.006 160)",
                      borderColor: on ? "oklch(0.74 0.11 160 / 0.6)" : "oklch(1 0 0 / 0.08)",
                      color: on ? "oklch(0.82 0.135 158)" : "oklch(0.6 0.006 160)",
                    }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <s.icon className="h-[1.15rem] w-[1.15rem] sm:h-5 sm:w-5" strokeWidth={1.7} aria-hidden />
                  </motion.span>
                </div>

                {/* Card */}
                <div
                  className="mb-3 flex-1 rounded-[var(--radius-md)] border px-5 py-4 transition-colors duration-300 sm:px-6 sm:py-5"
                  style={{
                    borderColor: on ? "var(--color-line-strong)" : "var(--color-line)",
                    backgroundColor: on ? "oklch(0.194 0.006 160 / 0.7)" : "transparent",
                  }}
                >
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <MonoLabel tone={on ? "accent" : "faint"}>{s.tag}</MonoLabel>
                    {s.cost && (
                      <span className="u-mono text-[0.68rem] text-faint">~{s.cost}</span>
                    )}
                  </div>
                  <h3 className="mt-1.5 text-[1.1rem] font-medium tracking-[-0.01em] text-ink">
                    {s.title}
                  </h3>
                  <p className="mt-1.5 max-w-[52ch] text-[0.925rem] leading-relaxed text-muted">
                    {s.body}
                  </p>
                  {s.verdict && (
                    <div className="mt-3 inline-flex items-center gap-2 rounded-[var(--radius-sm)] bg-bg px-3 py-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
                      <span className="u-mono text-[0.72rem] tracking-tight text-muted">{s.verdict}</span>
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
