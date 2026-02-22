"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import {
  CheckCircle2,
  Clock,
  MapPin,
  Package,
  Bike,
  Loader2,
  ArrowLeft,
  ChefHat,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { supabase } from "@/lib/supabase"

interface OrderItem {
  menuItem: { name: string; price: number }
  quantity: number
}

interface Order {
  id: string
  customer_name: string
  customer_address: string
  items: OrderItem[]
  subtotal: number
  delivery_fee: number
  service_fee: number
  total: number
  status: string
  created_at: string
  restaurants: { name: string; address: string } | null
}

type StatusKey = "pending" | "confirmed" | "ready" | "claimed" | "delivered"

const steps: { key: StatusKey; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { key: "pending", label: "Order Placed", icon: Package },
  { key: "confirmed", label: "Confirmed", icon: ChefHat },
  { key: "ready", label: "Ready for Pickup", icon: Clock },
  { key: "claimed", label: "Out for Delivery", icon: Bike },
  { key: "delivered", label: "Delivered", icon: CheckCircle2 },
]

const statusOrder: Record<StatusKey, number> = {
  pending: 0,
  confirmed: 1,
  ready: 2,
  claimed: 3,
  delivered: 4,
}

export default function OrderTrackingPage() {
  const params = useParams()
  const orderId = params.orderId as string

  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!orderId) return

    supabase
      .from("orders")
      .select("*, restaurants(name, address)")
      .eq("id", orderId)
      .single()
      .then(({ data, error: err }) => {
        if (err || !data) {
          setError("Order not found.")
        } else {
          setOrder(data as Order)
        }
        setLoading(false)
      })

    const channel = supabase
      .channel(`order-tracking-${orderId}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "orders",
          filter: `id=eq.${orderId}`,
        },
        (payload) => {
          setOrder((prev) => prev ? { ...prev, ...payload.new } : prev)
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [orderId])

  if (loading) {
    return (
      <main className="bg-background flex items-center justify-center py-32">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </main>
    )
  }

  if (error || !order) {
    return (
      <main className="bg-background flex flex-col items-center justify-center gap-4 text-center px-4 py-32">
        <Package className="w-14 h-14 text-muted-foreground" />
        <h1 className="font-serif text-2xl font-bold text-foreground">Order not found</h1>
        <p className="text-muted-foreground max-w-sm">{error ?? "We couldn't locate this order."}</p>
        <Link href="/">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </Link>
      </main>
    )
  }

  const currentStep = statusOrder[order.status as StatusKey] ?? 0
  const shortId = order.id.slice(0, 8).toUpperCase()
  const isDelivered = order.status === "delivered"

  return (
    <main className="bg-background">
      <div className="mx-auto max-w-2xl px-4 py-12">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <div
            className={`flex items-center justify-center w-20 h-20 rounded-full mb-5 ${
              isDelivered ? "bg-primary/10" : "bg-accent/10"
            }`}
          >
            {isDelivered ? (
              <CheckCircle2 className="w-10 h-10 text-primary" />
            ) : (
              <Bike className="w-10 h-10 text-accent animate-pulse" />
            )}
          </div>
          <h1 className="font-serif text-3xl font-bold text-foreground">
            {isDelivered ? "Delivered!" : "Tracking your order"}
          </h1>
          <p className="text-muted-foreground mt-2 text-sm">
            Order{" "}
            <span className="font-mono font-semibold text-foreground tracking-widest">
              #{shortId}
            </span>
          </p>
          {!isDelivered && (
            <div className="flex items-center gap-1.5 mt-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs text-muted-foreground">Live updates</span>
            </div>
          )}
        </div>

        {/* Status stepper */}
        <div className="bg-card rounded-xl border border-border p-6 mb-6">
          <div className="relative">
            {steps.map((step, idx) => {
              const Icon = step.icon
              const done = currentStep > idx
              const active = currentStep === idx
              const isLast = idx === steps.length - 1

              return (
                <div key={step.key} className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={`flex items-center justify-center w-9 h-9 rounded-full border-2 transition-all ${
                        done
                          ? "bg-primary border-primary"
                          : active
                          ? "border-primary bg-primary/10"
                          : "border-border bg-background"
                      }`}
                    >
                      <Icon
                        className={`w-4 h-4 ${
                          done
                            ? "text-primary-foreground"
                            : active
                            ? "text-primary"
                            : "text-muted-foreground"
                        }`}
                      />
                    </div>
                    {!isLast && (
                      <div
                        className={`w-0.5 h-8 my-1 transition-all ${
                          done ? "bg-primary" : "bg-border"
                        }`}
                      />
                    )}
                  </div>
                  <div className="pb-2 pt-1.5">
                    <p
                      className={`text-sm font-medium ${
                        done || active ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {step.label}
                    </p>
                    {active && !isDelivered && (
                      <p className="text-xs text-primary mt-0.5">Current status</p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Delivery addresses */}
        <div className="bg-card rounded-xl border border-border p-5 mb-6 flex flex-col gap-4">
          {order.restaurants && (
            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 flex-shrink-0 mt-0.5">
                <Package className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Pickup</p>
                <p className="font-semibold text-foreground">{order.restaurants.name}</p>
                <p className="text-sm text-muted-foreground">{order.restaurants.address}</p>
              </div>
            </div>
          )}
          <Separator />
          <div className="flex items-start gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-accent/10 flex-shrink-0 mt-0.5">
              <MapPin className="w-4 h-4 text-accent" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Dropoff</p>
              <p className="font-semibold text-foreground">{order.customer_name}</p>
              <p className="text-sm text-muted-foreground">{order.customer_address}</p>
            </div>
          </div>
        </div>

        {/* Order summary */}
        <div className="bg-card rounded-xl border border-border overflow-hidden mb-8">
          <div className="px-5 py-4 bg-muted">
            <p className="text-sm font-semibold text-foreground">Order Summary</p>
          </div>
          <div className="divide-y divide-border">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between px-5 py-3 gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-muted text-xs font-semibold text-muted-foreground flex-shrink-0">
                    {item.quantity}
                  </span>
                  <span className="text-sm font-medium text-foreground truncate">{item.menuItem.name}</span>
                </div>
                <span className="text-sm font-semibold text-foreground flex-shrink-0">
                  ${(item.menuItem.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
          <div className="px-5 py-4 border-t border-border flex flex-col gap-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Subtotal</span>
              <span>${order.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Delivery fee</span>
              <span>${order.delivery_fee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Service fee</span>
              <span>${order.service_fee.toFixed(2)}</span>
            </div>
            <Separator className="my-1" />
            <div className="flex justify-between font-semibold text-foreground">
              <span>Total</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <Link href="/">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
