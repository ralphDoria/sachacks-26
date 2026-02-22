"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  ShoppingBag,
  Star,
  Clock,
  ArrowRight,
  Package,
  Trophy,
  MapPin,
  LogOut,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { RestaurantGrid } from "@/components/restaurants/restaurant-grid"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"

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
  restaurants: { name: string } | null
}

const statusLabels: Record<string, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  ready: "Ready for Pickup",
  claimed: "Out for Delivery",
  delivered: "Delivered",
}

const statusColors: Record<string, string> = {
  pending: "bg-accent/10 text-accent border-accent/20",
  confirmed: "bg-primary/10 text-primary border-primary/20",
  ready: "bg-chart-1/10 text-chart-1 border-chart-1/20",
  claimed: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  delivered: "bg-muted text-muted-foreground border-border",
}

function PointsTier({ points }: { points: number }) {
  const tiers = [
    { label: "Bronze", min: 0, max: 99, color: "text-amber-700" },
    { label: "Silver", min: 100, max: 499, color: "text-slate-400" },
    { label: "Gold", min: 500, max: Infinity, color: "text-yellow-500" },
  ]
  const current = tiers.find((t) => points >= t.min && points <= t.max) ?? tiers[0]
  const next = tiers[tiers.indexOf(current) + 1]
  const progress = next
    ? Math.min(((points - current.min) / (next.min - current.min)) * 100, 100)
    : 100

  return (
    <div className="bg-card rounded-xl border border-border p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Your Points</p>
          <p className="font-serif text-4xl font-bold text-foreground mt-0.5">{points}</p>
        </div>
        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-primary/10">
          <Trophy className={`w-7 h-7 ${current.color}`} />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-1.5">
          <span className={`text-sm font-semibold ${current.color}`}>{current.label}</span>
          {next && (
            <span className="text-xs text-muted-foreground">{next.min - points} pts to {next.label}</span>
          )}
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 pt-2 border-t border-border">
        {[
          { label: "Bronze", min: 0, color: "text-amber-700" },
          { label: "Silver", min: 100, color: "text-slate-400" },
          { label: "Gold", min: 500, color: "text-yellow-500" },
        ].map((tier) => (
          <div
            key={tier.label}
            className={`text-center p-2 rounded-lg ${points >= tier.min ? "bg-muted" : "opacity-40"}`}
          >
            <p className={`text-xs font-semibold ${tier.color}`}>{tier.label}</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">{tier.min}+ pts</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function CustomerDashboardPage() {
  const router = useRouter()
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [userName, setUserName] = useState<string>("")
  const [orders, setOrders] = useState<Order[]>([])
  const [points, setPoints] = useState(0)
  const [loadingOrders, setLoadingOrders] = useState(true)

  useEffect(() => {
    async function init() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push("/auth?from=customer")
        return
      }

      setUserEmail(user.email ?? null)
      const meta = user.user_metadata
      if (meta?.full_name) {
        setUserName(meta.full_name.split(" ")[0])
      } else if (user.email) {
        setUserName(user.email.split("@")[0])
      }

      // Fetch orders by email
      if (user.email) {
        const { data } = await supabase
          .from("orders")
          .select("*, restaurants(name)")
          .eq("customer_email", user.email)
          .order("created_at", { ascending: false })

        if (data) {
          setOrders(data as Order[])
          // 1 point per $1 spent (floor of total for each delivered order)
          const earned = (data as Order[])
            .filter((o) => o.status === "delivered")
            .reduce((sum, o) => sum + Math.floor(o.total), 0)
          setPoints(earned)
        }
      }

      setLoadingOrders(false)
    }

    init()
  }, [router])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
    toast.success("Signed out")
  }

  return (
    <>
      <main className="min-h-screen bg-background">
        {/* Hero bar */}
        <div className="bg-foreground text-background py-10">
          <div className="mx-auto max-w-7xl px-4 lg:px-8 flex items-center justify-between">
            <div>
              <p className="text-sm opacity-60 uppercase tracking-widest">Dashboard</p>
              <h1 className="font-serif text-3xl md:text-4xl font-bold mt-1">
                {userName ? `Welcome back, ${userName}` : "Welcome back"}
              </h1>
              {userEmail && (
                <p className="text-sm opacity-50 mt-1">{userEmail}</p>
              )}
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 lg:px-8 py-8">
          <Tabs defaultValue="order">
            <TabsList className="mb-8">
              <TabsTrigger value="order" className="gap-2">
                <ShoppingBag className="w-4 h-4" />
                Order Food
              </TabsTrigger>
              <TabsTrigger value="orders" className="gap-2">
                <Package className="w-4 h-4" />
                My Orders
                {orders.length > 0 && (
                  <Badge variant="secondary" className="ml-1 text-[10px] h-4 px-1.5">
                    {orders.length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="rewards" className="gap-2">
                <Trophy className="w-4 h-4" />
                Rewards
              </TabsTrigger>
            </TabsList>

            {/* Order Food Tab */}
            <TabsContent value="order">
              <RestaurantGrid showFilters />
            </TabsContent>

            {/* My Orders Tab */}
            <TabsContent value="orders">
              {loadingOrders ? (
                <div className="flex flex-col gap-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="bg-card rounded-xl border border-border h-24 animate-pulse" />
                  ))}
                </div>
              ) : orders.length === 0 ? (
                <div className="bg-card rounded-xl border border-border p-16 text-center">
                  <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h2 className="font-serif text-xl font-semibold text-foreground mb-2">No orders yet</h2>
                  <p className="text-muted-foreground text-sm mb-6">
                    When you place an order it will appear here.
                  </p>
                  <Button
                    onClick={() => {
                      const tab = document.querySelector('[value="order"]') as HTMLElement
                      tab?.click()
                    }}
                    className="gap-2"
                  >
                    Browse Restaurants
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {orders.map((order) => {
                    const shortId = order.id.slice(0, 8).toUpperCase()
                    const date = new Date(order.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                    const isActive = order.status !== "delivered"

                    return (
                      <div
                        key={order.id}
                        className="bg-card rounded-xl border border-border p-5 flex flex-col sm:flex-row sm:items-center gap-4"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-1.5">
                            <span className="font-mono text-xs text-muted-foreground">#{shortId}</span>
                            <Badge
                              variant="outline"
                              className={`text-[10px] ${statusColors[order.status] ?? ""}`}
                            >
                              {statusLabels[order.status] ?? order.status}
                            </Badge>
                          </div>
                          <p className="font-semibold text-foreground">
                            {order.restaurants?.name ?? "Unknown Restaurant"}
                          </p>
                          <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {date}
                            </span>
                            <span>${order.total.toFixed(2)}</span>
                            <span>{order.items.length} item{order.items.length !== 1 ? "s" : ""}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 flex-shrink-0">
                          {isActive && (
                            <Link href={`/order-tracking/${order.id}`}>
                              <Button size="sm" className="gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90">
                                <MapPin className="w-3.5 h-3.5" />
                                Track Order
                              </Button>
                            </Link>
                          )}
                          <Link href={`/order-confirmed?orderId=${order.id}`}>
                            <Button size="sm" variant="outline" className="text-foreground border-border">
                              View Receipt
                            </Button>
                          </Link>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </TabsContent>

            {/* Rewards Tab */}
            <TabsContent value="rewards">
              <div className="max-w-md">
                <PointsTier points={points} />
                <div className="mt-6 bg-card rounded-xl border border-border p-5">
                  <h3 className="font-semibold text-foreground mb-3">How Points Work</h3>
                  <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>Earn 1 point for every $1 spent on delivered orders</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-amber-700 flex-shrink-0" />
                      <span>Bronze (0–99 pts) → Silver (100–499 pts) → Gold (500+ pts)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ShoppingBag className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>More rewards coming soon — keep ordering local!</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </>
  )
}
