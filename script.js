/* ==========================================
   BLACK ASSET — JavaScript
   ========================================== */

// ---- NAVBAR ----
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', function () {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  updateActiveNav();
}, { passive: true });

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
  a.addEventListener('click', function () {
    navLinksEl.classList.remove('open');
    document.body.style.overflow = '';
  });
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
// HORIZONTAL SCROLL + SVG DRAW-ON-SCROLL
// "Pen tip follows center of screen"
// ==========================================
const hSection  = document.getElementById('horizontalSection');
const hTrack    = document.getElementById('horizontalTrack');
const masterSvg = document.getElementById('masterSvg');
const NS = 'http://www.w3.org/2000/svg';

// Piece-wise mapping: each segment maps an X range → path length range
let svgSegments = [];
let svgTotalLen = 0;
let svgFgPath   = null;
let svgReady    = false;

function buildSvg() {
  if (!hTrack || !masterSvg) return;
  svgReady = false;
  svgFgPath = null;
  svgSegments = [];
  svgTotalLen = 0;
  masterSvg.innerHTML = '';

  // ── Temporarily reset transform so card positions are in natural space ──
  const savedTransform = hTrack.style.transform;
  hTrack.style.transform = 'none';

  const tr    = hTrack.getBoundingClientRect();
  const fullW = hTrack.scrollWidth;
  const fullH = hTrack.offsetHeight;
  const cy    = fullH / 2;

  // Restore transform
  hTrack.style.transform = savedTransform;

  masterSvg.setAttribute('width',   fullW);
  masterSvg.setAttribute('height',  fullH);
  masterSvg.setAttribute('viewBox', `0 0 ${fullW} ${fullH}`);

  // ── SVG defs ─────────────────────────────────────────────────────────────
  const defs = document.createElementNS(NS, 'defs');
  defs.innerHTML = `
    <linearGradient id="g1" gradientUnits="userSpaceOnUse" x1="0" y1="${cy}" x2="${fullW}" y2="${cy}">
      <stop offset="0%"   stop-color="#9c7a2e"/>
      <stop offset="50%"  stop-color="#C9A84C"/>
      <stop offset="100%" stop-color="#e8c96a"/>
    </linearGradient>
    <filter id="gfx" x="-15%" y="-400%" width="130%" height="900%">
      <feGaussianBlur stdDeviation="4" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>`;
  masterSvg.appendChild(defs);

  // ── Collect card positions (natural, unshifted) ──────────────────────────
  const cards = hTrack.querySelectorAll('.panel-card');
  if (cards.length === 0) return;

  const R = 24;  // corner radius — match CSS border-radius
  let bgD = '', fgD = '';
  let lenAccum = 0;
  let curX = 0;

  // Background: just a simple dim horizontal line spanning full width
  bgD = `M 0 ${cy} L ${fullW} ${cy}`;

  // Also add dim card outlines to the background
  cards.forEach(function(card) {
    const cr = card.getBoundingClientRect();
    const cL = cr.left   - tr.left;
    const cR = cr.right  - tr.left;
    const cT = cr.top    - tr.top;
    const cB = cr.bottom - tr.top;
    bgD += `
      M ${cL} ${cy} L ${cL} ${cT+R} A ${R} ${R} 0 0 1 ${cL+R} ${cT}
      L ${cR-R} ${cT} A ${R} ${R} 0 0 1 ${cR} ${cT+R}
      L ${cR} ${cB-R} A ${R} ${R} 0 0 1 ${cR-R} ${cB}
      L ${cL+R} ${cB} A ${R} ${R} 0 0 1 ${cL} ${cB-R}
      L ${cL} ${cy}`;
  });

  // Foreground animated path + piece-wise segments
  cards.forEach(function(card) {
    const cr = card.getBoundingClientRect();
    const cL = cr.left   - tr.left;
    const cR = cr.right  - tr.left;
    const cT = cr.top    - tr.top;
    const cB = cr.bottom - tr.top;
    const cW = cR - cL;
    const cH = cB - cT;

    // ─ Gap line from last position to card left ─
    if (cL > curX) {
      const len = cL - curX;
      fgD += `M ${curX} ${cy} L ${cL} ${cy} `;
      svgSegments.push({ startX: curX, endX: cL, lenBefore: lenAccum, lenOf: len });
      lenAccum += len;
    }

    // ─ Loop around the card ─
    // Perimeter: 2*(w+h) - straight corners cut + arc corners added
    const loopLen = 2 * (cW + cH) - 8 * R + 2 * Math.PI * R;
    fgD += `
      M ${cL} ${cy}
      L ${cL} ${cT+R} A ${R} ${R} 0 0 1 ${cL+R} ${cT}
      L ${cR-R} ${cT} A ${R} ${R} 0 0 1 ${cR} ${cT+R}
      L ${cR} ${cB-R} A ${R} ${R} 0 0 1 ${cR-R} ${cB}
      L ${cL+R} ${cB} A ${R} ${R} 0 0 1 ${cL} ${cB-R}
      L ${cL} ${cy} `;
    svgSegments.push({ startX: cL, endX: cR, lenBefore: lenAccum, lenOf: loopLen });
    lenAccum += loopLen;

    curX = cR;
  });

  // ─ Trailing line to track end ─
  if (fullW > curX) {
    const len = fullW - curX;
    fgD += `M ${curX} ${cy} L ${fullW} ${cy}`;
    svgSegments.push({ startX: curX, endX: fullW, lenBefore: lenAccum, lenOf: len });
    lenAccum += len;
  }

  svgTotalLen = lenAccum;

  // ── Create background path ───────────────────────────────────────────────
  const bgPath = document.createElementNS(NS, 'path');
  bgPath.setAttribute('d', bgD);
  bgPath.setAttribute('fill', 'none');
  bgPath.setAttribute('stroke', 'rgba(255,255,255,0.07)');
  bgPath.setAttribute('stroke-width', '1.5');
  bgPath.setAttribute('stroke-linecap', 'round');
  bgPath.setAttribute('stroke-linejoin', 'round');
  masterSvg.appendChild(bgPath);

  // ── Create foreground gold path ──────────────────────────────────────────
  const fgPath = document.createElementNS(NS, 'path');
  fgPath.setAttribute('d', fgD);
  fgPath.setAttribute('fill', 'none');
  fgPath.setAttribute('stroke', 'url(#g1)');
  fgPath.setAttribute('stroke-width', '2.5');
  fgPath.setAttribute('stroke-linecap', 'round');
  fgPath.setAttribute('stroke-linejoin', 'round');
  fgPath.setAttribute('filter', 'url(#gfx)');
  // Start fully hidden
  fgPath.setAttribute('stroke-dasharray',  svgTotalLen);
  fgPath.setAttribute('stroke-dashoffset', svgTotalLen);
  masterSvg.appendChild(fgPath);

  svgFgPath = fgPath;
  svgReady  = true;
}

// ── Convert screen-center X position to path length drawn ────────────────
function penXToDrawnLen(penX) {
  let drawn = 0;
  for (var i = 0; i < svgSegments.length; i++) {
    const seg = svgSegments[i];
    if (penX <= seg.startX) break;
    if (penX < seg.endX) {
      const t = (penX - seg.startX) / (seg.endX - seg.startX);
      drawn = seg.lenBefore + t * seg.lenOf;
      return drawn;
    }
    drawn = seg.lenBefore + seg.lenOf;
  }
  return drawn;
}

function tickHorizontal() {
  if (!hSection || !hTrack) return;

  const rect       = hSection.getBoundingClientRect();
  const viewH      = window.innerHeight;
  const scrollDist = hSection.offsetHeight - viewH;
  if (scrollDist <= 0) return;

  let p = Math.min(Math.max(-rect.top / scrollDist, 0), 1);

  const maxShift = hTrack.scrollWidth - window.innerWidth;
  const shiftX   = p * maxShift;
  hTrack.style.transform = `translateX(-${shiftX}px)`;

  if (!svgReady || !svgFgPath || svgTotalLen === 0) return;

  // Pen tip = center of viewport in TRACK coordinates
  const penX     = shiftX + window.innerWidth * 0.5;
  const drawnLen = penXToDrawnLen(penX);
  const offset   = Math.max(svgTotalLen - drawnLen, 0);

  svgFgPath.setAttribute('stroke-dashoffset', offset);
}

function initHorizontal() {
  requestAnimationFrame(function() {
    requestAnimationFrame(function() {
      buildSvg();
      tickHorizontal();
    });
  });
}

window.addEventListener('scroll', tickHorizontal, { passive: true });
window.addEventListener('resize', function() {
  svgReady = false;
  initHorizontal();
}, { passive: true });
setTimeout(initHorizontal, 400);

// ---- INTERSECTION OBSERVERS ----
var obsOpts = { threshold: 0.12, rootMargin: '0px 0px -40px 0px' };

document.querySelectorAll('.team-card').forEach(function (card) {
  new IntersectionObserver(function (entries, obs) {
    if (entries[0].isIntersecting) {
      var delay = parseInt(card.dataset.index || 0) * 160;
      setTimeout(function () { card.classList.add('visible'); }, delay);
      obs.unobserve(card);
    }
  }, obsOpts).observe(card);
});

document.querySelectorAll('.service-card').forEach(function (card, i) {
  new IntersectionObserver(function (entries, obs) {
    if (entries[0].isIntersecting) {
      setTimeout(function () { card.classList.add('visible'); }, i * 110);
      obs.unobserve(card);
    }
  }, obsOpts).observe(card);
});

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
  var btn     = document.getElementById('formSubmitBtn');
  var success = document.getElementById('formSuccess');
  var form    = document.getElementById('contactForm');
  btn.style.opacity = '0.6';
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
glow.className = 'cursor-glow';
document.body.appendChild(glow);
var mx = 0, my = 0, gx = 0, gy = 0;
window.addEventListener('mousemove', function (e) { mx = e.clientX; my = e.clientY; });
(function anim() {
  gx += (mx - gx) * 0.07;
  gy += (my - gy) * 0.07;
  glow.style.left = gx + 'px';
  glow.style.top  = gy + 'px';
  requestAnimationFrame(anim);
})();

// ---- TEAM CARD TILT ----
document.querySelectorAll('.team-card').forEach(function (card) {
  card.addEventListener('mousemove', function (e) {
    var r = card.getBoundingClientRect();
    var x = (e.clientX - r.left) / r.width  - 0.5;
    var y = (e.clientY - r.top)  / r.height - 0.5;
    card.style.transform = 'translateY(-8px) rotateY(' + (x * 8) + 'deg) rotateX(' + (-y * 6) + 'deg)';
  });
  card.addEventListener('mouseleave', function () { card.style.transform = ''; });
});

// ---- VIDEO FALLBACK ----
var heroVideo = document.getElementById('heroVideo');
if (heroVideo) {
  // 'error' fires on the active source — listen on the video element itself
  heroVideo.addEventListener('error', function () {
    // Only apply fallback if ALL sources have failed (no currentSrc loaded)
    if (!heroVideo.currentSrc || heroVideo.error) {
      heroVideo.parentElement.style.background = 'linear-gradient(135deg,#0a0a0a 0%,#1a1507 50%,#0a0a0a 100%)';
      heroVideo.style.display = 'none';
    }
  }, true);  // capture phase to catch source errors
}
