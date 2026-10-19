import { initPageMotion, prefersReducedMotion } from './motion';

let pageLoadFired = false;

function closeMenu(): void {
  const toggle = document.querySelector<HTMLElement>('[data-menu-toggle]');
  const nav = document.querySelector<HTMLElement>('[data-mobile-nav]');
  if (toggle) {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', '打开菜单');
  }
  nav?.classList.add('hidden');
}

function toggleMenu(toggle: HTMLElement): void {
  const nav = document.querySelector<HTMLElement>('[data-mobile-nav]');
  const isOpen = toggle.getAttribute('aria-expanded') === 'true';
  if (isOpen) {
    closeMenu();
  } else {
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', '关闭菜单');
    nav?.classList.remove('hidden');
  }
}

function applyFilter(btn: HTMLElement): void {
  const group = btn.closest<HTMLElement>('[data-filter-group]');
  if (!group) return;
  const scope = btn.dataset.scope ?? 'type';

  group.querySelectorAll<HTMLElement>('[data-filter]').forEach((b) => {
    if ((b.dataset.scope ?? 'type') !== scope) return;
    const active = b === btn;
    b.setAttribute('aria-pressed', String(active));
    b.classList.toggle('filter-active', active);
  });

  const filters: Record<string, string> = {};
  group
    .querySelectorAll<HTMLElement>('[data-filter][aria-pressed="true"]')
    .forEach((b) => {
      filters[b.dataset.scope ?? 'type'] = b.dataset.filter ?? 'all';
    });

  const items = document.querySelectorAll<HTMLElement>('[data-filter-item]');
  let visible = 0;
  items.forEach((item) => {
    let match = true;
    for (const [key, value] of Object.entries(filters)) {
      if (value === 'all') continue;
      if (item.dataset[key] !== value) {
        match = false;
        break;
      }
    }
    item.classList.toggle('filter-hidden', !match);
    if (match) {
      item.style.opacity = '1';
      visible += 1;
    }
  });

  const count = group.querySelector<HTMLElement>('[data-filter-count]');
  if (count) count.textContent = String(visible);
}

function copyTarget(btn: HTMLElement): void {
  const targetSel = btn.dataset.copyTarget;
  if (!targetSel) return;
  const source = document.querySelector<HTMLElement>(targetSel);
  if (!source) return;
  const text = source.textContent ?? '';
  const done = () => {
    const label = btn.querySelector('[data-copy-label]');
    if (label) {
      const original = label.textContent;
      label.textContent = '已复制';
      window.setTimeout(() => {
        label.textContent = original;
      }, 1800);
    }
  };
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(text).then(done).catch(done);
  } else {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
    } catch {
      /* no-op */
    }
    document.body.removeChild(ta);
    done();
  }
}

function updateScrollUI(): void {
  const y = window.scrollY;
  const topBtn = document.querySelector<HTMLElement>('[data-back-to-top]');
  topBtn?.classList.toggle('is-visible', y > 420);
  const bar = document.querySelector<HTMLElement>('[data-reading-progress]');
  if (bar) {
    const doc = document.documentElement;
    const total = doc.scrollHeight - doc.clientHeight;
    const p = total > 0 ? Math.min(doc.scrollTop / total, 1) : 0;
    bar.style.transform = `scaleX(${p})`;
  }
}

function onPageLoad(): void {
  closeMenu();
  initPageMotion();
  updateScrollUI();
}

export function boot(): void {
  document.addEventListener('astro:page-load', () => {
    pageLoadFired = true;
    onPageLoad();
  });

  window.addEventListener(
    'load',
    () => {
      if (!pageLoadFired) onPageLoad();
    },
    { once: true },
  );

  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;

    const toggle = target.closest<HTMLElement>('[data-menu-toggle]');
    if (toggle) {
      toggleMenu(toggle);
      return;
    }

    const filter = target.closest<HTMLElement>('[data-filter]');
    if (filter) {
      applyFilter(filter);
      return;
    }

    const copy = target.closest<HTMLElement>('[data-copy]');
    if (copy) {
      copyTarget(copy);
      return;
    }

    const top = target.closest<HTMLElement>('[data-footer-top]');
    if (top) {
      event.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion() ? 'auto' : 'smooth',
      });
      return;
    }

    const toggleEl = document.querySelector<HTMLElement>('[data-menu-toggle]');
    const navEl = document.querySelector<HTMLElement>('[data-mobile-nav]');
    if (
      toggleEl?.getAttribute('aria-expanded') === 'true' &&
      navEl &&
      !navEl.contains(target) &&
      !toggleEl.contains(target)
    ) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });

  window.addEventListener('scroll', updateScrollUI, { passive: true });
}
