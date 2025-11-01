import { NextResponse } from 'next/server';
import { buildUserFromEmail, createSession } from '@/lib/auth';

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = body?.email as string;
  const password = body?.password as string;

  if (!email || !password) {
    return NextResponse.json({ error: 'Email e senha são obrigatórios.' }, { status: 400 });
  }

  // Demo auth: accept any email/password
  const user = buildUserFromEmail(email);
  createSession(user);

  return NextResponse.json({ user });
}


