import { setRequestLocale, getTranslations } from "next-intl/server";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import FadeIn from "@/components/FadeIn";
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
    namespace: "healthcarePage.meta",
  });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function HealthcarePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "healthcarePage" });

  const problems = t.raw("problems") as string[];
  const solutions = t.raw("solutions") as string[];
  const services = t.raw("services") as string[];

  return (
    <>
      <Navbar />
      <PageHero title={t("heading")} subtitle={t("subheading")} />

      {/* Problems */}
      <section className="bg-cream py-20 lg:py-28">
        <div className="mx-auto max-w-4xl px-6">
          <FadeIn>
            <h2 className="font-display text-2xl font-bold text-text-on-light sm:text-3xl">
              {t("problemHeading")}
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {problems.map((problem, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-xl border border-cream-muted bg-white p-5"
                >
                  <svg
                    className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span className="text-text-muted-light">{problem}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Solutions */}
      <section className="bg-dark py-20 lg:py-28">
        <div className="mx-auto max-w-4xl px-6">
          <FadeIn>
            <h2 className="font-display text-2xl font-bold text-text-on-dark sm:text-3xl">
              {t("solutionHeading")}
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {solutions.map((solution, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-xl border border-dark-border bg-dark-elevated p-5"
                >
                  <svg
                    className="mt-0.5 h-5 w-5 flex-shrink-0 text-lime"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-text-on-dark/80">{solution}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Services included */}
      <section className="bg-cream py-20 lg:py-28">
        <div className="mx-auto max-w-4xl px-6">
          <FadeIn>
            <h2 className="font-display text-2xl font-bold text-text-on-light sm:text-3xl">
              {t("servicesHeading")}
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {services.map((service, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-xl border border-cream-muted bg-white p-5"
                >
                  <svg
                    className="mt-0.5 h-5 w-5 flex-shrink-0 text-lime-dim"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-text-muted-light">{service}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Healthcare CTA */}
      <section className="grain-overlay relative bg-dark py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-lime/3 to-transparent pointer-events-none" />
        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <FadeIn>
            <h2 className="font-display text-2xl font-bold text-text-on-dark sm:text-3xl">
              {t("ctaHeading")}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-text-muted-dark">
              {t("ctaText")}
            </p>
            <a
              href={`/${locale}#contact`}
              className="magnetic-btn mt-8 inline-block rounded-full bg-lime px-8 py-3.5 text-base font-semibold text-dark transition"
            >
              {t("ctaHeading")}
            </a>
          </FadeIn>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
