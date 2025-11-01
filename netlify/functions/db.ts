import { Pool, PoolClient } from 'pg';

let pool: Pool | null = null;

function getPool(): Pool {
  if (!pool) {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error('DATABASE_URL is not set');
    }
    pool = new Pool({ connectionString, ssl: { rejectUnauthorized: false } });
  }
  return pool;
}

export async function withClient<T>(fn: (client: PoolClient) => Promise<T>): Promise<T> {
  const p = getPool();
  const client = await p.connect();
  try {
    return await fn(client);
  } finally {
    client.release();
  }
}

export type DbUser = {
  id: string; // identity id (sub)
  email: string;
  name: string | null;
  created_at: string;
};

export async function ensureSchema() {
  await withClient(async (c) => {
    await c.query(`
      create table if not exists users (
        id text primary key,
        email text not null unique,
        name text,
        created_at timestamptz not null default now()
      );
      create table if not exists course_progress (
        user_id text not null references users(id) on delete cascade,
        course_slug text not null,
        lessons_completed jsonb not null default '{}'::jsonb,
        percent int not null default 0,
        updated_at timestamptz not null default now(),
        primary key (user_id, course_slug)
      );
    `);
  });
}

export async function upsertUser(user: { id: string; email: string; name?: string | null }): Promise<DbUser> {
  return withClient(async (c) => {
    const res = await c.query(
      `insert into users (id, email, name)
       values ($1, $2, $3)
       on conflict (id) do update set email = excluded.email, name = excluded.name
       returning id, email, name, created_at`,
      [user.id, user.email, user.name ?? null]
    );
    return res.rows[0];
  });
}

export async function getProgress(userId: string, courseSlug: string) {
  return withClient(async (c) => {
    const res = await c.query(
      `select lessons_completed, percent, updated_at from course_progress where user_id=$1 and course_slug=$2`,
      [userId, courseSlug]
    );
    return res.rows[0] ?? { lessons_completed: {}, percent: 0, updated_at: null };
  });
}

export async function markLessonComplete(
  userId: string,
  courseSlug: string,
  lessonId: string,
  percent: number
) {
  return withClient(async (c) => {
    await c.query('begin');
    try {
      const existing = await c.query(
        `select lessons_completed from course_progress where user_id=$1 and course_slug=$2 for update`,
        [userId, courseSlug]
      );
      const lessons: Record<string, { completed: boolean; completedAt?: string }> =
        existing.rows[0]?.lessons_completed ?? {};
      lessons[lessonId] = { completed: true, completedAt: new Date().toISOString() };
      await c.query(
        `insert into course_progress (user_id, course_slug, lessons_completed, percent, updated_at)
         values ($1, $2, $3, $4, now())
         on conflict (user_id, course_slug) do update set
           lessons_completed = excluded.lessons_completed,
           percent = excluded.percent,
           updated_at = now()`,
        [userId, courseSlug, JSON.stringify(lessons), percent]
      );
      await c.query('commit');
      return { lessons_completed: lessons, percent };
    } catch (e) {
      await c.query('rollback');
      throw e;
    }
  });
}


