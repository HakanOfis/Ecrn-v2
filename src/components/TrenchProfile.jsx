import { motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

// Schematische doorsnede van een kabelsleuf. De lagen worden van onder naar boven "aangevuld".
// layers: [verharding, aanvulling, lint, zandbed, kabel] (van boven naar onder)
const SHAPES = [
  { y: 58, h: 30, fill: "#2b3447", labelY: 72 },
  { y: 88, h: 140, fill: "#8a6d4b", labelY: 150, texture: true },
  { y: 228, h: 6, fill: "#f5a623", labelY: 231 },
  { y: 234, h: 78, fill: "#d9c08a", labelY: 258 },
  { y: 270, h: 30, fill: "none", labelY: 286, cable: true },
];

export default function TrenchProfile({ layers, className }) {
  const reduce = useReducedMotion();
  const order = [4, 3, 2, 1, 0];

  return (
    <svg viewBox="0 0 660 340" className={cn("h-auto w-full", className)} role="img" aria-label={layers.join(", ")}>
      <defs>
        <pattern id="soil" width="18" height="18" patternUnits="userSpaceOnUse">
          <rect width="18" height="18" fill="#5a4630" />
          <circle cx="4" cy="5" r="1.6" fill="#6d5639" />
          <circle cx="13" cy="12" r="2" fill="#4a3a28" />
          <circle cx="10" cy="3" r="1" fill="#7a6243" />
        </pattern>
        <pattern id="fill" width="14" height="14" patternUnits="userSpaceOnUse">
          <rect width="14" height="14" fill="#8a6d4b" />
          <circle cx="3" cy="4" r="1.4" fill="#9c7e59" />
          <circle cx="10" cy="10" r="1.6" fill="#7a5f40" />
        </pattern>
      </defs>

      {/* Bestaande grond links en rechts */}
      <rect x="0" y="58" width="120" height="282" fill="url(#soil)" />
      <rect x="0" y="50" width="120" height="10" fill="#3d475c" />
      <rect x="120" y="312" width="180" height="28" fill="url(#soil)" />
      <rect x="300" y="58" width="20" height="282" fill="url(#soil)" />
      <rect x="300" y="50" width="20" height="10" fill="#3d475c" />

      {/* Lagen */}
      {order.map((i, k) => {
        const s = SHAPES[i];
        const delay = reduce ? 0 : 0.2 + k * 0.35;
        return (
          <g key={i}>
            {s.cable ? null : (
              <motion.rect
                x="120"
                y={s.y}
                width="180"
                height={s.h}
                fill={s.texture ? "url(#fill)" : s.fill}
                style={{ originY: 1, transformBox: "fill-box" }}
                initial={reduce ? false : { scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
              />
            )}

            {/* Label met verbindingslijn */}
            <motion.g
              className="max-sm:hidden"
              initial={reduce ? false : { opacity: 0, x: 12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: delay + 0.25 }}
            >
              <line x1={s.cable ? 256 : 290} y1={s.labelY} x2="352" y2={s.labelY} stroke="#9aa3b5" strokeWidth="1" strokeDasharray="3 3" />
              <circle cx={s.cable ? 256 : 290} cy={s.labelY} r="3" fill="#f5a623" />
              <text x="362" y={s.labelY + 4} fontSize="14" fontWeight="600" fill="currentColor" fontFamily="Geist Variable, sans-serif">
                {layers[i]}
              </text>
            </motion.g>
          </g>
        );
      })}

      {/* Kabels als laatste tekenen (boven het zandbed), maar als eerste animeren */}
      <motion.g
        initial={reduce ? false : { opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, delay: reduce ? 0 : 0.2 }}
      >
        {[175, 210, 245].map((cx) => (
          <g key={cx}>
            <circle cx={cx} cy="286" r="11" fill="#13305e" stroke="#0a1222" strokeWidth="2" />
            <circle cx={cx} cy="286" r="4" fill="#f5a623" />
          </g>
        ))}
      </motion.g>

      {/* Maataanduiding (zonder cijfers: profiel volgt de voorschriften) */}
      <g stroke="#9aa3b5" strokeWidth="1">
        <line x1="104" y1="58" x2="104" y2="312" />
        <line x1="98" y1="58" x2="110" y2="58" />
        <line x1="98" y1="312" x2="110" y2="312" />
      </g>
    </svg>
  );
}
