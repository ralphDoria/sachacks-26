"use client"

import Link from "next/link"
import Image from "next/image"
import { useRouter, usePathname } from "next/navigation"
import { ShoppingBag, Menu, UserCircle, LogOut, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
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
  const [profileOpen, setProfileOpen] = useState(false)
  const [session, setSession] = useState<Session | null>(null)
  const [userName, setUserName] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      if (data.session?.user) {
        const user = data.session.user
        const meta = user.user_metadata
        setUserEmail(user.email ?? "")
        setUserName(meta?.full_name ?? user.email?.split("@")[0] ?? "")
        setAvatarUrl(meta?.avatar_url ?? null)
      }
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s)
      if (s?.user) {
        const meta = s.user.user_metadata
        setUserEmail(s.user.email ?? "")
        setUserName(meta?.full_name ?? s.user.email?.split("@")[0] ?? "")
        setAvatarUrl(meta?.avatar_url ?? null)
      }
    })
    return () => subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setProfileOpen(false)
    router.push("/")
  }

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm("Are you sure you want to delete your account? This cannot be undone.")
    if (!confirmed) return
    await supabase.auth.admin?.deleteUser(session!.user.id).catch(() => null)
    await supabase.auth.signOut()
    setProfileOpen(false)
    router.push("/")
  }

  const branding = (
    <Link href="/" className="flex items-center gap-2" aria-label="DartDavis home">
      <Image src="/DartDavis-logo.png" alt="DartDavis" width={160} height={64} className="h-16 w-auto object-contain" />
      <span className="font-serif text-xl font-bold leading-none text-foreground tracking-tight">DartDavis</span>
    </Link>
  )

  if (session) {
    return (
      <>
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
                variant="ghost"
                size="icon"
                className="hidden md:flex text-foreground"
                aria-label="Profile"
                onClick={() => setProfileOpen(true)}
              >
                <UserCircle className="w-5 h-5" />
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
                    <button
                      onClick={() => { setOpen(false); setProfileOpen(true) }}
                      className="text-lg font-medium text-foreground text-left"
                    >
                      Profile
                    </button>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </header>

        {/* Profile modal */}
        <Dialog open={profileOpen} onOpenChange={setProfileOpen}>
          <DialogContent className="bg-card border-border max-w-sm w-full p-0 overflow-hidden">
            <DialogTitle className="sr-only">Profile</DialogTitle>

            {/* Avatar banner */}
            <div className="flex flex-col items-center gap-3 pt-8 pb-6 px-6">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={userName}
                  className="w-20 h-20 rounded-full object-cover border-2 border-border"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center border-2 border-border">
                  <UserCircle className="w-12 h-12 text-muted-foreground" />
                </div>
              )}
              <div className="text-center">
                <p className="font-semibold text-foreground">{userName || "—"}</p>
                <p className="text-sm text-muted-foreground mt-0.5">{userEmail}</p>
              </div>
            </div>

            <Separator className="bg-border" />

            <div className="flex flex-col p-3 gap-1">
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 text-foreground hover:bg-muted"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4" />
                Log out
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 text-destructive hover:bg-destructive/10 hover:text-destructive"
                onClick={handleDeleteAccount}
              >
                <Trash2 className="w-4 h-4" />
                Delete account
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </>
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
