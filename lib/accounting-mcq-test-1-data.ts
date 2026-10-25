import { QuizPaper } from '@/types/quiz';

export const ACCOUNTING_MCQ_TEST_1_PAPER: QuizPaper = {
  id: 'accounting-mcq-test-1',
  subjectId: 'accounting',
  title: 'ACCOUNTING ASSESSMENT GUIDE: TEST 1',
  subtitle: 'Financial Accounting, GAAP Principles, VAT & Financial Ratios (50 MCQs)',
  code: 'ACC-TEST-1',
  chapterNumber: 7,
  paperNumber: 2,
  totalMarks: 100,
  passMark: 50,
  timeLimitMinutes: 90,
  description: 'Skills Academy Accounting Assessment Guide (Assignment 1): 50 Structured Multiple Choice Questions covering Cash Budgets, Debtors Collection, Audit Entries, GAAP Concepts (Business Entity, Going Concern, Prudence, Matching), Financial Statements, VAT Calculations, Market Governance, and Ratio Analysis.',
  questions: [
    {
      id: 1001,
      subjectId: 'accounting',
      paperId: 'accounting-mcq-test-1',
      question: '1) What is a cash budget?',
      category: 'Budgeting & Financial Planning',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'Is an estimation of expected cash inflows and outflows.' },
        { letter: 'B', text: 'Is an estimation of expected income and expenses' },
        { letter: 'C', text: 'Anything that has an objective to determine the expected income' },
        { letter: 'D', text: 'None of the above' }
      ],
      correctAnswer: 'A',
      explanation: 'A cash budget is an estimation and forecast of expected future cash receipts (inflows) and cash payments (outflows) over a specified period.'
    },
    {
      id: 1002,
      subjectId: 'accounting',
      paperId: 'accounting-mcq-test-1',
      question: '2) Which of the following is an internal factor to be considered for an effective and reliable forecasting of future business results?',
      category: 'Financial Forecasting',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'Competitors' },
        { letter: 'B', text: 'Inflation' },
        { letter: 'C', text: 'Interest trends' },
        { letter: 'D', text: 'Collection of other sources of income' }
      ],
      correctAnswer: 'D',
      explanation: 'Collection of other sources of income is an internal factor managed directly within the business, unlike external factors like inflation, competitors, and macroeconomic interest trends.'
    },
    {
      id: 1003,
      subjectId: 'accounting',
      paperId: 'accounting-mcq-test-1',
      question: '3) Among the factors listed below, which one is NOT an internal factor to be considered for an effective and reliable forecasting of future business results?',
      category: 'Financial Forecasting',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'Sources of finance' },
        { letter: 'B', text: 'Replacement of fixed assets' },
        { letter: 'C', text: 'Economy' },
        { letter: 'D', text: 'Sale of merchandise for cash and credit' }
      ],
      correctAnswer: 'C',
      explanation: 'The broader macroeconomy is an external environmental factor that the business cannot directly control.'
    },
    {
      id: 1004,
      subjectId: 'accounting',
      paperId: 'accounting-mcq-test-1',
      question: '4) What is the purpose of a cash budget?',
      category: 'Budgeting & Financial Planning',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'To determine the expected balance in the current banking account' },
        { letter: 'B', text: 'To determine the expected loss/profit' },
        { letter: 'C', text: 'To identify problems in respect of the generating of sufficient income to cover expected expenses' },
        { letter: 'D', text: 'To estimate expected income and expenses' }
      ],
      correctAnswer: 'A',
      explanation: 'The primary purpose of a cash budget is to anticipate future liquidity and determine the expected closing balance in the bank account to avoid overdraft penalties or cash shortfalls.'
    },
    {
      id: 1005,
      subjectId: 'accounting',
      paperId: 'accounting-mcq-test-1',
      question: '5) What is a forecast income statement?',
      category: 'Financial Statements & Planning',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'Is an estimation of expected cash inflows and outflows' },
        { letter: 'B', text: 'Is an estimation of expected income and expenses' },
        { letter: 'C', text: 'Anything that has an objective to determine the bank balance' },
        { letter: 'D', text: 'None of the above explains a forecast income statement' }
      ],
      correctAnswer: 'B',
      explanation: 'A projected/forecast income statement estimates expected revenue (income) and expenditure (expenses) based on the matching principle to project profitability.'
    },
    {
      id: 1006,
      subjectId: 'accounting',
      paperId: 'accounting-mcq-test-1',
      question: '6) The following are reasons why a business must compare budgeted with actual figures EXCEPT …',
      category: 'Variance Analysis',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'To be able to have effective control over receipts' },
        { letter: 'B', text: 'To reflect on whether your projections have been realistic' },
        { letter: 'C', text: 'To improve future projections and hence plan more effectively' },
        { letter: 'D', text: 'To determine the balance in the bank' }
      ],
      correctAnswer: 'D',
      explanation: 'Determining the current bank balance is done via bank reconciliation/bank statements, not budget variance analysis.'
    },
    {
      id: 1007,
      subjectId: 'accounting',
      paperId: 'accounting-mcq-test-1',
      question: '7) The cash budget deals only with __________',
      category: 'Budgeting Rules',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'Cash transactions only' },
        { letter: 'B', text: 'Cash and credit transactions' },
        { letter: 'C', text: 'Credit transactions only' },
        { letter: 'D', text: 'None of the above' }
      ],
      correctAnswer: 'A',
      explanation: 'A cash budget strictly records actual cash inflows and cash outflows; credit sales/purchases appear only when the actual cash collections or payments occur.'
    },
    {
      id: 1008,
      subjectId: 'accounting',
      paperId: 'accounting-mcq-test-1',
      question: '8) Which of the following transactions is to be recorded in the cash budget?',
      category: 'Cash vs Non-Cash Items',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'Bad debts' },
        { letter: 'B', text: 'Discount allowed' },
        { letter: 'C', text: 'Cash transactions' },
        { letter: 'D', text: 'Depreciation' }
      ],
      correctAnswer: 'C',
      explanation: 'Bad debts, depreciation, and discounts are non-cash bookkeeping adjustments and are excluded from the cash budget.'
    },
    {
      id: 1009,
      subjectId: 'accounting',
      paperId: 'accounting-mcq-test-1',
      question: '9) A Debtors\' Collection Schedule is …',
      category: 'Debtors & Working Capital',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'A schedule (plan) of how the business will collect money from its debtors' },
        { letter: 'B', text: 'A forecast of cash receipts and cash payments.' },
        { letter: 'C', text: 'A schedule (plan) of how the business will pay its creditors' },
        { letter: 'D', text: 'A forecast of income and expenses.' }
      ],
      correctAnswer: 'A',
      explanation: 'A Debtors\' Collection Schedule maps out expected cash receipts from credit sales over subsequent months based on historical debtor payment trends.'
    },
    {
      id: 1010,
      subjectId: 'accounting',
      paperId: 'accounting-mcq-test-1',
      question: '10) What are credit sales?',
      category: 'Sales Transactions',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'Goods sold for instant cash' },
        { letter: 'B', text: 'Goods sold for future payment' },
        { letter: 'C', text: 'Goods bought or resale' },
        { letter: 'D', text: 'All of the above statements are true about credit sales' }
      ],
      correctAnswer: 'B',
      explanation: 'Credit sales occur when merchandise is provided immediately to customers with an agreement to settle the account at a future date.'
    },
    {
      id: 1011,
      subjectId: 'accounting',
      paperId: 'accounting-mcq-test-1',
      question: '11) The payment of audit fees is entered in the books as:',
      category: 'Journal Entries & Auditing',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'Debit: Audit fees and Credit: Bank' },
        { letter: 'B', text: 'Debit: Audit fees and Credit: Accrued expenses' },
        { letter: 'C', text: 'Debit: Audit fees and Credit: Provision for audit fees' },
        { letter: 'D', text: 'Credit: Audit fees and Debit: Bank' }
      ],
      correctAnswer: 'A',
      explanation: 'Paying audit fees via bank transfer increases the expense (Debit: Audit Fees) and decreases bank funds (Credit: Bank).'
    },
    {
      id: 1012,
      subjectId: 'accounting',
      paperId: 'accounting-mcq-test-1',
      question: '12) If audit fees are still payable at the end of the financial year, the transaction will be entered in the books as:',
      category: 'Year-End Adjustments',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'Debit: Audit fees and Credit: Bank' },
        { letter: 'B', text: 'Debit: Audit fees and Credit: Accrued expenses' },
        { letter: 'C', text: 'Debit: Audit fees and Credit: Provision for audit fees' },
        { letter: 'D', text: 'Credit: Audit fees and Debit: Bank' }
      ],
      correctAnswer: 'B',
      explanation: 'Accrued expenses represent expenses incurred but not yet paid at year-end: Debit: Audit Fees (expense) and Credit: Accrued Expenses (current liability).'
    },
    {
      id: 1013,
      subjectId: 'accounting',
      paperId: 'accounting-mcq-test-1',
      question: '13) If a company chooses to make provision for the audit in the same year as that of the financial statements being audited, the transaction will be entered as:',
      category: 'Audit Provisions',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'Debit: Audit fees and Credit: Bank' },
        { letter: 'B', text: 'Debit: Audit fees and Credit: Accrued expenses' },
        { letter: 'C', text: 'Debit: Audit fees and Credit: Provision for audit fees' },
        { letter: 'D', text: 'Credit: Audit fees and Debit: Bank' }
      ],
      correctAnswer: 'C',
      explanation: 'Creating a provision for upcoming audit fees: Debit: Audit Fees (expense) and Credit: Provision for Audit Fees (liability/provision).'
    },
    {
      id: 1014,
      subjectId: 'accounting',
      paperId: 'accounting-mcq-test-1',
      question: '14) The GAAP rule that states that the financial affairs of the owners should be kept separate from those of the business is called:',
      category: 'GAAP Concepts',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'Going concern concept' },
        { letter: 'B', text: 'Prudence concept' },
        { letter: 'C', text: 'Historical cost concept' },
        { letter: 'D', text: 'Entity rule (Business entity concept)' }
      ],
      correctAnswer: 'D',
      explanation: 'The Business Entity rule dictates that the financial activities of the enterprise are distinct and separate from the personal finances of its owners/shareholders.'
    },
    {
      id: 1015,
      subjectId: 'accounting',
      paperId: 'accounting-mcq-test-1',
      question: '15) The GAAP rule that states that the financial statements of a business are prepared with the assumption that the business will continue operating in the foreseeable future is called:',
      category: 'GAAP Concepts',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'Concept of materiality' },
        { letter: 'B', text: 'Prudence concept' },
        { letter: 'C', text: 'Matching concept' },
        { letter: 'D', text: 'Going concern concept' }
      ],
      correctAnswer: 'D',
      explanation: 'The Going Concern principle assumes that the business enterprise will remain in operational existence for the foreseeable future.'
    },
    {
      id: 1016,
      subjectId: 'accounting',
      paperId: 'accounting-mcq-test-1',
      question: '16) The GAAP rule stating that when uncertain results are estimated, assets and income must not be overstated, and liabilities and expenses must not be understated, is called:',
      category: 'GAAP Concepts',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'Prudence concept' },
        { letter: 'B', text: 'Going concern concept' },
        { letter: 'C', text: 'Historical concept' },
        { letter: 'D', text: 'Entity rule' }
      ],
      correctAnswer: 'A',
      explanation: 'The Prudence (Conservatism) principle requires accountants to exercise caution in evaluations so profits are not anticipated and all known losses are recorded.'
    },
    {
      id: 1017,
      subjectId: 'accounting',
      paperId: 'accounting-mcq-test-1',
      question: '17) What is the purpose of a trading account?',
      category: 'Final Accounts',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'To calculate net profit' },
        { letter: 'B', text: 'To calculate gross profit' },
        { letter: 'C', text: 'To calculate profit distribution' },
        { letter: 'D', text: 'To calculate deficit' }
      ],
      correctAnswer: 'B',
      explanation: 'The Trading Account matches Sales with Cost of Sales to calculate the Gross Profit on trading operations.'
    },
    {
      id: 1018,
      subjectId: 'accounting',
      paperId: 'accounting-mcq-test-1',
      question: '18) The purpose of a profit and loss account is to __________',
      category: 'Final Accounts',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'To calculate gross profit' },
        { letter: 'B', text: 'To calculate profit distribution' },
        { letter: 'C', text: 'To calculate deficit' },
        { letter: 'D', text: 'To calculate net profit' }
      ],
      correctAnswer: 'D',
      explanation: 'The Profit and Loss Account combines gross operating income with operating expenses and financing costs to calculate Net Profit for the financial year.'
    },
    {
      id: 1019,
      subjectId: 'accounting',
      paperId: 'accounting-mcq-test-1',
      question: '19) The __________ indicates how much of the profit is distributed towards income tax, dividends for shareholders, and retained in reserves.',
      category: 'Company Accounts',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'Trading account' },
        { letter: 'B', text: 'Profit and loss account' },
        { letter: 'C', text: 'Appropriation account' },
        { letter: 'D', text: 'Balance sheet' }
      ],
      correctAnswer: 'C',
      explanation: 'The Appropriation Account demonstrates the distribution and allocation of net profit towards SARS income tax, interim and final dividends, and retained earnings.'
    },
    {
      id: 1020,
      subjectId: 'accounting',
      paperId: 'accounting-mcq-test-1',
      question: '20) In South Africa, VAT is currently levied at __________ %.',
      category: 'Value Added Tax',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: '10%' },
        { letter: 'B', text: '12%' },
        { letter: 'C', text: '20%' },
        { letter: 'D', text: '15%' }
      ],
      correctAnswer: 'D',
      explanation: 'The standard statutory Value Added Tax (VAT) rate in South Africa is 15%.'
    },
    {
      id: 1021,
      subjectId: 'accounting',
      paperId: 'accounting-mcq-test-1',
      question: '21) In the general ledger, a (credit) balance on the __________ Account reflects the final amount that must be paid to SARS.',
      category: 'VAT Ledger Accounts',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'VAT Input' },
        { letter: 'B', text: 'VAT Output' },
        { letter: 'C', text: 'VAT Control' },
        { letter: 'D', text: 'None of the above' }
      ],
      correctAnswer: 'C',
      explanation: 'A credit balance on the VAT Control account indicates that Output VAT exceeds Input VAT, creating a current liability payable to SARS.'
    },
    {
      id: 1022,
      subjectId: 'accounting',
      paperId: 'accounting-mcq-test-1',
      question: '22) An item of stock is purchased for R42 300, excluding VAT. The amount of VAT on this item is R __________',
      category: 'VAT Calculations',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: '6 345' },
        { letter: 'B', text: '48 645' },
        { letter: 'C', text: '42 300' },
        { letter: 'D', text: '39 250' }
      ],
      correctAnswer: 'A',
      explanation: 'VAT = R42 300 × 15% = R6 345.'
    },
    {
      id: 1023,
      subjectId: 'accounting',
      paperId: 'accounting-mcq-test-1',
      question: '23) An item of stock is sold for R78 100, including VAT. The amount of VAT on this item is R __________?',
      category: 'VAT Calculations',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: '10 187' },
        { letter: 'B', text: '11 715' },
        { letter: 'C', text: '89 815' },
        { letter: 'D', text: '88 287' }
      ],
      correctAnswer: 'A',
      explanation: 'VAT = R78 100 × (15 / 115) = R10 186.95 ≈ R10 187.'
    },
    {
      id: 1024,
      subjectId: 'accounting',
      paperId: 'accounting-mcq-test-1',
      question: '24) A deliberate attempt to artificially increase or decrease a company’s share price is called:',
      category: 'Corporate Ethics & JSE Regulations',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'Market manipulation' },
        { letter: 'B', text: 'Illegal insider trading' },
        { letter: 'C', text: 'Corporate governance failure' },
        { letter: 'D', text: 'Accounting fraud' }
      ],
      correctAnswer: 'A',
      explanation: 'Market manipulation refers to intentional conduct designed to deceive investors by controlling or artificially affecting market trading volume and stock prices.'
    },
    {
      id: 1025,
      subjectId: 'accounting',
      paperId: 'accounting-mcq-test-1',
      question: '25) __________ is when directors manipulate financial indicators to mislead shareholders.',
      category: 'Corporate Governance & Fraud',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'Disclosure violations' },
        { letter: 'B', text: 'Painting the tape' },
        { letter: 'C', text: 'Accounting fraud' },
        { letter: 'D', text: 'Illegal insider trading' }
      ],
      correctAnswer: 'C',
      explanation: 'Accounting fraud occurs when financial statements, ratios, or revenues are intentionally falsified or manipulated to present an inaccurate picture of company performance.'
    },
    {
      id: 1026,
      subjectId: 'accounting',
      paperId: 'accounting-mcq-test-1',
      question: '26) __________ is when directors do not act in the best interest of the shareholders.',
      category: 'King Code & Directors Duties',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'Corporate governance failure' },
        { letter: 'B', text: 'Painting the tape' },
        { letter: 'C', text: 'Accounting fraud' },
        { letter: 'D', text: 'Illegal insider trading' }
      ],
      correctAnswer: 'A',
      explanation: 'Corporate governance failure occurs when fiduciary duties, transparency, ethical leadership, and stewardship in the interests of shareholders are breached.'
    },
    {
      id: 1027,
      subjectId: 'accounting',
      paperId: 'accounting-mcq-test-1',
      question: '27) Information: Sales (all on credit) R830 000; Cost of Goods Sold R525 000; Inventory Beginning R100 000; Inventory End R110 000. Calculate the Inventory Turnover Ratio:',
      category: 'Financial Indicators · Inventory Turnover',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: '4.8 times' },
        { letter: 'B', text: '5.0 / 5.1 times' },
        { letter: 'C', text: '7.9 times' },
        { letter: 'D', text: '1.5 times' }
      ],
      correctAnswer: 'B',
      explanation: 'Average Inventory = (R100 000 + R110 000) ÷ 2 = R105 000. Inventory Turnover = Cost of Sales ÷ Average Inventory = R525 000 ÷ R105 000 = 5.0 (5.1) times.'
    },
    {
      id: 1028,
      subjectId: 'accounting',
      paperId: 'accounting-mcq-test-1',
      question: '28) Information: Credit Sales R830 000; Accounts Receivable Beginning R80 000; Accounts Receivable End R86 000. Calculate the Accounts Receivable Turnover Ratio:',
      category: 'Financial Indicators · Debtors Turnover',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: '6.3 times' },
        { letter: 'B', text: '7.5 times' },
        { letter: 'C', text: '10.0 / 10.1 times' },
        { letter: 'D', text: '2.5 times' }
      ],
      correctAnswer: 'C',
      explanation: 'Average Debtors = (R80 000 + R86 000) ÷ 2 = R83 000. Accounts Receivable Turnover = Credit Sales ÷ Average Debtors = R830 000 ÷ R83 000 = 10.0 (10.1) times.'
    },
    {
      id: 1029,
      subjectId: 'accounting',
      paperId: 'accounting-mcq-test-1',
      question: '29) On average, how many days of sales were in Accounts Receivable during the year? (Use 365 days):',
      category: 'Financial Indicators · Debtors Collection Period',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: '27 days' },
        { letter: 'B', text: '37 days (36.5 days)' },
        { letter: 'C', text: '49 days' },
        { letter: 'D', text: '59 days' }
      ],
      correctAnswer: 'B',
      explanation: 'Debtors Collection Period = (Average Debtors ÷ Credit Sales) × 365 = (R83 000 ÷ R830 000) × 365 = 36.5 ≈ 37 days.'
    },
    {
      id: 1030,
      subjectId: 'accounting',
      paperId: 'accounting-mcq-test-1',
      question: '30) On average, how many days of sales were in Inventory during the year? (Use 365 days):',
      category: 'Financial Indicators · Stock Holding Period',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: '14 days' },
        { letter: 'B', text: '46 days' },
        { letter: 'C', text: '73 days' },
        { letter: 'D', text: '44 days' }
      ],
      correctAnswer: 'C',
      explanation: 'Stock Holding Period = (Average Inventory ÷ Cost of Sales) × 365 = (R105 000 ÷ R525 000) × 365 = 0.2 × 365 = 73 days.'
    },
    {
      id: 1031,
      subjectId: 'accounting',
      paperId: 'accounting-mcq-test-1',
      question: '31) Solvency is defined as:',
      category: 'Financial Analysis · Solvency',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'Ability of the business to pay off all its debts (Total Assets exceed Total Liabilities)' },
        { letter: 'B', text: 'Ability of the business to pay off its short-term debts' },
        { letter: 'C', text: 'The benefit that shareholders receive for investing in the company' },
        { letter: 'D', text: 'The extent to which a company is financed by loans' }
      ],
      correctAnswer: 'A',
      explanation: 'Solvency measures the enterprise\'s capacity to settle all total liabilities in the event of liquidation (Total Assets : Total Liabilities > 1:1).'
    },
    {
      id: 1032,
      subjectId: 'accounting',
      paperId: 'accounting-mcq-test-1',
      question: '32) Gearing refers to:',
      category: 'Financial Analysis · Gearing',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'Ability of the business to pay off all its debts' },
        { letter: 'B', text: 'Ability of the business to pay off its short-term debts' },
        { letter: 'C', text: 'The benefit that shareholders receive for investing in the company' },
        { letter: 'D', text: 'The extent to which a company is financed by borrowed capital (loans) compared to shareholders\' equity' }
      ],
      correctAnswer: 'D',
      explanation: 'Gearing (or leverage) represents the proportion of non-current borrowed capital (debt) relative to owned equity capital.'
    },
    {
      id: 1033,
      subjectId: 'accounting',
      paperId: 'accounting-mcq-test-1',
      question: '33) Return on Equity (ROE / ROSHE) measures:',
      category: 'Financial Analysis · Profitability',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'Ability of the business to pay off all its debts' },
        { letter: 'B', text: 'Ability of the business to pay off its short-term debts' },
        { letter: 'C', text: 'The percentage return and financial benefit that shareholders receive on their invested equity' },
        { letter: 'D', text: 'The extent to which a company is financed by loans' }
      ],
      correctAnswer: 'C',
      explanation: 'Return on Shareholders\' Equity = (Net Profit after Tax ÷ Average Shareholders\' Equity) × 100.'
    },
    {
      id: 1034,
      subjectId: 'accounting',
      paperId: 'accounting-mcq-test-1',
      question: '34) Liquidity refers to:',
      category: 'Financial Analysis · Liquidity',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'Ability of the business to pay off all its debts' },
        { letter: 'B', text: 'Ability of the business to pay off its short-term debts and operational obligations promptly' },
        { letter: 'C', text: 'The benefit that shareholders receive for investing in the company' },
        { letter: 'D', text: 'The extent to which a company is financed by loans' }
      ],
      correctAnswer: 'B',
      explanation: 'Liquidity evaluates whether current assets (cash, debtors, stock) are sufficient to settle current liabilities as they fall due.'
    },
    {
      id: 1035,
      subjectId: 'accounting',
      paperId: 'accounting-mcq-test-1',
      question: '35) Information: Turnover (Sales) R950 000; Net Profit before Tax R168 000. Calculate Net Profit percentage on sales:',
      category: 'Ratio Calculations',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: '13%' },
        { letter: 'B', text: '17.68%' },
        { letter: 'C', text: '13.26%' },
        { letter: 'D', text: '17.00%' }
      ],
      correctAnswer: 'B',
      explanation: 'Net Profit % on sales = (R168 000 ÷ R950 000) × 100 = 17.68%.'
    },
    {
      id: 1036,
      subjectId: 'accounting',
      paperId: 'accounting-mcq-test-1',
      question: '36) Information: Turnover (Sales) R950 000; Gross Profit R520 000. Calculate Gross Profit percentage on sales:',
      category: 'Ratio Calculations',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: '54.73% (or 54.7%)' },
        { letter: 'B', text: '45.26%' },
        { letter: 'C', text: '18.27%' },
        { letter: 'D', text: '52.00%' }
      ],
      correctAnswer: 'A',
      explanation: 'Gross Profit % on sales = (R520 000 ÷ R950 000) × 100 = 54.73%.'
    },
    {
      id: 1037,
      subjectId: 'accounting',
      paperId: 'accounting-mcq-test-1',
      question: '37) Which of the following is most likely to have reported balance sheet amounts being close to their current realisable market value?',
      category: 'Balance Sheet Valuation',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'Current Assets (Cash, Receivables, Bank)' },
        { letter: 'B', text: 'Long-term Assets' },
        { letter: 'C', text: 'Stockholders\' Equity' },
        { letter: 'D', text: 'Fixed assets (Historical Cost)' }
      ],
      correctAnswer: 'A',
      explanation: 'Current assets (cash and receivables) turn over rapidly and reflect current nominal liquid values, unlike fixed assets recorded at historical cost.'
    },
    {
      id: 1038,
      subjectId: 'accounting',
      paperId: 'accounting-mcq-test-1',
      question: '38) The roles of professional accounting bodies (e.g. SAICA, SAIPA) are to ensure that their members:',
      category: 'Professional Ethics & Bodies',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'Are suitably qualified and highly skilled' },
        { letter: 'B', text: 'Remain up to date with continuous professional development' },
        { letter: 'C', text: 'Adhere to strict standards of professional and ethical conduct' },
        { letter: 'D', text: 'All of the above' }
      ],
      correctAnswer: 'D',
      explanation: 'Professional bodies regulate qualifications, enforce codes of ethics, and provide continuous professional development (CPD).'
    },
    {
      id: 1039,
      subjectId: 'accounting',
      paperId: 'accounting-mcq-test-1',
      question: '39) The estimated amount that will be realised at the end of the useful economic life of an asset is called:',
      category: 'Fixed Asset Depreciation',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'Initial value' },
        { letter: 'B', text: 'Cost value' },
        { letter: 'C', text: 'Scrap value (Residual / Salvage value)' },
        { letter: 'D', text: 'None of the above' }
      ],
      correctAnswer: 'C',
      explanation: 'Scrap (residual/salvage) value is the expected net amount obtainable when disposing of an asset at the end of its useful lifespan.'
    },
    {
      id: 1040,
      subjectId: 'accounting',
      paperId: 'accounting-mcq-test-1',
      question: '40) The process of measuring and recording the periodic exhaustion of natural wasting resources due to extraction is called:',
      category: 'Asset Valuation Terms',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'Appreciation' },
        { letter: 'B', text: 'Depletion' },
        { letter: 'C', text: 'Accumulation' },
        { letter: 'D', text: 'None of the above' }
      ],
      correctAnswer: 'B',
      explanation: 'Depletion is the accounting allocation of the cost of natural resources (such as timber, minerals, oil) as they are extracted.'
    },
    {
      id: 1041,
      subjectId: 'accounting',
      paperId: 'accounting-mcq-test-1',
      question: '41) Which of the following is NOT an example of an intangible asset?',
      category: 'Asset Classification',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'Goodwill' },
        { letter: 'B', text: 'Copyright' },
        { letter: 'C', text: 'Patents' },
        { letter: 'D', text: 'Fixtures and fittings' }
      ],
      correctAnswer: 'D',
      explanation: 'Fixtures and fittings are physical tangible fixed assets, whereas goodwill, copyrights, and patents lack physical substance.'
    },
    {
      id: 1042,
      subjectId: 'accounting',
      paperId: 'accounting-mcq-test-1',
      question: '42) When depreciation is calculated as an equal fixed portion of the asset\'s cost across each year of useful life, the method is called:',
      category: 'Depreciation Methods',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'Straight-line method (Cost price method)' },
        { letter: 'B', text: 'Diminishing balance method' },
        { letter: 'C', text: 'Specific identification method' },
        { letter: 'D', text: 'All of the above' }
      ],
      correctAnswer: 'A',
      explanation: 'The straight-line (cost price) method charges equal annual depreciation: (Cost − Scrap Value) ÷ Useful Life.'
    },
    {
      id: 1043,
      subjectId: 'accounting',
      paperId: 'accounting-mcq-test-1',
      question: '43) Which of the following depreciation methods is NOT an accelerated depreciation method?',
      category: 'Depreciation Methods',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'Double-declining Balance' },
        { letter: 'B', text: 'Straight-line' },
        { letter: 'C', text: 'Sum-of-the-years\' Digits' },
        { letter: 'D', text: 'Diminishing balance' }
      ],
      correctAnswer: 'B',
      explanation: 'Straight-line allocates equal constant depreciation each year, unlike accelerated methods which charge higher depreciation in early years.'
    },
    {
      id: 1044,
      subjectId: 'accounting',
      paperId: 'accounting-mcq-test-1',
      question: '44) The carrying value (book value) of a fixed asset is defined as:',
      category: 'Fixed Asset Notes',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'Cost Minus Salvage Value' },
        { letter: 'B', text: 'Cost Minus Accumulated Depreciation' },
        { letter: 'C', text: 'Cost Minus Salvage Value Minus Accumulated Depreciation' },
        { letter: 'D', text: 'Estimated Fair Market Value' }
      ],
      correctAnswer: 'B',
      explanation: 'Carrying (book) value = Historical Cost Price − Accumulated Depreciation to date.'
    },
    {
      id: 1045,
      subjectId: 'accounting',
      paperId: 'accounting-mcq-test-1',
      question: '45) A bank reconciliation is an essential audit verification check because:',
      category: 'Auditing & Reconciliations',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'It verifies internal cash records against the bank statement from an independent external financial institution' },
        { letter: 'B', text: 'It proves that there have been no double entry errors anywhere in the journals' },
        { letter: 'C', text: 'It automatically files company taxes with SARS' },
        { letter: 'D', text: 'None of the above' }
      ],
      correctAnswer: 'A',
      explanation: 'Bank reconciliation provides reliable third-party external audit evidence confirming cash transactions and bank balances.'
    },
    {
      id: 1046,
      subjectId: 'accounting',
      paperId: 'accounting-mcq-test-1',
      question: '46) An unqualified audit report provides assurance to users of the financial statements that:',
      category: 'Auditor Opinions',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'The financial statements fairly present the financial position in all material respects in accordance with IFRS/GAAP' },
        { letter: 'B', text: 'The directors have guaranteed future corporate profits' },
        { letter: 'C', text: 'The company will never face insolvency' },
        { letter: 'D', text: 'None of the above' }
      ],
      correctAnswer: 'A',
      explanation: 'An unqualified ("clean") audit report confirms that financial statements are free of material misstatements and comply with reporting standards.'
    },
    {
      id: 1047,
      subjectId: 'accounting',
      paperId: 'accounting-mcq-test-1',
      question: '47) An internal audit of an organisation is typically carried out by:',
      category: 'Internal Audit',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'External auditors when focusing on internal controls' },
        { letter: 'B', text: 'Internal employees/specialist internal audit team' },
        { letter: 'C', text: 'Qualified accountants with specialist knowledge of internal control systems' },
        { letter: 'D', text: 'Any of the above answers' }
      ],
      correctAnswer: 'D',
      explanation: 'Internal audits can be staffed by internal company auditors or outsourced to specialist accounting professionals.'
    },
    {
      id: 1048,
      subjectId: 'accounting',
      paperId: 'accounting-mcq-test-1',
      question: '48) A Debtors\' (Sales) Control account balance agreeing with the total of individual Debtors\' Ledger balances indicates that:',
      category: 'Control Accounts',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'It is highly likely there is arithmetic accuracy and no double-entry error in the individual debtors ledger' },
        { letter: 'B', text: 'No amounts from sales will appear in the bank statement' },
        { letter: 'C', text: 'There are no bad debts in the company' },
        { letter: 'D', text: 'All debtors have paid their accounts in full' }
      ],
      correctAnswer: 'A',
      explanation: 'Reconciling the control account with subsidiary ledger balances confirms mathematical consistency in posting entries.'
    },
    {
      id: 1049,
      subjectId: 'accounting',
      paperId: 'accounting-mcq-test-1',
      question: '49) An unpresented cheque (outstanding payment) is a cheque which:',
      category: 'Bank Reconciliation',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'Has been entered in the Cash Payments Journal, but has not yet been processed/cleared by the bank' },
        { letter: 'B', text: 'Has not yet been entered in our cash book, but has cleared the bank' },
        { letter: 'C', text: 'Has been cancelled by the drawer' },
        { letter: 'D', text: 'Is a stale cheque older than six months' }
      ],
      correctAnswer: 'A',
      explanation: 'An unpresented cheque is an outstanding payment recorded in the CPJ that has not yet been presented to or cleared by the bank.'
    },
    {
      id: 1050,
      subjectId: 'accounting',
      paperId: 'accounting-mcq-test-1',
      question: '50) The net VAT amount payable to (or receivable from) SARS is calculated by:',
      category: 'VAT Settlements',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'Output tax − Input tax' },
        { letter: 'B', text: 'Output tax + Input tax' },
        { letter: 'C', text: 'Output tax ÷ Input tax' },
        { letter: 'D', text: 'Output tax × Input tax' }
      ],
      correctAnswer: 'A',
      explanation: 'VAT Payable to SARS = Output VAT (tax collected on sales) − Input VAT (tax paid on business purchases).'
    }
  ]
};
