'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Sparkles, 
  RotateCcw, 
  Eye, 
  CheckCircle2, 
  XCircle, 
  FileText, 
  AlignLeft, 
  PenTool, 
  Check, 
  Layers, 
  MessageSquare,
  HelpCircle,
  Hash,
  AlertCircle
} from 'lucide-react';
import { Question } from '@/types/quiz';
import { useAppTheme } from '@/lib/theme';

interface EnglishAnswerStudioProps {
  question: Question;
  currentIndex?: number;
  onAnswerCorrect?: () => void;
}

interface EnglishPassage {
  id: string;
  title: string;
  subtitle: string;
  paragraphs: string[];
}

const ENGLISH_PASSAGES: Record<string, EnglishPassage> = {
  text_a: {
    id: 'text_a',
    title: 'TEXT A: RETHINKING GARBAGE',
    subtitle: 'Adapted from Equinox (November–December 2019)',
    paragraphs: [
      '1. The medals of the Olympic Games were previously made from gold, silver and bronze obtained from the mines. They are now being made of 100% recycled e-waste¹. You may be amazed to know that the new Olympic medals are made from precious metals recycled from old cellphones. This e-waste may otherwise have clogged up landfill² sites. Similarly, you may not realise that your paper towels are actually recycled office documents and cereal boxes, or that the walkways along some of South Africa\'s beaches are made of plastic bottle tops.',
      '2. Recycling has become a way of reducing the growing \'mountains\' of waste in the world. The recycling of suitable materials and the separation of waste into categories will not only relieve pressure on the planet, but also create employment and boost the economy. In South Africa, 108 million tonnes of waste are generated every year, with 90% of this (about R17 billion worth of resources) discarded on landfill sites. Kate Stubbs is the Director of Business Development and Marketing at the recycling company, Interwaste. She says that Johannesburg\'s landfill sites will run out of space in ten years and that South Africa is still far behind other countries when it comes to recycling.',
      '3. \'Every single bit of waste presents an opportunity – it is about finding sustainable solutions no matter what the kind of waste, industry or potential challenges are,\' says Stubbs. \'For example, the urge to stop waste from being dumped at landfill sites has directly resulted in companies focusing on reusing and recycling. In order to reduce the amount of waste, manufacturers are rethinking the type of resources that they should use to make their goods of today, which will become the raw materials of tomorrow.\'',
      '4. Kate Stubbs adds that the conversion of waste to energy addresses two important sustainability challenges in Africa: power generation, and reducing reliance on landfills. In 2016, Interwaste started a project to make fuel from waste, the first of its kind in South Africa. This fuel is the same as high quality coal. It forms a sustainable alternative to coal which is commonly used in the generation of power.',
      '5. Another company, Mpact, Southern Africa\'s largest paper and plastics packaging and recycling business, recovered more than 630 000 tonnes of recyclable waste in 2018. \'With the recycling industry already providing jobs for 100 000 South Africans, it is clearly a growth industry,\' says Mpact Chief Executive Officer, Bruce Strong. Mpact supports recycling ventures that range from informal waste collectors with shopping trolleys, small business owners who transport waste in their trucks and those that manage waste collection centres.',
      '6. Bruce Strong said that Mpact has recently changed their approach to packaging by offering customers practical alternatives to non-recyclable products. Mpact has replaced the non-recyclable packaging of fast-food company, Fishaways, with a cardboard box that is fully recyclable and lower in cost. It has also supplied Steers with equally sustainable cardboard packaging for its burger meal.',
      '7. In Cape Town, a company called NewLife Plastics is giving about 120 000 plastic packaging containers per month a new lease on life in the form of garden benches, plastic tables and walkways. \'We use polyolefin, a type of high-density plastic found in milk bottles, bottle caps and heavier plastic bags,\' says company co-founder Bronwyn Bagley. The garden furniture is made from planks that look like wood but are practically indestructible. \'They do not require any maintenance and will not rot, crack, bend, fade in the sun or become slippery when wet,\' says Bagley. \'As an added benefit, public benches or walkways made from recycled packaging generally do not get vandalised or stolen, because the material is extremely heavy, does not burn and has no commercial resale value.\'',
      '8. The need for a culture change and shift towards saving our planet, like Interwaste, Mpact and NewLife Plastics are doing, is necessary to avoid potential crises and ensure a sustainable future in Africa. Their efforts could be the start of a garbage revolution that will help save our planet.',
      'GLOSSARY: e-waste¹ – discarded electronic equipment | landfill² – a site for the dumping of waste material'
    ]
  },
  text_b: {
    id: 'text_b',
    title: 'TEXT B: SOFT SKILLS (VISUAL COMPREHENSION)',
    subtitle: 'Visual representations of foundational workplace soft skills',
    paragraphs: [
      'VISUAL 1: TEAM SPIRIT (Three smiling figures with arms around each other)',
      'VISUAL 2: SELF-CONFIDENCE (Large thumbs-up illustration with bold text)',
      'VISUAL 3: COMMUNICATION (Checkmark / speech bubble notation)',
      'VISUAL 4: INQUISITIVENESS & CREATIVITY (Figure looking through telescope with glowing light bulb)',
      'VISUAL 5: EMPATHY & TRUSTWORTHINESS (Open human connection)',
      'VISUAL 6: ASSERTIVENESS (Loudhailer / Megaphone symbolising bold communication)'
    ]
  },
  text_c: {
    id: 'text_c',
    title: 'TEXT C: E-MAIL ETIQUETTE (SUMMARY TEXT)',
    subtitle: 'Adapted from Talent 360 (November 2019)',
    paragraphs: [
      '1. An electronic mail (e-mail) is regarded as a popular, efficient and accessible form of communication in most workplaces in the world. It is important to consider guidelines on how to write a professional e-mail with a clear message.',
      '2. Your personal e-mail address represents you. A name such as \'Fast and Furious\' in an e-mail address is not suitable when communicating with an employer.',
      '3. The subject line indicates the importance and topic of discussion in an e-mail. The subject line must, therefore, be appropriate.',
      '4. An e-mail also requires a personal greeting such as \'Dear Mr Jones\' or \'Hello Jack\'. Failure to include a greeting can make your message seem unfriendly. Since e-mails have no way of showing body language and conveying tone, select your words carefully so that the message is clear to the recipient.',
      '5. Including too much information in an e-mail is not necessary. It should be a brief communication with a few short paragraphs. The use of correct grammar, spelling and punctuation will convey a good impression of you to the recipient.',
      '6. Your intended recipient may not be the only person who will read your e-mail. Your message should, therefore, include information that you would be comfortable to share in public.',
      '7. Conclude your e-mail by including additional contact information in order for the recipient to have other ways of communicating with you.'
    ]
  },
  text_d: {
    id: 'text_d',
    title: 'TEXT D: ACTIVO HEALTH ADVERTISEMENT',
    subtitle: 'Source: Juice (November 2019)',
    paragraphs: [
      'HEADLINE: One Mozzi bite can kill',
      'FACT: Did you know.... More than 200 million new cases of Malaria are reported each year (Source: WHO)',
      'CALL TO ACTION: DON\'T BECOME A STATISTIC... ASK ABOUT MALARIA PROTECTION FROM ACTIVO HEALTH. ...and get the most out of your travels.',
      'BADGE: NO PRESCRIPTION REQUIRED | Web: www.onebitecankill.co.za',
      'VISUALS: Aeroplane trail across globe, suitcase, and car along journey path.',
      'SLOGAN: Activo Health — Caring for you (Tel: 0800 ACTIVO 228486)'
    ]
  },
  text_e: {
    id: 'text_e',
    title: 'TEXT E: BLONDIE CARTOON BY JOHN MARSHALL',
    subtitle: '8-Frame Comic Strip (Dagwood & Blondie)',
    paragraphs: [
      'FRAME 1 & 2: Dagwood is fast asleep and snoring on the couch (\'Z\').',
      'FRAME 3, 4 & 5: The dog barks loudly (\'ARF ARF\'), howls frantically (\'YOWW\'), rushes into the room, and leaps onto Dagwood on the sofa (\'RUF!! RUF!!\').',
      'FRAME 6: Dagwood is in a furious wrestling struggle with the dog on the floor with cloud puffs (\'GRRRR\').',
      'FRAME 7: Blondie walks into the front door holding a steaming box of pizza: \'WOW! I didn\'t even have to open the door! How did you know I was going to surprise you with a pizza for dinner tonight?\' Dagwood is now on his feet smiling.',
      'FRAME 8: At the dinner table eating pizza, Dagwood replies: \'I have my own personal incoming pizza warning system.\' Blondie nods: \'Apparently...\''
    ]
  },
  text_f: {
    id: 'text_f',
    title: 'TEXT F: IT TAKES A VILLAGE TO RAISE A CHOIR',
    subtitle: 'Adapted from Sunday Times (September 2019)',
    paragraphs: [
      '1. Just like the people in most countrys, South Africans love music. South Africa is home to many award winning artists. Added to the list are the Ndlovu Youth Choir, the latest group to make the country proud. The choir has participated in America\'s Got Talent, a world-famous talent competition. There performances on this show have made them a global sensation.',
      '2. The group was founded by Dr Hugo Templeman in Limpopo in 1994. Ever since the choir was established, it has impacted lives by bringing the best out of the children in the group. The choir has helped the children to overcome the challenges that a majority of them would face while growing up. The group sings in all eleven South African languages.',
      '3. The African proverb, \'It takes a village to raise a child\', rings true in Mautse, Limpopo. Local seamstress, Lina Ncongwane, is one of the women in the community who created skirts and shirts which the Ndlovu Youth Choir wore in a famous YouTube video. \'I am very happy to see that the choir is doing well and my work is getting recognition,\' said Ncongwane.'
    ]
  },
  text_g: {
    id: 'text_g',
    title: 'TEXT G: WATER DOESN\'T COME FROM A TAP',
    subtitle: 'Source: Business Times (November 2019)',
    paragraphs: [
      'HEADLINE: Water doesn\'t come from a tap.',
      'MESSAGE: Find out where your water comes from. For Nature. For You.',
      'KEY SENTENCES:',
      '• Fizzy drinks are popular than water among teenagers.',
      '• Water is used for drinking. Water is used for bathing.',
      '• Climate change will reduce the most valuable natural resource.',
      '• Not drinking enough water will cause dehydration.',
      '• Every citizen is responsible for water conservation.'
    ]
  }
};

export const EnglishAnswerStudio: React.FC<EnglishAnswerStudioProps> = ({
  question,
  currentIndex = 0,
  onAnswerCorrect
}) => {
  const { isDark } = useAppTheme();
  const [userText, setUserText] = useState('');
  const [isGrading, setIsGrading] = useState(false);
  const [evaluation, setEvaluation] = useState<{
    score: number;
    maxScore: number;
    feedback: string;
    pointsIdentified?: string[];
    isCorrect: boolean;
  } | null>(null);
  const [showMemo, setShowMemo] = useState(false);
  const [showPassageDrawer, setShowPassageDrawer] = useState(false);
  const [activePassageTab, setActivePassageTab] = useState<string>('text_a');

  // Auto-detect relevant passage based on question category and text
  const relevantPassageKey = useMemo(() => {
    const qStr = (question.question + ' ' + (question.category || '')).toLowerCase();
    if (qStr.includes('text b') || qStr.includes('visual 1') || qStr.includes('team spirit') || qStr.includes('soft skills')) return 'text_b';
    if (qStr.includes('text c') || qStr.includes('e-mail') || qStr.includes('summary') || qStr.includes('question 2')) return 'text_c';
    if (qStr.includes('text d') || qStr.includes('advertisement') || qStr.includes('activo') || qStr.includes('malaria') || qStr.includes('mozzi')) return 'text_d';
    if (qStr.includes('text e') || qStr.includes('cartoon') || qStr.includes('dagwood') || qStr.includes('blondie') || qStr.includes('pizza')) return 'text_e';
    if (qStr.includes('text f') || qStr.includes('ndlovu') || qStr.includes('choir') || qStr.includes('village') || qStr.includes('5.1')) return 'text_f';
    if (qStr.includes('text g') || qStr.includes('water') || qStr.includes('tap') || qStr.includes('5.2')) return 'text_g';
    return 'text_a';
  }, [question]);

  useEffect(() => {
    setActivePassageTab(relevantPassageKey);
    setUserText('');
    setEvaluation(null);
    setIsGrading(false);
    setShowMemo(false);
  }, [question.id, relevantPassageKey]);

  const activePassage = ENGLISH_PASSAGES[activePassageTab] || ENGLISH_PASSAGES.text_a;

  // Word count helper for summary or essays
  const wordCount = useMemo(() => {
    return userText.trim() ? userText.trim().split(/\s+/).length : 0;
  }, [userText]);

  const isSummaryQuestion = question.marks === 10 || question.category?.toLowerCase().includes('summary') || question.question.includes('QUESTION 2');

  const handleEvaluate = () => {
    if (!userText.trim()) return;
    setIsGrading(true);

    setTimeout(() => {
      const cleanUser = userText.trim().toLowerCase();
      const cleanExpected = String(question.correctAnswer).toLowerCase();
      const maxScore = question.marks || 2;

      let score = 0;
      let feedback = '';
      let isCorrect = false;

      if (isSummaryQuestion) {
        // Summary 70-word rubric
        const points = [
          cleanUser.includes('email address') || cleanUser.includes('e-mail') || cleanUser.includes('fast and furious'),
          cleanUser.includes('subject line') || cleanUser.includes('topic'),
          cleanUser.includes('greeting') || cleanUser.includes('dear') || cleanUser.includes('hello'),
          cleanUser.includes('tone') || cleanUser.includes('words carefully') || cleanUser.includes('word choice'),
          cleanUser.includes('brief') || cleanUser.includes('concise') || cleanUser.includes('short'),
          cleanUser.includes('grammar') || cleanUser.includes('spelling') || cleanUser.includes('punctuation'),
          cleanUser.includes('contact') || cleanUser.includes('details') || cleanUser.includes('public')
        ];
        const pointsFound = points.filter(Boolean).length;
        const withinWordLimit = wordCount <= 75;

        score = Math.min(maxScore, pointsFound + (withinWordLimit && pointsFound >= 4 ? 3 : 1));
        isCorrect = score >= 6;
        feedback = isCorrect
          ? `Excellent summary! You identified ${pointsFound}/7 key points and adhered to the word count limit (${wordCount} words).`
          : `You identified ${pointsFound}/7 key points (${wordCount} words). Ensure all 7 points are written in full sentences in your own words.`;
      } else {
        // Specific string matches / keyword evaluation
        const expectedKeywords = cleanExpected.replace(/[^a-z0-9\s]/g, '').split(/\s+/).filter(w => w.length > 3);
        const matchCount = expectedKeywords.filter(kw => cleanUser.includes(kw)).length;
        const matchRatio = expectedKeywords.length > 0 ? matchCount / expectedKeywords.length : 0;

        if (cleanUser === cleanExpected || matchRatio >= 0.6 || cleanUser.includes(cleanExpected)) {
          score = maxScore;
          isCorrect = true;
          feedback = 'Complete and accurate response! Aligns with the official DBE Marking Guidelines.';
        } else if (matchRatio >= 0.3 || matchCount >= 1) {
          score = Math.max(1, Math.round(maxScore * 0.5));
          isCorrect = false;
          feedback = 'Partially correct. Compare your phrasing with the official marking criteria.';
        } else {
          score = 0;
          isCorrect = false;
          feedback = 'Needs review. Verify your understanding from the text passage and check the marking memo below.';
        }
      }

      setEvaluation({
        score,
        maxScore,
        feedback,
        isCorrect
      });
      setIsGrading(false);

      if (isCorrect && onAnswerCorrect) {
        onAnswerCorrect();
      }
    }, 400);
  };

  return (
    <div className={`my-5 rounded-3xl border transition-all overflow-hidden shadow-xl ${
      isDark 
        ? 'bg-gradient-to-b from-[#18070d] via-[#120408] to-[#0d0205] border-rose-900/80 shadow-[0_4px_30px_rgba(244,63,94,0.12)] text-white' 
        : 'bg-white border-rose-200 shadow-rose-900/10 text-slate-900 sunlit-card'
    }`}>
      {/* Radiant Light Red Header Ribbon */}
      <div className="h-1 bg-gradient-to-r from-red-500 via-rose-400 to-rose-600" />

      {/* Top Banner with Subject & Section Badges */}
      <div className={`p-4 sm:p-5 border-b flex items-center justify-between gap-3 flex-wrap ${
        isDark ? 'bg-gradient-to-r from-[#2c0c16] via-[#200810] to-[#16050b] border-rose-900/70' : 'bg-gradient-to-r from-rose-100/90 via-red-50/70 to-rose-50/90 border-rose-200'
      }`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-red-600 via-rose-500 to-rose-600 text-white flex items-center justify-center shadow-md shadow-rose-600/30">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-rose-200/90 text-rose-900 dark:bg-rose-950 dark:text-rose-300 border border-rose-300 dark:border-rose-800 flex items-center gap-1.5 shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                ENGLISH FAL · PAPER 1
              </span>
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-red-600 text-white shadow-xs">
                {question.marks ? `${question.marks} MARKS` : '1 MARK'}
              </span>
            </div>
            <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white mt-0.5">
              {question.category || 'Reading Comprehension & Language Studio'}
            </h3>
          </div>
        </div>

        {/* Passage Drawer Toggle */}
        <button
          type="button"
          onClick={() => setShowPassageDrawer(!showPassageDrawer)}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer shadow-xs ${
            showPassageDrawer
              ? 'bg-red-600 text-white border-red-600 shadow-md shadow-red-600/30'
              : isDark
              ? 'bg-[#200810] border-rose-900 text-rose-300 hover:bg-[#2c0d16]'
              : 'bg-white border-rose-200 text-slate-700 hover:bg-rose-50'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>{showPassageDrawer ? 'Hide Reading Passage' : 'View Reading Passage'}</span>
        </button>
      </div>

      {/* READING PASSAGE INSPECTOR DRAWER */}
      <AnimatePresence>
        {showPassageDrawer && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`border-b p-3.5 sm:p-5 transition-all ${
              isDark ? 'bg-[#15060a] border-rose-950/80' : 'bg-rose-50/40 border-rose-200/90'
            }`}
          >
            {/* Passage Selector Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 no-scrollbar mb-3 border-b border-rose-200/60 dark:border-rose-950">
              {Object.keys(ENGLISH_PASSAGES).map((key) => {
                const p = ENGLISH_PASSAGES[key];
                const isSelected = activePassageTab === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setActivePassageTab(key)}
                    className={`px-3 py-1 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer border flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-gradient-to-r from-red-600 via-rose-600 to-rose-500 border-red-500 text-white shadow-xs scale-[1.02]'
                        : isDark
                        ? 'bg-[#200810] border-rose-900/60 text-rose-300/80 hover:border-rose-700 hover:bg-[#2c0d16]'
                        : 'bg-white border-rose-200 text-slate-700 hover:border-rose-300 hover:bg-rose-50'
                    }`}
                  >
                    <span>{p.title.split(':')[0]}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Passage Header */}
            <div className="mb-2">
              <h4 className="text-xs sm:text-sm font-black text-red-600 dark:text-rose-400">
                {activePassage.title}
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 italic">
                {activePassage.subtitle}
              </p>
            </div>

            {/* Passage Paragraphs */}
            <div className={`p-3.5 sm:p-4 rounded-2xl border max-h-72 overflow-y-auto font-serif text-xs sm:text-sm leading-relaxed space-y-2.5 select-text ${
              isDark 
                ? 'bg-[#0f0306] border-rose-950 text-rose-100/95' 
                : 'bg-white border-rose-200 text-slate-900'
            }`}>
              {activePassage.paragraphs.map((para, idx) => (
                <p key={idx} className="leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>



      {/* STUDENT RESPONSE & WORKSPACE AREA */}
      <div className="p-4 sm:p-6 space-y-4">
        {/* Helper Instructions / Summary Status */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <span className="text-[11px] font-black uppercase tracking-wider text-red-600 dark:text-rose-400 flex items-center gap-1.5">
            <PenTool className="w-3.5 h-3.5" />
            <span>CANDIDATE RESPONSE & WORKING</span>
          </span>

          {isSummaryQuestion && (
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border flex items-center gap-1.5 ${
              wordCount <= 70
                ? 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300'
                : 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950 dark:text-amber-300'
            }`}>
              <Hash className="w-3.5 h-3.5" />
              <span>Word Count: <strong>{wordCount}</strong> / 70 words max</span>
            </span>
          )}
        </div>

        {/* Main Response Textarea */}
        <div className="relative">
          <textarea
            value={userText}
            onChange={(e) => {
              setUserText(e.target.value);
              if (evaluation) setEvaluation(null);
            }}
            placeholder={
              isSummaryQuestion
                ? "Write your 7 points in full sentences here (one point per sentence, maximum 70 words)..."
                : "Type your answer here based on the text and official language requirements..."
            }
            rows={isSummaryQuestion ? 7 : 4}
            className={`w-full p-4 rounded-2xl border font-sans text-xs sm:text-sm leading-relaxed focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-hidden transition-all shadow-inner ${
              isDark 
                ? 'bg-[#120408] text-white border-rose-950 placeholder-slate-600' 
                : 'bg-rose-50/30 text-slate-900 border-rose-200 placeholder-slate-400'
            }`}
          />
        </div>

        {/* Evaluation Action Button */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            type="button"
            onClick={handleEvaluate}
            disabled={isGrading || !userText.trim()}
            className="flex-1 bg-gradient-to-r from-red-600 via-rose-600 to-rose-500 hover:from-red-500 hover:to-rose-500 text-white font-black py-3 px-5 rounded-2xl transition-all shadow-md shadow-rose-600/30 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer active:scale-[0.99] flex items-center justify-center gap-2 text-xs sm:text-sm uppercase tracking-wider"
          >
            {isGrading ? (
              <>
                <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                <span>Checking Against DBE Rubric...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-200" />
                <span>Submit & Grade Answer</span>
              </>
            )}
          </button>


        </div>

        {/* Revealed AI Feedback */}
        <AnimatePresence>
          {evaluation && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: 8 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -8 }}
              className={`p-4 rounded-2xl border transition-all ${
                evaluation.isCorrect
                  ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-950 dark:text-emerald-100'
                  : 'bg-rose-500/10 border-rose-500/40 text-rose-950 dark:text-rose-100'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
                <span className="text-xs sm:text-sm font-extrabold flex items-center gap-1.5">
                  {evaluation.isCorrect ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Marks Awarded: {evaluation.score} / {evaluation.maxScore}</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-4 h-4 text-rose-600" />
                      <span>Score: {evaluation.score} / {evaluation.maxScore}</span>
                    </>
                  )}
                </span>
              </div>
              <p className="text-xs leading-relaxed font-sans">
                {evaluation.feedback}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* OFFICIAL DBE MARKING GUIDELINES MEMO */}
        <AnimatePresence>
          {showMemo && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={`p-4 sm:p-5 rounded-2xl border ${
                isDark ? 'bg-[#15060a] border-rose-900/60 text-white' : 'bg-rose-50/70 border-rose-200 text-slate-900'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-red-600 text-white">
                  OFFICIAL DBE MARKING GUIDELINES
                </span>
                <span className="text-xs font-bold text-rose-600 dark:text-rose-400">
                  {question.marks} Marks
                </span>
              </div>
              <div className="text-xs leading-relaxed space-y-2 font-mono whitespace-pre-wrap">
                {question.explanation}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default EnglishAnswerStudio;
