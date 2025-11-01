import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

const KIWIFY_WEBHOOK_SECRET = process.env.KIWIFY_WEBHOOK_SECRET || '';

/**
 * Webhook endpoint to receive payment status updates from Kiwify
 * 
 * Kiwify will send POST requests to this endpoint when payment status changes:
 * - order.paid
 * - order.refused
 * - order.refunded
 * - order.chargedback
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('x-kiwify-signature') || 
                     request.headers.get('x-signature') || '';

    // Verify webhook signature for security
    if (KIWIFY_WEBHOOK_SECRET) {
      const expectedSignature = crypto
        .createHmac('sha256', KIWIFY_WEBHOOK_SECRET)
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
    const { order_status, order_id, Product, Customer, custom_fields } = data;

    console.log('Kiwify webhook received:', {
      order_status,
      order_id,
      product: Product?.product_name,
      customer: Customer?.email,
    });

    // Handle different event types
    switch (order_status) {
      case 'paid':
        await handleOrderPaid(data);
        break;

      case 'refused':
        await handleOrderRefused(data);
        break;

      case 'refunded':
        await handleOrderRefunded(data);
        break;

      case 'chargedback':
        await handleOrderChargedback(data);
        break;

      default:
        console.log('Unhandled webhook event:', order_status);
    }

    // Always return 200 to acknowledge receipt
    return NextResponse.json({ received: true });

  } catch (error: any) {
    console.error('Webhook processing error:', error);
    // Still return 200 to prevent retries
    return NextResponse.json({ error: error.message }, { status: 200 });
  }
}

async function handleOrderPaid(data: any) {
  console.log('Order paid:', data.order_id);
  
  const { Product, Customer, custom_fields, order_id } = data;
  
  // Extrair informações do cliente
  const customerEmail = Customer?.email;
  const customerName = Customer?.full_name || Customer?.name;
  const customerPhone = Customer?.mobile || Customer?.phone;
  
  // O courseSlug pode vir de custom_fields ou ser mapeado pelo product_id
  const courseSlug = custom_fields?.course_slug || 
                     mapProductIdToCourseSlug(Product?.product_id);
  
  if (!courseSlug || !customerEmail) {
    console.error('Missing required data for enrollment:', {
      courseSlug,
      customerEmail,
    });
    return;
  }

  try {
    // Create user account and enroll in course
    console.log(`Creating account and enrolling ${customerEmail} in course ${courseSlug}`);
    
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    
    // Generate a temporary password for the user
    const tempPassword = `Kiwi${Date.now().toString().slice(-6)}!`;
    
    const response = await fetch(`${siteUrl}/.netlify/functions/create-user-and-enroll`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: customerEmail,
        password: tempPassword,
        name: customerName,
        courseSlug,
        transactionId: order_id,
        phone: customerPhone,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Failed to create user and enroll:', errorData);
    } else {
      const result = await response.json();
      console.log('User created and enrolled successfully:', result);
      
      // TODO: Send welcome email with temporary password
      // You should implement an email service to send the credentials
    }
  } catch (error) {
    console.error('Error in handleOrderPaid:', error);
  }
}

async function handleOrderRefused(data: any) {
  console.log('Order refused:', data.order_id);
  
  // TODO: Handle refused order
  // 1. Send notification to user
  // 2. Update database status if needed
}

async function handleOrderRefunded(data: any) {
  console.log('Order refunded:', data.order_id);
  
  // TODO: Handle refunded order
  // 1. Remove user access to course
  // 2. Update database
  // 3. Notify user
}

async function handleOrderChargedback(data: any) {
  console.log('Order chargedback:', data.order_id);
  
  // TODO: Handle chargedback order
  // 1. Remove user access
  // 2. Flag for review
  // 3. Notify admin
}

/**
 * Map Kiwify product IDs to course slugs
 * Update this mapping with your actual Kiwify product IDs
 */
function mapProductIdToCourseSlug(productId: string): string | null {
  const productMap: Record<string, string> = {
    'eDz2HDA': 'introducao-ao-bordado', // Introdução ao Bordado
  };
  
  return productMap[productId] || null;
}

// Allow GET requests to verify webhook is working
export async function GET() {
  return NextResponse.json({ 
    status: 'ok',
    message: 'Kiwify webhook endpoint is active'
  });
}

