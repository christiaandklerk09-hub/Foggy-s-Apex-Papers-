'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calculator, 
  PenTool, 
  BookOpen, 
  BarChart3,
  X, 
  RotateCcw, 
  Trash2, 
  Copy, 
  Check, 
  Maximize2, 
  Minimize2, 
  Grid,
  Eraser,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Table,
  Sliders,
  Layers,
  Info
} from 'lucide-react';
import { useAppTheme } from '@/lib/theme';

interface MathScratchpadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInsertResult?: (result: string) => void;
}

export const MathScratchpadModal: React.FC<MathScratchpadModalProps> = ({
  isOpen,
  onClose,
  onInsertResult,
}) => {
  const { isDark } = useAppTheme();
  const [activeTab, setActiveTab] = useState<'calc' | 'canvas' | 'graphs' | 'formulas'>('calc');
  const [isMaximized, setIsMaximized] = useState(false);

  // Calculator State
  const [calcInput, setCalcInput] = useState('');
  const [calcResult, setCalcResult] = useState('');
  const [copied, setCopied] = useState(false);

  // Active Graph State inside the scratchpad
  const [activeGraphId, setActiveGraphId] = useState<'fuel' | 'energy' | 'car' | 'water' | 'floor' | 'box'>('fuel');
  const [selectedCountry, setSelectedCountry] = useState<string | null>('Zimbabwe');
  const [waterConsumption, setWaterConsumption] = useState<number>(28);
  const [activeFinanceCar, setActiveFinanceCar] = useState<'figo' | 'polo'>('figo');
  const [showTilingGrid, setShowTilingGrid] = useState<boolean>(true);

  // Formula Helper Modal States
  const [ratioA, setRatioA] = useState('72');
  const [ratioB, setRatioB] = useState('48');
  const [ratioResult, setRatioResult] = useState('3 : 2');

  const [ciP, setCiP] = useState('60000');
  const [ciRate1, setCiRate1] = useState('4.3');
  const [ciRate2, setCiRate2] = useState('5.1');
  const [ciResult, setCiResult] = useState('R65 771,58');

  // Canvas Drawing State
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [penColor, setPenColor] = useState<string>('#e11d48'); // Light red / crimson default
  const [penWidth, setPenWidth] = useState<number>(3);
  const [toolMode, setToolMode] = useState<'pen' | 'highlighter' | 'eraser'>('pen');
  const [canvasBg, setCanvasBg] = useState<'grid' | 'axes' | 'plain'>('grid');
  const [undoStack, setUndoStack] = useState<ImageData[]>([]);

  // Initialize Canvas
  useEffect(() => {
    if (activeTab === 'canvas' && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
      }
    }
  }, [activeTab, isOpen, isMaximized]);

  if (!isOpen) return null;

  // Calculator button click
  const handleCalcBtn = (val: string) => {
    if (val === 'C') {
      setCalcInput('');
      setCalcResult('');
    } else if (val === '⌫') {
      setCalcInput(prev => prev.slice(0, -1));
    } else if (val === '=') {
      try {
        const sanitized = calcInput
          .replace(/×/g, '*')
          .replace(/÷/g, '/')
          .replace(/\^/g, '**');
        // eslint-disable-next-line no-eval
        const res = Function(`'use strict'; return (${sanitized})`)();
        const formatted = typeof res === 'number' 
          ? (Number.isInteger(res) ? res.toString() : res.toFixed(4).replace(/\.?0+$/, '')) 
          : String(res);
        setCalcResult(formatted);
      } catch {
        setCalcResult('Error');
      }
    } else {
      setCalcInput(prev => prev + val);
    }
  };

  // Math Lit Quick Shortcuts
  const applyAddVAT = () => {
    try {
      const val = parseFloat(calcResult || calcInput || '0');
      const withVat = (val * 1.15).toFixed(2);
      setCalcResult(withVat);
      setCalcInput(`(${val} × 1.15)`);
    } catch {}
  };

  const applySubtractVAT = () => {
    try {
      const val = parseFloat(calcResult || calcInput || '0');
      const withoutVat = (val / 1.15).toFixed(2);
      setCalcResult(withoutVat);
      setCalcInput(`(${val} ÷ 1.15)`);
    } catch {}
  };

  const applyExchangeRate = (rate: number, label: string) => {
    try {
      const val = parseFloat(calcResult || calcInput || '1');
      const converted = (val * rate).toFixed(4);
      setCalcResult(converted);
      setCalcInput(`${val} × ${rate} [${label}]`);
    } catch {}
  };

  const calculateRatio = () => {
    const a = parseInt(ratioA, 10);
    const b = parseInt(ratioB, 10);
    if (isNaN(a) || isNaN(b) || b === 0) return;
    const gcd = (x: number, y: number): number => (!y ? x : gcd(y, x % y));
    const divisor = gcd(a, b);
    setRatioResult(`${a / divisor} : ${b / divisor}`);
  };

  const calculateCompoundInterest = () => {
    const p = parseFloat(ciP);
    const r1 = parseFloat(ciRate1) / 100;
    const r2 = parseFloat(ciRate2) / 100;
    if (isNaN(p) || isNaN(r1) || isNaN(r2)) return;
    const y1 = p * (1 + r1);
    const y2 = y1 * (1 + r2);
    setCiResult(`R${y2.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);
  };

  const copyResultToClipboard = (text?: string) => {
    const textToCopy = text || calcResult || calcInput;
    if (!textToCopy) return;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    if (onInsertResult) {
      onInsertResult(textToCopy);
    }
  };

  // Canvas Drawing Handlers
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const currentImg = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setUndoStack(prev => [...prev.slice(-10), currentImg]);

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);

    if (toolMode === 'eraser') {
      ctx.strokeStyle = isDark ? '#140608' : '#ffffff';
      ctx.lineWidth = penWidth * 3.5;
    } else if (toolMode === 'highlighter') {
      ctx.strokeStyle = 'rgba(251, 113, 133, 0.4)'; // Rose highlighter
      ctx.lineWidth = penWidth * 4;
    } else {
      ctx.strokeStyle = penColor;
      ctx.lineWidth = penWidth;
    }

    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.closePath();
    setIsDrawing(false);
  };

  const handleClearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      setUndoStack([]);
    }
  };

  const handleUndoCanvas = () => {
    if (undoStack.length === 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const lastState = undoStack[undoStack.length - 1];
    ctx.putImageData(lastState, 0, 0);
    setUndoStack(prev => prev.slice(0, -1));
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/65 backdrop-blur-xs">
        <div className="absolute inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          className={`relative flex flex-col rounded-3xl shadow-2xl border overflow-hidden z-10 transition-all ${
            isMaximized 
              ? 'w-[98vw] h-[95vh]' 
              : 'w-full max-w-3xl max-h-[92vh]'
          } ${
            isDark
              ? 'bg-[#120709] border-rose-900/70 text-white shadow-[0_0_35px_rgba(244,63,94,0.18)]'
              : 'bg-white border-rose-200 text-slate-900 sunlit-card'
          }`}
        >
          {/* Header Bar - Light Red / Soft Rose Gradient Theme */}
          <div className={`px-4 py-3 sm:py-3.5 border-b flex items-center justify-between shrink-0 ${
            isDark ? 'bg-[#180a0e] border-rose-950/80' : 'bg-gradient-to-r from-rose-100/70 via-red-50 to-white border-rose-200'
          }`}>
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-red-600 via-rose-500 to-rose-400 text-white flex items-center justify-center shadow-xs shrink-0">
                <Calculator className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-red-600/10 text-red-600 dark:text-rose-400 border border-red-300 dark:border-rose-900">
                    ON-SCREEN MATH & GRAPHS
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 hidden xs:inline">
                    DBE Mathematical Literacy
                  </span>
                </div>
                <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white mt-0.5 truncate">
                  Exam Rough Work, Calculator, Graph Visualizer & Formulas
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => setIsMaximized(!isMaximized)}
                className={`p-1.5 rounded-xl border transition-colors cursor-pointer ${
                  isDark ? 'border-rose-950 text-slate-400 hover:text-white' : 'border-rose-200 text-slate-600 hover:text-slate-900'
                }`}
                title={isMaximized ? "Restore size" : "Maximize view"}
              >
                {isMaximized ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>

              <button
                onClick={onClose}
                className={`p-1.5 rounded-xl border transition-colors cursor-pointer ${
                  isDark ? 'border-rose-950 text-slate-400 hover:text-white hover:bg-rose-950' : 'border-rose-200 text-slate-600 hover:text-slate-900 hover:bg-rose-100'
                }`}
                title="Close Scratchpad"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Navigation Tab Selector - Light Red Accents */}
          <div className={`flex border-b px-2 sm:px-6 gap-1 sm:gap-2 shrink-0 overflow-x-auto no-scrollbar ${
            isDark ? 'border-rose-950/70 bg-[#16080c]' : 'border-rose-100 bg-rose-50/50'
          }`}>
            <button
              onClick={() => setActiveTab('calc')}
              className={`py-2.5 px-3 text-xs font-bold border-b-2 flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'calc'
                  ? 'border-red-600 text-red-600 dark:text-red-400 font-extrabold'
                  : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Calculator</span>
            </button>

            <button
              onClick={() => setActiveTab('canvas')}
              className={`py-2.5 px-3 text-xs font-bold border-b-2 flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'canvas'
                  ? 'border-red-600 text-red-600 dark:text-red-400 font-extrabold'
                  : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400'
              }`}
            >
              <PenTool className="w-3.5 h-3.5" />
              <span>Rough Work Canvas</span>
            </button>

            <button
              onClick={() => setActiveTab('graphs')}
              className={`py-2.5 px-3 text-xs font-bold border-b-2 flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'graphs'
                  ? 'border-red-600 text-red-600 dark:text-red-400 font-extrabold'
                  : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Exam Graphs & Visuals</span>
            </button>

            <button
              onClick={() => setActiveTab('formulas')}
              className={`py-2.5 px-3 text-xs font-bold border-b-2 flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'formulas'
                  ? 'border-red-600 text-red-600 dark:text-red-400 font-extrabold'
                  : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>DBE Formulas & Tariffs</span>
            </button>
          </div>

          {/* Modal Content Body */}
          <div className="p-4 sm:p-5 flex-1 overflow-y-auto">
            {/* TAB 1: CALCULATOR */}
            {activeTab === 'calc' && (
              <div className="space-y-4 max-w-xl mx-auto">
                {/* Calculator Display Screen */}
                <div className={`p-4 rounded-2xl border text-right transition-colors ${
                  isDark ? 'bg-[#0f0406] border-rose-950/80 shadow-inner' : 'bg-rose-50/50 border-rose-200'
                }`}>
                  <div className="text-xs font-mono text-slate-400 min-h-[18px] break-all">
                    {calcInput || '0'}
                  </div>
                  <div className="text-2xl sm:text-3xl font-black font-mono text-slate-900 dark:text-white mt-1 break-all flex items-center justify-between">
                    <span className="text-xs font-normal text-rose-500 dark:text-rose-400">=</span>
                    <span>{calcResult || '0'}</span>
                  </div>

                  {calcResult && (
                    <div className="mt-2.5 pt-2 border-t border-rose-200/50 dark:border-rose-950 flex items-center justify-end gap-2">
                      <button
                        onClick={() => copyResultToClipboard()}
                        className="px-3 py-1 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 text-white text-[11px] font-bold flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                      >
                        {copied ? <Check className="w-3 h-3 stroke-[3]" /> : <Copy className="w-3 h-3" />}
                        <span>{copied ? 'Copied to Clipboard!' : 'Insert to Answer / Copy'}</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Quick Math Lit Exam Formulas Toolbar */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    <span>Quick DBE Shortcuts (1-Tap):</span>
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-xs">
                    <button
                      onClick={applyAddVAT}
                      className={`p-2 rounded-xl border text-left transition-colors cursor-pointer ${
                        isDark ? 'bg-[#180a0e] border-rose-950 hover:border-red-600' : 'bg-rose-50/70 border-rose-200 hover:bg-rose-100'
                      }`}
                      title="Add 15% VAT (Multiply by 1.15)"
                    >
                      <span className="font-extrabold text-red-600 dark:text-rose-400">+15% VAT</span>
                      <p className="text-[10px] text-slate-400 font-mono">val × 1,15</p>
                    </button>

                    <button
                      onClick={applySubtractVAT}
                      className={`p-2 rounded-xl border text-left transition-colors cursor-pointer ${
                        isDark ? 'bg-[#180a0e] border-rose-950 hover:border-red-600' : 'bg-rose-50/70 border-rose-200 hover:bg-rose-100'
                      }`}
                      title="Exclude 15% VAT (Divide by 1.15)"
                    >
                      <span className="font-extrabold text-red-600 dark:text-rose-400">-15% VAT</span>
                      <p className="text-[10px] text-slate-400 font-mono">val ÷ 1,15</p>
                    </button>

                    <button
                      onClick={() => applyExchangeRate(15.36, 'US$ to ZAR')}
                      className={`p-2 rounded-xl border text-left transition-colors cursor-pointer ${
                        isDark ? 'bg-[#180a0e] border-rose-950 hover:border-red-600' : 'bg-rose-50/70 border-rose-200 hover:bg-rose-100'
                      }`}
                      title="Convert US$ to Rands @ R15.36"
                    >
                      <span className="font-extrabold text-red-600 dark:text-rose-400">$ → R15,36</span>
                      <p className="text-[10px] text-slate-400 font-mono">val × 15,36</p>
                    </button>

                    <button
                      onClick={() => applyExchangeRate(0.0898, 'BWP to US$')}
                      className={`p-2 rounded-xl border text-left transition-colors cursor-pointer ${
                        isDark ? 'bg-[#180a0e] border-rose-950 hover:border-red-600' : 'bg-rose-50/70 border-rose-200 hover:bg-rose-100'
                      }`}
                      title="Convert Botswana Pula to US$ (1 / 11.14)"
                    >
                      <span className="font-extrabold text-red-600 dark:text-rose-400">Pula → US$</span>
                      <p className="text-[10px] text-slate-400 font-mono">val ÷ 11,14</p>
                    </button>
                  </div>
                </div>

                {/* Keypad Grid with Light Red Operator Buttons */}
                <div className="grid grid-cols-4 gap-2">
                  {[
                    ['C', '(', ')', '÷'],
                    ['7', '8', '9', '×'],
                    ['4', '5', '6', '-'],
                    ['1', '2', '3', '+'],
                    ['0', '.', '⌫', '=']
                  ].flat().map((btn) => {
                    const isOp = ['÷', '×', '-', '+', '='].includes(btn);
                    const isSpecial = ['C', '⌫', '(', ')'].includes(btn);
                    const isEquals = btn === '=';

                    return (
                      <button
                        key={btn}
                        onClick={() => handleCalcBtn(btn)}
                        className={`h-12 rounded-xl font-bold font-mono text-base transition-all cursor-pointer active:scale-95 flex items-center justify-center shadow-xs ${
                          isEquals
                            ? 'bg-gradient-to-r from-red-600 via-rose-500 to-rose-600 text-white font-extrabold text-lg shadow-rose-600/30'
                            : isOp
                            ? isDark 
                              ? 'bg-red-950/60 text-red-400 border border-red-800/40 hover:bg-red-900/60' 
                              : 'bg-rose-100 text-red-700 hover:bg-rose-200 border border-rose-200'
                            : isSpecial
                            ? isDark 
                              ? 'bg-[#1e0a0f] text-rose-300 border border-rose-950 hover:bg-[#2a0e15]' 
                              : 'bg-rose-50 text-slate-700 border border-rose-200 hover:bg-rose-100'
                            : isDark 
                              ? 'bg-[#15070a] text-white border border-rose-950/60 hover:bg-[#200b10]' 
                              : 'bg-white text-slate-900 border border-rose-200 hover:bg-rose-50/50'
                        }`}
                      >
                        {btn}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 2: ROUGH WORK DRAWING CANVAS */}
            {activeTab === 'canvas' && (
              <div className="space-y-3 flex flex-col h-full">
                {/* Canvas Toolbar with Light Red Palettes */}
                <div className={`p-2 rounded-2xl border flex items-center justify-between gap-2 flex-wrap text-xs ${
                  isDark ? 'bg-[#180a0e] border-rose-950/80' : 'bg-rose-50/60 border-rose-200'
                }`}>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setToolMode('pen')}
                      className={`p-1.5 rounded-lg font-bold flex items-center gap-1 cursor-pointer transition-colors ${
                        toolMode === 'pen' ? 'bg-red-600 text-white' : 'hover:bg-black/10 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      <PenTool className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Pen</span>
                    </button>

                    <button
                      onClick={() => setToolMode('highlighter')}
                      className={`p-1.5 rounded-lg font-bold flex items-center gap-1 cursor-pointer transition-colors ${
                        toolMode === 'highlighter' ? 'bg-rose-400 text-white' : 'hover:bg-black/10 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      <span className="w-3.5 h-3.5 rounded bg-rose-300 inline-block border border-rose-400" />
                      <span className="hidden sm:inline">Rose Highlighter</span>
                    </button>

                    <button
                      onClick={() => setToolMode('eraser')}
                      className={`p-1.5 rounded-lg font-bold flex items-center gap-1 cursor-pointer transition-colors ${
                        toolMode === 'eraser' ? 'bg-slate-700 text-white' : 'hover:bg-black/10 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      <Eraser className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Eraser</span>
                    </button>
                  </div>

                  {/* Light Red & Topic Color Palette */}
                  <div className="flex items-center gap-1.5">
                    {[
                      { color: '#e11d48', title: 'DBE Crimson Light Red' },
                      { color: '#f43f5e', title: 'Pastel Rose' },
                      { color: '#fb7185', title: 'Coral Red' },
                      { color: '#2563eb', title: 'Cobalt Blue' },
                      { color: '#059669', title: 'Emerald Green' },
                      { color: isDark ? '#ffffff' : '#0f172a', title: 'Mono Black/White' },
                    ].map((item) => (
                      <button
                        key={item.color}
                        onClick={() => {
                          setPenColor(item.color);
                          setToolMode('pen');
                        }}
                        title={item.title}
                        style={{ backgroundColor: item.color }}
                        className={`w-5 h-5 rounded-full border-2 transition-transform cursor-pointer ${
                          penColor === item.color && toolMode === 'pen' ? 'scale-125 border-white shadow-xs' : 'border-transparent'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Background Grid & Actions */}
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setCanvasBg(canvasBg === 'grid' ? 'axes' : canvasBg === 'axes' ? 'plain' : 'grid')}
                      className={`p-1.5 rounded-lg border text-[11px] font-bold flex items-center gap-1 cursor-pointer ${
                        canvasBg !== 'plain' ? 'border-red-500 text-red-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60' : 'border-transparent text-slate-500'
                      }`}
                      title="Toggle math grid paper / axes background"
                    >
                      <Grid className="w-3.5 h-3.5" />
                      <span>{canvasBg === 'grid' ? 'Quad Paper' : canvasBg === 'axes' ? 'X-Y Axes' : 'Plain'}</span>
                    </button>

                    <button
                      onClick={handleUndoCanvas}
                      disabled={undoStack.length === 0}
                      className="p-1.5 rounded-lg border border-rose-200 dark:border-rose-950 text-slate-500 hover:text-white cursor-pointer disabled:opacity-30"
                      title="Undo last stroke"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={handleClearCanvas}
                      className="p-1.5 rounded-lg bg-red-600/10 text-red-600 hover:bg-red-600/20 font-bold flex items-center gap-1 cursor-pointer"
                      title="Clear rough work"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Clear</span>
                    </button>
                  </div>
                </div>

                {/* Canvas Drawing Surface */}
                <div className={`relative w-full h-[340px] sm:h-[440px] rounded-2xl border overflow-hidden cursor-crosshair ${
                  isDark ? 'border-rose-900/60 bg-[#120507]' : 'border-rose-200 bg-white'
                }`}>
                  {/* Authentic Light Red Quad Grid Pattern */}
                  {canvasBg === 'grid' && (
                    <div 
                      className="absolute inset-0 pointer-events-none opacity-25"
                      style={{
                        backgroundImage: `linear-gradient(to right, ${isDark ? '#f43f5e' : '#fda4af'} 1px, transparent 1px), linear-gradient(to bottom, ${isDark ? '#f43f5e' : '#fda4af'} 1px, transparent 1px)`,
                        backgroundSize: '24px 24px'
                      }}
                    />
                  )}

                  {/* Mathematical Coordinate Axes in Light Red */}
                  {canvasBg === 'axes' && (
                    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
                      {/* Grid */}
                      <defs>
                        <pattern id="math-grid-pattern" width="30" height="30" patternUnits="userSpaceOnUse">
                          <path d="M 30 0 L 0 0 0 30" fill="none" stroke={isDark ? '#881337' : '#fecdd3'} strokeWidth="1" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#math-grid-pattern)" />
                      {/* Central Coordinate Axes */}
                      <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#e11d48" strokeWidth="2" />
                      <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#e11d48" strokeWidth="2" />
                      <text x="96%" y="47%" fill="#e11d48" fontSize="12" fontWeight="bold">X</text>
                      <text x="52%" y="15" fill="#e11d48" fontSize="12" fontWeight="bold">Y</text>
                      <text x="51%" y="54%" fill="#e11d48" fontSize="10" fontWeight="bold">0</text>
                    </svg>
                  )}

                  <canvas
                    ref={canvasRef}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                    className="w-full h-full relative z-10 touch-none"
                  />
                </div>
              </div>
            )}

            {/* TAB 3: DBE EXAM GRAPHS & VISUALIZER */}
            {activeTab === 'graphs' && (
              <div className="space-y-4">
                {/* Visual Selector Bar */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
                  {[
                    { id: 'fuel', label: 'Table 1: Fuel & Exchange Rates' },
                    { id: 'energy', label: 'Graph 1.2: Cooking Energy' },
                    { id: 'car', label: 'Table 2: Vehicle Finance' },
                    { id: 'water', label: 'Table 3: Stepped Water Tariffs' },
                    { id: 'floor', label: 'Annexure B: Bedroom Floor Plan' },
                    { id: 'box', label: 'Table 5: Box-and-Whisker Plot' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveGraphId(tab.id as any)}
                      className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap border transition-all cursor-pointer ${
                        activeGraphId === tab.id
                          ? 'bg-gradient-to-r from-red-600 to-rose-500 text-white border-red-500 shadow-sm'
                          : isDark
                            ? 'bg-[#180a0e] text-slate-300 border-rose-950 hover:border-rose-800'
                            : 'bg-rose-50/70 text-slate-700 border-rose-200 hover:bg-rose-100'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* GRAPH 1: Fuel Prices & Exchange Rates */}
                {activeGraphId === 'fuel' && (
                  <div className={`p-4 rounded-2xl border ${isDark ? 'bg-[#15070a] border-rose-900/60' : 'bg-white border-rose-200'}`}>
                    <div className="flex items-center justify-between mb-3 text-xs flex-wrap gap-2">
                      <div className="flex items-center gap-3">
                        <span className="font-extrabold text-slate-900 dark:text-white">TABLE 1: African Fuel Prices (US$)</span>
                        <div className="flex items-center gap-3 text-[11px]">
                          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-rose-300 border border-rose-400" /> 2019</span>
                          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-red-600 border border-red-700" /> 2021</span>
                        </div>
                      </div>
                      <span className="text-[11px] font-mono text-red-600 dark:text-rose-400 font-bold">*Tap any bar to inspect country</span>
                    </div>

                    <div className="w-full overflow-x-auto">
                      <svg viewBox="0 0 650 240" className="w-full min-w-[550px] h-56">
                        {[0, 0.5, 1.0, 1.5].map((val, idx) => {
                          const y = 190 - (val / 1.5) * 160;
                          return (
                            <g key={idx}>
                              <line x1="50" y1={y} x2="620" y2={y} stroke={isDark ? '#38131d' : '#ffe4e6'} strokeDasharray="3 3" />
                              <text x="42" y={y + 4} textAnchor="end" fontSize="10" fill={isDark ? '#94a3b8' : '#64748b'}>${val.toFixed(2)}</text>
                            </g>
                          );
                        })}
                        {[
                          { name: 'South Africa', p19: 1.04, p21: 1.061, rate: 'R15,36 / $' },
                          { name: 'Angola', p19: 0.47, p21: 0.254, rate: '626,41 kwanzas / $' },
                          { name: 'Zimbabwe', p19: 0.80, p21: 1.258, rate: '$1,258 (Highest)' },
                          { name: 'Namibia', p19: 0.88, p21: 0.796, rate: '15,36 NAD / $' },
                          { name: 'Swaziland', p19: 0.86, p21: 0.870, rate: '15,35 SZL / $' },
                          { name: 'Botswana', p19: 0.84, p21: 0.732, rate: '11,14 BWP / $' },
                        ].map((c, i) => {
                          const x = 75 + i * 92;
                          const h19 = (c.p19 / 1.5) * 160;
                          const h21 = (c.p21 / 1.5) * 160;
                          const isSel = selectedCountry === c.name;
                          return (
                            <g key={c.name} onClick={() => setSelectedCountry(c.name)} className="cursor-pointer">
                              <rect x={x - 6} y="15" width="80" height="180" rx="6" fill={isSel ? (isDark ? '#2e1017' : '#fff1f2') : 'transparent'} />
                              <rect x={x} y={190 - h19} width="28" height={h19} fill={isDark ? '#f43f5e' : '#fda4af'} rx="3" />
                              <text x={x + 14} y={185 - h19} textAnchor="middle" fontSize="9" fontWeight="bold" fill={isDark ? '#fda4af' : '#be123c'}>{c.p19}</text>
                              <rect x={x + 32} y={190 - h21} width="28" height={h21} fill="#e11d48" rx="3" />
                              <text x={x + 46} y={185 - h21} textAnchor="middle" fontSize="9" fontWeight="bold" fill="#e11d48">{c.p21}</text>
                              <text x={x + 30} y="210" textAnchor="middle" fontSize="10" fontWeight="bold" fill={isDark ? '#e2e8f0' : '#1e293b'}>{c.name}</text>
                            </g>
                          );
                        })}
                        <line x1="50" y1="190" x2="620" y2="190" stroke={isDark ? '#475569' : '#cbd5e1'} strokeWidth="1.5" />
                      </svg>
                    </div>

                    {selectedCountry && (
                      <div className={`mt-3 p-3 rounded-xl border flex items-center justify-between text-xs ${
                        isDark ? 'bg-[#1f0a0f] border-rose-900/60' : 'bg-rose-50/80 border-rose-200'
                      }`}>
                        <div>
                          <strong className="text-red-600 dark:text-rose-400">{selectedCountry}: </strong>
                          <span className="text-slate-600 dark:text-slate-300">
                            {selectedCountry === 'Zimbabwe' && 'Price rose from $0.80 to $1.258 (+ $0.458 per litre).'}
                            {selectedCountry === 'Botswana' && 'Exchange rate: $1 = 11.14 pulas. (1 pula = $0.0898).'}
                            {selectedCountry === 'Angola' && 'Price dropped from $0.47 to $0.254 (- $0.216/ℓ). Rate: 626.41 kwanzas/$'}
                            {selectedCountry === 'South Africa' && 'Price: $1.04 to $1.061 (+ $0.021). Rate on 01/03/2021: R15.36 per dollar.'}
                            {selectedCountry === 'Namibia' && 'Price decreased from $0.88 to $0.796 (- $0.084). Rate: 15.36 NAD.'}
                            {selectedCountry === 'Swaziland' && 'Price increased from $0.86 to $0.87 (+ $0.010). Rate: 15.35 SZL.'}
                          </span>
                        </div>
                        <button
                          onClick={() => copyResultToClipboard(selectedCountry === 'Zimbabwe' ? '0.458' : selectedCountry === 'Botswana' ? '0.0898' : '15.36')}
                          className="px-2 py-1 rounded-lg bg-red-600 text-white text-[10px] font-bold shrink-0 ml-2"
                        >
                          Use in Calc
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* GRAPH 2: Cooking Energy */}
                {activeGraphId === 'energy' && (
                  <div className={`p-4 rounded-2xl border space-y-3 ${isDark ? 'bg-[#15070a] border-rose-900/60' : 'bg-white border-rose-200'}`}>
                    <div className="flex items-center justify-between text-xs flex-wrap gap-2">
                      <span className="font-extrabold text-slate-900 dark:text-white">GRAPH 1.2: Provincial Energy Sources for Cooking</span>
                      <div className="flex items-center gap-3 text-[11px] font-semibold">
                        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-red-600" /> Electricity</span>
                        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-amber-600" /> Wood</span>
                        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-blue-500" /> Paraffin (R7.65/ℓ)</span>
                        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-emerald-500" /> Gas</span>
                      </div>
                    </div>
                    <div className="space-y-2.5">
                      {[
                        { prov: 'Western Cape', elec: 87.5, wood: 2.1, par: 3.4, gas: 7.0 },
                        { prov: 'Gauteng', elec: 89.2, wood: 1.5, par: 5.1, gas: 4.2 },
                        { prov: 'Free State', elec: 84.1, wood: 7.8, par: 4.3, gas: 3.8 },
                        { prov: 'Eastern Cape', elec: 74.3, wood: 19.5, par: 3.2, gas: 3.0 },
                        { prov: 'Limpopo (Outlier)', elec: 58.4, wood: 36.2, par: 2.1, gas: 3.3 },
                      ].map((item) => (
                        <div key={item.prov} className="space-y-1">
                          <div className="flex justify-between text-xs font-bold">
                            <span>{item.prov}</span>
                            <span className="text-red-600 dark:text-rose-400">{item.elec}% Electricity</span>
                          </div>
                          <div className="h-3.5 w-full rounded-md overflow-hidden flex shadow-xs">
                            <div style={{ width: `${item.elec}%` }} className="bg-red-600 h-full" />
                            <div style={{ width: `${item.wood}%` }} className="bg-amber-600 h-full" />
                            <div style={{ width: `${item.par}%` }} className="bg-blue-500 h-full" />
                            <div style={{ width: `${item.gas}%` }} className="bg-emerald-500 h-full" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* GRAPH 3: Vehicle Finance */}
                {activeGraphId === 'car' && (
                  <div className={`p-4 rounded-2xl border space-y-3 ${isDark ? 'bg-[#15070a] border-rose-900/60' : 'bg-white border-rose-200'}`}>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setActiveFinanceCar('figo')}
                        className={`flex-1 py-1.5 px-3 rounded-xl border text-xs font-extrabold cursor-pointer ${
                          activeFinanceCar === 'figo' ? 'bg-red-600 text-white border-red-600' : 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 text-slate-700'
                        }`}
                      >
                        Ford Figo (72 Mos @ R2 999)
                      </button>
                      <button
                        onClick={() => setActiveFinanceCar('polo')}
                        className={`flex-1 py-1.5 px-3 rounded-xl border text-xs font-extrabold cursor-pointer ${
                          activeFinanceCar === 'polo' ? 'bg-red-600 text-white border-red-600' : 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 text-slate-700'
                        }`}
                      >
                        VW Polo (48 Mos @ R3 345)
                      </button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                      <div className="p-2.5 rounded-xl border border-rose-200 dark:border-rose-950 bg-rose-50/40 dark:bg-rose-950/20">
                        <span className="text-[10px] text-slate-400 block uppercase font-bold">Cash Price</span>
                        <p className="font-mono font-black text-sm mt-0.5">{activeFinanceCar === 'figo' ? 'R215 100' : 'R220 300'}</p>
                      </div>
                      <div className="p-2.5 rounded-xl border border-rose-200 dark:border-rose-950 bg-rose-50/40 dark:bg-rose-950/20">
                        <span className="text-[10px] text-slate-400 block uppercase font-bold">Deposit</span>
                        <p className="font-mono font-black text-sm text-emerald-600 mt-0.5">{activeFinanceCar === 'figo' ? '5% = R10 755' : '0% = R0'}</p>
                      </div>
                      <div className="p-2.5 rounded-xl border border-rose-200 dark:border-rose-950 bg-rose-50/40 dark:bg-rose-950/20">
                        <span className="text-[10px] text-slate-400 block uppercase font-bold">Monthly</span>
                        <p className="font-mono font-black text-sm text-red-600 mt-0.5">{activeFinanceCar === 'figo' ? 'R2 999 × 72' : 'R3 345 × 48'}</p>
                      </div>
                      <div className="p-2.5 rounded-xl border border-rose-200 dark:border-rose-950 bg-rose-50/40 dark:bg-rose-950/20">
                        <span className="text-[10px] text-slate-400 block uppercase font-bold">Residual Balloon</span>
                        <p className="font-mono font-black text-sm text-amber-500 mt-0.5">{activeFinanceCar === 'figo' ? '30% = R64 530' : 'R116 759'}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* GRAPH 4: Stepped Water Tariffs */}
                {activeGraphId === 'water' && (
                  <div className={`p-4 rounded-2xl border space-y-3 ${isDark ? 'bg-[#15070a] border-rose-900/60' : 'bg-white border-rose-200'}`}>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold">Interactive Consumption Slider: <strong>{waterConsumption} kℓ</strong></span>
                      <span className="text-red-600 font-extrabold font-mono">
                        Target 28 kℓ = R485,85 + 15% VAT = <strong>R558,73</strong>
                      </span>
                    </div>

                    <input 
                      type="range" 
                      min="0" 
                      max="50" 
                      value={waterConsumption} 
                      onChange={(e) => setWaterConsumption(Number(e.target.value))}
                      className="w-full accent-red-600 cursor-pointer"
                    />

                    <div className="grid grid-cols-5 gap-1.5 text-xs text-center">
                      {[
                        { block: 'Block 1', range: '0–6 kℓ', rate: 'Free (R0)', active: waterConsumption > 0, vol: Math.min(6, Math.max(0, waterConsumption)), cost: 0 },
                        { block: 'Block 2', range: '>6–15 kℓ', rate: 'R18,45', active: waterConsumption > 6, vol: Math.min(9, Math.max(0, waterConsumption - 6)), cost: Math.min(9, Math.max(0, waterConsumption - 6)) * 18.45 },
                        { block: 'Block 3', range: '>15–30 kℓ', rate: 'R24,60', active: waterConsumption > 15, vol: Math.min(15, Math.max(0, waterConsumption - 15)), cost: Math.min(15, Math.max(0, waterConsumption - 15)) * 24.60 },
                        { block: 'Block 4', range: '>30–45 kℓ', rate: 'R32,80', active: waterConsumption > 30, vol: Math.min(15, Math.max(0, waterConsumption - 30)), cost: Math.min(15, Math.max(0, waterConsumption - 30)) * 32.80 },
                        { block: 'Block 5', range: '>45 kℓ', rate: 'R45,50', active: waterConsumption > 45, vol: Math.max(0, waterConsumption - 45), cost: Math.max(0, waterConsumption - 45) * 45.50 },
                      ].map((b) => (
                        <div key={b.block} className={`p-2 rounded-xl border text-[11px] ${
                          b.active ? 'border-red-500 bg-rose-100/70 dark:bg-rose-950/60 font-bold text-red-700 dark:text-rose-300' : 'border-rose-200 dark:border-rose-950 opacity-50'
                        }`}>
                          <p className="font-bold">{b.block}</p>
                          <p className="font-mono text-[10px]">{b.range}</p>
                          <p className="font-mono text-emerald-600 font-bold text-[10px]">R{b.cost.toFixed(2)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* GRAPH 5: Bedroom Floor Plan */}
                {activeGraphId === 'floor' && (
                  <div className={`p-4 rounded-2xl border space-y-3 ${isDark ? 'bg-[#15070a] border-rose-900/60' : 'bg-white border-rose-200'}`}>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold">Annexure B: Master Bedroom (5,4 m × 4,2 m = 22,68 m²)</span>
                      <span className="text-red-600 font-bold">18 Boxes of Tiles Required</span>
                    </div>

                    <div className="w-full flex justify-center">
                      <svg 
                        viewBox="0 0 540 340" 
                        className={`w-full max-w-md h-56 border rounded-2xl ${
                          isDark ? 'border-rose-900/60 bg-[#140608]' : 'border-rose-300 bg-[#fff5f5]'
                        }`}
                      >
                        {/* Red quad drafting grid */}
                        <g opacity={isDark ? "0.3" : "0.5"}>
                          {[...Array(11)].map((_, i) => (
                            <line key={`v-${i}`} x1={40 + i * 42} y1="30" x2={40 + i * 42} y2="290" stroke={isDark ? '#881337' : '#fecdd3'} strokeDasharray="2 2" />
                          ))}
                          {[...Array(8)].map((_, j) => (
                            <line key={`h-${j}`} x1="40" y1={30 + j * 37} x2="460" y2={30 + j * 37} stroke={isDark ? '#881337' : '#fecdd3'} strokeDasharray="2 2" />
                          ))}
                        </g>

                        {/* Outer Bedroom Wall in light red */}
                        <rect x="40" y="30" width="420" height="260" fill="none" stroke={isDark ? '#f43f5e' : '#e11d48'} strokeWidth="7" rx="2" />
                        <rect x="120" y="27" width="80" height="7" fill={isDark ? '#fb7185' : '#f43f5e'} />
                        <text x="160" y="20" fill={isDark ? '#fda4af' : '#9f1239'} fontSize="9" textAnchor="middle" fontWeight="bold">Window 1 (1,5 m)</text>
                        <rect x="300" y="27" width="80" height="7" fill={isDark ? '#fb7185' : '#f43f5e'} />
                        <text x="340" y="20" fill={isDark ? '#fda4af' : '#9f1239'} fontSize="9" textAnchor="middle" fontWeight="bold">Window 2 (1,5 m)</text>

                        <rect x="80" y="287" width="55" height="7" fill={isDark ? '#4c0519' : '#ffe4e6'} />
                        <path d="M 80 290 A 55 55 0 0 1 135 235" fill="none" stroke={isDark ? '#fb7185' : '#e11d48'} strokeWidth="2" strokeDasharray="3 3" />
                        <line x1="80" y1="290" x2="80" y2="235" stroke={isDark ? '#fb7185' : '#e11d48'} strokeWidth="2.5" />
                        <text x="107" y="310" fill={isDark ? '#fda4af' : '#be123c'} fontSize="9" textAnchor="middle" fontWeight="bold">Door (0,9 m)</text>

                        <text x="250" y="150" fill={isDark ? '#fb7185' : '#e11d48'} fontSize="13" textAnchor="middle" fontWeight="900">MASTER BEDROOM</text>
                        <text x="250" y="170" fill={isDark ? '#f43f5e' : '#9f1239'} fontSize="10" textAnchor="middle" fontWeight="bold">5,4 m × 4,2 m = 22,68 m²</text>
                      </svg>
                    </div>
                  </div>
                )}

                {/* GRAPH 6: Box-and-Whisker Plot */}
                {activeGraphId === 'box' && (
                  <div className={`p-4 rounded-2xl border space-y-3 ${isDark ? 'bg-[#15070a] border-rose-900/60' : 'bg-white border-rose-200'}`}>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-extrabold text-slate-900 dark:text-white">TABLE 5: NSC Grade 12 Pass Rates Box-and-Whisker Plot</span>
                      <span className="text-red-600 font-extrabold font-mono">IQR = 82,0% - 72,2% = <strong>9,8%</strong></span>
                    </div>

                    <div className="w-full overflow-x-auto">
                      <svg viewBox="0 0 560 170" className="w-full min-w-[480px] h-40">
                        {[60, 65, 70, 75, 80, 85, 90].map((tick) => {
                          const x = 40 + ((tick - 60) / 30) * 480;
                          return (
                            <g key={tick}>
                              <line x1={x} y1="110" x2={x} y2="120" stroke={isDark ? '#64748b' : '#94a3b8'} strokeWidth="1.5" />
                              <text x={x} y="135" textAnchor="middle" fontSize="10" fontWeight="bold" fill={isDark ? '#94a3b8' : '#475569'}>{tick}%</text>
                            </g>
                          );
                        })}
                        <line x1="40" y1="115" x2="520" y2="115" stroke={isDark ? '#475569' : '#cbd5e1'} strokeWidth="2" />
                        <line x1="147" y1="60" x2="451" y2="60" stroke="#f43f5e" strokeWidth="3" />
                        <line x1="147" y1="42" x2="147" y2="78" stroke="#f43f5e" strokeWidth="4" />
                        <text x="147" y="35" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#f43f5e">Min: 66,7%</text>

                        <rect x="235" y="34" width="157" height="52" fill={isDark ? '#2e0d14' : '#ffe4e6'} stroke="#e11d48" strokeWidth="2.5" rx="4" />
                        <line x1="309" y1="34" x2="309" y2="86" stroke="#b91c1c" strokeWidth="4" />
                        <text x="309" y="27" textAnchor="middle" fontSize="10" fontWeight="900" fill="#b91c1c">Median: 76,8%</text>

                        <text x="235" y="100" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#e11d48">Q1: 72,2%</text>
                        <text x="392" y="100" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#e11d48">Q3: 82,0%</text>

                        <line x1="451" y1="42" x2="451" y2="78" stroke="#f43f5e" strokeWidth="4" />
                        <text x="451" y="35" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#f43f5e">Max: 85,7%</text>
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 4: DBE FORMULAS & TARIFFS HELPER */}
            {activeTab === 'formulas' && (
              <div className="space-y-4">
                {/* 1. Ratio Simplifier Tool */}
                <div className={`p-4 rounded-2xl border space-y-2.5 ${
                  isDark ? 'bg-[#180a0e] border-rose-950/70' : 'bg-rose-50/40 border-rose-200'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-xs text-red-600 dark:text-rose-400">
                      Interactive Ratio Simplifier (e.g., Ford Figo vs VW Polo 72:48)
                    </span>
                    <span className="text-xs font-mono font-black text-emerald-600">
                      = {ratioResult}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input 
                      type="number" 
                      value={ratioA} 
                      onChange={(e) => { setRatioA(e.target.value); calculateRatio(); }}
                      className="w-24 p-2 rounded-xl border text-xs font-mono font-bold text-center border-rose-200 dark:border-rose-900 dark:bg-[#15070a]"
                      placeholder="72"
                    />
                    <span className="font-bold">:</span>
                    <input 
                      type="number" 
                      value={ratioB} 
                      onChange={(e) => { setRatioB(e.target.value); calculateRatio(); }}
                      className="w-24 p-2 rounded-xl border text-xs font-mono font-bold text-center border-rose-200 dark:border-rose-900 dark:bg-[#15070a]"
                      placeholder="48"
                    />
                    <button 
                      onClick={calculateRatio}
                      className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white text-xs font-bold cursor-pointer hover:from-red-500"
                    >
                      Simplify Ratio
                    </button>
                  </div>
                </div>

                {/* 2. Compound Interest Multi-Year Helper */}
                <div className={`p-4 rounded-2xl border space-y-2.5 ${
                  isDark ? 'bg-[#180a0e] border-rose-950/70' : 'bg-rose-50/40 border-rose-200'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-xs text-red-600 dark:text-rose-400">
                      Multi-Year Compound Interest Calculator (Mrs Smith R60k Investment)
                    </span>
                    <span className="text-xs font-mono font-black text-emerald-600">
                      Final Value: {ciResult}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div>
                      <label className="text-[10px] text-slate-400 block mb-0.5">Principal (P)</label>
                      <input 
                        type="number" 
                        value={ciP} 
                        onChange={(e) => setCiP(e.target.value)}
                        className="w-full p-2 rounded-xl border font-mono border-rose-200 dark:border-rose-900 dark:bg-[#15070a]"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 block mb-0.5">Year 1 Rate (%)</label>
                      <input 
                        type="number" 
                        step="0.1" 
                        value={ciRate1} 
                        onChange={(e) => setCiRate1(e.target.value)}
                        className="w-full p-2 rounded-xl border font-mono border-rose-200 dark:border-rose-900 dark:bg-[#15070a]"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 block mb-0.5">Year 2 Rate (%)</label>
                      <input 
                        type="number" 
                        step="0.1" 
                        value={ciRate2} 
                        onChange={(e) => setCiRate2(e.target.value)}
                        className="w-full p-2 rounded-xl border font-mono border-rose-200 dark:border-rose-900 dark:bg-[#15070a]"
                      />
                    </div>
                  </div>
                  <button 
                    onClick={calculateCompoundInterest}
                    className="w-full py-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white text-xs font-bold cursor-pointer hover:from-red-500 shadow-xs"
                  >
                    Calculate Compound Growth
                  </button>
                </div>

                {/* 3. DBE Formula Sheet */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className={`p-3.5 rounded-2xl border ${isDark ? 'bg-[#15070a] border-rose-950' : 'bg-white border-rose-200'}`}>
                    <h5 className="font-extrabold text-red-600 dark:text-rose-400 mb-1">Financial Formulas</h5>
                    <ul className="space-y-1 font-mono text-[11px] text-slate-600 dark:text-slate-300">
                      <li>• Simple Interest: A = P(1 + in)</li>
                      <li>• Compound Interest: A = P(1 + i)ⁿ</li>
                      <li>• VAT Amount = Incl × (15 ÷ 115)</li>
                      <li>• % Change = ((New - Old) ÷ Old) × 100%</li>
                    </ul>
                  </div>

                  <div className={`p-3.5 rounded-2xl border ${isDark ? 'bg-[#15070a] border-rose-950' : 'bg-white border-rose-200'}`}>
                    <h5 className="font-extrabold text-red-600 dark:text-rose-400 mb-1">Measurement & Area</h5>
                    <ul className="space-y-1 font-mono text-[11px] text-slate-600 dark:text-slate-300">
                      <li>• Area (Rectangle) = L × W</li>
                      <li>• Perimeter = 2(L + W)</li>
                      <li>• Net Wall Area = Total Wall - (Windows + Door)</li>
                      <li>• Tiles Required = Area ÷ Box Area (+ 10%)</li>
                    </ul>
                  </div>

                  <div className={`p-3.5 rounded-2xl border sm:col-span-2 ${isDark ? 'bg-[#15070a] border-rose-950' : 'bg-white border-rose-200'}`}>
                    <h5 className="font-extrabold text-red-600 dark:text-rose-400 mb-1">Data Handling & 5-Number Summary</h5>
                    <p className="text-[11px] font-mono text-slate-600 dark:text-slate-300">
                      • IQR = Q₃ - Q₁ | Range = Max - Min | Median = (n + 1) ÷ 2 position
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Bar */}
          <div className={`p-3.5 border-t flex items-center justify-between text-xs shrink-0 ${
            isDark ? 'bg-[#180a0e] border-rose-950/80 text-slate-400' : 'bg-rose-50/40 border-rose-200 text-slate-600'
          }`}>
            <span className="flex items-center gap-1.5 text-[11px]">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>DBE NSC Grade 12 Math Scratchpad & Visualizer</span>
            </span>

            <button
              onClick={onClose}
              className={`px-4 py-1.5 rounded-xl border text-xs font-bold transition-colors cursor-pointer ${
                isDark ? 'border-rose-950 hover:bg-rose-950/60 text-white' : 'border-rose-200 hover:bg-rose-100 text-slate-800'
              }`}
            >
              Done & Return to Exam
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
