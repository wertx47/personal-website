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
