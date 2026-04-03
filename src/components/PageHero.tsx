"use client";

import FadeIn from "./FadeIn";

interface PageHeroProps {
  title: string;
  subtitle: string;
}

export default function PageHero({ title, subtitle }: PageHeroProps) {
  return (
    <section className="grain-overlay relative bg-dark pt-28 pb-14 lg:pt-36 lg:pb-16 overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-lime/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <FadeIn>
          <h1 className="font-display text-4xl font-bold tracking-tight text-text-on-dark sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-text-muted-dark lg:text-xl">
            {subtitle}
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
