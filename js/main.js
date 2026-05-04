/* ============================================
   FOUNDERA — Main JS
   ============================================ */

/* ============================================
   TAB SWITCHER — What We Do
   ============================================ */
(function initTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');
  if (!tabBtns.length) return;

  tabBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const target = btn.getAttribute('data-tab');

      // Update buttons
      tabBtns.forEach(function (b) { b.classList.remove('is-active'); });
      btn.classList.add('is-active');

      // Update panels — re-trigger animation by replacing with clone
      tabPanels.forEach(function (panel) {
        if (panel.getAttribute('data-panel') === target) {
          panel.classList.add('is-active');
        } else {
          panel.classList.remove('is-active');
        }
      });
    });
  });
})();

/* ============================================
   DRAG-TO-SCROLL — Free Resources strip
   ============================================ */
(function initDragScroll() {
  const wrapper = document.querySelector('.resources-scroll-wrapper');
  if (!wrapper) return;

  let isDown = false;
  let startX;
  let scrollLeft;

  wrapper.addEventListener('mousedown', function (e) {
    isDown = true;
    wrapper.style.cursor = 'grabbing';
    startX = e.pageX - wrapper.offsetLeft;
    scrollLeft = wrapper.scrollLeft;
  });

  wrapper.addEventListener('mouseleave', function () {
    isDown = false;
    wrapper.style.cursor = 'grab';
  });

  wrapper.addEventListener('mouseup', function () {
    isDown = false;
    wrapper.style.cursor = 'grab';
  });

  wrapper.addEventListener('mousemove', function (e) {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - wrapper.offsetLeft;
    const walk = (x - startX) * 1.5;
    wrapper.scrollLeft = scrollLeft - walk;
  });
})();

/* ============================================
   NAV: Hide on scroll down, reappear on scroll up
   ============================================ */
(function initNav() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  let lastScrollY = 0;
  let ticking = false;

  function updateNav() {
    const currentScrollY = window.scrollY;

    // Add scrolled class for border
    if (currentScrollY > 10) {
      nav.classList.add('is-scrolled');
    } else {
      nav.classList.remove('is-scrolled');
    }

    // Hide/show based on scroll direction
    if (currentScrollY > lastScrollY && currentScrollY > 80) {
      nav.classList.add('is-hidden');
    } else {
      nav.classList.remove('is-hidden');
    }

    lastScrollY = currentScrollY;
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(updateNav);
      ticking = true;
    }
  }, { passive: true });
})();

/* ============================================
   SCROLL REVEAL — fade up on intersection
   ============================================ */
(function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          // Unobserve after reveal — only animate once
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  elements.forEach(function (el) {
    observer.observe(el);
  });
})();
