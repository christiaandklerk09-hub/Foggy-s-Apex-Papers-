'use client';

import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'motion/react';
import { 
  Smartphone, 
  Download, 
  ExternalLink, 
  CheckCircle2, 
  Copy, 
  Check, 
  X, 
  Layers, 
  Sparkles,
  WifiOff
} from 'lucide-react';
import { useAppTheme } from '@/lib/theme';

interface APKGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  appUrl?: string;
}

export const APKGuideModal: React.FC<APKGuideModalProps> = ({
  isOpen,
  onClose,
  appUrl = typeof window !== 'undefined' ? window.location.origin : '',
}) => {
  const [copied, setCopied] = useState(false);
  const { isDark } = useAppTheme();

  if (!isOpen || typeof document === 'undefined') return null;

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(appUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className={`rounded-3xl border shadow-2xl max-w-lg w-full overflow-hidden flex flex-col my-auto ${
          isDark
            ? 'bg-[#120709] border-red-900/60 text-slate-100'
            : 'bg-white border-rose-100 text-slate-900 sunlit-card'
        }`}
      >
        {/* Header */}
        <div className={`p-4 sm:p-5 border-b flex items-center justify-between ${
          isDark ? 'border-red-900/50 bg-[#180a0e]' : 'border-rose-100 bg-rose-50/50'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-red-600 to-rose-500 text-white flex items-center justify-center shrink-0 shadow-xs">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Offline & Android APK Guide
              </h3>
              <p className={`text-xs ${isDark ? 'text-red-400' : 'text-rose-600'}`}>
                Install as a native standalone app or download signed APK
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`p-1.5 rounded-xl transition-colors cursor-pointer ${
              isDark ? 'hover:bg-[#0c2234] text-slate-400 hover:text-white' : 'hover:bg-slate-100 text-slate-500 hover:text-slate-900'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
          {/* Method 1: Instant Android Installation */}
          <div className={`p-4 rounded-2xl border space-y-2.5 ${
            isDark ? 'bg-[#180a0e]/80 border-red-900/60' : 'bg-emerald-50/60 border-emerald-200'
          }`}>
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-[10px]">
                1
              </span>
              <h4 className={`font-bold text-sm ${isDark ? 'text-emerald-400' : 'text-emerald-900'}`}>
                Instant Home Screen App (No APK download required!)
              </h4>
            </div>
            <p className={`${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              On Android Chrome or Samsung Internet, tap the <strong>&quot;Install App&quot;</strong> button or open browser menu <span className="font-bold">⋮ &gt; &quot;Add to Home screen&quot; / &quot;Install app&quot;</span>.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Full offline support, custom Apex Papers Operations app icon, fullscreen mode</span>
            </div>
          </div>

          {/* Method 2: Convert to Standalone APK via PWABuilder */}
          <div className={`p-4 rounded-2xl border space-y-3 ${
            isDark ? 'bg-[#180a0e]/80 border-red-900/60' : 'bg-rose-50/60 border-rose-200'
          }`}>
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-red-600 text-white font-bold flex items-center justify-center text-[10px]">
                2
              </span>
              <h4 className={`font-bold text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Download Ready-to-Install Android APK File
              </h4>
            </div>
            <p className={`${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Because this app complies with all Web App Manifest and Service Worker standards, you can generate a signed <strong>.apk</strong> or Google Play package in 30 seconds using Microsoft/Google&apos;s free <strong>PWABuilder</strong>:
            </p>

            {/* App URL copy box */}
            <div className={`p-2.5 rounded-xl border flex items-center justify-between gap-2 font-mono text-[11px] ${
              isDark ? 'bg-[#030910] border-slate-800 text-slate-200' : 'bg-white border-slate-200 text-slate-800'
            }`}>
              <span className="truncate">{appUrl}</span>
              <button
                onClick={handleCopyUrl}
                className="px-2.5 py-1 rounded-lg bg-red-600 hover:bg-red-700 text-white font-sans text-xs font-bold flex items-center gap-1 cursor-pointer shrink-0"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <ol className={`list-decimal list-inside space-y-1.5 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              <li>Copy your live app URL above.</li>
              <li>Open <a href="https://www.pwabuilder.com" target="_blank" rel="noopener noreferrer" className="text-red-500 underline font-bold inline-flex items-center gap-0.5">PWABuilder.com <ExternalLink className="w-3 h-3" /></a> and paste the URL.</li>
              <li>Click <strong>&quot;Package for Android&quot;</strong> and download your signed <strong>.apk</strong>!</li>
            </ol>
          </div>

          {/* Method 3: Offline capability features */}
          <div className={`p-4 rounded-2xl border space-y-2 ${
            isDark ? 'bg-[#180a0e]/80 border-red-900/60' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="flex items-center gap-2">
              <WifiOff className="w-4 h-4 text-amber-500" />
              <h4 className={`font-bold text-xs uppercase tracking-wider ${isDark ? 'text-amber-400' : 'text-amber-700'}`}>
                100% Offline Certification Ready
              </h4>
            </div>
            <p className={`text-[11px] ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              All 14 Apex Papers Operations curriculum chapters, 95+ official assessment questions, explanations, time trackers, and scoring modules work completely without internet access.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className={`p-4 sm:p-5 border-t flex items-center justify-between ${
          isDark ? 'border-red-900/50 bg-[#180a0e]' : 'border-rose-100 bg-rose-50/50'
        }`}>
          <div className="text-[11px] text-slate-500">
            PWA Manifest &amp; Offline Service Worker Active
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-500 hover:from-red-700 hover:to-rose-600 text-white text-xs font-bold cursor-pointer transition-all shadow-xs"
          >
            Got it
          </button>
        </div>
      </motion.div>
    </div>,
    document.body
  );
};
