import type { ReactNode } from "react";
import { Container } from "./Container";

// Vertical rhythm is deliberately varied per section via `space`, not uniform.
const SPACE = {
  sm: "py-16 sm:py-20",
  md: "py-20 sm:py-28",
  lg: "py-24 sm:py-36",
} as const;

export function Section({
  id,
  children,
  className = "",
  space = "md",
  bare = false,
  ariaLabel,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  space?: keyof typeof SPACE;
  bare?: boolean;
  ariaLabel?: string;
}) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={`relative ${SPACE[space]} ${className}`}
    >
      {bare ? children : <Container>{children}</Container>}
    </section>
  );
}
