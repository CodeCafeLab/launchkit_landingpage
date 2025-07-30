
import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
    title: 'Shipping and Delivery Policy | BizTrack Suite',
    description: 'Information about shipping and delivery of our digital products and services at BizTrack Suite.',
};

export default function ShippingAndDeliveryPage() {
    return (
        <div className="bg-secondary">
            <main className="container mx-auto px-4 md:px-6 py-16 md:py-24">
                <Card className="max-w-4xl mx-auto shadow-lg">
                    <CardHeader className="text-center border-b">
                        <CardTitle className="text-4xl md:text-5xl font-bold font-headline">Shipping and Delivery Policy</CardTitle>
                        <p className="pt-2 text-muted-foreground">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </CardHeader>
                    <CardContent className="p-8 md:p-12">
                        <div className="prose dark:prose-invert prose-lg max-w-none">
                            <h2 className="font-headline text-2xl mt-8">1. Scope</h2>
                            <p>This policy applies to the delivery of all digital products, services, and software sold through BizTrack Suite. As we primarily offer digital services and products, this policy outlines how you will receive access to your purchases.</p>
                            
                            <h2 className="font-headline text-2xl mt-8">2. Digital Product Delivery</h2>
                            <p>Our products are digital and delivered electronically. After your purchase has been successfully processed, you will receive access to your digital product(s) in one or more of the following ways:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Email Delivery:</strong> A confirmation email with a download link or access credentials will be sent to the email address you provided during checkout. This email is typically sent within a few minutes of a successful transaction.</li>
                                <li><strong>Account Access:</strong> If your purchase requires an account, you will be able to access your product by logging into your account on our website.</li>
                            </ul>
                            
                            <h2 className="font-headline text-2xl mt-8">3. Service Delivery</h2>
                            <p>For our software development and consulting services, delivery is defined by the project milestones and final hand-off as outlined in your project agreement or statement of work. Communication and delivery of work products will be conducted through email, project management tools, and other agreed-upon digital channels.</p>

                            <h2 className="font-headline text-2xl mt-8">4. Delivery Timeframe</h2>
                            <p>For pre-built digital products (like templates or codebases), access is granted almost immediately after payment confirmation. For custom services, the delivery timeline will be specified in your project proposal and contract.</p>

                            <h2 className="font-headline text-2xl mt-8">5. No Physical Shipping</h2>
                            <p>BizTrack Suite does not sell or ship physical products. No shipping fees will be charged, and no physical items will be sent to your mailing address.</p>

                            <h2 className="font-headline text-2xl mt-8">Contact Us</h2>
                            <p>If you experience any issues with receiving your digital product or have questions about our delivery policy, please contact our support team immediately.</p>
                            <p>Email: <a href="mailto:support@biztracksuite.com" className="text-primary hover:underline">support@biztracksuite.com</a></p>
                        </div>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
