'use client';

import React from 'react';
import { getAccessToken } from '@/lib/identity';
import { mockCourses } from '@/lib/mockCourses';
import { calcCourseCompletionPercent, readCourseProgress } from '@/lib/progress';

export default function DashboardPage() {
  const [userName, setUserName] = React.useState<string>('Aluno');
  const [enrolledCourses, setEnrolledCourses] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      try {
        const token = await getAccessToken();
        if (token) {
          // ensure profile upserted (no-op if exists)
          await fetch('/.netlify/functions/me', { headers: { Authorization: `Bearer ${token}` } });
          
          // Buscar cursos matriculados do usuário
          const res = await fetch('/.netlify/identity/user', {
            headers: { Authorization: `Bearer ${token}` },
          });
          
          if (res.ok) {
            const userData = await res.json();
            const enrolled: string[] = Array.isArray(userData?.user_metadata?.enrolled_courses)
              ? userData.user_metadata.enrolled_courses
              : [];
            setEnrolledCourses(enrolled);
            
            // Buscar nome do usuário
            const name = userData?.user_metadata?.full_name || 
                        userData?.user_metadata?.name ||
                        userData?.email?.split('@')[0];
            if (name) {
              setUserName(name);
            }
          }
        }
      } catch (error) {
        console.error('Erro ao buscar cursos matriculados:', error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Filtrar apenas cursos que o usuário está matriculado
  const courses = mockCourses.filter(course => enrolledCourses.includes(course.slug));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Olá, {userName}!</h1>
        <p className="text-gray-600">Bem-vindo à sua área de estudos.</p>
      </div>

      <section>
        <h2 className="text-xl font-semibold mb-4">Meus Cursos</h2>
        
        {loading ? (
          <div className="text-center py-8">
            <p className="text-gray-600">Carregando seus cursos...</p>
          </div>
        ) : courses.length === 0 ? (
          <div className="border border-gray-200 rounded-lg p-8 text-center">
            <p className="text-gray-600 mb-4">Você ainda não está matriculado em nenhum curso.</p>
            <a href="/cursos" className="inline-block px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700">
              Ver cursos disponíveis
            </a>
          </div>
        ) : (
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
        )}
      </section>
    </div>
  );
}


