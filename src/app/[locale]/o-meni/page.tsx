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
      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-4">
          <FadeIn>
            <p className="text-lg leading-relaxed text-text-dark/70">
              {t("intro")}
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-text-dark">
                {t("highlightsHeading")}
              </h2>
              <div className="mt-6 flex flex-wrap gap-3">
                {highlights.map((highlight) => (
                  <span
                    key={highlight}
                    className="rounded-full bg-navy/10 px-4 py-2 text-sm font-medium text-navy"
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
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-4xl px-4">
          <FadeIn>
            <h2 className="text-2xl font-bold text-text-dark sm:text-3xl">
              {t("experienceHeading")}
            </h2>
          </FadeIn>
          <div className="mt-8 space-y-6">
            {experiences.map((exp, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="rounded-xl bg-white p-6 shadow-sm">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <h3 className="text-lg font-semibold text-text-dark">
                      {exp.role}
                    </h3>
                    <span className="text-sm text-text-dark/50">
                      {exp.period}
                    </span>
                  </div>
                  <p className="mt-1 text-sm font-medium text-accent-blue">
                    {exp.company}
                  </p>
                  <p className="mt-3 text-text-dark/70">{exp.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Education + Certifications */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-4">
          <div className="grid gap-12 md:grid-cols-2">
            {/* Education */}
            <FadeIn>
              <div>
                <h2 className="text-2xl font-bold text-text-dark">
                  {t("educationHeading")}
                </h2>
                <div className="mt-6 rounded-xl bg-gray-50 p-6">
                  <h3 className="text-lg font-semibold text-text-dark">
                    {education.school}
                  </h3>
                  <p className="mt-1 text-text-dark/70">{education.degree}</p>
                  <p className="mt-1 text-sm text-text-dark/50">
                    {education.period}
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* Certifications */}
            <FadeIn delay={0.1}>
              <div>
                <h2 className="text-2xl font-bold text-text-dark">
                  {t("certificationsHeading")}
                </h2>
                <div className="mt-6 space-y-4">
                  {certifications.map((cert, i) => (
                    <div key={i} className="rounded-xl bg-gray-50 p-6">
                      <h3 className="text-lg font-semibold text-text-dark">
                        {cert.name}
                      </h3>
                      <p className="mt-1 text-text-dark/70">{cert.issuer}</p>
                      <p className="mt-1 text-sm text-text-dark/50">
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
