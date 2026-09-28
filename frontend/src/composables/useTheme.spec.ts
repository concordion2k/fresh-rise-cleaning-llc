import { describe, it, expect, beforeEach, vi } from 'vitest';

// useTheme keeps module-level state (one theme per page), so each test loads a fresh copy.
async function loadTheme() {
  vi.resetModules();
  const mod = await import('@/composables/useTheme');
  return mod.useTheme();
}

describe('useTheme', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  it('defaults to light (no saved choice, no OS hint) and reflects it on <html>', async () => {
    const theme = await loadTheme();
    expect(theme.current.value).toBe('light');
    expect(document.documentElement.dataset.theme).toBe('light');
  });

  it('toggles, persists the choice, and updates <html>', async () => {
    const theme = await loadTheme();
    theme.toggle();
    expect(theme.current.value).toBe('dark');
    expect(localStorage.getItem('theme')).toBe('dark');
    expect(document.documentElement.dataset.theme).toBe('dark');

    theme.toggle();
    expect(theme.current.value).toBe('light');
    expect(localStorage.getItem('theme')).toBe('light');
  });

  it('honours a previously saved preference on load', async () => {
    localStorage.setItem('theme', 'dark');
    const theme = await loadTheme();
    expect(theme.current.value).toBe('dark');
    expect(document.documentElement.dataset.theme).toBe('dark');
  });

  it('ignores a corrupt saved value', async () => {
    localStorage.setItem('theme', 'purple');
    const theme = await loadTheme();
    expect(theme.current.value).toBe('light');
  });
});
