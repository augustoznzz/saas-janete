# 🔧 Solução Definitiva para o Erro "Failed to fetch"

## 🎯 Problema Encontrado

O erro "Failed to fetch" ocorre porque:

1. O Netlify Dev está carregando variáveis de ambiente do site configurado no Netlify
2. A variável `NEXT_PUBLIC_IDENTITY_GOTRUE_URL` está configurada como `http://localhost:9999/.netlify/identity`
3. O Next.js compila essa variável no código em tempo de build
4. O cache do Next.js está muito persistente

## ✅ Solução (SIGA EXATAMENTE ESTES PASSOS)

### Passo 1: Pare TODOS os processos Node.js

Abra o PowerShell como **Administrador** e execute:

```powershell
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force
```

### Passo 2: Limpe TODOS os caches

No mesmo PowerShell (ainda como Admin):

```powershell
cd E:\projetos\janetezuanazzi
Remove-Item -Path "janetezuanazzi\.next" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path ".netlify\functions-serve" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path ".netlify\blobs-serve" -Recurse -Force -ErrorAction SilentlyContinue
```

### Passo 3: Deslinque o site do Netlify (IMPORTANTE!)

Execute:

```powershell
npx netlify unlink
```

Isso vai remover as variáveis de ambiente que estão causando o problema.

### Passo 4: Inicie o servidor

Agora execute:

```powershell
npm run dev
```

### Passo 5: Aguarde e Teste

1. Aguarde ver a mensagem: **"◈ Server now ready on http://localhost:8888"**
2. Abra o navegador em **http://localhost:8888/criar-conta**
3. **IMPORTANTE:** Pressione **Ctrl+Shift+R** (ou Cmd+Shift+R no Mac) para recarregar sem cache
4. Preencha o formulário e teste

## 🔄 Se AINDA NÃO FUNCIONAR

Se após seguir todos os passos acima o erro persistir, existe uma solução alternativa:

### Opção Alternativa: Usar Netlify Identity do site em produção

Em vez de usar o Identity local, você pode usar o Identity do seu site no Netlify:

1. Vá para https://app.netlify.com
2. Acesse seu site
3. Vá em "Site configuration" → "Identity"
4. Se não estiver habilitado, clique em "Enable Identity"
5. Copie a URL do seu site (exemplo: `https://seu-site.netlify.app`)

6. Crie um arquivo chamado `.env.local` na pasta \*\*E:\projetos\janetezuanazzi\janetezuanazzi\*\* com:

```
NEXT_PUBLIC_IDENTITY_GOTRUE_URL=https://seu-site.netlify.app/.netlify/identity
```

7. Reinicie o servidor

**ATENÇÃO:** Com esta configuração, os usuários criados serão registrados no Netlify Identity do seu site em produção, não localmente.

## 📝 Por que o problema estava acontecendo?

O Netlify Dev carrega variáveis de ambiente do site linkado no Netlify. A variável `NEXT_PUBLIC_IDENTITY_GOTRUE_URL` estava configurada para `http://localhost:9999`, que é provavelmente de uma configuração anterior ou de outro projeto.

Variáveis que começam com `NEXT_PUBLIC_` no Next.js são incorporadas no código JavaScript durante a compilação, por isso o cache era tão persistente.

## ✨ Código Foi Corrigido

O código do arquivo `janetezuanazzi\src\lib\identity.ts` foi modificado para:

- Sempre usar `window.location.origin` em runtime
- Calcular a URL dinamicamente dentro das funções
- Não depender de variáveis de ambiente em tempo de compilação

Agora, mesmo que haja variáveis de ambiente configuradas, o código vai usar a porta atual do navegador.

## 🚀 Próximos Passos

Após conseguir criar uma conta:

1. Verifique no Netlify Identity se o usuário foi criado
2. Teste fazer login
3. Verifique se o dashboard do aluno funciona

## 💡 Dica para Desenvolvimento

Para evitar esse problema no futuro:

- Sempre use `npm run dev` (que chama `netlify dev`)
- Sempre acesse via `http://localhost:8888`
- Nunca acesse diretamente `http://localhost:3001`
- Se mudar de projeto, execute `netlify unlink` antes

---

**Se seguir estes passos exatamente, o problema será resolvido! 🎉**
