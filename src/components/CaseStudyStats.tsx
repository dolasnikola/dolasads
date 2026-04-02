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
      <div className="mt-8 rounded-xl bg-navy p-8">
        <h3 className="text-xl font-bold text-white">
          {t("adsResultsHeading")}
        </h3>
        <p className="mt-2 text-sm text-white/60">
          {t("adsResultsSubheading")}
        </p>

        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {STAT_KEYS.map((key) => (
            <div
              key={key}
              className={`rounded-lg p-4 ${
                HIGHLIGHT_KEYS.includes(key)
                  ? "bg-accent-blue/20"
                  : "bg-white/5"
              }`}
            >
              <p className="text-sm text-white/60">
                {t(`statLabels.${key}`)}
              </p>
              <p
                className={`mt-1 text-lg font-bold ${
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
