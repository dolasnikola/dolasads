"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { Link, usePathname } from "@/i18n/navigation";
import LanguageToggle from "./LanguageToggle";

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCTA = () => {
    setMenuOpen(false);
    if (isHome) {
      document
        .getElementById("contact")
        ?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = `/${locale}#contact`;
    }
  };

  const navLinks = [
    { href: "/usluge" as const, label: t("services") },
    { href: "/portfolio" as const, label: t("portfolio") },
    { href: "/cenovnik" as const, label: t("pricing") },
    { href: "/o-meni" as const, label: t("about") },
  ];

  const isActive = (href: string) => pathname.startsWith(href);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-dark/90 backdrop-blur-xl py-3 border-b border-dark-border"
          : menuOpen
            ? "bg-dark/90 backdrop-blur-xl py-5 border-b border-dark-border"
            : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <Link href="/" className="relative z-10">
          <Image
            src="/logo-skracen.png"
            alt="dolasads logo"
            width={140}
            height={36}
            priority
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm tracking-wide transition-colors duration-200 ${
                isActive(link.href)
                  ? "text-lime"
                  : "text-text-muted-dark hover:text-text-on-dark"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <LanguageToggle />
          <button
            onClick={handleCTA}
            className="magnetic-btn rounded-full bg-lime px-6 py-2.5 text-sm font-semibold text-dark transition"
          >
            {t("cta")}
          </button>
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={handleCTA}
            className="rounded-full bg-lime px-4 py-2 text-sm font-semibold text-dark"
          >
            {t("cta")}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-text-on-dark"
            aria-label="Menu"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-dark-border bg-dark/95 px-6 py-6 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`text-base transition ${
                  isActive(link.href) ? "text-lime" : "text-text-muted-dark hover:text-text-on-dark"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <LanguageToggle />
          </div>
        </div>
      )}
    </nav>
  );
}
