'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileSpreadsheet, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Calculator, 
  Sparkles, 
  Table, 
  TrendingUp, 
  ChevronRight, 
  RotateCcw,
  Building2,
  DollarSign,
  Scale,
  ShieldAlert,
  Layers,
  Send,
  Award,
  Check,
  Eye,
  EyeOff
} from 'lucide-react';
import { useAppTheme } from '@/lib/theme';
import { Question } from '@/types/quiz';

interface AccountingSpecialAnswerBookProps {
  question: Question;
  currentIndex?: number;
  onAnswerCorrect?: (earnedMarks?: number) => void;
}

export const AccountingSpecialAnswerBook: React.FC<AccountingSpecialAnswerBookProps> = ({
  question,
  currentIndex = 0,
  onAnswerCorrect
}) => {
  const { isDark } = useAppTheme();
  const qId = question.id;

  // Track all user input cells
  const [userInputs, setUserInputs] = useState<Record<string, string>>({});
  const [rowStatus, setRowStatus] = useState<Record<string, boolean | null>>({});
  const [showMemo, setShowMemo] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [totalScore, setTotalScore] = useState<number | null>(null);

  // Load any previously stored answers for this question
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`acc_answer_book_q_${qId}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        setUserInputs(parsed.inputs || {});
        setRowStatus(parsed.status || {});
        setIsSubmitted(parsed.submitted || false);
        setTotalScore(parsed.score ?? null);
      }
    } catch {}
  }, [qId]);

  const handleInputChange = (field: string, val: string) => {
    setUserInputs(prev => {
      const next = { ...prev, [field]: val };
      try {
        localStorage.setItem(`acc_answer_book_q_${qId}`, JSON.stringify({
          inputs: next,
          status: rowStatus,
          submitted: isSubmitted,
          score: totalScore
        }));
      } catch {}
      return next;
    });
  };

  // Helper normalizer for currency, commas, signs and whitespace
  const normalize = (val: string | undefined): string => {
    if (!val) return '';
    return val
      .trim()
      .toUpperCase()
      .replace(/R/g, '')
      .replace(/\s+/g, '')
      .replace(/,/g, '.')
      .replace(/[()]/g, (match) => (match === '(' ? '-' : ''));
  };

  const evaluateAnswerBook = () => {
    const status: Record<string, boolean> = {};
    let earnedMarks = 0;
    const maxMarks = question.marks || 5;

    // Evaluate based on specific question layout
    if (qId === 101) {
      // 1.1 FIFO Valuation (5 marks)
      const val = normalize(userInputs['q11_ans']);
      const isCorrectVal = val === '675500' || val === '-675500';
      const workings = (userInputs['q11_work'] || '').toLowerCase();
      const hasWorkingUnits = workings.includes('206') || workings.includes('2850') || workings.includes('587100');
      const hasSecondLayer = workings.includes('34') || workings.includes('2600') || workings.includes('88400');

      status['q11_ans'] = isCorrectVal;
      status['q11_work'] = hasWorkingUnits || hasSecondLayer;

      if (isCorrectVal) earnedMarks = 5;
      else if (hasWorkingUnits && hasSecondLayer) earnedMarks = 4;
      else if (hasWorkingUnits || hasSecondLayer) earnedMarks = 2;
    } 
    else if (qId === 102) {
      // 1.2 Net Profit Adjustments (12 marks)
      const audit = normalize(userInputs['q12_audit']);
      const isAudit = audit === '123600' || audit === '+123600';
      status['q12_audit'] = isAudit;
      if (isAudit) earnedMarks += 2;

      const interest = normalize(userInputs['q12_interest']);
      const isInterest = interest === '-273000' || interest === '273000';
      status['q12_interest'] = isInterest;
      if (isInterest) earnedMarks += 2;

      const rent = normalize(userInputs['q12_rent']);
      const isRent = rent === '-9500' || rent === '9500';
      status['q12_rent'] = isRent;
      if (isRent) earnedMarks += 3;

      const tax = normalize(userInputs['q12_tax']);
      const isTax = tax === '-1285250' || tax === '1285250';
      status['q12_tax'] = isTax;
      if (isTax) earnedMarks += 2;

      const netProfit = normalize(userInputs['q12_netprofit']);
      const isNP = netProfit === '3474800';
      status['q12_netprofit'] = isNP;
      if (isNP) earnedMarks += 3;
    }
    else if (qId === 103) {
      // 1.3 Retained Income Note (5 marks)
      const np = normalize(userInputs['q13_np']);
      const isNP = np === '3474800';
      status['q13_np'] = isNP;
      if (isNP) earnedMarks += 1;

      const buyback = normalize(userInputs['q13_buyback']);
      const isBuyback = buyback === '-78000' || buyback === '78000';
      status['q13_buyback'] = isBuyback;
      if (isBuyback) earnedMarks += 2;

      const div = normalize(userInputs['q13_div']);
      const isDiv = div === '-1170000' || div === '1170000';
      status['q13_div'] = isDiv;
      if (isDiv) earnedMarks += 2;
    }
    else if (qId === 104) {
      // 1.4 Statement of Financial Position (33 marks)
      const inv = normalize(userInputs['q14_inv']);
      const isInv = inv === '4860000';
      status['q14_inv'] = isInv;
      if (isInv) earnedMarks += 4;

      const rec = normalize(userInputs['q14_rec']);
      const isRec = rec === '3811410';
      status['q14_rec'] = isRec;
      if (isRec) earnedMarks += 4;

      const cash = normalize(userInputs['q14_cash']);
      const isCash = cash === '28590';
      status['q14_cash'] = isCash;
      if (isCash) earnedMarks += 2;

      const totAssets = normalize(userInputs['q14_totassets']);
      const isTotAssets = totAssets === '16762000';
      status['q14_totassets'] = isTotAssets;
      if (isTotAssets) earnedMarks += 3;

      const eq = normalize(userInputs['q14_eq']);
      const isEq = eq === '9720000';
      status['q14_eq'] = isEq;
      if (isEq) earnedMarks += 3;

      const osc = normalize(userInputs['q14_osc']);
      const isOsc = osc === '6480000';
      status['q14_osc'] = isOsc;
      if (isOsc) earnedMarks += 3;

      const ncl = normalize(userInputs['q14_ncl']);
      const isNcl = ncl === '3842000';
      status['q14_ncl'] = isNcl;
      if (isNcl) earnedMarks += 4;

      const cl = normalize(userInputs['q14_cl']);
      const isCl = cl === '3200000';
      status['q14_cl'] = isCl;
      if (isCl) earnedMarks += 3;

      const pay = normalize(userInputs['q14_pay']);
      const isPay = pay === '1259500';
      status['q14_pay'] = isPay;
      if (isPay) earnedMarks += 4;

      const over = normalize(userInputs['q14_over']);
      const isOver = over === '499250';
      status['q14_over'] = isOver;
      if (isOver) earnedMarks += 3;
    }
    else if (qId === 201) {
      // 2.1 Share Capital Note (6 marks)
      const newSh = normalize(userInputs['q21_new_val']);
      const isNew = newSh === '1250000';
      status['q21_new_val'] = isNew;
      if (isNew) earnedMarks += 2;

      const repSh = normalize(userInputs['q21_rep_val']);
      const isRep = repSh === '-255000' || repSh === '255000';
      status['q21_rep_val'] = isRep;
      if (isRep) earnedMarks += 2;

      const endCount = normalize(userInputs['q21_end_cnt']);
      const isEnd = endCount === '870000';
      status['q21_end_cnt'] = isEnd;
      if (isEnd) earnedMarks += 2;
    }
    else if (qId === 202) {
      // 2.2 Financial Indicators (11 marks)
      const oexp = normalize(userInputs['q22_oexp']);
      const isOexp = oexp === '20' || oexp === '20.0' || oexp === '20%';
      status['q22_oexp'] = isOexp;
      if (isOexp) earnedMarks += 2;

      const dps = normalize(userInputs['q22_dps']);
      const isDps = dps === '40' || dps === '40C' || dps === '0.40' || dps === '0.4';
      status['q22_dps'] = isDps;
      if (isDps) earnedMarks += 4;

      const roshe = normalize(userInputs['q22_roshe']);
      const isRoshe = roshe === '13.6' || roshe === '13.6%' || roshe === '14';
      status['q22_roshe'] = isRoshe;
      if (isRoshe) earnedMarks += 5;
    }
    else if (qId === 203) {
      // 2.3 Cash Flow Statement (18 marks)
      const tax = normalize(userInputs['q23_tax']);
      const isTax = tax === '-429500' || tax === '429500';
      status['q23_tax'] = isTax;
      if (isTax) earnedMarks += 3;

      const div = normalize(userInputs['q23_div']);
      const isDiv = div === '-277300' || div === '277300';
      status['q23_div'] = isDiv;
      if (isDiv) earnedMarks += 3;

      const fin = normalize(userInputs['q23_fin']);
      const isFin = fin === '409000';
      status['q23_fin'] = isFin;
      if (isFin) earnedMarks += 3;

      const rep = normalize(userInputs['q23_rep']);
      const isRep = rep === '-291000' || rep === '291000';
      status['q23_rep'] = isRep;
      if (isRep) earnedMarks += 3;

      const change = normalize(userInputs['q23_change']);
      const isChange = change === '269000';
      status['q23_change'] = isChange;
      if (isChange) earnedMarks += 3;

      const end = normalize(userInputs['q23_end']);
      const isEnd = end === '193800';
      status['q23_end'] = isEnd;
      if (isEnd) earnedMarks += 3;
    }
    else if (qId === 301) {
      // 3.1 Matching (4 marks)
      const m1 = normalize(userInputs['q31_1']);
      const m2 = normalize(userInputs['q31_2']);
      const m3 = normalize(userInputs['q31_3']);
      const m4 = normalize(userInputs['q31_4']);

      status['q31_1'] = m1 === 'D';
      status['q31_2'] = m2 === 'A';
      status['q31_3'] = m3 === 'B';
      status['q31_4'] = m4 === 'C';

      if (m1 === 'D') earnedMarks += 1;
      if (m2 === 'A') earnedMarks += 1;
      if (m3 === 'B') earnedMarks += 1;
      if (m4 === 'C') earnedMarks += 1;
    }
    else {
      // Written & Governance Questions (Analysis / Points)
      const p1 = (userInputs['point_1'] || '').trim();
      const p2 = (userInputs['point_2'] || '').trim();
      const hasLength1 = p1.length > 10;
      const hasLength2 = p2.length > 10;

      status['point_1'] = hasLength1;
      status['point_2'] = hasLength2;

      if (hasLength1 && hasLength2) earnedMarks = maxMarks;
      else if (hasLength1 || hasLength2) earnedMarks = Math.round(maxMarks / 2);
    }

    setRowStatus(status);
    setTotalScore(earnedMarks);
    setIsSubmitted(true);

    try {
      localStorage.setItem(`acc_answer_book_q_${qId}`, JSON.stringify({
        inputs: userInputs,
        status,
        submitted: true,
        score: earnedMarks
      }));
    } catch {}

    if (earnedMarks >= Math.round(maxMarks * 0.6) && onAnswerCorrect) {
      onAnswerCorrect(earnedMarks);
    }
  };

  const handleReset = () => {
    setUserInputs({});
    setRowStatus({});
    setIsSubmitted(false);
    setTotalScore(null);
    try {
      localStorage.removeItem(`acc_answer_book_q_${qId}`);
    } catch {}
  };

  return (
    <div className={`my-5 rounded-3xl border transition-all overflow-hidden shadow-xl ${
      isDark 
        ? 'bg-[#120508] border-red-900/60 shadow-black/60' 
        : 'bg-white border-red-200/90 shadow-red-900/10'
    }`}>
      {/* Top Light Red Ledger Stripe */}
      <div className="h-1 bg-gradient-to-r from-red-500 via-rose-400 to-red-500" />

      {/* Top Special Answer Book Header */}
      <div className={`px-5 py-3.5 border-b flex items-center justify-between gap-3 flex-wrap ${
        isDark 
          ? 'bg-gradient-to-r from-[#240b12] via-[#1a070e] to-[#120407] border-red-950/80' 
          : 'bg-gradient-to-r from-red-50/95 via-rose-50/60 to-white border-red-100'
      }`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-red-600 via-rose-600 to-rose-500 text-white flex items-center justify-center shadow-md shadow-red-600/30">
            <FileSpreadsheet className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-red-600 text-white shadow-xs">
                SPECIAL ANSWER BOOK
              </span>
              <span className="text-[11px] font-bold text-red-600 dark:text-red-400">
                Grade 12 Accounting P1 · {question.marks || 5} Marks
              </span>
            </div>
            <h4 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white mt-0.5">
              {qId === 101 && '1.1 Closing stock of formal suits omitted on 30 June 2021'}
              {qId === 102 && '1.2 Net profit after tax schedule for year ended 30 June 2021'}
              {qId === 103 && '1.3 Retained Income Note on 30 June 2021'}
              {qId === 104 && '1.4 JIMO LTD · Statement of Financial Position on 30 June 2021'}
              {qId === 201 && '2.1 Ordinary Share Capital Note on 28 February 2021'}
              {qId === 202 && '2.2 Financial Indicator Calculations on 28 February 2021'}
              {qId === 203 && '2.3 Cash Flow Statement for the year ended 28 February 2021'}
              {qId === 301 && '3.1 Financial Indicator Classification (Column A & B)'}
              {qId === 302 && '3.2.1 Profitability: Flexi Ltd vs Broom Ltd Analysis'}
              {qId === 303 && '3.2.2 Dividends, Earnings and % ROSHE Comparison'}
              {qId === 304 && '3.2.3 Shareholding of Bob Yates in both companies'}
              {qId === 305 && '3.2.4 Financing Strategies, Gearing and Financial Risk'}
              {qId >= 401 && `4.${qId - 400} Corporate Governance & Auditing Examination`}
            </h4>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {totalScore !== null && (
            <div className={`px-3 py-1 rounded-xl text-xs font-black border flex items-center gap-1.5 ${
              totalScore >= Math.round((question.marks || 5) * 0.6)
                ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
                : 'bg-rose-500/15 border-rose-500/30 text-rose-600 dark:text-rose-400'
            }`}>
              <Award className="w-3.5 h-3.5" />
              <span>Score: {totalScore} / {question.marks || 5}</span>
            </div>
          )}

          <button
            type="button"
            onClick={() => setShowMemo(!showMemo)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border flex items-center gap-1.5 transition-all cursor-pointer ${
              showMemo 
                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-xs' 
                : isDark 
                ? 'bg-[#220c13] hover:bg-[#2e1019] text-rose-300 border-rose-900/60' 
                : 'bg-white hover:bg-rose-50 text-slate-700 border-rose-200'
            }`}
          >
            {showMemo ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span>{showMemo ? 'Hide Memo' : 'Marking Memo'}</span>
          </button>
        </div>
      </div>

      {/* Main Specialized Table Content */}
      <div className="p-4 sm:p-6 overflow-x-auto space-y-5">
        {/* =================================================================== */}
        {/* 1.1 FIFO CLOSING STOCK TABLE */}
        {/* =================================================================== */}
        {qId === 101 && (
          <div className="space-y-4">
            <p className="text-xs text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
              Use the information in <strong>Information B</strong> (Purchases & Returns) to compute the omitted 240 formal suits using FIFO:
            </p>

            <table className="w-full text-xs sm:text-sm border-collapse border border-rose-300 dark:border-rose-900 rounded-2xl overflow-hidden shadow-xs">
              <thead>
                <tr className={isDark ? 'bg-red-950/70 text-rose-200' : 'bg-rose-100/80 text-slate-800'}>
                  <th className="border border-rose-300 dark:border-rose-900 p-3 text-left font-black w-3/5">
                    WORKINGS (Show Layer 1 and Layer 2 calculations)
                  </th>
                  <th className="border border-rose-300 dark:border-rose-900 p-3 text-right font-black w-2/5">
                    ANSWER (Rand Value)
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className={isDark ? 'bg-[#18070b]' : 'bg-white'}>
                  <td className="border border-rose-300 dark:border-rose-900 p-3 align-top">
                    <textarea
                      rows={3}
                      placeholder="e.g. Layer 1 (18 May): (230 - 24) = 206 × R2 850 = 587 100&#10;Layer 2 (10 Feb): 34 × R2 600 = 88 400"
                      value={userInputs['q11_work'] || ''}
                      onChange={(e) => handleInputChange('q11_work', e.target.value)}
                      className={`w-full p-2.5 rounded-xl border font-mono text-xs focus:ring-2 focus:ring-red-500 outline-hidden transition-all ${
                        isDark ? 'bg-[#100305] border-rose-900 text-rose-100' : 'bg-rose-50/30 border-rose-200 text-slate-900'
                      }`}
                    />
                    <div className="flex items-center gap-1.5 mt-1 text-[11px] text-slate-400">
                      <span>Hint: 206 units @ R2 850 + 34 units @ R2 600</span>
                    </div>
                  </td>
                  <td className="border border-rose-300 dark:border-rose-900 p-3 text-right font-mono font-bold align-top">
                    <div className="flex flex-col items-end gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-slate-400 font-bold text-sm">R</span>
                        <input
                          type="text"
                          placeholder="675 500"
                          value={userInputs['q11_ans'] || ''}
                          onChange={(e) => handleInputChange('q11_ans', e.target.value)}
                          className={`w-36 px-3 py-2 rounded-xl border text-right font-mono font-bold text-sm outline-hidden focus:ring-2 focus:ring-red-500 transition-all ${
                            rowStatus['q11_ans'] === true
                              ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                              : rowStatus['q11_ans'] === false
                              ? 'border-rose-500 bg-rose-500/10 text-rose-400'
                              : isDark ? 'bg-[#100305] border-rose-900 text-white' : 'bg-rose-50/40 border-rose-200 text-slate-900'
                          }`}
                        />
                      </div>
                      {rowStatus['q11_ans'] === true && (
                        <span className="text-[11px] font-bold text-emerald-500 flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" /> 5 Marks Awarded (R675 500)
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* =================================================================== */}
        {/* 1.2 NET PROFIT ADJUSTMENTS SCHEDULE */}
        {/* =================================================================== */}
        {qId === 102 && (
          <div className="space-y-4">
            <p className="text-xs text-slate-600 dark:text-slate-400 font-sans">
              Enter the adjustment amounts for items (i) to (iv) with <strong>+</strong> for increases and <strong>–</strong> for decreases:
            </p>

            <table className="w-full text-xs sm:text-sm border-collapse border border-rose-300 dark:border-rose-900 rounded-2xl overflow-hidden font-mono shadow-xs">
              <thead>
                <tr className={isDark ? 'bg-red-950/70 text-rose-200' : 'bg-rose-100/80 text-slate-800'}>
                  <th className="border border-rose-300 dark:border-rose-900 p-2.5 text-center font-black w-14">NO.</th>
                  <th className="border border-rose-300 dark:border-rose-900 p-2.5 text-left font-black">ADJUSTMENTS & WORKINGS</th>
                  <th className="border border-rose-300 dark:border-rose-900 p-2.5 text-right font-black w-48">AMOUNT (R)</th>
                </tr>
              </thead>
              <tbody>
                <tr className={isDark ? 'bg-[#18070b]' : 'bg-white'}>
                  <td className="border border-rose-300 dark:border-rose-900 p-2.5 text-center text-slate-400">—</td>
                  <td className="border border-rose-300 dark:border-rose-900 p-2.5 font-bold">Incorrect net profit before tax</td>
                  <td className="border border-rose-300 dark:border-rose-900 p-2.5 text-right font-black">4 918 950</td>
                </tr>

                <tr className={isDark ? 'bg-[#140508]' : 'bg-rose-50/20'}>
                  <td className="border border-rose-300 dark:border-rose-900 p-2.5 text-center font-bold">(i)</td>
                  <td className="border border-rose-300 dark:border-rose-900 p-2.5">
                    <strong>Audit fees</strong> (R123 600 paid in advance for next financial year)
                  </td>
                  <td className="border border-rose-300 dark:border-rose-900 p-2.5 text-right">
                    <input
                      type="text"
                      placeholder="+ 123 600"
                      value={userInputs['q12_audit'] || ''}
                      onChange={(e) => handleInputChange('q12_audit', e.target.value)}
                      className={`w-36 px-2.5 py-1 rounded-lg border text-right font-mono font-bold text-xs ${
                        rowStatus['q12_audit'] === true
                          ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                          : rowStatus['q12_audit'] === false
                          ? 'border-rose-500 bg-rose-500/10 text-rose-400'
                          : isDark ? 'bg-[#100305] border-rose-900 text-white' : 'bg-white border-rose-200 text-slate-900'
                      }`}
                    />
                  </td>
                </tr>

                <tr className={isDark ? 'bg-[#18070b]' : 'bg-white'}>
                  <td className="border border-rose-300 dark:border-rose-900 p-2.5 text-center font-bold">(ii)</td>
                  <td className="border border-rose-300 dark:border-rose-900 p-2.5">
                    <strong>Interest on loan</strong> (Statement balance R4 028 000 – Trial balance R3 755 000)
                  </td>
                  <td className="border border-rose-300 dark:border-rose-900 p-2.5 text-right">
                    <input
                      type="text"
                      placeholder="- 273 000"
                      value={userInputs['q12_interest'] || ''}
                      onChange={(e) => handleInputChange('q12_interest', e.target.value)}
                      className={`w-36 px-2.5 py-1 rounded-lg border text-right font-mono font-bold text-xs ${
                        rowStatus['q12_interest'] === true
                          ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                          : rowStatus['q12_interest'] === false
                          ? 'border-rose-500 bg-rose-500/10 text-rose-400'
                          : isDark ? 'bg-[#100305] border-rose-900 text-white' : 'bg-white border-rose-200 text-slate-900'
                      }`}
                    />
                  </td>
                </tr>

                <tr className={isDark ? 'bg-[#140508]' : 'bg-rose-50/20'}>
                  <td className="border border-rose-300 dark:border-rose-900 p-2.5 text-center font-bold">(iii)</td>
                  <td className="border border-rose-300 dark:border-rose-900 p-2.5">
                    <strong>Rent income</strong> (Prepaid for July & August 2021: 2 × [5 500 – 750])
                  </td>
                  <td className="border border-rose-300 dark:border-rose-900 p-2.5 text-right">
                    <input
                      type="text"
                      placeholder="- 9 500"
                      value={userInputs['q12_rent'] || ''}
                      onChange={(e) => handleInputChange('q12_rent', e.target.value)}
                      className={`w-36 px-2.5 py-1 rounded-lg border text-right font-mono font-bold text-xs ${
                        rowStatus['q12_rent'] === true
                          ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                          : rowStatus['q12_rent'] === false
                          ? 'border-rose-500 bg-rose-500/10 text-rose-400'
                          : isDark ? 'bg-[#100305] border-rose-900 text-white' : 'bg-white border-rose-200 text-slate-900'
                      }`}
                    />
                  </td>
                </tr>

                <tr className={isDark ? 'bg-[#18070b]' : 'bg-white'}>
                  <td className="border border-rose-300 dark:border-rose-900 p-2.5 text-center font-bold">(iv)</td>
                  <td className="border border-rose-300 dark:border-rose-900 p-2.5">
                    <strong>Income tax</strong> (Provisional tax R1 200 000 + R85 250 still owed)
                  </td>
                  <td className="border border-rose-300 dark:border-rose-900 p-2.5 text-right">
                    <input
                      type="text"
                      placeholder="- 1 285 250"
                      value={userInputs['q12_tax'] || ''}
                      onChange={(e) => handleInputChange('q12_tax', e.target.value)}
                      className={`w-36 px-2.5 py-1 rounded-lg border text-right font-mono font-bold text-xs ${
                        rowStatus['q12_tax'] === true
                          ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                          : rowStatus['q12_tax'] === false
                          ? 'border-rose-500 bg-rose-500/10 text-rose-400'
                          : isDark ? 'bg-[#100305] border-rose-900 text-white' : 'bg-white border-rose-200 text-slate-900'
                      }`}
                    />
                  </td>
                </tr>

                <tr className={isDark ? 'bg-emerald-950/70 text-emerald-300' : 'bg-emerald-50 text-emerald-900 font-bold'}>
                  <td className="border border-rose-300 dark:border-rose-900 p-3 text-center font-black">✓</td>
                  <td className="border border-rose-300 dark:border-rose-900 p-3 font-black uppercase">
                    Net profit after tax (12 Marks)
                  </td>
                  <td className="border border-rose-300 dark:border-rose-900 p-3 text-right">
                    <input
                      type="text"
                      placeholder="3 474 800"
                      value={userInputs['q12_netprofit'] || ''}
                      onChange={(e) => handleInputChange('q12_netprofit', e.target.value)}
                      className={`w-36 px-2.5 py-1.5 rounded-lg border text-right font-mono font-black text-xs ${
                        rowStatus['q12_netprofit'] === true
                          ? 'border-emerald-500 bg-emerald-500/20 text-emerald-400'
                          : rowStatus['q12_netprofit'] === false
                          ? 'border-rose-500 bg-rose-500/20 text-rose-400'
                          : isDark ? 'bg-[#100305] border-rose-900 text-white' : 'bg-white border-rose-300 text-slate-900'
                      }`}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* =================================================================== */}
        {/* 1.3 RETAINED INCOME NOTE */}
        {/* =================================================================== */}
        {qId === 103 && (
          <div className="space-y-4 font-mono text-xs sm:text-sm">
            <p className="text-xs text-slate-600 dark:text-slate-400 font-sans">
              Complete the Retained Income Note on 30 June 2021 using brackets for deductions:
            </p>

            <table className="w-full border-collapse border border-rose-300 dark:border-rose-900 rounded-2xl overflow-hidden shadow-xs">
              <thead>
                <tr className={isDark ? 'bg-red-950/70 text-rose-200' : 'bg-rose-100/80 text-slate-800'}>
                  <th className="border border-rose-300 dark:border-rose-900 p-3 text-left font-black">DETAILS</th>
                  <th className="border border-rose-300 dark:border-rose-900 p-3 text-right font-black w-48">AMOUNT (R)</th>
                </tr>
              </thead>
              <tbody>
                <tr className={isDark ? 'bg-[#18070b]' : 'bg-white'}>
                  <td className="border border-rose-300 dark:border-rose-900 p-2.5 font-bold">Balance at beginning</td>
                  <td className="border border-rose-300 dark:border-rose-900 p-2.5 text-right font-bold text-slate-400">1 005 200</td>
                </tr>
                <tr className={isDark ? 'bg-[#140508]' : 'bg-rose-50/20'}>
                  <td className="border border-rose-300 dark:border-rose-900 p-2.5">Net profit after tax (from 1.2)</td>
                  <td className="border border-rose-300 dark:border-rose-900 p-2.5 text-right">
                    <input
                      type="text"
                      placeholder="3 474 800"
                      value={userInputs['q13_np'] || ''}
                      onChange={(e) => handleInputChange('q13_np', e.target.value)}
                      className="w-36 px-2 py-1 rounded-lg border text-right text-xs"
                    />
                  </td>
                </tr>
                <tr className={isDark ? 'bg-[#18070b]' : 'bg-white'}>
                  <td className="border border-rose-300 dark:border-rose-900 p-2.5">
                    Shares repurchased (26 000 shares × R3,00 premium above ASP)
                  </td>
                  <td className="border border-rose-300 dark:border-rose-900 p-2.5 text-right">
                    <input
                      type="text"
                      placeholder="(78 000)"
                      value={userInputs['q13_buyback'] || ''}
                      onChange={(e) => handleInputChange('q13_buyback', e.target.value)}
                      className="w-36 px-2 py-1 rounded-lg border text-right text-xs"
                    />
                  </td>
                </tr>
                <tr className={isDark ? 'bg-[#140508]' : 'bg-rose-50/20'}>
                  <td className="border border-rose-300 dark:border-rose-900 p-2.5">
                    Dividends for the year (1 800 000 shares × 65 cents)
                  </td>
                  <td className="border border-rose-300 dark:border-rose-900 p-2.5 text-right">
                    <input
                      type="text"
                      placeholder="(1 170 000)"
                      value={userInputs['q13_div'] || ''}
                      onChange={(e) => handleInputChange('q13_div', e.target.value)}
                      className="w-36 px-2 py-1 rounded-lg border text-right text-xs"
                    />
                  </td>
                </tr>
                <tr className={isDark ? 'bg-red-950/80 text-rose-200' : 'bg-rose-100 font-black'}>
                  <td className="border border-rose-300 dark:border-rose-900 p-3 font-black uppercase">Balance at end</td>
                  <td className="border border-rose-300 dark:border-rose-900 p-3 text-right font-black border-t-2 border-b-4 border-slate-700 dark:border-rose-400">
                    3 240 000
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* =================================================================== */}
        {/* 1.4 STATEMENT OF FINANCIAL POSITION (JIMO LTD) */}
        {/* =================================================================== */}
        {qId === 104 && (
          <div className="space-y-4 font-mono text-xs">
            <p className="text-xs text-slate-600 dark:text-slate-400 font-sans">
              Fill in the line items for JIMO LTD. Shaded boxes are pre-completed or not required.
            </p>

            <table className="w-full border-collapse border border-rose-300 dark:border-rose-900 rounded-2xl overflow-hidden shadow-xs">
              <tbody>
                <tr className="bg-red-950 text-white font-black">
                  <td className="border border-rose-800 p-2" colSpan={2}>ASSETS</td>
                </tr>
                <tr className={isDark ? 'bg-[#18070b]' : 'bg-white'}>
                  <td className="border border-rose-300 dark:border-rose-900 p-2 font-bold">NON-CURRENT ASSETS</td>
                  <td className="border border-rose-300 dark:border-rose-900 p-2 text-right bg-slate-200 dark:bg-slate-800/60 text-slate-400 font-bold">8 062 000</td>
                </tr>
                <tr className={isDark ? 'bg-[#140508]' : 'bg-rose-50/20'}>
                  <td className="border border-rose-300 dark:border-rose-900 p-2 pl-6">Fixed assets</td>
                  <td className="border border-rose-300 dark:border-rose-900 p-2 text-right bg-slate-200 dark:bg-slate-800/60 text-slate-400">—</td>
                </tr>
                <tr className={isDark ? 'bg-[#18070b]' : 'bg-white'}>
                  <td className="border border-rose-300 dark:border-rose-900 p-2 pl-6">Financial assets</td>
                  <td className="border border-rose-300 dark:border-rose-900 p-2 text-right bg-slate-200 dark:bg-slate-800/60 text-slate-400">—</td>
                </tr>
                <tr className={isDark ? 'bg-[#200b11] font-bold' : 'bg-rose-100/50 font-bold'}>
                  <td className="border border-rose-300 dark:border-rose-900 p-2">CURRENT ASSETS</td>
                  <td className="border border-rose-300 dark:border-rose-900 p-2 text-right font-black">8 700 000</td>
                </tr>
                <tr className={isDark ? 'bg-[#140508]' : 'bg-rose-50/20'}>
                  <td className="border border-rose-300 dark:border-rose-900 p-2 pl-6">Inventories (4 198 500 + 675 500 – 14 000)</td>
                  <td className="border border-rose-300 dark:border-rose-900 p-2 text-right">
                    <input
                      type="text"
                      placeholder="4 860 000"
                      value={userInputs['q14_inv'] || ''}
                      onChange={(e) => handleInputChange('q14_inv', e.target.value)}
                      className="w-32 px-2 py-0.5 rounded text-right text-xs"
                    />
                  </td>
                </tr>
                <tr className={isDark ? 'bg-[#18070b]' : 'bg-white'}>
                  <td className="border border-rose-300 dark:border-rose-900 p-2 pl-6">Trade and other receivables (3 668 810 + 8 000 + 123 600 + 11 000)</td>
                  <td className="border border-rose-300 dark:border-rose-900 p-2 text-right">
                    <input
                      type="text"
                      placeholder="3 811 410"
                      value={userInputs['q14_rec'] || ''}
                      onChange={(e) => handleInputChange('q14_rec', e.target.value)}
                      className="w-32 px-2 py-0.5 rounded text-right text-xs"
                    />
                  </td>
                </tr>
                <tr className={isDark ? 'bg-[#140508]' : 'bg-rose-50/20'}>
                  <td className="border border-rose-300 dark:border-rose-900 p-2 pl-6">Cash and cash equivalents (balancing figure)</td>
                  <td className="border border-rose-300 dark:border-rose-900 p-2 text-right">
                    <input
                      type="text"
                      placeholder="28 590"
                      value={userInputs['q14_cash'] || ''}
                      onChange={(e) => handleInputChange('q14_cash', e.target.value)}
                      className="w-32 px-2 py-0.5 rounded text-right text-xs"
                    />
                  </td>
                </tr>
                <tr className="bg-emerald-950/80 text-emerald-300 font-black border-t-2 border-b-2 border-emerald-500">
                  <td className="border border-rose-900 p-2 uppercase">TOTAL ASSETS</td>
                  <td className="border border-rose-900 p-2 text-right">
                    <input
                      type="text"
                      placeholder="16 762 000"
                      value={userInputs['q14_totassets'] || ''}
                      onChange={(e) => handleInputChange('q14_totassets', e.target.value)}
                      className="w-32 px-2 py-0.5 rounded text-right text-xs font-black bg-emerald-900/50 text-white"
                    />
                  </td>
                </tr>

                <tr className="bg-red-950 text-white font-black">
                  <td className="border border-rose-800 p-2" colSpan={2}>EQUITY AND LIABILITIES</td>
                </tr>
                <tr className={isDark ? 'bg-[#200b11] font-bold' : 'bg-rose-100/50 font-bold'}>
                  <td className="border border-rose-300 dark:border-rose-900 p-2">SHAREHOLDERS&apos; EQUITY (1 800 000 × R5,40 NAV)</td>
                  <td className="border border-rose-300 dark:border-rose-900 p-2 text-right">
                    <input
                      type="text"
                      placeholder="9 720 000"
                      value={userInputs['q14_eq'] || ''}
                      onChange={(e) => handleInputChange('q14_eq', e.target.value)}
                      className="w-32 px-2 py-0.5 rounded text-right text-xs font-bold"
                    />
                  </td>
                </tr>
                <tr className={isDark ? 'bg-[#140508]' : 'bg-rose-50/20'}>
                  <td className="border border-rose-300 dark:border-rose-900 p-2 pl-6">Ordinary share capital (balancing figure)</td>
                  <td className="border border-rose-300 dark:border-rose-900 p-2 text-right">
                    <input
                      type="text"
                      placeholder="6 480 000"
                      value={userInputs['q14_osc'] || ''}
                      onChange={(e) => handleInputChange('q14_osc', e.target.value)}
                      className="w-32 px-2 py-0.5 rounded text-right text-xs font-bold"
                    />
                  </td>
                </tr>
                <tr className={isDark ? 'bg-[#18070b]' : 'bg-white'}>
                  <td className="border border-rose-300 dark:border-rose-900 p-2 pl-6">Retained income</td>
                  <td className="border border-rose-300 dark:border-rose-900 p-2 text-right font-bold">3 240 000</td>
                </tr>
                <tr className={isDark ? 'bg-[#200b11] font-bold' : 'bg-rose-100/50 font-bold'}>
                  <td className="border border-rose-300 dark:border-rose-900 p-2">NON-CURRENT LIABILITIES (Mortgage loan)</td>
                  <td className="border border-rose-300 dark:border-rose-900 p-2 text-right">
                    <input
                      type="text"
                      placeholder="3 842 000"
                      value={userInputs['q14_ncl'] || ''}
                      onChange={(e) => handleInputChange('q14_ncl', e.target.value)}
                      className="w-32 px-2 py-0.5 rounded text-right text-xs font-bold"
                    />
                  </td>
                </tr>
                <tr className={isDark ? 'bg-[#200b11] font-bold' : 'bg-rose-100/50 font-bold'}>
                  <td className="border border-rose-300 dark:border-rose-900 p-2">CURRENT LIABILITIES [(8 700 000 – 4 860 000) / 1,2]</td>
                  <td className="border border-rose-300 dark:border-rose-900 p-2 text-right">
                    <input
                      type="text"
                      placeholder="3 200 000"
                      value={userInputs['q14_cl'] || ''}
                      onChange={(e) => handleInputChange('q14_cl', e.target.value)}
                      className="w-32 px-2 py-0.5 rounded text-right text-xs font-bold"
                    />
                  </td>
                </tr>
                <tr className={isDark ? 'bg-[#140508]' : 'bg-rose-50/20'}>
                  <td className="border border-rose-300 dark:border-rose-900 p-2 pl-6">Trade and other payables (1 253 000 + 9 500 + 11 000 – 14 000)</td>
                  <td className="border border-rose-300 dark:border-rose-900 p-2 text-right">
                    <input
                      type="text"
                      placeholder="1 259 500"
                      value={userInputs['q14_pay'] || ''}
                      onChange={(e) => handleInputChange('q14_pay', e.target.value)}
                      className="w-32 px-2 py-0.5 rounded text-right text-xs"
                    />
                  </td>
                </tr>
                <tr className={isDark ? 'bg-[#18070b]' : 'bg-white'}>
                  <td className="border border-rose-300 dark:border-rose-900 p-2 pl-6">Shareholders for dividends</td>
                  <td className="border border-rose-300 dark:border-rose-900 p-2 text-right">1 170 000</td>
                </tr>
                <tr className={isDark ? 'bg-[#140508]' : 'bg-rose-50/20'}>
                  <td className="border border-rose-300 dark:border-rose-900 p-2 pl-6">Current portion of loan</td>
                  <td className="border border-rose-300 dark:border-rose-900 p-2 text-right">186 000</td>
                </tr>
                <tr className={isDark ? 'bg-[#18070b]' : 'bg-white'}>
                  <td className="border border-rose-300 dark:border-rose-900 p-2 pl-6">SARS: Income tax</td>
                  <td className="border border-rose-300 dark:border-rose-900 p-2 text-right">85 250</td>
                </tr>
                <tr className={isDark ? 'bg-[#140508]' : 'bg-rose-50/20'}>
                  <td className="border border-rose-300 dark:border-rose-900 p-2 pl-6 text-rose-500 font-bold">Bank overdraft (balancing figure)</td>
                  <td className="border border-rose-300 dark:border-rose-900 p-2 text-right">
                    <input
                      type="text"
                      placeholder="499 250"
                      value={userInputs['q14_over'] || ''}
                      onChange={(e) => handleInputChange('q14_over', e.target.value)}
                      className="w-32 px-2 py-0.5 rounded text-right text-xs font-bold text-rose-500"
                    />
                  </td>
                </tr>
                <tr className="bg-emerald-950/80 text-emerald-300 font-black border-t-2 border-b-2 border-emerald-500">
                  <td className="border border-rose-900 p-2 uppercase">TOTAL EQUITY AND LIABILITIES (33 Marks)</td>
                  <td className="border border-rose-900 p-2 text-right text-sm">16 762 000</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* =================================================================== */}
        {/* 2.1 SHARE CAPITAL NOTE */}
        {/* =================================================================== */}
        {qId === 201 && (
          <div className="space-y-4 font-mono text-xs sm:text-sm">
            <table className="w-full border-collapse border border-rose-300 dark:border-rose-900 rounded-2xl overflow-hidden shadow-xs">
              <thead>
                <tr className={isDark ? 'bg-red-950/70 text-rose-200' : 'bg-rose-100/80 text-slate-800'}>
                  <th className="border border-rose-300 dark:border-rose-900 p-2.5 text-center font-black w-28">SHARES</th>
                  <th className="border border-rose-300 dark:border-rose-900 p-2.5 text-left font-black">DETAILS</th>
                  <th className="border border-rose-300 dark:border-rose-900 p-2.5 text-right font-black w-44">AMOUNT (R)</th>
                </tr>
              </thead>
              <tbody>
                <tr className={isDark ? 'bg-[#18070b]' : 'bg-white'}>
                  <td className="border border-rose-300 dark:border-rose-900 p-2.5 text-center font-bold">800 000</td>
                  <td className="border border-rose-300 dark:border-rose-900 p-2.5">Ordinary shares at the beginning</td>
                  <td className="border border-rose-300 dark:border-rose-900 p-2.5 text-right font-bold">6 400 000</td>
                </tr>
                <tr className={isDark ? 'bg-[#140508]' : 'bg-rose-50/20'}>
                  <td className="border border-rose-300 dark:border-rose-900 p-2.5 text-center font-bold text-emerald-500">100 000</td>
                  <td className="border border-rose-300 dark:border-rose-900 p-2.5">New shares issued (balancing figure)</td>
                  <td className="border border-rose-300 dark:border-rose-900 p-2.5 text-right">
                    <input
                      type="text"
                      placeholder="1 250 000"
                      value={userInputs['q21_new_val'] || ''}
                      onChange={(e) => handleInputChange('q21_new_val', e.target.value)}
                      className="w-36 px-2 py-1 rounded text-right text-xs"
                    />
                  </td>
                </tr>
                <tr className={isDark ? 'bg-[#18070b]' : 'bg-white'}>
                  <td className="border border-rose-300 dark:border-rose-900 p-2.5 text-center text-rose-500 font-bold">(30 000)</td>
                  <td className="border border-rose-300 dark:border-rose-900 p-2.5">Repurchased 30 000 shares at R8,50 ASP</td>
                  <td className="border border-rose-300 dark:border-rose-900 p-2.5 text-right">
                    <input
                      type="text"
                      placeholder="(255 000)"
                      value={userInputs['q21_rep_val'] || ''}
                      onChange={(e) => handleInputChange('q21_rep_val', e.target.value)}
                      className="w-36 px-2 py-1 rounded text-right text-xs"
                    />
                  </td>
                </tr>
                <tr className={isDark ? 'bg-red-950/80 text-rose-200' : 'bg-rose-100 font-black'}>
                  <td className="border border-rose-300 dark:border-rose-900 p-3 text-center">
                    <input
                      type="text"
                      placeholder="870 000"
                      value={userInputs['q21_end_cnt'] || ''}
                      onChange={(e) => handleInputChange('q21_end_cnt', e.target.value)}
                      className="w-24 px-1.5 py-1 rounded text-center text-xs font-black"
                    />
                  </td>
                  <td className="border border-rose-300 dark:border-rose-900 p-3 font-black uppercase">Shares at end of the year</td>
                  <td className="border border-rose-300 dark:border-rose-900 p-3 text-right font-black">7 395 000</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* =================================================================== */}
        {/* 2.2 FINANCIAL INDICATOR CALCULATIONS */}
        {/* =================================================================== */}
        {qId === 202 && (
          <div className="space-y-4 font-mono text-xs sm:text-sm">
            <div className="space-y-3">
              <div className="p-3.5 rounded-xl border border-rose-300 dark:border-rose-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex-1">
                  <span className="font-bold text-red-500 block">% Operating expenses on sales (2 Marks)</span>
                  <span className="text-[11px] text-slate-400">Formula: (Operating expenses / Sales) × 100</span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="20.0"
                    value={userInputs['q22_oexp'] || ''}
                    onChange={(e) => handleInputChange('q22_oexp', e.target.value)}
                    className="w-28 px-2 py-1.5 rounded-lg border text-right font-bold"
                  />
                  <span className="font-bold">%</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl border border-rose-300 dark:border-rose-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex-1">
                  <span className="font-bold text-red-500 block">Dividend per share (4 Marks)</span>
                  <span className="text-[11px] text-slate-400">Interim DPS (162 000 / 900 000) + Final DPS (22c)</span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="40"
                    value={userInputs['q22_dps'] || ''}
                    onChange={(e) => handleInputChange('q22_dps', e.target.value)}
                    className="w-28 px-2 py-1.5 rounded-lg border text-right font-bold"
                  />
                  <span className="font-bold">cents</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl border border-rose-300 dark:border-rose-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex-1">
                  <span className="font-bold text-red-500 block">% Return on average shareholders&apos; equity (5 Marks)</span>
                  <span className="text-[11px] text-slate-400">Formula: [Net profit after tax / ½(Opening + Closing Equity)] × 100</span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="13.6"
                    value={userInputs['q22_roshe'] || ''}
                    onChange={(e) => handleInputChange('q22_roshe', e.target.value)}
                    className="w-28 px-2 py-1.5 rounded-lg border text-right font-bold"
                  />
                  <span className="font-bold">%</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* 2.3 CASH FLOW STATEMENT */}
        {/* =================================================================== */}
        {qId === 203 && (
          <div className="space-y-4 font-mono text-xs sm:text-sm">
            <table className="w-full border-collapse border border-rose-300 dark:border-rose-900 rounded-2xl overflow-hidden shadow-xs">
              <tbody>
                <tr className={isDark ? 'bg-[#200b11] font-bold' : 'bg-rose-100/50 font-bold'}>
                  <td className="border border-rose-300 dark:border-rose-900 p-2.5">CASH FLOW FROM OPERATING ACTIVITIES</td>
                  <td className="border border-rose-300 dark:border-rose-900 p-2.5 text-right font-black">1 180 000</td>
                </tr>
                <tr className={isDark ? 'bg-[#140508]' : 'bg-rose-50/20'}>
                  <td className="border border-rose-300 dark:border-rose-900 p-2 pl-6">Taxation paid (35 900 + 364 500 + 29 100)</td>
                  <td className="border border-rose-300 dark:border-rose-900 p-2 text-right">
                    <input
                      type="text"
                      placeholder="(429 500)"
                      value={userInputs['q23_tax'] || ''}
                      onChange={(e) => handleInputChange('q23_tax', e.target.value)}
                      className="w-32 px-2 py-1 rounded text-right text-xs"
                    />
                  </td>
                </tr>
                <tr className={isDark ? 'bg-[#18070b]' : 'bg-white'}>
                  <td className="border border-rose-300 dark:border-rose-900 p-2 pl-6">Dividends paid (115 300 + 162 000)</td>
                  <td className="border border-rose-300 dark:border-rose-900 p-2 text-right">
                    <input
                      type="text"
                      placeholder="(277 300)"
                      value={userInputs['q23_div'] || ''}
                      onChange={(e) => handleInputChange('q23_div', e.target.value)}
                      className="w-32 px-2 py-1 rounded text-right text-xs"
                    />
                  </td>
                </tr>
                <tr className={isDark ? 'bg-[#200b11] font-bold' : 'bg-rose-100/50 font-bold'}>
                  <td className="border border-rose-300 dark:border-rose-900 p-2.5">CASH FLOW FROM INVESTING ACTIVITIES</td>
                  <td className="border border-rose-300 dark:border-rose-900 p-2.5 text-right font-black text-rose-500">(1 320 000)</td>
                </tr>
                <tr className={isDark ? 'bg-[#200b11] font-bold' : 'bg-rose-100/50 font-bold'}>
                  <td className="border border-rose-300 dark:border-rose-900 p-2.5">CASH FLOW FROM FINANCING ACTIVITIES</td>
                  <td className="border border-rose-300 dark:border-rose-900 p-2.5 text-right">
                    <input
                      type="text"
                      placeholder="409 000"
                      value={userInputs['q23_fin'] || ''}
                      onChange={(e) => handleInputChange('q23_fin', e.target.value)}
                      className="w-32 px-2 py-1 rounded text-right text-xs font-bold text-emerald-500"
                    />
                  </td>
                </tr>
                <tr className={isDark ? 'bg-[#140508]' : 'bg-rose-50/20'}>
                  <td className="border border-rose-300 dark:border-rose-900 p-2 pl-6">Shares repurchased [255 000 + (30 000 × R1,20)]</td>
                  <td className="border border-rose-300 dark:border-rose-900 p-2 text-right">
                    <input
                      type="text"
                      placeholder="(291 000)"
                      value={userInputs['q23_rep'] || ''}
                      onChange={(e) => handleInputChange('q23_rep', e.target.value)}
                      className="w-32 px-2 py-1 rounded text-right text-xs text-rose-500"
                    />
                  </td>
                </tr>
                <tr className={isDark ? 'bg-red-950/60 font-bold' : 'bg-rose-100 font-bold'}>
                  <td className="border border-rose-300 dark:border-rose-900 p-2.5">NET CHANGE IN CASH AND CASH EQUIVALENTS</td>
                  <td className="border border-rose-300 dark:border-rose-900 p-2.5 text-right">
                    <input
                      type="text"
                      placeholder="269 000"
                      value={userInputs['q23_change'] || ''}
                      onChange={(e) => handleInputChange('q23_change', e.target.value)}
                      className="w-32 px-2 py-1 rounded text-right text-xs font-black"
                    />
                  </td>
                </tr>
                <tr className="bg-emerald-950/80 text-emerald-300 font-black border-t-2 border-b-2 border-emerald-500">
                  <td className="border border-rose-900 p-2.5 uppercase">CASH AND CASH EQUIVALENTS AT END (18 Marks)</td>
                  <td className="border border-rose-900 p-2.5 text-right">
                    <input
                      type="text"
                      placeholder="193 800"
                      value={userInputs['q23_end'] || ''}
                      onChange={(e) => handleInputChange('q23_end', e.target.value)}
                      className="w-32 px-2 py-1 rounded text-right text-xs font-black bg-emerald-900/40 text-white"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* =================================================================== */}
        {/* 3.1 MATCHING GRID */}
        {/* =================================================================== */}
        {qId === 301 && (
          <div className="space-y-3 font-mono text-xs sm:text-sm">
            <p className="text-xs text-slate-600 dark:text-slate-400 font-sans">
              Choose the correct letter (<strong>A: Liquidity</strong>, <strong>B: Gearing</strong>, <strong>C: Solvency</strong>, <strong>D: Return on equity</strong>):
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { no: '3.1.1', key: 'q31_1', desc: 'The benefit that shareholders receive for investing in a company' },
                { no: '3.1.2', key: 'q31_2', desc: 'The ability of a business to pay off its short-term debts' },
                { no: '3.1.3', key: 'q31_3', desc: 'The extent to which a company is financed on borrowed capital (loans)' },
                { no: '3.1.4', key: 'q31_4', desc: 'The ability of a business to settle all its debts using existing assets' },
              ].map((item) => (
                <div 
                  key={item.no}
                  className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 ${
                    isDark ? 'bg-[#18070b] border-rose-900/60' : 'bg-rose-50/40 border-rose-200'
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <span className="font-bold text-red-500 mr-2">{item.no}</span>
                    <span className="text-slate-700 dark:text-slate-300 text-xs">{item.desc}</span>
                  </div>
                  <input
                    type="text"
                    maxLength={1}
                    placeholder="A-D"
                    value={userInputs[item.key] || ''}
                    onChange={(e) => handleInputChange(item.key, e.target.value.toUpperCase())}
                    className="w-12 h-9 text-center font-black rounded-xl border text-sm uppercase"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* ANALYSIS & GOVERNANCE STRUCTURED ANSWER BOXES (Questions 3.2 & 4) */}
        {/* =================================================================== */}
        {(qId >= 302 && qId !== 301) && (
          <div className="space-y-4">
            <p className="text-xs text-slate-600 dark:text-slate-400 font-sans">
              Provide your structured analysis citing specific financial indicators, percentage trends, and King IV principles:
            </p>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-black uppercase text-red-600 dark:text-rose-400 block mb-1">
                  POINT 1 / Trend & Comparison with Figures:
                </label>
                <textarea
                  rows={3}
                  placeholder="State indicator name, compare company trends (e.g. Broom Ltd % OExp improved from 17,0% to 13,6%)..."
                  value={userInputs['point_1'] || ''}
                  onChange={(e) => handleInputChange('point_1', e.target.value)}
                  className={`w-full p-3 rounded-2xl border font-sans text-xs focus:ring-2 focus:ring-red-500 outline-hidden ${
                    isDark ? 'bg-[#100305] border-rose-900 text-white' : 'bg-rose-50/30 border-rose-200 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className="text-xs font-black uppercase text-red-600 dark:text-rose-400 block mb-1">
                  POINT 2 / Evaluation & Governance / Strategic Impact:
                </label>
                <textarea
                  rows={3}
                  placeholder="Explain the effect on liquidity, risk, shareholder returns, or ethical compliance..."
                  value={userInputs['point_2'] || ''}
                  onChange={(e) => handleInputChange('point_2', e.target.value)}
                  className={`w-full p-3 rounded-2xl border font-sans text-xs focus:ring-2 focus:ring-red-500 outline-hidden ${
                    isDark ? 'bg-[#100305] border-rose-900 text-white' : 'bg-rose-50/30 border-rose-200 text-slate-900'
                  }`}
                />
              </div>
            </div>
          </div>
        )}

        {/* Interactive Evaluation Action Buttons */}
        <div className="pt-3 border-t border-rose-200/60 dark:border-rose-900/60 flex items-center justify-between gap-3 flex-wrap">
          <button
            type="button"
            onClick={handleReset}
            className={`px-3 py-2 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition-colors cursor-pointer ${
              isDark ? 'bg-[#18080c] hover:bg-[#260c13] text-slate-400 border-rose-950' : 'bg-slate-100 hover:bg-slate-200 text-slate-600 border-slate-200'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Cells</span>
          </button>

          <button
            type="button"
            onClick={evaluateAnswerBook}
            className="px-5 py-2 rounded-xl text-xs font-black bg-gradient-to-r from-red-600 via-rose-600 to-rose-500 hover:from-red-500 text-white shadow-md shadow-rose-600/30 flex items-center gap-2 cursor-pointer transition-all hover:scale-105 active:scale-95"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Evaluate My Answer Book ({question.marks || 5} Marks)</span>
          </button>
        </div>
      </div>

      {/* Expandable DBE Marking Memo Guidelines */}
      <AnimatePresence>
        {showMemo && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-rose-200 dark:border-rose-950 p-5 bg-gradient-to-br from-amber-500/10 via-transparent to-rose-500/10"
          >
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Official DBE NSC Marking Guideline Principles</span>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300 whitespace-pre-line font-sans">
              {question.explanation}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
