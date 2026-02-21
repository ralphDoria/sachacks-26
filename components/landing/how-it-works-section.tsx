import { Search, ShoppingBag, Bike, Utensils } from "lucide-react"

const steps = [
  {
    icon: Search,
    title: "Browse local spots",
    description: "Explore menus from your favorite downtown Davis restaurants, all in one place.",
  },
  {
    icon: ShoppingBag,
    title: "Place your order",
    description: "Add items to your cart and check out directly. No hidden fees, no surprises.",
  },
  {
    icon: Bike,
    title: "Local delivery",
    description: "A local Davis driver picks up your food and delivers it fresh to your door.",
  },
  {
    icon: Utensils,
    title: "Enjoy and support local",
    description: "Every order supports independent restaurants and keeps revenue in our community.",
  },
]

export function HowItWorksSection() {
  return (
    <section className="py-24 bg-background" id="how-it-works">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-primary font-medium">Simple Process</span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mt-3 text-foreground text-balance">
            How it works
          </h2>
          <p className="mt-4 text-muted-foreground max-w-lg mx-auto leading-relaxed">
            From craving to doorstep in four simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="relative flex flex-col items-center text-center gap-4 p-6">
              <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10">
                <step.icon className="w-7 h-7 text-primary" />
              </div>
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-accent text-accent-foreground text-sm font-bold">
                {i + 1}
              </div>
              <h3 className="font-serif text-xl font-semibold text-foreground">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
