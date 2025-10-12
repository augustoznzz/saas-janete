import type { Metadata } from 'next';
import './globals.css';
import { Playfair_Display, Lato } from 'next/font/google';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const serif = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' });
const sans = Lato({ subsets: ['latin'], weight: ['300','400','700','900'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: {
    default: 'Ateliê Janete Zuanazzi',
    template: '%s | Ateliê',
  },
  description: 'Ateliê com mais de 20 anos de experiência em bordado, cursos acessíveis e uma didática acolhedora.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${serif.variable} ${sans.variable}`}>
      <body className="min-h-screen bg-brand-pinkLight text-brand-text antialiased">
        <Header />
        <main className="pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

