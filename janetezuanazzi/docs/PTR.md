# Plano Técnico de Reconstrução (PTR)

## 1. Contexto e Visão Geral

- **Produto**: SaaS do ateliê de bordado de Janete Zuanazzi, focado em gestão de clientes, pedidos personalizados, assinatura de serviços e vitrine digital.
- **Objetivo da iniciativa**: Reconstruir o produto com UI estável, UX consistente, arquitetura sustentável e base automatizada de testes/deploy, preservando a identidade visual (paleta clara, acento rosa #FFD7D7).
- **Stakeholders principais**: Janete (fundadora/operadora), equipe de produção, clientes finais, time técnico.

## 2. Metas e Não-Metas

### Metas

- Eliminar bugs visuais/reflow, garantir CLS ≈ 0 e skeletons uniformes.
- Definir arquitetura front/back modular, com domínios desacoplados (Auth, Users, Billing, Subscriptions, Settings, Catalog/Vitrine).
- Construir Design System completo (tokens, componentes, dark/light) e Storybook com testes visuais.
- Implantar pipelines CI/CD com lint, type-check, unit/component/E2E/visual, build e deploy.
- Integrar observabilidade (OpenTelemetry), testes de contrato (OpenAPI) e políticas de segurança OWASP Top 10.
- Suportar autenticação OIDC + JWT, feature flags e migrações reversíveis.

### Não-Metas (por agora)

- Criação de marketing site independente.
- Automatizações avançadas de logística/faturamento além do escopo atual.
- Machine learning/recomendações.
- Migração para microfrontends ou microservices totalmente independentes nesta fase inicial.

## 3. Estado Atual (Resumo da Auditoria)

- **Front**: Next.js 15.5, React 19, Tailwind 4, Framer Motion. UI relativamente estática, DS inexistente, poucas páginas (`home`, `sobre`, `serviços`, `portfólio`, `contato`). Sem testes de componentes/E2E.
- **Back**: Apenas `route` de contato. Sem API real, sem autenticação, sem persistência.
- **Infra**: Sem dockerização documentada; exec local via `npm run dev -p 3002`; CI inexistente.
- **Observabilidade/Testes**: inexistentes.

## 4. Arquitetura Alvo

```
monorepo (pnpm/turborepo)
├── apps
│   ├── web (Next 15, App Router)
│   └── api (Nest.js 10)
├── packages
│   ├── design-system (tokens, componentes, stories, tests)
│   ├── shared-config (eslint, tsconfig, tailwind)
│   ├── shared-utils (helpers, schemas zod)
│   └── shared-types (DTOs, OpenAPI types, zod)
├── infra
│   ├── docker-compose.yml (web, api, postgres, redis)
│   └── terraform/ (staging/prod)
└── docs (PTR, MIGRATION, RELEASE, RUNBOOK)
```

### 4.1 Frontend (apps/web)

- **Stack**: React 18/19, Next App Router, TypeScript, Tailwind + tokens, Radix primitives.
- **Estado**: React Query para requests (cache/invalidação); Zustand para estado local (UI, theme, feature flags).
- **Estrutura**: `src/design-system`, `src/features/<domain>`, `src/routes`, `src/state`, `src/services`, `src/i18n`, `src/utils`.
- **Design System**: tokens, dark/light, componentes base (Button, Input, Select, Modal, Snackbar, Table, Skeleton, Tabs, Steps, Tag) com `@storybook/react` + `@storybook/addon-interactions` + `@storybook/addon-a11y`.
- **Acessibilidade**: WCAG 2.1 AA (axe, teclado, ARIA, contraste > 4.5:1).
- **Performance**: code-splitting por página, imagens `next/image` com `width/height`, caching HTTP + optional Service Worker.
- **I18n**: `@formatjs/intl` ou `next-intl` com chaves `pt-BR` e fallback `en-US`.
- **Testing**: Vitest/Jest + Testing Library, Playwright (E2E/visual).

### 4.2 Backend (apps/api)

- **Stack**: Nest.js (Express adapter), TypeScript, Prisma (PostgreSQL), optional Redis para filas (BullMQ) e cache.
- **Módulos**:
  - `Auth`: login/signup (OIDC), refresh token rotation, 2FA opcional.
  - `Users`: perfis, convites, roles.
  - `Billing`: integração pagamento (Stripe/Pagar.me), NF/recibos.
  - `Subscriptions`: planos, upgrades/downgrades.
  - `Settings`: preferências, webhooks.
  - `Catalog`: gerenciamento de peças/portfólio (se necessário).
- **APIs**: versionadas (`/v1/...`), contratos OpenAPI gerados automaticamente.
- **Segurança**: DTO validation (class-validator), sanitização, rate limiting, headers (helmet), CSRF para páginas server-rendered.
- **Observabilidade**: OpenTelemetry SDK, logs estruturados (Pino), metrics (Prometheus).
- **Testes**: Jest/Vitest unit (services), pact/contract tests, supertest integration.

### 4.3 Pacotes Compartilhados

- `design-system`: exporta tokens e componentes (consumido por web e storybook).
- `shared-utils`: funções puras (formatters, date, currency, analytics wrappers).
- `shared-types`: schemas Zod + DTOs OpenAPI -> reuso front/back.
- `shared-config`: ESLint, Prettier, Tailwind, tsconfig base.

### 4.4 Infra & CI/CD

- Docker multi-stage build para web/api.
- docker-compose para dev (web + api + postgres + redis + mailhog).
- Terraform mínimo (VPC, RDS, ECS/EKS ou render.com). Variáveis via secrets manager.
- GitHub Actions (matriz): lint → type-check → unit → component → e2e → visual → build → deploy. Gates para staging/prod com approval manual.
- Feature flags (LaunchDarkly ou solução custom com toggles).

## 5. Estratégia de Dados

- **Banco**: PostgreSQL com Prisma; separar schemas por domínio se necessário.
- **Migrations**: versionadas, scripts `migrate`, `rollback`, `seed` (dados base: planos, usuário Janete).
- **Backups**: snapshot automático; rollback documentado em `MIGRATION.md`.

## 6. Observabilidade

- Instrumentar rotas críticas (auth, checkout, subscription change).
- Dashboards (Grafana/Datadog) com métricas: latência, throughput, erro.
- Logs estruturados com request-id, user-id, feature-flag snapshot.
- Alertas (pager/email) para SLO breaches.

## 7. Segurança

- OIDC (Auth0/Keycloak) + JWT (access curta, refresh longa com rotação).
- OWASP: input validation (frontend/back), encoding, CSRF tokens, SSRF protections.
- Headers: CSP, HSTS, X-Frame-Options, Referrer-Policy.
- Dependabot + audits (npm audit, snyk). Secrets via Vault/manager.

## 8. Plano de Testes

| Camada    | Ferramentas                      | Cobertura alvo                                    |
| --------- | -------------------------------- | ------------------------------------------------- |
| Unit      | Vitest/Jest                      | ≥80% linhas críticas                              |
| Component | Testing Library + Storybook test | ≥80% componentes públicos                         |
| E2E       | Playwright                       | Fluxos auth, checkout, profile, billing, webhooks |
| Visual    | Playwright + `toHaveScreenshot`  | Páginas core (desktop/tablet/mobile)              |
| Contrato  | Dredd/Schemathesis + OpenAPI     | Todos endpoints v1                                |

CI coleta cobertura (Codecov) e snapshots visuais.

## 9. Plano de Migração (Fases)

1. **Fase 0 – Auditoria (concluída)**
   - Mapear UI atual, rotas, débitos. Registrar prints de bugs.
2. **Fase 1 – Arquitetura & PTR**
   - Aprovar este documento. Detalhar backlog por domínio.
3. **Fase 2 – Monorepo e Tooling**
   - Configurar pnpm/turborepo, lint, formatter, husky, commitlint, Docker base, GH Actions (lint/typecheck).
4. **Fase 3 – Design System**
   - Tokens + componentes + Storybook + testes. Publicar ds docs.
5. **Fase 4 – Backend base**
   - Nest scaffolding, módulos core vazios, auth stub, Prisma schema inicial, migrations/seed.
6. **Fase 5 – Frontend infra**
   - Estrutura features, React Query, Zustand, i18n, layouts, providers, routing, DS integration.
7. **Fase 6 – Refactor por domínio**
   - Ordem: Auth → Users → Billing → Subscriptions → Settings → Dashboard/Onboarding → Catalog.
   - Para cada: implementar API + UI + testes + observabilidade.
8. **Fase 7 – Observabilidade & Segurança**
   - OTel, logs, alerts, security hardening, feature flags.
9. **Fase 8 – Dados & Migrações**
   - Completar migrations, seeds, rollback docs (`MIGRATION.md`).
10. **Fase 9 – CI/CD completo**
    - Adicionar Playwright (E2E + visual), coverage gates, deploy auto (dev/staging/prod) com approvals.
11. **Fase 10 – Test Flight & Go-live**
    - Rodar suites completas em staging, Lighthouse, axe, runbooks, release checklist (`RELEASE.md`).

## 10. Riscos & Mitigações

| Risco                         | Impacto           | Mitigação                                                       |
| ----------------------------- | ----------------- | --------------------------------------------------------------- |
| Escopo cresce (novo módulo)   | Atraso            | Change control via PTR updates, feature flags                   |
| Falta de design detalhado     | UI inconsistente  | Design System + aprovação com stakeholders + Storybook          |
| Integração pagamento complexa | Atraso Billing    | Mock/stub inicial + integração progressiva com ambiente sandbox |
| Testes visuais frágeis        | Falsos positivos  | Definir tolerância, baseline review, tagging por viewport       |
| Produtividade em monorepo     | Curva aprendizado | Documentação README + scripts helpers + invest em DX            |

## 11. Próximos Passos

1. Validar PTR com stakeholders (aceite formal).
2. Criar backlog por fase (Linear/Jira) alinhado com este plano.
3. Iniciar implementação Fase 2 (monorepo skeleton) após aprovação.
4. Preparar `docs/MIGRATION.md`, `docs/RELEASE.md`, `docs/RUNBOOK.md` skeleton na próxima etapa.

---

_Versão 0.1 • 29/09/2025_
