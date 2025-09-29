# RUNBOOK.md

Guia operacional para suporte, incidentes e manutenção contínua do SaaS Janete Zuanazzi.

## 1. Informações Gerais
- **Contato primário**: (preencher Time Eng / On-call).
- **Ambientes**: dev, staging, prod.
- **Ferramentas**: observabilidade (Grafana/Datadog), logs (ELK/Pino), feature flags, CI/CD.

## 2. SLOs e Indicadores
- Disponibilidade alvo: (ex.: 99.5%).
- Tempo resposta médio (API, páginas críticas).
- CLS/LCP limites (front).
- Erros por minuto tolerados.
- Metas de recuperação (MTTR).

## 3. Monitoramento & Alertas
- Painéis principais (links a definir).
- Alertas configurados (latência, erro 5xx, falha auth, billing).
- Canal de notificação (Slack, PagerDuty, email).

## 4. Procedimentos Comuns
### 4.1 Deploy/Release
- Seguir `RELEASE.md`.
- Verificar checagens pós-deploy.

### 4.2 Incidentes
1. Confirmar alarme.
2. Informar stakeholders (canal #incidents).
3. Ativar runbook específico (ver seções 5.x).
4. Registrar no incidente (post-mortem se necessário).

### 4.3 Rollback
- Ver `RELEASE.md` + `MIGRATION.md` para passos de rollback.
- Garantir comunicação e logs após revert.

## 5. Runbooks Específicos
### 5.1 Falha de Autenticação (OIDC/Keycloak/Auth0)
- Passos de diagnóstico (check status provider, logs `/auth`).
- Mitigações (fallback, feature flag, contato provedor).

### 5.2 Erros Billing/Checkout
- Verificar integração (Stripe/Pagar.me), logs.
- Comunicação imediata com cliente afetado.
- Passos para reprocessar transação.

### 5.3 Latência Alta nas Rotas API
- Confirmar métricas (p99/p95).
- Checar dependências (DB, cache, fila).
- Escalonar infra (ex.: scale up cluster) ou ativar caching via feature flag.

### 5.4 UI Fora do Ar / Erros 500
- Validar status do deploy (último release).
- Consultar logs front (Vercel/hosting) e API.
- Avaliar rollback vs hotfix.

### 5.5 Migração falhou
- Reverter conforme `MIGRATION.md`.
- Restaurar backup se necessário.
- Abrir incidente SEV-1.

## 6. Manutenção Preventiva
- Rotina semanal: revisar alertas flapping, backups, tarefas agendadas.
- Rotina mensal: atualização dependências (segurança), auditoria acessos.
- Rotina trimestral: teste de DR/rollback.

## 7. Post-Mortem Template
- Resumo incidente, timeline, causa raiz, lições aprendidas, ações preventivas.

## 8. Pendências
- [ ] Definir owners e contatos.
- [ ] Linkar dashboards reais.
- [ ] Preencher SLIs/SLOs definitivos.

---

_Skeleton v0.1 – completar conforme operação evoluir._

