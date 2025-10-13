# 🚀 Setup do Sistema de Checkout

## ✅ Configuração Concluída!

O arquivo `.env.local` foi criado com sucesso com as seguintes configurações:

```env
LIRAPAY_API_URL=https://api.lirapay.com.br
LIRAPAY_API_KEY=sk_c9958b71512441d7... (chave fornecida)
LIRAPAY_MERCHANT_ID=default_merchant
LIRAPAY_WEBHOOK_SECRET=webhook_secret_123
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 🔄 Próximos Passos

### 1. Reiniciar o Servidor de Desenvolvimento

**IMPORTANTE:** Você precisa reiniciar o servidor Next.js para que as variáveis de ambiente sejam carregadas.

```bash
# Pare o servidor atual (Ctrl+C)
# Depois inicie novamente:
cd janetezuanazzi
npm run dev
```

### 2. Testar o Checkout

1. Acesse qualquer curso: http://localhost:3000/cursos/introducao-ao-bordado
2. Clique no botão **"Quero me inscrever"**
3. Preencha o formulário com dados de teste:
   - Nome: Teste Silva
   - E-mail: teste@email.com
   - CPF: 123.456.789-00
   - Telefone: (11) 98765-4321
4. Clique em **"Continuar para pagamento"**

### 3. O que Esperar

Se a API LiraPay estiver configurada corretamente, você verá:

- ✅ QR Code PIX para pagamento
- ✅ Código PIX Copia e Cola
- ✅ Instruções de pagamento
- ✅ Timer de expiração

### 4. Verificar Logs

Abra o terminal do servidor e verifique os logs:

```
Creating PIX transaction with LiraPay...
Course: introducao-ao-bordado - Introdução ao Bordado
Amount: 199 BRL
```

Se houver erro, você verá mensagens detalhadas sobre o problema.

## 🐛 Troubleshooting

### Erro: "Configuração de pagamento incompleta"

**Solução:**

1. Verifique se o arquivo `.env.local` existe em `janetezuanazzi/.env.local`
2. Reinicie o servidor (Ctrl+C e `npm run dev`)
3. Verifique os logs do console para ver quais variáveis estão faltando

### Erro de conexão com API

Se você receber erros da API LiraPay, pode ser:

- Chave API inválida ou expirada
- API endpoint incorreto
- Problemas de rede/firewall

**Próximos passos:**

1. Verifique se a chave API está correta no `.env.local`
2. Confirme com o suporte LiraPay se a chave está ativa
3. Teste a conectividade com a API

## 📝 Estrutura de Arquivos Criados

```
janetezuanazzi/
├── .env.local                          ← Variáveis de ambiente (NÃO commitar!)
├── src/
│   ├── app/
│   │   ├── checkout/[slug]/
│   │   │   └── page.tsx                ← Página de checkout
│   │   └── api/
│   │       ├── checkout/
│   │       │   ├── create/route.ts     ← Criar transação PIX
│   │       │   └── status/route.ts     ← Verificar status
│   │       └── webhook/
│   │           └── lirapay/route.ts    ← Receber confirmações
└── README-CHECKOUT.md                  ← Documentação completa
```

## 🔐 Segurança

⚠️ **IMPORTANTE:** O arquivo `.env.local` contém informações sensíveis:

- ✅ Já está no `.gitignore` (não será commitado)
- ❌ NUNCA compartilhe as chaves API
- ✅ Use chaves diferentes para produção

## 📚 Documentação Completa

Para mais detalhes sobre a integração, consulte:

- `README-CHECKOUT.md` - Documentação completa do sistema
- Documentação LiraPay: https://docs.lirapay.com.br

## 🎉 Pronto!

Agora você pode testar o sistema de checkout completo!

---

**Dúvidas?** Verifique os logs do servidor ou consulte a documentação completa.
