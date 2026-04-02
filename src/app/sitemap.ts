import type { MetadataRoute } from "next";

const SERVICE_SLUGS = [
  "google-ads",
  "izrada-sajtova",
  "seo-optimizacija",
  "optimizacija-sajta",
  "landing-stranice",
  "digitalni-marketing",
  "analitika-i-tracking",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.dolasads.com";
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/sr`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/en`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    // Services overview
    {
      url: `${baseUrl}/sr/usluge`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/en/services`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    // Portfolio
    {
      url: `${baseUrl}/sr/portfolio`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/en/portfolio`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // Individual service pages
  const servicePages: MetadataRoute.Sitemap = SERVICE_SLUGS.flatMap(
    (slug) => [
      {
        url: `${baseUrl}/sr/usluge/${slug}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.8,
      },
      {
        url: `${baseUrl}/en/services/${slug}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.6,
      },
    ]
  );

  const newPages: MetadataRoute.Sitemap = [
    // Healthcare niche LP
    {
      url: `${baseUrl}/sr/za-ordinacije`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/en/for-clinics`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    // Pricing
    {
      url: `${baseUrl}/sr/cenovnik`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en/pricing`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    // About
    {
      url: `${baseUrl}/sr/o-meni`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/en/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  return [...staticPages, ...servicePages, ...newPages];
}
