
import { Metadata } from 'next';
import { Button } from "@/components/ui/button";
import { Rocket } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Terms & Conditions | BizTrack Suite',
    description: 'Read the Terms and Conditions for using BizTrack Suite services and website.',
};

export default function TermsAndConditionsPage() {
    return (
        <div className="bg-background text-foreground">
            <header className="w-full bg-background/80 border-b border-border/50 backdrop-blur-sm py-3 sticky top-0 z-50">
                <div className="container mx-auto flex items-center justify-between px-4 md:px-6">
                    <Link href="/" className="flex items-center gap-2">
                        <Rocket className="h-7 w-7 text-primary" />
                        <span className="text-xl font-bold font-headline">BizTrack Suite</span>
                    </Link>
                    <Button asChild>
                        <Link href="/">Back to Home</Link>
                    </Button>
                </div>
            </header>
            <main className="container mx-auto px-4 md:px-6 py-16 md:py-24">
                <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
                    <h1>Terms and Conditions</h1>
                    <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

                    <h2>1. Agreement to Terms</h2>
                    <p>By using our services, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.</p>
                    
                    <h2>2. Services</h2>
                    <p>BizTrack Suite provides software development services, including but not limited to web and mobile application development, UI/UX design, and product engineering. All services are provided as-is and we make no guarantees regarding the outcome of any project.</p>

                    <h2>3. Payments</h2>
                    <p>All payments for services are due as per the agreed-upon schedule in your project proposal. We accept payments through various methods, which will be detailed in your invoice. Failure to make timely payments may result in a suspension of services.</p>

                    <h2>4. Intellectual Property</h2>
                    <p>Upon final payment, the client will own the intellectual property for the work product delivered. We reserve the right to use the project in our portfolio and marketing materials unless otherwise agreed in writing.</p>

                    <h2>5. Limitation of Liability</h2>
                    <p>In no event shall BizTrack Suite, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the service.</p>

                    <h2>6. Governing Law</h2>
                    <p>These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions.</p>
                    
                    <h2>7. Changes</h2>
                    <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>

                    <h2>Contact Us</h2>
                    <p>If you have any questions about these Terms, please contact us at:</p>
                    <p>Email: <a href="mailto:support@biztracksuite.com">support@biztracksuite.com</a></p>
                </div>
            </main>
        </div>
    );
}
