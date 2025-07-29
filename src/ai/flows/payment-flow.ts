
'use server';

/**
 * @fileOverview Initiates a payment process with PhonePe.
 *
 * - initiatePayment - A function that starts the payment flow.
 * - InitiatePaymentInput - The input type for the initiatePayment function.
 * - InitiatePaymentOutput - The return type for the initiatePayment function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import axios from 'axios';
import crypto from 'crypto';

const InitiatePaymentInputSchema = z.object({
  name: z.string().describe("The customer's name."),
  email: z.string().email().describe("The customer's email."),
  amount: z.number().describe('The payment amount in paisa (e.g., 100 for ₹1.00).'),
  userId: z.string().describe("The unique ID of the user."),
});
export type InitiatePaymentInput = z.infer<typeof InitiatePaymentInputSchema>;

const InitiatePaymentOutputSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  redirectUrl: z.string().optional(),
});
export type InitiatePaymentOutput = z.infer<typeof InitiatePaymentOutputSchema>;

// This function is the main entry point called by the frontend.
export async function initiatePayment(input: InitiatePaymentInput): Promise<InitiatePaymentOutput> {
  return initiatePaymentFlow(input);
}

// The Genkit flow that orchestrates the payment initiation.
const initiatePaymentFlow = ai.defineFlow(
  {
    name: 'initiatePaymentFlow',
    inputSchema: InitiatePaymentInputSchema,
    outputSchema: InitiatePaymentOutputSchema,
  },
  async (input) => {
    try {
      const merchantTransactionId = 'MUID' + Date.now();
      const { name, amount, userId } = input;
      
      const data = {
        merchantId: process.env.PHONEPE_MERCHANT_ID!,
        merchantTransactionId: merchantTransactionId,
        merchantUserId: userId,
        amount: amount * 100, // convert to paisa
        redirectUrl: `http://localhost:9002/payment/status/${merchantTransactionId}`,
        redirectMode: 'POST',
        callbackUrl: `http://localhost:9002/api/payment/callback`,
        mobileNumber: '9999999999', // Placeholder, replace with actual if available
        paymentInstrument: {
          type: 'PAY_PAGE',
        },
      };

      const payload = JSON.stringify(data);
      const payloadBuffer = Buffer.from(payload, 'utf-8');
      const base64Payload = payloadBuffer.toString('base64');
      
      const saltKey = process.env.PHONEPE_SALT_KEY!;
      const saltIndex = 1;

      const stringToHash = base64Payload + '/pg/v1/pay' + saltKey;
      const sha256Hash = crypto.createHash('sha256').update(stringToHash).digest('hex');
      const xVerify = sha256Hash + '###' + saltIndex;

      const options = {
        method: 'post',
        url: `${process.env.PHONEPE_HOST_URL}/pg/v1/pay`,
        headers: {
          'Content-Type': 'application/json',
          'X-VERIFY': xVerify,
        },
        data: {
          request: base64Payload,
        },
      };

      const response = await axios.request(options);

      if (response.data.success) {
        return {
          success: true,
          message: response.data.message,
          redirectUrl: response.data.data.instrumentResponse.redirectInfo.url,
        };
      } else {
        return {
          success: false,
          message: response.data.message || 'Payment initiation failed',
        };
      }
    } catch (error) {
      console.error('PhonePe API Error:', error);
       let message = 'An unknown error occurred';
      if (axios.isAxiosError(error) && error.response) {
        message = error.response.data.message || 'Failed to connect to payment gateway';
      } else if (error instanceof Error) {
        message = error.message;
      }
      return {
        success: false,
        message: message,
      };
    }
  }
);
