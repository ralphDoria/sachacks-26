"use client"

import { useState, useMemo, useEffect } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { RestaurantCard } from "@/components/restaurant-card"
import { supabase } from "@/lib/supabase"
import type { Restaurant } from "@/lib/data"

interface RestaurantGridProps {
  limit?: number
  showFilters?: boolean
}

export function RestaurantGrid({ limit, showFilters = false }: RestaurantGridProps) {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [activeCuisine, setActiveCuisine] = useState("All")

  useEffect(() => {
    async function fetchRestaurants() {
      let query = supabase
        .from("restaurants")
        .select("*")
        .order("name", { ascending: true })

      if (limit) {
        query = query.limit(limit)
      }

      const { data, error } = await query

      if (error) {
        console.error("Error fetching restaurants:", error)
        setLoading(false)
        return
      }

      const mapped = (data || []).map((r: any) => ({
        id: r.id,
        name: r.name,
        slug: r.slug,
        description: r.description || "",
        cuisine: r.cuisine || "Other",
        image: r.image_url || "/images/placeholder.jpg",
        rating: r.rating || 4.5,
        reviewCount: r.review_count || 0,
        deliveryFee: r.delivery_fee || 3.99,
        deliveryTime: r.delivery_time || "25-35 min",
        address: r.address || "",
        phone: r.phone || "",
        hours: r.hours || "",
        featured: r.featured || false,
        menu: [],
      }))

      setRestaurants(mapped)
      setLoading(false)
    }

    fetchRestaurants()
  }, [limit])

  const cuisines = ["All", ...Array.from(new Set(restaurants.map((r) => r.cuisine)))]

  const filtered = useMemo(() => {
    if (!showFilters) return restaurants
    return restaurants.filter((r) => {
      const matchSearch =
        r.name.toLowerCase().includes(search.toLowerCase()) ||
        r.cuisine.toLowerCase().includes(search.toLowerCase())
      const matchCuisine = activeCuisine === "All" || r.cuisine === activeCuisine
      return matchSearch && matchCuisine
    })
  }, [search, activeCuisine, restaurants, showFilters])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(limit ?? 3)].map((_, i) => (
          <div key={i} className="bg-card rounded-xl border border-border h-64 animate-pulse" />
        ))}
      </div>
    )
  }

  return (
    <div>
      {showFilters && (
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center mb-8">
          <div className="relative w-full md:max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search restaurants or cuisines..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-card text-foreground placeholder:text-muted-foreground"
              aria-label="Search restaurants"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {cuisines.map((cuisine) => (
              <Button
                key={cuisine}
                variant={activeCuisine === cuisine ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCuisine(cuisine)}
                className={
                  activeCuisine === cuisine
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground border-border"
                }
              >
                {cuisine}
              </Button>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>

      {showFilters && filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-lg text-muted-foreground">No restaurants found matching your search.</p>
          <Button
            variant="link"
            onClick={() => { setSearch(""); setActiveCuisine("All") }}
            className="mt-2 text-primary"
          >
            Clear filters
          </Button>
        </div>
      )}
    </div>
  )
}
