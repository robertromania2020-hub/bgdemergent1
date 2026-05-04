import React from "react";
import { useLang } from "../../context/LanguageContext";
import { telHref, whatsappHref, BUSINESS_PHONE_DISPLAY } from "../../lib/contact";
import { Phone, MessageCircle, ArrowRight, ShieldCheck, Clock, MapPinned } from "lucide-react";

const HERO_IMG =
  "https://images.unsplash.com/photo-1768400554801-2002b63e0591?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMjd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMHBhc3NlbmdlciUyMHZhbiUyMGhpZ2h3YXl8ZW58MHx8fHwxNzc3OTA5OTYwfDA&ixlib=rb-4.1.0&q=85";

export default function Hero() {
  const { t } = useLang();
  return (
    <section
      data-testid="hero-section"
      className="relative min-h-[92vh] flex items-center overflow-hidden"
    >
      <div className="absolute inset-0">
        <img
          src={HERO_IMG}
          alt="BGD-Trans van on European highway"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/70 to-slate-900/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(249,115,22,0.18),transparent_55%)]" />
      </div>

      <div className="relative container mx-auto px-6 lg:px-12 max-w-7xl py-24">
        <div className="max-w-3xl">
          <div
            data-testid="hero-badge"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white text-xs font-bold tracking-[0.18em] uppercase mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
            {t.hero.badge}
          </div>

          <h1
            data-testid="hero-title"
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter text-white leading-[1.05]"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {t.hero.title1}
            <span className="block text-orange-400 mt-2">{t.hero.title2}</span>
          </h1>

          <p data-testid="hero-subtitle" className="mt-6 text-lg sm:text-xl text-slate-200 max-w-2xl leading-relaxed">
            {t.hero.subtitle}
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <a
              href={telHref}
              data-testid="hero-call-btn"
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-base shadow-lg shadow-orange-500/30 transition-all hover:-translate-y-0.5"
            >
              <Phone className="w-5 h-5" />
              {t.hero.callCta}
              <span className="text-sm opacity-90 font-semibold">{BUSINESS_PHONE_DISPLAY}</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href={whatsappHref("Bună! Vreau să rezerv o cursă BGD-Trans.")}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="hero-whatsapp-btn"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-[#25D366] hover:bg-[#128C7E] text-white font-bold text-base transition-all hover:-translate-y-0.5"
            >
              <MessageCircle className="w-5 h-5" />
              {t.hero.whatsappCta}
            </a>
          </div>

          <div className="mt-10 flex flex-wrap gap-6 text-sm text-slate-300">
            <div className="flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-orange-400" /> {t.hero.busText.split("•")[0]}</div>
            <div className="flex items-center gap-2"><Clock className="w-5 h-5 text-orange-400" /> {t.hero.busText.split("•")[1]}</div>
            <div className="flex items-center gap-2"><MapPinned className="w-5 h-5 text-orange-400" /> {t.hero.busText.split("•")[2]}</div>
          </div>
        </div>

        {/* Floating "side-of-van" branding badge */}
        <div className="hidden lg:block absolute right-12 bottom-16 pointer-events-none">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-white/40 shadow-2xl px-6 py-4 rotate-[-2deg]">
            <div className="text-[0.7rem] font-bold tracking-[0.2em] uppercase text-slate-400">Contact direct</div>
            <div className="text-2xl font-black tracking-tight text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              BGD<span className="text-orange-500">-</span>Trans
            </div>
            <div className="flex items-center gap-2 text-slate-700 font-semibold">
              <Phone className="w-4 h-4 text-orange-500" />
              {BUSINESS_PHONE_DISPLAY}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
