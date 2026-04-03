"use client";

import { Link } from "@/i18n/navigation";
import FadeIn from "./FadeIn";

const SERVICE_ICONS = [
  <svg key="ads" className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" strokeWidth={1.5}/><circle cx="12" cy="12" r="6" strokeWidth={1.5}/><circle cx="12" cy="12" r="2" fill="currentColor"/></svg>,
  <svg key="web" className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>,
  <svg key="seo" className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>,
  <svg key="opt" className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>,
  <svg key="lp" className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" strokeWidth={1.5}/><path strokeWidth={1.5} d="M3 9h18M9 21V9"/></svg>,
  <svg key="dm" className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"/></svg>,
  <svg key="analytics" className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>,
];

interface ServiceCardProps {
  slug: string;
  title: string;
  description: string;
  index: number;
}

export default function ServiceCard({ slug, title, description, index }: ServiceCardProps) {
  return (
    <FadeIn delay={index * 0.08}>
      <Link
        href={{ pathname: "/usluge/[slug]", params: { slug } }}
        className="block h-full"
      >
        <div className="group relative h-full overflow-hidden rounded-2xl border border-cream-muted bg-white p-6 transition-all duration-300 hover:border-dark/20 hover:shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-br from-lime/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          <div className="relative z-10">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-dark text-lime">
              {SERVICE_ICONS[index] || SERVICE_ICONS[0]}
            </div>
            <h3 className="mb-2 font-display text-xl font-semibold text-text-on-light">
              {title}
            </h3>
            <p className="text-text-muted-light leading-relaxed">{description}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-dark group-hover:text-lime-dim transition-colors">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </div>
        </div>
      </Link>
    </FadeIn>
  );
}
