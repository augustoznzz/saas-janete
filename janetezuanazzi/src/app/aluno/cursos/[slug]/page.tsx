"use client";
import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getCourseBySlug } from '@/lib/mockCourses';
import VideoPlayer from '@/components/student/VideoPlayer';
import Tabs from '@/components/student/Tabs';
import CourseSidebar from '@/components/student/CourseSidebar';
import { markLessonCompleted, readCourseProgress } from '@/lib/progress';
import { getAccessToken } from '@/lib/identity';
import type { CourseProgress } from '@/lib/progress';

export default function CoursePlayerPage() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();
  const slug = params?.slug as string;
  const course = getCourseBySlug(slug);
  const [checkingAccess, setCheckingAccess] = React.useState(true);
  const [hasAccess, setHasAccess] = React.useState(false);

  const allLessons = React.useMemo(() => {
    return course ? course.modules.flatMap((m) => m.lessons) : [];
  }, [course]);

  const [activeIndex, setActiveIndex] = React.useState(0);
  const [progress, setProgress] = React.useState<CourseProgress>({});

  // Verify enrollment before loading course content
  React.useEffect(() => {
    if (!course) return;
    (async () => {
      try {
        const token = await getAccessToken();
        if (!token) {
          router.replace(`/login?redirect=/aluno/cursos/${course.slug}`);
          return;
        }
        const res = await fetch('/.netlify/identity/user', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) {
          router.replace('/aluno/dashboard');
          return;
        }
        const user = await res.json();
        const enrolled: string[] = Array.isArray(user?.user_metadata?.enrolled_courses)
          ? user.user_metadata.enrolled_courses
          : [];
        if (!enrolled.includes(course.slug)) {
          router.replace('/aluno/dashboard');
          return;
        }
        setHasAccess(true);
      } finally {
        setCheckingAccess(false);
      }
    })();
  }, [course, router]);

  React.useEffect(() => {
    if (!course || !hasAccess) return;
    const prog = readCourseProgress(course.slug);
    setProgress(prog);
    // Fetch remote progress for merge
    (async () => {
      try {
        const token = await getAccessToken();
        if (!token) return;
        const res = await fetch(`/.netlify/functions/progress?course_slug=${encodeURIComponent(course.slug)}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          const remote: CourseProgress = data?.lessons_completed || {};
          // Prefer remote if newer; simple merge for now
          setProgress((prev) => ({ ...prev, ...remote }));
        }
      } catch {
        // ignore
      }
    })();
    const firstIncomplete = allLessons.findIndex((l) => !prog[l.id]?.completed);
    setActiveIndex(firstIncomplete >= 0 ? firstIncomplete : 0);
  }, [course, allLessons, hasAccess]);

  const handleLessonSelect = React.useCallback((lessonId: string) => {
    const index = allLessons.findIndex(lesson => lesson.id === lessonId);
    if (index >= 0) {
      setActiveIndex(index);
    }
  }, [allLessons]);

  const handleVideoComplete = React.useCallback(() => {
    if (course && allLessons[activeIndex]) {
      const lessonId = allLessons[activeIndex].id;
      const next = markLessonCompleted(course.slug, lessonId);
      setProgress(next);
      // Persist remotely
      (async () => {
        try {
          const token = await getAccessToken();
          if (!token) return;
          // Compute percent client-side using mock course size
          const total = allLessons.length;
          const completed = Object.values(next).filter((p) => p.completed).length;
          const percent = Math.round((completed / Math.max(total, 1)) * 100);
          await fetch('/.netlify/functions/progress', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
            body: JSON.stringify({ course_slug: course.slug, lesson_id: lessonId, percent }),
          });
        } catch {
          // ignore
        }
      })();
    }
  }, [course, allLessons, activeIndex]);

  if (!course) {
    return (
      <div>
        <p className="text-gray-700">Curso não encontrado.</p>
        <button className="text-emerald-700 underline" onClick={() => router.push('/aluno/dashboard')}>Voltar</button>
      </div>
    );
  }

  if (checkingAccess) {
    return null;
  }

  const lesson = allLessons[activeIndex];
  const isCompleted = !!progress[lesson?.id]?.completed;
  const goPrev = () => setActiveIndex((i) => Math.max(0, i - 1));
  const goNext = () => setActiveIndex((i) => Math.min(allLessons.length - 1, i + 1));

  const tabs = [
    { key: 'sobre', label: 'Sobre esta aula', content: <p className="text-gray-700 whitespace-pre-line">{lesson.description}</p> },
    { key: 'recursos', label: 'Recursos', content: (
      <ul className="list-disc pl-5 space-y-1">
        {lesson.resources.map((r) => (
          <li key={r.label}><a href={r.url} className="text-emerald-700 hover:underline">{r.label}</a></li>
        ))}
      </ul>
    ) },
    { key: 'comentarios', label: 'Comentários', content: (
      <div className="text-gray-600 text-sm">Área de comentários em breve.</div>
    ) },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
      <div className="lg:col-span-7 space-y-4">
        <VideoPlayer src={lesson.videoUrl} title={lesson.title} onComplete={handleVideoComplete} />
        <h1 className="text-xl font-semibold">{lesson.title}</h1>
        <Tabs tabs={tabs} />

        <div className="flex items-center gap-3 pt-2">
          <button
            className="px-4 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-60"
            onClick={() => {
              const next = markLessonCompleted(course.slug, lesson.id);
              setProgress(next);
              (async () => {
                try {
                  const token = await getAccessToken();
                  if (!token) return;
                  const total = allLessons.length;
                  const completed = Object.values(next).filter((p) => p.completed).length;
                  const percent = Math.round((completed / Math.max(total, 1)) * 100);
                  await fetch('/.netlify/functions/progress', {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                    body: JSON.stringify({ course_slug: course.slug, lesson_id: lesson.id, percent }),
                  });
                } catch {}
              })();
            }}
            disabled={isCompleted}
          >
            {isCompleted ? 'Concluída' : 'Marcar como concluída'}
          </button>
          <div className="ml-auto flex items-center gap-2">
            <button
              className="px-3 py-2 rounded-md border border-gray-300 text-gray-700 disabled:opacity-50"
              onClick={goPrev}
              disabled={activeIndex === 0}
            >
              Aula anterior
            </button>
            <button
              className="px-3 py-2 rounded-md border border-gray-300 text-gray-700 disabled:opacity-50"
              onClick={goNext}
              disabled={activeIndex === allLessons.length - 1}
            >
              Próxima aula
            </button>
          </div>
        </div>
      </div>

      <div className="lg:col-span-3">
        <CourseSidebar course={course} activeLessonId={lesson.id} onLessonSelect={handleLessonSelect} progress={progress} />
      </div>
    </div>
  );
}


