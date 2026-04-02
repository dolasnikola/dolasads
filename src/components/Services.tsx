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
