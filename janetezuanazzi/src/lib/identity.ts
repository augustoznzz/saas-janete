"use client";
import { GoTrueClient, type User } from '@supabase/gotrue-js';

const gotrueUrl = process.env.NEXT_PUBLIC_IDENTITY_GOTRUE_URL || (typeof window !== 'undefined' ? (window as any).NETLIFY_IDENTITY_URL : undefined);

const client = new GoTrueClient({
  url: gotrueUrl!,
  autoRefreshToken: true,
  persistSession: true,
});

export async function signup(email: string, password: string, name?: string) {
  const { data, error } = await client.signUp({ email, password, options: { data: { full_name: name } } });
  if (error) throw error;
  return data.user as User | null;
}

export async function login(email: string, password: string) {
  const { data, error } = await client.signInWithPassword({ email, password });
  if (error) throw error;
  return data.session?.access_token ?? null;
}

export async function logout() {
  await client.signOut();
}

export async function getAccessToken(): Promise<string | null> {
  const s = await client.getSession();
  return s.data.session?.access_token ?? null;
}


