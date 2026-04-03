import { setRequestLocale, getTranslations } from "next-intl/server";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import FadeIn from "@/components/FadeIn";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "pricingPage.meta",
  });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "pricingPage" });

  const packages = t.raw("packages") as {
    title: string;
    description: string;
    features: string[];
    highlighted?: boolean;
  }[];

  return (
    <>
      <Navbar />
      <PageHero title={t("heading")} subtitle={t("subheading")} />

      <section className="bg-cream py-20 lg:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid gap-6 md:grid-cols-2">
            {packages.map((pkg, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div
                  className={`flex h-full flex-col rounded-2xl p-7 sm:p-8 transition-all duration-300 ${
                    pkg.highlighted
                      ? "border-2 border-lime bg-dark text-text-on-dark shadow-xl shadow-lime/5"
                      : "border border-cream-muted bg-white hover:border-dark/20 hover:shadow-lg"
                  }`}
                >
                  {pkg.highlighted && (
                    <span className="mb-4 inline-block w-fit rounded-full bg-lime/15 px-3 py-1 text-xs font-semibold text-lime">
                      Preporučeno
                    </span>
                  )}
                  <h3
                    className={`font-display text-xl font-bold ${
                      pkg.highlighted ? "text-text-on-dark" : "text-text-on-light"
                    }`}
                  >
                    {pkg.title}
                  </h3>
                  <p
                    className={`mt-2 leading-relaxed ${
                      pkg.highlighted ? "text-text-muted-dark" : "text-text-muted-light"
                    }`}
                  >
                    {pkg.description}
                  </p>

                  <ul className="mt-6 flex-1 space-y-3">
                    {pkg.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <svg
                          className={`mt-0.5 h-5 w-5 flex-shrink-0 ${
                            pkg.highlighted ? "text-lime" : "text-lime-dim"
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span
                          className={
                            pkg.highlighted ? "text-text-on-dark/80" : "text-text-muted-light"
                          }
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={`/${locale}#contact`}
                    className={`magnetic-btn mt-8 block rounded-full px-6 py-3.5 text-center font-semibold transition ${
                      pkg.highlighted
                        ? "bg-lime text-dark"
                        : "bg-dark text-lime"
                    }`}
                  >
                    {t("contactCta")}
                  </a>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
      <WhatsAppButton />
    </>
  );
}
