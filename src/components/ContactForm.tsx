"use client";

import { useTranslations } from "next-intl";
import { useForm, ValidationError } from "@formspree/react";
import { useState } from "react";
import FadeIn from "./FadeIn";

export default function ContactForm() {
  const t = useTranslations("contact");
  const [state, handleSubmit] = useForm("xwpkgjvr");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const options = t.raw("interestOptions") as string[];

  const validate = (form: FormData): boolean => {
    const newErrors: Record<string, string> = {};
    if (!form.get("name")) newErrors.name = t("required");
    if (!form.get("email")) newErrors.email = t("required");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.get("email") as string))
      newErrors.email = t("invalidEmail");
    if (!form.get("phone")) newErrors.phone = t("required");
    if (!form.get("interest")) newErrors.interest = t("required");
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    if (validate(form)) {
      handleSubmit(form);
    }
  };

  if (state.succeeded) {
    return (
      <section id="contact" className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-xl px-4 text-center">
          <div className="rounded-xl bg-accent-green/10 p-8">
            <svg
              className="mx-auto h-16 w-16 text-accent-green"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="mt-4 text-xl font-semibold text-text-dark">
              {t("success")}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-xl px-4">
        <FadeIn>
          <h2 className="text-center text-3xl font-bold text-text-dark sm:text-4xl">
            {t("heading")}
          </h2>
          <p className="mt-4 text-center text-lg text-text-dark/70">
            {t("subheading")}
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <form onSubmit={onSubmit} className="mt-10 space-y-5">
            {/* Name */}
            <div>
              <label className="mb-1 block text-sm font-medium text-text-dark">
                {t("name")} *
              </label>
              <input
                type="text"
                name="name"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-text-dark focus:border-accent-blue focus:outline-none focus:ring-2 focus:ring-accent-blue/20"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-accent-red">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="mb-1 block text-sm font-medium text-text-dark">
                {t("email")} *
              </label>
              <input
                type="email"
                name="email"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-text-dark focus:border-accent-blue focus:outline-none focus:ring-2 focus:ring-accent-blue/20"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-accent-red">{errors.email}</p>
              )}
              <ValidationError prefix="Email" field="email" errors={state.errors} />
            </div>

            {/* Phone */}
            <div>
              <label className="mb-1 block text-sm font-medium text-text-dark">
                {t("phone")} *
              </label>
              <input
                type="tel"
                name="phone"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-text-dark focus:border-accent-blue focus:outline-none focus:ring-2 focus:ring-accent-blue/20"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-accent-red">{errors.phone}</p>
              )}
            </div>

            {/* Interest dropdown */}
            <div>
              <label className="mb-1 block text-sm font-medium text-text-dark">
                {t("interest")} *
              </label>
              <select
                name="interest"
                defaultValue=""
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-text-dark focus:border-accent-blue focus:outline-none focus:ring-2 focus:ring-accent-blue/20"
              >
                <option value="" disabled />
                {options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              {errors.interest && (
                <p className="mt-1 text-sm text-accent-red">{errors.interest}</p>
              )}
            </div>

            {/* Message */}
            <div>
              <label className="mb-1 block text-sm font-medium text-text-dark">
                {t("message")}
              </label>
              <textarea
                name="message"
                rows={4}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-text-dark focus:border-accent-blue focus:outline-none focus:ring-2 focus:ring-accent-blue/20"
              />
            </div>

            <button
              type="submit"
              disabled={state.submitting}
              className="w-full rounded-lg bg-accent-blue px-8 py-4 text-lg font-semibold text-white transition hover:bg-accent-blue/90 disabled:opacity-50"
            >
              {state.submitting ? "..." : t("submit")}
            </button>

            {state.errors && state.errors.getFormErrors().length > 0 && (
              <p className="text-center text-sm text-accent-red">{t("error")}</p>
            )}
          </form>
        </FadeIn>

        {/* WhatsApp alternative */}
        <FadeIn delay={0.3}>
          <div className="mt-8 text-center">
            <p className="mb-3 text-text-dark/60">{t("whatsappAlt")}</p>
            <a
              href="https://wa.me/381653921999"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-whatsapp px-6 py-3 font-semibold text-white transition hover:bg-whatsapp/90"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
