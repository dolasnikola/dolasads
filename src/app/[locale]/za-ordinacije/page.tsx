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
      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-4">
          <FadeIn>
            <h2 className="text-2xl font-bold text-text-dark sm:text-3xl">
              {t("problemHeading")}
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {problems.map((problem, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-lg bg-red-50 p-4"
                >
                  <svg
                    className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent-red"
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
                  <span className="text-text-dark/80">{problem}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Solutions */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-4xl px-4">
          <FadeIn>
            <h2 className="text-2xl font-bold text-text-dark sm:text-3xl">
              {t("solutionHeading")}
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {solutions.map((solution, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-lg bg-white p-4 shadow-sm"
                >
                  <svg
                    className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent-green"
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
                  <span className="text-text-dark/80">{solution}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Services included */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-4">
          <FadeIn>
            <h2 className="text-2xl font-bold text-text-dark sm:text-3xl">
              {t("servicesHeading")}
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {services.map((service, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-lg bg-navy/5 p-4"
                >
                  <svg
                    className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent-blue"
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
                  <span className="text-text-dark/80">{service}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Healthcare CTA */}
      <section className="bg-navy py-20">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <FadeIn>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              {t("ctaHeading")}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/70">
              {t("ctaText")}
            </p>
            <a
              href={`/${locale}#contact`}
              className="mt-8 inline-block rounded-lg bg-accent-blue px-8 py-3 text-lg font-semibold text-white transition hover:bg-accent-blue/90"
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
