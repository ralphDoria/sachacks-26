"use client"

import { useState, useMemo } from "react"
import { Search } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { RestaurantCard } from "@/components/restaurant-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { restaurants } from "@/lib/data"

const cuisines = ["All", ...Array.from(new Set(restaurants.map((r) => r.cuisine)))]

export default function RestaurantsPage() {
  const [search, setSearch] = useState("")
  const [activeCuisine, setActiveCuisine] = useState("All")

  const filtered = useMemo(() => {
    return restaurants.filter((r) => {
      const matchSearch =
        r.name.toLowerCase().includes(search.toLowerCase()) ||
        r.cuisine.toLowerCase().includes(search.toLowerCase())
      const matchCuisine = activeCuisine === "All" || r.cuisine === activeCuisine
      return matchSearch && matchCuisine
    })
  }, [search, activeCuisine])

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-background">
        <div className="bg-foreground text-background py-16">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-balance">
              Downtown Davis Restaurants
            </h1>
            <p className="mt-3 text-lg opacity-70 max-w-xl leading-relaxed">
              Browse menus from local restaurants committed to keeping downtown thriving.
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
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

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground">No restaurants found matching your search.</p>
              <Button variant="link" onClick={() => { setSearch(""); setActiveCuisine("All") }} className="mt-2 text-primary">
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
