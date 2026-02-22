import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { HeroSection } from "@/components/landing/hero-section"
import { ComparisonSection } from "@/components/landing/comparison-section"
import { HowItWorksSection } from "@/components/landing/how-it-works-section"
import { FeaturedRestaurantsSection } from "@/components/landing/featured-restaurants-section"
import { CtaSection } from "@/components/landing/cta-section"

export default function HomePage() {
  console.log("Stripe key value:", process.env.STRIPE_SECRET_KEY);
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <FeaturedRestaurantsSection />
        <ComparisonSection />
        <HowItWorksSection />
        <CtaSection />
      </main>
      <SiteFooter />
    </>
  )
}
