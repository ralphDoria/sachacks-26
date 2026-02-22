"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import {
  DollarSign,
  ShoppingBag,
  TrendingUp,
  Clock,
  Check,
  MapPin,
  ArrowLeft,
  Users,
  BarChart3,
  Settings,
  UtensilsCrossed,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { supabase } from "@/lib/supabase"

interface Restaurant {
  id: string
  name: string
}

// CartItem shape stored in Supabase JSONB
interface StoredItem {
  menuItem: { name: string; price: number }
  quantity: number
}

type OrderStatus = "pending" | "confirmed" | "ready" | "claimed" | "delivered"

interface Order {
  id: string
  customer_name: string
  customer_address: string
  items: StoredItem[]
  subtotal: number
  delivery_fee: number
  service_fee: number
  total: number
  status: OrderStatus
  created_at: string
}

const statusColors: Record<OrderStatus, string> = {
  pending: "bg-accent/10 text-accent border-accent/20",
  confirmed: "bg-primary/10 text-primary border-primary/20",
  ready: "bg-chart-1/10 text-chart-1 border-chart-1/20",
  claimed: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  delivered: "bg-muted text-muted-foreground border-border",
}

const statusLabels: Record<OrderStatus, string> = {
  pending: "New Order",
  confirmed: "Confirmed",
  ready: "Ready for Pickup",
  claimed: "Claimed",
  delivered: "Delivered",
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return "just now"
  if (mins < 60) return `${mins} min ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs} hr ago`
  return `${Math.floor(hrs / 24)} days ago`
}

export default function DashboardPage() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [restaurantId, setRestaurantId] = useState<string | null>(null)
  const [restaurantName, setRestaurantName] = useState<string>("")
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(false)

  // Fetch restaurant list once on mount
  useEffect(() => {
    supabase
      .from("restaurants")
      .select("id, name")
      .then(({ data }) => {
        if (data) setRestaurants(data as Restaurant[])
      })
  }, [])

  const fetchOrders = useCallback(async (rid: string, silent = false) => {
    if (!silent) setLoading(true)
    const { data } = await supabase
      .from("orders")
      .select(
        "id, customer_name, customer_address, items, subtotal, delivery_fee, service_fee, total, status, created_at"
      )
      .eq("restaurant_id", rid)
      .neq("status", "delivered")
      .order("created_at", { ascending: false })
    if (data) setOrders(data as Order[])
    if (!silent) setLoading(false)
  }, [])

  // Subscribe to real-time changes whenever restaurantId changes
  useEffect(() => {
    if (!restaurantId) return

    fetchOrders(restaurantId)

    const channel = supabase
      .channel(`orders-restaurant-${restaurantId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "orders",
          filter: `restaurant_id=eq.${restaurantId}`,
        },
        () => fetchOrders(restaurantId, true)
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "orders",
          filter: `restaurant_id=eq.${restaurantId}`,
        },
        () => fetchOrders(restaurantId, true)
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [restaurantId, fetchOrders])

  const updateOrderStatus = async (id: string, newStatus: OrderStatus) => {
    // Optimistic update
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
    )
    await supabase.from("orders").update({ status: newStatus }).eq("id", id)
  }

  const pendingOrders = orders.filter((o) => o.status === "pending")
  const inProgressOrders = orders.filter(
    (o) => o.status === "confirmed" || o.status === "ready"
  )
  const claimedOrders = orders.filter((o) => o.status === "claimed")

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0)
  const totalOrders = orders.length
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
        <div className="mx-auto max-w-7xl flex items-center justify-between px-4 py-3 lg:px-8">
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
                <UtensilsCrossed className="w-4 h-4 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-sm font-semibold text-foreground leading-none">
                  {restaurantName || "Select a Restaurant"}
                </h1>
                <p className="text-[10px] text-muted-foreground">Restaurant Dashboard</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Select
              value={restaurantId ?? ""}
              onValueChange={(val) => {
                setRestaurantId(val)
                const r = restaurants.find((r) => r.id === val)
                setRestaurantName(r?.name ?? "")
              }}
            >
              <SelectTrigger className="w-52 h-8 text-xs bg-muted border-border">
                <SelectValue placeholder="Select restaurant…" />
              </SelectTrigger>
              <SelectContent>
                {restaurants.map((r) => (
                  <SelectItem key={r.id} value={r.id} className="text-xs">
                    {r.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {restaurantId && (
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-xs text-muted-foreground hidden sm:inline">Live</span>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 lg:px-8 py-8">
        {!restaurantId ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <UtensilsCrossed className="w-12 h-12 text-muted-foreground mb-4" />
            <h2 className="text-lg font-semibold text-foreground mb-2">Select a Restaurant</h2>
            <p className="text-sm text-muted-foreground">
              Choose a restaurant from the dropdown above to view its dashboard.
            </p>
          </div>
        ) : (
          <>
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Card className="bg-card border-border">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Active Revenue</CardTitle>
                  <DollarSign className="w-4 h-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold font-serif text-foreground">
                    ${totalRevenue.toFixed(2)}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">From open orders</p>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Active Orders</CardTitle>
                  <ShoppingBag className="w-4 h-4 text-accent" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold font-serif text-foreground">{totalOrders}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {pendingOrders.length} pending
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Order Value</CardTitle>
                  <TrendingUp className="w-4 h-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold font-serif text-foreground">
                    ${avgOrderValue.toFixed(2)}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Across active orders</p>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Savings vs. DoorDash</CardTitle>
                  <BarChart3 className="w-4 h-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold font-serif text-primary">
                    ${(totalRevenue * 0.2).toFixed(2)}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Saved with 5% vs 25% fees</p>
                </CardContent>
              </Card>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="orders" className="w-full">
              <TabsList className="bg-muted">
                <TabsTrigger
                  value="orders"
                  className="gap-1 data-[state=active]:bg-card data-[state=active]:text-foreground"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Orders
                  {pendingOrders.length > 0 && (
                    <Badge className="ml-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] bg-accent text-accent-foreground border-0">
                      {pendingOrders.length}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger
                  value="analytics"
                  className="gap-1 data-[state=active]:bg-card data-[state=active]:text-foreground"
                >
                  <BarChart3 className="w-4 h-4" />
                  Analytics
                </TabsTrigger>
                <TabsTrigger
                  value="settings"
                  className="gap-1 data-[state=active]:bg-card data-[state=active]:text-foreground"
                >
                  <Settings className="w-4 h-4" />
                  Settings
                </TabsTrigger>
              </TabsList>

              <TabsContent value="orders" className="mt-6">
                {loading ? (
                  <p className="text-sm text-muted-foreground text-center py-12">
                    Loading orders…
                  </p>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Incoming */}
                    <div className="flex flex-col gap-4">
                      <h2 className="font-semibold text-foreground flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-accent" />
                        Incoming ({pendingOrders.length})
                      </h2>
                      {pendingOrders.map((order) => (
                        <OrderCard
                          key={order.id}
                          order={order}
                          onUpdateStatus={updateOrderStatus}
                        />
                      ))}
                      {pendingOrders.length === 0 && (
                        <p className="text-sm text-muted-foreground bg-card rounded-lg border border-border p-6 text-center">
                          No pending orders
                        </p>
                      )}
                    </div>

                    {/* Active */}
                    <div className="flex flex-col gap-4">
                      <h2 className="font-semibold text-foreground flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        Active ({inProgressOrders.length})
                      </h2>
                      {inProgressOrders.map((order) => (
                        <OrderCard
                          key={order.id}
                          order={order}
                          onUpdateStatus={updateOrderStatus}
                        />
                      ))}
                      {inProgressOrders.length === 0 && (
                        <p className="text-sm text-muted-foreground bg-card rounded-lg border border-border p-6 text-center">
                          No active orders
                        </p>
                      )}
                    </div>

                    {/* Claimed */}
                    <div className="flex flex-col gap-4">
                      <h2 className="font-semibold text-foreground flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-muted-foreground" />
                        Claimed ({claimedOrders.length})
                      </h2>
                      {claimedOrders.map((order) => (
                        <OrderCard
                          key={order.id}
                          order={order}
                          onUpdateStatus={updateOrderStatus}
                        />
                      ))}
                      {claimedOrders.length === 0 && (
                        <p className="text-sm text-muted-foreground bg-card rounded-lg border border-border p-6 text-center">
                          No claimed orders
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="analytics" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-card border-border">
                    <CardHeader>
                      <CardTitle className="text-foreground font-serif">Weekly Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col gap-4">
                        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => {
                          const values = [120, 145, 98, 167, 189, 234, 201]
                          const max = 234
                          return (
                            <div key={day} className="flex items-center gap-3">
                              <span className="text-xs text-muted-foreground w-8">{day}</span>
                              <div className="flex-1 bg-muted rounded-full h-3 overflow-hidden">
                                <div
                                  className="bg-primary h-full rounded-full transition-all"
                                  style={{ width: `${(values[i] / max) * 100}%` }}
                                />
                              </div>
                              <span className="text-xs font-medium text-foreground w-10 text-right">
                                ${values[i]}
                              </span>
                            </div>
                          )
                        })}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-card border-border">
                    <CardHeader>
                      <CardTitle className="text-foreground font-serif">Fee Comparison</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col gap-6">
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-muted-foreground">DoorDash (25-30%)</span>
                            <span className="text-destructive font-medium">-$289.50</span>
                          </div>
                          <div className="bg-muted rounded-full h-3 overflow-hidden">
                            <div className="bg-destructive/60 h-full rounded-full" style={{ width: "100%" }} />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-muted-foreground">DDBA Local (5%)</span>
                            <span className="text-primary font-medium">-$57.90</span>
                          </div>
                          <div className="bg-muted rounded-full h-3 overflow-hidden">
                            <div className="bg-primary h-full rounded-full" style={{ width: "20%" }} />
                          </div>
                        </div>
                        <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
                          <p className="text-sm font-medium text-foreground">You saved $231.60 this week</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            by using DDBA instead of national delivery apps
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-card border-border">
                    <CardHeader>
                      <CardTitle className="text-foreground font-serif">Top Items</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col gap-3">
                        {[
                          { name: "Pad Thai", orders: 42, revenue: 627.9 },
                          { name: "Green Curry", orders: 35, revenue: 558.25 },
                          { name: "Mango Sticky Rice", orders: 28, revenue: 222.6 },
                          { name: "Spring Rolls", orders: 25, revenue: 173.75 },
                        ].map((item) => (
                          <div
                            key={item.name}
                            className="flex items-center justify-between py-2 border-b border-border last:border-0"
                          >
                            <div>
                              <p className="text-sm font-medium text-foreground">{item.name}</p>
                              <p className="text-xs text-muted-foreground">{item.orders} orders</p>
                            </div>
                            <span className="text-sm font-semibold text-foreground">
                              ${item.revenue.toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-card border-border">
                    <CardHeader>
                      <CardTitle className="text-foreground font-serif">Customer Stats</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-primary" />
                            <span className="text-sm text-muted-foreground">Total Customers</span>
                          </div>
                          <span className="font-semibold text-foreground">342</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-primary" />
                            <span className="text-sm text-muted-foreground">Repeat Rate</span>
                          </div>
                          <span className="font-semibold text-foreground">68%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-primary" />
                            <span className="text-sm text-muted-foreground">Avg. Delivery Time</span>
                          </div>
                          <span className="font-semibold text-foreground">28 min</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="settings" className="mt-6">
                <div className="max-w-2xl">
                  <Card className="bg-card border-border">
                    <CardHeader>
                      <CardTitle className="text-foreground font-serif">Restaurant Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-foreground">Accept Online Orders</Label>
                          <p className="text-xs text-muted-foreground mt-1">Enable or disable new orders</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <Separator className="bg-border" />
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-foreground">Pause New Orders</Label>
                          <p className="text-xs text-muted-foreground mt-1">
                            Temporarily stop accepting orders during rush
                          </p>
                        </div>
                        <Switch />
                      </div>
                      <Separator className="bg-border" />
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-foreground">Order Notifications</Label>
                          <p className="text-xs text-muted-foreground mt-1">Get sound alerts for new orders</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <Separator className="bg-border" />
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-foreground">Auto-Accept Orders</Label>
                          <p className="text-xs text-muted-foreground mt-1">
                            Automatically accept incoming orders
                          </p>
                        </div>
                        <Switch />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </>
        )}
      </main>
    </div>
  )
}

function OrderCard({
  order,
  onUpdateStatus,
}: {
  order: Order
  onUpdateStatus: (id: string, status: OrderStatus) => void
}) {
  return (
    <div className="bg-card rounded-lg border border-border p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-mono text-muted-foreground">#{order.id.slice(0, 8)}</span>
        <Badge variant="outline" className={`text-[10px] ${statusColors[order.status]}`}>
          {statusLabels[order.status]}
        </Badge>
      </div>

      <h3 className="font-medium text-foreground">{order.customer_name}</h3>
      <div className="flex items-center gap-1.5 mt-1 text-xs text-muted-foreground">
        <MapPin className="w-3 h-3 flex-shrink-0" />
        <span>{order.customer_address}</span>
      </div>

      {/* Item list */}
      <div className="flex flex-col gap-1 mt-3">
        {order.items.map((item, i) => (
          <div key={i} className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              {item.quantity > 1 ? `${item.menuItem.name} ×${item.quantity}` : item.menuItem.name}
            </span>
            <span className="text-muted-foreground">
              ${(item.menuItem.price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      <Separator className="my-3 bg-border" />

      {/* Fee breakdown */}
      <div className="flex flex-col gap-1 text-xs text-muted-foreground">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${order.subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Delivery fee</span>
          <span>${order.delivery_fee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Service fee</span>
          <span>${order.service_fee.toFixed(2)}</span>
        </div>
      </div>

      <Separator className="my-2 bg-border" />

      <div className="flex items-center justify-between">
        <div>
          <span className="font-semibold text-foreground">${order.total.toFixed(2)}</span>
          <span className="text-xs text-muted-foreground ml-2">{timeAgo(order.created_at)}</span>
        </div>
        {order.status === "pending" && (
          <Button
            size="sm"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={() => onUpdateStatus(order.id, "confirmed")}
          >
            <Check className="w-3 h-3 mr-1" />
            Accept Order
          </Button>
        )}
        {order.status === "confirmed" && (
          <Button
            size="sm"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={() => onUpdateStatus(order.id, "ready")}
          >
            <Check className="w-3 h-3 mr-1" />
            Mark as Ready
          </Button>
        )}
      </div>
    </div>
  )
}
