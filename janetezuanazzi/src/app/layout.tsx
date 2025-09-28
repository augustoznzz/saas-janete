import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Janete Zuanazzi - Bordados Autorais e Personalizados",
  description: "Ateliê de bordados autorais e personalizados. Enxovais, patches, monogramas e presentes únicos com qualidade excepcional.",
  keywords: "bordados, personalizados, enxoval, patches, monogramas, artesanato, ateliê",
  authors: [{ name: "Janete Zuanazzi" }],
  openGraph: {
    title: "Janete Zuanazzi - Bordados Autorais e Personalizados",
    description: "Ateliê de bordados autorais e personalizados. Enxovais, patches, monogramas e presentes únicos com qualidade excepcional.",
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Janete Zuanazzi - Bordados Autorais e Personalizados",
    description: "Ateliê de bordados autorais e personalizados. Enxovais, patches, monogramas e presentes únicos com qualidade excepcional.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}