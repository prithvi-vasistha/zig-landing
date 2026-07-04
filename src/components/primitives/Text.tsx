import type { ReactNode } from "react";

// Small technical label in mono — used for data and state tags, deliberately
// NOT as a decorative eyebrow above every section.
export function MonoLabel({
  children,
  className = "",
  tone = "muted",
}: {
  children: ReactNode;
  className?: string;
  tone?: "muted" | "accent" | "faint";
}) {
  const color =
    tone === "accent" ? "text-accent" : tone === "faint" ? "text-faint" : "text-muted";
  return (
    <span
      className={`u-mono text-[0.7rem] font-medium uppercase tracking-[0.12em] ${color} ${className}`}
    >
      {children}
    </span>
  );
}

// Section title + optional lead paragraph. Kept measured (prose capped ~60ch).
export function SectionHeading({
  title,
  lead,
  align = "left",
  className = "",
  id,
}: {
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  className?: string;
  id?: string;
}) {
  return (
    <div
      className={`${align === "center" ? "mx-auto text-center" : ""} max-w-2xl ${className}`}
    >
      <h2
        id={id}
        className="text-balance text-[clamp(2rem,1.2rem+3.2vw,3rem)] font-medium leading-[1.08] tracking-[-0.02em] text-ink"
      >
        {title}
      </h2>
      {lead && (
        <p className="mt-5 text-pretty text-[1.05rem] leading-relaxed text-muted">
          {lead}
        </p>
      )}
    </div>
  );
}
