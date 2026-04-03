"use client";

import { useTranslations } from "next-intl";
import FadeIn from "./FadeIn";

const STAT_KEYS = [
  "period",
  "impressions",
  "ctr",
  "clicks",
  "spend",
  "cpc",
  "conversions",
  "costPerConversion",
  "conversionRate",
] as const;

const HIGHLIGHT_KEYS = ["conversions", "costPerConversion", "conversionRate", "ctr"];

export default function CaseStudyStats() {
  const t = useTranslations("portfolioPage");

  return (
    <FadeIn>
      <div className="mt-8 rounded-2xl bg-dark p-5 sm:p-8">
        <h3 className="font-display text-lg font-bold text-text-on-dark sm:text-xl">
          {t("adsResultsHeading")}
        </h3>
        <p className="mt-2 text-sm text-text-muted-dark">
          {t("adsResultsSubheading")}
        </p>

        {/* Period */}
        <div className="mt-5 sm:mt-6">
          <div className="rounded-xl border border-dark-border bg-dark-elevated p-3 sm:p-4">
            <p className="text-xs text-text-muted-dark sm:text-sm">
              {t("statLabels.period")}
            </p>
            <p className="mt-1 text-base font-bold text-text-on-dark sm:text-lg">
              {t("stats.period")}
            </p>
          </div>
        </div>

        {/* Metrics */}
        <div className="mt-2.5 grid grid-cols-2 gap-2.5 sm:mt-4 sm:gap-3 md:grid-cols-4">
          {STAT_KEYS.filter((key) => key !== "period").map((key) => (
            <div
              key={key}
              className={`rounded-xl p-3 sm:p-4 ${
                HIGHLIGHT_KEYS.includes(key)
                  ? "border border-lime/20 bg-lime/5"
                  : "border border-dark-border bg-dark-elevated"
              }`}
            >
              <p className="text-xs text-text-muted-dark sm:text-sm">
                {t(`statLabels.${key}`)}
              </p>
              <p
                className={`mt-1 text-base font-bold sm:text-lg ${
                  HIGHLIGHT_KEYS.includes(key) ? "text-lime" : "text-text-on-dark"
                }`}
              >
                {t(`stats.${key}`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </FadeIn>
  );
}
