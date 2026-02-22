"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Bike,
  MapPin,
  DollarSign,
  Check,
  User,
  Phone,
  Package,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { supabase } from "@/lib/supabase"

interface RestaurantInfo {
  name: string
  address: string
}

interface Order {
  id: string
  customer_address: string
  delivery_fee: number
  status: string
  restaurants: RestaurantInfo
}

export default function RiderPage() {
  const [riderName, setRiderName] = useState("")
  const [riderPhone, setRiderPhone] = useState("")

  const [availableOrders, setAvailableOrders] = useState<Order[]>([])
  const [claimedOrders, setClaimedOrders] = useState<Order[]>([])

  const [loading, setLoading] = useState(true)
  const [claiming, setClaiming] = useState<string | null>(null)
  const [delivering, setDelivering] = useState<string | null>(null)
  const [formError, setFormError] = useState("")

  const fetchAvailable = useCallback(async (silent = false) => {
    if (!silent) setLoading(true)
    const { data } = await supabase
      .from("orders")
      .select("*, restaurants(name, address)")
      .eq("status", "ready")
      .is("rider_id", null)
      .order("created_at", { ascending: false })
    if (data) setAvailableOrders(data as Order[])
    if (!silent) setLoading(false)
  }, [])

  // Initial fetch + real-time subscription
  useEffect(() => {
    fetchAvailable()

    const channel = supabase
      .channel("rider-board")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "orders" },
        () => fetchAvailable(true)
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "orders" },
        () => fetchAvailable(true)
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [fetchAvailable])

  const claimDelivery = async (order: Order) => {
    if (!riderName.trim() || !riderPhone.trim()) {
      setFormError("Please enter your name and phone number before claiming a delivery.")
      return
    }
    setFormError("")
    setClaiming(order.id)

    try {
      // 1. Insert rider record
      const { data: rider, error: riderError } = await supabase
        .from("riders")
        .insert({ name: riderName.trim(), phone: riderPhone.trim() })
        .select()
        .single()

      if (riderError || !rider) throw new Error("Failed to create rider")

      // 2. Update order: assign rider and mark as claimed
      const { error: orderError } = await supabase
        .from("orders")
        .update({ rider_id: rider.id, status: "claimed" })
        .eq("id", order.id)

      if (orderError) throw new Error("Failed to claim order")

      // 3. Notify backend
      await fetch("/api/notify-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: order.id, riderName: riderName.trim() }),
      })

      // 4. Optimistically update UI
      setAvailableOrders((prev) => prev.filter((o) => o.id !== order.id))
      setClaimedOrders((prev) => [...prev, order])
    } catch (err) {
      console.error(err)
    } finally {
      setClaiming(null)
    }
  }

  const confirmDelivery = async (orderId: string) => {
    setDelivering(orderId)
    await supabase.from("orders").update({ status: "delivered" }).eq("id", orderId)
    setClaimedOrders((prev) => prev.filter((o) => o.id !== orderId))
    setDelivering(null)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
        <div className="mx-auto max-w-4xl flex items-center justify-between px-4 py-3 lg:px-8">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Site</span>
            </Link>
            <Separator orientation="vertical" className="h-6 bg-border" />
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary">
                <Bike className="w-4 h-4 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-sm font-semibold text-foreground leading-none">Rider Board</h1>
                <p className="text-[10px] text-muted-foreground">Available deliveries</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs text-muted-foreground hidden sm:inline">Live</span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 lg:px-8 py-8 flex flex-col gap-8">
        {/* Rider info form */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-4">
            <CardTitle className="text-foreground font-serif text-lg">Your Info</CardTitle>
            <p className="text-sm text-muted-foreground">
              Fill in your details before claiming a delivery.
            </p>
          </CardHeader>
          <CardContent>
            {formError && (
              <p className="text-sm text-destructive mb-4 p-3 rounded-md bg-destructive/5 border border-destructive/20">
                {formError}
              </p>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="rider-name" className="text-foreground text-sm">
                  Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  <Input
                    id="rider-name"
                    placeholder="Your full name"
                    value={riderName}
                    onChange={(e) => setRiderName(e.target.value)}
                    className="pl-9 bg-background border-border"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="rider-phone" className="text-foreground text-sm">
                  Phone
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  <Input
                    id="rider-phone"
                    type="tel"
                    placeholder="(555) 000-0000"
                    value={riderPhone}
                    onChange={(e) => setRiderPhone(e.target.value)}
                    className="pl-9 bg-background border-border"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* My claimed deliveries */}
        {claimedOrders.length > 0 && (
          <section>
            <h2 className="font-semibold text-foreground flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              My Deliveries ({claimedOrders.length})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {claimedOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-card rounded-lg border border-blue-500/20 p-4 flex flex-col gap-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-muted-foreground">
                      #{order.id.slice(0, 8)}
                    </span>
                    <Badge
                      variant="outline"
                      className="text-[10px] bg-blue-500/10 text-blue-500 border-blue-500/20"
                    >
                      Claimed
                    </Badge>
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="flex items-start gap-2">
                      <Package className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {order.restaurants.name}
                        </p>
                        <p className="text-xs text-muted-foreground">{order.restaurants.address}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-medium text-muted-foreground">Drop-off</p>
                        <p className="text-sm text-muted-foreground">{order.customer_address}</p>
                      </div>
                    </div>
                  </div>

                  <Separator className="bg-border" />

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-primary">
                      Earn ${order.delivery_fee.toFixed(2)}
                    </span>
                    <Button
                      size="sm"
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                      onClick={() => confirmDelivery(order.id)}
                      disabled={delivering === order.id}
                    >
                      <Check className="w-3 h-3 mr-1" />
                      {delivering === order.id ? "Confirming…" : "Confirm Delivery"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Available deliveries */}
        <section>
          <h2 className="font-semibold text-foreground flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Available Deliveries ({availableOrders.length})
          </h2>

          {loading ? (
            <p className="text-sm text-muted-foreground text-center py-12">
              Loading deliveries…
            </p>
          ) : availableOrders.length === 0 ? (
            <div className="bg-card rounded-lg border border-border p-12 text-center">
              <Bike className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-sm font-medium text-foreground mb-1">
                No deliveries available right now
              </p>
              <p className="text-xs text-muted-foreground">
                New orders will appear here automatically when restaurants mark them ready.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {availableOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-card rounded-lg border border-border p-4 flex flex-col gap-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-muted-foreground">
                      #{order.id.slice(0, 8)}
                    </span>
                    <Badge
                      variant="outline"
                      className="text-[10px] bg-chart-1/10 text-chart-1 border-chart-1/20"
                    >
                      Ready for Pickup
                    </Badge>
                  </div>

                  <div className="flex flex-col gap-2">
                    {/* Pickup */}
                    <div className="flex items-start gap-2">
                      <Package className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {order.restaurants.name}
                        </p>
                        <p className="text-xs text-muted-foreground">{order.restaurants.address}</p>
                      </div>
                    </div>

                    {/* Drop-off */}
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-medium text-muted-foreground">Drop-off</p>
                        <p className="text-sm text-muted-foreground">{order.customer_address}</p>
                      </div>
                    </div>
                  </div>

                  <Separator className="bg-border" />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-primary font-semibold">
                      <DollarSign className="w-4 h-4" />
                      <span className="text-sm">Earn ${order.delivery_fee.toFixed(2)}</span>
                    </div>
                    <Button
                      size="sm"
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                      onClick={() => claimDelivery(order)}
                      disabled={claiming === order.id}
                    >
                      {claiming === order.id ? "Claiming…" : "Claim This Delivery"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}
