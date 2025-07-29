
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Loader2, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type Status = 'loading' | 'success' | 'failed' | 'pending';

export default function PaymentStatusPage() {
  const params = useParams();
  const router = useRouter();
  const transactionId = params.transactionId as string;
  const [status, setStatus] = useState<Status>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!transactionId) return;

    const checkStatus = async () => {
      try {
        // In a real application, you would make a request to your own backend
        // which would then securely check the status with PhonePe.
        // For this simulation, we'll just show a success message after a delay.
        
        // Simulating API call delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // This is a mock response. In a real app, you get this from your server.
        const mockResponse = {
            success: true,
            code: 'PAYMENT_SUCCESS',
            message: 'Your payment was successful.',
            data: {
                transactionId: transactionId,
                amount: 54900,
            }
        };

        if (mockResponse.success && mockResponse.code === 'PAYMENT_SUCCESS') {
          setStatus('success');
          setMessage(mockResponse.message);
        } else {
          setStatus('failed');
          setMessage(mockResponse.message || 'Payment failed or was cancelled.');
        }

      } catch (error) {
        console.error("Failed to check payment status:", error);
        setStatus('failed');
        setMessage('An error occurred while checking the payment status.');
      }
    };

    checkStatus();
  }, [transactionId]);

  const renderStatus = () => {
    switch (status) {
      case 'loading':
        return (
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="text-lg font-semibold">Verifying Payment...</p>
            <p className="text-muted-foreground">Please wait, do not close this page.</p>
          </div>
        );
      case 'success':
        return (
          <div className="flex flex-col items-center gap-4 text-center">
            <CheckCircle className="h-16 w-16 text-green-500" />
            <h2 className="text-2xl font-bold">Payment Successful!</h2>
            <p className="text-muted-foreground">{message}</p>
            <p className="text-sm text-muted-foreground">Transaction ID: {transactionId}</p>
            <Button onClick={() => router.push('/')} className="mt-4">Go to Homepage</Button>
          </div>
        );
      case 'failed':
        return (
          <div className="flex flex-col items-center gap-4 text-center">
            <XCircle className="h-16 w-16 text-destructive" />
            <h2 className="text-2xl font-bold">Payment Failed</h2>
            <p className="text-muted-foreground">{message}</p>
             <Button onClick={() => router.push('/')} variant="outline" className="mt-4">Try Again</Button>
          </div>
        );
       case 'pending':
        return (
          <div className="flex flex-col items-center gap-4 text-center">
            <AlertTriangle className="h-16 w-16 text-yellow-500" />
            <h2 className="text-2xl font-bold">Payment Pending</h2>
            <p className="text-muted-foreground">Your payment is pending. We will update you once the status changes.</p>
            <Button onClick={() => router.push('/')} className="mt-4">Go to Homepage</Button>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-200px)] items-center justify-center bg-secondary">
      <main className="container mx-auto px-4 md:px-6 py-16">
        <Card className="max-w-md mx-auto shadow-lg">
          <CardHeader>
            <CardTitle>Payment Status</CardTitle>
             <CardDescription>Your transaction status will be updated here.</CardDescription>
          </CardHeader>
          <CardContent className="py-12">
            {renderStatus()}