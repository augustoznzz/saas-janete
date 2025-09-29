"use client";
import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getCourseBySlug } from '@/lib/mockCourses';
import VideoPlayer from '@/components/student/VideoPlayer';
import Tabs from '@/components/student/Tabs';
import CourseSidebar from '@/components/student/CourseSidebar';
import { markLessonCompleted, readCourseProgress } from '@/lib/progress';

export default function CoursePlayerPage() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();
  const slug = params?.slug as string;
  const course = getCourseBySlug(slug);

  const allLessons = React.useMemo(() => {
    return course ? course.modules.flatMap((m) => m.lessons) : [];
  }, [course]);

  const [activeIndex, setActiveIndex] = React.useState(0);

  React.useEffect(() => {
    if (!course) return;
    const prog = readCourseProgress(course.slug);
    const firstIncomplete = allLessons.findIndex((l) => !prog[l.id]?.completed);
    setActiveIndex(firstIncomplete >= 0 ? firstIncomplete : 0);
  }, [course, allLessons]);

  const handleLessonSelect = React.useCallback((lessonId: string) => {
    const index = allLessons.findIndex(lesson => lesson.id === lessonId);
    if (index >= 0) {
      setActiveIndex(index);
    }
  }, [allLessons]);

  const handleVideoComplete = React.useCallback(() => {
    if (course && allLessons[activeIndex]) {
      markLessonCompleted(course.slug, allLessons[activeIndex].id);
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

  const lesson = allLessons[activeIndex];
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
            className="px-4 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700"
            onClick={() => markLessonCompleted(course.slug, lesson.id)}
          >
            Marcar como concluída
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
        <CourseSidebar course={course} activeLessonId={lesson.id} onLessonSelect={handleLessonSelect} />
      </div>
    </div>
  );
}


