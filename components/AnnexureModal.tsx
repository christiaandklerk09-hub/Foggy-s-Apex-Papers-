'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  FileText, 
  BookOpen,
  BarChart3, 
  Calculator, 
  Search,
  Tag, 
  Sparkles,
  Layers,
  ChevronRight,
  TrendingUp,
  Table as TableIcon,
  PieChart,
  DollarSign,
  Maximize2
} from 'lucide-react';
import { MATH_ANNEXURES, getAnnexureById, Annexure } from '@/lib/math-annexures';
import { MathAnnexureViewer } from './MathAnnexureViewer';
import { useAppTheme } from '@/lib/theme';
import { Question } from '@/types/quiz';

interface AnnexureModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialAnnexureId?: string;
  question?: Question;
  paperId?: string;
}

type SubjectCategory = 'maths_literacy' | 'economics' | 'english' | 'afrikaans' | 'accounting';

interface TextResource {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  category: SubjectCategory;
  type: string;
  source: string;
  paragraphs: string[];
}

const ALL_TEXT_RESOURCES: Record<string, TextResource> = {
  // --- ENGLISH FAL ---
  text_a: {
    id: 'text_a',
    code: 'TEXT A',
    title: 'TEXT A: RETHINKING GARBAGE',
    subtitle: 'Adapted from Equinox (November–December 2019) · Magazine Article',
    category: 'english',
    type: 'Comprehension Article',
    source: 'DBE NSC English FAL P1 Nov 2021',
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
    category: 'english',
    type: 'Visual Text',
    source: 'DBE NSC English FAL P1 Nov 2021',
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
    category: 'english',
    type: 'Summary Text',
    source: 'DBE NSC English FAL P1 Nov 2021',
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
    category: 'english',
    type: 'Advertisement',
    source: 'DBE NSC English FAL P1 Nov 2021',
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
    category: 'english',
    type: 'Cartoon',
    source: 'DBE NSC English FAL P1 Nov 2021',
    paragraphs: [
      'FRAME 1: Dagwood Bumstead stands in the kitchen staring eagerly into an open refrigerator late at night. His dog Daisy sits beside him panting expectantly. Dagwood says: "I think I will assemble a magnificent multi-layered midnight snack!"',
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
    category: 'english',
    type: 'Language & Editing Passage',
    source: 'DBE NSC English FAL P1 Nov 2021',
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
    category: 'english',
    type: 'Informational Text',
    source: 'DBE NSC English FAL P1 Nov 2021',
    paragraphs: [
      'HEADLINE: Water doesn\'t simply come from a tap; it comes from our fragile ecosystems.',
      'KEY PRINCIPLES:',
      '• Fizzy carbonated drinks are often more popular than water among teenagers, yet fresh potable water is the most vital necessity for human survival.',
      '• Water is essential for agriculture, domestic sanitation, and industrial manufacturing.',
      '• Climate change and shifting rainfall patterns threaten dams across southern Africa.',
      '• Every citizen and household has a civic duty to conserve water and prevent wastage.'
    ]
  },

  // --- AFRIKAANS TAT ---
  teks_a: {
    id: 'teks_a',
    code: 'TEKS A',
    title: 'TEKS A: AMIRA — GOUE STEM MET \'N GOUE HART',
    subtitle: 'Verwerk uit Wikipedia.com · Tydskrifartikel (Leesbegrip)',
    category: 'afrikaans',
    type: 'Leesbegrip Teks',
    source: 'DBO NSS Afrikaans TAT V1 Nov 2021',
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
    category: 'afrikaans',
    type: 'Visuele Teks',
    source: 'DBO NSS Afrikaans TAT V1 Nov 2021',
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
    category: 'afrikaans',
    type: 'Opsommingsteks',
    source: 'DBO NSS Afrikaans TAT V1 Nov 2021',
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
    category: 'afrikaans',
    type: 'Advertensie',
    source: 'DBO NSS Afrikaans TAT V1 Nov 2021',
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
    category: 'afrikaans',
    type: 'Strokiesprent',
    source: 'DBO NSS Afrikaans TAT V1 Nov 2021',
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
    category: 'afrikaans',
    type: 'Taalteks',
    source: 'DBO NSS Afrikaans TAT V1 Nov 2021',
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
    category: 'afrikaans',
    type: 'Kort Redigeringsteks',
    source: 'DBO NSS Afrikaans TAT V1 Nov 2021',
    paragraphs: [
      '1. Elke Desember pak die Smit-gesin hulle karavaan en vertrek na die Suidkus vir hulle jaarlikse strandvakansie.',
      '2. Hulle hou daarvan om vroegoggend langs die rotse vis te vang terwyl die branders rustig breek.',
      '3. Saans sit die hele gesin om die braaivleisvuur en vertel stories onder die sterrehemel.'
    ]
  },

  // --- ECONOMICS EXTRACTS ---
  econ_gva: {
    id: 'econ_gva',
    code: 'TABLE 2.2',
    title: 'GROSS VALUE ADDED (GVA) BY INDUSTRY AT CONSTANT 2010 PRICES',
    subtitle: 'South African Reserve Bank Quarterly Bulletin (R millions)',
    category: 'economics',
    type: 'National Accounts Data Table',
    source: 'DBE NSC Economics P1 Nov 2021',
    paragraphs: [
      'INDUSTRY (R millions) | 2019 | 2020',
      '• Primary Sector: Agriculture, forestry & fishing: R74 612m (2019) -> R84 397m (2020)',
      '• Primary Sector: Mining and quarrying: R219 451m (2019) -> R193 420m (2020)',
      '• Secondary Sector: Manufacturing: R372 109m (2019) -> R314 265m (2020)',
      '• Secondary Sector: Electricity, gas and water: R52 918m (2019) -> R50 491m (2020)',
      '• Secondary Sector: Construction (Building): R102 380m (2019) -> R81 602m (2020)',
      '• Tertiary Sector: Wholesale and retail trade: R384 105m (2019) -> R337 990m (2020)',
      '• Tertiary Sector: Transport, storage & communication: R261 405m (2019) -> R222 710m (2020)',
      '• Tertiary Sector: Finance, insurance, real estate & business: R608 410m (2019) -> R587 114m (2020)',
      '• Total GVA at basic prices: R3 045 400m (2019) -> R2 832 200m (2020) [-7.0% decline due to pandemic]'
    ]
  },
  econ_energy: {
    id: 'econ_energy',
    code: 'EXTRACT 3.2',
    title: 'SOUTH AFRICA\'S 2030 INTEGRATED RESOURCE ENERGY PLAN (IRP)',
    subtitle: 'Department of Mineral Resources and Energy & Eskom Strategy',
    category: 'economics',
    type: 'Policy Extract & Generation Mix',
    source: 'DBE NSC Economics P1 Nov 2021',
    paragraphs: [
      'CURRENT INSTALLED CAPACITY: Coal generates 75% of South Africa\'s electricity; nuclear produces 5%; hydro and pumped storage 8%; wind, solar and renewables 12%.',
      '2030 TARGET GENERATION MIX: Coal will reduce to 59%; Solar PV will surge to 8 288 MW (11%); Wind power will surge to 17 742 MW (18%); Gas and diesel peaking 8 100 MW (10%); Nuclear 1 860 MW (2%).',
      'JUST ENERGY TRANSITION: Phasing out old coal-fired stations (Komati, Camden, Hendrina) while creating green jobs and reskilling coal miners in Mpumalanga.'
    ]
  },
  econ_trade: {
    id: 'econ_trade',
    code: 'EXTRACT 4.2',
    title: 'WHY DO COUNTRIES ENGAGE IN INTERNATIONAL TRADE?',
    subtitle: 'Adapted from Fin24 & International Trade Administration',
    category: 'economics',
    type: 'International Trade Extract',
    source: 'DBE NSC Economics P1 Nov 2021',
    paragraphs: [
      '1. No modern country is fully self-sufficient. Differences in climatic conditions, natural mineral endowments, labor specialization, and capital intensity lead to Comparative Advantage.',
      '2. South Africa exports high-value minerals (platinum, gold, iron ore, coal) and agricultural produce (citrus, wine) while importing capital machinery, crude petroleum, and advanced consumer electronics.',
      '3. Free trade fosters competitive efficiency, enables economies of scale (mass production), and lowers consumer prices, while protective tariffs or import quotas protect infant industries.'
    ]
  },

  // --- ACCOUNTING & BUSINESS STUDIES ---
  acc_layout: {
    id: 'acc_layout',
    code: 'SPECIAL ANSWER BOOK',
    title: 'NSC ACCOUNTING SPECIAL ANSWER BOOK FORMATS',
    subtitle: 'General Ledger, Debtors Ledger, Creditors Reconciliation & Balance Sheet',
    category: 'accounting',
    type: 'Ledger Layout & Information Sheet',
    source: 'DBE NSC Accounting P1 Nov 2021',
    paragraphs: [
      'GENERAL LEDGER STRUCTURE: Date | Details | Folio | Debit (R) | Credit (R) | Balance (R)',
      'DEBTORS CONTROL vs DEBTORS LIST: Every debit to Debtors Control must balance against total individual debtor ledger balances. Check for posting errors, discount omissions, and dishonored checks (R/D).',
      'BANK RECONCILIATION: Compare Bank Statement balance against Bank Account in General Ledger. Add outstanding deposits; deduct unpresented checks and electronic debit orders.',
      'FINANCIAL RATIOS: Current Ratio (Current Assets : Current Liabilities, target 2:1), Acid-Test Ratio (Current Assets - Inventory : Current Liabilities, target 1:1), Debt-Equity Ratio (Non-current liabilities : Shareholders\' Equity).'
    ]
  }
};

export function AnnexureModal({ 
  isOpen, 
  onClose, 
  initialAnnexureId = 'annexure_a',
  question,
  paperId = ''
}: AnnexureModalProps) {
  const { isDark } = useAppTheme();
  const [selectedCategory, setSelectedCategory] = useState<SubjectCategory>('maths_literacy');
  const [activeItemKey, setActiveItemKey] = useState<string>('annexure_a');
  const [searchQuery, setSearchQuery] = useState('');

  // Automatically determine subject category and item on open
  useEffect(() => {
    if (!isOpen) return;

    const qSub = question?.subjectId || '';
    const qText = (question?.question || '').toLowerCase();
    const pId = paperId.toLowerCase();

    if (qSub === 'english_hg' || pId.includes('eng') || qText.includes('text a') || qText.includes('text b')) {
      setSelectedCategory('english');
      if (qText.includes('text b') || qText.includes('soft skills')) setActiveItemKey('text_b');
      else if (qText.includes('text c') || qText.includes('e-mail') || qText.includes('summary')) setActiveItemKey('text_c');
      else if (qText.includes('text d') || qText.includes('activo') || qText.includes('malaria')) setActiveItemKey('text_d');
      else if (qText.includes('text e') || qText.includes('blondie') || qText.includes('cartoon')) setActiveItemKey('text_e');
      else if (qText.includes('text f') || qText.includes('ndlovu')) setActiveItemKey('text_f');
      else if (qText.includes('text g') || qText.includes('water')) setActiveItemKey('text_g');
      else setActiveItemKey('text_a');
    } else if (qSub === 'afrikaans_fal' || pId.includes('afr') || qText.includes('teks a') || qText.includes('amira')) {
      setSelectedCategory('afrikaans');
      if (qText.includes('teks b') || qText.includes('sosiale')) setActiveItemKey('teks_b');
      else if (qText.includes('teks c') || qText.includes('onderhoud')) setActiveItemKey('teks_c');
      else if (qText.includes('teks d') || qText.includes('rock boss')) setActiveItemKey('teks_d');
      else if (qText.includes('teks e') || qText.includes('zits')) setActiveItemKey('teks_e');
      else if (qText.includes('teks f') || qText.includes('cloete')) setActiveItemKey('teks_f');
      else if (qText.includes('teks g') || qText.includes('smit')) setActiveItemKey('teks_g');
      else setActiveItemKey('teks_a');
    } else if (qSub === 'economics' || pId.includes('econ')) {
      setSelectedCategory('economics');
      if (qText.includes('energy') || qText.includes('coal')) setActiveItemKey('econ_energy');
      else if (qText.includes('trade') || qText.includes('comparative')) setActiveItemKey('econ_trade');
      else setActiveItemKey('econ_gva');
    } else if (qSub === 'accounting' || pId.includes('account')) {
      setSelectedCategory('accounting');
      setActiveItemKey('acc_layout');
    } else {
      setSelectedCategory('maths_literacy');
      if (initialAnnexureId && MATH_ANNEXURES[initialAnnexureId]) {
        setActiveItemKey(initialAnnexureId);
      } else {
        setActiveItemKey('annexure_a');
      }
    }
  }, [isOpen, question, paperId, initialAnnexureId]);

  // Filtered Math Items
  const mathKeys = Object.keys(MATH_ANNEXURES).filter((key) => {
    if (!searchQuery) return true;
    const item = MATH_ANNEXURES[key];
    const q = searchQuery.toLowerCase();
    return item.title.toLowerCase().includes(q) || 
      item.code.toLowerCase().includes(q) || 
      item.subtitle.toLowerCase().includes(q) ||
      (item.notes && item.notes.toLowerCase().includes(q));
  });

  // Filtered Text Items
  const textKeys = Object.keys(ALL_TEXT_RESOURCES).filter((key) => {
    const item = ALL_TEXT_RESOURCES[key];
    if (item.category !== selectedCategory) return false;
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return item.title.toLowerCase().includes(q) || 
      item.code.toLowerCase().includes(q) || 
      item.paragraphs.some((p) => p.toLowerCase().includes(q));
  });

  const activeMathItem = selectedCategory === 'maths_literacy' ? getAnnexureById(activeItemKey) : null;
  const activeTextItem = selectedCategory !== 'maths_literacy' ? ALL_TEXT_RESOURCES[activeItemKey] : null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-5 bg-black/70 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.96, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: 10 }}
            className={`w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden border transition-all flex flex-col max-h-[92vh] ${
              isDark 
                ? 'bg-[#14060b] border-red-900/80 shadow-[0_10px_40px_rgba(239,68,68,0.2)] text-white' 
                : 'bg-white border-red-200 shadow-[0_10px_40px_rgba(239,68,68,0.15)] text-slate-900'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with signature light red accent */}
            <div className={`flex items-center justify-between px-4 sm:px-6 py-3.5 border-b shrink-0 ${
              isDark 
                ? 'bg-gradient-to-r from-[#2c0e17] via-[#200911] to-[#16050b] border-red-900/80' 
                : 'bg-gradient-to-r from-red-100/90 via-rose-50/80 to-red-50/60 border-red-200'
            }`}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-red-600 via-rose-500 to-red-500 text-white flex items-center justify-center shadow-md shadow-red-500/25 shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-red-600 text-white shadow-xs">
                      OFFICIAL DBE NSC RESOURCE CENTER
                    </span>
                    <span className="text-xs font-bold text-red-700 dark:text-rose-300 hidden sm:inline">
                      Addendums, Annexures & Exam Texts
                    </span>
                  </div>
                  <h2 className="text-sm sm:text-base font-black text-slate-900 dark:text-white mt-0.5">
                    Official Grade 12 National Senior Certificate Source Materials
                  </h2>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className={`w-8 h-8 rounded-xl flex items-center justify-center border transition-all cursor-pointer ${
                  isDark 
                    ? 'bg-red-950/60 border-red-900 text-rose-200 hover:bg-red-900' 
                    : 'bg-white border-red-200 text-slate-700 hover:bg-red-50'
                }`}
                title="Close Resource Center"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Subject Selector Bar */}
            <div className={`flex items-center gap-1.5 px-3 py-2 border-b overflow-x-auto no-scrollbar shrink-0 ${
              isDark ? 'bg-[#18080f] border-red-950/80' : 'bg-rose-50/70 border-rose-200'
            }`}>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('maths_literacy');
                  setActiveItemKey('annexure_a');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  selectedCategory === 'maths_literacy'
                    ? 'bg-red-600 text-white shadow-xs'
                    : isDark ? 'text-rose-300 hover:bg-rose-950/50' : 'text-slate-700 hover:bg-white'
                }`}
              >
                <Calculator className="w-3.5 h-3.5" />
                <span>Maths Literacy Addendum</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('english');
                  setActiveItemKey('text_a');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  selectedCategory === 'english'
                    ? 'bg-red-600 text-white shadow-xs'
                    : isDark ? 'text-rose-300 hover:bg-rose-950/50' : 'text-slate-700 hover:bg-white'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>English FAL Texts (A–G)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('afrikaans');
                  setActiveItemKey('teks_a');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  selectedCategory === 'afrikaans'
                    ? 'bg-red-600 text-white shadow-xs'
                    : isDark ? 'text-rose-300 hover:bg-rose-950/50' : 'text-slate-700 hover:bg-white'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Afrikaans TAT Tekste (A–G)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('economics');
                  setActiveItemKey('econ_gva');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  selectedCategory === 'economics'
                    ? 'bg-red-600 text-white shadow-xs'
                    : isDark ? 'text-rose-300 hover:bg-rose-950/50' : 'text-slate-700 hover:bg-white'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Economics P1 Extracts</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('accounting');
                  setActiveItemKey('acc_layout');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  selectedCategory === 'accounting'
                    ? 'bg-red-600 text-white shadow-xs'
                    : isDark ? 'text-rose-300 hover:bg-rose-950/50' : 'text-slate-700 hover:bg-white'
                }`}
              >
                <TableIcon className="w-3.5 h-3.5" />
                <span>Accounting & Business</span>
              </button>
            </div>

            {/* Sub-item Carousel Tabs */}
            <div className={`flex overflow-x-auto no-scrollbar border-b px-2 py-2 gap-1.5 shrink-0 ${
              isDark ? 'bg-[#18070d] border-red-900/80' : 'bg-red-50/50 border-red-200'
            }`}>
              {selectedCategory === 'maths_literacy' && mathKeys.map((key) => {
                const item = MATH_ANNEXURES[key];
                const isSelected = activeItemKey === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveItemKey(item.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border shrink-0 cursor-pointer ${
                      isSelected
                        ? 'bg-red-600 text-white border-red-500 shadow-sm'
                        : isDark
                        ? 'bg-[#220c13] text-rose-300 border-red-950 hover:border-red-700 hover:bg-[#2c1019]'
                        : 'bg-white text-slate-700 border-rose-200 hover:border-red-300 hover:bg-red-50/80'
                    }`}
                  >
                    {item.code}
                  </button>
                );
              })}

              {selectedCategory !== 'maths_literacy' && textKeys.map((key) => {
                const item = ALL_TEXT_RESOURCES[key];
                const isSelected = activeItemKey === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveItemKey(item.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border shrink-0 cursor-pointer ${
                      isSelected
                        ? 'bg-red-600 text-white border-red-500 shadow-sm'
                        : isDark
                        ? 'bg-[#220c13] text-rose-300 border-red-950 hover:border-red-700 hover:bg-[#2c1019]'
                        : 'bg-white text-slate-700 border-rose-200 hover:border-red-300 hover:bg-red-50/80'
                    }`}
                  >
                    {item.code}
                  </button>
                );
              })}
            </div>

            {/* Search Input Bar */}
            <div className={`px-4 py-2 border-b flex items-center gap-2 shrink-0 ${
              isDark ? 'bg-[#14060b] border-red-950/60' : 'bg-white border-rose-100'
            }`}>
              <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search keywords, paragraph text, or formulas..."
                className="w-full bg-transparent text-xs font-medium outline-none placeholder:text-slate-400"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="text-[10px] font-bold text-red-600 hover:underline cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Modal Body Content */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              {/* MATHEMATICAL LITERACY RENDER */}
              {selectedCategory === 'maths_literacy' && activeMathItem && (
                <div className="space-y-4">
                  <div className={`p-4 rounded-2xl border ${
                    isDark ? 'bg-[#1b0810] border-red-950/80' : 'bg-red-50/60 border-red-200'
                  }`}>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-red-600 text-white">
                        {activeMathItem.code}
                      </span>
                      <span className="text-xs font-bold text-slate-500 dark:text-rose-300">
                        {activeMathItem.source}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white mt-1">
                      {activeMathItem.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-rose-200/80 mt-0.5">
                      {activeMathItem.subtitle}
                    </p>
                    {activeMathItem.notes && (
                      <div className="mt-2 text-xs font-medium text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 p-2.5 rounded-xl border border-amber-200 dark:border-amber-900/60">
                        📌 {activeMathItem.notes}
                      </div>
                    )}
                  </div>

                  {/* Render Visual / Table / Chart for Math Annexure */}
                  <div className="overflow-x-auto rounded-2xl border border-red-200 dark:border-red-950/80 shadow-xs">
                    <MathAnnexureViewer 
                      question={{ id: 9999, question: activeMathItem.code, annexureRef: activeMathItem.id } as any}
                    />
                  </div>
                </div>
              )}

              {/* READING TEXTS & EXTRACTS RENDER */}
              {selectedCategory !== 'maths_literacy' && activeTextItem && (
                <div className="space-y-4">
                  <div className={`p-4 rounded-2xl border ${
                    isDark ? 'bg-[#1b0810] border-red-950/80' : 'bg-red-50/60 border-red-200'
                  }`}>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-red-600 text-white">
                        {activeTextItem.code}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white dark:bg-black/40 border border-red-200 dark:border-red-900 text-red-600 dark:text-rose-400">
                        {activeTextItem.type}
                      </span>
                      <span className="text-xs font-bold text-slate-500 dark:text-rose-300">
                        {activeTextItem.source}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white mt-1">
                      {activeTextItem.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-rose-200/80 mt-0.5">
                      {activeTextItem.subtitle}
                    </p>
                  </div>

                  {/* Paragraphs with line numbers and clear reading typography */}
                  <div className="space-y-3 font-serif">
                    {activeTextItem.paragraphs.map((p, idx) => (
                      <div 
                        key={idx}
                        className={`p-3.5 rounded-xl border text-xs sm:text-sm leading-relaxed transition-colors ${
                          searchQuery && p.toLowerCase().includes(searchQuery.toLowerCase())
                            ? 'bg-amber-50 dark:bg-amber-950/50 border-amber-300 text-amber-900 dark:text-amber-100 ring-2 ring-amber-400/30'
                            : isDark
                            ? 'bg-[#18070d] border-red-950/60 text-rose-50'
                            : 'bg-white border-rose-100 text-slate-800'
                        }`}
                      >
                        <p>{p}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer with jump notice */}
            <div className={`px-5 py-3 border-t flex items-center justify-between text-xs font-semibold shrink-0 ${
              isDark ? 'bg-[#18080f] border-red-950/80 text-rose-300' : 'bg-red-50/60 border-red-200 text-slate-600'
            }`}>
              <span>Official Department of Basic Education (DBE) Curriculum Reference</span>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs shadow-xs cursor-pointer"
              >
                Return to Exam Question
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
