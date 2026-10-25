'use client';

import React, { useState, useCallback } from 'react';
import Cropper, { Point, Area } from 'react-easy-crop';
import { X, Check, ZoomIn, ZoomOut, RotateCcw, Crop } from 'lucide-react';
import { useAppTheme } from '@/lib/theme';

interface CropperModalProps {
  image: string;
  isOpen: boolean;
  onClose: () => void;
  onCrop: (croppedImage: string) => void;
  title?: string;
}

export const CropperModal: React.FC<CropperModalProps> = ({ 
  image, 
  isOpen, 
  onClose, 
  onCrop,
  title = 'Crop Branding Image'
}) => {
  const { isDark } = useAppTheme();
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const onCropComplete = useCallback((_: Area, areaPixels: Area) => {
    setCroppedAreaPixels(areaPixels);
  }, []);

  const createCroppedImage = useCallback(async () => {
    if (!croppedAreaPixels || isProcessing) return;
    setIsProcessing(true);
    
    try {
      const imageElement = new Image();
      if (!image.startsWith('data:') && !image.startsWith('blob:')) {
        imageElement.crossOrigin = 'anonymous';
      }

      await new Promise<void>((resolve, reject) => {
        imageElement.onload = () => resolve();
        imageElement.onerror = (err) => reject(err);
        imageElement.src = image;
        if (imageElement.complete && imageElement.naturalWidth > 0) {
          resolve();
        }
      });

      const canvas = document.createElement('canvas');
      canvas.width = Math.max(1, croppedAreaPixels.width);
      canvas.height = Math.max(1, croppedAreaPixels.height);
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        throw new Error('Failed to obtain canvas context');
      }

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      ctx.drawImage(
        imageElement,
        croppedAreaPixels.x,
        croppedAreaPixels.y,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
        0,
        0,
        canvas.width,
        canvas.height
      );

      const croppedBase64 = canvas.toDataURL('image/jpeg', 0.92);
      onCrop(croppedBase64);
      onClose();
    } catch (err) {
      console.error('Error cropping image:', err);
    } finally {
      setIsProcessing(false);
    }
  }, [croppedAreaPixels, image, onCrop, onClose, isProcessing]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md">
      <div 
        id="image-cropper-modal"
        className={`relative w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl border flex flex-col ${
          isDark 
            ? 'bg-[#120709] border-red-900/50 text-white' 
            : 'bg-white border-rose-200 text-slate-900'
        }`}
      >
        {/* Modal Header */}
        <div className={`px-4 py-3 flex items-center justify-between border-b ${
          isDark ? 'border-[#0e2233] bg-[#050c14]' : 'border-rose-100 bg-rose-50/50'
        }`}>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-red-600/10 text-red-600 flex items-center justify-center">
              <Crop className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold tracking-tight">{title}</h3>
              <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Pinch, scroll, or drag to center within the 1:1 frame
              </p>
            </div>
          </div>
          <button 
            id="close-cropper-btn"
            onClick={onClose} 
            className={`p-1.5 rounded-xl transition-colors cursor-pointer ${
              isDark ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-rose-100 text-slate-500'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cropper Canvas Viewport */}
        <div className="relative w-full h-[280px] sm:h-[320px] bg-black">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropShape="rect"
            showGrid={true}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </div>

        {/* Zoom Controls Bar */}
        <div className={`px-4 py-2.5 flex items-center justify-between gap-3 border-t ${
          isDark ? 'border-[#0e2233] bg-[#050c14]' : 'border-rose-100 bg-rose-50/40'
        }`}>
          <div className="flex items-center gap-2 flex-1 max-w-xs">
            <button
              onClick={() => setZoom((z) => Math.max(1, +(z - 0.2).toFixed(1)))}
              className={`p-1 rounded-lg transition-colors cursor-pointer ${
                isDark ? 'hover:bg-slate-800 text-slate-300' : 'hover:bg-rose-200/60 text-slate-700'
              }`}
              title="Zoom out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <input
              type="range"
              min={1}
              max={3}
              step={0.05}
              value={zoom}
              onChange={(e) => setZoom(parseFloat(e.target.value))}
              className="w-full accent-red-600 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-lg cursor-pointer"
            />
            <button
              onClick={() => setZoom((z) => Math.min(3, +(z + 0.2).toFixed(1)))}
              className={`p-1 rounded-lg transition-colors cursor-pointer ${
                isDark ? 'hover:bg-slate-800 text-slate-300' : 'hover:bg-rose-200/60 text-slate-700'
              }`}
              title="Zoom in"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <span className="text-[11px] font-mono font-bold text-slate-500 w-10 text-right">
              {Math.round(zoom * 100)}%
            </span>
          </div>

          <button
            onClick={() => { setZoom(1); setCrop({ x: 0, y: 0 }); }}
            className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
              isDark ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-rose-200/60 text-slate-600'
            }`}
            title="Reset crop and zoom"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline text-[11px]">Reset</span>
          </button>
        </div>

        {/* Modal Actions */}
        <div className={`px-4 py-3 flex items-center justify-end gap-2 border-t ${
          isDark ? 'border-[#0e2233] bg-[#07101a]' : 'border-rose-100 bg-white'
        }`}>
          <button 
            id="cancel-crop-btn"
            onClick={onClose} 
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              isDark 
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-300' 
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            Cancel
          </button>
          <button 
            id="confirm-crop-btn"
            onClick={createCroppedImage} 
            disabled={isProcessing}
            className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold text-xs shadow-md shadow-red-600/20 transition-all cursor-pointer disabled:opacity-50"
          >
            <Check className="w-4 h-4 stroke-[2.5]" />
            <span>{isProcessing ? 'Cropping...' : 'Crop & Apply'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

