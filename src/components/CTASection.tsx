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
    <section className="grain-overlay relative bg-dark py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-lime/3 to-transparent pointer-events-none" />
      <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
        <FadeIn>
          <h2 className="font-display text-3xl font-bold tracking-tight text-text-on-dark sm:text-4xl lg:text-5xl">
            {t("ctaHeading")}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-text-muted-dark">
            {t("ctaSubheading")}
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href={`/${locale}#contact`}
              className="magnetic-btn rounded-full bg-lime px-8 py-3.5 text-base font-semibold text-dark transition"
            >
              {customCta || tNav("cta")}
            </a>
            <a
              href="https://wa.me/381653921999"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-dark-border px-8 py-3.5 text-base font-medium text-text-on-dark transition hover:border-whatsapp hover:text-whatsapp"
            >
              WhatsApp
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
