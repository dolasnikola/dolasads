import { NextRequest, NextResponse } from "next/server";

async function fetchHtml(url: string): Promise<string | null> {
  const opts: RequestInit = {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      Accept: "text/html,application/xhtml+xml,*/*",
    },
    redirect: "follow",
    signal: AbortSignal.timeout(5000),
  };

  // Try https first, then http
  for (const protocol of ["https://", "http://"]) {
    try {
      const target = url.replace(/^https?:\/\//i, "");
      const resp = await fetch(protocol + target, opts);
      if (resp.ok) {
        return await resp.text();
      }
    } catch {
      // Try next protocol
    }
  }
  return null;
}

export async function POST(req: NextRequest) {
  const { url } = await req.json();

  if (!url || typeof url !== "string") {
    return NextResponse.json({ error: "Missing url" }, { status: 400 });
  }

  const html = await fetchHtml(url.trim());

  // Could not reach the site at all
  if (html === null) {
    return NextResponse.json({
      hasGA: null,
      hasGTM: null,
      hasAds: null,
      hasFacebook: null,
      reachable: false,
    });
  }

  const lower = html.toLowerCase();

  // GA4 / Google Analytics
  const hasGA =
    lower.includes("gtag(") ||
    lower.includes("google-analytics.com") ||
    lower.includes("googletagmanager.com/gtag") ||
    lower.includes("ga('create'") ||
    lower.includes("ga('send'");

  // GTM
  const hasGTM =
    lower.includes("googletagmanager.com/gtm.js") ||
    /gtm-[a-z0-9]+/i.test(html);

  // Google Ads
  const hasAds =
    lower.includes("googleads.g.doubleclick.net") ||
    lower.includes("google_conversion") ||
    lower.includes("googlesyndication.com") ||
    /aw-\d{5,}/i.test(html) ||
    lower.includes("ads/ga-audiences");

  // Facebook Pixel
  const hasFacebook =
    lower.includes("connect.facebook.net") ||
    lower.includes("fbq(") ||
    lower.includes("facebook.com/tr");

  return NextResponse.json({ hasGA, hasGTM, hasAds, hasFacebook, reachable: true });
}
