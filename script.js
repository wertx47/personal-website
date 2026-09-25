// ==========================================================================
// FAQ ACCORDION
// Единственная интерактивность, которая реально нужна на этом этапе:
// раскрытие/закрытие ответа. Высота анимируется чистым CSS
// (grid-template-rows), поэтому JS только переключает состояние.
// ==========================================================================

document.querySelectorAll('.faq-question').forEach((button) => {
  button.addEventListener('click', () => {
    const item = button.closest('.faq-item');
    const isOpen = item.getAttribute('data-open') === 'true';

    item.setAttribute('data-open', String(!isOpen));
    button.setAttribute('aria-expanded', String(!isOpen));
  });
});


// ==========================================================================
// SERVICES — РАСКРЫТИЕ КАРТОЧЕК 01 И 02
// Та же механика, что и в FAQ: переключение data-open на строке услуги,
// высота анимируется CSS (grid-template-rows). Карточек 03 и 04 это
// не касается — у них нет .service-toggle.
// ==========================================================================

document.querySelectorAll('.service-toggle').forEach((button) => {
  button.addEventListener('click', () => {
    const row = button.closest('.service-row--expandable');
    const isOpen = row.getAttribute('data-open') === 'true';

    row.setAttribute('data-open', String(!isOpen));
    button.setAttribute('aria-expanded', String(!isOpen));
  });
});


// ==========================================================================
// WHY ME — HEADING REVEAL
// Заголовок появляется один раз при входе секции во вьюпорт (тайминг
// строк задан через transition-delay в style.css).
// ==========================================================================

const whyMeSection = document.querySelector('.why-me');

if (whyMeSection && 'IntersectionObserver' in window) {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    whyMeSection.classList.add('is-visible');
  } else {
    const whyMeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            whyMeSection.classList.add('is-visible');
            whyMeObserver.unobserve(whyMeSection);
          }
        });
      },
      { threshold: 0.15 }
    );

    whyMeObserver.observe(whyMeSection);
  }
} else if (whyMeSection) {
  whyMeSection.classList.add('is-visible');
}


// ==========================================================================
// MANIFESTO REVEAL
// Текст на фото-блоке "проявляется", когда секция входит во вьюпорт —
// усиливает метафору тумана, который рассеивается. Один раз, без
// повторного скрытия при скролле назад, и без анимации при
// prefers-reduced-motion.
// ==========================================================================

const manifesto = document.querySelector('.manifesto');

if (manifesto && 'IntersectionObserver' in window) {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    manifesto.classList.add('is-visible');
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            manifesto.classList.add('is-visible');
            observer.unobserve(manifesto);
          }
        });
      },
      { threshold: 0.35 }
    );

    observer.observe(manifesto);
  }
} else if (manifesto) {
  manifesto.classList.add('is-visible');
}


// ==========================================================================
// SERVICES STAGGERED REVEAL
// Строки Editorial Service List проявляются по очереди (01 → 02 → 03 → 04)
// при входе секции во вьюпорт. Порядок задержки — чистым CSS
// (nth-child + transition-delay в style.css), здесь только переключение
// класса, один раз, без анимации при prefers-reduced-motion.
// ==========================================================================

const servicesGrid = document.querySelector('.services-grid');

if (servicesGrid && 'IntersectionObserver' in window) {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    servicesGrid.classList.add('is-visible');
  } else {
    const servicesObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            servicesGrid.classList.add('is-visible');
            servicesObserver.unobserve(servicesGrid);
          }
        });
      },
      { threshold: 0.2 }
    );

    servicesObserver.observe(servicesGrid);
  }
} else if (servicesGrid) {
  servicesGrid.classList.add('is-visible');
}
