import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="bg-navy py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 sm:flex-row sm:justify-between">
        <Image
          src="/logo-skracen.png"
          alt="dolasads logo"
          width={100}
          height={26}
        />

        <div className="flex flex-wrap items-center gap-4 text-sm text-white/60">
          <a href="mailto:nikola@dolasads.com" className="hover:text-white transition">
            nikola@dolasads.com
          </a>
          <a href="tel:+381653921999" className="hover:text-white transition">
            +381 65 392 1999
          </a>
          <a
            href="https://wa.me/381653921999"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-whatsapp transition"
          >
            WhatsApp
          </a>
        </div>

        <p className="text-sm text-white/40">{t("copyright")}</p>
      </div>
    </footer>
  );
}
