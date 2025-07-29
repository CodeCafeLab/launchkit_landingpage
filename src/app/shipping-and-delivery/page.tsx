
import { Metadata } from 'next';
import { Button } from "@/components/ui/button";
import { Rocket } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Shipping and Delivery Policy | BizTrack Suite',
    description: 'Information about shipping and delivery of our digital products and services at BizTrack Suite.',
};

export default function ShippingAndDeliveryPage() {
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
                    <h1>Shipping and Delivery Policy</h1>
                    <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

                    <h2>1. Scope</h2>
                    <p>This policy applies to the delivery of all digital products, services, and software sold through BizTrack Suite. As we primarily offer digital services and products, this policy outlines how you will receive access to your purchases.</p>
                    
                    <h2>2. Digital Product Delivery</h2>
                    <p>Our products are digital and delivered electronically. After your purchase has been successfully processed, you will receive access to your digital product(s) in one or more of the following ways:</p>
                    <ul>
                        <li><strong>Email Delivery:</strong> A confirmation email with a download link or access credentials will be sent to the email address you provided during checkout. This email is typically sent within a few minutes of a successful transaction.</li>
                        <li><strong>Account Access:</strong> If your purchase requires an account, you will be able to access your product by logging into your account on our website.</li>
                    </ul>
                    
                    <h2>3. Service Delivery</h2>
                    <p>For our software development and consulting services, delivery is defined by the project milestones and final hand-off as outlined in your project agreement or statement of work. Communication and delivery of work products will be conducted through email, project management tools, and other agreed-upon digital channels.</p>

                    <h2>4. Delivery Timeframe</h2>
                    <p>For pre-built digital products (like templates or codebases), access is granted almost immediately after payment confirmation. For custom services, the delivery timeline will be specified in your project proposal and contract.</p>

                    <h2>5. No Physical Shipping</h2>
                    <p>BizTrack Suite does not sell or ship physical products. No shipping fees will be charged, and no physical items will be sent to your mailing address.</p>

                    <h2>Contact Us</h2>
                    <p>If you experience any issues with receiving your digital product or have questions about our delivery policy, please contact our support team immediately.</p>
                    <p>Email: <a href="mailto:support@biztracksuite.com">support@biztracksuite.com</a></p>
                </div>
            </main>
        </div>
    );
}
