'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, User, Building, Check, Upload, Trash2, Camera, Sparkles } from 'lucide-react';
import { useAppTheme } from '@/lib/theme';
import { getBrandingSettings, DEFAULT_PRESET_AVATARS } from '@/lib/storage';
import { CropperModal } from './CropperModal';

interface CandidateInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidateName: string;
  clubName: string;
  avatarImage?: string;
  onSave: (name: string, club: string, avatarImage?: string) => void;
}

export const CandidateInfoModal: React.FC<CandidateInfoModalProps> = ({
  isOpen,
  onClose,
  candidateName,
  clubName,
  avatarImage: initialAvatar,
  onSave,
}) => {
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
  const [name, setName] = useState(candidateName);
  const [club, setClub] = useState(clubName);
  const [avatar, setAvatar] = useState<string | undefined>(initialAvatar);
  const [presets, setPresets] = useState<string[]>(DEFAULT_PRESET_AVATARS);
  const [imageToCrop, setImageToCrop] = useState<string | null>(null);
  const { isDark } = useAppTheme();

  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    if (isOpen) {
      setName(candidateName);
      setClub(clubName);
      setAvatar(initialAvatar);
    }
  }

  useEffect(() => {
    if (isOpen) {
      getBrandingSettings().then((settings) => {
        if (settings.avatars && settings.avatars.length > 0) {
          setPresets(settings.avatars);
        } else {
          setPresets(DEFAULT_PRESET_AVATARS);
        }
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const result = ev.target?.result as string;
        setImageToCrop(result);
      };
      reader.readAsDataURL(file);
      e.target.value = '';
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(name.trim(), club.trim(), avatar);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
        <div className="absolute inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className={`relative w-full max-w-md rounded-3xl shadow-2xl border overflow-hidden z-10 ${
            isDark
              ? 'bg-[#120709] border-rose-900/60 text-slate-100'
              : 'bg-white border-rose-100 text-slate-900 sunlit-card'
          }`}
        >
          {/* Header */}
          <div className={`p-5 sm:p-6 border-b flex items-center justify-between ${
            isDark ? 'bg-[#180a0e] border-rose-950/70' : 'bg-rose-50/50 border-rose-100'
          }`}>
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-red-600 to-rose-500 text-white flex items-center justify-center shadow-xs">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h3 className={`text-lg font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Candidate Profile
                </h3>
                <p className={`text-xs font-semibold ${isDark ? 'text-rose-400' : 'text-rose-600'}`}>
                  Assessment Paper Identification & Avatar
                </p>
              </div>
            </div>

            <button
              id="close-candidate-modal-btn"
              onClick={onClose}
              className={`p-1.5 rounded-xl transition-colors cursor-pointer ${
                isDark ? 'text-slate-400 hover:text-white hover:bg-[#250e14]' : 'text-slate-500 hover:text-slate-900 hover:bg-rose-50'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSave} className={`p-5 sm:p-6 space-y-4 ${isDark ? 'bg-[#120709]' : 'bg-white'}`}>
            
            {/* Avatar Section */}
            <div>
              <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${
                isDark ? 'text-slate-300' : 'text-slate-700'
              }`}>
                Profile Picture
              </label>

              <div className={`p-3.5 rounded-2xl border flex flex-col gap-3 ${
                isDark ? 'bg-[#180a0e]/80 border-rose-900/50' : 'bg-rose-50/40 border-rose-200/70'
              }`}>
                <div className="flex items-center gap-3">
                  <div className="relative shrink-0">
                    {avatar ? (
                      <div
                        className="w-13 h-13 rounded-2xl border-2 border-rose-500 bg-cover bg-center shadow-xs"
                        style={{ backgroundImage: `url(${avatar})` }}
                      />
                    ) : (
                      <div className={`w-13 h-13 rounded-2xl border-2 border-dashed flex items-center justify-center font-black text-sm ${
                        isDark ? 'border-rose-800 text-rose-400 bg-[#1c0c10]' : 'border-rose-300 text-rose-500 bg-white'
                      }`}>
                        {(name || 'C').charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className={`text-xs font-bold block ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {avatar ? 'Custom Profile Photo' : 'No photo uploaded'}
                    </span>
                    <span className={`text-[11px] block mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      {avatar ? 'Active on certificates & quiz header' : 'Upload photo or choose a preset badge'}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <input
                      type="file"
                      id="candidate-modal-avatar-file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <label
                      htmlFor="candidate-modal-avatar-file"
                      id="upload-candidate-photo-btn"
                      className="px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-500 hover:from-red-500 hover:to-rose-400 text-white text-xs font-bold cursor-pointer transition-all shadow-[0_2px_8px_rgba(244,63,94,0.25)] flex items-center gap-1 active:scale-95"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>{avatar ? 'Change' : 'Upload'}</span>
                    </label>

                    {avatar && (
                      <button
                        id="remove-candidate-photo-btn"
                        type="button"
                        onClick={() => setAvatar(undefined)}
                        className="px-2 py-1.5 rounded-xl border border-rose-300 dark:border-rose-900/60 text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 text-xs font-bold cursor-pointer transition-colors flex items-center gap-1"
                        title="Remove profile picture"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Remove</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Preset Avatars Row */}
                {presets && presets.length > 0 && (
                  <div className={`pt-2 border-t ${isDark ? 'border-rose-900/40' : 'border-rose-200/60'}`}>
                    <span className={`text-[10px] font-bold uppercase tracking-wider block mb-1.5 ${
                      isDark ? 'text-slate-400' : 'text-slate-500'
                    }`}>
                      Academic Preset Badges:
                    </span>
                    <div className="flex items-center gap-2 overflow-x-auto pb-1">
                      {presets.map((preset, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setAvatar(avatar === preset ? undefined : preset)}
                          className={`relative w-8 h-8 rounded-xl bg-cover bg-center border-2 transition-all hover:scale-105 cursor-pointer shrink-0 ${
                            avatar === preset
                              ? 'border-rose-500 ring-2 ring-rose-500/40 shadow-xs'
                              : isDark ? 'border-red-900/60 opacity-70 hover:opacity-100' : 'border-slate-300 opacity-80 hover:opacity-100'
                          }`}
                          style={{ backgroundImage: `url(${preset})` }}
                          title={`Select preset badge ${idx + 1}`}
                        >
                          {avatar === preset && (
                            <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                              <Check className="w-2 h-2" />
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${
                isDark ? 'text-slate-300' : 'text-slate-700'
              }`}>
                Candidate Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="candidate-name-input"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Sarah Jenkins"
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm font-medium focus:outline-none focus:border-red-500 ${
                    isDark
                      ? 'border-rose-900/60 bg-[#16080b] text-white focus:bg-[#1a090e]'
                      : 'border-rose-200 bg-rose-50/30 text-slate-900 focus:bg-white focus:border-red-500'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${
                isDark ? 'text-slate-300' : 'text-slate-700'
              }`}>
                School / Institution
              </label>
              <div className="relative">
                <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="candidate-club-input"
                  type="text"
                  value={club}
                  onChange={(e) => setClub(e.target.value)}
                  placeholder="e.g. Apex High School"
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm font-medium focus:outline-none focus:border-red-500 ${
                    isDark
                      ? 'border-rose-900/60 bg-[#16080b] text-white focus:bg-[#1a090e]'
                      : 'border-rose-200 bg-rose-50/30 text-slate-900 focus:bg-white focus:border-red-500'
                  }`}
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                id="save-candidate-btn"
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-500 text-white font-bold text-sm hover:from-red-500 hover:to-rose-400 shadow-[0_0_15px_rgba(255,77,77,0.35)] active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Save & Continue</span>
              </button>
            </div>
          </form>
        </motion.div>

        {imageToCrop && (
          <CropperModal
            image={imageToCrop}
            isOpen={!!imageToCrop}
            title="Crop Profile Photo"
            onClose={() => setImageToCrop(null)}
            onCrop={(cropped) => {
              setAvatar(cropped);
              setImageToCrop(null);
            }}
          />
        )}
      </div>
    </AnimatePresence>
  );
};


