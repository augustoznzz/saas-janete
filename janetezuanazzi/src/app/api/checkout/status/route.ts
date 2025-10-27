import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';

// ============================================
// NOTA: Esta API foi desativada.
// Agora usamos redirecionamento direto para o Kiwify.
// Mantido apenas para referência histórica.
// ============================================

const LIRAPAY_API_URL = process.env.LIRAPAY_API_URL || 'https://api.lirapay.com.br';
const LIRAPAY_API_KEY = process.env.LIRAPAY_API_KEY || '';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: NextRequest) {
  // API desativada - agora usando Kiwify
  return NextResponse.json(
    { error: 'API desativada. Use o redirecionamento direto para Kiwify.' },
    { status: 410 } // 410 Gone
  );
  try {
    const { searchParams } = new URL(request.url);
    const transactionId = searchParams.get('transactionId');

    if (!transactionId) {
      return NextResponse.json(
        { error: 'Transaction ID não fornecido' },
        { status: 400 }
      );
    }

    if (!LIRAPAY_API_KEY) {
      return NextResponse.json(
        { error: 'Configuração de pagamento incompleta' },
        { status: 500 }
      );
    }

    // Normalize base URL (remove trailing slash)
    const baseUrl = (LIRAPAY_API_URL || '').replace(/\/+$/, '');

    // Add timeout to network call
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);
    let response: Response;
    try {
      response = await fetch(
        `${baseUrl}/v1/transactions/${transactionId}`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${LIRAPAY_API_KEY}`,
            'X-API-Version': '2024-01',
          },
          signal: controller.signal,
        }
      );
    } catch (err: any) {
      clearTimeout(timeoutId);
      const debugId = randomUUID();
      console.error('LiraPay status network error', {
        debugId,
        message: err?.message,
        cause: (err as any)?.cause,
        name: err?.name,
        stack: err?.stack,
      });
      const isAbort = err?.name === 'AbortError';
      const userMessage = isAbort
        ? 'Tempo esgotado ao consultar status do pagamento. Tente novamente.'
        : 'Falha ao consultar status do pagamento. Tente novamente em instantes.';
      return NextResponse.json({ error: userMessage, debugId }, { status: 502 });
    } finally {
      clearTimeout(timeoutId);
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const debugId = randomUUID();
      const isServerError = response.status >= 500;
      const message = isServerError
        ? 'Falha ao consultar status do pagamento. Tente novamente em instantes.'
        : (errorData.message || 'Erro ao consultar status');
      return NextResponse.json(
        { error: message, debugId },
        { status: isServerError ? 502 : response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json({
      transactionId: data.transaction_id || data.id,
      status: data.status, // pending, paid, expired, cancelled
      paidAt: data.paid_at,
      amount: data.amount,
    });

  } catch (error: any) {
    console.error('Status check error:', error);
    return NextResponse.json(
      { error: 'Erro ao consultar status do pagamento' },
      { status: 500 }
    );
  }
}

