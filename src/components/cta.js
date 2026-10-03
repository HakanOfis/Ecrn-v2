import { cva } from "class-variance-authority";

// Grote, ronde call-to-action knoppen voor links (<a> / <Link>).
export const cta = cva(
  "group inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-all duration-300 outline-none focus-visible:ring-3 focus-visible:ring-orange/60 active:translate-y-px [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        orange: "bg-orange text-ink shadow-[0_10px_30px_-10px_rgba(245,166,35,0.8)] hover:bg-[#ffb840] hover:shadow-[0_14px_40px_-10px_rgba(245,166,35,0.9)]",
        navy: "bg-navy text-white hover:bg-[#1a3d74]",
        ghostDark: "border border-white/20 bg-white/5 text-white backdrop-blur hover:border-white/40 hover:bg-white/10",
        outline: "border border-navy/15 bg-white text-navy hover:border-navy/40",
        whatsapp: "bg-[#25D366] text-white hover:bg-[#1fbd59]",
      },
      size: {
        md: "h-11 px-5 text-sm",
        lg: "h-13 px-7 text-[0.95rem]",
      },
    },
    defaultVariants: { variant: "orange", size: "md" },
  },
);
