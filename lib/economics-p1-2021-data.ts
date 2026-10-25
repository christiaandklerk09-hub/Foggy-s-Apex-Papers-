import { QuizPaper } from '@/types/quiz';

export const ECONOMICS_P1_2021_PAPER: QuizPaper = {
  id: 'economics-p1-nov-2021',
  subjectId: 'economics',
  title: 'NATIONAL SENIOR CERTIFICATE',
  subtitle: 'Economics P1 (November 2021)',
  code: 'ECON-P1-2021',
  chapterNumber: 3,
  paperNumber: 1,
  totalMarks: 150,
  passMark: 75,
  timeLimitMinutes: 120,
  description: 'Official DBE Grade 12 National Senior Certificate Economics Paper 1 (November 2021) examination covering Macroeconomics (Circular flow, National accounts, Fiscal policy, Multiplier, Terms of trade, Business cycles) and Economic Pursuits (Protectionism, Free trade, SEZs, Industrial Development, Regional Development, and COVID-19 economic recovery).',
  questions: [
    // =========================================================================
    // SECTION A (COMPULSORY) - 30 MARKS - 20 MINUTES
    // =========================================================================

    // -------------------------------------------------------------------------
    // 1.1 MULTIPLE-CHOICE QUESTIONS (8 x 2 = 16 Marks)
    // -------------------------------------------------------------------------
    {
      id: 601,
      subjectId: 'economics',
      paperId: 'economics-p1-nov-2021',
      question: '1.1.1 Long-term financial instruments, such as shares, are traded in the … market.',
      category: 'Section A · 1.1 Multiple Choice (Financial Markets)',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'money' },
        { letter: 'B', text: 'capital' },
        { letter: 'C', text: 'foreign exchange' },
        { letter: 'D', text: 'labour' }
      ],
      correctAnswer: 'B',
      explanation: 'B - capital (✓✓)\nLong-term financial instruments such as shares, equities, and debentures are traded in the capital market (e.g. the Johannesburg Stock Exchange - JSE), whereas short-term financial instruments are traded in the money market.'
    },
    {
      id: 602,
      subjectId: 'economics',
      paperId: 'economics-p1-nov-2021',
      question: '1.1.2 Business cycles that are caused by changes in the construction industry that last for 15 to 20 years are called … cycles.',
      category: 'Section A · 1.1 Multiple Choice (Business Cycles)',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'Kuznets' },
        { letter: 'B', text: 'Kitchin' },
        { letter: 'C', text: 'Jugler' },
        { letter: 'D', text: 'Kondratieff' }
      ],
      correctAnswer: 'A',
      explanation: 'A - Kuznets (✓✓)\nKuznets cycles last 15 to 20 years and are associated with infrastructural investment and building/construction activity. (Kitchin: 3–5 years inventory cycles; Juglar: 7–11 years equipment investment cycles; Kondratieff: 50+ years technological wave cycles).'
    },
    {
      id: 603,
      subjectId: 'economics',
      paperId: 'economics-p1-nov-2021',
      question: '1.1.3 Transfer of ownership of entities from the private sector to the public sector is called …',
      category: 'Section A · 1.1 Multiple Choice (Public Sector)',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'privatisation.' },
        { letter: 'B', text: 'commercialisation.' },
        { letter: 'C', text: 'deregulation.' },
        { letter: 'D', text: 'nationalisation.' }
      ],
      correctAnswer: 'D',
      explanation: 'D - nationalisation (✓✓)\nNationalisation is the transfer of ownership and control of private sector enterprises or assets into public ownership by the state. Privatisation is the transfer from public to private ownership.'
    },
    {
      id: 604,
      subjectId: 'economics',
      paperId: 'economics-p1-nov-2021',
      question: '1.1.4 Investment contracts that base their value on the underlying assets, such as currencies and commodities, are known as …',
      category: 'Section A · 1.1 Multiple Choice (Financial Derivatives)',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'other investments.' },
        { letter: 'B', text: 'direct investments.' },
        { letter: 'C', text: 'financial derivatives.' },
        { letter: 'D', text: 'portfolio investments.' }
      ],
      correctAnswer: 'C',
      explanation: 'C - financial derivatives (✓✓)\nFinancial derivatives are financial contracts (such as futures, options, swaps, and forwards) whose value is derived from underlying benchmark assets like interest rates, currencies, commodities, or bonds.'
    },
    {
      id: 605,
      subjectId: 'economics',
      paperId: 'economics-p1-nov-2021',
      question: '1.1.5 The international organisation that reduces tariffs and other trade barriers to liberalise trade is called the …',
      category: 'Section A · 1.1 Multiple Choice (International Trade)',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'World Bank.' },
        { letter: 'B', text: 'International Monetary Fund.' },
        { letter: 'C', text: 'World Trade Organisation.' },
        { letter: 'D', text: 'World Health Organisation.' }
      ],
      correctAnswer: 'C',
      explanation: 'C - World Trade Organisation (✓✓)\nThe World Trade Organisation (WTO) is the multilateral global institution that administers trade agreements, resolves trade disputes, and negotiates the reduction of customs tariffs and non-tariff trade barriers.'
    },
    {
      id: 606,
      subjectId: 'economics',
      paperId: 'economics-p1-nov-2021',
      question: '1.1.6 The growth and development policy that aims to eliminate poverty and reduce inequality by 2030, is known as the …',
      category: 'Section A · 1.1 Multiple Choice (Development Policies)',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'National Development Plan.' },
        { letter: 'B', text: 'Reconstruction and Development Programme.' },
        { letter: 'C', text: 'Growth, Employment and Redistribution Programme.' },
        { letter: 'D', text: 'Accelerated and Shared Growth Initiative for South Africa.' }
      ],
      correctAnswer: 'A',
      explanation: 'A - National Development Plan (✓✓)\nThe National Development Plan (NDP) is South Africa’s comprehensive socio-economic roadmap targeting the eradication of poverty and reduction of extreme inequality by the year 2030.'
    },
    {
      id: 607,
      subjectId: 'economics',
      paperId: 'economics-p1-nov-2021',
      question: '1.1.7 A cash incentive that aims to provide investment in the training of the South African labour force to gain new expertise, is called the …',
      category: 'Section A · 1.1 Multiple Choice (Incentives & Skills)',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'Critical Infrastructure Programme.' },
        { letter: 'B', text: 'Skills Support Programme.' },
        { letter: 'C', text: 'Custom Free Incentives.' },
        { letter: 'D', text: 'Small Business Support Programme.' }
      ],
      correctAnswer: 'B',
      explanation: 'B - Skills Support Programme (✓✓)\nThe Skills Support Programme (SSP) is a cash grant incentive administered by the Department of Trade, Industry and Competition (DTIC) to encourage enterprise investment in training South African workers.'
    },
    {
      id: 608,
      subjectId: 'economics',
      paperId: 'economics-p1-nov-2021',
      question: '1.1.8 The percentage of the population living in poverty in a country is indicated by …',
      category: 'Section A · 1.1 Multiple Choice (Social Indicators)',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'the Gini coefficient.' },
        { letter: 'B', text: 'life expectancy.' },
        { letter: 'C', text: 'per capita gross domestic product.' },
        { letter: 'D', text: 'the headcount index.' }
      ],
      correctAnswer: 'D',
      explanation: 'D - the headcount index (✓✓)\nThe poverty headcount index calculates the proportion or percentage of a country\'s population that lives below the designated national poverty line.'
    },

    // -------------------------------------------------------------------------
    // 1.2 MATCHING ITEMS (8 x 1 = 8 Marks)
    // -------------------------------------------------------------------------
    {
      id: 609,
      subjectId: 'economics',
      paperId: 'economics-p1-nov-2021',
      question: '1.2 Choose a description from COLUMN B that matches the item in COLUMN A. Write only the letter (A–I) next to the question numbers (1.2.1–1.2.8) in the ANSWER BOOK.\n\nCOLUMN A:\n1.2.1 Transfer payment\n1.2.2 Investment\n1.2.3 Cash reserve requirements\n1.2.4 Price discrimination\n1.2.5 Social indicator\n1.2.6 Desirable mix\n1.2.7 Industrial development zones\n1.2.8 Expanded Public Works Programme\n\nCOLUMN B:\nA. combination of international trade policies suitable for the prevailing conditions in an economy\nB. monitors identifiable and definable issues related to human well-being\nC. nationwide government intervention to create employment using labour intensive methods\nD. money received without any productive service rendered\nE. charging different customers, different prices for the same product\nF. spending by businesses on capital goods\nG. used to control money supply through buying and selling of government securities\nH. purpose-built industrial estates that are physically enclosed and link to international ports\nI. the minimum amount of money that the South African Reserve Bank requires banks to maintain in order to manipulate money creation activities',
      category: 'Section A · 1.2 Matching Items (Column A & B)',
      type: 'matching',
      marks: 8,
      correctAnswer: '1.2.1 D, 1.2.2 F, 1.2.3 I, 1.2.4 E, 1.2.5 B, 1.2.6 A, 1.2.7 H, 1.2.8 C',
      explanation: 'Official DBE Marking Guidelines (8 x 1 = 8 Marks):\n1.2.1 D - money received without an productive service rendered (✓)\n1.2.2 F - spending by businesses on capital goods (✓)\n1.2.3 I - the minimum amount of money required by the South African Reserve Bank for banks to maintain, in order to manipulate money creation activities (✓)\n1.2.4 E - charging different prices to different customers for the same product (✓)\n1.2.5 B - monitors identifiable and definable issues related to human well-being (✓)\n1.2.6 A - combination of international trade policies suitable for the prevailing conditions in an economy (✓)\n1.2.7 H - purpose-built industrial estates that are physically enclosed and link to international ports (✓)\n1.2.8 C - a nationwide government intervention to create employment using labour intensive methods (✓)'
    },

    // -------------------------------------------------------------------------
    // 1.3 GIVE THE TERM (6 x 1 = 6 Marks)
    // -------------------------------------------------------------------------
    {
      id: 610,
      subjectId: 'economics',
      paperId: 'economics-p1-nov-2021',
      question: '1.3 Give ONE term for each of the following descriptions. Write only the term next to the question numbers (1.3.1 to 1.3.6) in the ANSWER BOOK. Abbreviations, acronyms and examples will NOT be accepted.\n\n1.3.1 When a country involved in international trade, produces more output than other countries given the same input\n1.3.2 A document that details expected revenue and projected expenditure for the next fiscal year\n1.3.3 Tax systems where low-income earners pay higher tax rates while high-income earners pay lower tax rates\n1.3.4 The provision of incentives to encourage local businesses to produce goods to sell to other countries\n1.3.5 The process that focuses on the improvement of people\'s standard of living\n1.3.6 The industrial development strategy that focuses on improving the competitiveness in manufacturing by considering input prices and technology.',
      category: 'Section A · 1.3 Give The Term',
      type: 'text',
      marks: 6,
      correctAnswer: '1.3.1 Absolute advantage, 1.3.2 Annual budget / National budget / main budget, 1.3.3 Regressive, 1.3.4 Export promotion, 1.3.5 Economic development, 1.3.6 Integrated Manufacturing Strategy',
      explanation: 'Official DBE Marking Guidelines (6 x 1 = 6 Marks):\n1.3.1 Absolute advantage (✓)\n1.3.2 Annual budget / National budget / main budget (✓)\n1.3.3 Regressive (✓)\n1.3.4 Export promotion (✓)\n1.3.5 Economic development (✓)\n1.3.6 Integrated Manufacturing Strategy (✓)'
    },

    // =========================================================================
    // SECTION B - QUESTION 2: MACROECONOMICS (40 MARKS – 30 MINUTES)
    // =========================================================================
    {
      id: 611,
      subjectId: 'economics',
      paperId: 'economics-p1-nov-2021',
      question: '2.1.1 Name any TWO participants of the circular-flow model. (2 x 1) (2)',
      category: 'Section B · Question 2.1 Macroeconomics (Circular-Flow Model)',
      type: 'text',
      marks: 2,
      correctAnswer: 'Households, Business sector, Government, Foreign sector',
      explanation: 'Official DBE Marking Guidelines (Any 2 x 1 = 2 Marks):\n• Households (✓)\n• Business sector / Firms (✓)\n• Government / Public sector (✓)\n• Foreign sector / Rest of the world (✓)'
    },
    {
      id: 612,
      subjectId: 'economics',
      paperId: 'economics-p1-nov-2021',
      question: '2.1.2 Why does public sector failure lead to social instability? (1 x 2) (2)',
      category: 'Section B · Question 2.1 Macroeconomics (Public Sector Failure)',
      type: 'text',
      marks: 2,
      correctAnswer: 'The lives of people are destabilised, and their human rights compromised; communities become disgruntled and start making demands through protesting.',
      explanation: 'Official DBE Marking Guidelines (1 x 2 = 2 Marks):\n• The lives of people are destabilised, and their human rights compromised (✓✓)\n• The community becomes disgruntled and start making their demands through protesting (✓✓)\n(Accept any other correct relevant response)'
    },

    // 2.2 DATA RESPONSE: GROSS VALUE ADDED TABLE
    {
      id: 613,
      subjectId: 'economics',
      paperId: 'economics-p1-nov-2021',
      question: '2.2.1 Identify the base year that the South African Reserve Bank uses to compile national accounts aggregates. (1)\n[Refer to Table: GROSS VALUE ADDED BY KIND OF ECONOMIC ACTIVITY]',
      category: 'Section B · Question 2.2 National Accounts (Base Year)',
      type: 'text',
      marks: 1,
      correctAnswer: '2015',
      explanation: 'Official DBE Marking Guidelines:\n2015 (✓) (As indicated in the constant price column: At constant 2015 prices).'
    },
    {
      id: 614,
      subjectId: 'economics',
      paperId: 'economics-p1-nov-2021',
      question: '2.2.2 Give the alternative term used for gross value added in national accounts. (1)\n[Refer to Table: GROSS VALUE ADDED BY KIND OF ECONOMIC ACTIVITY]',
      category: 'Section B · Question 2.2 National Accounts (GVA Alternative Term)',
      type: 'text',
      marks: 1,
      correctAnswer: 'Gross domestic product / GDP(P)',
      explanation: 'Official DBE Marking Guidelines:\nGross domestic product / GDP(P) (✓)'
    },
    {
      id: 615,
      subjectId: 'economics',
      paperId: 'economics-p1-nov-2021',
      question: '2.2.3 Briefly describe the term gross value added. (2)\n[Refer to Table: GROSS VALUE ADDED BY KIND OF ECONOMIC ACTIVITY]',
      category: 'Section B · Question 2.2 National Accounts (Gross Value Added Definition)',
      type: 'text',
      marks: 2,
      correctAnswer: 'The value that is added on the goods at every stage of the production process.',
      explanation: 'Official DBE Marking Guidelines:\nThe value that is added on the goods at every stage of the production process (✓✓)\n(Accept any other correct relevant response)'
    },
    {
      id: 616,
      subjectId: 'economics',
      paperId: 'economics-p1-nov-2021',
      question: '2.2.4 How are basic prices converted to market prices? (2)\n[Refer to Table: GROSS VALUE ADDED BY KIND OF ECONOMIC ACTIVITY]',
      category: 'Section B · Question 2.2 National Accounts (Price Conversion Formula)',
      type: 'text',
      marks: 2,
      correctAnswer: 'Taxes on products are added to and subsidies on products are subtracted from gross domestic product at basic prices: GVA at basic prices + taxes on products - subsidies on products = GDP @ market prices.',
      explanation: 'Official DBE Marking Guidelines (2 Marks):\nTaxes on products are added to and subsidies on products are subtracted from gross domestic product at basic prices to get gross domestic product at market prices / GVA at basic prices PLUS taxes on products MINUS subsidies on products = GDP @ market prices (✓✓)\n(Accept any other correct relevant response)'
    },
    {
      id: 617,
      subjectId: 'economics',
      paperId: 'economics-p1-nov-2021',
      question: '2.2.5 Why would economists prefer constant prices to current prices when measuring economic growth? (2 x 2) (4)\n[Refer to Table: GROSS VALUE ADDED BY KIND OF ECONOMIC ACTIVITY]',
      category: 'Section B · Question 2.2 National Accounts (Constant vs Current Prices)',
      type: 'text',
      marks: 4,
      correctAnswer: 'Constant prices exclude the distortionary effects of inflation, providing a true reflection of the actual volume of goods and services produced, and allowing accurate comparisons over time.',
      explanation: 'Official DBE Marking Guidelines (Any 2 x 2 = 4 Marks):\n• Constant prices are adjusted to exclude the effects of inflation, whereas current prices are not adjusted (✓✓)\n• Constant prices provide a true reflection on actual changes in production of goods and services, while current prices gives a distorted reflection (✓✓)\n• Current prices give a distorted indication of the actual growth of the economy (✓✓)\n• Measuring economic growth using constant prices provides accurate data to policy makers to make informed decisions (✓✓)\n• Constant prices help to make accurate comparison of economic performance from year to year (✓✓)\n(Accept any other correct relevant response)'
    },

    // 2.3 DATA RESPONSE: PUBLIC DEBT EXTRACT
    {
      id: 618,
      subjectId: 'economics',
      paperId: 'economics-p1-nov-2021',
      question: '2.3.1 Name the government department responsible for the formulation and implementation of fiscal policy. (1)\n[Refer to Extract: PUBLIC DEBT ON THE INCREASE]',
      category: 'Section B · Question 2.3 Fiscal Policy (Department Responsible)',
      type: 'text',
      marks: 1,
      correctAnswer: 'Department of Finance / National Treasury',
      explanation: 'Official DBE Marking Guidelines:\nDepartment of Finance / National Treasury (✓)'
    },
    {
      id: 619,
      subjectId: 'economics',
      paperId: 'economics-p1-nov-2021',
      question: '2.3.2 Give the benchmark percentage of public debt in relation to gross domestic product. (1)\n[Refer to Extract: PUBLIC DEBT ON THE INCREASE]',
      category: 'Section B · Question 2.3 Fiscal Policy (Debt-to-GDP Benchmark)',
      type: 'text',
      marks: 1,
      correctAnswer: 'Not more than 60%',
      explanation: 'Official DBE Marking Guidelines:\nNot more than 60% (✓)'
    },
    {
      id: 620,
      subjectId: 'economics',
      paperId: 'economics-p1-nov-2021',
      question: '2.3.3 Briefly describe the term medium-term expenditure framework. (2)\n[Refer to Extract: PUBLIC DEBT ON THE INCREASE]',
      category: 'Section B · Question 2.3 Fiscal Policy (MTEF Definition)',
      type: 'text',
      marks: 2,
      correctAnswer: 'It shows government\'s income and expenditure estimates for a 3-year rolling period.',
      explanation: 'Official DBE Marking Guidelines:\nIt shows government\'s income and expenditure estimates for a 3-year period (✓✓)\n(Accept any other correct relevant response)'
    },
    {
      id: 621,
      subjectId: 'economics',
      paperId: 'economics-p1-nov-2021',
      question: '2.3.4 Why is there a need for government to spend more on social development? (2)\n[Refer to Extract: PUBLIC DEBT ON THE INCREASE]',
      category: 'Section B · Question 2.3 Fiscal Policy (Social Development Need)',
      type: 'text',
      marks: 2,
      correctAnswer: 'High poverty rates, high unemployment increasing dependency on the state, and job losses from the Covid-19 pandemic requiring social support.',
      explanation: 'Official DBE Marking Guidelines (2 Marks):\n• A significant number of the South African population are still living in poverty; thus, the government should allocate more resources to improve their standard of living (✓✓)\n• The unemployment figure is the highest in the world due to low level skills, decreased GDP and a lack of investment. High unemployment rate increases the dependency rate on government, this therefore compels the government to increase spending on activities that improves lives of the people (✓✓)\n• Many people lost their jobs and sources of income due to the Covid-19 pandemic and would need grants to survive (✓✓)\n(Accept any other correct relevant response)'
    },
    {
      id: 622,
      subjectId: 'economics',
      paperId: 'economics-p1-nov-2021',
      question: '2.3.5 How can income tax brackets influence taxpayers? (2 x 2) (4)\n[Refer to Extract: PUBLIC DEBT ON THE INCREASE]',
      category: 'Section B · Question 2.3 Fiscal Policy (Bracket Creep & Tax Relief)',
      type: 'text',
      marks: 4,
      correctAnswer: 'Bracket creep occurs when higher nominal income pushes taxpayers into higher brackets without real wage growth; adjusting brackets upwards prevents this and gives tax relief that increases disposable income.',
      explanation: 'Official DBE Marking Guidelines (Any 2 x 2 = 4 Marks):\n• An increase in income can push taxpayers into higher tax brackets, if tax brackets remain the same, resulting in higher taxes (Bracket creep) (✓✓)\n• Taxpayers do not receive the full benefits of an increase in their wages (✓✓)\n• An increase in income will not shift households to higher tax brackets, if tax brackets increase, thus preventing bracket creep (✓✓)\n• Tax relief will be provided to workers as their existing salary may fall in a lower tax bracket (✓✓)\n• Their disposable income can increase allowing them to spend more on goods and services (✓✓)\n(NB: Accept explanation for decrease in tax bracket reducing disposable income)'
    },

    // 2.4 MULTIPLIER CONCEPT GRAPH & EXPLANATION
    {
      id: 623,
      subjectId: 'economics',
      paperId: 'economics-p1-nov-2021',
      question: '2.4 With the aid of a correctly labelled graph, explain the multiplier concept. (8)\n[Refer to Diagram: THE MULTIPLIER EFFECT]',
      category: 'Section B · Question 2.4 Multiplier Effect (Graph & Explanation)',
      type: 'text',
      marks: 8,
      correctAnswer: 'Graph: Vertical axis Expenditure, horizontal axis Income, 45-degree line E=Y, shift from E=C+I to E1=C+I. Explanation: Small increase in spending (injection) causes a proportionately larger increase in national income from Y to Y1.',
      explanation: 'Official DBE Marking Guidelines (8 Marks Total):\n\nGraph Marking (Max 4 Marks):\n• Labelling of axes (Vertical: Expenditure, Horizontal: Income) = 1 mark (✓)\n• Labelling on axes (0, AE, AE1, Y, Y1, 45°) = 1 mark (✓)\n• Shift of Consumption/Expenditure function (E = C+I to E1 = C+I) = 1 mark (✓)\n• E = Y (45-degree equilibrium guide line) = 1 mark (✓)\n\nExplanation Marking (Max 4 Marks, 2 x 2 = 4):\n• The multiplier effect occurs when a small increase in spending leads to a proportionately larger increase in national income (✓✓)\n• At an income of Y the expenditure curve intersects the vertical axis at AE (✓✓)\n• An increase from AE to AE1 means more money is injected in the economy (✓✓)\n• This causes a proportionately larger increase in income from Y to Y1 (✓✓)\n(Explanation must relate to the graph to earn marks)'
    },

    // 2.5 TERMS OF TRADE INFLUENCE
    {
      id: 624,
      subjectId: 'economics',
      paperId: 'economics-p1-nov-2021',
      question: '2.5 How can changes in terms of trade influence the South African economy? (8)',
      category: 'Section B · Question 2.5 Terms of Trade Economic Influence',
      type: 'text',
      marks: 8,
      correctAnswer: 'An improvement in terms of trade (higher export prices/lower import prices) increases export revenue, improves economic welfare, and reduces the balance of payments deficit; a deterioration worsens import costs and increases the deficit.',
      explanation: 'Official DBE Marking Guidelines (8 Marks Total - Allocate max 2 marks for mere listing of facts/examples):\n• An improvement in the terms of trade comes as a result of an increase in export prices or/and a decrease in import prices (✓✓)\n• An increase in export prices would increase economic welfare in the short term, as more revenue is earned with the same/less expenditure on imports (✓✓)\n• A decrease in import prices would result in less expenditure or less payments on imports in the short term (✓✓)\n• Higher export earnings and lower import payments may reduce Balance of Payments deficit in the short term (✓✓)\n• Less resources would be used to produce exports to pay for imports (✓✓)\n• Demand for South African exports may decrease in the long run due to higher prices (✓✓)\n• A decrease in the terms of trade comes as a result of a decrease in export prices or/and an increase in import prices (✓✓)\n• A decrease in export prices would decrease economic welfare in the short term, as less revenue is earned with the same/less expenditure on imports (✓✓)\n• An increase in import prices would result in more expenditure or more payments on imports in the short term (✓✓)\n• Lower export earnings and higher import payments may increase the Balance of Payments deficit in the short term (✓✓)\n• More resources would be used to produce exports to pay for imports (✓✓)\n• Demand for South African exports may increase in the long run due to lower prices (✓✓)\nOR\n• An increase in exports will encourage development of the country’s industrial capacity (✓✓)\n• More foreign exchange will be earned to pay for imports (✓✓)\n• Increased exports may lead to an improvement of the Balance of Payments (✓✓)\n• Increase in imports may lead to the depreciation of the exchange rate and it will be expensive for South Africa to buy from other countries (✓✓)'
    },

    // =========================================================================
    // SECTION B - QUESTION 3: ECONOMIC PURSUITS (40 MARKS – 30 MINUTES)
    // =========================================================================
    {
      id: 625,
      subjectId: 'economics',
      paperId: 'economics-p1-nov-2021',
      question: '3.1.1 Name any TWO methods of import substitution. (2 x 1) (2)',
      category: 'Section B · Question 3.1 Economic Pursuits (Import Substitution Methods)',
      type: 'text',
      marks: 2,
      correctAnswer: 'Tariffs, Quotas, Subsidies, Exchange control, Diverting trade / import deposits, Embargo',
      explanation: 'Official DBE Marking Guidelines (Any 2 x 1 = 2 Marks):\n• Tariffs (ad-valorem tariff, specific tariff) (✓)\n• Diverting trade / import deposits / quality standards (✓)\n• Quotas (✓)\n• Subsidies (✓)\n• Exchange control (✓)\n• Physical control / Embargo (✓)\n(Accept any other correct relevant response)'
    },
    {
      id: 626,
      subjectId: 'economics',
      paperId: 'economics-p1-nov-2021',
      question: '3.1.2 How can the government use land restitution to achieve its development and redress objectives? (1 x 2) (2)',
      category: 'Section B · Question 3.1 Economic Pursuits (Land Restitution Objectives)',
      type: 'text',
      marks: 2,
      correctAnswer: 'Return land or pay cash compensation to those who lost their land because of discriminatory laws in the past to improve the standard of living for previously disadvantaged people.',
      explanation: 'Official DBE Marking Guidelines (1 x 2 = 2 Marks):\nThe government can return land or pay cash compensation to those who lost their land because of discriminatory laws in the past to improve the standard of living for the previously disadvantaged people (✓✓)\n(Accept any other correct relevant response)'
    },

    // 3.2 DATA RESPONSE: 2030 ENERGY PLAN PIE CHART & EXTRACT
    {
      id: 627,
      subjectId: 'economics',
      paperId: 'economics-p1-nov-2021',
      question: '3.2.1 Identify the energy source that relates to the burning of fossil fuels. (1)\n[Refer to Chart & Info: SOUTH AFRICA\'S 2030 ENERGY PLAN]',
      category: 'Section B · Question 3.2 Energy Plan (Fossil Fuel Source)',
      type: 'text',
      marks: 1,
      correctAnswer: 'Coal',
      explanation: 'Official DBE Marking Guidelines:\nCoal (✓) (Accounting for 48% of the 2030 Energy Plan pie chart).'
    },
    {
      id: 628,
      subjectId: 'economics',
      paperId: 'economics-p1-nov-2021',
      question: '3.2.2 Give the index that is used to measure society\'s level of development. (1)\n[Refer to Chart & Info: SOUTH AFRICA\'S 2030 ENERGY PLAN]',
      category: 'Section B · Question 3.2 Energy Plan (Development Index)',
      type: 'text',
      marks: 1,
      correctAnswer: 'Human Development Index / HDI',
      explanation: 'Official DBE Marking Guidelines:\nHuman Development Index / HDI (✓)'
    },
    {
      id: 629,
      subjectId: 'economics',
      paperId: 'economics-p1-nov-2021',
      question: '3.2.3 Briefly describe the term economic indicator. (2)\n[Refer to Chart & Info: SOUTH AFRICA\'S 2030 ENERGY PLAN]',
      category: 'Section B · Question 3.2 Energy Plan (Economic Indicator Definition)',
      type: 'text',
      marks: 2,
      correctAnswer: 'Statistical data used to measure the performance of the economy or assist the government in formulating economic policy and forecasting future performance.',
      explanation: 'Official DBE Marking Guidelines:\nStatistical data used to measure the performance of the economy / statistical information used by government to determine future economic policy and to make predictions about future performance of the economy (✓✓)\n(Accept any other correct relevant response)'
    },
    {
      id: 630,
      subjectId: 'economics',
      paperId: 'economics-p1-nov-2021',
      question: '3.2.4 Explain the negative impact of rural-urban migration on the supply of services in urban areas. (2)\n[Refer to Chart & Info: SOUTH AFRICA\'S 2030 ENERGY PLAN]',
      category: 'Section B · Question 3.2 Energy Plan (Rural-Urban Migration Impact)',
      type: 'text',
      marks: 2,
      correctAnswer: 'Population increases put severe pressure on municipal water, sanitation, and electricity grids leading to load shedding and the mushrooming of unserviced informal settlements.',
      explanation: 'Official DBE Marking Guidelines (2 Marks):\n• Population increases in urban areas will put more pressure on the supply of services such as water and sanitation (✓✓)\n• Provision of housing will be unable to meet demand, resulting in informal settlements without proper infrastructure (✓✓)\n• Electricity demands in urban areas will put pressure on the power grid, leading to more load shedding (✓✓)\n• Constraints on local government regarding local budget and planning (✓✓)\n• Unlawful occupation of land that was set aside for agricultural production (✓✓)\n(Accept any other correct relevant response)'
    },
    {
      id: 631,
      subjectId: 'economics',
      paperId: 'economics-p1-nov-2021',
      question: '3.2.5 How will renewable sources of energy affect poor households in rural areas positively? (2 x 2) (4)\n[Refer to Chart & Info: SOUTH AFRICA\'S 2030 ENERGY PLAN]',
      category: 'Section B · Question 3.2 Energy Plan (Renewable Energy Positive Effects)',
      type: 'text',
      marks: 4,
      correctAnswer: 'Reduces energy costs, frees up disposable income for food and essentials, delivers clean accessible off-grid electricity, and improves respiratory health by reducing wood and paraffin smoke.',
      explanation: 'Official DBE Marking Guidelines (Any 2 x 2 = 4 Marks):\n• Cost of living for the households will decrease as they pay less for electricity/energy, resulting in an improved standard of living (✓✓)\n• Households will have more disposable income to spend on other basic goods and services (✓✓)\n• Electricity becomes more accessible to vulnerable communities (✓✓)\n• Clean energy sources will impact positively on the health of communities (✓✓)\n(Accept any other correct relevant response)'
    },

    // 3.3 DATA RESPONSE: SEZ HOW? SPECIAL ECONOMIC ZONES CARTOON
    {
      id: 632,
      subjectId: 'economics',
      paperId: 'economics-p1-nov-2021',
      question: '3.3.1 Identify the financial incentive that allows for the importing of intermediate goods without paying any tariffs. (1)\n[Refer to Cartoon & Info: SEZ how? Special Economic Zones]',
      category: 'Section B · Question 3.3 SEZ Policy (Duty-free Incentive)',
      type: 'text',
      marks: 1,
      correctAnswer: 'Duty-free',
      explanation: 'Official DBE Marking Guidelines:\nDuty-free (✓) (As indicated in the right dialogue bubble: offers Duty-free incentives).'
    },
    {
      id: 633,
      subjectId: 'economics',
      paperId: 'economics-p1-nov-2021',
      question: '3.3.2 Name any ONE special economic zone in South Africa. (1)\n[Refer to Cartoon & Info: SEZ how? Special Economic Zones]',
      category: 'Section B · Question 3.3 SEZ Policy (Name an SEZ)',
      type: 'text',
      marks: 1,
      correctAnswer: 'Coega SEZ / Richards Bay SEZ / East London SEZ / Saldanha Bay SEZ / Dube Tradeport SEZ / Atlantis SEZ / Tshwane Automotive SEZ',
      explanation: 'Official DBE Marking Guidelines (Any ONE = 1 Mark):\n• Coega SEZ (Eastern Cape) (✓)\n• Richards Bay SEZ (KZN) (✓)\n• East London SEZ (Eastern Cape) (✓)\n• Saldanha Bay SEZ (Western Cape) (✓)\n• Dube Tradeport SEZ (KZN) (✓)\n• Maluti-a-phofung SEZ (Free State) (✓)\n• OR Tambo IDZ (Gauteng) (✓)\n• Musina/Makhado SEZ (Limpopo) (✓)\n• Atlantis SEZ (Western Cape) (✓)\n• Nkomazi SEZ (Mpumalanga) (✓)\n• Tshwane Automotive SEZ (✓)'
    },
    {
      id: 634,
      subjectId: 'economics',
      paperId: 'economics-p1-nov-2021',
      question: '3.3.3 Briefly describe the term corridors. (2)\n[Refer to Cartoon & Info: SEZ how? Special Economic Zones]',
      category: 'Section B · Question 3.3 Regional Development (Corridors Definition)',
      type: 'text',
      marks: 2,
      correctAnswer: 'A track of land that forms a passageway allowing access from one area to another and is developed as part of regional development.',
      explanation: 'Official DBE Marking Guidelines:\nA corridor is a track of land that forms a passageway allowing access from one area to another and is developed as part of regional development (✓✓)\n(Accept any other correct relevant response)'
    },
    {
      id: 635,
      subjectId: 'economics',
      paperId: 'economics-p1-nov-2021',
      question: '3.3.4 How is the government using corporate tax to attract investments into special economic zones? (2)\n[Refer to Cartoon & Info: SEZ how? Special Economic Zones]',
      category: 'Section B · Question 3.3 SEZ Policy (Corporate Tax Incentives)',
      type: 'text',
      marks: 2,
      correctAnswer: 'The government reduced corporate income tax from 27% to 15% for businesses qualifying and operating within designated SEZs, lowering operational startup costs.',
      explanation: 'Official DBE Marking Guidelines (2 Marks):\n• The government reduced corporate tax from 27% to 15% for businesses that are established in SEZs (✓✓)\n• The tax relief makes it possible for new businesses to survive the first few years in production by reducing operational cost for them (✓✓)\n(Accept any other correct relevant response)'
    },
    {
      id: 636,
      subjectId: 'economics',
      paperId: 'economics-p1-nov-2021',
      question: '3.3.5 Explain the importance of public-private partnerships in spatial development initiatives. (2 x 2) (4)\n[Refer to Cartoon & Info: SEZ how? Special Economic Zones]',
      category: 'Section B · Question 3.3 Regional Development (PPP Importance in SDIs)',
      type: 'text',
      marks: 4,
      correctAnswer: 'Private enterprise brings investment capital, commercial agility, and technological innovation, while the government provides essential infrastructure (roads, rail, bulk water, and electricity).',
      explanation: 'Official DBE Marking Guidelines (Any 2 x 2 = 4 Marks):\n• It allows for private sector businesses to take advantage of the economic potential of underdeveloped areas (✓✓)\n• The private business may provide investment capital, while government provides infrastructure such as roads, water and electricity (✓✓)\n• More factors of production will be employed as more investments will be attracted (✓✓)\n• Businesses benefit from profits and government benefits from taxes, levies and decreased unemployment (✓✓)\n• Allows moving towards international competitiveness, regional cooperation and more diverse ownership base (✓✓)\n(Accept any other correct relevant response)'
    },

    // 3.4 AIMS OF REGIONAL DEVELOPMENT
    {
      id: 637,
      subjectId: 'economics',
      paperId: 'economics-p1-nov-2021',
      question: '3.4 Outline the aims of regional development. (4 x 2) (8)',
      category: 'Section B · Question 3.4 Regional Development Aims',
      type: 'text',
      marks: 8,
      correctAnswer: 'Reduce unequal economic distribution between provinces, stimulate economic activity in poorer peripheral areas, prevent new imbalances, implement national and regional industrial policies, and foster SMME growth.',
      explanation: 'Official DBE Marking Guidelines (Any 4 x 2 = 8 Marks - Allocate max 4 marks for mere listing of facts/examples):\n• Reduce unequal development of economic activities within a country (✓✓)\n• Stimulate development in poorer areas (✓✓)\n• Prevent new imbalances from emerging / enhance competitiveness of all provinces (✓✓)\n• Implement and coordinate the implementation of national and regional industrial policies (✓✓)\n• Stimulate the growth of SMMEs in the economy (✓✓)\n(Accept any other correct relevant response)'
    },

    // 3.5 ENVIRONMENTAL EFFECTS OF NORTHERN ECONOMIES
    {
      id: 638,
      subjectId: 'economics',
      paperId: 'economics-p1-nov-2021',
      question: '3.5 Analyse the environmental effects of economic activities of countries in the north. (8)',
      category: 'Section B · Question 3.5 Global Economics (Environmental Impact of Northern Countries)',
      type: 'text',
      marks: 8,
      correctAnswer: 'Mass production and industrial burning of fossil fuels emit greenhouse gases that deplete the ozone layer and drive global climate change, disproportionately impacting developing countries in the South through drought, degraded soils, and water contamination.',
      explanation: 'Official DBE Marking Guidelines (8 Marks Total - Allocate max 2 marks for mere listing of facts/examples):\n• Mass production and consumption in the north damages the ozone layer, caused by pollution and toxic substances (✓✓)\n• Northern countries are guilty of using big burners of oil and coal where CO2 damages the environment and creates climate change experienced worldwide (✓✓)\n• Greenhouse gases produced by large industries affect lives in the south more negatively due to their way of living (✓✓)\n• Climate change has necessitated international agreements like the Kyoto Protocol, to reduce greenhouse gases (✓✓)\n• Climate change results in less agricultural output due to poor soil conditions, inadequate and unreliable rainfall (✓✓)\n• The south is badly affected by degradation of land, and contamination of water and vegetation which causes malnutrition and hunger (✓✓)\n• Trade expansion can have an obvious direct impact on the environment due to higher pollution or degrading natural resources (✓✓)\n• Open markets can improve access to new technologies that make local production processes more efficient by diminishing the use of inputs such as energy, water, and other environmentally harmful substances (✓✓)\n• As a country becomes more integrated within the world economy, its export sector becomes more exposed to environmental requirements imposed by the leading importers (✓✓)\n(Accept any other correct relevant response)'
    },

    // =========================================================================
    // SECTION B - QUESTION 4: MACROECONOMICS & ECONOMIC PURSUITS (40 MARKS – 30 MIN)
    // =========================================================================
    {
      id: 639,
      subjectId: 'economics',
      paperId: 'economics-p1-nov-2021',
      question: '4.1.1 Name any TWO international benchmark criteria for regional development. (2 x 1) (2)',
      category: 'Section B · Question 4.1 Regional Development (Benchmark Criteria)',
      type: 'text',
      marks: 2,
      correctAnswer: 'Free-market operation, Competitiveness, Sustainability, Good governance, Provision of resources, Investment in social infrastructure, Integration, Partnerships',
      explanation: 'Official DBE Marking Guidelines (Any 2 x 1 = 2 Marks):\n• Free-market operation (✓)\n• Competitiveness (✓)\n• Sustainability (✓)\n• Good governance (✓)\n• Provision of resources (✓)\n• Investment in social infrastructure (✓)\n• Integration (✓)\n• Partnerships (✓)\n(Accept any other relevant response)'
    },
    {
      id: 640,
      subjectId: 'economics',
      paperId: 'economics-p1-nov-2021',
      question: '4.1.2 Why are liabilities added when calculating net direct investments in the financial account of the balance of payments? (1 x 2) (2)',
      category: 'Section B · Question 4.1 Balance of Payments (Financial Account Liabilities)',
      type: 'text',
      marks: 2,
      correctAnswer: 'Liabilities represent a capital inflow or money flow from the foreign sector into South Africa.',
      explanation: 'Official DBE Marking Guidelines (1 x 2 = 2 Marks):\nLiabilities represent a capital inflow or money flow from the foreign sector into South Africa (✓✓)'
    },

    // 4.2 DATA RESPONSE: WHY DO COUNTRIES TRADE?
    {
      id: 641,
      subjectId: 'economics',
      paperId: 'economics-p1-nov-2021',
      question: '4.2.1 Identify the supply reason for international trade addressed in the extract above. (1)\n[Refer to Extract: WHY DO COUNTRIES TRADE?]',
      category: 'Section B · Question 4.2 International Trade (Supply Reason)',
      type: 'text',
      marks: 1,
      correctAnswer: 'Natural resources / Technology',
      explanation: 'Official DBE Marking Guidelines:\nNatural resources (✓) OR Technology (✓)'
    },
    {
      id: 642,
      subjectId: 'economics',
      paperId: 'economics-p1-nov-2021',
      question: '4.2.2 Name the product explicitly recorded in the current account, due to its historic importance. (1)\n[Refer to Extract: WHY DO COUNTRIES TRADE?]',
      category: 'Section B · Question 4.2 Current Account (Historic Product)',
      type: 'text',
      marks: 1,
      correctAnswer: 'Gold / Net gold exports',
      explanation: 'Official DBE Marking Guidelines:\nGold / Net gold exports (✓)'
    },
    {
      id: 643,
      subjectId: 'economics',
      paperId: 'economics-p1-nov-2021',
      question: '4.2.3 Briefly describe the term mass production. (2)\n[Refer to Extract: WHY DO COUNTRIES TRADE?]',
      category: 'Section B · Question 4.2 International Trade (Mass Production Definition)',
      type: 'text',
      marks: 2,
      correctAnswer: 'The production of goods in large quantities which may reduce the average cost of production through economies of scale.',
      explanation: 'Official DBE Marking Guidelines:\nThe production of goods in large quantities which may reduce the average cost of production (✓✓)\n(Accept any other correct relevant response)'
    },
    {
      id: 644,
      subjectId: 'economics',
      paperId: 'economics-p1-nov-2021',
      question: '4.2.4 Explain the reason for South African consumers importing products that are available on domestic markets. (2)\n[Refer to Extract: WHY DO COUNTRIES TRADE?]',
      category: 'Section B · Question 4.2 International Trade (Consumer Import Choices)',
      type: 'text',
      marks: 2,
      correctAnswer: 'Imported products may offer better perceived quality, lower prices, distinct brand loyalty, or cater to varied consumer tastes and higher income brackets.',
      explanation: 'Official DBE Marking Guidelines (2 Marks):\n• Imported products may be of better quality than local products (✓✓)\n• Imported products may be available at lower prices (✓✓)\n• Some local consumers enjoy shopping exclusively because of brand loyalty, increase in income and due to different tastes (✓✓)\n(Accept any other correct relevant response)'
    },
    {
      id: 645,
      subjectId: 'economics',
      paperId: 'economics-p1-nov-2021',
      question: '4.2.5 How could natural disasters, such as a drought, influence the South African trade balance? (2 x 2) (4)\n[Refer to Extract: WHY DO COUNTRIES TRADE?]',
      category: 'Section B · Question 4.2 International Trade (Drought Influence on Trade Balance)',
      type: 'text',
      marks: 4,
      correctAnswer: 'Drought drastically reduces local agricultural output, slashing agricultural export earnings, while forcing South Africa to import expensive food staples like grain, weakening the trade balance.',
      explanation: 'Official DBE Marking Guidelines (Any 2 x 2 = 4 Marks):\n• Reduced local agricultural production will result in a decrease in exports (✓✓)\n• Local consumers will be forced to import more food products due to shortages on local markets (✓✓)\n• The trade balance will weaken as exports decrease while imports increase (✓✓)\n(Accept any other correct relevant response)'
    },

    // 4.3 DATA RESPONSE: SOUTH AFRICA'S ECONOMY HITS LOW CARTOON & STATS
    {
      id: 646,
      subjectId: 'economics',
      paperId: 'economics-p1-nov-2021',
      question: '4.3.1 Identify ONE component of aggregate demand in the information above. (1)\n[Refer to Cartoon & Stats: SOUTH AFRICA\'S ECONOMY HITS LOW]',
      category: 'Section B · Question 4.3 Aggregate Demand (Components)',
      type: 'text',
      marks: 1,
      correctAnswer: 'Exports / Household spending / consumer spending',
      explanation: 'Official DBE Marking Guidelines:\n• Exports (✓)\n• Household spending / consumer spending (✓)'
    },
    {
      id: 647,
      subjectId: 'economics',
      paperId: 'economics-p1-nov-2021',
      question: '4.3.2 Name the employment indicator that relates to the size of the labour force in the country. (1)\n[Refer to Cartoon & Stats: SOUTH AFRICA\'S ECONOMY HITS LOW]',
      category: 'Section B · Question 4.3 Labour Indicators (Labour Force Size)',
      type: 'text',
      marks: 1,
      correctAnswer: 'Economically active population / EAP',
      explanation: 'Official DBE Marking Guidelines:\nEconomically active population / EAP (✓)\n(Accept any other correct relevant response)'
    },
    {
      id: 648,
      subjectId: 'economics',
      paperId: 'economics-p1-nov-2021',
      question: '4.3.3 Briefly describe the term economic growth. (2)\n[Refer to Cartoon & Stats: SOUTH AFRICA\'S ECONOMY HITS LOW]',
      category: 'Section B · Question 4.3 Macroeconomics (Economic Growth Definition)',
      type: 'text',
      marks: 2,
      correctAnswer: 'An increase in the production of goods and services over time, measured as an increase in real GDP.',
      explanation: 'Official DBE Marking Guidelines:\nAn increase in the production of goods and services over time / an increase in real GDP (✓✓)\n(Accept any other correct relevant response)'
    },
    {
      id: 649,
      subjectId: 'economics',
      paperId: 'economics-p1-nov-2021',
      question: '4.3.4 Explain the impact of an increase in consumer spending on the production of goods and services. (2)\n[Refer to Cartoon & Stats: SOUTH AFRICA\'S ECONOMY HITS LOW]',
      category: 'Section B · Question 4.3 Macroeconomics (Consumer Spending Impact)',
      type: 'text',
      marks: 2,
      correctAnswer: 'Demand for goods and services will increase, encouraging businesses to expand production and utilize spare capacity.',
      explanation: 'Official DBE Marking Guidelines:\nDemand of goods and services will increase, encouraging businesses to produce more (✓✓)\n(Accept any other correct relevant response)'
    },
    {
      id: 650,
      subjectId: 'economics',
      paperId: 'economics-p1-nov-2021',
      question: '4.3.5 How can small, medium and microenterprises (SMMEs) contribute to economic growth and development? (2 x 2) (4)\n[Refer to Cartoon & Stats: SOUTH AFRICA\'S ECONOMY HITS LOW]',
      category: 'Section B · Question 4.3 Economic Pursuits (SMME Contributions)',
      type: 'text',
      marks: 4,
      correctAnswer: 'SMMEs generate widespread employment, boost aggregate demand, foster competition that lowers prices, expand state tax revenues, and enable skills acquisition.',
      explanation: 'Official DBE Marking Guidelines (Any 2 x 2 = 4 Marks):\n• More job opportunities will be created in both the formal and informal sector resulting in more sources of income (✓✓)\n• Increase in the aggregate demand will lead to higher production levels (✓✓)\n• Competition will increase, resulting in lower prices for goods and services (✓✓)\n• Tax revenue for the government will increase, leading to more social expenditure on the poor (✓✓)\n• Surplus products will be exported, and foreign currency will be earned to pay for imported inputs (✓✓)\n• Government support to create programs for the training of workers (✓✓)\n(Accept any other correct relevant response)'
    },

    // 4.4 EXCHANGE RATE STABILITY & PRICE STABILITY
    {
      id: 651,
      subjectId: 'economics',
      paperId: 'economics-p1-nov-2021',
      question: '4.4 Briefly discuss exchange rate stability and price stability as macroeconomic objectives of the state. (2 x 4) (8)',
      category: 'Section B · Question 4.4 Macroeconomic Objectives of the State',
      type: 'text',
      marks: 8,
      correctAnswer: 'Exchange rate stability: Limits uncertainty for traders/producers, managed via monetary and fiscal policy to attract foreign capital. Price stability: Maintains inflation within 3%–6% target band, preserves purchasing power and enables long-term business planning.',
      explanation: 'Official DBE Marking Guidelines (2 x 4 = 8 Marks - Allocate max 4 marks for mere listing of facts/examples):\n\nExchange rate stability:\n• Depreciation and appreciation of a currency create uncertainty for producers and traders and should therefore be limited (✓✓)\n• The government should manage the economy through monetary and fiscal policies so that the exchange rate remains relatively stable for as long as possible (✓✓)\n• South Africa pursues stable exchange rates to attract foreign capital (✓✓)\n\nPrice stability:\n• In a mixed economy, prices fluctuate as demand and supply change (✓✓)\n• Frequent and dramatic changes in prices affect economic growth and employment (✓✓)\n• The government attempts to guard against price instability (✓✓)\n• In South Africa, price stability means an inflation rate of between 3% and 6% (✓✓)\n• Stable prices enable firms and households to predict income and expenditure (✓✓)\n• Investor confidence is boosted by stable prices and attracts foreign direct investment (✓✓)\n(Accept any other correct relevant response)'
    },

    // 4.5 CHALLENGES IN REDUCING UNEMPLOYMENT
    {
      id: 652,
      subjectId: 'economics',
      paperId: 'economics-p1-nov-2021',
      question: '4.5 Analyse the challenges of the South African government in reducing the unemployment rate in the economy. (8)',
      category: 'Section B · Question 4.5 Labour Market (Challenges Reducing Unemployment)',
      type: 'text',
      marks: 8,
      correctAnswer: 'Corruption in SOEs creating negative investor sentiment, severe youth skills mismatch, COVID-19 pandemic job losses, lack of entrepreneurial startup capital, poor regional infrastructure, and load shedding/unreliable electricity supply.',
      explanation: 'Official DBE Marking Guidelines (8 Marks Total - Allocate max 2 marks for mere listing of facts/examples):\n• Corruption among state-owned enterprises creates a negative sentiment among potential investors (✓✓)\n• Lack of skills among the South African youth reduces the employability of many people (✓✓)\n• Lack of information among some of the youth reduces accessibility of employment opportunities (✓✓)\n• Covid-19 recession resulted in thousands of workers losing their jobs, sharply increasing the unemployment rate (✓✓)\n• Negative sentiment towards the economy resulted in less foreign direct investments (✓✓)\n• Lack of start-up capital among the youth result in many potential entrepreneurial ideas not invested in (✓✓)\n• Poor infrastructure in some regions of the country reduces industrial activities in such areas (✓✓)\n• Unreliable electricity supply further cripples any prospects of increasing job opportunities in South Africa (✓✓)\n(Accept any other correct relevant response)'
    },

    // =========================================================================
    // SECTION C: 40-MARK ESSAY QUESTIONS (ANSWER ONE OF TWO) - 40 MINUTES
    // =========================================================================
    {
      id: 653,
      subjectId: 'economics',
      paperId: 'economics-p1-nov-2021',
      question: 'QUESTION 5: MACROECONOMICS (40 MARKS – 40 MINUTES)\n\n• Discuss in detail the new economic paradigm in smoothing-out business cycles. (26 marks)\n• Evaluate the South African government\'s initiatives to reduce the economic downturn caused by the Covid-19 pandemic. (10 marks) [40]\n\nStructure your essay as follows in the Answer Book:\n• INTRODUCTION (Max 2)\n• BODY: MAIN PART (Max 26)\n• BODY: ADDITIONAL PART (Max 10)\n• CONCLUSION (Max 2)',
      category: 'Section C · Question 5 Essay (Macroeconomics: Business Cycles & COVID-19 Initiatives)',
      type: 'essay',
      marks: 40,
      correctAnswer: 'Comprehensive essay covering Introduction (2 marks), Body Main Part on demand-side and supply-side policies (26 marks), Additional Part evaluating COVID-19 initiatives (10 marks), and Conclusion (2 marks).',
      explanation: 'Official DBE Marking Guidelines (40 Marks Total):\n\nINTRODUCTION (Max 2):\n• The new economic paradigm suggests that it is possible to implement measures to promote economic growth and reduce unemployment without provoking inflation (✓✓)\n• The new economic paradigm is embedded in both demand-side and supply-side policies (✓✓)\n(Accept any other relevant introduction)\n\nBODY: MAIN PART (Max 26 - max 8 for headings/examples):\nDemand-side policies:\n• Traditional monetary and fiscal policies focus on aggregate demand (✓✓)\nMonetary policy:\n• When the level of economic activity is depressed the SARB can use expansionary measures to stimulate economic activities (✓✓)\n• Interest rates (repo rate) can be reduced to make borrowing cheaper and encourage spending by households and businesses (✓✓)\n• Increased spending increases economic activity; investment increases and more factors of production are employed (✓✓)\n• Higher levels of production, income and expenditure will be achieved (✓✓)\n• If supply does not increase in line with demand, inflation will increase (✓✓)\nFiscal policy:\n• When economic activity is low the Minister of Finance can use expansionary fiscal measures (✓✓)\n• An increase in government expenditure will increase aggregate demand and injections into the economy (✓✓)\n• Taxes can be reduced, leading to an increase in disposable income, consumer spending and investment (✓✓)\nInflation & Phillips Curve:\n• Aggregate demand and supply equilibrium illustrated at point C (AD=AS) and point E (AD1=AS1) (✓✓)\n• Fig (a) illustrates that if AD1 increases and AS does not respond, equilibrium shifts to point F, causing inflation (✓✓)\n• Phillips curve illustrates the inverse relationship between unemployment and inflation (natural rate at 14%) (✓✓)\nSupply-side policies:\n• Focuses on increasing flexibility of supply components to manage aggregate supply (✓✓)\n• Reduction of costs allows greater output to be supplied at any given price level (✓✓)\n• Government measures that reduce costs: infrastructure services, lower administrative costs, cash incentives/subsidies, export compensation (✓✓)\n• Measures to improve input efficiency: lower personal income tax rates, capital consumption replacement, human resource development, free advisory services (✓✓)\n• Measures to improve market efficiency: deregulation, competition promotion, levelling the economic playing field (✓✓)\n\nADDITIONAL PART (Max 10):\n• Reduction in repo rate to keep borrowing costs low stimulated consumer spending and investment (✓✓)\n• Loan guarantees for businesses with low turnover helped survive extra costs brought by COVID-19 (✓✓)\n• Relaxing regulatory requirements supported the flow of credit to households and businesses (✓✓)\n• Introduction of temporary payment holidays to support debtors (✓✓)\n• Tax deferral and postponement of new taxes encouraged businesses to continue operating, saving jobs (✓✓)\n• Temporary Employment Relief Scheme (TERS) supported workers and reduced retrenchments (✓✓)\n• Expansion of social grants (SRD R350) increased demand for goods and services (✓✓)\n• Reallocation of funds among departments caused some delivery failures (e.g. infrastructure) (✓✓)\n• Restrictions on non-essential trading (alcohol/tobacco) resulted in declining tax revenues (✓✓)\n• Borrowing of funds to fight the pandemic increased public debt significantly (✓✓)\n\nCONCLUSION (Max 2):\n• It is critically important for the government to focus on both demand-side and supply-side measures to ensure stability in the economy (✓✓)\n(Accept any other correct higher order, relevant conclusion)'
    },
    {
      id: 654,
      subjectId: 'economics',
      paperId: 'economics-p1-nov-2021',
      question: 'QUESTION 6: ECONOMIC PURSUITS (40 MARKS – 40 MINUTES)\n\n• Discuss the arguments in favour of protectionism. (26 marks)\n• How can South Africa benefit from trading in global markets? (10 marks) [40]\n\nStructure your essay as follows in the Answer Book:\n• INTRODUCTION (Max 2)\n• BODY: MAIN PART (Max 26)\n• BODY: ADDITIONAL PART (Max 10)\n• CONCLUSION (Max 2)',
      category: 'Section C · Question 6 Essay (Economic Pursuits: Protectionism & Global Markets)',
      type: 'essay',
      marks: 40,
      correctAnswer: 'Comprehensive essay covering Introduction (2 marks), Body Main Part on arguments in favour of protectionism (26 marks), Additional Part on South Africa\'s benefits from global trading (10 marks), and Conclusion (2 marks).',
      explanation: 'Official DBE Marking Guidelines (40 Marks Total):\n\nINTRODUCTION (Max 2):\n• A trade policy whereby the state implements measures to protect local industries against unfair competition from abroad (✓✓)\n(Accept any other correct relevant response)\n\nBODY: MAIN PART (Max 26 - max 8 for headings/examples):\n• Industrial development: Free trade makes it difficult for developing nations to compete with well-established older industries using unfair price-cutting; protection shields them until established (✓✓)\n• Infant industries: High average costs in initial years require temporary protection to grow and achieve economies of scale (✓✓)\n• Stable wage levels and high standard of living: Prevents domestic wages and living standards from being undermined by cheap imports from low-wage countries (✓✓)\n• Increased employment: Protects domestic manufacturers from closing down and causing widespread unemployment (✓✓)\n• Economic self-sufficiency and strategic key industries: Ensures survival of food, steel, energy, and medicine production during war, friction, or international crises (✓✓)\n• Maintaining domestic employment: Responds to high domestic unemployment; "Beggar thy neighbour" policy through import restrictions (✓✓)\n• Prevent dumping: Counteracts foreign exporters selling surplus goods below domestic cost of production to destroy local competition and capture markets (✓✓)\n• Stabilising exchange rates and balance of payments: Curbs excessive imports, reducing BoP deficits and stabilizing the domestic currency (✓✓)\n• Protection of natural resources: Prevents rapid exhaustion of scarce domestic resources through global over-exploitation (✓✓)\n• Ensures greater economic stability: Avoids over-specialisation ("more guns than food") and promotes a differentiated resilient economy (✓✓)\n\nADDITIONAL PART (Max 10):\n• Production of goods and services will increase as local businesses sell to larger international markets (✓✓)\n• Quality of goods and services will improve as businesses strive to match international world standards (✓✓)\n• Competition from foreign products will encourage local businesses to innovate (✓✓)\n• Efficiency in production will improve, resulting in lower prices for consumers (✓✓)\n• South African consumers enjoy greater choice of diverse goods and services (✓✓)\n• More job opportunities created as export industries expand (✓✓)\n• Domestic inflation may be controlled as local prices link to international competitive prices (✓✓)\n• Expanded trade relations expand SA\'s global market share (✓✓)\n• Generates foreign currency earnings that strengthen the Rand (✓✓)\n• South Africa specializes in producing goods where it holds a comparative advantage (e.g. mining, citrus, automotive) (✓✓)\n\nCONCLUSION (Max 2):\n• The policy of restriction of international trade (protectionism) with the aim of preventing unemployment or capital losses in industries threatened by imports, might not affect the internal distribution of income sufficiently or improve the country\'s terms of trade, because it is not based on international monopoly power and expert knowledge (✓✓)\n(Accept any other correct, higher order, relevant response)'
    }
  ]
};
