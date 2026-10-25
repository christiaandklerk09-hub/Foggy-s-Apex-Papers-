'use client';

import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CopyPasscodeButtonProps {
  passcode: string;
  label?: string;
  size?: 'sm' | 'md' | 'xs';
  showText?: boolean;
  className?: string;
}

export const CopyPasscodeButton: React.FC<CopyPasscodeButtonProps> = ({
  passcode,
  label,
  size = 'sm',
  showText = false,
  className = '',
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!passcode) return;

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(passcode);
      } else {
        // Fallback for environments where navigator.clipboard might be restricted
        const textArea = document.createElement('textarea');
        textArea.value = passcode;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }

      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.warn('Failed to copy passcode:', err);
    }
  };

  const iconSizes = {
    xs: 'w-3 h-3',
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      title={copied ? 'Copied to clipboard!' : `Copy passcode: ${passcode}`}
      aria-label={copied ? 'Passcode copied' : 'Copy passcode to clipboard'}
      className={`relative inline-flex items-center gap-1.5 rounded-lg font-bold transition-all cursor-pointer select-none active:scale-95 ${
        copied
          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
          : 'bg-white hover:bg-rose-50 text-neutral-700 hover:text-red-700 border border-neutral-200 hover:border-rose-300 shadow-2xs'
      } ${
        size === 'xs'
          ? 'px-1.5 py-0.5 text-[10px]'
          : size === 'sm'
          ? 'px-2 py-1 text-xs'
          : 'px-2.5 py-1.5 text-xs'
      } ${className}`}
    >
      {copied ? (
        <>
          <Check className={`${iconSizes[size]} text-emerald-700 stroke-[3] shrink-0`} />
          <span className="text-emerald-800 font-bold whitespace-nowrap">Copied!</span>
        </>
      ) : (
        <>
          <Copy className={`${iconSizes[size]} text-neutral-500 hover:text-red-600 shrink-0`} />
          {showText && <span className="whitespace-nowrap">{label || 'Copy'}</span>}
        </>
      )}
    </button>
  );
};
