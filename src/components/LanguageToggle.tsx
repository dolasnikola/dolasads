"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";

export default function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLocale = () => {
    const newLocale = locale === "sr" ? "en" : "sr";
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/"));
  };

  return (
    <button
      onClick={toggleLocale}
      className="flex items-center gap-1 rounded-full border border-white/30 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-white/10"
      aria-label="Switch language"
    >
      <span className={locale === "sr" ? "font-bold" : "opacity-60"}>SR</span>
      <span className="opacity-40">/</span>
      <span className={locale === "en" ? "font-bold" : "opacity-60"}>EN</span>
    </button>
  );
}
