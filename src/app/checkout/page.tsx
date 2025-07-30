
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import { Loader2, Rocket, Lock } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

const orderFormSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
});

type OrderFormData = z.infer<typeof orderFormSchema>;

const BACKEND_URL = 'http://localhost:4000';

export default function CheckoutPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<OrderFormData>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: { fullName: "", email: "" },
  });

  async function onSubmit(values: OrderFormData) {
    setIsSubmitting(true);
    try {
      const orderPayload = {
        name: values.fullName,
        email: values.email,
        amount: 549, // Amount in INR
        userId: 'CUID' + Date.now(),
      };
      
      const { data } = await axios.post(`${BACKEND_URL}/api/payment/pay`, orderPayload);
      
      if (data.success && data.redirectUrl) {
        window.location.href = data.redirectUrl;
      } else {
        toast({
          variant: "destructive",
          title: "Payment Failed",
          description: data.message || "Could not initiate payment. Please try again.",
        });
      }
    } catch (error) {
      console.error("Failed to initiate payment:", error);
      let message = "An unexpected error occurred. Please try again later.";
      if (axios.isAxiosError(error) && error.response) {
        message = error.response.data.message || message;
      }
      toast({
        variant: "destructive",
        title: "Payment Error",
        description: message,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="w-full bg-secondary">
      <main className="container mx-auto px-4 md:px-6 py-12 md:py-20 min-h-[calc(100vh-80px)]">
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Left Column */}
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <Rocket className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold font-headline">BizTrack Suite</span>
            </div>

            <Card className="bg-background">
              <CardHeader>
                <CardTitle className="text-2xl">Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField control={form.control} name="fullName" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl><Input placeholder="e.g. John Doe" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="email" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl><Input placeholder="e.g. john@example.com" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <Button type="submit" disabled={isSubmitting} className="w-full text-lg mt-4" size="lg">
                      {isSubmitting ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Processing...</> : "Place Order"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>

             <p className="text-xs text-center text-muted-foreground pt-2">
                By placing your order, you agree to our <a href="/terms-and-conditions" className="text-primary hover:underline">Terms & Conditions</a> and <a href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</a>.
            </p>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <Card className="bg-background">
              <CardHeader>
                <CardTitle className="text-2xl">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="bg-secondary rounded-lg p-2">
                        <Rocket className="h-8 w-8 text-primary"/>
                    </div>
                    <div>
                        <p className="font-semibold">BizTrack Suite - Lifetime Access</p>
                        <p className="text-sm text-muted-foreground">One-time payment</p>
                    </div>
                  </div>
                  <p className="font-semibold text-lg">₹549.00</p>
                </div>
                <Separator />
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <p className="text-muted-foreground">Subtotal</p>
                        <p>₹549.00</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="text-muted-foreground">Discount (40%)</p>
                        <p className="text-green-600">-₹450.00</p>
                    </div>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-xl">
                    <p>Total</p>
                    <p>₹549.00</p>
                </div>
              </CardContent>
               <CardContent>
                <div className="flex items-center gap-3 text-sm text-muted-foreground p-4 bg-secondary rounded-lg">
                    <Lock className="h-5 w-5 text-primary"/>
                    <span>Secure payment powered by PhonePe. All major UPI, Credit/Debit cards accepted.</span>
                </div>
               </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

    