import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLang } from "../context/LanguageContext";
import { LANGUAGES } from "../lib/i18n";
import { telHref, BUSINESS_PHONE_DISPLAY } from "../lib/contact";
import { Phone, Menu, X, Truck } from "lucide-react";

export default function Header() {
  const { lang, setLang, t } = useLang();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => (e) => {
    e.preventDefault();
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      data-testid="site-header"
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "backdrop-blur-xl bg-white/85 border-b border-slate-200 shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl h-16 flex items-center justify-between">
        <Link to="/" data-testid="site-logo" className="flex items-center gap-2 font-bold text-lg tracking-tight">
          <span className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center">
            <Truck className="w-5 h-5 text-orange-400" />
          </span>
          <span className="text-slate-900">BGD<span className="text-orange-500">-</span>Trans</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-700">
          <a href="#servicii" onClick={scrollTo("servicii")} data-testid="nav-services" className="hover:text-orange-500 transition-colors">{t.nav.services}</a>
          <a href="#rute" onClick={scrollTo("rute")} data-testid="nav-routes" className="hover:text-orange-500 transition-colors">{t.nav.routes}</a>
          <a href="#de-ce-noi" onClick={scrollTo("de-ce-noi")} data-testid="nav-why" className="hover:text-orange-500 transition-colors">{t.nav.whyUs}</a>
          <a href="#testimoniale" onClick={scrollTo("testimoniale")} data-testid="nav-testimonials" className="hover:text-orange-500 transition-colors">{t.nav.testimonials}</a>
          <a href="#rezervare" onClick={scrollTo("rezervare")} data-testid="nav-booking" className="hover:text-orange-500 transition-colors">{t.nav.booking}</a>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-1 rounded-full border border-slate-200 bg-white/80 p-1">
            {LANGUAGES.map((l) => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                data-testid={`lang-${l.code}`}
                className={`px-3 py-1 rounded-full text-xs font-bold tracking-wider transition-all ${
                  lang === l.code ? "bg-slate-900 text-white" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>

          <a
            href={telHref}
            data-testid="header-call-btn"
            className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold shadow-sm shadow-orange-500/30 transition-all hover:shadow-md hover:shadow-orange-500/40"
          >
            <Phone className="w-4 h-4" />
            {BUSINESS_PHONE_DISPLAY}
          </a>

          <button
            className="lg:hidden p-2 rounded-lg border border-slate-200 bg-white"
            onClick={() => setOpen((v) => !v)}
            data-testid="mobile-menu-toggle"
            aria-label="menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-slate-200 bg-white" data-testid="mobile-menu">
          <nav className="container mx-auto px-6 py-6 flex flex-col gap-4 text-slate-800 font-medium">
            <a href="#servicii" onClick={scrollTo("servicii")}>{t.nav.services}</a>
            <a href="#rute" onClick={scrollTo("rute")}>{t.nav.routes}</a>
            <a href="#de-ce-noi" onClick={scrollTo("de-ce-noi")}>{t.nav.whyUs}</a>
            <a href="#rezervare" onClick={scrollTo("rezervare")}>{t.nav.booking}</a>
            <div className="flex items-center gap-2 pt-2">
              {LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  data-testid={`lang-mobile-${l.code}`}
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    lang === l.code ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700"
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
