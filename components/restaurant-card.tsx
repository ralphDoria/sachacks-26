import Link from "next/link"
import Image from "next/image"
import { Clock } from "lucide-react"
import type { Restaurant } from "@/lib/data"

export function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  return (
    <Link
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
        <div className="absolute top-3 left-3 bg-card/90 backdrop-blur-sm rounded-full px-3 py-1">
          <span className="text-xs font-medium text-primary">{restaurant.cuisine}</span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-serif text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
          {restaurant.name}
        </h3>
        <p className="text-sm text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
          {restaurant.description}
        </p>
        <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="w-3.5 h-3.5" />
            <span>{restaurant.deliveryTime}</span>
          </div>
          <span className="text-xs text-primary font-medium">
            ${restaurant.deliveryFee.toFixed(2)} delivery
          </span>
          <span className="text-xs text-muted-foreground ml-auto">
            {restaurant.address.split(",")[0]}
          </span>
        </div>
      </div>
    </Link>
  )
}
