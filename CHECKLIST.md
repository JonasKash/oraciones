# ✅ CHECKLIST DE IMPLEMENTAÇÃO - Sistema UTM Hotmart

Use esta lista para validar que tudo foi implementado corretamente antes do deploy.

---

## 📁 ARQUIVOS CRIADOS

### ✅ Código do Sistema
- [x] `src/utils/utmHelper.ts` - Sistema principal de rastreamento UTM
- [x] `public/test-utm.html` - Página visual de testes

### ✅ Documentação
- [x] `IMPLEMENTATION_SUMMARY.md` - Resumo executivo da implementação
- [x] `UTM_TRACKING_GUIDE.md` - Guia completo do sistema
- [x] `TESTING_GUIDE.md` - Instruções de teste passo a passo
- [x] `UTM_CAMPAIGN_EXAMPLES.md` - URLs prontas para campanhas
- [x] `README.md` - Atualizado com informações do sistema UTM

---

## 🔧 ARQUIVOS MODIFICADOS

### ✅ Componentes
- [x] `src/components/PricingSection.tsx`
  - [x] Import do `utmHelper` adicionado
  - [x] `useEffect` com `saveUtmParams()` adicionado
  - [x] Handler `handleBasicPlanClick` criado (Plano $8)
  - [x] Handler `handleCompletePlanClick` criado (Plano $12)
  - [x] `onClick` adicionado aos botões de checkout

### ✅ Páginas
- [x] `src/pages/Index.tsx`
  - [x] Import do `utmHelper` adicionado
  - [x] `useEffect` com `saveUtmParams()` adicionado

---

## 🧪 TESTES A REALIZAR

### ✅ Teste 1: Instalação e Build
```bash
cd bible-verse-collection-main/bible-verse-collection-main
npm install
npm run dev
```
- [ ] Sem erros de compilação
- [ ] Sem erros no console
- [ ] Página carrega normalmente

### ✅ Teste 2: Captura de UTMs
```
Acesse: http://localhost:5173/?utm_source=teste&utm_medium=manual&utm_campaign=jan2026
```
- [ ] Página carrega com os parâmetros
- [ ] Console F12 aberto
- [ ] Digite: `sessionStorage.getItem('utm_params')`
- [ ] Resultado mostra: `{"utm_source":"teste","utm_medium":"manual","utm_campaign":"jan2026"}`

### ✅ Teste 3: Plano Básico ($8)
- [ ] Role até a seção de preços
- [ ] Clique em "Quiero la Guía por $ 8 USD"
- [ ] URL da Hotmart inclui: `off=sxnbohaq`
- [ ] URL da Hotmart inclui: `checkoutMode=10`
- [ ] URL da Hotmart inclui: `utm_source=teste&utm_medium=manual&utm_campaign=jan2026`

### ✅ Teste 4: Plano Completo ($12)
- [ ] Volte à página (botão voltar)
- [ ] Clique em "PLAN COMPLETO $12"
- [ ] URL da Hotmart inclui: `off=7duovx39`
- [ ] URL da Hotmart inclui: `checkoutMode=10`
- [ ] URL da Hotmart inclui os parâmetros UTM

### ✅ Teste 5: Sem UTMs
```
Limpe sessionStorage: sessionStorage.clear()
Acesse: http://localhost:5173/
```
- [ ] Página carrega normalmente
- [ ] Botões de checkout funcionam
- [ ] Redirecionamento funciona (sem UTMs extras)

### ✅ Teste 6: Diferentes Plataformas
Teste com URLs de diferentes fontes:

**Facebook:**
```
http://localhost:5173/?utm_source=facebook&utm_medium=cpc&utm_campaign=oraciones_jan2026&utm_content=video_v1&utm_term=target_espiritual
```
- [ ] UTMs capturados corretamente
- [ ] Checkout inclui todos os parâmetros

**Instagram:**
```
http://localhost:5173/?utm_source=instagram&utm_medium=stories&utm_campaign=oraciones_jan2026&utm_content=reel_v1&utm_term=target_prosperidade
```
- [ ] UTMs capturados corretamente
- [ ] Checkout inclui todos os parâmetros

**Google (com gclid):**
```
http://localhost:5173/?utm_source=google&utm_medium=cpc&utm_campaign=oraciones_jan2026&gclid=test123abc
```
- [ ] UTMs E gclid capturados
- [ ] Checkout inclui todos os parâmetros

### ✅ Teste 7: Persistência
- [ ] Acesse com UTMs
- [ ] Navegue pela página (scroll, clique em links internos)
- [ ] Verifique: `sessionStorage.getItem('utm_params')`
- [ ] UTMs ainda estão salvos

### ✅ Teste 8: Página de Teste Visual
```
Acesse: http://localhost:5173/test-utm.html
```
- [ ] Página carrega corretamente
- [ ] Links de teste funcionam
- [ ] Design está apresentável

---

## 🌐 TESTES DE NAVEGADORES

### Desktop
- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari (Mac)

### Mobile (Modo Responsivo F12)
- [ ] Chrome Mobile
- [ ] Safari Mobile
- [ ] Samsung Internet

---

## 📊 VALIDAÇÃO TÉCNICA

### ✅ Código
- [x] Sem erros TypeScript
- [x] Sem erros ESLint
- [x] Imports corretos
- [x] Tipos corretos

### ✅ Funcionalidades
- [x] `getUtmParams()` - Extrai UTMs da URL
- [x] `saveUtmParams()` - Salva no sessionStorage
- [x] `getSavedUtmParams()` - Recupera UTMs salvos
- [x] `addUtmToCheckoutUrl()` - Adiciona UTMs à URL

### ✅ Segurança
- [x] `encodeURIComponent()` usado corretamente
- [x] Verificação de `typeof window` para SSR
- [x] Try/catch em JSON.parse
- [x] Validação de valores vazios

---

## 🚀 PRÉ-DEPLOY

### ✅ Build de Produção
```bash
npm run build
```
- [ ] Build completa sem erros
- [ ] Pasta `dist/` criada
- [ ] Tamanho do bundle aceitável

### ✅ Preview do Build
```bash
npm run preview
```
- [ ] Build funciona localmente
- [ ] Todos os testes passam no preview
- [ ] Performance aceitável

### ✅ Otimização
- [ ] Imagens otimizadas
- [ ] Sem console.logs desnecessários
- [ ] Código minificado (automático no build)

---

## 📱 PÓS-DEPLOY

### ✅ Validação em Produção
- [ ] Site carregou corretamente
- [ ] Acesse com UTMs de teste
- [ ] Valide captura e redirecionamento
- [ ] Teste em mobile real

### ✅ Configuração de Campanhas
- [ ] Estruturas de UTM definidas
- [ ] URLs de campanha criadas
- [ ] Documentação das campanhas
- [ ] Testes com links reais

### ✅ Monitoramento
- [ ] Primeiras vendas com UTM registradas
- [ ] Acesso ao painel Hotmart configurado
- [ ] Relatórios incluem parâmetros UTM
- [ ] Análise de ROI possível

---

## 📞 SUPORTE E RECURSOS

### 📚 Documentação
- `IMPLEMENTATION_SUMMARY.md` - Visão geral
- `UTM_TRACKING_GUIDE.md` - Como funciona
- `TESTING_GUIDE.md` - Como testar
- `UTM_CAMPAIGN_EXAMPLES.md` - Exemplos práticos

### 🛠️ Comandos Úteis
```bash
npm run dev      # Desenvolvimento
npm run build    # Build produção
npm run preview  # Preview build
npm run lint     # Verificar código

# Console do navegador
sessionStorage.getItem('utm_params')           # Ver UTMs
JSON.parse(sessionStorage.getItem('utm_params')) # Ver formatado
sessionStorage.clear()                         # Limpar
```

### 🐛 Troubleshooting
- Console mostra erros? → Verifique imports
- UTMs não salvam? → Limpe cache (Ctrl+Shift+R)
- Checkout não funciona? → Verifique handlers onClick
- Build falha? → `rm -rf node_modules && npm install`

---

## ✅ ASSINATURA DE CONCLUSÃO

**Implementado por:** _________________  
**Data:** ___/___/2026  
**Testes validados:** [ ] Sim [ ] Não  
**Deploy realizado:** [ ] Sim [ ] Não  
**Sistema em produção:** [ ] Sim [ ] Não  

**Observações:**
_________________________________
_________________________________
_________________________________

---

## 🎉 STATUS FINAL

Marque quando tudo estiver 100%:

- [ ] ✅ Código implementado
- [ ] ✅ Testes locais passando
- [ ] ✅ Build de produção OK
- [ ] ✅ Deploy realizado
- [ ] ✅ Testes em produção OK
- [ ] ✅ Campanhas configuradas
- [ ] ✅ Primeiras vendas rastreadas
- [ ] ✅ Sistema funcionando perfeitamente

**Quando todos os itens acima estiverem marcados, o sistema está 100% operacional! 🚀**

---

**Última atualização:** 10 de Janeiro de 2026  
**Versão:** 1.0.0  
**Status:** ✅ IMPLEMENTAÇÃO COMPLETA

