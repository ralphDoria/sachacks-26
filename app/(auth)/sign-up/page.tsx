"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { Suspense, useState } from "react"
import Link from "next/link"
import { ArrowRight, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { supabase } from "@/lib/supabase"

const contextLabels: Record<string, { heading: string; sub: string; cta: string }> = {
  driver: {
    heading: "Join as a Driver",
    sub: "Create your driver account to start earning with DDBA Local Delivery.",
    cta: "Create Driver Account",
  },
  restaurant: {
    heading: "Join as a Restaurant",
    sub: "Create your restaurant account to start reaching more customers with DDBA.",
    cta: "Create Restaurant Account",
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

function SignUpForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const from = searchParams.get("from") ?? ""
  const ctx = contextLabels[from] ?? {
    heading: "Create an Account",
    sub: "Join the DDBA Local Delivery network.",
    cta: "Create Account",
  }

  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const email = (form.elements.namedItem("email") as HTMLInputElement).value
    const password = (form.elements.namedItem("password") as HTMLInputElement).value

    setLoading(true)
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { from },
        emailRedirectTo: `${window.location.origin}/auth/callback?from=${from}`,
      },
    })
    setLoading(false)

    if (error) {
      toast.error(error.message)
    } else {
      toast.success("Check your email to confirm your account!")
      router.push(from === "restaurant" ? "/dashboard" : from === "driver" ? "/driver" : "/")
    }
  }

  const handleGoogle = async () => {
    setGoogleLoading(true)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?from=${from}`,
      },
    })
    if (error) {
      toast.error(error.message)
      setGoogleLoading(false)
    }
    // on success the browser is redirected — no need to setLoading(false)
  }

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
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl font-bold text-foreground">{ctx.heading}</h1>
          <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{ctx.sub}</p>
        </div>

        <div className="bg-card rounded-xl border border-border p-8">
          {/* Google SSO */}
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="w-full gap-3 border-border text-foreground hover:bg-muted mb-6"
            onClick={handleGoogle}
            disabled={googleLoading}
          >
            <GoogleIcon />
            {googleLoading ? "Redirecting…" : "Continue with Google"}
          </Button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-3 text-muted-foreground tracking-widest">or</span>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="first-name" className="text-foreground">First Name</Label>
                  <Input id="first-name" name="first-name" placeholder="Jane" required className="bg-background text-foreground" />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="last-name" className="text-foreground">Last Name</Label>
                  <Input id="last-name" name="last-name" placeholder="Doe" required className="bg-background text-foreground" />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="email" className="text-foreground">Email</Label>
                <Input id="email" name="email" type="email" placeholder="you@example.com" required className="bg-background text-foreground" />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="password" className="text-foreground">Password</Label>
                <Input id="password" name="password" type="password" placeholder="Create a password" required className="bg-background text-foreground" />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
                disabled={loading}
              >
                {loading ? "Creating account…" : ctx.cta}
                {!loading && <ArrowRight className="w-4 h-4" />}
              </Button>
            </div>
          </form>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Already have an account?{" "}
          <Link
            href={from ? `/login?from=${from}` : "/login"}
            className="text-foreground font-medium hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

export default function SignUpPage() {
  return (
    <Suspense>
      <SignUpForm />
    </Suspense>
  )
}
