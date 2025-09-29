import Link from 'next/link';

export default function ContatoPage() {
  return (
    <div className="container-narrow mt-6 space-y-6">
      <h1 className="section-title">Contato</h1>
      <p className="text-black/70 max-w-2xl">Para dúvidas, inscrições e informações, entre em contato pelos canais abaixo.</p>
      <div className="rounded-2xl border border-black/10 bg-white p-6">
        <ul className="space-y-3">
          <li>
            <span className="font-semibold">Instagram: </span>
            <Link href="https://instagram.com" target="_blank" className="underline">@atelie</Link>
          </li>
          <li>
            <span className="font-semibold">WhatsApp: </span>
            <Link href="https://wa.me/5500000000000" target="_blank" className="underline">(00) 00000-0000</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

