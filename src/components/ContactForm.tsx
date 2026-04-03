"use client";

import { useTranslations } from "next-intl";
import { useForm, ValidationError } from "@formspree/react";
import { useState } from "react";
import FadeIn from "./FadeIn";

export default function ContactForm() {
  const t = useTranslations("contact");
  const [state, handleSubmit] = useForm("xaqdaqnp");
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
      if (typeof window !== "undefined" && window.dataLayer) {
        window.dataLayer.push({
          event: "form_submit",
          form_name: "contact",
        });
      }
    }
  };

  if (state.succeeded) {
    return (
      <section id="contact" className="bg-cream py-24 lg:py-32">
        <div className="mx-auto max-w-xl px-6 text-center">
          <div className="rounded-2xl border border-cream-muted bg-white p-10">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-lime/15">
              <svg className="h-8 w-8 text-lime-dim" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-xl font-semibold text-text-on-light">{t("success")}</p>
          </div>
        </div>
      </section>
    );
  }

  const inputClasses =
    "w-full rounded-xl border border-cream-muted bg-white px-4 py-3.5 text-text-on-light placeholder:text-text-muted-light/50 focus:border-dark focus:outline-none focus:ring-2 focus:ring-dark/10 transition";

  return (
    <section id="contact" className="bg-cream py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-2">
          {/* Left: copy */}
          <FadeIn>
            <div className="flex flex-col justify-center">
              <h2 className="font-display text-3xl font-bold tracking-tight text-text-on-light sm:text-4xl lg:text-5xl">
                {t("heading")}
              </h2>
              <p className="mt-4 text-lg text-text-muted-light leading-relaxed">
                {t("subheading")}
              </p>

              {/* WhatsApp alternative */}
              <div className="mt-10">
                <p className="mb-4 text-sm text-text-muted-light">{t("whatsappAlt")}</p>
                <a
                  href="https://wa.me/381653921999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-whatsapp px-6 py-3 font-semibold text-white transition hover:bg-whatsapp/90"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp
                </a>
              </div>
            </div>
          </FadeIn>

          {/* Right: form */}
          <FadeIn delay={0.2}>
            <form
              onSubmit={onSubmit}
              className="rounded-2xl border border-cream-muted bg-white p-6 shadow-sm sm:p-8"
            >
              <div className="space-y-4">
                {/* Name */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-text-on-light">
                    {t("name")} *
                  </label>
                  <input type="text" name="name" className={inputClasses} />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-text-on-light">
                    {t("email")} *
                  </label>
                  <input type="email" name="email" className={inputClasses} />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                  )}
                  <ValidationError prefix="Email" field="email" errors={state.errors} />
                </div>

                {/* Phone */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-text-on-light">
                    {t("phone")} *
                  </label>
                  <input type="tel" name="phone" className={inputClasses} />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                  )}
                </div>

                {/* Interest */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-text-on-light">
                    {t("interest")} *
                  </label>
                  <select name="interest" defaultValue="" className={inputClasses}>
                    <option value="" disabled />
                    {options.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                  {errors.interest && (
                    <p className="mt-1 text-sm text-red-500">{errors.interest}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-text-on-light">
                    {t("message")}
                  </label>
                  <textarea name="message" rows={4} className={inputClasses} />
                </div>

                <button
                  type="submit"
                  disabled={state.submitting}
                  className="magnetic-btn w-full rounded-xl bg-dark px-8 py-4 text-base font-semibold text-lime transition hover:bg-dark-elevated disabled:opacity-50"
                >
                  {state.submitting ? "..." : t("submit")}
                </button>

                {state.errors && state.errors.getFormErrors().length > 0 && (
                  <p className="text-center text-sm text-red-500">{t("error")}</p>
                )}
              </div>
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
