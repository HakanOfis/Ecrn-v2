import { useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import {
  ArrowRight,
  Check,
  UserRound,
  Construction,
  HardHat,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  ShieldCheck,
  Timer,
  TrafficCone,
  Truck,
  UtilityPole,
  Wrench,
} from "lucide-react";

import CraneScene from "@/components/CraneScene";
import Header, { SECTIONS } from "@/components/Header";
import { Logo } from "@/components/Logo";
import TrenchProfile from "@/components/TrenchProfile";
import { cta } from "@/components/cta";
import { Reveal, SectionHeading, Stagger, staggerItem } from "@/components/motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { company, img } from "@/content/site";
import { links, useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1];
const SERVICE_ICONS = [Construction, UtilityPole, Wrench];
const SERVICE_IMAGES = [img.service1, img.service2, img.service3];
const FLUVIUS_ICONS = [ShieldCheck, TrafficCone, Timer];
const WHY_ICONS = [HardHat, Truck, MessageCircle, MapPin];

function Hero() {
  const { t } = useI18n();
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section id="top" ref={ref} className="relative overflow-hidden bg-ink text-white">
      <motion.img src={img.hero} alt="" style={{ y: bgY }} className="absolute inset-0 h-[120%] w-full object-cover opacity-25" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/85 to-ink" />
      <div className="grid-lines absolute inset-0" aria-hidden="true" />
      <div className="absolute -top-40 left-1/3 size-[40rem] rounded-full bg-orange/10 blur-[160px]" aria-hidden="true" />

      <div className="container-x relative grid items-center gap-10 pt-32 pb-16 sm:pt-36 lg:grid-cols-[1.05fr_1fr] lg:pb-24">
        <div>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-orange/30 bg-orange/10 px-4 py-1.5 text-xs font-bold tracking-wide text-orange"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-orange opacity-70" />
              <span className="relative inline-flex size-2 rounded-full bg-orange" />
            </span>
            {t.hero.tag}
          </motion.div>

          <h1 className="mt-6 text-5xl leading-[0.95] font-black uppercase sm:text-6xl lg:text-7xl" style={{ fontStretch: "75%" }}>
            {t.hero.h1.map((line, i) => (
              <span key={line} className="block overflow-hidden pb-1">
                <motion.span
                  className={cn("block", i === 2 && "text-orange-gradient")}
                  initial={reduce ? false : { y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, ease: EASE, delay: 0.15 + i * 0.12 }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg"
          >
            {t.hero.sub}
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <a href="#contact" className={cta({ size: "lg" })}>
              {t.hero.cta1} <ArrowRight className="transition group-hover:translate-x-1" />
            </a>
            <a href="#services" className={cta({ variant: "ghostDark", size: "lg" })}>
              {t.hero.cta2}
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: EASE, delay: 0.2 }}
          className="relative"
        >
          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-b from-[#0f1a30] to-[#0b1324] p-3 shadow-2xl sm:p-5">
            <CraneScene />
          </div>
        </motion.div>
      </div>

      {/* Kerncijfers */}
      <div className="relative border-t border-white/10 bg-ink/60 backdrop-blur">
        <Stagger className="container-x grid grid-cols-2 lg:grid-cols-4">
          {t.hero.stats.map((s, i) => (
            <motion.div
              key={s.l}
              variants={staggerItem}
              className={cn("px-4 py-7 text-center", i % 2 === 1 && "border-l border-white/10", i >= 2 && "border-t border-white/10 lg:border-t-0", i === 2 && "lg:border-l")}
            >
              <div className="font-heading text-3xl font-black text-orange uppercase sm:text-4xl" style={{ fontStretch: "75%" }}>
                {s.v}
              </div>
              <div className="mt-1 text-xs font-semibold tracking-widest text-white/55 uppercase">{s.l}</div>
            </motion.div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function Strip() {
  const { t } = useI18n();
  return (
    <div className="relative overflow-hidden bg-orange py-3.5" aria-hidden="true">
      <div className="flex w-max animate-marquee">
        {[...t.strip, ...t.strip, ...t.strip].map((s, i) => (
          <span key={i} className="inline-flex items-center gap-5 px-5 font-heading text-lg font-extrabold whitespace-nowrap text-ink uppercase" style={{ fontStretch: "80%" }}>
            {s}
            <span className="h-3 w-6 rounded-sm hazard" />
          </span>
        ))}
      </div>
    </div>
  );
}

function Services() {
  const { t } = useI18n();
  return (
    <section id="services" className="py-20 sm:py-28">
      <div className="container-x">
        <SectionHeading kicker={t.services.tag} title={t.services.h2} lead={t.services.p} />
        <Stagger className="mt-12 grid gap-5 lg:grid-cols-3" gap={0.12}>
          {t.services.items.map((s, i) => {
            const Icon = SERVICE_ICONS[i];
            return (
              <motion.article
                key={s.title}
                variants={staggerItem}
                className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-white transition duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(19,48,94,0.45)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img src={SERVICE_IMAGES[i]} alt={s.title} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 font-heading text-4xl font-black text-white/90" style={{ fontStretch: "75%" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="absolute bottom-4 left-4 grid size-12 place-items-center rounded-2xl bg-orange text-ink">
                    <Icon className="size-6" />
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <h3 className="text-2xl font-extrabold text-navy uppercase" style={{ fontStretch: "80%" }}>
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
                  <ul className="mt-5 flex-1 space-y-2">
                    {s.points.map((pt) => (
                      <li key={pt} className="flex gap-2.5 text-sm text-foreground/85">
                        <Check className="mt-0.5 size-4 shrink-0 text-orange-deep" strokeWidth={3} /> {pt}
                      </li>
                    ))}
                  </ul>
                  <a href="#contact" className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-navy">
                    {t.services.more} <ArrowRight className="size-4 transition group-hover:translate-x-1" />
                  </a>
                </div>
              </motion.article>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}

function Fluvius() {
  const { t } = useI18n();
  const f = t.fluvius;
  return (
    <section id="fluvius" className="relative overflow-hidden bg-asphalt py-20 text-white sm:py-28">
      <div className="grid-lines absolute inset-0" aria-hidden="true" />
      <div className="absolute inset-x-0 top-0 h-2 hazard opacity-80" aria-hidden="true" />
      <div className="container-x relative grid items-center gap-14 lg:grid-cols-2">
        <div>
          <SectionHeading kicker={f.tag} title={f.h2} lead={f.p} dark />
          <Stagger className="mt-10 space-y-4" gap={0.1}>
            {f.points.map((pt, i) => {
              const Icon = FLUVIUS_ICONS[i];
              return (
                <motion.div key={pt.h} variants={staggerItem} className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-orange/40">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-orange/15 text-orange">
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <h3 className="font-heading text-lg font-bold">{pt.h}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-white/65">{pt.p}</p>
                  </div>
                </motion.div>
              );
            })}
          </Stagger>
        </div>

        <Reveal className="rounded-[2rem] border border-white/10 bg-ink/60 p-6 sm:p-8">
          <h3 className="font-heading text-xl font-bold uppercase" style={{ fontStretch: "80%" }}>
            {f.profileTitle}
          </h3>
          <TrenchProfile layers={f.layers} className="mt-6 text-white/85" />
          <ol className="mt-4 space-y-1.5 text-sm text-white/80 sm:hidden">
            {f.layers.map((l, i) => (
              <li key={l} className="flex items-center gap-2">
                <span className="grid size-5 place-items-center rounded-full bg-orange text-[0.65rem] font-bold text-ink">{i + 1}</span>
                {l}
              </li>
            ))}
          </ol>
          <p className="mt-4 text-xs text-white/45">{f.profileNote}</p>
        </Reveal>
      </div>
    </section>
  );
}

function Process() {
  const { t } = useI18n();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="process" ref={ref} className="py-20 sm:py-28">
      <div className="container-x grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading kicker={t.process.tag} title={t.process.h2} />
          <Reveal delay={0.1} className="mt-8 overflow-hidden rounded-[2rem]">
            <img src={img.process} alt="" loading="lazy" className="aspect-[4/3] w-full object-cover" />
          </Reveal>
        </div>
        <div className="relative pl-12 sm:pl-16">
          <div className="absolute top-2 bottom-2 left-[1.15rem] w-0.5 bg-border sm:left-[1.4rem]" aria-hidden="true">
            <motion.div style={{ scaleY: scale }} className="h-full w-full origin-top bg-gradient-to-b from-orange to-orange-deep" />
          </div>
          <ol className="space-y-6">
            {t.process.steps.map((s, i) => (
              <Reveal as="li" key={s.h} delay={i * 0.05} className="relative">
                <span className="absolute top-3 -left-12 grid size-10 place-items-center rounded-full border-2 border-orange bg-white font-heading text-sm font-black text-navy shadow-[0_0_0_6px_white] sm:-left-16 sm:size-12 sm:text-base">
                  {i + 1}
                </span>
                <div className="rounded-3xl border border-border bg-white p-6 transition hover:border-orange/60">
                  <h3 className="text-xl font-extrabold text-navy uppercase" style={{ fontStretch: "80%" }}>
                    {s.h}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.p}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Why() {
  const { t } = useI18n();
  return (
    <section className="bg-paper py-20 sm:py-28">
      <div className="container-x">
        <SectionHeading kicker={t.why.tag} title={t.why.h2} align="center" />
        <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" gap={0.08}>
          {t.why.items.map((w, i) => {
            const Icon = WHY_ICONS[i];
            return (
              <motion.div
                key={w.h}
                variants={staggerItem}
                className="group rounded-3xl border border-border bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-orange"
              >
                <span className="grid size-12 place-items-center rounded-2xl bg-navy text-orange transition group-hover:bg-orange group-hover:text-ink">
                  <Icon className="size-6" />
                </span>
                <h3 className="mt-5 text-xl font-extrabold text-navy uppercase" style={{ fontStretch: "80%" }}>
                  {w.h}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{w.p}</p>
              </motion.div>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}

function Area() {
  const { t } = useI18n();
  return (
    <section id="area" className="relative overflow-hidden bg-navy py-20 text-white sm:py-28">
      <img src={img.area} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/60" />
      <div className="container-x relative grid items-center gap-14 lg:grid-cols-2">
        <div>
          <SectionHeading kicker={t.area.tag} title={t.area.h2} lead={t.area.p} dark />
          <Stagger className="mt-8 flex flex-wrap gap-2" gap={0.04}>
            {t.area.regions.map((r) => (
              <motion.span key={r} variants={staggerItem} className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-sm text-white/85">
                <MapPin className="size-3.5 text-orange" /> {r}
              </motion.span>
            ))}
          </Stagger>
        </div>

        <Reveal className="relative mx-auto aspect-square w-full max-w-sm">
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-full border border-orange/40"
              initial={{ scale: 0.2, opacity: 0.8 }}
              animate={{ scale: 1, opacity: 0 }}
              transition={{ duration: 4, repeat: Infinity, delay: i, ease: "easeOut" }}
              aria-hidden="true"
            />
          ))}
          <div className="absolute inset-[18%] rounded-full border border-white/10" aria-hidden="true" />
          <div className="absolute inset-[36%] rounded-full border border-white/10" aria-hidden="true" />
          <div className="absolute top-1/2 left-1/2 grid -translate-1/2 place-items-center text-center">
            <span className="grid size-20 place-items-center rounded-full bg-orange text-ink shadow-[0_0_60px_rgba(245,166,35,0.55)]">
              <MapPin className="size-8" />
            </span>
            <span className="mt-3 font-heading text-2xl font-black uppercase" style={{ fontStretch: "80%" }}>
              Lokeren
            </span>
            <span className="text-xs font-semibold tracking-widest text-white/55 uppercase">{t.area.base}</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Faq() {
  const { t } = useI18n();
  return (
    <section className="py-20 sm:py-28">
      <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <SectionHeading kicker={t.faq.tag} title={t.faq.h2} />
          <Reveal delay={0.1} className="mt-8 hidden overflow-hidden rounded-[2rem] lg:block">
            <img src={img.faq} alt="" loading="lazy" className="aspect-[4/3] w-full object-cover" />
          </Reveal>
        </div>
        <Reveal>
          <Accordion className="rounded-3xl border border-border bg-white p-2 sm:p-4">
            {t.faq.items.map((f, i) => (
              <AccordionItem key={f.q} value={i} className="border-border px-3 sm:px-4">
                <AccordionTrigger className="py-5 font-heading text-base font-bold text-navy hover:no-underline sm:text-lg">{f.q}</AccordionTrigger>
                <AccordionContent className="pb-5 text-[0.95rem] leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}

function Contact() {
  const { t } = useI18n();
  const c = t.contact;
  const [form, setForm] = useState({ name: "", phone: "", service: "", info: "" });
  const [error, setError] = useState(null);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const serviceOptions = [...t.services.items.map((s) => s.title), c.form.other];

  const message = [
    c.form.greeting,
    "",
    `${c.form.name.replace(" *", "")}: ${form.name}`,
    `${c.form.phone.replace(" *", "")}: ${form.phone}`,
    `${c.form.service.replace(" *", "")}: ${form.service}`,
    form.info ? `${c.form.info}: ${form.info}` : null,
    "",
    c.form.closing,
  ]
    .filter((l) => l !== null)
    .join("\n");

  const valid = () => {
    if (!form.name.trim() || !form.phone.trim() || !form.service) {
      setError(c.form.error);
      return false;
    }
    setError(null);
    return true;
  };

  const sendWhatsapp = (e) => {
    e.preventDefault();
    if (valid()) window.open(links.whatsapp(message), "_blank", "noopener,noreferrer");
  };
  const sendMail = () => {
    if (valid()) window.location.href = `${links.mail}?subject=${encodeURIComponent(`${c.form.h3} – ${form.service}`)}&body=${encodeURIComponent(message)}`;
  };

  const info = [
    { icon: Phone, label: c.phone, value: company.phoneDisplay, href: links.tel, note: c.hours },
    { icon: Mail, label: c.email, value: company.email, href: links.mail, note: c.emailNote },
    { icon: MessageCircle, label: c.whatsapp, value: company.phoneDisplay, href: links.whatsapp(t.waMessage), note: c.whatsappNote, external: true },
    { icon: MapPin, label: c.address, value: company.street, note: company.city },
  ];

  return (
    <section id="contact" className="relative overflow-hidden bg-ink py-20 text-white sm:py-28">
      <div className="grid-lines absolute inset-0" aria-hidden="true" />
      <div className="container-x relative">
        <SectionHeading kicker={c.tag} title={c.h2} lead={c.lead} dark />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.15fr]">
          <div className="space-y-3">
            <Stagger className="grid gap-3 sm:grid-cols-2" gap={0.06}>
              {info.map((it) => {
                const Inner = (
                  <>
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-orange text-ink">
                      <it.icon className="size-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs font-semibold tracking-widest text-white/45 uppercase">{it.label}</span>
                      <span className="block truncate font-semibold">{it.value}</span>
                      <span className="block text-xs text-white/55">{it.note}</span>
                    </span>
                  </>
                );
                const cls = "flex h-full items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition hover:border-orange/50";
                return (
                  <motion.div key={it.label} variants={staggerItem}>
                    {it.href ? (
                      <a href={it.href} className={cls} {...(it.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                        {Inner}
                      </a>
                    ) : (
                      <div className={cls}>{Inner}</div>
                    )}
                  </motion.div>
                );
              })}
            </Stagger>
            <Reveal delay={0.1} className="overflow-hidden rounded-2xl border border-white/10">
              <iframe
                title={c.mapTitle}
                src={`https://www.google.com/maps?q=${encodeURIComponent(company.mapQuery)}&z=14&output=embed`}
                className="h-64 w-full border-0 lg:h-72"
                style={{ filter: "invert(0.9) hue-rotate(180deg) brightness(0.85) contrast(1.1)" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </Reveal>
            <p className="flex items-center gap-2 text-sm text-white/55">
              <UserRound className="size-4 text-orange" /> {c.contactPerson}: <span className="font-semibold text-white/85">{company.contactPerson}</span>
            </p>
          </div>

          <Reveal delay={0.1} className="rounded-[2rem] bg-white p-7 text-foreground sm:p-10">
            <h3 className="text-2xl font-extrabold text-navy uppercase" style={{ fontStretch: "80%" }}>
              {c.form.h3}
            </h3>
            <form onSubmit={sendWhatsapp} noValidate className="mt-6 grid gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="name">{c.form.name}</Label>
                  <Input id="name" autoComplete="organization" value={form.name} onChange={set("name")} className="h-12 rounded-xl" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">{c.form.phone}</Label>
                  <Input id="phone" type="tel" autoComplete="tel" value={form.phone} onChange={set("phone")} placeholder="+32 …" className="h-12 rounded-xl" />
                </div>
              </div>
              <fieldset className="grid gap-2">
                <legend className="mb-2 text-sm font-medium">{c.form.service}</legend>
                <div className="flex flex-wrap gap-2">
                  {serviceOptions.map((o) => (
                    <label
                      key={o}
                      className={cn(
                        "cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition has-focus-visible:ring-3 has-focus-visible:ring-orange/50",
                        form.service === o ? "border-navy bg-navy text-white" : "border-border text-foreground/75 hover:border-navy/40",
                      )}
                    >
                      <input type="radio" name="service" value={o} checked={form.service === o} onChange={set("service")} className="sr-only" />
                      {o}
                    </label>
                  ))}
                </div>
              </fieldset>
              <div className="grid gap-2">
                <Label htmlFor="info">{c.form.info}</Label>
                <Textarea id="info" value={form.info} onChange={set("info")} placeholder={c.form.infoPlaceholder} className="min-h-32 rounded-xl" />
              </div>
              {error ? (
                <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-sm font-semibold text-destructive" role="alert">
                  {error}
                </motion.p>
              ) : null}
              <div className="flex flex-col gap-3 sm:flex-row">
                <button type="submit" className={cta({ variant: "whatsapp", size: "lg" })}>
                  <MessageCircle /> {c.form.sendWa}
                </button>
                <button type="button" onClick={sendMail} className={cta({ variant: "navy", size: "lg" })}>
                  <Send /> {c.form.sendMail}
                </button>
              </div>
              <p className="text-xs text-muted-foreground">{c.form.note}</p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const { t } = useI18n();
  return (
    <footer className="border-t border-white/10 bg-ink pb-24 text-white/60 md:pb-0">
      <div className="container-x grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-4">
          <Logo tagline={t.tagline} dark />
          <p className="max-w-sm text-sm leading-relaxed">{t.footer.brand}</p>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-bold tracking-widest text-white uppercase">{t.footer.nav}</h3>
          <ul className="space-y-2.5 text-sm">
            {SECTIONS.map((id) => (
              <li key={id}>
                <a href={`#${id}`} className="transition hover:text-orange">
                  {t.nav[id]}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-bold tracking-widest text-white uppercase">{t.nav.contact}</h3>
          <ul className="space-y-3 text-sm">
            <li><a href={links.tel} className="inline-flex items-center gap-2 transition hover:text-orange"><Phone className="size-4 text-orange" /> {company.phoneDisplay}</a></li>
            <li><a href={links.mail} className="inline-flex items-center gap-2 transition hover:text-orange"><Mail className="size-4 text-orange" /> {company.email}</a></li>
            <li className="flex gap-2"><MapPin className="mt-0.5 size-4 shrink-0 text-orange" /> <span>{company.street}<br />{company.city}</span></li>
          </ul>
        </div>
      </div>
      <div className="h-1.5 hazard opacity-70" aria-hidden="true" />
      <div className="container-x py-5 text-xs text-white/40">
        © {new Date().getFullYear()} {company.legal}. {t.footer.rights}
      </div>
    </footer>
  );
}

function WhatsAppFab() {
  const { t } = useI18n();
  const [bubble, setBubble] = useState(true);
  return (
    <div className="fixed right-5 bottom-24 z-40 flex items-center gap-3 md:bottom-6">
      {bubble ? (
        <motion.button
          type="button"
          onClick={() => setBubble(false)}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 4 }}
          className="hidden max-w-56 rounded-2xl rounded-br-sm bg-white px-4 py-2.5 text-left text-sm font-medium text-ink shadow-xl sm:block"
        >
          {t.waBubble}
        </motion.button>
      ) : null}
      <a
        href={links.whatsapp(t.waMessage)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="relative grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-6px_rgba(37,211,102,0.7)] transition hover:scale-105"
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-30" aria-hidden="true" />
        <MessageCircle className="relative size-7" />
      </a>
    </div>
  );
}

function MobileBar() {
  const { t } = useI18n();
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-white/10 bg-ink/95 p-3 backdrop-blur md:hidden">
      <a href={links.tel} className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/20 font-semibold text-white">
        <Phone className="size-4" /> {t.contact.phone}
      </a>
      <a href="#contact" className="inline-flex h-12 items-center justify-center rounded-full bg-orange font-semibold text-ink">
        {t.nav.cta}
      </a>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Strip />
        <Services />
        <Fluvius />
        <Process />
        <Why />
        <Area />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFab />
      <MobileBar />
    </>
  );
}
