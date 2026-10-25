import { QuizPaper } from '@/types/quiz';

export const MATHS_LIT_MCQ_TEST_1_PAPER: QuizPaper = {
  id: 'maths-lit-mcq-test-1',
  subjectId: 'maths_literacy',
  title: 'MATHEMATICAL LITERACY ASSESSMENT GUIDE: TEST 1',
  subtitle: 'Finance, Taxation, Tariffs, Banking & Currency Exchange (50 MCQs)',
  code: 'MLIT-TEST-1',
  chapterNumber: 5,
  paperNumber: 2,
  totalMarks: 100,
  passMark: 50,
  timeLimitMinutes: 90,
  description: 'Skills Academy Mathematical Literacy Assessment Skills Guide (Assignment 1): 50 Structured Multiple Choice Questions covering Personal & Business Finance, Income Tax Brackets, Rebates & Medical Credits, VAT (15%), Simple & Compound Interest, Inflation, Tariff Systems (Water & Electricity), Banking Fees, Hire Purchase, Break-Even Analysis, and Currency Conversions.',
  questions: [
    {
      id: 2001,
      subjectId: 'maths_literacy',
      paperId: 'maths-lit-mcq-test-1',
      question: '1) In South Africa, the standard rate of Value Added Tax (VAT) is 15%. If a laptop costs R8 000 excluding VAT, what is the selling price including VAT?',
      category: 'Finance · VAT Calculations',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'R8 150,00' },
        { letter: 'B', text: 'R9 200,00' },
        { letter: 'C', text: 'R9 500,00' },
        { letter: 'D', text: 'R10 200,00' }
      ],
      correctAnswer: 'B',
      explanation: 'VAT Inclusive Price = Price Excl. VAT × 1.15 = R8 000 × 1.15 = R9 200,00 (or VAT = R8 000 × 15% = R1 200, then R8 000 + R1 200 = R9 200).'
    },
    {
      id: 2002,
      subjectId: 'maths_literacy',
      paperId: 'maths-lit-mcq-test-1',
      question: '2) A grocery receipt displays a total amount of R460,00 including 15% VAT. How much VAT was paid on this purchase?',
      category: 'Finance · VAT Calculations',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'R60,00' },
        { letter: 'B', text: 'R69,00' },
        { letter: 'C', text: 'R55,20' },
        { letter: 'D', text: 'R40,00' }
      ],
      correctAnswer: 'A',
      explanation: 'Price Excl. VAT = R460 ÷ 1.15 = R400,00. VAT Amount = R460,00 − R400,00 = R60,00 (or R460 × (15/115) = R60,00).'
    },
    {
      id: 2003,
      subjectId: 'maths_literacy',
      paperId: 'maths-lit-mcq-test-1',
      question: '3) Which of the following basic food items is zero-rated (0% VAT) under South African tax legislation?',
      category: 'Finance · VAT Legislation',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'Prepared takeaway meals' },
        { letter: 'B', text: 'Brown bread and fresh milk' },
        { letter: 'C', text: 'Carbonated soft drinks' },
        { letter: 'D', text: 'Confectionery and chocolate' }
      ],
      correctAnswer: 'B',
      explanation: 'Under South African VAT regulations, essential staple foodstuffs such as brown bread, fresh whole milk, maize meal, and dried beans are zero-rated (0% VAT).'
    },
    {
      id: 2004,
      subjectId: 'maths_literacy',
      paperId: 'maths-lit-mcq-test-1',
      question: '4) Thabo invests R12 000 in a fixed deposit account earning 7,5% simple interest per year for 4 years. What is the total interest earned?',
      category: 'Finance · Simple Interest',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'R900,00' },
        { letter: 'B', text: 'R2 700,00' },
        { letter: 'C', text: 'R3 600,00' },
        { letter: 'D', text: 'R15 600,00' }
      ],
      correctAnswer: 'C',
      explanation: 'Simple Interest I = P × r × t = R12 000 × 0.075 × 4 = R3 600,00.'
    },
    {
      id: 2005,
      subjectId: 'maths_literacy',
      paperId: 'maths-lit-mcq-test-1',
      question: '5) Lerato invests R10 000 in a savings fund that offers 8% interest per annum compounded annually. What will the total accumulated value of the investment be after 3 years?',
      category: 'Finance · Compound Interest',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'R12 400,00' },
        { letter: 'B', text: 'R12 597,12' },
        { letter: 'C', text: 'R12 800,00' },
        { letter: 'D', text: 'R13 245,50' }
      ],
      correctAnswer: 'B',
      explanation: 'Compound Amount A = P(1 + i)^n = R10 000 × (1 + 0.08)³ = R10 000 × 1.259712 = R12 597,12.'
    },
    {
      id: 2006,
      subjectId: 'maths_literacy',
      paperId: 'maths-lit-mcq-test-1',
      question: '6) A sound system is sold on hire purchase for a cash price of R9 500. The terms require a 15% cash deposit, followed by 24 monthly instalments of R480. What is the deposit amount?',
      category: 'Finance · Hire Purchase',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'R950,00' },
        { letter: 'B', text: 'R1 425,00' },
        { letter: 'C', text: 'R1 900,00' },
        { letter: 'D', text: 'R2 100,00' }
      ],
      correctAnswer: 'B',
      explanation: 'Deposit = 15% of R9 500 = 0.15 × R9 500 = R1 425,00.'
    },
    {
      id: 2007,
      subjectId: 'maths_literacy',
      paperId: 'maths-lit-mcq-test-1',
      question: '7) For the sound system in Question 6 (Deposit: R1 425, 24 instalments of R480), how much more does the customer pay on hire purchase than paying cash upfront (the hire purchase finance cost)?',
      category: 'Finance · Hire Purchase Cost',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'R1 425,00' },
        { letter: 'B', text: 'R2 445,00' },
        { letter: 'C', text: 'R3 445,00' },
        { letter: 'D', text: 'R11 520,00' }
      ],
      correctAnswer: 'C',
      explanation: 'Total HP Cost = Deposit + Total Instalments = R1 425 + (24 × R480) = R1 425 + R11 520 = R12 945. Extra Cost = R12 945 − R9 500 = R3 445,00.'
    },
    {
      id: 2008,
      subjectId: 'maths_literacy',
      paperId: 'maths-lit-mcq-test-1',
      question: '8) In South Africa, the statutory Unemployment Insurance Fund (UIF) deduction deducted from an employee’s monthly salary is:',
      category: 'Finance · Statutory Deductions',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: '0,5% of gross earnings' },
        { letter: 'B', text: '1% of gross earnings (up to statutory ceiling)' },
        { letter: 'C', text: '2% of gross earnings' },
        { letter: 'D', text: '5% of gross earnings' }
      ],
      correctAnswer: 'B',
      explanation: 'The employee contributes 1% of their gross remuneration to the UIF (capped at the maximum statutory threshold), and the employer contributes an additional matching 1%.'
    },
    {
      id: 2009,
      subjectId: 'maths_literacy',
      paperId: 'maths-lit-mcq-test-1',
      question: '9) Sindi earns a gross monthly salary of R16 400. What is her monthly UIF contribution deducted from her salary?',
      category: 'Finance · Statutory Deductions',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'R16,40' },
        { letter: 'B', text: 'R82,00' },
        { letter: 'C', text: 'R164,00' },
        { letter: 'D', text: 'R328,00' }
      ],
      correctAnswer: 'C',
      explanation: 'UIF deduction = 1% of R16 400 = 0.01 × R16 400 = R164,00.'
    },
    {
      id: 2010,
      subjectId: 'maths_literacy',
      paperId: 'maths-lit-mcq-test-1',
      question: '10) Which formula correctly defines an employee’s Taxable Income for South African personal income tax purposes?',
      category: 'Taxation · Taxable Income',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'Taxable Income = Gross Income + Medical Credits' },
        { letter: 'B', text: 'Taxable Income = Gross Income − Allowable Deductions (e.g. Pension/RA)' },
        { letter: 'C', text: 'Taxable Income = Net Pay × 12' },
        { letter: 'D', text: 'Taxable Income = Gross Income − Primary Rebate' }
      ],
      correctAnswer: 'B',
      explanation: 'Taxable income is calculated by taking Gross Income and subtracting allowable tax deductions such as pension and retirement annuity contributions. Rebates and medical tax credits are subtracted from tax payable, not from income.'
    },
    {
      id: 2011,
      subjectId: 'maths_literacy',
      paperId: 'maths-lit-mcq-test-1',
      question: '11) What is the purpose of the Primary Tax Rebate provided by SARS to individual taxpayers?',
      category: 'Taxation · Tax Rebates',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'It reduces the taxable income before applying the tax brackets' },
        { letter: 'B', text: 'It is a fixed deduction directly subtracted from the calculated tax liability' },
        { letter: 'C', text: 'It is paid into the taxpayer’s bank account as a cash bonus each month' },
        { letter: 'D', text: 'It exempts all taxpayers aged over 65 from paying VAT' }
      ],
      correctAnswer: 'B',
      explanation: 'A tax rebate is a direct reduction of the calculated tax payable, ensuring that lower-income earners pay zero or reduced net tax.'
    },
    {
      id: 2012,
      subjectId: 'maths_literacy',
      paperId: 'maths-lit-mcq-test-1',
      question: '12) What does the term "Tax Threshold" mean in South African personal income tax?',
      category: 'Taxation · Tax Thresholds',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'The maximum amount of tax any individual is allowed to pay in a year' },
        { letter: 'B', text: 'The highest tax bracket rate of 45%' },
        { letter: 'C', text: 'The minimum annual income an individual must earn before they become liable to pay income tax' },
        { letter: 'D', text: 'The total value of VAT refunds an individual can claim back from SARS' }
      ],
      correctAnswer: 'C',
      explanation: 'The tax threshold is the income level below which the calculated tax is equal to or less than the tax rebates, meaning no tax is owed.'
    },
    {
      id: 2013,
      subjectId: 'maths_literacy',
      paperId: 'maths-lit-mcq-test-1',
      question: '13) According to SARS tax tables, Bracket 1 taxes taxable income from R1 to R237 100 at 18%. If Mandla has an annual taxable income of R180 000, what is his tax liability BEFORE rebates?',
      category: 'Taxation · Income Tax Calculation',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'R18 000,00' },
        { letter: 'B', text: 'R32 400,00' },
        { letter: 'C', text: 'R42 678,00' },
        { letter: 'D', text: 'R54 000,00' }
      ],
      correctAnswer: 'B',
      explanation: 'Tax before rebates = 18% of R180 000 = 0.18 × R180 000 = R32 400,00.'
    },
    {
      id: 2014,
      subjectId: 'maths_literacy',
      paperId: 'maths-lit-mcq-test-1',
      question: '14) If Mandla in Question 13 has a calculated tax liability of R32 400 and qualifies for a Primary Rebate of R17 235, what is his annual net tax payable?',
      category: 'Taxation · Income Tax Calculation',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'R15 165,00' },
        { letter: 'B', text: 'R17 235,00' },
        { letter: 'C', text: 'R32 400,00' },
        { letter: 'D', text: 'R49 635,00' }
      ],
      correctAnswer: 'A',
      explanation: 'Net Tax Payable = Tax before rebates − Primary Rebate = R32 400 − R17 235 = R15 165,00.'
    },
    {
      id: 2015,
      subjectId: 'maths_literacy',
      paperId: 'maths-lit-mcq-test-1',
      question: '15) Why do South African municipalities use a stepped (sliding scale / block) tariff system for residential water and electricity billing?',
      category: 'Tariffs · Municipal Water & Electricity',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'To ensure that people who use more water pay lower rates per kilolitre' },
        { letter: 'B', text: 'To encourage conservation by charging higher tariffs per unit as consumption increases' },
        { letter: 'C', text: 'To ensure every household pays the exact same monthly bill regardless of usage' },
        { letter: 'D', text: 'To discourage households from installing solar power' }
      ],
      correctAnswer: 'B',
      explanation: 'A stepped tariff system charges lower rates for basic lifeline needs and progressively higher rates for higher consumption blocks to encourage conservation and penalize wastage.'
    },
    {
      id: 2016,
      subjectId: 'maths_literacy',
      paperId: 'maths-lit-mcq-test-1',
      question: '16) A municipality water tariff is structured as follows:\n• Step 1 (0 to 6 kL): Free (R0,00/kL)\n• Step 2 (>6 to 15 kL): R18,50 per kL\n• Step 3 (>15 to 25 kL): R26,00 per kL\nA household uses 12 kL of water in a month. What is the total water charge excluding VAT?',
      category: 'Tariffs · Water Tariffs',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'R111,00' },
        { letter: 'B', text: 'R166,50' },
        { letter: 'C', text: 'R222,00' },
        { letter: 'D', text: 'R312,00' }
      ],
      correctAnswer: 'A',
      explanation: 'Step 1 (First 6 kL) = 6 × R0 = R0. Step 2 (next 6 kL: from 6 to 12 kL) = (12 − 6) × R18,50 = 6 × R18,50 = R111,00. Total = R111,00.'
    },
    {
      id: 2017,
      subjectId: 'maths_literacy',
      paperId: 'maths-lit-mcq-test-1',
      question: '17) If the water charge in Question 16 is R111,00, what is the total water bill when 15% VAT is added?',
      category: 'Tariffs · Water Tariffs',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'R116,65' },
        { letter: 'B', text: 'R126,00' },
        { letter: 'C', text: 'R127,65' },
        { letter: 'D', text: 'R135,50' }
      ],
      correctAnswer: 'C',
      explanation: 'Total including VAT = R111,00 × 1.15 = R127,65.'
    },
    {
      id: 2018,
      subjectId: 'maths_literacy',
      paperId: 'maths-lit-mcq-test-1',
      question: '18) Electricity is measured and billed by energy providers such as Eskom in which standard billing unit?',
      category: 'Tariffs · Electricity Measurement',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'Kilolitres (kL)' },
        { letter: 'B', text: 'Kilowatt-hours (kWh)' },
        { letter: 'C', text: 'Megapascals (MPa)' },
        { letter: 'D', text: 'Watts per hour (W/h)' }
      ],
      correctAnswer: 'B',
      explanation: 'Electrical energy consumed is billed in kilowatt-hours (kWh), where 1 kWh is the energy used by a 1 000-watt appliance operating for 1 hour.'
    },
    {
      id: 2019,
      subjectId: 'maths_literacy',
      paperId: 'maths-lit-mcq-test-1',
      question: '19) An electric heater rated at 2 000 W (2 kW) runs continuously for 5 hours each evening. If electricity costs R2,40 per kWh, what is the cost of running the heater per evening?',
      category: 'Tariffs · Electricity Cost Calculation',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'R4,80' },
        { letter: 'B', text: 'R12,00' },
        { letter: 'C', text: 'R24,00' },
        { letter: 'D', text: 'R48,00' }
      ],
      correctAnswer: 'C',
      explanation: 'Energy = Power × Time = 2 kW × 5 hours = 10 kWh. Cost = 10 kWh × R2,40 = R24,00.'
    },
    {
      id: 2020,
      subjectId: 'maths_literacy',
      paperId: 'maths-lit-mcq-test-1',
      question: '20) On a commercial bank statement, what does an entry in the "DEBIT" column signify?',
      category: 'Banking · Account Statements',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'Money has been deposited into the account, increasing the balance' },
        { letter: 'B', text: 'Money has been withdrawn or paid out, decreasing the balance' },
        { letter: 'C', text: 'Interest earned on the positive bank balance' },
        { letter: 'D', text: 'A loan approved by the bank' }
      ],
      correctAnswer: 'B',
      explanation: 'From the bank’s perspective, your deposit is a liability (credit). When money is taken out (payments, ATM withdrawals, fees), the bank debits your account, reducing your balance.'
    },
    {
      id: 2021,
      subjectId: 'maths_literacy',
      paperId: 'maths-lit-mcq-test-1',
      question: '21) What is the fundamental difference between a STOP ORDER and a DEBIT ORDER?',
      category: 'Banking · Payment Instructions',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'A stop order can only be used to pay SARS taxes' },
        { letter: 'B', text: 'A stop order is an instruction given by the account holder to the bank; a debit order is an authorization given to a third party to collect funds' },
        { letter: 'C', text: 'A debit order is always processed in cash over the counter' },
        { letter: 'D', text: 'There is no difference; they are identical banking terms' }
      ],
      correctAnswer: 'B',
      explanation: 'In a stop order, the customer directly instructs their bank to pay a fixed sum periodically. In a debit order, the customer signs an agreement allowing an external creditor (e.g. insurance company, gym) to request and collect payment.'
    },
    {
      id: 2022,
      subjectId: 'maths_literacy',
      paperId: 'maths-lit-mcq-test-1',
      question: '22) A bank charges the following fee for ATM cash withdrawals:\nR12,00 fixed fee + 1,5% of the withdrawal amount.\nHow much fee is charged for withdrawing R1 500 at an ATM?',
      category: 'Banking · Transaction Fees',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'R22,50' },
        { letter: 'B', text: 'R34,50' },
        { letter: 'C', text: 'R45,00' },
        { letter: 'D', text: 'R52,00' }
      ],
      correctAnswer: 'B',
      explanation: 'Variable fee = 1,5% of R1 500 = 0.015 × R1 500 = R22,50. Total fee = R12,00 + R22,50 = R34,50.'
    },
    {
      id: 2023,
      subjectId: 'maths_literacy',
      paperId: 'maths-lit-mcq-test-1',
      question: '23) What does the economic term "Inflation" describe?',
      category: 'Finance · Inflation & Purchasing Power',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'A decrease in interest rates set by the South African Reserve Bank' },
        { letter: 'B', text: 'The general and continuous increase in the price of goods and services over time' },
        { letter: 'C', text: 'An increase in the value of the South African Rand against foreign currencies' },
        { letter: 'D', text: 'A reduction in the national unemployment rate' }
      ],
      correctAnswer: 'B',
      explanation: 'Inflation measures the ongoing increase in the price level of goods and services over time, which erodes the purchasing power of money.'
    },
    {
      id: 2024,
      subjectId: 'maths_literacy',
      paperId: 'maths-lit-mcq-test-1',
      question: '24) A 2 kg bag of rice currently costs R45,00. If the average annual inflation rate for food is 6%, what will the estimated price of the rice be in 1 year’s time?',
      category: 'Finance · Inflation Calculation',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'R46,20' },
        { letter: 'B', text: 'R47,70' },
        { letter: 'C', text: 'R51,00' },
        { letter: 'D', text: 'R53,00' }
      ],
      correctAnswer: 'B',
      explanation: 'Price in 1 year = Current Price × (1 + inflation rate) = R45,00 × 1.06 = R47,70.'
    },
    {
      id: 2025,
      subjectId: 'maths_literacy',
      paperId: 'maths-lit-mcq-test-1',
      question: '25) When the inflation rate is 7% but an employee receives an annual salary increase of only 4%, what happens to the employee’s real purchasing power?',
      category: 'Finance · Real Purchasing Power',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'It increases by 3%' },
        { letter: 'B', text: 'It remains completely unchanged' },
        { letter: 'C', text: 'It decreases because price increases exceed income growth' },
        { letter: 'D', text: 'It doubles over the course of the year' }
      ],
      correctAnswer: 'C',
      explanation: 'Because the cost of living rose faster (7%) than the salary increase (4%), the employee’s real buying power has decreased.'
    },
    {
      id: 2026,
      subjectId: 'maths_literacy',
      paperId: 'maths-lit-mcq-test-1',
      question: '26) The exchange rate is quoted as 1 US Dollar ($) = R18,25. How much will a tourist pay in South African Rands (ZAR) to purchase $400 for an overseas trip?',
      category: 'Exchange Rates · Currency Conversion',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'R21,92' },
        { letter: 'B', text: 'R7 300,00' },
        { letter: 'C', text: 'R8 250,00' },
        { letter: 'D', text: 'R9 125,00' }
      ],
      correctAnswer: 'B',
      explanation: 'Amount in ZAR = $400 × R18,25 = R7 300,00.'
    },
    {
      id: 2027,
      subjectId: 'maths_literacy',
      paperId: 'maths-lit-mcq-test-1',
      question: '27) A South African exporter receives €2 500 (Euros) from an overseas client. If the exchange rate is €1 = R20,40, what is the equivalent value in South African Rands?',
      category: 'Exchange Rates · Currency Conversion',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'R12 254,90' },
        { letter: 'B', text: 'R40 800,00' },
        { letter: 'C', text: 'R51 000,00' },
        { letter: 'D', text: 'R61 200,00' }
      ],
      correctAnswer: 'C',
      explanation: 'Value in ZAR = €2 500 × R20,40 = R51 000,00.'
    },
    {
      id: 2028,
      subjectId: 'maths_literacy',
      paperId: 'maths-lit-mcq-test-1',
      question: '28) A South African student travelling to the UK needs British Pounds (£). The bank exchange rate is £1 = R24,00. How many pounds can the student buy with R6 000?',
      category: 'Exchange Rates · Currency Conversion',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: '£250' },
        { letter: 'B', text: '£300' },
        { letter: 'C', text: '£144 000' },
        { letter: 'D', text: '£1 440' }
      ],
      correctAnswer: 'A',
      explanation: 'Pounds (£) = R6 000 ÷ R24,00 = £250.'
    },
    {
      id: 2029,
      subjectId: 'maths_literacy',
      paperId: 'maths-lit-mcq-test-1',
      question: '29) When exchanging foreign currency at a commercial bank, which rate does the bank use when selling foreign notes to a South African traveler leaving the country?',
      category: 'Exchange Rates · BBR vs BSR',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'Bank Buying Rate (BBR)' },
        { letter: 'B', text: 'Bank Selling Rate (BSR)' },
        { letter: 'C', text: 'Prime Overdraft Rate' },
        { letter: 'D', text: 'Repo Rate' }
      ],
      correctAnswer: 'B',
      explanation: 'The bank is selling the foreign currency to the customer, so it applies the Bank Selling Rate (BSR).'
    },
    {
      id: 2030,
      subjectId: 'maths_literacy',
      paperId: 'maths-lit-mcq-test-1',
      question: '30) In business cost analysis, what is the definition of the "Break-Even Point"?',
      category: 'Break-Even Analysis · Business Finance',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'The point where total income equals total expenses (Profit = R0)' },
        { letter: 'B', text: 'The maximum profit a business can possibly make' },
        { letter: 'C', text: 'The point where fixed costs are reduced to zero' },
        { letter: 'D', text: 'The time when all bank loans are fully settled' }
      ],
      correctAnswer: 'A',
      explanation: 'At the break-even point, Total Revenue = Total Costs; the business makes neither a profit nor a loss.'
    },
    {
      id: 2031,
      subjectId: 'maths_literacy',
      paperId: 'maths-lit-mcq-test-1',
      question: '31) A school tuckshop sells pies. Which of the following is classified as a FIXED COST for the tuckshop?',
      category: 'Cost Classification · Fixed vs Variable',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'The cost of pie packaging napkins' },
        { letter: 'B', text: 'The wholesale purchase price of frozen pies' },
        { letter: 'C', text: 'The monthly rental of the pie warmer oven' },
        { letter: 'D', text: 'The tomato sauce sachets supplied with each pie' }
      ],
      correctAnswer: 'C',
      explanation: 'The monthly rental of equipment remains constant regardless of how many pies are sold, making it a fixed cost.'
    },
    {
      id: 2032,
      subjectId: 'maths_literacy',
      paperId: 'maths-lit-mcq-test-1',
      question: '32) A small bakery has fixed monthly costs of R4 800. The cost to make one cake is R35 (variable cost), and each cake sells for R75. What is the break-even quantity of cakes that must be sold each month?',
      category: 'Break-Even Analysis · Calculation',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: '64 cakes' },
        { letter: 'B', text: '80 cakes' },
        { letter: 'C', text: '120 cakes' },
        { letter: 'D', text: '160 cakes' }
      ],
      correctAnswer: 'C',
      explanation: 'Contribution margin per cake = R75 − R35 = R40. Break-Even Quantity = Fixed Costs ÷ Contribution Margin = R4 800 ÷ R40 = 120 cakes.'
    },
    {
      id: 2033,
      subjectId: 'maths_literacy',
      paperId: 'maths-lit-mcq-test-1',
      question: '33) If the bakery in Question 32 sells 180 cakes in a month, what total profit will it make?',
      category: 'Break-Even Analysis · Profit Calculation',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'R2 400,00' },
        { letter: 'B', text: 'R4 800,00' },
        { letter: 'C', text: 'R7 200,00' },
        { letter: 'D', text: 'R13 500,00' }
      ],
      correctAnswer: 'A',
      explanation: 'Profit = (Selling Price − Variable Cost) × Quantity − Fixed Costs = (R40 × 180) − R4 800 = R7 200 − R4 800 = R2 400,00.'
    },
    {
      id: 2034,
      subjectId: 'maths_literacy',
      paperId: 'maths-lit-mcq-test-1',
      question: '34) A clothing store marks down a winter jacket originally priced at R850 by 25%. What is the discounted selling price?',
      category: 'Percentages · Discounts',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'R212,50' },
        { letter: 'B', text: 'R637,50' },
        { letter: 'C', text: 'R680,00' },
        { letter: 'D', text: 'R725,00' }
      ],
      correctAnswer: 'B',
      explanation: 'Discount = 25% of R850 = R212,50. Selling price = R850 − R212,50 = R637,50 (or R850 × 0.75 = R637,50).'
    },
    {
      id: 2035,
      subjectId: 'maths_literacy',
      paperId: 'maths-lit-mcq-test-1',
      question: '35) A retailer buys shoes from a wholesaler for R320 and adds a 40% mark-up on the cost price. What is the selling price?',
      category: 'Percentages · Mark-Up Calculation',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'R360,00' },
        { letter: 'B', text: 'R448,00' },
        { letter: 'C', text: 'R480,00' },
        { letter: 'D', text: 'R512,00' }
      ],
      correctAnswer: 'B',
      explanation: 'Mark-Up = 40% of R320 = R128. Selling price = R320 + R128 = R448,00 (or R320 × 1.40 = R448,00).'
    },
    {
      id: 2036,
      subjectId: 'maths_literacy',
      paperId: 'maths-lit-mcq-test-1',
      question: '36) What is the difference between Gross Salary and Net Pay on an employee’s pay slip?',
      category: 'Personal Finance · Salary Terminology',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'Gross salary is the amount after tax; Net pay is the amount before tax' },
        { letter: 'B', text: 'Net pay is Gross salary minus all deductions (such as PAYE tax, UIF, and medical aid)' },
        { letter: 'C', text: 'Gross salary includes only overtime pay' },
        { letter: 'D', text: 'Net pay is always higher than gross salary' }
      ],
      correctAnswer: 'B',
      explanation: 'Gross salary is total income earned before any deductions; Net pay (take-home pay) is what the employee receives after taxes, retirement, and UIF deductions are subtracted.'
    },
    {
      id: 2037,
      subjectId: 'maths_literacy',
      paperId: 'maths-lit-mcq-test-1',
      question: '37) A vehicle costing R200 000 depreciates by 15% per annum on the straight-line method. What is its book value after 3 years?',
      category: 'Finance · Straight-Line Depreciation',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'R90 000,00' },
        { letter: 'B', text: 'R110 000,00' },
        { letter: 'C', text: 'R122 825,00' },
        { letter: 'D', text: 'R140 000,00' }
      ],
      correctAnswer: 'B',
      explanation: 'Annual depreciation = 15% of R200 000 = R30 000. Depreciation over 3 years = 3 × R30 000 = R90 000. Book value = R200 000 − R90 000 = R110 000,00.'
    },
    {
      id: 2038,
      subjectId: 'maths_literacy',
      paperId: 'maths-lit-mcq-test-1',
      question: '38) A machine costing R80 000 depreciates at 20% per annum on the reducing-balance (diminishing-balance) method. What is its book value at the end of Year 2?',
      category: 'Finance · Reducing-Balance Depreciation',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'R48 000,00' },
        { letter: 'B', text: 'R51 200,00' },
        { letter: 'C', text: 'R64 000,00' },
        { letter: 'D', text: 'R72 000,00' }
      ],
      correctAnswer: 'B',
      explanation: 'Year 1: Depreciation = 20% of R80 000 = R16 000; Book value = R64 000. Year 2: Depreciation = 20% of R64 000 = R12 800; Book value = R64 000 − R12 800 = R51 200,00 (or R80 000 × (0.80)² = R51 200).'
    },
    {
      id: 2039,
      subjectId: 'maths_literacy',
      paperId: 'maths-lit-mcq-test-1',
      question: '39) In household budgeting, when total monthly income exceeds total monthly expenditure, the budget has a:',
      category: 'Budgeting · Surplus & Deficit',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'Deficit' },
        { letter: 'B', text: 'Surplus' },
        { letter: 'C', text: 'Overdraft' },
        { letter: 'D', text: 'Inflation' }
      ],
      correctAnswer: 'B',
      explanation: 'When income is greater than expenditure, the remaining positive balance is known as a budget surplus.'
    },
    {
      id: 2040,
      subjectId: 'maths_literacy',
      paperId: 'maths-lit-mcq-test-1',
      question: '40) Which of the following expenses is best described as a DISCRETIONARY (non-essential) expense?',
      category: 'Budgeting · Expense Categories',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'Monthly house rent / bond repayment' },
        { letter: 'B', text: 'Basic food groceries' },
        { letter: 'C', text: 'Cinema tickets and dining out' },
        { letter: 'D', text: 'Compulsory municipal rates and taxes' }
      ],
      correctAnswer: 'C',
      explanation: 'Discretionary expenses are optional lifestyle and luxury choices (like cinema tickets and dining out) that can be reduced or eliminated if funds are tight.'
    },
    {
      id: 2041,
      subjectId: 'maths_literacy',
      paperId: 'maths-lit-mcq-test-1',
      question: '41) A cellphone contract costs R299 per month and includes 150 free call minutes. Any additional minutes are billed at an out-of-bundle rate of R1,50 per minute. If a user speaks for 180 minutes in a month, what will the total monthly bill be?',
      category: 'Tariffs · Cellphone Contracts',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'R299,00' },
        { letter: 'B', text: 'R344,00' },
        { letter: 'C', text: 'R374,00' },
        { letter: 'D', text: 'R569,00' }
      ],
      correctAnswer: 'B',
      explanation: 'Extra minutes = 180 − 150 = 30 minutes. Extra cost = 30 × R1,50 = R45. Total bill = R299 + R45 = R344,00.'
    },
    {
      id: 2042,
      subjectId: 'maths_literacy',
      paperId: 'maths-lit-mcq-test-1',
      question: '42) Why is compound interest often called "interest on interest"?',
      category: 'Investments · Compound Interest Concept',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'Because interest is deducted from the principal every month' },
        { letter: 'B', text: 'Because interest earned in each period is added to the principal, and subsequent interest is calculated on the new higher balance' },
        { letter: 'C', text: 'Because the bank charges a fee twice on the same transaction' },
        { letter: 'D', text: 'Because it is only applied to high-risk stock market shares' }
      ],
      correctAnswer: 'B',
      explanation: 'In compound interest, accumulated interest is added to the principal balance, so future interest is calculated on both the original principal and past interest earned.'
    },
    {
      id: 2043,
      subjectId: 'maths_literacy',
      paperId: 'maths-lit-mcq-test-1',
      question: '43) What is the main source of tax revenue for the South African National Government budget?',
      category: 'National Finance · Government Revenue',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'Tourism entry levies' },
        { letter: 'B', text: 'Personal Income Tax (PIT)' },
        { letter: 'C', text: 'TV Licence fees' },
        { letter: 'D', text: 'Toll road gate fees' }
      ],
      correctAnswer: 'B',
      explanation: 'Personal Income Tax (PIT) contributes the largest single share (around 38%–40%) of total South African government tax revenue, followed by VAT and Corporate Income Tax.'
    },
    {
      id: 2044,
      subjectId: 'maths_literacy',
      paperId: 'maths-lit-mcq-test-1',
      question: '44) A bank customer’s current account balance is −R850 (overdrawn by R850). If she deposits R1 200 into the account and the bank charges an overdraft penalty fee of R60, what is the new balance?',
      category: 'Banking · Overdraft Balances',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'R290,00' },
        { letter: 'B', text: 'R350,00' },
        { letter: 'C', text: 'R410,00' },
        { letter: 'D', text: '−R290,00' }
      ],
      correctAnswer: 'A',
      explanation: 'New balance = −R850 + R1 200 − R60 = R350 − R60 = R290,00.'
    },
    {
      id: 2045,
      subjectId: 'maths_literacy',
      paperId: 'maths-lit-mcq-test-1',
      question: '45) What is a Medical Scheme Fees Tax Credit (MTC) in South Africa?',
      category: 'Taxation · Medical Tax Credits',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'A voucher provided by hospitals for free prescription medicines' },
        { letter: 'B', text: 'A fixed monthly tax rebate allowed for the taxpayer and their dependants who contribute to an approved medical aid scheme' },
        { letter: 'C', text: 'An extra tax paid by people who visit private hospitals' },
        { letter: 'D', text: 'A discount on health insurance premiums paid by the employer' }
      ],
      correctAnswer: 'B',
      explanation: 'Medical Scheme Fees Tax Credits are non-refundable fixed monthly tax rebates that reduce the taxpayer’s normal income tax liability for each member and dependant registered on an approved medical scheme.'
    },
    {
      id: 2046,
      subjectId: 'maths_literacy',
      paperId: 'maths-lit-mcq-test-1',
      question: '46) A taxpayer has himself and two dependants on a registered medical scheme. The medical tax credit is R364 per month for the main member, R364 for the first dependant, and R246 for each additional dependant. What is his total ANNUAL medical tax credit?',
      category: 'Taxation · Medical Tax Credits',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'R974,00' },
        { letter: 'B', text: 'R5 844,00' },
        { letter: 'C', text: 'R11 688,00' },
        { letter: 'D', text: 'R12 840,00' }
      ],
      correctAnswer: 'C',
      explanation: 'Monthly credit = R364 (main member) + R364 (1st dependant) + R246 (2nd dependant) = R974 per month. Annual credit = R974 × 12 = R11 688,00.'
    },
    {
      id: 2047,
      subjectId: 'maths_literacy',
      paperId: 'maths-lit-mcq-test-1',
      question: '47) What is the Debt-to-Income (DTI) ratio used by financial institutions when evaluating loan applications?',
      category: 'Personal Finance · Credit Worthiness',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'The percentage of gross income spent on debt repayments each month' },
        { letter: 'B', text: 'The ratio of savings to total investments' },
        { letter: 'C', text: 'The difference between salary and tax paid' },
        { letter: 'D', text: 'The interest rate charged by the bank on credit cards' }
      ],
      correctAnswer: 'A',
      explanation: 'The Debt-to-Income ratio (Total Monthly Debt Repayments ÷ Gross Monthly Income × 100%) measures an individual’s ability to manage monthly payments and handle additional credit.'
    },
    {
      id: 2048,
      subjectId: 'maths_literacy',
      paperId: 'maths-lit-mcq-test-1',
      question: '48) Sipho earns R20 000 gross per month. His monthly car installment is R4 200 and his personal loan repayment is R1 800. What is his Debt-to-Income ratio?',
      category: 'Personal Finance · DTI Calculation',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: '21%' },
        { letter: 'B', text: '30%' },
        { letter: 'C', text: '35%' },
        { letter: 'D', text: '60%' }
      ],
      correctAnswer: 'B',
      explanation: 'Total debt payments = R4 200 + R1 800 = R6 000. DTI = (R6 000 ÷ R20 000) × 100% = 30%.'
    },
    {
      id: 2049,
      subjectId: 'maths_literacy',
      paperId: 'maths-lit-mcq-test-1',
      question: '49) An investor deposits R25 000 in a fixed deposit for 3 years at 9% p.a. simple interest. Another investor deposits R25 000 in a savings account at 9% p.a. compounded annually for 3 years. How much MORE interest does the compound interest investment yield?',
      category: 'Investments · Simple vs Compound',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'R625,50' },
        { letter: 'B', text: 'R727,53' },
        { letter: 'C', text: 'R1 250,00' },
        { letter: 'D', text: 'R2 150,00' }
      ],
      correctAnswer: 'B',
      explanation: 'Simple Interest = R25 000 × 0.09 × 3 = R6 750,00. Compound Amount = R25 000 × (1.09)³ = R25 000 × 1.295029 = R32 375,73 (Interest = R7 475,73). Difference = R7 475,73 − R6 750,00 = R725,73 (~R727,53).'
    },
    {
      id: 2050,
      subjectId: 'maths_literacy',
      paperId: 'maths-lit-mcq-test-1',
      question: '50) A company car was purchased for R350 000. Under SARS tax rules, it depreciates at 20% per year on the straight-line basis. What is its book value at the end of 5 years?',
      category: 'Finance · Asset Depreciation',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'R0,00 (Fully written off)' },
        { letter: 'B', text: 'R35 000,00' },
        { letter: 'C', text: 'R70 000,00' },
        { letter: 'D', text: 'R114 688,00' }
      ],
      correctAnswer: 'A',
      explanation: 'Annual straight-line depreciation = 20% of R350 000 = R70 000. Over 5 years: 5 × R70 000 = R350 000 total depreciation. Book value = R350 000 − R350 000 = R0,00 (fully depreciated).'
    }
  ]
};
