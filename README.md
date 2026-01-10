# 🙏 Guía de Oraciones - Coleção de Versículos Bíblicos

Um projeto web moderno para apresentação e venda de kits de versículos bíblicos e orações com **sistema completo de rastreamento UTM para Hotmart**.

## ✨ Novidades - Sistema de Rastreamento UTM

✅ **Sistema implementado para rastrear vendas dos planos de $8 USD e $12 USD**

O projeto agora inclui um sistema completo de rastreamento de conversões via parâmetros UTM, permitindo identificar a origem exata de cada venda no painel da Hotmart.

**Documentação completa:**
- 📋 [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md) - Resumo da implementação
- 📖 [UTM_TRACKING_GUIDE.md](./UTM_TRACKING_GUIDE.md) - Guia completo do sistema
- 🧪 [TESTING_GUIDE.md](./TESTING_GUIDE.md) - Como testar passo a passo
- 🎯 [UTM_CAMPAIGN_EXAMPLES.md](./UTM_CAMPAIGN_EXAMPLES.md) - Exemplos prontos para suas campanhas

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído com:

- **Vite** - Build tool e dev server
- **TypeScript** - Tipagem estática
- **React** - Biblioteca UI
- **shadcn-ui** - Componentes de interface
- **Tailwind CSS** - Framework CSS utilitário
- **Sistema UTM** - Rastreamento de conversões Hotmart

## Como executar o projeto localmente

### Pré-requisitos

- Node.js instalado - [instalar com nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- npm ou yarn

### Instalação e execução

```sh
# Passo 1: Clone o repositório
git clone <URL_DO_SEU_REPOSITORIO>

# Passo 2: Navegue até o diretório do projeto
cd bible-verse-collection-main

# Passo 3: Instale as dependências
npm install

# Passo 4: Inicie o servidor de desenvolvimento
npm run dev
```

O projeto estará disponível em `http://localhost:8080`

## Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria a build de produção
- `npm run build:dev` - Cria a build em modo desenvolvimento
- `npm run lint` - Executa o linter
- `npm run preview` - Preview da build de produção

## 📁 Estrutura do Projeto

```
src/
├── components/       # Componentes React reutilizáveis
│   ├── ui/          # Componentes de UI (shadcn)
│   ├── PricingSection.tsx  # ✨ Seção de preços com UTM
│   └── ...          # Componentes específicos do projeto
├── pages/           # Páginas da aplicação
│   └── Index.tsx    # ✨ Página principal com captura de UTM
├── hooks/           # Custom React hooks
├── lib/             # Utilitários e helpers
├── utils/           # ✨ NOVO: Utilitários do sistema
│   └── utmHelper.ts # ✨ Sistema de rastreamento UTM
└── assets/          # Imagens e recursos estáticos
```

## 🎯 Sistema de Rastreamento UTM

### Como Funciona

O sistema captura automaticamente parâmetros UTM da URL e os repassa para o checkout da Hotmart:

1. Usuário acessa: `seusite.com/?utm_source=facebook&utm_medium=cpc&utm_campaign=jan2026`
2. Sistema salva os UTMs no `sessionStorage`
3. Ao clicar em qualquer botão de checkout, os UTMs são adicionados à URL da Hotmart
4. Hotmart registra a venda com a origem rastreada

### Checkouts Configurados

**Plano Básico ($8 USD):**
```
https://pay.hotmart.com/J103688261V?off=sxnbohaq&checkoutMode=10
```

**Plano Completo ($12 USD):**
```
https://pay.hotmart.com/J103688261V?off=7duovx39&checkoutMode=10
```

Ambos os checkouts adicionam automaticamente os parâmetros UTM capturados.

### Teste Rápido

```bash
# 1. Inicie o projeto
npm run dev

# 2. Acesse com UTMs
http://localhost:5173/?utm_source=teste&utm_medium=manual&utm_campaign=validacao

# 3. Abra o Console (F12) e digite:
sessionStorage.getItem('utm_params')

# 4. Clique em qualquer botão de checkout
# A URL da Hotmart incluirá seus parâmetros UTM!
```

Para testes mais detalhados, veja [TESTING_GUIDE.md](./TESTING_GUIDE.md)

## 🚀 Deploy

Para fazer o deploy do projeto:

1. **Valide localmente:** Siga [TESTING_GUIDE.md](./TESTING_GUIDE.md)
2. **Build de produção:** `npm run build`
3. **Preview do build:** `npm run preview`
4. **Upload:** Os arquivos estarão na pasta `dist/`
5. **Teste em produção:** Valide o rastreamento UTM no site publicado

### ⚠️ Importante Após Deploy

- Configure suas campanhas com estruturas UTM consistentes
- Consulte [UTM_CAMPAIGN_EXAMPLES.md](./UTM_CAMPAIGN_EXAMPLES.md) para exemplos prontos
- Monitore os relatórios da Hotmart para analisar conversões
- Otimize campanhas com base nos dados de UTM

## 📊 Monitoramento de Vendas

Após o deploy, você poderá:

✅ Identificar qual plataforma traz mais vendas (Facebook, Instagram, Google, etc.)  
✅ Comparar performance de diferentes anúncios/criativos  
✅ Calcular ROI real de cada campanha  
✅ Otimizar investimento publicitário com dados precisos  

**Acesse:** Hotmart > Relatórios > Vendas > Exportar (incluirá os parâmetros UTM)

## 📚 Documentação Completa

- 📋 [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md) - O que foi implementado
- 📖 [UTM_TRACKING_GUIDE.md](./UTM_TRACKING_GUIDE.md) - Como o sistema funciona
- 🧪 [TESTING_GUIDE.md](./TESTING_GUIDE.md) - Testes passo a passo
- 🎯 [UTM_CAMPAIGN_EXAMPLES.md](./UTM_CAMPAIGN_EXAMPLES.md) - URLs prontas para campanhas
- 🎨 [test-utm.html](./public/test-utm.html) - Página visual de testes

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

## 📄 Licença

Este projeto é privado e proprietário.

---

**✨ Sistema de rastreamento UTM implementado e pronto para uso!**

Para dúvidas ou suporte, consulte a documentação completa nos arquivos linkados acima.
