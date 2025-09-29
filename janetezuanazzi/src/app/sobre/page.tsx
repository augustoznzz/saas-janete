import Image from 'next/image';

export default function SobrePage() {
  return (
    <div className="container-narrow mt-6 grid gap-10 md:grid-cols-2 items-start">
      <div className="relative aspect-square overflow-hidden rounded-2xl">
        <Image src="https://media.discordapp.net/attachments/1393705889613221928/1421818601010233435/image.png?ex=68dbbcc2&is=68da6b42&hm=29f6397776667d4ce73d84bdb98b8b8c077a25536d4ec126e21cbdcff42c162a&=&format=webp&quality=lossless" alt="Artista" fill className="object-cover" />
      </div>
      <div>
        <h1 className="section-title mb-4">Sobre Mim</h1>
        <div className="space-y-4 text-black/80 leading-relaxed">
          <p>Bem-vinda ao meu ateliê. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ut lacinia nulla. Donec convallis vitae dolor sit amet pulvinar.</p>
          <p>Minha missão é democratizar o acesso à arte, com cursos acessíveis e uma didática acolhedora. Integer aliquet convallis nibh, a hendrerit risus. Nunc ut libero eget erat suscipit volutpat.</p>
          <p>Ao longo dos anos, desenvolvi uma linguagem própria, inspirada pela natureza e pelas cores suaves. Mauris nec nibh vel ipsum posuere dictum.</p>
          <p>Obrigada por estar aqui. Espero que a arte te encontre, hoje e sempre.</p>
        </div>
      </div>
    </div>
  );
}

