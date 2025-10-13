# Integração LiraPay - Sistema de Checkout

Este documento explica como funciona o sistema de checkout integrado com a API LiraPay para pagamentos PIX.

## 📋 Visão Geral

O sistema de checkout permite que os alunos se inscrevam nos cursos através de pagamento PIX. O fluxo completo inclui:

1. Página de checkout com formulário de dados do cliente
2. Geração de QR Code PIX através da API LiraPay
3. Verificação automática do status do pagamento
4. Webhook para confirmação de pagamento
5. Concessão automática de acesso ao curso

## 🔧 Configuração

### 1. Variáveis de Ambiente

Copie o arquivo `.env.example` para `.env.local` e preencha as credenciais:

```bash
cp .env.example .env.local
```

Configure as seguintes variáveis:

```env
# LiraPay API
LIRAPAY_API_URL=https://api.lirapay.com.br
LIRAPAY_API_KEY=sua_chave_api
LIRAPAY_MERCHANT_ID=seu_merchant_id
LIRAPAY_WEBHOOK_SECRET=seu_webhook_secret

# Site
NEXT_PUBLIC_SITE_URL=https://seusite.com.br
```

### 2. Obter Credenciais LiraPay

1. Acesse o painel LiraPay: https://dashboard.lirapay.com.br
2. Vá em **Configurações** > **API**
3. Copie suas credenciais:
   - API Key
   - Merchant ID
   - Webhook Secret

### 3. Configurar Webhook

No painel LiraPay, configure a URL do webhook:

```
https://seusite.com.br/api/webhook/lirapay
```

**Eventos para escutar:**
- `payment.paid` - Pagamento confirmado
- `payment.expired` - Pagamento expirado
- `payment.cancelled` - Pagamento cancelado

## 🏗️ Estrutura de Arquivos

```
janetezuanazzi/
├── src/
│   ├── app/
│   │   ├── checkout/[slug]/
│   │   │   └── page.tsx              # Página de checkout
│   │   └── api/
│   │       ├── checkout/
│   │       │   ├── create/route.ts   # Criar transação PIX
│   │       │   └── status/route.ts   # Consultar status
│   │       └── webhook/
│   │           └── lirapay/route.ts  # Receber confirmações
│   └── cursos/[slug]/
│       └── page.tsx                  # Link para checkout
└── netlify/
    └── functions/
        └── enroll.ts                 # Processar matrícula
```

## 🔄 Fluxo de Pagamento

### 1. Cliente Acessa o Checkout

```
/cursos/[slug] → Clica em "Quero me inscrever" → /checkout/[slug]
```

### 2. Cliente Preenche os Dados

- Nome completo
- E-mail
- CPF
- Telefone

### 3. Criação da Transação PIX

**Endpoint:** `POST /api/checkout/create`

**Payload:**
```json
{
  "course": {
    "slug": "introducao-ao-bordado",
    "title": "Introdução ao Bordado",
    "price": 199.00
  },
  "customer": {
    "name": "Maria Silva",
    "email": "maria@email.com",
    "cpf": "123.456.789-00",
    "phone": "(11) 98765-4321"
  }
}
```

**Resposta:**
```json
{
  "transactionId": "txn_abc123",
  "qrCode": "00020126580014br.gov.bcb.pix...",
  "qrCodeBase64": "data:image/png;base64,iVBOR...",
  "expiresAt": "2024-01-15T15:30:00Z",
  "status": "pending"
}
```

### 4. Cliente Realiza o Pagamento

O sistema exibe:
- QR Code para escanear
- Código PIX Copia e Cola
- Instruções de pagamento
- Tempo de expiração

### 5. Verificação Automática

O frontend faz polling a cada 5 segundos:

```javascript
GET /api/checkout/status?transactionId=txn_abc123
```

### 6. Confirmação via Webhook

Quando o pagamento é confirmado, LiraPay envia um webhook:

**URL:** `POST /api/webhook/lirapay`

**Payload:**
```json
{
  "event": "payment.paid",
  "transaction": {
    "id": "txn_abc123",
    "status": "paid",
    "amount": 19900,
    "customer": {
      "email": "maria@email.com"
    },
    "metadata": {
      "course_slug": "introducao-ao-bordado"
    }
  }
}
```

### 7. Concessão de Acesso

O webhook chama a função Netlify:

```javascript
POST /.netlify/functions/enroll
```

Que realiza:
1. ✅ Cria/atualiza usuário no banco de dados
2. ✅ Registra a matrícula no curso
3. ✅ Concede acesso ao conteúdo
4. ✅ Envia e-mail de confirmação

### 8. Redirecionamento

O cliente é automaticamente redirecionado para:
```
/aluno/dashboard
```

## 🔐 Segurança

### Validação de Webhook

O webhook valida a assinatura usando HMAC SHA-256:

```typescript
const signature = request.headers.get('x-lirapay-signature');
const expectedSignature = crypto
  .createHmac('sha256', WEBHOOK_SECRET)
  .update(body)
  .digest('hex');

if (signature !== expectedSignature) {
  return 401; // Unauthorized
}
```

### Dados Sensíveis

- ✅ CPF é removido de caracteres especiais antes de enviar
- ✅ API Keys nunca são expostas no frontend
- ✅ Webhook secret é validado em toda requisição
- ✅ Dados de pagamento não são armazenados localmente

## 📊 API LiraPay - Endpoints Principais

### Criar Transação PIX

```http
POST https://api.lirapay.com.br/v1/transactions/pix
Authorization: Bearer {API_KEY}
Content-Type: application/json

{
  "merchant_id": "merchant_123",
  "amount": 19900,
  "currency": "BRL",
  "payment_method": "pix",
  "description": "Curso: Introdução ao Bordado",
  "customer": {
    "name": "Maria Silva",
    "email": "maria@email.com",
    "document": "12345678900",
    "phone": "11987654321"
  },
  "metadata": {
    "course_slug": "introducao-ao-bordado"
  },
  "webhook_url": "https://seusite.com.br/api/webhook/lirapay",
  "expires_in": 3600
}
```

### Consultar Transação

```http
GET https://api.lirapay.com.br/v1/transactions/{transaction_id}
Authorization: Bearer {API_KEY}
```

## 🧪 Testando

### Modo de Desenvolvimento

1. Use as credenciais de sandbox da LiraPay
2. Configure o webhook para usar ngrok ou similar:
   ```bash
   ngrok http 3000
   ```

3. Configure a URL do webhook no painel LiraPay:
   ```
   https://abc123.ngrok.io/api/webhook/lirapay
   ```

### Testar Webhook Localmente

```bash
curl -X POST http://localhost:3000/api/webhook/lirapay \
  -H "Content-Type: application/json" \
  -H "x-lirapay-signature: test_signature" \
  -d '{
    "event": "payment.paid",
    "transaction": {
      "id": "test_123",
      "status": "paid",
      "customer": { "email": "test@email.com" },
      "metadata": { "course_slug": "introducao-ao-bordado" }
    }
  }'
```

## 📝 Próximos Passos

Para completar a integração, você precisa implementar:

1. **Banco de Dados:**
   - Tabela de usuários
   - Tabela de matrículas
   - Tabela de transações

2. **Sistema de E-mail:**
   - Confirmação de inscrição
   - Acesso ao curso
   - Recuperação de senha

3. **Área do Aluno:**
   - Dashboard com cursos matriculados
   - Controle de progresso
   - Certificados

## 🔗 Links Úteis

- [Documentação LiraPay](https://docs.lirapay.com.br)
- [Painel LiraPay](https://dashboard.lirapay.com.br)
- [Suporte LiraPay](https://suporte.lirapay.com.br)

## ⚠️ Importante

- Sempre use HTTPS em produção
- Mantenha as credenciais seguras
- Não commite o arquivo `.env.local`
- Configure o webhook no painel LiraPay
- Teste em ambiente de sandbox antes de produção

## 🐛 Troubleshooting

### Webhook não está sendo chamado

1. Verifique se a URL está correta no painel LiraPay
2. Certifique-se de que a URL é acessível publicamente
3. Verifique os logs no painel LiraPay

### Pagamento não é detectado

1. Confirme que o polling está ativo (console do navegador)
2. Verifique se o `transactionId` está correto
3. Teste a API de status diretamente

### Erro de autenticação

1. Verifique se as variáveis de ambiente estão corretas
2. Confirme que a API Key está ativa no painel
3. Verifique se não há espaços extras nas variáveis

---

**Desenvolvido para Ateliê Janete Zuanazzi**

