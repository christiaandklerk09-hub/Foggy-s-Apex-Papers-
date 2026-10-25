'use client';

import { useSyncExternalStore, useCallback } from 'react';

export type AppTheme = 'light' | 'dark';

export function getInitialTheme(): AppTheme {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('cpr_app_theme');
    if (saved === 'dark' || saved === 'light') {
      return saved;
    }
  }
  return 'light';
}

function subscribe(callback: () => void) {
  if (typeof window === 'undefined') {
    return () => {};
  }
  window.addEventListener('cpr_theme_change', callback);
  window.addEventListener('storage', callback);
  return () => {
    window.removeEventListener('cpr_theme_change', callback);
    window.removeEventListener('storage', callback);
  };
}

function getSnapshot(): AppTheme {
  if (typeof window === 'undefined') return 'light';
  const saved = localStorage.getItem('cpr_app_theme');
  return saved === 'dark' || saved === 'light' ? saved : 'light';
}

function getServerSnapshot(): AppTheme {
  return 'light';
}

export function applyThemeToDOM(theme: AppTheme) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('cpr_app_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
    window.dispatchEvent(new CustomEvent('cpr_theme_change', { detail: theme }));
  }
}

export function useAppTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggleTheme = useCallback(() => {
    const next: AppTheme = theme === 'light' ? 'dark' : 'light';
    applyThemeToDOM(next);
  }, [theme]);

  const setTheme = useCallback((next: AppTheme) => {
    applyThemeToDOM(next);
  }, []);

  return { theme, toggleTheme, setTheme, isDark: theme === 'dark' };
}

