'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Briefcase, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Sparkles, 
  FileText, 
  Award, 
  RotateCcw, 
  Send, 
  Check, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  BookOpen, 
  Quote
} from 'lucide-react';
import { useAppTheme } from '@/lib/theme';
import { Question } from '@/types/quiz';

interface BusinessStudiesAnswerBookProps {
  question: Question;
  currentIndex?: number;
  onAnswerCorrect?: (earnedMarks?: number) => void;
}

export const BusinessStudiesAnswerBook: React.FC<BusinessStudiesAnswerBookProps> = ({
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
      const saved = localStorage.getItem(`bus_answer_book_q_${qId}`);
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
        localStorage.setItem(`bus_answer_book_q_${qId}`, JSON.stringify({
          inputs: next,
          status: rowStatus,
          submitted: isSubmitted,
          score: totalScore
        }));
      } catch {}
      return next;
    });
  };

  // If this question is multiple-choice (e.g. 1.1.1 to 1.1.5), let the clean option cards handle it
  if (question.type === 'multiple-choice') {
    return null;
  }

  const evaluateAnswer = () => {
    const status: Record<string, boolean> = {};
    let earnedMarks = 0;
    const maxMarks = question.marks || 4;

    // 1.2 Word Bank Completion
    if (qId === 506) {
      const ans1 = (userInputs['wb_1'] || '').toLowerCase().trim();
      const ans2 = (userInputs['wb_2'] || '').toLowerCase().trim();
      const ans3 = (userInputs['wb_3'] || '').toLowerCase().trim();
      const ans4 = (userInputs['wb_4'] || '').toLowerCase().trim();
      const ans5 = (userInputs['wb_5'] || '').toLowerCase().trim();

      status['wb_1'] = ans1.includes('opportunity');
      status['wb_2'] = ans2.includes('some control');
      status['wb_3'] = ans3.includes('learnership');
      status['wb_4'] = ans4.includes('headhunting');
      status['wb_5'] = ans5.includes('performance');

      if (status['wb_1']) earnedMarks += 2;
      if (status['wb_2']) earnedMarks += 2;
      if (status['wb_3']) earnedMarks += 2;
      if (status['wb_4']) earnedMarks += 2;
      if (status['wb_5']) earnedMarks += 2;
    }
    // 1.3 Term Matching (Overtime, SDL, Screening, Quality, Dismissal)
    else if (qId === 507) {
      const m1 = (userInputs['match_1'] || '').toUpperCase().trim();
      const m2 = (userInputs['match_2'] || '').toUpperCase().trim();
      const m3 = (userInputs['match_3'] || '').toUpperCase().trim();
      const m4 = (userInputs['match_4'] || '').toUpperCase().trim();
      const m5 = (userInputs['match_5'] || '').toUpperCase().trim();

      status['match_1'] = m1 === 'F';
      status['match_2'] = m2 === 'H';
      status['match_3'] = m3 === 'I';
      status['match_4'] = m4 === 'G';
      status['match_5'] = m5 === 'J';

      if (m1 === 'F') earnedMarks += 2;
      if (m2 === 'H') earnedMarks += 2;
      if (m3 === 'I') earnedMarks += 2;
      if (m4 === 'G') earnedMarks += 2;
      if (m5 === 'J') earnedMarks += 2;
    }
    // 2.3 PESTLE Elements
    else if (qId === 510) {
      const p1 = (userInputs['pestle_1'] || '').toLowerCase().trim();
      const p2 = (userInputs['pestle_2'] || '').toLowerCase().trim();
      const p3 = (userInputs['pestle_3'] || '').toLowerCase().trim();

      status['pestle_1'] = p1.includes('technol');
      status['pestle_2'] = p2.includes('environ');
      status['pestle_3'] = p3.includes('econom');

      if (status['pestle_1']) earnedMarks += 2;
      if (status['pestle_2']) earnedMarks += 2;
      if (status['pestle_3']) earnedMarks += 2;
    }
    // 2.5.1 Quoted Penalties (Money Bank)
    else if (qId === 512) {
      const q1 = (userInputs['nca_q1'] || '').toLowerCase().trim();
      const q2 = (userInputs['nca_q2'] || '').toLowerCase().trim();

      status['nca_q1'] = q1.includes('fine') || q1.includes('reckless');
      status['nca_q2'] = q2.includes('costs') || q2.includes('blacklisted') || q2.includes('credit bureau');

      if (status['nca_q1']) earnedMarks += 1;
      if (status['nca_q2']) earnedMarks += 1;
    }
    // 3.3.1 Job Analysis Table (Component vs Quoted Motivation)
    else if (qId === 518) {
      const comp1 = (userInputs['ja_comp1'] || '').toLowerCase().trim();
      const comp2 = (userInputs['ja_comp2'] || '').toLowerCase().trim();
      const mot1 = (userInputs['ja_mot1'] || '').toLowerCase().trim();
      const mot2 = (userInputs['ja_mot2'] || '').toLowerCase().trim();

      const isSpec1 = comp1.includes('specification');
      const isDesc2 = comp2.includes('description');
      const hasQuote1 = mot1.includes('qualification') || mot1.includes('candidate');
      const hasQuote2 = mot2.includes('financial statement') || mot2.includes('draw up');

      status['ja_comp1'] = isSpec1;
      status['ja_comp2'] = isDesc2;
      status['ja_mot1'] = hasQuote1;
      status['ja_mot2'] = hasQuote2;

      if (isSpec1) earnedMarks += 2;
      if (isDesc2) earnedMarks += 2;
      if (hasQuote1) earnedMarks += 1;
      if (hasQuote2) earnedMarks += 1;
    }
    // 3.5.1 Quote Results of Poor TQM
    else if (qId === 521) {
      const q1 = (userInputs['tqm_q1'] || '').toLowerCase().trim();
      const q2 = (userInputs['tqm_q2'] || '').toLowerCase().trim();

      status['tqm_q1'] = q1.includes('poor quality') || q1.includes('production');
      status['tqm_q2'] = q2.includes('decline in sales') || q2.includes('returned') || q2.includes('unhappy');

      if (status['tqm_q1']) earnedMarks += 1;
      if (status['tqm_q2']) earnedMarks += 1;
    }
    // 4.2.1 Business Sectors Table
    else if (qId === 526) {
      const sec1 = (userInputs['sec_1'] || '').toLowerCase().trim();
      const sec2 = (userInputs['sec_2'] || '').toLowerCase().trim();
      const mot1 = (userInputs['sec_mot1'] || '').toLowerCase().trim();
      const mot2 = (userInputs['sec_mot2'] || '').toLowerCase().trim();

      const isSec1 = sec1.includes('secondary');
      const isSec2 = sec2.includes('tertiary');
      const hasQuote1 = mot1.includes('manufactur') || mot1.includes('television');
      const hasQuote2 = mot2.includes('deliver') || mot2.includes('distributor');

      status['sec_1'] = isSec1;
      status['sec_2'] = isSec2;
      status['sec_mot1'] = hasQuote1;
      status['sec_mot2'] = hasQuote2;

      if (isSec1) earnedMarks += 2;
      if (isSec2) earnedMarks += 2;
      if (hasQuote1) earnedMarks += 1;
      if (hasQuote2) earnedMarks += 1;
    }
    // 4.5.1 Quote Roles of Interviewer
    else if (qId === 530) {
      const q1 = (userInputs['int_q1'] || '').toLowerCase().trim();
      const q2 = (userInputs['int_q2'] || '').toLowerCase().trim();

      status['int_q1'] = q1.includes('set of questions') || q1.includes('prepared');
      status['int_q2'] = q2.includes('venue') || q2.includes('booked');

      if (status['int_q1']) earnedMarks += 1;
      if (status['int_q2']) earnedMarks += 1;
    }
    // Section C: 40-Mark LASO Essays (Questions 5 & 6) — SINGLE ESSAY BLOCK
    else if (qId === 534 || qId === 535) {
      const fullEssay = (userInputs['essay_full'] || '').trim();
      const lower = fullEssay.toLowerCase();

      // Check Layout (L): Must state INTRODUCTION and CONCLUSION explicitly as headings
      const hasIntroHeading = lower.includes('introduction');
      const hasConclusionHeading = lower.includes('conclusion');
      const wordCount = fullEssay.split(/\s+/).filter(Boolean).length;

      // Check key syllabus topics
      const hasKeyConcepts = qId === 534
        ? (lower.includes('forward') || lower.includes('backward') || lower.includes('horizontal') || lower.includes('porter') || lower.includes('strateg'))
        : (lower.includes('control') || lower.includes('assurance') || lower.includes('purchas') || lower.includes('market') || lower.includes('cost of quality') || lower.includes('tqm'));

      status['essay_full'] = wordCount >= 30;

      let factMarks = 0;
      if (wordCount >= 30) factMarks += 10;
      if (wordCount >= 80) factMarks += 10;
      if (hasKeyConcepts) factMarks += 10;
      if (wordCount >= 140) factMarks += 2; // Up to 32 fact marks

      let lasoMarks = 0;
      if (hasIntroHeading && hasConclusionHeading) lasoMarks += 2; // L (Layout - 2)
      if (hasKeyConcepts && wordCount >= 60) lasoMarks += 2; // A (Analysis - 2)
      if (wordCount >= 90) lasoMarks += 2; // S (Synthesis - 2)
      if (wordCount >= 130) lasoMarks += 2; // O (Originality - 2)

      earnedMarks = Math.min(40, factMarks + lasoMarks);
    }
    // General Short Answer & Discussion Questions
    else {
      const p1 = (userInputs['point_1'] || '').trim();
      const p2 = (userInputs['point_2'] || '').trim();
      const hasP1 = p1.length > 10;
      const hasP2 = p2.length > 10;

      status['point_1'] = hasP1;
      status['point_2'] = hasP2;

      if (hasP1 && hasP2) earnedMarks = maxMarks;
      else if (hasP1 || hasP2) earnedMarks = Math.round(maxMarks / 2);
    }

    setRowStatus(status);
    setTotalScore(earnedMarks);
    setIsSubmitted(true);

    try {
      localStorage.setItem(`bus_answer_book_q_${qId}`, JSON.stringify({
        inputs: userInputs,
        status,
        submitted: true,
        score: earnedMarks
      }));
    } catch {}

    if (earnedMarks >= Math.round(maxMarks * 0.5) && onAnswerCorrect) {
      onAnswerCorrect(earnedMarks);
    }
  };

  const handleReset = () => {
    setUserInputs({});
    setRowStatus({});
    setIsSubmitted(false);
    setTotalScore(null);
    try {
      localStorage.removeItem(`bus_answer_book_q_${qId}`);
    } catch {}
  };

  return (
    <div className={`my-5 rounded-3xl border transition-all overflow-hidden shadow-xl ${
      isDark 
        ? 'bg-[#120508] border-rose-900/60 shadow-black/60 text-white' 
        : 'bg-white border-rose-200 shadow-rose-900/10 text-slate-900'
    }`}>
      {/* Top Header Bar */}
      <div className={`px-5 py-3.5 border-b flex items-center justify-between gap-3 flex-wrap ${
        isDark 
          ? 'bg-gradient-to-r from-[#220b12] via-[#1a070e] to-[#120407] border-rose-950/80' 
          : 'bg-gradient-to-r from-rose-50/95 via-red-50/60 to-white border-rose-100'
      }`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-red-600 via-rose-600 to-rose-500 text-white flex items-center justify-center shadow-md shadow-rose-600/30">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-red-600 text-white shadow-xs">
                OFFICIAL DBE ANSWER FORMAT
              </span>
              <span className="text-[11px] font-bold text-rose-600 dark:text-rose-400">
                Grade 12 Business Studies P1 · {question.marks || 4} Marks
              </span>
            </div>
            <h4 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white mt-0.5">
              {qId === 506 && 'QUESTION 1.2: Word Bank Terms Completion (10 Marks)'}
              {qId === 507 && 'QUESTION 1.3: Column A to Column B Matching (10 Marks)'}
              {qId === 510 && 'QUESTION 2.3: PESTLE Elements Classification (6 Marks)'}
              {qId === 512 && 'QUESTION 2.5.1: National Credit Act (NCA) Penalties (Quote: 2 Marks)'}
              {qId === 514 && 'QUESTION 2.6: Defensive Strategies Discussion (6 Marks)'}
              {qId === 516 && 'QUESTION 3.1: Four Aspects of an Employment Contract (4 Marks)'}
              {qId === 518 && 'QUESTION 3.3.1: Job Analysis Table (Specification vs Description: 6 Marks)'}
              {qId === 521 && 'QUESTION 3.5.1: Results of Poor TQM (Quote: 2 Marks)'}
              {qId === 524 && 'QUESTION 3.7: Adequate Financing and Capacity Evaluation (6 Marks)'}
              {qId === 526 && 'QUESTION 4.2.1: Business Sectors Table & Quoted Motivations (6 Marks)'}
              {qId === 529 && 'QUESTION 4.4: Salary Determination Methods (2 Marks)'}
              {qId === 530 && 'QUESTION 4.5.1: Interviewer Roles Before Interview (Quote: 2 Marks)'}
              {qId === 534 && 'QUESTION 5: Section C Essay — Business Environments & Strategies (LASO: 40 Marks)'}
              {qId === 535 && 'QUESTION 6: Section C Essay — Quality of Performance & TQM (LASO: 40 Marks)'}
              {qId !== 506 && qId !== 507 && qId !== 510 && qId !== 512 && qId !== 514 && qId !== 516 && qId !== 518 && qId !== 521 && qId !== 524 && qId !== 526 && qId !== 529 && qId !== 530 && qId !== 534 && qId !== 535 && `${question.category}`}
            </h4>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {totalScore !== null && (
            <div className={`px-3 py-1 rounded-xl text-xs font-black border flex items-center gap-1.5 ${
              totalScore >= Math.round((question.marks || 4) * 0.5)
                ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
                : 'bg-rose-500/15 border-rose-500/30 text-rose-600 dark:text-rose-400'
            }`}>
              <Award className="w-3.5 h-3.5" />
              <span>Score: {totalScore} / {question.marks || 4}</span>
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

      {/* Main Specialized Answering Layouts */}
      <div className="p-4 sm:p-6 space-y-5">
        {/* =================================================================== */}
        {/* 1.2 WORD BANK TERMS */}
        {/* =================================================================== */}
        {qId === 506 && (
          <div className="space-y-4">
            <div className={`p-4 rounded-2xl border ${isDark ? 'bg-[#18070b] border-rose-900/60' : 'bg-rose-50/50 border-rose-200'}`}>
              <div className="flex items-center gap-2 mb-2 text-xs font-black uppercase text-red-600 dark:text-rose-400">
                <BookOpen className="w-3.5 h-3.5" />
                <span>OFFICIAL WORD BANK LIST</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  'learnership', 'some control', 'management', 'headhunting', 'internship',
                  'opportunity', 'performance', 'no control', 'strength', 'walk-ins'
                ].map(word => (
                  <span 
                    key={word}
                    className="px-2.5 py-1 rounded-lg border text-xs font-mono font-bold bg-white dark:bg-[#100305] border-rose-200 dark:border-rose-900 text-slate-800 dark:text-rose-100"
                  >
                    {word}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-3 font-sans text-xs sm:text-sm">
              {[
                { no: '1.2.1', key: 'wb_1', q: 'The owner of Luke Bed & Breakfast identified a/an … when Mandy Bed & Breakfast closed down.' },
                { no: '1.2.2', key: 'wb_2', q: 'Businesses have … over the market environment.' },
                { no: '1.2.3', key: 'wb_3', q: 'A/An … agreement includes practical work experience that can lead to a recognised occupational qualification.' },
                { no: '1.2.4', key: 'wb_4', q: 'A well-experienced auditor from Zaks Consultants received an employment offer from Zizi\'s Consultants. This is known as …' },
                { no: '1.2.5', key: 'wb_5', q: 'Adrian Manufacturers applied quality … when they measured the total output of each department against specified standards.' }
              ].map(item => (
                <div 
                  key={item.no}
                  className={`p-3.5 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                    isDark ? 'bg-[#18070b] border-rose-900/60' : 'bg-white border-rose-200 shadow-xs'
                  }`}
                >
                  <div className="flex-1">
                    <span className="font-bold text-red-500 mr-2">{item.no}</span>
                    <span>{item.q}</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Type word..."
                    value={userInputs[item.key] || ''}
                    onChange={(e) => handleInputChange(item.key, e.target.value)}
                    className={`w-full sm:w-48 px-3 py-1.5 rounded-xl border font-mono font-bold text-xs outline-hidden focus:ring-2 focus:ring-red-500 ${
                      rowStatus[item.key] === true
                        ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                        : rowStatus[item.key] === false
                        ? 'border-rose-500 bg-rose-500/10 text-rose-400'
                        : isDark ? 'bg-[#100305] border-rose-900 text-white' : 'bg-rose-50/40 border-rose-200 text-slate-900'
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* 1.3 MATCHING COLUMN A & B */}
        {/* =================================================================== */}
        {qId === 507 && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
              <div className="space-y-2.5">
                <div className="font-black text-xs uppercase text-red-600 dark:text-rose-400 pb-1 border-b border-rose-200 dark:border-rose-900">
                  COLUMN A (TERMS)
                </div>
                {[
                  { no: '1.3.1', key: 'match_1', term: 'Overtime' },
                  { no: '1.3.2', key: 'match_2', term: 'Skills development levy' },
                  { no: '1.3.3', key: 'match_3', term: 'Screening' },
                  { no: '1.3.4', key: 'match_4', term: 'Quality' },
                  { no: '1.3.5', key: 'match_5', term: 'Dismissal' },
                ].map(item => (
                  <div key={item.no} className="p-3 rounded-xl border flex items-center justify-between gap-2 border-rose-200 dark:border-rose-900 bg-rose-50/20 dark:bg-[#18070b]">
                    <div>
                      <strong className="text-red-500 mr-2">{item.no}</strong>
                      <span className="font-bold">{item.term}</span>
                    </div>
                    <input
                      type="text"
                      maxLength={1}
                      placeholder="A-J"
                      value={userInputs[item.key] || ''}
                      onChange={(e) => handleInputChange(item.key, e.target.value.toUpperCase())}
                      className={`w-12 h-9 text-center font-black rounded-xl border text-sm uppercase outline-hidden focus:ring-2 focus:ring-red-500 ${
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

              <div className="space-y-1.5 text-[11px] p-3.5 rounded-2xl border border-rose-200 dark:border-rose-900 bg-rose-50/30 dark:bg-[#150508] max-h-96 overflow-y-auto">
                <div className="font-black text-xs uppercase text-red-600 dark:text-rose-400 pb-1">
                  COLUMN B (DESCRIPTIONS A–J)
                </div>
                {[
                  { l: 'A', t: 'termination of employment contract due to restructuring' },
                  { l: 'B', t: 'number of goods and services that satisfy the needs of customers' },
                  { l: 'C', t: 'workers allowed to work 11 hours per week outside normal working hours' },
                  { l: 'D', t: 'employers and employees contribute 1% of their payroll to SARS' },
                  { l: 'E', t: 'candidates\' skills and abilities matched with requirements of the job' },
                  { l: 'F', t: 'workers allowed to work three hours per day outside normal working hours' },
                  { l: 'G', t: 'ability of goods to meet the specific needs of customers' },
                  { l: 'H', t: 'employers contribute 1% of their payroll to SARS to train employees' },
                  { l: 'I', t: 'candidates\' application forms are checked against requirements of the job' },
                  { l: 'J', t: 'termination of an employment contract due to misconduct' },
                ].map(b => (
                  <div key={b.l} className="py-1 border-b border-rose-200/40 dark:border-rose-900/40 flex items-start gap-2">
                    <span className="font-black text-red-600 dark:text-rose-400">{b.l}.</span>
                    <span>{b.t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* 2.3 PESTLE ELEMENTS */}
        {/* =================================================================== */}
        {qId === 510 && (
          <div className="space-y-3 text-xs">
            <p className="text-slate-600 dark:text-slate-400 font-sans">
              Identify the specific PESTLE environmental element for each Berry Farm statement:
            </p>
            {[
              { no: '2.3.1', key: 'pestle_1', desc: 'Employees are unable to operate the modern machinery that has been purchased recently.' },
              { no: '2.3.2', key: 'pestle_2', desc: 'Management received a fine for dumping their waste material in the river.' },
              { no: '2.3.3', key: 'pestle_3', desc: 'Berry Farm can no longer export their products due to the unfavourable exchange rate.' }
            ].map(item => (
              <div key={item.no} className="p-3 rounded-2xl border border-rose-200 dark:border-rose-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex-1">
                  <span className="font-black text-red-500 mr-2">{item.no}</span>
                  <span>{item.desc}</span>
                </div>
                <input
                  type="text"
                  placeholder="e.g. Technological"
                  value={userInputs[item.key] || ''}
                  onChange={(e) => handleInputChange(item.key, e.target.value)}
                  className="w-full sm:w-48 px-3 py-1.5 rounded-xl border font-bold text-xs"
                />
              </div>
            ))}
          </div>
        )}

        {/* =================================================================== */}
        {/* 2.5.1 QUOTE PENALTIES (MONEY BANK) */}
        {/* =================================================================== */}
        {qId === 512 && (
          <div className="space-y-4">
            <div className="p-3.5 rounded-2xl border border-rose-300 dark:border-rose-900 bg-red-950/15 text-xs leading-relaxed">
              <span className="font-black text-red-500 uppercase block mb-1">SCENARIO: MONEY BANK (MB)</span>
              <em>&ldquo;Money Bank charges the same interest rates regardless of the client&apos;s level of income. The National Credit Regulator (NCR) imposed a fine on Money Bank for reckless granting of credit. MB was instructed to bear all the costs related to the removal of the names of blacklisted clients from the credit bureau.&rdquo;</em>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-black uppercase text-red-600 block mb-1">
                  Penalty Quote 1 (from scenario):
                </label>
                <textarea
                  rows={2}
                  placeholder='Quote: "The National Credit Regulator (NCR) imposed a fine on Money Bank..."'
                  value={userInputs['nca_q1'] || ''}
                  onChange={(e) => handleInputChange('nca_q1', e.target.value)}
                  className="w-full p-2.5 rounded-xl border text-xs"
                />
              </div>
              <div>
                <label className="text-xs font-black uppercase text-red-600 block mb-1">
                  Penalty Quote 2 (from scenario):
                </label>
                <textarea
                  rows={2}
                  placeholder='Quote: "MB was instructed to bear all the costs related to the removal..."'
                  value={userInputs['nca_q2'] || ''}
                  onChange={(e) => handleInputChange('nca_q2', e.target.value)}
                  className="w-full p-2.5 rounded-xl border text-xs"
                />
              </div>
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* 3.3.1 JOB ANALYSIS TWO-COLUMN TABLE */}
        {/* =================================================================== */}
        {qId === 518 && (
          <div className="space-y-4">
            <div className="p-3.5 rounded-2xl border border-rose-300 dark:border-rose-900 bg-red-950/15 text-xs leading-relaxed">
              <span className="font-black text-red-500 uppercase block mb-1">SCENARIO EXTRACT: SIPHO STATIONERS (SS)</span>
              <em>&ldquo;Sipho Stationers advertised a vacancy for a bookkeeper in a local newspaper. The advertisement stated that the prospective candidate should have a relevant formal qualification. The bookkeeper must be able to draw up financial statements.&rdquo;</em>
            </div>

            <table className="w-full text-xs sm:text-sm border-collapse border border-rose-300 dark:border-rose-900 rounded-2xl overflow-hidden">
              <thead>
                <tr className={isDark ? 'bg-red-950/70 text-rose-200' : 'bg-rose-100/80 text-slate-800'}>
                  <th className="border border-rose-300 dark:border-rose-900 p-3 text-left font-black w-2/5">
                    COMPONENTS OF A JOB ANALYSIS (4 Marks)
                  </th>
                  <th className="border border-rose-300 dark:border-rose-900 p-3 text-left font-black w-3/5">
                    MOTIVATIONS (Quote from Scenario: 2 Marks)
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className={isDark ? 'bg-[#18070b]' : 'bg-white'}>
                  <td className="border border-rose-300 dark:border-rose-900 p-3 align-top">
                    <input
                      type="text"
                      placeholder="1. e.g. Job specification"
                      value={userInputs['ja_comp1'] || ''}
                      onChange={(e) => handleInputChange('ja_comp1', e.target.value)}
                      className="w-full p-2 rounded-xl border text-xs font-bold outline-hidden bg-transparent border-rose-200 dark:border-rose-900"
                    />
                  </td>
                  <td className="border border-rose-300 dark:border-rose-900 p-3 align-top">
                    <textarea
                      rows={2}
                      placeholder="Quote: The advertisement stated that the prospective candidate should have a relevant formal qualification."
                      value={userInputs['ja_mot1'] || ''}
                      onChange={(e) => handleInputChange('ja_mot1', e.target.value)}
                      className="w-full p-2 rounded-xl border text-xs outline-hidden bg-transparent border-rose-200 dark:border-rose-900"
                    />
                  </td>
                </tr>
                <tr className={isDark ? 'bg-[#140508]' : 'bg-rose-50/20'}>
                  <td className="border border-rose-300 dark:border-rose-900 p-3 align-top">
                    <input
                      type="text"
                      placeholder="2. e.g. Job description"
                      value={userInputs['ja_comp2'] || ''}
                      onChange={(e) => handleInputChange('ja_comp2', e.target.value)}
                      className="w-full p-2 rounded-xl border text-xs font-bold outline-hidden bg-transparent border-rose-200 dark:border-rose-900"
                    />
                  </td>
                  <td className="border border-rose-300 dark:border-rose-900 p-3 align-top">
                    <textarea
                      rows={2}
                      placeholder="Quote: The bookkeeper must be able to draw up financial statements."
                      value={userInputs['ja_mot2'] || ''}
                      onChange={(e) => handleInputChange('ja_mot2', e.target.value)}
                      className="w-full p-2 rounded-xl border text-xs outline-hidden bg-transparent border-rose-200 dark:border-rose-900"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* =================================================================== */}
        {/* 3.5.1 QUOTE RESULTS OF POOR TQM (IKHAYA BRICKS) */}
        {/* =================================================================== */}
        {qId === 521 && (
          <div className="space-y-4">
            <div className="p-3.5 rounded-2xl border border-rose-300 dark:border-rose-900 bg-red-950/15 text-xs leading-relaxed">
              <span className="font-black text-red-500 uppercase block mb-1">SCENARIO: IKHAYA BRICKS MANUFACTURER (IBM)</span>
              <em>&ldquo;The employees of Ikhaya Bricks Manufacturer are not adequately trained, resulting in the production of poor quality products. IBM is experiencing a decline in sales as more goods are returned by unhappy customers. The management of IBM maintains that the business has a good image regardless of these challenges.&rdquo;</em>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-black uppercase text-red-600 block mb-1">
                  Result 1 Quote (from scenario):
                </label>
                <textarea
                  rows={2}
                  placeholder='Quote: "resulting in the production of poor quality products."'
                  value={userInputs['tqm_q1'] || ''}
                  onChange={(e) => handleInputChange('tqm_q1', e.target.value)}
                  className="w-full p-2.5 rounded-xl border text-xs"
                />
              </div>
              <div>
                <label className="text-xs font-black uppercase text-red-600 block mb-1">
                  Result 2 Quote (from scenario):
                </label>
                <textarea
                  rows={2}
                  placeholder='Quote: "IBM is experiencing a decline in sales as more goods are returned by unhappy customers."'
                  value={userInputs['tqm_q2'] || ''}
                  onChange={(e) => handleInputChange('tqm_q2', e.target.value)}
                  className="w-full p-2.5 rounded-xl border text-xs"
                />
              </div>
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* 4.2.1 BUSINESS SECTORS TWO-COLUMN TABLE */}
        {/* =================================================================== */}
        {qId === 526 && (
          <div className="space-y-4">
            <div className="p-3.5 rounded-2xl border border-rose-300 dark:border-rose-900 bg-red-950/15 text-xs leading-relaxed">
              <span className="font-black text-red-500 uppercase block mb-1">SCENARIO: CAREL TELEVISIONS (CT) & THULI DISTRIBUTORS (TD)</span>
              <em>&ldquo;Carel Televisions specialise in the manufacturing of smart television sets. They signed a contract with Thuli Distributors (TD) to deliver their products to customers. CT wants to implement intensive strategies for sustainable growth in the market.&rdquo;</em>
            </div>

            <table className="w-full text-xs sm:text-sm border-collapse border border-rose-300 dark:border-rose-900 rounded-2xl overflow-hidden">
              <thead>
                <tr className={isDark ? 'bg-red-950/70 text-rose-200' : 'bg-rose-100/80 text-slate-800'}>
                  <th className="border border-rose-300 dark:border-rose-900 p-3 text-left font-black w-2/5">
                    BUSINESS SECTOR (4 Marks)
                  </th>
                  <th className="border border-rose-300 dark:border-rose-900 p-3 text-left font-black w-3/5">
                    MOTIVATIONS (Quote from Scenario: 2 Marks)
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className={isDark ? 'bg-[#18070b]' : 'bg-white'}>
                  <td className="border border-rose-300 dark:border-rose-900 p-3 align-top">
                    <label className="text-[11px] font-black uppercase text-red-600 block mb-1">Carel Televisions (CT):</label>
                    <input
                      type="text"
                      placeholder="e.g. Secondary sector"
                      value={userInputs['sec_1'] || ''}
                      onChange={(e) => handleInputChange('sec_1', e.target.value)}
                      className="w-full p-2 rounded-xl border text-xs font-bold outline-hidden bg-transparent border-rose-200 dark:border-rose-900"
                    />
                  </td>
                  <td className="border border-rose-300 dark:border-rose-900 p-3 align-top">
                    <textarea
                      rows={2}
                      placeholder='Quote: "Carel Televisions specialise in the manufacturing of smart television sets."'
                      value={userInputs['sec_mot1'] || ''}
                      onChange={(e) => handleInputChange('sec_mot1', e.target.value)}
                      className="w-full p-2 rounded-xl border text-xs outline-hidden bg-transparent border-rose-200 dark:border-rose-900"
                    />
                  </td>
                </tr>
                <tr className={isDark ? 'bg-[#140508]' : 'bg-rose-50/20'}>
                  <td className="border border-rose-300 dark:border-rose-900 p-3 align-top">
                    <label className="text-[11px] font-black uppercase text-red-600 block mb-1">Thuli Distributors (TD):</label>
                    <input
                      type="text"
                      placeholder="e.g. Tertiary sector"
                      value={userInputs['sec_2'] || ''}
                      onChange={(e) => handleInputChange('sec_2', e.target.value)}
                      className="w-full p-2 rounded-xl border text-xs font-bold outline-hidden bg-transparent border-rose-200 dark:border-rose-900"
                    />
                  </td>
                  <td className="border border-rose-300 dark:border-rose-900 p-3 align-top">
                    <textarea
                      rows={2}
                      placeholder='Quote: "They signed a contract with Thuli Distributors (TD) to deliver their products to customers."'
                      value={userInputs['sec_mot2'] || ''}
                      onChange={(e) => handleInputChange('sec_mot2', e.target.value)}
                      className="w-full p-2 rounded-xl border text-xs outline-hidden bg-transparent border-rose-200 dark:border-rose-900"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* =================================================================== */}
        {/* 4.5.1 QUOTE INTERVIEWER ROLES (SUKI CONSULTING) */}
        {/* =================================================================== */}
        {qId === 530 && (
          <div className="space-y-4">
            <div className="p-3.5 rounded-2xl border border-rose-300 dark:border-rose-900 bg-red-950/15 text-xs leading-relaxed">
              <span className="font-black text-red-500 uppercase block mb-1">SCENARIO: SUKI CONSULTING (SC)</span>
              <em>&ldquo;Suki, the owner of Suki Consulting, will be conducting interviews for a vacant position. She prepared a set of questions that will be asked during the interviews. Suki also booked a suitable venue for the interviews.&rdquo;</em>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-black uppercase text-red-600 block mb-1">
                  Role 1 Quote (before the interview):
                </label>
                <textarea
                  rows={2}
                  placeholder='Quote: "She prepared a set of questions that will be asked during the interviews."'
                  value={userInputs['int_q1'] || ''}
                  onChange={(e) => handleInputChange('int_q1', e.target.value)}
                  className="w-full p-2.5 rounded-xl border text-xs"
                />
              </div>
              <div>
                <label className="text-xs font-black uppercase text-red-600 block mb-1">
                  Role 2 Quote (before the interview):
                </label>
                <textarea
                  rows={2}
                  placeholder='Quote: "Suki also booked a suitable venue for the interviews."'
                  value={userInputs['int_q2'] || ''}
                  onChange={(e) => handleInputChange('int_q2', e.target.value)}
                  className="w-full p-2.5 rounded-xl border text-xs"
                />
              </div>
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* SECTION C: 40-MARK LASO ESSAY CANVAS (Questions 5 & 6) */}
        {/* =================================================================== */}
        {(qId === 534 || qId === 535) && (
          <div className="space-y-5">
            <div className={`p-4 rounded-2xl border ${isDark ? 'bg-[#1a070e] border-rose-900/80' : 'bg-rose-50 border-rose-200'}`}>
              <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
                <span className="text-xs font-black uppercase tracking-wider text-red-600 dark:text-rose-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  <span>DBE LASO ESSAY INSIGHT RUBRIC (8 MARKS)</span>
                </span>
                <span className="text-[11px] font-bold text-slate-500">
                  Facts: 32 Marks · Insight: 8 Marks · Total: 40 Marks
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs font-bold">
                <div className="p-2 rounded-xl bg-white dark:bg-[#100305] border border-rose-200 dark:border-rose-900">
                  <span className="text-[10px] text-slate-400 uppercase block">L (Layout)</span>
                  <span className="text-emerald-500 font-black">2 Marks</span>
                </div>
                <div className="p-2 rounded-xl bg-white dark:bg-[#100305] border border-rose-200 dark:border-rose-900">
                  <span className="text-[10px] text-slate-400 uppercase block">A (Analysis)</span>
                  <span className="text-emerald-500 font-black">2 Marks</span>
                </div>
                <div className="p-2 rounded-xl bg-white dark:bg-[#100305] border border-rose-200 dark:border-rose-900">
                  <span className="text-[10px] text-slate-400 uppercase block">S (Synthesis)</span>
                  <span className="text-emerald-500 font-black">2 Marks</span>
                </div>
                <div className="p-2 rounded-xl bg-white dark:bg-[#100305] border border-rose-200 dark:border-rose-900">
                  <span className="text-[10px] text-slate-400 uppercase block">O (Originality)</span>
                  <span className="text-emerald-500 font-black">2 Marks</span>
                </div>
              </div>
            </div>

            {/* Unified Single Essay Block */}
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <label className="text-xs font-black uppercase text-red-600 dark:text-rose-400 flex items-center gap-1.5">
                  <FileText className="w-4 h-4" />
                  <span>SECTION C ESSAY ANSWER BOOK (ONE CONTINUOUS BLOCK · 40 MARKS)</span>
                </label>
                <div className="flex items-center gap-3 text-[11px] font-mono">
                  <span className={`${
                    (userInputs['essay_full'] || '').toLowerCase().includes('introduction')
                      ? 'text-emerald-500 font-bold'
                      : 'text-slate-400'
                  }`}>
                    {(userInputs['essay_full'] || '').toLowerCase().includes('introduction') ? '✓' : '○'} Introduction
                  </span>
                  <span className={`${
                    (userInputs['essay_full'] || '').toLowerCase().includes('conclusion')
                      ? 'text-emerald-500 font-bold'
                      : 'text-slate-400'
                  }`}>
                    {(userInputs['essay_full'] || '').toLowerCase().includes('conclusion') ? '✓' : '○'} Conclusion
                  </span>
                  <span className="text-slate-500 font-bold">
                    {(userInputs['essay_full'] || '').trim().split(/\s+/).filter(Boolean).length} Words
                  </span>
                </div>
              </div>

              <div className="relative">
                <textarea
                  rows={15}
                  placeholder={`Write your complete essay here in one continuous block:\n\nINTRODUCTION\n• Start with introductory background on the topic (2 marks)...\n\nBODY OF ESSAY (SUB-HEADINGS)\n• Use clear headings and discuss relevant facts and theory in full sentences...\n• Support with business examples and current developments...\n\nCONCLUSION\n• Conclude with a strong final synthesis (2 marks)...`}
                  value={userInputs['essay_full'] || ''}
                  onChange={(e) => handleInputChange('essay_full', e.target.value)}
                  className={`w-full p-4 rounded-2xl border text-xs sm:text-sm font-sans leading-relaxed focus:ring-2 focus:ring-red-500 outline-hidden transition-all shadow-inner ${
                    isDark 
                      ? 'bg-[#100305] border-rose-900 text-white placeholder:text-slate-600' 
                      : 'bg-white border-rose-200 text-slate-900 placeholder:text-slate-400'
                  }`}
                />
              </div>

              <p className="text-[11px] text-slate-500 dark:text-slate-400 italic">
                * Note to candidate: Per DBE exam guidelines, ensure the words <strong>INTRODUCTION</strong> and <strong>CONCLUSION</strong> are stated as sub-headings to be awarded Layout (L) marks.
              </p>
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* GENERAL DIRECT / INDIRECT QUESTIONS (SECTION B) */}
        {/* =================================================================== */}
        {qId !== 506 && qId !== 507 && qId !== 510 && qId !== 512 && qId !== 518 && qId !== 521 && qId !== 526 && qId !== 530 && qId !== 534 && qId !== 535 && (
          <div className="space-y-4">
            <p className="text-xs text-slate-600 dark:text-slate-400 font-sans">
              Write your structured response in full sentences according to the mark allocation ({question.marks || 4} marks):
            </p>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-black uppercase text-red-600 dark:text-rose-400 block mb-1">
                  POINT 1 / Primary Explanation:
                </label>
                <textarea
                  rows={3}
                  placeholder="State the first fact, definition, or outline with full reasoning..."
                  value={userInputs['point_1'] || ''}
                  onChange={(e) => handleInputChange('point_1', e.target.value)}
                  className={`w-full p-3 rounded-2xl border text-xs focus:ring-2 focus:ring-red-500 outline-hidden ${
                    isDark ? 'bg-[#100305] border-rose-900 text-white' : 'bg-white border-rose-200 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className="text-xs font-black uppercase text-red-600 dark:text-rose-400 block mb-1">
                  POINT 2 / Additional Factor or Application:
                </label>
                <textarea
                  rows={3}
                  placeholder="State the second fact, impact, or recommendation..."
                  value={userInputs['point_2'] || ''}
                  onChange={(e) => handleInputChange('point_2', e.target.value)}
                  className={`w-full p-3 rounded-2xl border text-xs focus:ring-2 focus:ring-red-500 outline-hidden ${
                    isDark ? 'bg-[#100305] border-rose-900 text-white' : 'bg-white border-rose-200 text-slate-900'
                  }`}
                />
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="pt-3 border-t border-rose-200/60 dark:border-rose-900/60 flex items-center justify-between gap-3 flex-wrap">
          <button
            type="button"
            onClick={handleReset}
            className={`px-3 py-2 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition-colors cursor-pointer ${
              isDark ? 'bg-[#18080c] hover:bg-[#260c13] text-slate-400 border-rose-950' : 'bg-slate-100 hover:bg-slate-200 text-slate-600 border-slate-200'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>

          <button
            type="button"
            onClick={evaluateAnswer}
            className="px-5 py-2.5 rounded-xl text-xs font-black bg-gradient-to-r from-red-600 via-rose-600 to-rose-500 hover:from-red-500 text-white shadow-md shadow-rose-600/30 flex items-center gap-2 cursor-pointer transition-all hover:scale-105 active:scale-95"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Submit & Grade Answer ({question.marks || 4} Marks)</span>
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
            className="border-t border-rose-200 dark:border-rose-950 p-5 bg-gradient-to-br from-amber-500/10 via-transparent to-rose-500/10 text-xs leading-relaxed"
          >
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Official DBE Business Studies Marking Guidelines</span>
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

export default BusinessStudiesAnswerBook;
