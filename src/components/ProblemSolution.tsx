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
