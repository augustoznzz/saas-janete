import React from 'react';
import { getUserFromSession } from '@/lib/auth';
import { mockCourses } from '@/lib/mockCourses';
import { calcCourseCompletionPercent, readCourseProgress } from '@/lib/progress';

export default function DashboardPage() {
  const user = getUserFromSession();

  // In a real app, fetch user courses. Here we show all mock courses as acquired.
  const courses = mockCourses;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Olá, {user?.name || 'Aluno'}!</h1>
        <p className="text-gray-600">Bem-vindo à sua área de estudos.</p>
      </div>

      <section>
        <h2 className="text-xl font-semibold mb-4">Meus Cursos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => {
            const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
            const progress = readCourseProgress(course.slug);
            const percent = calcCourseCompletionPercent(progress, totalLessons);
            return (
              <a
                key={course.slug}
                href={`/aluno/cursos/${course.slug}`}
                className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="aspect-video bg-gray-100">
                  <img src={course.coverImageUrl} alt="Capa do curso" className="w-full h-full object-cover" />
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="font-semibold text-gray-800">{course.title}</h3>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500" style={{ width: `${percent}%` }} />
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{percent}% concluído</span>
                    <span className="text-emerald-700">{percent > 0 ? 'Continuar' : 'Iniciar'}</span>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </section>
    </div>
  );
}


