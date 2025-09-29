import { CourseCard } from '@/components/CourseCard';

const courses = [
  {
    slug: 'aquarela-iniciantes',
    title: 'Aquarela para Iniciantes',
    description: 'Aprenda as técnicas essenciais de aquarela com exercícios práticos e projetos guiados.',
    price: 'R$ 249,00',
    image: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=1600&auto=format&fit=crop',
  },
  {
    slug: 'ilustracao-botanica',
    title: 'Ilustração Botânica',
    description: 'Composições botânicas com lápis de cor e aquarela, do esboço à finalização.',
    price: 'R$ 299,00',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1600&auto=format&fit=crop',
  },
  {
    slug: 'pintura-oleo',
    title: 'Pintura a Óleo',
    description: 'Domine camadas, mistura de cores e acabamento em óleo com projetos autorais.',
    price: 'R$ 349,00',
    image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=1600&auto=format&fit=crop',
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

