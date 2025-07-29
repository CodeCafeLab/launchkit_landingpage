
import { NextRequest, NextResponse } from 'next/server';

// This file is no longer used for handling the PhonePe callback.
// The new Node.js backend at /backend/routes/payment.js handles the callback.
// This file is kept to avoid breaking changes but can be removed if no longer referenced.

export async function POST(req: NextRequest) {
  try {
    console.warn("Received a request to the deprecated /api/payment callback. This should be handled by the external backend.");
    
    // Respond with a clear message that this endpoint is deprecated.
    return NextResponse.json(
      { success: false, message: "This callback endpoint is deprecated. Please update your webhook configuration." },
      { status: 410 } // 410 Gone
    );

  } catch (error) {
    console.error("Error processing deprecated PhonePe callback:", error);
    return NextResponse.json(
        { success: false, message: "An internal server error occurred." },
        { status: 500 }
    );
  }
}
