"use client";

import FadeIn from "./FadeIn";

interface PageHeroProps {
  title: string;
  subtitle: string;
}

export default function PageHero({ title, subtitle }: PageHeroProps) {
  return (
    <section className="bg-navy pt-32 pb-16 lg:pt-40 lg:pb-20">
      <div className="mx-auto max-w-6xl px-4 text-center">
        <FadeIn>
          <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/70">
            {subtitle}
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
