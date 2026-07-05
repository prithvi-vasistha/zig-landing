import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Picture } from "./Picture";

// A CSS/SVG 3D Android device. Every screenshot pixel is preserved (object-fit
// cover on the exact 9:19.5 panel); nothing is repainted or hallucinated.
//
// Transform ownership is split to avoid clobbering:
//   perspective wrapper → tilt layer (scroll)  → float layer (loop) → device
export function PhoneMockup({
  name,
  alt,
  priority = false,
  glow = true,
  tilt = true,
  floatDelay = 0,
  className = "",
}: {
  name: string;
  alt: string;
  priority?: boolean;
  glow?: boolean;
  tilt?: boolean;
  floatDelay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Subtle scroll-linked rotation. Disabled under reduced motion.
  const rotY = useTransform(scrollYProgress, [0, 1], tilt && !reduce ? [7, -7] : [0, 0]);
  const rotX = useTransform(scrollYProgress, [0, 1], tilt && !reduce ? [-4, 4] : [0, 0]);

  return (
    <div
      ref={ref}
      className={`relative [perspective:1400px] ${className}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {glow && (
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[85%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-[999px] blur-[70px]"
          style={{
            background:
              "radial-gradient(closest-side, oklch(0.74 0.11 160 / 0.28), transparent 78%)",
          }}
        />
      )}

      {/* Tilt layer — scroll owns this transform */}
      <motion.div style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}>
        {/* Float layer — the loop owns this transform */}
        <motion.div
          animate={reduce ? undefined : { y: [0, -10, 0] }}
          transition={
            reduce
              ? undefined
              : {
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: floatDelay,
                }
          }
        >
          <Device name={name} alt={alt} priority={priority} />
        </motion.div>
      </motion.div>
    </div>
  );
}

function Device({
  name,
  alt,
  priority,
}: {
  name: string;
  alt: string;
  priority: boolean;
}) {
  return (
    <div
      className="relative mx-auto w-full rounded-[2.6rem] p-[3px]"
      style={{
        // Brushed metal edge
        background:
          "linear-gradient(150deg, oklch(0.42 0.006 160), oklch(0.2 0.004 160) 32%, oklch(0.14 0.004 160) 60%, oklch(0.34 0.006 160))",
        boxShadow:
          "0 44px 90px -30px oklch(0 0 0 / 0.8), 0 12px 30px -12px oklch(0 0 0 / 0.6), 0 0 0 1px oklch(1 0 0 / 0.04) inset",
      }}
    >
      {/* Side buttons */}
      <span aria-hidden className="absolute -right-[2px] top-[22%] h-16 w-[3px] rounded-r-sm bg-[oklch(0.3_0.005_160)]" />
      <span aria-hidden className="absolute -left-[2px] top-[30%] h-10 w-[3px] rounded-l-sm bg-[oklch(0.28_0.005_160)]" />
      <span aria-hidden className="absolute -left-[2px] top-[42%] h-10 w-[3px] rounded-l-sm bg-[oklch(0.28_0.005_160)]" />

      <div
        className="relative overflow-hidden rounded-[2.35rem] bg-black p-[6px]"
        style={{ boxShadow: "0 0 0 1px oklch(0 0 0 / 0.9) inset" }}
      >
        {/* Screen */}
        <div className="relative aspect-[1080/2400] overflow-hidden rounded-[2rem] bg-[oklch(0.14_0.004_160)]">
          <Picture
            name={name}
            alt={alt}
            width={1080}
            height={2400}
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : "auto"}
            className="absolute inset-0 h-full w-full object-cover object-top"
          />

          {/* Punch-hole camera */}
          <span
            aria-hidden
            className="absolute left-1/2 top-[11px] z-10 h-[9px] w-[9px] -translate-x-1/2 rounded-full bg-black shadow-[0_0_0_1.5px_oklch(0.25_0_0)]"
          />

          {/* Glass sheen — a single diagonal light pass, low opacity */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 z-20 mix-blend-screen"
            style={{
              background:
                "linear-gradient(133deg, oklch(1 0 0 / 0.1) 0%, transparent 22%, transparent 68%, oklch(1 0 0 / 0.045) 100%)",
            }}
          />
          {/* Curved-edge vignette for glass roundness */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 z-20 rounded-[2rem]"
            style={{ boxShadow: "0 0 22px 2px oklch(0 0 0 / 0.35) inset" }}
          />
        </div>
      </div>
    </div>
  );
}
