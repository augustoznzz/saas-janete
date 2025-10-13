import { NextRequest, NextResponse } from 'next/server';

// This API acts as a thin proxy to a Netlify Function that has admin access to Identity
// It sets the password for the user that matches the provided CPF (stored in user_metadata)

export async function POST(request: NextRequest) {
  try {
    const { cpf, password } = await request.json();

    if (!cpf || !password) {
      return NextResponse.json({ error: 'CPF e senha são obrigatórios' }, { status: 400 });
    }
    const cleanCpf = String(cpf).replace(/\D/g, '');
    if (cleanCpf.length !== 11) {
      return NextResponse.json({ error: 'CPF inválido' }, { status: 400 });
    }
    if (String(password).length < 8) {
      return NextResponse.json({ error: 'Senha muito curta' }, { status: 400 });
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const res = await fetch(`${siteUrl}/.netlify/functions/login-by-cpf`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'set_password', cpf: cleanCpf, password }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      return NextResponse.json({ error: data?.error || 'Falha ao definir senha' }, { status: res.status });
    }
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Erro interno' }, { status: 500 });
  }
}


