'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Upload, Loader2, CheckCircle, AlertCircle, ArrowLeft, Zap, BookOpen } from 'lucide-react';

export default function AdminIngestClient() {
  const [status, setStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [ingestedCount, setIngestedCount] = useState<number | null>(null);

  async function handleOneClickTest() {
    setStatus('uploading');
    setMessage('Ingesting DBE Mathematical Literacy Nov 2021 (Paper 1 + Memo) into Firestore...');
    try {
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
              prompt: 'TABLE 1 shows the fuel price in six African countries. Use TABLE 1 to answer the questions that follow.',
              sub_questions: [
                { id: '1.1.1', text: 'Calculate the fuel price increase for Zimbabwe from 05/06/2019 to 01/03/2021 (in US$ per litre).', marks: 2, input_type: 'calc_step' }
              ],
              rubric: [
                { sub_id: '1.1.1', step_number: 1, description: 'Subtracting prices', marks_assigned: 1, expected_value: '$1,258 - $0,80$' },
                { sub_id: '1.1.1', step_number: 2, description: 'Final price difference', marks_assigned: 1, expected_value: '$0,458$' }
              ]
            }
          ]
        })
      });
      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error || 'Failed to ingest');
      setStatus('success');
      setIngestedCount(data.count || 1);
      setMessage(`Success! Ingested ${data.count || 1} question modules directly into Firestore.`);
    } catch (err: any) {
      setStatus('error');
      setMessage(err.message || 'Error occurred during 1-click test.');
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('uploading');
    setMessage('Uploading PDF files to Gemini 3.1 Flash OCR & Schema pipeline...');

    const formData = new FormData(e.currentTarget);
    
    try {
      const res = await fetch('/api/ingest', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (res.ok && !data.error) {
        setStatus('success');
        setIngestedCount(data.count || 0);
        setMessage(`Success! ${data.count || 0} exam question modules successfully extracted and saved to Firestore.`);
      } else {
        throw new Error(data.error || 'Failed to ingest paper');
      }
    } catch (err: any) {
      setStatus('error');
      setMessage(err.message || 'Error occurred during upload. Please check the network or try 1-Click test.');
      console.error(err);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fff5f5] via-white to-rose-50/60 p-4 sm:p-12 text-slate-800">
      <div className="max-w-2xl mx-auto mb-4">
        <Link 
          href="/" 
          className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-700 hover:text-red-600 transition-colors px-3 py-1.5 rounded-xl bg-white border border-rose-200 shadow-xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Apex Papers Home</span>
        </Link>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto bg-white p-6 sm:p-8 rounded-3xl shadow-lg border border-rose-200"
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-300">
            TOPIC: MATHEMATICAL LITERACY · LIGHT RED
          </span>
          <span className="text-[10px] font-bold text-slate-400">ADMIN PIPELINE</span>
        </div>

        <h1 className="text-xl sm:text-2xl font-black text-rose-950 mb-2">
          DBE Exam Paper & Marking Memo Ingestion
        </h1>
        <p className="text-xs text-slate-600 mb-6 leading-relaxed">
          Upload any DBE National Senior Certificate Question Paper PDF and optional Marking Memo. Gemini 3.1 Flash extracts granular sub-questions, figures, and rubric micro-steps directly into Firestore.
        </p>

        {/* 1-Click Test Button for Immediate Verification */}
        <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-rose-50 to-red-50/60 border border-rose-200 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-bold text-rose-950 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>Instant Test: Math Lit Nov 2021</span>
            </p>
            <p className="text-[11px] text-slate-600 mt-0.5">
              Don&apos;t have local PDFs on hand? Click to verify ingestion with verified DBE questions.
            </p>
          </div>
          <button
            type="button"
            disabled={status === 'uploading'}
            onClick={handleOneClickTest}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-extrabold text-xs transition-all shadow-xs shrink-0 cursor-pointer disabled:opacity-50"
          >
            1-Click Test
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-4">
            <div>
              <label className="block text-xs font-bold text-rose-900 mb-1">
                Question Paper PDF <span className="text-red-500">*</span>
              </label>
              <input 
                type="file" 
                name="paper" 
                accept=".pdf" 
                required 
                className="block w-full text-xs text-rose-900 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-red-600 file:text-white hover:file:bg-red-500 border border-rose-200 rounded-xl p-2 cursor-pointer bg-rose-50/30" 
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-rose-900 mb-1">
                Marking Memo PDF <span className="text-slate-500 font-normal">(Optional for rubric extraction)</span>
              </label>
              <input 
                type="file" 
                name="memo" 
                accept=".pdf" 
                className="block w-full text-xs text-rose-900 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-rose-600 file:text-white hover:file:bg-rose-500 border border-rose-200 rounded-xl p-2 cursor-pointer bg-rose-50/30" 
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={status === 'uploading'}
            className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-red-600 via-rose-600 to-rose-500 text-white px-6 py-3.5 rounded-xl font-extrabold text-sm hover:from-red-500 hover:to-rose-400 transition-all shadow-md shadow-rose-600/30 disabled:opacity-50 cursor-pointer"
          >
            {status === 'uploading' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
            {status === 'uploading' ? 'Extracting & Saving with Gemini...' : 'Upload & Run AI Ingestion'}
          </button>
        </form>

        {status !== 'idle' && (
          <motion.div 
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-6 p-4 rounded-2xl flex items-start gap-3 border shadow-xs ${
              status === 'success' ? 'bg-emerald-50 text-emerald-900 border-emerald-200' : 
              status === 'error' ? 'bg-rose-50 text-rose-900 border-rose-300' : 'bg-amber-50 text-amber-900 border-amber-200'
            }`}
          >
            {status === 'success' && <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />}
            {status === 'error' && <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />}
            {status === 'uploading' && <Loader2 className="w-5 h-5 text-amber-600 animate-spin shrink-0 mt-0.5" />}
            <div className="flex-1 text-xs">
              <p className="font-bold text-sm">{message}</p>
              {status === 'success' && (
                <div className="mt-2.5">
                  <Link 
                    href="/"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-xs"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Open Exam in Student App</span>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
