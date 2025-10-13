import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';

// LiraPay API Configuration
const LIRAPAY_API_URL = process.env.LIRAPAY_API_URL || 'https://api.lirapay.com.br';
const LIRAPAY_API_KEY = process.env.LIRAPAY_API_KEY || '';
const LIRAPAY_MERCHANT_ID = process.env.LIRAPAY_MERCHANT_ID || '';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { course, customer } = body;

    // Validate required fields
    if (!course || !customer) {
      return NextResponse.json(
        { error: 'Dados do curso ou cliente faltando' },
        { status: 400 }
      );
    }

    if (!customer.name || !customer.email || !customer.cpf) {
      return NextResponse.json(
        { error: 'Dados obrigatórios do cliente faltando' },
        { status: 400 }
      );
    }

    // Validate environment variables
    if (!LIRAPAY_API_KEY || !LIRAPAY_MERCHANT_ID) {
      console.error('LiraPay credentials not configured');
      console.error('LIRAPAY_API_KEY:', LIRAPAY_API_KEY ? 'defined' : 'missing');
      console.error('LIRAPAY_MERCHANT_ID:', LIRAPAY_MERCHANT_ID ? 'defined' : 'missing');
      return NextResponse.json(
        { error: 'Configuração de pagamento incompleta. Verifique as variáveis de ambiente.' },
        { status: 500 }
      );
    }

    console.log('Creating PIX transaction with LiraPay...');
    console.log('Course:', course.slug, '-', course.title);
    console.log('Amount:', course.price, 'BRL');

    // Create PIX transaction with LiraPay
    const pixPayload = {
      merchant_id: LIRAPAY_MERCHANT_ID,
      amount: Math.round(course.price * 100), // Convert to cents
      currency: 'BRL',
      payment_method: 'pix',
      description: `Inscrição no curso: ${course.title}`,
      customer: {
        name: customer.name,
        email: customer.email,
        document: customer.cpf.replace(/\D/g, ''), // Remove non-numeric characters
        phone: customer.phone?.replace(/\D/g, '') || '',
      },
      metadata: {
        course_slug: course.slug,
        course_title: course.title,
        customer_password: customer.password, // Store password for account creation
      },
      webhook_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/webhook/lirapay`,
      expires_in: 3600, // 1 hour
    };

    // Normalize base URL (remove trailing slashes)
    const baseUrl = (LIRAPAY_API_URL || '').replace(/\/+$/, '');

    // Add timeout to protect from hanging network calls
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    let response: Response;
    try {
      response = await fetch(`${baseUrl}/v1/transactions/pix`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${LIRAPAY_API_KEY}`,
          'X-API-Version': '2024-01',
        },
        body: JSON.stringify(pixPayload),
        signal: controller.signal,
      });
    } catch (err: any) {
      clearTimeout(timeoutId);
      const debugId = randomUUID();
      console.error('LiraPay network error', {
        debugId,
        message: err?.message,
        cause: (err as any)?.cause,
        name: err?.name,
        stack: err?.stack,
      });
      const isAbort = err?.name === 'AbortError';
      const userMessage = isAbort
        ? 'Tempo esgotado ao conectar ao gateway de pagamento. Tente novamente.'
        : 'Gateway de pagamento indisponível. Tente novamente em alguns minutos.';
      return NextResponse.json(
        { error: userMessage, debugId },
        { status: 502 }
      );
    } finally {
      // Ensure timer is cleared if fetch succeeded
      clearTimeout(timeoutId);
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('LiraPay API error:', errorData);
      const debugId = randomUUID();
      // Map 5xx errors from provider to a friendlier message
      const isServerError = response.status >= 500;
      const message = isServerError
        ? 'Gateway de pagamento indisponível. Tente novamente em alguns minutos.'
        : (errorData.message || 'Erro ao processar pagamento');
      return NextResponse.json(
        { error: message, debugId },
        { status: isServerError ? 502 : response.status }
      );
    }

    const data = await response.json();

    // Return payment data to frontend
    return NextResponse.json({
      transactionId: data.transaction_id || data.id,
      qrCode: data.pix_qr_code || data.qr_code,
      qrCodeBase64: data.pix_qr_code_base64 || data.qr_code_image || `data:image/png;base64,${data.qr_code_base64}`,
      expiresAt: data.expires_at || new Date(Date.now() + 3600000).toISOString(),
      status: data.status || 'pending',
    });

  } catch (error: any) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: error.message || 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

