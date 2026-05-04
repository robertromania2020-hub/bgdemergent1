import React from "react";
import { useLang } from "../../context/LanguageContext";
import { Star, Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Andreea M.",
    location: "București → München",
    text: {
      ro: "Am călătorit de mai multe ori cu BGD-Trans și de fiecare dată totul a decurs perfect. Șoferi politicoși, mașini curate, plecări la timp. Recomand cu toată încrederea!",
      en: "I've traveled with BGD-Trans several times and everything went perfectly each time. Polite drivers, clean vehicles, on-time departures. Highly recommend!",
      de: "Ich bin mehrmals mit BGD-Trans gefahren und alles lief perfekt. Höfliche Fahrer, saubere Fahrzeuge, pünktliche Abfahrten. Klare Empfehlung!",
    },
    rating: 5,
  },
  {
    name: "Marius D.",
    location: "Iași → Stuttgart",
    text: {
      ro: "Am trimis un colet în Germania și a ajuns mai repede decât m-am așteptat. Comunicare excelentă pe WhatsApp, prețul corect, totul ușă la ușă.",
      en: "I shipped a parcel to Germany and it arrived faster than expected. Excellent WhatsApp communication, fair price, full door-to-door service.",
      de: "Ich habe ein Paket nach Deutschland geschickt – schneller als erwartet angekommen. Exzellente WhatsApp-Kommunikation, faire Preise, von Tür zu Tür.",
    },
    rating: 5,
  },
  {
    name: "Cristian P.",
    location: "Timișoara → Amsterdam",
    text: {
      ro: "Cea mai confortabilă cursă pe care am avut-o spre Olanda. Mașină nouă, aer condiționat, șofer foarte profesionist. Mulțumesc, BGD-Trans!",
      en: "The most comfortable trip I've had to the Netherlands. New vehicle, AC, very professional driver. Thank you, BGD-Trans!",
      de: "Die komfortabelste Fahrt, die ich in die Niederlande hatte. Neues Fahrzeug, Klimaanlage, sehr professioneller Fahrer. Danke, BGD-Trans!",
    },
    rating: 5,
  },
  {
    name: "Elena R.",
    location: "Sibiu → Wien",
    text: {
      ro: "Am rezervat ultimul moment pe WhatsApp și au fost foarte flexibili. Călătoria a fost liniștită și sigură. Cu siguranță voi reveni.",
      en: "Booked last-minute on WhatsApp and they were very flexible. The trip was smooth and safe. I'll definitely come back.",
      de: "Last-Minute-Buchung über WhatsApp – sehr flexibel. Die Fahrt war ruhig und sicher. Ich komme bestimmt wieder.",
    },
    rating: 5,
  },
];

const SECTION = {
  ro: { label: "Testimoniale", title: "Ce spun clienții noștri", subtitle: "Mii de călători mulțumiți între România și Europa de Vest." },
  en: { label: "Testimonials", title: "What our clients say", subtitle: "Thousands of satisfied travelers between Romania and Western Europe." },
  de: { label: "Stimmen", title: "Was unsere Kunden sagen", subtitle: "Tausende zufriedene Reisende zwischen Rumänien und Westeuropa." },
};

export default function Testimonials() {
  const { lang } = useLang();
  const s = SECTION[lang] || SECTION.ro;

  return (
    <section id="testimoniale" data-testid="testimonials-section" className="py-20 sm:py-32 bg-white">
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
        <div className="max-w-2xl mb-14">
          <div className="text-sm font-bold tracking-[0.18em] uppercase text-orange-500 mb-4">{s.label}</div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {s.title}
          </h2>
          <p className="mt-4 text-lg text-slate-600">{s.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <article
              key={i}
              data-testid={`testimonial-${i}`}
              className="group relative p-6 rounded-3xl bg-slate-50 border border-slate-200 hover:border-orange-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
            >
              <Quote className="absolute top-5 right-5 w-8 h-8 text-orange-200 group-hover:text-orange-300 transition-colors" />
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 fill-orange-400 text-orange-400" />
                ))}
              </div>
              <p className="text-slate-700 text-sm leading-relaxed">{t.text[lang] || t.text.ro}</p>
              <div className="mt-6 pt-4 border-t border-slate-200">
                <div className="font-bold text-slate-900">{t.name}</div>
                <div className="text-xs text-slate-500 mt-0.5">{t.location}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
