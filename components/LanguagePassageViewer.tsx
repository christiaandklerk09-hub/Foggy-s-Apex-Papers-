'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  FileText, 
  Maximize2, 
  Minimize2, 
  Search, 
  Tag, 
  Sparkles,
  Layers,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { Question } from '@/types/quiz';
import { useAppTheme } from '@/lib/theme';

interface LanguagePassageViewerProps {
  question: Question;
  currentIndex?: number;
  paperId?: string;
}

interface PassageItem {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  type: string;
  paragraphs: string[];
}

const ENGLISH_TEXTS: Record<string, PassageItem> = {
  text_a: {
    id: 'text_a',
    code: 'TEXT A',
    title: 'TEXT A: RETHINKING GARBAGE',
    subtitle: 'Adapted from Equinox (November–December 2019) · Magazine Article',
    type: 'Comprehension Article',
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
    code: 'TEXT B',
    title: 'TEXT B: SOFT SKILLS (VISUAL COMPREHENSION)',
    subtitle: 'Visual representations of foundational workplace soft skills',
    type: 'Visual Text',
    paragraphs: [
      'VISUAL 1: TEAM SPIRIT — Three smiling diverse colleagues with arms interlocked around each other, demonstrating collaborative workplace synergy, trust and mutual support.',
      'VISUAL 2: COMMUNICATION — Two people seated at a conference table actively listening and engaging with open hand gestures, speech bubbles representing clear and respectful dialogue.',
      'VISUAL 3: PROBLEM SOLVING — An individual assembling gears and jigsaw puzzle pieces into a cohesive lightbulb structure, representing innovative thinking and practical reasoning.',
      'CAPTION: "Hard skills get you the interview; soft skills get you the job and keep your career growing in a 21st century workplace."'
    ]
  },
  text_c: {
    id: 'text_c',
    code: 'TEXT C',
    title: 'TEXT C: E-MAIL ETIQUETTE IN THE WORKPLACE',
    subtitle: 'Adapted from Career Edge Magazine · Summary Extract',
    type: 'Summary Text',
    paragraphs: [
      '1. Electronic mail (e-mail) is one of the most powerful and widely used tools of modern business communication. However, sending unpolished, unprofessional, or poorly structured emails can damage your personal credibility and company reputation.',
      '2. Always ensure that your subject line is concise and directly states the purpose of your message. Avoid ambiguous headings like "Hey" or leaving the subject line blank.',
      '3. Begin with a professional salutation addressing the recipient by name. Informal greetings like "Yo" or slang are strictly unacceptable in formal business correspondences.',
      '4. Keep the body of your message clear, focused, and organized into short paragraphs. Long, meandering blocks of text often cause readers to overlook critical instructions or action items.',
      '5. Check your tone carefully. Humor, sarcasm, or frustration do not translate well in written electronic text and can easily be misinterpreted by clients or supervisors.',
      '6. Always proofread your email thoroughly before clicking the send button. Check spelling, grammar, punctuation, and verify that any referenced attachments are indeed attached.',
      '7. Conclude with a polite sign-off (such as "Kind regards" or "Sincerely") followed by your full name, professional title, and active contact details.'
    ]
  },
  text_d: {
    id: 'text_d',
    code: 'TEXT D',
    title: 'TEXT D: ACTIVO HEALTH MALARIA PROTECTION',
    subtitle: 'Adapted from Outdoor Living Magazine · Advertisement Analysis',
    type: 'Advertisement',
    paragraphs: [
      'HEADLINE: "DON\'T LET MALARIA SPOIL YOUR ADVENTURE!"',
      'VISUAL: A silhouetted family camping peacefully by a glowing lake at sunset under an invisible protective shield, with mosquitoes repelled at the perimeter.',
      'PRODUCT: MOZZI-OFF Spray & Lotion by Activo Health (Pty) Ltd.',
      'KEY CLAIMS: DEET-free, clinically proven 12-hour continuous tropical mosquito protection. Non-greasy, pleasant herbal fragrance suitable for children from 6 months.',
      'CALL TO ACTION: Available nationwide at leading pharmacies and outdoor retailers. Protect your family today. Visit www.activohealth.co.za.'
    ]
  },
  text_e: {
    id: 'text_e',
    code: 'TEXT E',
    title: 'TEXT E: BLONDIE & DAGWOOD CARTOON',
    subtitle: 'By Dean Young and John Marshall · Cartoon Analysis',
    type: 'Cartoon',
    paragraphs: [
      'FRAME 1: Dagwood Bumstead is standing in the kitchen staring eagerly at the refrigerator. His dog, Daisy, sits beside him panting expectantly. Dagwood says: "I think I will assemble a magnificent multi-layered midnight snack!"',
      'FRAME 2: Dagwood piles bread, roast beef, cheese, tomatoes, pickles, olives, and condiments into a towering tower that defies gravity. He smiles broadly with eyes wide open in sheer delight.',
      'FRAME 3: Blondie walks into the kitchen wearing her nightgown and slippers, arms folded, with a raised eyebrow and an unimpressed expression: "Dagwood, remember what your doctor said about your cholesterol?"',
      'FRAME 4: Dagwood stands sheepishly with a tiny olive on a toothpick in his hand while the giant sandwich is pushed aside into the fridge. He mutters: "Well... the olive is packed with healthy antioxidants!" Daisy looks up at him with pity.'
    ]
  },
  text_f: {
    id: 'text_f',
    code: 'TEXT F',
    title: 'TEXT F: NDLOVU YOUTH CHOIR — VOICES OF HOPE',
    subtitle: 'Adapted from Sunday Times Lifestyle · Language & Editing Text',
    type: 'Language & Editing Passage',
    paragraphs: [
      '1. The Ndlovu Youth Choir from the rural village of Moutse in Limpopo captured the hearts of millions across the globe when they reached the finals of America\'s Got Talent.',
      '2. Founded in 2009 by Dr Hugo Templeman as part of the Ndlovu Care Group, the choir provides a safe haven and transformative musical platform for orphaned and vulnerable youths.',
      '3. Under the energetic direction of conductor Ralf Schmitt, the choir blends vibrant traditional South African choral songs with energetic African choreography and contemporary pop anthems.',
      '4. Their electrifying performances demonstrate that talent knows no geographical or socioeconomic boundaries. Today, these talented young singers tour internationally as proud global cultural ambassadors for South Africa.'
    ]
  },
  text_g: {
    id: 'text_g',
    code: 'TEXT G',
    title: 'TEXT G: WATER CONSERVATION — EVERY DROP COUNTS',
    subtitle: 'Business Times (November 2019) · Informational Text',
    type: 'Informational Text',
    paragraphs: [
      'HEADLINE: Water doesn\'t simply come from a tap; it comes from our fragile ecosystems.',
      'KEY PRINCIPLES:',
      '• Fizzy carbonated drinks are often more popular than water among teenagers, yet fresh potable water is the most vital necessity for human survival.',
      '• Water is essential for agriculture, domestic sanitation, and industrial manufacturing.',
      '• Climate change and shifting rainfall patterns threaten dams across southern Africa.',
      '• Every citizen and household has a civic duty to conserve water and prevent wastage.'
    ]
  }
};

const AFRIKAANS_TEXTS: Record<string, PassageItem> = {
  teks_a: {
    id: 'teks_a',
    code: 'TEKS A',
    title: 'TEKS A: AMIRA — GOUE STEM MET \'N GOUE HART',
    subtitle: 'Verwerk uit Wikipedia.com · Tydskrifartikel (Leesbegrip)',
    type: 'Leesbegrip Teks',
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
    code: 'TEKS B',
    title: 'TEKS B: VISUELE TEKS (SOSIALE PLATFORMS 2020 GRENDELTYD)',
    subtitle: 'Navorsing deur die firma Ericsson · Verwerk uit Grafika24',
    type: 'Visuele Teks',
    paragraphs: [
      'TITEL: So het die wêreld se mense sosiale platforms in 2020 se grendeltyd (lockdown) gebruik.',
      'NAVORSING: Hierdie navorsing is deur die wêreldwye tegnologiefirma, Ericsson, gedoen.',
      'FACEBOOK GROEI: Noord-Amerika: 0,3% | Suid-Amerika: 6% | Europa: 52% | Afrika: 30%',
      'WHATSAPP GROEI: Noord-Amerika: 3% | Suid-Amerika: 24% | Europa: 124% | Afrika: 117%',
      'YOUTUBE GROEI: Noord-Amerika: -8% | Suid-Amerika: -5% | Europa: -8% | Afrika: 6%',
      'SLOTSOM: Boodskapdienste soos WhatsApp het in Afrika en Europa die grootste toename getoon tydens afsondering.'
    ]
  },
  teks_c: {
    id: 'teks_c',
    code: 'TEKS C',
    title: 'TEKS C: WAT JY VOOR EN TYDENS \'N WERKSONDERHOUD MOET DOEN',
    subtitle: 'Verwerk uit Wikihow.com · Opsommingsteks',
    type: 'Opsommingsteks',
    paragraphs: [
      '1. Vind soveel moontlik uit oor die besigheid waar jy wil gaan werk. Dit sal jou help om te verstaan wat die besigheid nodig het. Dan sal jy die vrae goed kan beantwoord.',
      '2. Netjiese klere sê watter tipe mens jy is. Jy wil graag vir die mense wys dat jy die regte persoon vir die werk is. Onthou dit as jy aantrek vir die onderhoud.',
      '3. Sekere besighede sal dalk vir dokumente soos jou ID-kaart en sertifikate vra. Maak seker dat jy dit by jou het.',
      '4. Daag so 10 tot 15 minute voor jou onderhoud op. Dit sal jou tyd gee om kalm te raak of om gou badkamer toe te gaan. Liewer te vroeg as te laat.',
      '5. Moenie jou selfoon gebruik terwyl jy vir die onderhoud wag nie. Skakel dit liewer heeltemal af om te keer dat dit lui.',
      '6. Wees hoflik teenoor almal wat jy ontmoet. Groet die ontvangsdame en skud die onderhoudvoerder se hand met selfvertroue.',
      '7. Luister aandagtig na elke vraag voordat jy antwoord. Moenie die onderhoudvoerder in die rede val nie.'
    ]
  },
  teks_d: {
    id: 'teks_d',
    code: 'TEKS D',
    title: 'TEKS D: ROCK BOSS ADVERTENSIE',
    subtitle: 'Verwerk uit Student Life · Advertensie-ontleding',
    type: 'Advertensie',
    paragraphs: [
      'OPSKRIF: "WEES DIE ROCK BOSS BY ROCKING THE DAISIES!"',
      'VISUEEL: \'n Jong man met sonbril en feesklere wat \'n kitaar in die lug hou terwyl duisende aanhangers juig.',
      'AANBOD: Koop enige TWEE blikkies Rock Boss Energiedrankie by uitgesoekte winkels en staan \'n kans om BBP-kaartjies na die fees te wen!',
      'TERME & VOORWAARDES: Kompetisie sluit 31 Oktober. Geen onder-18s nie. Besoek www.rockboss.co.za vir reëls.'
    ]
  },
  teks_e: {
    id: 'teks_e',
    code: 'TEKS E',
    title: 'TEKS E: ZITS STROKIESPRENT',
    subtitle: 'Deur Jerry Scott en Jim Borgman · Strokiesprent-ontleding',
    type: 'Strokiesprent',
    paragraphs: [
      'RAAM 1: Jeremy sit voor die televisieskerm met sy selfoon in sy hand en koptelefoon op sy ore. Sy ma staan in die deur en praat met hom.',
      'RAAM 2: Sy ma waai met haar hande en vra: "Jeremy, het jy gehoor wat ek vir jou gesê het?" Jeremy kyk nie eers op nie en knik net vaagweg.',
      'RAAM 3: Sy ma sê saggies: "Ek het sopas besluit om vir jou pizza vir aandete te bestel." Jeremy spring dadelik regop: "Ek het alles gehoor, Ma!" Sy ma kyk hom skepties aan.'
    ]
  },
  teks_f: {
    id: 'teks_f',
    code: 'TEKS F',
    title: 'TEKS F: JUFFROU MARGARET CLOETE',
    subtitle: 'Uit Die Burger · Taalstrukture & Konvensies',
    type: 'Taalteks',
    paragraphs: [
      '1. Juffrou Margaret Cloete is onlangs as Wes-Kaapse Onderwyser van die Jaar aangewys vir haar onbaatsugtige toewyding aan haar leerders.',
      '2. Sy gee al vir meer as vyf-en-twintig jaar Afrikaans by Hoërskool Bergzicht. Haar passie vir die taal en letterkunde inspireer elke kind wat in haar klaskamer instap.',
      '3. Benewens haar pligte in die klaskamer, rig sy ook die senior debatspan af en reël jaarlikse boekskenkings vir laerskole in landelike gebiede.',
      '4. "Onderwys is nie net \'n beroep nie; dit is my lewensroeping," sê juffrou Cloete met \'n trotse glimlag.'
    ]
  },
  teks_g: {
    id: 'teks_g',
    code: 'TEKS G',
    title: 'TEKS G: DIE SMIT-GESIN SE KAMPEERVAKANSIE',
    subtitle: 'Uit WegSleep Tydskrif · Redigeringsteks',
    type: 'Kort Redigeringsteks',
    paragraphs: [
      '1. Elke Desember pak die Smit-gesin hulle karavaan en vertrek na die Suidkus vir hulle jaarlikse strandvakansie.',
      '2. Hulle hou daarvan om vroegoggend langs die rotse vis te vang terwyl die branders rustig breek.',
      '3. Saans sit die hele gesin om die braaivleisvuur en vertel stories onder die sterrehemel.'
    ]
  }
};

export const LanguagePassageViewer: React.FC<LanguagePassageViewerProps> = ({
  question,
  currentIndex = 0,
  paperId = '',
}) => {
  const { isDark } = useAppTheme();
  const [isExpanded, setIsExpanded] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Detect language family
  const isAfrikaans = question.subjectId === 'afrikaans_fal' || 
    paperId?.includes('afrikaans') || 
    (question.category && question.category.toLowerCase().includes('afrikaans')) ||
    (question.paperId && question.paperId.includes('afrikaans'));

  const isEnglish = question.subjectId === 'english_hg' || 
    paperId?.includes('english') || 
    (question.category && question.category.toLowerCase().includes('english')) ||
    (question.paperId && question.paperId.includes('english'));

  const dataset = isAfrikaans ? AFRIKAANS_TEXTS : ENGLISH_TEXTS;

  // Auto-detect relevant text based on question category and text
  const defaultTab = useMemo(() => {
    const qStr = (question.question + ' ' + (question.category || '')).toLowerCase();
    
    if (isAfrikaans) {
      if (qStr.includes('teks b') || qStr.includes('visuele teks') || qStr.includes('sosiale platform') || qStr.includes('ericsson')) return 'teks_b';
      if (qStr.includes('teks c') || qStr.includes('opsomming') || qStr.includes('onderhoud') || qStr.includes('vraag 2')) return 'teks_c';
      if (qStr.includes('teks d') || qStr.includes('advertensie') || qStr.includes('rock boss') || qStr.includes('vraag 3')) return 'teks_d';
      if (qStr.includes('teks e') || qStr.includes('strokiesprent') || qStr.includes('zits') || qStr.includes('jeremy') || qStr.includes('vraag 4')) return 'teks_e';
      if (qStr.includes('teks f') || qStr.includes('cloete') || qStr.includes('bergzicht') || qStr.includes('5.1')) return 'teks_f';
      if (qStr.includes('teks g') || qStr.includes('smit') || qStr.includes('kampeer') || qStr.includes('5.2')) return 'teks_g';
      return 'teks_a';
    } else {
      if (qStr.includes('text b') || qStr.includes('visual 1') || qStr.includes('soft skills') || qStr.includes('team spirit')) return 'text_b';
      if (qStr.includes('text c') || qStr.includes('summary') || qStr.includes('e-mail') || qStr.includes('etiquette') || qStr.includes('question 2')) return 'text_c';
      if (qStr.includes('text d') || qStr.includes('advertisement') || qStr.includes('activo') || qStr.includes('malaria') || qStr.includes('mozzi') || qStr.includes('question 3')) return 'text_d';
      if (qStr.includes('text e') || qStr.includes('cartoon') || qStr.includes('dagwood') || qStr.includes('blondie') || qStr.includes('sandwich') || qStr.includes('question 4')) return 'text_e';
      if (qStr.includes('text f') || qStr.includes('ndlovu') || qStr.includes('choir') || qStr.includes('talented') || qStr.includes('5.1')) return 'text_f';
      if (qStr.includes('text g') || qStr.includes('water') || qStr.includes('tap') || qStr.includes('conservation') || qStr.includes('5.2')) return 'text_g';
      return 'text_a';
    }
  }, [question, isAfrikaans]);

  const [activeTab, setActiveTab] = useState(defaultTab);

  // Sync tab when question changes
  useEffect(() => {
    setActiveTab(defaultTab);
  }, [defaultTab, question.id]);

  if (!isEnglish && !isAfrikaans) {
    return null;
  }

  const activePassage = dataset[activeTab] || Object.values(dataset)[0];

  return (
    <div className={`mb-5 rounded-2xl border shadow-md transition-all overflow-hidden ${
      isDark 
        ? 'bg-[#18080c] border-rose-900/80 shadow-[0_4px_25px_rgba(225,29,72,0.12)] text-white' 
        : 'bg-white border-rose-200/90 shadow-[0_4px_25px_rgba(244,63,94,0.06)] text-slate-900'
    }`}>
      {/* Top Header Bar */}
      <div className={`px-4 py-3 flex items-center justify-between border-b gap-3 flex-wrap ${
        isDark 
          ? 'bg-gradient-to-r from-[#2a0e16] via-[#1f0910] to-[#16060b] border-rose-900/80' 
          : 'bg-gradient-to-r from-red-50 via-rose-50/70 to-red-50/40 border-rose-200'
      }`}>
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-red-600 via-rose-600 to-rose-500 text-white flex items-center justify-center shrink-0 shadow-sm shadow-red-600/30">
            <BookOpen className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-red-600 text-white shadow-xs">
                {isAfrikaans ? 'AMPTELIKE EKSAMEN LEESTEKS' : 'OFFICIAL EXAMINATION READING TEXT'}
              </span>
              <span className="text-[10px] font-bold text-red-600 dark:text-rose-400">
                {isAfrikaans ? 'Afrikaans TAT V1' : 'English FAL Paper 1'}
              </span>
            </div>
            <h3 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white truncate mt-0.5">
              {activePassage.title}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick Search */}
          <div className="relative hidden xs:block">
            <input
              type="text"
              placeholder={isAfrikaans ? 'Soek in teks...' : 'Search passage...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`text-xs pl-7 pr-2.5 py-1 rounded-lg border outline-none transition-all w-28 sm:w-36 ${
                isDark 
                  ? 'bg-black/30 border-rose-900/80 text-rose-100 placeholder-rose-400/50 focus:border-red-500' 
                  : 'bg-white border-rose-200 text-slate-800 placeholder-slate-400 focus:border-red-500'
              }`}
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2 top-1.5 pointer-events-none" />
          </div>

          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
              isDark 
                ? 'bg-rose-950/60 border-rose-900 text-rose-300 hover:bg-rose-900' 
                : 'bg-white border-rose-200 text-slate-600 hover:bg-rose-50'
            }`}
            title={isExpanded ? 'Collapse Reading Text' : 'Expand Reading Text'}
          >
            {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Tabs Row for all Texts (Text A to G) */}
      <div className={`flex overflow-x-auto no-scrollbar border-b px-2 py-1.5 gap-1.5 shrink-0 ${
        isDark ? 'bg-[#140609] border-rose-900/60' : 'bg-rose-50/40 border-rose-200/80'
      }`}>
        {Object.values(dataset).map((item) => {
          const isSelected = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveTab(item.id)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-black uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer flex items-center gap-1 border ${
                isSelected
                  ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white border-red-500 shadow-sm shadow-red-600/30'
                  : isDark
                  ? 'bg-[#1f0910] text-rose-300 border-rose-950/80 hover:bg-[#2c0e18]'
                  : 'bg-white text-slate-700 border-rose-200/80 hover:bg-rose-50'
              }`}
            >
              <span>{item.code}</span>
            </button>
          );
        })}
      </div>

      {/* Expandable Passage Body */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="p-4 sm:p-5 space-y-3.5 max-h-[460px] overflow-y-auto"
          >
            {/* Passage Meta Banner */}
            <div className="flex items-center justify-between gap-2 border-b border-rose-100 dark:border-rose-900/60 pb-2 flex-wrap">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-red-600 dark:text-rose-400">
                  {activePassage.type}
                </span>
                <p className="text-xs text-slate-500 dark:text-rose-300/70 italic mt-0.5">
                  {activePassage.subtitle}
                </p>
              </div>
              <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">
                DBE NSC Examination Text
              </span>
            </div>

            {/* Paragraphs with line/paragraph numbering */}
            <div className="space-y-3 text-xs sm:text-sm font-serif leading-relaxed">
              {activePassage.paragraphs.map((para, pIdx) => {
                const matchesSearch = searchQuery && para.toLowerCase().includes(searchQuery.toLowerCase());
                return (
                  <div
                    key={pIdx}
                    className={`p-3 rounded-xl transition-colors border ${
                      matchesSearch
                        ? 'bg-amber-100/90 dark:bg-amber-950/60 border-amber-300 dark:border-amber-700 font-bold'
                        : isDark
                        ? 'bg-[#1e0a10]/60 border-rose-950/60 text-rose-100 hover:bg-[#250d14]/70'
                        : 'bg-rose-50/40 border-rose-100 text-slate-800 hover:bg-rose-50/70'
                    }`}
                  >
                    <p className="leading-relaxed">{para}</p>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
