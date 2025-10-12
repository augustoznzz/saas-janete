"use client";

function resolveBase(): string {
  if (process.env.NEXT_PUBLIC_IDENTITY_GOTRUE_URL) return process.env.NEXT_PUBLIC_IDENTITY_GOTRUE_URL;
  if (typeof window === 'undefined') return '/.netlify/identity';
  const host = window.location.hostname;
  if (host === 'localhost' || host === '127.0.0.1') {
    // Use Netlify Dev proxy for Identity in local development
    const proto = window.location.protocol || 'http:';
    return `${proto}//localhost:8888/.netlify/identity`;
  }
  return `${window.location.origin}/.netlify/identity`;
}

const BASE = resolveBase();

const TOKEN_KEY = 'identity_access_token';
const TOKEN_EXP_KEY = 'identity_access_token_expires_at';

async function fetchPreservingRedirect(url: string, init: RequestInit) {
  const first = await fetch(url, { ...init, redirect: 'manual' });
  if ([301, 302, 307, 308].includes(first.status)) {
    const loc = first.headers.get('location');
    if (loc) return fetch(loc, init);
  }
  return first;
}

export async function signup(email: string, password: string, name?: string) {
  const res = await fetchPreservingRedirect(`${BASE}/signup`, {
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
  const res = await fetchPreservingRedirect(`${BASE}/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  });
  if (!res.ok) {
    let msg = 'Falha no login';
    try {
      const ct = res.headers.get('content-type') || '';
      if (ct.includes('application/json')) {
        const j = await res.json();
        const err = (j.error || j.error_description || j.msg || '').toString().toLowerCase();
        if (err.includes('confirm') || err.includes('verify')) {
          msg = 'Email não confirmado. Verifique sua caixa de entrada e confirme seu cadastro.';
        } else if (err.includes('invalid_grant')) {
          msg = 'Email ou senha incorretos.';
        } else if (err.includes('password')) {
          msg = 'Senha inválida.';
        } else if (j.error || j.msg) {
          msg = (j.error || j.msg) as string;
        }
      } else {
        const t = await res.text();
        if (t?.includes('<!DOCTYPE html')) {
          msg = 'Endpoint de Identity indisponível. Rode "netlify dev" ou defina NEXT_PUBLIC_IDENTITY_GOTRUE_URL.';
        } else if (t) {
          const tl = t.toLowerCase();
          if (tl.includes('invalid_grant')) msg = 'Email ou senha incorretos.';
          else if (tl.includes('confirm') || tl.includes('verify')) msg = 'Email não confirmado. Verifique sua caixa de entrada.';
          else msg = t;
        }
      }
    } catch {}
    throw new Error(msg);
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


