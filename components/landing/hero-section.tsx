"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[85vh] py-16 lg:py-0">
          <div className="flex flex-col gap-8 max-w-xl">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-accent" />
              <span className="text-xs uppercase tracking-widest opacity-60">Community-First Delivery</span>
            </div>

            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-balance">
              Order local.
              <br />
              <span className="text-primary">Keep it</span>
              <br />
              <span className="text-primary">downtown.</span>
            </h1>

            <p className="text-lg leading-relaxed opacity-70 max-w-md">
              The Davis Downtown delivery alternative. Lower fees for restaurants, faster delivery for you, and every dollar stays in our community.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/restaurants">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 gap-2 w-full sm:w-auto">
                  Browse Restaurants
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/for-restaurants">
                <Button size="lg" variant="outline" className="bg-transparent border-background/40 text-background hover:bg-background/10 w-full sm:w-auto">
                  For Restaurant Owners
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div>
                <div className="text-2xl font-bold font-serif">32+</div>
                <div className="text-xs opacity-50 uppercase tracking-wider">Blocks Served</div>
              </div>
              <div className="w-px h-10 bg-background/10" />
              <div>
                <div className="text-2xl font-bold font-serif">5%</div>
                <div className="text-xs opacity-50 uppercase tracking-wider">Flat Fee</div>
              </div>
              <div className="w-px h-10 bg-background/10" />
              <div>
                <div className="text-2xl font-bold font-serif">1989</div>
                <div className="text-xs opacity-50 uppercase tracking-wider">Est.</div>
              </div>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="relative w-full aspect-[4/5] overflow-hidden">
              <Image
                src="/davis-images-hardcoded/main-landing-davis-pillar.avif"
                alt="Downtown Davis"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Left fade */}
              <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-foreground to-transparent" />
              {/* Right fade */}
              <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-foreground to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
