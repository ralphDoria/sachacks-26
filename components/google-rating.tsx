"use client"

import { useEffect, useState } from "react"
import { ExternalLink } from "lucide-react"

interface GoogleRatingData {
  rating: number
  reviewCount: number
  mapsUrl: string
}

interface GoogleRatingProps {
  name: string
  address: string
}

function StarFill({ filled, partial }: { filled: boolean; partial?: number }) {
  const id = `partial-${Math.random().toString(36).slice(2)}`
  if (partial !== undefined) {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" className="inline-block">
        <defs>
          <linearGradient id={id}>
            <stop offset={`${partial * 100}%`} stopColor="#FBBC04" />
            <stop offset={`${partial * 100}%`} stopColor="#e5e7eb" />
          </linearGradient>
        </defs>
        <polygon
          points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
          fill={`url(#${id})`}
          stroke="none"
        />
      </svg>
    )
  }
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" className="inline-block">
      <polygon
        points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
        fill={filled ? "#FBBC04" : "#e5e7eb"}
        stroke="none"
      />
    </svg>
  )
}

function GoogleStars({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => {
        if (rating >= star) return <StarFill key={star} filled={true} />
        const partial = rating - (star - 1)
        if (partial > 0) return <StarFill key={star} filled={false} partial={partial} />
        return <StarFill key={star} filled={false} />
      })}
    </span>
  )
}

// Google "G" logo SVG
function GoogleG() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  )
}

export function GoogleRating({ name, address }: GoogleRatingProps) {
  const [data, setData] = useState<GoogleRatingData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const params = new URLSearchParams({ name, address })
    fetch(`/api/google-rating?${params}`)
      .then((res) => res.ok ? res.json() : null)
      .then((json) => {
        if (json?.rating) setData(json)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [name, address])

  if (loading) {
    return (
      <div className="h-5 w-48 rounded bg-muted animate-pulse" />
    )
  }

  if (!data) return null

  return (
    <a
      href={data.mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors group"
      aria-label={`${data.rating} stars on Google — read reviews`}
    >
      <GoogleG />
      <GoogleStars rating={data.rating} />
      <span className="font-semibold text-foreground">{data.rating.toFixed(1)}</span>
      <span className="text-muted-foreground">({data.reviewCount.toLocaleString()} Google reviews)</span>
      <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" />
    </a>
  )
}
