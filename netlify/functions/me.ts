import type { Handler } from '@netlify/functions';
import { ensureSchema, upsertUser } from './db';

export const handler: Handler = async (event, context) => {
  const user = (context as any)?.clientContext?.user as any;
  if (!user) return { statusCode: 401, body: 'Unauthorized' };

  try {
    await ensureSchema();
    const profile = await upsertUser({ id: user.sub, email: user.email, name: user.user_metadata?.full_name });
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
      body: JSON.stringify({ user: profile }),
    };
  } catch (e: any) {
    return { statusCode: 500, body: e?.message ?? 'Internal error' };
  }
};

export default {};


