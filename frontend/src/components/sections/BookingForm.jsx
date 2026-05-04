import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useLang } from "../../context/LanguageContext";
import { ALL_CITIES_GROUPED } from "../../lib/cities";
import { telHref, whatsappHref, BUSINESS_PHONE_DISPLAY } from "../../lib/contact";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
  Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue,
} from "../ui/select";
import { Phone, MessageCircle, Send, User, Loader2 } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const initialForm = {
  full_name: "",
  phone: "",
  departure: "",
  destination: "",
  transport_type: "",
  message: "",
};

export default function BookingForm() {
  const { t } = useLang();
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const buildWhatsAppMsg = (f) => {
    const typeLabel = t.booking[f.transport_type] || f.transport_type;
    const lines = [
      "Bună! Rezervare nouă BGD-Trans",
      "",
      `• Nume: ${f.full_name}`,
      `• Telefon: ${f.phone}`,
      `• Plecare: ${f.departure}`,
      `• Destinație: ${f.destination}`,
      `• Tip transport: ${typeLabel}`,
    ];
    if (f.message) lines.push(`• Detalii: ${f.message}`);
    return lines.join("\n");
  };

  const openWhatsApp = (msg) => {
    const text = encodeURIComponent(msg);
    // Detect mobile to use the whatsapp:// scheme which opens the native app directly
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    const number = "40769129126";
    if (isMobile) {
      // whatsapp:// opens the installed app instantly (no browser tab)
      window.location.href = `whatsapp://send?phone=${number}&text=${text}`;
      // Fallback to wa.me after 800ms in case the app isn't installed
      setTimeout(() => {
        window.open(`https://wa.me/${number}?text=${text}`, "_blank", "noopener,noreferrer");
      }, 800);
    } else {
      window.open(`https://wa.me/${number}?text=${text}`, "_blank", "noopener,noreferrer");
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.full_name || !form.phone || !form.departure || !form.destination || !form.transport_type) {
      toast.error(t.booking.error);
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API}/bookings`, form);
      toast.success(t.booking.success);
      // Open WhatsApp directly with all booking details to BGD-Trans business number
      openWhatsApp(buildWhatsAppMsg(form));
      setForm(initialForm);
    } catch (err) {
      console.error(err);
      toast.error(t.booking.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="rezervare" data-testid="booking-section" className="py-20 sm:py-32 bg-slate-50 relative">
      <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
        <div className="max-w-2xl mb-10">
          <div className="text-sm font-bold tracking-[0.18em] uppercase text-orange-500 mb-4">{t.booking.label}</div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {t.booking.title}
          </h2>
          <p className="mt-4 text-lg text-slate-600">{t.booking.subtitle}</p>
        </div>

        <form
          onSubmit={onSubmit}
          data-testid="booking-form"
          className="bg-white rounded-3xl shadow-[0_30px_80px_-40px_rgba(15,23,42,0.35)] border border-slate-100 p-6 sm:p-10 grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          <div className="md:col-span-2 flex items-center gap-3 pb-2 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <div className="text-sm font-bold tracking-wider uppercase text-slate-500">
              {t.booking.label}
            </div>
          </div>

          <div>
            <Label htmlFor="full_name" className="text-slate-700 font-semibold">{t.booking.fullName}*</Label>
            <Input
              id="full_name"
              data-testid="input-fullname"
              value={form.full_name}
              onChange={(e) => update("full_name", e.target.value)}
              placeholder="Ion Popescu"
              required
              className="mt-2 h-12 rounded-xl border-slate-200"
            />
          </div>
          <div>
            <Label htmlFor="phone" className="text-slate-700 font-semibold">{t.booking.phone}*</Label>
            <Input
              id="phone"
              data-testid="input-phone"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              placeholder="+40 7xx xxx xxx"
              required
              className="mt-2 h-12 rounded-xl border-slate-200"
            />
          </div>

          <div>
            <Label className="text-slate-700 font-semibold">{t.booking.departure}*</Label>
            <Select value={form.departure} onValueChange={(v) => update("departure", v)}>
              <SelectTrigger data-testid="select-departure" className="mt-2 h-12 rounded-xl border-slate-200">
                <SelectValue placeholder={t.booking.selectCity} />
              </SelectTrigger>
              <SelectContent className="max-h-72">
                {ALL_CITIES_GROUPED.map((g) => (
                  <SelectGroup key={g.country}>
                    <SelectLabel>{g.country}</SelectLabel>
                    {g.items.map((city) => (
                      <SelectItem key={`dep-${city}`} value={city}>{city}</SelectItem>
                    ))}
                  </SelectGroup>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-slate-700 font-semibold">{t.booking.destination}*</Label>
            <Select value={form.destination} onValueChange={(v) => update("destination", v)}>
              <SelectTrigger data-testid="select-destination" className="mt-2 h-12 rounded-xl border-slate-200">
                <SelectValue placeholder={t.booking.selectCity} />
              </SelectTrigger>
              <SelectContent className="max-h-72">
                {ALL_CITIES_GROUPED.map((g) => (
                  <SelectGroup key={g.country}>
                    <SelectLabel>{g.country}</SelectLabel>
                    {g.items.map((city) => (
                      <SelectItem key={`dest-${city}`} value={city}>{city}</SelectItem>
                    ))}
                  </SelectGroup>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="md:col-span-2">
            <Label className="text-slate-700 font-semibold">{t.booking.transportType}*</Label>
            <Select value={form.transport_type} onValueChange={(v) => update("transport_type", v)}>
              <SelectTrigger data-testid="select-transport-type" className="mt-2 h-12 rounded-xl border-slate-200">
                <SelectValue placeholder={t.booking.selectType} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="persoane">{t.booking.persoane}</SelectItem>
                <SelectItem value="colete">{t.booking.colete}</SelectItem>
                <SelectItem value="auto">{t.booking.auto}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="md:col-span-2">
            <Label htmlFor="message" className="text-slate-700 font-semibold">{t.booking.message}</Label>
            <Textarea
              id="message"
              data-testid="input-message"
              value={form.message}
              onChange={(e) => update("message", e.target.value)}
              rows={4}
              placeholder="..."
              className="mt-2 rounded-xl border-slate-200"
            />
          </div>

          <div className="md:col-span-2">
            <Button
              type="submit"
              disabled={loading}
              data-testid="booking-submit"
              className="w-full h-14 text-base font-bold rounded-2xl bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 transition-all"
            >
              {loading ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <Send className="w-5 h-5 mr-2" />}
              {loading ? t.booking.submitting : t.booking.submit}
            </Button>
          </div>

          <div className="md:col-span-2 pt-4 mt-2 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 text-sm text-slate-600">
            <a href={telHref} data-testid="form-call-fallback" className="inline-flex items-center gap-2 font-semibold text-slate-900 hover:text-orange-500 transition-colors">
              <Phone className="w-4 h-4 text-orange-500" /> {t.booking.fallbackCall} <span className="underline underline-offset-4">{BUSINESS_PHONE_DISPLAY}</span>
            </a>
            <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" data-testid="form-whatsapp-fallback" className="inline-flex items-center gap-2 font-semibold text-slate-900 hover:text-[#25D366] transition-colors">
              <MessageCircle className="w-4 h-4 text-[#25D366]" /> {t.booking.fallbackWhatsapp}
            </a>
          </div>
        </form>
      </div>
    </section>
  );
}
