'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAccessToken } from '@/lib/identity';

// Links de checkout
const KIWIFY_CHECKOUT_LINKS: Record<string, string> = {
  'introducao-ao-bordado': process.env.NEXT_PUBLIC_KIWIFY_CHECKOUT_BORDADO || 'https://pay.kiwify.com.br/eDz2HDA',
};

const CAKTO_CHECKOUT_LINKS: Record<string, string> = {
  // Configure via env when available; fallback to empty
  'introducao-ao-bordado': process.env.NEXT_PUBLIC_CAKTO_CHECKOUT_BORDADO || 'https://pay.cakto.com.br/5q3pep2_627177',
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

        // Usuário está logado - preferir Cakto; fallback para Kiwify
        const caktoHref = CAKTO_CHECKOUT_LINKS[courseSlug];
        const kiwifyHref = KIWIFY_CHECKOUT_LINKS[courseSlug];
        const paymentHref = caktoHref || kiwifyHref;
        
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


