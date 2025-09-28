# Janete Zuanazzi - Ateliê de Bordados

Site minimalista e elegante para o ateliê de bordados autorais e personalizados da Janete Zuanazzi.

## 🎨 Características

- **Design Minimalista**: Estética feminina e delicada com bastante respiro
- **Responsivo**: Funciona perfeitamente em todos os dispositivos
- **Performance**: Otimizado para Lighthouse ≥ 90 em todas as categorias
- **Acessível**: Seguindo as melhores práticas de acessibilidade
- **SEO**: Metadados otimizados e sitemap automático

## 🛠️ Stack Tecnológica

- **Next.js 14+** com App Router
- **React 18** com TypeScript
- **Tailwind CSS** para estilização
- **Framer Motion** para animações sutis
- **Headless UI** para componentes acessíveis
- **Lucide React** para ícones

## 🚀 Como Executar

### Pré-requisitos

- Node.js 18+
- npm ou yarn

### Instalação

1. Clone o repositório:

```bash
git clone <url-do-repositorio>
cd janetezuanazzi
```

2. Instale as dependências:

```bash
npm install
```

3. Execute o projeto em modo de desenvolvimento:

```bash
npm run dev
```

4. Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 📁 Estrutura do Projeto

```
src/
├── app/                    # App Router do Next.js
│   ├── api/               # API Routes
│   ├── contato/           # Página de contato
│   ├── portfolio/         # Página de portfólio
│   ├── servicos/          # Página de serviços
│   ├── sobre/             # Página sobre
│   ├── globals.css        # Estilos globais
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Página inicial
│   ├── robots.ts          # Configuração do robots.txt
│   └── sitemap.ts         # Geração do sitemap.xml
├── components/            # Componentes reutilizáveis
│   ├── Button.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── Lightbox.tsx
│   └── PortfolioCard.tsx
├── data/                  # Dados estáticos
│   ├── faq.ts
│   ├── portfolio.ts
│   ├── services.ts
│   └── testimonials.ts
├── lib/                   # Utilitários
└── types/                 # Definições TypeScript
    └── index.ts
```

## 🎨 Paleta de Cores

- **Fundo Principal**: `#FFFFFF` (branco)
- **Accent**: `#FFD7D7` (rosa suave)
- **Texto**: `#000000` (preto)

## 📱 Páginas

### Home (/)

- Hero com logotipo tipográfico
- Grade de destaques do portfólio
- Seção "Processo de criação"
- Depoimentos de clientes
- CTA final

### Sobre (/sobre)

- História do ateliê
- Valores e diferenciais
- FAQ com accordion

### Portfólio (/portfolio)

- Filtros por categoria
- Galeria responsiva com lightbox
- Informações técnicas das peças

### Serviços (/servicos)

- Cards de serviços com preços
- Processo de trabalho
- Diferenciais

### Contato (/contato)

- Formulário de orçamento
- Informações de contato
- Dicas para orçamento

## 🔧 Configurações

### Tailwind CSS

O projeto usa Tailwind CSS com configuração personalizada em `tailwind.config.ts`:

- Cores customizadas
- Fontes Google (Playfair Display + Inter)
- Animações personalizadas

### Next.js

Configurações em `next.config.ts`:

- Otimização de imagens
- Domínios permitidos para imagens externas

## 📈 Performance

O projeto está otimizado para:

- **Lighthouse Performance**: ≥ 90
- **Lighthouse Accessibility**: ≥ 90
- **Lighthouse Best Practices**: ≥ 90
- **Lighthouse SEO**: ≥ 90

## 🚀 Deploy

### Vercel (Recomendado)

1. Conecte seu repositório ao Vercel
2. Configure as variáveis de ambiente (se necessário)
3. Deploy automático a cada push

### Outras Plataformas

O projeto pode ser deployado em qualquer plataforma que suporte Next.js:

- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 📝 Próximos Passos

- [ ] Integração com CMS (ex: Strapi, Sanity)
- [ ] Sistema de blog
- [ ] Integração com WhatsApp Business API
- [ ] Analytics e tracking
- [ ] Testes automatizados
- [ ] PWA (Progressive Web App)

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Contato

**Janete Zuanazzi**

- Website: [janetezuanazzi.com](https://janetezuanazzi.com)
- Email: contato@janetezuanazzi.com
- WhatsApp: (11) 99999-9999

---

Feito com ❤️ para bordadeiras e amantes do artesanato
