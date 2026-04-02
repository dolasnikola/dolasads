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
                  <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-6 text-xs font-bold text-accent-blue">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="relative z-10 mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent-blue text-white shadow-md">
                    {STEP_ICONS[i]}
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
