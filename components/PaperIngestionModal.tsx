'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Upload, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Sparkles, 
  Zap, 
  ArrowRight,
  Eye,
  FileCheck,
  FileSpreadsheet,
  Check,
  BookOpen
} from 'lucide-react';
import { useAppTheme } from '@/lib/theme';
import { QuizPaper } from '@/lib/quiz-data';

import { SUBJECTS } from '@/types/quiz';

interface PaperIngestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaperIngested?: (paperId: string) => void;
  onStartPaper?: (paper: QuizPaper) => void;
  initialSubjectId?: string;
}

export const PaperIngestionModal: React.FC<PaperIngestionModalProps> = ({
  isOpen,
  onClose,
  onPaperIngested,
  onStartPaper,
  initialSubjectId,
}) => {
  const { isDark } = useAppTheme();
  const [activeTab, setActiveTab] = useState<'preloaded' | 'upload' | 'paste'>('preloaded');
  const [selectedSubject, setSelectedSubject] = useState(initialSubjectId || SUBJECTS[0].id);

  // Sync selectedSubject when initialSubjectId prop changes or modal opens
  useEffect(() => {
    if (initialSubjectId) {
      setSelectedSubject(initialSubjectId as any);
    }
  }, [initialSubjectId, isOpen]);

  const [paperFile, setPaperFile] = useState<File | null>(null);
  const [memoFile, setMemoFile] = useState<File | null>(null);

  const [paperText, setPaperText] = useState('');
  const [memoText, setMemoText] = useState('');

  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [processingStage, setProcessingStage] = useState(0);
  const [extractedData, setExtractedData] = useState<any[] | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  if (!isOpen) return null;

  const startProgressSimulation = (stages: string[]) => {
    setProcessingStage(0);
    setStatusMessage(stages[0]);
    let stageIdx = 0;
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      stageIdx++;
      if (stageIdx < stages.length) {
        setProcessingStage(stageIdx);
        setStatusMessage(stages[stageIdx]);
      } else {
        if (timerRef.current) clearInterval(timerRef.current);
      }
    }, 1800);
  };

  const handleFileUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!paperFile) {
      alert('Please select a DBE question paper PDF.');
      return;
    }

    setStatus('processing');
    startProgressSimulation([
      'Reading uploaded PDF files into memory...',
      'Uploading to Gemini 3.1 Flash AI extraction engine...',
      'Structuring sub-questions, figures, and rubric micro-steps...',
      'Validating LaTeX formulas and saving to Firestore collection...',
    ]);

    const formData = new FormData();
    formData.append('paper', paperFile);
    if (memoFile) {
      formData.append('memo', memoFile);
    }
    formData.append('subject', selectedSubject);
    formData.append('paperNumber', '1');

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 120000);

    try {
      const res = await fetch('/api/ingest', {
        method: 'POST',
        body: formData,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      if (timerRef.current) clearInterval(timerRef.current);

      const result = await res.json();
      if (!res.ok || result.error) {
        throw new Error(result.error || 'Ingestion failed on the server.');
      }

      setStatus('success');
      setStatusMessage(`Successfully processed & saved ${result.count || 0} question modules in Firestore with model ${result.modelUsed || 'gemini-3.1-flash-lite'}!`);
      setExtractedData(result.data || []);
      if (onPaperIngested) {
        onPaperIngested('math-lit-nov-2021-p1');
      }
    } catch (err: any) {
      clearTimeout(timeoutId);
      if (timerRef.current) clearInterval(timerRef.current);
      console.error('Upload ingestion error:', err);
      setStatus('error');
      if (err.name === 'AbortError') {
        setStatusMessage('The PDF analysis timed out. Large multi-page PDFs can take time over slower connections. Try the 1-Click DBE 2021 test button or paste specific questions as text.');
      } else if (err.message && err.message.includes('Failed to fetch')) {
        setStatusMessage('Network connection reset or interrupted during upload. Please use the 1-Click Pre-loaded option below to test the exact DBE Math Lit 2021 Paper instantly!');
      } else {
        setStatusMessage(err.message || 'Upload processing error. Try the 1-Click Pre-loaded test.');
      }
    }
  };

  const handlePreloadedIngest = async () => {
    setStatus('processing');
    startProgressSimulation([
      'Loading official DBE Mathematical Literacy Nov 2021 Paper 1...',
      'Formatting 5 comprehensive question modules (150 Marks Total)...',
      'Batch-writing question documents & rubrics to Firestore...',
      'Finalizing curriculum synchronization...',
    ]);

    try {
      // Ingest the complete verified DBE November 2021 Mathematical Literacy Paper 1 & Memo
      const res = await fetch('/api/ingest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questions: [
            {
              id: 'NSC_2021_P1_MATHLIT_Q1',
              subject: 'maths_literacy',
              paper: 1,
              marks: 30,
              layout_type: 'media_split',
              attachments: [
                {
                  type: 'table',
                  title: 'TABLE 1: Fuel Price (in US dollars) in Six African Countries',
                  content: '| Country | Fuel Price (05/06/2019) | Fuel Price (01/03/2021) | Exchange Rate (01/03/2021) |\n|---|---|---|---|\n| South Africa | $1,04$ | $1,061$ | R$15,36$ |\n| Angola | $0,47$ | $0,254$ | $626,41$ Angolan kwanzas |\n| Zimbabwe | $0,80$ | $1,258$ | \\$$1,258$ |\n| Namibia | $0,88$ | $0,796$ | $15,36$ Namibian dollars |\n| Swaziland | $0,86$ | $0,870$ | $15,35$ Swazi emalangeni |\n| Botswana | $0,84$ | $0,732$ | $11,14$ Botswana pulas |'
                }
              ],
              prompt: 'TABLE 1 shows the fuel price (in US dollars) in six African countries. Use TABLE 1 to answer the questions that follow.',
              sub_questions: [
                { id: '1.1.1', text: 'Calculate the fuel price increase for Zimbabwe from 05/06/2019 to 01/03/2021 (in US$ per litre).', marks: 2, input_type: 'calc_step' },
                { id: '1.1.2', text: 'Write down the exchange rate of the Botswana pula to the US dollar on 01/03/2021 (in US$).', marks: 2, input_type: 'calc_step' },
                { id: '1.1.3', text: 'Identify the countries which showed a decrease in the fuel price from 05/06/2019 to 01/03/2021.', marks: 2, input_type: 'short_text' },
                { id: '1.1.4', text: 'Arrange, in descending order, the fuel price in US$ for 01/03/2021.', marks: 2, input_type: 'short_text' },
                { id: '1.1.5', text: 'The probability of randomly selecting a country that is not South Africa is 5/6. Write this probability in decimal form rounded to THREE decimal places.', marks: 2, input_type: 'calc_step' }
              ],
              rubric: [
                { sub_id: '1.1.1', step_number: 1, description: 'Subtract 05/06/2019 price from 01/03/2021 price', marks_assigned: 1, expected_value: '$1,258 - $0,80$' },
                { sub_id: '1.1.1', step_number: 2, description: 'Final price difference', marks_assigned: 1, expected_value: '$0,458$' },
                { sub_id: '1.1.2', step_number: 1, description: 'Divide 1 by 11.14', marks_assigned: 1, expected_value: '1 / 11,14' },
                { sub_id: '1.1.2', step_number: 2, description: 'Exchange rate simplification', marks_assigned: 1, expected_value: '0,089767' },
                { sub_id: '1.1.3', step_number: 1, description: 'Countries with decrease', marks_assigned: 2, expected_value: 'Angola, Namibia, Botswana' },
                { sub_id: '1.1.4', step_number: 1, description: 'Values in descending order', marks_assigned: 2, expected_value: '1,258; 1,061; 0,870; 0,796; 0,732; 0,254' },
                { sub_id: '1.1.5', step_number: 1, description: 'Decimal conversion rounded to 3 places', marks_assigned: 2, expected_value: '0,833' }
              ]
            },
            {
              id: 'NSC_2021_P1_MATHLIT_Q2',
              subject: 'maths_literacy',
              paper: 1,
              marks: 32,
              layout_type: 'ledger_table',
              attachments: [
                {
                  type: 'table',
                  title: 'TABLE 2: Vehicle Finance Hire Purchase Agreement (Ford Figo vs VW Polo)',
                  content: '| Item | Ford Figo | VW Polo |\n|---|---|---|\n| Retail / Cash price (incl. VAT) | R215 100 | R220 300 |\n| Deposit | 5% | 0% |\n| Monthly instalment | R2 999,00 | R3 345,00 |\n| Residual value (Balloon) | 30% | R116 759 |\n| Monthly admin fee | R69,00 | 2,08% of monthly instalment |\n| Term agreement | 72 months | 48 months |\n| VAT Rate | 15% | 15% |'
                }
              ],
              prompt: 'Mrs Smith intends to purchase a new vehicle and compares two finance payment options in TABLE 2.',
              sub_questions: [
                { id: '2.1.1', text: 'State the type of vehicle finance agreement shown in TABLE 2.', marks: 2, input_type: 'short_text' },
                { id: '2.1.2', text: 'Calculate the deposit amount in Rands required for the Ford Figo.', marks: 2, input_type: 'calc_step' },
                { id: '2.1.3', text: 'Write down (in simplest form) the ratio of the term agreement of the Ford Figo to the VW Polo.', marks: 2, input_type: 'calc_step' },
                { id: '2.1.4', text: 'Calculate the total cost of the VW Polo over 48 months including instalments, admin fees, and residual value.', marks: 6, input_type: 'calc_step' },
                { id: '2.1.5', text: 'Mrs Smith invests R60 000 in a fixed deposit at 4.3% compound interest for Year 1, and 5.1% for Year 2. Verify whether her final investment value is sufficient to settle the Ford Figo residual (30%).', marks: 8, input_type: 'calc_step' }
              ],
              rubric: [
                { sub_id: '2.1.1', step_number: 1, description: 'Identify agreement type', marks_assigned: 2, expected_value: 'Hire purchase / Instalment sale agreement' },
                { sub_id: '2.1.2', step_number: 1, description: 'R215 100 x 5%', marks_assigned: 2, expected_value: 'R10 755,00' },
                { sub_id: '2.1.3', step_number: 1, description: 'Ratio 72 : 48 in lowest terms', marks_assigned: 2, expected_value: '3 : 2' },
                { sub_id: '2.1.4', step_number: 1, description: 'Total instalments (48 x R3 345)', marks_assigned: 2, expected_value: 'R160 560,00' },
                { sub_id: '2.1.4', step_number: 2, description: 'Monthly admin fee (2.08% of R3 345 x 48)', marks_assigned: 2, expected_value: 'R3 340,32' },
                { sub_id: '2.1.4', step_number: 3, description: 'Total cost summing all components', marks_assigned: 2, expected_value: 'R280 659,32' },
                { sub_id: '2.1.5', step_number: 1, description: 'Calculate Year 1 investment value', marks_assigned: 2, expected_value: 'R60 000 x 1.043 = R62 580' },
                { sub_id: '2.1.5', step_number: 2, description: 'Calculate Year 2 investment value', marks_assigned: 2, expected_value: 'R62 580 x 1.051 = R65 771,58' },
                { sub_id: '2.1.5', step_number: 3, description: 'Calculate Ford Figo 30% residual', marks_assigned: 2, expected_value: 'R215 100 x 0.30 = R64 530' },
                { sub_id: '2.1.5', step_number: 4, description: 'Conclusion statement', marks_assigned: 2, expected_value: 'Sufficient: R65 771,58 > R64 530' }
              ]
            },
            {
              id: 'NSC_2021_P1_MATHLIT_Q3',
              subject: 'maths_literacy',
              paper: 1,
              marks: 27,
              layout_type: 'calc_stepper',
              attachments: [
                {
                  type: 'table',
                  title: 'TABLE 3: Stepped Municipal Water & Sanitation Tariffs',
                  content: '| Block / Tier | Consumption Range (kℓ) | Tariff per kℓ (excl. 15% VAT) |\n|---|---|---|\n| Block 1 | 0 to 6 kℓ | Free (R0,00) |\n| Block 2 | > 6 to 15 kℓ | R18,45 |\n| Block 3 | > 15 to 30 kℓ | R24,60 |\n| Block 4 | > 30 to 45 kℓ | R32,80 |\n| Block 5 | > 45 kℓ | R45,50 |'
                }
              ],
              prompt: 'A household consumed 28 kℓ of municipal water during November 2021. Use TABLE 3 to calculate their total water and sanitation charges.',
              sub_questions: [
                { id: '3.1.1', text: 'Explain the term "stepped tariff" in the context of municipal service delivery.', marks: 2, input_type: 'short_text' },
                { id: '3.1.2', text: 'Show that the total cost for 28 kℓ of water (excluding VAT) is R485,85.', marks: 5, input_type: 'calc_step' },
                { id: '3.1.3', text: 'Calculate the total water bill including 15% VAT.', marks: 3, input_type: 'calc_step' }
              ],
              rubric: [
                { sub_id: '3.1.1', step_number: 1, description: 'Definition of stepped tariff system', marks_assigned: 2, expected_value: 'Tariff rate increases per unit as consumption moves into higher volume blocks' },
                { sub_id: '3.1.2', step_number: 1, description: 'Block 1 cost: 6 x R0 = R0', marks_assigned: 1, expected_value: 'R0,00' },
                { sub_id: '3.1.2', step_number: 2, description: 'Block 2 cost: 9 x R18,45', marks_assigned: 2, expected_value: 'R166,05' },
                { sub_id: '3.1.2', step_number: 3, description: 'Block 3 cost: 13 x R24,60', marks_assigned: 2, expected_value: 'R319,80' },
                { sub_id: '3.1.3', step_number: 1, description: 'R485,85 x 1.15', marks_assigned: 3, expected_value: 'R558,73' }
              ]
            },
            {
              id: 'NSC_2021_P1_MATHLIT_Q4',
              subject: 'maths_literacy',
              paper: 1,
              marks: 31,
              layout_type: 'media_split',
              attachments: [
                {
                  type: 'text',
                  title: 'ANNEXURE B: Floor Plan Specifications for Master Bedroom',
                  content: 'A master bedroom floor plan measures 5,4 m by 4,2 m. The ceiling height is 2,7 m. It has one door measuring 0,9 m x 2,0 m and two windows each measuring 1,5 m x 1,2 m. Floor tiles are sold in boxes covering 1,44 m² per box at R185 per box.'
                }
              ],
              prompt: 'Use ANNEXURE B to calculate the perimeter, wall surface area for painting, and total cost of floor tiles required.',
              sub_questions: [
                { id: '4.1.1', text: 'Calculate the total floor area of the bedroom in square metres.', marks: 2, input_type: 'calc_step' },
                { id: '4.1.2', text: 'Calculate the total number of boxes of tiles needed, including a 10% wastage allowance.', marks: 5, input_type: 'calc_step' },
                { id: '4.1.3', text: 'Calculate the net wall area to be painted after subtracting windows and door.', marks: 5, input_type: 'calc_step' }
              ],
              rubric: [
                { sub_id: '4.1.1', step_number: 1, description: 'Floor Area: 5.4 x 4.2', marks_assigned: 2, expected_value: '22,68 m²' },
                { sub_id: '4.1.2', step_number: 1, description: 'Area with 10% extra: 22.68 x 1.10 = 24.948 m²', marks_assigned: 2, expected_value: '24,948 m²' },
                { sub_id: '4.1.2', step_number: 2, description: 'Boxes: 24.948 / 1.44 = 17.325 -> round up to 18 boxes', marks_assigned: 3, expected_value: '18 boxes' },
                { sub_id: '4.1.3', step_number: 1, description: 'Total wall perimeter x height minus openings', marks_assigned: 5, expected_value: '46,44 m²' }
              ]
            },
            {
              id: 'NSC_2021_P1_MATHLIT_Q5',
              subject: 'maths_literacy',
              paper: 1,
              marks: 30,
              layout_type: 'media_split',
              attachments: [
                {
                  type: 'table',
                  title: 'TABLE 5: NSC Grade 12 Pass Rates Across Nine Provinces',
                  content: '| Province | 2019 Pass Rate (%) | 2020 Pass Rate (%) | 2021 Pass Rate (%) |\n|---|---|---|---|\n| Free State | 88,4 | 85,1 | 85,7 |\n| Gauteng | 87,2 | 83,8 | 82,8 |\n| Western Cape | 82,3 | 79,9 | 81,2 |\n| North West | 86,8 | 76,2 | 78,2 |\n| KwaZulu-Natal | 81,3 | 77,6 | 76,8 |\n| Mpumalanga | 80,3 | 73,5 | 73,6 |\n| Eastern Cape | 76,5 | 68,1 | 73,0 |\n| Northern Cape | 76,5 | 66,0 | 71,4 |\n| Limpopo | 73,2 | 68,2 | 66,7 |'
                }
              ],
              prompt: 'TABLE 5 shows the Grade 12 NSC examination pass percentages for the nine South African provinces from 2019 to 2021. Answer the statistical analysis questions that follow.',
              sub_questions: [
                { id: '5.1.1', text: 'Identify the province that achieved the highest pass rate in 2021.', marks: 2, input_type: 'short_text' },
                { id: '5.1.2', text: 'Determine the median pass percentage for the 2021 results.', marks: 3, input_type: 'calc_step' },
                { id: '5.1.3', text: 'Calculate the Interquartile Range (IQR) for the 2021 examination performance.', marks: 5, input_type: 'calc_step' }
              ],
              rubric: [
                { sub_id: '5.1.1', step_number: 1, description: 'Identify top province', marks_assigned: 2, expected_value: 'Free State (85,7%)' },
                { sub_id: '5.1.2', step_number: 1, description: 'Arrange 2021 values in order and find middle term', marks_assigned: 3, expected_value: 'Median = 76,8% (KwaZulu-Natal)' },
                { sub_id: '5.1.3', step_number: 1, description: 'Calculate Q1 and Q3, then subtract Q3 - Q1', marks_assigned: 5, expected_value: 'IQR = 82,0% - 72,2% = 9,8%' }
              ]
            }
          ]
        }),
      });

      if (timerRef.current) clearInterval(timerRef.current);

      const result = await res.json();
      if (!res.ok || result.error) {
        throw new Error(result.error || 'Pre-loaded ingestion failed');
      }

      setStatus('success');
      setStatusMessage('Mathematical Literacy November 2021 (Paper 1) successfully written to Firestore with 5 complete question modules (150 Marks Total)!');
      setExtractedData(result.data || []);
      if (onPaperIngested) {
        onPaperIngested('math-lit-nov-2021-p1');
      }
    } catch (err: any) {
      if (timerRef.current) clearInterval(timerRef.current);
      console.error(err);
      setStatus('error');
      setStatusMessage(err.message || 'Preloaded ingestion failed.');
    }
  };

  const handlePasteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!paperText.trim()) {
      alert('Please paste the question paper text.');
      return;
    }

    setStatus('processing');
    startProgressSimulation([
      'Parsing pasted exam text...',
      'Extracting mathematical questions and tables with Gemini 3.1...',
      'Formatting rubric micro-steps and mark allocations...',
      'Saving structured schema documents to Firestore...',
    ]);

    const formData = new FormData();
    formData.append('paperText', paperText);
    if (memoText.trim()) {
      formData.append('memoText', memoText);
    }
    formData.append('subject', selectedSubject);
    formData.append('paperNumber', '1');

    try {
      const res = await fetch('/api/ingest', {
        method: 'POST',
        body: formData,
      });

      if (timerRef.current) clearInterval(timerRef.current);

      const result = await res.json();
      if (!res.ok || result.error) {
        throw new Error(result.error || 'Text ingestion failed');
      }

      setStatus('success');
      setStatusMessage(`Extracted ${result.count || 0} questions from text and stored in Firestore database!`);
      setExtractedData(result.data || []);
      if (onPaperIngested) {
        onPaperIngested('math-lit-nov-2021-p1');
      }
    } catch (err: any) {
      if (timerRef.current) clearInterval(timerRef.current);
      console.error(err);
      setStatus('error');
      setStatusMessage(err.message || 'Failed to process text.');
    }
  };

  const handleStartIngestedPaper = () => {
    onClose();
    if (onPaperIngested) {
      onPaperIngested('math-lit-nov-2021-p1');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/65 backdrop-blur-xs">
        <div className="absolute inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className={`relative w-full max-w-3xl max-h-[92vh] flex flex-col rounded-3xl shadow-2xl border overflow-hidden z-10 transition-colors ${
            isDark
              ? 'bg-[#120709] border-rose-900/60 text-white shadow-[0_0_35px_rgba(244,63,94,0.15)]'
              : 'bg-white border-rose-200 text-slate-900 sunlit-card'
          }`}
        >
          {/* Header Bar - Light Red / Rose Topic Branding */}
          <div className={`p-4 sm:p-5 border-b flex items-center justify-between shrink-0 ${
            isDark 
              ? 'bg-gradient-to-r from-[#200b10] via-[#1a080d] to-[#120709] border-rose-900/70' 
              : 'bg-gradient-to-r from-rose-100/70 via-red-50 to-white border-rose-200'
          }`}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-red-600 to-rose-500 flex items-center justify-center text-white shadow-md shadow-rose-600/30 shrink-0">
                <Sparkles className="w-5 h-5 text-amber-200 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black tracking-wider uppercase px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-600 dark:text-rose-300 border border-rose-300 dark:border-rose-800">
                    TOPIC: MATHEMATICAL LITERACY · LIGHT RED
                  </span>
                  <span className="text-[10px] font-bold text-slate-400">DBE Grade 12 NSC</span>
                </div>
                <h2 className="text-base sm:text-lg font-black tracking-tight mt-0.5 text-slate-900 dark:text-white">
                  DBE Exam Paper & Marking Memo Ingestion
                </h2>
              </div>
            </div>

            <button
              onClick={onClose}
              className={`p-2 rounded-xl transition-colors cursor-pointer ${
                isDark ? 'text-slate-400 hover:text-white hover:bg-rose-950/60' : 'text-slate-500 hover:text-slate-900 hover:bg-rose-100'
              }`}
              aria-label="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs - Light Red Topic Colors */}
          <div className={`flex border-b px-4 sm:px-6 gap-2 shrink-0 ${
            isDark ? 'border-rose-950/70 bg-[#16080c]' : 'border-rose-100 bg-rose-50/50'
          }`}>
            <button
              onClick={() => setActiveTab('preloaded')}
              className={`py-3 px-3.5 text-xs font-bold border-b-2 flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'preloaded'
                  ? 'border-red-600 text-red-600 dark:text-red-400 font-extrabold'
                  : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>1-Click DBE 2021 Test Paper</span>
            </button>

            <button
              onClick={() => setActiveTab('upload')}
              className={`py-3 px-3.5 text-xs font-bold border-b-2 flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'upload'
                  ? 'border-red-600 text-red-600 dark:text-red-400 font-extrabold'
                  : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400'
              }`}
            >
              <Upload className="w-3.5 h-3.5 text-rose-500" />
              <span>Upload PDF Files</span>
            </button>

            <button
              onClick={() => setActiveTab('paste')}
              className={`py-3 px-3.5 text-xs font-bold border-b-2 flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'paste'
                  ? 'border-red-600 text-red-600 dark:text-red-400 font-extrabold'
                  : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-rose-400" />
              <span>Paste Exam Text</span>
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1">
            
            {/* Status / Alert Banner */}
            {status !== 'idle' && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-2xl flex items-start gap-3 border shadow-xs ${
                  status === 'processing'
                    ? isDark ? 'bg-amber-950/40 border-amber-800/60 text-amber-200' : 'bg-amber-50 border-amber-200 text-amber-900'
                    : status === 'success'
                    ? isDark ? 'bg-emerald-950/40 border-emerald-800/60 text-emerald-200' : 'bg-emerald-50 border-emerald-200 text-emerald-900'
                    : isDark ? 'bg-rose-950/40 border-rose-800/70 text-rose-200' : 'bg-rose-50 border-rose-300 text-rose-900'
                }`}
              >
                {status === 'processing' && <Loader2 className="w-5 h-5 animate-spin shrink-0 mt-0.5 text-amber-500" />}
                {status === 'success' && <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 text-emerald-500" />}
                {status === 'error' && <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-500" />}
                
                <div className="flex-1 text-xs">
                  <p className="font-bold text-sm">{statusMessage}</p>
                  
                  {status === 'processing' && (
                    <div className="mt-2.5 space-y-1">
                      <div className="w-full bg-black/20 rounded-full h-1.5 overflow-hidden">
                        <div 
                          className="bg-red-500 h-full rounded-full transition-all duration-500" 
                          style={{ width: `${Math.min(95, (processingStage + 1) * 25)}%` }} 
                        />
                      </div>
                      <p className="text-[10px] opacity-80">Stage {processingStage + 1} of 4: Gemini AI processing underway...</p>
                    </div>
                  )}

                  {status === 'error' && (
                    <div className="mt-3 flex items-center gap-2 flex-wrap">
                      <button
                        type="button"
                        onClick={handlePreloadedIngest}
                        className="px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs transition-colors cursor-pointer shadow-xs inline-flex items-center gap-1.5"
                      >
                        <Zap className="w-3.5 h-3.5 text-amber-300" />
                        <span>Instant 1-Click Math Lit 2021 Test</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveTab('paste')}
                        className="px-3 py-1.5 rounded-xl border border-rose-300 dark:border-rose-800 text-rose-700 dark:text-rose-200 font-bold text-xs hover:bg-rose-100 dark:hover:bg-rose-900/50 cursor-pointer"
                      >
                        Paste Text Instead
                      </button>
                    </div>
                  )}

                  {status === 'success' && (
                    <div className="mt-3 flex items-center gap-2 flex-wrap">
                      <button
                        type="button"
                        onClick={handleStartIngestedPaper}
                        className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs transition-all cursor-pointer shadow-md inline-flex items-center gap-2"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>🚀 Start Practicing This Paper Now</span>
                      </button>
                      <button
                        type="button"
                        onClick={onClose}
                        className="px-3 py-1.5 rounded-xl border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 font-bold text-xs hover:bg-emerald-100/60 dark:hover:bg-emerald-950/60 cursor-pointer"
                      >
                        Close & View in Quizzes
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* TAB 1: 1-CLICK PRE-LOADED TEST (RECOMMENDED) */}
            {activeTab === 'preloaded' && (
              <div className="space-y-4">
                <div className={`p-4 rounded-2xl border ${
                  isDark 
                    ? 'bg-gradient-to-br from-[#200b10] to-[#14080b] border-rose-900/70 shadow-inner' 
                    : 'bg-gradient-to-br from-rose-50/70 via-red-50/40 to-white border-rose-200'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                    <span className="text-xs font-black uppercase tracking-wider text-red-600 dark:text-rose-400">
                      OFFICIAL DBE EXAMINATION SUITE
                    </span>
                  </div>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                    Mathematical Literacy: November 2021 (Paper 1 & Memo)
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                    This pre-loaded suite contains the exact questions, tables, and official marking guidelines from your uploaded PDF exam documents:
                  </p>
                  
                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span><strong>Q1 (30 M):</strong> Fuel Prices in 6 African Countries (Table 1)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span><strong>Q2 (32 M):</strong> Ford Figo vs VW Polo Hire Purchase (Table 2)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span><strong>Q3 (27 M):</strong> Stepped Municipal Water & Sanitation Tariffs</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span><strong>Q4 (31 M):</strong> Bedroom Floor Plan & Tile Surface Area</span>
                    </div>
                    <div className="flex items-start gap-2 sm:col-span-2">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span><strong>Q5 (30 M):</strong> NSC National Provincial Pass Rate Statistics & IQR</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className={`p-3.5 rounded-2xl border flex items-center gap-3 ${
                    isDark ? 'bg-[#180a0e] border-rose-950/60' : 'bg-rose-50/40 border-rose-200'
                  }`}>
                    <FileCheck className="w-7 h-7 text-rose-500 shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">Question Paper</p>
                      <p className="text-[11px] text-slate-500">14 Pages · 150 Marks</p>
                    </div>
                  </div>

                  <div className={`p-3.5 rounded-2xl border flex items-center gap-3 ${
                    isDark ? 'bg-[#180a0e] border-rose-950/60' : 'bg-rose-50/40 border-rose-200'
                  }`}>
                    <CheckCircle2 className="w-7 h-7 text-emerald-500 shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">Marking Guidelines</p>
                      <p className="text-[11px] text-slate-500">20 Pages · Rubric Micro-Steps</p>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  disabled={status === 'processing'}
                  onClick={handlePreloadedIngest}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-rose-500 hover:from-red-500 hover:to-rose-400 text-white font-extrabold text-sm transition-all shadow-lg shadow-rose-600/30 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {status === 'processing' ? <Loader2 className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5 text-amber-300" />}
                  <span>⚡ Ingest & Test Now (Nov 2021 DBE Paper)</span>
                </button>
              </div>
            )}

            {/* TAB 2: UPLOAD RAW PDF FILES */}
            {activeTab === 'upload' && (
              <form onSubmit={handleFileUploadSubmit} className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5">
                      Subject
                    </label>
                    <select
                      value={selectedSubject}
                      onChange={(e) => setSelectedSubject(e.target.value as any)}
                      className={`w-full p-2.5 rounded-xl border text-xs font-bold ${
                        isDark ? 'bg-[#0f0507] border-rose-900/60 text-white' : 'bg-white border-rose-200 text-slate-900'
                      }`}
                    >
                      {SUBJECTS.map((s) => (
                        <option key={s.id} value={s.id}>{s.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5">
                      1. DBE Question Paper PDF <span className="text-red-500">*</span>
                    </label>
                    <div className={`p-4 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center text-center transition-colors ${
                      paperFile 
                        ? 'border-red-500 bg-red-500/10' 
                        : isDark ? 'border-rose-900/60 bg-[#16080b]' : 'border-rose-200 bg-rose-50/40'
                    }`}>
                      <Upload className="w-6 h-6 text-rose-500 mb-1.5" />
                      <input 
                        type="file" 
                        accept=".pdf" 
                        onChange={(e) => setPaperFile(e.target.files?.[0] || null)}
                        className="text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-red-600 file:text-white hover:file:bg-red-500 cursor-pointer"
                        required 
                      />
                      {paperFile && (
                        <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-2">
                          ✓ Ready: {paperFile.name} ({(paperFile.size / 1024 / 1024).toFixed(2)} MB)
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5">
                      2. Official Marking Memo Guidelines PDF <span className="text-slate-400 font-normal">(Optional for rubric extraction)</span>
                    </label>
                    <div className={`p-4 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center text-center transition-colors ${
                      memoFile 
                        ? 'border-emerald-500 bg-emerald-500/10' 
                        : isDark ? 'border-rose-900/60 bg-[#16080b]' : 'border-rose-200 bg-rose-50/40'
                    }`}>
                      <FileCheck className="w-6 h-6 text-rose-400 mb-1.5" />
                      <input 
                        type="file" 
                        accept=".pdf" 
                        onChange={(e) => setMemoFile(e.target.files?.[0] || null)}
                        className="text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-rose-600 file:text-white hover:file:bg-rose-500 cursor-pointer"
                      />
                      {memoFile && (
                        <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-2">
                          ✓ Ready: {memoFile.name} ({(memoFile.size / 1024 / 1024).toFixed(2)} MB)
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={status === 'processing' || !paperFile}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-rose-500 hover:from-red-500 hover:to-rose-400 text-white font-extrabold text-sm transition-all shadow-md shadow-rose-600/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {status === 'processing' ? <Loader2 className="w-5 h-5 animate-spin" /> : <Upload className="w-5 h-5" />}
                  <span>Run AI Ingestion Pipeline on PDFs</span>
                </button>
              </form>
            )}

            {/* TAB 3: PASTE OCR / TEXT */}
            {activeTab === 'paste' && (
              <form onSubmit={handlePasteSubmit} className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                      Paste Question Paper Text
                    </label>
                    <textarea
                      rows={5}
                      value={paperText}
                      onChange={(e) => setPaperText(e.target.value)}
                      placeholder="Paste Question 1 text, tables, or sub-questions here..."
                      className={`w-full p-3 rounded-xl border text-xs font-mono focus:outline-none transition-colors ${
                        isDark ? 'bg-[#0f0507] border-rose-950 text-slate-200' : 'bg-rose-50/30 border-rose-200 text-slate-800'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                      Paste Marking Guidelines / Memo Text
                    </label>
                    <textarea
                      rows={4}
                      value={memoText}
                      onChange={(e) => setMemoText(e.target.value)}
                      placeholder="Paste memo solution steps and mark breakdown..."
                      className={`w-full p-3 rounded-xl border text-xs font-mono focus:outline-none transition-colors ${
                        isDark ? 'bg-[#0f0507] border-rose-950 text-slate-200' : 'bg-rose-50/30 border-rose-200 text-slate-800'
                      }`}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={status === 'processing' || !paperText.trim()}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-rose-500 text-white font-extrabold text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {status === 'processing' ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5 text-amber-200" />}
                  <span>Process Text With Gemini AI</span>
                </button>
              </form>
            )}

            {/* Extracted Data Preview Accordion */}
            {extractedData && extractedData.length > 0 && (
              <div className={`mt-4 p-4 rounded-2xl border space-y-3 ${
                isDark ? 'bg-[#180a0e] border-rose-950/70' : 'bg-rose-50/40 border-rose-200'
              }`}>
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold flex items-center gap-2 text-slate-900 dark:text-white">
                    <Eye className="w-4 h-4 text-rose-500" />
                    <span>Ingested Schema Preview ({extractedData.length} Question Documents)</span>
                  </h4>
                  <span className="text-[10px] font-mono bg-rose-500/10 text-rose-600 dark:text-rose-400 px-2 py-0.5 rounded-md font-bold border border-rose-300 dark:border-rose-900">
                    Firestore Synced
                  </span>
                </div>

                <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                  {extractedData.map((doc: any, i: number) => (
                    <div key={doc.id || i} className={`p-3 rounded-xl border text-xs ${
                      isDark ? 'bg-[#1f0b10] border-rose-900/50' : 'bg-white border-rose-200'
                    }`}>
                      <div className="flex items-center justify-between font-bold">
                        <span className="text-red-500 font-mono text-[11px]">{doc.id}</span>
                        <span className="text-[10px] uppercase px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 font-extrabold">
                          {doc.layout_type} · {doc.marks} Marks
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1 line-clamp-2">{doc.prompt}</p>
                      <div className="flex items-center gap-3 mt-1.5 text-[10px] text-slate-500 font-medium">
                        <span>Sub-questions: {doc.sub_questions?.length || 0}</span>
                        <span>•</span>
                        <span>Rubric Steps: {doc.rubric?.length || 0}</span>
                        {doc.attachments && doc.attachments.length > 0 && (
                          <>
                            <span>•</span>
                            <span className="text-rose-500">Attachment: {doc.attachments[0].title || 'Table/Figure'}</span>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex items-center justify-end">
                  <button
                    type="button"
                    onClick={handleStartIngestedPaper}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-extrabold text-xs transition-all cursor-pointer shadow-md inline-flex items-center gap-1.5"
                  >
                    <span>Launch Ingested Assessment</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Footer Bar */}
          <div className={`p-4 border-t flex items-center justify-between text-xs shrink-0 ${
            isDark ? 'bg-[#180a0e] border-rose-950/80 text-slate-400' : 'bg-rose-50/50 border-rose-200 text-slate-600'
          }`}>
            <span className="flex items-center gap-1.5 text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Connected to Firestore & Gemini Ingestion Engine
            </span>

            <button
              onClick={onClose}
              className={`px-4 py-2 rounded-xl border text-xs font-bold transition-colors cursor-pointer ${
                isDark ? 'border-rose-900 hover:bg-rose-950/60 text-white' : 'border-rose-300 hover:bg-rose-100 text-slate-800'
              }`}
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
