import { useEffect, type RefObject } from 'react';

/**
 * Auto-advancing horizontal carousel for mobile (no DOM cloning).
 * Activates only when viewport ≤ breakpoint.
 * Pauses on user touch for 8s.
 *
 * Behaviour: each tick advances by one card width with smooth scroll.
 * When already at (or past) the end, smoothly scrolls back to start.
 * Both transitions use `behavior: 'smooth'`, so the wrap-around is a
 * visible-but-soft scroll back to the first card.
 */
export function useAutoCarousel(
  ref: RefObject<HTMLElement | null>,
  intervalMs = 5000,
  breakpoint = 720,
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof window.matchMedia !== 'function') return;

    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
    let intervalId: number | null = null;
    let paused = false;
    let resumeId: number | null = null;

    const stepWidth = () => {
      const first = el.children[0] as HTMLElement | undefined;
      if (!first) return 0;
      const gap = parseInt(getComputedStyle(el).columnGap || '0', 10) || 12;
      return first.offsetWidth + gap;
    };

    const tick = () => {
      if (paused || el.children.length === 0) return;
      const step = stepWidth();
      if (!step) return;

      const maxScroll = el.scrollWidth - el.clientWidth;
      const atEnd = el.scrollLeft + step >= maxScroll - 4;

      if (atEnd) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        el.scrollBy({ left: step, behavior: 'smooth' });
      }
    };

    const start = () => {
      if (intervalId !== null) return;
      el.scrollLeft = 0;
      intervalId = window.setInterval(tick, intervalMs);
    };
    const stop = () => {
      if (intervalId !== null) {
        window.clearInterval(intervalId);
        intervalId = null;
      }
      el.scrollLeft = 0;
    };

    const onMQ = () => {
      if (mq.matches) start();
      else stop();
    };

    const onTouch = () => {
      paused = true;
      if (resumeId !== null) window.clearTimeout(resumeId);
      resumeId = window.setTimeout(() => { paused = false; }, 8000);
    };

    onMQ();
    mq.addEventListener('change', onMQ);
    el.addEventListener('touchstart', onTouch, { passive: true });
    el.addEventListener('pointerdown', onTouch, { passive: true });

    return () => {
      stop();
      mq.removeEventListener('change', onMQ);
      el.removeEventListener('touchstart', onTouch);
      el.removeEventListener('pointerdown', onTouch);
      if (resumeId !== null) window.clearTimeout(resumeId);
    };
  }, [ref, intervalMs, breakpoint]);
}
