'use client';

import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Download, Smartphone, Check, Sparkles, HelpCircle } from 'lucide-react';
import { usePWAInstall } from '@/lib/usePWAInstall';
import { APKGuideModal } from './APKGuideModal';
import { useAppTheme } from '@/lib/theme';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showGuide, setShowGuide] = useState(false);
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const { isDark } = useAppTheme();

  const handleInstallClick = async () => {
    if (isInstallable) {
      const installed = await install();
      if (!installed) {
        setShowGuide(true);
      }
    } else if (isIOS) {
      setShowIOSGuide(true);
    } else {
      setShowGuide(true);
    }
  };

  return (
    <>
      <div className="flex items-center gap-1.5">
        <button
          id="pwa-install-header-btn"
          onClick={handleInstallClick}
          className={`p-2 rounded-xl transition-all cursor-pointer shadow-xs flex items-center justify-center ${
            isDark
              ? 'bg-[#0c222e] hover:bg-[#1a0a0d] text-red-400 border border-red-800/60'
              : 'bg-rose-50 hover:bg-rose-100 text-red-600 border border-rose-200'
          }`}
          title={isInstalled ? 'App Installed' : 'Install App / APK'}
        >
          {isInstalled ? (
            <Check className="w-4 h-4 text-emerald-500" />
          ) : (
            <Smartphone className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* APK & Android Setup Guide Modal */}
      <APKGuideModal
        isOpen={showGuide}
        onClose={() => setShowGuide(false)}
      />

      {/* iOS Safari Guided Install Sheet */}
      {showIOSGuide && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/75 p-4 backdrop-blur-xs">
          <div className={`w-full max-w-sm rounded-2xl p-5 shadow-2xl border ${
            isDark ? 'bg-[#15070a] border-rose-900/60 text-white' : 'bg-white border-rose-100 text-slate-900'
          }`}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-red-500" />
                <span>Install on iPhone / iPad</span>
              </h3>
              <button
                onClick={() => setShowIOSGuide(false)}
                className="text-xs text-slate-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              1. Tap the <strong>Share</strong> button (box with upward arrow) at the bottom of Safari.<br />
              2. Scroll down in the options and tap <strong>&quot;Add to Home Screen&quot;</strong>.<br />
              3. Tap <strong>&quot;Add&quot;</strong> in the top right corner.
            </p>
            <button
              onClick={() => setShowIOSGuide(false)}
              className="w-full py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold cursor-pointer transition-colors"
            >
              Done
            </button>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};
