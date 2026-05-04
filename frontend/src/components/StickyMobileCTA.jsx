import React from "react";
import { telHref, whatsappHref } from "../lib/contact";
import { useLang } from "../context/LanguageContext";
import { Phone, MessageCircle } from "lucide-react";

export default function StickyMobileCTA() {
  const { t } = useLang();
  return (
    <div
      data-testid="mobile-sticky-cta"
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/95 backdrop-blur border-t border-slate-200 p-3 grid grid-cols-2 gap-3 shadow-[0_-10px_30px_-10px_rgba(0,0,0,0.15)]"
    >
      <a
        href={telHref}
        data-testid="mobile-call-btn"
        className="flex items-center justify-center gap-2 py-3 rounded-xl bg-orange-500 text-white font-bold shadow-md active:scale-95 transition-transform"
      >
        <Phone className="w-5 h-5" />
        {t.sticky.call}
      </a>
      <a
        href={whatsappHref()}
        target="_blank"
        rel="noopener noreferrer"
        data-testid="mobile-whatsapp-btn"
        className="flex items-center justify-center gap-2 py-3 rounded-xl bg-[#25D366] text-white font-bold shadow-md active:scale-95 transition-transform"
      >
        <MessageCircle className="w-5 h-5" />
        {t.sticky.whatsapp}
      </a>
    </div>
  );
}
