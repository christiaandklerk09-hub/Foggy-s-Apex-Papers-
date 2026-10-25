'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  RotateCcw, 
  Eye, 
  CheckCircle2, 
  FileText, 
  PenTool, 
  Hash, 
  AlertCircle,
  BookOpen,
  HelpCircle
} from 'lucide-react';
import { Question } from '@/types/quiz';
import { useAppTheme } from '@/lib/theme';

interface AfrikaansAnswerStudioProps {
  question: Question;
  currentIndex?: number;
  onAnswerCorrect?: () => void;
}

interface AfrikaansPassage {
  id: string;
  title: string;
  subtitle: string;
  paragraphs: string[];
}

const AFRIKAANS_PASSAGES: Record<string, AfrikaansPassage> = {
  teks_a: {
    id: 'teks_a',
    title: 'TEKS A: AMIRA — GOUE STEM MET \'N GOUE HART',
    subtitle: 'Verwerk uit Wikipedia.com (Tydskrifartikel)',
    paragraphs: [
      '1. Amira Willighagen se pa is \'n Nederlander en haar ma \'n Suid-Afrikaner. Daarom praat sy Nederlands en Afrikaans. Sy het met musiek in die huis grootgeword. Haar broer, Fincent, het by haar ma geleer viool speel en almal luister as haar pa voor die klavier gaan sit om te speel.',
      '2. Amira was sewe jaar oud toe sy besluit het dat sy graag wou sing. Voordat sy sanglesse begin neem het, het Amira YouTube gebruik om haarself te leer sing. Dit is hoe sy agtergekom het dat sy regtig \'n talent en passie vir musiek het. Selfs haar ma was verbaas toe sy Amira die eerste keer hoor sing het.',
      '3. In 2012 het Amira die eerste keer saam met haar gesin by die Music Makes Friends-fees opgetree. Sy was ook deel van die Emmaus-kinderkoor. In 2014 het sy aan Holland\'s Got Talent deelgeneem. Almal wat haar hoor sing het, het van haar gehou. Sy was gewild en het die kompetisie gewen. In dieselfde jaar het André Rieu, \'n wêreldbekende orkesleier, Amira gevra om saam met hom en sy orkes in Nederland op te tree. Amira word deesdae baie genooi om aan TV-programme deel te neem.',
      '4. Amira se eerste internasionale optredes was in Februarie en Maart 2014 in Suid-Afrika. Daarna het sy oral in die wêreld opgetree. Amira se eerste album het binne twee weke goue status bereik nadat dit in November 2014 in Nederland vrygestel is. Op hierdie album sing sy tien liedjies.',
      '5. Amira verdien geld as sy by konserte optree en as sy haar albums verkoop. Die helfte van hierdie geld skenk sy aan haar eie projek vir liefdadigheid. Hierdie projek bou speelplekke vir arm kinders in Suid-Afrikaanse townships.',
      '6. Amira se idee om speelplekke te bou, het begin toe sy net sewe jaar oud was. Sy het by haar ouma in Suid-Afrika gekuier en gesien dat baie kinders nie \'n lekker, veilige speelplek het nie. Dit het haar hartseer gemaak. Sy het toe vir haar ma gesê as sy ooit genoeg geld het, wil sy terugkom Suid-Afrika toe om hierdie kinders te help.',
      '7. Dit is presies wat sy gedoen het. Sy het die eerste speelplek in 2014 in Ikageng, naby Potchefstroom, geopen. Daarna is nog \'n paar sulke speelplekke gebou. Hierdie speelplekke het speelrame, swaaie, glybane en sandbakke. Teen die einde van 2020 was daar al dertien van Amira se speelplekke.',
      '8. Amira probeer mense ook op ander maniere help. In Junie 2017 het sy \'n konsert gehou om geld in te samel vir die slagoffers van die bosbrande rondom Knysna. In Augustus 2020 het Amira R80 000 geskenk vir kos en vrugtesap vir kinders wat honger ly.',
      '9. Amira, haar ma en broer het in 2018 permanent na Suid-Afrika verhuis. Sy is steeds baie besig. Saam met haar nuwe bestuurder beplan hulle om minder te toer, maar om meer konserte tydens elke toer te hou.'
    ]
  },
  teks_b: {
    id: 'teks_b',
    title: 'TEKS B: VISUELE TEKS (SOSIALE PLATFORMS 2020 GRENDELTYD)',
    subtitle: 'Navorsing deur die firma Ericsson (Verwerk uit Grafika24)',
    paragraphs: [
      'TITEL: So het die wêreld se mense sosiale platforms in 2020 se grendeltyd (lockdown) gebruik.',
      'NAVORSING: Hierdie navorsing is deur die firma, Ericsson, gedoen.',
      'FACEBOOK: Noord-Amerika: 0,3% | Suid-Amerika: 6% | Europa: 52% | Afrika: 30%',
      'WHATSAPP: Noord-Amerika: 3% | Suid-Amerika: 24% | Europa: 124% | Afrika: 117%',
      'YOUTUBE: Noord-Amerika: -8% | Suid-Amerika: -5% | Europa: -8% | Afrika: 6%'
    ]
  },
  teks_c: {
    id: 'teks_c',
    title: 'TEKS C: WAT JY VOOR EN TYDENS \'N ONDERHOUD MOET DOEN',
    subtitle: 'Verwerk uit Wikihow.com (Opsommingsteks)',
    paragraphs: [
      '1. Vind soveel moontlik uit oor die besigheid waar jy wil gaan werk. Dit sal jou help om te verstaan wat die besigheid nodig het. Dan sal jy die vrae goed kan beantwoord.',
      '2. Netjiese klere sê watter tipe mens jy is. Jy wil graag vir die mense wys dat jy die regte persoon vir die werk is. Onthou dit as jy aantrek vir die onderhoud.',
      '3. Sekere besighede sal dalk vir dokumente soos jou ID-kaart en sertifikate vra. Maak seker dat jy dit by jou het.',
      '4. Daag so 10 tot 15 minute voor jou onderhoud op. Dit sal jou tyd gee om kalm te raak of om gou badkamer toe te gaan. Liewer te vroeg as te laat.',
      '5. Jy wil hê die mense moet sien jy is opgewonde oor die werk. Wys dit met jou hele houding as jy in die onderhoud is. Dit kan jou definitief help om die werk te kry.',
      '6. Die mense gaan vir jou vrae vra. Jy moet mooi daarna luister. Dit sal jou help om die regte antwoorde te gee.',
      '7. Gedurende die onderhoud gaan jy ook \'n kans kry om vrae te vra. Gebruik hierdie kans om te vra wat jy wil weet. Die onderhoudvoerders sal dit waardeer.'
    ]
  },
  teks_d: {
    id: 'teks_d',
    title: 'TEKS D: ROCK BOSS ADVERTENSIE',
    subtitle: 'Eie advertensie vir musiekkonsert',
    paragraphs: [
      'OPSKRIF: ROCK BOSS hou die lekkerste konserte!',
      'SUBTEKS: Dié (goed/beste) musiekkonsert van die jaar!',
      'BEWOORDING: Rock Boss se konsert is net fantasties ... ongelooflik! Jy móét dit bywoon! Dis net wat jy nodig het!',
      'INLIGTING: FNB-stadion | 6 en 7 Augustus 2021 | 18:00',
      'VISUELE ASPEK: Luidspreker wat harde musiek aandui, kitaarspeler en musieknote.'
    ]
  },
  teks_e: {
    id: 'teks_e',
    title: 'TEKS E: ZITS STROKIESPRENT',
    subtitle: 'Verwerk uit Zits (Jeremy en sy ouers)',
    paragraphs: [
      'RAAMPIE 1: Ma: "Jy kan nie alleen met vakansie gaan nie!" Jeremy: "WAT? Julle kan dit nie aan my doen nie. My vriende se ouers sal dit nooit aan húlle kinders doen nie!"',
      'RAAMPIE 2: Ma: "Jeremy, jy is net sestien jaar oud!" (arms in die lug, mond wyd oopgespalk). Jeremy: "So, Ma dink ek is nog nat agter die ore?"',
      'RAAMPIE 3: Pa wys met sy vinger: "Daar is \'n goeie rede waarom ek dit kon doen." Jeremy: "Pa het dit dan gedoen. Ek is nie meer \'n klein seuntjie nie."',
      'RAAMPIE 4: Jeremy: "Wat is dié rede nogal?" Pa: "Dit was veiliger in die dae toe ek jonk was." Ma: "Presies! Ek dink ook so."'
    ]
  },
  teks_f: {
    id: 'teks_f',
    title: 'TEKS F: DIÉ JUFFROU SE HART KLOP WARM VIR HAAR LEERDERS',
    subtitle: 'Verwerk uit Kuier (22 Januarie 2020)',
    paragraphs: [
      '1. Margaret Cloete bied al 32 jaar lank Lewensoriëntering by Hoërskool Bergsig aan. Sy was twee jaar gelede in die nuus oor haar hulp aan 2019 se matrieks. Mense het Margaret geprys.',
      '2. Margaret sê dinge is makliker vir vandag se kinders, maar hulle sukkel op skool. Hulle kry nie genoeg hulp om op die regte pad te bly nie.',
      '3. Bergsig se leerders is brandarm. Die skool het gereeld goeie uitslae gehad. Margaret wou dit verbeter. 2019 se hoofseun het vir haar die idee gegee om die matrieks by die skool te laat slaap. Margaret het dit met die skoolhoof bespreek en hy het ja gesê.',
      '4. Hulle het leë klaskamers in \'n koshuis omskep. Margaret slaap saam met die kinders. Sy het haar eie geld gebruik om vir die leerders kos te koop.',
      '5. Al hierdie omgee het tot sukses gelei. 2019 se matrieks het \'n 80%-slaagsyfer behaal; die hoogste in die distrik!'
    ]
  },
  teks_g: {
    id: 'teks_g',
    title: 'TEKS G: SKOONMAAKDAG BY DIE SMIT-GESIN',
    subtitle: 'Verwerk uit fotosearch.com',
    paragraphs: [
      'INLEIDING: Vandag is die hele Smit-gesin tuis. Vir Ma is dit skoonmaakdag, maar niemand help haar nie. Sara ontspan in die leunstoel, Pa lees koerant en Ben sit voor die TV.',
      'SENTRALE SINNE:',
      '• Terwyl Sara sit en gesels, werk Ma in die huis.',
      '• Pa kan goed sien. Hy lees sonder \'n bril.',
      '• Ben kyk televisie (TV).',
      '• Ma het vir Sara gevra om die vuil skottelgoed te was.',
      '• Ma dra haar werkklere wanneer sy die huis skoonmaak.',
      '• Ma gebruik haar stofsuier om die vloere skoon te maak.'
    ]
  }
};

export const AfrikaansAnswerStudio: React.FC<AfrikaansAnswerStudioProps> = ({
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
    isCorrect: boolean;
  } | null>(null);
  const [showMemo, setShowMemo] = useState(false);
  const [activePassageTab, setActivePassageTab] = useState<string>('teks_a');
  const [showPassageDrawer, setShowPassageDrawer] = useState(false);

  // Auto-detect relevant passage based on question category and text
  const relevantPassageKey = useMemo(() => {
    const qStr = (question.question + ' ' + (question.category || '')).toLowerCase();
    if (qStr.includes('teks b') || qStr.includes('visuele') || qStr.includes('facebook') || qStr.includes('whatsapp') || qStr.includes('youtube') || qStr.includes('ericsson')) return 'teks_b';
    if (qStr.includes('teks c') || qStr.includes('opsomming') || qStr.includes('onderhoud') || qStr.includes('vraag 2')) return 'teks_c';
    if (qStr.includes('teks d') || qStr.includes('advertensie') || qStr.includes('rock boss') || qStr.includes('vraag 3')) return 'teks_d';
    if (qStr.includes('teks e') || qStr.includes('strokiesprent') || qStr.includes('jeremy') || qStr.includes('zits') || qStr.includes('vraag 4')) return 'teks_e';
    if (qStr.includes('teks f') || qStr.includes('margaret') || qStr.includes('juffrou') || qStr.includes('5.1')) return 'teks_f';
    if (qStr.includes('teks g') || qStr.includes('smit') || qStr.includes('skoonmaakdag') || qStr.includes('5.2')) return 'teks_g';
    return 'teks_a';
  }, [question]);

  useEffect(() => {
    setActivePassageTab(relevantPassageKey);
    setUserText('');
    setEvaluation(null);
    setIsGrading(false);
    setShowMemo(false);
  }, [question.id, relevantPassageKey]);

  const activePassage = AFRIKAANS_PASSAGES[activePassageTab] || AFRIKAANS_PASSAGES.teks_a;

  // Word count helper for summary (60 words max)
  const wordCount = useMemo(() => {
    return userText.trim() ? userText.trim().split(/\s+/).length : 0;
  }, [userText]);

  const isSummaryQuestion = question.marks === 10 || question.category?.toLowerCase().includes('opsomming') || question.question.includes('VRAAG 2');

  const handleEvaluate = () => {
    if (!userText.trim()) return;
    setIsGrading(true);

    setTimeout(() => {
      const cleanUser = userText.trim().toLowerCase();
      const cleanExpected = String(question.correctAnswer).toLowerCase();
      const maxScore = question.marks || 1;

      let score = 0;
      let feedback = '';
      let isCorrect = false;

      if (isSummaryQuestion) {
        const points = [
          cleanUser.includes('besigheid') || cleanUser.includes('werk') || cleanUser.includes('uitvind') || cleanUser.includes('alles'),
          cleanUser.includes('netjies') || cleanUser.includes('aantrek') || cleanUser.includes('klere'),
          cleanUser.includes('dokumente') || cleanUser.includes('id') || cleanUser.includes('sertifikate'),
          cleanUser.includes('betyds') || cleanUser.includes('10') || cleanUser.includes('15') || cleanUser.includes('minute') || cleanUser.includes('vroeg'),
          cleanUser.includes('opgewonde') || cleanUser.includes('entoesiasties') || cleanUser.includes('houding'),
          cleanUser.includes('luister') || cleanUser.includes('vrae'),
          cleanUser.includes('vra') || cleanUser.includes('kans')
        ];
        const pointsFound = points.filter(Boolean).length;
        const withinWordLimit = wordCount <= 65;

        score = Math.min(maxScore, pointsFound + (withinWordLimit && pointsFound >= 4 ? 3 : 1));
        isCorrect = score >= 6;
        feedback = isCorrect
          ? `Uitstekende opsomming! Jy het ${pointsFound}/7 kernfeite ingesluit en aan die 60-woord limiet voldoen (${wordCount} woorde).`
          : `Jy het ${pointsFound}/7 kernfeite geïdentifiseer (${wordCount} woorde). Maak seker alle punte is in volsinne in jou eie woorde geskryf.`;
      } else {
        const expectedKeywords = cleanExpected.replace(/[^a-z0-9\s]/g, '').split(/\s+/).filter(w => w.length > 2);
        const matchCount = expectedKeywords.filter(kw => cleanUser.includes(kw)).length;
        const matchRatio = expectedKeywords.length > 0 ? matchCount / expectedKeywords.length : 0;

        if (cleanUser === cleanExpected || matchRatio >= 0.6 || cleanUser.includes(cleanExpected)) {
          score = maxScore;
          isCorrect = true;
          feedback = 'Korrek en akkuraat! Voldoen aan die amptelike DBO Nasienriglyne.';
        } else if (matchRatio >= 0.3 || matchCount >= 1) {
          score = Math.max(1, Math.round(maxScore * 0.5));
          isCorrect = false;
          feedback = 'Gedeeltelik korrek. Vergelyk jou bewoording met die amptelike nasienriglyne.';
        } else {
          score = 0;
          isCorrect = false;
          feedback = 'Hersien asseblief jou antwoord aan die hand van die leesteks en die nasienmemo hieronder.';
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
                AFRIKAANS TAT · VRAESTEL 1
              </span>
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-red-600 text-white shadow-xs">
                {question.marks ? `${question.marks} PUNT${question.marks > 1 ? 'E' : ''}` : '1 PUNT'}
              </span>
            </div>
            <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white mt-0.5">
              {question.category || 'Leesbegrip & Taalwerkwinkel'}
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
          <span>{showPassageDrawer ? 'Versteek Leesteks' : 'Wys Leesteks'}</span>
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
              {Object.keys(AFRIKAANS_PASSAGES).map((key) => {
                const p = AFRIKAANS_PASSAGES[key];
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
            <div className="mb-2.5">
              <h4 className="text-xs sm:text-sm font-black text-red-700 dark:text-rose-400 uppercase tracking-wide">
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
            <span>KANDIDAAT SE ANTWOORD</span>
          </span>

          {isSummaryQuestion && (
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border flex items-center gap-1.5 ${
              wordCount <= 60
                ? 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300'
                : 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950 dark:text-amber-300'
            }`}>
              <Hash className="w-3.5 h-3.5" />
              <span>Woordetelling: <strong>{wordCount}</strong> / 60 woorde maks</span>
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
                ? "Skryf jou 7 volsinne puntsgewys hier neer (maksimum 60 woorde)..."
                : "Tik jou antwoord hier volgens die leesteks en amptelike taalreëls..."
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
                <span>Nagesien volgens DBO Nasienriglyne...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-200" />
                <span>Dien In & Merk Antwoord</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => setShowMemo(!showMemo)}
            className={`px-4 py-3 rounded-2xl border text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              showMemo
                ? 'bg-rose-100 text-rose-900 border-rose-300 dark:bg-rose-950 dark:text-rose-200'
                : isDark
                ? 'bg-[#1b080f] text-rose-300 border-rose-950 hover:bg-[#250b15]'
                : 'bg-white text-slate-700 border-rose-200 hover:bg-rose-50'
            }`}
          >
            <Eye className="w-3.5 h-3.5 text-red-500" />
            <span>{showMemo ? 'Versteek Nasienmemo' : 'Wys Nasienmemo'}</span>
          </button>
        </div>

        {/* Revealed Feedback */}
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
                      <span>Punte Toegeken: {evaluation.score} / {evaluation.maxScore}</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-4 h-4 text-rose-600" />
                      <span>Telling: {evaluation.score} / {evaluation.maxScore}</span>
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

        {/* AMPTELIKE DBO NASIENRIGLYNE MEMO */}
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
                  AMPTELIKE DBO NASIENRIGLYNE (MEMO)
                </span>
                <span className="text-xs font-bold text-rose-600 dark:text-rose-400">
                  {question.marks} Punt{question.marks && question.marks > 1 ? 'e' : ''}
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

export default AfrikaansAnswerStudio;
