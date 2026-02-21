"use client"

import { use, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Star, Clock, MapPin, Phone, ArrowLeft, ShoppingBag } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { MenuItemCard } from "@/components/menu-item-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getRestaurant, getCategories } from "@/lib/data"
import { useCart } from "@/lib/cart"
import { notFound } from "next/navigation"

export default function RestaurantPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const restaurant = getRestaurant(slug)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const cartItemCount = useCart((s) => s.getItemCount())
  const cartTotal = useCart((s) => s.getTotal())

  if (!restaurant) {
    notFound()
  }

  const categories = getCategories(restaurant.menu)
  const filteredMenu = activeCategory
    ? restaurant.menu.filter((item) => item.category === activeCategory)
    : restaurant.menu

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-background">
        <div className="relative h-64 md:h-80">
          <Image
            src={restaurant.image}
            alt={restaurant.name}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-foreground/60" />
          <div className="absolute inset-0 flex items-end">
            <div className="mx-auto max-w-7xl w-full px-4 lg:px-8 pb-8">
              <Link href="/restaurants" className="inline-flex items-center gap-1 text-sm text-background/80 hover:text-background mb-4 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                All Restaurants
              </Link>
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-background">
                {restaurant.name}
              </h1>
              <p className="text-background/70 mt-1">{restaurant.cuisine}</p>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-card rounded-xl border border-border p-6 mb-6">
                <p className="text-muted-foreground leading-relaxed">{restaurant.description}</p>
                <div className="flex flex-wrap items-center gap-6 mt-4 pt-4 border-t border-border">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-accent fill-accent" />
                    <span className="font-semibold text-foreground">{restaurant.rating}</span>
                    <span className="text-sm text-muted-foreground">({restaurant.reviewCount} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    {restaurant.deliveryTime}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    {restaurant.address}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Phone className="w-4 h-4" />
                    {restaurant.phone}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                <Button
                  variant={activeCategory === null ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveCategory(null)}
                  className={
                    activeCategory === null
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground border-border"
                  }
                >
                  All
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={activeCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveCategory(category)}
                    className={
                      activeCategory === category
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground border-border"
                    }
                  >
                    {category}
                  </Button>
                ))}
              </div>

              <div className="flex flex-col gap-3">
                {filteredMenu.map((item) => (
                  <MenuItemCard
                    key={item.id}
                    item={item}
                    restaurantId={restaurant.id}
                    restaurantName={restaurant.name}
                  />
                ))}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-card rounded-xl border border-border p-6">
                <h2 className="font-serif text-xl font-semibold text-foreground mb-4">Your Order</h2>
                {cartItemCount === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingBag className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
                    <p className="text-sm text-muted-foreground">Your cart is empty</p>
                    <p className="text-xs text-muted-foreground mt-1">Add items from the menu to get started</p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{cartItemCount} items</span>
                      <span className="font-semibold text-foreground">${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Delivery</span>
                      <span className="text-foreground">${restaurant.deliveryFee.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between font-semibold text-foreground pt-3 border-t border-border">
                      <span>Total</span>
                      <span>${(cartTotal + restaurant.deliveryFee).toFixed(2)}</span>
                    </div>
                    <Link href="/cart">
                      <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
                        <ShoppingBag className="w-4 h-4" />
                        View Cart
                      </Button>
                    </Link>
                  </div>
                )}

                <div className="mt-6 pt-6 border-t border-border">
                  <h3 className="text-sm font-semibold text-foreground mb-2">Restaurant Info</h3>
                  <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 flex-shrink-0" />
                      <span>{restaurant.hours}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 flex-shrink-0" />
                      <span>{restaurant.address}</span>
                    </div>
                    <Badge variant="outline" className="w-fit text-primary border-primary/30 mt-1">
                      {restaurant.deliveryFee === 0 ? "Free Delivery" : `$${restaurant.deliveryFee.toFixed(2)} delivery`}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
