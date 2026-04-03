"use client";

interface PackageItem {
  title: string;
  price?: string;
  description: string;
  features: string[];
  highlighted?: boolean;
}

interface ServicePackagesProps {
  heading: string;
  subheading: string;
  contactCta: string;
  items: PackageItem[];
  locale: string;
}

export default function ServicePackages({
  heading,
  subheading,
  contactCta,
  items,
  locale,
}: ServicePackagesProps) {
  return (
    <section className="bg-cream py-12 lg:py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold text-text-on-light sm:text-4xl">
            {heading}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-text-muted-light">
            {subheading}
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {items.map((pkg, i) => (
            <div
              key={i}
              className={`flex flex-col rounded-2xl p-7 sm:p-8 transition-all duration-300 ${
                pkg.highlighted
                  ? "border-2 border-lime bg-dark text-text-on-dark shadow-xl shadow-lime/5"
                  : "border border-cream-muted bg-white hover:border-dark/20 hover:shadow-lg"
              }`}
            >
              {pkg.highlighted && (
                <span className="mb-4 inline-block w-fit rounded-full bg-lime/15 px-3 py-1 text-xs font-semibold text-lime">
                  Preporučeno
                </span>
              )}
              <h3
                className={`font-display text-xl font-bold ${
                  pkg.highlighted ? "text-text-on-dark" : "text-text-on-light"
                }`}
              >
                {pkg.title}
              </h3>
              {pkg.price && (
                <p className="mt-2 text-2xl font-bold text-lime">{pkg.price}</p>
              )}
              <p
                className={`mt-2 leading-relaxed ${
                  pkg.highlighted ? "text-text-muted-dark" : "text-text-muted-light"
                }`}
              >
                {pkg.description}
              </p>

              <ul className="mt-6 flex-1 space-y-3">
                {pkg.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <svg
                      className={`mt-0.5 h-5 w-5 flex-shrink-0 ${
                        pkg.highlighted ? "text-lime" : "text-lime-dim"
                      }`}
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
                    <span
                      className={
                        pkg.highlighted ? "text-text-on-dark/80" : "text-text-muted-light"
                      }
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href={`/${locale}#contact`}
                className={`magnetic-btn mt-8 block rounded-full px-6 py-3.5 text-center font-semibold transition ${
                  pkg.highlighted ? "bg-lime text-dark" : "bg-dark text-lime"
                }`}
              >
                {pkg.price ? contactCta : contactCta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
