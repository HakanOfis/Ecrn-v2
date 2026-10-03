import { useEffect } from "react";
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "motion/react";

import { cn } from "@/lib/utils";

// Gegenereerde illustratie: een kraanwagen laat een verlichtingspaal in de funderingsput zakken,
// waarna de lamp aangaat. Alles is SVG, aangestuurd door één voortgangswaarde.
const PIVOT = { x: 250, y: 282 };
const BOOM = 300;
const POLE = 170;
const POLE_X_FINAL = 522;
const BASE_Y_FINAL = 346;
const deg = (d) => (d * Math.PI) / 180;

export default function CraneScene({ className }) {
  const reduce = useReducedMotion();
  const p = useMotionValue(reduce ? 1 : 0);

  useEffect(() => {
    if (reduce) return;
    const c = animate(p, 1, { duration: 6.5, ease: "easeInOut", delay: 0.6 });
    return () => c.stop();
  }, [p, reduce]);

  const angle = useTransform(p, [0, 0.55, 1], [-38, -25, -25]);
  const tipX = useTransform(angle, (a) => PIVOT.x + BOOM * Math.cos(deg(a)));
  const tipY = useTransform(angle, (a) => PIVOT.y + BOOM * Math.sin(deg(a)));
  const finalCable = BASE_Y_FINAL - POLE - (PIVOT.y + BOOM * Math.sin(deg(-25)));
  const cable = useTransform(p, [0, 0.55, 0.85, 1], [30, 30, finalCable, finalCable]);
  const poleTopY = useTransform([tipY, cable], ([y, c]) => y + c);
  const cylX = useTransform(angle, (a) => PIVOT.x + BOOM * 0.36 * Math.cos(deg(a)));
  const cylY = useTransform(angle, (a) => PIVOT.y + BOOM * 0.36 * Math.sin(deg(a)));
  const light = useTransform(p, [0.86, 0.95], [0, 1]);

  return (
    <svg viewBox="0 70 640 350" className={cn("h-auto w-full", className)} role="img" aria-label="Kraanwagen plaatst een verlichtingspaal">
      <defs>
        <radialGradient id="lampGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ffd27a" stopOpacity="0.9" />
          <stop offset="1" stopColor="#ffd27a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="beam" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffd27a" stopOpacity="0.45" />
          <stop offset="1" stopColor="#ffd27a" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2b3447" />
          <stop offset="1" stopColor="#151c2b" />
        </linearGradient>
      </defs>

      {/* Achtergrond: skyline en bestaande straatverlichting */}
      <g opacity="0.35" fill="#22304d">
        <rect x="0" y="210" width="60" height="120" />
        <rect x="64" y="180" width="44" height="150" />
        <rect x="112" y="226" width="70" height="104" />
        <rect x="560" y="196" width="80" height="134" />
        <rect x="600" y="160" width="40" height="40" />
      </g>
      {[30, 600].map((x) => (
        <g key={x} opacity="0.55">
          <rect x={x - 2} y="210" width="4" height="120" fill="#3a4766" />
          <path d={`M${x} 214 q 0 -8 16 -8`} stroke="#3a4766" strokeWidth="3" fill="none" />
          <circle cx={x + 18} cy="208" r="4" fill="#ffd27a" />
          <path d={`M${x + 12} 212 L${x + 2} 330 L${x + 34} 330 L${x + 24} 212 Z`} fill="url(#beam)" opacity="0.6" />
        </g>
      ))}

      {/* Grond met wegdek, voetpad en snede */}
      <rect x="0" y="330" width="640" height="90" fill="url(#ground)" />
      <rect x="0" y="326" width="640" height="6" fill="#3d475c" />
      {[20, 90, 160, 230, 300].map((x) => (
        <rect key={x} x={x} y="366" width="40" height="4" rx="2" fill="#f5a623" opacity="0.5" />
      ))}

      {/* Sleuf + funderingsput in doorsnede */}
      <g>
        <path d="M470 330 L470 392 L600 392 L600 330 Z" fill="#0a1222" />
        <rect x="470" y="378" width="130" height="14" fill="#c9a86a" opacity="0.75" />
        <rect x="470" y="383" width="130" height="4" rx="2" fill="#f5a623" />
        <path d="M470 366 H600" stroke="#f5a623" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.8" />
        <rect x="508" y="330" width="28" height="22" fill="#1b2335" stroke="#5b6478" strokeWidth="1" />
      </g>

      {/* Signalisatie: kegels en hekken */}
      {[448, 616].map((x) => (
        <g key={x}>
          <path d={`M${x - 7} 330 L${x} 306 L${x + 7} 330 Z`} fill="#f5a623" />
          <rect x={x - 5} y="316" width="10" height="3" fill="#fff" />
          <rect x={x - 9} y="328" width="18" height="3" fill="#f5a623" />
        </g>
      ))}

      {/* Paal (hangt aan de haak) */}
      <motion.g style={{ x: reduce ? POLE_X_FINAL : tipX, y: poleTopY }}>
        <motion.circle cx="29" cy="-6" r="22" fill="url(#lampGlow)" style={{ opacity: light }} />
        <rect x="-3.5" y="0" width="7" height={POLE} rx="2" fill="#c8ced9" />
        <rect x="-5" y={POLE - 18} width="10" height="18" fill="#9aa3b5" />
        <path d="M0 4 q 2 -10 24 -10" stroke="#c8ced9" strokeWidth="4" fill="none" strokeLinecap="round" />
        <rect x="18" y="-12" width="22" height="7" rx="3" fill="#e4e8ef" />
        <motion.rect x="20" y="-6" width="18" height="3" rx="1.5" fill="#ffd27a" style={{ opacity: light }} />
        <motion.path d="M20 -4 L-10 140 L70 140 L38 -4 Z" fill="url(#beam)" style={{ opacity: light }} />
      </motion.g>

      {/* Kabel van giektop naar paal */}
      <motion.line x1={tipX} y1={tipY} x2={tipX} y2={poleTopY} stroke="#d5dbe6" strokeWidth="1.5" />
      <motion.circle cx={tipX} cy={poleTopY} r="3" fill="#f5a623" />

      {/* Hydraulische cilinder en giek */}
      <motion.line x1="228" y1="300" x2={cylX} y2={cylY} stroke="#5b6478" strokeWidth="7" strokeLinecap="round" />
      <motion.line x1={PIVOT.x} y1={PIVOT.y} x2={tipX} y2={tipY} stroke="#f5a623" strokeWidth="12" strokeLinecap="round" />
      <motion.line x1={PIVOT.x} y1={PIVOT.y} x2={tipX} y2={tipY} stroke="#ffc35c" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
      <motion.circle cx={tipX} cy={tipY} r="6" fill="#0a1222" stroke="#f5a623" strokeWidth="3" />

      {/* Kraanwagen */}
      <g>
        <rect x="64" y="296" width="250" height="16" rx="3" fill="#13305e" />
        <path d="M58 312 V258 q0 -8 8 -8 h44 l20 26 v36 Z" fill="#13305e" />
        <path d="M70 262 h34 l14 18 h-48 Z" fill="#9fc3ff" opacity="0.55" />
        <rect x="58" y="296" width="72" height="6" fill="#f5a623" />
        <rect x="230" y="266" width="46" height="32" rx="4" fill="#1b2335" />
        <circle cx={PIVOT.x} cy={PIVOT.y} r="9" fill="#2b3447" stroke="#f5a623" strokeWidth="3" />
        {/* Stempels */}
        <rect x="292" y="312" width="6" height="16" fill="#5b6478" />
        <rect x="284" y="326" width="22" height="5" rx="1" fill="#9aa3b5" />
        <rect x="140" y="312" width="6" height="16" fill="#5b6478" />
        <rect x="132" y="326" width="22" height="5" rx="1" fill="#9aa3b5" />
        {/* Wielen */}
        {[92, 196, 236].map((x) => (
          <g key={x}>
            <circle cx={x} cy="318" r="14" fill="#0a1222" />
            <circle cx={x} cy="318" r="6" fill="#5b6478" />
          </g>
        ))}
        {/* Zwaailicht */}
        <rect x="88" y="244" width="12" height="7" rx="3" fill="#f5a623" />
        <motion.circle
          cx="94"
          cy="246"
          r="10"
          fill="#f5a623"
          animate={reduce ? undefined : { opacity: [0, 0.8, 0] }}
          transition={{ duration: 0.9, repeat: Infinity }}
          opacity={0}
        />
        <text x="160" y="308.5" fontFamily="Archivo Variable, sans-serif" fontWeight="900" fontSize="12" fill="#ffffff" opacity="0.9">
          ECRN
        </text>
      </g>
    </svg>
  );
}
