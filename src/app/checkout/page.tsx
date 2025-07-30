
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import { Loader2, CheckCircle, Lock } from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import image1 from './../payment_gateway_logo.png'

const orderFormSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters."),
  lastName: z.string().min(2, "Last name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  streetAddress: z.string().min(5, "Street address is required."),
  pinCode: z.string().min(6, "A valid 6-digit PIN code is required.").max(6),
  state: z.string().min(2, "State is required."),
});

type OrderFormData = z.infer<typeof orderFormSchema>;

const BACKEND_URL = 'http://localhost:4000';

export default function CheckoutPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<OrderFormData>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      streetAddress: "",
      pinCode: "",
      state: "",
    },
  });

  async function onSubmit(values: OrderFormData) {
    setIsSubmitting(true);
    try {
      const orderPayload = {
        name: `${values.firstName} ${values.lastName}`,
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
    <div className="w-full bg-background text-foreground">
      <main className="container mx-auto px-4 md:px-6 py-12 md:py-20">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold tracking-tight font-headline">CHECKOUT</h1>
        </div>

        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md relative flex items-center justify-between" role="alert">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 mr-2" />
              <span className="block sm:inline">"BizTrack Suite - Lifetime Access" has been added to your cart.</span>
            </div>
            <Button variant="outline" size="sm" className="bg-white text-gray-700 border-gray-300 hover:bg-gray-50">View cart</Button>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid lg:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {/* Left Column - Billing Details */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold font-headline border-b pb-4">Billing Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField control={form.control} name="firstName" render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name <span className="text-destructive">*</span></FormLabel>
                    <FormControl><Input placeholder="First Name" {...field} className="bg-secondary/50" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="lastName" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name <span className="text-destructive">*</span></FormLabel>
                    <FormControl><Input placeholder="Last Name" {...field} className="bg-secondary/50" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              <FormItem>
                <FormLabel>Country / Region <span className="text-destructive">*</span></FormLabel>
                <p className="font-medium">India</p>
              </FormItem>

              <FormField control={form.control} name="streetAddress" render={({ field }) => (
                <FormItem>
                  <FormLabel>Street address <span className="text-destructive">*</span></FormLabel>
                  <FormControl><Input placeholder="House number and street name" {...field} className="bg-secondary/50" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="state" render={({ field }) => (
                <FormItem>
                  <FormLabel>State <span className="text-destructive">*</span></FormLabel>
                  <FormControl><Input placeholder="State" {...field} className="bg-secondary/50" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="pinCode" render={({ field }) => (
                <FormItem>
                  <FormLabel>PIN Code <span className="text-destructive">*</span></FormLabel>
                  <FormControl><Input placeholder="PIN Code" {...field} className="bg-secondary/50" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address <span className="text-destructive">*</span></FormLabel>
                  <FormControl><Input placeholder="e.g. john@example.com" {...field} className="bg-secondary/50" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <p className="text-xs text-center text-muted-foreground pt-2">
                By placing your order, you agree to our <a href="/terms-and-conditions" className="text-primary hover:underline">Terms & Conditions</a>.
              </p>
            </div>

            {/* Right Column - Order Summary */}
            <div className="space-y-6">
              <div className="border rounded-lg p-6 bg-secondary/30">
                <h2 className="text-2xl font-semibold font-headline border-b pb-4 mb-6">Your Order</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center font-medium">
                    <p>Product</p>
                    <p>Subtotal</p>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <p className="text-muted-foreground">BizTrack Suite - Lifetime Access × 1</p>
                    <p className="font-medium">₹549.00</p>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center font-medium">
                    <p>Subtotal</p>
                    <p>₹549.00</p>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center font-bold text-xl">
                    <p>Total</p>
                    <p>₹549.00</p>
                  </div>
                </div>

                <div className="mt-8 border rounded-lg p-4 bg-background">
                  <h3 className="font-medium mb-4">PhonePe Payment Solutions</h3>
                  <div className="flex items-center gap-4">
                    <Image src={image1} alt="PhonePe Logo" width={300} height={76} />
                  </div>
                  <div className="mt-4 p-3">
                    <p className="text-xs text-red-600">All UPI apps, Debit and Credit Cards, and NetBanking accepted | Powered by PhonePe</p>
                  </div>

                  <Button type="submit" disabled={isSubmitting} className="w-full text-lg mt-6" size="lg" variant="destructive">
                    {isSubmitting ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Processing...</> : "Place Order"}
                  </Button>
                </div>

              </div>
            </div>
          </form>
        </Form>
      </main>
    </div>
  );
}
