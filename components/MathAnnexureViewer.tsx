'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Receipt,
  Droplets,
  Plane,
  Coins,
  BarChart3,
  Car,
  FileSpreadsheet,
  Maximize2, 
  Minimize2, 
  Laptop,
  Utensils,
  BookOpen,
  PieChart as PieChartIcon,
  TrendingUp,
  Info
} from 'lucide-react';
import { useAppTheme } from '@/lib/theme';
import { Question } from '@/types/quiz';

interface MathAnnexureViewerProps {
  question: Question;
  currentIndex?: number;
}

export const MathAnnexureViewer: React.FC<MathAnnexureViewerProps> = ({
  question,
  currentIndex = 0
}) => {
  const { isDark } = useAppTheme();
  const [isExpanded, setIsExpanded] = useState(true);

  // Check explicit question.annexureRef first, then text matching fallback
  const ref = question.annexureRef || '';
  const qText = (question.question || '').toLowerCase();
  const qCat = (question.category || '').toLowerCase();
  const combined = qText + ' ' + qCat;

  const isTable1 = ref === 'table_1_fuel_prices' || combined.includes('table 1') || combined.includes('fuel price') || combined.includes('zimbabwe') || combined.includes('angola') || combined.includes('botswana');
  const isGraph1_2 = ref === 'graph_1_2_energy_sources' || combined.includes('graph 1.2') || combined.includes('energy source') || combined.includes('paraffin') || combined.includes('cooking');
  const isSheet1_3 = ref === 'sheet_1_3_reading_survey' || combined.includes('sheet 1.3') || combined.includes('reading habit') || combined.includes('survey');
  const isTable2 = ref === 'table_2_car_financing' || combined.includes('table 2') || combined.includes('ford figo') || combined.includes('vw polo') || combined.includes('residual value');
  const isAnnexureA = ref === 'annexure_a_cellphone_invoice' || combined.includes('annexure a') || combined.includes('cellphone invoice') || combined.includes('mr sj fortune') || combined.includes('abc plan');
  const isTable3 = ref === 'table_3_dam_levels' || combined.includes('table 3') || combined.includes('dam') || combined.includes('theewaterskloof') || combined.includes('storage capacity');
  const isAnnexureB = ref === 'annexure_b_showerheads' || combined.includes('annexure b') || combined.includes('showerhead') || combined.includes('low-flow') || combined.includes('energy use per shower');
  const isTable4_5 = ref === 'table_4_5_biryani_costs' || combined.includes('table 4') || combined.includes('table 5') || combined.includes('biryani') || combined.includes('bobby') || combined.includes('chicken biryani');
  const isTable6 = ref === 'table_6_biryani_graph' || combined.includes('table 6') || combined.includes('janet') || combined.includes('number of plates') || combined.includes('answer sheet 4.2.2');
  const isAnnexureC = ref === 'annexure_c_tourist_arrivals' || combined.includes('annexure c') || combined.includes('tourist arrivals') || combined.includes('bangladesh') || combined.includes('india');
  const isTable7_8 = ref === 'table_7_8_sars_tax' || combined.includes('table 7') || combined.includes('table 8') || combined.includes('tax bracket') || combined.includes('marius') || combined.includes('sars');
  const isBoxPlot = ref === 'box_plot_5_2_laptop_brands' || combined.includes('box-and-whisker') || combined.includes('laptop brand') || combined.includes('huawei') || combined.includes('samsung') || combined.includes('apple');

  const hasAnnexure = isTable1 || isGraph1_2 || isSheet1_3 || isTable2 || isAnnexureA || isTable3 || isAnnexureB || isTable4_5 || isTable6 || isAnnexureC || isTable7_8 || isBoxPlot;

  if (!hasAnnexure) {
    return null;
  }

  const getHeaderInfo = () => {
    if (isTable1) return { title: 'TABLE 1: Fuel Price in Six African Countries (US Dollars)', icon: Coins, ref: 'DBE P1 Table 1' };
    if (isGraph1_2) return { title: 'GRAPH 1.2: Provincial Energy Sources Used for Cooking', icon: BarChart3, ref: 'DBE P1 Graph 1.2' };
    if (isSheet1_3) return { title: 'QUESTION 1.3: Company Reading Habits Information Sheet', icon: BookOpen, ref: 'DBE P1 Sheet 1.3' };
    if (isTable2) return { title: 'TABLE 2: Car Financing Comparison (Ford Figo vs VW Polo)', icon: Car, ref: 'DBE P1 Table 2' };
    if (isAnnexureA) return { title: 'ANNEXURE A: Cellphone Contract Invoice for Mr SJ Fortune', icon: Receipt, ref: 'DBE P1 Annexure A' };
    if (isTable3) return { title: 'TABLE 3: Dam Levels in Different Provinces (5 April 2021)', icon: Droplets, ref: 'DBE P1 Table 3' };
    if (isAnnexureB) return { title: 'ANNEXURE B: Water & Energy Use per Shower (Normal vs Low-Flow)', icon: Droplets, ref: 'DBE P1 Annexure B' };
    if (isTable4_5) return { title: 'TABLE 4 & 5: Chicken Biryani Costs & Currency Exchange Rates', icon: Utensils, ref: 'DBE P1 Table 4 & 5' };
    if (isTable6) return { title: 'TABLE 6 & ANSWER SHEET: Janet\'s Biryani Income & Cost Graph', icon: TrendingUp, ref: 'DBE P1 Table 6' };
    if (isAnnexureC) return { title: 'ANNEXURE C: Tourist Arrivals in India (2015–2019 & Source Countries)', icon: Plane, ref: 'DBE P1 Annexure C' };
    if (isTable7_8) return { title: 'TABLE 7 & 8: SARS Individual Income Tax Brackets & Rebates', icon: FileSpreadsheet, ref: 'DBE P1 Table 7 & 8' };
    if (isBoxPlot) return { title: 'QUESTION 5.2: Market Share Box-and-Whisker Plots of Laptop Brands', icon: Laptop, ref: 'DBE P1 Figure 5.2' };
    return { title: 'Official Exam Reference Material', icon: FileSpreadsheet, ref: 'NSC Resource' };
  };

  const header = getHeaderInfo();
  const HeaderIcon = header.icon;

  return (
    <div className={`mb-5 rounded-2xl border shadow-sm transition-all overflow-hidden ${
      isDark ? 'bg-[#150609] border-rose-900/60 shadow-[0_4px_20px_rgba(0,0,0,0.5)]' : 'bg-white border-rose-200/90 shadow-[0_4px_20px_rgba(244,63,94,0.04)]'
    }`}>
      {/* Top Header Bar with Reference Badge & Collapse Toggle */}
      <div className={`px-3.5 sm:px-4 py-2.5 flex items-center justify-between border-b gap-3 ${
        isDark ? 'bg-[#1c080d] border-rose-900/60' : 'bg-rose-50/70 border-rose-200/80'
      }`}>
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-6 h-6 rounded-md bg-red-600 text-white flex items-center justify-center shrink-0 shadow-xs">
            <HeaderIcon className="w-3.5 h-3.5" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-red-100 dark:bg-rose-950 text-red-700 dark:text-rose-300 font-mono">
                {header.ref}
              </span>
              <span className="text-[10px] font-semibold text-slate-500 dark:text-rose-300/70 hidden sm:inline">
                National Senior Certificate Reference
              </span>
            </div>
            <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white truncate mt-0.5">
              {header.title}
            </h4>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className={`p-1.5 rounded-lg border transition-all cursor-pointer shrink-0 ${
            isDark ? 'bg-[#220a10] border-rose-900 text-rose-300 hover:bg-[#2e0e16]' : 'bg-white border-rose-200 text-slate-600 hover:bg-rose-50'
          }`}
          title={isExpanded ? 'Collapse Reference' : 'Expand Reference'}
        >
          {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
        </button>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="p-3.5 sm:p-4 space-y-3.5"
          >
            {/* =========================================================================
                1. TABLE 1: FUEL PRICES IN SIX AFRICAN COUNTRIES
               ========================================================================= */}
            {isTable1 && (
              <div className="space-y-2.5 font-sans">
                <div className="flex items-center justify-between text-xs font-bold text-rose-700 dark:text-rose-300 flex-wrap gap-1">
                  <span>TABLE 1: FUEL PRICE (IN US DOLLARS) IN SIX AFRICAN COUNTRIES</span>
                  <span className="text-[10px] font-mono font-medium text-slate-500">05/06/2019 vs 01/03/2021</span>
                </div>

                <div className="overflow-x-auto rounded-xl border border-rose-200 dark:border-rose-900/80 shadow-xs">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className={isDark ? 'bg-[#240c14] text-rose-200 border-b border-rose-900' : 'bg-rose-100/80 text-rose-900 border-b border-rose-200'}>
                        <th className="p-2 font-black">COUNTRY</th>
                        <th className="p-2 font-black text-right">05/06/2019 (US$)</th>
                        <th className="p-2 font-black text-right">01/03/2021 (US$)</th>
                        <th className="p-2 font-black text-right">CURRENT DOLLAR EXCHANGE RATE / CURRENCY (01/03/2021)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-rose-100 dark:divide-rose-950 font-medium">
                      <tr><td className="p-2 font-bold">South Africa</td><td className="p-2 text-right font-mono">1,04</td><td className="p-2 text-right font-mono font-bold text-red-600">1,061</td><td className="p-2 text-right font-mono">R15,36</td></tr>
                      <tr><td className="p-2 font-bold">Angola</td><td className="p-2 text-right font-mono">0,47</td><td className="p-2 text-right font-mono">0,254</td><td className="p-2 text-right font-mono">626,41 Angolan kwanzas</td></tr>
                      <tr><td className="p-2 font-bold">Zimbabwe</td><td className="p-2 text-right font-mono font-bold">0,80</td><td className="p-2 text-right font-mono font-bold text-red-600">1,258</td><td className="p-2 text-right font-mono font-bold text-red-600">$1,258</td></tr>
                      <tr><td className="p-2 font-bold">Namibia</td><td className="p-2 text-right font-mono">0,88</td><td className="p-2 text-right font-mono">0,796</td><td className="p-2 text-right font-mono">15,36 Namibian dollars</td></tr>
                      <tr><td className="p-2 font-bold">Swaziland</td><td className="p-2 text-right font-mono">0,86</td><td className="p-2 text-right font-mono">0,87</td><td className="p-2 text-right font-mono">15,35 Swazi emalangeni</td></tr>
                      <tr><td className="p-2 font-bold">Botswana</td><td className="p-2 text-right font-mono">0,84</td><td className="p-2 text-right font-mono">0,732</td><td className="p-2 text-right font-mono font-bold text-red-600">11,14 Botswana pulas</td></tr>
                    </tbody>
                  </table>
                </div>
                <div className="text-[10px] text-slate-500 dark:text-rose-300/60 text-right italic">
                  [Adapted from www.globalpetrolprices.com]
                </div>
              </div>
            )}

            {/* =========================================================================
                2. GRAPH 1.2: PROVINCIAL ENERGY SOURCES USED FOR COOKING
               ========================================================================= */}
            {isGraph1_2 && (
              <div className="space-y-2.5 font-sans">
                <div className="flex items-center justify-between text-xs font-bold text-rose-700 dark:text-rose-300 flex-wrap gap-1">
                  <span>GRAPH 1.2: DIFFERENT ENERGY SOURCES USED FOR COOKING</span>
                  <span className="text-[10px] font-mono text-slate-500">Benchmark: Paraffin on 3 Feb 2021 was 764,59 c/ℓ</span>
                </div>

                {/* Vector Stacked Bar Graph SVG matching Exam Paper */}
                <div className={`p-3 rounded-xl border overflow-x-auto ${isDark ? 'bg-[#18070d] border-rose-900/70' : 'bg-rose-50/40 border-rose-200'}`}>
                  <svg className="w-full min-w-[580px] h-[260px]" viewBox="0 0 640 260">
                    <rect x="0" y="0" width="640" height="260" fill="transparent" />
                    
                    {/* Y-Axis Gridlines & Percentages (0 to 100) */}
                    {[0, 20, 40, 60, 80, 100].map((pct, i) => {
                      const y = 210 - (pct * 1.8);
                      return (
                        <g key={pct}>
                          <line x1="50" y1={y} x2="520" y2={y} stroke={isDark ? '#3d1620' : '#fecdd3'} strokeDasharray={pct === 0 ? 'none' : '3 3'} strokeWidth="1" />
                          <text x="42" y={y + 4} textAnchor="end" fontSize="10" fontWeight="bold" fill={isDark ? '#fda4af' : '#64748b'}>{pct}</text>
                        </g>
                      );
                    })}

                    <text x="18" y="115" textAnchor="middle" transform="rotate(-90 18 115)" fontSize="10" fontWeight="900" fill={isDark ? '#f43f5e' : '#e11d48'}>
                      PERCENTAGE
                    </text>

                    {/* Provinces Stacked Bars Data */}
                    {[
                      { name: 'Western Cape', x: 65, elec: 86.5, gas: 10.2, par: 1.8, wood: 0.9, oth: 0.6 },
                      { name: 'Eastern Cape', x: 115, elec: 70.8, gas: 3.5, par: 11.2, wood: 13.5, oth: 1.0 },
                      { name: 'Northern Cape', x: 165, elec: 83.4, gas: 5.9, par: 1.5, wood: 8.2, oth: 1.0 },
                      { name: 'Free State', x: 215, elec: 86.1, gas: 3.4, par: 5.2, wood: 4.3, oth: 1.0 },
                      { name: 'KwaZulu-Natal', x: 265, elec: 72.5, gas: 4.8, par: 5.1, wood: 16.4, oth: 1.2 },
                      { name: 'North West', x: 315, elec: 81.3, gas: 1.2, par: 7.5, wood: 9.2, oth: 0.8 },
                      { name: 'Gauteng', x: 365, elec: 84.1, gas: 3.6, par: 9.8, wood: 1.5, oth: 1.0 },
                      { name: 'Mpumalanga', x: 415, elec: 71.4, gas: 1.5, par: 3.6, wood: 22.4, oth: 1.1 },
                      { name: 'Limpopo', x: 465, elec: 54.2, gas: 1.1, par: 2.8, wood: 41.2, oth: 0.7 }
                    ].map((p, idx) => {
                      const baseY = 210;
                      const hElec = p.elec * 1.8;
                      const hGas = p.gas * 1.8;
                      const hPar = p.par * 1.8;
                      const hWood = p.wood * 1.8;
                      const hOth = p.oth * 1.8;

                      const yElec = baseY - hElec;
                      const yGas = yElec - hGas;
                      const yPar = yGas - hPar;
                      const yWood = yPar - hWood;
                      const yOth = yWood - hOth;

                      return (
                        <g key={idx}>
                          {/* Electricity (Bottom) */}
                          <rect x={p.x} y={yElec} width="32" height={hElec} fill={isDark ? '#e11d48' : '#f43f5e'} opacity="0.85" />
                          {/* Gas */}
                          <rect x={p.x} y={yGas} width="32" height={hGas} fill={isDark ? '#fb7185' : '#fda4af'} />
                          {/* Paraffin */}
                          <rect x={p.x} y={yPar} width="32" height={hPar} fill={isDark ? '#4c1d95' : '#7c3aed'} />
                          {/* Wood */}
                          <rect x={p.x} y={yWood} width="32" height={hWood} fill={isDark ? '#d97706' : '#f59e0b'} />
                          {/* Other (Top) */}
                          <rect x={p.x} y={yOth} width="32" height={hOth} fill={isDark ? '#059669' : '#10b981'} />

                          {/* Province Label (Rotated) */}
                          <text x={p.x + 16} y="222" textAnchor="end" transform={`rotate(-45 ${p.x + 16} 222)`} fontSize="9" fontWeight="bold" fill={isDark ? '#fecdd3' : '#334155'}>
                            {p.name}
                          </text>
                        </g>
                      );
                    })}

                    {/* Chart Legend */}
                    <g transform="translate(530, 45)">
                      <rect x="0" y="0" width="105" height="135" rx="8" fill={isDark ? '#260a12' : '#ffffff'} stroke={isDark ? '#4c1524' : '#e2e8f0'} strokeWidth="1" />
                      <text x="10" y="18" fontSize="10" fontWeight="900" fill={isDark ? '#fff' : '#0f172a'}>LEGEND</text>
                      
                      <rect x="10" y="30" width="12" height="12" fill={isDark ? '#e11d48' : '#f43f5e'} opacity="0.85" />
                      <text x="28" y="40" fontSize="9" fontWeight="bold" fill={isDark ? '#fecdd3' : '#475569'}>Electricity</text>

                      <rect x="10" y="50" width="12" height="12" fill={isDark ? '#fb7185' : '#fda4af'} />
                      <text x="28" y="60" fontSize="9" fontWeight="bold" fill={isDark ? '#fecdd3' : '#475569'}>Gas</text>

                      <rect x="10" y="70" width="12" height="12" fill={isDark ? '#4c1d95' : '#7c3aed'} />
                      <text x="28" y="80" fontSize="9" fontWeight="bold" fill={isDark ? '#fecdd3' : '#475569'}>Paraffin</text>

                      <rect x="10" y="90" width="12" height="12" fill={isDark ? '#d97706' : '#f59e0b'} />
                      <text x="28" y="100" fontSize="9" fontWeight="bold" fill={isDark ? '#fecdd3' : '#475569'}>Wood</text>

                      <rect x="10" y="110" width="12" height="12" fill={isDark ? '#059669' : '#10b981'} />
                      <text x="28" y="120" fontSize="9" fontWeight="bold" fill={isDark ? '#fecdd3' : '#475569'}>Other</text>
                    </g>
                  </svg>
                </div>

                {/* Condensed Table Summary */}
                <div className="overflow-x-auto rounded-xl border border-rose-200 dark:border-rose-900/80">
                  <table className="w-full text-[11px] text-left border-collapse">
                    <thead>
                      <tr className={isDark ? 'bg-[#240c14] text-rose-200 border-b border-rose-900' : 'bg-rose-100/80 text-rose-900 border-b border-rose-200'}>
                        <th className="p-1.5 font-black">Province</th>
                        <th className="p-1.5 text-right font-black">Electricity</th>
                        <th className="p-1.5 text-right font-black">Gas</th>
                        <th className="p-1.5 text-right font-black">Paraffin</th>
                        <th className="p-1.5 text-right font-black">Wood</th>
                        <th className="p-1.5 text-right font-black">Other</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-rose-100 dark:divide-rose-950 font-medium font-mono text-[10.5px]">
                      <tr><td className="p-1.5 font-sans font-bold">Western Cape</td><td className="p-1.5 text-right">86,5%</td><td className="p-1.5 text-right">10,2%</td><td className="p-1.5 text-right">1,8%</td><td className="p-1.5 text-right">0,9%</td><td className="p-1.5 text-right">0,6%</td></tr>
                      <tr><td className="p-1.5 font-sans font-bold">Eastern Cape</td><td className="p-1.5 text-right">70,8%</td><td className="p-1.5 text-right">3,5%</td><td className="p-1.5 text-right font-bold text-red-600">11,2%</td><td className="p-1.5 text-right">13,5%</td><td className="p-1.5 text-right">1,0%</td></tr>
                      <tr><td className="p-1.5 font-sans font-bold">Northern Cape</td><td className="p-1.5 text-right">83,4%</td><td className="p-1.5 text-right">5,9%</td><td className="p-1.5 text-right">1,5%</td><td className="p-1.5 text-right">8,2%</td><td className="p-1.5 text-right">1,0%</td></tr>
                      <tr><td className="p-1.5 font-sans font-bold">Free State</td><td className="p-1.5 text-right">86,1%</td><td className="p-1.5 text-right">3,4%</td><td className="p-1.5 text-right">5,2%</td><td className="p-1.5 text-right">4,3%</td><td className="p-1.5 text-right">1,0%</td></tr>
                      <tr><td className="p-1.5 font-sans font-bold">KwaZulu-Natal</td><td className="p-1.5 text-right">72,5%</td><td className="p-1.5 text-right">4,8%</td><td className="p-1.5 text-right">5,1%</td><td className="p-1.5 text-right">16,4%</td><td className="p-1.5 text-right">1,2%</td></tr>
                      <tr><td className="p-1.5 font-sans font-bold">North West</td><td className="p-1.5 text-right">81,3%</td><td className="p-1.5 text-right">1,2%</td><td className="p-1.5 text-right">7,5%</td><td className="p-1.5 text-right">9,2%</td><td className="p-1.5 text-right">0,8%</td></tr>
                      <tr><td className="p-1.5 font-sans font-bold">Gauteng</td><td className="p-1.5 text-right">84,1%</td><td className="p-1.5 text-right">3,6%</td><td className="p-1.5 text-right font-bold text-red-600">9,8%</td><td className="p-1.5 text-right">1,5%</td><td className="p-1.5 text-right">1,0%</td></tr>
                      <tr><td className="p-1.5 font-sans font-bold">Mpumalanga</td><td className="p-1.5 text-right">71,4%</td><td className="p-1.5 text-right">1,5%</td><td className="p-1.5 text-right">3,6%</td><td className="p-1.5 text-right font-bold text-amber-600">22,4%</td><td className="p-1.5 text-right">1,1%</td></tr>
                      <tr><td className="p-1.5 font-sans font-bold">Limpopo</td><td className="p-1.5 text-right">54,2%</td><td className="p-1.5 text-right">1,1%</td><td className="p-1.5 text-right">2,8%</td><td className="p-1.5 text-right font-black text-amber-600">41,2%</td><td className="p-1.5 text-right">0,7%</td></tr>
                    </tbody>
                  </table>
                </div>

                <div className="text-[10px] text-slate-500 dark:text-rose-300/60 text-right italic">
                  [Adapted from www.statssa.gov.za]
                </div>
              </div>
            )}

            {/* =========================================================================
                3. SHEET 1.3: READING HABITS SURVEY QUESTIONS
               ========================================================================= */}
            {isSheet1_3 && (
              <div className="space-y-2.5 font-sans">
                <div className={`p-4 rounded-xl border ${isDark ? 'bg-[#1b0810] border-rose-900/80' : 'bg-rose-50/60 border-rose-200'}`}>
                  <h4 className="text-xs font-black uppercase tracking-wide text-rose-900 dark:text-rose-200 mb-2.5">
                    The following questions were taken from a company&apos;s information sheet:
                  </h4>
                  <div className="space-y-2 text-xs font-medium">
                    <div className="p-2.5 rounded-lg bg-white dark:bg-black/40 border border-rose-100 dark:border-rose-900 flex items-start gap-2.5">
                      <span className="font-black text-red-600 shrink-0">A.</span>
                      <span>How many hours per day do you spend reading?</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white dark:bg-black/40 border border-rose-100 dark:border-rose-900 flex items-start gap-2.5">
                      <span className="font-black text-red-600 shrink-0">B.</span>
                      <span>How many books have you read in the last 16 weeks?</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white dark:bg-black/40 border border-rose-100 dark:border-rose-900 flex items-start gap-2.5">
                      <span className="font-black text-red-600 shrink-0">C.</span>
                      <span>How many books have you bought in the last 3 months?</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white dark:bg-black/40 border border-rose-100 dark:border-rose-900 flex items-start gap-2.5">
                      <span className="font-black text-red-600 shrink-0">D.</span>
                      <span>Were the books you bought hard copies or soft copies?</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white dark:bg-black/40 border border-rose-100 dark:border-rose-900 flex items-start gap-2.5">
                      <span className="font-black text-red-600 shrink-0">E.</span>
                      <span>Do you believe that we should pay 15% VAT on book prices?</span>
                    </div>
                  </div>
                </div>
                <div className="text-[10px] text-slate-500 dark:text-rose-300/60 text-right italic">
                  [Adapted from www.developingquestions.co.za]
                </div>
              </div>
            )}

            {/* =========================================================================
                4. TABLE 2: CAR FINANCING OPTIONS (FORD FIGO VS VW POLO)
               ========================================================================= */}
            {isTable2 && (
              <div className="space-y-2.5 font-sans">
                <div className="flex items-center justify-between text-xs font-bold text-rose-700 dark:text-rose-300 flex-wrap gap-1">
                  <span>TABLE 2: PAYMENT OPTIONS FOR TWO DIFFERENT CARS</span>
                  <span className="text-[10px] font-mono font-medium text-slate-500">VAT: 15% Included</span>
                </div>

                <div className="overflow-x-auto rounded-xl border border-rose-200 dark:border-rose-900/80 shadow-xs">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className={isDark ? 'bg-[#240c14] text-rose-200 border-b border-rose-900' : 'bg-rose-100/80 text-rose-900 border-b border-rose-200'}>
                        <th className="p-2.5 font-black">ITEM</th>
                        <th className="p-2.5 font-black text-right">FORD FIGO</th>
                        <th className="p-2.5 font-black text-right">VW POLO</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-rose-100 dark:divide-rose-950 font-medium font-mono text-xs">
                      <tr><td className="p-2 font-sans font-bold">Retail price / Cash price (including VAT)</td><td className="p-2 text-right font-bold text-red-600">R215 100</td><td className="p-2 text-right font-bold text-red-600">R220 300</td></tr>
                      <tr><td className="p-2 font-sans font-bold">Deposit</td><td className="p-2 text-right font-bold">5%</td><td className="p-2 text-right">0%</td></tr>
                      <tr><td className="p-2 font-sans font-bold">Monthly instalment</td><td className="p-2 text-right">R2 999,00</td><td className="p-2 text-right font-bold">R3 345,00</td></tr>
                      <tr><td className="p-2 font-sans font-bold">Residual value</td><td className="p-2 text-right">30%</td><td className="p-2 text-right font-bold">R116 759</td></tr>
                      <tr><td className="p-2 font-sans font-bold">Monthly admin fee (not included in monthly instalment)</td><td className="p-2 text-right">R69,00</td><td className="p-2 text-right">2,08% of the monthly instalment</td></tr>
                      <tr><td className="p-2 font-sans font-bold">Term agreement</td><td className="p-2 text-right font-bold">72 months</td><td className="p-2 text-right font-bold">48 months</td></tr>
                      <tr><td className="p-2 font-sans font-bold">VAT</td><td className="p-2 text-right">15%</td><td className="p-2 text-right">15%</td></tr>
                    </tbody>
                  </table>
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-rose-300/60 italic flex-wrap gap-1">
                  <span>*Residual value is the last month&apos;s payment.</span>
                  <span>[Adapted from www.vw.co.za and www.ford.co.za]</span>
                </div>
              </div>
            )}

            {/* =========================================================================
                5. ANNEXURE A: CELLPHONE INVOICE FOR MR SJ FORTUNE
               ========================================================================= */}
            {isAnnexureA && (
              <div className="space-y-3 font-sans">
                <div className={`p-4 rounded-xl border ${isDark ? 'bg-[#18060c] border-rose-900/80' : 'bg-rose-50/50 border-rose-200'}`}>
                  {/* Invoice Header */}
                  <div className="flex items-start justify-between border-b border-rose-200 dark:border-rose-900 pb-3 flex-wrap gap-2 text-xs">
                    <div>
                      <p className="font-black text-sm text-slate-900 dark:text-white">Mr SJ Fortune</p>
                      <p className="text-slate-500">5 Second Avenue, Zone 2</p>
                      <p className="text-slate-500">Smelderado, 2463</p>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-xs text-red-600 dark:text-rose-400">Customer Care</p>
                      <p className="text-slate-500 font-mono">Tel: +27083245</p>
                      <p className="text-slate-500">E-mail: customercare@ABC.co.za</p>
                      <p className="text-slate-500">Website: www.abc.co.za</p>
                    </div>
                  </div>

                  {/* Account Summary Strip */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 py-2.5 border-b border-rose-200 dark:border-rose-900 text-xs font-mono">
                    <div><span className="text-[10px] font-sans text-slate-400 block">Invoice date</span><span className="font-bold">17-01-2021</span></div>
                    <div><span className="text-[10px] font-sans text-slate-400 block">Account Number</span><span className="font-bold">BA4536782C</span></div>
                    <div><span className="text-[10px] font-sans text-slate-400 block">Payment Method</span><span className="font-bold">Direct Debit</span></div>
                    <div><span className="text-[10px] font-sans text-slate-400 block">Due Date</span><span className="font-bold">01-03-2021</span></div>
                  </div>

                  {/* Summary of Charges for your ABC plan */}
                  <div className="mt-3 space-y-3">
                    <h5 className="text-xs font-black uppercase tracking-wide text-slate-900 dark:text-white">
                      Summary of charges for your ABC plan:
                    </h5>

                    {/* Plan 1: ABC Made For You S */}
                    <div className="rounded-lg p-2.5 bg-white dark:bg-black/40 border border-rose-100 dark:border-rose-900/60 text-xs">
                      <div className="flex justify-between font-bold text-slate-800 dark:text-rose-200 border-b border-rose-100 dark:border-rose-950 pb-1 mb-1.5">
                        <span>ABC Made For You S</span>
                        <span className="text-[11px] font-mono text-slate-500">Contract: 13-03-2019 to 12-03-2021</span>
                      </div>
                      <div className="flex justify-between font-mono text-[11px] py-0.5">
                        <span>Device (17-12-2020 to 16-01-2021)</span>
                        <span>R 260,87</span>
                      </div>
                      <div className="flex justify-between font-mono text-[11px] py-0.5">
                        <span>ABC made for You S (17-01-2021 to 16-02-2021)</span>
                        <span>R 94,78</span>
                      </div>
                      <div className="flex justify-between font-mono font-bold text-xs pt-1 border-t border-rose-100 dark:border-rose-950">
                        <span>Subtotal: (excl. 15% VAT)</span>
                        <span className="text-red-600 dark:text-rose-400">R 355,65</span>
                      </div>
                    </div>

                    {/* Plan 2: ABC made for You XS */}
                    <div className="rounded-lg p-2.5 bg-white dark:bg-black/40 border border-rose-100 dark:border-rose-900/60 text-xs">
                      <div className="flex justify-between font-bold text-slate-800 dark:text-rose-200 border-b border-rose-100 dark:border-rose-950 pb-1 mb-1.5">
                        <span>ABC made for You XS</span>
                        <span className="text-[11px] font-mono text-slate-500">Contract: 13-05-2019 to 12-05-2021</span>
                      </div>
                      <div className="flex justify-between font-mono text-[11px] py-0.5">
                        <span>Device</span>
                        <span>R 173,91</span>
                      </div>
                      <div className="flex justify-between font-mono text-[11px] py-0.5">
                        <span>ABC made for You XS</span>
                        <span>R 86,09</span>
                      </div>
                      <div className="flex justify-between font-mono font-bold text-xs pt-1 border-t border-rose-100 dark:border-rose-950">
                        <span>Subtotal: (excl. 15% VAT)</span>
                        <span className="text-red-600 dark:text-rose-400">R 260,00</span>
                      </div>
                    </div>

                    {/* Plan 3: Your ABC Choice 5GB */}
                    <div className="rounded-lg p-2.5 bg-white dark:bg-black/40 border border-rose-100 dark:border-rose-900/60 text-xs">
                      <div className="flex justify-between font-bold text-slate-800 dark:text-rose-200 border-b border-rose-100 dark:border-rose-950 pb-1 mb-1.5">
                        <span>Your ABC Choice 5GB</span>
                        <span className="text-[11px] font-mono text-slate-500">Contract: 19-08-2019 to 18-08-2021</span>
                      </div>
                      <div className="flex justify-between font-mono text-[11px] py-0.5">
                        <span>Device</span>
                        <span>R 165,22</span>
                      </div>
                      <div className="flex justify-between font-mono text-[11px] py-0.5">
                        <span>Your ABC Choice 5GB</span>
                        <span>R 172,13</span>
                      </div>
                      <div className="flex justify-between font-mono font-bold text-xs pt-1 border-t border-rose-100 dark:border-rose-950">
                        <span>Subtotal: (excl. 15% VAT)</span>
                        <span className="text-red-600 dark:text-rose-400">R 337,35</span>
                      </div>
                    </div>

                    {/* Totals & VAT Strip */}
                    <div className="rounded-lg p-3 bg-red-50 dark:bg-rose-950/40 border border-red-200 dark:border-rose-900 text-xs font-mono space-y-1">
                      <div className="flex justify-between">
                        <span className="font-sans font-bold">VAT total 15%:</span>
                        <span className="font-bold text-red-600 dark:text-rose-400">R 142,95</span>
                      </div>
                      <div className="flex justify-between text-sm font-black border-t border-red-200 dark:border-rose-900 pt-1">
                        <span className="font-sans">Total amount due for current period (VAT incl.):</span>
                        <span className="text-red-600 dark:text-rose-300 font-mono">[ Value A ]</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* =========================================================================
                6. TABLE 3: DAM LEVELS IN DIFFERENT PROVINCES (5 APRIL 2021)
               ========================================================================= */}
            {isTable3 && (
              <div className="space-y-2.5 font-sans">
                <div className="flex items-center justify-between text-xs font-bold text-rose-700 dark:text-rose-300 flex-wrap gap-1">
                  <span>TABLE 3: DAM LEVELS IN DIFFERENT PROVINCES ON 5 APRIL 2021</span>
                  <span className="text-[10px] font-mono text-slate-500">Mean Storage Capacity Last Week: 83%</span>
                </div>

                <div className="overflow-x-auto rounded-xl border border-rose-200 dark:border-rose-900/80 shadow-xs">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className={isDark ? 'bg-[#240c14] text-rose-200 border-b border-rose-900' : 'bg-rose-100/80 text-rose-900 border-b border-rose-200'}>
                        <th className="p-2 font-black">PROVINCE</th>
                        <th className="p-2 text-right font-black">NET FSC (MILLION m³)</th>
                        <th className="p-2 text-right font-black">THIS WEEK (%)</th>
                        <th className="p-2 text-right font-black">LAST WEEK (%)</th>
                        <th className="p-2 text-right font-black">LAST YEAR (%)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-rose-100 dark:divide-rose-950 font-medium font-mono text-xs">
                      <tr><td className="p-2 font-sans font-bold">Eastern Cape</td><td className="p-2 text-right">1 823</td><td className="p-2 text-right">55</td><td className="p-2 text-right font-bold text-red-600">D</td><td className="p-2 text-right">56</td></tr>
                      <tr><td className="p-2 font-sans font-bold">Free State</td><td className="p-2 text-right font-bold text-red-600">15 657</td><td className="p-2 text-right font-bold">100</td><td className="p-2 text-right font-bold">99</td><td className="p-2 text-right">77</td></tr>
                      <tr><td className="p-2 font-sans font-bold">Gauteng</td><td className="p-2 text-right font-bold text-red-600">128</td><td className="p-2 text-right font-bold">100</td><td className="p-2 text-right">101</td><td className="p-2 text-right">101</td></tr>
                      <tr><td className="p-2 font-sans font-bold">KwaZulu-Natal</td><td className="p-2 text-right">4 784</td><td className="p-2 text-right">73</td><td className="p-2 text-right">73</td><td className="p-2 text-right">61</td></tr>
                      <tr><td className="p-2 font-sans font-bold">Limpopo</td><td className="p-2 text-right">1 480</td><td className="p-2 text-right">88</td><td className="p-2 text-right">88</td><td className="p-2 text-right">70</td></tr>
                      <tr><td className="p-2 font-sans font-bold">Mpumalanga</td><td className="p-2 text-right">2 539</td><td className="p-2 text-right">89</td><td className="p-2 text-right">89</td><td className="p-2 text-right">75</td></tr>
                      <tr><td className="p-2 font-sans font-bold">North West</td><td className="p-2 text-right">867</td><td className="p-2 text-right">82</td><td className="p-2 text-right">82</td><td className="p-2 text-right">71</td></tr>
                      <tr><td className="p-2 font-sans font-bold">Northern Cape</td><td className="p-2 text-right">147</td><td className="p-2 text-right font-bold">102</td><td className="p-2 text-right font-bold">105</td><td className="p-2 text-right">95</td></tr>
                      <tr><td className="p-2 font-sans font-bold">Western Cape</td><td className="p-2 text-right">1 866</td><td className="p-2 text-right font-bold">52</td><td className="p-2 text-right font-bold text-red-600">D</td><td className="p-2 text-right font-bold">40</td></tr>
                    </tbody>
                  </table>
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-rose-300/60 italic flex-wrap gap-1">
                  <span>Net FSC (million m³) = net full storage capacity in million cubic metres.</span>
                  <span>[Adapted from https://sawx.co.za/state-of-dams]</span>
                </div>
              </div>
            )}

            {/* =========================================================================
                7. ANNEXURE B: SHOWERHEAD WATER AND ENERGY COMPARISON
               ========================================================================= */}
            {isAnnexureB && (
              <div className="space-y-3 font-sans">
                {/* Cost Comparison Callout from Question 3.2 text */}
                <div className="p-3 rounded-xl bg-rose-50/70 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-red-600 dark:text-rose-400 mb-1">
                    <Info className="w-3.5 h-3.5" />
                    <span>Average Middle-Class Household Benchmark:</span>
                  </div>
                  <p className="text-slate-700 dark:text-rose-100 text-[11px] leading-relaxed">
                    A 10-minute shower costs almost <strong className="font-mono text-red-600">R13 (or R1,30/min)</strong> with a normal 15 ℓ/min shower head. Changing to a low-flow shower head and reducing time to 6 minutes reduces cost to <strong className="font-mono text-emerald-600">R4,20 per shower (or 70c/min)</strong>.
                  </p>
                </div>

                {/* Vector Bar Chart for Water and Energy use per shower */}
                <div className={`p-3 rounded-xl border overflow-x-auto ${isDark ? 'bg-[#18070d] border-rose-900/70' : 'bg-rose-50/40 border-rose-200'}`}>
                  <svg className="w-full min-w-[500px] h-[240px]" viewBox="0 0 540 240">
                    <rect x="0" y="0" width="540" height="240" fill="transparent" />

                    {/* Y-Axis: Litres (0 to 160) */}
                    {[0, 20, 40, 60, 80, 100, 120, 140, 160].map((val) => {
                      const y = 195 - (val * 1.05);
                      return (
                        <g key={val}>
                          <line x1="45" y1={y} x2="410" y2={y} stroke={isDark ? '#3d1620' : '#fecdd3'} strokeDasharray={val === 0 ? 'none' : '3 3'} strokeWidth="1" />
                          <text x="38" y={y + 3} textAnchor="end" fontSize="9" fontWeight="bold" fill={isDark ? '#fda4af' : '#64748b'}>{val}</text>
                        </g>
                      );
                    })}

                    <text x="14" y="110" textAnchor="middle" transform="rotate(-90 14 110)" fontSize="9" fontWeight="900" fill={isDark ? '#f43f5e' : '#e11d48'}>
                      Litres used during a shower
                    </text>

                    {/* Grouped Bars for Shower Times: 2, 4, 6, 8, 10 minutes */}
                    {[
                      { min: 2, low: 16, norm: 30, kwh: 0.85, x: 65 },
                      { min: 4, low: 32, norm: 60, kwh: 1.7, x: 135 },
                      { min: 6, low: 48, norm: 90, kwh: 2.55, x: 205 },
                      { min: 8, low: 64, norm: 120, kwh: 3.4, x: 275 },
                      { min: 10, low: 80, norm: 150, kwh: 4.3, x: 345 }
                    ].map((d) => {
                      const baseY = 195;
                      const hLow = d.low * 1.05;
                      const hNorm = d.norm * 1.05;

                      return (
                        <g key={d.min}>
                          {/* Low-flow bar (8 L/min) */}
                          <rect x={d.x} y={baseY - hLow} width="22" height={hLow} fill={isDark ? '#059669' : '#10b981'} rx="2" />
                          <text x={d.x + 11} y={baseY - hLow - 4} textAnchor="middle" fontSize="8" fontWeight="bold" fill={isDark ? '#6ee7b7' : '#047857'}>{d.low}ℓ</text>

                          {/* Normal showerhead bar (15 L/min) */}
                          <rect x={d.x + 25} y={baseY - hNorm} width="22" height={hNorm} fill={isDark ? '#e11d48' : '#f43f5e'} rx="2" />
                          <text x={d.x + 36} y={baseY - hNorm - 4} textAnchor="middle" fontSize="8" fontWeight="bold" fill={isDark ? '#fda4af' : '#be123c'}>{d.norm}ℓ</text>

                          {/* X-axis time label */}
                          <text x={d.x + 24} y="210" textAnchor="middle" fontSize="10" fontWeight="bold" fill={isDark ? '#fff' : '#0f172a'}>{d.min} min</text>
                        </g>
                      );
                    })}

                    <text x="235" y="228" textAnchor="middle" fontSize="10" fontWeight="900" fill={isDark ? '#f43f5e' : '#e11d48'}>
                      Time in minutes
                    </text>

                    {/* Legend */}
                    <g transform="translate(420, 30)">
                      <rect x="0" y="0" width="115" height="110" rx="8" fill={isDark ? '#260a12' : '#ffffff'} stroke={isDark ? '#4c1524' : '#e2e8f0'} strokeWidth="1" />
                      <text x="10" y="16" fontSize="9" fontWeight="900" fill={isDark ? '#fff' : '#0f172a'}>SHOWER HEADS</text>

                      <rect x="10" y="28" width="10" height="10" fill={isDark ? '#059669' : '#10b981'} rx="2" />
                      <text x="24" y="37" fontSize="8.5" fontWeight="bold" fill={isDark ? '#6ee7b7' : '#334155'}>Low-flow (8 ℓ/min)</text>

                      <rect x="10" y="46" width="10" height="10" fill={isDark ? '#e11d48' : '#f43f5e'} rx="2" />
                      <text x="24" y="55" fontSize="8.5" fontWeight="bold" fill={isDark ? '#fda4af' : '#334155'}>Normal (15 ℓ/min)</text>

                      <line x1="8" y1="68" x2="105" y2="68" stroke={isDark ? '#4c1524' : '#e2e8f0'} strokeWidth="1" />
                      <text x="10" y="80" fontSize="8" fontWeight="bold" fill={isDark ? '#f43f5e' : '#e11d48'}>Energy Benchmarks:</text>
                      <text x="10" y="93" fontSize="7.5" fontWeight="medium" fill={isDark ? '#cbd5e1' : '#64748b'}>4 min = 1,7 kWh</text>
                      <text x="10" y="104" fontSize="7.5" fontWeight="medium" fill={isDark ? '#cbd5e1' : '#64748b'}>10 min = 4,3 kWh</text>
                    </g>
                  </svg>
                </div>
                <div className="text-[10px] text-slate-500 dark:text-rose-300/60 text-right italic">
                  [Adapted from https://www.poweroptimal.com/cost-shower-south-africa/]
                </div>
              </div>
            )}

            {/* =========================================================================
                8. TABLE 4 & 5: BIRYANI INGREDIENTS COSTS & CURRENCY EXCHANGE RATE
               ========================================================================= */}
            {isTable4_5 && (
              <div className="space-y-3 font-sans">
                {/* Context callout */}
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs">
                  <span className="font-bold text-amber-700 dark:text-amber-300 block mb-0.5">Take-Away Business Context:</span>
                  <p className="text-slate-700 dark:text-amber-100/90 text-[11px] leading-relaxed">
                    Bobby lives in India and sells chicken biryani for <strong>eighty rupees (Rs 80)</strong> per plate. Each plate is packed in a disposable container that costs <strong>Rs 2,43</strong> each.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Table 4 */}
                  <div className="overflow-x-auto rounded-xl border border-rose-200 dark:border-rose-900/80 shadow-xs">
                    <div className={`p-2 font-black text-[11px] border-b ${isDark ? 'bg-[#240c14] text-rose-200 border-rose-900' : 'bg-rose-100 text-rose-900 border-rose-200'}`}>
                      TABLE 4: ESTIMATED COST (IN Rs) FOR 8 PLATES
                    </div>
                    <table className="w-full text-xs text-left border-collapse">
                      <thead>
                        <tr className="border-b border-rose-100 dark:border-rose-950 font-bold text-slate-500 text-[10px]">
                          <th className="p-2">PRODUCT</th>
                          <th className="p-2 text-right">COST (IN Rs)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-rose-100 dark:divide-rose-950 font-mono text-xs">
                        <tr><td className="p-2 font-sans font-bold">1 kg chicken</td><td className="p-2 text-right font-bold text-red-600">200</td></tr>
                        <tr><td className="p-2 font-sans font-bold">1 kg basmati rice</td><td className="p-2 text-right">120</td></tr>
                        <tr><td className="p-2 font-sans font-bold">Masala powder</td><td className="p-2 text-right font-bold text-red-600">10</td></tr>
                        <tr><td className="p-2 font-sans font-bold">Other ingredients</td><td className="p-2 text-right">62</td></tr>
                        <tr className="font-black bg-rose-50/50 dark:bg-rose-950/30"><td className="p-2 font-sans">Total (8 plates):</td><td className="p-2 text-right text-red-600">Rs 392</td></tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Table 5: Exchange Rate */}
                  <div className="overflow-x-auto rounded-xl border border-rose-200 dark:border-rose-900/80 shadow-xs">
                    <div className={`p-2 font-black text-[11px] border-b ${isDark ? 'bg-[#240c14] text-rose-200 border-rose-900' : 'bg-rose-100 text-rose-900 border-rose-200'}`}>
                      TABLE 5: EXCHANGE RATE (3 MARCH 2021)
                    </div>
                    <table className="w-full text-xs text-left border-collapse">
                      <thead>
                        <tr className="border-b border-rose-100 dark:border-rose-950 font-bold text-slate-500 text-[10px]">
                          <th className="p-2">SOUTH AFRICAN RAND (ZAR)</th>
                          <th className="p-2 text-right">INDIAN RUPEES (Rs)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-rose-100 dark:divide-rose-950 font-mono text-xs">
                        <tr><td className="p-2 font-bold text-red-600">1</td><td className="p-2 text-right font-bold text-red-600">4,8346707</td></tr>
                        <tr><td className="p-2">0,206839</td><td className="p-2 text-right">1</td></tr>
                      </tbody>
                    </table>
                    <div className="p-2 text-[10px] text-slate-500 dark:text-rose-300/60 italic">
                      [Adapted from www.xe.com]
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* =========================================================================
                9. TABLE 6 & ANSWER SHEET: JANET'S BIRYANI INCOME AND COST GRAPH
               ========================================================================= */}
            {isTable6 && (
              <div className="space-y-3 font-sans">
                {/* Janet's formula banner */}
                <div className="p-2.5 rounded-xl bg-rose-100/70 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-xs flex items-center justify-between flex-wrap gap-2">
                  <span className="font-bold text-rose-950 dark:text-rose-100">
                    Cost Equation: <code className="font-mono bg-white dark:bg-black/50 px-2 py-0.5 rounded-md border border-rose-200 dark:border-rose-900 text-red-600">Total cost = R600,00 + 13 p</code>
                  </span>
                  <span className="text-[10px] text-slate-500">where p = number of plates sold</span>
                </div>

                {/* Table 6 Schedule */}
                <div className="overflow-x-auto rounded-xl border border-rose-200 dark:border-rose-900/80 shadow-xs">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className={isDark ? 'bg-[#240c14] text-rose-200 border-b border-rose-900' : 'bg-rose-100/80 text-rose-900 border-b border-rose-200'}>
                        <th className="p-2 font-black">NUMBER OF PLATES</th>
                        {[0, 10, 30, 50, 70, 90, 100].map((num) => (
                          <th key={num} className="p-2 text-right font-mono font-black">{num}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-rose-100 dark:divide-rose-950 font-mono text-xs">
                      <tr>
                        <td className="p-2 font-sans font-bold">INCOME (R)</td>
                        <td className="p-2 text-right">0</td>
                        <td className="p-2 text-right">250</td>
                        <td className="p-2 text-right">750</td>
                        <td className="p-2 text-right font-black text-emerald-600">1 250</td>
                        <td className="p-2 text-right">1 750</td>
                        <td className="p-2 text-right">2 250</td>
                        <td className="p-2 text-right">2 500</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-sans font-bold">COST (R)</td>
                        <td className="p-2 text-right">600</td>
                        <td className="p-2 text-right">730</td>
                        <td className="p-2 text-right">990</td>
                        <td className="p-2 text-right font-black text-red-600">1 250</td>
                        <td className="p-2 text-right">1 510</td>
                        <td className="p-2 text-right">1 770</td>
                        <td className="p-2 text-right">1 900</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Answer Sheet 4.2.2 Break-Even Coordinate Graph */}
                <div className={`p-3 rounded-xl border overflow-x-auto ${isDark ? 'bg-[#18070d] border-rose-900/70' : 'bg-rose-50/40 border-rose-200'}`}>
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-800 dark:text-rose-200 mb-1">
                    <span>ANSWER SHEET 4.2.2: JANET&apos;S BUSINESS GRAPH FOR PLATES OF BIRYANI</span>
                    <span className="text-[10px] text-emerald-600 font-mono">Break-even Point: 50 plates @ R1 250</span>
                  </div>

                  <svg className="w-full min-w-[480px] h-[220px]" viewBox="0 0 500 220">
                    <rect x="0" y="0" width="500" height="220" fill="transparent" />

                    {/* Coordinate Grid */}
                    {[0, 500, 1000, 1250, 1500, 2000, 2500].map((amount) => {
                      const y = 180 - (amount * 0.064);
                      return (
                        <g key={amount}>
                          <line x1="50" y1={y} x2="460" y2={y} stroke={isDark ? '#3d1620' : '#fecdd3'} strokeDasharray={amount === 1250 ? '2 2' : 'none'} strokeWidth={amount === 1250 ? '1.5' : '0.5'} />
                          <text x="44" y={y + 3} textAnchor="end" fontSize="8.5" fontWeight="bold" fill={isDark ? '#fda4af' : '#64748b'}>{amount}</text>
                        </g>
                      );
                    })}

                    {[0, 20, 40, 50, 60, 80, 100].map((plate) => {
                      const x = 50 + (plate * 4.1);
                      return (
                        <g key={plate}>
                          <line x1={x} y1="20" x2={x} y2="180" stroke={isDark ? '#3d1620' : '#fecdd3'} strokeDasharray={plate === 50 ? '2 2' : 'none'} strokeWidth={plate === 50 ? '1.5' : '0.5'} />
                          <text x={x} y="195" textAnchor="middle" fontSize="9" fontWeight="bold" fill={isDark ? '#fda4af' : '#64748b'}>{plate}</text>
                        </g>
                      );
                    })}

                    {/* Income Line: (0, 0) to (100, 2500) -> (50, 180) to (460, 20) */}
                    <line x1="50" y1="180" x2="460" y2="20" stroke={isDark ? '#10b981' : '#059669'} strokeWidth="2.5" />
                    <text x="440" y="15" textAnchor="end" fontSize="9.5" fontWeight="black" fill={isDark ? '#10b981' : '#059669'}>Income Line</text>

                    {/* Cost Line: (0, 600) to (100, 1900) -> (50, 141.6) to (460, 58.4) */}
                    <line x1="50" y1="141.6" x2="460" y2="58.4" stroke={isDark ? '#f43f5e' : '#e11d48'} strokeWidth="2.5" strokeDasharray="4 2" />
                    <text x="440" y="52" textAnchor="end" fontSize="9.5" fontWeight="black" fill={isDark ? '#f43f5e' : '#e11d48'}>Cost Line</text>

                    {/* Break-even point dot at (50, 1250) -> x = 50 + (50 * 4.1) = 255, y = 180 - (1250 * 0.064) = 100 */}
                    <circle cx="255" cy="100" r="5" fill="#f59e0b" stroke="#fff" strokeWidth="2" />
                    <text x="265" y="96" fontSize="9" fontWeight="black" fill="#f59e0b">Break-even (50 plates, R1 250)</text>

                    <text x="16" y="100" textAnchor="middle" transform="rotate(-90 16 100)" fontSize="9" fontWeight="bold" fill={isDark ? '#f43f5e' : '#e11d48'}>Amount in rand</text>
                    <text x="255" y="212" textAnchor="middle" fontSize="9" fontWeight="bold" fill={isDark ? '#f43f5e' : '#e11d48'}>Number of plates of biryani</text>
                  </svg>
                </div>
              </div>
            )}

            {/* =========================================================================
                10. ANNEXURE C: INDIA TOURIST ARRIVALS (BAR & PIE CHART)
               ========================================================================= */}
            {isAnnexureC && (
              <div className="space-y-3 font-sans">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {/* Left: Tourist Arrivals Bar Chart */}
                  <div className={`p-3 rounded-xl border ${isDark ? 'bg-[#18070d] border-rose-900/70' : 'bg-rose-50/40 border-rose-200'}`}>
                    <div className="text-[11px] font-black text-rose-950 dark:text-rose-100 mb-2">
                      NUMBER OF TOURIST ARRIVALS IN INDIA (2015–2019)
                    </div>

                    <svg className="w-full h-[180px]" viewBox="0 0 280 180">
                      <rect x="0" y="0" width="280" height="180" fill="transparent" />

                      {/* Y-Axis: 0 to 12 million */}
                      {[0, 2, 4, 6, 8, 10, 12].map((val) => {
                        const y = 145 - (val * 10);
                        return (
                          <g key={val}>
                            <line x1="30" y1={y} x2="260" y2={y} stroke={isDark ? '#3d1620' : '#fecdd3'} strokeWidth="0.5" />
                            <text x="24" y={y + 3} textAnchor="end" fontSize="8" fontWeight="bold" fill={isDark ? '#fda4af' : '#64748b'}>{val}</text>
                          </g>
                        );
                      })}

                      {/* Bars: 2015 (8.03), 2016 (8.8), 2017 (10.04), 2018 (10.56), 2019 (10.93) */}
                      {[
                        { yr: '2015', val: 8.03, x: 45 },
                        { yr: '2016', val: 8.8, x: 90 },
                        { yr: '2017', val: 10.04, x: 135 },
                        { yr: '2018', val: 10.56, x: 180 },
                        { yr: '2019', val: 10.93, x: 225 }
                      ].map((b) => {
                        const h = b.val * 10;
                        const y = 145 - h;
                        return (
                          <g key={b.yr}>
                            <rect x={b.x} y={y} width="30" height={h} fill={isDark ? '#e11d48' : '#f43f5e'} rx="3" />
                            <text x={b.x + 15} y={y - 4} textAnchor="middle" fontSize="8.5" fontWeight="bold" fill={isDark ? '#fda4af' : '#9f1239'}>{b.val}</text>
                            <text x={b.x + 15} y="160" textAnchor="middle" fontSize="9" fontWeight="bold" fill={isDark ? '#fff' : '#0f172a'}>{b.yr}</text>
                          </g>
                        );
                      })}

                      <text x="140" y="174" textAnchor="middle" fontSize="8" fontWeight="bold" fill={isDark ? '#fda4af' : '#64748b'}>(IN MILLIONS)</text>
                    </svg>
                  </div>

                  {/* Right: Pie Chart Origin Countries */}
                  <div className={`p-3 rounded-xl border ${isDark ? 'bg-[#18070d] border-rose-900/70' : 'bg-rose-50/40 border-rose-200'}`}>
                    <div className="text-[11px] font-black text-rose-950 dark:text-rose-100 mb-2">
                      MOST IMPORTANT COUNTRIES OF ORIGIN (2019)
                    </div>

                    <div className="flex items-center justify-center gap-3">
                      {/* SVG Pie Chart */}
                      <svg className="w-[120px] h-[120px] shrink-0" viewBox="0 0 100 100">
                        {/* Bangladesh 37.1% (133.56 deg) */}
                        <circle r="25" cx="50" cy="50" fill="transparent" stroke="#f43f5e" strokeWidth="50" strokeDasharray="37.1 62.9" strokeDashoffset="25" />
                        {/* United States 21.1% */}
                        <circle r="25" cx="50" cy="50" fill="transparent" stroke="#0ea5e9" strokeWidth="50" strokeDasharray="21.1 78.9" strokeDashoffset="-12.1" />
                        {/* Other Countries 18.7% */}
                        <circle r="25" cx="50" cy="50" fill="transparent" stroke="#94a3b8" strokeWidth="50" strokeDasharray="18.7 81.3" strokeDashoffset="-33.2" />
                        {/* United Kingdom 14.4% */}
                        <circle r="25" cx="50" cy="50" fill="transparent" stroke="#8b5cf6" strokeWidth="50" strokeDasharray="14.4 85.6" strokeDashoffset="-51.9" />
                        {/* Canada 5.0% */}
                        <circle r="25" cx="50" cy="50" fill="transparent" stroke="#f59e0b" strokeWidth="50" strokeDasharray="5.0 95.0" strokeDashoffset="-66.3" />
                        {/* Australia 3.5% */}
                        <circle r="25" cx="50" cy="50" fill="transparent" stroke="#10b981" strokeWidth="50" strokeDasharray="3.5 96.5" strokeDashoffset="-71.3" />
                      </svg>

                      {/* Legend List */}
                      <div className="space-y-1 text-[10px] font-medium">
                        <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-xs bg-[#f43f5e]"></span><span>Bangladesh (37,1%)</span></div>
                        <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-xs bg-[#0ea5e9]"></span><span>United States (21,1%)</span></div>
                        <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-xs bg-[#8b5cf6]"></span><span>United Kingdom (14,4%)</span></div>
                        <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-xs bg-[#f59e0b]"></span><span>Canada (5%)</span></div>
                        <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-xs bg-[#10b981]"></span><span>Australia (3,5%)</span></div>
                        <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-xs bg-[#94a3b8]"></span><span>Other Countries (18,7%)</span></div>
                        <div className="pt-1 text-[9px] font-bold text-red-600 dark:text-rose-400">Total Sum = 99,8%</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-[10px] text-slate-500 dark:text-rose-300/60 text-right italic">
                  [Adapted from www.statista.com]
                </div>
              </div>
            )}

            {/* =========================================================================
                11. TABLE 7 & 8: SARS INDIVIDUAL TAX BRACKETS, REBATES & MEDICAL CREDITS
               ========================================================================= */}
            {isTable7_8 && (
              <div className="space-y-3 font-sans">
                {/* Marius Context */}
                <div className="p-2.5 rounded-xl bg-rose-100/70 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs">
                  <span className="font-bold text-slate-800 dark:text-rose-100">Taxpayer Case Study: </span>
                  <span className="text-slate-600 dark:text-rose-200">
                    Marius, who is <strong>64 years old</strong>, earned an annual taxable income of <strong>R551 762,00</strong> for the 2019/20 tax year.
                  </span>
                </div>

                {/* Table 7: Brackets */}
                <div className="overflow-x-auto rounded-xl border border-rose-200 dark:border-rose-900/80 shadow-xs">
                  <div className={`p-2 font-black text-[11px] border-b ${isDark ? 'bg-[#240c14] text-rose-200 border-rose-900' : 'bg-rose-100 text-rose-900 border-rose-200'}`}>
                    TABLE 7: TAX RATES FOR 2019/20 TAX YEAR (1 Mar. 2019 to 28 Feb. 2020)
                  </div>
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className="border-b border-rose-100 dark:border-rose-950 font-bold text-slate-500 text-[10px]">
                        <th className="p-2">BRACKET</th>
                        <th className="p-2">TAXABLE INCOME (R)</th>
                        <th className="p-2 text-right">RATES OF TAX (R)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-rose-100 dark:divide-rose-950 font-mono text-xs">
                      <tr><td className="p-2 font-sans font-bold">1</td><td className="p-2">1 – 195 850</td><td className="p-2 text-right">18% of taxable income</td></tr>
                      <tr><td className="p-2 font-sans font-bold">2</td><td className="p-2">195 851 – 305 850</td><td className="p-2 text-right">35 253 + 26% of taxable income above 195 850</td></tr>
                      <tr><td className="p-2 font-sans font-bold">3</td><td className="p-2">305 851 – 423 300</td><td className="p-2 text-right">63 853 + 31% of taxable income above 305 850</td></tr>
                      <tr className="bg-red-50/50 dark:bg-rose-950/30 font-bold"><td className="p-2 font-sans font-black text-red-600">4</td><td className="p-2 text-red-600">423 301 – 555 600</td><td className="p-2 text-right text-red-600">100 263 + 36% of taxable income above 423 300</td></tr>
                      <tr><td className="p-2 font-sans font-bold">5</td><td className="p-2">555 601 – 708 310</td><td className="p-2 text-right">147 891 + 39% of taxable income above 555 600</td></tr>
                      <tr><td className="p-2 font-sans font-bold">6</td><td className="p-2">708 311 – 1 500 000</td><td className="p-2 text-right">207 448 + 41% of taxable income above 708 310</td></tr>
                      <tr><td className="p-2 font-sans font-bold">7</td><td className="p-2">1 500 001 and above</td><td className="p-2 text-right">532 041 + 45% of taxable income above 1 500 000</td></tr>
                    </tbody>
                  </table>
                </div>

                {/* Table 8: Rebates & Medical Credits */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="rounded-xl border border-rose-200 dark:border-rose-900/80 p-3 bg-white dark:bg-black/40 text-xs">
                    <div className="font-bold text-red-600 dark:text-rose-400 border-b border-rose-100 dark:border-rose-900 pb-1.5 mb-2">
                      TAX REBATES (2019/20)
                    </div>
                    <div className="space-y-1 font-mono text-xs">
                      <div className="flex justify-between"><span>Primary</span><span className="font-bold text-red-600">R14 220</span></div>
                      <div className="flex justify-between"><span>Secondary (65 and older)</span><span className="font-bold">R7 794</span></div>
                      <div className="flex justify-between"><span>Tertiary (75 and older)</span><span>R2 601</span></div>
                    </div>
                  </div>

                  <div className="rounded-xl border border-rose-200 dark:border-rose-900/80 p-3 bg-white dark:bg-black/40 text-xs">
                    <div className="font-bold text-red-600 dark:text-rose-400 border-b border-rose-100 dark:border-rose-900 pb-1.5 mb-2">
                      MONTHLY MEDICAL TAX CREDITS
                    </div>
                    <div className="space-y-1 font-mono text-xs">
                      <div className="flex justify-between"><span>Main member</span><span className="font-bold text-red-600">R310</span></div>
                      <div className="flex justify-between"><span>First dependent</span><span className="font-bold text-red-600">R310</span></div>
                      <div className="flex justify-between"><span>Each additional dependent</span><span className="font-bold text-red-600">R209</span></div>
                    </div>
                  </div>
                </div>

                <div className="text-[10px] text-slate-500 dark:text-rose-300/60 text-right italic">
                  [Adapted from www.sars.gov.za]
                </div>
              </div>
            )}

            {/* =========================================================================
                12. BOX-AND-WHISKER PLOT: MARKET SHARE OF THREE LAPTOP BRANDS
               ========================================================================= */}
            {isBoxPlot && (
              <div className="space-y-2.5 font-sans">
                <div className="flex items-center justify-between text-xs font-bold text-rose-700 dark:text-rose-300 flex-wrap gap-1">
                  <span>BOX-AND-WHISKER PLOTS SHOWING MARKET SHARE OF THREE LAPTOP BRANDS</span>
                  <span className="text-[10px] font-mono text-slate-500">Q4 2019 to Q3 2020</span>
                </div>

                {/* Vector SVG Box-and-Whisker Plots */}
                <div className={`p-3 rounded-xl border overflow-x-auto ${isDark ? 'bg-[#18070d] border-rose-900/70' : 'bg-rose-50/40 border-rose-200'}`}>
                  <svg className="w-full min-w-[540px] h-[220px]" viewBox="0 0 580 220">
                    <rect x="0" y="0" width="580" height="220" fill="transparent" />

                    {/* Scale: 10% to 24% mapped from x=90 to x=540 (450px for 14% -> 32.14 px per 1%) */}
                    {/* Scale ticks */}
                    {[10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24].map((val) => {
                      const x = 90 + ((val - 10) * 32.14);
                      return (
                        <g key={val}>
                          <line x1={x} y1="20" x2={x} y2="170" stroke={isDark ? '#3d1620' : '#fecdd3'} strokeDasharray="2 2" strokeWidth="0.5" />
                          <line x1={x} y1="168" x2={x} y2="175" stroke={isDark ? '#fda4af' : '#94a3b8'} strokeWidth="1" />
                          <text x={x} y="188" textAnchor="middle" fontSize="9" fontWeight="bold" fill={isDark ? '#fda4af' : '#64748b'}>{val}%</text>
                        </g>
                      );
                    })}

                    <line x1="90" y1="170" x2="540" y2="170" stroke={isDark ? '#f43f5e' : '#e11d48'} strokeWidth="1.5" />
                    <text x="315" y="206" textAnchor="middle" fontSize="10" fontWeight="900" fill={isDark ? '#f43f5e' : '#e11d48'}>
                      MARKET SHARES IN PERCENTAGES
                    </text>

                    {/* 1. Huawei Plot (y=45): Min=18.8, Q1=19.15, Med=21.5, Q3=22.85, Max=23.5 */}
                    {(() => {
                      const y = 45;
                      const xMin = 90 + ((18.8 - 10) * 32.14);
                      const xQ1 = 90 + ((19.15 - 10) * 32.14);
                      const xMed = 90 + ((21.5 - 10) * 32.14);
                      const xQ3 = 90 + ((22.85 - 10) * 32.14);
                      const xMax = 90 + ((23.5 - 10) * 32.14);
                      return (
                        <g>
                          <text x="80" y={y + 4} textAnchor="end" fontSize="10" fontWeight="900" fill={isDark ? '#fff' : '#0f172a'}>Huawei</text>
                          {/* Whisker Line */}
                          <line x1={xMin} y1={y} x2={xMax} y2={y} stroke={isDark ? '#fda4af' : '#0f172a'} strokeWidth="1.5" />
                          {/* Whisker Ends */}
                          <line x1={xMin} y1={y - 8} x2={xMin} y2={y + 8} stroke={isDark ? '#fda4af' : '#0f172a'} strokeWidth="1.5" />
                          <line x1={xMax} y1={y - 8} x2={xMax} y2={y + 8} stroke={isDark ? '#fda4af' : '#0f172a'} strokeWidth="1.5" />
                          {/* Box */}
                          <rect x={xQ1} y={y - 12} width={xQ3 - xQ1} height="24" fill={isDark ? '#881337' : '#ffe4e6'} stroke={isDark ? '#f43f5e' : '#e11d48'} strokeWidth="1.5" rx="2" />
                          {/* Median Line */}
                          <line x1={xMed} y1={y - 12} x2={xMed} y2={y + 12} stroke={isDark ? '#fff' : '#be123c'} strokeWidth="2.5" />
                          {/* Value Labels */}
                          <text x={xMin} y={y - 14} textAnchor="middle" fontSize="7.5" fontWeight="bold" fill={isDark ? '#fda4af' : '#64748b'}>18,8</text>
                          <text x={xQ1} y={y - 14} textAnchor="middle" fontSize="7.5" fontWeight="bold" fill={isDark ? '#fda4af' : '#64748b'}>19,15</text>
                          <text x={xMed} y={y - 14} textAnchor="middle" fontSize="8" fontWeight="black" fill={isDark ? '#fff' : '#be123c'}>21,5</text>
                          <text x={xQ3} y={y - 14} textAnchor="middle" fontSize="7.5" fontWeight="bold" fill={isDark ? '#fda4af' : '#64748b'}>22,85</text>
                          <text x={xMax} y={y - 14} textAnchor="middle" fontSize="7.5" fontWeight="bold" fill={isDark ? '#fda4af' : '#64748b'}>23,5</text>
                        </g>
                      );
                    })()}

                    {/* 2. Samsung Plot (y=90): Min=14.6, Q1=15.7, Med=17.75, Q3=18.75, Max=20.2 */}
                    {(() => {
                      const y = 90;
                      const xMin = 90 + ((14.6 - 10) * 32.14);
                      const xQ1 = 90 + ((15.7 - 10) * 32.14);
                      const xMed = 90 + ((17.75 - 10) * 32.14);
                      const xQ3 = 90 + ((18.75 - 10) * 32.14);
                      const xMax = 90 + ((20.2 - 10) * 32.14);
                      return (
                        <g>
                          <text x="80" y={y + 4} textAnchor="end" fontSize="10" fontWeight="900" fill={isDark ? '#fff' : '#0f172a'}>Samsung</text>
                          {/* Whisker Line */}
                          <line x1={xMin} y1={y} x2={xMax} y2={y} stroke={isDark ? '#fda4af' : '#0f172a'} strokeWidth="1.5" />
                          {/* Whisker Ends */}
                          <line x1={xMin} y1={y - 8} x2={xMin} y2={y + 8} stroke={isDark ? '#fda4af' : '#0f172a'} strokeWidth="1.5" />
                          <line x1={xMax} y1={y - 8} x2={xMax} y2={y + 8} stroke={isDark ? '#fda4af' : '#0f172a'} strokeWidth="1.5" />
                          {/* Box */}
                          <rect x={xQ1} y={y - 12} width={xQ3 - xQ1} height="24" fill={isDark ? '#1e3a8a' : '#dbeafe'} stroke={isDark ? '#3b82f6' : '#2563eb'} strokeWidth="1.5" rx="2" />
                          {/* Median Line */}
                          <line x1={xMed} y1={y - 12} x2={xMed} y2={y + 12} stroke={isDark ? '#fff' : '#1d4ed8'} strokeWidth="2.5" />
                          {/* Value Labels */}
                          <text x={xMin} y={y - 14} textAnchor="middle" fontSize="7.5" fontWeight="bold" fill={isDark ? '#fda4af' : '#64748b'}>14,6</text>
                          <text x={xQ1} y={y - 14} textAnchor="middle" fontSize="7.5" fontWeight="bold" fill={isDark ? '#fda4af' : '#64748b'}>15,7</text>
                          <text x={xMed} y={y - 14} textAnchor="middle" fontSize="8" fontWeight="black" fill={isDark ? '#fff' : '#1d4ed8'}>17,75</text>
                          <text x={xQ3} y={y - 14} textAnchor="middle" fontSize="7.5" fontWeight="bold" fill={isDark ? '#fda4af' : '#64748b'}>18,75</text>
                          <text x={xMax} y={y - 14} textAnchor="middle" fontSize="7.5" fontWeight="bold" fill={isDark ? '#fda4af' : '#64748b'}>20,2</text>
                        </g>
                      );
                    })()}

                    {/* 3. Apple Plot (y=135): Min=10.2, Q1=11.8, Med=13.15, Q3=15.95, Max=19.9 */}
                    {(() => {
                      const y = 135;
                      const xMin = 90 + ((10.2 - 10) * 32.14);
                      const xQ1 = 90 + ((11.8 - 10) * 32.14);
                      const xMed = 90 + ((13.15 - 10) * 32.14);
                      const xQ3 = 90 + ((15.95 - 10) * 32.14);
                      const xMax = 90 + ((19.9 - 10) * 32.14);
                      return (
                        <g>
                          <text x="80" y={y + 4} textAnchor="end" fontSize="10" fontWeight="900" fill={isDark ? '#fff' : '#0f172a'}>Apple</text>
                          {/* Whisker Line */}
                          <line x1={xMin} y1={y} x2={xMax} y2={y} stroke={isDark ? '#fda4af' : '#0f172a'} strokeWidth="1.5" />
                          {/* Whisker Ends */}
                          <line x1={xMin} y1={y - 8} x2={xMin} y2={y + 8} stroke={isDark ? '#fda4af' : '#0f172a'} strokeWidth="1.5" />
                          <line x1={xMax} y1={y - 8} x2={xMax} y2={y + 8} stroke={isDark ? '#fda4af' : '#0f172a'} strokeWidth="1.5" />
                          {/* Box */}
                          <rect x={xQ1} y={y - 12} width={xQ3 - xQ1} height="24" fill={isDark ? '#14532d' : '#dcfce7'} stroke={isDark ? '#22c55e' : '#16a34a'} strokeWidth="1.5" rx="2" />
                          {/* Median Line */}
                          <line x1={xMed} y1={y - 12} x2={xMed} y2={y + 12} stroke={isDark ? '#fff' : '#15803d'} strokeWidth="2.5" />
                          {/* Value Labels */}
                          <text x={xMin} y={y - 14} textAnchor="middle" fontSize="7.5" fontWeight="bold" fill={isDark ? '#fda4af' : '#64748b'}>10,2</text>
                          <text x={xQ1} y={y - 14} textAnchor="middle" fontSize="7.5" fontWeight="bold" fill={isDark ? '#fda4af' : '#64748b'}>11,8</text>
                          <text x={xMed} y={y - 14} textAnchor="middle" fontSize="8" fontWeight="black" fill={isDark ? '#fff' : '#15803d'}>13,15</text>
                          <text x={xQ3} y={y - 14} textAnchor="middle" fontSize="7.5" fontWeight="bold" fill={isDark ? '#fda4af' : '#64748b'}>15,95</text>
                          <text x={xMax} y={y - 14} textAnchor="middle" fontSize="7.5" fontWeight="bold" fill={isDark ? '#fda4af' : '#64748b'}>19,9</text>
                        </g>
                      );
                    })()}
                  </svg>
                </div>

                <div className="text-[10px] text-slate-500 dark:text-rose-300/60 text-right italic">
                  [Adapted from www.idc.com]
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
