
import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
    title: 'Terms & Conditions | BizTrack Suite',
    description: 'Read the Terms and Conditions for using BizTrack Suite services and website.',
};

export default function TermsAndConditionsPage() {
    return (
        <div className="bg-secondary">
            <main className="container mx-auto px-4 md:px-6 py-16 md:py-24">
                <Card className="max-w-4xl mx-auto shadow-lg">
                    <CardHeader className="text-center border-b">
                        <CardTitle className="text-4xl md:text-5xl font-bold font-headline">Terms and Conditions</CardTitle>
                        <p className="pt-2 text-muted-foreground">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </CardHeader>
                    <CardContent className="p-8 md:p-12">
                        <div className="prose dark:prose-invert prose-lg max-w-none">
                            <h2 className="font-headline text-2xl mt-8">1. Agreement to Terms</h2>
                            <p>By using our services, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.</p>
                            
                            <h2 className="font-headline text-2xl mt-8">2. Services</h2>
                            <p>BizTrack Suite provides software development services, including but not limited to web and mobile application development, UI/UX design, and product engineering. All services are provided as-is and we make no guarantees regarding the outcome of any project.</p>

                            <h2 className="font-headline text-2xl mt-8">3. Payments</h2>
                            <p>All payments for services are due as per the agreed-upon schedule in your project proposal. We accept payments through various methods, which will be detailed in your invoice. Failure to make timely payments may result in a suspension of services.</p>

                            <h2 className="font-headline text-2xl mt-8">4. Intellectual Property</h2>
                            <p>Upon final payment, the client will own the intellectual property for the work product delivered. We reserve the right to use the project in our portfolio and marketing materials unless otherwise agreed in writing.</p>

                            <h2 className="font-headline text-2xl mt-8">5. Limitation of Liability</h2>
                            <p>In no event shall BizTrack Suite, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the service.</p>

                            <h2 className="font-headline text-2xl mt-8">6. Governing Law</h2>
                            <p>These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions.</p>
                            
                            <h2 className="font-headline text-2xl mt-8">7. Changes</h2>
                            <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>

                            <h2 className="font-headline text-2xl mt-8">Contact Us</h2>
                            <p>If you have any questions about these Terms, please contact us at:</p>
                            <p>Email: <a href="mailto:support@biztracksuite.com" className="text-primary hover:underline">support@biztracksuite.com</a></p>
                        </div>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
