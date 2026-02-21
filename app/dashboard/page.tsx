"use client"

import { useState } from "react"
import Link from "next/link"
import {
  DollarSign,
  ShoppingBag,
  TrendingUp,
  Clock,
  Check,
  X,
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

interface Order {
  id: string
  customer: string
  items: string[]
  total: number
  status: "pending" | "preparing" | "ready" | "delivered"
  time: string
  address: string
}

const mockOrders: Order[] = [
  {
    id: "ORD-001",
    customer: "Sarah M.",
    items: ["Pad Thai", "Green Curry", "Thai Iced Tea"],
    total: 35.40,
    status: "pending",
    time: "2 min ago",
    address: "456 B St, Davis",
  },
  {
    id: "ORD-002",
    customer: "James L.",
    items: ["Mango Sticky Rice", "Spring Rolls x2"],
    total: 21.85,
    status: "preparing",
    time: "8 min ago",
    address: "789 Oak Ave, Davis",
  },
  {
    id: "ORD-003",
    customer: "Emily R.",
    items: ["Tom Kha Gai", "Basil Fried Rice", "Massaman Curry"],
    total: 39.85,
    status: "ready",
    time: "22 min ago",
    address: "321 Elm St, Davis",
  },
  {
    id: "ORD-004",
    customer: "David K.",
    items: ["Pad Thai x2", "Spring Rolls"],
    total: 36.85,
    status: "delivered",
    time: "45 min ago",
    address: "654 Pine Ln, Davis",
  },
  {
    id: "ORD-005",
    customer: "Maria G.",
    items: ["Green Curry", "Thai Iced Tea x2"],
    total: 24.95,
    status: "delivered",
    time: "1 hr ago",
    address: "987 Maple Dr, Davis",
  },
]

const statusColors: Record<Order["status"], string> = {
  pending: "bg-accent/10 text-accent border-accent/20",
  preparing: "bg-primary/10 text-primary border-primary/20",
  ready: "bg-chart-1/10 text-chart-1 border-chart-1/20",
  delivered: "bg-muted text-muted-foreground border-border",
}

const statusLabels: Record<Order["status"], string> = {
  pending: "New Order",
  preparing: "Preparing",
  ready: "Ready for Pickup",
  delivered: "Delivered",
}

export default function DashboardPage() {
  const [orders, setOrders] = useState(mockOrders)

  const updateOrderStatus = (id: string, newStatus: Order["status"]) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
    )
  }

  const pendingOrders = orders.filter((o) => o.status === "pending")
  const activeOrders = orders.filter((o) => o.status === "preparing" || o.status === "ready")
  const completedOrders = orders.filter((o) => o.status === "delivered")

  const todayRevenue = orders.reduce((sum, o) => sum + o.total, 0)
  const todayOrders = orders.length
  const avgOrderValue = todayRevenue / todayOrders

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
        <div className="mx-auto max-w-7xl flex items-center justify-between px-4 py-3 lg:px-8">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Site</span>
            </Link>
            <Separator orientation="vertical" className="h-6 bg-border" />
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary">
                <UtensilsCrossed className="w-4 h-4 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-sm font-semibold text-foreground leading-none">{"Sophia's Thai Kitchen"}</h1>
                <p className="text-[10px] text-muted-foreground">Restaurant Dashboard</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs text-muted-foreground hidden sm:inline">Accepting Orders</span>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{"Today's Revenue"}</CardTitle>
              <DollarSign className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-serif text-foreground">${todayRevenue.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-primary">+12.5%</span> vs yesterday
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{"Today's Orders"}</CardTitle>
              <ShoppingBag className="w-4 h-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-serif text-foreground">{todayOrders}</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-primary">+3</span> vs yesterday
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Order Value</CardTitle>
              <TrendingUp className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-serif text-foreground">${avgOrderValue.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-primary">+$2.40</span> vs last week
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Savings vs. DoorDash</CardTitle>
              <BarChart3 className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-serif text-primary">${(todayRevenue * 0.20).toFixed(2)}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Saved today with 5% vs 25% fees
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="orders" className="w-full">
          <TabsList className="bg-muted">
            <TabsTrigger value="orders" className="gap-1 data-[state=active]:bg-card data-[state=active]:text-foreground">
              <ShoppingBag className="w-4 h-4" />
              Orders
              {pendingOrders.length > 0 && (
                <Badge className="ml-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] bg-accent text-accent-foreground border-0">
                  {pendingOrders.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="analytics" className="gap-1 data-[state=active]:bg-card data-[state=active]:text-foreground">
              <BarChart3 className="w-4 h-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-1 data-[state=active]:bg-card data-[state=active]:text-foreground">
              <Settings className="w-4 h-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="flex flex-col gap-4">
                <h2 className="font-semibold text-foreground flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                  Incoming ({pendingOrders.length})
                </h2>
                {pendingOrders.map((order) => (
                  <OrderCard key={order.id} order={order} onUpdateStatus={updateOrderStatus} />
                ))}
                {pendingOrders.length === 0 && (
                  <p className="text-sm text-muted-foreground bg-card rounded-lg border border-border p-6 text-center">
                    No pending orders
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-4">
                <h2 className="font-semibold text-foreground flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  Active ({activeOrders.length})
                </h2>
                {activeOrders.map((order) => (
                  <OrderCard key={order.id} order={order} onUpdateStatus={updateOrderStatus} />
                ))}
                {activeOrders.length === 0 && (
                  <p className="text-sm text-muted-foreground bg-card rounded-lg border border-border p-6 text-center">
                    No active orders
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-4">
                <h2 className="font-semibold text-foreground flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-muted-foreground" />
                  Completed ({completedOrders.length})
                </h2>
                {completedOrders.map((order) => (
                  <OrderCard key={order.id} order={order} onUpdateStatus={updateOrderStatus} />
                ))}
              </div>
            </div>
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
                          <span className="text-xs font-medium text-foreground w-10 text-right">${values[i]}</span>
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
                      <p className="text-xs text-muted-foreground mt-1">by using DDBA instead of national delivery apps</p>
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
                      { name: "Pad Thai", orders: 42, revenue: 627.90 },
                      { name: "Green Curry", orders: 35, revenue: 558.25 },
                      { name: "Mango Sticky Rice", orders: 28, revenue: 222.60 },
                      { name: "Spring Rolls", orders: 25, revenue: 173.75 },
                    ].map((item) => (
                      <div key={item.name} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                        <div>
                          <p className="text-sm font-medium text-foreground">{item.name}</p>
                          <p className="text-xs text-muted-foreground">{item.orders} orders</p>
                        </div>
                        <span className="text-sm font-semibold text-foreground">${item.revenue.toFixed(2)}</span>
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
                      <p className="text-xs text-muted-foreground mt-1">Temporarily stop accepting orders during rush</p>
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
                      <p className="text-xs text-muted-foreground mt-1">Automatically accept incoming orders</p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

function OrderCard({
  order,
  onUpdateStatus,
}: {
  order: Order
  onUpdateStatus: (id: string, status: Order["status"]) => void
}) {
  const nextStatus: Record<Order["status"], Order["status"] | null> = {
    pending: "preparing",
    preparing: "ready",
    ready: "delivered",
    delivered: null,
  }

  const next = nextStatus[order.status]

  return (
    <div className="bg-card rounded-lg border border-border p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-mono text-muted-foreground">{order.id}</span>
        <Badge variant="outline" className={`text-[10px] ${statusColors[order.status]}`}>
          {statusLabels[order.status]}
        </Badge>
      </div>
      <h3 className="font-medium text-foreground">{order.customer}</h3>
      <div className="flex flex-col gap-1 mt-2">
        {order.items.map((item, i) => (
          <span key={i} className="text-sm text-muted-foreground">{item}</span>
        ))}
      </div>
      <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
        <MapPin className="w-3 h-3" />
        <span>{order.address}</span>
      </div>
      <Separator className="my-3 bg-border" />
      <div className="flex items-center justify-between">
        <div>
          <span className="font-semibold text-foreground">${order.total.toFixed(2)}</span>
          <span className="text-xs text-muted-foreground ml-2">{order.time}</span>
        </div>
        {next && (
          <div className="flex gap-2">
            {order.status === "pending" && (
              <Button
                variant="outline"
                size="sm"
                className="text-destructive border-destructive/30 hover:bg-destructive/10"
                onClick={() => onUpdateStatus(order.id, "delivered")}
              >
                <X className="w-3 h-3 mr-1" />
                Decline
              </Button>
            )}
            <Button
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => onUpdateStatus(order.id, next)}
            >
              <Check className="w-3 h-3 mr-1" />
              {order.status === "pending"
                ? "Accept"
                : order.status === "preparing"
                ? "Mark Ready"
                : "Complete"}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
