"use client";

import { useLocale } from "next-intl";
import { useParams } from "next/navigation";
import { useRouter, usePathname } from "@/i18n/navigation";

export default function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const toggleLocale = () => {
    const newLocale = locale === "sr" ? "en" : "sr";
    router.replace(
      // @ts-expect-error -- pathname and params always come from the current route
      { pathname, params },
      { locale: newLocale }
    );
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
