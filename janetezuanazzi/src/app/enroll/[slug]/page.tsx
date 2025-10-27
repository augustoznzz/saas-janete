import { redirect } from 'next/navigation';
import { getUserFromSession } from '@/lib/auth';

// Mapeamento de cursos para links de checkout do Kiwify
const KIWIFY_CHECKOUT_LINKS: Record<string, string> = {
  'introducao-ao-bordado': process.env.NEXT_PUBLIC_KIWIFY_CHECKOUT_BORDADO || 'https://pay.kiwify.com.br/LINK_BORDADO',
};

export default function EnrollGatePage({ params }: { params: { slug: string } }) {
  const user = getUserFromSession();
  const courseSlug = params.slug;

  if (!user) {
    redirect(`/criar-conta?redirect=${encodeURIComponent(`/enroll/${courseSlug}`)}`);
  }

  // Redirecionar para o link de checkout do Kiwify
  const paymentHref = KIWIFY_CHECKOUT_LINKS[courseSlug] || '/cursos';

  redirect(paymentHref);
}


