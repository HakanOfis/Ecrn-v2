import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1];

export function Reveal({ children, className, delay = 0, y = 28, as = "div", ...rest }) {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </Comp>
  );
}

export function Stagger({ children, className, gap = 0.08, as = "div" }) {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: gap } } }}
    >
      {children}
    </Comp>
  );
}

export const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export function CountUp({ to, suffix = "", className }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.8,
      ease: EASE,
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {value}
      {suffix}
    </span>
  );
}

// Kicker + titel + lead, gedeeld door alle secties.
export function SectionHeading({ kicker, title, lead, align = "left", dark = false, className }) {
  return (
    <Reveal className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {kicker ? (
        <div
          className={cn(
            "mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em]",
            dark ? "text-orange" : "text-orange-deep",
            align === "center" && "justify-center",
          )}
        >
          <span className="h-px w-6 bg-current" />
          {kicker}
        </div>
      ) : null}
      <h2 className={cn("text-3xl font-extrabold sm:text-4xl", dark ? "text-white" : "text-navy")}>{title}</h2>
      {lead ? (
        <p className={cn("mt-4 text-base leading-relaxed sm:text-lg", dark ? "text-white/70" : "text-muted-foreground")}>
          {lead}
        </p>
      ) : null}
    </Reveal>
  );
}
