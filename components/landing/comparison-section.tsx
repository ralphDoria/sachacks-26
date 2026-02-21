import { Check, X } from "lucide-react"

const comparisons = [
  {
    feature: "Commission per order",
    national: "15-30%",
    ddba: "5% flat",
    advantage: true,
  },
  {
    feature: "Monthly fees",
    national: "$300-500+",
    ddba: "$0",
    advantage: true,
  },
  {
    feature: "Customer data ownership",
    national: "Platform keeps it",
    ddba: "You own it all",
    advantage: true,
  },
  {
    feature: "Delivery zone",
    national: "Broad, impersonal",
    ddba: "Downtown Davis focus",
    advantage: true,
  },
  {
    feature: "Menu control",
    national: "Limited customization",
    ddba: "Full control",
    advantage: true,
  },
  {
    feature: "Community investment",
    national: "Revenue leaves town",
    ddba: "Every dollar stays local",
    advantage: true,
  },
]

export function ComparisonSection() {
  return (
    <section className="py-24 bg-card">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-primary font-medium">Why Switch</span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mt-3 text-foreground text-balance">
            Built for restaurants, not against them
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            National delivery apps charge up to 30% per order. We believe local restaurants
            deserve better. Here is how we compare.
          </p>
        </div>

        <div className="overflow-hidden rounded-xl border border-border bg-card">
          <div className="grid grid-cols-3 bg-muted">
            <div className="p-4 lg:p-6 text-sm font-semibold text-foreground">Feature</div>
            <div className="p-4 lg:p-6 text-sm font-semibold text-muted-foreground text-center">National Apps</div>
            <div className="p-4 lg:p-6 text-sm font-semibold text-primary text-center">DDBA Local</div>
          </div>
          {comparisons.map((row, i) => (
            <div key={i} className="grid grid-cols-3 border-t border-border">
              <div className="p-4 lg:p-6 text-sm font-medium text-foreground">{row.feature}</div>
              <div className="p-4 lg:p-6 text-sm text-muted-foreground text-center flex items-center justify-center gap-2">
                <X className="w-4 h-4 text-destructive hidden sm:block flex-shrink-0" />
                <span>{row.national}</span>
              </div>
              <div className="p-4 lg:p-6 text-sm text-foreground text-center flex items-center justify-center gap-2 bg-primary/5">
                <Check className="w-4 h-4 text-primary hidden sm:block flex-shrink-0" />
                <span className="font-medium">{row.ddba}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
