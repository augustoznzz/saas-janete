"use client";

const BASE =
  process.env.NEXT_PUBLIC_IDENTITY_GOTRUE_URL ||
  (typeof window !== 'undefined' ? `${window.location.origin}/.netlify/identity` : '/.netlify/identity');

const TOKEN_KEY = 'identity_access_token';
const TOKEN_EXP_KEY = 'identity_access_token_expires_at';

export async function signup(email: string, password: string, name?: string) {
  const res = await fetch(`${BASE}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, data: { full_name: name } }),
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(t || 'Falha no cadastro');
  }
  return await res.json();
}

export async function login(email: string, password: string) {
  const body = new URLSearchParams();
  body.set('grant_type', 'password');
  body.set('username', email);
  body.set('password', password);
  const res = await fetch(`${BASE}/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(t || 'Falha no login');
  }
  const data = await res.json();
  const token = data.access_token as string;
  const expiresIn = Number(data.expires_in ?? 3600);
  try {
    window.localStorage.setItem(TOKEN_KEY, token);
    window.localStorage.setItem(TOKEN_EXP_KEY, String(Date.now() + expiresIn * 1000));
  } catch {}
  return token;
}

export async function logout() {
  try {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.removeItem(TOKEN_EXP_KEY);
  } catch {}
}

export async function getAccessToken(): Promise<string | null> {
  try {
    const token = window.localStorage.getItem(TOKEN_KEY);
    const exp = Number(window.localStorage.getItem(TOKEN_EXP_KEY) || 0);
    if (!token || !exp || Date.now() > exp) return null;
    return token;
  } catch {
    return null;
  }
}


