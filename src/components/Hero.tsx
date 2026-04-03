"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

function AnimatedCounter({
  target,
  suffix = "",
}: {
  target: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasRun = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRun.current) {
          hasRun.current = true;
          const duration = 2000;
          const steps = 60;
          const increment = target / steps;
          let step = 0;
          const timer = setInterval(() => {
            step++;
            setCount(Math.min(Math.round(increment * step), target));
            if (step >= steps) clearInterval(timer);
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function Hero() {
  const t = useTranslations();

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const isSr = t("trust.campaigns").includes("kampanja");

  return (
    <section className="grain-overlay relative min-h-screen flex items-center bg-dark overflow-hidden">
      {/* Decorative gradient orbs — hidden on mobile via .orb */}
      <div className="orb top-1/4 -right-32 w-[600px] h-[600px] bg-lime/5 blur-[120px]" />
      <div className="orb bottom-0 -left-32 w-[400px] h-[400px] bg-lime/3 blur-[100px]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-32 lg:py-40">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          {/* Left: headline + CTA */}
          <div className="lg:col-span-7">
            {/* Eyebrow metric */}
            <div
              className="mb-8 inline-flex items-center gap-3 rounded-full border border-dark-border bg-dark-elevated px-5 py-2.5 animate-fade-in-up"
              style={{ animationDelay: "0.1s" }}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-lime" />
              </span>
              <span className="text-sm text-text-muted-dark">
                <span className="font-semibold text-lime">
                  <AnimatedCounter target={1000000} suffix="+" />
                </span>{" "}
                EUR {isSr ? "upravljanih budžeta" : "managed budgets"}
              </span>
            </div>

            <h1
              className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-text-on-dark sm:text-6xl lg:text-7xl animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              {t("hero.headline")}
            </h1>

            <p
              className="mt-6 max-w-lg text-lg text-text-muted-dark sm:text-xl leading-relaxed animate-fade-in-up"
              style={{ animationDelay: "0.35s" }}
            >
              {t("hero.subheadline")}
            </p>

            <div
              className="mt-10 flex flex-col gap-4 sm:flex-row animate-fade-in-up"
              style={{ animationDelay: "0.5s" }}
            >
              <button
                onClick={scrollToContact}
                className="magnetic-btn rounded-full bg-lime px-8 py-4 text-base font-semibold text-dark transition"
              >
                {t("hero.ctaPrimary")}
              </button>
              <a
                href="https://wa.me/381653921999"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-full border border-dark-border px-8 py-4 text-base font-medium text-text-on-dark transition hover:border-whatsapp hover:text-whatsapp"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                {t("hero.ctaWhatsapp")}
              </a>
            </div>
          </div>

          {/* Right: trust signals — desktop only */}
          <div className="hidden lg:col-span-5 lg:flex lg:flex-col lg:items-end lg:gap-4">
            {["campaigns", "certified", "experience"].map((key, i) => (
              <div
                key={key}
                className="flex items-center gap-3 rounded-xl border border-dark-border bg-dark-elevated/80 px-5 py-3.5 animate-fade-in-up"
                style={{ animationDelay: `${0.6 + i * 0.12}s` }}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-lime/10">
                  <svg className="h-4 w-4 text-lime" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-sm text-text-on-dark">{t(`trust.${key}`)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile trust signals */}
        <div
          className="mt-16 flex flex-wrap gap-3 lg:hidden animate-fade-in-up"
          style={{ animationDelay: "0.6s" }}
        >
          {["campaigns", "certified", "experience"].map((key) => (
            <div
              key={key}
              className="flex items-center gap-2 rounded-full border border-dark-border bg-dark-elevated/60 px-4 py-2 text-sm text-text-muted-dark"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-lime" />
              {t(`trust.${key}`)}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
