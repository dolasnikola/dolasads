import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  const meta = messages.meta as { title: string; description: string };

  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: "https://dolasads.com",
      siteName: "dolasads",
      locale: locale === "sr" ? "sr_RS" : "en_US",
      type: "website",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "sr" | "en")) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "dolasads",
            url: "https://dolasads.com",
            email: "nikola@dolasads.com",
            telephone: "+381653921999",
            description:
              "Digital marketing agency specializing in Google Ads, website creation, SEO, and landing pages.",
            areaServed: "RS",
          }),
        }}
      />
      <NextIntlClientProvider messages={messages}>
        {children}
      </NextIntlClientProvider>
    </>
  );
}
