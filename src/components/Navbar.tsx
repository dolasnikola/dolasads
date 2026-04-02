"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import LanguageToggle from "./LanguageToggle";

export default function Navbar() {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? "bg-navy/95 backdrop-blur-md py-3 shadow-lg"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4">
        <Image
          src="/logo-skracen.png"
          alt="dolasads logo"
          width={140}
          height={36}
          priority
        />

        {/* Desktop nav */}
        <div className="hidden items-center gap-4 md:flex">
          <LanguageToggle />
          <button
            onClick={scrollToContact}
            className="rounded-lg bg-accent-blue px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-blue/90"
          >
            {t("cta")}
          </button>
        </div>

        {/* Mobile: CTA always visible + hamburger */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={scrollToContact}
            className="rounded-lg bg-accent-blue px-4 py-2 text-sm font-semibold text-white"
          >
            {t("cta")}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white"
            aria-label="Menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div className="border-t border-white/10 bg-navy/95 px-4 py-4 backdrop-blur-md md:hidden">
          <LanguageToggle />
        </div>
      )}
    </nav>
  );
}
