"use client"

import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { ShoppingBag, Menu, MapPin, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/lib/cart"
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import type { Session } from "@supabase/supabase-js"

const dashboardLinks = [
  { href: "/customer-dashboard", label: "Customer" },
  { href: "/driver", label: "Driver" },
  { href: "/dashboard", label: "Restaurant" },
]

export function SiteHeader() {
  const itemCount = useCart((s) => s.getItemCount())
  const [open, setOpen] = useState(false)
  const [session, setSession] = useState<Session | null>(null)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, s) => setSession(s))
    return () => subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  const branding = (
    <Link href="/" className="flex items-center gap-2" aria-label="DDBA Local Delivery home">
      <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary">
        <MapPin className="w-5 h-5 text-primary-foreground" />
      </div>
      <div className="flex flex-col">
        <span className="font-serif text-lg font-bold leading-none text-foreground tracking-tight">DDBA</span>
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground leading-none mt-0.5">Local Delivery</span>
      </div>
    </Link>
  )

  if (session) {
    return (
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
        <div className="mx-auto max-w-7xl flex items-center justify-between px-4 py-3 lg:px-8">
          {branding}

          <nav className="hidden md:flex items-center gap-1" aria-label="Dashboard navigation">
            {dashboardLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  pathname === href
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              className="hidden md:flex items-center gap-2 text-foreground border-border"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>

            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" aria-label="Open menu" className="text-foreground">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-card text-card-foreground">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <nav className="flex flex-col gap-6 mt-8" aria-label="Mobile dashboard navigation">
                  {dashboardLinks.map(({ href, label }) => (
                    <Link key={href} href={href} onClick={() => setOpen(false)} className="text-lg font-medium text-foreground">
                      {label}
                    </Link>
                  ))}
                  <button onClick={() => { setOpen(false); handleLogout() }} className="text-lg font-medium text-foreground text-left">
                    Logout
                  </button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    )
  }

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
      <div className="mx-auto max-w-7xl flex items-center justify-between px-4 py-3 lg:px-8">
        {branding}

        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          <Link href="/restaurants" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Restaurants
          </Link>
          <Link href="/how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            How It Works
          </Link>
          <Link href="/for-restaurants" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            For Restaurants
          </Link>
          <Link href="/for-drivers" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            For Drivers
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/cart" className="relative" aria-label={`Shopping cart with ${itemCount} items`}>
            <Button variant="ghost" size="icon" className="relative text-foreground">
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] bg-accent text-accent-foreground border-0">
                  {itemCount}
                </Badge>
              )}
            </Button>
          </Link>

          <div className="hidden md:flex items-center gap-2">
            <Link href="/auth">
              <Button variant="outline" size="sm" className="text-foreground border-border">
                Login
              </Button>
            </Link>
          </div>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" aria-label="Open menu" className="text-foreground">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-card text-card-foreground">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <nav className="flex flex-col gap-6 mt-8" aria-label="Mobile navigation">
                <Link href="/restaurants" onClick={() => setOpen(false)} className="text-lg font-medium text-foreground">
                  Restaurants
                </Link>
                <Link href="/how-it-works" onClick={() => setOpen(false)} className="text-lg font-medium text-foreground">
                  How It Works
                </Link>
                <Link href="/for-restaurants" onClick={() => setOpen(false)} className="text-lg font-medium text-foreground">
                  For Restaurants
                </Link>
                <Link href="/for-drivers" onClick={() => setOpen(false)} className="text-lg font-medium text-foreground">
                  For Drivers
                </Link>
                <Link href="/auth" onClick={() => setOpen(false)} className="text-lg font-medium text-foreground">
                  Login
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
