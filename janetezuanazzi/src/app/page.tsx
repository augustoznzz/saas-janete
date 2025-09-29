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
  'https://i.imgur.com/pvIDsyt.jpg',
  'https://i.imgur.com/DUTqYb7.jpg',
  'https://i.imgur.com/u5KKvlw.jpg',
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-[70vh] md:h-[85vh]">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-rose-100 to-rose-200" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-rose-50/40" />
        <div className="relative z-10 container-narrow h-full flex flex-col items-start justify-center text-black">
          <h1 className="font-serif text-4xl md:text-6xl max-w-2xl" style={{ color: '#292929' }}>Arte que inspira. Cursos que transformam.</h1>
          <p className="mt-4 max-w-xl text-black/70">Explore os cursos online e o portfólio do ateliê.</p>
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
        <div className="relative aspect-square overflow-hidden rounded-full scale-90 origin-center">
          <Image src="https://media.discordapp.net/attachments/1393705889613221928/1421818601010233435/image.png?ex=68dbbcc2&is=68da6b42&hm=29f6397776667d4ce73d84bdb98b8b8c077a25536d4ec126e21cbdcff42c162a&=&format=webp&quality=lossless" alt="Artista" fill className="object-cover" />
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
          <Button
            href="/galeria"
            className="group"
          >
            <span>Ver galeria completa</span>
            <span className="ml-2 transition-transform duration-300 ease-out group-hover:translate-x-1">→</span>
          </Button>
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

