/**
 * Gallery: "show all" expansion and an accessible lightbox built on <dialog>.
 * Keyboard: Escape closes, arrows navigate, Tab is trapped inside the dialog.
 * Touch: horizontal swipe navigates. Focus returns to the opening thumbnail.
 */

interface LightboxItem {
  src: string;
  srcset: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
}

const grid = document.querySelector<HTMLElement>('[data-gallery]');
const moreButton = document.querySelector<HTMLButtonElement>('[data-gallery-more]');

if (grid && moreButton) {
  moreButton.addEventListener('click', () => {
    grid.classList.add('is-expanded');
    moreButton.hidden = true;
    grid.querySelector<HTMLAnchorElement>('[data-gallery-extra] a')?.focus();
  });
}

const dialog = document.getElementById('lightbox') as HTMLDialogElement | null;
const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('[data-lightbox-item]'));

if (dialog && links.length > 0 && typeof dialog.showModal === 'function') {
  const image = dialog.querySelector<HTMLImageElement>('[data-lb-image]');
  const caption = dialog.querySelector<HTMLElement>('[data-lb-caption]');
  const counter = dialog.querySelector<HTMLElement>('[data-lb-counter]');
  const closeButton = dialog.querySelector<HTMLButtonElement>('[data-lb-close]');
  const prevButton = dialog.querySelector<HTMLButtonElement>('[data-lb-prev]');
  const nextButton = dialog.querySelector<HTMLButtonElement>('[data-lb-next]');
  const ofWord = dialog.dataset.of ?? '/';

  if (image && caption && counter && closeButton && prevButton && nextButton) {
    const items: LightboxItem[] = links.map((link) => ({
      src: link.href,
      srcset: link.dataset.srcset ?? '',
      width: Number(link.dataset.width) || 0,
      height: Number(link.dataset.height) || 0,
      alt: link.dataset.alt ?? '',
      caption: link.dataset.caption ?? '',
    }));

    let index = 0;
    let opener: HTMLElement | null = null;
    const preloaded = new Set<string>();

    const preload = (i: number): void => {
      const item = items[(i + items.length) % items.length];
      if (!item || preloaded.has(item.src)) return;
      preloaded.add(item.src);
      const img = new Image();
      if (item.srcset) {
        img.srcset = item.srcset;
        img.sizes = '100vw';
      }
      img.src = item.src;
    };

    const show = (i: number): void => {
      index = (i + items.length) % items.length;
      const item = items[index];
      if (!item) return;
      image.srcset = item.srcset;
      image.src = item.src;
      if (item.width && item.height) {
        image.width = item.width;
        image.height = item.height;
      }
      image.alt = item.alt;
      caption.textContent = item.caption;
      counter.textContent = `${index + 1} ${ofWord} ${items.length}`;
      preload(index + 1);
      preload(index - 1);
    };

    const open = (i: number, trigger: HTMLElement): void => {
      opener = trigger;
      show(i);
      dialog.showModal();
      document.documentElement.classList.add('lightbox-open');
      closeButton.focus();
    };

    dialog.addEventListener('close', () => {
      document.documentElement.classList.remove('lightbox-open');
      image.removeAttribute('src');
      image.removeAttribute('srcset');
      opener?.focus();
      opener = null;
    });

    links.forEach((link, i) => {
      link.addEventListener('click', (event) => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        open(i, link);
      });
    });

    closeButton.addEventListener('click', () => dialog.close());
    prevButton.addEventListener('click', () => show(index - 1));
    nextButton.addEventListener('click', () => show(index + 1));

    // Click on the dark backdrop (outside the figure and controls) closes.
    dialog.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      if (target === dialog || target.classList.contains('lightbox__figure')) dialog.close();
    });

    dialog.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        show(index + 1);
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        show(index - 1);
      } else if (event.key === 'Tab') {
        const focusable = [closeButton, prevButton, nextButton];
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (!first || !last) return;
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    });

    // Swipe navigation on touch and pen input.
    let startX = 0;
    let startY = 0;
    let tracking = false;

    dialog.addEventListener('pointerdown', (event) => {
      if (event.pointerType === 'mouse') return;
      startX = event.clientX;
      startY = event.clientY;
      tracking = true;
    });

    dialog.addEventListener('pointerup', (event) => {
      if (!tracking) return;
      tracking = false;
      const dx = event.clientX - startX;
      const dy = event.clientY - startY;
      if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.5) {
        show(dx < 0 ? index + 1 : index - 1);
      }
    });

    dialog.addEventListener('pointercancel', () => {
      tracking = false;
    });
  }
}

export {};
