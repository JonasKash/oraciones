# 📋 Guia de Rastreamento UTM - Implementado

## ✅ O Que Foi Implementado

Sistema completo de rastreamento UTM para os checkouts da Hotmart nos planos de $8 USD e $12 USD.

## 📁 Arquivos Criados/Modificados

### 1. **Novo Arquivo: `src/utils/utmHelper.ts`**
Helper que gerencia captura, armazenamento e aplicação dos parâmetros UTM.

**Funções disponíveis:**
- `getUtmParams()` - Extrai UTMs da URL atual
- `saveUtmParams()` - Salva UTMs no sessionStorage
- `getSavedUtmParams()` - Recupera UTMs salvos
- `addUtmToCheckoutUrl()` - Adiciona UTMs à URL de checkout

### 2. **Modificado: `src/components/PricingSection.tsx`**
- Adicionado salvamento automático de UTMs ao carregar
- Convertidos links diretos em handlers com aplicação de UTM
- **Plano Básico ($8):** `https://pay.hotmart.com/J103688261V?off=sxnbohaq&checkoutMode=10`
- **Plano Completo ($12):** `https://pay.hotmart.com/J103688261V?off=7duovx39&checkoutMode=10`

### 3. **Modificado: `src/pages/Index.tsx`**
- Adicionado salvamento automático de UTMs ao carregar a página principal

## 🧪 Como Testar

### 1. Teste em Desenvolvimento Local

```bash
# Inicie o servidor de desenvolvimento
npm run dev
```

Acesse com UTMs:
```
http://localhost:5173/?utm_source=instagram&utm_medium=stories&utm_campaign=promo2026&utm_content=video1&utm_term=espiritual
```

### 2. Verificar Captura de UTMs

1. Abra o Console do navegador (F12)
2. Digite:
```javascript
sessionStorage.getItem('utm_params')
```
3. Deve retornar:
```json
{"utm_source":"instagram","utm_medium":"stories","utm_campaign":"promo2026","utm_content":"video1","utm_term":"espiritual"}
```

### 3. Testar Redirecionamento

1. Role até a seção de preços
2. Clique no botão "Quiero la Guía por $ 8 USD" ou "PLAN COMPLETO $12"
3. Observe a URL da Hotmart - deve incluir todos os parâmetros UTM

**Exemplo esperado:**
```
https://pay.hotmart.com/J103688261V?off=sxnbohaq&checkoutMode=10&utm_source=instagram&utm_medium=stories&utm_campaign=promo2026&utm_content=video1&utm_term=espiritual
```

## 🎯 Parâmetros UTM Capturados

O sistema captura automaticamente:
- `utm_source` - Origem do tráfego
- `utm_medium` - Meio/canal
- `utm_campaign` - Campanha específica
- `utm_content` - Variação do conteúdo
- `utm_term` - Termo/público-alvo
- `utm_id` - ID da campanha
- `fbclid` - Facebook Click ID
- `gclid` - Google Click ID

## 📊 Estruturas de UTM Recomendadas

### Facebook Ads
```
?utm_source=facebook&utm_medium=cpc&utm_campaign=oraciones_jan2026&utm_content=video_v1&utm_term=target_espiritual
```

### Instagram Stories
```
?utm_source=instagram&utm_medium=stories&utm_campaign=oraciones_jan2026&utm_content=reel_v2&utm_term=target_prosperidade
```

### Google Ads
```
?utm_source=google&utm_medium=cpc&utm_campaign=oraciones_jan2026&utm_content=text_ad_v1&utm_term=oraciones_guiadas
```

### Email Marketing
```
?utm_source=mailchimp&utm_medium=email&utm_campaign=oraciones_launch_jan2026&utm_content=newsletter_week1
```

## 🔄 Fluxo do Sistema

1. **Usuário clica no anúncio** com UTMs
   ↓
2. **Acessa o site** - Sistema captura UTMs da URL
   ↓
3. **Salva no sessionStorage** - Persiste durante toda a sessão
   ↓
4. **Usuário navega** - UTMs são mantidos
   ↓
5. **Clica no botão CTA** - Sistema adiciona UTMs à URL da Hotmart
   ↓
6. **Redireciona para checkout** - Hotmart recebe todos os parâmetros
   ↓
7. **Venda é rastreada** - Relatórios da Hotmart incluem os UTMs

## 📱 Verificação no Hotmart

Após as vendas começarem a entrar:

1. Acesse o painel da Hotmart
2. Vá em **Relatórios > Vendas**
3. Clique em **Exportar relatório**
4. O relatório incluirá os parâmetros UTM de cada venda
5. Analise qual campanha/criativo converteu melhor

## ⚡ Vantagens da Implementação

✅ **Rastreamento preciso** de origem de cada conversão
✅ **SessionStorage** - persiste durante toda a navegação
✅ **Compatível** com Facebook Ads, Google Ads, etc.
✅ **Sem dependências externas** - código nativo TypeScript
✅ **Funciona mesmo sem UTMs** - não quebra a experiência

## 🚀 Próximos Passos

1. Deploy para produção
2. Configure suas campanhas com UTMs
3. Monitore os resultados no Hotmart
4. Otimize campanhas com base nos dados

## 💡 Dicas Importantes

- **Sempre use UTMs** em suas campanhas pagas
- **Mantenha consistência** nos nomes dos parâmetros
- **Teste antes de lançar** cada nova campanha
- **Documente suas estruturas** de UTM para referência futura

---

**✨ Sistema de rastreamento implementado com sucesso!**

Para dúvidas ou problemas, revise este guia ou consulte o código em `src/utils/utmHelper.ts`.

