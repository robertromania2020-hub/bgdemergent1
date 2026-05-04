import React, { useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { ROUTE_PAGES } from "../lib/route-pages";
import { telHref, whatsappHref, BUSINESS_PHONE_DISPLAY } from "../lib/contact";
import Header from "../components/Header";
import Footer from "../components/sections/Footer";
import StickyMobileCTA from "../components/StickyMobileCTA";
import BookingForm from "../components/sections/BookingForm";
import Testimonials from "../components/sections/Testimonials";
import { ArrowRight, Phone, MessageCircle, Check, MapPin } from "lucide-react";

export default function RoutePage() {
  const { slug } = useParams();
  const route = ROUTE_PAGES[slug];

  useEffect(() => {
    if (!route) return;
    document.title = route.seo.title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", route.seo.description);

    // Inject route-specific JSON-LD
    const id = "route-jsonld";
    document.getElementById(id)?.remove();
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = id;
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": `Transport ${route.from} - ${route.to}`,
      "provider": {
        "@type": "MovingCompany",
        "name": "BGD-Trans",
        "telephone": "+40769129126",
      },
      "areaServed": [route.from, route.to],
      "name": route.seo.h1,
      "description": route.seo.description,
    });
    document.head.appendChild(script);
    return () => document.getElementById(id)?.remove();
  }, [slug, route]);

  if (!route) return <Navigate to="/" replace />;

  return (
    <div className="bg-white text-slate-900" style={{ fontFamily: "'Manrope', sans-serif" }}>
      <Header />

      <section className="relative pt-16 pb-20 sm:pt-24 sm:pb-28 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(249,115,22,0.18),transparent_55%)]" />
        <div className="absolute -bottom-32 -left-32 w-[28rem] h-[28rem] rounded-full bg-orange-500/10 blur-3xl" />

        <div className="relative container mx-auto px-6 lg:px-12 max-w-7xl">
          <div className="text-xs font-bold tracking-[0.2em] uppercase text-orange-400 mb-4">
            <Link to="/" className="hover:underline">BGD-Trans</Link> / Rute / {route.from} → {route.to}
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter text-white leading-[1.05]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {route.seo.h1.split("→")[0]}<span className="text-orange-400">→ {route.to}</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">{route.seo.intro}</p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <a href={telHref} data-testid="route-call-btn" className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-base shadow-lg shadow-orange-500/30 transition-all hover:-translate-y-0.5">
              <Phone className="w-5 h-5" /> Sună acum {BUSINESS_PHONE_DISPLAY}
            </a>
            <a
              href={whatsappHref(`Bună! Vreau o cursă ${route.from} → ${route.to}.`)}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="route-whatsapp-btn"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-[#25D366] hover:bg-[#128C7E] text-white font-bold transition-all hover:-translate-y-0.5"
            >
              <MessageCircle className="w-5 h-5" /> Rezervă pe WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-5">
              <div className="text-sm font-bold tracking-[0.18em] uppercase text-orange-500 mb-4">Avantaje</div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                De ce BGD-Trans pe ruta {route.from} → {route.to}
              </h2>
              <ul className="mt-8 space-y-4">
                {route.seo.benefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-white" />
                    </span>
                    <span className="text-slate-700">{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="rounded-2xl bg-slate-50 border border-slate-200 p-6">
                <div className="text-xs font-bold tracking-[0.18em] uppercase text-slate-500 mb-3">Plecări</div>
                <h3 className="text-lg font-bold text-slate-900 mb-4">{route.from}</h3>
                <ul className="space-y-2 text-sm text-slate-700">
                  {route.fromCities.map((c) => (
                    <li key={c} className="flex items-center gap-2"><MapPin className="w-3 h-3 text-orange-500" /> {c}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl bg-slate-900 text-white border border-slate-800 p-6">
                <div className="text-xs font-bold tracking-[0.18em] uppercase text-orange-300 mb-3">Destinații</div>
                <h3 className="text-lg font-bold mb-4">{route.to}</h3>
                <ul className="space-y-2 text-sm text-slate-200">
                  {route.toCities.map((c) => (
                    <li key={c} className="flex items-center gap-2"><MapPin className="w-3 h-3 text-orange-400" /> {c}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-14 flex flex-wrap gap-3">
            {Object.values(ROUTE_PAGES).filter((r) => r.slug !== slug).map((r) => (
              <Link
                key={r.slug}
                to={`/rute/${r.slug}`}
                className="group inline-flex items-center gap-2 px-5 py-3 rounded-full border border-slate-200 hover:border-orange-300 hover:bg-orange-50 text-slate-700 font-semibold text-sm transition-all"
              >
                {r.from} → {r.to}
                <ArrowRight className="w-4 h-4 text-orange-500 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
      <BookingForm />
      <Footer />
      <StickyMobileCTA />
    </div>
  );
}
