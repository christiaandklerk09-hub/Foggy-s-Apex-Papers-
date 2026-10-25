import { QuizPaper } from '@/types/quiz';

export const ACCOUNTING_P1_2021_PAPER: QuizPaper = {
  id: 'accounting-p1-nov-2021',
  subjectId: 'accounting',
  title: 'NATIONAL SENIOR CERTIFICATE',
  subtitle: 'Accounting P1 (Jimo Ltd, Brewer Ltd, Flexi & Broom Ltd · November 2021)',
  code: 'ACC-P1-2021',
  chapterNumber: 1,
  paperNumber: 1,
  totalMarks: 150,
  passMark: 75,
  timeLimitMinutes: 120,
  description: 'Official Department of Basic Education (DBE) National Senior Certificate Accounting P1 November 2021 Examination Paper (150 Marks · 120 Minutes). Complete with interactive NSC Special Answer Book and all Information Annexures (A–H).',
  questions: [
    // =========================================================================
    // QUESTION 1: STATEMENT OF FINANCIAL POSITION - JIMO LIMITED (55 Marks · 45 Mins)
    // =========================================================================
    {
      id: 101,
      subjectId: 'accounting',
      paperId: 'accounting-p1-nov-2021',
      question: '1.1 Refer to Information B.\nCalculate the value of the closing stock of formal suits that was omitted from the stock sheets on 30 June 2021 using the first-in-first-out (FIFO) method.\nShow your workings and final answer.',
      category: 'Question 1: Statement of Financial Position (Jimo Ltd)',
      type: 'text',
      marks: 5,
      correctAnswer: 'R675 500',
      explanation: `DBE NSC Marking Guideline:
Layer 1 (18 May 2021 purchases remaining):
230 purchased - 24 returns = 206 units @ R2 850 = R587 100

Layer 2 (10 Feb 2021 purchases to make up 240 units):
240 total closing units - 206 units = 34 units @ R2 600 = R88 400

Value of closing stock omitted = R587 100 + R88 400 = R675 500.`
    },
    {
      id: 102,
      subjectId: 'accounting',
      paperId: 'accounting-p1-nov-2021',
      question: '1.2 Refer to Information C.\nUse the table provided in the Special Answer Book to calculate the correct net profit after tax for the year ended 30 June 2021.\nIndicate \'+\' for increase and \'–\' for decrease.\n(Incorrect net profit before tax: R4 918 950)',
      category: 'Question 1: Statement of Financial Position (Jimo Ltd)',
      type: 'text',
      marks: 12,
      correctAnswer: 'R3 474 800',
      explanation: `DBE NSC Marking Guideline:
Incorrect net profit before tax: R4 918 950
(i) Audit fees (prepaid expense reversed): + R123 600
(ii) Interest on loan (capitalised: R4 028 000 statement - R3 755 000 ledger): - R273 000
(iii) Rent income (prepaid 2 months: 2 × [R5 500 - R750] = 2 × R4 750): - R9 500
Correct Net profit before tax = R4 760 050
(iv) Income tax (provisional R1 200 000 + R85 250 still owed to SARS): - R1 285 250
Correct Net Profit After Tax = R3 474 800.`
    },
    {
      id: 103,
      subjectId: 'accounting',
      paperId: 'accounting-p1-nov-2021',
      question: '1.3 Refer to Information A–H.\nComplete the Retained Income Note on 30 June 2021 in the Special Answer Book.\n(Closing retained income balance: R3 240 000).',
      category: 'Question 1: Statement of Financial Position (Jimo Ltd)',
      type: 'text',
      marks: 5,
      correctAnswer: 'Retained Income Note: Ending Balance R3 240 000',
      explanation: `DBE NSC Marking Guideline:
Balance at beginning (balancing figure): R1 005 200
Net profit after tax (from Question 1.2): R3 474 800
Shares repurchased (26 000 shares × R3,00 premium above ASP): (R78 000)
Dividends for the year (1 800 000 shares × 65 cents final dividend): (R1 170 000)
Balance at end: R3 240 000.`
    },
    {
      id: 104,
      subjectId: 'accounting',
      paperId: 'accounting-p1-nov-2021',
      question: '1.4 Refer to Information A–H.\nComplete the Statement of Financial Position (Balance Sheet) of JIMO LTD on 30 June 2021.\nNote: Figures are NOT required in shaded areas. Show all workings in brackets.',
      category: 'Question 1: Statement of Financial Position (Jimo Ltd)',
      type: 'text',
      marks: 33,
      correctAnswer: 'Total Assets = Total Equity and Liabilities = R16 762 000',
      explanation: `DBE NSC Marking Guideline:
ASSETS:
Non-current assets: Fixed & Financial assets (pre-completed in shaded areas)
Current assets: R8 700 000
- Inventories (R4 198 500 + R675 500 formal suits omitted - R14 000 coats returned): R4 860 000
- Trade and other receivables (R3 668 810 + R8 000 accrued income + R123 600 prepaid audit fees + R11 000 debtors transfer): R3 811 410
- Cash and cash equivalents (balancing figure): R28 590
TOTAL ASSETS = R16 762 000

EQUITY AND LIABILITIES:
Shareholders' equity (1 800 000 shares × R5,40 NAV): R9 720 000
- Ordinary share capital (balancing figure): R6 480 000
- Retained income: R3 240 000
Non-current liabilities: Mortgage loan (R3 755 000 + R273 000 - R186 000 current portion): R3 842 000
Current liabilities (R8 700 000 - R4 860 000) / 1,2: R3 200 000
- Trade and other payables (R1 253 000 + R9 500 deferred rent + R11 000 transfer - R14 000 coats return): R1 259 500
- Shareholders for dividends: R1 170 000
- Current portion of loan: R186 000
- SARS: Income tax (amount owed): R85 250
- Bank overdraft (balancing figure): R499 250
TOTAL EQUITY AND LIABILITIES = R16 762 000.`
    },

    // =========================================================================
    // QUESTION 2: SHARE CAPITAL, FINANCIAL INDICATORS & CASH FLOW - BREWER LTD (35 Marks · 25 Mins)
    // =========================================================================
    {
      id: 201,
      subjectId: 'accounting',
      paperId: 'accounting-p1-nov-2021',
      question: '2.1 Refer to Information A.\nPrepare the Ordinary Share Capital Note on 28 February 2021 for Brewer Ltd in the Special Answer Book.',
      category: 'Question 2: Share Capital, Financial Indicators and Cash Flow (Brewer Ltd)',
      type: 'text',
      marks: 6,
      correctAnswer: 'Ordinary Share Capital: 870 000 shares = R7 395 000',
      explanation: `DBE NSC Marking Guideline:
- Ordinary shares at beginning: 800 000 shares = R6 400 000 (Average ASP = R8,00 per share)
- New shares issued (balancing figure): 100 000 shares = R1 250 000 (Issue price = R12,50 per share)
  [Total before repurchase: 900 000 shares = R7 650 000; Average ASP = R7 650 000 / 900 000 = R8,50]
- Shares repurchased: (30 000) shares @ R8,50 ASP = (R255 000)
- Shares at end of year: 870 000 shares = R7 395 000.`
    },
    {
      id: 202,
      subjectId: 'accounting',
      paperId: 'accounting-p1-nov-2021',
      question: '2.2 Refer to Information B & C.\nCalculate the following financial indicators of Brewer Ltd on 28 February 2021:\n- % operating expenses on sales (2 marks)\n- Dividend per share (DPS) (4 marks)\n- % return on average shareholders\' equity (ROSHE) (5 marks)',
      category: 'Question 2: Share Capital, Financial Indicators and Cash Flow (Brewer Ltd)',
      type: 'text',
      marks: 11,
      correctAnswer: '% OExp = 20%; DPS = 40 cents; ROSHE = 13.6%',
      explanation: `DBE NSC Marking Guideline:
1. % Operating expenses on sales:
   (R1 458 600 / R7 293 000) × 100 = 20.0%

2. Dividend per share (DPS):
   Interim DPS: R162 000 / 900 000 shares = 18 cents
   Final DPS: 22 cents per share
   Total DPS = 18c + 22c = 40 cents (or R0,40)

3. % Return on average shareholders' equity (ROSHE):
   [R985 500 / ½(R6 450 000 + R8 038 100)] × 100
   = [R985 500 / R7 244 050] × 100 = 13.6%.`
    },
    {
      id: 203,
      subjectId: 'accounting',
      paperId: 'accounting-p1-nov-2021',
      question: '2.3 Refer to Information A, B & C.\nComplete the Cash Flow Statement of Brewer Ltd for the year ended 28 February 2021 in the Special Answer Book.',
      category: 'Question 2: Share Capital, Financial Indicators and Cash Flow (Brewer Ltd)',
      type: 'text',
      marks: 18,
      correctAnswer: 'Net change in cash = R269 000; Closing cash = R193 800',
      explanation: `DBE NSC Marking Guideline:
CASH FLOW FROM OPERATING ACTIVITIES: R1 180 000
- Cash generated from operations & Interest paid (shaded)
- Taxation paid: 35 900 opening + 364 500 income statement tax (1 350 000 - 985 500) + 29 100 closing = (R429 500)
- Dividends paid: 115 300 opening + 162 000 interim = (R277 300)

CASH FLOW FROM INVESTING ACTIVITIES: (R1 320 000)

CASH FLOW FROM FINANCING ACTIVITIES: R409 000
- Shares issued (from 2.1): R1 250 000
- Shares repurchased: 30 000 × (R8,50 + R1,20) = 30 000 × R9,70 = (R291 000)
- Loan repaid: R2 200 000 - R1 650 000 = (R550 000)

NET CHANGE IN CASH AND CASH EQUIVALENTS: R1 180 000 - R1 320 000 + R409 000 = R269 000
CASH AND CASH EQUIVALENTS AT BEGINNING: R20 000 - R95 200 overdraft = (R75 200)
CASH AND CASH EQUIVALENTS AT END: R269 000 + (R75 200) = R193 800.`
    },

    // =========================================================================
    // QUESTION 3: INTERPRETATION OF FINANCIAL INFORMATION - FLEXI & BROOM (40 Marks · 30 Mins)
    // =========================================================================
    {
      id: 301,
      subjectId: 'accounting',
      paperId: 'accounting-p1-nov-2021',
      question: '3.1 Choose a category of indicators from COLUMN B that matches the description in COLUMN A. Write only the letter (A–D) next to the question number in the Answer Book:\n3.1.1 The benefit that shareholders receive for investing in a company\n3.1.2 The ability of a business to pay off its short-term debts\n3.1.3 The extent to which a company is financed on borrowed capital (loans)\n3.1.4 The ability of a business to settle all its debts using existing assets',
      category: 'Question 3: Interpretation of Financial Information (Flexi Ltd & Broom Ltd)',
      type: 'text',
      marks: 4,
      correctAnswer: '3.1.1 D, 3.1.2 A, 3.1.3 B, 3.1.4 C',
      explanation: `DBE NSC Marking Guideline:
3.1.1 D - Return on equity
3.1.2 A - Liquidity
3.1.3 B - Gearing
3.1.4 C - Solvency.`
    },
    {
      id: 302,
      subjectId: 'accounting',
      paperId: 'accounting-p1-nov-2021',
      question: '3.2.1 Profitability:\nQuote and explain TWO financial indicators to show which company (Flexi Ltd or Broom Ltd) is managing its expenses more efficiently, and is thereby more profitable.\nQuote figures and trends.',
      category: 'Question 3: Interpretation of Financial Information (Flexi Ltd & Broom Ltd)',
      type: 'text',
      marks: 4,
      correctAnswer: 'Broom Ltd is managing expenses more efficiently',
      explanation: `DBE NSC Marking Guideline:
Broom Ltd is managing its expenses more efficiently and is more profitable:
Quote any TWO indicators for Broom Ltd:
1. % Operating expenses on sales improved / decreased from 17,0% to 13,6% (by 3,4% points / 20%), whereas Flexi Ltd worsened from 14,6% to 17,5%.
2. % Operating profit on sales increased from 20,5% to 24,2% (by 3,7% points / 18%), whereas Flexi Ltd declined from 21,9% to 18,2%.
3. % Net profit on sales increased from 16,0% to 19,6% (by 3,6% points / 22,5%), whereas Flexi Ltd declined from 18,0% to 13,8%.`
    },
    {
      id: 303,
      subjectId: 'accounting',
      paperId: 'accounting-p1-nov-2021',
      question: '3.2.2 Dividends, earnings and returns:\n- Comment on the dividend pay-out policy of Flexi Ltd. Explain why this is an irresponsible change in policy. Provide TWO points. Quote figures and trends. (4 marks)\n- Comment on the % return on shareholders\' equity (ROSHE) of EACH company. Quote figures and trends. (4 marks)\n- A shareholder feels that earnings per share (EPS) in Broom Ltd are better than in Flexi Ltd. Explain why you agree with him. Quote figures or calculations. (4 marks)',
      category: 'Question 3: Interpretation of Financial Information (Flexi Ltd & Broom Ltd)',
      type: 'text',
      marks: 12,
      correctAnswer: 'See Marking Memo',
      explanation: `DBE NSC Marking Guideline:
1. Flexi Ltd Dividend Pay-out Policy (4 marks):
- Trend: The pay-out rate increased from 59% to 115% (DPS of 92c exceeds EPS of 80c by 12c).
- Comment: Irresponsible because Flexi Ltd is depleting its Retained Income reserves to pay dividends while EPS dropped drastically from 138c to 80c; funds could be retained to rebuild profitability.

2. % ROSHE of each company (4 marks):
- Flexi Ltd: ROSHE dropped from 12,2% to 7,6% (by 4,6% points / 37,7%). Return is now below alternative investment return (e.g. 13% interest).
- Broom Ltd: ROSHE improved from 10,7% to 14,1% (by 3,4% points / 31,8%), which is higher than the 13% interest rate.

3. EPS comparison (4 marks):
- Broom Ltd has better earnings relative to share price:
  EPS to Market Price (MP) in Broom Ltd is 10,9% (72c / 660c) compared to Flexi Ltd at 8,1% (80c / 990c).
  EPS to NAV in Broom Ltd is 11,4% (72c / 632c) compared to Flexi Ltd at 7,4% (80c / 1081c).`
    },
    {
      id: 304,
      subjectId: 'accounting',
      paperId: 'accounting-p1-nov-2021',
      question: '3.2.3 Shareholding of Bob Yates in both companies:\n- Comment on the price paid for the shares repurchased by Flexi Ltd. Provide TWO points. Quote figures. (4 marks)\n- Calculate the number of shares that Bob purchased in Broom Ltd with the money he received from the share buyback at Flexi Ltd. (2 marks)\n- Explain the effect of the share repurchase on the % shareholding of Bob Yates in EACH company. Quote figures and trends. (4 marks)',
      category: 'Question 3: Interpretation of Financial Information (Flexi Ltd & Broom Ltd)',
      type: 'text',
      marks: 10,
      correctAnswer: 'Bob bought 300 000 shares in Broom Ltd; became majority shareholder (50.7%)',
      explanation: `DBE NSC Marking Guideline:
1. Repurchase price comment (4 marks):
- Flexi Ltd paid R13,20 per share, which is significantly higher than the Market Price of R9,90 (or R11,30 in 2020) and NAV of R10,81.
- Bob abused his position on the board to enrich himself at the expense of remaining shareholders; compromised Flexi Ltd's cash flow.

2. Shares purchased in Broom Ltd (2 marks):
- Money received from Flexi Ltd buyback: 150 000 shares × R13,20 = R1 980 000.
- Issue price in Broom Ltd = R6,60 per share.
- Number of shares purchased = R1 980 000 / R6,60 = 300 000 shares.

3. Effect on % shareholding (4 marks):
- Flexi Ltd: Bob had 51,0% (433 500 / 850 000). After selling 150 000 shares, he has 283 500 / 700 000 = 40,5%. He lost majority shareholder status.
- Broom Ltd: Bob had 41,8% (460 000 / 1 100 000). After buying 300 000 shares, he owns 760 000 / 1 500 000 = 50,7%. He became the new majority shareholder.`
    },
    {
      id: 305,
      subjectId: 'accounting',
      paperId: 'accounting-p1-nov-2021',
      question: '3.2.4 Financing strategies and gearing:\n- Explain the decisions taken by the directors of Broom Ltd and how these will benefit the company. Quote figures. (4 marks)\n- Explain how the decisions taken by Flexi Ltd affected the risk and gearing of the business. Quote TWO financial indicators with figures. (6 marks)',
      category: 'Question 3: Interpretation of Financial Information (Flexi Ltd & Broom Ltd)',
      type: 'text',
      marks: 10,
      correctAnswer: 'See Marking Memo',
      explanation: `DBE NSC Marking Guideline:
1. Broom Ltd Decisions & Benefits (4 marks):
- Decisions: Issued 400 000 additional shares raising R2 640 000 in equity and decreased long-term loans by R400 000. Invested R2 200 000 in fixed assets.
- Benefits: Funded expansion through equity rather than debt, reducing financial risk (Debt-equity ratio improved to 0,2:1) and boosting ROTCE to 17,2%.

2. Flexi Ltd Risk & Gearing (6 marks):
- Indicators:
  - Debt-equity ratio increased from 0,4:1 to 1,1:1 (by 0,7:1).
  - ROTCE dropped from 16,1% to 10,2% (by 5,9% points).
- Impact: Increased loan by R4 500 000 while buying back shares. The business is now highly geared and experiencing negative gearing since ROTCE (10,2%) is lower than the loan interest rate of 13%.`
    },

    // =========================================================================
    // QUESTION 4: CORPORATE GOVERNANCE (20 Marks · 20 Mins)
    // =========================================================================
    {
      id: 401,
      subjectId: 'accounting',
      paperId: 'accounting-p1-nov-2021',
      question: '4.1 Explain why a disclaimer audit report would be bad for a company\'s reputation. Provide TWO points.',
      category: 'Question 4: Corporate Governance',
      type: 'text',
      marks: 4,
      correctAnswer: 'See Marking Memo',
      explanation: `DBE NSC Marking Guideline:
Any TWO valid points (2 marks each):
- Indicates serious lack of financial records or evidence; auditors refuse to express an opinion.
- Destroys investor and public trust in financial reliability.
- Can severely depress the share price on the JSE and trigger sell-offs.
- Financial institutions and suppliers may reject loan applications and refuse credit facilities.`
    },
    {
      id: 402,
      subjectId: 'accounting',
      paperId: 'accounting-p1-nov-2021',
      question: '4.2 One of the most important decisions that shareholders make at the annual general meeting (AGM) is to appoint directors.\n- Explain why shareholders have been given this responsibility. (2 marks)\n- If you were a shareholder, what factors or characteristics would you want to find out about the directors who would get your vote? Explain TWO points and give a reason for EACH. (6 marks)',
      category: 'Question 4: Corporate Governance',
      type: 'text',
      marks: 8,
      correctAnswer: 'See Marking Memo',
      explanation: `DBE NSC Marking Guideline:
1. Why shareholders appoint directors (2 marks):
- Separation of ownership from control: Shareholders own the company as capital investors but cannot all run daily operations, so they elect directors as their fiduciaries.

2. Factors/characteristics with reasons (6 marks - 3 marks per point):
- Characteristic: High ethical integrity and clean criminal record.
  Reason: Protects company assets and ensures ethical stewardship without nepotism or conflicts of interest.
- Characteristic: Relevant business qualifications, expertise, and proven track record.
  Reason: Competent decision-making ensures long-term profitability and global competitiveness.`
    },
    {
      id: 403,
      subjectId: 'accounting',
      paperId: 'accounting-p1-nov-2021',
      question: '4.3 A recent news report stated that Baxco Ltd was awarded a tender to supply equipment worth R20 m to private hospitals, with the CFO accused of paying R2 m in cash to the hospital CEO.\nAs a shareholder, explain what you would say at the AGM. Provide TWO points.',
      category: 'Question 4: Corporate Governance',
      type: 'text',
      marks: 4,
      correctAnswer: 'See Marking Memo',
      explanation: `DBE NSC Marking Guideline:
Any TWO points (2 marks each):
- Demand an immediate independent forensic investigation and suspension/disciplinary action against the CFO.
- Condemn bribery as unethical and illegal tender corruption that damages company reputation, share value, and customer loyalty.
- Demand an audit of internal controls to investigate how R2 million in cash could be paid without detection.`
    },
    {
      id: 404,
      subjectId: 'accounting',
      paperId: 'accounting-p1-nov-2021',
      question: '4.4 Refer to the extract regarding the independent tip-off phone line (call centre) and whistle-blower protection.\nIn your opinion, explain why this major company found it necessary to implement this policy. Provide TWO points.',
      category: 'Question 4: Corporate Governance',
      type: 'text',
      marks: 4,
      correctAnswer: 'See Marking Memo',
      explanation: `DBE NSC Marking Guideline:
Any TWO points (2 marks each):
- Encourages reporting of fraud and corruption: Employees and external suppliers often fear victimization or job loss; anonymity protects them.
- Enables early fraud detection before financial loss or public scandal damages the brand.
- Demonstrates King IV ethical governance, corporate citizenship, and zero tolerance for crime.`
    }
  ]
};
