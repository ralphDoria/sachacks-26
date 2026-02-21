import Link from "next/link"
import { Search, ShoppingBag, Bike, Utensils, ArrowRight, Heart, Shield, DollarSign } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"

const steps = [
  {
    icon: Search,
    number: "01",
    title: "Discover local restaurants",
    description:
      "Browse through a curated collection of downtown Davis restaurants. Filter by cuisine, view menus, and read reviews from your neighbors.",
  },
  {
    icon: ShoppingBag,
    number: "02",
    title: "Build your order",
    description:
      "Add your favorite dishes to your cart. See real-time pricing with no hidden fees. Our service fee is a flat 5% that goes directly to maintaining the platform.",
  },
  {
    icon: Bike,
    number: "03",
    title: "Local drivers deliver",
    description:
      "A local Davis community member picks up your food and delivers it to your door. Our drivers are your neighbors, not gig workers from out of town.",
  },
  {
    icon: Utensils,
    number: "04",
    title: "Enjoy knowing you made an impact",
    description:
      "By choosing DDBA Local Delivery, you help restaurants keep up to 25% more revenue per order compared to national apps. Every meal matters.",
  },
]

const values = [
  {
    icon: Heart,
    title: "Community First",
    description: "Every dollar spent stays in Davis. We are not a Silicon Valley startup extracting value from small businesses.",
  },
  {
    icon: DollarSign,
    title: "Fair Fees",
    description: "Just 5% per order. Compare that to DoorDash's 15-30%. Restaurants keep more, which means better food and service for you.",
  },
  {
    icon: Shield,
    title: "Transparent Operations",
    description: "We are run by the DDBA, a nonprofit business improvement district. Our books are open and our mission is clear.",
  },
]

export default function HowItWorksPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-background">
        <div className="bg-foreground text-background py-20">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <span className="text-xs uppercase tracking-widest text-primary-foreground/50">How It Works</span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mt-3 max-w-3xl text-balance">
              Simple ordering. Real community impact.
            </h1>
            <p className="mt-4 text-lg opacity-70 max-w-xl leading-relaxed">
              We built this platform so that every meal ordered downtown benefits the people who make Davis special.
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 lg:px-8 py-24">
          <div className="flex flex-col gap-16">
            {steps.map((step, i) => (
              <div key={i} className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                <div className="md:col-span-2">
                  <span className="font-serif text-5xl font-bold text-primary/20">{step.number}</span>
                </div>
                <div className="md:col-span-2 flex justify-center">
                  <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10">
                    <step.icon className="w-7 h-7 text-primary" />
                  </div>
                </div>
                <div className="md:col-span-8">
                  <h2 className="font-serif text-2xl font-semibold text-foreground">{step.title}</h2>
                  <p className="text-muted-foreground mt-3 leading-relaxed max-w-lg">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-muted/50 py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-xs uppercase tracking-widest text-primary font-medium">Our Values</span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold mt-3 text-foreground">
                Why we exist
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((value, i) => (
                <div key={i} className="bg-card rounded-xl border border-border p-8 text-center">
                  <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mx-auto">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-foreground mt-5">{value.title}</h3>
                  <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="py-24 text-center">
          <div className="mx-auto max-w-2xl px-4">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground text-balance">
              Ready to support your downtown?
            </h2>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              Browse our partner restaurants and place your first order today.
            </p>
            <Link href="/restaurants" className="mt-8 inline-block">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
                Browse Restaurants
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
