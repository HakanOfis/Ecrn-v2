import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Phone } from "lucide-react";
import { motion, useScroll, useSpring } from "motion/react";

import { Logo } from "@/components/Logo";
import { cta } from "@/components/cta";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { LOCALES, company } from "@/content/site";
import { links, useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export const SECTIONS = ["services", "fluvius", "process", "area", "contact"];

function LanguageSwitch({ className }) {
  const { locale, t } = useI18n();
  return (
    <div role="group" aria-label={t.language} className={cn("flex items-center gap-0.5", className)}>
      {LOCALES.map((l) => (
        <Link
          key={l.code}
          to={l.path}
          title={l.name}
          hrefLang={l.code}
          aria-current={locale === l.code ? "true" : undefined}
          className={cn(
            "rounded-md px-2 py-1 text-xs font-bold tracking-wide transition",
            locale === l.code ? "bg-orange text-ink" : "text-white/60 hover:text-white",
          )}
        >
          {l.label}
        </Link>
      ))}
    </div>
  );
}

export default function Header() {
  const { t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        scrolled ? "border-b border-white/10 bg-ink/85 backdrop-blur-xl" : "bg-transparent",
      )}
    >
      <div className="container-x flex h-[4.5rem] items-center justify-between gap-4">
        <a href="#top" aria-label="ECRN">
          <Logo tagline={t.tagline} dark />
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {SECTIONS.map((id) => (
            <a key={id} href={`#${id}`} className="rounded-full px-3.5 py-2 text-sm font-semibold text-white/75 transition hover:text-orange">
              {t.nav[id]}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitch className="hidden md:flex" />
          <a href="#contact" className={cn(cta(), "hidden sm:inline-flex")}>
            {t.nav.cta}
          </a>
          <a href={links.tel} aria-label={company.phoneDisplay} className="grid size-11 place-items-center rounded-full bg-orange text-ink sm:hidden">
            <Phone className="size-5" />
          </a>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="grid size-11 place-items-center rounded-full border border-white/20 text-white lg:hidden" aria-label={t.menu}>
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-[86%] max-w-sm gap-0 border-white/10 bg-ink p-0 text-white">
              <SheetTitle className="sr-only">{t.menu}</SheetTitle>
              <div className="border-b border-white/10 p-5">
                <Logo tagline={t.tagline} dark />
              </div>
              <nav className="flex flex-col p-3">
                {SECTIONS.map((id, i) => (
                  <motion.a
                    key={id}
                    href={`#${id}`}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                    className="rounded-xl px-4 py-3.5 font-heading text-xl font-bold text-white/85 transition hover:bg-white/5 hover:text-orange"
                  >
                    {t.nav[id]}
                  </motion.a>
                ))}
              </nav>
              <div className="mt-auto space-y-3 border-t border-white/10 p-5">
                <a href={links.tel} className={cn(cta({ size: "lg" }), "w-full")}>
                  <Phone /> {company.phoneDisplay}
                </a>
                <LanguageSwitch className="justify-center pt-2" />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <motion.div style={{ scaleX: progress }} className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-orange" />
    </header>
  );
}
