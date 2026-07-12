# 🖤 Black Asset — Site Institucional da Agência

🔗 **[Acessar o Projeto](https://carlosguedes-dev.github.io/black-asset/)**

## 📌 Sobre o Projeto

Site institucional da **Black Asset**, agência especializada em criação de sites e landing pages de alta conversão. O projeto foi desenvolvido com foco em design premium, performance e experiência do usuário, servindo como vitrine digital da própria agência.

A proposta visual é dark/luxury — paleta preta e dourada, animações sofisticadas e uma navegação que impressiona ao primeiro scroll.

## 🚀 Tecnologias Utilizadas

- **HTML5** Semântico
- **CSS3** (Variáveis CSS, Glassmorphism, Gradientes, Animações customizadas)
- **JavaScript Vanilla** (sem frameworks)
- **FFmpeg** (pré-processamento e otimização do vídeo do hero)
- **Google Fonts** — Outfit + Inter

## ✨ Principais Funcionalidades

- **Hero com Vídeo Otimizado**: Background em vídeo com entrega adaptativa — H.265/HEVC (~1.1 MB), VP9/WebM (~3.7 MB) e H.264 como fallback universal. O browser escolhe automaticamente o melhor formato.
- **Scroll Horizontal com Trilha SVG Animada**: Seção "Por que ter um site profissional?" com scroll horizontal controlado por `position: sticky`. Uma linha SVG dourada se desenha em tempo real conforme o usuário rola, com a ponta sempre seguindo o centro da tela — mapeamento peça-por-peça da posição X para comprimento de caminho.
- **Seção Quem Somos**: Cards de equipe com efeito de tilt 3D no hover, fotos com overlay gradiente e badges de cargo.
- **Seção de Serviços**: Grid com 4 cards animados por Intersection Observer.
- **Métricas com Barras Animadas**: Barras de progresso que se preenchem conforme entram na viewport.
- **Formulário de Contato**: Com validação e feedback visual de sucesso.
- **Cursor Glow**: Efeito de luz suave que segue o cursor do mouse com `lerp`.
- **Navbar Dinâmica**: Transparente no topo, com backdrop-filter e sombra ao rolar.
- **Contadores Animados**: Stats da hero animados com contador numérico ao carregar.
- **100% Responsivo**: Mobile-first com breakpoints para tablet e desktop.

## 📁 Estrutura do Projeto

```
black-asset/
├── index.html          # Estrutura principal
├── style.css           # Estilos globais e design system
├── script.js           # Lógica de animações e interações
├── logo_black_asset.png
├── fundo/
│   ├── hero_bg.mp4     # H.265 — ~1.1 MB (principal)
│   ├── hero_bg.webm    # VP9 — ~3.7 MB (fallback)
│   └── Anima_*.mp4     # H.264 — ~8.3 MB (fallback universal)
└── PESSOAS/
    ├── CARLOS.jpeg
    ├── LEVI.jpeg
    └── VICTOR.jpeg
```

## 👨‍💻 Autor

**Carlos Guedes**
*Black Asset — Agência de Sites e Landing Pages*
