"use client"

import Link from "next/link"
import {
  DollarSign,
  Users,
  BarChart3,
  Shield,
  ArrowRight,
  Check,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const benefits = [
  {
    icon: DollarSign,
    title: "5% Flat Commission",
    description:
      "National apps charge 15-30% per order. We charge a flat 5%. On $10,000 in monthly delivery revenue, that is $2,000+ back in your pocket.",
  },
  {
    icon: Users,
    title: "Own Your Customer Data",
    description:
      "Unlike national platforms, you retain full access to your customer information. Build direct relationships and loyalty programs.",
  },
  {
    icon: BarChart3,
    title: "Real-Time Dashboard",
    description:
      "Monitor orders, revenue, and customer trends with our intuitive restaurant dashboard. See exactly how much you are saving.",
  },
  {
    icon: Shield,
    title: "Community Backed",
    description:
      "The DDBA has represented downtown businesses since 1989. This platform is built by and for our local business community.",
  },
]

const included = [
  "Custom restaurant profile page",
  "Full menu management",
  "Real-time order management",
  "Revenue analytics dashboard",
  "Customer data ownership",
  "Local delivery network access",
  "DDBA marketing support",
  "No long-term contracts",
]

export default function ForRestaurantsPage() {
  return (
    <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <div className="bg-foreground text-background py-20">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <span className="text-xs uppercase tracking-widest text-primary-foreground/50">For Restaurant Owners</span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mt-3 max-w-3xl text-balance">
              Keep more of what you earn.
            </h1>
            <p className="mt-4 text-lg opacity-70 max-w-xl leading-relaxed">
              Join the DDBA Local Delivery network and stop giving away 30% of every delivery order to national platforms.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Link href="/sign-up?from=restaurant">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 w-full sm:w-auto">
                  Apply Now
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button size="lg" variant="outline" className="bg-transparent border-background/40 text-background hover:bg-background/10 w-full sm:w-auto">
                  See Demo Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mx-auto max-w-7xl px-4 lg:px-8 py-24">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-widest text-primary font-medium">Benefits</span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mt-3 text-foreground text-balance">
              Why restaurants choose DDBA
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

        {/* Numbers & Comparison Section */}
        <div className="bg-muted/50 py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-xs uppercase tracking-widest text-primary font-medium">The Numbers</span>
                <h2 className="font-serif text-4xl font-bold mt-3 text-foreground text-balance">
                  See the difference for yourself
                </h2>
                <p className="text-muted-foreground mt-4 leading-relaxed">
                  For a restaurant doing $10,000/month in delivery orders:
                </p>

                <div className="mt-8 flex flex-col gap-6">
                  <div className="bg-card rounded-xl border border-border p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-muted-foreground">National Delivery App (25%)</span>
                      <span className="font-semibold text-destructive">-$2,500/mo</span>
                    </div>
                    <div className="bg-muted rounded-full h-4 overflow-hidden">
                      <div className="bg-destructive/50 h-full rounded-full" style={{ width: "100%" }} />
                    </div>
                  </div>

                  <div className="bg-card rounded-xl border border-primary/20 p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-muted-foreground">DDBA Local Delivery (5%)</span>
                      <span className="font-semibold text-primary">-$500/mo</span>
                    </div>
                    <div className="bg-muted rounded-full h-4 overflow-hidden">
                      <div className="bg-primary h-full rounded-full" style={{ width: "20%" }} />
                    </div>
                  </div>

                  <div className="bg-primary/5 rounded-xl border border-primary/10 p-6 text-center">
                    <span className="font-serif text-3xl font-bold text-primary">$2,000</span>
                    <p className="text-sm text-muted-foreground mt-1">saved every month with DDBA</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-serif text-2xl font-semibold text-foreground mb-6">{"What's included"}</h3>
                <div className="grid grid-cols-1 gap-3">
                  {included.map((item, i) => (
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
              Ready to join the network?
            </h2>
            <p className="text-muted-foreground mt-3 leading-relaxed">
              Create an account and a DDBA representative will reach out within 48 hours to get your restaurant listed.
            </p>
            <div className="mt-8">
              <Link href="/sign-up?from=restaurant">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
                  Apply Now
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
    </main>
  )
}
