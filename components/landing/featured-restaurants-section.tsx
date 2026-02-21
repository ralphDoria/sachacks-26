import Link from "next/link"
import Image from "next/image"
import { Star, Clock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getFeaturedRestaurants } from "@/lib/data"

export function FeaturedRestaurantsSection() {
  const featured = getFeaturedRestaurants()

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
          {featured.map((restaurant) => (
            <Link
              key={restaurant.id}
              href={`/restaurants/${restaurant.slug}`}
              className="group bg-card rounded-xl overflow-hidden border border-border hover:border-primary/30 transition-all hover:shadow-lg"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={restaurant.image}
                  alt={restaurant.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-3 right-3 bg-card/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-accent fill-accent" />
                  <span className="text-xs font-semibold text-foreground">{restaurant.rating}</span>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-foreground group-hover:text-primary transition-colors">{restaurant.name}</h3>
                    <p className="text-sm text-muted-foreground mt-0.5">{restaurant.cuisine}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2 leading-relaxed">{restaurant.description}</p>
                <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{restaurant.deliveryTime}</span>
                  </div>
                  <span className="text-xs text-primary font-medium">
                    ${restaurant.deliveryFee.toFixed(2)} delivery
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
