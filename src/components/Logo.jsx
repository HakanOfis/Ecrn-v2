import logo from "@/assets/logo.webp";
import { cn } from "@/lib/utils";

export function Logo({ tagline, dark = false, className }) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <span className={cn("grid size-12 shrink-0 place-items-center rounded-xl p-1", dark ? "bg-white" : "bg-paper")}>
        <img src={logo} alt="" className="h-full w-full object-contain" />
      </span>
      <span className="leading-none">
        <span className={cn("block font-heading text-2xl font-black tracking-tight", dark ? "text-white" : "text-navy")} style={{ fontStretch: "88%" }}>
          ECRN<span className="ml-1 align-top text-[0.6rem] font-bold text-orange">bvba</span>
        </span>
        {tagline ? (
          <span className={cn("mt-1 block text-[0.6rem] font-semibold tracking-[0.2em] uppercase", dark ? "text-white/50" : "text-muted-foreground")}>
            {tagline}
          </span>
        ) : null}
      </span>
    </span>
  );
}
