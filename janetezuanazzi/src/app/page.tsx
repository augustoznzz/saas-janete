import Link from "next/link";

const navLinks = [
  { label: "Visão Geral", href: "#visao-geral" },
  { label: "Funcionalidades", href: "#funcionalidades" },
  { label: "Planos", href: "#planos" },
  { label: "Contato", href: "#contato" },
];

const featureItems = [
  {
    title: "Painel gentil",
    description: "Organize encomendas, status e prazos em uma linha do tempo pensada para artistas solo.",
  },
  {
    title: "Galeria inteligente",
    description: "Publique coleções de peças finalizadas e compartilhe com clientes em links privados.",
  },
  {
    title: "Orçamentos rápidos",
    description: "Receba pedidos com fotos de referência, responda com valores e acompanhe aprovações.",
  },
];

const planItems = [
  {
    name: "Começar",
    price: "R$ 0",
    cadence: "por mês",
    highlight: "Ideal para testar",
    features: [
      "Até 10 projetos ativos",
      "Galeria compartilhável",
      "Checklist de produção",
    ],
  },
  {
    name: "Ateliê",
    price: "R$ 59",
    cadence: "por mês",
    highlight: "Mais vendido",
    features: [
      "Projetos ilimitados",
      "Orçamentos automatizados",
      "Central de clientes e pagamentos",
    ],
  },
  {
    name: "Studio",
    price: "R$ 129",
    cadence: "por mês",
    highlight: "Para times e parcerias",
    features: [
      "Gestão multi-integrante",
      "Relatórios financeiros e estoque",
      "Suporte preferencial",
    ],
  },
];

const perks = [
  "Interface minimalista com tons de branco, rosa e preto",
  "Fluxos guiados para encomendas e aprovações",
  "Clientes visualizam status de produção em tempo real",
  "Histórico completo de peças e materiais utilizados",
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--brand-background)] text-[var(--brand-ink)]">
      <header className="sticky top-0 z-20 border-b border-black/5 bg-white/90 backdrop-blur">
        <div className="container flex items-center justify-between py-4">
          <Link href="#" className="text-lg font-semibold tracking-tight">
            Janete Zuanazzi
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium text-[var(--brand-muted)] md:flex">
            {navLinks.map((item) => (
              <a key={item.href} href={item.href} className="transition hover:text-black">
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3 text-sm">
            <a
              href="#contato"
              className="inline-flex items-center rounded-full border border-black/10 px-4 py-2 font-medium transition hover:border-black/30 hover:bg-[var(--brand-surface)]"
            >
              Falar com Janete
            </a>
            <a
              href="#planos"
              className="hidden rounded-full bg-black px-4 py-2 text-white transition hover:bg-[var(--brand-muted)] md:inline-flex"
            >
              Criar conta
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="border-b border-black/5 bg-[var(--brand-surface)] py-20" id="visao-geral">
          <div className="container grid gap-12 md:grid-cols-[1.2fr_1fr] md:items-center">
            <div className="space-y-6">
              <p className="inline-flex rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-muted)]">
                SaaS para Ateliê
              </p>
              <h1 className="text-4xl font-semibold tracking-tight text-black sm:text-5xl">
                Um sistema carinhoso para o ateliê de bordados de Janete Zuanazzi
              </h1>
              <p className="text-lg text-[var(--brand-muted)]">
                Centralize pedidos personalizados, prazos e aprovação de clientes em uma plataforma delicada,
                pronta para o ritmo artesanal de quem borda com carinho há mais de 15 anos.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#planos"
                  className="inline-flex items-center rounded-full bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--brand-muted)]"
                >
                  Conhecer planos
                </a>
                <a
                  href="#funcionalidades"
                  className="inline-flex items-center rounded-full border border-black/10 px-5 py-3 text-sm font-semibold transition hover:border-black/30 hover:bg-white"
                >
                  Ver fluxo do produto
                </a>
              </div>
              <ul className="grid gap-3 text-sm text-[var(--brand-muted)] sm:grid-cols-2">
                {perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-2">
                    <span className="mt-1 inline-block h-2 w-2 rounded-full bg-black" />
                    {perk}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.3)]">
              <div className="space-y-4">
                <div className="rounded-2xl bg-[var(--brand-surface)] p-4 text-sm text-[var(--brand-muted)]">
                  <p className="font-medium text-black">Linha do tempo do pedido</p>
                  <p className="text-xs">Cliente: Ana Paula • Peça: kit enxoval • Prazo estimado: 15 dias</p>
                  <div className="mt-4 space-y-2 text-xs">
                    <div className="flex items-center justify-between rounded-full bg-white px-3 py-2 shadow-sm">
                      <span>Briefing recebido</span>
                      <span className="text-black">100%</span>
                    </div>
                    <div className="flex items-center justify-between rounded-full bg-white px-3 py-2 shadow-sm">
                      <span>Desenho aprovado</span>
                      <span className="text-black">70%</span>
                    </div>
                    <div className="flex items-center justify-between rounded-full bg-white px-3 py-2 shadow-sm">
                      <span>Produção em andamento</span>
                      <span className="text-black">40%</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3 rounded-2xl border border-dashed border-black/10 p-4 text-sm">
                  <p className="font-semibold text-black">Motivos para amar:</p>
                  <p className="text-[var(--brand-muted)]">Acompanhe cada detalhe das encomendas, incluindo fotos, materiais e notas pessoais.</p>
                  <p className="text-[var(--brand-muted)]">Compartilhe atualizações com clientes em um clique, sem abandonar o cuidado artesanal.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-black/5 py-20" id="funcionalidades">
          <div className="container grid gap-12 md:grid-cols-2">
            <div className="space-y-4">
              <h2 className="text-3xl font-semibold tracking-tight text-black">
                Plataforma pensada para o ritmo de um ateliê independente
              </h2>
              <p className="text-lg text-[var(--brand-muted)]">
                Simplifique a rotina artesanal: do primeiro contato com a cliente até a entrega da peça final.
              </p>
            </div>
            <div className="grid gap-6">
              {featureItems.map((feature) => (
                <div key={feature.title} className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-black/20">
                  <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[var(--brand-muted)]">
                    {feature.title}
                  </p>
                  <p className="mt-3 text-base text-[var(--brand-muted)]">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-black/5 bg-white py-20" id="planos">
          <div className="container space-y-12">
            <div className="space-y-4 text-center">
              <h2 className="text-3xl font-semibold tracking-tight text-black">Planos gentis para crescer no seu tempo</h2>
              <p className="text-[var(--brand-muted)]">
                Todos incluem suporte por WhatsApp com Janete e acesso à comunidade de bordadeiras.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {planItems.map((plan) => (
                <div key={plan.name} className="flex h-full flex-col rounded-3xl border border-black/10 bg-[var(--brand-surface)] p-6 shadow-sm transition hover:-translate-y-1 hover:border-black/20">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-muted)]">{plan.highlight}</p>
                  <h3 className="mt-4 text-2xl font-semibold text-black">{plan.name}</h3>
                  <p className="mt-6 text-3xl font-semibold text-black">
                    {plan.price}
                    <span className="text-sm font-medium text-[var(--brand-muted)]"> {plan.cadence}</span>
                  </p>
                  <ul className="mt-8 space-y-2 text-sm text-[var(--brand-muted)]">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-black" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#contato"
                    className="mt-auto inline-flex items-center justify-center rounded-full bg-black px-4 py-2 text-sm font-semibold text-white transition hover:bg-[var(--brand-muted)]"
                  >
                    Começar agora
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20" id="contato">
          <div className="container grid gap-10 md:grid-cols-[1.2fr_1fr]">
            <div className="space-y-6">
              <h2 className="text-3xl font-semibold tracking-tight text-black">Converse diretamente com Janete</h2>
              <p className="text-lg text-[var(--brand-muted)]">
                Conte suas ideias de bordado, envie referências e receba um plano de produção personalizado. Toda interação é feita com carinho e transparência.
              </p>
              <div className="grid gap-4 text-sm text-[var(--brand-muted)] sm:grid-cols-2">
                <div className="rounded-3xl border border-black/10 bg-[var(--brand-surface)] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em]">WhatsApp</p>
                  <p className="mt-2 text-base text-black">(11) 99999-9999</p>
                  <p className="mt-1 text-xs">Resposta em até 2h nos dias úteis</p>
                </div>
                <div className="rounded-3xl border border-black/10 bg-[var(--brand-surface)] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em]">E-mail</p>
                  <p className="mt-2 text-base text-black">contato@janetezuanazzi.com</p>
                  <p className="mt-1 text-xs">Compartilhe arquivos e detalhes técnicos</p>
                </div>
              </div>
            </div>
            <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.3)]">
              <form className="space-y-4 text-sm text-[var(--brand-muted)]">
                <div className="space-y-2">
                  <label className="font-medium" htmlFor="name">
                    Nome completo
                  </label>
                  <input
                    id="name"
                    name="name"
                    placeholder="Como podemos te chamar?"
                    className="w-full rounded-2xl border border-black/10 bg-[var(--brand-surface)] px-4 py-3 text-black outline-none transition focus:border-black/30"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-medium" htmlFor="email">
                    E-mail
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="seu@email.com"
                    className="w-full rounded-2xl border border-black/10 bg-[var(--brand-surface)] px-4 py-3 text-black outline-none transition focus:border-black/30"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-medium" htmlFor="message">
                    Conte sobre sua peça
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Tipo de peça, cores favoritas, prazo ideal..."
                    className="w-full rounded-2xl border border-black/10 bg-[var(--brand-surface)] px-4 py-3 text-black outline-none transition focus:border-black/30"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-full bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--brand-muted)]"
                >
                  Enviar mensagem
                </button>
                <p className="text-xs text-[var(--brand-muted)]">
                  Ao enviar você concorda em receber contato da Janete por e-mail ou WhatsApp. Nenhum dado é compartilhado com terceiros.
                </p>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-black/5 bg-white py-10">
        <div className="container flex flex-col gap-6 text-sm text-[var(--brand-muted)] md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} Janete Zuanazzi. Bordados autorais com tecnologia gentil.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <a href="#visao-geral" className="transition hover:text-black">
              Visão Geral
            </a>
            <a href="#planos" className="transition hover:text-black">
              Planos
            </a>
            <a href="mailto:contato@janetezuanazzi.com" className="transition hover:text-black">
              contato@janetezuanazzi.com
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
