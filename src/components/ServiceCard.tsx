"use client";

import { Link } from "@/i18n/navigation";
import FadeIn from "./FadeIn";

const SERVICE_COLORS = [
  { hover: "hover:border-t-accent-blue", icon: "text-accent-blue", bg: "bg-accent-blue/10" },
  { hover: "hover:border-t-accent-red", icon: "text-accent-red", bg: "bg-accent-red/10" },
  { hover: "hover:border-t-accent-green", icon: "text-accent-green", bg: "bg-accent-green/10" },
  { hover: "hover:border-t-accent-yellow", icon: "text-accent-yellow", bg: "bg-accent-yellow/10" },
  { hover: "hover:border-t-accent-teal", icon: "text-accent-teal", bg: "bg-accent-teal/10" },
];

const SERVICE_ICONS = [
  <svg key="ads" className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" strokeWidth={2}/><circle cx="12" cy="12" r="6" strokeWidth={2}/><circle cx="12" cy="12" r="2" fill="currentColor"/></svg>,
  <svg key="web" className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>,
  <svg key="seo" className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>,
  <svg key="opt" className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>,
  <svg key="lp" className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" strokeWidth={2}/><path strokeWidth={2} d="M3 9h18M9 21V9"/></svg>,
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
