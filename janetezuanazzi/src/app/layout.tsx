import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Janete Zuanazzi | Bordados Minimalistas",
  description: "SaaS simples para o ateliê de bordado de Janete Zuanazzi. Solicite orçamentos e acompanhe projetos artesanais sob medida.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="antialiased bg-[var(--brand-background)] text-[var(--brand-ink)]">
        {children}
      </body>
    </html>
  );
}
