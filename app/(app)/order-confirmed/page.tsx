"use client"

import { Suspense, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { CheckCircle2, MapPin, ArrowLeft, Loader2, Package, Navigation } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { supabase } from "@/lib/supabase"

interface OrderItem {
  menuItem: { id: string; name: string; price: number }
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
  restaurants: { name: string; address: string } | null
}

function OrderConfirmedContent() {
  const params = useSearchParams()
  const orderId = params.get("orderId")

  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!orderId) {
      setError("No order ID provided.")
      setLoading(false)
      return
    }

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
  }, [orderId])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-4">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
        <p className="text-muted-foreground text-sm">Loading your order…</p>
      </div>
    )
  }

  if (error || !order) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-4 text-center">
        <Package className="w-14 h-14 text-muted-foreground" />
        <h1 className="font-serif text-2xl font-bold text-foreground">Order not found</h1>
        <p className="text-muted-foreground max-w-sm">{error ?? "We couldn't locate this order. Please contact support if you believe this is an error."}</p>
        <Link href="/">
          <Button variant="outline" className="mt-2 gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </Link>
      </div>
    )
  }

  const shortId = order.id.slice(0, 8).toUpperCase()

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      {/* Success header */}
      <div className="flex flex-col items-center text-center mb-10">
        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-5">
          <CheckCircle2 className="w-10 h-10 text-primary" />
        </div>
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">Order placed!</h1>
        <p className="text-muted-foreground mt-2 text-sm">
          Order{" "}
          <span className="font-mono font-semibold text-foreground tracking-widest">#{shortId}</span>
        </p>
        <p className="text-muted-foreground mt-1 text-sm">
          You&apos;ll receive a confirmation email shortly.
        </p>
      </div>

      {/* Order card */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        {/* Restaurant & delivery info */}
        <div className="p-5 bg-muted flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex items-start gap-3 flex-1">
            <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="min-w-0">
              {order.restaurants && (
                <p className="font-semibold text-foreground">{order.restaurants.name}</p>
              )}
              <p className="text-sm text-muted-foreground truncate">
                Delivering to: {order.customer_address}
              </p>
            </div>
          </div>
          <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary capitalize self-start sm:self-auto">
            {order.status}
          </span>
        </div>

        {/* Items */}
        <div className="divide-y divide-border">
          {order.items.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between px-5 py-3 gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-muted text-xs font-semibold text-muted-foreground flex-shrink-0">
                  {item.quantity}
                </span>
                <span className="font-medium text-foreground truncate">{item.menuItem.name}</span>
              </div>
              <span className="text-sm font-semibold text-foreground flex-shrink-0">
                ${(item.menuItem.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        {/* Fee breakdown */}
        <div className="px-5 py-5 flex flex-col gap-2.5">
          <Separator className="mb-1" />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Subtotal</span>
            <span className="text-foreground">${order.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Delivery fee</span>
            <span className="text-foreground">${order.delivery_fee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Service fee (5%)</span>
            <span className="text-foreground">${order.service_fee.toFixed(2)}</span>
          </div>
          <Separator className="my-1" />
          <div className="flex justify-between font-semibold text-foreground">
            <span>Total</span>
            <span>${order.total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
        <Link href={`/order-tracking/${order.id}`}>
          <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto">
            <Navigation className="w-4 h-4" />
            Track Your Order
          </Button>
        </Link>
        <Link href="/">
          <Button variant="outline" className="gap-2 w-full sm:w-auto">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default function OrderConfirmedPage() {
  return (
    <main className="bg-background">
      <Suspense
        fallback={
          <div className="flex items-center justify-center py-32">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
          </div>
        }
      >
        <OrderConfirmedContent />
      </Suspense>
    </main>
  )
}
