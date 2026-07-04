import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-[var(--radius-sm)] font-medium " +
  "transition-[transform,background-color,border-color,color] duration-150 ease-[var(--ease-enter)] " +
  "select-none active:translate-y-px whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent-strong text-[oklch(0.16_0.02_160)] hover:bg-accent-soft " +
    "shadow-[0_1px_0_oklch(1_0_0/0.2)_inset,0_8px_24px_-16px_oklch(0.74_0.11_160/0.55)]",
  secondary:
    "bg-surface text-ink border border-line-strong hover:bg-surface-2 hover:border-[oklch(1_0_0/0.22)]",
  ghost: "text-muted hover:text-ink",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-[0.95rem]",
  lg: "h-13 px-7 text-base",
};

export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className = "",
  external = false,
  ...rest
}: {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  external?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  if (href) {
    const ext = external
      ? { target: "_blank", rel: "noreferrer noopener" }
      : {};
    return (
      <a href={href} className={cls} {...ext} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}
