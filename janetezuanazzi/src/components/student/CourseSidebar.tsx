"use client";
import React from 'react';
import ProgressBar from './ProgressBar';
import type { Course } from '@/lib/mockCourses';
import { readCourseProgress, calcCourseCompletionPercent } from '@/lib/progress';
import type { CourseProgress } from '@/lib/progress';

type Props = {
  course: Course;
  activeLessonId?: string;
  onLessonSelect?: (lessonId: string) => void;
  progress?: CourseProgress;
};

export default function CourseSidebar({ course, activeLessonId, onLessonSelect, progress }: Props) {
  const [expanded, setExpanded] = React.useState<Record<string, boolean>>({});
  const [percent, setPercent] = React.useState(0);

  React.useEffect(() => {
    // Prefer progress from props for immediate UI feedback; fallback to storage
    const prog = progress ?? readCourseProgress(course.slug);
    const total = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
    setPercent(calcCourseCompletionPercent(prog, total));
  }, [course.slug, course.modules, progress]);

  return (
    <aside className="p-4 border-l border-gray-200 h-full overflow-y-auto">
      <h2 className="text-lg font-semibold mb-2">{course.title}</h2>
      <div className="mb-4">
        <ProgressBar percent={percent} />
      </div>

      <div className="space-y-2">
        {course.modules.map((mod) => {
          const isOpen = expanded[mod.id] ?? true;
          return (
            <div key={mod.id} className="border border-gray-200 rounded-md">
              <button
                className="w-full flex items-center justify-between px-3 py-2 bg-gray-50 hover:bg-gray-100"
                onClick={() => setExpanded((e) => ({ ...e, [mod.id]: !isOpen }))}
              >
                <span className="font-medium text-gray-800">{mod.title}</span>
                <span className="text-gray-500">{isOpen ? '−' : '+'}</span>
              </button>
              {isOpen && (
                <ul className="divide-y divide-gray-100">
                  {mod.lessons.map((lesson) => {
                    const isActive = lesson.id === activeLessonId;
                    return (
                      <li key={lesson.id} className={isActive ? 'bg-emerald-50' : ''}>
                        <button
                          onClick={() => onLessonSelect?.(lesson.id)}
                          className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-50 text-left"
                        >
                          <span
                            className={`inline-flex h-5 w-5 items-center justify-center rounded-full border ${
                              isActive ? 'border-emerald-600 text-emerald-600' : 'border-gray-300 text-gray-400'
                            }`}
                          >
                            •
                          </span>
                          <span className="flex-1 text-sm text-gray-800">{lesson.title}</span>
                          <span className="text-xs text-gray-500">{lesson.durationMinutes}m</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}


