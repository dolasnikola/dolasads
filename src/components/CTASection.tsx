"use client";

import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import FadeIn from "./FadeIn";

interface CTASectionProps {
  customCta?: string;
}

export default function CTASection({ customCta }: CTASectionProps) {
  const t = useTranslations("common");
  const tNav = useTranslations("nav");
  const locale = useLocale();

  return (
    <section className="bg-navy py-20">
      <div className="mx-auto max-w-6xl px-4 text-center">
        <FadeIn>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            {t("ctaHeading")}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/70">
            {t("ctaSubheading")}
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href={`/${locale}#contact`}
              className="rounded-lg bg-accent-blue px-8 py-3 text-lg font-semibold text-white transition hover:bg-accent-blue/90"
            >
              {customCta || tNav("cta")}
            </a>
            <a
              href="https://wa.me/381653921999"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-white/30 px-8 py-3 text-lg font-medium text-white transition hover:bg-white/10"
            >
              WhatsApp
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
