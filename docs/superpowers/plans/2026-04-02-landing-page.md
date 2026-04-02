# dolasads.com Landing Page Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy a conversion-focused bilingual landing page for dolasads.com

**Architecture:** Next.js 15 App Router with static export, Tailwind CSS v4 for styling, next-intl for SR/EN i18n, Formspree for contact form submission, Framer Motion for scroll animations. Single-page layout with 9 sections alternating navy/white backgrounds.

**Tech Stack:** Next.js 15, Tailwind CSS v4, next-intl, Framer Motion, Formspree, Vercel

**Spec:** `docs/superpowers/specs/2026-04-02-landing-page-design.md`

**Copy rules (apply everywhere):** No dash symbols in visible text. Singular form ("me" not "us").

---

## Task 1: Install Node.js and scaffold Next.js project

Node.js is not currently installed on the system. Install it, then create the Next.js project.

**Files:**
- Create: `package.json` (via create-next-app)
- Create: `next.config.ts`
- Create: `src/app/layout.tsx`
- Create: `src/app/globals.css`

- [ ] **Step 1: Install Node.js**

Download and install Node.js LTS (v22) via winget or direct download:

```bash
winget install OpenJS.NodeJS.LTS
```

After install, close and reopen terminal, then verify:

```bash
node --version  # Expected: v22.x.x
npm --version   # Expected: 10.x.x
```

- [ ] **Step 2: Create Next.js project**

```bash
cd "C:/Users/Nikola.Dolas/OneDrive - Media House/Desktop/dolasads"
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --no-import-alias --turbopack
```

When prompted, accept defaults. This scaffolds Next.js 15 with Tailwind CSS v4 and the `src/` directory structure.

- [ ] **Step 3: Install additional dependencies**

```bash
npm install next-intl framer-motion @formspree/react
```

- [ ] **Step 4: Configure next.config.ts for static export and next-intl**

Replace `next.config.ts` with:

```typescript
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default withNextIntl(nextConfig);
```

Note: `images.unoptimized: true` is required for static export since Next.js Image optimization needs a server.

- [ ] **Step 5: Rename logo file**

```bash
cd "C:/Users/Nikola.Dolas/OneDrive - Media House/Desktop/dolasads"
mv "logo - skracen.png" "public/logo-skracen.png"
```

- [ ] **Step 6: Create favicon**

Generate a simple favicon from the logo. Use an online favicon generator (e.g., favicon.io) to create `public/favicon.ico` from the logo, or create a simple SVG favicon:

Create `src/app/favicon.ico` (Next.js App Router auto-detects this in the app directory). Alternatively, use the favicon that `create-next-app` already generated and replace it with a branded one later.

- [ ] **Step 7: Verify project runs**

```bash
npm run dev
```

Expected: Dev server starts on localhost:3000, default Next.js page loads.

- [ ] **Step 8: Commit**

```bash
git init
echo "node_modules/\n.next/\nout/\n.env*\n.superpowers/" > .gitignore
git add .
git commit -m "chore: scaffold Next.js 15 project with Tailwind, next-intl, Framer Motion"
```

---

## Task 2: Set up i18n with next-intl

Configure bilingual support (Serbian default, English). All page copy lives in translation JSON files.

**Files:**
- Create: `src/i18n/request.ts`
- Create: `src/i18n/routing.ts`
- Create: `src/i18n/messages/sr.json`
- Create: `src/i18n/messages/en.json`
- Create: `src/app/[locale]/layout.tsx`
- Create: `src/app/[locale]/page.tsx`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Create i18n routing config**

Create `src/i18n/routing.ts`:

```typescript
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["sr", "en"],
  defaultLocale: "sr",
});
```

- [ ] **Step 2: Create i18n request config**

Create `src/i18n/request.ts`:

```typescript
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !routing.locales.includes(locale as "sr" | "en")) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
```

- [ ] **Step 3: Create Serbian translations file**

Create `src/i18n/messages/sr.json`:

```json
{
  "meta": {
    "title": "dolasads | Digitalni marketing i Google Ads",
    "description": "Kompletan digitalni setup za tvoj biznis. Sajt, SEO, Google Ads. Od nule do prvih klijenata."
  },
  "nav": {
    "cta": "Kontaktiraj me"
  },
  "hero": {
    "headline": "Od nule do prvih klijenata. Kroz Google.",
    "subheadline": "Kompletan digitalni setup za tvoj biznis. Sajt, SEO, Google Ads. Sve na jednom mestu.",
    "ctaPrimary": "Zatraži ponudu",
    "ctaWhatsapp": "Piši mi na WhatsApp"
  },
  "trust": {
    "campaigns": "150+ kampanja",
    "certified": "Google Ads sertifikovan",
    "experience": "5+ godina iskustva"
  },
  "problemSolution": {
    "heading": "Znaš da ti treba digitalno prisustvo. Ali ne znaš odakle da počneš.",
    "problems": [
      "Nemaš sajt i niko te ne može naći online",
      "Imaš sajt ali nemaš posetioce",
      "Trošiš budžet na reklame bez rezultata"
    ],
    "solutions": [
      "Pravim ti moderan sajt optimizovan za konverzije",
      "Postavljam Google Ads kampanje koje dovode prave klijente",
      "Optimizujem svaki dinar da dobiješ maksimalan povraćaj"
    ]
  },
  "services": {
    "heading": "Šta sve radim za tebe",
    "items": [
      {
        "title": "Google Ads upravljanje",
        "description": "Postavljam i optimizujem Google Ads kampanje koje donose rezultate. Od istraživanja ključnih reči do praćenja konverzija."
      },
      {
        "title": "Izrada web sajtova",
        "description": "Moderan, brz i responzivan sajt koji ostavlja jak prvi utisak i pretvara posetioce u klijente."
      },
      {
        "title": "SEO optimizacija",
        "description": "Tehničko i sadržajno SEO pozicioniranje koje povećava organsku vidljivost tvog sajta na Google-u."
      },
      {
        "title": "Optimizacija sajta",
        "description": "Ubrzanje sajta, poboljšanje korisničkog iskustva i Core Web Vitals rezultata za bolje rangiranje."
      },
      {
        "title": "Kreiranje landing stranica",
        "description": "Landing stranice dizajnirane za konverzije. Svaki element služi jednom cilju: da posetioci postanu klijenti."
      }
    ]
  },
  "process": {
    "heading": "Kako funkcioniše?",
    "steps": [
      {
        "title": "Analiza",
        "description": "Analiziram tvoj biznis, ciljnu grupu i konkurenciju"
      },
      {
        "title": "Izrada sajta",
        "description": "Pravim sajt prilagođen tvom biznisu i optimizovan za konverzije"
      },
      {
        "title": "Google Ads setup",
        "description": "Postavljam kampanje koje ciljaju prave ljude u pravom trenutku"
      },
      {
        "title": "Konverzije dolaze",
        "description": "Tvoj telefon zvoni. Tvoj inbox se puni. Tvoj biznis raste."
      }
    ]
  },
  "socialProof": {
    "stats": [
      { "value": "150+", "label": "Kampanja pokrenuto" },
      { "value": "3x", "label": "Prosečan rast konverzija" },
      { "value": "98%", "label": "Zadovoljnih klijenata" }
    ]
  },
  "contact": {
    "heading": "Spreman da kreneš?",
    "subheading": "Popuni formu i javim ti se u roku od 24h.",
    "name": "Ime",
    "email": "Email",
    "phone": "Telefon",
    "interest": "Šta te interesuje?",
    "interestOptions": [
      "Google Ads",
      "Izrada sajta",
      "SEO",
      "Optimizacija sajta",
      "Landing stranica",
      "Kompletna usluga"
    ],
    "message": "Poruka",
    "submit": "Pošalji",
    "whatsappAlt": "Ili mi piši na WhatsApp",
    "required": "Ovo polje je obavezno",
    "invalidEmail": "Unesi validnu email adresu",
    "success": "Hvala! Javim ti se uskoro.",
    "error": "Došlo je do greške. Pokušaj ponovo."
  },
  "footer": {
    "copyright": "© 2026 dolasads"
  }
}
```

- [ ] **Step 4: Create English translations file**

Create `src/i18n/messages/en.json`:

```json
{
  "meta": {
    "title": "dolasads | Digital Marketing & Google Ads",
    "description": "Complete digital setup for your business. Website, SEO, Google Ads. From zero to first clients."
  },
  "nav": {
    "cta": "Contact me"
  },
  "hero": {
    "headline": "From zero to first clients. Through Google.",
    "subheadline": "Complete digital setup for your business. Website, SEO, Google Ads. All in one place.",
    "ctaPrimary": "Get a quote",
    "ctaWhatsapp": "Message me on WhatsApp"
  },
  "trust": {
    "campaigns": "150+ campaigns",
    "certified": "Google Ads certified",
    "experience": "5+ years experience"
  },
  "problemSolution": {
    "heading": "You know you need a digital presence. But you don't know where to start.",
    "problems": [
      "You don't have a website and nobody can find you online",
      "You have a site but no visitors",
      "You're spending ad budget with no results"
    ],
    "solutions": [
      "I build you a modern site optimized for conversions",
      "I set up Google Ads campaigns that bring real clients",
      "I optimize every penny for maximum return"
    ]
  },
  "services": {
    "heading": "What I do for you",
    "items": [
      {
        "title": "Google Ads Management",
        "description": "I set up and optimize Google Ads campaigns that deliver results. From keyword research to conversion tracking."
      },
      {
        "title": "Website Development",
        "description": "A modern, fast, responsive website that makes a strong first impression and turns visitors into clients."
      },
      {
        "title": "SEO Optimization",
        "description": "Technical and content SEO that increases your site's organic visibility on Google."
      },
      {
        "title": "Site Optimization",
        "description": "Speed optimization, improved user experience, and Core Web Vitals scores for better ranking."
      },
      {
        "title": "Landing Page Creation",
        "description": "Landing pages designed for conversions. Every element serves one goal: turning visitors into clients."
      }
    ]
  },
  "process": {
    "heading": "How does it work?",
    "steps": [
      {
        "title": "Analysis",
        "description": "I analyze your business, target audience, and competition"
      },
      {
        "title": "Website Creation",
        "description": "I build a website tailored to your business and optimized for conversions"
      },
      {
        "title": "Google Ads Setup",
        "description": "I set up campaigns that target the right people at the right time"
      },
      {
        "title": "Conversions Arrive",
        "description": "Your phone rings. Your inbox fills up. Your business grows."
      }
    ]
  },
  "socialProof": {
    "stats": [
      { "value": "150+", "label": "Campaigns launched" },
      { "value": "3x", "label": "Average conversion growth" },
      { "value": "98%", "label": "Satisfied clients" }
    ]
  },
  "contact": {
    "heading": "Ready to start?",
    "subheading": "Fill out the form and I'll get back to you within 24h.",
    "name": "Name",
    "email": "Email",
    "phone": "Phone",
    "interest": "What are you interested in?",
    "interestOptions": [
      "Google Ads",
      "Website Development",
      "SEO",
      "Site Optimization",
      "Landing Page",
      "Full Service"
    ],
    "message": "Message",
    "submit": "Send",
    "whatsappAlt": "Or message me on WhatsApp",
    "required": "This field is required",
    "invalidEmail": "Enter a valid email address",
    "success": "Thank you! I'll get back to you soon.",
    "error": "Something went wrong. Please try again."
  },
  "footer": {
    "copyright": "© 2026 dolasads"
  }
}
```

- [ ] **Step 5: Create the locale layout**

Create `src/app/[locale]/layout.tsx`:

```tsx
import { NextIntlClientProvider, useMessages } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin", "latin-ext"] });

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  const meta = messages.meta as { title: string; description: string };

  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: "https://dolasads.com",
      siteName: "dolasads",
      locale: locale === "sr" ? "sr_RS" : "en_US",
      type: "website",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "sr" | "en")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={inter.className}>
      <body className="antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 6: Create placeholder locale page**

Create `src/app/[locale]/page.tsx`:

```tsx
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("hero");

  return (
    <main>
      <h1>{t("headline")}</h1>
      <p>{t("subheadline")}</p>
    </main>
  );
}
```

- [ ] **Step 7: Update root layout to be minimal**

Replace `src/app/layout.tsx` with:

```tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
```

- [ ] **Step 8: Delete default page.tsx if it exists**

```bash
rm -f src/app/page.tsx
```

- [ ] **Step 9: Verify i18n works**

```bash
npm run dev
```

Visit `localhost:3000/sr` and `localhost:3000/en`. Both should show their respective headline text.

- [ ] **Step 10: Commit**

```bash
git add .
git commit -m "feat: set up next-intl with SR/EN translations and locale routing"
```

---

## Task 3: Set up Tailwind theme and global styles

Configure brand colors, fonts, and the animated hero gradient in Tailwind v4's CSS-based config.

**Files:**
- Modify: `src/app/globals.css` (Note: spec file tree shows `app/globals.css` outside `src/`, but with `--src-dir` the correct location is `src/app/globals.css`)

- [ ] **Step 1: Replace globals.css with brand theme**

Replace `src/app/globals.css` with:

```css
@import "tailwindcss";

@theme {
  --color-navy: #1B2A4A;
  --color-navy-light: #243558;
  --color-accent-blue: #4285F4;
  --color-accent-red: #EA4335;
  --color-accent-yellow: #FBBC05;
  --color-accent-green: #34A853;
  --color-accent-teal: #00ACC1;
  --color-whatsapp: #25D366;
  --color-text-dark: #1F2937;

  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
}

@keyframes gradient-shift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes pulse-ring {
  0% { transform: scale(1); opacity: 0.6; }
  100% { transform: scale(1.5); opacity: 0; }
}

@utility animate-gradient {
  animation: gradient-shift 8s ease infinite;
  background-size: 400% 400%;
}

@utility animate-pulse-ring {
  animation: pulse-ring 1.5s ease-out 2;
}
```

- [ ] **Step 2: Import globals.css in locale layout**

Add to the top of `src/app/[locale]/layout.tsx`:

```tsx
import "../globals.css";
```

- [ ] **Step 3: Verify colors work**

Update the placeholder page temporarily to test a navy background:

```tsx
<main className="bg-navy text-white min-h-screen flex items-center justify-center">
```

Run `npm run dev`, verify navy background appears.

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "feat: configure Tailwind v4 theme with brand colors and animations"
```

---

## Task 4: Build Navbar component

Fixed navbar with logo, language toggle, and CTA. Blur on scroll, hamburger on mobile with CTA always visible.

**Files:**
- Create: `src/components/Navbar.tsx`
- Create: `src/components/LanguageToggle.tsx`

- [ ] **Step 1: Create LanguageToggle component**

Create `src/components/LanguageToggle.tsx`:

```tsx
"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";

export default function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLocale = () => {
    const newLocale = locale === "sr" ? "en" : "sr";
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/"));
  };

  return (
    <button
      onClick={toggleLocale}
      className="flex items-center gap-1 rounded-full border border-white/30 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-white/10"
      aria-label="Switch language"
    >
      <span className={locale === "sr" ? "font-bold" : "opacity-60"}>SR</span>
      <span className="opacity-40">/</span>
      <span className={locale === "en" ? "font-bold" : "opacity-60"}>EN</span>
    </button>
  );
}
```

- [ ] **Step 2: Create Navbar component**

Create `src/components/Navbar.tsx`:

```tsx
"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import LanguageToggle from "./LanguageToggle";

export default function Navbar() {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? "bg-navy/95 backdrop-blur-md py-3 shadow-lg"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4">
        <Image
          src="/logo-skracen.png"
          alt="dolasads logo"
          width={140}
          height={36}
          priority
        />

        {/* Desktop nav */}
        <div className="hidden items-center gap-4 md:flex">
          <LanguageToggle />
          <button
            onClick={scrollToContact}
            className="rounded-lg bg-accent-blue px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-blue/90"
          >
            {t("cta")}
          </button>
        </div>

        {/* Mobile: CTA always visible + hamburger */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={scrollToContact}
            className="rounded-lg bg-accent-blue px-4 py-2 text-sm font-semibold text-white"
          >
            {t("cta")}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white"
            aria-label="Menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div className="border-t border-white/10 bg-navy/95 px-4 py-4 backdrop-blur-md md:hidden">
          <LanguageToggle />
        </div>
      )}
    </nav>
  );
}
```

- [ ] **Step 3: Add Navbar to the page**

Update `src/app/[locale]/page.tsx`:

```tsx
import { useTranslations } from "next-intl";
import Navbar from "@/components/Navbar";

export default function Home() {
  const t = useTranslations("hero");

  return (
    <>
      <Navbar />
      <main className="bg-navy text-white min-h-screen pt-20 flex items-center justify-center">
        <h1 className="text-4xl font-bold">{t("headline")}</h1>
      </main>
    </>
  );
}
```

- [ ] **Step 4: Verify navbar**

Run `npm run dev`. Check:
- Logo shows on the left
- Language toggle and CTA on the right (desktop)
- CTA + hamburger on mobile (resize browser)
- Scroll down: navbar gets blur background
- Language toggle switches between /sr and /en

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "feat: add Navbar with language toggle, mobile hamburger, scroll blur"
```

---

## Task 5: Build Hero section

Navy background with animated gradient, headline, sub-headline, two CTAs, and trust bar.

**Files:**
- Create: `src/components/Hero.tsx`

- [ ] **Step 1: Create Hero component**

Create `src/components/Hero.tsx`:

```tsx
"use client";

import { useTranslations } from "next-intl";

export default function Hero() {
  const t = useTranslations();

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-navy">
      {/* Animated gradient overlay */}
      <div
        className="absolute inset-0 opacity-20 animate-gradient"
        style={{
          background:
            "linear-gradient(135deg, #4285F4, #EA4335, #FBBC05, #34A853, #4285F4)",
          backgroundSize: "400% 400%",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-32 text-center">
        <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
          {t("hero.headline")}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80 sm:text-xl">
          {t("hero.subheadline")}
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <button
            onClick={scrollToContact}
            className="rounded-lg bg-accent-blue px-8 py-4 text-lg font-semibold text-white transition hover:bg-accent-blue/90 hover:shadow-lg"
          >
            {t("hero.ctaPrimary")}
          </button>
          <a
            href="https://wa.me/381653921999"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-whatsapp px-8 py-4 text-lg font-semibold text-white transition hover:bg-whatsapp/90 hover:shadow-lg"
          >
            {t("hero.ctaWhatsapp")}
          </a>
        </div>

        {/* Trust bar */}
        <div className="mt-16 flex flex-col items-center gap-6 sm:flex-row sm:justify-center sm:gap-12">
          {["campaigns", "certified", "experience"].map((key) => (
            <div
              key={key}
              className="flex items-center gap-2 text-sm text-white/70"
            >
              <svg
                className="h-5 w-5 text-accent-green"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              {t(`trust.${key}`)}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add Hero to page**

Update `src/app/[locale]/page.tsx`:

```tsx
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
    </>
  );
}
```

- [ ] **Step 3: Verify hero**

Run `npm run dev`. Check:
- Animated gradient visible behind text
- Headline and sub-headline render correctly
- Both CTAs visible, WhatsApp opens wa.me link in new tab
- "Zatraži ponudu" scrolls down (nowhere yet, will connect later)
- Trust bar shows 3 items with green checkmarks
- Toggle to EN, all text switches

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "feat: add Hero section with animated gradient, CTAs, trust bar"
```

---

## Task 6: Build scroll animation wrapper

Reusable Framer Motion component for fade-in-on-scroll.

**Files:**
- Create: `src/components/FadeIn.tsx`

- [ ] **Step 1: Create FadeIn component**

Create `src/components/FadeIn.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export default function FadeIn({ children, delay = 0, className }: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add .
git commit -m "feat: add FadeIn scroll animation wrapper component"
```

---

## Task 7: Build Problem/Solution section

White background, two-column layout with pain points and solutions.

**Files:**
- Create: `src/components/ProblemSolution.tsx`

- [ ] **Step 1: Create ProblemSolution component**

Create `src/components/ProblemSolution.tsx`:

```tsx
"use client";

import { useTranslations } from "next-intl";
import FadeIn from "./FadeIn";

export default function ProblemSolution() {
  const t = useTranslations("problemSolution");

  const problems = t.raw("problems") as string[];
  const solutions = t.raw("solutions") as string[];

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <FadeIn>
          <h2 className="mx-auto max-w-3xl text-center text-3xl font-bold text-text-dark sm:text-4xl">
            {t("heading")}
          </h2>
        </FadeIn>

        <div className="mt-16 space-y-8">
          {problems.map((problem, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="grid items-start gap-6 rounded-xl border border-gray-100 p-6 shadow-sm md:grid-cols-2 md:gap-12">
                {/* Problem */}
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-red/10">
                    <svg
                      className="h-5 w-5 text-accent-red"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                  <p className="text-lg text-text-dark">{problem}</p>
                </div>

                {/* Solution */}
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-green/10">
                    <svg
                      className="h-5 w-5 text-accent-green"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <p className="text-lg text-text-dark">{solutions[i]}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add to page**

Add `import ProblemSolution from "@/components/ProblemSolution";` and `<ProblemSolution />` after `<Hero />` in `src/app/[locale]/page.tsx`.

- [ ] **Step 3: Verify and commit**

```bash
git add .
git commit -m "feat: add Problem/Solution section with fade-in animations"
```

---

## Task 8: Build Services section

Navy background, 5 service cards in a grid with colored top borders on hover.

**Files:**
- Create: `src/components/Services.tsx`

- [ ] **Step 1: Create Services component**

Create `src/components/Services.tsx`:

```tsx
"use client";

import { useTranslations } from "next-intl";
import FadeIn from "./FadeIn";

const SERVICE_COLORS = [
  { hover: "hover:border-t-accent-blue", icon: "text-accent-blue", bg: "bg-accent-blue/10" },
  { hover: "hover:border-t-accent-red", icon: "text-accent-red", bg: "bg-accent-red/10" },
  { hover: "hover:border-t-accent-green", icon: "text-accent-green", bg: "bg-accent-green/10" },
  { hover: "hover:border-t-accent-yellow", icon: "text-accent-yellow", bg: "bg-accent-yellow/10" },
  { hover: "hover:border-t-accent-teal", icon: "text-accent-teal", bg: "bg-accent-teal/10" },
];

const SERVICE_ICONS = [
  // Google Ads: target/crosshair
  <svg key="ads" className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" strokeWidth={2}/><circle cx="12" cy="12" r="6" strokeWidth={2}/><circle cx="12" cy="12" r="2" fill="currentColor"/></svg>,
  // Web dev: code brackets
  <svg key="web" className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>,
  // SEO: search
  <svg key="seo" className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>,
  // Optimization: lightning bolt
  <svg key="opt" className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>,
  // Landing pages: layout
  <svg key="lp" className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" strokeWidth={2}/><path strokeWidth={2} d="M3 9h18M9 21V9"/></svg>,
];

export default function Services() {
  const t = useTranslations("services");
  const items = t.raw("items") as { title: string; description: string }[];

  return (
    <section className="bg-navy py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <FadeIn>
          <h2 className="text-center text-3xl font-bold text-white sm:text-4xl">
            {t("heading")}
          </h2>
        </FadeIn>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div
                className={`group rounded-xl border-t-4 border-t-transparent bg-white p-6 shadow-md transition hover:shadow-xl ${SERVICE_COLORS[i].hover}`}
              >
                <div
                  className={`mb-4 flex h-12 w-12 items-center justify-center rounded-lg ${SERVICE_COLORS[i].bg} ${SERVICE_COLORS[i].icon}`}
                >
                  {SERVICE_ICONS[i]}
                </div>
                <h3 className="mb-2 text-xl font-semibold text-text-dark">
                  {item.title}
                </h3>
                <p className="text-text-dark/70">{item.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add to page**

Add `import Services from "@/components/Services";` and `<Services />` after `<ProblemSolution />`.

- [ ] **Step 3: Verify and commit**

```bash
git add .
git commit -m "feat: add Services section with 5 colored cards and icons"
```

---

## Task 9: Build Process section

White background, 4 horizontal steps connected by a line.

**Files:**
- Create: `src/components/Process.tsx`

- [ ] **Step 1: Create Process component**

Create `src/components/Process.tsx`:

```tsx
"use client";

import { useTranslations } from "next-intl";
import FadeIn from "./FadeIn";

const STEP_ICONS = [
  // Analysis: chart
  <svg key="1" className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>,
  // Website: monitor
  <svg key="2" className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2" strokeWidth={2}/><path strokeWidth={2} d="M8 21h8M12 17v4"/></svg>,
  // Google Ads: rocket
  <svg key="3" className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.63 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.58-5.84a14.927 14.927 0 00-2.58 5.84"/></svg>,
  // Conversions: trending up
  <svg key="4" className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>,
];

export default function Process() {
  const t = useTranslations("process");
  const steps = t.raw("steps") as { title: string; description: string }[];

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <FadeIn>
          <h2 className="text-center text-3xl font-bold text-text-dark sm:text-4xl">
            {t("heading")}
          </h2>
        </FadeIn>

        <div className="relative mt-16">
          {/* Connecting line (desktop only) */}
          <div className="absolute left-0 right-0 top-8 hidden h-0.5 bg-gray-200 lg:block" />

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="relative text-center">
                  <div className="relative z-10 mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent-blue text-white shadow-md">
                    {STEP_ICONS[i]}
                  </div>
                  <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-6 text-xs font-bold text-accent-blue">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-text-dark">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-text-dark/70">{step.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add to page and commit**

```bash
git add .
git commit -m "feat: add Process section with 4 connected steps"
```

---

## Task 10: Build Social Proof section

Navy background, 3 stat cards with animated count-up.

**Files:**
- Create: `src/components/SocialProof.tsx`

- [ ] **Step 1: Create SocialProof component**

Create `src/components/SocialProof.tsx`:

```tsx
"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import FadeIn from "./FadeIn";

function useCountUp(target: string, inView: boolean) {
  const [display, setDisplay] = useState("0");
  const hasRun = useRef(false);

  useEffect(() => {
    if (!inView || hasRun.current) return;
    hasRun.current = true;

    const numericMatch = target.match(/(\d+)/);
    if (!numericMatch) {
      setDisplay(target);
      return;
    }

    const end = parseInt(numericMatch[1]);
    const suffix = target.replace(/\d+/, "");
    const duration = 2000;
    const steps = 60;
    const increment = end / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(Math.round(increment * step), end);
      setDisplay(`${current}${suffix}`);
      if (step >= steps) clearInterval(timer);
    }, duration / steps);

    return () => clearInterval(timer);
  }, [inView, target]);

  return display;
}

function StatCard({
  value,
  label,
  inView,
}: {
  value: string;
  label: string;
  inView: boolean;
}) {
  const display = useCountUp(value, inView);

  return (
    <div className="text-center">
      <div className="text-5xl font-bold text-white sm:text-6xl">{display}</div>
      <div className="mt-2 text-white/70">{label}</div>
    </div>
  );
}

export default function SocialProof() {
  const t = useTranslations("socialProof");
  const stats = t.raw("stats") as { value: string; label: string }[];
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="bg-navy py-20 lg:py-28">
      <div className="mx-auto max-w-4xl px-4">
        <div className="grid gap-12 sm:grid-cols-3">
          {stats.map((stat, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <StatCard value={stat.value} label={stat.label} inView={inView} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add to page and commit**

```bash
git add .
git commit -m "feat: add Social Proof section with animated count-up stats"
```

---

## Task 11: Build Contact Form section

White background, form with Formspree integration, validation, WhatsApp alternative.

**Files:**
- Create: `src/components/ContactForm.tsx`

- [ ] **Step 1: Create ContactForm component**

Create `src/components/ContactForm.tsx`:

```tsx
"use client";

import { useTranslations } from "next-intl";
import { useForm, ValidationError } from "@formspree/react";
import { useState } from "react";
import FadeIn from "./FadeIn";

export default function ContactForm() {
  const t = useTranslations("contact");
  const [state, handleSubmit] = useForm("YOUR_FORMSPREE_ID");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const options = t.raw("interestOptions") as string[];

  const validate = (form: FormData): boolean => {
    const newErrors: Record<string, string> = {};
    if (!form.get("name")) newErrors.name = t("required");
    if (!form.get("email")) newErrors.email = t("required");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.get("email") as string))
      newErrors.email = t("invalidEmail");
    if (!form.get("phone")) newErrors.phone = t("required");
    if (!form.get("interest")) newErrors.interest = t("required");
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    if (validate(form)) {
      handleSubmit(form);
    }
  };

  if (state.succeeded) {
    return (
      <section id="contact" className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-xl px-4 text-center">
          <div className="rounded-xl bg-accent-green/10 p-8">
            <svg
              className="mx-auto h-16 w-16 text-accent-green"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="mt-4 text-xl font-semibold text-text-dark">
              {t("success")}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-xl px-4">
        <FadeIn>
          <h2 className="text-center text-3xl font-bold text-text-dark sm:text-4xl">
            {t("heading")}
          </h2>
          <p className="mt-4 text-center text-lg text-text-dark/70">
            {t("subheading")}
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <form onSubmit={onSubmit} className="mt-10 space-y-5">
            {/* Name */}
            <div>
              <label className="mb-1 block text-sm font-medium text-text-dark">
                {t("name")} *
              </label>
              <input
                type="text"
                name="name"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-text-dark focus:border-accent-blue focus:outline-none focus:ring-2 focus:ring-accent-blue/20"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-accent-red">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="mb-1 block text-sm font-medium text-text-dark">
                {t("email")} *
              </label>
              <input
                type="email"
                name="email"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-text-dark focus:border-accent-blue focus:outline-none focus:ring-2 focus:ring-accent-blue/20"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-accent-red">{errors.email}</p>
              )}
              <ValidationError prefix="Email" field="email" errors={state.errors} />
            </div>

            {/* Phone */}
            <div>
              <label className="mb-1 block text-sm font-medium text-text-dark">
                {t("phone")} *
              </label>
              <input
                type="tel"
                name="phone"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-text-dark focus:border-accent-blue focus:outline-none focus:ring-2 focus:ring-accent-blue/20"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-accent-red">{errors.phone}</p>
              )}
            </div>

            {/* Interest dropdown */}
            <div>
              <label className="mb-1 block text-sm font-medium text-text-dark">
                {t("interest")} *
              </label>
              <select
                name="interest"
                defaultValue=""
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-text-dark focus:border-accent-blue focus:outline-none focus:ring-2 focus:ring-accent-blue/20"
              >
                <option value="" disabled />
                {options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              {errors.interest && (
                <p className="mt-1 text-sm text-accent-red">{errors.interest}</p>
              )}
            </div>

            {/* Message */}
            <div>
              <label className="mb-1 block text-sm font-medium text-text-dark">
                {t("message")}
              </label>
              <textarea
                name="message"
                rows={4}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-text-dark focus:border-accent-blue focus:outline-none focus:ring-2 focus:ring-accent-blue/20"
              />
            </div>

            <button
              type="submit"
              disabled={state.submitting}
              className="w-full rounded-lg bg-accent-blue px-8 py-4 text-lg font-semibold text-white transition hover:bg-accent-blue/90 disabled:opacity-50"
            >
              {state.submitting ? "..." : t("submit")}
            </button>

            {state.errors && state.errors.getFormErrors().length > 0 && (
              <p className="text-center text-sm text-accent-red">{t("error")}</p>
            )}
          </form>
        </FadeIn>

        {/* WhatsApp alternative */}
        <FadeIn delay={0.3}>
          <div className="mt-8 text-center">
            <p className="mb-3 text-text-dark/60">{t("whatsappAlt")}</p>
            <a
              href="https://wa.me/381653921999"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-whatsapp px-6 py-3 font-semibold text-white transition hover:bg-whatsapp/90"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
```

**Important:** Replace `YOUR_FORMSPREE_ID` with the actual Formspree form ID. The user needs to create a form at formspree.io and get the ID (looks like `xyzabcde`).

- [ ] **Step 2: Add to page and commit**

```bash
git add .
git commit -m "feat: add Contact Form section with Formspree, validation, WhatsApp alt"
```

---

## Task 12: Build Footer and floating WhatsApp button

**Files:**
- Create: `src/components/Footer.tsx`
- Create: `src/components/WhatsAppButton.tsx`

- [ ] **Step 1: Create Footer component**

Create `src/components/Footer.tsx`:

```tsx
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="bg-navy py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 sm:flex-row sm:justify-between">
        <Image
          src="/logo-skracen.png"
          alt="dolasads logo"
          width={100}
          height={26}
        />

        <div className="flex flex-wrap items-center gap-4 text-sm text-white/60">
          <a href="mailto:nikola@dolasads.com" className="hover:text-white transition">
            nikola@dolasads.com
          </a>
          <a href="tel:+381653921999" className="hover:text-white transition">
            +381 65 392 1999
          </a>
          <a
            href="https://wa.me/381653921999"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-whatsapp transition"
          >
            WhatsApp
          </a>
        </div>

        <p className="text-sm text-white/40">{t("copyright")}</p>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Create WhatsAppButton (floating)**

Create `src/components/WhatsAppButton.tsx`:

```tsx
"use client";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/381653921999"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp shadow-lg transition hover:scale-110 hover:shadow-xl"
      aria-label="WhatsApp"
    >
      {/* Pulse ring */}
      <span className="absolute inset-0 rounded-full bg-whatsapp animate-pulse-ring" />

      <svg
        className="relative h-7 w-7 text-white"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </a>
  );
}
```

- [ ] **Step 3: Add both to page and commit**

```bash
git add .
git commit -m "feat: add Footer and floating WhatsApp button with pulse animation"
```

---

## Task 13: Assemble full page

Wire all components together in the page file.

**Files:**
- Modify: `src/app/[locale]/page.tsx`

- [ ] **Step 1: Assemble all sections**

Replace `src/app/[locale]/page.tsx` with:

```tsx
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProblemSolution from "@/components/ProblemSolution";
import Services from "@/components/Services";
import Process from "@/components/Process";
import SocialProof from "@/components/SocialProof";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <ProblemSolution />
      <Services />
      <Process />
      <SocialProof />
      <ContactForm />
      <Footer />
      <WhatsAppButton />
    </>
  );
}
```

- [ ] **Step 2: Add Schema.org structured data to locale layout**

In `src/app/[locale]/layout.tsx`, add inside `<body>` before `{children}`:

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "dolasads",
      url: "https://dolasads.com",
      email: "nikola@dolasads.com",
      telephone: "+381653921999",
      description:
        "Digital marketing agency specializing in Google Ads, website creation, SEO, and landing pages.",
      areaServed: "RS",
    }),
  }}
/>
```

- [ ] **Step 3: Verify full page**

Run `npm run dev`. Walk through all sections:
- Navbar scrolls and blurs
- Hero gradient animates
- Problem/Solution fade in
- Service cards hover effect
- Process steps connected
- Social proof numbers count up
- Form validates and shows errors
- WhatsApp buttons all work
- Footer links work
- Language toggle switches everything
- Mobile responsive (resize browser to narrow width)

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "feat: assemble full landing page with all 9 sections"
```

---

## Task 14: Set up Formspree and final polish

**Files:**
- Modify: `src/components/ContactForm.tsx` (replace placeholder ID)

- [ ] **Step 1: Create Formspree form**

Go to https://formspree.io, create a free account, create a new form, and copy the form ID. It will look like `xyzabcde`.

- [ ] **Step 2: Replace placeholder in ContactForm**

In `src/components/ContactForm.tsx`, replace `YOUR_FORMSPREE_ID` with the actual form ID.

- [ ] **Step 3: Test form submission**

Submit a test form on localhost. Check that the email arrives at nikola@dolasads.com.

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "feat: connect Formspree form backend"
```

---

## Task 15: Build verification and deploy

**Files:** None new.

- [ ] **Step 1: Run production build**

```bash
npm run build
```

Expected: Build succeeds, `out/` directory created with static HTML for both /sr and /en.

- [ ] **Step 2: Test production build locally**

```bash
npx serve out
```

Open the served URL, verify all sections work.

- [ ] **Step 3: Run Lighthouse audit**

Open Chrome DevTools > Lighthouse, run audit on the production build. Target: 90+ on all 4 categories (Performance, Accessibility, Best Practices, SEO).

Fix any issues that come up (typically: add aria labels, ensure contrast ratios, optimize images).

- [ ] **Step 4: Deploy to Vercel**

```bash
npx vercel --prod
```

Or connect the project via Vercel dashboard. Follow prompts to link to dolasads.com domain.

- [ ] **Step 5: Verify live site**

Visit dolasads.com. Check:
- All sections render
- Language toggle works
- Form submits
- WhatsApp links open correctly
- Mobile responsive
- SSL certificate active

- [ ] **Step 6: Final commit**

```bash
git add .
git commit -m "chore: production build and deploy configuration"
```
