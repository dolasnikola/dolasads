import { setRequestLocale, getTranslations } from "next-intl/server";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import PortfolioCard from "@/components/PortfolioCard";
import CaseStudyStats from "@/components/CaseStudyStats";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import FadeIn from "@/components/FadeIn";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "portfolioPage.meta" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "portfolioPage" });

  const projects = t.raw("projects") as {
    id: string;
    title: string;
    category: string;
    description: string;
    url: string;
    features: string[];
  }[];

  const industries = t.raw("agencyIndustries") as string[];

  return (
    <>
      <Navbar />
      <PageHero title={t("heading")} subtitle={t("subheading")} />

      {/* Agency experience */}
      <section className="bg-white py-12 sm:py-20">
        <div className="mx-auto max-w-4xl px-4">
          <FadeIn>
            <p className="mb-8 text-center text-base leading-relaxed text-text-dark/70 sm:mb-12 sm:text-lg">
              {t("intro")}
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="rounded-xl bg-gray-50 p-5 sm:p-8">
              <h2 className="text-2xl font-bold text-text-dark">
                {t("agencyHeading")}
              </h2>
              <p className="mt-3 text-text-dark/70">
                {t("agencyDescription")}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {industries.map((industry) => (
                  <span
                    key={industry}
                    className="rounded-full bg-navy/10 px-4 py-2 text-sm font-medium text-navy"
                  >
                    {industry}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Projects */}
      <section className="bg-gray-50 py-12 sm:py-20">
        <div className="mx-auto max-w-4xl px-4">
          <div className="space-y-12">
            {projects.map((project, i) => (
              <PortfolioCard
                key={project.id}
                title={project.title}
                category={project.category}
                description={project.description}
                url={project.url}
                features={project.features}
                viewSiteLabel={t("viewSite")}
                delay={i * 0.15}
              >
                {project.id === "selidbe-beograd" && <CaseStudyStats />}
              </PortfolioCard>
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
