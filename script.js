/* ==========================================
   BLACK ASSET — JavaScript (GSAP & Lenis)
   ========================================== */

// ---- LENIS SETUP ----
const lenis = new Lenis({
  lerp: 0.08,
  smoothWheel: true,
});

lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

// ---- NAVBAR ----
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  updateActiveNav();
}, { passive: true });

function updateActiveNav() {
  let current = '';
  ['hero', 'quem-somos', 'performance', 'contato'].forEach(id => {
    const el = document.getElementById(id);
    if (el && el.getBoundingClientRect().top <= 120) current = id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
}

// ---- HAMBURGER ----
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinksEl.classList.toggle('open');
  document.body.style.overflow = navLinksEl.classList.contains('open') ? 'hidden' : '';
});
navLinksEl.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinksEl.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ---- HERO COUNTER ----
function animateCounter(el, target) {
  let current = 0;
  let step = Math.max(1, target / 80);
  let timer = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = Math.floor(current);
  }, 20);
}

// ---- HERO PARALLAX & REVEAL ----
window.addEventListener('DOMContentLoaded', () => {
  // Hide elements immediately to prevent FOUC (Flash of Unstyled Content)
  gsap.set(['.hero-badge', '.hero-subtitle', '.hero-actions', '.hero-bottom'], { autoAlpha: 0 });

  // SplitType for Hero Title - target the existing lines directly
  const splitTitle = new SplitType('.title-line', { types: 'words,chars' });
  gsap.set(splitTitle.chars, { autoAlpha: 0, y: '100%' });
  
  const tl = gsap.timeline({ delay: 0.2 });
  
  // Animate badge
  tl.fromTo('.hero-badge', 
    { y: 30, autoAlpha: 0 },
    { y: 0, autoAlpha: 1, duration: 0.8, ease: 'power3.out' }
  );

  // Animate chars (clip-path style reveal from bottom)
  tl.to(splitTitle.chars, 
    { y: '0%', autoAlpha: 1, duration: 0.8, stagger: 0.02, ease: 'power3.out' },
    '-=0.4'
  );

  // Animate subtitle
  tl.fromTo('.hero-subtitle', 
    { y: 30, autoAlpha: 0 },
    { y: 0, autoAlpha: 1, duration: 0.8, ease: 'power3.out' },
    '-=0.6'
  );

  // Animate actions
  tl.fromTo('.hero-actions', 
    { y: 30, autoAlpha: 0 },
    { y: 0, autoAlpha: 1, duration: 0.8, ease: 'power3.out' },
    '-=0.6'
  );

  // Animate bottom stats
  tl.fromTo('.hero-bottom', 
    { autoAlpha: 0 },
    { autoAlpha: 1, duration: 1, ease: 'power2.out', onComplete: () => {
      document.querySelectorAll('.stat-number').forEach(el => {
        animateCounter(el, parseInt(el.dataset.target));
      });
    }},
    '-=0.4'
  );

  // Parallax removido para manter o vídeo no lugar

});

// ==========================================
// HORIZONTAL SCROLL + SVG DRAW-ON-SCROLL
// ==========================================
const hSection = document.getElementById('horizontalSection');
const hTrack = document.getElementById('horizontalTrack');
const masterSvg = document.getElementById('masterSvg');
const NS = 'http://www.w3.org/2000/svg';

let horizontalScrollTween;

function buildSvgAndScroll() {
  if (!hTrack || !masterSvg || !hSection) return;

  // Cleanup old triggers and tweens
  ScrollTrigger.getAll().forEach(st => {
    if (st.trigger === hSection || st.vars?.trigger === hSection) st.kill();
  });
  if (horizontalScrollTween) horizontalScrollTween.kill();
  
  masterSvg.innerHTML = '';
  gsap.set(hTrack, { x: 0 }); // reset before measuring

  const fullW = hTrack.scrollWidth;
  const fullH = hTrack.offsetHeight;
  const cy = fullH / 2;
  const maxShift = fullW - window.innerWidth;

  masterSvg.setAttribute('width', fullW);
  masterSvg.setAttribute('height', fullH);
  masterSvg.setAttribute('viewBox', `0 0 ${fullW} ${fullH}`);

  // Defs for glowing line
  const defs = document.createElementNS(NS, 'defs');
  defs.innerHTML = `
    <linearGradient id="g1" gradientUnits="userSpaceOnUse" x1="0" y1="${cy}" x2="${fullW}" y2="${cy}">
      <stop offset="0%" stop-color="#9c7a2e"/>
      <stop offset="50%" stop-color="#C9A84C"/>
      <stop offset="100%" stop-color="#e8c96a"/>
    </linearGradient>
    <filter id="gfx" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="6" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>`;
  masterSvg.appendChild(defs);

  const cards = hTrack.querySelectorAll('.panel-card');
  const R = 24;
  let bgD = `M 0 ${cy} L ${fullW} ${cy}`;
  let fgD = '';
  let svgSegments = [];
  let lenAccum = 0;
  let curX = 0;
  
  const tr = hTrack.getBoundingClientRect();

  cards.forEach(card => {
    const cr = card.getBoundingClientRect();
    const cL = cr.left - tr.left;
    const cR = cr.right - tr.left;
    const cT = cr.top - tr.top;
    const cB = cr.bottom - tr.top;
    
    // Background path around card
    bgD += `
      M ${cL} ${cy} L ${cL} ${cT + R} A ${R} ${R} 0 0 1 ${cL + R} ${cT}
      L ${cR - R} ${cT} A ${R} ${R} 0 0 1 ${cR} ${cT + R}
      L ${cR} ${cB - R} A ${R} ${R} 0 0 1 ${cR - R} ${cB}
      L ${cL + R} ${cB} A ${R} ${R} 0 0 1 ${cL} ${cB - R}
      L ${cL} ${cy}`;

    // Foreground segment mapping
    if (cL > curX) {
      const len = cL - curX;
      fgD += `M ${curX} ${cy} L ${cL} ${cy} `;
      svgSegments.push({ startX: curX, endX: cL, lenBefore: lenAccum, lenOf: len });
      lenAccum += len;
    }
    
    const cw = cR - cL;
    const ch = cB - cT;
    const loopLen = 2 * (cw + ch) - 8 * R + 2 * Math.PI * R;
    fgD += `
      M ${cL} ${cy}
      L ${cL} ${cT + R} A ${R} ${R} 0 0 1 ${cL + R} ${cT}
      L ${cR - R} ${cT} A ${R} ${R} 0 0 1 ${cR} ${cT + R}
      L ${cR} ${cB - R} A ${R} ${R} 0 0 1 ${cR - R} ${cB}
      L ${cL + R} ${cB} A ${R} ${R} 0 0 1 ${cL} ${cB - R}
      L ${cL} ${cy} `;
    
    svgSegments.push({ startX: cL, endX: cR, lenBefore: lenAccum, lenOf: loopLen });
    lenAccum += loopLen;
    curX = cR;
  });

  if (fullW > curX) {
    const len = fullW - curX;
    fgD += `M ${curX} ${cy} L ${fullW} ${cy}`;
    svgSegments.push({ startX: curX, endX: fullW, lenBefore: lenAccum, lenOf: len });
    lenAccum += len;
  }

  // Draw Background Path
  const bgPath = document.createElementNS(NS, 'path');
  bgPath.setAttribute('d', bgD);
  bgPath.setAttribute('fill', 'none');
  bgPath.setAttribute('stroke', 'rgba(255,255,255,0.04)');
  bgPath.setAttribute('stroke-width', '1.5');
  masterSvg.appendChild(bgPath);

  // Draw Foreground Path
  const fgPath = document.createElementNS(NS, 'path');
  fgPath.setAttribute('d', fgD);
  fgPath.setAttribute('fill', 'none');
  fgPath.setAttribute('stroke', 'url(#g1)');
  fgPath.setAttribute('stroke-width', '3');
  fgPath.setAttribute('stroke-linecap', 'round');
  fgPath.setAttribute('stroke-linejoin', 'round');
  fgPath.setAttribute('filter', 'url(#gfx)');
  masterSvg.appendChild(fgPath);

  // Absolute guarantee against bleeding
  const totalLength = fgPath.getTotalLength() || lenAccum;
  // Over-extend dasharray heavily so it never repeats visually
  const safeDash = totalLength + 1000; 
  gsap.set(fgPath, {
    strokeDasharray: safeDash,
    strokeDashoffset: safeDash // Hidden initially
  });

  // Track animation and ScrollTrigger
  horizontalScrollTween = gsap.to(hTrack, {
    x: -maxShift,
    ease: "none",
    scrollTrigger: {
      trigger: hSection,
      start: "top top",
      pin: true,
      scrub: 1.5, // Increased from 1 for premium butter-smooth lag
      end: () => "+=" + fullW,
      onUpdate: (self) => {
        const shiftX = self.progress * maxShift;
        
        // 1. Correção da Âncora de Desenho: Anchored to left edge (0.1) instead of center
        const penX = shiftX + (window.innerWidth * 0.1);
        
        let drawn = 0;
        for (let seg of svgSegments) {
          if (penX <= seg.startX) break;
          if (penX < seg.endX) {
            const t = (penX - seg.startX) / (seg.endX - seg.startX);
            drawn = seg.lenBefore + t * seg.lenOf;
            break;
          }
          drawn = seg.lenBefore + seg.lenOf;
        }
        
        // Map theoretical length to actual SVG length to prevent out-of-bounds
        const ratio = totalLength / (lenAccum || 1);
        const actualDrawn = drawn * ratio;
        
        // Update offset
        gsap.set(fgPath, { strokeDashoffset: safeDash - actualDrawn });
      }
    }
  });

  // 3. Transição Cinematográfica: Horizontal ➔ Quem Somos (Apenas Desktop)
  let mm = gsap.matchMedia();
  mm.add("(min-width: 769px)", () => {
    // Esconder inicialmente a seção "Quem Somos"
    gsap.set(".quem-somos .section-container", { autoAlpha: 0, y: 150, scale: 0.95 });
    
    ScrollTrigger.create({
      trigger: hSection,
      start: "bottom bottom", // Engatilha exato no momento em que o scroll horizontal faz unpin
      onEnter: () => {
        gsap.to(".quem-somos .section-container", {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 1.4,
          ease: "power4.out"
        });
      },
      onLeaveBack: () => {
        gsap.to(".quem-somos .section-container", {
          autoAlpha: 0,
          y: 150,
          scale: 0.95,
          duration: 0.8,
          ease: "power3.in"
        });
      }
    });
  });
}

// Build once after fonts/layout loads
window.addEventListener('load', buildSvgAndScroll);
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(buildSvgAndScroll, 200);
});

// ---- SCROLL REVEALS (Cards, Services, Metrics) ----

gsap.utils.toArray('.team-card').forEach((card, i) => {
  gsap.fromTo(card,
    { y: 50, autoAlpha: 0, rotationY: 10, skewY: 2 },
    {
      y: 0, autoAlpha: 1, rotationY: 0, skewY: 0,
      duration: 0.8,
      ease: 'back.out(1.2)',
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
      }
    }
  );
});

gsap.utils.toArray('.service-card').forEach((card, i) => {
  gsap.fromTo(card,
    { y: 40, autoAlpha: 0 },
    {
      y: 0, autoAlpha: 1,
      duration: 0.7,
      delay: (i % 2) * 0.1, // staggering based on grid
      ease: 'power3.out',
      scrollTrigger: {
        trigger: card,
        start: 'top 90%',
      }
    }
  );
});

gsap.utils.toArray('.metric-bar').forEach(bar => {
  ScrollTrigger.create({
    trigger: bar,
    start: 'top 95%',
    onEnter: () => {
      bar.style.width = bar.dataset.width + '%';
    }
  });
});

// ---- SMOOTH SCROLL FOR ANCHOR LINKS ----
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      lenis.scrollTo(target, { offset: -80 });
    }
  });
});

// ---- FORM ----
function handleFormSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('formSubmitBtn');
  const success = document.getElementById('formSuccess');
  const form = document.getElementById('contactForm');
  btn.style.opacity = '0.6';
  btn.style.pointerEvents = 'none';
  btn.querySelector('span').textContent = 'Enviando...';
  setTimeout(() => {
    form.querySelectorAll('input, select, textarea').forEach(el => el.value = '');
    success.classList.add('show');
    btn.style.opacity = '1';
    btn.style.pointerEvents = '';
    btn.querySelector('span').textContent = 'Enviar Mensagem';
    setTimeout(() => success.classList.remove('show'), 5000);
  }, 1600);
}

// ---- MAGNETIC BUTTONS ----
const magneticBtns = document.querySelectorAll('.btn-primary');
magneticBtns.forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: 'power2.out' });
  });
  btn.addEventListener('mouseleave', () => {
    gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
  });
});

// ---- HIGH PERFORMANCE CURSOR GLOW ----
const glow = document.createElement('div');
glow.className = 'cursor-glow';
document.body.appendChild(glow);

const setX = gsap.quickTo(glow, "left", { duration: 0.4, ease: "power3" });
const setY = gsap.quickTo(glow, "top", { duration: 0.4, ease: "power3" });

window.addEventListener('mousemove', (e) => {
  setX(e.clientX);
  setY(e.clientY);
});

// ---- TEAM CARD 3D TILT WITH CSS VARS ----
document.querySelectorAll('.team-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    
    const xPct = x / r.width;
    const yPct = y / r.height;
    
    const rx = (0.5 - yPct) * 12; // tilt amount
    const ry = (xPct - 0.5) * 12;

    card.style.setProperty('--mx', `${x}px`);
    card.style.setProperty('--my', `${y}px`);
    
    gsap.to(card, {
      '--rx': `${rx}deg`,
      '--ry': `${ry}deg`,
      duration: 0.3,
      ease: 'power2.out'
    });
  });
  
  card.addEventListener('mouseleave', () => {
    gsap.to(card, {
      '--rx': '0deg',
      '--ry': '0deg',
      duration: 0.6,
      ease: 'power2.out'
    });
  });
});

// ---- HERO CANVAS VIDEO (FRAME SEQUENCE) ----
const heroCanvas = document.getElementById('heroCanvas');
if (heroCanvas) {
  const ctx = heroCanvas.getContext('2d');
  const frameCount = 240;
  const frames = [];
  let loadedFrames = 0;
  let currentFrame = 0;
  let isPlaying = false;
  
  // Draw poster first
  const poster = new Image();
  poster.src = 'fundo/hero_poster.jpg';
  poster.onload = () => {
    if (loadedFrames === 0) {
      ctx.drawImage(poster, 0, 0, 1920, 1080);
    }
  };

  // Preload frames
  for (let i = 1; i <= frameCount; i++) {
    const img = new Image();
    const frameNumber = i.toString().padStart(4, '0');
    img.src = `fundo/frames/frame_${frameNumber}.png`;
    img.onload = () => {
      loadedFrames++;
      // Start playing as soon as we have enough frames or all frames
      if (loadedFrames === frameCount && !isPlaying) {
        isPlaying = true;
        playFrames();
      }
    };
    frames.push(img);
  }

  function playFrames() {
    let lastTime = 0;
    const fps = 30;
    const interval = 1000 / fps;

    function render(time) {
      requestAnimationFrame(render);
      if (!lastTime) lastTime = time;
      const deltaTime = time - lastTime;
      
      if (deltaTime >= interval) {
        lastTime = time - (deltaTime % interval);
        
        ctx.clearRect(0, 0, 1920, 1080);
        ctx.drawImage(frames[currentFrame], 0, 0, 1920, 1080);
        
        currentFrame = (currentFrame + 1) % frameCount;
      }
    }
    requestAnimationFrame(render);
  }
}
