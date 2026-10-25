'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart3, 
  Maximize2, 
  Minimize2, 
  Table, 
  TrendingUp, 
  TrendingDown, 
  Layers, 
  Info,
  Car,
  PhoneCall,
  Droplets,
  ShowerHead,
  Utensils,
  Plane,
  Receipt,
  Laptop,
  Coins,
  CheckCircle2,
  Calendar,
  Sparkles
} from 'lucide-react';
import { Question } from '@/lib/quiz-data';
import { useAppTheme } from '@/lib/theme';

interface QuestionVisualAssetProps {
  question: Question;
  currentIndex?: number;
  isExpandedDefault?: boolean;
}

export const QuestionVisualAsset: React.FC<QuestionVisualAssetProps> = ({
  question,
  currentIndex = 0,
  isExpandedDefault = true,
}) => {
  const { isDark } = useAppTheme();
  const [isExpanded, setIsExpanded] = useState(isExpandedDefault);
  const [viewMode, setViewMode] = useState<'chart' | 'table'>('chart');
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [activeFinanceCar, setActiveFinanceCar] = useState<'figo' | 'polo'>('figo');
  const [showerMinutes, setShowerMinutes] = useState<number>(6);

  const qId = question.id;
  const text = (question.question + ' ' + (question.category || '')).toLowerCase();

  // Match which DBE visual or annexure applies
  const isFuelPrice = (qId >= 701 && qId <= 705) || text.includes('fuel price') || text.includes('table 1');
  const isCookingEnergy = (qId >= 706 && qId <= 710) || text.includes('cooking') || text.includes('graph 1.2');
  const isReadingSurvey = (qId >= 711 && qId <= 715) || text.includes('reading') || text.includes('information sheet') || text.includes('questionnaire');
  const isVehicleFinance = (qId >= 716 && qId <= 721) || text.includes('table 2') || text.includes('ford figo') || text.includes('vw polo');
  const isAnnexureACellphone = (qId >= 722 && qId <= 726) || text.includes('annexure a') || text.includes('cellphone contract invoice') || text.includes('mr fortune');
  const isDamLevels = (qId >= 727 && qId <= 733) || text.includes('table 3') || text.includes('dam level') || text.includes('fsc');
  const isAnnexureBShower = (qId >= 734 && qId <= 736) || text.includes('annexure b') || text.includes('shower head') || text.includes('low-flow');
  const isBiryaniCost = (qId >= 737 && qId <= 740) || text.includes('table 4') || text.includes('table 5') || text.includes('bobby') || text.includes('biryani');
  const isJanetBiryaniGraph = (qId >= 741 && qId <= 743) || text.includes('table 6') || text.includes('janet') || text.includes('plates of biryani') || text.includes('answer sheet');
  const isAnnexureCTourism = (qId >= 744 && qId <= 747) || text.includes('annexure c') || text.includes('tourist arrivals') || text.includes('india');
  const isSarsTax = (qId >= 748 && qId <= 751) || text.includes('table 7') || text.includes('table 8') || text.includes('marius') || text.includes('tax bracket');
  const isLaptopBoxPlot = (qId >= 752 && qId <= 755) || text.includes('box-and-whisker') || text.includes('laptop') || text.includes('huawei') || text.includes('samsung') || text.includes('apple');

  // If no matching visual context, return null
  if (!isFuelPrice && !isCookingEnergy && !isReadingSurvey && !isVehicleFinance && !isAnnexureACellphone && !isDamLevels && !isAnnexureBShower && !isBiryaniCost && !isJanetBiryaniGraph && !isAnnexureCTourism && !isSarsTax && !isLaptopBoxPlot) {
    return null;
  }

  return (
    <div className={`my-4 rounded-3xl border transition-all overflow-hidden shadow-xl ${
      isDark 
        ? 'bg-[#15070a] border-rose-900/70 shadow-lg shadow-black/40 text-white' 
        : 'bg-white border-rose-200 shadow-md sunlit-card text-slate-900'
    }`}>
      {/* Top Header Bar */}
      <div className={`px-4 sm:px-6 py-3.5 border-b flex items-center justify-between gap-3 flex-wrap ${
        isDark ? 'bg-[#1c0a0e] border-rose-950/70' : 'bg-gradient-to-r from-rose-50 via-red-50/40 to-white border-rose-100'
      }`}>
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-red-600 via-rose-500 to-rose-400 text-white flex items-center justify-center shadow-md shadow-rose-500/25 shrink-0">
            {isFuelPrice && <Coins className="w-4 h-4" />}
            {isCookingEnergy && <BarChart3 className="w-4 h-4" />}
            {isReadingSurvey && <Table className="w-4 h-4" />}
            {isVehicleFinance && <Car className="w-4 h-4" />}
            {isAnnexureACellphone && <Receipt className="w-4 h-4" />}
            {isDamLevels && <Droplets className="w-4 h-4" />}
            {isAnnexureBShower && <ShowerHead className="w-4 h-4" />}
            {isBiryaniCost && <Utensils className="w-4 h-4" />}
            {isJanetBiryaniGraph && <TrendingUp className="w-4 h-4" />}
            {isAnnexureCTourism && <Plane className="w-4 h-4" />}
            {isSarsTax && <Receipt className="w-4 h-4" />}
            {isLaptopBoxPlot && <Laptop className="w-4 h-4" />}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-900">
                OFFICIAL DBE NSC ADDENDUM
              </span>
              <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400">Mathematical Literacy P1 (November 2021)</span>
            </div>
            <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white mt-0.5">
              {isFuelPrice && 'TABLE 1: Fuel Price (in US Dollars) in Six African Countries & Exchange Rates'}
              {isCookingEnergy && 'GRAPH 1.2: Different Energy Sources Used for Cooking in Different Provinces'}
              {isReadingSurvey && 'INFORMATION SHEET 1.3: Company Reading Habits Survey (Questions A–E)'}
              {isVehicleFinance && 'TABLE 2: Payment Options for Two Different Cars (Ford Figo vs VW Polo)'}
              {isAnnexureACellphone && 'ANNEXURE A (QUESTION 2.2): Cellphone Contract Invoice for Mr SJ Fortune'}
              {isDamLevels && 'TABLE 3 (QUESTION 3.1): Dam Levels in Different Provinces (5 April 2021)'}
              {isAnnexureBShower && 'ANNEXURE B (QUESTION 3.2): Water and Energy Use per Shower (Normal vs Low-Flow)'}
              {isBiryaniCost && "TABLE 4 & 5 (QUESTION 4.1): Bobby's Biryani Ingredient Costs & ZAR/INR Exchange Rate"}
              {isJanetBiryaniGraph && "ANSWER SHEET (QUESTION 4.2): Janet's Business Graph for Plates of Biryani"}
              {isAnnexureCTourism && 'ANNEXURE C (QUESTION 4.3): Tourist Arrivals in India (2015–2019) & Source Countries'}
              {isSarsTax && 'TABLE 7 & 8 (QUESTION 5.1): SARS Personal Income Tax Rates, Rebates & Medical Credits (2019/20)'}
              {isLaptopBoxPlot && 'FIGURE 5.2 (QUESTION 5.2): Box-and-Whisker Plots of Three Laptop Brands (Huawei, Samsung, Apple)'}
            </h4>
          </div>
        </div>

        {/* View Controls */}
        <div className="flex items-center gap-1.5 shrink-0">
          {(isFuelPrice || isCookingEnergy || isAnnexureBShower || isJanetBiryaniGraph || isAnnexureCTourism) && (
            <div className={`flex rounded-xl p-0.5 border ${
              isDark ? 'bg-[#120507] border-rose-950/60' : 'bg-rose-50/80 border-rose-200'
            }`}>
              <button
                type="button"
                onClick={() => setViewMode('chart')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'chart'
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                Graph
              </button>
              <button
                type="button"
                onClick={() => setViewMode('table')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'table'
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                Table
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className={`px-2.5 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
              isDark ? 'border-rose-900 text-rose-300 hover:bg-rose-950' : 'border-rose-200 text-rose-700 hover:bg-rose-50 shadow-xs'
            }`}
          >
            {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            <span>{isExpanded ? 'Collapse' : 'Expand Annexure'}</span>
          </button>
        </div>
      </div>

      {/* Visual Content Body */}
      {isExpanded && (
        <div className="p-4 sm:p-6 space-y-4">
          {/* =============================================================== */}
          {/* 1. TABLE 1: FUEL PRICES & EXCHANGE RATES */}
          {/* =============================================================== */}
          {isFuelPrice && (
            <div>
              {viewMode === 'chart' ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs text-slate-500 flex-wrap gap-2">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-sm bg-rose-300 border border-rose-400" />
                        <span className="font-semibold">05/06/2019 (US$)</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-sm bg-red-600 border border-red-700" />
                        <span className="font-semibold">01/03/2021 (US$)</span>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono text-rose-600 dark:text-rose-400">
                      *Click any bar for exchange rate info
                    </span>
                  </div>

                  <div className="w-full overflow-x-auto">
                    <svg viewBox="0 0 650 250" className="w-full min-w-[550px] h-60">
                      {[0, 0.25, 0.5, 0.75, 1.0, 1.25, 1.5].map((val, idx) => {
                        const y = 200 - (val / 1.5) * 170;
                        return (
                          <g key={idx}>
                            <line x1="60" y1={y} x2="620" y2={y} stroke={isDark ? '#38131d' : '#ffe4e6'} strokeDasharray="3 3" />
                            <text x="50" y={y + 4} textAnchor="end" fontSize="10" fill={isDark ? '#94a3b8' : '#64748b'}>
                              ${val.toFixed(2)}
                            </text>
                          </g>
                        );
                      })}

                      {[
                        { name: 'South Africa', p19: 1.04, p21: 1.061, rate: 'R15,36 / $', inc: true, diff: '+0,021' },
                        { name: 'Angola', p19: 0.47, p21: 0.254, rate: '626,41 kwanzas / $', inc: false, diff: '-0,216' },
                        { name: 'Zimbabwe', p19: 0.80, p21: 1.258, rate: '$1,258 (Highest Increase)', inc: true, diff: '+0,458' },
                        { name: 'Namibia', p19: 0.88, p21: 0.796, rate: '15,36 NAD / $', inc: false, diff: '-0,084' },
                        { name: 'Swaziland', p19: 0.86, p21: 0.870, rate: '15,35 SZL / $', inc: true, diff: '+0,010' },
                        { name: 'Botswana', p19: 0.84, p21: 0.732, rate: '11,14 BWP / $ ($0.0898)', inc: false, diff: '-0,108' },
                      ].map((item, i) => {
                        const x = 80 + i * 90;
                        const h19 = (item.p19 / 1.5) * 170;
                        const h21 = (item.p21 / 1.5) * 170;
                        const isSel = selectedCountry === item.name;

                        return (
                          <g 
                            key={item.name} 
                            onClick={() => setSelectedCountry(selectedCountry === item.name ? null : item.name)}
                            className="cursor-pointer group"
                          >
                            <rect 
                              x={x - 8} 
                              y="20" 
                              width="80" 
                              height="190" 
                              fill={isSel ? (isDark ? '#2e1017' : '#fff1f2') : 'transparent'} 
                              rx="6" 
                            />
                            <rect x={x} y={200 - h19} width="30" height={h19} fill={isDark ? '#f43f5e' : '#fda4af'} rx="4" />
                            <text x={x + 15} y={195 - h19} textAnchor="middle" fontSize="9" fontWeight="bold" fill={isDark ? '#fda4af' : '#be123c'}>
                              {item.p19}
                            </text>
                            <rect x={x + 34} y={200 - h21} width="30" height={h21} fill="#dc2626" rx="4" />
                            <text x={x + 49} y={195 - h21} textAnchor="middle" fontSize="9" fontWeight="bold" fill="#dc2626">
                              {item.p21}
                            </text>
                            <rect 
                              x={x + 8} 
                              y="26" 
                              width="48" 
                              height="16" 
                              rx="8" 
                              fill={item.inc ? (isDark ? '#450a0a' : '#fee2e2') : (isDark ? '#064e3b' : '#dcfce7')} 
                            />
                            <text 
                              x={x + 32} 
                              y="38" 
                              textAnchor="middle" 
                              fontSize="9" 
                              fontWeight="bold" 
                              fill={item.inc ? '#dc2626' : '#16a34a'}
                            >
                              {item.diff}
                            </text>
                            <text 
                              x={x + 32} 
                              y="222" 
                              textAnchor="middle" 
                              fontSize="10" 
                              fontWeight={isSel ? "900" : "bold"} 
                              fill={isDark ? '#e2e8f0' : '#1e293b'}
                            >
                              {item.name}
                            </text>
                          </g>
                        );
                      })}
                      <line x1="60" y1="200" x2="620" y2="200" stroke={isDark ? '#64748b' : '#94a3b8'} strokeWidth="1.5" />
                    </svg>
                  </div>
                </div>
              ) : (
                <div className="overflow-x-auto rounded-2xl border border-rose-200 dark:border-rose-900">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead className={isDark ? 'bg-[#240c14] text-rose-200' : 'bg-rose-100 text-rose-900'}>
                      <tr>
                        <th className="p-3 font-black">Country</th>
                        <th className="p-3 font-black text-right">05/06/2019 (US$)</th>
                        <th className="p-3 font-black text-right">01/03/2021 (US$)</th>
                        <th className="p-3 font-black text-right">Current Rate / Currency</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-rose-100 dark:divide-rose-950 font-medium">
                      <tr><td className="p-3 font-bold">South Africa</td><td className="p-3 text-right font-mono">1,04</td><td className="p-3 text-right font-mono">1,061</td><td className="p-3 text-right font-mono">R15,36</td></tr>
                      <tr><td className="p-3 font-bold">Angola</td><td className="p-3 text-right font-mono">0,47</td><td className="p-3 text-right font-mono">0,254</td><td className="p-3 text-right font-mono">626,41 Angolan kwanzas</td></tr>
                      <tr><td className="p-3 font-bold text-red-600">Zimbabwe</td><td className="p-3 text-right font-mono">0,80</td><td className="p-3 text-right font-mono font-bold text-red-600">1,258</td><td className="p-3 text-right font-mono">$1,258</td></tr>
                      <tr><td className="p-3 font-bold">Namibia</td><td className="p-3 text-right font-mono">0,88</td><td className="p-3 text-right font-mono">0,796</td><td className="p-3 text-right font-mono">15,36 Namibian dollars</td></tr>
                      <tr><td className="p-3 font-bold">Swaziland</td><td className="p-3 text-right font-mono">0,86</td><td className="p-3 text-right font-mono">0,87</td><td className="p-3 text-right font-mono">15,35 Swazi emalangeni</td></tr>
                      <tr><td className="p-3 font-bold text-red-600">Botswana</td><td className="p-3 text-right font-mono">0,84</td><td className="p-3 text-right font-mono">0,732</td><td className="p-3 text-right font-mono font-bold text-red-600">11,14 Botswana pulas</td></tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* =============================================================== */}
          {/* 2. GRAPH 1.2: PROVINCIAL ENERGY SOURCES FOR COOKING */}
          {/* =============================================================== */}
          {isCookingEnergy && (
            <div className="space-y-3 font-sans">
              <div className="flex items-center justify-between text-xs flex-wrap gap-2">
                <span className="font-bold text-rose-700 dark:text-rose-300">
                  Different Energy Sources Used for Cooking in Different Provinces (Percentages)
                </span>
                <span className="text-[11px] font-bold text-red-600 font-mono">
                  Paraffin Price: 764,59 c/ℓ (R7,65/ℓ)
                </span>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-rose-200 dark:border-rose-900 p-3 bg-white dark:bg-[#120408]">
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-[10px] font-bold mb-3">
                  <div className="p-1.5 rounded-lg bg-emerald-600 text-white text-center">Electricity (Dominant)</div>
                  <div className="p-1.5 rounded-lg bg-sky-500 text-white text-center">Gas</div>
                  <div className="p-1.5 rounded-lg bg-amber-600 text-white text-center">Paraffin</div>
                  <div className="p-1.5 rounded-lg bg-orange-700 text-white text-center">Wood (Limpopo highest)</div>
                  <div className="p-1.5 rounded-lg bg-slate-600 text-white text-center">Other (Solar/Coal/Dung)</div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead className={isDark ? 'bg-[#240c14] text-rose-200' : 'bg-rose-100 text-rose-900'}>
                      <tr>
                        <th className="p-2 font-black">Province</th>
                        <th className="p-2 font-black text-right">Electricity</th>
                        <th className="p-2 font-black text-right">Gas</th>
                        <th className="p-2 font-black text-right">Paraffin</th>
                        <th className="p-2 font-black text-right">Wood</th>
                        <th className="p-2 font-black text-right">Other</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-rose-100 dark:divide-rose-950 font-medium">
                      <tr><td className="p-2 font-bold">Western Cape</td><td className="p-2 text-right">86,5%</td><td className="p-2 text-right">10,2%</td><td className="p-2 text-right">1,8%</td><td className="p-2 text-right">0,9%</td><td className="p-2 text-right">0,6%</td></tr>
                      <tr><td className="p-2 font-bold">Eastern Cape</td><td className="p-2 text-right">70,8%</td><td className="p-2 text-right">3,5%</td><td className="p-2 text-right">11,2%</td><td className="p-2 text-right">13,5%</td><td className="p-2 text-right">1,0%</td></tr>
                      <tr><td className="p-2 font-bold">Northern Cape</td><td className="p-2 text-right">83,4%</td><td className="p-2 text-right">5,9%</td><td className="p-2 text-right">1,5%</td><td className="p-2 text-right">8,2%</td><td className="p-2 text-right">1,0%</td></tr>
                      <tr><td className="p-2 font-bold">Free State</td><td className="p-2 text-right">86,1%</td><td className="p-2 text-right">3,4%</td><td className="p-2 text-right">5,2%</td><td className="p-2 text-right">4,3%</td><td className="p-2 text-right">1,0%</td></tr>
                      <tr><td className="p-2 font-bold">KwaZulu-Natal</td><td className="p-2 text-right">72,5%</td><td className="p-2 text-right">4,8%</td><td className="p-2 text-right">5,1%</td><td className="p-2 text-right">16,4%</td><td className="p-2 text-right">1,2%</td></tr>
                      <tr><td className="p-2 font-bold">North West</td><td className="p-2 text-right">81,3%</td><td className="p-2 text-right">1,2%</td><td className="p-2 text-right">7,5%</td><td className="p-2 text-right">9,2%</td><td className="p-2 text-right">0,8%</td></tr>
                      <tr><td className="p-2 font-bold">Gauteng</td><td className="p-2 text-right">84,1%</td><td className="p-2 text-right">3,6%</td><td className="p-2 text-right">9,8%</td><td className="p-2 text-right">1,5%</td><td className="p-2 text-right">1,0%</td></tr>
                      <tr><td className="p-2 font-bold">Mpumalanga</td><td className="p-2 text-right">71,4%</td><td className="p-2 text-right">1,5%</td><td className="p-2 text-right">3,6%</td><td className="p-2 text-right">22,4%</td><td className="p-2 text-right">1,1%</td></tr>
                      <tr className={isDark ? 'bg-red-950/40 text-red-300 font-bold' : 'bg-red-50 text-red-900 font-bold'}><td className="p-2 font-black">Limpopo</td><td className="p-2 text-right">54,2%</td><td className="p-2 text-right">1,1%</td><td className="p-2 text-right">2,8%</td><td className="p-2 text-right font-black text-red-600">41,2% (Highest)</td><td className="p-2 text-right">0,7%</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* =============================================================== */}
          {/* 3. INFORMATION SHEET 1.3: READING SURVEY */}
          {/* =============================================================== */}
          {isReadingSurvey && (
            <div className="space-y-3 font-sans">
              <div className={`p-5 rounded-2xl border ${
                isDark ? 'bg-[#1b0810] border-rose-900/80' : 'bg-rose-50/60 border-rose-200'
              }`}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded-lg text-xs font-black uppercase bg-red-600 text-white shadow-xs">
                    SURVEY INSTRUMENT
                  </span>
                  <h4 className="text-sm font-black uppercase tracking-wide text-rose-900 dark:text-rose-200">
                    Company Reading Habits Information Sheet
                  </h4>
                </div>
                <div className="space-y-2.5 text-xs sm:text-sm font-medium">
                  <div className="p-2.5 rounded-xl bg-white dark:bg-[#120408] border border-rose-200 dark:border-rose-900 flex items-start gap-2.5">
                    <span className="font-black text-rose-600">A.</span>
                    <span>How many hours per day do you spend reading?</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white dark:bg-[#120408] border border-rose-200 dark:border-rose-900 flex items-start gap-2.5">
                    <span className="font-black text-rose-600">B.</span>
                    <span>How many books have you read in the last 16 weeks?</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white dark:bg-[#120408] border border-rose-200 dark:border-rose-900 flex items-start gap-2.5">
                    <span className="font-black text-rose-600">C.</span>
                    <span>How many books have you bought in the last 3 months?</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white dark:bg-[#120408] border border-rose-200 dark:border-rose-900 flex items-start gap-2.5">
                    <span className="font-black text-rose-600">D.</span>
                    <span>Were the books you bought hard copies or soft copies? <strong className="text-rose-600 dark:text-rose-400 font-bold">(Categorical data)</strong></span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white dark:bg-[#120408] border border-rose-200 dark:border-rose-900 flex items-start gap-2.5">
                    <span className="font-black text-rose-600">E.</span>
                    <span>Do you believe that we should pay 15% VAT (Value Added Tax) on book prices?</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =============================================================== */}
          {/* 4. TABLE 2: VEHICLE FINANCING (FORD FIGO vs VW POLO) */}
          {/* =============================================================== */}
          {isVehicleFinance && (
            <div className="space-y-3 font-sans">
              <div className="flex items-center justify-between text-xs font-bold text-rose-700 dark:text-rose-300">
                <span>TABLE 2: PAYMENT OPTIONS FOR TWO DIFFERENT CARS</span>
                <span className="text-[11px] font-mono text-slate-500">Hire purchase / Instalment agreement</span>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-rose-200 dark:border-rose-900">
                <table className="w-full text-xs sm:text-sm text-left border-collapse">
                  <thead className={isDark ? 'bg-[#240c14] text-rose-200' : 'bg-rose-100 text-rose-900'}>
                    <tr>
                      <th className="p-3 font-black">Item</th>
                      <th className="p-3 font-black text-right">FORD FIGO</th>
                      <th className="p-3 font-black text-right">VW POLO</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-rose-100 dark:divide-rose-950 font-medium">
                    <tr><td className="p-3 font-bold">Retail price / Cash price (incl. VAT)</td><td className="p-3 text-right font-mono font-bold text-red-600">R215 100</td><td className="p-3 text-right font-mono font-bold text-red-600">R220 300</td></tr>
                    <tr><td className="p-3 font-bold">Deposit</td><td className="p-3 text-right font-mono font-bold">5% (R10 755)</td><td className="p-3 text-right font-mono font-bold">0%</td></tr>
                    <tr><td className="p-3 font-bold">Monthly instalment</td><td className="p-3 text-right font-mono font-bold">R2 999,00</td><td className="p-3 text-right font-mono font-bold">R3 345,00</td></tr>
                    <tr><td className="p-3 font-bold">Residual value (last month payment)</td><td className="p-3 text-right font-mono font-bold">30% (R64 530)</td><td className="p-3 text-right font-mono font-bold">R116 759</td></tr>
                    <tr><td className="p-3 font-bold">Monthly admin fee (excl. instalment)</td><td className="p-3 text-right font-mono font-bold">R69,00</td><td className="p-3 text-right font-mono font-bold">2,08% of monthly instalment (R69,58)</td></tr>
                    <tr><td className="p-3 font-bold">Term agreement</td><td className="p-3 text-right font-mono font-bold">72 months (6 yrs)</td><td className="p-3 text-right font-mono font-bold">48 months (4 yrs)</td></tr>
                    <tr><td className="p-3 font-bold">VAT</td><td className="p-3 text-right font-mono">15%</td><td className="p-3 text-right font-mono">15%</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="text-[11px] text-slate-500 italic">
                *Residual value is the last month&apos;s payment. [Adapted from www.vw.co.za and www.ford.co.za]
              </p>
            </div>
          )}

          {/* =============================================================== */}
          {/* 5. ANNEXURE A: CELLPHONE CONTRACT INVOICE */}
          {/* =============================================================== */}
          {isAnnexureACellphone && (
            <div className="space-y-3 font-sans">
              <div className={`p-5 rounded-2xl border ${
                isDark ? 'bg-[#18060c] border-rose-900/80' : 'bg-rose-50/50 border-rose-200'
              }`}>
                {/* Invoice Header */}
                <div className="flex items-start justify-between border-b border-rose-200 dark:border-rose-900 pb-3 flex-wrap gap-3">
                  <div>
                    <h3 className="text-base sm:text-lg font-black tracking-tight text-slate-900 dark:text-white">
                      CELLPHONE CONTRACT INVOICE
                    </h3>
                    <p className="text-xs text-slate-500 font-mono">Cellphone Account</p>
                    <div className="mt-2 text-xs font-semibold">
                      <p className="font-bold">Mr SJ Fortune</p>
                      <p>5 Second Avenue</p>
                      <p>Zone 2, Smelderado, 2463</p>
                    </div>
                  </div>

                  <div className="text-right text-xs">
                    <p className="font-bold text-rose-600 dark:text-rose-400">Customer Care: Tel +27083245</p>
                    <p className="text-slate-500">customercare@ABC.co.za | www.abc.co.za</p>
                    <div className="mt-2 space-y-0.5 font-mono text-[11px]">
                      <p><span className="text-slate-400">Invoice date:</span> 17-01-2021</p>
                      <p><span className="text-slate-400">Account Number:</span> BA4536782C</p>
                      <p><span className="text-slate-400">Payment Method:</span> Direct Debit</p>
                      <p><span className="text-slate-400">Due Date:</span> 01-03-2021</p>
                      <p><span className="text-slate-400">Arrears:</span> R0,00</p>
                    </div>
                  </div>
                </div>

                {/* Invoice Line Items */}
                <div className="my-3 space-y-3 text-xs">
                  <span className="font-black text-rose-700 dark:text-rose-300 uppercase block">
                    Summary of charges for your ABC plan:
                  </span>

                  {/* Plan 1 */}
                  <div className="p-3 rounded-xl bg-white dark:bg-[#120408] border border-rose-200 dark:border-rose-900">
                    <div className="flex items-center justify-between font-bold text-red-600 dark:text-rose-400 mb-1">
                      <span>ABC Made For You S</span>
                      <span className="text-[11px] font-normal text-slate-400">Contract: 13-03-2019 to 12-03-2021</span>
                    </div>
                    <div className="flex justify-between py-0.5"><span>Device (17-12-2020 to 16-01-2021)</span><span className="font-mono font-bold">R260,87</span></div>
                    <div className="flex justify-between py-0.5"><span>ABC made for You S (17-01-2021 to 16-02-2021)</span><span className="font-mono font-bold">R94,78</span></div>
                    <div className="flex justify-between pt-1 border-t border-rose-100 dark:border-rose-950 font-black text-slate-800 dark:text-slate-100">
                      <span>Subtotal: (excl. 15% VAT)</span><span className="font-mono text-red-600">R 355,65</span>
                    </div>
                  </div>

                  {/* Plan 2 */}
                  <div className="p-3 rounded-xl bg-white dark:bg-[#120408] border border-rose-200 dark:border-rose-900">
                    <div className="flex items-center justify-between font-bold text-red-600 dark:text-rose-400 mb-1">
                      <span>ABC made for You XS</span>
                      <span className="text-[11px] font-normal text-slate-400">Contract: 13-05-2019 to 12-05-2021</span>
                    </div>
                    <div className="flex justify-between py-0.5"><span>Device (17-12-2020 to 16-01-2021)</span><span className="font-mono font-bold">R173,91</span></div>
                    <div className="flex justify-between py-0.5"><span>ABC made for You XS (17-01-2021 to 16-02-2021)</span><span className="font-mono font-bold">R86,09</span></div>
                    <div className="flex justify-between pt-1 border-t border-rose-100 dark:border-rose-950 font-black text-slate-800 dark:text-slate-100">
                      <span>Subtotal: (excl. 15% VAT)</span><span className="font-mono text-red-600">R 260,00</span>
                    </div>
                  </div>

                  {/* Plan 3 */}
                  <div className="p-3 rounded-xl bg-white dark:bg-[#120408] border border-rose-200 dark:border-rose-900">
                    <div className="flex items-center justify-between font-bold text-red-600 dark:text-rose-400 mb-1">
                      <span>Your ABC Choice 5GB</span>
                      <span className="text-[11px] font-normal text-slate-400">Contract: 19-08-2019 to 18-08-2021</span>
                    </div>
                    <div className="flex justify-between py-0.5"><span>Device (17-12-2020 to 16-01-2021)</span><span className="font-mono font-bold">R165,22</span></div>
                    <div className="flex justify-between py-0.5"><span>Your ABC Choice 5GB (17-01-2021 to 16-02-2021)</span><span className="font-mono font-bold">R172,13</span></div>
                    <div className="flex justify-between pt-1 border-t border-rose-100 dark:border-rose-950 font-black text-slate-800 dark:text-slate-100">
                      <span>Subtotal: (excl. 15% VAT)</span><span className="font-mono text-red-600">R 337,35</span>
                    </div>
                  </div>

                  {/* Totals & VAT */}
                  <div className="p-3.5 rounded-xl bg-rose-100/70 dark:bg-[#250a12] border border-rose-300 dark:border-rose-800 space-y-1.5 font-bold">
                    <div className="flex justify-between">
                      <span>Subtotal (excl. 15% VAT)</span>
                      <span className="font-mono">R953,00</span>
                    </div>
                    <div className="flex justify-between text-red-600 dark:text-rose-400">
                      <span>VAT total 15%</span>
                      <span className="font-mono font-black">R142,95</span>
                    </div>
                    <div className="flex justify-between text-sm sm:text-base font-black pt-1 border-t border-rose-300 dark:border-rose-700">
                      <span>Total amount due for current period (VAT incl.)</span>
                      <span className="font-mono text-red-600 underline">A = R1 095,95</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =============================================================== */}
          {/* 6. TABLE 3: DAM LEVELS IN DIFFERENT PROVINCES (QUESTION 3.1) */}
          {/* =============================================================== */}
          {isDamLevels && (
            <div className="space-y-3 font-sans">
              <div className="flex items-center justify-between text-xs font-bold text-rose-700 dark:text-rose-300 flex-wrap gap-2">
                <span>TABLE 3: DAM LEVELS IN DIFFERENT PROVINCES ON 5 APRIL 2021</span>
                <span className="text-[11px] font-mono text-slate-500">Mean storage capacity last week = 83%</span>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-rose-200 dark:border-rose-900">
                <table className="w-full text-xs sm:text-sm text-left border-collapse">
                  <thead className={isDark ? 'bg-[#240c14] text-rose-200' : 'bg-rose-100 text-rose-900'}>
                    <tr>
                      <th className="p-3 font-black">PROVINCE</th>
                      <th className="p-3 font-black text-right">NET FSC (MILLION m³)</th>
                      <th className="p-3 font-black text-right">THIS WEEK (%)</th>
                      <th className="p-3 font-black text-right">LAST WEEK (%)</th>
                      <th className="p-3 font-black text-right">LAST YEAR (%)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-rose-100 dark:divide-rose-950 font-medium">
                    <tr><td className="p-3 font-bold">Eastern Cape</td><td className="p-3 text-right font-mono">1 823</td><td className="p-3 text-right font-mono">55</td><td className="p-3 text-right font-mono font-bold text-red-600">D (55%)</td><td className="p-3 text-right font-mono">56</td></tr>
                    <tr className="bg-red-50/50 dark:bg-red-950/20"><td className="p-3 font-bold text-red-600">Free State</td><td className="p-3 text-right font-mono font-bold">15 657</td><td className="p-3 text-right font-mono font-bold">100</td><td className="p-3 text-right font-mono font-bold">99</td><td className="p-3 text-right font-mono">77</td></tr>
                    <tr><td className="p-3 font-bold">Gauteng</td><td className="p-3 text-right font-mono font-bold text-red-600">128</td><td className="p-3 text-right font-mono">100</td><td className="p-3 text-right font-mono">101</td><td className="p-3 text-right font-mono">101</td></tr>
                    <tr><td className="p-3 font-bold">KwaZulu-Natal</td><td className="p-3 text-right font-mono">4 784</td><td className="p-3 text-right font-mono">73</td><td className="p-3 text-right font-mono">73</td><td className="p-3 text-right font-mono">61</td></tr>
                    <tr><td className="p-3 font-bold">Limpopo</td><td className="p-3 text-right font-mono">1 480</td><td className="p-3 text-right font-mono">88</td><td className="p-3 text-right font-mono">88</td><td className="p-3 text-right font-mono">70</td></tr>
                    <tr><td className="p-3 font-bold">Mpumalanga</td><td className="p-3 text-right font-mono">2 539</td><td className="p-3 text-right font-mono">89</td><td className="p-3 text-right font-mono">89</td><td className="p-3 text-right font-mono">75</td></tr>
                    <tr><td className="p-3 font-bold">North West</td><td className="p-3 text-right font-mono">867</td><td className="p-3 text-right font-mono">82</td><td className="p-3 text-right font-mono">82</td><td className="p-3 text-right font-mono">71</td></tr>
                    <tr className="bg-amber-50/50 dark:bg-amber-950/20"><td className="p-3 font-bold text-amber-600">Northern Cape</td><td className="p-3 text-right font-mono font-bold">147</td><td className="p-3 text-right font-mono font-bold text-amber-600">102 (&gt;100%)</td><td className="p-3 text-right font-mono font-bold text-amber-600">105 (&gt;100%)</td><td className="p-3 text-right font-mono">95</td></tr>
                    <tr><td className="p-3 font-bold">Western Cape</td><td className="p-3 text-right font-mono">1 866</td><td className="p-3 text-right font-mono">52</td><td className="p-3 text-right font-mono font-bold text-red-600">D (55%)</td><td className="p-3 text-right font-mono">40</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="text-[11px] text-slate-500 italic">
                Net FSC (million m³) = net full storage capacity in million cubic metres. [Adapted from https://sawx.co.za/state-of-dams]
              </p>
            </div>
          )}

          {/* =============================================================== */}
          {/* 7. ANNEXURE B: SHOWER WATER & ENERGY GRAPH (QUESTION 3.2) */}
          {/* =============================================================== */}
          {isAnnexureBShower && (
            <div className="space-y-4 font-sans">
              <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-[#1a070e] border border-rose-200 dark:border-rose-900 text-xs leading-relaxed">
                <span className="font-black text-rose-700 dark:text-rose-300 uppercase block mb-1">
                  Water &amp; Energy Context:
                </span>
                <p>
                  &ldquo;In an average middle-class household in South Africa a 10-minute shower costs almost R13 (or R1,30/min) if you have a normal 15 litre/min shower head. By changing to a low-flow shower head and reducing shower time to 6 minutes, you can reduce this to R4,20 per shower (or 70c/min).&rdquo;
                </p>
              </div>

              {/* Dual Bar Chart Comparison */}
              <div className="w-full overflow-x-auto p-4 rounded-2xl border border-rose-200 dark:border-rose-900 bg-white dark:bg-[#100305]">
                <div className="flex items-center justify-between text-xs mb-3 flex-wrap gap-2">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-sm bg-white border-2 border-slate-700" />
                      <span className="font-bold">Low-flow shower head (8 litres/min)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-sm bg-slate-600" />
                      <span className="font-bold">Normal shower head (15 litres/min)</span>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono font-bold text-red-600">
                    Energy: 4 min = 1,7 kWh | 10 min = 4,3 kWh (+152,94%)
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead className={isDark ? 'bg-[#240c14] text-rose-200' : 'bg-rose-100 text-rose-900'}>
                      <tr>
                        <th className="p-2.5 font-black">Time in Minutes</th>
                        <th className="p-2.5 font-black text-right">Low-Flow (8 ℓ/min) Water</th>
                        <th className="p-2.5 font-black text-right">Low-Flow Energy (kWh)</th>
                        <th className="p-2.5 font-black text-right">Normal (15 ℓ/min) Water</th>
                        <th className="p-2.5 font-black text-right">Normal Energy (kWh)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-rose-100 dark:divide-rose-950 font-mono">
                      <tr><td className="p-2 font-bold font-sans">2 minutes</td><td className="p-2 text-right">16 litres</td><td className="p-2 text-right">0,7 kWh</td><td className="p-2 text-right font-bold text-red-600">30 litres</td><td className="p-2 text-right">1,3 kWh</td></tr>
                      <tr className="bg-rose-50/50 dark:bg-rose-950/20"><td className="p-2 font-bold font-sans">4 minutes</td><td className="p-2 text-right">32 litres</td><td className="p-2 text-right font-black text-red-600">1,7 kWh</td><td className="p-2 text-right">60 litres</td><td className="p-2 text-right">3,2 kWh</td></tr>
                      <tr><td className="p-2 font-bold font-sans">6 minutes</td><td className="p-2 text-right">48 litres</td><td className="p-2 text-right">2,6 kWh</td><td className="p-2 text-right">90 litres</td><td className="p-2 text-right">4,8 kWh</td></tr>
                      <tr className="bg-rose-50/50 dark:bg-rose-950/20"><td className="p-2 font-bold font-sans">8 minutes</td><td className="p-2 text-right">64 litres</td><td className="p-2 text-right">3,4 kWh</td><td className="p-2 text-right font-bold text-red-600">120 litres</td><td className="p-2 text-right">6,5 kWh</td></tr>
                      <tr className="bg-red-100/60 dark:bg-red-950/40"><td className="p-2 font-black font-sans">10 minutes</td><td className="p-2 text-right">80 litres</td><td className="p-2 text-right font-black text-red-600">4,3 kWh</td><td className="p-2 text-right font-bold">150 litres</td><td className="p-2 text-right font-bold">8,1 kWh</td></tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-2 text-[11px] text-slate-500 flex justify-between">
                  <span>Range between 8 min &amp; 2 min normal shower: 120 ℓ - 30 ℓ = 90 ℓ</span>
                  <span>[Adapted from poweroptimal.com/cost-shower-south-africa]</span>
                </div>
              </div>
            </div>
          )}

          {/* =============================================================== */}
          {/* 8. TABLE 4 & 5: BOBBY'S BIRYANI COSTS & EXCHANGE RATE */}
          {/* =============================================================== */}
          {isBiryaniCost && (
            <div className="space-y-4 font-sans">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Table 4: Ingredients */}
                <div className="overflow-x-auto rounded-2xl border border-rose-200 dark:border-rose-900 p-3 bg-white dark:bg-[#120408]">
                  <div className="flex items-center justify-between text-xs font-bold text-rose-700 dark:text-rose-300 mb-2">
                    <span>TABLE 4: Ingredients for 8 Plates of Biryani</span>
                    <span className="text-[10px] text-slate-400">Selling price = Rs80/plate</span>
                  </div>
                  <table className="w-full text-xs text-left border-collapse">
                    <thead className={isDark ? 'bg-[#240c14] text-rose-200' : 'bg-rose-100 text-rose-900'}>
                      <tr><th className="p-2 font-black">PRODUCT</th><th className="p-2 font-black text-right">COST (IN Rs)</th></tr>
                    </thead>
                    <tbody className="divide-y divide-rose-100 dark:divide-rose-950 font-medium">
                      <tr><td className="p-2 font-bold">1 kg chicken</td><td className="p-2 text-right font-mono font-bold text-red-600">200</td></tr>
                      <tr><td className="p-2 font-bold">1 kg basmati rice</td><td className="p-2 text-right font-mono">120</td></tr>
                      <tr><td className="p-2 font-bold text-red-600">Masala powder</td><td className="p-2 text-right font-mono font-bold text-red-600">10</td></tr>
                      <tr><td className="p-2 font-bold">Other ingredients</td><td className="p-2 text-right font-mono">62</td></tr>
                      <tr className="font-black bg-rose-50 dark:bg-rose-950/40">
                        <td className="p-2">Total for 8 plates</td>
                        <td className="p-2 text-right font-mono text-red-600">Rs392 (Rs49/plate)</td>
                      </tr>
                      <tr className="font-bold text-[11px] text-slate-500">
                        <td className="p-2">+ Disposable container</td>
                        <td className="p-2 text-right font-mono">Rs2,43 each</td>
                      </tr>
                      <tr className="font-black text-xs text-red-600">
                        <td className="p-2">Total cost per packaged plate</td>
                        <td className="p-2 text-right font-mono">Rs51,43</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Table 5: Exchange Rate */}
                <div className="overflow-x-auto rounded-2xl border border-rose-200 dark:border-rose-900 p-3 bg-white dark:bg-[#120408]">
                  <div className="flex items-center justify-between text-xs font-bold text-rose-700 dark:text-rose-300 mb-2">
                    <span>TABLE 5: Exchange Rate (3 March 2021)</span>
                    <span className="text-[10px] text-slate-400">ZAR vs INR</span>
                  </div>
                  <table className="w-full text-xs text-left border-collapse">
                    <thead className={isDark ? 'bg-[#240c14] text-rose-200' : 'bg-rose-100 text-rose-900'}>
                      <tr><th className="p-2 font-black">SOUTH AFRICAN RAND (ZAR)</th><th className="p-2 font-black text-right">INDIAN RUPEES (Rs)</th></tr>
                    </thead>
                    <tbody className="divide-y divide-rose-100 dark:divide-rose-950 font-medium">
                      <tr><td className="p-2 font-bold">1</td><td className="p-2 text-right font-mono font-bold">4,8346707</td></tr>
                      <tr><td className="p-2 font-bold text-red-600">0,206839</td><td className="p-2 text-right font-mono font-bold text-red-600">1</td></tr>
                    </tbody>
                  </table>
                  <div className="mt-3 p-2 rounded-xl bg-rose-50/70 dark:bg-rose-950/40 text-[11px]">
                    <p className="font-bold">Masala Powder (Rs10) in Rand:</p>
                    <p className="font-mono text-red-600 font-black">Rs10 × 0,206839 = R2,07</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =============================================================== */}
          {/* 9. ANSWER SHEET GRAPH: JANET'S BIRYANI BUSINESS GRAPH */}
          {/* =============================================================== */}
          {isJanetBiryaniGraph && (
            <div className="space-y-4 font-sans">
              <div className="flex items-center justify-between text-xs font-bold flex-wrap gap-2">
                <span className="text-rose-700 dark:text-rose-300 uppercase">
                  JANET&apos;S BUSINESS GRAPH FOR PLATES OF BIRYANI (COST VS INCOME)
                </span>
                <span className="text-red-600 font-mono font-black">
                  Cost = R600 + 13p | Income = 25p | Break-even at (50; R1 250)
                </span>
              </div>

              {/* High-Definition SVG Graph Grid matching Answer Sheet */}
              <div className="w-full flex justify-center bg-white dark:bg-[#100305] p-4 rounded-2xl border border-rose-200 dark:border-rose-900 shadow-inner overflow-x-auto">
                <svg viewBox="0 0 540 340" className="w-full max-w-lg h-72">
                  {/* Grid Lines */}
                  {[0, 500, 1000, 1500, 2000, 2500].map((amt, idx) => {
                    const y = 280 - (amt / 2500) * 240;
                    return (
                      <g key={idx}>
                        <line x1="60" y1={y} x2="480" y2={y} stroke={isDark ? '#38131d' : '#fecdd3'} strokeWidth="1" strokeDasharray="2 2" />
                        <text x="50" y={y + 4} textAnchor="end" fontSize="10" fill={isDark ? '#94a3b8' : '#64748b'}>
                          {amt}
                        </text>
                      </g>
                    );
                  })}

                  {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((plates, idx) => {
                    const x = 60 + (plates / 100) * 420;
                    return (
                      <g key={idx}>
                        <line x1={x} y1="40" x2={x} y2="280" stroke={isDark ? '#38131d' : '#fecdd3'} strokeWidth="1" strokeDasharray="2 2" />
                        <text x={x} y="296" textAnchor="middle" fontSize="10" fill={isDark ? '#94a3b8' : '#64748b'}>
                          {plates}
                        </text>
                      </g>
                    );
                  })}

                  {/* Main Axes */}
                  <line x1="60" y1="280" x2="490" y2="280" stroke={isDark ? '#e2e8f0' : '#1e293b'} strokeWidth="2.5" />
                  <line x1="60" y1="280" x2="60" y2="30" stroke={isDark ? '#e2e8f0' : '#1e293b'} strokeWidth="2.5" />

                  <text x="270" y="325" textAnchor="middle" fontSize="11" fontWeight="900" fill={isDark ? '#fda4af' : '#be123c'}>
                    Number of plates of biryani
                  </text>
                  <text x="25" y="160" textAnchor="middle" fontSize="11" fontWeight="900" fill={isDark ? '#fda4af' : '#be123c'} transform="rotate(-90, 25, 160)">
                    Amount in rand
                  </text>

                  {/* Income Line: (0, 0) to (100, 2500) */}
                  <line x1="60" y1="280" x2="480" y2="40" stroke="#0284c7" strokeWidth="3" />
                  <text x="485" y="38" fill="#0284c7" fontSize="11" fontWeight="black">Income</text>

                  {/* Cost Line: (0, 600) to (100, 1900) */}
                  {/* y(0) = 280 - (600/2500)*240 = 280 - 57.6 = 222.4 */}
                  {/* y(100) = 280 - (1900/2500)*240 = 280 - 182.4 = 97.6 */}
                  <line x1="60" y1="222.4" x2="480" y2="97.6" stroke="#dc2626" strokeWidth="3" />
                  <text x="485" y="98" fill="#dc2626" fontSize="11" fontWeight="black">Cost ✓</text>

                  {/* Start Point (0; 600) */}
                  <circle cx="60" cy="222.4" r="5" fill="#dc2626" />
                  <text x="85" y="218" fill="#dc2626" fontSize="10" fontWeight="bold">(0; 600) ✓</text>

                  {/* End Point (100; 1900) */}
                  <circle cx="480" cy="97.6" r="5" fill="#dc2626" />
                  <text x="440" y="88" fill="#dc2626" fontSize="10" fontWeight="bold">(100; 1 900) ✓</text>

                  {/* Break-even point at (50; 1250) */}
                  {/* x = 60 + 210 = 270, y = 280 - (1250/2500)*240 = 280 - 120 = 160 */}
                  <circle cx="270" cy="160" r="6" fill="#16a34a" />
                  <text x="270" y="145" textAnchor="middle" fill="#16a34a" fontSize="10" fontWeight="black">
                    Break-even (50 plates, R1 250) ✓
                  </text>
                  <line x1="270" y1="160" x2="270" y2="280" stroke="#16a34a" strokeDasharray="3 3" />
                </svg>
              </div>

              {/* Table 6 data */}
              <div className="overflow-x-auto rounded-2xl border border-rose-200 dark:border-rose-900">
                <table className="w-full text-xs text-left border-collapse">
                  <thead className={isDark ? 'bg-[#240c14] text-rose-200' : 'bg-rose-100 text-rose-900'}>
                    <tr>
                      <th className="p-2 font-black">NUMBER OF PLATES</th>
                      {[0, 10, 30, 50, 70, 90, 100].map(p => <th key={p} className="p-2 text-right font-mono">{p}</th>)}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-rose-100 dark:divide-rose-950 font-mono">
                    <tr><td className="p-2 font-bold font-sans">INCOME (R)</td><td className="p-2 text-right">0</td><td className="p-2 text-right">250</td><td className="p-2 text-right">750</td><td className="p-2 text-right font-bold text-emerald-600">1 250</td><td className="p-2 text-right">1 750</td><td className="p-2 text-right">2 250</td><td className="p-2 text-right">2 500</td></tr>
                    <tr className="bg-rose-50/50 dark:bg-rose-950/20"><td className="p-2 font-bold font-sans text-red-600">COST (R)</td><td className="p-2 text-right font-bold">600</td><td className="p-2 text-right">730</td><td className="p-2 text-right">990</td><td className="p-2 text-right font-bold text-emerald-600">1 250</td><td className="p-2 text-right">1 510</td><td className="p-2 text-right">1 770</td><td className="p-2 text-right font-bold">1 900</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* =============================================================== */}
          {/* 10. ANNEXURE C: TOURISM IN INDIA (QUESTION 4.3) */}
          {/* =============================================================== */}
          {isAnnexureCTourism && (
            <div className="space-y-4 font-sans">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Left: Bar Chart Arrivals */}
                <div className="p-4 rounded-2xl bg-white dark:bg-[#120408] border border-rose-200 dark:border-rose-900 shadow-xs">
                  <span className="text-xs font-black uppercase text-rose-700 dark:text-rose-300 block mb-2">
                    NUMBER OF TOURIST ARRIVALS IN INDIA (IN MILLIONS)
                  </span>

                  <svg viewBox="0 0 280 200" className="w-full h-48">
                    {[0, 2, 4, 6, 8, 10, 12].map((v, i) => {
                      const y = 170 - (v / 12) * 140;
                      return (
                        <g key={i}>
                          <line x1="30" y1={y} x2="270" y2={y} stroke={isDark ? '#38131d' : '#fee2e2'} strokeWidth="1" strokeDasharray="2 2" />
                          <text x="25" y={y + 3} textAnchor="end" fontSize="9" fill={isDark ? '#94a3b8' : '#64748b'}>{v}</text>
                        </g>
                      );
                    })}

                    {[
                      { yr: '2015', val: 8.03 },
                      { yr: '2016', val: 8.80 },
                      { yr: '2017', val: 10.04 },
                      { yr: '2018', val: 10.56 },
                      { yr: '2019', val: 10.93 },
                    ].map((item, idx) => {
                      const x = 45 + idx * 46;
                      const h = (item.val / 12) * 140;
                      return (
                        <g key={item.yr}>
                          <rect x={x} y={170 - h} width="32" height={h} fill={isDark ? '#f43f5e' : '#dc2626'} rx="3" />
                          <text x={x + 16} y={165 - h} textAnchor="middle" fontSize="9" fontWeight="bold" fill={isDark ? '#fda4af' : '#991b1b'}>
                            {item.val}
                          </text>
                          <text x={x + 16} y="185" textAnchor="middle" fontSize="9" fontWeight="bold" fill={isDark ? '#e2e8f0' : '#1e293b'}>
                            {item.yr}
                          </text>
                        </g>
                      );
                    })}
                    <line x1="30" y1="170" x2="270" y2="170" stroke="#94a3b8" strokeWidth="1.5" />
                  </svg>
                  <span className="text-[10px] text-slate-500 italic block mt-1">Trend: Increases year-on-year from 8,03M to 10,93M</span>
                </div>

                {/* Right: Pie Chart Source Countries */}
                <div className="p-4 rounded-2xl bg-white dark:bg-[#120408] border border-rose-200 dark:border-rose-900 shadow-xs">
                  <span className="text-xs font-black uppercase text-rose-700 dark:text-rose-300 block mb-2">
                    COUNTRIES FROM WHERE TOURISTS COME (2019)
                  </span>

                  <div className="grid grid-cols-2 gap-2 text-xs font-bold my-2">
                    <div className="p-2 rounded-xl bg-red-100/80 dark:bg-red-950/60 border border-red-300 dark:border-red-800">
                      <span className="text-[10px] text-slate-400 uppercase block">Bangladesh</span>
                      <span className="text-red-600 dark:text-red-400 font-black text-sm">37,1% (4,055M)</span>
                    </div>
                    <div className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900">
                      <span className="text-[10px] text-slate-400 uppercase block">United States</span>
                      <span className="text-slate-800 dark:text-slate-200 font-black text-sm">21,1%</span>
                    </div>
                    <div className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900">
                      <span className="text-[10px] text-slate-400 uppercase block">United Kingdom</span>
                      <span className="text-slate-800 dark:text-slate-200 font-black text-sm">14,4%</span>
                    </div>
                    <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900">
                      <span className="text-[10px] text-slate-400 uppercase block">Other Countries</span>
                      <span className="text-amber-600 font-black text-sm">18,7% (0,187)</span>
                    </div>
                    <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-900 text-[11px] text-center">Canada: 5,0%</div>
                    <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-900 text-[11px] text-center">Australia: 3,5%</div>
                  </div>

                  <p className="text-[10px] text-slate-500 italic mt-2">
                    * Total = 99,8% due to rounding of large numbers. [Adapted from www.statista.com]
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* =============================================================== */}
          {/* 11. TABLE 7 & 8: SARS PERSONAL INCOME TAX (QUESTION 5.1) */}
          {/* =============================================================== */}
          {isSarsTax && (
            <div className="space-y-4 font-sans">
              <div className="flex items-center justify-between text-xs font-bold text-rose-700 dark:text-rose-300">
                <span>TABLE 7: TAX RATES FOR 2019/20 TAX YEAR (1 Mar 2019 – 28 Feb 2020)</span>
                <span className="text-[11px] font-mono text-red-600 font-bold">Marius Taxable Income: R551 762,00 (Age 64)</span>
              </div>

              {/* Tax Brackets Table */}
              <div className="overflow-x-auto rounded-2xl border border-rose-200 dark:border-rose-900">
                <table className="w-full text-xs text-left border-collapse">
                  <thead className={isDark ? 'bg-[#240c14] text-rose-200' : 'bg-rose-100 text-rose-900'}>
                    <tr>
                      <th className="p-2.5 font-black">TAX BRACKET</th>
                      <th className="p-2.5 font-black">TAXABLE INCOME (R)</th>
                      <th className="p-2.5 font-black">RATES OF TAX (R)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-rose-100 dark:divide-rose-950 font-mono">
                    <tr><td className="p-2 font-bold font-sans">1</td><td>1 – 195 850</td><td>18% of taxable income</td></tr>
                    <tr><td className="p-2 font-bold font-sans">2</td><td>195 851 – 305 850</td><td>35 253 + 26% of taxable income above 195 850</td></tr>
                    <tr><td className="p-2 font-bold font-sans">3</td><td>305 851 – 423 300</td><td>63 853 + 31% of taxable income above 305 850</td></tr>
                    <tr className="bg-red-100/70 dark:bg-red-950/50 text-red-700 dark:text-red-300 font-bold">
                      <td className="p-2.5 font-black font-sans text-sm">4 (Marius) ✓</td>
                      <td className="p-2.5 font-black">423 301 – 555 600</td>
                      <td className="p-2.5 font-black">100 263 + 36% of taxable income above 423 300</td>
                    </tr>
                    <tr><td className="p-2 font-bold font-sans">5</td><td>555 601 – 708 310</td><td>147 891 + 39% of taxable income above 555 600</td></tr>
                    <tr><td className="p-2 font-bold font-sans">6</td><td>708 311 – 1 500 000</td><td>207 448 + 41% of taxable income above 708 310</td></tr>
                    <tr><td className="p-2 font-bold font-sans">7</td><td>1 500 001 and above</td><td>532 041 + 45% of taxable income above 1 500 000</td></tr>
                  </tbody>
                </table>
              </div>

              {/* Table 8: Rebates and Medical Credits */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3.5 rounded-2xl border border-rose-200 dark:border-rose-900 bg-white dark:bg-[#120408]">
                  <span className="text-xs font-black text-rose-700 dark:text-rose-300 uppercase block mb-1">
                    TAX REBATES (2019/20)
                  </span>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between py-1 border-b border-rose-100 dark:border-rose-950 font-bold text-red-600">
                      <span>Primary Rebate</span><span className="font-mono">R14 220</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-rose-100 dark:border-rose-950 font-bold text-amber-600">
                      <span>Secondary (65 and older)</span><span className="font-mono">R7 794 (R649,50/mo)</span>
                    </div>
                    <div className="flex justify-between py-1 text-slate-500">
                      <span>Tertiary (75 and older)</span><span className="font-mono">R2 601</span>
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl border border-rose-200 dark:border-rose-900 bg-white dark:bg-[#120408]">
                  <span className="text-xs font-black text-rose-700 dark:text-rose-300 uppercase block mb-1">
                    MEDICAL CREDITS PER MONTH
                  </span>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between py-1 border-b border-rose-100 dark:border-rose-950 font-bold">
                      <span>Main member</span><span className="font-mono text-red-600">R310</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-rose-100 dark:border-rose-950 font-bold">
                      <span>First dependent (Wife)</span><span className="font-mono text-red-600">R310</span>
                    </div>
                    <div className="flex justify-between py-1 font-bold">
                      <span>Each additional dependent (2 Grandchildren)</span><span className="font-mono text-red-600">R209 each (R418)</span>
                    </div>
                    <div className="pt-1 text-[11px] text-right font-black text-rose-600">
                      Total Monthly Credit: R1 038
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =============================================================== */}
          {/* 12. FIGURE 5.2: LAPTOP BRANDS BOX-AND-WHISKER PLOTS */}
          {/* =============================================================== */}
          {isLaptopBoxPlot && (
            <div className="space-y-4 font-sans">
              <div className="flex items-center justify-between text-xs font-bold text-rose-700 dark:text-rose-300 flex-wrap gap-2">
                <span>BOX-AND-WHISKER PLOTS SHOWING MARKET SHARE OF THREE LAPTOP BRANDS</span>
                <span className="text-red-600 font-mono font-black">Scale: 10% to 24%</span>
              </div>

              {/* Box and Whisker Plot SVG */}
              <div className="w-full flex justify-center bg-white dark:bg-[#100305] p-4 rounded-2xl border border-rose-200 dark:border-rose-900 shadow-inner overflow-x-auto">
                <svg viewBox="0 0 620 280" className="w-full min-w-[540px] h-64 sm:h-72">
                  {/* Axis scale from 10% to 24% (width 500 px, 1% = 35.7 px, origin x = 60) */}
                  {[10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24].map((pct) => {
                    const x = 60 + ((pct - 10) / 14) * 500;
                    return (
                      <g key={pct}>
                        <line x1={x} y1="210" x2={x} y2="220" stroke={isDark ? '#64748b' : '#94a3b8'} strokeWidth="1.5" />
                        <text x={x} y="235" textAnchor="middle" fontSize="10" fontWeight="bold" fill={isDark ? '#94a3b8' : '#475569'}>
                          {pct}
                        </text>
                      </g>
                    );
                  })}
                  <line x1="60" y1="215" x2="560" y2="215" stroke={isDark ? '#475569' : '#cbd5e1'} strokeWidth="2" />
                  <text x="310" y="260" textAnchor="middle" fontSize="11" fontWeight="900" fill={isDark ? '#fda4af' : '#be123c'}>
                    MARKET SHARES IN PERCENTAGES
                  </text>

                  {/* --- 1. HUAWEI: Min 18.8, Q1 19.15, Med 21.5, Q3 22.85, Max 23.5 --- */}
                  {/* y center = 50 */}
                  {/* x(18.8) = 60 + (8.8/14)*500 = 60 + 314.3 = 374.3 */}
                  {/* x(19.15) = 60 + (9.15/14)*500 = 60 + 326.8 = 386.8 */}
                  {/* x(21.5) = 60 + (11.5/14)*500 = 60 + 410.7 = 470.7 */}
                  {/* x(22.85) = 60 + (12.85/14)*500 = 60 + 458.9 = 518.9 */}
                  {/* x(23.5) = 60 + (13.5/14)*500 = 60 + 482.1 = 542.1 */}
                  <g>
                    <text x="50" y="55" fontSize="11" fontWeight="900" fill={isDark ? '#f43f5e' : '#dc2626'}>Huawei</text>
                    {/* Whiskers */}
                    <line x1="374.3" y1="50" x2="386.8" y2="50" stroke="#f43f5e" strokeWidth="2.5" />
                    <line x1="518.9" y1="50" x2="542.1" y2="50" stroke="#f43f5e" strokeWidth="2.5" />
                    {/* Caps */}
                    <line x1="374.3" y1="40" x2="374.3" y2="60" stroke="#f43f5e" strokeWidth="3" />
                    <line x1="542.1" y1="40" x2="542.1" y2="60" stroke="#f43f5e" strokeWidth="3" />
                    {/* Box */}
                    <rect x="386.8" y="32" width="132.1" height="36" fill={isDark ? '#2e0f17' : '#ffe4e6'} stroke="#e11d48" strokeWidth="2.5" rx="3" />
                    {/* Median Line */}
                    <line x1="470.7" y1="32" x2="470.7" y2="68" stroke="#b91c1c" strokeWidth="4" />
                    {/* Labels */}
                    <text x="374.3" y="26" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#f43f5e">18,8</text>
                    <text x="386.8" y="26" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#f43f5e">19,15</text>
                    <text x="470.7" y="26" textAnchor="middle" fontSize="10" fontWeight="900" fill="#b91c1c">21,5 ✓</text>
                    <text x="518.9" y="26" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#f43f5e">22,85</text>
                    <text x="542.1" y="26" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#f43f5e">23,5</text>
                  </g>

                  {/* --- 2. SAMSUNG: Min 14.6, Q1 15.7, Med 17.75, Q3 18.75, Max 20.2 --- */}
                  {/* y center = 110 */}
                  {/* x(14.6) = 60 + (4.6/14)*500 = 60 + 164.3 = 224.3 */}
                  {/* x(15.7) = 60 + (5.7/14)*500 = 60 + 203.6 = 263.6 */}
                  {/* x(17.75) = 60 + (7.75/14)*500 = 60 + 276.8 = 336.8 */}
                  {/* x(18.75) = 60 + (8.75/14)*500 = 60 + 312.5 = 372.5 */}
                  {/* x(20.2) = 60 + (10.2/14)*500 = 60 + 364.3 = 424.3 */}
                  <g>
                    <text x="50" y="115" fontSize="11" fontWeight="900" fill={isDark ? '#38bdf8' : '#0284c7'}>Samsung</text>
                    {/* Whiskers */}
                    <line x1="224.3" y1="110" x2="263.6" y2="110" stroke="#0284c7" strokeWidth="2.5" />
                    <line x1="372.5" y1="110" x2="424.3" y2="110" stroke="#0284c7" strokeWidth="2.5" />
                    {/* Caps */}
                    <line x1="224.3" y1="100" x2="224.3" y2="120" stroke="#0284c7" strokeWidth="3" />
                    <line x1="424.3" y1="100" x2="424.3" y2="120" stroke="#0284c7" strokeWidth="3" />
                    {/* Box */}
                    <rect x="263.6" y="92" width="108.9" height="36" fill={isDark ? '#0c2236' : '#e0f2fe'} stroke="#0284c7" strokeWidth="2.5" rx="3" />
                    {/* Median Line */}
                    <line x1="336.8" y1="92" x2="336.8" y2="128" stroke="#0369a1" strokeWidth="4" />
                    {/* Labels */}
                    <text x="224.3" y="86" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#0284c7">14,6</text>
                    <text x="263.6" y="86" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#0284c7">15,7 (Q1)</text>
                    <text x="336.8" y="86" textAnchor="middle" fontSize="10" fontWeight="900" fill="#0369a1">17,75</text>
                    <text x="372.5" y="86" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#0284c7">18,75 (Q3)</text>
                    <text x="424.3" y="86" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#0284c7">20,2</text>
                  </g>

                  {/* --- 3. APPLE: Min 10.2, Q1 11.8, Med 13.15, Q3 15.95, Max 19.9 --- */}
                  {/* y center = 170 */}
                  {/* x(10.2) = 60 + (0.2/14)*500 = 60 + 7.1 = 67.1 */}
                  {/* x(11.8) = 60 + (1.8/14)*500 = 60 + 64.3 = 124.3 */}
                  {/* x(13.15) = 60 + (3.15/14)*500 = 60 + 112.5 = 172.5 */}
                  {/* x(15.95) = 60 + (5.95/14)*500 = 60 + 212.5 = 272.5 */}
                  {/* x(19.9) = 60 + (9.9/14)*500 = 60 + 353.6 = 413.6 */}
                  <g>
                    <text x="50" y="175" fontSize="11" fontWeight="900" fill={isDark ? '#a855f7' : '#7e22ce'}>Apple</text>
                    {/* Whiskers */}
                    <line x1="67.1" y1="170" x2="124.3" y2="170" stroke="#7e22ce" strokeWidth="2.5" />
                    <line x1="272.5" y1="170" x2="413.6" y2="170" stroke="#7e22ce" strokeWidth="2.5" />
                    {/* Caps */}
                    <line x1="67.1" y1="160" x2="67.1" y2="180" stroke="#7e22ce" strokeWidth="3" />
                    <line x1="413.6" y1="160" x2="413.6" y2="180" stroke="#7e22ce" strokeWidth="3" />
                    {/* Box */}
                    <rect x="124.3" y="152" width="148.2" height="36" fill={isDark ? '#260e3b' : '#f3e8ff'} stroke="#7e22ce" strokeWidth="2.5" rx="3" />
                    {/* Median Line */}
                    <line x1="172.5" y1="152" x2="172.5" y2="188" stroke="#6b21a8" strokeWidth="4" />
                    {/* Labels */}
                    <text x="67.1" y="146" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#7e22ce">10,2</text>
                    <text x="124.3" y="146" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#7e22ce">11,8</text>
                    <text x="172.5" y="146" textAnchor="middle" fontSize="10" fontWeight="900" fill="#6b21a8">13,15</text>
                    <text x="272.5" y="146" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#7e22ce">15,95 (Q3 &lt; 16%) ✓</text>
                    <text x="413.6" y="146" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#7e22ce">19,9</text>
                  </g>
                </svg>
              </div>

              <div className="p-3 rounded-xl bg-rose-50/70 dark:bg-[#1a070e] border border-rose-200 dark:border-rose-900 text-xs">
                <span className="font-bold text-rose-700 dark:text-rose-300 block mb-1">Key Statistical Properties:</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
                  <div>• <strong>Most Popular</strong>: Huawei (Median 21,5%, Max 23,5%)</div>
                  <div>• <strong>Samsung IQR</strong>: Q3 - Q1 = 18,75% - 15,7% = 3,05%</div>
                  <div>• <strong>Apple 75% claim</strong>: Q3 is 15,95% &lt; 16% (VALID)</div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QuestionVisualAsset;
