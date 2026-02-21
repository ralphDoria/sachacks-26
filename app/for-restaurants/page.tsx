"use client"

import Link from "next/link"
import {
  DollarSign,
  Users,
  BarChart3,
  Shield,
  ArrowRight,
  Check,
  Phone,
} from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

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
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success("Application submitted! We will be in touch within 48 hours.")
  }

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-background">
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
              <a href="#apply">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 w-full sm:w-auto">
                  Apply Now
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </a>
              <Link href="/dashboard">
                <Button size="lg" variant="outline" className="border-background/20 text-background hover:bg-background/10 w-full sm:w-auto">
                  See Demo Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>

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

        <div className="py-24" id="apply">
          <div className="mx-auto max-w-2xl px-4 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs uppercase tracking-widest text-primary font-medium">Get Started</span>
              <h2 className="font-serif text-4xl font-bold mt-3 text-foreground text-balance">
                Apply to join the network
              </h2>
              <p className="text-muted-foreground mt-3 leading-relaxed">
                Fill out the form below and a DDBA representative will reach out within 48 hours.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="bg-card rounded-xl border border-border p-8">
              <div className="flex flex-col gap-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="restaurant-name" className="text-foreground">Restaurant Name</Label>
                    <Input id="restaurant-name" placeholder="Your restaurant" required className="bg-background text-foreground" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="contact-name" className="text-foreground">Contact Name</Label>
                    <Input id="contact-name" placeholder="Your name" required className="bg-background text-foreground" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="email" className="text-foreground">Email</Label>
                    <Input id="email" type="email" placeholder="you@restaurant.com" required className="bg-background text-foreground" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="phone" className="text-foreground">Phone</Label>
                    <Input id="phone" type="tel" placeholder="(530) 555-0000" required className="bg-background text-foreground" />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="address" className="text-foreground">Restaurant Address</Label>
                  <Input id="address" placeholder="Your downtown Davis address" required className="bg-background text-foreground" />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="message" className="text-foreground">Tell us about your restaurant</Label>
                  <Textarea id="message" placeholder="Cuisine type, average monthly orders, current delivery setup..." rows={4} className="bg-background text-foreground" />
                </div>
                <Button type="submit" size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
                  Submit Application
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </form>

            <div className="flex items-center justify-center gap-2 mt-8 text-sm text-muted-foreground">
              <Phone className="w-4 h-4" />
              <span>Questions? Call us at (530) 756-8763</span>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
