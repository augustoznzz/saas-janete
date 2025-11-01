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
    slug: 'introducao-ao-bordado',
    title: 'Introdução ao Bordado',
    coverImageUrl: '/introducao-ao-bordado.jpg',
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


