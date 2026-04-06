import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lead Finder | DolasAds",
  description:
    "Find potential clients missing digital presence. Audit Google Maps businesses for website, analytics, and ads gaps.",
  robots: "noindex, nofollow",
};

export default function LeadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
