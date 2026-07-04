import { useState } from "react";
import { Plus } from "lucide-react";
import { Section } from "../primitives/Section";
import { MonoLabel } from "../primitives/Text";
import { Reveal } from "../primitives/Reveal";

const QA = [
  {
    q: "Does ZiG need an internet connection?",
    a: "No. The INTERNET permission is stripped from the merged manifest, so the app cannot make a network request at all. Every feature works fully offline.",
  },
  {
    q: "What permissions does it ask for?",
    a: "Notification access, so it can read and re-post notifications, and Contacts, so it can recognise senders you know. Both are used entirely on-device and nothing derived from them is transmitted.",
  },
  {
    q: "How does it decide what to filter?",
    a: "Deterministic checks run first — is the app managed, is the sender a contact, does a keyword rule match. Only when all of those miss does a small on-device model score the notification, and every verdict shows its block probability so you can see and correct it.",
  },
  {
    q: "Does the model send anything to a server?",
    a: "No. Both the TensorFlow Lite classifier and the MediaPipe embedder run locally. The weights ship inside the APK and their outputs never leave your phone.",
  },
  {
    q: "Which Android versions are supported?",
    a: "Android 8.0 Oreo (API 26) and newer.",
  },
  {
    q: "Will it hurt my battery?",
    a: "The native Rust rule gates resolve in microseconds, and the models are lazy-loaded, reused, and released when idle — never polled in the background.",
  },
  {
    q: "Is it open source?",
    a: "Yes — MIT licensed. The full pipeline, the Rust engine, and the model wrappers are all on GitHub for you to read and build.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section space="lg" ariaLabel="Frequently asked questions">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal>
          <MonoLabel tone="accent">Questions</MonoLabel>
          <h2 className="mt-4 text-balance text-[clamp(1.9rem,1.2rem+3vw,2.75rem)] font-medium leading-[1.08] tracking-[-0.02em] text-ink">
            The things engineers ask first.
          </h2>
        </Reveal>

        <Reveal>
          <ul className="flex flex-col divide-y divide-line border-y border-line">
            {QA.map((item, i) => {
              const isOpen = open === i;
              return (
                <li key={item.q}>
                  <h3>
                    <button
                      className="flex w-full items-center justify-between gap-4 py-5 text-left"
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${i}`}
                      id={`faq-btn-${i}`}
                      onClick={() => setOpen(isOpen ? null : i)}
                    >
                      <span className="text-[1.05rem] font-medium text-ink">{item.q}</span>
                      <Plus
                        className="h-5 w-5 shrink-0 text-muted transition-transform duration-300 ease-[var(--ease-enter)]"
                        style={{ transform: isOpen ? "rotate(45deg)" : "none" }}
                        strokeWidth={1.7}
                        aria-hidden
                      />
                    </button>
                  </h3>
                  <div
                    id={`faq-panel-${i}`}
                    role="region"
                    aria-labelledby={`faq-btn-${i}`}
                    className="grid transition-[grid-template-rows] duration-300 ease-[var(--ease-enter)]"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-[62ch] pb-6 pr-8 text-pretty leading-relaxed text-muted">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
