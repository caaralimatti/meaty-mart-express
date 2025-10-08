import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FileText } from "lucide-react";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <FileText className="h-10 w-10 text-primary" />
            <h1 className="text-4xl font-bold">Terms of Service</h1>
          </div>
          <p className="text-muted-foreground">🐐 GoatGoat Seller App</p>
          <p className="text-sm text-muted-foreground mt-2">Last Updated: October 3, 2025</p>
        </div>

        <Card>
          <CardContent className="pt-6 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-3">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground">
                By accessing and using the GoatGoat Seller App ("the App"), you accept and agree to be bound by the terms and
                provisions of this agreement. If you do not agree to these Terms of Service, please do not use the App.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-3">2. Seller Registration</h2>
              <p className="text-muted-foreground">
                To use the App, you must register as a seller and provide accurate, current, and complete information. You are
                responsible for maintaining the confidentiality of your account credentials and for all activities that occur
                under your account.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-3">3. Seller Obligations</h2>
              <p className="text-muted-foreground mb-3">As a seller on our platform, you agree to:</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Provide accurate product information and pricing</li>
                <li>Maintain adequate inventory levels</li>
                <li>Process orders promptly and efficiently</li>
                <li>Deliver products within the promised timeframe</li>
                <li>Comply with all applicable laws and regulations</li>
                <li>Maintain food safety standards (if applicable)</li>
              </ul>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-3">4. Product Listings</h2>
              <p className="text-muted-foreground">
                You are solely responsible for the content of your product listings. All products must comply with Indian laws and
                regulations. We reserve the right to remove any product listing that violates our policies or applicable laws.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-3">5. Pricing and Payments</h2>
              <p className="text-muted-foreground">
                You are responsible for setting your product prices. GoatGoat will charge a commission on each sale as per the
                agreed rate. Payments will be processed according to our payment schedule. You agree to provide valid bank account
                details for receiving payments.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-3">6. Order Fulfillment</h2>
              <p className="text-muted-foreground">
                You must fulfill orders within the delivery timeframe specified. Failure to fulfill orders may result in
                penalties, suspension, or termination of your seller account. You must notify customers promptly of any delays or
                issues.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-3">7. Returns and Refunds</h2>
              <p className="text-muted-foreground">
                You must comply with our returns and refunds policy. Customers have the right to return products that are
                defective, damaged, or not as described. You are responsible for processing returns and issuing refunds as per our
                policy.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-3">8. Intellectual Property</h2>
              <p className="text-muted-foreground">
                You retain ownership of your product images and descriptions. However, by uploading content to the App, you grant
                GoatGoat a non-exclusive, worldwide license to use, display, and distribute your content for the purpose of
                operating the platform.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-3">9. Prohibited Activities</h2>
              <p className="text-muted-foreground mb-3">You agree not to:</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Sell counterfeit, illegal, or prohibited products</li>
                <li>Engage in fraudulent activities</li>
                <li>Manipulate prices or ratings</li>
                <li>Violate any applicable laws or regulations</li>
                <li>Interfere with the operation of the platform</li>
              </ul>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-3">10. Account Suspension and Termination</h2>
              <p className="text-muted-foreground">
                We reserve the right to suspend or terminate your account at any time for violation of these Terms of Service,
                fraudulent activity, or any other reason we deem appropriate. You may also terminate your account at any time by
                contacting our support team.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-3">11. Limitation of Liability</h2>
              <p className="text-muted-foreground">
                GoatGoat shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting
                from your use of the App. Our total liability shall not exceed the amount of commissions paid by you in the past
                12 months.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-3">12. Indemnification</h2>
              <p className="text-muted-foreground">
                You agree to indemnify and hold harmless GoatGoat, its affiliates, and their respective officers, directors,
                employees, and agents from any claims, damages, losses, liabilities, and expenses arising from your use of the App
                or violation of these Terms.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-3">13. Governing Law</h2>
              <p className="text-muted-foreground">
                These Terms of Service shall be governed by and construed in accordance with the laws of India. Any disputes
                arising from these Terms shall be subject to the exclusive jurisdiction of the courts in Bangalore, Karnataka.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-3">14. Changes to Terms</h2>
              <p className="text-muted-foreground">
                We reserve the right to modify these Terms of Service at any time. We will notify you of any changes by posting
                the new Terms on the App. Your continued use of the App after such changes constitutes your acceptance of the new
                Terms.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-3">15. Contact Information</h2>
              <p className="text-muted-foreground mb-3">If you have any questions about these Terms of Service, please contact us at:</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li><strong>Email:</strong> support@goatgoat.com</li>
                <li><strong>Phone:</strong> +91 99 6738 9263</li>
                <li><strong>Address:</strong> Belgaum, Karnataka, India</li>
              </ul>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
