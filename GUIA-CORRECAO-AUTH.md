# Guia de Correção: Auth "Email ou senha incorretos"

## Problema
O login retorna "Email ou senha incorretos" mesmo com credenciais corretas.

## Diagnóstico & Solução

### Passo 1: Verificar Configuração do Identity no Netlify

1. Acesse: https://app.netlify.com/sites/janetezuanazzi/identity
2. Verifique se **Identity está habilitado** ✓
3. Clique em **Settings and usage**
4. Verifique as configurações:

   **Registration preferences:**
   - ✓ Open (permitir cadastro público) OU
   - ✓ Invite only (se preferir controle)

   **External providers:** (opcional - pode deixar desabilitado se usar só email/senha)
   
   **Email templates:** (pode deixar padrão)
   
   **Identity settings:**
   - ✓ **Autoconfirm:** Recomendo **habilitar** para testes (evita necessidade de confirmar email)
   
   **Git Gateway:** (pode deixar desabilitado)

### Passo 2: Verificar Usuários Existentes

1. No mesmo painel Identity: https://app.netlify.com/sites/janetezuanazzi/identity
2. Vá em **"Users"** tab
3. Procure o usuário que está tentando logar
4. **Status deve ser "Confirmed"** (não "Invited" ou "Pending")

**Se o usuário estiver "Pending":**
- Opção A: Clique nos 3 pontinhos → "Resend confirmation email" → confirme pelo link no email
- Opção B: Delete o usuário → habilite "Autoconfirm" nas settings → crie a conta novamente

**Se o usuário não existir:**
- Crie um usuário manualmente: botão "Invite users" → adicione email → defina senha

### Passo 3: Verificar Variáveis de Ambiente

Acesse: https://app.netlify.com/sites/janetezuanazzi/configuration/env

**Adicione/Verifique estas variáveis:**

```
NEXT_PUBLIC_IDENTITY_GOTRUE_URL=https://janetezuanazzi.netlify.app/.netlify/identity
IDENTITY_GOTRUE_URL=https://janetezuanazzi.netlify.app/.netlify/identity
IDENTITY_ADMIN_TOKEN=<seu-admin-token-aqui>
DATABASE_URL=<sua-connection-string-postgres-aqui>
```

**IMPORTANTE:**
- ❌ NÃO coloque "@" no início da URL
- ✓ Use exatamente: `https://janetezuanazzi.netlify.app/.netlify/identity`
- ✓ Certifique-se de que não há espaços extras

**Para obter IDENTITY_ADMIN_TOKEN:**
1. No painel Identity → Settings and usage
2. Role até "Admin API access"
3. Clique em "Generate token"
4. Copie e cole como valor de `IDENTITY_ADMIN_TOKEN`

**Para obter DATABASE_URL:**
- Crie um banco Postgres gratuito em:
  - Neon: https://neon.tech
  - Supabase: https://supabase.com
  - ElephantSQL: https://www.elephantsql.com
- Copie a "Connection String" e cole como `DATABASE_URL`

### Passo 4: Fazer Deploy das Alterações

Após adicionar/corrigir as variáveis de ambiente:

1. Vá em **Deploys** → clique em **"Trigger deploy"** → **"Deploy site"**
2. Aguarde o deploy terminar (fica verde)
3. Limpe o cache do navegador ou use aba anônima

### Passo 5: Testar Login Direto (Diagnóstico)

**Opção A: Usar arquivo HTML de teste (mais fácil)**
1. Abra o arquivo `test-identity-login.html` que criei na raiz do projeto
2. Abra-o no navegador (duplo clique)
3. Digite email e senha
4. Clique em "Testar Login"
5. Veja o resultado detalhado

**Opção B: Usar curl (terminal)**
```bash
curl -X POST 'https://janetezuanazzi.netlify.app/.netlify/identity/token' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  --data-urlencode 'grant_type=password' \
  --data-urlencode 'username=SEU_EMAIL_AQUI' \
  --data-urlencode 'password=SUA_SENHA_AQUI'
```

**Interpretação:**
- ✓ Status 200 + `access_token` = **Funcionou!** Problema está no frontend.
- ✗ Status 400 + `invalid_grant` = **Usuário não existe ou não está confirmado** (volte ao Passo 2)
- ✗ Status 404 = **Identity não está habilitado** (volte ao Passo 1)

### Passo 6: Testar no Site

1. Acesse: https://janetezuanazzi.netlify.app/criar-conta
2. Crie uma nova conta com um email válido
3. Se "Autoconfirm" está habilitado, não precisa confirmar email
4. Vá para: https://janetezuanazzi.netlify.app/login
5. Tente fazer login

**Abra o Console do Navegador (F12) e verifique:**
- Tab Network: veja se as requisições para `/.netlify/identity/token` retornam 200
- Tab Console: procure por erros (em vermelho)

### Passo 7: Rodar Localmente com Netlify Dev

Para testar localmente com todas as funcionalidades:

1. No terminal, na **raiz do projeto** (não em `janetezuanazzi/`):
```bash
netlify dev
```

2. Acesse: http://localhost:8888/
3. Tente criar conta e fazer login

**Se der erro "Netlify CLI não encontrado":**
```bash
npm install -g netlify-cli
netlify login
netlify link
netlify dev
```

## Causas Comuns & Soluções

| Sintoma | Causa | Solução |
|---------|-------|---------|
| "Email ou senha incorretos" | Usuário não confirmado | Habilitar Autoconfirm ou confirmar email manualmente |
| "Email ou senha incorretos" | Senha realmente incorreta | Resetar senha pelo painel Identity |
| "Failed to fetch" | Identity não habilitado | Habilitar Identity no Netlify |
| "Failed to fetch" | NEXT_PUBLIC_IDENTITY_GOTRUE_URL incorreta | Corrigir variável de ambiente |
| Cookie não persiste | Faltava fix do Secure | ✓ Já corrigido em `netlify/functions/session.ts` |
| Erro 500 após login | DATABASE_URL não configurada | Adicionar DATABASE_URL nas env vars |

## Checklist Final

- [ ] Identity está habilitado no Netlify
- [ ] Autoconfirm está habilitado (Settings)
- [ ] Usuário existe e está "Confirmed"
- [ ] Variáveis de ambiente estão corretas (sem "@", sem espaços)
- [ ] Deploy foi feito após adicionar variáveis
- [ ] Cache do navegador foi limpo
- [ ] Teste direto (curl ou HTML) retorna 200 + access_token
- [ ] Login no site funciona
- [ ] Dashboard (/aluno/dashboard) reconhece o usuário

## Próximos Passos Após Login Funcionar

1. Executar seed do admin (se necessário):
   - Acesse: `https://janetezuanazzi.netlify.app/.netlify/functions/admin`
   - Deve retornar "Admin created" ou "Admin ensured"

2. Configurar DATABASE_URL para funcionar:
   - Progresso dos cursos
   - Perfil de usuário

## Precisa de Ajuda?

Se após seguir todos os passos o problema persistir:
1. Abra `test-identity-login.html` no navegador
2. Teste com o email/senha
3. Copie TODO o resultado que aparecer
4. Me envie essa informação para diagnóstico mais detalhado

