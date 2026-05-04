import React from "react";
import { useLang } from "../../context/LanguageContext";
import { Users, Package, CarFront, ArrowUpRight } from "lucide-react";

// All three cards feature the SAME luxury Renault Master 8+1 (per user request).
// We differentiate via overlay badges + decorative SVG accessories (trailer / car platform).
const HERO_IMG = "/hero-van.jpg";

function TrailerOverlay() {
  // Decorative SVG of a small enclosed cargo trailer hooked to the van
  return (
    <svg
      className="absolute bottom-3 right-3 w-32 h-16 drop-shadow-2xl pointer-events-none"
      viewBox="0 0 220 110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="20" y="20" width="160" height="55" rx="6" fill="#fff" stroke="#0f172a" strokeWidth="3" />
      <rect x="160" y="35" width="14" height="25" rx="2" fill="#0f172a" />
      <rect x="35" y="30" width="115" height="35" rx="2" fill="#f8fafc" />
      <text x="92" y="52" textAnchor="middle" fontFamily="Space Grotesk, sans-serif" fontSize="14" fontWeight="700" fill="#f97316">BGD</text>
      <circle cx="55" cy="82" r="11" fill="#0f172a" />
      <circle cx="55" cy="82" r="5" fill="#f97316" />
      <circle cx="145" cy="82" r="11" fill="#0f172a" />
      <circle cx="145" cy="82" r="5" fill="#f97316" />
      <line x1="0" y1="55" x2="20" y2="48" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function CarPlatformOverlay() {
  // Decorative SVG of a flatbed car carrier with a sedan strapped on top
  return (
    <svg
      className="absolute bottom-3 right-3 w-40 h-20 drop-shadow-2xl pointer-events-none"
      viewBox="0 0 280 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* sedan car on top */}
      <path d="M70 50 L100 30 L180 30 L210 50 L240 55 L240 75 L60 75 L60 55 Z" fill="#1e293b" />
      <path d="M105 35 L175 35 L195 50 L90 50 Z" fill="#94a3b8" opacity="0.7" />
      <circle cx="95" cy="80" r="8" fill="#0f172a" />
      <circle cx="215" cy="80" r="8" fill="#0f172a" />
      {/* flatbed platform */}
      <rect x="30" y="80" width="240" height="14" rx="3" fill="#f97316" />
      <rect x="30" y="80" width="240" height="6" rx="2" fill="#fb923c" />
      {/* trailer wheels */}
      <circle cx="70" cy="105" r="13" fill="#0f172a" />
      <circle cx="70" cy="105" r="6" fill="#f97316" />
      <circle cx="225" cy="105" r="13" fill="#0f172a" />
      <circle cx="225" cy="105" r="6" fill="#f97316" />
      {/* hitch */}
      <line x1="0" y1="92" x2="30" y2="86" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export default function Services() {
  const { t, lang } = useLang();

  const cards = [
    {
      key: "passengers",
      icon: Users,
      img: HERO_IMG,
      objectPos: "center",
      badge: { ro: "8+1 LOCURI", en: "8+1 SEATS", de: "8+1 SITZE" },
      overlay: null,
      ...t.services.passengers,
    },
    {
      key: "parcels",
      icon: Package,
      img: HERO_IMG,
      objectPos: "30% center",
      badge: { ro: "+ REMORCĂ COLETE", en: "+ CARGO TRAILER", de: "+ FRACHTANHÄNGER" },
      overlay: <TrailerOverlay />,
      ...t.services.parcels,
    },
    {
      key: "auto",
      icon: CarFront,
      img: HERO_IMG,
      objectPos: "20% center",
      badge: { ro: "+ PLATFORMĂ AUTO", en: "+ CAR PLATFORM", de: "+ AUTO-PLATTFORM" },
      overlay: <CarPlatformOverlay />,
      ...t.services.auto,
    },
  ];

  return (
    <section id="servicii" data-testid="services-section" className="py-20 sm:py-32 bg-slate-50">
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
        <div className="max-w-2xl mb-14">
          <div className="text-sm font-bold tracking-[0.18em] uppercase text-orange-500 mb-4">
            {t.services.label}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {t.services.title}
          </h2>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">{t.services.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {cards.map((c, idx) => {
            const Icon = c.icon;
            return (
              <article
                key={c.key}
                data-testid={`service-card-${c.key}`}
                className="group bg-white rounded-3xl border border-slate-200 overflow-hidden hover:shadow-2xl hover:shadow-slate-900/10 hover:-translate-y-1 transition-all duration-500"
              >
                <div className="relative h-56 overflow-hidden bg-slate-200">
                  <img
                    src={c.img}
                    alt={c.title}
                    style={{ objectPosition: c.objectPos }}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-slate-950/15 to-transparent" />

                  {/* Service icon badge top-left */}
                  <div className="absolute top-4 left-4 w-12 h-12 rounded-xl bg-orange-500 text-white flex items-center justify-center shadow-lg shadow-orange-500/40">
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Service highlight badge top-right */}
                  <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur text-slate-900 text-[0.65rem] font-black tracking-[0.15em] uppercase shadow-lg">
                    {c.badge[lang] || c.badge.ro}
                  </div>

                  {/* Number indicator */}
                  <div className="absolute bottom-4 left-4 text-white/90 text-xs font-bold tracking-[0.2em] uppercase">
                    0{idx + 1}
                  </div>

                  {/* Decorative overlay (trailer / car platform) */}
                  {c.overlay}
                </div>
                <div className="p-7">
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight flex items-center justify-between" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {c.title}
                    <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-orange-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                  </h3>
                  <p className="mt-3 text-slate-600 leading-relaxed">{c.desc}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
