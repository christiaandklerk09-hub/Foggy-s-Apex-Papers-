'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Scale, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  HelpCircle, 
  RotateCcw, 
  Plus, 
  Trash2, 
  ChevronDown, 
  ChevronUp,
  Table as TableIcon,
  Calculator,
  Check,
  Eye,
  EyeOff,
  AlertCircle
} from 'lucide-react';
import { useAppTheme } from '@/lib/theme';

export type LedgerGridType = 
  | 't-account' 
  | 'balance-sheet' 
  | 'income-statement' 
  | 'cash-flow' 
  | 'note' 
  | 'general-journal';

export interface TAccountEntry {
  id: string;
  date: string;
  details: string;
  folio: string;
  amount: string;
  isLocked?: boolean;
  expectedDetails?: string[];
  expectedAmount?: string | number;
}

export interface TAccountData {
  accountName: string;
  accountNumber?: string;
  drTitle?: string;
  crTitle?: string;
  drEntries: TAccountEntry[];
  crEntries: TAccountEntry[];
  drTotal?: number | string;
  crTotal?: number | string;
  balanceCd?: {
    side: 'dr' | 'cr';
    amount: string | number;
  };
}

export interface StatementLineItem {
  id: string;
  label: string;
  noteNumber?: string | number;
  level?: 0 | 1 | 2 | 3; // 0 = Major Section, 1 = Category, 2 = Item, 3 = Subtotal/Total
  isShaded?: boolean;
  isHeader?: boolean;
  isTotal?: boolean;
  isDoubleUnderline?: boolean;
  fixedValue?: string | number;
  expectedValue?: string | number | (string | number)[];
  workings?: string;
  workingsHint?: string;
  expectedWorkings?: string;
  marks?: number;
  hint?: string;
}

export interface LedgerEvaluationResult {
  isBalanced: boolean;
  totalMarksEarned: number;
  maxMarks: number;
  lineResults: Record<string, { isCorrect: boolean; feedback?: string }>;
}

export interface LedgerGridProps {
  type: LedgerGridType;
  title?: string;
  subtitle?: string;
  tAccountData?: TAccountData;
  statementItems?: StatementLineItem[];
  initialValues?: Record<string, string>;
  initialWorkings?: Record<string, string>;
  onValueChange?: (id: string, value: string, isWorking?: boolean) => void;
  onEvaluate?: (result: LedgerEvaluationResult) => void;
  readOnly?: boolean;
  showMarkingMemoDefault?: boolean;
  className?: string;
}

// Helper to format currency numbers cleanly (e.g. 4860000 -> 4 860 000)
export function formatAccountingNumber(val: string | number | undefined): string {
  if (val === undefined || val === null || val === '') return '';
  const str = String(val).trim();
  if (str === '—' || str === '-') return '—';
  
  // Check for negative in parentheses or minus sign
  const isNegative = str.startsWith('-') || (str.startsWith('(') && str.endsWith(')'));
  const cleanDigits = str.replace(/[^\d.]/g, '');
  if (!cleanDigits) return str;

  const parts = cleanDigits.split('.');
  const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  const formatted = parts.length > 1 ? `${integerPart}.${parts[1]}` : integerPart;

  return isNegative ? `(${formatted})` : formatted;
}

// Clean and normalize user string input for evaluation
export function normalizeAccountingValue(val: string | number | undefined): string {
  if (val === undefined || val === null) return '';
  return String(val)
    .trim()
    .toUpperCase()
    .replace(/R/g, '')
    .replace(/\s+/g, '')
    .replace(/,/g, '.')
    .replace(/[()]/g, (m) => (m === '(' ? '-' : ''));
}

export const LedgerGrid: React.FC<LedgerGridProps> = ({
  type = 'balance-sheet',
  title,
  subtitle,
  tAccountData,
  statementItems = [],
  initialValues = {},
  initialWorkings = {},
  onValueChange,
  onEvaluate,
  readOnly = false,
  showMarkingMemoDefault = false,
  className = '',
}) => {
  const { isDark } = useAppTheme();

  // Local values state for tabular inputs
  const [values, setValues] = useState<Record<string, string>>(initialValues);
  const [workings, setWorkings] = useState<Record<string, string>>(initialWorkings);
  const [lineStatus, setLineStatus] = useState<Record<string, boolean | null>>({});
  const [showMemo, setShowMemo] = useState(showMarkingMemoDefault);
  const [evaluationResult, setEvaluationResult] = useState<LedgerEvaluationResult | null>(null);

  // T-Account local dynamic entries
  const [drList, setDrList] = useState<TAccountEntry[]>(() => tAccountData?.drEntries || [
    { id: 'dr_1', date: '', details: '', folio: '', amount: '' },
    { id: 'dr_2', date: '', details: '', folio: '', amount: '' },
    { id: 'dr_3', date: '', details: '', folio: '', amount: '' },
  ]);
  const [crList, setCrList] = useState<TAccountEntry[]>(() => tAccountData?.crEntries || [
    { id: 'cr_1', date: '', details: '', folio: '', amount: '' },
    { id: 'cr_2', date: '', details: '', folio: '', amount: '' },
    { id: 'cr_3', date: '', details: '', folio: '', amount: '' },
  ]);

  useEffect(() => {
    if (initialValues && Object.keys(initialValues).length > 0) {
      setValues(initialValues);
    }
  }, [initialValues]);

  const handleCellChange = (id: string, val: string, isWorking = false) => {
    if (readOnly) return;
    if (isWorking) {
      setWorkings(prev => {
        const next = { ...prev, [id]: val };
        onValueChange?.(id, val, true);
        return next;
      });
    } else {
      setValues(prev => {
        const next = { ...prev, [id]: val };
        onValueChange?.(id, val, false);
        return next;
      });
    }
  };

  const handleTAccountEntryChange = (
    side: 'dr' | 'cr',
    index: number,
    field: keyof TAccountEntry,
    val: string
  ) => {
    if (readOnly) return;
    if (side === 'dr') {
      setDrList(prev => {
        const copy = [...prev];
        copy[index] = { ...copy[index], [field]: val };
        return copy;
      });
    } else {
      setCrList(prev => {
        const copy = [...prev];
        copy[index] = { ...copy[index], [field]: val };
        return copy;
      });
    }
  };

  const addTAccountRow = (side: 'dr' | 'cr') => {
    const newId = `${side}_${Date.now()}`;
    const newEntry: TAccountEntry = { id: newId, date: '', details: '', folio: '', amount: '' };
    if (side === 'dr') setDrList(prev => [...prev, newEntry]);
    else setCrList(prev => [...prev, newEntry]);
  };

  const removeTAccountRow = (side: 'dr' | 'cr', index: number) => {
    if (side === 'dr') {
      if (drList.length <= 1) return;
      setDrList(prev => prev.filter((_, i) => i !== index));
    } else {
      if (crList.length <= 1) return;
      setCrList(prev => prev.filter((_, i) => i !== index));
    }
  };

  // Compute live T-Account Totals
  const drTotal = useMemo(() => {
    return drList.reduce((sum, item) => {
      const num = parseFloat(normalizeAccountingValue(item.amount));
      return sum + (isNaN(num) ? 0 : num);
    }, 0);
  }, [drList]);

  const crTotal = useMemo(() => {
    return crList.reduce((sum, item) => {
      const num = parseFloat(normalizeAccountingValue(item.amount));
      return sum + (isNaN(num) ? 0 : num);
    }, 0);
  }, [crList]);

  const isTAccountBalanced = drTotal > 0 && crTotal > 0 && Math.abs(drTotal - crTotal) < 0.01;

  // Run evaluation against provided expected values & rubrics
  const evaluateGrid = () => {
    let earnedMarks = 0;
    let maxMarks = 0;
    const lineRes: Record<string, { isCorrect: boolean; feedback?: string }> = {};

    if (type === 't-account') {
      // Evaluate T-account entries
      drList.forEach((entry, idx) => {
        if (entry.expectedAmount !== undefined) {
          maxMarks += 1;
          const userVal = normalizeAccountingValue(entry.amount);
          const expVal = normalizeAccountingValue(entry.expectedAmount);
          const isCorrect = userVal === expVal;
          if (isCorrect) earnedMarks += 1;
          lineRes[`dr_${idx}`] = { isCorrect };
        }
      });
      crList.forEach((entry, idx) => {
        if (entry.expectedAmount !== undefined) {
          maxMarks += 1;
          const userVal = normalizeAccountingValue(entry.amount);
          const expVal = normalizeAccountingValue(entry.expectedAmount);
          const isCorrect = userVal === expVal;
          if (isCorrect) earnedMarks += 1;
          lineRes[`cr_${idx}`] = { isCorrect };
        }
      });

      const result: LedgerEvaluationResult = {
        isBalanced: isTAccountBalanced,
        totalMarksEarned: earnedMarks,
        maxMarks: maxMarks || 10,
        lineResults: lineRes
      };
      setEvaluationResult(result);
      onEvaluate?.(result);
      return;
    }

    // Evaluate Statement / Balance Sheet Line Items
    statementItems.forEach((item) => {
      if (item.expectedValue !== undefined) {
        const itemMarks = item.marks || 1;
        maxMarks += itemMarks;

        const userVal = normalizeAccountingValue(values[item.id]);
        const expected = item.expectedValue;

        let isCorrect = false;
        if (Array.isArray(expected)) {
          isCorrect = expected.some(exp => normalizeAccountingValue(exp) === userVal);
        } else {
          isCorrect = normalizeAccountingValue(expected) === userVal;
        }

        if (isCorrect) {
          earnedMarks += itemMarks;
        }

        lineRes[item.id] = {
          isCorrect,
          feedback: isCorrect ? `✓ Correct (+${itemMarks})` : `Expected: ${formatAccountingNumber(Array.isArray(expected) ? expected[0] : expected)}`
        };
      }
    });

    const finalResult: LedgerEvaluationResult = {
      isBalanced: earnedMarks === maxMarks,
      totalMarksEarned: earnedMarks,
      maxMarks: maxMarks || statementItems.length,
      lineResults: lineRes
    };

    const statusMap: Record<string, boolean> = {};
    Object.keys(lineRes).forEach(k => {
      statusMap[k] = lineRes[k].isCorrect;
    });
    setLineStatus(statusMap);
    setEvaluationResult(finalResult);
    onEvaluate?.(finalResult);
  };

  const handleReset = () => {
    setValues({});
    setWorkings({});
    setLineStatus({});
    setEvaluationResult(null);
  };

  return (
    <div className={`rounded-3xl border transition-all overflow-hidden shadow-lg ${
      isDark 
        ? 'bg-[#120508] border-rose-900/60 shadow-black/50 text-white' 
        : 'bg-white border-rose-200 shadow-rose-900/5 text-slate-900'
    } ${className}`}>
      
      {/* Top Header Bar */}
      {(title || subtitle) && (
        <div className={`px-5 py-3.5 border-b flex items-center justify-between gap-3 flex-wrap ${
          isDark 
            ? 'bg-gradient-to-r from-[#200b12] via-[#18070d] to-[#120407] border-rose-950/80' 
            : 'bg-gradient-to-r from-rose-50/90 via-red-50/50 to-white border-rose-100'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-red-600 via-rose-600 to-rose-500 text-white flex items-center justify-center shadow-md shadow-rose-600/30 shrink-0">
              {type === 't-account' ? <Scale className="w-5 h-5" /> : <TableIcon className="w-5 h-5" />}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-red-600 text-white shadow-xs">
                  {type === 't-account' ? 'GENERAL LEDGER T-ACCOUNT' : 'ACCOUNTING LEDGER GRID'}
                </span>
                {subtitle && (
                  <span className="text-[11px] font-bold text-rose-600 dark:text-rose-400">
                    {subtitle}
                  </span>
                )}
              </div>
              {title && (
                <h4 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white mt-0.5">
                  {title}
                </h4>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {evaluationResult && (
              <div className={`px-3 py-1 rounded-xl text-xs font-black border flex items-center gap-1.5 ${
                evaluationResult.totalMarksEarned >= Math.round(evaluationResult.maxMarks * 0.7)
                  ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
                  : 'bg-rose-500/15 border-rose-500/30 text-rose-600 dark:text-rose-400'
              }`}>
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Score: {evaluationResult.totalMarksEarned} / {evaluationResult.maxMarks}</span>
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
      )}

      {/* ===================================================================== */}
      {/* 1. T-ACCOUNT LEDGER LAYOUT */}
      {/* ===================================================================== */}
      {type === 't-account' && (
        <div className="p-4 sm:p-6 overflow-x-auto space-y-4 font-mono text-xs">
          {/* Account Title Header with T-Bar divider */}
          <div className="text-center py-2 px-4 rounded-xl border border-rose-300 dark:border-rose-900 bg-red-950/20 font-black text-sm uppercase tracking-wider text-red-600 dark:text-rose-400 flex items-center justify-between">
            <span className="font-extrabold text-xs">Dr.</span>
            <span>{tAccountData?.accountName || 'GENERAL LEDGER ACCOUNT'}</span>
            <span className="font-extrabold text-xs">Cr.</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-rose-300 dark:border-rose-900 rounded-2xl overflow-hidden shadow-xs divide-y lg:divide-y-0 lg:divide-x divide-rose-300 dark:divide-rose-900">
            {/* DEBIT (Dr) SIDE */}
            <div className="flex flex-col justify-between">
              <div className="p-2.5 bg-red-950/40 text-rose-200 font-black flex items-center justify-between border-b border-rose-300 dark:border-rose-900">
                <span>{tAccountData?.drTitle || 'DEBIT (Dr)'}</span>
                <span className="text-[10px] opacity-75">Date · Details · Fol · Amount (R)</span>
              </div>

              <div className="divide-y divide-rose-200/60 dark:divide-rose-900/60 flex-1">
                {drList.map((row, idx) => (
                  <div key={row.id} className="p-2 flex items-center gap-1.5 hover:bg-rose-50/20 transition-colors">
                    <input
                      type="text"
                      placeholder="Date"
                      disabled={readOnly || row.isLocked}
                      value={row.date}
                      onChange={(e) => handleTAccountEntryChange('dr', idx, 'date', e.target.value)}
                      className="w-16 px-1.5 py-1 rounded border text-[11px] outline-hidden bg-transparent border-rose-200 dark:border-rose-900"
                    />
                    <input
                      type="text"
                      placeholder="Details / Contra Account"
                      disabled={readOnly || row.isLocked}
                      value={row.details}
                      onChange={(e) => handleTAccountEntryChange('dr', idx, 'details', e.target.value)}
                      className="flex-1 px-2 py-1 rounded border text-xs outline-hidden bg-transparent border-rose-200 dark:border-rose-900 font-bold"
                    />
                    <input
                      type="text"
                      placeholder="Fol"
                      disabled={readOnly || row.isLocked}
                      value={row.folio}
                      onChange={(e) => handleTAccountEntryChange('dr', idx, 'folio', e.target.value)}
                      className="w-10 px-1 py-1 rounded border text-[10px] text-center outline-hidden bg-transparent border-rose-200 dark:border-rose-900"
                    />
                    <input
                      type="text"
                      placeholder="0.00"
                      disabled={readOnly || row.isLocked}
                      value={row.amount}
                      onChange={(e) => handleTAccountEntryChange('dr', idx, 'amount', e.target.value)}
                      className="w-24 px-2 py-1 rounded border text-right font-bold text-xs outline-hidden bg-transparent border-rose-200 dark:border-rose-900"
                    />
                    {!readOnly && (
                      <button
                        type="button"
                        onClick={() => removeTAccountRow('dr', idx)}
                        className="p-1 text-slate-400 hover:text-red-500 rounded cursor-pointer"
                        title="Remove row"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Debit Subtotal / Total Bar */}
              <div className="p-2.5 border-t border-rose-300 dark:border-rose-900 bg-red-950/20 flex items-center justify-between font-black">
                {!readOnly && (
                  <button
                    type="button"
                    onClick={() => addTAccountRow('dr')}
                    className="text-[11px] text-red-500 hover:text-red-400 font-bold inline-flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" /> Add Dr Row
                  </button>
                )}
                <div className="flex items-center gap-2 ml-auto">
                  <span className="text-[10px] uppercase text-slate-400">Total Dr:</span>
                  <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                    R {formatAccountingNumber(drTotal)}
                  </span>
                </div>
              </div>
            </div>

            {/* CREDIT (Cr) SIDE */}
            <div className="flex flex-col justify-between">
              <div className="p-2.5 bg-red-950/40 text-rose-200 font-black flex items-center justify-between border-b border-rose-300 dark:border-rose-900">
                <span>{tAccountData?.crTitle || 'CREDIT (Cr)'}</span>
                <span className="text-[10px] opacity-75">Date · Details · Fol · Amount (R)</span>
              </div>

              <div className="divide-y divide-rose-200/60 dark:divide-rose-900/60 flex-1">
                {crList.map((row, idx) => (
                  <div key={row.id} className="p-2 flex items-center gap-1.5 hover:bg-rose-50/20 transition-colors">
                    <input
                      type="text"
                      placeholder="Date"
                      disabled={readOnly || row.isLocked}
                      value={row.date}
                      onChange={(e) => handleTAccountEntryChange('cr', idx, 'date', e.target.value)}
                      className="w-16 px-1.5 py-1 rounded border text-[11px] outline-hidden bg-transparent border-rose-200 dark:border-rose-900"
                    />
                    <input
                      type="text"
                      placeholder="Details / Contra Account"
                      disabled={readOnly || row.isLocked}
                      value={row.details}
                      onChange={(e) => handleTAccountEntryChange('cr', idx, 'details', e.target.value)}
                      className="flex-1 px-2 py-1 rounded border text-xs outline-hidden bg-transparent border-rose-200 dark:border-rose-900 font-bold"
                    />
                    <input
                      type="text"
                      placeholder="Fol"
                      disabled={readOnly || row.isLocked}
                      value={row.folio}
                      onChange={(e) => handleTAccountEntryChange('cr', idx, 'folio', e.target.value)}
                      className="w-10 px-1 py-1 rounded border text-[10px] text-center outline-hidden bg-transparent border-rose-200 dark:border-rose-900"
                    />
                    <input
                      type="text"
                      placeholder="0.00"
                      disabled={readOnly || row.isLocked}
                      value={row.amount}
                      onChange={(e) => handleTAccountEntryChange('cr', idx, 'amount', e.target.value)}
                      className="w-24 px-2 py-1 rounded border text-right font-bold text-xs outline-hidden bg-transparent border-rose-200 dark:border-rose-900"
                    />
                    {!readOnly && (
                      <button
                        type="button"
                        onClick={() => removeTAccountRow('cr', idx)}
                        className="p-1 text-slate-400 hover:text-red-500 rounded cursor-pointer"
                        title="Remove row"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Credit Subtotal / Total Bar */}
              <div className="p-2.5 border-t border-rose-300 dark:border-rose-900 bg-red-950/20 flex items-center justify-between font-black">
                {!readOnly && (
                  <button
                    type="button"
                    onClick={() => addTAccountRow('cr')}
                    className="text-[11px] text-red-500 hover:text-red-400 font-bold inline-flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" /> Add Cr Row
                  </button>
                )}
                <div className="flex items-center gap-2 ml-auto">
                  <span className="text-[10px] uppercase text-slate-400">Total Cr:</span>
                  <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                    R {formatAccountingNumber(crTotal)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Ledger Balancing Indicator */}
          <div className={`p-3 rounded-xl border flex items-center justify-between gap-3 text-xs font-bold ${
            isTAccountBalanced
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
              : 'bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400'
          }`}>
            <div className="flex items-center gap-2">
              <Scale className="w-4 h-4 shrink-0" />
              <span>
                {isTAccountBalanced
                  ? 'Account is Balanced! (Dr Total equals Cr Total)'
                  : `Difference: R ${formatAccountingNumber(Math.abs(drTotal - crTotal))} (${drTotal > crTotal ? 'Debit excess' : 'Credit excess'})`}
              </span>
            </div>
            <span className="text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded bg-black/10 dark:bg-white/10">
              {isTAccountBalanced ? 'BALANCED' : 'UNBALANCED'}
            </span>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* 2. TABULAR FINANCIAL STATEMENT & BALANCE SHEET LAYOUT */}
      {/* ===================================================================== */}
      {type !== 't-account' && (
        <div className="p-4 sm:p-6 overflow-x-auto font-mono text-xs">
          <table className="w-full border-collapse border border-rose-300 dark:border-rose-900 rounded-2xl overflow-hidden shadow-xs">
            <thead>
              <tr className={isDark ? 'bg-red-950/70 text-rose-200' : 'bg-rose-100/80 text-slate-800'}>
                <th className="border border-rose-300 dark:border-rose-900 p-2.5 text-left font-black">
                  DESCRIPTION / LINE ITEM
                </th>
                <th className="border border-rose-300 dark:border-rose-900 p-2.5 text-center font-black w-14">
                  NOTE
                </th>
                <th className="border border-rose-300 dark:border-rose-900 p-2.5 text-left font-black w-1/3 hidden md:table-cell">
                  WORKINGS & CALCULATIONS
                </th>
                <th className="border border-rose-300 dark:border-rose-900 p-2.5 text-right font-black w-40">
                  AMOUNT (R)
                </th>
              </tr>
            </thead>
            <tbody>
              {statementItems.map((item) => {
                const isMajorHeader = item.level === 0 || item.isHeader;
                const isCategory = item.level === 1;
                const isSubItem = item.level === 2;
                const isTotal = item.level === 3 || item.isTotal;

                const isShaded = item.isShaded;
                const currentValue = values[item.id] !== undefined ? values[item.id] : (item.fixedValue !== undefined ? String(item.fixedValue) : '');
                const currentWorking = workings[item.id] || item.workings || '';
                const isCorrect = lineStatus[item.id];

                if (isMajorHeader) {
                  return (
                    <tr key={item.id} className="bg-red-950 text-white font-black text-xs">
                      <td colSpan={4} className="border border-rose-800 p-2.5 tracking-wider uppercase">
                        {item.label}
                      </td>
                    </tr>
                  );
                }

                return (
                  <tr 
                    key={item.id} 
                    className={`transition-colors ${
                      isTotal 
                        ? isDark ? 'bg-[#200b11] font-black text-rose-200' : 'bg-rose-100/60 font-black text-slate-900'
                        : isCategory
                        ? isDark ? 'bg-[#18070b] font-bold text-white' : 'bg-rose-50/40 font-bold text-slate-900'
                        : isDark ? 'bg-[#140508] text-slate-200 hover:bg-[#1c080e]' : 'bg-white text-slate-800 hover:bg-rose-50/30'
                    }`}
                  >
                    {/* Label column with indent */}
                    <td className={`border border-rose-300 dark:border-rose-900 p-2.5 ${
                      isSubItem ? 'pl-6' : isCategory ? 'pl-3' : 'pl-2'
                    }`}>
                      <div className="flex items-center justify-between gap-2">
                        <span>{item.label}</span>
                        {item.marks && (
                          <span className="text-[10px] font-normal text-rose-500/80 dark:text-rose-400">
                            [{item.marks} marks]
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Note No. Column */}
                    <td className="border border-rose-300 dark:border-rose-900 p-2 text-center text-[11px] text-slate-400">
                      {item.noteNumber || '—'}
                    </td>

                    {/* Workings Column (collapsible on small screens) */}
                    <td className="border border-rose-300 dark:border-rose-900 p-2 hidden md:table-cell">
                      {item.isShaded ? (
                        <div className="h-6 rounded bg-slate-200/50 dark:bg-slate-800/40" />
                      ) : (
                        <input
                          type="text"
                          placeholder={item.workingsHint || 'Show workings...'}
                          disabled={readOnly || item.fixedValue !== undefined}
                          value={currentWorking}
                          onChange={(e) => handleCellChange(item.id, e.target.value, true)}
                          className="w-full px-2 py-1 rounded text-xs bg-transparent border border-transparent focus:border-rose-300 dark:focus:border-rose-800 outline-hidden"
                        />
                      )}
                    </td>

                    {/* Amount Input Cell */}
                    <td className={`border border-rose-300 dark:border-rose-900 p-2 text-right ${
                      item.isDoubleUnderline ? 'border-b-4 border-double border-slate-700 dark:border-rose-400' : ''
                    }`}>
                      {isShaded ? (
                        <div className="h-6 rounded bg-slate-200 dark:bg-slate-800/60 flex items-center justify-center text-slate-400 text-[10px]">
                          —
                        </div>
                      ) : item.fixedValue !== undefined ? (
                        <span className="font-bold pr-1 text-slate-700 dark:text-slate-300">
                          {formatAccountingNumber(item.fixedValue)}
                        </span>
                      ) : (
                        <div className="flex items-center justify-end gap-1">
                          <input
                            type="text"
                            placeholder="0"
                            disabled={readOnly}
                            value={currentValue}
                            onChange={(e) => handleCellChange(item.id, e.target.value, false)}
                            className={`w-32 sm:w-36 px-2.5 py-1 rounded-lg border text-right font-mono font-bold text-xs outline-hidden focus:ring-2 focus:ring-red-500 transition-all ${
                              isCorrect === true
                                ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                                : isCorrect === false
                                ? 'border-rose-500 bg-rose-500/10 text-rose-400'
                                : isDark ? 'bg-[#100305] border-rose-900 text-white' : 'bg-white border-rose-200 text-slate-900'
                            }`}
                          />
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Action Footer: Evaluate & Reset */}
      {!readOnly && (
        <div className="p-4 border-t border-rose-200 dark:border-rose-950/80 bg-red-950/10 flex items-center justify-between gap-3 flex-wrap">
          <button
            type="button"
            onClick={handleReset}
            className={`px-3 py-2 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition-colors cursor-pointer ${
              isDark ? 'bg-[#18080c] hover:bg-[#260c13] text-slate-400 border-rose-950' : 'bg-slate-100 hover:bg-slate-200 text-slate-600 border-slate-200'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Grid</span>
          </button>

          <button
            type="button"
            onClick={evaluateGrid}
            className="px-5 py-2.5 rounded-xl text-xs font-black bg-gradient-to-r from-red-600 via-rose-600 to-rose-500 hover:from-red-500 text-white shadow-md shadow-rose-600/30 flex items-center gap-2 cursor-pointer transition-all hover:scale-105 active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Check & Grade Accounting Grid</span>
          </button>
        </div>
      )}

      {/* Marking Memo Accordion */}
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
              <span>DBE Examination Solution & Marking Memo Key</span>
            </div>
            <div className="space-y-2 text-slate-700 dark:text-slate-300 font-mono">
              {statementItems.filter(i => i.expectedValue !== undefined).map(item => (
                <div key={item.id} className="flex items-center justify-between border-b border-rose-200/40 dark:border-rose-900/40 py-1">
                  <span>{item.label}:</span>
                  <strong className="text-emerald-600 dark:text-emerald-400">
                    R {formatAccountingNumber(Array.isArray(item.expectedValue) ? item.expectedValue[0] : item.expectedValue)}
                  </strong>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LedgerGrid;
