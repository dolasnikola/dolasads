"use client";

import { useTranslations } from "next-intl";

export default function Hero() {
  const t = useTranslations();

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-navy">
      {/* Animated gradient overlay */}
      <div
        className="absolute inset-0 opacity-20 animate-gradient"
        style={{
          background:
            "linear-gradient(135deg, #4285F4, #EA4335, #FBBC05, #34A853, #4285F4)",
          backgroundSize: "400% 400%",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-32 text-center">
        <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
          {t("hero.headline")}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80 sm:text-xl">
          {t("hero.subheadline")}
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <button
            onClick={scrollToContact}
            className="rounded-lg bg-accent-blue px-8 py-4 text-lg font-semibold text-white transition hover:bg-accent-blue/90 hover:shadow-lg"
          >
            {t("hero.ctaPrimary")}
          </button>
          <a
            href="https://wa.me/381653921999"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-whatsapp px-8 py-4 text-lg font-semibold text-white transition hover:bg-whatsapp/90 hover:shadow-lg"
          >
            {t("hero.ctaWhatsapp")}
          </a>
        </div>

        {/* Trust bar */}
        <div className="mt-16 flex flex-col items-center gap-6 sm:flex-row sm:justify-center sm:gap-12">
          {["campaigns", "certified", "experience"].map((key) => (
            <div
              key={key}
              className="flex items-center gap-2 text-sm text-white/70"
            >
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
              {t(`trust.${key}`)}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
