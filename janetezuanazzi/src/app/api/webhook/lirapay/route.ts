import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

const LIRAPAY_WEBHOOK_SECRET = process.env.LIRAPAY_WEBHOOK_SECRET || '';

/**
 * Webhook endpoint to receive payment status updates from LiraPay
 * 
 * LiraPay will send POST requests to this endpoint when payment status changes:
 * - payment.created
 * - payment.pending
 * - payment.paid
 * - payment.expired
 * - payment.cancelled
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('x-lirapay-signature') || '';

    // Verify webhook signature for security
    if (LIRAPAY_WEBHOOK_SECRET) {
      const expectedSignature = crypto
        .createHmac('sha256', LIRAPAY_WEBHOOK_SECRET)
        .update(body)
        .digest('hex');

      if (signature !== expectedSignature) {
        console.error('Invalid webhook signature');
        return NextResponse.json(
          { error: 'Invalid signature' },
          { status: 401 }
        );
      }
    }

    const data = JSON.parse(body);
    const { event, transaction } = data;

    console.log('LiraPay webhook received:', {
      event,
      transactionId: transaction?.id,
      status: transaction?.status,
    });

    // Handle different event types
    switch (event) {
      case 'payment.paid':
        await handlePaymentPaid(transaction);
        break;

      case 'payment.expired':
        await handlePaymentExpired(transaction);
        break;

      case 'payment.cancelled':
        await handlePaymentCancelled(transaction);
        break;

      default:
        console.log('Unhandled webhook event:', event);
    }

    // Always return 200 to acknowledge receipt
    return NextResponse.json({ received: true });

  } catch (error: any) {
    console.error('Webhook processing error:', error);
    // Still return 200 to prevent retries
    return NextResponse.json({ error: error.message }, { status: 200 });
  }
}

async function handlePaymentPaid(transaction: any) {
  console.log('Payment confirmed:', transaction.id);
  
  // TODO: Implement your business logic here:
  // 1. Update database with payment confirmation
  // 2. Grant course access to user
  // 3. Send confirmation email
  // 4. Create user account if doesn't exist
  
  const courseSlug = transaction.metadata?.course_slug;
  const customerEmail = transaction.customer?.email;
  
  if (courseSlug && customerEmail) {
    // Example: Store enrollment in database
    console.log(`Enrolling ${customerEmail} in course ${courseSlug}`);
    
    // You can call your Netlify functions here
    // await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/.netlify/functions/enroll`, {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     email: customerEmail,
    //     courseSlug,
    //     transactionId: transaction.id,
    //   }),
    // });
  }
}

async function handlePaymentExpired(transaction: any) {
  console.log('Payment expired:', transaction.id);
  
  // TODO: Handle expired payment
  // 1. Send notification to user
  // 2. Update database status
}

async function handlePaymentCancelled(transaction: any) {
  console.log('Payment cancelled:', transaction.id);
  
  // TODO: Handle cancelled payment
  // 1. Update database status
  // 2. Notify user if needed
}

// Allow GET requests to verify webhook is working
export async function GET() {
  return NextResponse.json({ 
    status: 'ok',
    message: 'LiraPay webhook endpoint is active'
  });
}

