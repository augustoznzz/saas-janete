'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAccessToken } from '@/lib/identity';

// Mapeamento de cursos para links de checkout do Kiwify
const KIWIFY_CHECKOUT_LINKS: Record<string, string> = {
  'introducao-ao-bordado': 'https://pay.kiwify.com.br/eDz2HDA',
};

export default function EnrollGatePage({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const courseSlug = params.slug;
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkAuthAndRedirect = async () => {
      try {
        // Verificar se há sessão via cookie primeiro (mais rápido)
        const hasSessionCookie = document.cookie.includes('student_session');
        
        // Tentar obter token do Netlify Identity (mais confiável)
        const token = await getAccessToken();
        
        const isLoggedIn = hasSessionCookie || token;

        if (!isLoggedIn) {
          // Redirecionar para criar conta se não estiver logado
          router.push(`/criar-conta?redirect=${encodeURIComponent(`/enroll/${courseSlug}`)}`);
          return;
        }

        // Usuário está logado - redirecionar para o link de checkout do Kiwify
        const paymentHref = KIWIFY_CHECKOUT_LINKS[courseSlug];
        
        if (paymentHref) {
          // Usar window.location para redirecionamento externo
          window.location.href = paymentHref;
        } else {
          // Se não houver link configurado, voltar para a página de cursos
          router.push('/cursos');
        }
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
        // Em caso de erro, redirecionar para criar conta
        router.push(`/criar-conta?redirect=${encodeURIComponent(`/enroll/${courseSlug}`)}`);
      } finally {
        setChecking(false);
      }
    };

    checkAuthAndRedirect();
  }, [courseSlug, router]);

  return (
    <div className="container-narrow py-16 text-center">
      <div className="animate-pulse">
        <p className="text-lg text-black/70">Redirecionando para o checkout...</p>
      </div>
    </div>
  );
}


