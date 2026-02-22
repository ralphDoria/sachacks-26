"use client"

import { RestaurantGrid } from "@/components/restaurants/restaurant-grid"

export default function RestaurantsPage() {
  return (
    <main className="bg-background">
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
        <RestaurantGrid showFilters />
      </div>
    </main>
  )
}
