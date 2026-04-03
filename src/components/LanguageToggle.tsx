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
      className="flex items-center gap-1.5 rounded-full border border-dark-border px-3 py-1.5 text-sm font-medium text-text-on-dark transition hover:border-lime/40 hover:text-lime"
      aria-label="Switch language"
    >
      <span className={locale === "sr" ? "text-lime" : "text-text-muted-dark"}>SR</span>
      <span className="text-dark-border">/</span>
      <span className={locale === "en" ? "text-lime" : "text-text-muted-dark"}>EN</span>
    </button>
  );
}
