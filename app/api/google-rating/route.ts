import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const name = searchParams.get("name")
  const address = searchParams.get("address")

  if (!name || !address) {
    return NextResponse.json({ error: "Missing name or address" }, { status: 400 })
  }

  const apiKey = process.env.GOOGLE_PLACES_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: "Google Places API key not configured" }, { status: 500 })
  }

  const query = encodeURIComponent(`${name} ${address}`)
  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${apiKey}`

  try {
    const response = await fetch(url)
    const data = await response.json()

    if (data.status !== "OK" || !data.results?.length) {
      return NextResponse.json({ error: "No results found" }, { status: 404 })
    }

    const place = data.results[0]
    const placeId = place.place_id
    const rating = place.rating ?? null
    const reviewCount = place.user_ratings_total ?? 0
    const mapsUrl = `https://www.google.com/maps/place/?q=place_id:${placeId}`

    return NextResponse.json({ rating, reviewCount, mapsUrl })
  } catch (err) {
    console.error("Google Places API error:", err)
    return NextResponse.json({ error: "Failed to fetch from Google Places" }, { status: 500 })
  }
}
