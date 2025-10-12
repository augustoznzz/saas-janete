export type Lesson = {
  id: string;
  title: string;
  durationMinutes: number;
  videoUrl: string; // YouTube/Vimeo embed URL
  description: string;
  resources: { label: string; url: string }[];
};

export type Module = {
  id: string;
  title: string;
  lessons: Lesson[];
};

export type Course = {
  slug: string;
  title: string;
  coverImageUrl: string;
  modules: Module[];
};

export const mockCourses: Course[] = [
  {
    slug: 'pintura-acrilica-basico',
    title: 'Pintura Acrílica do Zero',
    coverImageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1200&auto=format&fit=crop',
    modules: [
      {
        id: 'mod1',
        title: 'Fundamentos',
        lessons: [
          {
            id: 'l1',
            title: 'Conhecendo os Pincéis',
            durationMinutes: 12,
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            description: 'Apresentação dos principais tipos de pincéis e seus usos.',
            resources: [
              { label: 'Guia de Pincéis.pdf', url: '#' },
            ],
          },
          {
            id: 'l2',
            title: 'Tipos de Tinta Acrílica',
            durationMinutes: 9,
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            description: 'Entenda diferenças entre marcas e viscosidades.',
            resources: [
              { label: 'Tabela de Cores.pdf', url: '#' },
            ],
          },
        ],
      },
      {
        id: 'mod2',
        title: 'Primeiros Traços',
        lessons: [
          {
            id: 'l3',
            title: 'Preparando a Tela',
            durationMinutes: 7,
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            description: 'Como preparar a base e esboçar a composição.',
            resources: [
              { label: 'Checklist de Materiais.pdf', url: '#' },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'introducao-ao-bordado',
    title: 'Introdução ao Bordado',
    coverImageUrl: 'https://images.unsplash.com/photo-1562572159-4efc207f5aff?q=80&w=1200&auto=format&fit=crop',
    modules: [
      {
        id: 'mod1',
        title: 'Fundamentos do Bordado',
        lessons: [
          {
            id: 'l1',
            title: 'Materiais e Preparação do Tecido',
            durationMinutes: 8,
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            description: 'Conheça tecidos, linhas e bastidores e como preparar sua base.',
            resources: [
              { label: 'Lista de Materiais.pdf', url: '#' },
            ],
          },
          {
            id: 'l2',
            title: 'Pontos Básicos',
            durationMinutes: 11,
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            description: 'Aprenda alinhavo, ponto atrás e ponto corrente.',
            resources: [
              { label: 'Guia de Pontos.pdf', url: '#' },
            ],
          },
        ],
      },
      {
        id: 'mod2',
        title: 'Projeto Final',
        lessons: [
          {
            id: 'l3',
            title: 'Mini Floral Bordado',
            durationMinutes: 10,
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            description: 'Aplique os pontos aprendidos em um mini floral decorativo.',
            resources: [
              { label: 'Molde Floral.pdf', url: '#' },
            ],
          },
        ],
      },
    ],
  },
];

export function getCourseBySlug(slug: string): Course | undefined {
  return mockCourses.find((c) => c.slug === slug);
}


