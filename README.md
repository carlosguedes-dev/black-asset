<div align="center">

# 🖤 Black Asset — Agência Digital & Sites de Luxo 💎✨

**O site institucional e vitrine digital de alta conversão para a Black Asset, agência especializada em design premium e arquitetura web.**

[![Versão](https://img.shields.io/badge/versão-1.0.0-d4af37?style=for-the-badge&logo=googlechrome&logoColor=black)](https://github.com/carlosguedes-dev)
[![Licença](https://img.shields.io/badge/licença-MIT-00ff88?style=for-the-badge)](LICENSE)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
[![FFmpeg](https://img.shields.io/badge/FFmpeg-007808?style=for-the-badge&logo=ffmpeg&logoColor=white)](https://ffmpeg.org/)
[![Feito com Amor](https://img.shields.io/badge/Feito_com-MUITO_AMOR_❤️-ff0055?style=for-the-badge)](https://github.com/carlosguedes-dev)

<br>

🔗 **[Acessar o Projeto Ao Vivo / Demonstração Online](https://carlosguedes-dev.github.io/black-asset/)**

<br>

<p align="center">
  <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop" alt="Black Asset Banner Luxury Dark" width="80%" style="border-radius: 20px; box-shadow: 0 10px 30px rgba(212, 175, 55, 0.4);">
</p>

</div>

---

## 📖 Sobre o Projeto

O **Black Asset** é a plataforma institucional e vitrine digital oficial da agência Black Asset, especializada em engenharia web, criação de sites sob medida e landing pages de altíssima conversão. O projeto foi arquitetado sob uma filosofia de design *Ultra-Premium Dark / Luxury*, utilizando uma sofisticada paleta em preto obsidiana e dourado imperial, complementada por tipografia de ponta e micro-animações magnéticas.

Desenvolvido para impressionar clientes de alto padrão desde o primeiro scroll, o site funciona como prova viva da excelência técnica da agência. A interface combina um fundo em vídeo com compressão adaptativa multi-formato, seções imersivas com rolagem horizontal controlada por tráfego vetorial e cards com efeito de profundidade 3D (*tilt hover*), criando uma experiência de navegação imersiva e memorável.

Além do rigor estético e visual, o projeto prioriza o desempenho extremo e as melhores práticas de acessibilidade e SEO. Sem a utilização de frameworks pesados ou bibliotecas externas que geram lentidão, o código em Vanilla JavaScript garante um carregamento instantâneo, métricas perfeitas de Core Web Vitals e total fluidez em qualquer tela ou dispositivo.

---

## ✨ Principais Funcionalidades

- 🎬 **Hero com Vídeo Otimizado & Entrega Adaptativa**: Background em vídeo arquitetado via **FFmpeg** com entrega adaptativa multi-codec — H.265/HEVC (~1.1 MB) para navegadores Apple/modernos, VP9/WebM (~3.7 MB) para ecossistema Google, e H.264 como fallback universal. O navegador seleciona automaticamente o formato mais leve e performático!
- 🐍 **Scroll Horizontal com Trilha SVG Animada**: A seção *"Por que ter um site profissional?"* implementa um scroll horizontal fluido e imersivo controlado por `position: sticky`. Uma linha vetorial SVG dourada desenha-se em tempo real conforme o avanço de rolagem, com o ponto focal sempre seguindo o centro da tela através do mapeamento de coordenadas X para comprimento de caminho (`stroke-dashoffset`).
- 👥 **Seção Quem Somos com Efeito Tilt 3D**: Apresentação interativa da equipe com cards sensíveis à posição do cursor, aplicando transformações de perspectiva 3D no hover, overlays de gradiente dinâmicos e emblemas de especialidade em destaque.
- ⚡ **Grid de Serviços & Animações por Intersection Observer**: Cards de serviços com entrada sequencial animada assim que entram no campo de visão do usuário, economizando processamento e proporcionando um ritmo visual envolvente.
- 📊 **Métricas & Contadores de Alta Precisão**: Barras de progresso e estatísticas de impacto da agência que preenchem e incrementam suavemente de forma orgânica via `requestAnimationFrame` e interpolação linear (`lerp`).
- 💎 **Cursor Glow Interativo**: Efeito de iluminação suave em gradiente dourado que persegue graciosamente o cursor do mouse na viewport, intensificando a sensação de interface tátil e reativa.
- 🌐 **Navbar Dinâmica Inteligente**: Barra de navegação transparente no topo da página que adquire acabamento Glassmorphism (`backdrop-filter: blur()`), borda sutil e sombra reativa automaticamente ao iniciar a rolagem.

---

## 💻 Tecnologias Utilizadas

O site institucional da Black Asset foi construído unicamente com tecnologias web modernas, limpas e sem dependências, visando a nota máxima de performance em avaliações corporativas:

- **HTML5 Semântico**: Estruturação acessível, hierarquia de títulos otimizada para mecanismos de busca (SEO) e marcação de alta relevância.
- **CSS3 Moderno**: Sistema robusto de Design Tokens (`:root`), Grid e Flexbox, Glassmorphism, propriedades avançadas de `stroke-dasharray` e transições de hardware otimizadas por GPU.
- **JavaScript Vanilla (ES6+)**: Programação orientada a eventos, observadores de interseção (`IntersectionObserver`), cálculos matemáticos para transições suaves e manipulação DOM de precisão sem frameworks.
- **FFmpeg**: Ferramenta de linha de comando utilizada no pré-processamento, transcodificação e compressão de taxas de bits extremas para os vídeos de fundo.
- **Google Fonts**: Tipografia de luxo combinando as fontes `Outfit` para títulos expressivos e elegantes, e `Inter` para clareza e conforto na leitura de textos longos.

---

## 📁 Estrutura de Arquivos

```text
black-asset/
│
├── index.html          # Estrutura principal da vitrine digital
├── style.css           # Estilos globais, design system dark/luxury e glassmorphism
├── script.js           # Lógica de animações, scroll horizontal SVG e interações
├── logo_black_asset.png # Logotipo oficial da agência em alta resolução
├── CNAME               # Configuração de domínio personalizado GitHub Pages
├── README.md           # Documentação técnica e guia de uso (este arquivo)
├── CONTRIBUTING.md     # Guia para contribuições e padrões do projeto
├── LICENSE             # Licença MIT de código aberto
├── fundo/              # Background em vídeo com entrega adaptativa e fallback
│   ├── hero_bg.mp4     # Formato H.265/HEVC otimizado (~1.1 MB)
│   ├── hero_bg.webm    # Formato VP9/WebM (~3.7 MB)
│   └── Anima_*.mp4     # Formato H.264 (~8.3 MB para fallback universal)
└── PESSOAS/            # Retratos oficiais dos membros da agência
    ├── CARLOS.jpeg     # Carlos Guedes — Engenheiro de Software & Fundador
    ├── LEVI.jpeg       # Levi — Especialista em Estratégia Digital
    └── VICTOR.jpeg     # Victor — Diretor de Arte & Design UI/UX
```

---

## 🚀 Como Executar o Projeto

Você pode clonar, inspecionar e rodar o projeto localmente em questão de segundos sem a necessidade de configurar ambientes de compilação complexos:

### 1. Execução Direta no Navegador (Método Mais Simples)
- Clone o repositório utilizando o terminal ou faça o download em arquivo ZIP:
  ```bash
  git clone https://github.com/carlosguedes-dev/black-asset.git
  cd black-asset
  ```
- Dê um **duplo clique** no arquivo `index.html` ou abra pelo terminal para carregar o site instantaneamente no seu navegador favorito (Chrome, Edge, Safari, Firefox).

### 2. Execução com VS Code & Live Server (Recomendado)
- Abra o diretório da agência no [Visual Studio Code](https://code.visualstudio.com/).
- Instale a extensão **Live Server** diretamente pela loja oficial de extensões.
- Clique com o botão direito no arquivo `index.html` e selecione **"Open with Live Server"**. O site abrirá automaticamente com suporte a recarregamento instantâneo para edições.
- Ou utilize um servidor estático rápido:
  ```bash
  npx serve .
  ```

### 3. Publicação Online (Deploy em Produção)
- Suba os arquivos do projeto para um repositório no **GitHub**.
- Acesse a aba de **Settings** -> **Pages** no repositório e configure o deploy pela branch `main`.
- Caso possua um domínio próprio, adicione o nome do domínio no arquivo `CNAME` para habilitar o redirecionamento personalizado da sua agência!

---

## 🤝 Como Contribuir

A agência Black Asset valoriza a inovação aberta! Se você deseja sugerir melhorias nas animações vetoriais, otimizações adicionais na compressão de vídeo ou refinamentos visuais no design system, sua contribuição é muito bem-vinda.

Por favor, leia nosso guia completo em [CONTRIBUTING.md](CONTRIBUTING.md) para conhecer nossas diretrizes de arquitetura, padrões de formatação de código e etapas para submissão do seu Pull Request.

---

## 📄 Licença

Este projeto institucional é distribuído sob a licença de código aberto **MIT**. Consulte o arquivo [LICENSE](LICENSE) para obter todos os detalhes sobre permissões e direitos de uso.

---

<div align="center">
  <p>Feito com todo o carinho, excelência técnica e paixão por <b>Carlos Guedes</b> ❤️</p>
  <p><b>Black Asset — Agência Digital & High Performance Landing Pages 💎🚀</b></p>
</div>
