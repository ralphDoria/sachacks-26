import Link from "next/link"
import Image from "next/image"

export function SiteFooter() {
  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2" aria-label="DartDavis home">
              <Image src="/DartDavis-logo.png" alt="DartDavis" width={160} height={64} className="h-16 w-auto object-contain" />
              <span className="font-serif text-xl font-bold leading-none tracking-tight">DartDavis</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed opacity-70 max-w-xs">
              A community-first delivery platform by the Davis Downtown Business Association. Keeping dollars local since 1989.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 opacity-50">For Diners</h3>
            <ul className="flex flex-col gap-3">
              <li><Link href="/restaurants" className="text-sm opacity-70 hover:opacity-100 transition-opacity">Browse Restaurants</Link></li>
              <li><Link href="/how-it-works" className="text-sm opacity-70 hover:opacity-100 transition-opacity">How It Works</Link></li>
              <li><Link href="/cart" className="text-sm opacity-70 hover:opacity-100 transition-opacity">Your Cart</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 opacity-50">For Restaurants</h3>
            <ul className="flex flex-col gap-3">
              <li><Link href="/for-restaurants" className="text-sm opacity-70 hover:opacity-100 transition-opacity">Join the Platform</Link></li>
              <li><Link href="/dashboard" className="text-sm opacity-70 hover:opacity-100 transition-opacity">Restaurant Dashboard</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 opacity-50">About DartDavis</h3>
            <ul className="flex flex-col gap-3">
              <li><span className="text-sm opacity-70">Davis Downtown Business Association</span></li>
              <li><span className="text-sm opacity-70">604 3rd St, Davis, CA 95616</span></li>
              <li><span className="text-sm opacity-70">(530) 756-8763</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-background/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs opacity-50">
            {'2026 Davis Downtown Business Association. All rights reserved.'}
          </p>
          <p className="text-xs opacity-50">
            Built with care for our community
          </p>
        </div>
      </div>
    </footer>
  )
}
