import { NextRequest, NextResponse } from 'next/server';

const LIRAPAY_API_URL = process.env.LIRAPAY_API_URL || 'https://api.lirapay.com.br';
const LIRAPAY_API_KEY = process.env.LIRAPAY_API_KEY || '';

export async function GET(request: NextRequest) {
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

    // Check transaction status with LiraPay
    const response = await fetch(
      `${LIRAPAY_API_URL}/v1/transactions/${transactionId}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${LIRAPAY_API_KEY}`,
          'X-API-Version': '2024-01',
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { error: errorData.message || 'Erro ao consultar status' },
        { status: response.status }
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

