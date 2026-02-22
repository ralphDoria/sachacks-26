import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export const metadata = {
  title: "Privacy Policy | DDBA Local Delivery",
  description: "How DDBA Local Delivery collects, uses, and protects your personal information.",
}

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-background">
        <div className="bg-foreground text-background py-20">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <span className="text-xs uppercase tracking-widest text-primary-foreground/50">Legal</span>
            <h1 className="font-serif text-4xl md:text-5xl font-bold mt-3 text-balance">
              Privacy Policy
            </h1>
            <p className="mt-4 text-lg opacity-70 max-w-xl leading-relaxed">
              Last updated: February 22, 2026
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-3xl px-4 lg:px-8 py-16">
          <div className="prose prose-neutral max-w-none space-y-10 text-foreground">

            <section>
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-3">1. Who We Are</h2>
              <p className="text-muted-foreground leading-relaxed">
                DDBA Local Delivery is operated by the Davis Downtown Business Association (DDBA), a nonprofit business
                improvement district located at 604 3rd St, Davis, CA 95616. We run this platform to help downtown Davis
                restaurants connect with local customers at fair fees.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-3">
                If you have any questions about this Privacy Policy, you can contact us at{" "}
                <a href="mailto:info@davisdowntown.org" className="text-primary hover:underline">
                  info@davisdowntown.org
                </a>{" "}
                or by calling (530) 756-8763.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-3">2. Information We Collect</h2>
              <p className="text-muted-foreground leading-relaxed">
                We collect information you provide directly when placing an order, including:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2 text-muted-foreground">
                <li><strong className="text-foreground">Contact information:</strong> Your name, email address, and phone number.</li>
                <li><strong className="text-foreground">Delivery address:</strong> The address you provide for delivery.</li>
                <li><strong className="text-foreground">Order details:</strong> The items you order and from which restaurants.</li>
                <li><strong className="text-foreground">Payment information:</strong> Credit card details processed securely through Stripe. We do not store your full card number on our servers.</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                We also automatically collect limited technical data, such as your browser type and IP address, to keep
                the platform running smoothly and to detect fraud.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-3">3. How We Use Your Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2 text-muted-foreground">
                <li>Process and fulfill your orders, including routing them to the correct restaurant.</li>
                <li>Coordinate delivery with a local driver.</li>
                <li>Send you order confirmations and updates.</li>
                <li>Respond to your questions or support requests.</li>
                <li>Improve the platform and understand how it is being used.</li>
                <li>Comply with legal obligations and prevent fraudulent transactions.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-3">4. How We Share Your Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                We do not sell, rent, or trade your personal information to third parties. We share your information
                only in the following limited circumstances:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2 text-muted-foreground">
                <li>
                  <strong className="text-foreground">Restaurants:</strong> We share your name, order details, and pickup/delivery notes with the restaurant
                  preparing your food.
                </li>
                <li>
                  <strong className="text-foreground">Drivers:</strong> We share your delivery address and first name with the driver completing your
                  delivery.
                </li>
                <li>
                  <strong className="text-foreground">Payment processor:</strong> Your payment information is transmitted directly to Stripe, our PCI-compliant
                  payment processor. Their privacy policy is available at{" "}
                  <a href="https://stripe.com/privacy" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                    stripe.com/privacy
                  </a>.
                </li>
                <li>
                  <strong className="text-foreground">Legal requirements:</strong> We may disclose information if required by law or to protect the safety
                  of our users or the public.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-3">5. Data Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                We take reasonable steps to protect your information from unauthorized access, loss, or misuse.
                All data is transmitted over encrypted HTTPS connections. Payment processing is handled entirely by
                Stripe and is never stored on our servers in unencrypted form.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-3">
                No system is completely secure. If you believe your information has been compromised, please contact
                us immediately at{" "}
                <a href="mailto:info@davisdowntown.org" className="text-primary hover:underline">
                  info@davisdowntown.org
                </a>.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-3">6. Data Retention</h2>
              <p className="text-muted-foreground leading-relaxed">
                We retain order records for up to three years for accounting and tax compliance purposes. You may
                request deletion of your personal information by contacting us, subject to any legal retention
                obligations.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-3">7. Your Rights (California Residents)</h2>
              <p className="text-muted-foreground leading-relaxed">
                Under the California Consumer Privacy Act (CCPA), California residents have the right to:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2 text-muted-foreground">
                <li>Know what personal information we collect and how it is used.</li>
                <li>Request deletion of your personal information.</li>
                <li>Opt out of the sale of your personal information (we do not sell your data).</li>
                <li>Non-discrimination for exercising your privacy rights.</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-3">
                To exercise any of these rights, contact us at{" "}
                <a href="mailto:info@davisdowntown.org" className="text-primary hover:underline">
                  info@davisdowntown.org
                </a>.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-3">8. Children's Privacy</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our platform is not directed to children under 13. We do not knowingly collect personal information
                from children. If you believe a child has provided us with personal information, please contact us
                and we will delete it.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-3">9. Changes to This Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update this Privacy Policy from time to time. When we do, we will update the "Last updated"
                date at the top of this page. We encourage you to review this policy periodically.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-3">10. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have questions or concerns about this Privacy Policy, please reach out:
              </p>
              <address className="not-italic mt-3 text-muted-foreground leading-relaxed">
                Davis Downtown Business Association<br />
                604 3rd St, Davis, CA 95616<br />
                (530) 756-8763<br />
                <a href="mailto:info@davisdowntown.org" className="text-primary hover:underline">
                  info@davisdowntown.org
                </a>
              </address>
            </section>

            <div className="pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Also see our{" "}
                <Link href="/terms" className="text-primary hover:underline">
                  Terms of Service
                </Link>.
              </p>
            </div>

          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
