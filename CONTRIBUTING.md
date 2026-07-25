# 🖤 Guia de Contribuição — Black Asset

Obrigado pelo interesse em contribuir com a **Black Asset**, nossa agência especializada em criação de sites e landing pages de alta conversão! Construímos este projeto com foco em design premium, performance máxima e uma experiência de usuário inesquecível.

---

## 📌 Padrões de Código e Estilo

Para mantermos o padrão de excelência institucional e a estética *dark/luxury* do site, solicitamos que todas as contribuições sigam as diretrizes abaixo:

### 1. **HTML5 Semântico**
* Utilize tags semânticas apropriadas (`<header>`, `<section>`, `<article>`, `<nav>`, `<footer>`, etc.).
* Mantenha a acessibilidade em dia (atributos `alt` em imagens, `aria-label` em botões interativos e contraste de cores adequado).
* Certifique-se de que novos IDs ou classes sigam a nomenclatura limpa em inglês/português já utilizada no projeto.

### 2. **CSS Vanilla & Design System**
* **Sem Frameworks Externos:** Todo o estilo do site é desenvolvido em **CSS Vanilla** de alta performance. Evite adicionar frameworks ou bibliotecas pesadas de CSS.
* **Variáveis CSS:** Sempre utilize as variáveis de cor, espaçamento e tipografia globais declaradas no `:root` do arquivo `style.css` (ex: tons da paleta preta, ouro dourado e gradientes).
* **Glassmorphism e Glow:** Ao criar novos cards ou modais, preserve o efeito de vidro fosco (`backdrop-filter`) e os efeitos de *cursor glow*.

### 3. **JavaScript e Animações**
* Utilize **JavaScript Vanilla** (ES6+) limpo e modular, sem dependências ou jQuery.
* Para animações baseadas em rolagem (como as barras de progresso ou a trilha SVG), priorize o uso de `Intersection Observer API` ou `requestAnimationFrame` para garantir 60 FPS e evitar bloqueios na thread principal.

### 4. **Otimização de Mídia (Vídeos e Imagens)**
* O background em vídeo utiliza entrega adaptativa. Se você alterar ou adicionar novos vídeos no diretório `fundo/`, forneça obrigatoriamente os três formatos para compatibilidade e economia de dados:
  * **H.265 / HEVC** (arquivo ultra-otimizado principal)
  * **VP9 / WebM** (fallback para navegadores modernos)
  * **H.264 / MP4** (fallback universal)
* Imagens no diretório `PESSOAS/` ou novos assets visuais devem estar compactados (formato WebP ou JPEG otimizado).

---

## 🚀 Como Contribuir

1. **Faça um Fork** deste repositório.
2. Crie uma nova branch para sua feature ou correção:
   ```bash
   git checkout -b feature/minha-melhoria-visual
   ```
3. Realize suas alterações testando a responsividade em todos os breakpoints (Mobile, Tablet e Desktop).
4. Faça o commit das suas alterações utilizando mensagens claras e descritivas (recomendamos o padrão *Conventional Commits*, ex: `feat: adiciona nova seção de depoimentos animada` ou `style: melhora contraste dos botões secundários`).
5. Envie para o seu fork:
   ```bash
   git push origin feature/minha-melhoria-visual
   ```
6. Abra um **Pull Request (PR)** detalhando as mudanças realizadas, prints/vídeos demonstrativos (se aplicável) e o impacto na performance.

---

## 💬 Dúvidas e Feedback

Se você encontrou algum bug visual, problema de reprodução de vídeo em algum dispositivo ou tem ideias para deixar a interface ainda mais impressionante, fique à vontade para abrir uma **Issue** neste repositório!

**Black Asset — Agência de Sites e Landing Pages**
*Desenvolvido com excelência por Carlos Guedes.*
