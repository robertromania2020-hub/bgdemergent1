import React from "react";
import { Link } from "react-router-dom";
import { useLang } from "../../context/LanguageContext";
import { CITIES } from "../../lib/cities";
import { ROUTE_LIST } from "../../lib/route-pages";
import { MapPin, ArrowRight, RotateCcw, Sparkles } from "lucide-react";

const COUNTRY_META = {
  Romania: { flag: "🇷🇴", label: "România", color: "from-blue-500 to-red-500" },
  Germania: { flag: "🇩🇪", label: "Germania", color: "from-slate-900 to-red-500" },
  Austria: { flag: "🇦🇹", label: "Austria", color: "from-red-500 to-white" },
  Olanda: { flag: "🇳🇱", label: "Olanda", color: "from-red-500 to-blue-500" },
};

function CountryColumn({ code, cities }) {
  const meta = COUNTRY_META[code];
  return (
    <div data-testid={`route-country-${code.toLowerCase()}`} className="bg-white/5 rounded-2xl border border-white/10 p-6 hover:border-orange-400/50 transition-colors">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl leading-none">{meta.flag}</span>
        <div>
          <div className="text-xs font-bold tracking-[0.18em] uppercase text-orange-300">
            {code === "Romania" ? "Plecări" : "Destinații"}
          </div>
          <h3 className="text-lg font-bold text-white tracking-tight">{meta.label}</h3>
        </div>
      </div>
      <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-slate-200">
        {cities.map((city) => (
          <li key={city} className="flex items-center gap-2">
            <MapPin className="w-3 h-3 text-orange-400 flex-shrink-0" />
            <span className="truncate">{city}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function RoutesSection() {
  const { t } = useLang();
  return (
    <section id="rute" data-testid="routes-section" className="py-20 sm:py-32">
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
        <div className="max-w-2xl mb-12">
          <div className="text-sm font-bold tracking-[0.18em] uppercase text-orange-500 mb-4">{t.routes.label}</div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {t.routes.title}
          </h2>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">{t.routes.subtitle}</p>
        </div>

        <div className="bg-slate-900 rounded-3xl p-8 lg:p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(249,115,22,0.15),transparent_50%)]" />
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-orange-500/10 blur-3xl" />

          {/* Route stepper */}
          <div className="relative flex flex-wrap items-center gap-3 mb-10 text-white">
            {["Romania", "Germania", "Austria", "Olanda"].map((c, i, arr) => (
              <React.Fragment key={c}>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 backdrop-blur-sm">
                  <span>{COUNTRY_META[c].flag}</span>
                  <span className="font-semibold">{COUNTRY_META[c].label}</span>
                </div>
                {i < arr.length - 1 && <ArrowRight className="w-5 h-5 text-orange-400" />}
              </React.Fragment>
            ))}
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6">
            <CountryColumn code="Romania" cities={CITIES.Romania} />
            <CountryColumn code="Germania" cities={CITIES.Germania} />
            <CountryColumn code="Austria" cities={CITIES.Austria} />
            <CountryColumn code="Olanda" cities={CITIES.Olanda} />
          </div>

          <div className="relative mt-10 flex items-center gap-3 text-white/80 text-sm p-5 rounded-2xl bg-orange-500/10 border border-orange-400/20">
            <RotateCcw className="w-5 h-5 text-orange-400 flex-shrink-0" />
            <div>
              <span className="font-bold text-orange-300 mr-2">{t.routes.return}:</span>
              {t.routes.returnText}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <span className="text-xs font-bold tracking-[0.18em] uppercase text-slate-500 mr-2 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-orange-500" /> Pagini dedicate per rută:
          </span>
          {ROUTE_LIST.map((r) => (
            <Link
              key={r.slug}
              to={`/rute/${r.slug}`}
              data-testid={`route-link-${r.slug}`}
              className="group inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 hover:border-orange-300 hover:bg-orange-50 text-slate-700 font-semibold text-sm transition-all"
            >
              {r.from} → {r.to}
              <ArrowRight className="w-4 h-4 text-orange-500 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
