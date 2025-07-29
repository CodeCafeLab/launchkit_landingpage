
import { Metadata } from 'next';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Rocket, Mail, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Contact Us | BizTrack Suite',
    description: 'Get in touch with the BizTrack Suite team for any inquiries, support, or feedback.',
};

export default function ContactPage() {
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
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold font-headline">Contact Us</h1>
                        <p className="mt-4 text-lg text-muted-foreground">We'd love to hear from you. Please fill out the form below or reach us through our contact details.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 items-start">
                        <Card>
                            <CardHeader>
                                <CardTitle>Send us a Message</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form className="space-y-4">
                                    <div className="space-y-2">
                                        <label htmlFor="name">Full Name</label>
                                        <Input id="name" placeholder="John Doe" />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="email">Email</label>
                                        <Input id="email" type="email" placeholder="john@example.com" />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="subject">Subject</label>
                                        <Input id="subject" placeholder="e.g., Project Inquiry" />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="message">Message</label>
                                        <Textarea id="message" placeholder="Your message here..." rows={5} />
                                    </div>
                                    <Button type="submit" className="w-full">Send Message</Button>
                                </form>
                            </CardContent>
                        </Card>

                        <div className="space-y-8">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Contact Information</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-start gap-4">
                                        <Mail className="h-6 w-6 text-primary mt-1" />
                                        <div>
                                            <h3 className="font-semibold">Email</h3>
                                            <a href="mailto:support@biztracksuite.com" className="text-muted-foreground hover:text-primary">support@biztracksuite.com</a>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <Phone className="h-6 w-6 text-primary mt-1" />
                                        <div>
                                            <h3 className="font-semibold">Phone</h3>
                                            <p className="text-muted-foreground">+91 123 456 7890</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <MapPin className="h-6 w-6 text-primary mt-1" />
                                        <div>
                                            <h3 className="font-semibold">Address</h3>
                                            <p className="text-muted-foreground">123 Tech Park, Bangalore, India</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
