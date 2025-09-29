import Image from 'next/image';

export default function SobrePage() {
  return (
    <div className="container-narrow mt-6 grid gap-10 md:grid-cols-2 items-start">
      <div className="relative aspect-square overflow-hidden rounded-2xl">
        <Image src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1400&auto=format&fit=crop" alt="Artista" fill className="object-cover" />
      </div>
      <div>
        <h1 className="section-title mb-4">Sobre Mim</h1>
        <div className="space-y-4 text-black/80 leading-relaxed">
          <p>Bem-vinde ao meu ateliê. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ut lacinia nulla. Donec convallis vitae dolor sit amet pulvinar.</p>
          <p>Minha missão é democratizar o acesso à arte, com cursos acessíveis e uma didática acolhedora. Integer aliquet convallis nibh, a hendrerit risus. Nunc ut libero eget erat suscipit volutpat.</p>
          <p>Ao longo dos anos, desenvolvi uma linguagem própria, inspirada pela natureza e pelas cores suaves. Mauris nec nibh vel ipsum posuere dictum.</p>
          <p>Obrigada por estar aqui. Espero que a arte te encontre, hoje e sempre.</p>
        </div>
      </div>
    </div>
  );
}

