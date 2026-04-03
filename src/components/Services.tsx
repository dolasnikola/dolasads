"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import FadeIn from "./FadeIn";

const SERVICE_SLUGS = [
  "google-ads",
  "izrada-sajtova",
  "seo-optimizacija",
  "optimizacija-sajta",
  "landing-stranice",
];

const SERVICE_ICONS = [
  <svg key="ads" className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" strokeWidth={1.5}/><circle cx="12" cy="12" r="6" strokeWidth={1.5}/><circle cx="12" cy="12" r="2" fill="currentColor"/></svg>,
  <svg key="web" className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>,
  <svg key="seo" className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>,
  <svg key="opt" className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>,
  <svg key="lp" className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" strokeWidth={1.5}/><path strokeWidth={1.5} d="M3 9h18M9 21V9"/></svg>,
];

export default function Services() {
  const t = useTranslations("services");
  const items = t.raw("items") as { title: string; description: string }[];

  return (
    <section className="grain-overlay relative bg-dark py-24 lg:py-32">
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <FadeIn>
          <h2 className="font-display text-center text-3xl font-bold tracking-tight text-text-on-dark sm:text-4xl lg:text-5xl">
            {t("heading")}
          </h2>
        </FadeIn>

        {/* Bento grid */}
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <FadeIn
              key={i}
              delay={i * 0.08}
              className={i === 0 ? "sm:col-span-2 lg:col-span-2" : ""}
            >
              <Link
                href={{ pathname: "/usluge/[slug]", params: { slug: SERVICE_SLUGS[i] } }}
                className="block h-full"
              >
                <div
                  className={`group relative h-full overflow-hidden rounded-2xl border border-dark-border bg-dark-elevated p-6 transition-all duration-300 hover:border-lime/30 hover:bg-dark-elevated/80 ${
                    i === 0 ? "lg:p-8" : ""
                  }`}
                >
                  {/* Hover glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-lime/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="relative z-10">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-lime/10 text-lime transition-transform duration-300 group-hover:scale-110">
                      {SERVICE_ICONS[i]}
                    </div>
                    <h3 className="mb-2 font-display text-xl font-semibold text-text-on-dark">
                      {item.title}
                    </h3>
                    <p className="text-text-muted-dark leading-relaxed">
                      {item.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-lime opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
