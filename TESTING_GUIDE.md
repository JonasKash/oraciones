# 🧪 Guia de Teste do Sistema UTM

## 🚀 Como Iniciar o Projeto

```bash
# Instale as dependências (se ainda não instalou)
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

O projeto será aberto em: `http://localhost:5173`

---

## 📝 Testes Passo a Passo

### TESTE 1: Verificar Captura de UTMs

1. **Acesse com UTMs:**
```
http://localhost:5173/?utm_source=facebook&utm_medium=cpc&utm_campaign=teste2026&utm_content=video1&utm_term=espiritual
```

2. **Abra o Console do Navegador:**
   - Pressione `F12` (Windows) ou `Cmd + Option + I` (Mac)
   - Vá para a aba "Console"

3. **Digite no console:**
```javascript
sessionStorage.getItem('utm_params')
```

4. **Resultado Esperado:**
```json
{"utm_source":"facebook","utm_medium":"cpc","utm_campaign":"teste2026","utm_content":"video1","utm_term":"espiritual"}
```

✅ Se aparecer o JSON com os parâmetros, o sistema está **capturando corretamente**!

---

### TESTE 2: Verificar Persistência dos UTMs

1. **Com os UTMs ainda salvos no sessionStorage:**
   - Navegue pela página
   - Role para baixo e para cima
   - Os UTMs devem permanecer salvos

2. **Verifique novamente:**
```javascript
sessionStorage.getItem('utm_params')
```

3. **Resultado:** Deve mostrar os mesmos UTMs

✅ Os UTMs persistem durante toda a sessão!

---

### TESTE 3: Testar Plano Básico ($8 USD)

1. **Role até a seção de preços** (ou clique em "RECIBIR GUÍA")

2. **Clique no botão "Quiero la Guía por $ 8 USD"**

3. **Você será redirecionado para:**
```
https://pay.hotmart.com/J103688261V?off=sxnbohaq&checkoutMode=10&utm_source=facebook&utm_medium=cpc&utm_campaign=teste2026&utm_content=video1&utm_term=espiritual
```

4. **Verifique:**
   - ✅ A URL contém `off=sxnbohaq`
   - ✅ A URL contém `checkoutMode=10`
   - ✅ A URL contém todos os parâmetros UTM

---

### TESTE 4: Testar Plano Completo ($12 USD)

1. **Volte para a página** (botão "Voltar" do navegador)

2. **Clique no botão "PLAN COMPLETO $12"**

3. **Você será redirecionado para:**
```
https://pay.hotmart.com/J103688261V?off=7duovx39&checkoutMode=10&utm_source=facebook&utm_medium=cpc&utm_campaign=teste2026&utm_content=video1&utm_term=espiritual
```

4. **Verifique:**
   - ✅ A URL contém `off=7duovx39`
   - ✅ A URL contém `checkoutMode=10`
   - ✅ A URL contém todos os parâmetros UTM

---

### TESTE 5: Testar Sem UTMs

1. **Acesse a página sem parâmetros:**
```
http://localhost:5173/
```

2. **Verifique no console:**
```javascript
sessionStorage.getItem('utm_params')
```
   - Deve retornar `null` ou os UTMs antigos (se houver)

3. **Limpe o sessionStorage:**
```javascript
sessionStorage.clear()
```

4. **Clique em qualquer botão de checkout**

5. **Resultado Esperado:**
   - O redirecionamento funciona normalmente
   - A URL da Hotmart NÃO terá parâmetros UTM extras
   - Apenas `off=...&checkoutMode=10`

✅ O sistema funciona mesmo sem UTMs!

---

## 🎯 URLs de Teste Pré-Configuradas

### Facebook Ads:
```
http://localhost:5173/?utm_source=facebook&utm_medium=cpc&utm_campaign=oraciones_jan2026&utm_content=video_v1&utm_term=target_espiritual
```

### Instagram Stories:
```
http://localhost:5173/?utm_source=instagram&utm_medium=stories&utm_campaign=oraciones_jan2026&utm_content=reel_v1&utm_term=target_prosperidade
```

### Google Ads:
```
http://localhost:5173/?utm_source=google&utm_medium=cpc&utm_campaign=oraciones_jan2026&utm_content=text_ad_v1&utm_term=oraciones_guiadas&gclid=test123abc
```

### Email Marketing:
```
http://localhost:5173/?utm_source=mailchimp&utm_medium=email&utm_campaign=oraciones_launch_jan2026&utm_content=newsletter_week1
```

---

## 🛠️ Comandos Úteis do Console

### Ver UTMs salvos:
```javascript
sessionStorage.getItem('utm_params')
```

### Ver UTMs formatados:
```javascript
JSON.parse(sessionStorage.getItem('utm_params'))
```

### Limpar UTMs:
```javascript
sessionStorage.clear()
```

### Salvar UTMs manualmente (para teste):
```javascript
sessionStorage.setItem('utm_params', JSON.stringify({
  utm_source: 'teste',
  utm_medium: 'manual',
  utm_campaign: 'debug'
}))
```

---

## 📱 Página de Teste Visual

Acesse a página de teste especial:
```
http://localhost:5173/test-utm.html
```

Esta página contém:
- Links pré-configurados para testar diferentes plataformas
- Checklist visual de testes
- Detecção automática de UTMs
- Instruções passo a passo

---

## ✅ Checklist de Validação Final

Antes de fazer deploy, verifique:

- [ ] UTMs são capturados ao acessar a página com parâmetros
- [ ] UTMs persistem durante a navegação
- [ ] Botão do Plano $8 redireciona com UTMs corretos
- [ ] Botão do Plano $12 redireciona com UTMs corretos
- [ ] Sistema funciona sem UTMs (não quebra)
- [ ] Console não mostra erros JavaScript
- [ ] Testado em Chrome
- [ ] Testado em Firefox
- [ ] Testado em Safari (se possível)
- [ ] Testado em mobile (modo responsivo)

---

## 🐛 Problemas Comuns e Soluções

### Problema: "sessionStorage.getItem retorna null"

**Solução:**
1. Certifique-se de acessar com parâmetros UTM na URL
2. Verifique se há erros no console
3. Tente limpar o cache: `Ctrl + Shift + R`

---

### Problema: "Os UTMs não aparecem na URL da Hotmart"

**Solução:**
1. Verifique se os UTMs estão salvos: `sessionStorage.getItem('utm_params')`
2. Abra o arquivo `PricingSection.tsx` e confirme os imports
3. Verifique o console por erros JavaScript

---

### Problema: "TypeError: Cannot read property..."

**Solução:**
1. Limpe node_modules: `rm -rf node_modules && npm install`
2. Reinicie o servidor: `npm run dev`

---

## 📊 Interpretando os Resultados

Quando tudo estiver funcionando, você verá:

**No Console:**
```javascript
> sessionStorage.getItem('utm_params')
< '{"utm_source":"facebook","utm_medium":"cpc","utm_campaign":"oraciones_jan2026"}'
```

**Na URL da Hotmart (Plano $8):**
```
https://pay.hotmart.com/J103688261V?off=sxnbohaq&checkoutMode=10&utm_source=facebook&utm_medium=cpc&utm_campaign=oraciones_jan2026
```

**Na URL da Hotmart (Plano $12):**
```
https://pay.hotmart.com/J103688261V?off=7duovx39&checkoutMode=10&utm_source=facebook&utm_medium=cpc&utm_campaign=oraciones_jan2026
```

---

## 🎉 Próximos Passos

Após validar localmente:

1. **Build de produção:**
```bash
npm run build
```

2. **Testar build:**
```bash
npm run preview
```

3. **Deploy para produção**

4. **Testar em produção com URLs reais**

5. **Configurar campanhas com UTMs**

6. **Monitorar conversões no painel da Hotmart**

---

**✨ Sistema validado e pronto para produção!**

Se tudo passou nos testes, o sistema está 100% funcional. 🚀

