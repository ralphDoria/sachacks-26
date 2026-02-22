import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export const metadata = {
  title: "Terms of Service | DDBA Local Delivery",
  description: "The terms and conditions governing use of the DDBA Local Delivery platform.",
}

export default function TermsPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-background">
        <div className="bg-foreground text-background py-20">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <span className="text-xs uppercase tracking-widest text-primary-foreground/50">Legal</span>
            <h1 className="font-serif text-4xl md:text-5xl font-bold mt-3 text-balance">
              Terms of Service
            </h1>
            <p className="mt-4 text-lg opacity-70 max-w-xl leading-relaxed">
              Last updated: February 22, 2026
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-3xl px-4 lg:px-8 py-16">
          <div className="prose prose-neutral max-w-none space-y-10 text-foreground">

            <section>
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-3">1. Agreement to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing or using DDBA Local Delivery (the "Platform"), you agree to be bound by these Terms of
                Service ("Terms"). If you do not agree, please do not use the Platform.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-3">
                The Platform is operated by the Davis Downtown Business Association ("DDBA"), a nonprofit business
                improvement district located at 604 3rd St, Davis, CA 95616. We may update these Terms at any time.
                Continued use of the Platform after changes are posted constitutes your acceptance of the updated Terms.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-3">2. Description of Service</h2>
              <p className="text-muted-foreground leading-relaxed">
                DDBA Local Delivery is an online food ordering and delivery platform that connects customers with
                participating downtown Davis restaurants. We facilitate the placement of orders and coordinate delivery
                through local drivers. We do not prepare food and are not responsible for the quality or safety of
                food prepared by restaurants.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-3">3. Eligibility</h2>
              <p className="text-muted-foreground leading-relaxed">
                You must be at least 13 years of age to use the Platform. By using the Platform, you represent that
                you meet this requirement. You must provide accurate and complete information when placing an order.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-3">4. Orders and Payment</h2>
              <ul className="list-disc pl-6 mt-3 space-y-2 text-muted-foreground">
                <li>
                  <strong className="text-foreground">Order acceptance:</strong> Your order is not confirmed until you receive an order confirmation.
                  We reserve the right to refuse or cancel any order for any reason.
                </li>
                <li>
                  <strong className="text-foreground">Pricing:</strong> Menu prices and fees are displayed before checkout. A flat 5% platform fee
                  is applied to each order. Prices are subject to change without notice.
                </li>
                <li>
                  <strong className="text-foreground">Payment:</strong> Payments are processed by Stripe. By submitting an order, you authorize
                  us to charge your payment method for the total order amount. All sales are subject to applicable
                  California sales tax.
                </li>
                <li>
                  <strong className="text-foreground">Currency:</strong> All prices are in U.S. dollars.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-3">5. Cancellations and Refunds</h2>
              <p className="text-muted-foreground leading-relaxed">
                Orders may be cancelled before they are accepted by the restaurant. Once a restaurant begins preparing
                your order, cancellation may not be possible.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-3">
                If you receive an incorrect or significantly incomplete order, please contact us within 24 hours at{" "}
                <a href="mailto:info@davisdowntown.org" className="text-primary hover:underline">
                  info@davisdowntown.org
                </a>. Refunds are issued at our discretion on a case-by-case basis and may take 5–10 business days
                to appear on your statement.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-3">
                We are not responsible for delivery delays caused by factors outside our control, including but not
                limited to weather, traffic, or restaurant preparation times.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-3">6. Delivery</h2>
              <p className="text-muted-foreground leading-relaxed">
                Delivery is performed by independent local drivers who are not employees of DDBA. Estimated delivery
                times are provided as a courtesy and are not guaranteed. You are responsible for providing an accurate
                and accessible delivery address.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-3">
                If a delivery cannot be completed due to an incorrect address or no one being available to receive the
                order, you may not be entitled to a refund.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-3">7. Acceptable Use</h2>
              <p className="text-muted-foreground leading-relaxed">
                You agree not to:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2 text-muted-foreground">
                <li>Use the Platform for any unlawful purpose.</li>
                <li>Place fraudulent or abusive orders.</li>
                <li>Attempt to interfere with or disrupt the Platform's operation.</li>
                <li>Scrape, copy, or republish content from the Platform without permission.</li>
                <li>Impersonate another person or entity.</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-3">
                We reserve the right to block access to the Platform for any user who violates these Terms.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-3">8. Intellectual Property</h2>
              <p className="text-muted-foreground leading-relaxed">
                All content on the Platform — including text, images, logos, and software — is the property of DDBA
                or its licensors and is protected by applicable intellectual property laws. You may not reproduce or
                distribute any part of the Platform without our express written permission.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-3">9. Disclaimer of Warranties</h2>
              <p className="text-muted-foreground leading-relaxed">
                The Platform is provided "as is" and "as available" without warranties of any kind, express or implied.
                DDBA does not warrant that the Platform will be uninterrupted, error-free, or free of viruses or other
                harmful components. We do not warrant the accuracy or completeness of any menu information or pricing.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-3">10. Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                To the fullest extent permitted by law, DDBA and its officers, employees, and agents shall not be
                liable for any indirect, incidental, special, consequential, or punitive damages arising from your
                use of the Platform or any order placed through it. Our total liability to you for any claim shall
                not exceed the amount you paid for the specific order giving rise to the claim.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-3">11. Governing Law</h2>
              <p className="text-muted-foreground leading-relaxed">
                These Terms are governed by the laws of the State of California, without regard to its conflict of
                law provisions. Any disputes arising under these Terms shall be resolved in the courts of Yolo County,
                California, and you consent to personal jurisdiction in those courts.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-3">12. Contact</h2>
              <p className="text-muted-foreground leading-relaxed">
                For questions about these Terms, please contact us:
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
                <Link href="/privacy" className="text-primary hover:underline">
                  Privacy Policy
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
