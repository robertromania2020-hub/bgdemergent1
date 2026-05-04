import React from "react";
import { useLang } from "../../context/LanguageContext";
import { Globe2, UserCheck, Truck, BadgeEuro, Headphones, Sparkles } from "lucide-react";

const ICONS = [Globe2, UserCheck, Truck, BadgeEuro, Headphones, Sparkles];

export default function WhyUs() {
  const { t } = useLang();
  return (
    <section id="de-ce-noi" data-testid="why-section" className="py-20 sm:py-32">
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <div className="text-sm font-bold tracking-[0.18em] uppercase text-orange-500 mb-4">{t.why.label}</div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {t.why.title}
            </h2>
            <div className="mt-8 h-1 w-20 bg-orange-500 rounded-full" />
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {t.why.items.map((item, idx) => {
              const Icon = ICONS[idx % ICONS.length];
              return (
                <div
                  key={idx}
                  data-testid={`why-item-${idx}`}
                  className="group p-6 rounded-2xl bg-white border border-slate-200 hover:border-orange-300 hover:shadow-lg transition-all"
                >
                  <div className="w-11 h-11 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center mb-4 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg tracking-tight">{item.t}</h3>
                  <p className="mt-2 text-slate-600 text-sm leading-relaxed">{item.d}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
