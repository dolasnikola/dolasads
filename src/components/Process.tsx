"use client";

import { useTranslations } from "next-intl";
import FadeIn from "./FadeIn";

export default function Process() {
  const t = useTranslations("process");
  const steps = t.raw("steps") as { title: string; description: string }[];

  return (
    <section className="bg-cream py-24 lg:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn>
          <h2 className="font-display text-center text-3xl font-bold tracking-tight text-text-on-light sm:text-4xl lg:text-5xl">
            {t("heading")}
          </h2>
        </FadeIn>

        <div className="relative mt-20">
          {/* Connecting line */}
          <div className="absolute left-8 top-0 bottom-0 hidden w-px bg-cream-muted lg:left-1/2 lg:block" />

          <div className="grid gap-12 lg:gap-16">
            {steps.map((step, i) => (
              <FadeIn key={i} delay={i * 0.12}>
                <div
                  className={`relative grid items-center gap-8 lg:grid-cols-2 ${
                    i % 2 === 1 ? "lg:direction-rtl" : ""
                  }`}
                >
                  {/* Number + content */}
                  <div className={`${i % 2 === 1 ? "lg:col-start-2 lg:text-left" : ""}`}>
                    <div className="flex items-start gap-6">
                      {/* Step number */}
                      <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-dark font-display text-2xl font-bold text-lime">
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <div>
                        <h3 className="font-display text-xl font-semibold text-text-on-light lg:text-2xl">
                          {step.title}
                        </h3>
                        <p className="mt-2 text-text-muted-light leading-relaxed lg:text-lg">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className={`hidden lg:block ${i % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}`} />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
