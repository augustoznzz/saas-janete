# MIGRATION.md

## 1. Objetivo
- Documentar todas as migrações de dados necessárias para o SaaS Janete Zuanazzi.
- Estabelecer processo seguro de aplicação, rollback e validação.

## 2. Stack de Dados
- Banco alvo: PostgreSQL (gerenciado via Prisma ORM).
- Outras fontes: (preencher se houver legados exportados, planilhas, etc.).

## 3. Processos de Migração
### 3.1 Estratégia Geral
- Descrever fases da migração (ex.: inicial → incremental → definitiva).
- Definir janelas de execução e dependências com features.

### 3.2 Ferramentas
- `prisma migrate dev/deploy` para migrações forward.
- Scripts customizados (Node/TS) para ETL ou seed.
- Backups: (definir ferramenta/automação).

### 3.3 Procedimento Padrão
1. Criar migration (`npx prisma migrate dev --name <descricao>`).
2. Revisar SQL gerado e testar local.
3. Atualizar seeds conforme necessário.
4. Executar testes automatizados (unit/integration) que cobrem o domínio.
5. Validar em ambiente `dev` → `staging` → `prod`.

## 4. Rollback
- Definir comandos para reverter (`prisma migrate resolve --rolled-back`).
- Descrever plano de contingência (ex.: restauração de backup, scripts inversos).
- Checklist para pós-rollback (verificar integridade, logs, métricas).

## 5. Scripts de Seed
- Localização: `apps/api/prisma/seed.ts` (ou definir).
- Conteúdo mínimo: usuário admin (Janete), planos padrão, dados demo.
- Execução: `npm run seed` (definir no package).

## 6. Governança de Migrações
- Naming padrão (`YYYYMMDDHHmm_<contexto>`).
- Revisão obrigatória (code review, approvals).
- Documentar cada migration neste arquivo (ver seção 7).

## 7. Registro de Migrações
- Tabela para registrar cada entrada:

| Versão | Descrição | Data | Autor | Rollback | Notas |
|--------|-----------|------|-------|----------|-------|
|        |           |      |       |          |       |

## 8. Pendências / Próximos Passos
- [ ] Validar estratégia com DevOps/DBA.
- [ ] Configurar backups automáticos.
- [ ] Definir ferramentas ETL caso haja import de dados legados.

---

_Skeleton v0.1 – preencher conforme migrações forem definidas._

