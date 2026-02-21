'use client'

import Link from "next/link"
import Image from "next/image"
import { Star, Clock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

interface Restaurant {
  id: string
  name: string
  address: string
  phone: string
  created_at: string
}

export function FeaturedRestaurantsSection() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchRestaurants() {
      try {
        const { data, error } = await supabase
          .from('restaurants')
          .select('*')
          .limit(3)

        if (error) {
          console.error('Error fetching restaurants:', error)
          setLoading(false)
          return
        }

        setRestaurants(data || [])
      } catch (err) {
        console.error('Error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchRestaurants()
  }, [])

  if (loading) {
    return (
      <section className="py-24 bg-muted/50">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center">Loading restaurants...</div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-24 bg-muted/50">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-xs uppercase tracking-widest text-primary font-medium">Featured</span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mt-3 text-foreground text-balance">
              Local favorites
            </h2>
            <p className="mt-3 text-muted-foreground max-w-lg leading-relaxed">
              Hand-picked restaurants that make downtown Davis special.
            </p>
          </div>
          <Link href="/restaurants">
            <Button variant="outline" className="gap-2 text-foreground border-border">
              View All
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.map((restaurant) => (
            <Link
              key={restaurant.id}
              href={`/order/${restaurant.id}`}
              className="group bg-card rounded-xl overflow-hidden border border-border hover:border-primary/30 transition-all hover:shadow-lg"
            >
              <div className="relative aspect-[16/10] bg-muted flex items-center justify-center">
                <div className="text-muted-foreground text-sm">Restaurant image</div>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-foreground group-hover:text-primary transition-colors">{restaurant.name}</h3>
                    <p className="text-sm text-muted-foreground mt-0.5">{restaurant.address}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3.5 h-3.5" />
                    <span>20-30 min</span>
                  </div>
                  <span className="text-xs text-primary font-medium">
                    $5.00 delivery
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
