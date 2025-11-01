import Link from 'next/link';

export function Footer() {
  return (
    <footer className="mt-24 border-t border-black/5 bg-white">
      <div className="container-narrow py-10 grid gap-6 md:grid-cols-3">
        <div>
          <h3 className="font-serif text-xl mb-3">Ateliê</h3>
          <p className="text-sm text-black/70">Rua Capitão Amaro Seixas Riberio, nº 163</p>
          <p className="text-sm text-black/70">Telefone: (48) 9981-9211</p>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Redes</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="https://www.instagram.com/janetezuanazzi/" target="_blank" className="underline">Instagram</Link></li>
            <li><Link href="https://wa.me/554899819211?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20melhor%20sobre%20o%20seu%20trabalho%20e%20os%20valores%20das%20aulas%20presenciais" target="_blank" className="underline">WhatsApp</Link></li>
          </ul>
        </div>
        <div className="md:text-right">
          <p className="text-sm text-black/60">© {new Date().getFullYear()} Ateliê. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

