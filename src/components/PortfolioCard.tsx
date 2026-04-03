"use client";

import FadeIn from "./FadeIn";

interface PortfolioCardProps {
  title: string;
  category: string;
  description: string;
  url: string;
  features: string[];
  viewSiteLabel: string;
  delay?: number;
  children?: React.ReactNode;
}

export default function PortfolioCard({
  title,
  category,
  description,
  url,
  features,
  viewSiteLabel,
  delay = 0,
  children,
}: PortfolioCardProps) {
  return (
    <FadeIn delay={delay}>
      <div className="rounded-2xl border border-cream-muted bg-white p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="font-display text-2xl font-bold text-text-on-light">{title}</h3>
          <span className="rounded-full bg-dark px-3 py-1 text-sm font-medium text-lime">
            {category}
          </span>
        </div>

        <p className="mt-4 text-base leading-relaxed text-text-muted-light lg:text-lg">
          {description}
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {features.map((feature, i) => (
            <div key={i} className="flex items-start gap-2">
              <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-lime-dim" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm text-text-muted-light">{feature}</span>
            </div>
          ))}
        </div>

        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="magnetic-btn mt-6 inline-flex items-center gap-2 rounded-full bg-dark px-6 py-2.5 text-sm font-semibold text-lime transition hover:bg-dark-elevated"
        >
          {viewSiteLabel}
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>

        {children}
      </div>
    </FadeIn>
  );
}
