'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  FileText, 
  Receipt,
  Droplets,
  Plane,
  Coins,
  BarChart3,
  Car,
  FileSpreadsheet,
  Tag,
  Download,
  Info
} from 'lucide-react';
import { MATH_ANNEXURES } from '@/lib/math-annexures';
import { useAppTheme } from '@/lib/theme';

interface AnnexureModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialAnnexureId?: string;
}

export function AnnexureModal({ isOpen, onClose, initialAnnexureId = 'annexure_a' }: AnnexureModalProps) {
  const { isDark } = useAppTheme();
  const [activeTab, setActiveTab] = useState(initialAnnexureId);

  const currentAnnexure = MATH_ANNEXURES[activeTab] || MATH_ANNEXURES['annexure_a'];

  const getTopicMeta = (key: string) => {
    switch (key) {
      case 'annexure_a':
        return { topic: 'Finance · Invoices & VAT', color: 'bg-red-100 text-red-700 dark:bg-red-950/80 dark:text-red-300 border-red-200 dark:border-red-800' };
      case 'annexure_b':
        return { topic: 'Measurement · Water & Energy', color: 'bg-rose-100 text-rose-700 dark:bg-rose-950/80 dark:text-rose-300 border-rose-200 dark:border-rose-800' };
      case 'annexure_c':
        return { topic: 'Data Handling · Demographics', color: 'bg-red-100 text-red-700 dark:bg-red-950/80 dark:text-red-300 border-red-200 dark:border-red-800' };
      case 'table_1':
        return { topic: 'Finance & Measurement · Currency', color: 'bg-red-100 text-red-700 dark:bg-red-950/80 dark:text-red-300 border-red-200 dark:border-red-800' };
      case 'graph_1_2':
        return { topic: 'Data Handling · Energy Sources', color: 'bg-rose-100 text-rose-700 dark:bg-rose-950/80 dark:text-rose-300 border-rose-200 dark:border-rose-800' };
      case 'table_2':
        return { topic: 'Finance · Hire Purchase', color: 'bg-red-100 text-red-700 dark:bg-red-950/80 dark:text-red-300 border-red-200 dark:border-red-800' };
      case 'table_7_8':
        return { topic: 'Finance · Taxation & Rebates', color: 'bg-red-100 text-red-700 dark:bg-red-950/80 dark:text-red-300 border-red-200 dark:border-red-800' };
      default:
        return { topic: 'Mathematical Literacy', color: 'bg-red-100 text-red-700 dark:bg-red-950/80 dark:text-red-300 border-red-200 dark:border-red-800' };
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.96, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: 10 }}
            className={`w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden border transition-all flex flex-col max-h-[88vh] ${
              isDark 
                ? 'bg-[#15060b] border-red-900/80 shadow-[0_10px_40px_rgba(239,68,68,0.15)] text-white' 
                : 'bg-white border-red-200 shadow-[0_10px_40px_rgba(239,68,68,0.12)] text-slate-900'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with signature light red accent */}
            <div className={`flex items-center justify-between px-5 sm:px-6 py-4 border-b shrink-0 ${
              isDark 
                ? 'bg-gradient-to-r from-[#2c0e17] via-[#200911] to-[#16050b] border-red-900/80' 
                : 'bg-gradient-to-r from-red-100/90 via-rose-50/80 to-red-50/60 border-red-200'
            }`}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-red-600 via-rose-500 to-red-400 text-white flex items-center justify-center shadow-md shadow-red-500/25 shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-red-600 text-white shadow-xs">
                      OFFICIAL DBE NSC ADDENDUM
                    </span>
                    <span className="text-xs font-bold text-red-700 dark:text-rose-300 hidden sm:inline">
                      Mathematical Literacy Paper 1 &amp; Reference Annexures
                    </span>
                  </div>
                  <h2 className="text-sm sm:text-base font-black text-slate-900 dark:text-white mt-0.5">
                    Official Exam Reference Addendum
                  </h2>
                </div>
              </div>

              <button 
                onClick={onClose} 
                className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                  isDark 
                    ? 'border-red-900/80 text-rose-300 hover:bg-[#280c14]' 
                    : 'border-red-200 text-slate-600 hover:bg-red-50'
                }`}
                aria-label="Close Annexure Modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tab navigation with light red topic chips */}
            <div className={`flex overflow-x-auto no-scrollbar border-b px-2 py-2 gap-1.5 shrink-0 ${
              isDark ? 'bg-[#18070d] border-red-900/80' : 'bg-red-50/50 border-red-200'
            }`}>
              {Object.keys(MATH_ANNEXURES).map((key) => {
                const item = MATH_ANNEXURES[key];
                const isSelected = activeTab === key;
                const meta = getTopicMeta(key);

                return (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`px-3 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 border ${
                      isSelected
                        ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white border-red-600 shadow-md shadow-red-600/30'
                        : isDark
                        ? 'bg-[#220a12] text-rose-200 border-red-950 hover:bg-[#2e0e1a]'
                        : 'bg-white text-slate-700 border-red-200 hover:bg-red-50'
                    }`}
                  >
                    <span>{item.code}</span>
                  </button>
                );
              })}
            </div>

            {/* Modal Body with Clean Exam Reference Data */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-4">
              <div className="flex items-center justify-between gap-3 flex-wrap pb-3 border-b border-red-100 dark:border-red-900/60">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold border flex items-center gap-1 ${getTopicMeta(activeTab).color}`}>
                      <Tag className="w-3 h-3" />
                      <span>{getTopicMeta(activeTab).topic}</span>
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      Applicable Questions: {currentAnnexure.applicableQuestions.join(', ')}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white mt-1">
                    {currentAnnexure.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                    {currentAnnexure.subtitle}
                  </p>
                </div>
              </div>

              {/* RENDER ACTIVE ANNEXURE BODY */}
              {activeTab === 'annexure_a' && (
                <div className={`p-4 sm:p-5 rounded-2xl border ${isDark ? 'bg-[#1a070e] border-red-900/80' : 'bg-red-50/40 border-red-200'}`}>
                  <div className="flex items-start justify-between border-b border-red-200 dark:border-red-900 pb-3 flex-wrap gap-2 text-xs">
                    <div>
                      <p className="font-black text-sm text-slate-900 dark:text-white">Mr SJ Fortune</p>
                      <p className="text-slate-500 dark:text-slate-400">5 Second Avenue, Zone 2, Smelderado, 2463</p>
                    </div>
                    <div className="text-right">
                      <p className="font-mono text-slate-500 dark:text-slate-400">Tax Invoice No: INV-449102</p>
                      <p className="font-semibold text-red-600 dark:text-rose-400">VAT Reg No: 489012443</p>
                    </div>
                  </div>

                  <div className="overflow-x-auto mt-3">
                    <table className="w-full text-xs text-left border-collapse">
                      <thead>
                        <tr className={isDark ? 'bg-gradient-to-r from-[#320f1b] to-[#250a14] text-rose-100 border-b border-red-900' : 'bg-gradient-to-r from-red-100 via-rose-50 to-red-50 text-red-950 border-b border-red-200'}>
                          <th className="p-2.5 font-black">Item Description</th>
                          <th className="p-2.5 font-black text-right">Amount (Excl. VAT)</th>
                          <th className="p-2.5 font-black text-right">VAT @ 15%</th>
                          <th className="p-2.5 font-black text-right">Amount (Incl. VAT)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-red-100 dark:divide-red-950 font-medium">
                        <tr className={isDark ? 'hover:bg-red-950/30' : 'hover:bg-red-50/60'}>
                          <td className="p-2.5 font-bold">Smart Contract Subscription Fee</td>
                          <td className="p-2.5 text-right font-mono">R346,96</td>
                          <td className="p-2.5 text-right font-mono">R52,04</td>
                          <td className="p-2.5 text-right font-mono">R399,00</td>
                        </tr>
                        <tr className={isDark ? 'hover:bg-red-950/30' : 'hover:bg-red-50/60'}>
                          <td className="p-2.5 font-bold">Itemised Billing Service Fee</td>
                          <td className="p-2.5 text-right font-mono">R21,74</td>
                          <td className="p-2.5 text-right font-mono">R3,26</td>
                          <td className="p-2.5 text-right font-mono">R25,00</td>
                        </tr>
                        <tr className={isDark ? 'hover:bg-red-950/30' : 'hover:bg-red-50/60'}>
                          <td className="p-2.5 font-bold">Additional Peak Usage (34 mins @ R1,50/min)</td>
                          <td className="p-2.5 text-right font-mono">R44,35</td>
                          <td className="p-2.5 text-right font-mono">R6,65</td>
                          <td className="p-2.5 text-right font-mono">R51,00</td>
                        </tr>
                        <tr className={isDark ? 'hover:bg-red-950/30' : 'hover:bg-red-50/60'}>
                          <td className="p-2.5 font-bold">Caller Line Identity (CLI)</td>
                          <td className="p-2.5 text-right font-mono">R8,26</td>
                          <td className="p-2.5 text-right font-mono">R1,24</td>
                          <td className="p-2.5 text-right font-mono">R9,50</td>
                        </tr>
                        <tr className={isDark ? 'bg-[#270c16] font-bold text-rose-200' : 'bg-red-100/70 font-bold text-red-950'}>
                          <td className="p-2.5 font-black">Calculated Totals:</td>
                          <td className="p-2.5 text-right font-mono font-black text-red-600 dark:text-rose-400">R421,31 (Excl.)</td>
                          <td className="p-2.5 text-right font-mono font-black text-red-600 dark:text-rose-400">R63,19 (VAT)</td>
                          <td className="p-2.5 text-right font-mono font-black text-red-600 dark:text-rose-400">R484,50 (Due)</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'annexure_b' && (
                <div className={`p-4 sm:p-5 rounded-2xl border space-y-4 ${isDark ? 'bg-[#1b0810] border-red-900/80' : 'bg-red-50/40 border-red-200'}`}>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                    <div className="p-4 rounded-xl bg-white dark:bg-black/50 border border-red-100 dark:border-red-900/60 shadow-xs">
                      <span className="text-xs font-bold text-slate-400 block uppercase">Standard Showerhead</span>
                      <span className="text-xl font-black text-red-600 dark:text-rose-400 mt-1 block">16 ℓ / min</span>
                    </div>
                    <div className="p-4 rounded-xl bg-white dark:bg-black/50 border border-red-100 dark:border-red-900/60 shadow-xs">
                      <span className="text-xs font-bold text-slate-400 block uppercase">Low-Flow Showerhead</span>
                      <span className="text-xl font-black text-emerald-600 dark:text-emerald-400 mt-1 block">9 ℓ / min</span>
                    </div>
                    <div className="p-4 rounded-xl bg-white dark:bg-black/50 border border-red-100 dark:border-red-900/60 shadow-xs">
                      <span className="text-xs font-bold text-slate-400 block uppercase">Heating Energy Factor</span>
                      <span className="text-xl font-black text-amber-600 dark:text-amber-400 mt-1 block">0,035 kWh / ℓ</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 italic text-center">
                    Formula: Water Saved (ℓ) = Duration (mins) × (16 − 9) ℓ/min · Energy Saved (kWh) = Water Saved × 0,035 kWh/ℓ
                  </p>
                </div>
              )}

              {activeTab === 'annexure_c' && (
                <div className={`p-4 sm:p-5 rounded-2xl border ${isDark ? 'bg-[#1b0810] border-red-900/80' : 'bg-red-50/40 border-red-200'}`}>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                    <div className="p-3 rounded-xl bg-white dark:bg-black/50 border border-red-100 dark:border-red-900/60 shadow-xs">
                      <span className="text-xs font-bold text-slate-400 block uppercase">United Kingdom</span>
                      <span className="text-lg font-black text-red-600 dark:text-rose-400">430 422</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white dark:bg-black/50 border border-red-100 dark:border-red-900/60 shadow-xs">
                      <span className="text-xs font-bold text-slate-400 block uppercase">United States</span>
                      <span className="text-lg font-black text-amber-600 dark:text-amber-400">373 145</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white dark:bg-black/50 border border-red-100 dark:border-red-900/60 shadow-xs">
                      <span className="text-xs font-bold text-slate-400 block uppercase">Germany</span>
                      <span className="text-lg font-black text-rose-500">322 719</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white dark:bg-black/50 border border-red-100 dark:border-red-900/60 shadow-xs">
                      <span className="text-xs font-bold text-slate-400 block uppercase">India</span>
                      <span className="text-lg font-black text-emerald-600 dark:text-emerald-400">95 621</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'table_1' && (
                <div className="overflow-x-auto rounded-2xl border border-red-200 dark:border-red-900/80 shadow-xs">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className={isDark ? 'bg-gradient-to-r from-[#320f1b] to-[#250a14] text-rose-100 border-b border-red-900' : 'bg-gradient-to-r from-red-100 via-rose-50 to-red-50 text-red-950 border-b border-red-200'}>
                        <th className="p-3 font-black">African Country</th>
                        <th className="p-3 font-black text-right">Price on 05/06/2019 (US$)</th>
                        <th className="p-3 font-black text-right">Price on 01/03/2021 (US$)</th>
                        <th className="p-3 font-black text-right">Exchange Rate (Local per $1)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-red-100 dark:divide-red-950 font-medium">
                      <tr><td className="p-2.5 font-bold">Zimbabwe</td><td className="p-2.5 text-right font-mono">$0,80</td><td className="p-2.5 text-right font-mono">$1,258</td><td className="p-2.5 text-right font-mono">362,50 ZWL</td></tr>
                      <tr><td className="p-2.5 font-bold">South Africa</td><td className="p-2.5 text-right font-mono">$0,92</td><td className="p-2.5 text-right font-mono">1,061</td><td className="p-2.5 text-right font-mono">15,12 ZAR</td></tr>
                      <tr><td className="p-2.5 font-bold">Swaziland (Eswatini)</td><td className="p-2.5 text-right font-mono">$0,92</td><td className="p-2.5 text-right font-mono">0,870</td><td className="p-2.5 text-right font-mono">15,12 SZL</td></tr>
                      <tr><td className="p-2.5 font-bold">Namibia</td><td className="p-2.5 text-right font-mono">$0,88</td><td className="p-2.5 text-right font-mono">0,796</td><td className="p-2.5 text-right font-mono">15,12 NAD</td></tr>
                      <tr><td className="p-2.5 font-bold">Botswana</td><td className="p-2.5 text-right font-mono">$0,84</td><td className="p-2.5 text-right font-mono">0,732</td><td className="p-2.5 text-right font-mono">11,14 BWP</td></tr>
                      <tr><td className="p-2.5 font-bold">Angola</td><td className="p-2.5 text-right font-mono">$0,47</td><td className="p-2.5 text-right font-mono">0,254</td><td className="p-2.5 text-right font-mono">652,30 AOA</td></tr>
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === 'graph_1_2' && (
                <div className="overflow-x-auto rounded-2xl border border-red-200 dark:border-red-900/80 shadow-xs">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className={isDark ? 'bg-gradient-to-r from-[#320f1b] to-[#250a14] text-rose-100 border-b border-red-900' : 'bg-gradient-to-r from-red-100 via-rose-50 to-red-50 text-red-950 border-b border-red-200'}>
                        <th className="p-3 font-black">Province</th>
                        <th className="p-3 font-black text-right">Electricity</th>
                        <th className="p-3 font-black text-right">Gas</th>
                        <th className="p-3 font-black text-right">Paraffin</th>
                        <th className="p-3 font-black text-right">Wood</th>
                        <th className="p-3 font-black text-right">Other</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-red-100 dark:divide-red-950 font-medium">
                      <tr><td className="p-2.5 font-bold">Western Cape</td><td className="p-2.5 text-right font-mono">86,5%</td><td className="p-2.5 text-right font-mono">10,2%</td><td className="p-2.5 text-right font-mono">1,8%</td><td className="p-2.5 text-right font-mono">0,9%</td><td className="p-2.5 text-right font-mono">0,6%</td></tr>
                      <tr><td className="p-2.5 font-bold">Eastern Cape</td><td className="p-2.5 text-right font-mono">70,8%</td><td className="p-2.5 text-right font-mono">3,5%</td><td className="p-2.5 text-right font-mono">11,2%</td><td className="p-2.5 text-right font-mono">13,5%</td><td className="p-2.5 text-right font-mono">1,0%</td></tr>
                      <tr><td className="p-2.5 font-bold">Northern Cape</td><td className="p-2.5 text-right font-mono">83,4%</td><td className="p-2.5 text-right font-mono">5,9%</td><td className="p-2.5 text-right font-mono">1,5%</td><td className="p-2.5 text-right font-mono">8,2%</td><td className="p-2.5 text-right font-mono">1,0%</td></tr>
                      <tr><td className="p-2.5 font-bold">Free State</td><td className="p-2.5 text-right font-mono">86,1%</td><td className="p-2.5 text-right font-mono">3,4%</td><td className="p-2.5 text-right font-mono">5,2%</td><td className="p-2.5 text-right font-mono">4,3%</td><td className="p-2.5 text-right font-mono">1,0%</td></tr>
                      <tr><td className="p-2.5 font-bold">KwaZulu-Natal</td><td className="p-2.5 text-right font-mono">72,5%</td><td className="p-2.5 text-right font-mono">4,8%</td><td className="p-2.5 text-right font-mono">5,1%</td><td className="p-2.5 text-right font-mono">16,4%</td><td className="p-2.5 text-right font-mono">1,2%</td></tr>
                      <tr><td className="p-2.5 font-bold">North West</td><td className="p-2.5 text-right font-mono">81,3%</td><td className="p-2.5 text-right font-mono">1,2%</td><td className="p-2.5 text-right font-mono">7,5%</td><td className="p-2.5 text-right font-mono">9,2%</td><td className="p-2.5 text-right font-mono">0,8%</td></tr>
                      <tr><td className="p-2.5 font-bold">Gauteng</td><td className="p-2.5 text-right font-mono">84,1%</td><td className="p-2.5 text-right font-mono">3,6%</td><td className="p-2.5 text-right font-mono">9,8%</td><td className="p-2.5 text-right font-mono">1,5%</td><td className="p-2.5 text-right font-mono">1,0%</td></tr>
                      <tr><td className="p-2.5 font-bold">Mpumalanga</td><td className="p-2.5 text-right font-mono">71,4%</td><td className="p-2.5 text-right font-mono">1,5%</td><td className="p-2.5 text-right font-mono">3,6%</td><td className="p-2.5 text-right font-mono">22,4%</td><td className="p-2.5 text-right font-mono">1,1%</td></tr>
                      <tr><td className="p-2.5 font-bold text-red-600 dark:text-rose-400">Limpopo (Highest Wood)</td><td className="p-2.5 text-right font-mono">54,2%</td><td className="p-2.5 text-right font-mono">1,1%</td><td className="p-2.5 text-right font-mono">2,8%</td><td className="p-2.5 text-right font-mono font-bold text-red-600 dark:text-rose-400">41,2%</td><td className="p-2.5 text-right font-mono">0,7%</td></tr>
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === 'table_2' && (
                <div className="overflow-x-auto rounded-2xl border border-red-200 dark:border-red-900/80 shadow-xs">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead className={isDark ? 'bg-gradient-to-r from-[#320f1b] to-[#250a14] text-rose-100 border-b border-red-900' : 'bg-gradient-to-r from-red-100 via-rose-50 to-red-50 text-red-950 border-b border-red-200'}>
                      <tr>
                        <th className="p-3 font-black">Item</th>
                        <th className="p-3 font-black text-right">FORD FIGO</th>
                        <th className="p-3 font-black text-right">VW POLO</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-red-100 dark:divide-red-950 font-medium">
                      <tr><td className="p-2.5 font-bold">Retail price (incl. 15% VAT)</td><td className="p-2.5 text-right font-mono font-bold text-red-600 dark:text-rose-400">R215 100</td><td className="p-2.5 text-right font-mono font-bold text-red-600 dark:text-rose-400">R220 300</td></tr>
                      <tr><td className="p-2.5 font-bold">Deposit percentage</td><td className="p-2.5 text-right font-mono">5%</td><td className="p-2.5 text-right font-mono">0%</td></tr>
                      <tr><td className="p-2.5 font-bold">Monthly instalment</td><td className="p-2.5 text-right font-mono">R2 999,00</td><td className="p-2.5 text-right font-mono">R3 345,00</td></tr>
                      <tr><td className="p-2.5 font-bold">Residual / Balloon value</td><td className="p-2.5 text-right font-mono">30% (R64 530)</td><td className="p-2.5 text-right font-mono">R116 759</td></tr>
                      <tr><td className="p-2.5 font-bold">Term agreement period</td><td className="p-2.5 text-right font-mono">72 months (6 yrs)</td><td className="p-2.5 text-right font-mono">48 months (4 yrs)</td></tr>
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === 'table_7_8' && (
                <div className="overflow-x-auto rounded-2xl border border-red-200 dark:border-red-900/80 shadow-xs">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className={isDark ? 'bg-gradient-to-r from-[#320f1b] to-[#250a14] text-rose-100 border-b border-red-900' : 'bg-gradient-to-r from-red-100 via-rose-50 to-red-50 text-red-950 border-b border-red-200'}>
                        <th className="p-3 font-black">Tax Bracket</th>
                        <th className="p-3 font-black">Taxable Annual Income</th>
                        <th className="p-3 font-black text-right">Rates of Tax</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-red-100 dark:divide-red-950 font-medium">
                      <tr><td className="p-2.5 font-bold">Bracket 1</td><td className="p-2.5 font-mono">R1 – R205 900</td><td className="p-2.5 text-right font-mono">18% of taxable income</td></tr>
                      <tr><td className="p-2.5 font-bold">Bracket 2</td><td className="p-2.5 font-mono">R205 901 – R321 600</td><td className="p-2.5 text-right font-mono">R37 062 + 26% of taxable income above R205 900</td></tr>
                      <tr><td className="p-2.5 font-bold">Bracket 3</td><td className="p-2.5 font-mono">R321 601 – R445 100</td><td className="p-2.5 text-right font-mono">R67 144 + 31% of taxable income above R321 600</td></tr>
                      <tr><td className="p-2.5 font-bold">Bracket 4</td><td className="p-2.5 font-mono">R445 101 – R584 200</td><td className="p-2.5 text-right font-mono">R105 429 + 36% of taxable income above R445 100</td></tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className={`p-4 border-t flex items-center justify-between gap-3 flex-wrap ${
              isDark ? 'bg-[#18070d] border-red-900/80' : 'bg-red-50/40 border-red-200'
            }`}>
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <Info className="w-4 h-4 text-red-500 shrink-0" />
                <span>Reference materials reflect official South African Department of Basic Education past papers.</span>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 rounded-xl text-xs font-black bg-gradient-to-r from-red-600 via-rose-600 to-red-500 hover:from-red-500 hover:to-rose-500 text-white cursor-pointer shadow-md shadow-red-600/30 transition-all ml-auto"
              >
                Close Addendum
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
