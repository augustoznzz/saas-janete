import { NextRequest, NextResponse } from 'next/server';
import { ContactForm } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body: ContactForm = await request.json();
    
    // Validação básica
    if (!body.name || !body.email || !body.whatsapp || !body.message) {
      return NextResponse.json(
        { error: 'Campos obrigatórios não preenchidos' },
        { status: 400 }
      );
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      );
    }

    // Aqui você integraria com seu serviço de email (ex: SendGrid, Resend, etc.)
    // Por enquanto, apenas simulamos o envio
    console.log('Dados do formulário recebidos:', {
      nome: body.name,
      email: body.email,
      whatsapp: body.whatsapp,
      tipoPeça: body.pieceType,
      prazo: body.desiredDeadline,
      mensagem: body.message,
      timestamp: new Date().toISOString(),
    });

    // Simular processamento
    await new Promise(resolve => setTimeout(resolve, 1000));

    return NextResponse.json(
      { 
        success: true, 
        message: 'Mensagem enviada com sucesso! Entraremos em contato em breve.' 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Erro ao processar formulário:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
