"use client"

import Link from "next/link"
import { ShoppingBag, Menu, X, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/lib/cart"
import { useState } from "react"

export function SiteHeader() {
  const itemCount = useCart((s) => s.getItemCount())
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
      <div className="mx-auto max-w-7xl flex items-center justify-between px-4 py-3 lg:px-8">
        <Link href="/" className="flex items-center gap-2" aria-label="DDBA Local Delivery home">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary">
            <MapPin className="w-5 h-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-lg font-bold leading-none text-foreground tracking-tight">DDBA</span>
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground leading-none mt-0.5">Local Delivery</span>
          </div>
        </Link>

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
            <Link href="/dashboard">
              <Button variant="outline" size="sm" className="text-foreground border-border">
                Restaurant Login
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
                <Link href="/dashboard" onClick={() => setOpen(false)} className="text-lg font-medium text-foreground">
                  Restaurant Login
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
