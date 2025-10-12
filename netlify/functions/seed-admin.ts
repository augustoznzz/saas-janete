import type { Handler } from '@netlify/functions';

const GOTRUE_URL = process.env.IDENTITY_GOTRUE_URL;
const ADMIN_TOKEN = process.env.IDENTITY_ADMIN_TOKEN;

export const handler: Handler = async () => {
  if (!GOTRUE_URL || !ADMIN_TOKEN) {
    return { statusCode: 500, body: 'Missing IDENTITY_GOTRUE_URL or IDENTITY_ADMIN_TOKEN' };
  }

  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  const name = process.env.ADMIN_NAME || 'Admin';
  if (!email || !password) return { statusCode: 400, body: 'Missing ADMIN_EMAIL/ADMIN_PASSWORD' };

  try {
    // Create or get user
    const resp = await fetch(`${GOTRUE_URL}/admin/users`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${ADMIN_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, confirm: true, app_metadata: { roles: ['admin'] }, user_metadata: { full_name: name } }),
    });

    if (resp.status === 409) {
      // Already exists: update roles
      const list = await fetch(`${GOTRUE_URL}/admin/users?email=${encodeURIComponent(email)}`, {
        headers: { Authorization: `Bearer ${ADMIN_TOKEN}` },
      });
      const { users } = await list.json();
      const id = users?.[0]?.id;
      if (!id) return { statusCode: 500, body: 'Admin user lookup failed' };
      await fetch(`${GOTRUE_URL}/admin/users/${id}`, {
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


