import { Service } from '@/types';

export const services: Service[] = [
  {
    id: '1',
    title: 'Bordados para Enxoval',
    description: 'Peças únicas para compor seu enxoval de casamento ou casa nova',
    priceFrom: 'R$ 150',
    includes: [
      'Toalhas de mesa personalizadas',
      'Lençóis com monogramas',
      'Cortinas bordadas',
      'Roupas de cama personalizadas',
      'Consultoria de design'
    ],
    estimatedTime: '15-30 dias',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop&crop=center',
  },
  {
    id: '2',
    title: 'Patches Personalizados',
    description: 'Patches únicos para personalizar roupas, mochilas e acessórios',
    priceFrom: 'R$ 25',
    includes: [
      'Design personalizado',
      'Aplicação profissional',
      'Diversos tamanhos',
      'Materiais de qualidade',
      'Entrega rápida'
    ],
    estimatedTime: '3-7 dias',
    image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=600&fit=crop&crop=center',
  },
  {
    id: '3',
    title: 'Monogramas Elegantes',
    description: 'Monogramas clássicos e modernos para qualquer peça',
    priceFrom: 'R$ 80',
    includes: [
      'Design exclusivo',
      'Diversas fontes disponíveis',
      'Cores personalizadas',
      'Aplicação em qualquer tecido',
      'Garantia de qualidade'
    ],
    estimatedTime: '7-14 dias',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop&crop=center',
  },
  {
    id: '4',
    title: 'Presentes Personalizados',
    description: 'Kits e peças únicas para presentear com carinho',
    priceFrom: 'R$ 50',
    includes: [
      'Embalagem especial',
      'Cartão personalizado',
      'Peças únicas',
      'Entrega em todo Brasil',
      'Opções de urgência'
    ],
    estimatedTime: '5-15 dias',
    image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=600&fit=crop&crop=center',
  },
];
