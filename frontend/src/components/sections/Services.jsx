import React from "react";
import { useLang } from "../../context/LanguageContext";
import { Users, Package, CarFront, ArrowUpRight } from "lucide-react";

const IMAGES = {
  passengers: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80",
  parcels: "https://images.pexels.com/photos/6869048/pexels-photo-6869048.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  auto: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1200&q=80",
};

export default function Services() {
  const { t } = useLang();
  const cards = [
    { key: "passengers", icon: Users, img: IMAGES.passengers, ...t.services.passengers },
    { key: "parcels", icon: Package, img: IMAGES.parcels, ...t.services.parcels },
    { key: "auto", icon: CarFront, img: IMAGES.auto, ...t.services.auto },
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
                <div className="relative h-56 overflow-hidden">
                  <img src={c.img} alt={c.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 w-12 h-12 rounded-xl bg-orange-500 text-white flex items-center justify-center shadow-lg shadow-orange-500/40">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="absolute bottom-4 left-4 text-white/80 text-xs font-bold tracking-[0.2em] uppercase">
                    0{idx + 1}
                  </div>
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
