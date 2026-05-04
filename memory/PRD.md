# BGD-Trans — PRD

## Original Problem Statement
Construire site marketing pentru "BGD-Trans" — companie de transport internațional (persoane, colete, autoturisme pe platformă) pe rutele România – Germania – Austria – Olanda. Stil modern + curat (alb / albastru închis / accente portocalii), CTA mari (Sună / WhatsApp), formular rezervare, sticky mobil, panou admin pentru rezervări.

## User Personas
- **Visitor / Lead**: vrea să rezerve o cursă rapid pe telefon sau WhatsApp; alternativ completează formularul.
- **Admin (operator)**: monitorizează rezervările, schimbă statusul (nouă → contactat → confirmat / anulat), gestionează lista.

## Core Requirements (static)
1. Landing page SEO-friendly (RO + EN + DE).
2. Hero cu Renault Master + branding BGD-Trans + CTA Sună / WhatsApp.
3. Servicii — 3 carduri (persoane / colete / auto pe platformă).
4. Rute — listă completă orașe RO, DE, AT, NL.
5. Testimoniale clienți.
6. De ce noi — 6 motive.
7. Formular rezervare → DB + redirect WhatsApp pre-completat către +40 769 129 126.
8. Footer + CTA sticky pe mobil.
9. Switch limbă RO / EN / DE.
10. Panou admin protejat (login JWT) pentru gestionarea rezervărilor.

## Architecture
- **Frontend**: React 19 + React Router 7, Tailwind 3, Shadcn UI, lucide-react, sonner. Fonts: Space Grotesk (heading) + Manrope (body).
- **Backend**: FastAPI + Motor (Mongo). Toate rutele sub `/api`. Auth: bcrypt + JWT Bearer (24h).
- **DB**: MongoDB (collections: `users`, `bookings`).
- **Imagine hero**: Generată one-shot cu Gemini Nano Banana (`/app/scripts/generate_hero_image.py` → `/app/frontend/public/hero-van.jpg`).
- **Notificare WhatsApp**: client-side — după POST /api/bookings, browser-ul deschide `wa.me/40769129126?text=...` pre-completat.

## Implemented (May 2026)
- ✅ Backend: `/api/config`, `/api/auth/login`, `/api/auth/me`, `/api/bookings` (POST), `/api/admin/bookings` (GET/PATCH/DELETE).
- ✅ Admin auto-seed la startup din `ADMIN_EMAIL`/`ADMIN_PASSWORD`.
- ✅ Frontend complet: Landing + Admin login + Admin dashboard.
- ✅ i18n RO/EN/DE pe tot site-ul (inclusiv testimoniale).
- ✅ Sticky CTA mobil (Sună / WhatsApp).
- ✅ Imagine hero AI generată (Renault Master alb cu inscripție BGD-Trans + nr. telefon).
- ✅ Testat: 100% backend (15/15 pytest), ~95% frontend smoke (Playwright).

## Test Credentials
Vezi `/app/memory/test_credentials.md`.

## Backlog (P1 / P2)
- **P1**: Notificare email la rezervare (Resend/SendGrid) pentru backup la WhatsApp.
- **P1**: Setări orar / disponibilitate plecări configurabile din admin.
- **P2**: Filtrare/căutare rezervări în panou admin.
- **P2**: Galerie foto cu mașinile flotei.
- **P2**: FAQ + politică tarifare.
- **P2**: Schema.org `LocalBusiness` + `TransportService` markup pentru SEO.
- **P2**: Mini-landing dedicat pentru fiecare rută (RO→DE etc.) pentru SEO local.
