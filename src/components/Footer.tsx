import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

export default function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");

  return (
    <footer className="border-t border-dark-border bg-dark py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <Link href="/">
            <Image
              src="/logo-skracen.png"
              alt="dolasads logo"
              width={100}
              height={26}
            />
          </Link>

          <div className="flex flex-wrap items-center gap-6 text-sm text-text-muted-dark">
            <Link href="/usluge" className="transition hover:text-text-on-dark">
              {tNav("services")}
            </Link>
            <Link href="/portfolio" className="transition hover:text-text-on-dark">
              {tNav("portfolio")}
            </Link>
            <Link href="/cenovnik" className="transition hover:text-text-on-dark">
              {tNav("pricing")}
            </Link>
            <Link href="/o-meni" className="transition hover:text-text-on-dark">
              {tNav("about")}
            </Link>
            <Link href="/za-ordinacije" className="transition hover:text-text-on-dark">
              {tNav("forClinics")}
            </Link>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-dark-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted-dark">
            <a href="mailto:nikola@dolasads.com" className="transition hover:text-lime">
              nikola@dolasads.com
            </a>
            <span className="text-dark-border">|</span>
            <a href="tel:+381653921999" className="transition hover:text-lime">
              +381 65 392 1999
            </a>
            <span className="text-dark-border">|</span>
            <a
              href="https://wa.me/381653921999"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-whatsapp"
            >
              WhatsApp
            </a>
          </div>

          <p className="text-sm text-text-muted-dark/50">{t("copyright")}</p>
        </div>
      </div>
    </footer>
  );
}
