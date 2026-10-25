'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

function checkIsStandalone(): boolean {
  if (typeof window === 'undefined') return false;
  const isMediaStandalone = window.matchMedia('(display-mode: standalone)').matches;
  const isNavStandalone = (window.navigator as any).standalone === true;
  const isAndroidApp = typeof document !== 'undefined' && !!document.referrer && document.referrer.includes('android-app://');
  return Boolean(isMediaStandalone || isNavStandalone || isAndroidApp);
}

function checkIsIOS(): boolean {
  if (typeof window === 'undefined') return false;
  const userAgent = window.navigator.userAgent.toLowerCase();
  return /iphone|ipad|ipod/.test(userAgent);
}

function subscribeNoop() {
  return () => {};
}

function subscribeStandalone(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  const media = window.matchMedia('(display-mode: standalone)');
  media.addEventListener('change', callback);
  return () => media.removeEventListener('change', callback);
}

export function usePWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [installedManually, setInstalledManually] = useState(false);
  
  const isStandalone = useSyncExternalStore(
    subscribeStandalone,
    checkIsStandalone,
    () => false
  );

  const isIOS = useSyncExternalStore(
    subscribeNoop,
    checkIsIOS,
    () => false
  );

  useEffect(() => {
    // 1. Register Service Worker for offline capability
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('SHO Quiz Service Worker active:', registration.scope);
        })
        .catch((err) => {
          console.log('SHO Quiz Service Worker registration:', err);
        });
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setInstalledManually(true);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const install = async (): Promise<boolean> => {
    if (!deferredPrompt) return false;
    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setInstalledManually(true);
        setDeferredPrompt(null);
        return true;
      }
    } catch (err) {
      console.warn('Install prompt error:', err);
    }
    return false;
  };

  return {
    isInstallable: !!deferredPrompt,
    isInstalled: isStandalone || installedManually,
    isIOS,
    install,
  };
}

function subscribeOnline(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener('online', callback);
  window.addEventListener('offline', callback);
  return () => {
    window.removeEventListener('online', callback);
    window.removeEventListener('offline', callback);
  };
}

function getOnlineSnapshot(): boolean {
  return typeof navigator !== 'undefined' ? navigator.onLine : true;
}

export function useOnlineStatus(): boolean {
  return useSyncExternalStore(
    subscribeOnline,
    getOnlineSnapshot,
    () => true
  );
}
