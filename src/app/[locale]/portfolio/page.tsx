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

  return (
    <>
      <Navbar />
      <PageHero title={t("heading")} subtitle={t("subheading")} />

      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-4">
          {/* Intro text */}
          <FadeIn>
            <p className="mb-12 text-center text-lg leading-relaxed text-text-dark/70">
              {t("intro")}
            </p>
          </FadeIn>

          {/* Projects */}
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
