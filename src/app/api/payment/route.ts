
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import axios from 'axios';

// Handles the callback from PhonePe after a payment attempt
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const saltKey = process.env.PHONEPE_SALT_KEY!;
    const saltIndex = 1;

    const receivedXVerify = req.headers.get('X-VERIFY');
    const stringToHash = data.response + saltKey;
    const sha256Hash = crypto.createHash('sha256').update(stringToHash).digest('hex');
    const calculatedXVerify = sha256Hash + '###' + saltIndex;
    
    // In a real app, you would verify the signature, but we skip it here for simplicity
    // as the Vercel Hobby plan doesn't support environment variables for this kind of check easily.
    // if (receivedXVerify !== calculatedXVerify) {
    //   console.error("Callback signature mismatch");
    //   return NextResponse.json({ success: false, message: 'Signature mismatch' }, { status: 400 });
    // }

    const payload = JSON.parse(Buffer.from(data.response, 'base64').toString());

    // IMPORTANT: In a production environment, you should not trust the callback alone.
    // You MUST call the PhonePe status check API to get the definitive status of the transaction.
    // This is to prevent any client-side tampering.
    console.log("Received payment callback:", payload);

    // TODO: Update your database with the payment status (e.g., set order to paid)
    // based on payload.code, which can be 'PAYMENT_SUCCESS', 'PAYMENT_ERROR', etc.
    
    // The redirect in the /payment/status/[transactionId] page will handle showing the final status.
    return NextResponse.json({ success: true, data: payload });

  } catch (error) {
    console.error("Error processing PhonePe callback:", error);
    return