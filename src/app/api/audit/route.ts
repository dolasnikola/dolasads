import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { url } = await req.json();

  if (!url || typeof url !== "string") {
    return NextResponse.json({ error: "Missing url" }, { status: 400 });
  }

  try {
    // Normalize URL
    let target = url.trim();
    if (!/^https?:\/\//i.test(target)) {
      target = "https://" + target;
    }

    const resp = await fetch(target, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
      redirect: "follow",
      signal: AbortSignal.timeout(8000),
    });

    const html = await resp.text();
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

    return NextResponse.json({ hasGA, hasGTM, hasAds, hasFacebook });
  } catch {
    // Site unreachable or timeout — return all unknown
    return NextResponse.json({
      hasGA: null,
      hasGTM: null,
      hasAds: null,
      hasFacebook: null,
    });
  }
}
