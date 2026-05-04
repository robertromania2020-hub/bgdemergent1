import React from "react";
import { useLang } from "../../context/LanguageContext";
import { telHref, whatsappHref, BUSINESS_PHONE_DISPLAY } from "../../lib/contact";
import { Phone, MessageCircle, Truck, MapPin } from "lucide-react";

export default function Footer() {
  const { t } = useLang();
  return (
    <footer data-testid="site-footer" className="bg-slate-950 text-slate-300">
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-2 font-bold text-xl text-white">
              <span className="w-10 h-10 rounded-xl bg-white flex items-center justify-center">
                <Truck className="w-5 h-5 text-orange-500" />
              </span>
              BGD<span className="text-orange-400">-</span>Trans
            </div>
            <p className="mt-4 text-slate-400 leading-relaxed text-sm">{t.footer.tagline}</p>
            <div className="mt-6 flex items-center gap-2 text-xs text-slate-500">
              <MapPin className="w-4 h-4" />
              România → Germania → Austria → Olanda
            </div>
          </div>

          <div>
            <div className="text-xs font-bold tracking-[0.18em] uppercase text-slate-500 mb-4">Contact</div>
            <a href={telHref} data-testid="footer-call" className="flex items-center gap-3 text-white font-bold text-lg hover:text-orange-400 transition-colors">
              <Phone className="w-5 h-5 text-orange-400" /> {BUSINESS_PHONE_DISPLAY}
            </a>
            <a
              href={whatsappHref()}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="footer-whatsapp"
              className="mt-3 inline-flex items-center gap-2 text-[#25D366] font-semibold hover:underline"
            >
              <MessageCircle className="w-4 h-4" /> {t.footer.whatsappHint}
            </a>
          </div>

          <div>
            <div className="text-xs font-bold tracking-[0.18em] uppercase text-slate-500 mb-4">Meniu</div>
            <ul className="space-y-2 text-sm">
              <li><a className="hover:text-orange-400 transition-colors" href="#servicii">{t.nav.services}</a></li>
              <li><a className="hover:text-orange-400 transition-colors" href="#rute">{t.nav.routes}</a></li>
              <li><a className="hover:text-orange-400 transition-colors" href="#rezervare">{t.nav.booking}</a></li>
              <li><a className="hover:text-orange-400 transition-colors" href="#de-ce-noi">{t.nav.whyUs}</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-500">
          <div>© {new Date().getFullYear()} BGD-Trans – {t.footer.rights}</div>
          <div className="flex items-center gap-4">
            <span>Romania • Germany • Austria • Netherlands</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
