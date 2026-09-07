/**
 * Sona UI Magnetic Button's distance falloff, adapted to native links.
 * The label moves inside a fixed hit area. Touch and reduced motion stay still.
 * Source: https://sonaui.com/r/magnetic-button.json
 */
const motionAllowed = window.matchMedia('(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)');

document.querySelectorAll<HTMLAnchorElement>('[data-magnetic]').forEach((link) => {
  const reset = () => {
    link.style.removeProperty('--magnetic-x');
    link.style.removeProperty('--magnetic-y');
  };

  link.addEventListener('pointermove', (event) => {
    if (!motionAllowed.matches || event.pointerType !== 'mouse') return;
    const rect = link.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    const range = Math.max(1, rect.width / 2);
    const falloff = Math.max(0, 1 - Math.hypot(x, y) / range);
    link.style.setProperty('--magnetic-x', `${Math.max(-4, Math.min(4, x * 0.15 * falloff))}px`);
    link.style.setProperty('--magnetic-y', `${Math.max(-3, Math.min(3, y * 0.15 * falloff))}px`);
  });

  link.addEventListener('pointerleave', reset);
  link.addEventListener('pointercancel', reset);
  link.addEventListener('blur', reset);
  motionAllowed.addEventListener('change', reset);
});

export {};
