"use client";

import { useTranslations } from "next-intl";
import FadeIn from "./FadeIn";

export default function ProblemSolution() {
  const t = useTranslations("problemSolution");

  const problems = t.raw("problems") as string[];
  const solutions = t.raw("solutions") as string[];

  return (
    <section className="bg-cream py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn>
          <h2 className="font-display max-w-3xl text-3xl font-bold leading-tight tracking-tight text-text-on-light sm:text-4xl lg:text-5xl">
            {t("heading")}
          </h2>
        </FadeIn>

        <div className="mt-16 space-y-6">
          {problems.map((problem, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="group grid items-stretch gap-0 overflow-hidden rounded-2xl border border-cream-muted bg-white md:grid-cols-2">
                {/* Problem */}
                <div className="flex items-start gap-4 border-b border-cream-muted p-6 md:border-b-0 md:border-r md:p-8">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-50">
                    <svg className="h-4 w-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <p className="text-base text-text-muted-light leading-relaxed lg:text-lg">{problem}</p>
                </div>

                {/* Solution */}
                <div className="flex items-start gap-4 bg-dark p-6 md:p-8">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-lime/15">
                    <svg className="h-4 w-4 text-lime" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-base text-text-on-dark/80 leading-relaxed lg:text-lg">{solutions[i]}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
