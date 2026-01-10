# ⭐ NOVO EVENTO: new.lead (10 segundos)

## 🎯 O que foi implementado?

Adicionei um **evento automático** que envia os dados do visitante para o webhook N8N após **10 segundos** de permanência na página.

## 🚀 Como funciona?

```
USUÁRIO ENTRA NO SITE
     ↓
ASSISTE A VSL / NAVEGA NA PÁGINA
     ↓
APÓS 10 SEGUNDOS ⏱️
     ↓
WEBHOOK DISPARA AUTOMATICAMENTE
✅ Evento: "new.lead"
✅ Source: "page-visit-10s"
✅ Todos os UTMs incluídos
✅ Dados completos do navegador
```

## 📋 Por que 10 segundos?

- **Filtra bounces**: Elimina pessoas que saem imediatamente
- **Captura engajamento real**: Identifica visitantes interessados na VSL
- **Leads "quentes"**: Pessoas que ficam 10s+ têm maior chance de converter
- **Estratégia de remarketing**: Permite criar audiências de visitantes engajados

## 🔧 Detalhes Técnicos

### Arquivo modificado:
- `src/pages/Index.tsx` - Adicionado timer de 10 segundos

### Evento enviado:
- **Tipo**: `new.lead`
- **Source**: `page-visit-10s`
- **Webhook**: `https://wbn.araxa.app/webhook/receive-inf` (mesmo dos outros eventos)
- **Dados**: Idênticos aos outros eventos (UTMs, IP, device, etc.)

### Segurança:
- ✅ Timer é cancelado automaticamente se usuário sair antes de 10s
- ✅ Não envia duplicados (cleanup implementado)
- ✅ Tratamento de erros (não trava se webhook falhar)

## 🧪 Como Testar

### Teste Rápido (Console do Navegador)

1. Execute:
```bash
npm run dev
```

2. Acesse:
```
http://localhost:5173/?utm_source=facebook&utm_campaign=teste
```

3. Abra o Console (F12)

4. **Aguarde 10 segundos** ⏱️

5. Você verá:
```
✅ Evento new.lead enviado com sucesso após 10 segundos
```

6. Verifique no N8N que o evento chegou!

### Verificar no Network Tab

1. DevTools (F12) → Aba **Network**
2. Filtre por: `receive-inf`
3. Aguarde 10 segundos
4. Veja a requisição POST com todos os dados

## 📊 Exemplo do Payload Enviado

```json
{
  "event": "new.lead",
  "timestamp": "2026-01-10T18:45:23.456Z",
  "source": "page-visit-10s",
  "page_url": "https://seusite.com/",
  "referrer": "https://facebook.com/",
  "user_agent": "Mozilla/5.0...",
  "language": "pt-BR",
  "timezone": "America/Sao_Paulo",
  "screen_resolution": "1920x1080",
  "viewport_size": "1366x768",
  "device_type": "desktop",
  "platform": "Win32",
  "ip_address": "191.123.45.67",
  "session_data": {
    "utm_source": "facebook",
    "utm_medium": "cpc",
    "utm_campaign": "teste",
    "fbclid": "..."
  }
}
```

## 🎯 Uso no N8N

Agora você pode:

1. **Identificar leads engajados** - Pessoas que ficam 10s+ na VSL
2. **Criar audiências no Facebook** - Retargeting de visitantes quentes
3. **Enviar para CRM/Email** - Automação de sequências
4. **Analisar comportamento** - Taxa de engajamento da VSL
5. **Comparar conversões** - Lead 10s vs Clique na oferta

## 📈 Eventos Disponíveis Agora

| Evento | Quando Dispara | Uso |
|--------|---------------|-----|
| `new.lead` | 10s na página | Visitante engajado (NOVO!) ⭐ |
| `button_click_offer_8` | Clique plano $8 | Interesse no produto básico |
| `button_click_offer_12` | Clique plano $12 | Interesse no produto completo |

## ✅ Pronto para Produção!

O código está **100% funcional** e pronto para:
- ✅ Desenvolvimento local
- ✅ Build de produção (`npm run build`)
- ✅ Deploy no servidor

---

## 🚀 Deploy

Quando quiser colocar em produção:

```bash
npm run build
```

E faça o upload da pasta `dist/` para seu servidor!

---

**🎉 Implementação completa! Qualquer dúvida, é só perguntar!**

