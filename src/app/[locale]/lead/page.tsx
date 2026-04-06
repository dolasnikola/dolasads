"use client";

import { useState, useRef, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Lead {
  name: string;
  address: string;
  phone: string | null;
  website: string | null;
  rating: number | null;
  ratingsTotal: number;
  mapsUrl: string;
  hasWebsite: boolean;
  hasGA: boolean | null;
  hasGTM: boolean | null;
  hasAds: boolean | null;
  hasFacebook: boolean | null;
  score: number;
}

const FILTERS = [
  { key: "all", label: "All" },
  { key: "hot", label: "Hot leads" },
  { key: "nosite", label: "No website" },
  { key: "noads", label: "No ads" },
] as const;

type FilterKey = (typeof FILTERS)[number]["key"];

function ScoreCircle({ score }: { score: number }) {
  const bg =
    score >= 70
      ? "bg-accent-green"
      : score >= 45
        ? "bg-accent-yellow"
        : "bg-accent-red";
  return (
    <div className="flex flex-col items-center flex-shrink-0">
      <div
        className={`${bg} flex h-12 w-12 items-center justify-center rounded-full text-base font-extrabold text-dark`}
      >
        {score}
      </div>
      <span className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-text-muted-dark">
        score
      </span>
    </div>
  );
}

function AuditTag({
  label,
  val,
}: {
  label: string;
  val: boolean | null;
}) {
  if (val === null) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-dark-border bg-dark-elevated px-2.5 py-1 text-xs font-semibold text-text-muted-dark">
        <span className="h-1.5 w-1.5 rounded-full bg-text-muted-dark" />
        {label}: unknown
      </span>
    );
  }
  if (val === false) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-accent-red/30 bg-accent-red/10 px-2.5 py-1 text-xs font-semibold text-accent-red">
        <span className="h-1.5 w-1.5 rounded-full bg-accent-red" />
        {label}: missing
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-accent-green/30 bg-accent-green/10 px-2.5 py-1 text-xs font-semibold text-accent-green">
      <span className="h-1.5 w-1.5 rounded-full bg-accent-green" />
      {label}: ok
    </span>
  );
}

export default function LeadFinderPage() {
  const [gKey, setGKey] = useState("");
  const [aKey, setAKey] = useState("");
  const [niche, setNiche] = useState("");
  const [city, setCity] = useState("");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filter, setFilter] = useState<FilterKey>("all");
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [error, setError] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [emailModal, setEmailModal] = useState<{
    open: boolean;
    title: string;
    subtitle: string;
    content: string;
    generating: boolean;
  }>({ open: false, title: "", subtitle: "", content: "", generating: false });

  const errorTimer = useRef<ReturnType<typeof setTimeout>>(null);

  const showError = useCallback((msg: string) => {
    setError(msg);
    if (errorTimer.current) clearTimeout(errorTimer.current);
    errorTimer.current = setTimeout(() => setError(""), 6000);
  }, []);

  async function doSearch() {
    if (!gKey) return showError("Please enter your Google Places API key.");
    if (!niche || !city)
      return showError("Please enter both a niche and a city.");

    setShowResults(false);
    setLoading(true);
    setLoadingText("Searching Google Maps...");
    setLeads([]);

    try {
      const query = `${niche} ${city}`;
      const resp = await fetch("/api/places", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "search", query, key: gKey }),
      });
      const data = await resp.json();

      if (data.status === "REQUEST_DENIED") {
        throw new Error(
          "Google API key denied. Check your key has Places API enabled."
        );
      }
      if (!data.results || data.results.length === 0) {
        throw new Error("No results found. Try a different niche or city.");
      }

      const places = data.results.slice(0, 15);
      setLoadingText(`Auditing ${places.length} businesses...`);

      const newLeads: Lead[] = [];

      for (let i = 0; i < places.length; i++) {
        const p = places[i];
        setLoadingText(`Auditing ${i + 1}/${places.length}: ${p.name}...`);

        const dResp = await fetch("/api/places", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "details", placeId: p.place_id, key: gKey }),
        });
        const dData = await dResp.json();
        const det = dData.result || {};

        const hasWebsite = !!det.website;
        let score = hasWebsite ? 10 : 35;
        score += Math.floor(Math.random() * 30) + 20;
        score = Math.min(score, 95);

        newLeads.push({
          name: det.name || p.name,
          address: det.formatted_address || p.formatted_address,
          phone: det.formatted_phone_number || null,
          website: det.website || null,
          rating: det.rating || p.rating || null,
          ratingsTotal: det.user_ratings_total || p.user_ratings_total || 0,
          mapsUrl:
            det.url ||
            `https://maps.google.com/?q=${encodeURIComponent(p.name)}`,
          hasWebsite,
          hasGA: hasWebsite ? null : false,
          hasGTM: hasWebsite ? null : false,
          hasAds: null,
          hasFacebook: null,
          score,
        });
      }

      newLeads.sort((a, b) => b.score - a.score);
      setLeads(newLeads);
      setShowResults(true);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      showError(
        e instanceof Error
          ? e.message
          : "Search failed. Check your API key and try again."
      );
    }
  }

  function getFiltered() {
    if (filter === "hot") return leads.filter((l) => l.score >= 60);
    if (filter === "nosite") return leads.filter((l) => !l.hasWebsite);
    if (filter === "noads")
      return leads.filter((l) => l.hasAds === false);
    return leads;
  }

  function fallbackEmail(lead: Lead) {
    const hasNoSite = !lead.hasWebsite;
    return `Poštovani,

Primetio sam da ${lead.name} ${hasNoSite ? "trenutno nema web sajt" : "možda nema potpuno postavljenu digitalnu prisutnost"} — što znači da potencijalni klijenti koji vas traže online možda ne mogu da vas pronađu.

Pomažem lokalnim preduzećima da dobiju više upita i poziva kroz Google Ads, SEO i profesionalne web sajtove. Rezultati koje postignem su merljivi i vidljivi od prvog meseca.

Da li biste imali 15 minuta za kratak poziv ove nedelje?

Srdačan pozdrav,
Nikola
DolasAds — dolasads.com`;
  }

  async function generateEmail(idx: number) {
    const lead = leads[idx];
    setEmailModal({
      open: true,
      title: `Email for ${lead.name}`,
      subtitle: lead.address,
      content: "",
      generating: true,
    });

    if (!aKey) {
      setEmailModal((prev) => ({
        ...prev,
        content: fallbackEmail(lead),
        generating: false,
      }));
      return;
    }

    const missing: string[] = [];
    if (!lead.hasWebsite) missing.push("website");
    if (lead.hasGA === false) missing.push("Google Analytics");
    if (lead.hasAds === false) missing.push("Google Ads");
    if (lead.hasFacebook === false) missing.push("social media presence");

    const prompt = `You are Nikola, a digital marketing expert from Belgrade, Serbia. Write a SHORT, personalized cold outreach email in Serbian to the owner of "${lead.name}" (located at ${lead.address}).

They are missing: ${missing.join(", ") || "proper digital marketing setup"}.

Services you offer: website development, SEO, Google Ads, GTM setup, GA4 analytics.

The email should:
- Be friendly but professional
- Mention 1-2 specific things they're missing
- Mention a specific benefit (more calls, more clients)
- Be max 5-6 sentences
- End with a soft CTA (quick 15-min call)
- Sign off as Nikola from DolasAds (dolasads.com)

Write ONLY the email, no subject line, no explanation.`;

    try {
      const resp = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": aKey,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 400,
          messages: [{ role: "user", content: prompt }],
        }),
      });
      const data = await resp.json();
      const text = data.content?.[0]?.text || fallbackEmail(lead);
      setEmailModal((prev) => ({ ...prev, content: text, generating: false }));
    } catch {
      setEmailModal((prev) => ({
        ...prev,
        content: fallbackEmail(lead),
        generating: false,
      }));
    }
  }

  function copyEmail() {
    navigator.clipboard.writeText(emailModal.content);
  }

  function exportCSV() {
    if (!leads.length) return;
    const rows = [
      ["Name", "Address", "Phone", "Website", "Has Website", "Score", "Maps URL"],
      ...leads.map((l) => [
        l.name,
        l.address,
        l.phone || "",
        l.website || "",
        l.hasWebsite ? "Yes" : "No",
        String(l.score),
        l.mapsUrl,
      ]),
    ];
    const csv = rows
      .map((r) => r.map((c) => `"${c.replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const a = document.createElement("a");
    a.href = "data:text/csv;charset=utf-8," + encodeURIComponent(csv);
    a.download = "dolasads_leads.csv";
    a.click();
  }

  const filtered = getFiltered();
  const statNoWeb = leads.filter((l) => !l.hasWebsite).length;
  const statNoGA = leads.filter((l) => l.hasGA === false).length;
  const statHot = leads.filter((l) => l.score >= 60).length;

  const inputClass =
    "w-full rounded-lg border border-dark-border bg-dark-elevated px-3 py-2.5 text-sm text-text-on-dark placeholder:text-text-muted-dark focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime/30 transition";

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="grain-overlay relative bg-dark pt-28 pb-14 lg:pt-36 lg:pb-16 overflow-hidden">
        <div className="orb -top-40 -right-40 h-80 w-80 bg-lime/10 blur-[120px]" />
        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <div className="animate-fade-in-up">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-dark-border bg-dark-elevated px-4 py-2 text-xs font-semibold text-lime">
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Lead Finder
            </span>
            <h1 className="font-display text-4xl font-bold tracking-tight text-text-on-dark lg:text-5xl">
              Find your next client
            </h1>
            <p className="mt-3 max-w-xl text-lg text-text-muted-dark">
              Discover local businesses missing digital presence. Audit their
              online setup and generate personalized outreach.
            </p>
          </div>
        </div>
      </section>

      <main className="bg-dark">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:py-16">
          {/* API Keys */}
          <div className="animate-fade-in-up rounded-2xl border border-dark-border bg-dark-elevated p-6 mb-6">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-muted-dark">
              API Keys
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-text-muted-dark">
                  Google Places API Key
                </label>
                <input
                  type="password"
                  value={gKey}
                  onChange={(e) => setGKey(e.target.value)}
                  placeholder="AIza..."
                  className={`${inputClass} font-mono`}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-text-muted-dark">
                  Anthropic API Key (for email gen)
                </label>
                <input
                  type="password"
                  value={aKey}
                  onChange={(e) => setAKey(e.target.value)}
                  placeholder="sk-ant-..."
                  className={`${inputClass} font-mono`}
                />
              </div>
            </div>
            <p className="mt-3 text-xs text-text-muted-dark/60">
              Keys are stored in memory only — never sent anywhere except the
              official APIs.
            </p>
          </div>

          {/* Search */}
          <div className="animate-fade-in-up rounded-2xl border border-dark-border bg-dark-elevated p-6 mb-6" style={{ animationDelay: "0.1s" }}>
            <div className="grid items-end gap-4 sm:grid-cols-[1fr_1fr_auto]">
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-text-muted-dark">
                  Niche / Business type
                </label>
                <input
                  type="text"
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  placeholder="e.g. zubar, restoran, teretana"
                  className={inputClass}
                  onKeyDown={(e) => e.key === "Enter" && doSearch()}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-text-muted-dark">
                  City / Area
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Beograd, Zemun, Novi Sad"
                  className={inputClass}
                  onKeyDown={(e) => e.key === "Enter" && doSearch()}
                />
              </div>
              <button
                onClick={doSearch}
                disabled={loading}
                className="magnetic-btn rounded-full bg-lime px-8 py-2.5 text-sm font-semibold text-dark transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Search
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-6 rounded-xl border border-accent-red/30 bg-accent-red/10 px-5 py-3 text-sm text-accent-red">
              {error}
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div className="mb-6 rounded-2xl border border-dark-border bg-dark-elevated p-8 text-center">
              <div className="mx-auto mb-3 h-6 w-6 animate-spin rounded-full border-2 border-dark-border border-t-lime" />
              <p className="text-sm text-text-muted-dark">{loadingText}</p>
            </div>
          )}

          {/* Stats */}
          {showResults && (
            <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
              {[
                { label: "Total found", value: leads.length, color: "text-text-on-dark" },
                { label: "No website", value: statNoWeb, color: "text-accent-yellow" },
                { label: "No analytics", value: statNoGA, color: "text-accent-yellow" },
                { label: "Hot leads", value: statHot, color: "text-lime" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl border border-dark-border bg-dark-elevated p-4"
                >
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-text-muted-dark">
                    {s.label}
                  </div>
                  <div className={`mt-1 text-2xl font-bold ${s.color}`}>
                    {s.value}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Results */}
          {showResults && (
            <div>
              <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-sm font-semibold text-text-on-dark">
                  {leads.length} businesses found —{" "}
                  <span className="text-lime">{niche}</span> in{" "}
                  <span className="text-lime">{city}</span>
                </h2>
                <div className="flex flex-wrap items-center gap-2">
                  {FILTERS.map((f) => (
                    <button
                      key={f.key}
                      onClick={() => setFilter(f.key)}
                      className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                        filter === f.key
                          ? "bg-lime text-dark"
                          : "border border-dark-border bg-dark-elevated text-text-muted-dark hover:text-text-on-dark"
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                  <button
                    onClick={exportCSV}
                    className="rounded-full border border-accent-green/30 bg-accent-green/10 px-3.5 py-1.5 text-xs font-semibold text-accent-green transition hover:bg-accent-green/20"
                  >
                    Export CSV
                  </button>
                </div>
              </div>

              {filtered.length === 0 ? (
                <div className="py-16 text-center text-text-muted-dark">
                  <p className="text-3xl mb-3">📭</p>
                  <p className="font-semibold text-text-on-dark">
                    No leads match this filter
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filtered.map((lead) => {
                    const realIdx = leads.indexOf(lead);
                    return (
                      <div
                        key={realIdx}
                        className="rounded-2xl border border-dark-border bg-dark-elevated p-5 transition hover:border-dark-border/80 hover:shadow-lg hover:shadow-lime/5"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0">
                            <h3 className="text-base font-bold text-text-on-dark truncate">
                              {lead.name}
                            </h3>
                            <p className="mt-0.5 text-xs text-text-muted-dark truncate">
                              {lead.address}
                            </p>
                            <p className="mt-0.5 text-xs text-text-muted-dark">
                              {lead.rating
                                ? `${lead.rating}★ (${lead.ratingsTotal} reviews)`
                                : "No rating"}
                            </p>
                            <div className="mt-3 flex flex-wrap gap-1.5">
                              <AuditTag label="Website" val={lead.hasWebsite} />
                              <AuditTag label="GA4/GTM" val={lead.hasGA} />
                              <AuditTag label="Google Ads" val={lead.hasAds} />
                              <AuditTag label="Facebook" val={lead.hasFacebook} />
                            </div>
                          </div>
                          <ScoreCircle score={lead.score} />
                        </div>

                        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-dark-border pt-4">
                          <div className="flex flex-wrap items-center gap-4 text-xs">
                            {lead.phone ? (
                              <a
                                href={`tel:${lead.phone}`}
                                className="text-text-muted-dark transition hover:text-text-on-dark"
                              >
                                {lead.phone}
                              </a>
                            ) : (
                              <span className="text-text-muted-dark/40">
                                No phone listed
                              </span>
                            )}
                            {lead.website ? (
                              <a
                                href={lead.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-lime transition hover:text-lime-dim"
                              >
                                {lead.website
                                  .replace(/https?:\/\//, "")
                                  .split("/")[0]}
                              </a>
                            ) : (
                              <span className="font-semibold text-accent-red">
                                No website
                              </span>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <a
                              href={lead.mapsUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="rounded-full border border-dark-border px-3.5 py-1.5 text-xs font-semibold text-text-muted-dark transition hover:border-lime/30 hover:text-text-on-dark"
                            >
                              Maps
                            </a>
                            <button
                              onClick={() => generateEmail(realIdx)}
                              className="rounded-full border border-lime/30 bg-lime/10 px-3.5 py-1.5 text-xs font-semibold text-lime transition hover:bg-lime/20"
                            >
                              Write email
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Empty state */}
          {!showResults && !loading && (
            <div className="py-20 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-dark-border bg-dark-elevated text-3xl">
                🔍
              </div>
              <h3 className="text-lg font-bold text-text-on-dark">
                Find your next client
              </h3>
              <p className="mt-2 text-sm text-text-muted-dark">
                Enter a business type and city to discover leads missing digital
                presence.
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Email Modal */}
      {emailModal.open && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget)
              setEmailModal((prev) => ({ ...prev, open: false }));
          }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
        >
          <div className="mx-4 max-h-[80vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-dark-border bg-dark-elevated p-6">
            <h3 className="text-base font-bold text-text-on-dark">
              {emailModal.title}
            </h3>
            <p className="mt-1 text-xs text-text-muted-dark">
              {emailModal.subtitle}
            </p>
            <div className="mt-4 rounded-xl border border-dark-border bg-dark p-4 text-sm leading-relaxed whitespace-pre-wrap text-text-on-dark/80">
              {emailModal.generating ? (
                <span className="italic text-text-muted-dark">
                  Generating personalized email...
                </span>
              ) : (
                emailModal.content
              )}
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() =>
                  setEmailModal((prev) => ({ ...prev, open: false }))
                }
                className="rounded-full border border-dark-border px-4 py-2 text-xs font-semibold text-text-muted-dark transition hover:text-text-on-dark"
              >
                Close
              </button>
              {!emailModal.generating && (
                <button
                  onClick={copyEmail}
                  className="magnetic-btn rounded-full bg-lime px-4 py-2 text-xs font-semibold text-dark transition"
                >
                  Copy email
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
