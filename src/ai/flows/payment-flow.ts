
'use server';

/**
 * @fileOverview This file is now deprecated. 
 * The payment logic has been moved to a dedicated Node.js backend service.
 * The frontend now directly calls the backend API.
 * This file is kept to avoid breaking existing import paths but should not be used for new development.
 */

import { z } from 'zod';

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

export async function initiatePayment(input: InitiatePaymentInput): Promise<InitiatePaymentOutput> {
  console.error("DEPRECATED: initiatePayment function was called. This logic has moved to the external backend.");
  return {
    success: false,
    message: "This payment function is deprecated and should not be called.",
  };
}
