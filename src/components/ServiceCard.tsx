"use client";

import { Link } from "@/i18n/navigation";
import FadeIn from "./FadeIn";

const SERVICE_COLORS = [
  { hover: "hover:border-t-accent-blue", icon: "text-accent-blue", bg: "bg-accent-blue/10" },
  { hover: "hover:border-t-accent-red", icon: "text-accent-red", bg: "bg-accent-red/10" },
  { hover: "hover:border-t-accent-green", icon: "text-accent-green", bg: "bg-accent-green/10" },
  { hover: "hover:border-t-accent-yellow", icon: "text-accent-yellow", bg: "bg-accent-yellow/10" },
  { hover: "hover:border-t-accent-teal", icon: "text-accent-teal", bg: "bg-accent-teal/10" },
  { hover: "hover:border-t-accent-blue", icon: "text-accent-blue", bg: "bg-accent-blue/10" },
  { hover: "hover:border-t-accent-green", icon: "text-accent-green", bg: "bg-accent-green/10" },
];

const SERVICE_ICONS = [
  <svg key="ads" className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" strokeWidth={2}/><circle cx="12" cy="12" r="6" strokeWidth={2}/><circle cx="12" cy="12" r="2" fill="currentColor"/></svg>,
  <svg key="web" className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>,
  <svg key="seo" className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>,
  <svg key="opt" className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>,
  <svg key="lp" className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" strokeWidth={2}/><path strokeWidth={2} d="M3 9h18M9 21V9"/></svg>,
  <svg key="dm" className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"/></svg>,
  <svg key="analytics" className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>,
];

interface ServiceCardProps {
  slug: string;
  title: string;
  description: string;
  index: number;
}

export default function ServiceCard({ slug, title, description, index }: ServiceCardProps) {
  const colors = SERVICE_COLORS[index] || SERVICE_COLORS[0];

  return (
    <FadeIn delay={index * 0.1}>
      <Link
        href={{ pathname: "/usluge/[slug]", params: { slug } }}
        className="block"
      >
        <div
          className={`group rounded-xl border-t-4 border-t-transparent bg-white p-6 shadow-md transition hover:shadow-xl ${colors.hover}`}
        >
          <div
            className={`mb-4 flex h-12 w-12 items-center justify-center rounded-lg ${colors.bg} ${colors.icon}`}
          >
            {SERVICE_ICONS[index]}
          </div>
          <h3 className="mb-2 text-xl font-semibold text-text-dark">
            {title}
          </h3>
          <p className="text-text-dark/70">{description}</p>
          <span className={`mt-4 inline-block text-sm font-medium ${colors.icon} group-hover:underline`}>
            →
          </span>
        </div>
      </Link>
    </FadeIn>
  );
}
