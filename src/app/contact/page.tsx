
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Phone, MapPin, Loader2, CheckCircle, ShieldCheck } from 'lucide-react';

import { classifyLead, type ClassifyLeadOutput } from '@/ai/flows/classify-lead';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction } from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  phone: z.string().optional(),
  projectDetails: z.string().min(10, "Please provide some details about your project."),
});

type FormData = z.infer<typeof formSchema>;


export default function ContactPage() {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [classificationResult, setClassificationResult] = useState<ClassifyLeadOutput | null>(null);
    const [isResultOpen, setIsResultOpen] = useState(false);
    
    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: { name: "", email: "", phone: "", projectDetails: "" },
    });
    
    async function onSubmit(values: FormData) {
        setIsSubmitting(true);
        setClassificationResult(null);
        try {
          const result = await classifyLead({
            name: values.name,
            email: values.email,
            phone: values.phone,
            projectDetails: values.projectDetails,
          });
          setClassificationResult(result);
          setIsResultOpen(true);
          form.reset();
        } catch (error) {
          console.error("Failed to classify lead:", error);
          toast({
            variant: "destructive",
            title: "Submission Failed",
            description: "Could not submit your request. Please try again.",
          });
        } finally {
          setIsSubmitting(false);
        }
    }

    return (
        <>
            <div className="bg-background text-foreground">
                <main className="container mx-auto px-4 md:px-6 py-16 md:py-24">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <h1 className="text-4xl md:text-5xl font-bold font-headline">Contact Us</h1>
                            <p className="mt-4 text-lg text-muted-foreground">We'd love to hear from you. Please fill out the form below or reach us through our contact details.</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-12 items-start">
                            <Card className="shadow-lg">
                                <CardHeader>
                                    <CardTitle>Send us a Message</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Form {...form}>
                                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                            <FormField control={form.control} name="name" render={({ field }) => (
                                                <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="e.g. John Doe" {...field} /></FormControl><FormMessage /></FormItem>
                                            )} />
                                            <FormField control={form.control} name="email" render={({ field }) => (
                                                <FormItem><FormLabel>Work Email</FormLabel><FormControl><Input placeholder="e.g. john@company.com" {...field} /></FormControl><FormMessage /></FormItem>
                                            )} />
                                            <FormField control={form.control} name="phone" render={({ field }) => (
                                                <FormItem><FormLabel>Phone Number (Optional)</FormLabel><FormControl><Input placeholder="e.g. +1 234 567 8900" {...field} /></FormControl><FormMessage /></FormItem>
                                            )} />
                                            <FormField control={form.control} name="projectDetails" render={({ field }) => (
                                                <FormItem><FormLabel>How can we help you?</FormLabel><FormControl><Textarea placeholder="Tell us about your project..." {...field} rows={4} /></FormControl><FormMessage /></FormItem>
                                            )} />
                                            <Button type="submit" disabled={isSubmitting} className="w-full !mt-6" size="lg">
                                                {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing...</> : "Submit Request"}
                                            </Button>
                                            <p className="text-xs text-center text-muted-foreground pt-2">
                                                <ShieldCheck className="inline-block h-4 w-4 mr-1" />
                                                Your data is 100% safe with us.
                                            </p>
                                        </form>
                                    </Form>
                                </CardContent>
                            </Card>

                            <div className="space-y-8">
                                <Card className="shadow-lg">
                                    <CardHeader>
                                        <CardTitle>Contact Information</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="flex items-start gap-4">
                                            <Mail className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                                            <div>
                                                <h3 className="font-semibold text-lg">Email</h3>
                                                <a href="mailto:support@biztracksuite.com" className="text-muted-foreground hover:text-primary transition-colors">support@biztracksuite.com</a>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <Phone className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                                            <div>
                                                <h3 className="font-semibold text-lg">Phone</h3>
                                                <p className="text-muted-foreground">+91 123 456 7890</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <MapPin className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                                            <div>
                                                <h3 className="font-semibold text-lg">Address</h3>
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
            <AlertDialog open={isResultOpen} onOpenChange={setIsResultOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="flex items-center gap-2 font-headline">
                        <CheckCircle className="h-6 w-6 text-primary" />
                        Request Received!
                        </AlertDialogTitle>
                        <AlertDialogDescription className="pt-4 text-left space-y-4">
                        <p>Thanks for your interest! We've received your request and will be in touch within 24 hours.</p>
                        {classificationResult && (
                            <div className="p-4 border rounded-lg bg-muted/50 space-y-3">
                            <h4 className="font-semibold text-foreground">Internal Lead Analysis:</h4>
                            <p className="text-sm">Priority: <span className={classificationResult.priority === 'High' ? 'text-destructive font-bold' : classificationResult.priority === 'Medium' ? 'text-yellow-600 font-bold' : 'text-green-600 font-bold'}>{classificationResult.priority}</span></p>
                            <p className="text-sm text-muted-foreground">{classificationResult.classificationReason}</p>
                            </div>
                        )}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction onClick={() => setIsResultOpen(false)}>
                        Awesome!
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
