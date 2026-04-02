import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

export default function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");

  return (
    <footer className="bg-navy py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 sm:flex-row sm:justify-between">
        <Link href="/">
          <Image
            src="/logo-skracen.png"
            alt="dolasads logo"
            width={100}
            height={26}
          />
        </Link>

        <div className="flex flex-wrap items-center gap-4 text-sm text-white/60">
          <Link href="/usluge" className="transition hover:text-white">
            {tNav("services")}
          </Link>
          <Link href="/portfolio" className="transition hover:text-white">
            {tNav("portfolio")}
          </Link>
          <Link href="/cenovnik" className="transition hover:text-white">
            {tNav("pricing")}
          </Link>
          <Link href="/o-meni" className="transition hover:text-white">
            {tNav("about")}
          </Link>
          <Link href="/za-ordinacije" className="transition hover:text-white">
            {tNav("forClinics")}
          </Link>
          <a
            href="mailto:nikola@dolasads.com"
            className="transition hover:text-white"
          >
            nikola@dolasads.com
          </a>
          <a
            href="tel:+381653921999"
            className="transition hover:text-white"
          >
            +381 65 392 1999
          </a>
          <a
            href="https://wa.me/381653921999"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-whatsapp"
          >
            WhatsApp
          </a>
        </div>

        <p className="text-sm text-white/40">{t("copyright")}</p>
      </div>
    </footer>
  );
}
