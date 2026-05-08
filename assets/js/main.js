/* =============================================
   IMAGING CONNECTION — MAIN JS
   ============================================= */

/* --- Nav scroll effect --- */
(function () {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  function updateNav() {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();
})();

/* --- Mobile nav toggle --- */
(function () {
  const hamburger = document.querySelector('.nav__hamburger');
  const mobileNav = document.querySelector('.nav__mobile');
  if (!hamburger || !mobileNav) return;

  hamburger.addEventListener('click', function () {
    const open = mobileNav.classList.toggle('open');
    hamburger.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  // Close on link click
  mobileNav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      mobileNav.classList.remove('open');
      hamburger.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
})();

/* --- Scroll reveal (Intersection Observer) --- */
(function () {
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (!revealEls.length) return;

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -48px 0px' }
  );

  revealEls.forEach(function (el) {
    observer.observe(el);
  });
})();

/* --- Stats count-up animation --- */
(function () {
  const statNums = document.querySelectorAll('.stat-num[data-target]');
  if (!statNums.length) return;

  function animateCount(el) {
    const target = parseFloat(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const isDecimal = String(target).includes('.');
    const duration = 1600;
    const start = performance.now();

    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;
      el.textContent = prefix + (isDecimal ? current.toFixed(1) : Math.round(current)) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  statNums.forEach(function (el) {
    observer.observe(el);
  });
})();

/* --- Equipment filter --- */
(function () {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const eqCards = document.querySelectorAll('.eq-card[data-category]');
  if (!filterBtns.length || !eqCards.length) return;

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const filter = btn.dataset.filter;

      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      eqCards.forEach(function (card) {
        if (filter === 'all' || card.dataset.category === filter) {
          card.removeAttribute('data-hidden');
          card.style.display = '';
        } else {
          card.setAttribute('data-hidden', 'true');
          card.style.display = 'none';
        }
      });
    });
  });
})();

/* --- Animated dot grid (canvas) --- */
(function () {
  const canvas = document.getElementById('dotGrid');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let animFrame;
  let dots = [];
  const DOT_SPACING = 36;
  const DOT_RADIUS  = 1.5;

  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    buildDots();
  }

  function buildDots() {
    dots = [];
    const cols = Math.ceil(canvas.width  / DOT_SPACING) + 1;
    const rows = Math.ceil(canvas.height / DOT_SPACING) + 1;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        dots.push({
          x: c * DOT_SPACING,
          y: r * DOT_SPACING,
          phase: Math.random() * Math.PI * 2,
          speed: 0.3 + Math.random() * 0.4,
        });
      }
    }
  }

  let mouseX = canvas.width / 2;
  let mouseY = canvas.height / 2;

  document.addEventListener('mousemove', function (e) {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
  });

  function draw(time) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    dots.forEach(function (dot) {
      const dx   = dot.x - mouseX;
      const dy   = dot.y - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxR = 200;
      const proximity = Math.max(0, 1 - dist / maxR);

      const pulse = Math.sin(time * 0.001 * dot.speed + dot.phase) * 0.5 + 0.5;
      const alpha = 0.18 + pulse * 0.14 + proximity * 0.45;

      ctx.beginPath();
      ctx.arc(dot.x, dot.y, DOT_RADIUS + proximity * 1.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(26, 107, 255, ${alpha})`;
      ctx.fill();
    });

    animFrame = requestAnimationFrame(draw);
  }

  // Use ResizeObserver if available
  if (window.ResizeObserver) {
    new ResizeObserver(resize).observe(canvas);
  } else {
    window.addEventListener('resize', resize);
  }

  resize();
  animFrame = requestAnimationFrame(draw);
})();

/* --- Active nav link --- */
(function () {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__links a, .nav__mobile a').forEach(function (a) {
    const href = a.getAttribute('href');
    if (href && (href === path || href === './' + path || (path === '' && href === 'index.html'))) {
      a.classList.add('active');
    }
  });
})();
