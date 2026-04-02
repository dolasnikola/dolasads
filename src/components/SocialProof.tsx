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
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(Math.round(increment * step), end);
      setDisplay(`${current}${suffix}`);
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
}: {
  value: string;
  label: string;
  inView: boolean;
}) {
  const display = useCountUp(value, inView);

  return (
    <div className="text-center">
      <div className="text-5xl font-bold text-white sm:text-6xl">{display}</div>
      <div className="mt-2 text-white/70">{label}</div>
    </div>
  );
}

export default function SocialProof() {
  const t = useTranslations("socialProof");
  const stats = t.raw("stats") as { value: string; label: string }[];
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="bg-navy py-20 lg:py-28">
      <div className="mx-auto max-w-4xl px-4">
        <div className="grid gap-12 sm:grid-cols-3">
          {stats.map((stat, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <StatCard value={stat.value} label={stat.label} inView={inView} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
