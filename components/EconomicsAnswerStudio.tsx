'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  TrendingUp, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  FileText, 
  Award, 
  RotateCcw, 
  Send, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  Check, 
  PenTool,
  HelpCircle,
  Lightbulb
} from 'lucide-react';
import { useAppTheme } from '@/lib/theme';
import { Question } from '@/types/quiz';

interface EconomicsAnswerStudioProps {
  question: Question;
  currentIndex?: number;
  onAnswerCorrect?: (earnedMarks?: number) => void;
}

export const EconomicsAnswerStudio: React.FC<EconomicsAnswerStudioProps> = ({
  question,
  currentIndex = 0,
  onAnswerCorrect
}) => {
  const { isDark } = useAppTheme();
  const qId = question.id;

  const [userInputs, setUserInputs] = useState<Record<string, string>>({});
  const [rowStatus, setRowStatus] = useState<Record<string, boolean | null>>({});
  const [showMemo, setShowMemo] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [totalScore, setTotalScore] = useState<number | null>(null);

  // Load previous answer state if available
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`econ_answer_studio_q_${qId}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        setUserInputs(parsed.inputs || {});
        setRowStatus(parsed.status || {});
        setIsSubmitted(parsed.submitted || false);
        setTotalScore(parsed.score ?? null);
      } else {
        setUserInputs({});
        setRowStatus({});
        setIsSubmitted(false);
        setTotalScore(null);
      }
    } catch {}
  }, [qId]);

  const handleInputChange = (field: string, val: string) => {
    setUserInputs(prev => {
      const next = { ...prev, [field]: val };
      try {
        localStorage.setItem(`econ_answer_studio_q_${qId}`, JSON.stringify({
          inputs: next,
          status: rowStatus,
          submitted: isSubmitted,
          score: totalScore
        }));
      } catch {}
      return next;
    });
  };

  // If this question is multiple-choice (1.1.1 to 1.1.8), let the multiple choice options grid render
  if (question.type === 'multiple-choice') {
    return null;
  }

  // Determine question format
  const isTwoItemQuestion = qId === 611 || qId === 625 || qId === 639;
  const isSingleIdentifyQuestion = [613, 614, 618, 619, 627, 628, 632, 633, 641, 642, 646, 647].includes(qId);
  const isShortExplainQuestion = [612, 615, 616, 620, 621, 626, 629, 630, 634, 640, 643, 644, 648, 649].includes(qId);
  const isMediumDiscussQuestion = [617, 622, 631, 635, 636, 645, 650].includes(qId);
  const isLargeAnalysisQuestion = [623, 624, 637, 638, 651, 652].includes(qId);
  const isEssayQuestion = qId === 653 || qId === 654;

  const evaluateAnswer = () => {
    const status: Record<string, boolean> = {};
    let earnedMarks = 0;
    const maxMarks = question.marks || 2;

    // 1.2 Matching Items (1.2.1 to 1.2.8)
    if (qId === 609) {
      const m1 = (userInputs['match_1'] || '').toUpperCase().trim();
      const m2 = (userInputs['match_2'] || '').toUpperCase().trim();
      const m3 = (userInputs['match_3'] || '').toUpperCase().trim();
      const m4 = (userInputs['match_4'] || '').toUpperCase().trim();
      const m5 = (userInputs['match_5'] || '').toUpperCase().trim();
      const m6 = (userInputs['match_6'] || '').toUpperCase().trim();
      const m7 = (userInputs['match_7'] || '').toUpperCase().trim();
      const m8 = (userInputs['match_8'] || '').toUpperCase().trim();

      status['match_1'] = m1 === 'D';
      status['match_2'] = m2 === 'F';
      status['match_3'] = m3 === 'I';
      status['match_4'] = m4 === 'E';
      status['match_5'] = m5 === 'B';
      status['match_6'] = m6 === 'A';
      status['match_7'] = m7 === 'H';
      status['match_8'] = m8 === 'C';

      if (m1 === 'D') earnedMarks += 1;
      if (m2 === 'F') earnedMarks += 1;
      if (m3 === 'I') earnedMarks += 1;
      if (m4 === 'E') earnedMarks += 1;
      if (m5 === 'B') earnedMarks += 1;
      if (m6 === 'A') earnedMarks += 1;
      if (m7 === 'H') earnedMarks += 1;
      if (m8 === 'C') earnedMarks += 1;
    }
    // 1.3 Give the Term (1.3.1 to 1.3.6)
    else if (qId === 610) {
      const t1 = (userInputs['term_1'] || '').toLowerCase().trim();
      const t2 = (userInputs['term_2'] || '').toLowerCase().trim();
      const t3 = (userInputs['term_3'] || '').toLowerCase().trim();
      const t4 = (userInputs['term_4'] || '').toLowerCase().trim();
      const t5 = (userInputs['term_5'] || '').toLowerCase().trim();
      const t6 = (userInputs['term_6'] || '').toLowerCase().trim();

      status['term_1'] = t1.includes('absolute advantage');
      status['term_2'] = t2.includes('budget');
      status['term_3'] = t3.includes('regressive');
      status['term_4'] = t4.includes('export promotion');
      status['term_5'] = t5.includes('economic development');
      status['term_6'] = t6.includes('integrated manufacturing') || t6.includes('ims');

      if (status['term_1']) earnedMarks += 1;
      if (status['term_2']) earnedMarks += 1;
      if (status['term_3']) earnedMarks += 1;
      if (status['term_4']) earnedMarks += 1;
      if (status['term_5']) earnedMarks += 1;
      if (status['term_6']) earnedMarks += 1;
    }
    // Two Item Short Responses (2.1.1, 3.1.1, 4.1.1)
    else if (isTwoItemQuestion) {
      const p1 = (userInputs['item_1'] || '').toLowerCase().trim();
      const p2 = (userInputs['item_2'] || '').toLowerCase().trim();

      if (qId === 611) {
        // Circular flow participants: households, business, government, foreign
        const valid = ['household', 'business', 'firm', 'government', 'state', 'foreign'];
        const isP1Valid = valid.some(v => p1.includes(v));
        const isP2Valid = valid.some(v => p2.includes(v)) && p1 !== p2;
        status['item_1'] = isP1Valid;
        status['item_2'] = isP2Valid;
        if (isP1Valid) earnedMarks += 1;
        if (isP2Valid) earnedMarks += 1;
      } else if (qId === 625) {
        // Methods of import substitution: tariffs, quotas, subsidies, exchange control, embargo, deposits
        const valid = ['tariff', 'quota', 'subsid', 'exchange', 'control', 'embargo', 'deposit'];
        const isP1Valid = valid.some(v => p1.includes(v));
        const isP2Valid = valid.some(v => p2.includes(v)) && p1 !== p2;
        status['item_1'] = isP1Valid;
        status['item_2'] = isP2Valid;
        if (isP1Valid) earnedMarks += 1;
        if (isP2Valid) earnedMarks += 1;
      } else if (qId === 639) {
        // Criteria for regional development: free-market, competitiveness, sustainability, governance, resources, infrastructure, integration, partnerships
        const valid = ['market', 'competit', 'sustain', 'govern', 'resource', 'infrastruct', 'integrat', 'partner'];
        const isP1Valid = valid.some(v => p1.includes(v));
        const isP2Valid = valid.some(v => p2.includes(v)) && p1 !== p2;
        status['item_1'] = isP1Valid;
        status['item_2'] = isP2Valid;
        if (isP1Valid) earnedMarks += 1;
        if (isP2Valid) earnedMarks += 1;
      }
    }
    // Single Identification Questions (1 Mark)
    else if (isSingleIdentifyQuestion) {
      const resp = (userInputs['econ_resp'] || '').toLowerCase().trim();
      let isCorrect = false;

      if (qId === 613) isCorrect = resp.includes('2015');
      else if (qId === 614) isCorrect = resp.includes('gdp') || resp.includes('gross domestic product');
      else if (qId === 618) isCorrect = resp.includes('finance') || resp.includes('treasury');
      else if (qId === 619) isCorrect = resp.includes('60');
      else if (qId === 627) isCorrect = resp.includes('coal');
      else if (qId === 628) isCorrect = resp.includes('hdi') || resp.includes('human development');
      else if (qId === 632) isCorrect = resp.includes('duty') || resp.includes('free');
      else if (qId === 633) isCorrect = resp.includes('coega') || resp.includes('dube') || resp.includes('richards') || resp.includes('tshwane') || resp.includes('saldanha') || resp.includes('atlantis') || resp.includes('east london') || resp.includes('maluti') || resp.includes('musina');
      else if (qId === 641) isCorrect = resp.includes('resource') || resp.includes('technol');
      else if (qId === 642) isCorrect = resp.includes('gold');
      else if (qId === 646) isCorrect = resp.includes('export') || resp.includes('household') || resp.includes('consumer') || resp.includes('spending');
      else if (qId === 647) isCorrect = resp.includes('eap') || resp.includes('economically active');

      status['econ_resp'] = isCorrect;
      earnedMarks = isCorrect ? 1 : resp.length >= 2 ? 0 : 0;
    }
    // Section C: 40-Mark Single-Block Economics Essays (Questions 653 & 654)
    else if (isEssayQuestion) {
      const essay = (userInputs['econ_essay'] || '').trim();
      const lower = essay.toLowerCase();
      const wordCount = essay.split(/\s+/).filter(Boolean).length;

      const hasIntro = lower.includes('introduction');
      const hasConclusion = lower.includes('conclusion');

      const hasMainConcepts = qId === 653
        ? (lower.includes('monetary') || lower.includes('fiscal') || lower.includes('supply-side') || lower.includes('phillips') || lower.includes('demand'))
        : (lower.includes('infant') || lower.includes('dumping') || lower.includes('employment') || lower.includes('tariff') || lower.includes('protection'));

      const hasAdditionalConcepts = qId === 653
        ? (lower.includes('covid') || lower.includes('repo') || lower.includes('ters') || lower.includes('grant') || lower.includes('relief'))
        : (lower.includes('global') || lower.includes('market') || lower.includes('export') || lower.includes('comparative advantage') || lower.includes('foreign exchange'));

      status['econ_essay'] = wordCount >= 35;

      let introMarks = hasIntro && wordCount >= 25 ? 2 : 1;
      let mainMarks = 0;
      if (wordCount >= 180 && hasMainConcepts) mainMarks = 26;
      else if (wordCount >= 120) mainMarks = 18;
      else if (wordCount >= 60) mainMarks = 10;
      else if (wordCount >= 25) mainMarks = 5;

      let addMarks = 0;
      if (wordCount >= 90 && hasAdditionalConcepts) addMarks = 10;
      else if (wordCount >= 45) addMarks = 6;
      else if (wordCount >= 15) addMarks = 3;

      let conclMarks = hasConclusion && wordCount >= 25 ? 2 : 1;

      earnedMarks = Math.min(40, introMarks + mainMarks + addMarks + conclMarks);
    }
    // General Short / Medium / Large Explanations
    else {
      const resp = (userInputs['econ_resp'] || '').trim();
      const length = resp.length;
      status['econ_resp'] = length >= 8;

      if (maxMarks === 2) {
        earnedMarks = length >= 25 ? 2 : length >= 8 ? 1 : 0;
      } else if (maxMarks === 4) {
        earnedMarks = length >= 60 ? 4 : length >= 35 ? 3 : length >= 15 ? 2 : length >= 5 ? 1 : 0;
      } else if (maxMarks === 8) {
        earnedMarks = length >= 120 ? 8 : length >= 80 ? 6 : length >= 40 ? 4 : length >= 15 ? 2 : 1;
      } else {
        earnedMarks = length >= 30 ? maxMarks : Math.round(maxMarks * 0.5);
      }
    }

    setRowStatus(status);
    setTotalScore(earnedMarks);
    setIsSubmitted(true);

    try {
      localStorage.setItem(`econ_answer_studio_q_${qId}`, JSON.stringify({
        inputs: userInputs,
        status,
        submitted: true,
        score: earnedMarks
      }));
    } catch {}

    if (onAnswerCorrect) {
      onAnswerCorrect(earnedMarks);
    }
  };

  const handleReset = () => {
    setUserInputs({});
    setRowStatus({});
    setIsSubmitted(false);
    setTotalScore(null);
    try {
      localStorage.removeItem(`econ_answer_studio_q_${qId}`);
    } catch {}
  };

  return (
    <div className={`my-5 rounded-3xl border transition-all overflow-hidden shadow-xl ${
      isDark 
        ? 'bg-gradient-to-b from-[#18070d] via-[#120408] to-[#0d0205] border-rose-900/80 shadow-[0_4px_30px_rgba(244,63,94,0.12)] text-white' 
        : 'bg-gradient-to-b from-rose-50/40 via-white to-red-50/30 border-rose-300/90 shadow-[0_4px_25px_rgba(244,63,94,0.08)] text-slate-900'
    }`}>
      {/* Top Header Bar with Signature Light Red Identity */}
      <div className={`px-5 py-4 border-b flex items-center justify-between gap-3 flex-wrap ${
        isDark 
          ? 'bg-gradient-to-r from-[#2c0c16] via-[#200810] to-[#16050b] border-rose-900/80' 
          : 'bg-gradient-to-r from-rose-100/90 via-red-50/70 to-rose-50/50 border-rose-200'
      }`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-500 via-red-500 to-rose-400 text-white flex items-center justify-center shadow-md shadow-rose-500/30 shrink-0">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-rose-600 text-white shadow-xs">
                ECONOMICS P1 ANSWER STUDIO
              </span>
              <span className="text-[11px] font-bold text-rose-600 dark:text-rose-400">
                Grade 12 NSC · {question.marks || 2} Marks
              </span>
            </div>
            <h4 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white mt-1">
              {question.category}
            </h4>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {totalScore !== null && (
            <div className={`px-3 py-1 rounded-xl text-xs font-black border flex items-center gap-1.5 ${
              totalScore >= Math.round((question.marks || 2) * 0.5)
                ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
                : 'bg-rose-500/15 border-rose-500/30 text-rose-600 dark:text-rose-400'
            }`}>
              <Award className="w-3.5 h-3.5" />
              <span>Score: {totalScore} / {question.marks || 2}</span>
            </div>
          )}

          <button
            type="button"
            onClick={() => setShowMemo(!showMemo)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border flex items-center gap-1.5 transition-all cursor-pointer ${
              showMemo 
                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-xs' 
                : isDark 
                ? 'bg-[#260c16] hover:bg-[#34111f] text-rose-300 border-rose-800/80' 
                : 'bg-rose-50 hover:bg-rose-100 text-rose-800 border-rose-200'
            }`}
          >
            {showMemo ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />}
            <span>{showMemo ? 'Hide Memo' : 'Marking Memo'}</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-4 sm:p-6 space-y-5">
        {/* =================================================================== */}
        {/* 1.2 MATCHING ITEMS (8 MARKS) */}
        {/* =================================================================== */}
        {qId === 609 && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
              <div className="space-y-2">
                <div className="font-black text-xs uppercase text-rose-600 dark:text-rose-400 pb-1 border-b border-rose-200 dark:border-rose-900 flex items-center justify-between">
                  <span>COLUMN A (TERMS 1.2.1–1.2.8)</span>
                  <span className="text-[10px] text-slate-400 font-normal">Enter A–I in boxes</span>
                </div>
                {[
                  { no: '1.2.1', key: 'match_1', term: 'Transfer payment' },
                  { no: '1.2.2', key: 'match_2', term: 'Investment' },
                  { no: '1.2.3', key: 'match_3', term: 'Cash reserve requirements' },
                  { no: '1.2.4', key: 'match_4', term: 'Price discrimination' },
                  { no: '1.2.5', key: 'match_5', term: 'Social indicator' },
                  { no: '1.2.6', key: 'match_6', term: 'Desirable mix' },
                  { no: '1.2.7', key: 'match_7', term: 'Industrial development zones' },
                  { no: '1.2.8', key: 'match_8', term: 'Expanded Public Works Programme' },
                ].map(item => (
                  <div key={item.no} className="p-2.5 rounded-xl border flex items-center justify-between gap-2 border-rose-200 dark:border-rose-900/90 bg-rose-50/40 dark:bg-[#1a070e] hover:border-rose-300 transition-colors">
                    <div>
                      <span className="inline-block px-1.5 py-0.5 rounded-md bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 font-black text-[11px] mr-2">
                        {item.no}
                      </span>
                      <span className="font-bold">{item.term}</span>
                    </div>
                    <input
                      type="text"
                      maxLength={1}
                      placeholder="A-I"
                      value={userInputs[item.key] || ''}
                      onChange={(e) => handleInputChange(item.key, e.target.value.toUpperCase())}
                      className={`w-11 h-8 text-center font-black rounded-xl border text-sm uppercase outline-hidden focus:ring-2 focus:ring-rose-400 focus:border-rose-400 transition-all ${
                        rowStatus[item.key] === true
                          ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                          : rowStatus[item.key] === false
                          ? 'border-rose-500 bg-rose-500/10 text-rose-400'
                          : isDark ? 'bg-[#100305] border-rose-900 text-white' : 'bg-white border-rose-200 text-slate-900'
                      }`}
                    />
                  </div>
                ))}
              </div>

              <div className="space-y-1.5 text-[11px] p-3.5 rounded-2xl border border-rose-200 dark:border-rose-900 bg-rose-50/50 dark:bg-[#16050b] max-h-96 overflow-y-auto">
                <div className="font-black text-xs uppercase text-rose-600 dark:text-rose-400 pb-1 border-b border-rose-200/60 dark:border-rose-900/60">
                  COLUMN B (DESCRIPTIONS A–I)
                </div>
                {[
                  { l: 'A', t: 'combination of international trade policies suitable for prevailing conditions' },
                  { l: 'B', t: 'monitors identifiable and definable issues related to human well-being' },
                  { l: 'C', t: 'nationwide government intervention to create employment using labour intensive methods' },
                  { l: 'D', t: 'money received without any productive service rendered' },
                  { l: 'E', t: 'charging different customers, different prices for the same product' },
                  { l: 'F', t: 'spending by businesses on capital goods' },
                  { l: 'G', t: 'used to control money supply through buying/selling of government securities' },
                  { l: 'H', t: 'purpose-built industrial estates that are physically enclosed and link to international ports' },
                  { l: 'I', t: 'the minimum amount of money that the SARB requires banks to maintain to manipulate money creation' },
                ].map(b => (
                  <div key={b.l} className="py-1.5 border-b border-rose-200/50 dark:border-rose-900/40 flex items-start gap-2">
                    <span className="w-5 h-5 rounded-md bg-rose-100 dark:bg-rose-950 flex items-center justify-center font-black text-rose-700 dark:text-rose-300 text-[11px] shrink-0">
                      {b.l}
                    </span>
                    <span className="leading-snug">{b.t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* 1.3 GIVE THE TERM (6 MARKS) */}
        {/* =================================================================== */}
        {qId === 610 && (
          <div className="space-y-3 font-sans text-xs sm:text-sm">
            <p className="text-slate-600 dark:text-slate-400 text-xs font-medium">
              Give ONE economic term for each description (No abbreviations or examples):
            </p>
            {[
              { no: '1.3.1', key: 'term_1', q: 'When a country involved in international trade, produces more output than other countries given the same input:' },
              { no: '1.3.2', key: 'term_2', q: 'A document that details expected revenue and projected expenditure for the next fiscal year:' },
              { no: '1.3.3', key: 'term_3', q: 'Tax systems where low-income earners pay higher tax rates while high-income earners pay lower tax rates:' },
              { no: '1.3.4', key: 'term_4', q: 'The provision of incentives to encourage local businesses to produce goods to sell to other countries:' },
              { no: '1.3.5', key: 'term_5', q: 'The process that focuses on the improvement of people\'s standard of living:' },
              { no: '1.3.6', key: 'term_6', q: 'The industrial development strategy that focuses on improving the competitiveness in manufacturing by considering input prices and technology:' },
            ].map(item => (
              <div 
                key={item.no}
                className={`p-3.5 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 transition-colors ${
                  isDark ? 'bg-[#1a070e] border-rose-900/80 border-l-4 border-l-rose-500' : 'bg-rose-50/30 border-rose-200 border-l-4 border-l-rose-400 shadow-xs'
                }`}
              >
                <div className="flex-1">
                  <span className="inline-block px-1.5 py-0.5 rounded-md bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 font-black text-[11px] mr-2">
                    {item.no}
                  </span>
                  <span className="leading-relaxed">{item.q}</span>
                </div>
                <input
                  type="text"
                  placeholder="Type term..."
                  value={userInputs[item.key] || ''}
                  onChange={(e) => handleInputChange(item.key, e.target.value)}
                  className={`w-full sm:w-60 px-3 py-1.5 rounded-xl border font-bold text-xs outline-hidden focus:ring-2 focus:ring-rose-400 focus:border-rose-400 transition-all ${
                    rowStatus[item.key] === true
                      ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                      : rowStatus[item.key] === false
                      ? 'border-rose-500 bg-rose-500/10 text-rose-400'
                      : isDark ? 'bg-[#100305] border-rose-900 text-white' : 'bg-white border-rose-300 text-slate-900'
                  }`}
                />
              </div>
            ))}
          </div>
        )}

        {/* =================================================================== */}
        {/* TWO-ITEM QUESTIONS (2.1.1, 3.1.1, 4.1.1) */}
        {/* =================================================================== */}
        {isTwoItemQuestion && (
          <div className="space-y-3 font-sans">
            <span className="text-xs font-bold text-rose-600 dark:text-rose-400 block">
              Provide any TWO points (1 Mark each):
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-2xl border border-rose-200 dark:border-rose-900 bg-rose-50/40 dark:bg-[#1a070e]">
                <label className="text-[11px] font-black uppercase text-rose-700 dark:text-rose-300 block mb-1">
                  1. First Point:
                </label>
                <input
                  type="text"
                  placeholder="e.g. Household / Tariffs / Free-market..."
                  value={userInputs['item_1'] || ''}
                  onChange={(e) => handleInputChange('item_1', e.target.value)}
                  className={`w-full p-2.5 rounded-xl border text-xs font-bold outline-hidden transition-all ${
                    rowStatus['item_1'] === true
                      ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                      : rowStatus['item_1'] === false
                      ? 'border-rose-500 bg-rose-500/10 text-rose-400'
                      : isDark ? 'bg-[#100305] border-rose-900 text-white' : 'bg-white border-rose-300 text-slate-900'
                  }`}
                />
              </div>
              <div className="p-3 rounded-2xl border border-rose-200 dark:border-rose-900 bg-rose-50/40 dark:bg-[#1a070e]">
                <label className="text-[11px] font-black uppercase text-rose-700 dark:text-rose-300 block mb-1">
                  2. Second Point:
                </label>
                <input
                  type="text"
                  placeholder="e.g. Business sector / Quotas / Competitiveness..."
                  value={userInputs['item_2'] || ''}
                  onChange={(e) => handleInputChange('item_2', e.target.value)}
                  className={`w-full p-2.5 rounded-xl border text-xs font-bold outline-hidden transition-all ${
                    rowStatus['item_2'] === true
                      ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                      : rowStatus['item_2'] === false
                      ? 'border-rose-500 bg-rose-500/10 text-rose-400'
                      : isDark ? 'bg-[#100305] border-rose-900 text-white' : 'bg-white border-rose-300 text-slate-900'
                  }`}
                />
              </div>
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* SINGLE IDENTIFY QUESTIONS (1 MARK: 2.2.1, 2.2.2, 2.3.1, etc.) */}
        {/* =================================================================== */}
        {isSingleIdentifyQuestion && (
          <div className="space-y-3 font-sans">
            <label className="text-xs font-black uppercase text-rose-600 dark:text-rose-400 block mb-1">
              Candidate Response (1 Mark):
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Type your answer here..."
                value={userInputs['econ_resp'] || ''}
                onChange={(e) => handleInputChange('econ_resp', e.target.value)}
                className={`w-full p-3.5 rounded-2xl border text-xs sm:text-sm font-bold outline-hidden transition-all ${
                  rowStatus['econ_resp'] === true
                    ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                    : rowStatus['econ_resp'] === false
                    ? 'border-rose-500 bg-rose-500/10 text-rose-400'
                    : isDark ? 'bg-[#120408] border-rose-900 text-white' : 'bg-white border-rose-300 text-slate-900'
                }`}
              />
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* GENERAL DIRECT / EXPLANATION / ESSAY (2, 4, 8, 40 MARKS) */}
        {/* =================================================================== */}
        {!isTwoItemQuestion && !isSingleIdentifyQuestion && qId !== 609 && qId !== 610 && !isEssayQuestion && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black uppercase text-rose-600 dark:text-rose-400 block">
                Candidate Response ({question.marks || 2} Marks):
              </label>
              <span className="text-[11px] font-mono text-slate-400">
                {(userInputs['econ_resp'] || '').trim().split(/\s+/).filter(Boolean).length} Words
              </span>
            </div>
            <textarea
              rows={isLargeAnalysisQuestion ? 6 : isMediumDiscussQuestion ? 4 : 3}
              placeholder="Write your answer in full sentences with relevant economic reasoning..."
              value={userInputs['econ_resp'] || ''}
              onChange={(e) => handleInputChange('econ_resp', e.target.value)}
              className={`w-full p-3.5 rounded-2xl border text-xs sm:text-sm font-sans leading-relaxed focus:ring-2 focus:ring-rose-400 focus:border-rose-500 outline-hidden transition-all ${
                isDark ? 'bg-[#120408] border-rose-900 text-white' : 'bg-white border-rose-300 text-slate-900'
              }`}
            />
          </div>
        )}

        {/* =================================================================== */}
        {/* SECTION C: 40-MARK ESSAY (QUESTIONS 5 & 6) */}
        {/* =================================================================== */}
        {isEssayQuestion && (
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <label className="text-xs font-black uppercase text-rose-700 dark:text-rose-300 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-rose-500" />
                <span>SECTION C ESSAY ANSWER BOOK (ONE CONTINUOUS BLOCK · 40 MARKS)</span>
              </label>
              <div className="flex items-center gap-2 text-[11px] font-mono flex-wrap">
                <span className={`px-2 py-0.5 rounded-md border text-[10px] font-bold ${
                  (userInputs['econ_essay'] || '').toLowerCase().includes('introduction')
                    ? 'bg-rose-100 text-rose-700 border-rose-300 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-800'
                    : 'bg-slate-100 text-slate-400 border-slate-200 dark:bg-slate-900 dark:text-slate-500 dark:border-slate-800'
                }`}>
                  {(userInputs['econ_essay'] || '').toLowerCase().includes('introduction') ? '✓' : '○'} Introduction
                </span>
                <span className={`px-2 py-0.5 rounded-md border text-[10px] font-bold ${
                  (userInputs['econ_essay'] || '').toLowerCase().includes('conclusion')
                    ? 'bg-rose-100 text-rose-700 border-rose-300 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-800'
                    : 'bg-slate-100 text-slate-400 border-slate-200 dark:bg-slate-900 dark:text-slate-500 dark:border-slate-800'
                }`}>
                  {(userInputs['econ_essay'] || '').toLowerCase().includes('conclusion') ? '✓' : '○'} Conclusion
                </span>
                <span className="px-2 py-0.5 rounded-md bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900 font-bold text-[10px]">
                  {(userInputs['econ_essay'] || '').trim().split(/\s+/).filter(Boolean).length} Words
                </span>
              </div>
            </div>

            <div className="relative">
              <textarea
                rows={16}
                placeholder={qId === 653 
                  ? `Write your complete essay here in one continuous block:\n\nINTRODUCTION\n• Define the new economic paradigm or business cycle stabilization (Max 2)...\n\nBODY: MAIN PART (26 MARKS)\n• Demand-side policies: Monetary policy (SARB interest rate cuts, repo rate), Fiscal policy (Treasury spending & taxes), Inflation & Phillips curve...\n• Supply-side policies: Cost reduction, efficiency of inputs & markets...\n\nBODY: ADDITIONAL PART (10 MARKS)\n• Evaluate SA government COVID-19 pandemic stimulus initiatives (UIF TERS, loan guarantees, SRD grants, tax deferrals)...\n\nCONCLUSION\n• Conclude with a higher-order synthesis on macroeconomic policy mix (Max 2)...`
                  : `Write your complete essay here in one continuous block:\n\nINTRODUCTION\n• Define protectionism as a trade policy (Max 2)...\n\nBODY: MAIN PART (26 MARKS)\n• Arguments in favour of protectionism: Industrial development, infant industries, preventing dumping, domestic employment, strategic key industries, balance of payments stability...\n\nBODY: ADDITIONAL PART (10 MARKS)\n• Explain how South Africa benefits from trading in global markets (larger export markets, technology transfer, specialization, foreign exchange)...\n\nCONCLUSION\n• Conclude with a balanced higher-order evaluation on protectionism vs free trade (Max 2)...`}
                value={userInputs['econ_essay'] || ''}
                onChange={(e) => handleInputChange('econ_essay', e.target.value)}
                className={`w-full p-4 rounded-2xl border text-xs sm:text-sm font-sans leading-relaxed focus:ring-2 focus:ring-rose-400/50 focus:border-rose-500 outline-hidden transition-all shadow-inner ${
                  isDark 
                    ? 'bg-[#120408] border-rose-900 text-white placeholder:text-rose-900/50' 
                    : 'bg-white border-rose-300 text-slate-900 placeholder:text-slate-400'
                }`}
              />
            </div>
          </div>
        )}

        {/* Action Buttons in Signature Light Red Styling */}
        <div className="pt-3 border-t border-rose-200/80 dark:border-rose-900/80 flex items-center justify-between gap-3 flex-wrap">
          <button
            type="button"
            onClick={handleReset}
            className={`px-3 py-2 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition-colors cursor-pointer ${
              isDark ? 'bg-[#1c0810] hover:bg-[#280c18] text-rose-300/80 border-rose-900/60' : 'bg-rose-50/80 hover:bg-rose-100 text-rose-700 border-rose-200'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Studio</span>
          </button>

          <button
            type="button"
            onClick={evaluateAnswer}
            className="px-5 py-2.5 rounded-xl text-xs font-black bg-gradient-to-r from-rose-600 via-red-500 to-rose-500 hover:from-rose-500 hover:to-red-400 text-white shadow-md shadow-rose-500/25 flex items-center gap-2 cursor-pointer transition-all hover:scale-105 active:scale-95"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Submit & Grade ({question.marks || 2} Marks)</span>
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
            className="border-t border-rose-200 dark:border-rose-900 p-5 bg-gradient-to-br from-rose-50 via-amber-50/30 to-white dark:from-[#260a13] dark:via-[#1c070e] dark:to-[#120408] text-xs leading-relaxed"
          >
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-rose-700 dark:text-rose-300 mb-2">
              <Sparkles className="w-4 h-4 text-rose-500 animate-pulse" />
              <span>Official DBE Economics Marking Guidelines</span>
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

export default EconomicsAnswerStudio;
