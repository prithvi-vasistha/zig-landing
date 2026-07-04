import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "../primitives/Button";
import { Logo } from "../primitives/Logo";
import { GithubMark } from "../primitives/GithubMark";
import { SITE } from "../../lib/site";

const LINKS = [
  { href: "#how", label: "How it works" },
  { href: "#features", label: "Features" },
  { href: "#privacy", label: "Privacy" },
  { href: "#engineering", label: "Engineering" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-[var(--z-nav)] transition-colors duration-300"
      style={{
        backgroundColor: scrolled ? "oklch(0.145 0.004 160 / 0.72)" : "transparent",
        backdropFilter: scrolled ? "blur(14px) saturate(1.4)" : "none",
        borderBottom: scrolled ? "1px solid var(--color-line)" : "1px solid transparent",
      }}
    >
      <nav className="mx-auto flex h-16 w-full max-w-[var(--container-page)] items-center justify-between px-5 sm:px-8 lg:px-10">
        <a href="#top" className="flex items-center gap-2.5 rounded-md" aria-label="ZiG — home">
          <Logo className="h-7 w-7" priority />
          <span className="text-[1.05rem] font-medium tracking-tight text-ink">ZiG</span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-md px-3 py-2 text-[0.9rem] text-muted transition-colors hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-2.5 md:flex">
          <Button href={SITE.repo} variant="ghost" size="md" external className="px-3">
            <GithubMark className="h-4 w-4" />
            Source
          </Button>
          <Button href={SITE.download} variant="primary" size="md" external>
            Download APK
          </Button>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-md text-ink md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-line bg-[oklch(0.145_0.004_160/0.96)] backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-1 px-5 py-4">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-[0.95rem] text-muted hover:bg-surface hover:text-ink"
              >
                {l.label}
              </a>
            ))}
            <div className="mt-2 grid grid-cols-2 gap-2.5">
              <Button href={SITE.repo} variant="secondary" size="md" external onClick={() => setOpen(false)}>
                <GithubMark className="h-4 w-4" />
                Source
              </Button>
              <Button href={SITE.download} variant="primary" size="md" external onClick={() => setOpen(false)}>
                Download
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
