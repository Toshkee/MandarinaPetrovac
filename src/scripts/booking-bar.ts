/**
 * Mobile booking bar: appears once the hero CTA has scrolled out of view,
 * hides again over the final booking section and the footer.
 */
const bar = document.querySelector<HTMLElement>('[data-booking-bar]');
const heroCta = document.querySelector<HTMLElement>('[data-hero-cta]');
const stops = document.querySelectorAll<HTMLElement>('[data-booking-bar-stop]');

if (bar && heroCta && 'IntersectionObserver' in window) {
  let pastHero = false;
  const stopped = new Set<Element>();

  const update = (): void => {
    bar.classList.toggle('is-visible', pastHero && stopped.size === 0);
  };

  new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        pastHero = !entry.isIntersecting && entry.boundingClientRect.top < 0;
      }
      update();
    },
    { threshold: 0 },
  ).observe(heroCta);

  if (stops.length) {
    const stopObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) stopped.add(entry.target);
          else stopped.delete(entry.target);
        }
        update();
      },
      { threshold: 0 },
    );
    stops.forEach((el) => stopObserver.observe(el));
  }
}

export {};
