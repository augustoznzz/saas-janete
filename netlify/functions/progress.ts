import type { Handler } from '@netlify/functions';
import { ensureSchema, getProgress, markLessonComplete } from './db';

function json(status: number, data: unknown) {
  return { statusCode: status, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) };
}

export const handler: Handler = async (event, context) => {
  const user = (context as any)?.clientContext?.user as any;
  if (!user) return { statusCode: 401, body: 'Unauthorized' };
  await ensureSchema();

  if (event.httpMethod === 'GET') {
    const courseSlug = event.queryStringParameters?.course_slug;
    if (!courseSlug) return json(400, { error: 'course_slug is required' });
    const data = await getProgress(user.sub, courseSlug);
    return json(200, data);
  }

  if (event.httpMethod === 'PATCH') {
    if (!event.body) return json(400, { error: 'Missing body' });
    const body = JSON.parse(event.body);
    const courseSlug = body?.course_slug as string;
    const lessonId = body?.lesson_id as string;
    const percent = Number(body?.percent ?? 0);
    if (!courseSlug || !lessonId) return json(400, { error: 'course_slug and lesson_id are required' });
    const updated = await markLessonComplete(user.sub, courseSlug, lessonId, isFinite(percent) ? percent : 0);
    return json(200, updated);
  }

  return { statusCode: 405, body: 'Method Not Allowed' };
};

export default {};


