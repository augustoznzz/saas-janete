import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

const CAKTO_WEBHOOK_SECRET = process.env.CAKTO_WEBHOOK_SECRET || '';

/**
 * Webhook endpoint to receive payment status updates from Cakto
 *
 * Expected events (may vary by provider configuration):
 * - payment.paid / order.paid
 * - payment.failed / order.refused
 * - payment.refunded / order.refunded
 * - payment.chargeback / order.chargedback
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('x-cakto-signature') || request.headers.get('x-signature') || '';

    // Verify webhook signature for security (HMAC SHA256 of raw body)
    if (CAKTO_WEBHOOK_SECRET) {
      const expectedSignature = crypto.createHmac('sha256', CAKTO_WEBHOOK_SECRET).update(body).digest('hex');
      if (signature !== expectedSignature) {
        console.error('Invalid Cakto webhook signature');
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
      }
    }

    const payload = JSON.parse(body);
    const event = payload.event || payload.type || payload.status || payload.order_status;

    // Normalize structure
    const data = payload.data || payload.transaction || payload.order || payload;

    console.log('Cakto webhook received:', {
      event,
      id: data?.id || data?.order_id || data?.transaction_id,
      status: data?.status || payload?.order_status,
      customer: data?.customer?.email,
    });

    const normalizedEvent = (event || '').toLowerCase();

    if (normalizedEvent.includes('paid') || normalizedEvent === 'approved' || normalizedEvent === 'succeeded') {
      await handlePaymentPaid(data);
    } else if (normalizedEvent.includes('refused') || normalizedEvent.includes('failed') || normalizedEvent.includes('cancelled')) {
      await handlePaymentRefused(data);
    } else if (normalizedEvent.includes('refunded')) {
      await handlePaymentRefunded(data);
    } else if (normalizedEvent.includes('chargeback')) {
      await handlePaymentChargeback(data);
    } else {
      console.log('Unhandled Cakto webhook event:', normalizedEvent || event);
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('Cakto webhook processing error:', error);
    // Return 200 to avoid retries on parsing issues; adjust if provider expects 4xx
    return NextResponse.json({ error: error.message }, { status: 200 });
  }
}

async function handlePaymentPaid(data: any) {
  const customerEmail = data?.customer?.email || data?.customer_email || data?.buyer?.email;
  const customerName = data?.customer?.name || data?.buyer?.name;
  const customerPhone = (data?.customer?.phone || data?.buyer?.phone) as string | undefined;
  const transactionId = data?.id || data?.order_id || data?.transaction_id;

  const courseSlug = data?.metadata?.course_slug
    || data?.custom_fields?.course_slug
    || mapProductIdToCourseSlug(
      data?.product?.id || data?.product_id || data?.items?.[0]?.product_id
    );

  if (!courseSlug || !customerEmail) {
    console.error('Missing required data for Cakto enrollment', { courseSlug, customerEmail });
    return;
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  // Generate a temporary password
  const tempPassword = `Cakto${Date.now().toString().slice(-6)}!`;

  try {
    const response = await fetch(`${siteUrl}/.netlify/functions/create-user-and-enroll`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: customerEmail,
        password: tempPassword,
        name: customerName,
        courseSlug,
        transactionId,
        phone: customerPhone,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Cakto: failed to create user and enroll', errorData);
      return;
    }

    const result = await response.json();
    console.log('Cakto: user created and enrolled successfully:', result);
  } catch (err) {
    console.error('Cakto enrollment error:', err);
  }
}

async function handlePaymentRefused(data: any) {
  console.log('Cakto payment refused:', data?.id || data?.order_id);
}

async function handlePaymentRefunded(data: any) {
  console.log('Cakto payment refunded:', data?.id || data?.order_id);
}

async function handlePaymentChargeback(data: any) {
  console.log('Cakto payment chargeback:', data?.id || data?.order_id);
}

function mapProductIdToCourseSlug(productId: string): string | null {
  const productMap: Record<string, string> = {
    // Example: 'abc123': 'introducao-ao-bordado'
  };
  return productId ? (productMap[productId] || null) : null;
}

export async function GET() {
  return NextResponse.json({ status: 'ok', message: 'Cakto webhook endpoint is active' });
}


