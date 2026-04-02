import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["sr", "en"],
  defaultLocale: "sr",
  pathnames: {
    "/": "/",
    "/usluge": {
      sr: "/usluge",
      en: "/services",
    },
    "/usluge/[slug]": {
      sr: "/usluge/[slug]",
      en: "/services/[slug]",
    },
    "/portfolio": "/portfolio",
    "/za-ordinacije": {
      sr: "/za-ordinacije",
      en: "/for-clinics",
    },
    "/cenovnik": {
      sr: "/cenovnik",
      en: "/pricing",
    },
    "/o-meni": {
      sr: "/o-meni",
      en: "/about",
    },
  },
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];
