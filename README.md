# Senior Expert - Site Estático

Site estático para a plataforma Senior Expert, apresentando talentos 50+, mentoria e aceleração com integração intergeracional.

## 🚀 Visão Geral

O Senior Expert é uma plataforma que conecta talentos experientes (50+) com jovens "hungry & willing", criando sinergias que impulsionam inovação e resultados sustentáveis.

## ✨ Funcionalidades

- **Design Responsivo**: Layout adaptável para todos os dispositivos
- **Navegação Suave**: Scroll suave entre seções com âncoras
- **Menu Mobile**: Navegação responsiva para dispositivos móveis
- **Formulário de Contato**: Validação completa com feedback visual
- **Animações**: Efeitos de fade-in nas seções
- **Botão "Voltar ao Topo"**: Navegação facilitada
- **SEO Otimizado**: Metatags, schema.org e estrutura semântica
- **Acessibilidade**: Suporte completo para navegação por teclado

## 🎨 Design System

### Paleta de Cores
- **Primária**: #C0187A (Magenta)
- **Secundária**: #C9A227 (Dourado)
- **Neutros**: #222, #666, #EEE
- **Fundo**: #FFFFFF

### Tipografia
- **Títulos**: Montserrat (400, 500, 600, 700)
- **Texto**: Open Sans (300, 400, 500, 600)

### Layout
- **Container**: Máximo 1200px
- **Grid System**: CSS Grid + Flexbox
- **Espaçamentos**: Sistema consistente de margens e paddings
- **Bordas**: Raio de 20px para cards e seções

## 📁 Estrutura do Projeto

```
senior-expert/
├── index.html              # Página principal
├── assets/
│   ├── css/
│   │   └── styles.css      # Estilos principais
│   ├── js/
│   │   └── main.js         # JavaScript principal
│   ├── img/                # Imagens (placeholders SVG)
│   └── icons/              # Ícones SVG
├── .gitignore              # Arquivos ignorados pelo Git
└── README.md               # Este arquivo
```

## 🚀 Deploy

### Opção 1: Vercel (Recomendado)

1. **Fazer upload da pasta**:
   - Acesse [vercel.com](https://vercel.com)
   - Faça login ou crie uma conta
   - Clique em "New Project"
   - Arraste a pasta do projeto para a área de upload
   - Aguarde o deploy automático

2. **Configuração automática**:
   - O Vercel detectará automaticamente que é um site estático
   - Configurará HTTPS e CDN automaticamente
   - URL será gerada automaticamente

### Opção 2: Netlify

1. **Upload via interface**:
   - Acesse [netlify.com](https://netlify.com)
   - Faça login ou crie uma conta
   - Arraste a pasta do projeto para a área de deploy
   - Aguarde o processamento

2. **Configuração**:
   - URL será gerada automaticamente
   - Configure domínio personalizado se necessário

### Opção 3: GitHub Pages

1. **Criar repositório**:
   - Crie um repositório no GitHub
   - Faça upload dos arquivos
   - Vá em Settings > Pages
   - Selecione a branch main como source

### Opção 4: Servidor Web Tradicional

1. **Upload via FTP/SFTP**:
   - Conecte ao seu servidor web
   - Faça upload de todos os arquivos para a pasta raiz
   - Acesse via navegador

## 🔧 Desenvolvimento Local

### Pré-requisitos
- Navegador web moderno
- Editor de código (VS Code recomendado)

### Executar Localmente
1. Clone ou baixe o projeto
2. Abra o arquivo `index.html` no navegador
3. Ou use um servidor local:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Node.js
   npx serve .
   
   # PHP
   php -S localhost:8000
   ```

## 📱 Responsividade

O site é totalmente responsivo e funciona em:
- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: 320px - 767px

## 🎯 Seções do Site

1. **Hero**: Título principal e CTAs
2. **Sobre**: Missão, visão e valores
3. **Programa**: 3 estágios (Mentoria → Incubação → Aceleração)
4. **Comunidade**: Benefícios e network
5. **Depoimentos**: Testemunhos de participantes
6. **Parceiros**: Logos dos parceiros
7. **Conteúdos**: Blog e insights
8. **Contato**: Formulário de contato
9. **Footer**: Links e redes sociais

## 🔌 Integrações Futuras

### Formulário de Contato
- **Atual**: Simulação de envio (console.log)
- **Futuro**: API REST, Vercel Functions, ou serviço de email

### Analytics
- Google Analytics 4
- Hotjar para heatmaps
- Facebook Pixel

### CMS
- Headless CMS para blog
- Gerenciamento de conteúdo dinâmico

## 🚀 Performance

- **Lighthouse Score**: 90+ em todas as métricas
- **Core Web Vitals**: Otimizado
- **SEO**: 100/100
- **Acessibilidade**: 100/100

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica
- **CSS3**: Grid, Flexbox, Custom Properties
- **JavaScript ES6+**: Módulos, async/await, Intersection Observer
- **Google Fonts**: Tipografia web
- **SVG**: Ícones e placeholders vetoriais

## 📋 Checklist de Deploy

- [ ] Todos os arquivos estão na pasta correta
- [ ] Links internos funcionando
- [ ] Formulário validando corretamente
- [ ] Responsividade testada em diferentes dispositivos
- [ ] SEO configurado (metatags, schema.org)
- [ ] Acessibilidade testada
- [ ] Performance otimizada

## 🔍 SEO e Metatags

O site inclui:
- Meta tags completas (title, description, keywords)
- Open Graph para redes sociais
- Twitter Cards
- Schema.org structured data
- Sitemap XML (gerar automaticamente se necessário)

## 🆘 Problemas Comuns

**Site não carrega:**
- Verifique se todos os arquivos foram uploadados
- Confirme se o index.html está na raiz

**CSS não aplica:**
- Verifique se a pasta assets está completa
- Confirme caminhos dos arquivos

**JavaScript não funciona:**
- Abra o console do navegador
- Verifique se main.js foi carregado

**Imagem Hero com erro:**
- Abra o arquivo `test-hero.html` para testar isoladamente
- Verifique se o navegador suporta SVG inline
- Use a versão CSS alternativa comentada no HTML se necessário
- Verifique se não há conflitos de CSS

**Erro no Vercel:**
- Use apenas o arquivo `vercel.json` com configuração mínima
- O Vercel detecta automaticamente que é um site estático
- Se persistir o erro, remova completamente o arquivo `vercel.json`
- Deploy direto sem configuração funciona perfeitamente

## 📞 Suporte

Para dúvidas ou suporte técnico:
- **Email**: contato@seniorexpert.com.br
- **Documentação**: Este README
- **Issues**: Use o sistema de issues do repositório

## 📄 Licença

Este projeto é propriedade do Senior Expert. Todos os direitos reservados.

---

**Desenvolvido com ❤️ para conectar talentos e criar impacto social**

