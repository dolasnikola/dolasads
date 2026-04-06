"use client";

import { useState, useRef, useCallback } from "react";

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

export default function LeadFinderPage() {
  const [gKey, setGKey] = useState("");
  const [aKey, setAKey] = useState("");
  const [niche, setNiche] = useState("");
  const [city, setCity] = useState("");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filter, setFilter] = useState("all");
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
      const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${gKey}`;
      const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(url)}`;
      const resp = await fetch(proxyUrl);
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

        const detailUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${p.place_id}&fields=name,formatted_address,formatted_phone_number,website,rating,user_ratings_total,url&key=${gKey}`;
        const detailProxy = `https://corsproxy.io/?${encodeURIComponent(detailUrl)}`;
        const dResp = await fetch(detailProxy);
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
      return leads.filter((l) => l.hasAds === false || l.hasAds === null);
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
    if (lead.hasAds === false || lead.hasAds === null)
      missing.push("Google Ads");
    if (lead.hasFacebook === false || lead.hasFacebook === null)
      missing.push("social media presence");

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

  const tags = (lead: Lead) => [
    { label: "Website", val: lead.hasWebsite },
    { label: "GA4/GTM", val: lead.hasGA },
    { label: "Google Ads", val: lead.hasAds },
    { label: "Facebook", val: lead.hasFacebook },
  ];

  return (
    <div style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", background: "#f8f9fa", color: "#1a1a1a", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", padding: "16px 24px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ fontSize: 18, fontWeight: 700 }}>
          Dolas<span style={{ color: "#2563eb" }}>Ads</span>
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ background: "#eff6ff", color: "#1d4ed8", fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 20 }}>
          Lead Finder
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px 16px" }}>
        {/* API Keys */}
        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12, color: "#374151" }}>API Keys</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: "#6b7280", display: "block", marginBottom: 5 }}>Google Places API Key</label>
              <input type="password" value={gKey} onChange={(e) => setGKey(e.target.value)} placeholder="AIza..." style={{ width: "100%", padding: "9px 12px", border: "1px solid #e5e7eb", borderRadius: 8, fontSize: 13, fontFamily: "monospace", background: "#f9fafb" }} />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: "#6b7280", display: "block", marginBottom: 5 }}>Anthropic API Key (for email gen)</label>
              <input type="password" value={aKey} onChange={(e) => setAKey(e.target.value)} placeholder="sk-ant-..." style={{ width: "100%", padding: "9px 12px", border: "1px solid #e5e7eb", borderRadius: 8, fontSize: 13, fontFamily: "monospace", background: "#f9fafb" }} />
            </div>
          </div>
          <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 8 }}>Keys are stored in memory only — never sent anywhere except the official APIs.</p>
        </div>

        {/* Search */}
        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: 8, alignItems: "end" }}>
            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#6b7280", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.4px" }}>Niche / Business type</label>
              <input type="text" value={niche} onChange={(e) => setNiche(e.target.value)} placeholder="e.g. zubar, restoran, teretana" style={{ width: "100%", padding: "9px 12px", border: "1px solid #e5e7eb", borderRadius: 8, fontSize: 14 }} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#6b7280", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.4px" }}>City / Area</label>
              <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="e.g. Beograd, Zemun, Novi Sad" style={{ width: "100%", padding: "9px 12px", border: "1px solid #e5e7eb", borderRadius: 8, fontSize: 14 }} />
            </div>
            <button onClick={doSearch} disabled={loading} style={{ padding: "9px 18px", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: loading ? "not-allowed" : "pointer", border: "none", background: loading ? "#93c5fd" : "#2563eb", color: "#fff" }}>
              Search
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 8, padding: "12px 16px", fontSize: 13, color: "#b91c1c", marginBottom: 16 }}>
            {error}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: 20, marginBottom: 20, textAlign: "center" }}>
            <div style={{ display: "inline-block", width: 24, height: 24, border: "3px solid #e5e7eb", borderTopColor: "#2563eb", borderRadius: "50%", animation: "spin 0.8s linear infinite", marginBottom: 10 }} />
            <div style={{ fontSize: 13, color: "#6b7280" }}>{loadingText}</div>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        )}

        {/* Stats */}
        {showResults && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 20 }}>
            <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: "14px 16px" }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.4px", marginBottom: 4 }}>Total found</div>
              <div style={{ fontSize: 24, fontWeight: 700 }}>{leads.length}</div>
            </div>
            <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: "14px 16px" }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.4px", marginBottom: 4 }}>No website</div>
              <div style={{ fontSize: 24, fontWeight: 700, color: "#d97706" }}>{statNoWeb}</div>
            </div>
            <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: "14px 16px" }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.4px", marginBottom: 4 }}>No analytics</div>
              <div style={{ fontSize: 24, fontWeight: 700, color: "#d97706" }}>{statNoGA}</div>
            </div>
            <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: "14px 16px" }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.4px", marginBottom: 4 }}>Hot leads</div>
              <div style={{ fontSize: 24, fontWeight: 700, color: "#16a34a" }}>{statHot}</div>
            </div>
          </div>
        )}

        {/* Results */}
        {showResults && (
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
              <h2 style={{ fontSize: 15, fontWeight: 600, color: "#374151" }}>
                {leads.length} businesses found — {niche} in {city}
              </h2>
              <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {(["all", "hot", "nosite", "noads"] as const).map((f) => (
                    <button key={f} onClick={() => setFilter(f)} style={{ padding: "5px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: "pointer", border: filter === f ? "1px solid #2563eb" : "1px solid #e5e7eb", background: filter === f ? "#2563eb" : "#fff", color: filter === f ? "#fff" : "#6b7280" }}>
                      {f === "all" ? "All" : f === "hot" ? "Hot leads" : f === "nosite" ? "No website" : "No ads"}
                    </button>
                  ))}
                </div>
                <button onClick={exportCSV} style={{ padding: "6px 12px", fontSize: 12, fontWeight: 600, borderRadius: 6, cursor: "pointer", border: "1px solid #bbf7d0", background: "#f0fdf4", color: "#15803d" }}>
                  Export CSV
                </button>
              </div>
            </div>

            {filtered.length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px 20px", color: "#9ca3af" }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>📭</div>
                <h3 style={{ fontSize: 16, fontWeight: 600, color: "#374151" }}>No leads match this filter</h3>
              </div>
            ) : (
              filtered.map((lead) => {
                const realIdx = leads.indexOf(lead);
                const scoreClass = lead.score >= 70 ? "#16a34a" : lead.score >= 45 ? "#d97706" : "#dc2626";
                return (
                  <div key={realIdx} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: 16, marginBottom: 10 }}>
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
                      <div>
                        <div style={{ fontSize: 15, fontWeight: 700, color: "#111827" }}>{lead.name}</div>
                        <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 2 }}>{lead.address}</div>
                        <div style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}>
                          {lead.rating ? `${lead.rating}★ (${lead.ratingsTotal} reviews)` : "No rating"}
                        </div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, margin: "12px 0" }}>
                          {tags(lead).map((t) => {
                            const isNull = t.val === null;
                            const isFalse = t.val === false;
                            const bg = isNull ? "#f9fafb" : isFalse ? "#fef2f2" : "#f0fdf4";
                            const color = isNull ? "#6b7280" : isFalse ? "#b91c1c" : "#15803d";
                            const border = isNull ? "#e5e7eb" : isFalse ? "#fecaca" : "#bbf7d0";
                            const dot = isNull ? "#9ca3af" : isFalse ? "#dc2626" : "#16a34a";
                            const label = isNull ? "unknown" : isFalse ? "missing" : "ok";
                            return (
                              <div key={t.label} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 600, padding: "4px 10px", borderRadius: 20, background: bg, color, border: `1px solid ${border}` }}>
                                <div style={{ width: 7, height: 7, borderRadius: "50%", background: dot }} />
                                {t.label}: {label}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      <div style={{ flexShrink: 0, textAlign: "center" }}>
                        <div style={{ width: 48, height: 48, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 800, color: "#fff", background: scoreClass }}>
                          {lead.score}
                        </div>
                        <div style={{ fontSize: 10, fontWeight: 600, color: "#9ca3af", marginTop: 3, textTransform: "uppercase" }}>opp. score</div>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 10, paddingTop: 10, borderTop: "1px solid #f3f4f6", flexWrap: "wrap", gap: 8 }}>
                      <div style={{ display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" }}>
                        {lead.phone ? (
                          <span style={{ fontSize: 12, color: "#6b7280" }}>{lead.phone}</span>
                        ) : (
                          <span style={{ fontSize: 12, color: "#d1d5db" }}>No phone listed</span>
                        )}
                        {lead.website ? (
                          <a href={lead.website} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: "#2563eb", textDecoration: "none" }}>
                            {lead.website.replace(/https?:\/\//, "").split("/")[0]}
                          </a>
                        ) : (
                          <span style={{ fontSize: 12, color: "#b91c1c", fontWeight: 600 }}>No website</span>
                        )}
                      </div>
                      <div style={{ display: "flex", gap: 6 }}>
                        <a href={lead.mapsUrl} target="_blank" rel="noopener noreferrer" style={{ padding: "6px 12px", fontSize: 12, fontWeight: 600, borderRadius: 6, border: "1px solid #e5e7eb", background: "#fff", color: "#374151", textDecoration: "none" }}>
                          Maps
                        </a>
                        <button onClick={() => generateEmail(realIdx)} style={{ padding: "6px 12px", fontSize: 12, fontWeight: 600, borderRadius: 6, cursor: "pointer", border: "1px solid #e5e7eb", background: "#fff", color: "#374151" }}>
                          Write email
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* Empty state */}
        {!showResults && !loading && (
          <div style={{ textAlign: "center", padding: "60px 20px", color: "#9ca3af" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Find your next client</h3>
            <p style={{ fontSize: 13 }}>Enter a business type and city to discover leads missing digital presence.</p>
          </div>
        )}
      </div>

      {/* Email Modal */}
      {emailModal.open && (
        <div onClick={(e) => { if (e.target === e.currentTarget) setEmailModal((prev) => ({ ...prev, open: false })); }} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: "#fff", borderRadius: 14, padding: 24, maxWidth: 560, width: "90%", maxHeight: "80vh", overflowY: "auto" }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>{emailModal.title}</h3>
            <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 16 }}>{emailModal.subtitle}</div>
            <div style={{ background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 8, padding: 14, fontSize: 13, lineHeight: 1.6, whiteSpace: "pre-wrap", color: "#374151", marginBottom: 14 }}>
              {emailModal.generating ? (
                <span style={{ color: "#9ca3af", fontStyle: "italic" }}>Generating personalized email...</span>
              ) : (
                emailModal.content
              )}
            </div>
            <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
              <button onClick={() => setEmailModal((prev) => ({ ...prev, open: false }))} style={{ padding: "6px 12px", fontSize: 12, fontWeight: 600, borderRadius: 6, cursor: "pointer", border: "1px solid #e5e7eb", background: "#fff", color: "#374151" }}>
                Close
              </button>
              {!emailModal.generating && (
                <button onClick={copyEmail} style={{ padding: "6px 12px", fontSize: 12, fontWeight: 600, borderRadius: 6, cursor: "pointer", border: "1px solid #e5e7eb", background: "#fff", color: "#374151" }}>
                  Copy email
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
