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
    namespace: "aboutPage.meta",
  });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "aboutPage" });

  const experiences = t.raw("experiences") as {
    role: string;
    company: string;
    period: string;
    description: string;
  }[];

  const education = t.raw("education") as {
    school: string;
    degree: string;
    period: string;
  };

  const certifications = t.raw("certifications") as {
    name: string;
    issuer: string;
    date: string;
    id: string;
  }[];

  const highlights = t.raw("highlights") as string[];

  return (
    <>
      <Navbar />
      <PageHero title={t("heading")} subtitle={t("subheading")} />

      {/* Intro + highlights */}
      <section className="bg-cream py-20 lg:py-28">
        <div className="mx-auto max-w-4xl px-6">
          <FadeIn>
            <p className="text-lg leading-relaxed text-text-muted-light">
              {t("intro")}
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="mt-12">
              <h2 className="font-display text-2xl font-bold text-text-on-light">
                {t("highlightsHeading")}
              </h2>
              <div className="mt-6 flex flex-wrap gap-2">
                {highlights.map((highlight) => (
                  <span
                    key={highlight}
                    className="rounded-full bg-dark px-4 py-2 text-sm font-medium text-lime"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Experience */}
      <section className="bg-dark py-20 lg:py-28">
        <div className="mx-auto max-w-4xl px-6">
          <FadeIn>
            <h2 className="font-display text-2xl font-bold text-text-on-dark sm:text-3xl">
              {t("experienceHeading")}
            </h2>
          </FadeIn>
          <div className="mt-8 space-y-5">
            {experiences.map((exp, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="rounded-2xl border border-dark-border bg-dark-elevated p-6">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <h3 className="font-display text-lg font-semibold text-text-on-dark">
                      {exp.role}
                    </h3>
                    <span className="text-sm text-text-muted-dark">
                      {exp.period}
                    </span>
                  </div>
                  <p className="mt-1 text-sm font-medium text-lime">
                    {exp.company}
                  </p>
                  <p className="mt-3 text-text-on-dark/70 leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Education + Certifications */}
      <section className="bg-cream py-20 lg:py-28">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid gap-12 md:grid-cols-2">
            {/* Education */}
            <FadeIn>
              <div>
                <h2 className="font-display text-2xl font-bold text-text-on-light">
                  {t("educationHeading")}
                </h2>
                <div className="mt-6 rounded-2xl border border-cream-muted bg-white p-6">
                  <h3 className="font-display text-lg font-semibold text-text-on-light">
                    {education.school}
                  </h3>
                  <p className="mt-1 text-text-muted-light">{education.degree}</p>
                  <p className="mt-1 text-sm text-text-muted-light/70">
                    {education.period}
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* Certifications */}
            <FadeIn delay={0.1}>
              <div>
                <h2 className="font-display text-2xl font-bold text-text-on-light">
                  {t("certificationsHeading")}
                </h2>
                <div className="mt-6 space-y-4">
                  {certifications.map((cert, i) => (
                    <div key={i} className="rounded-2xl border border-cream-muted bg-white p-6">
                      <h3 className="font-display text-lg font-semibold text-text-on-light">
                        {cert.name}
                      </h3>
                      <p className="mt-1 text-text-muted-light">{cert.issuer}</p>
                      <p className="mt-1 text-sm text-text-muted-light/70">
                        {cert.date} · ID: {cert.id}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
      <WhatsAppButton />
    </>
  );
}
