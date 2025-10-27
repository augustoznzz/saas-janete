# Configuração do Kiwify

Este guia explica como configurar a integração com o Kiwify para processar pagamentos dos cursos.

## 📋 Pré-requisitos

1. Conta ativa no Kiwify
2. Acesso ao painel da Netlify
3. Produtos criados no Kiwify para cada curso

## 🔧 Passo 1: Criar Produtos no Kiwify

Para cada curso, você precisa criar um produto no Kiwify:

1. Acesse o painel do Kiwify
2. Vá em **Produtos** → **Novo Produto**
3. Configure:
   - **Nome do produto**: Introdução ao Bordado
   - **Preço**: R$ 199,00
   - **Descrição**: Aprenda os pontos essenciais e materiais do bordado à mão
4. Após criar, copie o **link de checkout** do produto

## 🔐 Passo 2: Configurar Variáveis de Ambiente na Netlify

### Onde adicionar as variáveis:

1. Acesse o painel da **Netlify**
2. Selecione seu site/projeto
3. Vá em **Site settings** (Configurações do site)
4. No menu lateral, clique em **Environment variables** (Variáveis de ambiente)
5. Clique em **Add a variable** (Adicionar variável)

### Variáveis necessárias:

#### 1. Link de Checkout (OBRIGATÓRIO)

Adicione a variável com o link de checkout do Kiwify:

```
NEXT_PUBLIC_KIWIFY_CHECKOUT_BORDADO
Valor: https://pay.kiwify.com.br/eDz2HDA
```

**Observação**: Este link já está configurado no código como fallback. Se você quiser sobrescrever, adicione esta variável na Netlify.

#### 2. Token do Webhook (OBRIGATÓRIO)

Este token é usado para validar que os webhooks realmente vêm do Kiwify:

```
KIWIFY_WEBHOOK_SECRET
Valor: seu_token_do_kiwify
```

**Como obter**: No painel do Kiwify, vá em **Configurações** → **Webhooks** → Copie o "Token"

#### 3. URL do Site (OBRIGATÓRIO)

```
NEXT_PUBLIC_SITE_URL
Valor: https://seu-site.netlify.app
```

**⚠️ IMPORTANTE**: Use a URL real do seu site em produção (sem barra no final).

### Exemplo de configuração completa:

| Nome da Variável | Valor |
|-----------------|-------|
| `NEXT_PUBLIC_KIWIFY_CHECKOUT_BORDADO` | `https://pay.kiwify.com.br/eDz2HDA` (opcional, já está no código) |
| `KIWIFY_WEBHOOK_SECRET` | `seu_token_aqui` |
| `NEXT_PUBLIC_SITE_URL` | `https://seu-site.netlify.app` |

## 🔔 Passo 3: Configurar Webhook no Kiwify

O webhook permite que o Kiwify notifique seu site quando um pagamento for confirmado.

1. Acesse o painel do Kiwify
2. Vá em **Configurações** → **Webhooks**
3. Clique em **Adicionar Webhook**
4. Configure:
   - **URL do Webhook**: `https://seu-site.netlify.app/api/webhook/kiwify`
   - **Eventos**: Selecione `order.paid` (no mínimo)
   - **Status**: Ativo
5. Salve a configuração

**⚠️ IMPORTANTE**: Substitua `seu-site.netlify.app` pela URL real do seu site.

## 🎯 Passo 4: Mapear Product ID (✅ CONFIGURADO)

Para garantir que o sistema identifique corretamente qual curso foi comprado:

1. Abra o arquivo `janetezuanazzi/src/app/api/webhook/kiwify/route.ts`
2. Localize a função `mapProductIdToCourseSlug`
3. Adicione o mapeamento do seu Product ID:

```typescript
function mapProductIdToCourseSlug(productId: string): string | null {
  const productMap: Record<string, string> = {
    'eDz2HDA': 'introducao-ao-bordado', // Introdução ao Bordado
  };
  
  return productMap[productId] || null;
}
```

**✅ Já configurado**: O curso "Introdução ao Bordado" já está mapeado com o Product ID `eDz2HDA`.

**Como obter o Product ID**: No painel do Kiwify, vá em **Produtos** → selecione o produto → o ID está na URL ou nas configurações do produto.

## ✅ Passo 5: Testar a Integração

1. Faça um deploy das alterações na Netlify
2. Acesse seu site
3. Clique em um curso
4. Clique em **"Quero me inscrever"**
5. Você deve ser redirecionado para o checkout do Kiwify
6. Faça um pagamento de teste (se disponível)
7. Verifique se o webhook foi recebido nos logs da Netlify

### Verificar logs do webhook:

1. Netlify → seu site → **Functions**
2. Procure por logs do webhook `kiwify`
3. Verifique se há mensagens de "Order paid" ou erros

## 🚨 Solução de Problemas

### Erro: "Webhook signature invalid"

- Verifique se a variável `KIWIFY_WEBHOOK_SECRET` está configurada corretamente
- Certifique-se de que o secret corresponde ao configurado no Kiwify

### Usuário não é criado após pagamento

- Verifique os logs da função `.netlify/functions/create-user-and-enroll`
- Confirme que o banco de dados está configurado
- Verifique se o `courseSlug` está sendo identificado corretamente

### Redirecionamento não funciona

- Verifique se as variáveis `NEXT_PUBLIC_KIWIFY_CHECKOUT_*` estão configuradas
- Confirme que o usuário está autenticado antes de clicar em "Quero me inscrever"
- Verifique os links no painel do Kiwify

## 📞 Suporte

Se tiver problemas:

1. Verifique os logs no painel da Netlify
2. Confirme todas as variáveis de ambiente
3. Teste o webhook manualmente usando ferramentas como Postman
4. Consulte a documentação do Kiwify: https://docs.kiwify.com.br

## 📝 Notas Importantes

- **Segurança**: Nunca exponha o `KIWIFY_WEBHOOK_SECRET` em código público
- **Production vs Development**: Use URLs e credenciais diferentes para ambientes de teste e produção
- **Testes**: Sempre teste pagamentos em modo sandbox antes de ir para produção
- **Backup**: Mantenha backup das suas configurações de variáveis de ambiente

---

✨ **Configuração concluída!** Agora seu site está integrado com o Kiwify para processar pagamentos.

