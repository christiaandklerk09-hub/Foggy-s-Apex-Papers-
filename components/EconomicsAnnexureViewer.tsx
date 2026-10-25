'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart3, 
  FileText, 
  TrendingUp, 
  PieChart, 
  Layers, 
  Maximize2, 
  Minimize2, 
  Sparkles,
  Info,
  DollarSign,
  AlertTriangle,
  Flame,
  Wind,
  Sun,
  Zap,
  Building2,
  Globe2,
  Users,
  Briefcase
} from 'lucide-react';
import { useAppTheme } from '@/lib/theme';
import { Question } from '@/types/quiz';

interface EconomicsAnnexureViewerProps {
  question: Question;
  currentIndex?: number;
}

export const EconomicsAnnexureViewer: React.FC<EconomicsAnnexureViewerProps> = ({
  question,
  currentIndex = 0
}) => {
  const { isDark } = useAppTheme();
  const [isExpanded, setIsExpanded] = useState(true);
  const [highlightEnergySlice, setHighlightEnergySlice] = useState<string | null>(null);

  const qId = question.id;
  const qText = (question.question || '').toLowerCase();
  const qCategory = (question.category || '').toLowerCase();

  // Match which annexure applies
  const isGvaTable = (qId >= 613 && qId <= 617) || qText.includes('gross value added') || qCategory.includes('national accounts');
  const isPublicDebt = (qId >= 618 && qId <= 622) || qText.includes('public debt') || qCategory.includes('fiscal policy');
  const isMultiplierGraph = qId === 623 || qText.includes('multiplier') || qCategory.includes('multiplier');
  const isEnergyPlan = (qId >= 627 && qId <= 631) || qText.includes('energy plan') || qText.includes('2030 plan') || qText.includes('fossil fuels');
  const isSezCartoon = (qId >= 632 && qId <= 636) || qText.includes('special economic zones') || qText.includes('sez how') || qText.includes('duty-free');
  const isWhyTrade = (qId >= 641 && qId <= 645) || qText.includes('why do countries trade') || qText.includes('mass production');
  const isEconHitsLow = (qId >= 646 && qId <= 650) || qText.includes('economy hits low') || qText.includes('jobs') || qCategory.includes('labour indicators');
  const isSectionCEssay = qId === 653 || qId === 654 || qCategory.includes('section c') || question.type === 'essay';

  // If question doesn't have an attached annexure or diagram, return null
  if (!isGvaTable && !isPublicDebt && !isMultiplierGraph && !isEnergyPlan && !isSezCartoon && !isWhyTrade && !isEconHitsLow && !isSectionCEssay) {
    return null;
  }

  return (
    <div className={`my-4 rounded-3xl border transition-all overflow-hidden shadow-xl ${
      isDark 
        ? 'bg-[#15070c] border-rose-900/80 shadow-[0_4px_30px_rgba(244,63,94,0.12)] text-white' 
        : 'bg-white border-rose-300 shadow-[0_4px_25px_rgba(244,63,94,0.08)] text-slate-900'
    }`}>
      {/* Top Header Bar with Signature Light Red Accent */}
      <div className={`px-4 sm:px-6 py-3.5 border-b flex items-center justify-between gap-3 flex-wrap ${
        isDark 
          ? 'bg-gradient-to-r from-[#2a0c16] via-[#200810] to-[#16050b] border-rose-900/80' 
          : 'bg-gradient-to-r from-rose-100/90 via-red-50/70 to-rose-50/50 border-rose-200'
      }`}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-rose-500 via-red-500 to-rose-400 text-white flex items-center justify-center shadow-md shadow-rose-500/25 shrink-0">
            {isGvaTable && <BarChart3 className="w-4 h-4" />}
            {isPublicDebt && <FileText className="w-4 h-4" />}
            {isMultiplierGraph && <TrendingUp className="w-4 h-4" />}
            {isEnergyPlan && <PieChart className="w-4 h-4" />}
            {isSezCartoon && <Building2 className="w-4 h-4" />}
            {isWhyTrade && <Globe2 className="w-4 h-4" />}
            {isEconHitsLow && <Briefcase className="w-4 h-4" />}
            {isSectionCEssay && <Layers className="w-4 h-4" />}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-rose-600 text-white shadow-xs">
                OFFICIAL DBE NSC ANNEXURE
              </span>
              <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400">
                Economics P1 (November 2021)
              </span>
            </div>
            <h3 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white mt-0.5">
              {isGvaTable && 'TABLE 2.2: Gross Value Added by Kind of Economic Activity (2021)'}
              {isPublicDebt && 'EXTRACT 2.3: Public Debt on the Increase (National Budget Statement)'}
              {isMultiplierGraph && 'FIGURE 2.4: The Multiplier Effect Concept & Equilibrium Shift'}
              {isEnergyPlan && "FIGURE 3.2: South Africa's 2030 Energy Plan & Renewable Projects"}
              {isSezCartoon && 'CARTOON & INFO 3.3: Special Economic Zones (SEZ how?)'}
              {isWhyTrade && 'EXTRACT 4.2: Why Do Countries Trade? (International Trade Basis)'}
              {isEconHitsLow && "CARTOON & STATS 4.3: South Africa's Economy Hits Low (StatsSA 2020/21)"}
              {isSectionCEssay && 'RUBRIC: Structure of Essay & 40-Mark Assessment Matrix'}
            </h3>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className={`px-2.5 py-1.5 rounded-xl text-xs font-bold border flex items-center gap-1.5 transition-all cursor-pointer ${
            isDark 
              ? 'bg-[#220a12] hover:bg-[#2e0e1a] text-rose-300 border-rose-900/80' 
              : 'bg-white hover:bg-rose-50 text-rose-700 border-rose-200 shadow-xs'
          }`}
        >
          {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          <span>{isExpanded ? 'Collapse' : 'Expand Annexure'}</span>
        </button>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="p-4 sm:p-6 space-y-4"
          >
            {/* =============================================================== */}
            {/* ANNEXURE 1: GROSS VALUE ADDED TABLE (QUESTION 2.2) */}
            {/* =============================================================== */}
            {isGvaTable && (
              <div className="space-y-3 font-sans">
                <div className="flex items-center justify-between text-xs font-bold text-rose-700 dark:text-rose-300">
                  <span>GROSS VALUE ADDED BY KIND OF ECONOMIC ACTIVITY</span>
                  <span className="text-[11px] font-mono font-medium text-slate-500">2021 Figures (R Millions)</span>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-rose-200 dark:border-rose-900/80 shadow-xs">
                  <table className="w-full text-xs sm:text-sm text-left border-collapse">
                    <thead>
                      <tr className={isDark ? 'bg-[#240c14] text-rose-200 border-b border-rose-900' : 'bg-rose-100/80 text-rose-900 border-b border-rose-200'}>
                        <th className="p-3 font-black">Economic Activity</th>
                        <th className="p-3 font-black text-right">
                          <span>At constant 2015 prices</span>
                          <span className="block text-[10px] font-semibold text-rose-600 dark:text-rose-400">(Base Year = 2015)</span>
                        </th>
                        <th className="p-3 font-black text-right">
                          <span>At current prices</span>
                          <span className="block text-[10px] font-semibold text-slate-500">(Nominal Prices)</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-rose-100 dark:divide-rose-950 font-medium">
                      <tr className={isDark ? 'hover:bg-rose-950/20' : 'hover:bg-rose-50/50'}>
                        <td className="p-3 font-bold text-slate-800 dark:text-rose-100">Primary sector</td>
                        <td className="p-3 text-right font-mono font-bold">295 203</td>
                        <td className="p-3 text-right font-mono font-bold">472 082</td>
                      </tr>
                      <tr className={isDark ? 'hover:bg-rose-950/20' : 'hover:bg-rose-50/50'}>
                        <td className="p-3 font-bold text-slate-800 dark:text-rose-100">Secondary sector</td>
                        <td className="p-3 text-right font-mono font-bold">552 601</td>
                        <td className="p-3 text-right font-mono font-bold">943 771</td>
                      </tr>
                      <tr className={isDark ? 'hover:bg-rose-950/20' : 'hover:bg-rose-50/50'}>
                        <td className="p-3 font-bold text-slate-800 dark:text-rose-100">Tertiary sector</td>
                        <td className="p-3 text-right font-mono font-bold">2 017 745</td>
                        <td className="p-3 text-right font-mono font-bold">3 107 747</td>
                      </tr>
                      <tr className={isDark ? 'bg-[#2a0e18] text-rose-300 font-black' : 'bg-rose-50 text-rose-900 font-black'}>
                        <td className="p-3 text-sm">Gross value added at basic prices</td>
                        <td className="p-3 text-right font-mono text-sm font-black text-rose-600 dark:text-rose-400">2 865 548</td>
                        <td className="p-3 text-right font-mono text-sm font-black">4 523 600</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 italic px-1">
                  <span>[Adapted from SARB Quarterly Bulletin, March 2021]</span>
                  <span className="font-semibold text-rose-600 dark:text-rose-400">Note: GVA at basic prices + taxes on products - subsidies = GDP @ market prices</span>
                </div>
              </div>
            )}

            {/* =============================================================== */}
            {/* ANNEXURE 2: PUBLIC DEBT EXTRACT (QUESTION 2.3) */}
            {/* =============================================================== */}
            {isPublicDebt && (
              <div className="space-y-3 font-sans">
                <div className={`p-5 rounded-2xl border ${
                  isDark ? 'bg-[#1b0810] border-rose-900/80' : 'bg-rose-50/60 border-rose-200'
                }`}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2.5 py-1 rounded-lg text-xs font-black uppercase bg-red-600 text-white shadow-xs">
                      BUDGET POLICY EXTRACT
                    </span>
                    <h4 className="text-sm font-black uppercase tracking-wide text-rose-900 dark:text-rose-200">
                      PUBLIC DEBT ON THE INCREASE
                    </h4>
                  </div>

                  <div className="text-xs sm:text-sm leading-relaxed space-y-3 font-serif italic text-slate-800 dark:text-slate-200">
                    <p>
                      &ldquo;High government debt levels increase the cost of borrowing across the economy. The rising debt leads to higher future taxation and uncertainty. Servicing this rising debt takes away resources that could have been invested in infrastructure. Our borrowing requirement will remain well above <strong className="font-bold underline text-rose-600 dark:text-rose-400">R500 billion</strong> in each year of the medium term despite the modest improvements in our fiscal position.&rdquo;
                    </p>
                    <p>
                      &ldquo;This 2021 budget framework puts South Africa on course to achieve a primary surplus. By doing this, government debt will stabilise at <strong className="font-bold underline text-rose-600 dark:text-rose-400">88,9 per cent</strong> of gross domestic product in 2025/26.&rdquo;
                    </p>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-rose-200/80 dark:border-rose-900/80 flex items-center justify-between text-[11px] text-slate-500 font-sans">
                    <span>[Adapted from 2021/22 Annual Budget Statement, National Treasury]</span>
                    <span className="font-bold text-rose-600 dark:text-rose-400">International benchmark: Not more than 60% of GDP</span>
                  </div>
                </div>
              </div>
            )}

            {/* =============================================================== */}
            {/* ANNEXURE 3: MULTIPLIER EFFECT GRAPH (QUESTION 2.4) */}
            {/* =============================================================== */}
            {isMultiplierGraph && (
              <div className="space-y-4 font-sans">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-rose-700 dark:text-rose-300 uppercase">Keynesian Multiplier Effect: Shift in Aggregate Expenditure</span>
                  <span className="text-rose-600 font-black font-mono">Max 4 Marks for Graph + 4 Marks for Explanation</span>
                </div>

                <div className="w-full flex justify-center bg-white dark:bg-[#100306] p-4 rounded-2xl border border-rose-200 dark:border-rose-900/80 overflow-x-auto shadow-inner">
                  <svg viewBox="0 0 520 320" className="w-full max-w-lg h-64 sm:h-72">
                    {/* Background Grid */}
                    <defs>
                      <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#e11d48" />
                      </marker>
                    </defs>

                    {/* Axes */}
                    <line x1="70" y1="260" x2="480" y2="260" stroke={isDark ? '#e2e8f0' : '#1e293b'} strokeWidth="2.5" />
                    <line x1="70" y1="260" x2="70" y2="40" stroke={isDark ? '#e2e8f0' : '#1e293b'} strokeWidth="2.5" />

                    {/* Axis Labels */}
                    <text x="480" y="280" fill={isDark ? '#f43f5e' : '#e11d48'} fontSize="12" fontWeight="900" textAnchor="end">
                      INCOME (Y) ✓
                    </text>
                    <text x="35" y="45" fill={isDark ? '#f43f5e' : '#e11d48'} fontSize="12" fontWeight="900" transform="rotate(-90, 35, 45)" textAnchor="end">
                      EXPENDITURE (E) ✓
                    </text>
                    <text x="55" y="275" fill={isDark ? '#94a3b8' : '#64748b'} fontSize="11" fontWeight="bold">0</text>

                    {/* 45-degree Guide Line (E = Y) */}
                    <line x1="70" y1="260" x2="350" y2="50" stroke={isDark ? '#cbd5e1' : '#475569'} strokeWidth="2" strokeDasharray="4 4" />
                    <text x="355" y="45" fill={isDark ? '#cbd5e1' : '#334155'} fontSize="12" fontWeight="900">E = Y ✓</text>
                    <text x="110" y="250" fill={isDark ? '#94a3b8' : '#64748b'} fontSize="10" fontWeight="bold">45°</text>

                    {/* Initial Expenditure Curve: E = C + I */}
                    <line x1="70" y1="180" x2="430" y2="100" stroke="#f43f5e" strokeWidth="3" />
                    <text x="435" y="105" fill="#f43f5e" fontSize="11" fontWeight="900">E = C + I</text>

                    {/* Shifted Expenditure Curve: E1 = C + I */}
                    <line x1="70" y1="130" x2="430" y2="50" stroke="#e11d48" strokeWidth="3.5" />
                    <text x="435" y="55" fill="#e11d48" fontSize="11" fontWeight="900">E₁ = C + I ✓</text>

                    {/* Upward Shift Injection Arrow */}
                    <line x1="170" y1="160" x2="170" y2="115" stroke="#e11d48" strokeWidth="2.5" markerEnd="url(#arrow)" />
                    <text x="178" y="140" fill="#e11d48" fontSize="10" fontWeight="black">ΔI (Injection)</text>

                    {/* Intercepts on Vertical Axis */}
                    <text x="45" y="184" fill="#f43f5e" fontSize="11" fontWeight="bold">AE</text>
                    <circle cx="70" cy="180" r="3.5" fill="#f43f5e" />
                    <text x="40" y="134" fill="#e11d48" fontSize="11" fontWeight="bold">AE₁</text>
                    <circle cx="70" cy="130" r="3.5" fill="#e11d48" />

                    {/* Equilibrium Point E */}
                    <circle cx="218" cy="151" r="5" fill="#b91c1c" />
                    <text x="210" y="140" fill="#b91c1c" fontSize="12" fontWeight="900">E</text>
                    <line x1="218" y1="151" x2="218" y2="260" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 3" />
                    <text x="218" y="278" fill={isDark ? '#e2e8f0' : '#1e293b'} fontSize="11" fontWeight="bold" textAnchor="middle">Y ✓</text>

                    {/* Equilibrium Point E1 */}
                    <circle cx="308" cy="81" r="5" fill="#b91c1c" />
                    <text x="300" y="70" fill="#b91c1c" fontSize="12" fontWeight="900">E₁</text>
                    <line x1="308" y1="81" x2="308" y2="260" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 3" />
                    <text x="308" y="278" fill={isDark ? '#e2e8f0' : '#1e293b'} fontSize="11" fontWeight="bold" textAnchor="middle">Y₁ ✓</text>

                    {/* Horizontal Income Multiplier Expansion Arrow */}
                    <line x1="225" y1="245" x2="300" y2="245" stroke="#e11d48" strokeWidth="2" markerEnd="url(#arrow)" />
                    <text x="260" y="240" fill="#e11d48" fontSize="9" fontWeight="bold" textAnchor="middle">ΔY (Multiplier Expansion)</text>
                  </svg>
                </div>

                <div className="p-3 rounded-xl bg-rose-50/70 dark:bg-[#1d0812] border border-rose-200 dark:border-rose-900/80 text-[11px] leading-relaxed">
                  <span className="font-black text-rose-700 dark:text-rose-300 uppercase block mb-1">
                    Official Graph Allocation Rubric (Max 4 Marks):
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <div>• Labelling of axes = 1 mark</div>
                    <div>• Labelling on axes = 1 mark</div>
                    <div>• Shift of Consumption func = 1 mark</div>
                    <div>• E = Y line = 1 mark</div>
                  </div>
                </div>
              </div>
            )}

            {/* =============================================================== */}
            {/* ANNEXURE 4: SOUTH AFRICA'S 2030 ENERGY PLAN (QUESTION 3.2) */}
            {/* =============================================================== */}
            {isEnergyPlan && (
              <div className="space-y-4 font-sans">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                  {/* Interactive Pie Chart SVG */}
                  <div className="flex flex-col items-center p-3 rounded-2xl bg-white dark:bg-[#120408] border border-rose-200 dark:border-rose-900/80 shadow-xs">
                    <span className="text-xs font-black uppercase tracking-wider text-rose-700 dark:text-rose-300 mb-2">
                      SOUTH AFRICA&apos;S 2030 ENERGY PLAN
                    </span>

                    <svg viewBox="0 0 240 240" className="w-52 h-52">
                      {/* Coal: 48% (172.8 deg, from 0 to 172.8) */}
                      <path 
                        d="M 120 120 L 120 20 A 100 100 0 0 1 219.8 132.5 Z" 
                        fill={highlightEnergySlice === 'coal' ? '#1e293b' : '#334155'} 
                        className="cursor-pointer transition-all hover:opacity-80"
                        onMouseEnter={() => setHighlightEnergySlice('coal')}
                        onMouseLeave={() => setHighlightEnergySlice(null)}
                      />
                      {/* Gas: 17% (61.2 deg, from 172.8 to 234) */}
                      <path 
                        d="M 120 120 L 219.8 132.5 A 100 100 0 0 1 140.7 217.8 Z" 
                        fill={highlightEnergySlice === 'gas' ? '#0284c7' : '#38bdf8'} 
                        className="cursor-pointer transition-all hover:opacity-80"
                        onMouseEnter={() => setHighlightEnergySlice('gas')}
                        onMouseLeave={() => setHighlightEnergySlice(null)}
                      />
                      {/* Wind: 12% (43.2 deg, from 234 to 277.2) */}
                      <path 
                        d="M 120 120 L 140.7 217.8 A 100 100 0 0 1 45.3 186.6 Z" 
                        fill={highlightEnergySlice === 'wind' ? '#059669' : '#34d399'} 
                        className="cursor-pointer transition-all hover:opacity-80"
                        onMouseEnter={() => setHighlightEnergySlice('wind')}
                        onMouseLeave={() => setHighlightEnergySlice(null)}
                      />
                      {/* Hydro: 11% (39.6 deg, from 277.2 to 316.8) */}
                      <path 
                        d="M 120 120 L 45.3 186.6 A 100 100 0 0 1 20.6 112.5 Z" 
                        fill={highlightEnergySlice === 'hydro' ? '#2563eb' : '#60a5fa'} 
                        className="cursor-pointer transition-all hover:opacity-80"
                        onMouseEnter={() => setHighlightEnergySlice('hydro')}
                        onMouseLeave={() => setHighlightEnergySlice(null)}
                      />
                      {/* Solar: 10% (36 deg, from 316.8 to 352.8) */}
                      <path 
                        d="M 120 120 L 20.6 112.5 A 100 100 0 0 1 47.5 48.7 Z" 
                        fill={highlightEnergySlice === 'solar' ? '#d97706' : '#fbbf24'} 
                        className="cursor-pointer transition-all hover:opacity-80"
                        onMouseEnter={() => setHighlightEnergySlice('solar')}
                        onMouseLeave={() => setHighlightEnergySlice(null)}
                      />
                      {/* Nuclear: 2% (7.2 deg, from 352.8 to 360) */}
                      <path 
                        d="M 120 120 L 47.5 48.7 A 100 100 0 0 1 120 20 Z" 
                        fill={highlightEnergySlice === 'nuclear' ? '#7c3aed' : '#a78bfa'} 
                        className="cursor-pointer transition-all hover:opacity-80"
                        onMouseEnter={() => setHighlightEnergySlice('nuclear')}
                        onMouseLeave={() => setHighlightEnergySlice(null)}
                      />
                      {/* Center Label */}
                      <circle cx="120" cy="120" r="38" fill={isDark ? '#15070c' : '#ffffff'} />
                      <text x="120" y="117" textAnchor="middle" fontSize="10" fontWeight="bold" fill={isDark ? '#ffffff' : '#0f172a'}>ENERGY</text>
                      <text x="120" y="130" textAnchor="middle" fontSize="11" fontWeight="900" fill="#e11d48">2030</text>
                    </svg>

                    <div className="grid grid-cols-3 gap-2 mt-2 text-[10px] font-bold w-full">
                      <div className="p-1 rounded bg-slate-800 text-white text-center">Coal: 48%</div>
                      <div className="p-1 rounded bg-sky-500 text-white text-center">Gas: 17%</div>
                      <div className="p-1 rounded bg-emerald-600 text-white text-center">Wind: 12%</div>
                      <div className="p-1 rounded bg-blue-600 text-white text-center">Hydro: 11%</div>
                      <div className="p-1 rounded bg-amber-500 text-white text-center">Solar: 10%</div>
                      <div className="p-1 rounded bg-purple-600 text-white text-center">Nuclear: 2%</div>
                    </div>
                  </div>

                  {/* Extract Text */}
                  <div className={`p-4 rounded-2xl border space-y-2.5 ${
                    isDark ? 'bg-[#1a0810] border-rose-900/80' : 'bg-rose-50/60 border-rose-200'
                  }`}>
                    <span className="text-[10px] font-black uppercase tracking-wider text-rose-600 dark:text-rose-400">
                      MINISTERIAL POLICY STATEMENT
                    </span>
                    <p className="text-xs sm:text-sm leading-relaxed font-serif italic text-slate-800 dark:text-slate-200">
                      &ldquo;As part of the 2030 plan, the Department of Mineral Resources and Energy effectively unlocked <strong className="font-bold underline text-rose-600 dark:text-rose-400">R56 billion</strong> that will be invested in renewable energy projects across the country. Municipalities are required to select suitable off-grid energy sources and to provide access to poor households.&rdquo;
                    </p>
                    <p className="text-[11px] text-slate-500 font-sans pt-2 border-t border-rose-200/80 dark:border-rose-900/80">
                      [Adapted from Department of Mineral Resources and Energy Statement, 2021]
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* =============================================================== */}
            {/* ANNEXURE 5: SPECIAL ECONOMIC ZONES (QUESTION 3.3) */}
            {/* =============================================================== */}
            {isSezCartoon && (
              <div className="space-y-3 font-sans">
                <div className={`p-5 rounded-2xl border text-center relative overflow-hidden ${
                  isDark ? 'bg-[#18070e] border-rose-900/80' : 'bg-rose-50/50 border-rose-200'
                }`}>
                  <h3 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white mb-4">
                    SEZ how? <span className="text-rose-600 dark:text-rose-400 text-sm font-extrabold block">Special Economic Zones</span>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center text-xs font-bold">
                    {/* Left Dialogue Bubble */}
                    <div className="p-3.5 rounded-2xl bg-white dark:bg-[#120408] border-2 border-rose-400 dark:border-rose-800 shadow-sm relative text-slate-800 dark:text-rose-100">
                      <span className="text-[10px] text-slate-400 uppercase block mb-1">Investor Take-up</span>
                      &ldquo;The SEZ programme attracted <strong className="text-rose-600 dark:text-rose-400 text-sm font-black block">234 investors,</strong> creating <strong className="text-rose-600 dark:text-rose-400 text-sm font-black block">15 000 direct jobs</strong>&rdquo;
                    </div>

                    {/* Center Illustrated Figure */}
                    <div className="flex flex-col items-center justify-center p-2">
                      <div className="w-16 h-16 rounded-full bg-rose-500/15 border-2 border-rose-400 flex items-center justify-center text-rose-600 dark:text-rose-400 shadow-md">
                        <Users className="w-8 h-8" />
                      </div>
                      <span className="text-[11px] font-extrabold text-slate-600 dark:text-slate-300 mt-2">
                        SEZ Executive &amp; Investors
                      </span>
                    </div>

                    {/* Right Dialogue Bubble */}
                    <div className="p-3.5 rounded-2xl bg-white dark:bg-[#120408] border-2 border-rose-400 dark:border-rose-800 shadow-sm relative text-slate-800 dark:text-rose-100">
                      <span className="text-[10px] text-slate-400 uppercase block mb-1">Incentives Offered</span>
                      &ldquo;... offers <strong className="text-rose-600 dark:text-rose-400 underline font-black">Duty-free incentives</strong>, Foreign Investment Grant and Skills Support Programme. <span className="block mt-1 text-[11px] font-bold text-amber-600 dark:text-amber-400">Tax incentives (15% corporate tax)</span>&rdquo;
                    </div>
                  </div>

                  <div className="mt-4 pt-2 border-t border-rose-200 dark:border-rose-900 text-[11px] text-slate-500 flex items-center justify-between">
                    <span>[Adapted from Google, SEZ latest development, March 2021]</span>
                    <span className="font-bold text-rose-600 dark:text-rose-400">Examples: Coega, Dube Tradeport, Tshwane Automotive, Richards Bay</span>
                  </div>
                </div>
              </div>
            )}

            {/* =============================================================== */}
            {/* ANNEXURE 6: WHY DO COUNTRIES TRADE? (QUESTION 4.2) */}
            {/* =============================================================== */}
            {isWhyTrade && (
              <div className="space-y-3 font-sans">
                <div className={`p-5 rounded-2xl border ${
                  isDark ? 'bg-[#19080f] border-rose-900/80' : 'bg-rose-50/60 border-rose-200'
                }`}>
                  <div className="flex items-center gap-2 mb-3">
                    <Globe2 className="w-4 h-4 text-rose-600" />
                    <h4 className="text-sm font-black uppercase tracking-wide text-rose-900 dark:text-rose-200">
                      WHY DO COUNTRIES TRADE?
                    </h4>
                  </div>

                  <div className="text-xs sm:text-sm leading-relaxed space-y-3 font-serif italic text-slate-800 dark:text-slate-200">
                    <p>
                      &ldquo;Today, international trade is at the heart of the global economy and is responsible for much development and prosperity of the modern industrialised world. Countries trade with each other when they do not have the resources, or capacity to satisfy their own needs and wants. By exploiting their domestic <strong className="font-bold underline text-rose-600 dark:text-rose-400">scarce natural resources</strong>, countries can produce a surplus and trade this for the resources they need.&rdquo;
                    </p>
                    <p>
                      &ldquo;Faced by large global markets, firms may be encouraged to adopt <strong className="font-bold underline text-rose-600 dark:text-rose-400">mass production</strong>, and apply <strong className="font-bold underline text-rose-600 dark:text-rose-400">new technology</strong>.&rdquo;
                    </p>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-rose-200/80 dark:border-rose-900/80 flex items-center justify-between text-[11px] text-slate-500 font-sans">
                    <span>[Adapted from www.internationalecon.com]</span>
                    <span className="font-bold text-rose-600 dark:text-rose-400">Supply Reasons: Natural Resources &amp; Technology</span>
                  </div>
                </div>
              </div>
            )}

            {/* =============================================================== */}
            {/* ANNEXURE 7: SOUTH AFRICA'S ECONOMY HITS LOW (QUESTION 4.3) */}
            {/* =============================================================== */}
            {isEconHitsLow && (
              <div className="space-y-3 font-sans">
                <div className={`p-5 rounded-2xl border ${
                  isDark ? 'bg-[#1a070e] border-rose-900/80' : 'bg-rose-50/60 border-rose-200'
                }`}>
                  <div className="flex items-center justify-between mb-3 flex-wrap">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-rose-600" />
                      <h4 className="text-sm font-black uppercase tracking-wide text-rose-900 dark:text-rose-200">
                        SOUTH AFRICA&apos;S ECONOMY HITS LOW
                      </h4>
                    </div>
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-red-600 text-white">
                      COVID-19 SLUMP (Q1-Q2 2020)
                    </span>
                  </div>

                  {/* Cartoon Visual Representation */}
                  <div className="p-4 rounded-xl bg-white dark:bg-[#100305] border border-rose-200 dark:border-rose-900/80 text-center mb-3">
                    <div className="inline-block relative">
                      <span className="text-4xl sm:text-5xl font-black tracking-widest text-slate-800 dark:text-slate-200 font-sans">
                        J<span className="inline-block relative text-rose-600">O<span className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-white bg-rose-600 rounded-full w-5 h-5 mx-auto top-2">HELP!</span></span>BS
                      </span>
                      <span className="block text-xs font-bold text-rose-600 dark:text-rose-400 mt-1">
                        &larr; &ldquo;Weak economic growth&rdquo;
                      </span>
                    </div>
                  </div>

                  {/* Extract Text */}
                  <p className="text-xs sm:text-sm leading-relaxed font-serif italic text-slate-800 dark:text-slate-200">
                    &ldquo;South Africa&apos;s gross domestic product (GDP) fell by just over <strong className="font-bold underline text-rose-600 dark:text-rose-400">16,4%</strong> between the first quarter and second quarter of 2020, resulting in an annualised growth rate of <strong className="font-bold underline text-rose-600 dark:text-rose-400">-51%</strong>. The demand side of the economy slumped by <strong className="font-bold underline text-rose-600 dark:text-rose-400">52,3%</strong> as a result of lower <strong className="underline">exports</strong> and <strong className="underline">household spending</strong>.&rdquo;
                  </p>

                  <div className="mt-3 pt-2.5 border-t border-rose-200/80 dark:border-rose-900/80 flex items-center justify-between text-[11px] text-slate-500 font-sans">
                    <span>[Adapted from @StatsSA, February 2021]</span>
                    <span className="font-bold text-rose-600 dark:text-rose-400">Aggregate Demand Slump: Exports &amp; Consumer Spending</span>
                  </div>
                </div>
              </div>
            )}

            {/* =============================================================== */}
            {/* ANNEXURE 8: SECTION C ESSAY STRUCTURE & RUBRIC (QUESTIONS 5 & 6) */}
            {/* =============================================================== */}
            {isSectionCEssay && (
              <div className="space-y-3 font-sans">
                <div className="overflow-x-auto rounded-2xl border border-rose-200 dark:border-rose-900/80 shadow-xs">
                  <table className="w-full text-xs sm:text-sm text-left border-collapse">
                    <thead>
                      <tr className={isDark ? 'bg-[#240c14] text-rose-200 border-b border-rose-900' : 'bg-rose-100/80 text-rose-900 border-b border-rose-200'}>
                        <th className="p-3 font-black">STRUCTURE OF ESSAY</th>
                        <th className="p-3 font-black text-right">MARK ALLOCATION</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-rose-100 dark:divide-rose-950 text-xs">
                      <tr>
                        <td className="p-3 font-medium">
                          <strong className="font-black text-rose-600 dark:text-rose-400 block mb-0.5">Introduction</strong>
                          A good starting point would be to define the main concept related to the question topic. Do NOT include any part of the question or repeat in the body.
                        </td>
                        <td className="p-3 text-right font-black text-rose-600 dark:text-rose-400 text-sm">Max. 2</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium">
                          <strong className="font-black text-rose-600 dark:text-rose-400 block mb-0.5">Body: Main Part</strong>
                          In-depth discussion / Examine / Critically discuss / Analyse / Compare / Evaluate / Explain.
                          (A maximum of 8 marks may be allocated for headings/examples).
                        </td>
                        <td className="p-3 text-right font-black text-rose-600 dark:text-rose-400 text-sm">Max. 26</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium">
                          <strong className="font-black text-rose-600 dark:text-rose-400 block mb-0.5">Body: Additional Part</strong>
                          Critically discuss / Evaluate / Debate / Deduce / Interpret / How? / Suggest.
                          (A maximum of 2 marks may be allocated for mere listing of facts).
                        </td>
                        <td className="p-3 text-right font-black text-rose-600 dark:text-rose-400 text-sm">Max. 10</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium">
                          <strong className="font-black text-rose-600 dark:text-rose-400 block mb-0.5">Conclusion</strong>
                          Higher-order conclusion: brief summary without repeating facts, valued judgement, contradictory viewpoint with motivation, or recommendations.
                        </td>
                        <td className="p-3 text-right font-black text-rose-600 dark:text-rose-400 text-sm">Max. 2</td>
                      </tr>
                      <tr className={isDark ? 'bg-[#2a0e18] text-rose-300 font-black' : 'bg-rose-50 text-rose-900 font-black'}>
                        <td className="p-3 text-sm">TOTAL MARKS FOR ESSAY</td>
                        <td className="p-3 text-right text-base text-rose-600 dark:text-rose-400 font-black">40 MARKS</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EconomicsAnnexureViewer;
