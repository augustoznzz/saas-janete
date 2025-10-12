import type { Handler } from '@netlify/functions';
import { withClient } from './db';

export const handler: Handler = async (event, context) => {
  const roles = (context as any)?.clientContext?.user?.app_metadata?.roles || [];
  if (!roles.includes('admin')) return { statusCode: 403, body: 'Forbidden' };

  const users = await withClient(async (c) => {
    const res = await c.query(
      `select u.id, u.email, u.name, u.created_at,
              coalesce(sum(cp.percent), 0) as total_percent,
              count(cp.course_slug) as courses
         from users u
         left join course_progress cp on cp.user_id = u.id
        group by u.id
        order by u.created_at desc
        limit 100`
    );
    return res.rows;
  });

  return { statusCode: 200, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ users }) };
};

export default {};


