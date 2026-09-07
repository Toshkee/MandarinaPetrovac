/** Mobile navigation: toggle button, Escape, outside click, closes on link use. */
const header = document.querySelector<HTMLElement>('[data-header]');
const toggle = header?.querySelector<HTMLButtonElement>('[data-menu-toggle]');
const nav = document.getElementById('site-nav');

if (header && toggle && nav) {
  const desktop = window.matchMedia('(min-width: 64em)');

  const isOpen = (): boolean => toggle.getAttribute('aria-expanded') === 'true';

  const setOpen = (open: boolean): void => {
    toggle.setAttribute('aria-expanded', String(open));
    header.classList.toggle('is-open', open);
    document.documentElement.classList.toggle('menu-open', open && !desktop.matches);
  };

  toggle.addEventListener('click', () => setOpen(!isOpen()));

  nav.addEventListener('click', (event) => {
    if ((event.target as HTMLElement).closest('a')) setOpen(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isOpen()) {
      setOpen(false);
      toggle.focus();
    }
  });

  document.addEventListener('click', (event) => {
    if (isOpen() && !header.contains(event.target as Node)) setOpen(false);
  });

  desktop.addEventListener('change', (event) => {
    if (event.matches) setOpen(false);
  });
}

export {};
