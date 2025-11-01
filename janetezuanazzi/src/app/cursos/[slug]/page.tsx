import type { Metadata } from 'next';
import Link from 'next/link';

type Course = {
  slug: string;
  title: string;
  description: string;
  price: string;

  modules: string[];
};

const courses: Course[] = [
  {
    slug: 'introducao-ao-bordado',
    title: 'Introdução ao Bordado',
    description: 'Aprenda os pontos essenciais e materiais do bordado à mão.',
    price: 'R$ 199,00',
    modules: [
      'Materiais e preparação do tecido',
      'Pontos básicos: alinhavo, atrás e corrente',
      'Aplicações, preenchimentos e acabamento',
      'Projeto final: mini floral bordado'
    ],
  },
];

export function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const course = courses.find((c) => c.slug === params.slug);
  return {
    title: course ? course.title : 'Curso',
    description: course?.description,
  };
}

export default function CourseDetailPage({ params }: { params: { slug: string } }) {
  const course = courses.find((c) => c.slug === params.slug);
  if (!course) {
    return (
      <div className="container-narrow py-16">
        <p>Curso não encontrado. <Link className="underline" href="/cursos">Voltar</Link></p>
      </div>
    );
  }

  const enrollHref = `/enroll/${course.slug}`;

  return (
    <div className="container-narrow py-10">
      <h1 className="section-title mb-4">{course.title}</h1>
      <p className="text-black/70 max-w-2xl">{course.description}</p>

      <div className="mt-8 grid gap-6 md:grid-cols-[1fr_320px]">
        <div>
          <h2 className="font-serif text-2xl mb-2">Conteúdo do curso</h2>
          <ul className="list-disc pl-5 space-y-2 text-black/80">
            {course.modules.map((m) => (<li key={m}>{m}</li>))}
          </ul>
        </div>
        <aside className="h-fit rounded-2xl border border-black/10 bg-white p-6">
          <p className="text-sm text-black/60">Preço</p>
          <p className="text-3xl font-serif">{course.price}</p>
          <Link href={enrollHref} className="cta-button mt-4 w-full inline-flex">Quero me inscrever</Link>
        </aside>
      </div>
    </div>
  );
}

