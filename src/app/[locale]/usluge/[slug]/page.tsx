import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import FadeIn from "@/components/FadeIn";
import ServicePackages from "@/components/ServicePackages";
import FAQAccordion from "@/components/FAQAccordion";
import ContactForm from "@/components/ContactForm";
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

  const isGoogleAds = slug === "google-ads";

  let audit: { heading: string; description: string; cta: string } | null = null;
  let packages: {
    heading: string;
    subheading: string;
    contactCta: string;
    items: {
      title: string;
      price?: string;
      description: string;
      features: string[];
      highlighted?: boolean;
    }[];
  } | null = null;
  let faq: {
    heading: string;
    items: { question: string; answer: string }[];
  } | null = null;

  if (isGoogleAds) {
    audit = {
      heading: t("audit.heading"),
      description: t("audit.description"),
      cta: t("audit.cta"),
    };
    packages = {
      heading: t("packages.heading"),
      subheading: t("packages.subheading"),
      contactCta: t("packages.contactCta"),
      items: t.raw("packages.items"),
    };
    faq = {
      heading: t("faq.heading"),
      items: t.raw("faq.items"),
    };
  }

  return (
    <>
      <Navbar />
      <PageHero title={t("heroTitle")} subtitle={t("heroSubtitle")} />

      {/* Free audit CTA - Google Ads only */}
      {audit && (
        <section className="bg-dark py-16 lg:py-20">
          <div className="mx-auto max-w-3xl px-6">
            <FadeIn>
              <div className="rounded-2xl border border-lime/30 bg-dark-elevated p-8 text-center sm:p-10">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-lime/15">
                  <svg
                    className="h-7 w-7 text-lime"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                    />
                  </svg>
                </div>
                <h2 className="font-display text-2xl font-bold text-text-on-dark sm:text-3xl">
                  {audit.heading}
                </h2>
                <p className="mx-auto mt-3 max-w-xl text-lg leading-relaxed text-text-muted-dark">
                  {audit.description}
                </p>
                <a
                  href="#contact"
                  className="magnetic-btn mt-6 inline-block rounded-full bg-lime px-8 py-3.5 font-semibold text-dark transition hover:bg-lime/90"
                >
                  {audit.cta}
                </a>
              </div>
            </FadeIn>
          </div>
        </section>
      )}

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

      {/* Service packages - Google Ads only */}
      {packages && (
        <ServicePackages
          heading={packages.heading}
          subheading={packages.subheading}
          contactCta={packages.contactCta}
          items={packages.items}
          locale={locale}
        />
      )}

      {/* FAQ accordion - Google Ads only */}
      {faq && (
        <div className="-mb-16">
          <FAQAccordion heading={faq.heading} items={faq.items} />
        </div>
      )}

      {/* FAQ JSON-LD structured data */}
      {faq && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faq.items.map((item) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: item.answer,
                },
              })),
            }),
          }}
        />
      )}

      {/* Contact form */}
      <ContactForm />

      <Footer />
      <WhatsAppButton />
    </>
  );
}
