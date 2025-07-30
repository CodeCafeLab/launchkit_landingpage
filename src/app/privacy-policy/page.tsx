
import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
    title: 'Privacy Policy | BizTrack Suite',
    description: 'Read the Privacy Policy of BizTrack Suite to understand how we collect, use, and protect your data.',
};

export default function PrivacyPolicyPage() {
    return (
        <div className="bg-secondary">
            <main className="container mx-auto px-4 md:px-6 py-16 md:py-24">
                <Card className="max-w-4xl mx-auto shadow-lg">
                    <CardHeader className="text-center border-b">
                        <CardTitle className="text-4xl md:text-5xl font-bold font-headline">Privacy Policy</CardTitle>
                        <p className="pt-2 text-muted-foreground">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </CardHeader>
                    <CardContent className="p-8 md:p-12">
                        <div className="prose dark:prose-invert prose-lg max-w-none">
                            <h2 className="font-headline text-2xl mt-8">Introduction</h2>
                            <p>Welcome to BizTrack Suite. We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.</p>
                            
                            <h2 className="font-headline text-2xl mt-8">Information We Collect</h2>
                            <p>We may collect information about you in a variety of ways. The information we may collect on the Site includes:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Personal Data:</strong> Personally identifiable information, such as your name, shipping address, email address, and telephone number, and demographic information, such as your age, gender, hometown, and interests, that you voluntarily give to us when you register with the Site or when you choose to participate in various activities related to the Site.</li>
                                <li><strong>Derivative Data:</strong> Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site.</li>
                            </ul>

                            <h2 className="font-headline text-2xl mt-8">Use of Your Information</h2>
                            <p>Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Create and manage your account.</li>
                                <li>Email you regarding your account or order.</li>
                                <li>Fulfill and manage purchases, orders, payments, and other transactions related to the Site.</li>
                                <li>Improve our website and services.</li>
                            </ul>

                            <h2 className="font-headline text-2xl mt-8">Disclosure of Your Information</h2>
                            <p>We may share information we have collected about you in certain situations. Your information may be disclosed as follows:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>By Law or to Protect Rights:</strong> If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.</li>
                                <li><strong>Third-Party Service Providers:</strong> We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.</li>
                            </ul>

                            <h2 className="font-headline text-2xl mt-8">Security of Your Information</h2>
                            <p>We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.</p>

                            <h2 className="font-headline text-2xl mt-8">Contact Us</h2>
                            <p>If you have questions or comments about this Privacy Policy, please contact us at:</p>
                            <p>Email: <a href="mailto:support@biztracksuite.com" className="text-primary hover:underline">support@biztracksuite.com</a></p>
                        </div>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
