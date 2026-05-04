import React from "react";
import { useLang } from "../../context/LanguageContext";
import { telHref, whatsappHref, BUSINESS_PHONE_DISPLAY } from "../../lib/contact";
import { Phone, MessageCircle, ArrowRight, ShieldCheck, Clock, MapPinned } from "lucide-react";

const HERO_IMG = "/hero-van.jpg";

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
          alt="BGD-Trans Renault Master van on European highway"
          className="w-full h-full object-cover object-center"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/55 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
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
      </div>
    </section>
  );
}
