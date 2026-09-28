import { readonly, ref } from 'vue';

// Light/dark theme, shared app-wide. Follows the OS until the visitor picks one with the footer
// toggle; that choice is remembered. The inline script in index.html applies the same logic before
// first paint so there's no flash of the wrong theme — keep the two in sync.

export type Theme = 'light' | 'dark';
export const THEME_STORAGE_KEY = 'theme';

const media = () => window.matchMedia?.('(prefers-color-scheme: dark)');

function readSaved(): Theme | null {
  try {
    const v = localStorage.getItem(THEME_STORAGE_KEY);
    return v === 'light' || v === 'dark' ? v : null;
  } catch {
    return null; // storage blocked (private mode, disabled cookies)
  }
}

const saved = readSaved();
/** Whether the visitor has explicitly chosen a theme (vs. following the OS). */
let explicit = saved !== null;
const current = ref<Theme>(saved ?? (media()?.matches ? 'dark' : 'light'));

function apply(t: Theme) {
  current.value = t;
  document.documentElement.dataset.theme = t;
}

apply(current.value);

media()?.addEventListener('change', (e) => {
  if (!explicit) apply(e.matches ? 'dark' : 'light');
});

function toggle() {
  const next: Theme = current.value === 'dark' ? 'light' : 'dark';
  explicit = true;
  try {
    localStorage.setItem(THEME_STORAGE_KEY, next);
  } catch {
    // Not persisted, but still applied for this visit.
  }
  apply(next);
}

export function useTheme() {
  return { current: readonly(current), toggle };
}
