/**
 * Optional hero loop. Loads the video only when motion and data conditions allow,
 * keeps the poster on any failure, pauses when offscreen or hidden and exposes a
 * pause/play control. One source is attached; nothing else is downloaded.
 */
interface NetworkInformationLike {
  saveData?: boolean;
  effectiveType?: string;
}

const wrapper = document.querySelector<HTMLElement>('[data-hero-video]');
const video = wrapper?.querySelector<HTMLVideoElement>('video');
const toggle = wrapper?.querySelector<HTMLButtonElement>('[data-video-toggle]');
const labelPause = wrapper?.querySelector<HTMLElement>('[data-video-label-pause]');
const labelPlay = wrapper?.querySelector<HTMLElement>('[data-video-label-play]');

if (wrapper && video && toggle && labelPause && labelPlay) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const connection = (navigator as Navigator & { connection?: NetworkInformationLike }).connection;
  const slowOrSaving =
    connection?.saveData === true || /(^|\D)2g$/.test(connection?.effectiveType ?? '');

  const setState = (state: 'poster' | 'playing' | 'paused'): void => {
    wrapper.dataset.videoState = state;
    const playing = state === 'playing';
    labelPause.hidden = !playing;
    labelPlay.hidden = playing;
    toggle.setAttribute('aria-pressed', String(!playing));
  };

  if (reducedMotion || slowOrSaving || !video.canPlayType('video/mp4')) {
    setState('poster');
  } else {
    let userPaused = false;
    let inView = true;

    const play = (): void => {
      video
        .play()
        .then(() => {
          setState('playing');
          toggle.hidden = false;
        })
        .catch(() => setState('poster'));
    };

    wrapper.querySelectorAll<HTMLSourceElement>('source[data-src]').forEach((source) => {
      source.src = source.dataset.src ?? '';
    });
    video.addEventListener('canplay', () => play(), { once: true });
    video.addEventListener('error', () => setState('poster'), { once: true });
    video.load();

    toggle.addEventListener('click', () => {
      if (video.paused) {
        userPaused = false;
        play();
      } else {
        userPaused = true;
        video.pause();
        setState('paused');
      }
    });

    new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          inView = entry.isIntersecting;
        }
        if (!inView) video.pause();
        else if (!userPaused && !document.hidden) play();
      },
      { threshold: 0.2 },
    ).observe(wrapper);

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) video.pause();
      else if (inView && !userPaused) play();
    });
  }
}

export {};
