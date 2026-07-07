import { Download } from "lucide-react";
import { Container } from "../primitives/Container";
import { Button } from "../primitives/Button";
import { GithubMark } from "../primitives/GithubMark";
import { Logo } from "../primitives/Logo";
import { Reveal } from "../primitives/Reveal";
import { SITE } from "../../lib/site";

export function CTA() {
  return (
    <section className="relative overflow-hidden py-28 sm:py-40" aria-label="Get ZiG">
      {/* Quiet centred bloom — the calm end-state */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]"
        style={{ background: "radial-gradient(closest-side, oklch(0.74 0.11 160 / 0.12), transparent 72%)" }}
      />
      <Container className="relative">
        <Reveal className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <Logo className="h-16 w-16 shadow-[0_10px_40px_-12px_oklch(0_0_0/0.7)]" />
          <h2 className="mt-8 text-balance text-[clamp(2.1rem,1.3rem+3.6vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.03em] text-ink">
            Quiet the noise. Keep the signal.
          </h2>
          <p className="mt-5 max-w-[44ch] text-pretty text-[1.05rem] leading-relaxed text-muted">
            Install ZiG, choose the apps worth watching, and let the rest fall
            silent — without a single byte leaving your phone.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Button href={SITE.download} variant="primary" size="lg" external>
              <Download className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.8} aria-hidden />
              Download APK
            </Button>
            <Button href={SITE.repo} variant="secondary" size="lg" external>
              <GithubMark className="h-[1.15rem] w-[1.15rem]" />
              View source
            </Button>
          </div>
          <p className="u-mono mt-6 text-[0.72rem] uppercase tracking-[0.12em] text-faint">
            Free · MIT · Android {SITE.testedAndroid}+
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
