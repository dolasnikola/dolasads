@AGENTS.md

# dolasads.com Landing Page

## Project Overview
Modern, conversion-focused landing page for Nikola's digital marketing agency (dolasads.com).
Services: Google Ads management, website creation, SEO, site optimization, landing pages.
Single-person business ("kontaktiraj me", not "nas").

## Tech Stack
- **Next.js 16.2.2** (App Router) + **Tailwind CSS v4** + **next-intl** (SR/EN)
- **Framer Motion** for scroll animations
- **Formspree** (ID: `xaqdaqnp`) for contact form → nikola@dolasads.com
- **GTM** container: `GTM-WG4KX525` with `form_submit` dataLayer event on contact form
- Portable Node.js at `C:\Users\Nikola.Dolas\nodejs-portable\node-v22.16.0-win-x64\`

## Deployment
- **Vercel** via GitHub integration (repo: `dolasnikola/dolasads`, branch: `main`)
- Vercel project is on Nikola's personal account (NOT the "Media House" team)
- Framework Preset must be set to **Next.js** in Vercel settings
- Domain: **www.dolasads.com**

## Architecture
- `src/app/layout.tsx` — Root layout with html/body, Inter font, GTM script
- `src/app/page.tsx` — Root redirect to /sr
- `src/app/[locale]/layout.tsx` — Locale wrapper (NextIntlClientProvider, Schema.org JSON-LD), NO html/body tags
- `src/app/[locale]/page.tsx` — Homepage with all 9 section components
- `src/app/[locale]/usluge/page.tsx` — Services overview page (SR: /usluge, EN: /services)
- `src/app/[locale]/usluge/[slug]/page.tsx` — Individual service pages (5 slugs)
- `src/app/[locale]/portfolio/page.tsx` — Portfolio with case studies
- `src/proxy.ts` — next-intl proxy for localized pathname rewriting (Next.js 16 uses proxy.ts, not middleware.ts)
- `src/i18n/routing.ts` — Locale config with `pathnames` for SR/EN route mapping
- `src/i18n/navigation.ts` — `createNavigation(routing)` for locale-aware Link/router
- `src/components/` — Navbar, Hero, FadeIn, ProblemSolution, Services, Process, SocialProof, ContactForm, Footer, WhatsAppButton, LanguageToggle, PageHero, ServiceCard, CTASection, PortfolioCard, CaseStudyStats
- `src/i18n/messages/sr.json` + `en.json` — All copy in both languages

## Design Rules
- No dash symbol (-) in visible website text
- Singular form ("me/I" not "us/we") in all copy
- Navy (#1B2A4A) primary, Google accent colors (blue #4285F4, red #EA4335, yellow #FBBC05, green #34A853)
- Navy and white alternating sections

## Conversion Points
1. Contact form (Formspree) with GTM `form_submit` event
2. WhatsApp button (+381653921999) — opens new tab

## Key Fixes Applied
- Removed `output: "export"` from next.config.ts (breaks Vercel native Next.js support)
- Root layout owns html/body tags; locale layout is fragment wrapper only (prevents hydration errors from nested html/body)
