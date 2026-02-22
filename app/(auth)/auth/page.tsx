"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { Suspense, useState } from "react"
import Link from "next/link"
import { ArrowRight, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"
import { supabase } from "@/lib/supabase"

type Role = "customer" | "driver" | "restaurant"

const roleConfig: Record<Role, {
  tab: string
  loginHeading: string
  signupHeading: string
  signupSub: string
  destination: string
  requiresName: boolean
}> = {
  customer: {
    tab: "Customer",
    loginHeading: "Welcome back",
    signupHeading: "Start ordering",
    signupSub: "Create your account to order from local Davis restaurants.",
    destination: "/customer-dashboard",
    requiresName: false,
  },
  driver: {
    tab: "Driver",
    loginHeading: "Driver sign in",
    signupHeading: "Become a driver",
    signupSub: "Create a driver account to start earning with DDBA Local Delivery.",
    destination: "/rider",
    requiresName: true,
  },
  restaurant: {
    tab: "Restaurant Owner",
    loginHeading: "Restaurant sign in",
    signupHeading: "Partner with us",
    signupSub: "Create a restaurant account to start reaching more customers.",
    destination: "/dashboard",
    requiresName: true,
  },
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
      <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
    </svg>
  )
}

function RoleForm({ role }: { role: Role }) {
  const router = useRouter()
  const config = roleConfig[role]
  const [mode, setMode] = useState<"signin" | "signup">("signin")
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const email = (form.elements.namedItem("email") as HTMLInputElement).value
    const password = (form.elements.namedItem("password") as HTMLInputElement).value

    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)

    if (error) {
      toast.error(error.message)
    } else {
      router.push(config.destination)
    }
  }

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const email = (form.elements.namedItem("email") as HTMLInputElement).value
    const password = (form.elements.namedItem("password") as HTMLInputElement).value
    const firstName = config.requiresName
      ? (form.elements.namedItem("first-name") as HTMLInputElement).value
      : ""
    const lastName = config.requiresName
      ? (form.elements.namedItem("last-name") as HTMLInputElement).value
      : ""

    setLoading(true)
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          from: role,
          full_name: config.requiresName ? `${firstName} ${lastName}`.trim() : undefined,
        },
        emailRedirectTo: `${window.location.origin}/auth/callback?from=${role}`,
      },
    })
    setLoading(false)

    if (error) {
      toast.error(error.message)
    } else {
      toast.success("Check your email to confirm your account!")
      router.push(config.destination)
    }
  }

  const handleGoogle = async () => {
    setGoogleLoading(true)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?from=${role}`,
      },
    })
    if (error) {
      toast.error(error.message)
      setGoogleLoading(false)
    }
  }

  const heading = mode === "signin" ? config.loginHeading : config.signupHeading

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <h2 className="font-serif text-2xl font-bold text-foreground capitalize">{heading}</h2>
        {mode === "signup" && (
          <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{config.signupSub}</p>
        )}
      </div>

      <div className="bg-card rounded-xl border border-border p-6">
        {/* Google OAuth */}
        <Button
          type="button"
          variant="outline"
          size="lg"
          className="w-full gap-3 border-border text-foreground hover:bg-muted mb-5"
          onClick={handleGoogle}
          disabled={googleLoading}
        >
          <GoogleIcon />
          {googleLoading ? "Redirecting…" : "Continue with Google"}
        </Button>

        <div className="relative mb-5">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-3 text-muted-foreground tracking-widest">or</span>
          </div>
        </div>

        {mode === "signin" ? (
          <form onSubmit={handleSignIn} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor={`${role}-email`} className="text-foreground">Email</Label>
              <Input id={`${role}-email`} name="email" type="email" placeholder="you@example.com" required className="bg-background text-foreground" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor={`${role}-password`} className="text-foreground">Password</Label>
              <Input id={`${role}-password`} name="password" type="password" placeholder="Your password" required className="bg-background text-foreground" />
            </div>
            <Button
              type="submit"
              size="lg"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 gap-2 mt-1"
              disabled={loading}
            >
              {loading ? "Signing in…" : "Sign In"}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </Button>
          </form>
        ) : (
          <form onSubmit={handleSignUp} className="flex flex-col gap-4">
            {config.requiresName && (
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-2">
                  <Label htmlFor={`${role}-first-name`} className="text-foreground">First Name</Label>
                  <Input id={`${role}-first-name`} name="first-name" placeholder="Jane" required className="bg-background text-foreground" />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor={`${role}-last-name`} className="text-foreground">Last Name</Label>
                  <Input id={`${role}-last-name`} name="last-name" placeholder="Doe" required className="bg-background text-foreground" />
                </div>
              </div>
            )}
            <div className="flex flex-col gap-2">
              <Label htmlFor={`${role}-signup-email`} className="text-foreground">Email</Label>
              <Input id={`${role}-signup-email`} name="email" type="email" placeholder="you@example.com" required className="bg-background text-foreground" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor={`${role}-signup-password`} className="text-foreground">Password</Label>
              <Input id={`${role}-signup-password`} name="password" type="password" placeholder="Create a password" required className="bg-background text-foreground" />
            </div>
            <Button
              type="submit"
              size="lg"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 gap-2 mt-1"
              disabled={loading}
            >
              {loading ? "Creating account…" : "Create Account"}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </Button>
          </form>
        )}
      </div>

      <p className="text-center text-sm text-muted-foreground">
        {mode === "signin" ? (
          <>
            {"Don't have an account? "}
            <button onClick={() => setMode("signup")} className="text-foreground font-medium hover:underline">
              Sign up
            </button>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <button onClick={() => setMode("signin")} className="text-foreground font-medium hover:underline">
              Sign in
            </button>
          </>
        )}
      </p>
    </div>
  )
}

function AuthPage() {
  const searchParams = useSearchParams()
  const fromParam = searchParams.get("from")
  const defaultTab: Role =
    fromParam === "driver" || fromParam === "restaurant" || fromParam === "customer"
      ? fromParam
      : "customer"

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-16">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 mb-10">
        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary">
          <MapPin className="w-5 h-5 text-primary-foreground" />
        </div>
        <div className="flex flex-col">
          <span className="font-serif text-lg font-bold leading-none text-foreground tracking-tight">DDBA</span>
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground leading-none mt-0.5">Local Delivery</span>
        </div>
      </Link>

      <div className="w-full max-w-md">
        <Tabs defaultValue={defaultTab}>
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="customer">Customer</TabsTrigger>
            <TabsTrigger value="driver">Driver</TabsTrigger>
            <TabsTrigger value="restaurant">Restaurant</TabsTrigger>
          </TabsList>

          {(["customer", "driver", "restaurant"] as Role[]).map((role) => (
            <TabsContent key={role} value={role}>
              <RoleForm role={role} />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}

export default function AuthPageWrapper() {
  return (
    <Suspense>
      <AuthPage />
    </Suspense>
  )
}
