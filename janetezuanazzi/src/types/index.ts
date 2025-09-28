export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  category: 'enxoval' | 'patches' | 'monogramas' | 'presentes';
  image: string;
  technique: string;
  material: string;
  featured?: boolean;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  priceFrom: string;
  includes: string[];
  estimatedTime: string;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  text: string;
  location?: string;
}

export interface ContactForm {
  name: string;
  email: string;
  whatsapp: string;
  pieceType: string;
  desiredDeadline: string;
  message: string;
  references?: FileList;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}
