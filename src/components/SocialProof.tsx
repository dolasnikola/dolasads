"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import FadeIn from "./FadeIn";

function useCountUp(target: string, inView: boolean) {
  const [display, setDisplay] = useState("0");
  const hasRun = useRef(false);

  useEffect(() => {
    if (!inView || hasRun.current) return;
    hasRun.current = true;

    const numericMatch = target.match(/(\d+)/);
    if (!numericMatch) {
      setDisplay(target);
      return;
    }

    const end = parseInt(numericMatch[1]);
    const suffix = target.replace(/\d+/, "");
    const duration = 2000;
    const steps = 60;
    const increment = end / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      setDisplay(`${Math.min(Math.round(increment * step), end)}${suffix}`);
      if (step >= steps) clearInterval(timer);
    }, duration / steps);

    return () => clearInterval(timer);
  }, [inView, target]);

  return display;
}

function StatCard({
  value,
  label,
  inView,
  index,
}: {
  value: string;
  label: string;
  inView: boolean;
  index: number;
}) {
  const display = useCountUp(value, inView);

  return (
    <FadeIn delay={index * 0.1}>
      <div className="relative text-center lg:text-left">
        <div className="font-display text-6xl font-bold text-lime sm:text-7xl lg:text-8xl">
          {display}
        </div>
        <div className="mt-3 text-base text-text-muted-dark lg:text-lg">
          {label}
        </div>
      </div>
    </FadeIn>
  );
}

export default function SocialProof() {
  const t = useTranslations("socialProof");
  const stats = t.raw("stats") as { value: string; label: string }[];
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative bg-dark py-24 lg:py-32">
      {/* Orb — desktop only */}
      <div className="orb top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-lime/3 blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid gap-16 sm:grid-cols-3 sm:gap-8">
          {stats.map((stat, i) => (
            <StatCard
              key={i}
              value={stat.value}
              label={stat.label}
              inView={inView}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
