
'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { Loader2, CheckCircle, XCircle, AlertTriangle, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type Status = 'loading' | 'success' | 'failed' | 'pending';

const BACKEND_URL = 'http://localhost:4000';


export default function PaymentStatusPage() {
  const params = useParams();
  const router = useRouter();
  const transactionId = params.transactionId as string;
  const [status, setStatus] = useState<Status>('loading');
  const [message, setMessage] = useState('');
  const [retries, setRetries] = useState(0);

  const checkStatus = useCallback(async () => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/api/payment/status/${transactionId}`);

      if (data.success && data.code === 'PAYMENT_SUCCESS') {
        setStatus('success');
        setMessage(data.message);
      } else if (data.code === 'PAYMENT_PENDING') {
        setStatus('pending');
        setMessage('Your payment is still being processed. Please wait.');
        // Retry after a delay if payment is pending
        if (retries < 5) {
          setTimeout(() => setRetries(retries + 1), 3000);
        }
      } else {
        setStatus('failed');
        setMessage(data.message || 'Payment failed or was cancelled.');
      }
    } catch (error) {
      console.error("Failed to check payment status:", error);
      setStatus('failed');
      setMessage('An error occurred while checking the payment status.');
    }
  }, [transactionId, retries]);


  useEffect(() => {
    if (!transactionId) {
        router.push('/');
        return;
    };
    // Initial check and subsequent retries
    checkStatus();

  }, [transactionId, checkStatus, router]);

  const handleDownload = () => {
    // In a real application, this would link to a secure download endpoint
    // that verifies the user's purchase before providing the file.
    alert("Downloading your product... (This is a simulation)");
  };

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
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <Button onClick={handleDownload}>
                    <Download className="mr-2 h-4 w-4"/>
                    Download Product
                </Button>
                <Button onClick={() => router.push('/')} variant="outline">
                    Go to Homepage
                </Button>
            </div>
          </div>
        );
      case 'failed':
        return (
          <div className="flex flex-col items-center gap-4 text-center">
            <XCircle className="h-16 w-16 text-destructive" />
            <h2 className="text-2xl font-bold">Payment Failed</h2>
            <p className="text-muted-foreground">{message}</p>
             <Button onClick={() => router.push('/#payment')} variant="outline" className="mt-4">Try Again</Button>
          </div>
        );
       case 'pending':
        return (
          <div className="flex flex-col items-center gap-4 text-center">
            <AlertTriangle className="h-16 w-16 text-yellow-500" />
            <h2 className="text-2xl font-bold">Payment Pending</h2>
            <p className="text-muted-foreground">{message}</p>
            <Loader2 className="h-6 w-6 animate-spin text-primary my-4" />
            <p className="text-sm text-muted-foreground">We are checking the status...</p>
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
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
