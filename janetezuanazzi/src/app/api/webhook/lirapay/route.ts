import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// ============================================
// NOTA: Este webhook foi desativado.
// Agora usamos o webhook do Kiwify em /api/webhook/kiwify
// Mantido apenas para referência histórica.
// ============================================

const LIRAPAY_WEBHOOK_SECRET = process.env.LIRAPAY_WEBHOOK_SECRET || '';

/**
 * Webhook endpoint to receive payment status updates from LiraPay (DESATIVADO)
 * 
 * LiraPay will send POST requests to this endpoint when payment status changes:
 * - payment.created
 * - payment.pending
 * - payment.paid
 * - payment.expired
 * - payment.cancelled
 */
export async function POST(request: NextRequest) {
  // Webhook desativado - agora usando Kiwify
  console.log('Webhook LiraPay recebido (desativado) - Use /api/webhook/kiwify');
  return NextResponse.json(
    { error: 'Webhook desativado. Use /api/webhook/kiwify' },
    { status: 410 } // 410 Gone
  );
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
  
  const courseSlug = transaction.metadata?.course_slug;
  const customerEmail = transaction.metadata?.session_email || transaction.customer?.email;
  const customerName = transaction.customer?.name;
  let customerPassword = transaction.metadata?.customer_password;
  const customerCpf = transaction.customer?.document;
  const customerPhone = transaction.customer?.phone;
  
  if (!courseSlug || !customerEmail) {
    console.error('Missing required data for enrollment:', {
      courseSlug,
      customerEmail,
      hasPassword: !!customerPassword,
    });
    return;
  }

  try {
    // Create user account and enroll in course
    console.log(`Creating account and enrolling ${customerEmail} in course ${courseSlug}`);
    
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    // If no password was provided during checkout, generate a temporary one
    if (!customerPassword) {
      // simple temp password: last 4 of CPF + timestamp fragment
      const last4 = (transaction.customer?.document || '').toString().slice(-4);
      customerPassword = `Tmp${last4}${Date.now().toString().slice(-4)}!`;
    }
    const response = await fetch(`${siteUrl}/.netlify/functions/create-user-and-enroll`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: customerEmail,
        password: customerPassword,
        name: customerName,
        courseSlug,
        transactionId: transaction.id,
        cpf: customerCpf,
        phone: customerPhone,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Failed to create user and enroll:', errorData);
    } else {
      const data = await response.json();
      console.log('User created and enrolled successfully:', data);
    }
  } catch (error) {
    console.error('Error in handlePaymentPaid:', error);
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

