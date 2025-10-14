import type { Metadata } from 'next';
import Link from 'next/link';
import { getUserFromSession } from '@/lib/auth';

type Course = {
  slug: string;
  title: string;
  description: string;
  price: string;

  modules: string[];
};

const courses: Course[] = [
  {
    slug: 'aquarela-iniciantes',
    title: 'Aquarela para Iniciantes',
    description: 'Curso completo para começar na aquarela com confiança. Materiais, técnicas e projetos.',
    price: 'R$ 249,00',

    modules: [
      'Introdução e materiais',
      'Lavagens e gradações',
      'Texturas e salpicos',
      'Flores simples',
      'Projeto final: composição botânica'
    ],
  },
  {
    slug: 'ilustracao-botanica',
    title: 'Ilustração Botânica',
    description: 'Do esboço à pintura final, com foco em observação e precisão das formas.',
    price: 'R$ 299,00',

    modules: [
      'Referências e esboço',
      'Volume e luz',
      'Cores e camadas',
      'Detalhes e acabamento',
      'Projeto final: lâmina botânica'
    ],
  },
  {
    slug: 'pintura-a-oleo',
    title: 'Pintura a óleo',
    description: 'Técnicas essenciais de pintura a óleo: materiais, mistura de cores e camadas.',
    price: 'R$ 349,00',
    modules: [
      'Materiais e preparação da tela',
      'Cores, solventes e médiums',
      'Blocos de cor e valores',
      'Camadas e acabamento',
      'Projeto final: paisagem a óleo'
    ],
  },
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

  const hideVideo = course.slug === 'aquarela-iniciantes';
  const user = getUserFromSession();
  const whenLoggedHref = course.slug === 'introducao-ao-bordado'
    ? 'https://pay.lirapaybr.com/cUSkzMqw'
    : `/checkout/${course.slug}`;
  const enrollHref = user
    ? whenLoggedHref
    : `/criar-conta?redirect=${encodeURIComponent(`/cursos/${course.slug}`)}`;

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

