import Image from 'next/image';
import { Button } from '@/components/Button';
import { CourseCard } from '@/components/CourseCard';
import Link from 'next/link';

const courses = [
  {
    slug: 'introducao-ao-bordado',
    title: 'Introdução ao Bordado',
    description: 'Aprenda os pontos básicos, materiais e finalize um bordado floral simples.',
    price: 'R$ 199,00',
    image: '/introducao-ao-bordado.jpg',
  },
];

const galleryPreview = [
  'https://i.imgur.com/pvIDsyt.jpg',
  'https://i.imgur.com/DUTqYb7.jpg',
  'https://i.imgur.com/u5KKvlw.jpg',
  'https://i.imgur.com/4PUUadq.jpg',
];

const testimonials = [
  'Adorei o curso!',
  'É muito bom bordar com a Janete',
  'O espaço é caseiro. Perfeito para quem quer algo simples e terapêutico',
];

const studentNames = ['Maria', 'Telma', 'Katia'];

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
            <Button href="/cursos" className="bg-brand-pink text-black hover:bg-brand-pinkMuted">Conheça os cursos</Button>
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
          <Image src="/mae.jpg" alt="Artista" fill className="object-cover" />
        </div>
        <div>
          <h2 className="section-title mb-4">Sobre Mim</h2>
          <p className="text-black/70">Há mais de 20 anos me dedico ao universo do bordado, uma arte que me acompanha, inspira e ensina constantemente. 
          <br /><br />
          Ao longo desse tempo, venho aprimorando não apenas minhas técnicas de bordado, mas também a forma como compartilho esse conhecimento com outras pessoas.
          <br /><br />
          Acredito que bordar é mais do que costurar fios — é um gesto de cuidado, paciência e expressão. Por isso, busco unir tradição e aprendizado, sempre explorando novas formas de ensinar e despertar nas pessoas o prazer de criar com as próprias mãos.
          </p>
          
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
          {galleryPreview.slice(0, 3).map((src, i) => (
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
            {testimonials.map((text, index) => (
              <div key={index} className="rounded-2xl border border-black/10 bg-white p-6">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-black/10" />
                  <div>
                    <p className="font-semibold">{studentNames[index]}</p>
                    <p className="text-xs text-black/60">Curso concluído</p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-black/80">“{text}”</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

