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
      <div className="rounded-xl bg-white p-8 shadow-lg">
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="text-2xl font-bold text-text-dark">{title}</h3>
          <span className="rounded-full bg-accent-blue/10 px-3 py-1 text-sm font-medium text-accent-blue">
            {category}
          </span>
        </div>

        <p className="mt-4 text-lg leading-relaxed text-text-dark/70">
          {description}
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {features.map((feature, i) => (
            <div key={i} className="flex items-start gap-2">
              <svg
                className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent-green"
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
              <span className="text-sm text-text-dark/80">{feature}</span>
            </div>
          ))}
        </div>

        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-accent-blue px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-blue/90"
        >
          {viewSiteLabel}
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </a>

        {children}
      </div>
    </FadeIn>
  );
}
