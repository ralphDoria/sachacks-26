"use client"

import { useState } from "react"
import Link from "next/link"
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag, MapPin, CreditCard, CheckCircle, Loader2 } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/lib/cart"
import { toast } from "sonner"

export default function CartPage() {
  const items = useCart((s) => s.items)
  const restaurantId = useCart((s) => s.restaurantId)
  const restaurantName = useCart((s) => s.restaurantName)
  const restaurantSlug = useCart((s) => s.restaurantSlug)
  const deliveryFee = useCart((s) => s.deliveryFee)
  const updateQuantity = useCart((s) => s.updateQuantity)
  const removeItem = useCart((s) => s.removeItem)
  const clearCart = useCart((s) => s.clearCart)
  const getTotal = useCart((s) => s.getTotal)

  const [isLoading, setIsLoading] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")

  const subtotal = getTotal()
  const serviceFee = Math.round(subtotal * 0.05 * 100) / 100
  const total = subtotal + deliveryFee + serviceFee

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          restaurantId,
          restaurantSlug,
          cart: items,
          customerInfo: { name, email, phone, address },
          fees: { subtotal, deliveryFee, serviceFee, total },
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error ?? "Checkout failed")
      }
      if (data.url) {
        window.location.href = data.url
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong")
      setIsLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <>
        <SiteHeader />
        <main className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-4 py-24">
            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-muted mx-auto mb-6">
              <ShoppingBag className="w-10 h-10 text-muted-foreground" />
            </div>
            <h1 className="font-serif text-3xl font-bold text-foreground">Your cart is empty</h1>
            <p className="text-muted-foreground mt-3 leading-relaxed">
              Explore local restaurants and add some delicious items to get started.
            </p>
            <Link href="/restaurants" className="mt-8 inline-block">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
                <ArrowLeft className="w-4 h-4" />
                Browse Restaurants
              </Button>
            </Link>
          </div>
        </main>
        <SiteFooter />
      </>
    )
  }

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 py-8">
          <Link href="/restaurants" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Link>

          <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">Your Cart</h1>
          {restaurantName && (
            <p className="text-muted-foreground mt-1">Ordering from <span className="text-foreground font-medium">{restaurantName}</span></p>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            <div className="lg:col-span-2 flex flex-col gap-4">
              <div className="bg-card rounded-xl border border-border overflow-hidden">
                <div className="p-4 bg-muted flex items-center justify-between">
                  <h2 className="font-semibold text-foreground text-sm">Order Items</h2>
                  <Button variant="ghost" size="sm" onClick={clearCart} className="text-destructive hover:text-destructive gap-1 text-xs">
                    <Trash2 className="w-3 h-3" />
                    Clear All
                  </Button>
                </div>
                <div className="divide-y divide-border">
                  {items.map((item) => (
                    <div key={item.menuItem.id} className="flex items-center justify-between p-4 gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-foreground">{item.menuItem.name}</h3>
                        <p className="text-sm text-muted-foreground mt-0.5">${item.menuItem.price.toFixed(2)} each</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 border-border text-foreground"
                          onClick={() => updateQuantity(item.menuItem.id, item.quantity - 1)}
                          aria-label={`Decrease ${item.menuItem.name} quantity`}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="w-8 text-center font-medium text-foreground">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 border-border text-foreground"
                          onClick={() => updateQuantity(item.menuItem.id, item.quantity + 1)}
                          aria-label={`Increase ${item.menuItem.name} quantity`}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                      <div className="w-20 text-right">
                        <span className="font-semibold text-foreground">
                          ${(item.menuItem.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={() => removeItem(item.menuItem.id)}
                        aria-label={`Remove ${item.menuItem.name}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <form onSubmit={handlePlaceOrder} className="bg-card rounded-xl border border-border p-6">
                <h2 className="font-serif text-xl font-semibold text-foreground mb-4">Delivery Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="name" className="text-foreground">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      required
                      className="bg-background text-foreground"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="email" className="text-foreground">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      required
                      className="bg-background text-foreground"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="phone" className="text-foreground">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="(530) 555-0000"
                      required
                      className="bg-background text-foreground"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div className="md:col-span-2 flex flex-col gap-2">
                    <Label htmlFor="address" className="text-foreground">Delivery Address</Label>
                    <Input
                      id="address"
                      placeholder="123 B St, Davis, CA"
                      required
                      className="bg-background text-foreground"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                  <div className="md:col-span-2 flex flex-col gap-2">
                    <Label htmlFor="notes" className="text-foreground">Delivery Notes (optional)</Label>
                    <Input id="notes" placeholder="Apartment number, gate code, etc." className="bg-background text-foreground" />
                  </div>
                </div>

                <Separator className="my-6 bg-border" />

                <Button
                  type="submit"
                  size="lg"
                  disabled={isLoading}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Redirecting to payment...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4" />
                      Place Order - ${total.toFixed(2)}
                    </>
                  )}
                </Button>
              </form>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-card rounded-xl border border-border p-6">
                <h2 className="font-serif text-xl font-semibold text-foreground mb-4">Order Summary</h2>
                <div className="flex flex-col gap-3 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span className="text-foreground">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Delivery Fee</span>
                    <span className="text-foreground">${deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Service Fee (5%)</span>
                    <span className="text-foreground">${serviceFee.toFixed(2)}</span>
                  </div>
                  <Separator className="bg-border" />
                  <div className="flex justify-between font-semibold text-foreground text-base">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/10">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Community Impact</p>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                        By ordering through DDBA, this restaurant saves ${(subtotal * 0.20).toFixed(2)} compared to national delivery apps.
                      </p>
                    </div>
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
