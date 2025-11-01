import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

export type SessionUser = {
  id: string;
  name: string;
  email: string;
};

const SESSION_COOKIE = 'student_session';
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

export function getUserFromSession(req?: NextRequest): SessionUser | null {
  try {
    const cookieStore = req ? req.cookies : cookies();
    const raw = cookieStore.get(SESSION_COOKIE)?.value;
    if (!raw) return null;
    const parsed = JSON.parse(raw) as SessionUser;
    if (!parsed?.email) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function createSession(user: SessionUser) {
  const cookieStore = cookies();
  cookieStore.set(SESSION_COOKIE, JSON.stringify(user), {
    httpOnly: true,
    sameSite: 'lax',
    secure: true,
    path: '/',
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
}

export function clearSession() {
  const cookieStore = cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export function buildUserFromEmail(email: string): SessionUser {
  const name = email.split('@')[0].replace(/\./g, ' ');
  return {
    id: `u_${Buffer.from(email).toString('base64')}`,
    name: name.charAt(0).toUpperCase() + name.slice(1),
    email,
  };
}

export const sessionCookieName = SESSION_COOKIE;


