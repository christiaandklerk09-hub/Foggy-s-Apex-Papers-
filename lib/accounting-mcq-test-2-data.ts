import { QuizPaper } from '@/types/quiz';

export const ACCOUNTING_MCQ_TEST_2_PAPER: QuizPaper = {
  id: 'accounting-mcq-test-2',
  subjectId: 'accounting',
  title: 'ACCOUNTING ASSESSMENT GUIDE: TEST 2',
  subtitle: 'Fixed Assets, Manufacturing, Budgeting & Company Accounting (50 MCQs)',
  code: 'ACC-TEST-2',
  chapterNumber: 8,
  paperNumber: 3,
  totalMarks: 100,
  passMark: 50,
  timeLimitMinutes: 90,
  description: 'Skills Academy Accounting Assessment Guide (Assignment 2): 50 Structured Multiple Choice Questions covering Fixed Asset Depreciations, Manufacturing Cost Components (Prime Cost, Factory Overheads, Work in Progress), Companies Act & Corporate Governance, Share Capital & Retained Income, Cash Flow Classifications, and Liquidity Ratios.',
  questions: [
    {
      id: 1101,
      subjectId: 'accounting',
      paperId: 'accounting-mcq-test-2',
      question: '1) Which of the following is NOT a fixed (non-current) asset?',
      category: 'Asset Classification',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'Bank' },
        { letter: 'B', text: 'Land' },
        { letter: 'C', text: 'Equipment' },
        { letter: 'D', text: 'Buildings' }
      ],
      correctAnswer: 'A',
      explanation: 'Bank is a current liquid asset, whereas land, buildings, and equipment are tangible non-current (fixed) assets.'
    },
    {
      id: 1102,
      subjectId: 'accounting',
      paperId: 'accounting-mcq-test-2',
      question: '2) Statement: Tangible assets are not purchased for resale. Reason: They are acquired for long-term income generation.',
      category: 'Fixed Asset Principles',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'Both the statement and the reason are wrong' },
        { letter: 'B', text: 'The statement is correct but the reason is wrong' },
        { letter: 'C', text: 'The reason is correct but the statement is wrong' },
        { letter: 'D', text: 'Both the statement and the reason are correct' }
      ],
      correctAnswer: 'D',
      explanation: 'Tangible fixed assets (vehicles, machinery, buildings) are purchased to facilitate business operations and generate revenue over multiple years, not for immediate resale.'
    },
    {
      id: 1103,
      subjectId: 'accounting',
      paperId: 'accounting-mcq-test-2',
      question: '3) Which of the following is a recognized method of calculating depreciation?',
      category: 'Depreciation Methods',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'Disposal of an asset' },
        { letter: 'B', text: 'Reducing balance method (Diminishing balance)' },
        { letter: 'C', text: 'Accumulated depreciation' },
        { letter: 'D', text: 'Acquiring fixed asset' }
      ],
      correctAnswer: 'B',
      explanation: 'The reducing (diminishing) balance method calculates depreciation on the carrying value (Cost − Accumulated Depreciation) of the asset.'
    },
    {
      id: 1104,
      subjectId: 'accounting',
      paperId: 'accounting-mcq-test-2',
      question: '4) Which GAAP concept states that once a business chooses an accounting method, it must apply that exact method consistently across financial periods?',
      category: 'GAAP Concepts',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'Materiality' },
        { letter: 'B', text: 'Business entity' },
        { letter: 'C', text: 'Prudence' },
        { letter: 'D', text: 'Consistency principle' }
      ],
      correctAnswer: 'D',
      explanation: 'The Consistency principle ensures that accounting policies and methods (e.g. depreciation, inventory valuation) remain uniform across years for meaningful comparability.'
    },
    {
      id: 1105,
      subjectId: 'accounting',
      paperId: 'accounting-mcq-test-2',
      question: '5) Which principle states that the entire cost of a fixed asset cannot be treated as an operating expense in the single year of purchase because it generates income over multiple years?',
      category: 'GAAP Matching Principle',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'Historical cost' },
        { letter: 'B', text: 'Matching principle' },
        { letter: 'C', text: 'Materiality' },
        { letter: 'D', text: 'Business entity' }
      ],
      correctAnswer: 'B',
      explanation: 'The Matching principle requires that asset costs be capitalized and matched against the revenues generated over its useful economic life via annual depreciation.'
    },
    {
      id: 1106,
      subjectId: 'accounting',
      paperId: 'accounting-mcq-test-2',
      question: '6) Show which account is to be debited and which account is to be credited: Acquisition of land and buildings financed through a mortgage loan.',
      category: 'General Journal Entries',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'Debit: Land and Buildings, Credit: Mortgage Loan' },
        { letter: 'B', text: 'Debit: Mortgage Loan, Credit: Land and Buildings' },
        { letter: 'C', text: 'Debit: Land and Buildings, Credit: Bank' },
        { letter: 'D', text: 'Debit: Bank, Credit: Mortgage Loan' }
      ],
      correctAnswer: 'A',
      explanation: 'Acquiring property increases assets (Debit: Land and Buildings) and increases long-term liabilities (Credit: Mortgage Loan).'
    },
    {
      id: 1107,
      subjectId: 'accounting',
      paperId: 'accounting-mcq-test-2',
      question: '7) Given that the cost of a fixed asset is R15 000 and accumulated depreciation is R2 500. Depreciation is 10% p.a. on diminishing balance. Calculate depreciation for the year:',
      category: 'Depreciation Calculations',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'R1 500' },
        { letter: 'B', text: 'R1 250' },
        { letter: 'C', text: 'R4 000' },
        { letter: 'D', text: 'R1 000' }
      ],
      correctAnswer: 'B',
      explanation: 'Carrying Value = R15 000 − R2 500 = R12 500. Depreciation = R12 500 × 10% = R1 250.'
    },
    {
      id: 1108,
      subjectId: 'accounting',
      paperId: 'accounting-mcq-test-2',
      question: '8) What is the main purpose of internal auditing?',
      category: 'Internal Control & Audit',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'To improve the operations and internal controls of the business' },
        { letter: 'B', text: 'To employ external accountants' },
        { letter: 'C', text: 'To create morale' },
        { letter: 'D', text: 'To sell the business' }
      ],
      correctAnswer: 'A',
      explanation: 'Internal auditing evaluates internal controls, safeguards assets, ensures compliance, and improves operational efficiency.'
    },
    {
      id: 1109,
      subjectId: 'accounting',
      paperId: 'accounting-mcq-test-2',
      question: '9) Which of the following is NOT true about a Close Corporation (CC)?',
      category: 'Forms of Ownership · Close Corporations',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'The name of the close corporation must be followed by "CC"' },
        { letter: 'B', text: 'The close corporation is a separate legal person from its members' },
        { letter: 'C', text: 'Profits and losses are always shared equally among members' },
        { letter: 'D', text: 'The liability of members for company debts is limited to their member interest' }
      ],
      correctAnswer: 'C',
      explanation: 'Profits and losses in a CC are distributed in accordance with each member\'s agreed percentage interest in the founding statement, not necessarily equally.'
    },
    {
      id: 1110,
      subjectId: 'accounting',
      paperId: 'accounting-mcq-test-2',
      question: '10) Which of the following is NOT a role of the internal auditor?',
      category: 'Internal Auditor Role',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'Review operating results' },
        { letter: 'B', text: 'Cover up risks and hide fraud' },
        { letter: 'C', text: 'Reviewing statutory compliance' },
        { letter: 'D', text: 'Reporting on financial accuracy' }
      ],
      correctAnswer: 'B',
      explanation: 'An internal auditor must identify, report, and mitigate risk rather than concealing or covering up errors.'
    },
    {
      id: 1111,
      subjectId: 'accounting',
      paperId: 'accounting-mcq-test-2',
      question: '11) What is a major advantage of the perpetual inventory system?',
      category: 'Inventory Systems',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'Cheaper system to maintain' },
        { letter: 'B', text: 'Suitable only for businesses selling a low variety of goods' },
        { letter: 'C', text: 'Theft of stock cannot be detected' },
        { letter: 'D', text: 'Enables continuous, immediate control and tracking of trading stock on hand' }
      ],
      correctAnswer: 'D',
      explanation: 'The perpetual system updates Trading Stock and Cost of Sales with every transaction, allowing continuous stock tracking and immediate detection of stock deficits.'
    },
    {
      id: 1112,
      subjectId: 'accounting',
      paperId: 'accounting-mcq-test-2',
      question: '12) The average cost per unit of inventory is calculated by dividing total cost of goods available for sale by total units available. Which method is this?',
      category: 'Inventory Valuation Methods',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'First In First Out (FIFO)' },
        { letter: 'B', text: 'Weighted Average method' },
        { letter: 'C', text: 'Specific identification method' },
        { letter: 'D', text: 'None of the above' }
      ],
      correctAnswer: 'B',
      explanation: 'Weighted Average Cost per unit = Total Cost of Available Stock ÷ Total Available Units.'
    },
    {
      id: 1113,
      subjectId: 'accounting',
      paperId: 'accounting-mcq-test-2',
      question: '13) What does FIFO stand for?',
      category: 'Stock Valuation Acronyms',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'First in last out' },
        { letter: 'B', text: 'First in first out' },
        { letter: 'C', text: 'Last in first out' },
        { letter: 'D', text: 'First out first in' }
      ],
      correctAnswer: 'B',
      explanation: 'FIFO stands for First In, First Out (oldest stock acquired is assumed to be sold first).'
    },
    {
      id: 1114,
      subjectId: 'accounting',
      paperId: 'accounting-mcq-test-2',
      question: '14) A __________ is an estimation of expected cash inflows and outflows for a business or individual for a specific future timeframe.',
      category: 'Budgeting Definitions',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'Cash flow statement (historical)' },
        { letter: 'B', text: 'Forecast income statement' },
        { letter: 'C', text: 'Cash budget' },
        { letter: 'D', text: 'Bank reconciliation' }
      ],
      correctAnswer: 'C',
      explanation: 'A cash budget plans future liquidity by projecting cash inflows and outflows.'
    },
    {
      id: 1115,
      subjectId: 'accounting',
      paperId: 'accounting-mcq-test-2',
      question: '15) Statement: Raw materials are unprocessed natural resources. Reason: The finished product of one firm can serve as the raw material for another firm.',
      category: 'Cost Accounting Concepts',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'Both the statement and the reason are true' },
        { letter: 'B', text: 'Both the statement and the reason are not true' },
        { letter: 'C', text: 'The statement is true but the reason is not true' },
        { letter: 'D', text: 'The reason is true but the statement is not true' }
      ],
      correctAnswer: 'A',
      explanation: 'Raw materials enter the manufacturing cycle directly; for example, flour milled by a mill (finished goods) becomes raw material for a bakery.'
    },
    {
      id: 1116,
      subjectId: 'accounting',
      paperId: 'accounting-mcq-test-2',
      question: '16) Most manufacturing undertakings divide their production cost components into three categories, which are:',
      category: 'Manufacturing Cost Components',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'Direct materials, direct labour, and factory overheads' },
        { letter: 'B', text: 'Direct materials, indirect materials, and administration' },
        { letter: 'C', text: 'Work in progress, prime costs, and selling expenses' },
        { letter: 'D', text: 'Fixed costs, fixed overheads, and variable costs' }
      ],
      correctAnswer: 'A',
      explanation: 'Total Production Cost = Direct Material Cost + Direct Labour Cost + Factory Overhead Cost.'
    },
    {
      id: 1117,
      subjectId: 'accounting',
      paperId: 'accounting-mcq-test-2',
      question: '17) __________ refers to remuneration and wages paid to factory workers that can be directly and easily traced to the manufacturing of each finished unit.',
      category: 'Direct vs Indirect Labour',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'Indirect labour' },
        { letter: 'B', text: 'Direct labour' },
        { letter: 'C', text: 'Direct materials' },
        { letter: 'D', text: 'Factory overhead' }
      ],
      correctAnswer: 'B',
      explanation: 'Direct labour costs represent the hands-on wages, bonuses, and contributions paid to production line workers.'
    },
    {
      id: 1118,
      subjectId: 'accounting',
      paperId: 'accounting-mcq-test-2',
      question: '18) Show which account is to be debited and which account credited when the owner takes raw materials from the factory for personal use:',
      category: 'Drawings & Inventory',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'Debit: Personal use, Credit: Raw materials' },
        { letter: 'B', text: 'Debit: Raw materials, Credit: Drawings' },
        { letter: 'C', text: 'Debit: Drawings, Credit: Raw Material Stock' },
        { letter: 'D', text: 'Debit: Factory overheads, Credit: Drawings' }
      ],
      correctAnswer: 'C',
      explanation: 'Owner withdrawal for personal use reduces equity (Debit: Drawings) and decreases inventory (Credit: Raw Material Stock).'
    },
    {
      id: 1119,
      subjectId: 'accounting',
      paperId: 'accounting-mcq-test-2',
      question: '19) Direct materials cost plus direct labour cost is known as:',
      category: 'Cost Accounting Formulas',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'Prime cost' },
        { letter: 'B', text: 'Work-in-progress' },
        { letter: 'C', text: 'Factory overheads' },
        { letter: 'D', text: 'Cost of finished goods' }
      ],
      correctAnswer: 'A',
      explanation: 'Prime Cost = Direct Material Cost + Direct Labour Cost.'
    },
    {
      id: 1120,
      subjectId: 'accounting',
      paperId: 'accounting-mcq-test-2',
      question: '20) Prime cost plus factory overhead cost equals:',
      category: 'Cost Accounting Formulas',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'Total cost of production (Total manufacturing cost)' },
        { letter: 'B', text: 'Fixed costs' },
        { letter: 'C', text: 'Administration costs' },
        { letter: 'D', text: 'Total work in progress' }
      ],
      correctAnswer: 'A',
      explanation: 'Total Cost of Production = Prime Cost + Factory Overhead Cost.'
    },
    {
      id: 1121,
      subjectId: 'accounting',
      paperId: 'accounting-mcq-test-2',
      question: '21) When incorporating a new company under the Companies Act 71 of 2008, the Memorandum of Incorporation (MOI) must be submitted to:',
      category: 'Companies Act & Incorporation',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'SARS' },
        { letter: 'B', text: 'Companies and Intellectual Property Commission (CIPC / Registrar of Companies)' },
        { letter: 'C', text: 'Ministry of Finance' },
        { letter: 'D', text: 'Johannesburg Stock Exchange (JSE)' }
      ],
      correctAnswer: 'B',
      explanation: 'The MOI is the founding constitutional document registered with the CIPC (Registrar of Companies).'
    },
    {
      id: 1122,
      subjectId: 'accounting',
      paperId: 'accounting-mcq-test-2',
      question: '22) Under the Companies Act, a public company (Ltd) must have a board of directors consisting of at least __________ directors.',
      category: 'Company Governance',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: '2' },
        { letter: 'B', text: '3' },
        { letter: 'C', text: '4' },
        { letter: 'D', text: '5' }
      ],
      correctAnswer: 'B',
      explanation: 'A public company (Ltd) must have at least 3 directors (a private company Pty Ltd requires at least 1).'
    },
    {
      id: 1123,
      subjectId: 'accounting',
      paperId: 'accounting-mcq-test-2',
      question: '23) Shareholders of all public companies must elect an independent __________ at every Annual General Meeting (AGM):',
      category: 'Corporate Governance & Audit',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'Audit committee' },
        { letter: 'B', text: 'Managing Director' },
        { letter: 'C', text: 'Financial advisor' },
        { letter: 'D', text: 'Trade union representative' }
      ],
      correctAnswer: 'A',
      explanation: 'Section 94 of the Companies Act mandates that shareholders of public companies appoint an independent Audit Committee at each AGM.'
    },
    {
      id: 1124,
      subjectId: 'accounting',
      paperId: 'accounting-mcq-test-2',
      question: '24) The Audit Committee of a public company must consist of at least __________ independent non-executive directors.',
      category: 'Audit Committee Composition',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: '1' },
        { letter: 'B', text: '2' },
        { letter: 'C', text: '3' },
        { letter: 'D', text: '4' }
      ],
      correctAnswer: 'C',
      explanation: 'The Audit Committee must consist of at least 3 independent non-executive directors.'
    },
    {
      id: 1125,
      subjectId: 'accounting',
      paperId: 'accounting-mcq-test-2',
      question: '25) Capital funds to finance company growth can be obtained from:',
      category: 'Sources of Capital',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'Issuing and selling ordinary shares (equity financing)' },
        { letter: 'B', text: 'Retained profits from operations (internal financing)' },
        { letter: 'C', text: 'Borrowing through long-term mortgage loans or debentures (debt financing)' },
        { letter: 'D', text: 'All of the above' }
      ],
      correctAnswer: 'D',
      explanation: 'Companies raise capital through equity (share issues), retained profits, and debt (bank loans).'
    },
    {
      id: 1126,
      subjectId: 'accounting',
      paperId: 'accounting-mcq-test-2',
      question: '26) Which category of shares does NOT have a guaranteed fixed dividend payout?',
      category: 'Share Types',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'Cumulative preference shares' },
        { letter: 'B', text: 'Participating preference shares' },
        { letter: 'C', text: 'Fixed rate preference shares' },
        { letter: 'D', text: 'Ordinary shares' }
      ],
      correctAnswer: 'D',
      explanation: 'Ordinary shareholders are equity owners who receive fluctuating dividends only after preference dividends are settled and directors declare a distribution.'
    },
    {
      id: 1127,
      subjectId: 'accounting',
      paperId: 'accounting-mcq-test-2',
      question: '27) The maximum number of shares a company is legally permitted to issue according to its Memorandum of Incorporation is known as:',
      category: 'Share Capital Concepts',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'Issued shares' },
        { letter: 'B', text: 'Treasury shares' },
        { letter: 'C', text: 'Ordinary shares' },
        { letter: 'D', text: 'Authorised share capital' }
      ],
      correctAnswer: 'D',
      explanation: 'Authorised share capital is the legal maximum number of shares specified in the MOI.'
    },
    {
      id: 1128,
      subjectId: 'accounting',
      paperId: 'accounting-mcq-test-2',
      question: '28) The difference between total authorised share capital and currently issued share capital represents:',
      category: 'Share Capital Concepts',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'Issued shares' },
        { letter: 'B', text: 'Issue price' },
        { letter: 'C', text: 'Unissued share capital' },
        { letter: 'D', text: 'Retained income' }
      ],
      correctAnswer: 'C',
      explanation: 'Unissued Share Capital = Authorised Share Capital − Issued Share Capital.'
    },
    {
      id: 1129,
      subjectId: 'accounting',
      paperId: 'accounting-mcq-test-2',
      question: '29) The official form that SARS issues to a company stating the final assessed tax liability for the year is called the:',
      category: 'Taxation of Companies',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'Tax return form (IT14)' },
        { letter: 'B', text: 'Tax assessment form (ITA34 / Notice of Assessment)' },
        { letter: 'C', text: 'Provisional tax form (IRP6)' },
        { letter: 'D', text: 'VAT201 form' }
      ],
      correctAnswer: 'B',
      explanation: 'The Notice of Assessment (tax assessment form) confirms the final income tax liability determined by SARS.'
    },
    {
      id: 1130,
      subjectId: 'accounting',
      paperId: 'accounting-mcq-test-2',
      question: '30) __________ is the portion of cumulative net profit after tax that is retained in the business and not distributed to shareholders as dividends.',
      category: 'Retained Income',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'Retained income (Accumulated profit)' },
        { letter: 'B', text: 'Ordinary share capital' },
        { letter: 'C', text: 'Gross profit' },
        { letter: 'D', text: 'Interim dividends' }
      ],
      correctAnswer: 'A',
      explanation: 'Retained Income represents accumulated undistributed profits kept in the business for future capital projects and expansion.'
    },
    {
      id: 1131,
      subjectId: 'accounting',
      paperId: 'accounting-mcq-test-2',
      question: '31) In the accounting records of a company, the closing balance of retained income is calculated in the:',
      category: 'Final Accounts · Appropriation',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'Profit and loss account' },
        { letter: 'B', text: 'Trading account' },
        { letter: 'C', text: 'Journal account' },
        { letter: 'D', text: 'Appropriation account (and Retained Income Note)' }
      ],
      correctAnswer: 'D',
      explanation: 'The Appropriation Account distributes net profit after tax towards dividends and calculates closing Retained Income.'
    },
    {
      id: 1132,
      subjectId: 'accounting',
      paperId: 'accounting-mcq-test-2',
      question: '32) Given: Net Profit for the year R540 000; Income Tax for the year R162 000; Total Dividends declared R48 000. What is the retained profit for the year?',
      category: 'Appropriation Calculations',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'R378 000' },
        { letter: 'B', text: 'R492 000' },
        { letter: 'C', text: 'R330 000' },
        { letter: 'D', text: 'R750 000' }
      ],
      correctAnswer: 'C',
      explanation: 'Net Profit after Tax = R540 000 − R162 000 = R378 000. Retained profit = R378 000 − R48 000 (Dividends) = R330 000.'
    },
    {
      id: 1133,
      subjectId: 'accounting',
      paperId: 'accounting-mcq-test-2',
      question: '33) Interim dividends are:',
      category: 'Dividends',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'Dividends recommended at year-end and approved at the AGM' },
        { letter: 'B', text: 'The portion of profits paid over to SARS' },
        { letter: 'C', text: 'Dividends declared and paid during the course of the financial year (half-yearly)' },
        { letter: 'D', text: 'Bonus shares issued for free' }
      ],
      correctAnswer: 'C',
      explanation: 'Interim dividends are declared and paid halfway through the financial year based on interim profits.'
    },
    {
      id: 1134,
      subjectId: 'accounting',
      paperId: 'accounting-mcq-test-2',
      question: '34) The principle of limited liability protects shareholders because:',
      category: 'Company Law',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'Shareholders are only liable for company debts up to the amount of capital they invested in their shares' },
        { letter: 'B', text: 'Shareholders personal private assets can be seized by bank creditors' },
        { letter: 'C', text: 'Directors are exempt from all ethical governance' },
        { letter: 'D', text: 'Tax liabilities are waived' }
      ],
      correctAnswer: 'A',
      explanation: 'Limited liability restricts a shareholder\'s financial loss in insolvency strictly to their invested share capital.'
    },
    {
      id: 1135,
      subjectId: 'accounting',
      paperId: 'accounting-mcq-test-2',
      question: '35) The issue price of a share is:',
      category: 'Share Capital',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'The par value of a share' },
        { letter: 'B', text: 'The dividend per share paid at year end' },
        { letter: 'C', text: 'The price at which new shares are sold and issued to investors' },
        { letter: 'D', text: 'The book value per share' }
      ],
      correctAnswer: 'C',
      explanation: 'Issue price is the actual subscription price paid by investors per share when allotted.'
    },
    {
      id: 1136,
      subjectId: 'accounting',
      paperId: 'accounting-mcq-test-2',
      question: '36) The separation of ownership from control in a public company means:',
      category: 'Corporate Governance',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'Shareholders provide capital and own the company, while the board of directors and management control and run operations' },
        { letter: 'B', text: 'The government manages the daily operations' },
        { letter: 'C', text: 'Creditors control company assets' },
        { letter: 'D', text: 'Employees own the business' }
      ],
      correctAnswer: 'A',
      explanation: 'In public companies, shareholders elect directors to manage the business on their behalf, creating fiduciary agency relationships.'
    },
    {
      id: 1137,
      subjectId: 'accounting',
      paperId: 'accounting-mcq-test-2',
      question: '37) __________ is the financial cost charged for borrowing money or capital from a lending institution.',
      category: 'Financing Costs',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'Interest expense' },
        { letter: 'B', text: 'Dividend' },
        { letter: 'C', text: 'Depreciation' },
        { letter: 'D', text: 'Royalty' }
      ],
      correctAnswer: 'A',
      explanation: 'Interest is the cost of debt finance charged by lenders for the use of borrowed funds.'
    },
    {
      id: 1138,
      subjectId: 'accounting',
      paperId: 'accounting-mcq-test-2',
      question: '38) The standard formula for calculating Simple Interest is:',
      category: 'Financial Mathematics',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'I = P × R × T (Principal × Rate × Time)' },
        { letter: 'B', text: 'A = P(1 + r)' },
        { letter: 'C', text: 'I = P + R + T' },
        { letter: 'D', text: 'A = P(1 + r)^n' }
      ],
      correctAnswer: 'A',
      explanation: 'Simple Interest = Principal (P) × Interest Rate (R) × Time in years (T).'
    },
    {
      id: 1139,
      subjectId: 'accounting',
      paperId: 'accounting-mcq-test-2',
      question: '39) The formula for calculating the total future value under Compound Interest is:',
      category: 'Financial Mathematics',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'A = P(1 + i)' },
        { letter: 'B', text: 'A = P(1 + i)^n' },
        { letter: 'C', text: 'A = P × R × T' },
        { letter: 'D', text: 'A = P(1 − i)^n' }
      ],
      correctAnswer: 'B',
      explanation: 'Compound Interest Formula: A = P(1 + i)^n where A is accumulated total, P is principal, i is periodic interest rate, and n is number of periods.'
    },
    {
      id: 1140,
      subjectId: 'accounting',
      paperId: 'accounting-mcq-test-2',
      question: '40) R3 000 is invested in a fixed deposit at 12% p.a. simple interest for 4 years. What is the total accumulated value at the end of 4 years?',
      category: 'Interest Calculations',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'R4 720' },
        { letter: 'B', text: 'R5 720' },
        { letter: 'C', text: 'R4 440' },
        { letter: 'D', text: 'R6 000' }
      ],
      correctAnswer: 'C',
      explanation: 'Simple Interest = R3 000 × 12% × 4 = R1 440. Total Value = Principal + Interest = R3 000 + R1 440 = R4 440.'
    },
    {
      id: 1141,
      subjectId: 'accounting',
      paperId: 'accounting-mcq-test-2',
      question: '41) A Cash Flow Statement is primarily prepared for financial management to evaluate:',
      category: 'Cash Flow Analysis',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'Historical cash generation and short-to-medium range liquidity planning' },
        { letter: 'B', text: 'Calculating income tax payable only' },
        { letter: 'C', text: 'Establishing market share' },
        { letter: 'D', text: 'Auditor salary reviews' }
      ],
      correctAnswer: 'A',
      explanation: 'The Cash Flow Statement reports how operating, investing, and financing activities generate and utilize cash resources.'
    },
    {
      id: 1142,
      subjectId: 'accounting',
      paperId: 'accounting-mcq-test-2',
      question: '42) Which of the following is a genuine inflow (source) of cash on the Cash Flow Statement?',
      category: 'Cash Flow Inflows',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'Cash deposited into the business bank account from the cash register' },
        { letter: 'B', text: 'Cash withdrawn from the bank account' },
        { letter: 'C', text: 'Sale of marketable financial securities / fixed assets for cash' },
        { letter: 'D', text: 'Writing off bad debts' }
      ],
      correctAnswer: 'C',
      explanation: 'Selling marketable securities or fixed assets brings external cash into the enterprise (investing cash inflow).'
    },
    {
      id: 1143,
      subjectId: 'accounting',
      paperId: 'accounting-mcq-test-2',
      question: '43) Which of the following is NOT a source of cash (inflow) on the Cash Flow Statement?',
      category: 'Cash Flow Inflows vs Outflows',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'Issue of new shares' },
        { letter: 'B', text: 'Purchase of factory machinery for cash' },
        { letter: 'C', text: 'Proceeds from disposal of fixed assets' },
        { letter: 'D', text: 'Dividends received on investments' }
      ],
      correctAnswer: 'B',
      explanation: 'Purchasing machinery is an investing cash outflow (application of cash), not a source of cash.'
    },
    {
      id: 1144,
      subjectId: 'accounting',
      paperId: 'accounting-mcq-test-2',
      question: '44) In working capital changes, which of the following is NOT an application (outflow) of cash?',
      category: 'Working Capital Cash Effects',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'Increase in Debtors (Trade Receivables)' },
        { letter: 'B', text: 'Increase in Inventory' },
        { letter: 'C', text: 'Increase in Trade Payables (Creditors / Bills Payable)' },
        { letter: 'D', text: 'Increase in Prepaid Expenses' }
      ],
      correctAnswer: 'C',
      explanation: 'An increase in Trade Payables means the business has retained cash by delaying payments, representing a source of working capital finance.'
    },
    {
      id: 1145,
      subjectId: 'accounting',
      paperId: 'accounting-mcq-test-2',
      question: '45) Cash effects of operating activities on the Cash Flow Statement comprise:',
      category: 'Cash Flow from Operations',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'Cash generated from operations' },
        { letter: 'B', text: 'Changes in working capital (inventory, debtors, creditors)' },
        { letter: 'C', text: 'Interest paid, taxation paid, and dividends paid' },
        { letter: 'D', text: 'All of the above' }
      ],
      correctAnswer: 'D',
      explanation: 'Operating cash flows incorporate trading cash generation, working capital adjustments, and financing service payments (interest, dividends, tax).'
    },
    {
      id: 1146,
      subjectId: 'accounting',
      paperId: 'accounting-mcq-test-2',
      question: '46) In Note 1 of the Cash Flow Statement (Reconciliation between Profit before Tax and Cash Generated from Operations), non-cash items added back include:',
      category: 'Cash Flow Reconciliations',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'Depreciation' },
        { letter: 'B', text: 'Interest expense (to be listed separately below)' },
        { letter: 'C', text: 'Loss on sale of fixed asset' },
        { letter: 'D', text: 'All of the above' }
      ],
      correctAnswer: 'D',
      explanation: 'Non-cash expenses (depreciation, losses on asset disposal) and financing charges (interest) are adjusted back to determine operating cash generation.'
    },
    {
      id: 1147,
      subjectId: 'accounting',
      paperId: 'accounting-mcq-test-2',
      question: '47) The two primary foundational ratios used to evaluate short-term liquidity are:',
      category: 'Liquidity Ratios',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'Inventory turnover and Debt-equity ratio' },
        { letter: 'B', text: 'Current ratio and Acid-test (Quick) ratio' },
        { letter: 'C', text: 'Gross profit margin and Operating margin' },
        { letter: 'D', text: 'Return on equity and Return on assets' }
      ],
      correctAnswer: 'B',
      explanation: 'Current Ratio (Current Assets : Current Liabilities) and Acid-Test Ratio ((Current Assets − Inventory) : Current Liabilities) are standard liquidity indicators.'
    },
    {
      id: 1148,
      subjectId: 'accounting',
      paperId: 'accounting-mcq-test-2',
      question: '48) The Current Ratio is classified as a:',
      category: 'Ratio Classifications',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'Solvency Ratio' },
        { letter: 'B', text: 'Liquidity Ratio' },
        { letter: 'C', text: 'Activity / Efficiency Ratio' },
        { letter: 'D', text: 'Profitability Ratio' }
      ],
      correctAnswer: 'B',
      explanation: 'Current ratio assesses short-term liquidity and ability to meet immediate liabilities.'
    },
    {
      id: 1149,
      subjectId: 'accounting',
      paperId: 'accounting-mcq-test-2',
      question: '49) Information: Trade Receivables R40 000; Trade Payables R60 000; Prepaid Expenses R10 000; Inventory R100 000; Goodwill R15 000. Calculate the Current Ratio:',
      category: 'Current Ratio Calculation',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: '1 : 2' },
        { letter: 'B', text: '2 : 1' },
        { letter: 'C', text: '2.33 : 1' },
        { letter: 'D', text: '2.5 : 1' }
      ],
      correctAnswer: 'D',
      explanation: 'Current Assets = Receivables (40k) + Prepaid (10k) + Inventory (100k) = R150 000 (Goodwill is intangible non-current). Current Liabilities = R60 000. Current Ratio = 150 000 : 60 000 = 2.5 : 1.'
    },
    {
      id: 1150,
      subjectId: 'accounting',
      paperId: 'accounting-mcq-test-2',
      question: '50) Information: Cash Balance R5 000; Trade Payables R40 000; Inventory R50 000; Trade Receivables R65 000; Prepaid Expenses R10 000. Calculate the Acid-test (Liquid) Ratio:',
      category: 'Acid-Test Ratio Calculation',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: '0.75 : 1' },
        { letter: 'B', text: '1.75 : 1 (or 2 : 1)' },
        { letter: 'C', text: '3.25 : 1' },
        { letter: 'D', text: '3 : 1' }
      ],
      correctAnswer: 'B',
      explanation: 'Quick Assets = Cash (R5 000) + Receivables (R65 000) = R70 000 (excluding Inventory and Prepaid). Quick Ratio = R70 000 ÷ R40 000 = 1.75 : 1 (or 2:1 depending on rounding).'
    }
  ]
};
