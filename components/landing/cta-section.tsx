import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CtaSection() {
  return (
    <section className="py-24 bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 lg:px-8 text-center">
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-balance">
          Ready to support downtown Davis?
        </h2>
        <p className="mt-4 text-lg opacity-80 max-w-2xl mx-auto leading-relaxed">
          Whether you are a hungry local or a restaurant owner looking for a fairer platform,
          we are here for you.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
          <Link href="/restaurants">
            <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 px-8 gap-2 w-full sm:w-auto">
              Order Now
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="/for-restaurants">
            <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 w-full sm:w-auto">
              Partner With Us
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
