import type { Handler } from '@netlify/functions';

const GOTRUE_URL = process.env.IDENTITY_GOTRUE_URL;
// Accept multiple env var names for admin token compatibility and report source
function getAdminTokenFromEnv(): { token: string | undefined; source: string | undefined } {
  const candidates: Array<[string, string | undefined]> = [
    ['IDENTITY_ADMIN_TOKEN', process.env.IDENTITY_ADMIN_TOKEN],
    ['ADMIN_TOKEN', process.env.ADMIN_TOKEN],
    ['ADMIN', process.env.ADMIN],
    ['SEED_ADMIN_TOKEN', process.env.SEED_ADMIN_TOKEN],
  ];
  for (const [name, value] of candidates) {
    if (value && String(value).trim()) {
      return { token: String(value).trim(), source: name };
    }
  }
  return { token: undefined, source: undefined };
}

const { token: ADMIN_TOKEN, source: ADMIN_TOKEN_SOURCE } = getAdminTokenFromEnv();

function normalizeBaseUrl(url: string): string {
  // ensure exactly one trailing slash
  return url.replace(/\/+$/, '') + '/';
}

async function fetchWithAuth(url: string, init: RequestInit) {
  // preserve Authorization header across a single redirect hop
  const first = await fetch(url, { ...init, redirect: 'manual' });
  if ([301, 302, 307, 308].includes(first.status)) {
    const loc = first.headers.get('location');
    if (loc) return fetch(loc, init);
  }
  return first;
}

export const handler: Handler = async () => {
  if (!GOTRUE_URL || !ADMIN_TOKEN) {
    const msg = !GOTRUE_URL
      ? 'Missing IDENTITY_GOTRUE_URL'
      : 'Missing admin token env (try IDENTITY_ADMIN_TOKEN recommended; also supports ADMIN_TOKEN, ADMIN, SEED_ADMIN_TOKEN)';
    return { statusCode: 500, body: msg };
  }
  // Validate JWT-looking token format to avoid confusing 401s from GoTrue
  const isLikelyJwt = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/.test(ADMIN_TOKEN);
  if (!isLikelyJwt) {
    return {
      statusCode: 500,
      body: `Invalid admin token format from env ${ADMIN_TOKEN_SOURCE}. Expected a JWT in the form xxx.yyy.zzz (set IDENTITY_ADMIN_TOKEN with the Identity Admin API key).`,
    };
  }

  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  const name = process.env.ADMIN_NAME || 'Admin';
  if (!email || !password) return { statusCode: 400, body: 'Missing ADMIN_EMAIL/ADMIN_PASSWORD' };

  try {
    const base = normalizeBaseUrl(GOTRUE_URL);
    // Create or get user
    const resp = await fetchWithAuth(`${base}admin/users`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${ADMIN_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, confirm: true, app_metadata: { roles: ['admin'] }, user_metadata: { full_name: name } }),
    });

    if (resp.status === 409) {
      // Already exists: update roles
      const list = await fetchWithAuth(`${base}admin/users?email=${encodeURIComponent(email)}`, { headers: { Authorization: `Bearer ${ADMIN_TOKEN}` } });
      const { users } = await list.json();
      const id = users?.[0]?.id;
      if (!id) return { statusCode: 500, body: 'Admin user lookup failed' };
      await fetchWithAuth(`${base}admin/users/${id}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${ADMIN_TOKEN}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ app_metadata: { roles: ['admin'] }, user_metadata: { full_name: name } }),
      });
      return { statusCode: 200, body: 'Admin ensured' };
    }

    if (!resp.ok) {
      const text = await resp.text();
      return { statusCode: 500, body: `Admin create failed: ${text}` };
    }

    return { statusCode: 201, body: 'Admin created' };
  } catch (e: any) {
    return { statusCode: 500, body: e?.message ?? 'Internal error' };
  }
};

export default {};


