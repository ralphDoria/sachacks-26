"use client"

import Link from "next/link"
import {
  DollarSign,
  Clock,
  Bike,
  ShieldCheck,
  ArrowRight,
  Check,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const benefits = [
  {
    icon: DollarSign,
    title: "Competitive Pay",
    description:
      "Earn comparable to other delivery apps like DoorDash and Uber Eats — while keeping money in the local Davis economy instead of sending it to corporate headquarters.",
  },
  {
    icon: Clock,
    title: "No Waitlist",
    description:
      "Skip the queue. Unlike established platforms that make you wait weeks to activate, you can get approved and start earning with DDBA right away.",
  },
  {
    icon: Bike,
    title: "Built for Davis",
    description:
      "Roll 'round town and make a quick buck. Whether you're a UC Davis student looking to earn between classes or a local wanting flexible income, this was made for you.",
  },
  {
    icon: ShieldCheck,
    title: "Support Local",
    description:
      "Every delivery you make directly supports a downtown Davis small business — not a faceless chain. Feel good about the work you're doing.",
  },
]

const perks = [
  "Flexible hours — work whenever you want",
  "No minimum hours required",
  "Weekly direct deposit",
  "In-app navigation and order management",
  "Real-time earnings tracking",
  "Delivery zone centered around downtown Davis",
  "Community of local drivers",
  "DDBA driver support team",
]

export default function ForDriversPage() {
  return (
    <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <div className="bg-foreground text-background py-20">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <span className="text-xs uppercase tracking-widest text-primary-foreground/50">For Drivers</span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mt-3 max-w-3xl text-balance">
              Roll &lsquo;round town and make a quick buck.
            </h1>
            <p className="mt-4 text-lg opacity-70 max-w-xl leading-relaxed">
              Deliver for local Davis restaurants on your own schedule. Competitive pay, no waitlist, open to everyone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Link href="/sign-up?from=driver">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 w-full sm:w-auto">
                  Apply to Drive
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mx-auto max-w-7xl px-4 lg:px-8 py-24">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-widest text-primary font-medium">Why DDBA</span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mt-3 text-foreground text-balance">
              Why drivers choose DDBA
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, i) => (
              <div key={i} className="flex gap-5 p-6 bg-card rounded-xl border border-border">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 flex-shrink-0">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-foreground">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Requirements & Perks Section */}
        <div className="bg-muted/50 py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              {/* Requirements */}
              <div>
                <span className="text-xs uppercase tracking-widest text-primary font-medium">Requirements</span>
                <h2 className="font-serif text-4xl font-bold mt-3 text-foreground text-balance">
                  What you need to get started
                </h2>
                <p className="text-muted-foreground mt-4 leading-relaxed">
                  We keep requirements simple so you can start earning fast.
                </p>

                <div className="mt-8 flex flex-col gap-4">
                  <div className="bg-card rounded-xl border border-border p-6">
                    <h3 className="font-serif text-base font-semibold text-foreground mb-1">18 or older</h3>
                    <p className="text-sm text-muted-foreground">You must be at least 18 years old and provide a valid government-issued ID to verify your identity.</p>
                  </div>

                  <div className="bg-card rounded-xl border border-border p-6">
                    <h3 className="font-serif text-base font-semibold text-foreground mb-3">Choose your ride</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { label: "Bike", icon: "🚲" },
                        { label: "Scooter", icon: "🛵" },
                        { label: "Walk", icon: "🚶" },
                        { label: "Car", icon: "🚗" },
                      ].map(({ label, icon }) => (
                        <div key={label} className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                          <span className="text-lg">{icon}</span>
                          <span className="text-sm font-medium text-foreground">{label}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground mt-3">
                      Bikes and scooters are especially popular in Davis — great for zipping around the downtown core.
                    </p>
                  </div>
                </div>
              </div>

              {/* Perks Checklist */}
              <div>
                <h3 className="font-serif text-2xl font-semibold text-foreground mb-6">{"What's included"}</h3>
                <div className="grid grid-cols-1 gap-3">
                  {perks.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border">
                      <Check className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-sm text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-24">
          <div className="mx-auto max-w-2xl px-4 lg:px-8 text-center">
            <span className="text-xs uppercase tracking-widest text-primary font-medium">Get Started</span>
            <h2 className="font-serif text-4xl font-bold mt-3 text-foreground text-balance">
              Ready to start earning?
            </h2>
            <p className="text-muted-foreground mt-3 leading-relaxed">
              Create an account and a DDBA representative will reach out within 48 hours to get you on the road.
            </p>
            <div className="mt-8">
              <Link href="/sign-up?from=driver">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
                  Apply to Drive
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
    </main>
  )
}
