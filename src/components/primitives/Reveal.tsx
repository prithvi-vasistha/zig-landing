import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE_ENTER } from "../../lib/motion";

// Robust scroll reveal: content is visible by DEFAULT and the entrance is only
// an enhancement. We arm the hidden state after first paint, then reveal the
// moment the element sits within the viewport — driven by geometry, not by a
// single observer callback that a fast scroll or an anchor jump can miss. A
// headless renderer, a crawler, or a failed observer never leaves it blank.
function useReveal(preTrigger = 0.08) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [armed, setArmed] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (reduce) {
      setShown(true);
      return;
    }
    setArmed(true);
    const el = ref.current;
    if (!el) return;

    let done = false;
    const check = () => {
      if (done) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      if (r.top < vh * (1 - preTrigger) && r.bottom > 0) {
        done = true;
        setShown(true);
        window.removeEventListener("scroll", check);
        window.removeEventListener("resize", check);
      }
    };
    // Run after paint, then on scroll/resize until satisfied.
    const raf = requestAnimationFrame(check);
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [reduce, preTrigger]);

  const hidden = armed && !reduce && !shown;
  return { ref, hidden };
}

const DURATION = 0.6;

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, hidden } = useReveal();
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={false}
      animate={{ opacity: hidden ? 0 : 1, y: hidden ? 16 : 0 }}
      transition={{ duration: DURATION, ease: EASE_ENTER, delay: hidden ? 0 : delay }}
    >
      {children}
    </motion.div>
  );
}

// Staggers its direct children. Each child (ideally a <RevealItem>) receives the
// group's hidden state and a per-index delay. The group observes itself.
export function RevealGroup({
  children,
  className = "",
  gap = 0.06,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  gap?: number;
  delay?: number;
}) {
  const { ref, hidden } = useReveal();
  return (
    <div ref={ref} className={className}>
      {Children.map(children, (child, i) =>
        isValidElement(child)
          ? cloneElement(child as React.ReactElement<RevealItemProps>, {
              _hidden: hidden,
              _delay: delay + i * gap,
            })
          : child
      )}
    </div>
  );
}

type RevealItemProps = {
  children: ReactNode;
  className?: string;
  _hidden?: boolean;
  _delay?: number;
};

export function RevealItem({ children, className = "", _hidden = false, _delay = 0 }: RevealItemProps) {
  return (
    <motion.div
      className={className}
      initial={false}
      animate={{ opacity: _hidden ? 0 : 1, y: _hidden ? 16 : 0 }}
      transition={{ duration: DURATION, ease: EASE_ENTER, delay: _hidden ? 0 : _delay }}
    >
      {children}
    </motion.div>
  );
}
