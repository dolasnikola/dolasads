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

      <section className="bg-white py-20">
        <div className="mx-auto max-w-5xl px-4">
          <div className="grid gap-8 md:grid-cols-2">
            {packages.map((pkg, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div
                  className={`flex h-full flex-col rounded-xl p-8 shadow-md ${
                    pkg.highlighted
                      ? "border-2 border-accent-blue bg-navy text-white"
                      : "bg-white border border-gray-100"
                  }`}
                >
                  {pkg.highlighted && (
                    <span className="mb-4 inline-block w-fit rounded-full bg-accent-blue/20 px-3 py-1 text-xs font-semibold text-accent-blue">
                      Preporučeno
                    </span>
                  )}
                  <h3
                    className={`text-xl font-bold ${
                      pkg.highlighted ? "text-white" : "text-text-dark"
                    }`}
                  >
                    {pkg.title}
                  </h3>
                  <p
                    className={`mt-2 ${
                      pkg.highlighted ? "text-white/70" : "text-text-dark/70"
                    }`}
                  >
                    {pkg.description}
                  </p>

                  <ul className="mt-6 flex-1 space-y-3">
                    {pkg.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <svg
                          className={`mt-0.5 h-5 w-5 flex-shrink-0 ${
                            pkg.highlighted
                              ? "text-accent-blue"
                              : "text-accent-green"
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
                            pkg.highlighted
                              ? "text-white/80"
                              : "text-text-dark/80"
                          }
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={`/${locale}#contact`}
                    className={`mt-8 block rounded-lg px-6 py-3 text-center font-semibold transition ${
                      pkg.highlighted
                        ? "bg-accent-blue text-white hover:bg-accent-blue/90"
                        : "bg-navy text-white hover:bg-navy/90"
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
