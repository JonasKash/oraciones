# ⚡ COMANDOS RÁPIDOS - Sistema UTM

Use este arquivo como referência rápida para comandos comuns.

---

## 🚀 Desenvolvimento

```bash
# Entrar no diretório do projeto
cd bible-verse-collection-main/bible-verse-collection-main

# Instalar dependências (primeira vez)
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Abrir no navegador
# http://localhost:5173
```

---

## 🧪 Testes

### URL de Teste Básica
```
http://localhost:5173/?utm_source=teste&utm_medium=manual&utm_campaign=jan2026
```

### Verificar UTMs no Console (F12)
```javascript
sessionStorage.getItem('utm_params')
```

### Ver UTMs Formatados
```javascript
JSON.parse(sessionStorage.getItem('utm_params'))
```

### Limpar UTMs
```javascript
sessionStorage.clear()
```

### Salvar UTMs Manualmente (para debug)
```javascript
sessionStorage.setItem('utm_params', JSON.stringify({
  utm_source: 'debug',
  utm_medium: 'manual',
  utm_campaign: 'teste2026'
}))
```

---

## 📦 Build e Deploy

```bash
# Build de produção
npm run build

# Preview do build
npm run preview

# Verificar erros de código
npm run lint
```

---

## 🌐 URLs de Teste por Plataforma

### Facebook
```
http://localhost:5173/?utm_source=facebook&utm_medium=cpc&utm_campaign=oraciones_jan2026&utm_content=video_v1&utm_term=target_espiritual
```

### Instagram
```
http://localhost:5173/?utm_source=instagram&utm_medium=stories&utm_campaign=oraciones_jan2026&utm_content=reel_v1&utm_term=target_prosperidade
```

### Google
```
http://localhost:5173/?utm_source=google&utm_medium=cpc&utm_campaign=oraciones_jan2026&utm_content=text_ad_v1&utm_term=oraciones_guiadas&gclid=test123
```

### Email
```
http://localhost:5173/?utm_source=mailchimp&utm_medium=email&utm_campaign=oraciones_jan2026&utm_content=newsletter_week1
```

---

## 🔍 Verificação Rápida

### 1. Sistema está funcionando?
```bash
cd bible-verse-collection-main/bible-verse-collection-main
npm run dev
```
✅ Abra: http://localhost:5173/?utm_source=teste

### 2. UTMs sendo capturados?
**Console F12:**
```javascript
sessionStorage.getItem('utm_params')
```
✅ Deve retornar: `{"utm_source":"teste"}`

### 3. Checkout funcionando?
- Role até preços
- Clique em "$8" ou "$12"
- ✅ URL deve incluir UTMs

---

## 📱 Página de Teste Visual

```
http://localhost:5173/test-utm.html
```

Interface visual com:
- Links de teste pré-configurados
- Checklist de validação
- Instruções visuais

---

## 🛠️ Solução de Problemas

### Erro: "Cannot find module"
```bash
rm -rf node_modules
npm install
```

### Página não carrega
```bash
# Limpar cache e reiniciar
Ctrl + Shift + R (Windows/Linux)
Cmd + Shift + R (Mac)
```

### UTMs não aparecem
```javascript
// Verificar se há erros no console
// Limpar sessionStorage
sessionStorage.clear()
// Recarregar com UTMs
```

### Build falha
```bash
# Verificar erros
npm run lint

# Limpar e reinstalar
rm -rf node_modules dist
npm install
npm run build
```

---

## 📊 Comandos Hotmart

### URL dos Checkouts

**Plano $8:**
```
https://pay.hotmart.com/J103688261V?off=sxnbohaq&checkoutMode=10
```

**Plano $12:**
```
https://pay.hotmart.com/J103688261V?off=7duovx39&checkoutMode=10
```

**Com UTMs (automático):**
```
...&utm_source=xxx&utm_medium=xxx&utm_campaign=xxx...
```

---

## 📚 Documentação Rápida

```bash
# Ver resumo completo
cat RESUMO_VISUAL.txt

# Ver guia de implementação
cat IMPLEMENTATION_SUMMARY.md

# Ver guia de testes
cat TESTING_GUIDE.md

# Ver exemplos de URLs
cat UTM_CAMPAIGN_EXAMPLES.md

# Ver checklist
cat CHECKLIST.md
```

---

## 🎯 Workflow Típico

### Desenvolvimento
```bash
1. npm run dev
2. Acesse: http://localhost:5173/?utm_source=teste
3. Teste funcionalidades
4. Verifique console (F12)
```

### Build para Produção
```bash
1. npm run lint          # Verificar erros
2. npm run build         # Criar build
3. npm run preview       # Testar build
4. # Upload da pasta dist/
```

### Deploy
```bash
1. # Configure seu serviço (Vercel, Netlify, etc)
2. # Deploy da pasta dist/
3. # Teste com URL de produção + UTMs
4. # Valide no painel Hotmart
```

---

## 🔗 Links Úteis

**Locais:**
- Dev: http://localhost:5173
- Teste: http://localhost:5173/test-utm.html
- Preview: http://localhost:4173 (após npm run preview)

**Hotmart:**
- Painel: https://app-vlc.hotmart.com
- Relatórios: Hotmart > Relatórios > Vendas
- Checkout $8: pay.hotmart.com/J103688261V?off=sxnbohaq
- Checkout $12: pay.hotmart.com/J103688261V?off=7duovx39

---

## ⚡ Atalhos do Navegador

- **F12** - Abrir DevTools/Console
- **Ctrl + Shift + R** - Recarregar sem cache
- **Ctrl + Shift + C** - Inspecionar elemento
- **Ctrl + Shift + I** - Abrir DevTools

---

## 💡 Dicas Rápidas

✅ Sempre teste com e sem UTMs
✅ Use nomes consistentes nas campanhas
✅ Documente suas estruturas de UTM
✅ Monitore relatórios da Hotmart semanalmente
✅ Otimize baseado em dados, não "achismos"

---

## 📞 Precisa de Ajuda?

1. **Erro de código?** → Veja o console (F12)
2. **UTMs não funcionam?** → Veja TESTING_GUIDE.md
3. **Build falha?** → npm run lint
4. **Dúvida geral?** → Veja IMPLEMENTATION_SUMMARY.md

---

**✨ Sistema pronto! Comece com: `npm run dev`**

