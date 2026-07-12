/* ==========================================
   BLACK ASSET — JavaScript (From Scratch)
   ========================================== */

// ---- NAVBAR ----
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', function () {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  updateActiveNav();
});

function updateActiveNav() {
  var current = '';
  ['hero', 'quem-somos', 'performance', 'contato'].forEach(function (id) {
    var el = document.getElementById(id);
    if (el && el.getBoundingClientRect().top <= 120) current = id;
  });
  navLinks.forEach(function (link) {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
}

// ---- HAMBURGER ----
var hamburger = document.getElementById('hamburger');
var navLinksEl = document.getElementById('navLinks');
hamburger.addEventListener('click', function () {
  navLinksEl.classList.toggle('open');
  document.body.style.overflow = navLinksEl.classList.contains('open') ? 'hidden' : '';
});
navLinksEl.querySelectorAll('a').forEach(function (a) {
  a.addEventListener('click', function () { navLinksEl.classList.remove('open'); document.body.style.overflow = ''; });
});

// ---- HERO COUNTER ----
function animateCounter(el, target) {
  var current = 0;
  var step = Math.max(1, target / 80);
  var timer = setInterval(function () {
    current += step;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = Math.floor(current);
  }, 20);
}
setTimeout(function () {
  document.querySelectorAll('.stat-number').forEach(function (el) {
    animateCounter(el, parseInt(el.dataset.target));
  });
}, 1200);

// ==========================================
// HORIZONTAL SCROLL & SVG PATH LOGIC
// ==========================================
const hSection = document.getElementById('horizontalSection');
const hTrack = document.getElementById('horizontalTrack');
const masterSvg = document.getElementById('masterSvg');

let animSegments = [];

function initMasterSvg() {
  if (!hTrack || !masterSvg) return;
  masterSvg.innerHTML = '';
  animSegments = [];
  
  const trackRect = hTrack.getBoundingClientRect();
  const trackW = trackRect.width;
  masterSvg.style.width = trackW + 'px';
  masterSvg.style.height = trackRect.height + 'px';
  
  const cards = document.querySelectorAll('.panel-card');
  const centerY = trackRect.height / 2;
  let currentX = 0;
  
  const ns = "http://www.w3.org/2000/svg";
  
  const defs = document.createElementNS(ns, 'defs');
  defs.innerHTML = `
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#C9A84C" />
      <stop offset="100%" stop-color="#e8c96a" />
    </linearGradient>
    <filter id="glow">
      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  `;
  masterSvg.appendChild(defs);

  function createPath(d, isBg, calculatedLength) {
    const p = document.createElementNS(ns, 'path');
    p.setAttribute('d', d);
    p.setAttribute('fill', 'none');
    p.setAttribute('stroke-width', '2');
    p.setAttribute('stroke-linecap', 'round');
    p.setAttribute('stroke-linejoin', 'round');
    
    if (isBg) {
      p.setAttribute('stroke', 'rgba(255,255,255,0.06)');
      masterSvg.appendChild(p);
      return null;
    } else {
      p.setAttribute('stroke', 'url(#goldGrad)');
      p.setAttribute('filter', 'url(#glow)');
      masterSvg.appendChild(p);
      p.setAttribute('stroke-dasharray', calculatedLength);
      p.setAttribute('stroke-dashoffset', calculatedLength);
      return p;
    }
  }

  cards.forEach((card) => {
    const rect = card.getBoundingClientRect();
    const cLeft = rect.left - trackRect.left;
    const cRight = rect.right - trackRect.left;
    const cTop = rect.top - trackRect.top;
    const cBottom = rect.bottom - trackRect.top;
    const r = 32; 
    
    // 1. Line to the card (draws in the gap)
    const lineD = `M ${currentX} ${centerY} L ${cLeft} ${centerY}`;
    const lineLen = Math.abs(cLeft - currentX);
    const lineLeft = currentX;
    
    createPath(lineD, true, lineLen);
    if (lineLen > 0) {
      animSegments.push({
        el: createPath(lineD, false, lineLen),
        length: lineLen,
        left: lineLeft,
        width: lineLen
      });
    }
    
    // 2. Loop around the card
    const loopD = `
      M ${cLeft} ${centerY}
      L ${cLeft} ${cTop + r}
      A ${r} ${r} 0 0 1 ${cLeft + r} ${cTop}
      L ${cRight - r} ${cTop}
      A ${r} ${r} 0 0 1 ${cRight} ${cTop + r}
      L ${cRight} ${cBottom - r}
      A ${r} ${r} 0 0 1 ${cRight - r} ${cBottom}
      L ${cLeft + r} ${cBottom}
      A ${r} ${r} 0 0 1 ${cLeft} ${cBottom - r}
      L ${cLeft} ${centerY}
    `;
    const w = cRight - cLeft;
    const h = cBottom - cTop;
    const loopLen = (2 * w) + (2 * h) - (8 * r) + (2 * Math.PI * r);
    
    createPath(loopD, true, loopLen);
    animSegments.push({
      el: createPath(loopD, false, loopLen),
      length: loopLen,
      left: cLeft,
      width: w
    });
    
    // 3. Move currentX to right side of card
    currentX = cRight;
  });
  
  // Final line to the end of track
  const endD = `M ${currentX} ${centerY} L ${trackW} ${centerY}`;
  const endLen = Math.abs(trackW - currentX);
  createPath(endD, true, endLen);
  if (endLen > 0) {
    animSegments.push({
      el: createPath(endD, false, endLen),
      length: endLen,
      left: currentX,
      width: endLen
    });
  }
}

function tickHorizontal() {
  if (!hSection || !hTrack) return;
  
  const rect = hSection.getBoundingClientRect();
  const viewH = window.innerHeight;
  const scrollDist = hSection.offsetHeight - viewH;
  
  if (scrollDist <= 0) return;

  let stickyP = -rect.top / scrollDist;
  stickyP = Math.min(Math.max(stickyP, 0), 1);
  
  const maxTranslateX = hTrack.offsetWidth - window.innerWidth;
  const shiftedX = stickyP * maxTranslateX;
  hTrack.style.transform = `translateX(-${shiftedX}px)`;
  
  // Map drawing to the physical center of the screen
  const currentX = shiftedX + (window.innerWidth / 2);
  
  animSegments.forEach(seg => {
    if (seg.width === 0) return;
    const progress = (currentX - seg.left) / seg.width;
    const clampedP = Math.min(Math.max(progress, 0), 1);
    const offset = seg.length * (1 - clampedP);
    seg.el.setAttribute('stroke-dashoffset', offset);
  });
}

window.addEventListener('scroll', tickHorizontal, { passive: true });
window.addEventListener('resize', () => { initMasterSvg(); tickHorizontal(); });
setTimeout(() => { initMasterSvg(); tickHorizontal(); }, 500);

// ---- INTERSECTION OBSERVERS ----
var obsOpts = { threshold: 0.15, rootMargin: '0px 0px -50px 0px' };

// Team cards
document.querySelectorAll('.team-card').forEach(function (card) {
  new IntersectionObserver(function (entries, obs) {
    if (entries[0].isIntersecting) {
      var delay = parseInt(card.dataset.index || 0) * 150;
      setTimeout(function () { card.classList.add('visible'); }, delay);
      obs.unobserve(card);
    }
  }, obsOpts).observe(card);
});

// Service cards
document.querySelectorAll('.service-card').forEach(function (card, i) {
  new IntersectionObserver(function (entries, obs) {
    if (entries[0].isIntersecting) {
      setTimeout(function () { card.classList.add('visible'); }, i * 100);
      obs.unobserve(card);
    }
  }, obsOpts).observe(card);
});

// Metric bars
document.querySelectorAll('.metric-bar').forEach(function (bar) {
  new IntersectionObserver(function (entries, obs) {
    if (entries[0].isIntersecting) {
      setTimeout(function () { bar.style.width = bar.dataset.width + '%'; }, 200);
      obs.unobserve(bar);
    }
  }, obsOpts).observe(bar);
});

// ---- SMOOTH SCROLL ----
document.querySelectorAll('a[href^="#"]').forEach(function (a) {
  a.addEventListener('click', function (e) {
    var target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ---- FORM ----
function handleFormSubmit(e) {
  e.preventDefault();
  var btn = document.getElementById('formSubmitBtn');
  var success = document.getElementById('formSuccess');
  var form = document.getElementById('contactForm');
  btn.style.opacity = '0.7';
  btn.style.pointerEvents = 'none';
  btn.querySelector('span').textContent = 'Enviando...';
  setTimeout(function () {
    form.querySelectorAll('input, select, textarea').forEach(function (el) { el.value = ''; });
    success.classList.add('show');
    btn.style.opacity = '1';
    btn.style.pointerEvents = '';
    btn.querySelector('span').textContent = 'Enviar Mensagem';
    setTimeout(function () { success.classList.remove('show'); }, 5000);
  }, 1600);
}

// ---- CURSOR GLOW ----
var glow = document.createElement('div');
glow.style.cssText = 'position:fixed;width:280px;height:280px;border-radius:50%;background:radial-gradient(circle,rgba(201,168,76,.05),transparent 70%);pointer-events:none;z-index:0;top:0;left:0;transform:translate(-50%,-50%)';
document.body.appendChild(glow);
var mx = 0, my = 0, gx = 0, gy = 0;
window.addEventListener('mousemove', function (e) { mx = e.clientX; my = e.clientY });
(function anim() { gx += (mx - gx) * .08; gy += (my - gy) * .08; glow.style.left = gx + 'px'; glow.style.top = gy + 'px'; requestAnimationFrame(anim) })();

// ---- TEAM CARD TILT ----
document.querySelectorAll('.team-card').forEach(function (card) {
  card.addEventListener('mousemove', function (e) {
    var r = card.getBoundingClientRect();
    var x = (e.clientX - r.left) / r.width - 0.5;
    var y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = 'translateY(-8px) rotateY(' + (x * 8) + 'deg) rotateX(' + (-y * 6) + 'deg)';
  });
  card.addEventListener('mouseleave', function () { card.style.transform = ''; });
});

// ---- VIDEO FALLBACK ----
var heroVideo = document.getElementById('heroVideo');
if (heroVideo) {
  heroVideo.addEventListener('error', function () {
    heroVideo.parentElement.style.background = 'linear-gradient(135deg,#0a0a0a,#1a1507,#0a0a0a)';
    heroVideo.style.display = 'none';
  });
}
