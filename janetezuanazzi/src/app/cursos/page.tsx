import { CourseCard } from '@/components/CourseCard';

const courses = [
  {
    slug: 'introducao-ao-bordado',
    title: 'Introdução ao Bordado',
    description: 'Pontos básicos, materiais e um projeto final para iniciantes.',
    price: 'R$ 199,00',
    image: '/introducao-ao-bordado.jpg',
  },
];

export default function CursosPage() {
  return (
    <div className="container-narrow mt-6">
      <h1 className="section-title mb-8">Cursos</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((c) => (
          <CourseCard key={c.slug} course={c} />
        ))}
      </div>
    </div>
  );
}

