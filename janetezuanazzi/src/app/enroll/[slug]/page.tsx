import { redirect } from 'next/navigation';
import { getUserFromSession } from '@/lib/auth';

export default function EnrollGatePage({ params }: { params: { slug: string } }) {
  const user = getUserFromSession();
  const courseSlug = params.slug;

  if (!user) {
    redirect(`/criar-conta?redirect=${encodeURIComponent(`/enroll/${courseSlug}`)}`);
  }

  // After login, redirect to payment link as before
  const paymentHref = courseSlug === 'introducao-ao-bordado'
    ? 'https://pay.lirapaybr.com/cUSkzMqw'
    : `/checkout/${courseSlug}`;

  redirect(paymentHref);
}


