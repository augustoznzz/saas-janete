import Image from 'next/image';

export default function SobrePage() {
  return (
    <div className="container-narrow mt-6 grid gap-10 md:grid-cols-2 items-start">
      <div className="relative aspect-square overflow-hidden rounded-2xl">
        <Image src="/mae.jpg" alt="Artista" fill className="object-cover" />
      </div>
      <div>
        <h1 className="section-title mb-4">Sobre Mim</h1>
        <div className="space-y-4 text-black/80 leading-relaxed">
          <p>Bem-vindos ao ateliê! Aqui é um espaço acolhedor, criado com muito carinho para que você se sinta em casa. Nosso ateliê tem uma proposta simples: ser um lugar onde as pessoas possam socializar, aprender e desenvolver suas habilidades no bordado, no seu próprio ritmo e com prazer.</p>
          <p>O ambiente é caseiro, tranquilo e cheio de boas energias — perfeito para trocar experiências, relaxar e deixar a criatividade fluir. Seja você iniciante ou experiente, o importante é se permitir criar, descobrir novas técnicas e aproveitar cada ponto dessa jornada artesanal.</p>
          <p>Venha bordar, conversar e fazer parte da turma!</p>
          <p>Obrigada por estar aqui. Espero que a arte te encontre, hoje e sempre. ✨</p>
        </div>
      </div>
    </div>
  );
}

