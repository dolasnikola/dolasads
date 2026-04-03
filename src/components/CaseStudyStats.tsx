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
      <div className="mt-8 rounded-xl bg-navy p-5 sm:p-8">
        <h3 className="text-lg font-bold text-white sm:text-xl">
          {t("adsResultsHeading")}
        </h3>
        <p className="mt-2 text-sm text-white/60">
          {t("adsResultsSubheading")}
        </p>

        {/* Period — full width */}
        <div className="mt-5 sm:mt-6">
          <div className="rounded-lg bg-white/5 p-3 sm:p-4">
            <p className="text-xs text-white/60 sm:text-sm">
              {t("statLabels.period")}
            </p>
            <p className="mt-1 text-base font-bold text-white sm:text-lg">
              {t("stats.period")}
            </p>
          </div>
        </div>

        {/* Remaining metrics */}
        <div className="mt-2.5 grid grid-cols-2 gap-2.5 sm:mt-4 sm:gap-4 md:grid-cols-4">
          {STAT_KEYS.filter((key) => key !== "period").map((key) => (
            <div
              key={key}
              className={`rounded-lg p-3 sm:p-4 ${
                HIGHLIGHT_KEYS.includes(key)
                  ? "bg-accent-blue/20"
                  : "bg-white/5"
              }`}
            >
              <p className="text-xs text-white/60 sm:text-sm">
                {t(`statLabels.${key}`)}
              </p>
              <p
                className={`mt-1 text-base font-bold sm:text-lg ${
                  HIGHLIGHT_KEYS.includes(key)
                    ? "text-accent-blue"
                    : "text-white"
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
