/** Subtle section reveals. Content is visible immediately without JS or with reduced motion. */
const targets = document.querySelectorAll<HTMLElement>('[data-reveal]');
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (targets.length) {
  if (reduced || !('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0.08 },
    );
    targets.forEach((el) => observer.observe(el));

    // Safety net: never leave content hidden if an observer callback never fires.
    window.setTimeout(() => targets.forEach((el) => el.classList.add('is-visible')), 4000);
  }
}

export {};
