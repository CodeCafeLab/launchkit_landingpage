
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Refund Policy | BizTrack Suite',
    description: 'Read the Refund Policy for products and services offered by BizTrack Suite.',
};

export default function RefundPolicyPage() {
    return (
        <div className="bg-background text-foreground">
            <main className="container mx-auto px-4 md:px-6 py-16 md:py-24">
                <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
                    <h1>Refund Policy</h1>
                    <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

                    <h2>1. Overview</h2>
                    <p>We stand behind our products and services and want our customers to be satisfied. We offer a 7-day money-back guarantee on our one-time purchase digital product, as stated on our sales page.</p>

                    <h2>2. One-Time Purchase Digital Product</h2>
                    <p>For our lifetime access digital product sold for a one-time fee, you are eligible for a full refund if you request it within 7 days of the purchase date. To request a refund, please email our support team with your order details. No questions will be asked, but we appreciate any feedback you can provide.</p>
                    <p>After the 7-day period, no refunds will be issued.</p>
                    
                    <h2>3. Custom Development Services</h2>
                    <p>Payments for custom software development services are tied to project milestones and are non-refundable once a milestone is approved and payment is made. This is because our team allocates resources and incurs costs at each stage of the project. If you are unsatisfied with the service, please contact us to discuss a potential resolution.</p>
                    
                    <h2>4. How to Request a Refund</h2>
                    <p>To request a refund for an eligible product, please send an email to <a href="mailto:support@biztracksuite.com">support@biztracksuite.com</a>. Please include the following information:</p>
                    <ul>
                        <li>Your full name</li>
                        <li>Email address used for the purchase</li>
                        <li>Order/transaction number</li>
                        <li>Reason for the refund request (optional, but helpful)</li>
                    </ul>

                    <h2>5. Processing Time</h2>
                    <p>Refunds will be processed within 5-7 business days of receiving your request. The refund will be issued to the original payment method used for the purchase.</p>

                    <h2>Contact Us</h2>
                    <p>If you have any questions about our Refund Policy, please contact us.</p>
                    <p>Email: <a href="mailto:support@biztracksuite.com">support@biztracksuite.com</a></p>
                </div>
            </main>
        </div>
    );
}
