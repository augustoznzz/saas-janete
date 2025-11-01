import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://example.com';
  return [
    { url: `${base}/`, priority: 1 },
    { url: `${base}/cursos`, priority: 0.9 },
    { url: `${base}/galeria`, priority: 0.8 },
    { url: `${base}/sobre`, priority: 0.7 },
    { url: `${base}/contato`, priority: 0.7 },
  ];
}

