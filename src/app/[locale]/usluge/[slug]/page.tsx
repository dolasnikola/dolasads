import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import FadeIn from "@/components/FadeIn";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const SERVICE_SLUGS = [
  "google-ads",
  "izrada-sajtova",
  "seo-optimizacija",
  "optimizacija-sajta",
  "landing-stranice",
  "digitalni-marketing",
  "analitika-i-tracking",
] as const;

type ServiceSlug = (typeof SERVICE_SLUGS)[number];

export function generateStaticParams() {
  return SERVICE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  if (!SERVICE_SLUGS.includes(slug as ServiceSlug)) {
    return {};
  }

  const t = await getTranslations({
    locale,
    namespace: `serviceDetail.${slug}.meta`,
  });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  if (!SERVICE_SLUGS.includes(slug as ServiceSlug)) {
    notFound();
  }

  setRequestLocale(locale);

  const t = await getTranslations({
    locale,
    namespace: `serviceDetail.${slug}`,
  });

  const sections = t.raw("sections") as {
    heading: string;
    content: string;
  }[];
  const features = t.raw("features") as string[];

  return (
    <>
      <Navbar />
      <PageHero title={t("heroTitle")} subtitle={t("heroSubtitle")} />

      {/* Content sections */}
      <section className="bg-cream py-20 lg:py-28">
        <div className="mx-auto max-w-4xl px-6">
          {sections.map((section, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className={i > 0 ? "mt-16" : ""}>
                <h2 className="font-display text-2xl font-bold text-text-on-light sm:text-3xl">
                  {section.heading}
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-text-muted-light">
                  {section.content}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-dark py-20 lg:py-28">
        <div className="mx-auto max-w-4xl px-6">
          <FadeIn>
            <div className="grid gap-4 sm:grid-cols-2">
              {features.map((feature, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-xl border border-dark-border bg-dark-elevated p-4"
                >
                  <svg
                    className="mt-0.5 h-5 w-5 flex-shrink-0 text-lime"
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
                  <span className="text-text-on-dark/80">{feature}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <CTASection customCta={t("cta")} />
      <Footer />
      <WhatsAppButton />
    </>
  );
}
