import { ArrowDown } from "lucide-react";
import { Section } from "../primitives/Section";
import { MonoLabel } from "../primitives/Text";
import { Reveal, RevealGroup, RevealItem } from "../primitives/Reveal";

const STACK = [
  "Kotlin 2.0",
  "Rust · JNI",
  "TensorFlow Lite",
  "MediaPipe",
  "Room",
  "Hilt",
  "WorkManager",
  "Jetpack Compose",
];

const LAYERS = [
  { name: "UI", note: "Jetpack Compose · Material 3" },
  { name: "ViewModel", note: "StateFlow · Hilt" },
  { name: "Use cases", note: "one intent each" },
  { name: "Repository", note: "single source of truth" },
];

const SOURCES = [
  { name: "Room", note: "log · rules · vectors" },
  { name: "Rust / JNI", note: "gate · contacts · keywords" },
  { name: "TFLite", note: "block/allow verdict" },
  { name: "MediaPipe", note: "embeddings for memory" },
];

export function Engineering() {
  return (
    <Section id="engineering" space="lg">
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        {/* Narrative */}
        <div className="lg:pt-4">
          <Reveal>
            <MonoLabel tone="accent">Engineering</MonoLabel>
            <h2 className="mt-4 text-balance text-[clamp(2rem,1.2rem+3.2vw,3rem)] font-medium leading-[1.08] tracking-[-0.02em] text-ink">
              Deterministic where it counts. Lazy where it’s heavy.
            </h2>
            <p className="mt-5 max-w-[48ch] text-pretty leading-relaxed text-muted">
              A unidirectional MVVM core in Kotlin drives everything. The hot
              path — the app gate, contact whitelist, and keyword engine — lives
              in a native Rust library reached over JNI, guarded by read-write
              locks. The models load lazily, run, and release; the rule layers
              always run first, so most notifications never touch them.
            </p>
          </Reveal>

          <Reveal className="mt-8">
            <RevealGroup className="flex flex-wrap gap-2" gap={0.04}>
              {STACK.map((s) => (
                <RevealItem key={s}>
                  <span className="u-mono inline-block rounded-full border border-line bg-surface/60 px-3.5 py-1.5 text-[0.76rem] text-muted">
                    {s}
                  </span>
                </RevealItem>
              ))}
            </RevealGroup>
          </Reveal>

          <Reveal className="mt-8">
            <dl className="grid grid-cols-3 gap-px overflow-hidden rounded-[var(--radius-md)] border border-line bg-line">
              {[
                ["Min SDK", "26"],
                ["Tested on", "Android 15+"],
                ["License", "MIT"],
              ].map(([k, v]) => (
                <div key={k} className="bg-bg px-4 py-4">
                  <dt className="u-mono text-[0.68rem] uppercase tracking-[0.1em] text-faint">{k}</dt>
                  <dd className="mt-1 text-[1.35rem] font-medium text-ink">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* Diagram */}
        <Reveal>
          <div className="rounded-[var(--radius-lg)] border border-line bg-surface/40 p-6 sm:p-9">
            <RevealGroup className="flex flex-col items-stretch" gap={0.08}>
              {LAYERS.map((l, i) => (
                <RevealItem key={l.name}>
                  <ArchNode name={l.name} note={l.note} />
                  {i < LAYERS.length && (
                    <div className="flex justify-center py-1.5" aria-hidden>
                      <ArrowDown className="h-4 w-4 text-faint" strokeWidth={1.6} />
                    </div>
                  )}
                </RevealItem>
              ))}

              <RevealItem>
                <MonoLabel tone="faint" className="mb-2.5 block text-center">Data sources</MonoLabel>
                <div className="grid grid-cols-2 gap-2.5">
                  {SOURCES.map((s) => (
                    <div
                      key={s.name}
                      className="rounded-[var(--radius-sm)] border border-line bg-bg px-3.5 py-3"
                    >
                      <div className="text-[0.92rem] font-medium text-ink">{s.name}</div>
                      <div className="u-mono mt-0.5 text-[0.68rem] text-faint">{s.note}</div>
                    </div>
                  ))}
                </div>
              </RevealItem>
            </RevealGroup>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

function ArchNode({ name, note }: { name: string; note: string }) {
  return (
    <div className="flex items-center justify-between rounded-[var(--radius-sm)] border border-line-strong bg-bg px-4 py-3.5">
      <span className="font-medium text-ink">{name}</span>
      <span className="u-mono text-[0.72rem] text-faint">{note}</span>
    </div>
  );
}
