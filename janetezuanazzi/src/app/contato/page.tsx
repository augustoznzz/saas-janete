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
            <Link href="https://www.instagram.com/janetezuanazzi/" target="_blank" className="underline">@janetezuanazzi</Link>
          </li>
          <li>
            <span className="font-semibold">WhatsApp: </span>
            <Link href="https://wa.me/554899819211?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20melhor%20sobre%20o%20seu%20trabalho%20e%20os%20valores%20das%20aulas%20presenciais" target="_blank" className="underline">(48) 9981-9211</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

