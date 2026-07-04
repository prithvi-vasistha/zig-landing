import { WifiOff, CloudOff, Ban, EyeOff, Smartphone } from "lucide-react";
import { Container } from "../primitives/Container";
import { MonoLabel } from "../primitives/Text";
import { Reveal, RevealGroup, RevealItem } from "../primitives/Reveal";

const GUARANTEES = [
  { icon: WifiOff, label: "No internet permission", body: "The app cannot open a socket. There is no code path to the network." },
  { icon: CloudOff, label: "No cloud", body: "No Firebase, no APIs, no third-party SDK that phones home." },
  { icon: Ban, label: "No analytics", body: "No telemetry, no crash reporting, no usage tracking, no ads." },
  { icon: EyeOff, label: "No tracking", body: "Nothing about you is profiled, sold, or shared. Ever." },
  { icon: Smartphone, label: "Everything on device", body: "Notifications, contacts, embeddings, model output — none of it leaves." },
];

export function Privacy() {
  return (
    <section
      id="privacy"
      className="relative overflow-hidden py-24 sm:py-36"
      style={{ backgroundColor: "oklch(0.11 0.003 160)" }}
      aria-label="Privacy"
    >
      {/* Quiet accent depth — this is where the page goes stillest */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-1/2 h-[560px] w-[560px] -translate-y-1/2 rounded-full blur-[130px]"
        style={{ background: "radial-gradient(closest-side, oklch(0.74 0.11 160 / 0.08), transparent 70%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, var(--color-line-strong), transparent)" }}
      />

      <Container className="relative">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* Statement + proof */}
          <div>
            <Reveal>
              <MonoLabel tone="accent">Privacy by construction</MonoLabel>
              <h2 className="mt-4 text-balance text-[clamp(2rem,1.2rem+3.4vw,3.25rem)] font-medium leading-[1.06] tracking-[-0.025em] text-ink">
                Built so it{" "}
                <span className="text-accent">can’t</span> betray you.
              </h2>
              <p className="mt-5 max-w-[46ch] text-pretty leading-relaxed text-muted">
                Most “smart” filters send your notifications to a server to be
                read. ZiG removes the possibility. Privacy here isn’t a policy
                you’re asked to trust — it’s a property of the build.
              </p>
            </Reveal>

            <Reveal className="mt-8">
              <ManifestProof />
            </Reveal>
          </div>

          {/* Guarantees */}
          <RevealGroup className="grid grid-cols-1 gap-3 self-center sm:grid-cols-2" gap={0.07}>
            {GUARANTEES.map((g) => (
              <RevealItem
                key={g.label}
                className="rounded-[var(--radius-md)] border border-line bg-bg/60 p-5 sm:p-6"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius-sm)] border border-line bg-surface text-accent">
                  <g.icon className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.7} aria-hidden />
                </span>
                <h3 className="mt-4 text-[1.02rem] font-medium text-ink">{g.label}</h3>
                <p className="mt-1.5 text-[0.9rem] leading-relaxed text-muted">{g.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Container>
    </section>
  );
}

// The literal proof: the INTERNET permission removed from the merged manifest.
function ManifestProof() {
  return (
    <figure className="overflow-hidden rounded-[var(--radius-md)] border border-line-strong bg-bg">
      <figcaption className="flex items-center gap-2 border-b border-line px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.4_0.006_160)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.4_0.006_160)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.4_0.006_160)]" />
        </span>
        <span className="u-mono ml-1 text-[0.72rem] text-faint">AndroidManifest.xml</span>
      </figcaption>
      <pre className="overflow-x-auto px-4 py-4 text-[0.8rem] leading-relaxed sm:text-[0.85rem]">
        <code className="u-mono">
          <span className="text-faint">{"<!-- stripped from the merged manifest -->"}</span>
          {"\n"}
          <span className="text-muted">{"<uses-permission"}</span>
          {"\n  "}
          <span className="text-accent-soft">android:name</span>
          <span className="text-muted">=</span>
          <span className="text-ink">{'"android.permission.INTERNET"'}</span>
          {"\n  "}
          <span className="text-accent">tools:node</span>
          <span className="text-muted">=</span>
          <span className="text-accent">{'"remove"'}</span>{" "}
          <span className="text-muted">{"/>"}</span>
        </code>
      </pre>
    </figure>
  );
}
