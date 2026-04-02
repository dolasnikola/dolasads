# dolasads.com Landing Page Design Spec

## Overview

Conversion-focused landing page for dolasads.com, a one-person digital marketing agency specializing in Google Ads. The page showcases all services (Google Ads, website creation, SEO, site optimization, landing pages) with a clear message: complete digital setup from zero to conversions.

**Two conversion points:** Contact form (sends to nikola@dolasads.com via Formspree) and WhatsApp (+381 65 392 1999).

**Bilingual:** Serbian (default) and English, switchable via toggle.

## Brand

- **Name:** dolasads
- **Domain:** dolasads.com
- **Logo file:** `logo-skracen.png` (Google-colored wordmark, rename from `logo - skracen.png`)
- **Colors:**
  - Primary/Navy: #1B2A4A (dark royal blue, main brand color)
  - Accent Blue: #4285F4 (Google blue, CTAs and highlights)
  - Accent Red: #EA4335
  - Accent Yellow: #FBBC05
  - Accent Green: #34A853
  - Accent Teal: #00ACC1 (secondary blue variant for 5th service card)
  - WhatsApp green: #25D366
- **Background:** Alternating navy/white pattern:
  - Navy (#1B2A4A): Navbar, Hero, Services, Social Proof, Footer
  - White (#FFFFFF): Problem/Solution, Process, Contact Form
- **Text:** White (#FFFFFF) on navy sections, dark gray (#1F2937) on white sections
- **Font:** Inter (clean, modern, excellent readability at all sizes)

## Copy rules

- No dash symbol in any visible text (no em dash, en dash, or hyphen as punctuation)
- Singular form throughout ("Kontaktiraj me", not "Kontaktiraj nas")
- Tone: professional but approachable, confident

## Tech stack

- **Framework:** Next.js 15 (App Router, static export via `output: 'export'`)
- **Styling:** Tailwind CSS v4 (CSS-based configuration, no tailwind.config.ts)
- **i18n:** next-intl (Serbian + English, using `generateStaticParams` for both locales since static export does not support middleware-based locale detection)
- **Form backend:** Formspree (sends to nikola@dolasads.com)
- **Animations:** Framer Motion (scroll-triggered fade-ins)
- **Hosting:** Vercel
- **Images:** Next.js Image component for optimization

## Page structure

### 1. Navbar (fixed, blur on scroll)

- Logo (left)
- Language toggle SR/EN (right)
- CTA button "Kontaktiraj me" / "Contact me" (right, stays visible outside hamburger on mobile)
- Sticky, shrinks padding on scroll
- Mobile: hamburger menu for nav links, but CTA button remains always visible

### 2. Hero section (navy background)

**Headline:**
- SR: "Od nule do prvih klijenata. Kroz Google."
- EN: "From zero to first clients. Through Google."

**Sub-headline:**
- SR: "Kompletan digitalni setup za tvoj biznis. Sajt, SEO, Google Ads. Sve na jednom mestu."
- EN: "Complete digital setup for your business. Website, SEO, Google Ads. All in one place."

**Two CTAs:**
- Primary (blue #4285F4): "Zatraži ponudu" / "Get a quote" (smooth scrolls to contact form)
- Secondary (green #25D366): "Piši mi na WhatsApp" / "Message me on WhatsApp" (opens wa.me/381653921999)

**Visual:** CSS animated gradient background using Google accent colors (subtle, slow-moving diagonal gradient). No external assets needed.

**Trust bar below hero:**
- "150+ kampanja" / "150+ campaigns"
- "Google Ads sertifikovan" / "Google Ads certified"
- "5+ godina iskustva" / "5+ years experience"
- (Placeholder numbers, user updates with real data)

### 3. Problem and Solution section (white background)

**Section heading:**
- SR: "Znaš da ti treba digitalno prisustvo. Ali ne znaš odakle da počneš."
- EN: "You know you need a digital presence. But you don't know where to start."

**Two-column layout with 3 rows:**

| Problem (SR) | Solution (SR) |
|---|---|
| Nemaš sajt i niko te ne može naći online | Pravim ti moderan sajt optimizovan za konverzije |
| Imaš sajt ali nemaš posetioce | Postavljam Google Ads kampanje koje dovode prave klijente |
| Trošiš budžet na reklame bez rezultata | Optimizujem svaki dinar da dobiješ maksimalan povraćaj |

| Problem (EN) | Solution (EN) |
|---|---|
| You don't have a website and nobody can find you online | I build you a modern site optimized for conversions |
| You have a site but no visitors | I set up Google Ads campaigns that bring real clients |
| You're spending ad budget with no results | I optimize every penny for maximum return |

Each row has an icon (red for problem, green for solution).

### 4. Services section (navy background, grid)

Five service cards, each with:
- Icon in corresponding color
- Title (SR + EN)
- 2-3 sentence description (SR + EN)
- Subtle hover effect (colored top border appears)

**Cards:**

1. **Google Ads upravljanje** / **Google Ads Management** (Blue #4285F4)
   - SR: "Postavljam i optimizujem Google Ads kampanje koje donose rezultate. Od istraživanja ključnih reči do praćenja konverzija."
   - EN: "I set up and optimize Google Ads campaigns that deliver results. From keyword research to conversion tracking."

2. **Izrada web sajtova** / **Website Development** (Red #EA4335)
   - SR: "Moderan, brz i responzivan sajt koji ostavlja jak prvi utisak i pretvara posetioce u klijente."
   - EN: "A modern, fast, responsive website that makes a strong first impression and turns visitors into clients."

3. **SEO optimizacija** / **SEO Optimization** (Green #34A853)
   - SR: "Tehničko i sadržajno SEO pozicioniranje koje povećava organsku vidljivost tvog sajta na Google-u."
   - EN: "Technical and content SEO that increases your site's organic visibility on Google."

4. **Optimizacija sajta** / **Site Optimization** (Yellow #FBBC05)
   - SR: "Ubrzanje sajta, poboljšanje korisničkog iskustva i Core Web Vitals rezultata za bolje rangiranje."
   - EN: "Speed optimization, improved user experience, and Core Web Vitals scores for better ranking."

5. **Kreiranje landing stranica** / **Landing Page Creation** (Teal #00ACC1)
   - SR: "Landing stranice dizajnirane za konverzije. Svaki element služi jednom cilju: da posetioci postanu klijenti."
   - EN: "Landing pages designed for conversions. Every element serves one goal: turning visitors into clients."

### 5. Process section (white background, "How it works")

**Section heading:**
- SR: "Kako funkcioniše?"
- EN: "How does it work?"

Four horizontal steps connected by a line. Each step: number circle, icon, title, description.

1. **Analiza** / **Analysis**
   - SR: "Analiziram tvoj biznis, ciljnu grupu i konkurenciju"
   - EN: "I analyze your business, target audience, and competition"

2. **Izrada sajta** / **Website Creation**
   - SR: "Pravim sajt prilagođen tvom biznisu i optimizovan za konverzije"
   - EN: "I build a website tailored to your business and optimized for conversions"

3. **Google Ads setup**
   - SR: "Postavljam kampanje koje ciljaju prave ljude u pravom trenutku"
   - EN: "I set up campaigns that target the right people at the right time"

4. **Konverzije dolaze** / **Conversions Arrive**
   - SR: "Tvoj telefon zvoni. Tvoj inbox se puni. Tvoj biznis raste."
   - EN: "Your phone rings. Your inbox fills up. Your business grows."

### 6. Social proof / Results (navy background)

Three stat cards with animated count-up on scroll:
- "150+" with label "Kampanja pokrenuto" / "Campaigns launched"
- "3x" with label "Prosečan rast konverzija" / "Average conversion growth"
- "98%" with label "Zadovoljnih klijenata" / "Satisfied clients"

(Placeholder values. User updates with real data.)

### 7. Contact form section (white background)

**Heading:**
- SR: "Spreman da kreneš?"
- EN: "Ready to start?"

**Sub-heading:**
- SR: "Popuni formu i javim ti se u roku od 24h."
- EN: "Fill out the form and I'll get back to you within 24h."

**Fields:**
- Ime / Name (required, text)
- Email (required, email validation)
- Telefon / Phone (required, tel input)
- Šta te interesuje? / What are you interested in? (required, dropdown):
  - Google Ads
  - Izrada sajta / Website Development
  - SEO
  - Optimizacija sajta / Site Optimization
  - Landing stranica / Landing Page
  - Kompletna usluga / Full Service
- Poruka / Message (optional, textarea)

**Submit:** "Pošalji" / "Send" (blue button)

**Alternative CTA below form:**
- SR: "Ili mi piši na WhatsApp"
- EN: "Or message me on WhatsApp"
- Green WhatsApp button

**Validation:** Required fields show error in red below input. Messages in active language.
**Backend:** Formspree (free tier, sends to nikola@dolasads.com)

### 8. Footer (navy background)

- Logo
- Email: nikola@dolasads.com
- Phone: +381 65 392 1999
- WhatsApp link
- Copyright © 2026 dolasads
- Minimal, single-row on desktop

### 9. Floating WhatsApp button

- Fixed bottom-right corner (bottom: 24px, right: 24px)
- 56px green circular button with white WhatsApp icon
- Opens wa.me/381653921999
- Subtle pulse animation on first load (2 pulses, then stops)
- Always visible on all screen sizes
- z-index above everything

## Animation details

- **Scroll fade-ins:** Elements fade in and slide up 20px when entering viewport. Duration: 600ms, ease-out. Stagger: 100ms between sibling elements.
- **Count-up:** Social proof numbers animate from 0 to target over 2 seconds when section enters viewport. Triggers once.
- **Navbar:** Transition padding and background over 200ms on scroll.
- **Hero gradient:** Slow-moving CSS gradient, 8 second cycle, infinite loop.

## Responsive breakpoints

- **Desktop:** >= 1024px (full layout as described)
- **Tablet:** 768px to 1023px (two-column grids become single column where needed, process steps stack to 2x2 grid)
- **Mobile:** < 768px (single column, hamburger nav with CTA visible, stacked CTAs, full-width form, process steps stack vertically)

## SEO considerations

- Proper meta tags and Open Graph tags in both languages
- Semantic HTML (h1, h2, sections, nav, footer)
- Alt text on all images
- Schema.org LocalBusiness structured data
- Fast loading (static export, optimized images)

## File structure

```
dolasads/
├── public/
│   ├── logo-skracen.png
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── ProblemSolution.tsx
│   │   ├── Services.tsx
│   │   ├── Process.tsx
│   │   ├── SocialProof.tsx
│   │   ├── ContactForm.tsx
│   │   ├── Footer.tsx
│   │   ├── WhatsAppButton.tsx
│   │   └── LanguageToggle.tsx
│   └── i18n/
│       ├── messages/
│       │   ├── sr.json
│       │   └── en.json
│       └── config.ts
├── app/
│   └── globals.css  (Tailwind v4 CSS-based config here)
├── next.config.ts
└── package.json
```

## Verification plan

1. `npm run dev` loads site without errors
2. All 9 sections render correctly on desktop, tablet, mobile
3. Language toggle switches all text between SR and EN
4. Contact form submits successfully via Formspree
5. WhatsApp floating button and inline buttons open correct wa.me link
6. Smooth scroll to form when hero CTA clicked
7. Scroll animations trigger correctly (fade-ins, count-up)
8. Navbar blur and shrink works on scroll
9. CTA button stays visible on mobile (outside hamburger)
10. Lighthouse score: 90+ on all categories
11. `npm run build` succeeds (static export)
12. Deploy to Vercel and verify live site
