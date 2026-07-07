import { Container } from "../primitives/Container";
import { Logo } from "../primitives/Logo";
import { GithubMark } from "../primitives/GithubMark";
import { SITE } from "../../lib/site";
import { asset } from "../../lib/asset";

const NAV = [
  { href: "#how", label: "How it works" },
  { href: "#features", label: "Features" },
  { href: "#privacy", label: "Privacy" },
  { href: "#engineering", label: "Engineering" },
];

export function Footer() {
  return (
    <footer className="border-t border-line py-14">
      <Container>
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-xs">
            <div className="flex items-center gap-2.5">
              <Logo className="h-7 w-7" />
              <span className="text-[1.05rem] font-medium text-ink">ZiG</span>
            </div>
            <p className="mt-4 text-[0.9rem] leading-relaxed text-muted">
              {SITE.full} — an on-device notification interceptor that keeps the
              signal and drops the noise, with nothing leaving your phone.
            </p>
          </div>

          <nav className="flex flex-col gap-3" aria-label="Footer">
            <span className="u-mono text-[0.68rem] uppercase tracking-[0.12em] text-faint">Explore</span>
            {NAV.map((l) => (
              <a key={l.href} href={l.href} className="text-[0.9rem] text-muted transition-colors hover:text-ink">
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-3">
            <span className="u-mono text-[0.68rem] uppercase tracking-[0.12em] text-faint">Project</span>
            <a
              href={SITE.repo}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 text-[0.9rem] text-muted transition-colors hover:text-ink"
            >
              <GithubMark className="h-4 w-4" />
              Source on GitHub
            </a>
            <a
              href={SITE.download}
              target="_blank"
              rel="noreferrer noopener"
              className="text-[0.9rem] text-muted transition-colors hover:text-ink"
            >
              Download APK
            </a>
            <a
              href={asset("privacy.html")}
              className="text-[0.9rem] text-muted transition-colors hover:text-ink"
            >
              Privacy Policy
            </a>
            <span className="text-[0.9rem] text-muted">{SITE.license} License</span>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 text-[0.82rem] text-faint sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 {SITE.author}. {SITE.license} licensed.</span>
        </div>
      </Container>
    </footer>
  );
}
