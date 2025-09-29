// Simple client-side progress tracking using localStorage

export type LessonProgress = {
  completed: boolean;
  completedAt?: string;
};

export type CourseProgress = {
  [lessonId: string]: LessonProgress;
};

const STORAGE_KEY_PREFIX = 'course_progress_';

function getKey(courseSlug: string): string {
  return `${STORAGE_KEY_PREFIX}${courseSlug}`;
}

export function readCourseProgress(courseSlug: string): CourseProgress {
  if (typeof window === 'undefined') return {};
  const raw = window.localStorage.getItem(getKey(courseSlug));
  if (!raw) return {};
  try {
    return JSON.parse(raw) as CourseProgress;
  } catch {
    return {};
  }
}

export function writeCourseProgress(courseSlug: string, progress: CourseProgress): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(getKey(courseSlug), JSON.stringify(progress));
}

export function markLessonCompleted(courseSlug: string, lessonId: string): CourseProgress {
  const current = readCourseProgress(courseSlug);
  current[lessonId] = { completed: true, completedAt: new Date().toISOString() };
  writeCourseProgress(courseSlug, current);
  return current;
}

export function calcCourseCompletionPercent(progress: CourseProgress, totalLessons: number): number {
  if (totalLessons <= 0) return 0;
  const completed = Object.values(progress).filter((p) => p.completed).length;
  return Math.round((completed / totalLessons) * 100);
}


