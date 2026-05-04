// SEO content for dedicated route landing pages
import { CITIES } from "./cities";

export const ROUTE_PAGES = {
  "romania-germania": {
    slug: "romania-germania",
    from: "România",
    to: "Germania",
    fromCities: CITIES.Romania,
    toCities: CITIES.Germania,
    flag: "🇷🇴 → 🇩🇪",
    seo: {
      title: "Transport România – Germania | BGD-Trans · Persoane, colete, auto",
      description: "Transport regulat România → Germania: persoane, colete, autoturisme. Plecări săptămânale din toate orașele importante. Sună +40 769 129 126.",
      h1: "Transport persoane și colete România → Germania",
      intro:
        "Curse regulate tur-retur între România și Germania. Microbuze moderne 8+1, șoferi profesioniști, livrare rapidă pentru colete, transport auto pe platformă. Plecări săptămânale din 18 orașe românești spre 16 destinații germane.",
      benefits: [
        "Plecări săptămânale din toată România",
        "Acoperire pentru toate orașele majore din Germania",
        "Tarife transparente, fără taxe ascunse",
        "Confirmare rapidă pe WhatsApp în 30 minute",
      ],
    },
  },
  "romania-austria": {
    slug: "romania-austria",
    from: "România",
    to: "Austria",
    fromCities: CITIES.Romania,
    toCities: CITIES.Austria,
    flag: "🇷🇴 → 🇦🇹",
    seo: {
      title: "Transport România – Austria | BGD-Trans · Wien, Linz, Salzburg",
      description: "Transport persoane și colete România → Austria. Curse regulate spre Wien, Linz, Salzburg, Graz, Innsbruck. Rezervări rapide la +40 769 129 126.",
      h1: "Transport persoane și colete România → Austria",
      intro:
        "Curse regulate România – Austria, oprire în Wien, Linz și principalele orașe austriece. Microbuze 8+1 confortabile, transport sigur pentru colete și autoturisme. Plecări coordonate din toate centrele importante din România.",
      benefits: [
        "Plecări tur-retur cu opriri în Wien și Linz",
        "Confort maxim pentru călătorii lungi",
        "Transport auto pe platformă disponibil",
        "Suport în limba română, germană și engleză",
      ],
    },
  },
  "romania-olanda": {
    slug: "romania-olanda",
    from: "România",
    to: "Olanda",
    fromCities: CITIES.Romania,
    toCities: CITIES.Olanda,
    flag: "🇷🇴 → 🇳🇱",
    seo: {
      title: "Transport România – Olanda | BGD-Trans · Amsterdam, Rotterdam, Eindhoven",
      description: "Transport persoane, colete și autoturisme România → Olanda. Acoperim Amsterdam, Rotterdam, Haga, Eindhoven și 30+ orașe olandeze. +40 769 129 126.",
      h1: "Transport persoane și colete România → Olanda",
      intro:
        "Cursele BGD-Trans acoperă cele mai importante orașe din Olanda: Amsterdam, Rotterdam, Haga, Utrecht, Eindhoven și multe altele. Transport persoane în condiții de maxim confort, livrare colete ușă la ușă și transport auto pe platformă pentru autoturisme.",
      benefits: [
        "30+ destinații olandeze acoperite",
        "Livrare ușă la ușă pentru colete",
        "Plecări din toată România",
        "Comunicare rapidă pe WhatsApp",
      ],
    },
  },
};

export const ROUTE_LIST = Object.values(ROUTE_PAGES);
