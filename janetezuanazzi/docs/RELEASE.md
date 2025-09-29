# RELEASE.md

## 1. Objetivo
Guia para execução de releases do SaaS Janete Zuanazzi, garantindo segurança, rastreabilidade e capacidade de rollback.

## 2. Tipos de Release
- **Patch**: correções de bugs, hotfixes.
- **Minor**: novas features backwards-compatible.
- **Major**: breaking changes (ex.: migrações significativas, APIs novas).

## 3. Pré-Requisitos
- CI verde (lint, type-check, unit, component, E2E, visual, build, contract tests).
- Checklist de QA aprovado (ver seção 6).
- PTR atualizado com o status das fases/dominios.
- Migrações aplicadas/validadas em staging.
- Feature flags configuradas (on/off) para novo release.

## 4. Pipeline de Release
1. Criar branch de release (`release/vX.Y.Z`).
2. Atualizar `CHANGELOG.md` e versionamento (semver).
3. Rodar testes completos localmente (ou workflow dedicated).
4. Merge para `staging`; realizar deploy automático.
5. Executar suíte de validação em staging (E2E, visual, axe, Lighthouse).
6. Aprovação manual do release (PO/Eng). Registrar no `Checklist`.
7. Merge em `main` + tag semver + deploy para `prod`.
8. Monitorar métricas/alertas nas primeiras 24h.

## 5. Feature Flags
- Armazenamento: (definir provedor – LaunchDarkly / Config Service).
- Procedimento: habilitar gradualmente (0% → 10% → 50% → 100%).
- Rollback: desabilitar flag e/ou reverter deploy.

## 6. Checklist de Aceite (pré-produção)
- [ ] CI completo verde.
- [ ] Migrações executadas em staging.
- [ ] Seed atualizado aplicado.
- [ ] Testes E2E principais aprovados.
- [ ] Testes visuais (desktop/tablet/mobile) sem diffs críticos.
- [ ] Análise axe sem violações críticas.
- [ ] Sem erros no console em navegação padrão.
- [ ] Documentação atualizada (README, MIGRATION, RUNBOOK).
- [ ] Plano de rollback definido e testado.

## 7. Pós-Release
- Verificar dashboards (latência, erros, CLS, LCP).
- Conferir logs para novas exceções.
- Atualizar `RELEASE.md` com notas:

| Versão | Data | Itens Principais | Flags Envolvidas | Responsável | Notas |
|--------|------|------------------|------------------|-------------|-------|
|        |      |                  |                  |             |       |

## 8. Rollback
- Triggers: falhas críticas (auth, billing), degradação severa (SLO violado).
- Ações:
  - Reverter feature flag(s).
  - Deploy anterior (tag N-1).
  - Restaurar banco (se necessário) seguindo MIGRATION.md.
- Comunicação ao time/stakeholders.

## 9. Comunicação
- Anunciar releases para stakeholders (Slack/email) com resumo.
- Atualizar site/changelog público.

## 10. Pendências/To-do
- [ ] Definir ferramenta de feature flag.
- [ ] Automatizar geração de changelog.
- [ ] Criar template de comunicação externa.

---

_Skeleton v0.1 – completar conforme processos forem estabelecidos._

