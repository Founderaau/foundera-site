/* ============================================
   FOUNDERA — Interactive Layer
   scripts.js — loaded on all pages
   ============================================ */

/* ─── 1. ROTATING QUOTES ──────────────────────────────────────────────────
   Shows a fresh quote on every page load, cycles every 9 s.
   Only activates when #heroQuote exists (home page hero).
   ──────────────────────────────────────────────────────────────────────── */
(function () {
  var el = document.getElementById('heroQuote');
  if (!el) return;

  var quotes = [
    "Every industry was disrupted by someone who was told they were too young.",
    "The meeting you need isn't on LinkedIn. It's in this room.",
    "You don't need permission to start.",
    "The network you build at 22 is the one that changes everything at 32.",
    "Ambition needs a room.",
    "Stop consuming. Start creating.",
    "Your first investor might be in this room.",
    "Move fast. Stay curious. Build loud.",
    "The gap between idea and execution — that's where Foundera lives.",
    "You're not behind. You're early.",
    "Capability over connections.",
    "Great companies were built by people no one had heard of yet.",
    "The room changes everything."
  ];

  var idx = Math.floor(Math.random() * quotes.length);

  function setQuote(i, animate) {
    if (animate) {
      el.style.opacity = '0';
      setTimeout(function () {
        el.textContent = '\u201C' + quotes[i] + '\u201D';
        el.style.opacity = '1';
      }, 550);
    } else {
      el.textContent = '\u201C' + quotes[i] + '\u201D';
    }
  }

  /* Fade in after page settles */
  setTimeout(function () {
    setQuote(idx, false);
    el.style.opacity = '1';
  }, 1400);

  /* Cycle */
  setInterval(function () {
    idx = (idx + 1) % quotes.length;
    setQuote(idx, true);
  }, 9000);
})();


/* ─── 2. CUSTOM CURSOR ────────────────────────────────────────────────────
   Small dot that tracks precisely + a lagging ring that expands on hover.
   Skipped on touch/mobile devices.
   ──────────────────────────────────────────────────────────────────────── */
(function () {
  /* Skip touch devices or narrow viewports */
  if (window.matchMedia('(hover: none)').matches) return;
  if (window.innerWidth < 900) return;

  var dot  = document.querySelector('.c-dot');
  var ring = document.querySelector('.c-ring');
  if (!dot || !ring) return;

  /* Hide native cursor */
  document.body.classList.add('custom-cursor');

  var mx = -300, my = -300;
  var rx = -300, ry = -300;

  document.addEventListener('mousemove', function (e) {
    mx = e.clientX;
    my = e.clientY;
  }, { passive: true });

  document.addEventListener('mouseleave', function () {
    dot.style.opacity  = '0';
    ring.style.opacity = '0';
  });
  document.addEventListener('mouseenter', function () {
    dot.style.opacity  = '1';
    ring.style.opacity = '1';
  });

  /* rAF loop — dot snaps, ring lerps */
  (function loop() {
    rx += (mx - rx) * 0.11;
    ry += (my - ry) * 0.11;

    dot.style.left  = mx + 'px';
    dot.style.top   = my + 'px';
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';

    requestAnimationFrame(loop);
  })();

  /* Ring grows on interactive elements */
  var hoverSel = 'a, button, .card, .split-card, .resource-card, .pill, .tab-btn, input, textarea, select, label, .filter-pill, .event-row';
  document.querySelectorAll(hoverSel).forEach(function (el) {
    el.addEventListener('mouseenter', function () { ring.classList.add('hovering'); });
    el.addEventListener('mouseleave', function () { ring.classList.remove('hovering'); });
  });
})();


/* ─── 3. MAGNETIC BUTTONS ─────────────────────────────────────────────────
   CTA buttons follow the cursor slightly — springs back on leave.
   ──────────────────────────────────────────────────────────────────────── */
(function () {
  if (window.matchMedia('(hover: none)').matches) return;

  document.querySelectorAll('.btn').forEach(function (btn) {
    btn.addEventListener('mousemove', function (e) {
      var r = btn.getBoundingClientRect();
      var x = (e.clientX - r.left - r.width  / 2) * 0.24;
      var y = (e.clientY - r.top  - r.height / 2) * 0.24;
      btn.style.transform = 'translate(' + x + 'px,' + y + 'px) scale(1.04)';
    });

    btn.addEventListener('mouseleave', function () {
      /* Quick spring-back */
      btn.style.transition = 'transform 0.55s cubic-bezier(0.33,1,0.68,1), box-shadow 0.25s ease, background 0.25s ease, color 0.25s ease';
      btn.style.transform  = '';
      setTimeout(function () { btn.style.transition = ''; }, 560);
    });
  });
})();


/* ─── 4. CARD SPOTLIGHT GLOW ──────────────────────────────────────────────
   A subtle radial-gradient light follows the cursor inside each card,
   giving an Apple-style depth effect.
   ──────────────────────────────────────────────────────────────────────── */
(function () {
  if (window.matchMedia('(hover: none)').matches) return;

  document.querySelectorAll('.card, .split-card, .resource-card').forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      var r = card.getBoundingClientRect();
      card.style.setProperty('--glow-x', (e.clientX - r.left)  + 'px');
      card.style.setProperty('--glow-y', (e.clientY - r.top)   + 'px');
    });
  });
})();


/* ─── 5. HERO PARALLAX ────────────────────────────────────────────────────
   Hero headline and sub drift gently upward on scroll.
   Only fires when .hero-h1 exists (home page).
   ──────────────────────────────────────────────────────────────────────── */
(function () {
  var h1  = document.querySelector('.hero-h1');
  var sub = document.querySelector('.hero-sub');
  var eye = document.querySelector('.hero-eyebrow');
  var qt  = document.getElementById('heroQuote');
  if (!h1) return;

  var ticking = false;

  window.addEventListener('scroll', function () {
    if (ticking) return;
    requestAnimationFrame(function () {
      var y = window.scrollY;
      if (y <= window.innerHeight * 1.2) {
        if (eye) eye.style.transform = 'translateY(' + (y * 0.06) + 'px)';
        h1.style.transform           = 'translateY(' + (y * 0.13) + 'px)';
        if (sub) sub.style.transform = 'translateY(' + (y * 0.09) + 'px)';
        if (qt)  qt.style.transform  = 'translateY(' + (y * 0.07) + 'px)';
      }
      ticking = false;
    });
    ticking = true;
  }, { passive: true });
})();
