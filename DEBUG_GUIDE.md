# 🐛 GUIA DE DEBUG - Sistema UTM

## 🔍 Como Testar e Verificar

### PASSO 1: Acessar com UTMs

Acesse seu site com os UTMs do criativo:

```
https://oracionesprosperas.online/?utm_source=fb&utm_medium=paid&utm_campaign=oraciones-lead-vsl&utm_content=a4v3-ctv01&utm_term=fatia1_ios
```

OU localmente:

```
http://localhost:5173/?utm_source=fb&utm_medium=paid&utm_campaign=oraciones-lead-vsl&utm_content=a4v3-ctv01&utm_term=fatia1_ios
```

---

### PASSO 2: Abrir Console do Navegador

**Pressione F12** ou clique com botão direito > Inspecionar > Console

Você deve ver:

```
✅ UTMs salvos: {
  utm_source: "fb",
  utm_medium: "paid",
  utm_campaign: "oraciones-lead-vsl",
  utm_content: "a4v3-ctv01",
  utm_term: "fatia1_ios"
}
```

---

### PASSO 3: Verificar SessionStorage

No console, digite:

```javascript
sessionStorage.getItem('utm_params')
```

**Resultado esperado:**
```json
{"utm_source":"fb","utm_medium":"paid","utm_campaign":"oraciones-lead-vsl","utm_content":"a4v3-ctv01","utm_term":"fatia1_ios"}
```

---

### PASSO 4: Clicar no Botão de Checkout

Role até a seção de preços e clique em:
- "RECIBIR GUÍA POR $8USD" OU
- "RECIBIR GUÍA COMPLETA POR $12USD"

**No console você verá:**

```
🛒 Clique no botão $8 USD detectado
🔍 UTMs recuperados para checkout: {
  utm_source: "fb",
  utm_medium: "paid",
  utm_campaign: "oraciones-lead-vsl",
  utm_content: "a4v3-ctv01",
  utm_term: "fatia1_ios"
}
✅ URL final do checkout: https://pay.hotmart.com/J103688261V?off=sxnbohaq&checkoutMode=10&utm_source=fb&utm_medium=paid&utm_campaign=oraciones-lead-vsl&utm_content=a4v3-ctv01&utm_term=fatia1_ios
🚀 Redirecionando para: https://pay.hotmart.com/J103688261V?off=sxnbohaq&checkoutMode=10&utm_source=fb&utm_medium=paid&utm_campaign=oraciones-lead-vsl&utm_content=a4v3-ctv01&utm_term=fatia1_ios
```

---

### PASSO 5: Verificar URL da Hotmart

Após o redirecionamento, a URL deve ser:

**Plano $8:**
```
https://pay.hotmart.com/J103688261V?off=sxnbohaq&checkoutMode=10&utm_source=fb&utm_medium=paid&utm_campaign=oraciones-lead-vsl&utm_content=a4v3-ctv01&utm_term=fatia1_ios
```

**Plano $12:**
```
https://pay.hotmart.com/J103688261V?off=7duovx39&checkoutMode=10&utm_source=fb&utm_medium=paid&utm_campaign=oraciones-lead-vsl&utm_content=a4v3-ctv01&utm_term=fatia1_ios
```

---

## 🚨 PROBLEMAS COMUNS

### ❌ Problema: "⚠️ Nenhum UTM encontrado na URL"

**Causa:** Você acessou o site sem parâmetros UTM na URL

**Solução:**
1. Certifique-se de incluir os UTMs na URL
2. Copie a URL completa com todos os parâmetros
3. Cole no navegador

---

### ❌ Problema: "⚠️ Nenhum UTM salvo - checkout sem parâmetros"

**Causa:** Os UTMs não foram salvos no sessionStorage

**Soluções:**

1. **Verifique se o site carregou corretamente:**
```javascript
// No console
sessionStorage.getItem('utm_params')
```

2. **Limpe o cache e tente novamente:**
- Pressione `Ctrl + Shift + R` (Windows)
- Pressione `Cmd + Shift + R` (Mac)

3. **Salve manualmente (para teste):**
```javascript
sessionStorage.setItem('utm_params', JSON.stringify({
  utm_source: "fb",
  utm_medium: "paid",
  utm_campaign: "oraciones-lead-vsl",
  utm_content: "a4v3-ctv01",
  utm_term: "fatia1_ios"
}))
```

---

### ❌ Problema: URL sem UTMs no checkout

**Causa possível 1:** SessionStorage foi limpo

**Solução:**
```javascript
// Verifique se ainda tem UTMs salvos
sessionStorage.getItem('utm_params')

// Se não tiver, acesse novamente com UTMs
```

**Causa possível 2:** JavaScript não executou

**Solução:**
1. Verifique erros no console
2. Certifique-se que o site terminou de carregar
3. Desabilite extensões do navegador (AdBlock, etc.)

---

## 🧪 TESTE MANUAL FORÇADO

Se quiser testar manualmente, use este script no console:

```javascript
// 1. Limpar tudo
sessionStorage.clear()

// 2. Salvar UTMs manualmente
sessionStorage.setItem('utm_params', JSON.stringify({
  utm_source: "fb",
  utm_medium: "paid",
  utm_campaign: "oraciones-lead-vsl",
  utm_content: "a4v3-ctv01",
  utm_term: "fatia1_ios"
}))

// 3. Verificar
console.log('UTMs salvos:', JSON.parse(sessionStorage.getItem('utm_params')))

// 4. Testar função de adicionar UTMs
const testUrl = 'https://pay.hotmart.com/J103688261V?off=sxnbohaq&checkoutMode=10';
const utmParams = JSON.parse(sessionStorage.getItem('utm_params'));
const utmString = Object.entries(utmParams)
  .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
  .join('&');
const finalUrl = `${testUrl}&${utmString}`;
console.log('URL final:', finalUrl);
```

**Resultado esperado:**
```
https://pay.hotmart.com/J103688261V?off=sxnbohaq&checkoutMode=10&utm_source=fb&utm_medium=paid&utm_campaign=oraciones-lead-vsl&utm_content=a4v3-ctv01&utm_term=fatia1_ios
```

---

## ✅ CHECKLIST DE VALIDAÇÃO

Use esta lista para garantir que tudo está funcionando:

- [ ] Acessei com UTMs na URL
- [ ] Console mostra "✅ UTMs salvos"
- [ ] `sessionStorage.getItem('utm_params')` retorna JSON com UTMs
- [ ] Cliquei no botão $8 ou $12
- [ ] Console mostra "🛒 Clique detectado"
- [ ] Console mostra "🔍 UTMs recuperados"
- [ ] Console mostra "✅ URL final do checkout" com todos os UTMs
- [ ] Console mostra "🚀 Redirecionando"
- [ ] URL da Hotmart inclui todos os parâmetros UTM

---

## 🎯 EXEMPLO COMPLETO DE TESTE

### 1. Acesse:
```
http://localhost:5173/?utm_source=fb&utm_medium=paid&utm_campaign=oraciones-lead-vsl&utm_content=a4v3-ctv01&utm_term=fatia1_ios
```

### 2. Console deve mostrar:
```
✅ UTMs salvos: {utm_source: "fb", utm_medium: "paid", ...}
```

### 3. Digite no console:
```javascript
sessionStorage.getItem('utm_params')
```

### 4. Resultado:
```json
{"utm_source":"fb","utm_medium":"paid","utm_campaign":"oraciones-lead-vsl","utm_content":"a4v3-ctv01","utm_term":"fatia1_ios"}
```

### 5. Clique no botão $12

### 6. Console mostra:
```
🛒 Clique no botão $12 USD detectado
🔍 UTMs recuperados para checkout: {...}
✅ URL final do checkout: https://pay.hotmart.com/J103688261V?off=7duovx39&checkoutMode=10&utm_source=fb&utm_medium=paid&utm_campaign=oraciones-lead-vsl&utm_content=a4v3-ctv01&utm_term=fatia1_ios
🚀 Redirecionando para: ...
```

### 7. ✅ SUCESSO! URL inclui todos os UTMs

---

## 📞 AINDA NÃO FUNCIONOU?

### Verifique:

1. **Servidor está rodando?**
```bash
npm run dev
```

2. **Sem erros no console?**
- Abra F12 > Console
- Procure por erros em vermelho

3. **Arquivo utmHelper.ts existe?**
```bash
ls src/utils/utmHelper.ts
```

4. **Imports estão corretos?**
- Verifique PricingSection.tsx
- Verifique Index.tsx

5. **Build está atualizado?**
```bash
# Se estiver em produção
npm run build
# Upload dos novos arquivos
```

---

## 🎥 VÍDEO DO FLUXO ESPERADO

1. ✅ Usuário acessa com UTMs
2. ✅ Console: "UTMs salvos"
3. ✅ Usuário navega pela página
4. ✅ Usuário clica no checkout
5. ✅ Console: "Clique detectado"
6. ✅ Console: "UTMs recuperados"
7. ✅ Console: "URL final" (com UTMs)
8. ✅ Redirecionamento para Hotmart com UTMs completos

---

**🚀 Com os logs adicionados, agora você pode ver EXATAMENTE o que está acontecendo em cada etapa!**

Faça o teste e me envie o que aparece no console para eu ajudar mais.

