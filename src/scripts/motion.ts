import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let ctx: gsap.Context | null = null;

export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function initPageMotion(): void {
  ctx?.revert();
  ctx = null;

  const root = document.documentElement;
  if (prefersReducedMotion()) {
    root.classList.add('motion-off');
    return;
  }
  root.classList.remove('motion-off');

  ctx = gsap.context(() => {
    const hero = document.querySelector('[data-hero]');
    if (hero) {
      const els = gsap.utils.toArray<HTMLElement>('[data-hero] [data-hero-el]');
      if (els.length) {
        gsap.fromTo(
          els,
          { autoAlpha: 0, y: 26 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.1,
            delay: 0.08,
          },
        );
      }
      const shapes = gsap.utils.toArray<HTMLElement>('[data-hero] [data-hero-shape]');
      if (shapes.length) {
        gsap.fromTo(
          shapes,
          { autoAlpha: 0, scale: 0.55 },
          {
            autoAlpha: 1,
            scale: 1,
            duration: 1.1,
            ease: 'expo.out',
            stagger: 0.14,
          },
        );
      }
    }

    gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
      const isStagger = el.getAttribute('data-reveal') === 'stagger';
      const targets: Element[] = isStagger ? Array.from(el.children) : [el];
      gsap.fromTo(
        targets,
        { autoAlpha: 0, y: 26 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.75,
          ease: 'power2.out',
          stagger: isStagger ? 0.08 : 0,
          scrollTrigger: {
            trigger: el,
            start: 'top 86%',
            once: true,
          },
        },
      );
    });
  }, document.body);

  requestAnimationFrame(() => ScrollTrigger.refresh());
}
