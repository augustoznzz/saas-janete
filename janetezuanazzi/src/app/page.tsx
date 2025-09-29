import Image from 'next/image';
import { Button } from '@/components/Button';
import { CourseCard } from '@/components/CourseCard';
import Link from 'next/link';

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

const galleryPreview = [
  'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=1000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=1000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1505740106531-4243f3831c78?q=80&w=1000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1496317899792-9d7dbcd928a1?q=80&w=1000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1000&auto=format&fit=crop',
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-[70vh] md:h-[85vh]">
        <Image
          src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=2400&auto=format&fit=crop"
          alt="Ateliê"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 container-narrow h-full flex flex-col items-start justify-center text-white">
          <h1 className="font-serif text-4xl md:text-6xl max-w-2xl">Arte que inspira. Cursos que transformam.</h1>
          <p className="mt-4 max-w-xl text-white/90">Explore cursos online e o portfólio do ateliê, com uma curadoria de técnicas e projetos artísticos.</p>
          <div className="mt-6">
            <Button href="/cursos" className="bg-brand-pink text-black hover:bg-brand-pinkMuted">Conheça meus cursos</Button>
          </div>
        </div>
      </section>

      {/* Cursos */}
      <section className="container-narrow mt-16">
        <h2 className="section-title mb-6">Cursos Online</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((c) => (
            <CourseCard key={c.slug} course={c} />
          ))}
        </div>
      </section>

      {/* Sobre */}
      <section className="container-narrow mt-20 grid gap-10 md:grid-cols-2 items-center">
        <div className="relative aspect-square overflow-hidden rounded-full">
          <Image src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1200&auto=format&fit=crop" alt="Artista" fill className="object-cover" />
        </div>
        <div>
          <h2 className="section-title mb-4">Sobre Mim</h2>
          <p className="text-black/70">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus tincidunt, ante vitae tempor pharetra, nibh metus luctus risus, non aliquam erat ante quis justo. Curabitur posuere, justo quis feugiat placerat, urna lorem fermentum nulla, ac fermentum orci sem sit amet arcu.</p>
          <div className="mt-6"><Button href="/sobre">Conheça minha história</Button></div>
        </div>
      </section>

      {/* Galeria Preview */}
      <section className="container-narrow mt-20">
        <div className="flex items-center justify-between">
          <h2 className="section-title">Galeria</h2>
          <Link href="/galeria" className="underline">Ver galeria completa</Link>
        </div>
        <div className="mt-6 columns-2 md:columns-3 gap-4 [column-fill:_balance]"><div className="grid md:hidden" /></div>
        <div className="mt-6 columns-2 md:columns-3 gap-4">
          {galleryPreview.map((src, i) => (
            <div key={i} className="mb-4 break-inside-avoid rounded-xl overflow-hidden">
              <Image src={src} alt="Obra" width={800} height={600} className="w-full h-auto object-cover" />
            </div>
          ))}
        </div>
      </section>

      {/* Depoimentos */}
      <section className="container-narrow mt-20">
        <h2 className="section-title mb-6">Depoimentos</h2>
        <div className="relative overflow-hidden">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1,2,3].map((t) => (
              <div key={t} className="rounded-2xl border border-black/10 bg-white p-6">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-black/10" />
                  <div>
                    <p className="font-semibold">Aluno {t}</p>
                    <p className="text-xs text-black/60">Curso concluído</p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-black/80">“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin non luctus augue. Integer in lorem at augue dictum lobortis.”</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

