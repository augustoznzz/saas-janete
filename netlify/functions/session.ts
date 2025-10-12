import type { Handler } from '@netlify/functions';

const COOKIE_NAME = 'student_session';
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export const handler: Handler = async (event, context) => {
  const user = (context as any)?.clientContext?.user as any;
  if (!user) {
    return { statusCode: 401, body: 'Unauthorized' };
  }

  const basic = {
    id: user.sub,
    name: user.user_metadata?.full_name || user.email?.split('@')[0],
    email: user.email,
  };

  const cookie = `${COOKIE_NAME}=${encodeURIComponent(JSON.stringify(basic))}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${MAX_AGE}`;

  return {
    statusCode: 204,
    headers: {
      'Set-Cookie': cookie,
      'Cache-Control': 'no-store',
    },
  };
};

export default {};


