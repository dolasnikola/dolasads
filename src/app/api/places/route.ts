import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { action, query, placeId, key } = await req.json();

  if (!key) {
    return NextResponse.json({ error: "Missing API key" }, { status: 400 });
  }

  try {
    if (action === "search") {
      const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${key}`;
      const resp = await fetch(url);
      const data = await resp.json();
      return NextResponse.json(data);
    }

    if (action === "details") {
      const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(placeId)}&fields=name,formatted_address,formatted_phone_number,website,rating,user_ratings_total,url&key=${key}`;
      const resp = await fetch(url);
      const data = await resp.json();
      return NextResponse.json(data);
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch from Google Places API" },
      { status: 500 }
    );
  }
}
