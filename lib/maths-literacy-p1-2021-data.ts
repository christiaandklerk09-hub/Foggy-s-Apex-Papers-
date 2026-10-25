import { QuizPaper } from '@/types/quiz';

export const MATHS_LITERACY_P1_2021_PAPER: QuizPaper = {
  id: 'maths-literacy-p1-nov-2021',
  subjectId: 'maths_literacy',
  title: 'NATIONAL SENIOR CERTIFICATE',
  subtitle: 'Mathematical Literacy P1 (November 2021)',
  code: 'MATHLIT-P1-2021',
  chapterNumber: 4,
  paperNumber: 1,
  totalMarks: 150,
  passMark: 75,
  timeLimitMinutes: 180,
  description: 'Official DBE Grade 12 National Senior Certificate Mathematical Literacy Paper 1 (November 2021) examination covering Finance, Data Handling, Probability, Tariffs, SARS Income Tax, Vehicle Financing, Currency Exchange Rates, and Provincial Demographics with complete Addendum Annexures A, B, and C.',
  questions: [
    // =========================================================================
    // QUESTION 1 [30 MARKS]
    // =========================================================================
    // 1.1 Fuel Price in Six African Countries (Table 1)
    {
      id: 701,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-p1-nov-2021',
      question: '1.1.1 TABLE 1 shows the fuel price (in US dollars) in six African countries on 05/06/2019 and 01/03/2021.\n\nCalculate the fuel price increase for Zimbabwe from 05/06/2019 to 01/03/2021.',
      category: 'Question 1.1 · Table 1 Fuel Prices & Exchange Rates',
      annexureRef: 'table_1_fuel_prices',
      type: 'text',
      marks: 2,
      steps: [
        {
          stepNumber: 1,
          title: 'Subtract 2019 price from 2021 price',
          instruction: 'Find the difference: $1,258 - $0,80',
          formula: 'Increase = Price(2021) - Price(2019)',
          marks: 2,
          rubricCode: '1MA 1CA',
          rubricDescription: '1MA subtracting different prices, 1CA simplification',
          expectedAnswer: '0.458',
          acceptableAnswers: ['0,458', '0.458', '$0,458', '$0.458', '0,46', '0.46', '$0.46'],
          unit: 'US$'
        }
      ],
      correctAnswer: '$0,458',
      explanation: 'Official DBE Marking Guidelines (2 Marks):\n$1,258 - $0,80 = $0,458\n(1MA subtracting different prices, 1CA simplification)'
    },
    {
      id: 702,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-p1-nov-2021',
      question: '1.1.2 Write down the current exchange rate of the Botswana pula to the US dollar in the following format:\n1 Botswana pula = … US dollars',
      category: 'Question 1.1 · Table 1 Exchange Rate Conversion',
      annexureRef: 'table_1_fuel_prices',
      type: 'text',
      marks: 2,
      steps: [
        {
          stepNumber: 1,
          title: 'Calculate 1 Pula in US dollars',
          instruction: 'Divide 1 by 11,14',
          formula: '1 / 11,14',
          marks: 2,
          rubricCode: '1MA 1A',
          rubricDescription: '1MA dividing by exchange rate, 1A simplification',
          expectedAnswer: '0.0898',
          acceptableAnswers: ['0,089767', '0.089767', '0,09', '0.09', '0,0898', '0.0898', '0,08977', '0.08977'],
          unit: 'US dollars'
        }
      ],
      correctAnswer: '0,089767 US dollar (approx $0,09)',
      explanation: 'Official DBE Marking Guidelines (2 Marks):\n11,14 Botswana pula = $1\n1 Botswana pula = 1 / 11,14 = 0,089767 US dollar (or $0,09)\n(1MA dividing by exchange rate, 1A simplification)'
    },
    {
      id: 703,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-p1-nov-2021',
      question: '1.1.3 Identify the countries which showed a decrease in the fuel price from 05/06/2019 to 01/03/2021.',
      category: 'Question 1.1 · Table 1 Fuel Price Trend',
      annexureRef: 'table_1_fuel_prices',
      type: 'text',
      marks: 2,
      correctAnswer: 'Angola, Namibia, Botswana (Any two)',
      explanation: 'Official DBE Marking Guidelines (2 Marks):\nAngola (0,47 to 0,254), Namibia (0,88 to 0,796), or Botswana (0,84 to 0,732).\n(1RT first correct country, 1RT second correct country - Any two)'
    },
    {
      id: 704,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-p1-nov-2021',
      question: '1.1.4 Arrange, in descending order, the fuel price in US$ for 01/03/21.',
      category: 'Question 1.1 · Table 1 Value Ordering',
      annexureRef: 'table_1_fuel_prices',
      type: 'text',
      marks: 2,
      correctAnswer: '1,258; 1,061; 0,87; 0,796; 0,732; 0,254',
      explanation: 'Official DBE Marking Guidelines (2 Marks):\n1,258; 1,061; 0,87; 0,796; 0,732; 0,254 (or Zimbabwe, South Africa, Swaziland, Namibia, Botswana, Angola)\n(1RT all correct values, 1A correct order)'
    },
    {
      id: 705,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-p1-nov-2021',
      question: '1.1.5 The probability of randomly selecting a country that is not South Africa is 5/6.\n\nWrite this probability in decimal form rounded to THREE decimal places.',
      category: 'Question 1.1 · Probability Conversion',
      annexureRef: 'table_1_fuel_prices',
      type: 'text',
      marks: 2,
      steps: [
        {
          stepNumber: 1,
          title: 'Convert 5/6 to decimal',
          instruction: 'Calculate 5 ÷ 6 and round to 3 decimal places',
          formula: '5 / 6',
          marks: 2,
          rubricCode: '2A',
          rubricDescription: '2A correct value',
          expectedAnswer: '0.833',
          acceptableAnswers: ['0,833', '0.833'],
          unit: ''
        }
      ],
      correctAnswer: '0,833',
      explanation: 'Official DBE Marking Guidelines (2 Marks):\n5 ÷ 6 = 0,8333... ≈ 0,833\n(2A correct value)'
    },

    // 1.2 Energy Sources Used for Cooking (Graph 1.2)
    {
      id: 706,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-p1-nov-2021',
      question: '1.2.1 Use GRAPH 1.2 showing provincial energy sources for cooking.\n\nIdentify the source of energy that is mostly used for cooking across South Africa.',
      category: 'Question 1.2 · Graph 1.2 Energy Sources',
      annexureRef: 'graph_1_2_energy_sources',
      type: 'text',
      marks: 2,
      correctAnswer: 'Electricity',
      explanation: 'Official DBE Marking Guidelines (2 Marks):\nElectricity / Elektrisiteit\n(2A correct source)'
    },
    {
      id: 707,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-p1-nov-2021',
      question: '1.2.2 Name the province that uses the most wood for cooking.',
      category: 'Question 1.2 · Graph 1.2 Provincial Comparison',
      annexureRef: 'graph_1_2_energy_sources',
      type: 'text',
      marks: 2,
      correctAnswer: 'Limpopo',
      explanation: 'Official DBE Marking Guidelines (2 Marks):\nLimpopo / LP\n(2A province)'
    },
    {
      id: 708,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-p1-nov-2021',
      question: '1.2.3 (a) The price of paraffin fluctuates. On 3 February 2021 the price was 764,59 c/ℓ.\n\nWrite down (in rand) the cost of ONE litre of paraffin.',
      category: 'Question 1.2 · Currency Unit Conversion',
      annexureRef: 'graph_1_2_energy_sources',
      type: 'text',
      marks: 2,
      steps: [
        {
          stepNumber: 1,
          title: 'Convert cents to rand',
          instruction: 'Divide 764,59 cents by 100',
          formula: '764,59 / 100',
          marks: 2,
          rubricCode: '1MA 1A',
          rubricDescription: '1MA dividing by 100, 1A simplification',
          expectedAnswer: '7.65',
          acceptableAnswers: ['7,6459', '7.6459', '7,65', '7.65', 'R7,65', 'R7.65', 'R7,6459', 'R7.6459'],
          unit: 'R/ℓ'
        }
      ],
      correctAnswer: 'R7,65 (or R7,6459)',
      explanation: 'Official DBE Marking Guidelines (2 Marks):\n764,59 ÷ 100 = R7,6459/ℓ ≈ R7,65/ℓ\n(1MA dividing by 100, 1A simplification)'
    },
    {
      id: 709,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-p1-nov-2021',
      question: '1.2.3 (b) Determine, to the nearest rand, the cost of 12,5 ℓ of paraffin using your answer from QUESTION 1.2.3(a).',
      category: 'Question 1.2 · Cost Calculation & Rounding',
      annexureRef: 'graph_1_2_energy_sources',
      type: 'text',
      marks: 2,
      steps: [
        {
          stepNumber: 1,
          title: 'Multiply price by volume and round to nearest rand',
          instruction: 'R7,65 × 12,5 ℓ = R95,625 ≈ R96,00',
          formula: 'Price × 12,5',
          marks: 2,
          rubricCode: '1MCA 1R',
          rubricDescription: '1MCA multiply by 12,5ℓ, 1R correct rounding',
          expectedAnswer: '96',
          acceptableAnswers: ['96', '96,00', '96.00', 'R96', 'R96,00', 'R96.00'],
          unit: 'R'
        }
      ],
      correctAnswer: 'R96,00',
      explanation: 'Official DBE Marking Guidelines (2 Marks):\nR7,65/ℓ × 12,5 ℓ = R95,625 ≈ R96,00\n(1MCA multiply by 12,5ℓ, 1R correct rounding to nearest rand)'
    },
    {
      id: 710,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-p1-nov-2021',
      question: '1.2.4 Name another form of energy that could be used for cooking which could fall under the "Other" category.',
      category: 'Question 1.2 · Energy Alternatives',
      annexureRef: 'graph_1_2_energy_sources',
      type: 'text',
      marks: 2,
      correctAnswer: 'Solar power / Coal / Charcoal / Wind / Generator / Biogas / Dung',
      explanation: 'Official DBE Marking Guidelines (2 Marks):\nSolar power, Coal, Charcoal, Wind turbines, Hydropower, Generator, Gel, Paper, Straw, Leaves, Animal manure (dung), Spirits, Corn stalk (Any one).\n(2A correct source)'
    },

    // 1.3 Data Collection Questionnaire
    {
      id: 711,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-p1-nov-2021',
      question: '1.3.1 Study the five questions (A to E) taken from a company\'s information sheet.\n\nIdentify the data collection instrument that was used to collect the information.',
      category: 'Question 1.3 · Data Collection Instrument',
      annexureRef: 'sheet_1_3_reading_survey',
      type: 'text',
      marks: 2,
      correctAnswer: 'Survey / Questionnaire / Interview / Google forms',
      explanation: 'Official DBE Marking Guidelines (2 Marks):\nSurvey / Questionnaire / Interview / Google forms / Vraelys\n(2A correct instrument)'
    },
    {
      id: 712,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-p1-nov-2021',
      question: '1.3.2 Name the next step in the data cycle after the instrument has been completed and collected.',
      category: 'Question 1.3 · Data Cycle Stages',
      annexureRef: 'sheet_1_3_reading_survey',
      type: 'text',
      marks: 2,
      correctAnswer: 'Organising / Sorting / Classifying / Processing data',
      explanation: 'Official DBE Marking Guidelines (2 Marks):\nClassifying, preparation, organising, sorting data / Sortering van data (Any one word).\n(2A correct step)'
    },
    {
      id: 713,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-p1-nov-2021',
      question: '1.3.3 State whether the choices given for question D ("Were the books you bought hard copies or soft copies?") represent categorical or numerical data.',
      category: 'Question 1.3 · Data Classification',
      annexureRef: 'sheet_1_3_reading_survey',
      type: 'text',
      marks: 2,
      correctAnswer: 'Categorical data',
      explanation: 'Official DBE Marking Guidelines (2 Marks):\nCategorical data / Kategoriese data\n(2A correct answer)'
    },
    {
      id: 714,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-p1-nov-2021',
      question: '1.3.4 Write the acronym VAT in full.',
      category: 'Question 1.3 · Financial Terminology',
      annexureRef: 'sheet_1_3_reading_survey',
      type: 'text',
      marks: 2,
      correctAnswer: 'Value Added Tax',
      explanation: 'Official DBE Marking Guidelines (2 Marks):\nValue Added Tax / Belasting op Toegevoegde Waarde\n(2A correct answer)'
    },
    {
      id: 715,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-p1-nov-2021',
      question: '1.3.5 Give an example of a business that will find the reading survey data useful.',
      category: 'Question 1.3 · Practical Application',
      annexureRef: 'sheet_1_3_reading_survey',
      type: 'text',
      marks: 2,
      correctAnswer: 'Book store / Publishers / Library / Book club',
      explanation: 'Official DBE Marking Guidelines (2 Marks):\nAny company who sells books / Publishers / Library / Book Club / Name of a bookstore (e.g. Exclusive Books, CNA).\n(2A correct answer)'
    },

    // =========================================================================
    // QUESTION 2 [32 MARKS]
    // =========================================================================
    // 2.1 Vehicle Financing (Ford Figo vs VW Polo)
    {
      id: 716,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-p1-nov-2021',
      question: '2.1.1 Study TABLE 2 showing payment options for the Ford Figo and VW Polo.\n\nState what type of payment option is shown in TABLE 2.',
      category: 'Question 2.1 · Vehicle Finance Options',
      annexureRef: 'table_2_car_financing',
      type: 'text',
      marks: 2,
      correctAnswer: 'Hire purchase agreement / Instalment payment / Credit option / Balloon / Residual payment',
      explanation: 'Official DBE Marking Guidelines (2 Marks):\nHire purchase agreement / HP / Instalment payment / Loan agreement monthly instalment / Credit option / Balloon payment option / Residual payment option.\n(2A correct definition)'
    },
    {
      id: 717,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-p1-nov-2021',
      question: '2.1.2 Calculate the deposit amount for the Ford Figo (Retail price R215 100, deposit 5%).',
      category: 'Question 2.1 · Deposit Calculation',
      annexureRef: 'table_2_car_financing',
      type: 'text',
      marks: 2,
      steps: [
        {
          stepNumber: 1,
          title: 'Calculate 5% deposit',
          instruction: 'R215 100 × 5%',
          formula: '215 100 × 0,05',
          marks: 2,
          rubricCode: '1MA 1A',
          rubricDescription: '1MA multiplying correct values, 1A simplification',
          expectedAnswer: '10755',
          acceptableAnswers: ['10755', '10 755', 'R10 755', 'R10755', 'R10755,00', '10755.00'],
          unit: 'R'
        }
      ],
      correctAnswer: 'R10 755',
      explanation: 'Official DBE Marking Guidelines (2 Marks):\nDeposit = R215 100 × 5% = R10 755\n(1MA multiplying correct values, 1A simplification)'
    },
    {
      id: 718,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-p1-nov-2021',
      question: '2.1.3 Write down (in simplified form) the ratio of the term agreement of the Ford Figo (72 months) to the VW Polo (48 months).',
      category: 'Question 2.1 · Ratio Simplification',
      annexureRef: 'table_2_car_financing',
      type: 'text',
      marks: 2,
      steps: [
        {
          stepNumber: 1,
          title: 'Simplify 72 : 48',
          instruction: 'Divide both terms by 24',
          formula: '72 : 48 = 3 : 2',
          marks: 2,
          rubricCode: '1RT 1A',
          rubricDescription: '1RT correct values, 1A simplification of 2 correct values',
          expectedAnswer: '3:2',
          acceptableAnswers: ['3:2', '3 : 2', '1.5:1', '1,5:1', '3/2'],
          unit: ''
        }
      ],
      correctAnswer: '3 : 2',
      explanation: 'Official DBE Marking Guidelines (2 Marks):\n72 months : 48 months = 3 : 2 (or 1,5 : 1)\n(1RT correct values, 1A simplification)'
    },
    {
      id: 719,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-p1-nov-2021',
      question: '2.1.4 Which ONE of the two vehicles will be more cost effective in terms of monthly budget?',
      category: 'Question 2.1 · Financial Decision Making',
      annexureRef: 'table_2_car_financing',
      type: 'text',
      marks: 2,
      correctAnswer: 'Ford Figo',
      explanation: 'Official DBE Marking Guidelines (2 Marks):\nFord Figo (Monthly instalment R2 999 + R69 = R3 068 vs VW Polo R3 345 + R69,58 = R3 414,58)\n(2A correct vehicle)'
    },
    {
      id: 720,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-p1-nov-2021',
      question: '2.1.5 Calculate the total cost of the VW Polo if the monthly instalment remained the same throughout the contract period, except for the final payment.\n\nYou may use the following formula:\nTotal cost = Total value of monthly instalments + admin fees + residual value\n\n(Note: 47 instalments + final residual payment of R116 759, admin fee is 2,08% of monthly instalment).',
      category: 'Question 2.1 · Total Cost of Vehicle Hire Purchase',
      annexureRef: 'table_2_car_financing',
      type: 'text',
      marks: 6,
      steps: [
        {
          stepNumber: 1,
          title: 'Calculate monthly admin fee',
          instruction: 'R3 345 × 2,08% = R69,576 ≈ R69,58',
          formula: '3 345 × 0,0208',
          marks: 1,
          rubricCode: '1MA',
          rubricDescription: '1MA calculating 2,08%',
          expectedAnswer: '69.58',
          acceptableAnswers: ['69,58', '69.58', 'R69,58', 'R69.58'],
          unit: 'R'
        },
        {
          stepNumber: 2,
          title: 'Calculate total cost over 47 months plus residual value',
          instruction: '(R3 345,00 × 47) + (R69,58 × 47) + R116 759',
          formula: '157 215 + 3 270,26 + 116 759',
          marks: 5,
          rubricCode: '1MA 1MA 1RT 1M 1CA',
          rubricDescription: '1MA multiplying instalments, 1MA multiplying fees, 1RT correct residual, 1M adding, 1CA simplification',
          expectedAnswer: '277244.26',
          acceptableAnswers: ['277244,26', '277244.26', '277 244,26', '277 244.26', 'R277 244,26', 'R277244,26', 'R277 244.26'],
          unit: 'R'
        }
      ],
      correctAnswer: 'R277 244,26',
      explanation: 'Official DBE Marking Guidelines (6 Marks):\nMonthly admin fee = R3 345 × 2,08% = R69,58\nTotal cost = (R3 345,00 × 47) + (R69,58 × 47) + R116 759\n= R157 215 + R3 270,26 + R116 759 = R277 244,26\n(1MA fee, 1MA inst, 1MA admin, 1RT residual, 1M adding, 1CA simplification)'
    },
    {
      id: 721,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-p1-nov-2021',
      question: '2.1.6 Mrs Smith invested R60 000 at a bank for two years with compound interest. In the first year she received an interest rate of 4,3% per annum while in the second year the interest rate was 5,1% per annum.\n\nMrs Smith stated that she would have enough money at the end of the second year to pay the residual value of the Ford Figo (30% of R215 100).\n\nVerify, showing ALL calculations, whether her statement is CORRECT.',
      category: 'Question 2.1 · Compound Interest & Financial Verification',
      annexureRef: 'table_2_car_financing',
      type: 'text',
      marks: 8,
      steps: [
        {
          stepNumber: 1,
          title: 'Calculate balance at end of Year 1',
          instruction: 'R60 000 + (R60 000 × 4,3%) = R60 000 + R2 580 = R62 580',
          formula: '60 000 × 1,043',
          marks: 3,
          rubricCode: '1MA 1A 1CA',
          rubricDescription: '1MA calculating percentage, 1A simplification, 1CA adding interest',
          expectedAnswer: '62580',
          acceptableAnswers: ['62580', '62 580', 'R62 580', 'R62580', '62580.00'],
          unit: 'R'
        },
        {
          stepNumber: 2,
          title: 'Calculate balance at end of Year 2',
          instruction: 'R62 580 + (R62 580 × 5,1%) = R62 580 + R3 191,58 = R65 771,58',
          formula: '62 580 × 1,051',
          marks: 2,
          rubricCode: '1MCA 1CA',
          rubricDescription: '1MCA calculating percentage, 1CA simplification',
          expectedAnswer: '65771.58',
          acceptableAnswers: ['65771,58', '65771.58', '65 771,58', 'R65 771,58', 'R65771,58'],
          unit: 'R'
        },
        {
          stepNumber: 3,
          title: 'Calculate residual value and conclude',
          instruction: 'Residual value = R215 100 × 30% = R64 530. Compare: R65 771,58 > R64 530. Conclude statement is CORRECT.',
          formula: '215 100 × 0,30',
          marks: 3,
          rubricCode: '1M 1CA 1O',
          rubricDescription: '1M calculating 30%, 1CA simplification, 1O conclusion',
          expectedAnswer: 'CORRECT',
          acceptableAnswers: ['CORRECT', 'Correct', 'True', 'Valid', 'She is correct', 'Statement is correct'],
          unit: ''
        }
      ],
      correctAnswer: 'R65 771,58 > R64 530 — Statement is CORRECT',
      explanation: 'Official DBE Marking Guidelines (8 Marks):\nYear 1: R60 000 × 1,043 = R62 580,00\nYear 2: R62 580 × 1,051 = R65 771,58\nResidual value of Ford Figo = R215 100 × 30% = R64 530,00\nSince R65 771,58 > R64 530,00, Mrs Smith is CORRECT.\n(1MA yr 1 %, 1A simp, 1CA add, 1MCA yr 2 %, 1CA simp, 1M 30%, 1CA residual, 1O conclusion)'
    },

    // 2.2 Cellphone Contract Invoice (Annexure A)
    {
      id: 722,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-p1-nov-2021',
      question: '2.2.1 ANNEXURE A shows an invoice of the cellphone contracts taken out by Mr Fortune.\n\nState the number of cellphone contracts shown on this invoice.',
      category: 'Question 2.2 · Annexure A Invoice Reading',
      annexureRef: 'annexure_a_cellphone_invoice',
      type: 'text',
      marks: 2,
      correctAnswer: '3 contracts',
      explanation: 'Official DBE Marking Guidelines (2 Marks):\n3 / Three / Drie (ABC Made For You S, ABC made for You XS, Your ABC Choice 5GB)\n(2A correct number)'
    },
    {
      id: 723,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-p1-nov-2021',
      question: '2.2.2 Name the cellphone contract which shows the most expensive device.',
      category: 'Question 2.2 · Annexure A Cost Comparison',
      annexureRef: 'annexure_a_cellphone_invoice',
      type: 'text',
      marks: 2,
      correctAnswer: 'ABC Made For You S',
      explanation: 'Official DBE Marking Guidelines (2 Marks):\nABC made For You S (Device cost R260,87 vs R173,91 and R165,22)\n(2A correct device)'
    },
    {
      id: 724,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-p1-nov-2021',
      question: '2.2.3 Show how the VAT amount of R142,95 was calculated.',
      category: 'Question 2.2 · Annexure A VAT Calculation',
      annexureRef: 'annexure_a_cellphone_invoice',
      type: 'text',
      marks: 2,
      steps: [
        {
          stepNumber: 1,
          title: 'Calculate 15% VAT on subtotal',
          instruction: '(R355,65 + R260,00 + R337,35) × 15% = R953,00 × 0,15',
          formula: '953,00 × 0,15',
          marks: 2,
          rubricCode: '1M 1A',
          rubricDescription: '1M adding correct values, 1A multiplying by 15%',
          expectedAnswer: '142.95',
          acceptableAnswers: ['142,95', '142.95', 'R142,95', 'R142.95'],
          unit: 'R'
        }
      ],
      correctAnswer: '(R355,65 + R260 + R337,35) × 15% = R953,00 × 15% = R142,95',
      explanation: 'Official DBE Marking Guidelines (2 Marks):\nSubtotal excl. VAT = R355,65 + R260,00 + R337,35 = R953,00\nVAT = R953,00 × 15% = R142,95\n(1M adding correct values, 1A multiplying by 15%)'
    },
    {
      id: 725,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-p1-nov-2021',
      question: '2.2.4 Calculate the missing value A (Total amount due for current period, VAT incl.).',
      category: 'Question 2.2 · Annexure A Total Due Calculation',
      annexureRef: 'annexure_a_cellphone_invoice',
      type: 'text',
      marks: 2,
      steps: [
        {
          stepNumber: 1,
          title: 'Calculate total inclusive of VAT',
          instruction: 'R953,00 + R142,95',
          formula: '953,00 + 142,95',
          marks: 2,
          rubricCode: '1MA 1CA',
          rubricDescription: '1MA adding correct values, 1CA simplification',
          expectedAnswer: '1095.95',
          acceptableAnswers: ['1095,95', '1095.95', '1 095,95', '1 095.95', 'R1 095,95', 'R1095,95', 'R1 095.95'],
          unit: 'R'
        }
      ],
      correctAnswer: 'R1 095,95',
      explanation: 'Official DBE Marking Guidelines (2 Marks):\nA = R953,00 + R142,95 = R1 095,95 (or R953 × 1,15 = R1 095,95)\n(1MA adding correct values, 1CA simplification)'
    },
    {
      id: 726,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-p1-nov-2021',
      question: '2.2.5 State, in words, the probability of randomly selecting a cellphone contract that is not from ABC.',
      category: 'Question 2.2 · Probability in Words',
      annexureRef: 'annexure_a_cellphone_invoice',
      type: 'text',
      marks: 2,
      correctAnswer: 'Impossible / Zero / No chance',
      explanation: 'Official DBE Marking Guidelines (2 Marks):\nImpossible / Not possible / No chance / Zero percent / Zero out of three / Nul kans\n(2A correct term)'
    },

    // =========================================================================
    // QUESTION 3 [26 MARKS]
    // =========================================================================
    // 3.1 Dam Levels in Different Provinces (Table 3)
    {
      id: 727,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-p1-nov-2021',
      question: '3.1.1 TABLE 3 shows dam levels in different provinces on 5 April 2021.\n\nDetermine the date on which the reading of the dam level was taken last week.',
      category: 'Question 3.1 · Table 3 Calendar Date Calculation',
      annexureRef: 'table_3_dam_levels',
      type: 'text',
      marks: 2,
      correctAnswer: '29 March 2021',
      explanation: 'Official DBE Marking Guidelines (2 Marks):\n5 April 2021 minus 7 days = 29 March 2021 (or 29/03/2021)\n(1A correct day, 1A correct month and year)'
    },
    {
      id: 728,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-p1-nov-2021',
      question: '3.1.2 Write down, in words, the actual value of the net FSC for Gauteng (128 million m³).',
      category: 'Question 3.1 · Large Numbers in Words',
      annexureRef: 'table_3_dam_levels',
      type: 'text',
      marks: 2,
      correctAnswer: 'One hundred and twenty-eight million cubic metres',
      explanation: 'Official DBE Marking Guidelines (2 Marks):\nOne hundred and twenty-eight million cubic metres / Een honderd agt en twintig miljoen kubieke meter\n(2A number in words)'
    },
    {
      id: 729,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-p1-nov-2021',
      question: '3.1.3 Identify the province with the third lowest dam level percentage for last year.',
      category: 'Question 3.1 · Table 3 Data Ranking',
      annexureRef: 'table_3_dam_levels',
      type: 'text',
      marks: 2,
      correctAnswer: 'KwaZulu-Natal',
      explanation: 'Official DBE Marking Guidelines (2 Marks):\nPercentages last year: Western Cape (40%), Eastern Cape (56%), KwaZulu-Natal (61%). Third lowest is KwaZulu-Natal (KZN).\n(2A correct province)'
    },
    {
      id: 730,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-p1-nov-2021',
      question: '3.1.4 Determine which province had the highest percentage increase in dam levels from last year to this week.',
      category: 'Question 3.1 · Table 3 Increase Comparison',
      annexureRef: 'table_3_dam_levels',
      type: 'text',
      marks: 2,
      correctAnswer: 'Free State',
      explanation: 'Official DBE Marking Guidelines (2 Marks):\nFree State / Vrystaat / FS (Increased from 77% to 100% = 23% increase)\n(2A Free State)'
    },
    {
      id: 731,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-p1-nov-2021',
      question: '3.1.5 Calculate the missing value D if the mean percentage storage capacity for last week across the nine provinces was 83%.',
      category: 'Question 3.1 · Algebraic Mean Calculation',
      annexureRef: 'table_3_dam_levels',
      type: 'text',
      marks: 5,
      steps: [
        {
          stepNumber: 1,
          title: 'Set up mean equation',
          instruction: '(D + 100 + 101 + 73 + 88 + 89 + 82 + 105 + D) ÷ 9 = 83',
          formula: '(2D + 637) / 9 = 83',
          marks: 2,
          rubricCode: '1SF 1MA',
          rubricDescription: '1SF substitution mean correctly, 1MA dividing by 9',
          expectedAnswer: '747',
          acceptableAnswers: ['747', '2D + 637 = 747'],
          unit: '%'
        },
        {
          stepNumber: 2,
          title: 'Solve for D',
          instruction: '2D = 747 - 637 = 110 => D = 55',
          formula: '110 / 2',
          marks: 3,
          rubricCode: '1CA 1MA 1CA',
          rubricDescription: '1CA simplification, 1MA dividing by 2, 1CA simplification',
          expectedAnswer: '55',
          acceptableAnswers: ['55', '55%', 'D = 55', 'D = 55%'],
          unit: '%'
        }
      ],
      correctAnswer: 'D = 55%',
      explanation: 'Official DBE Marking Guidelines (5 Marks):\nMean = (2D + 637) / 9 = 83%\n2D + 637 = 747\n2D = 110\nD = 55%\n(1SF substitution, 1MA multiply 9, 1CA simp, 1MA divide 2, 1CA final)'
    },
    {
      id: 732,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-p1-nov-2021',
      question: '3.1.6 Determine, as a fraction, the probability of randomly selecting a province with dam levels exceeding 100%, for both this week and last week.',
      category: 'Question 3.1 · Fraction Probability',
      annexureRef: 'table_3_dam_levels',
      type: 'text',
      marks: 2,
      steps: [
        {
          stepNumber: 1,
          title: 'Count provinces exceeding 100% in both weeks',
          instruction: 'Northern Cape (102% & 105%) is the only province > 100% in both weeks.',
          formula: '1 / 9',
          marks: 2,
          rubricCode: '1A 1A',
          rubricDescription: '1A numerator, 1A denominator',
          expectedAnswer: '1/9',
          acceptableAnswers: ['1/9', '1 / 9'],
          unit: ''
        }
      ],
      correctAnswer: '1/9',
      explanation: 'Official DBE Marking Guidelines (2 Marks):\nOnly Northern Cape exceeds 100% both weeks (102% and 105%). Gauteng was 100% this week.\nProbability = 1/9\n(1A numerator, 1A denominator)'
    },
    {
      id: 733,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-p1-nov-2021',
      question: '3.1.7 Calculate (in m³) the actual net FSC of Free State for last week (Net capacity 15 657 million m³, last week reading 99%).',
      category: 'Question 3.1 · Large Volume Calculation',
      annexureRef: 'table_3_dam_levels',
      type: 'text',
      marks: 3,
      steps: [
        {
          stepNumber: 1,
          title: 'Multiply full capacity by 99%',
          instruction: '15 657 000 000 × 0,99',
          formula: '15 657 000 000 × 0,99',
          marks: 3,
          rubricCode: '1A 1MA 1CA',
          rubricDescription: '1A correct value in millions, 1MA multiplying by %, 1CA simplification',
          expectedAnswer: '15500430000',
          acceptableAnswers: ['15500430000', '15 500 430 000', '15500,43 million', '15 500,43 million m³', '15500430000 m³'],
          unit: 'm³'
        }
      ],
      correctAnswer: '15 500 430 000 m³ (or 15 500,43 million m³)',
      explanation: 'Official DBE Marking Guidelines (3 Marks):\n15 657 000 000 × 99% = 15 500 430 000 m³\n(1A value in millions, 1MA multiply %, 1CA simplification)'
    },

    // 3.2 Water & Energy Use per Shower (Annexure B)
    {
      id: 734,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-p1-nov-2021',
      question: '3.2.1 ANNEXURE B shows water and energy use per shower.\n\nA four-minute shower uses 1,7 kWh of energy. A ten-minute shower uses 4,3 kWh of energy.\n\nCalculate the percentage increase in kWh of energy used when taking a 10-minute shower compared to a 4-minute shower.\n\nFormula: Percentage increase = ((kWh used for 10 min - kWh used for 4 min) / kWh used for 4 min) × 100%',
      category: 'Question 3.2 · Annexure B Percentage Increase',
      annexureRef: 'annexure_b_showerheads',
      type: 'text',
      marks: 3,
      steps: [
        {
          stepNumber: 1,
          title: 'Calculate percentage increase',
          instruction: '((4,3 - 1,7) / 1,7) × 100% = (2,6 / 1,7) × 100%',
          formula: '(2,6 / 1,7) × 100',
          marks: 3,
          rubricCode: '1SF 1A 1CA',
          rubricDescription: '1SF correct substitution, 1A correct denominator, 1CA simplification',
          expectedAnswer: '152.94',
          acceptableAnswers: ['152,94', '152.94', '152,94%', '152.94%', '153%', '153'],
          unit: '%'
        }
      ],
      correctAnswer: '152,94%',
      explanation: 'Official DBE Marking Guidelines (3 Marks):\nPercentage increase = ((4,3 - 1,7) / 1,7) × 100% = (2,6 / 1,7) × 100% = 152,94%\n(1SF correct substitution, 1A correct denominator, 1CA simplification)'
    },
    {
      id: 735,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-p1-nov-2021',
      question: '3.2.2 Give ONE possible reason why you would advise someone to use a low-flow shower head rather than a normal shower head.',
      category: 'Question 3.2 · Conservation & Cost Reduction',
      annexureRef: 'annexure_b_showerheads',
      type: 'text',
      marks: 2,
      correctAnswer: 'Save water / Save electricity / Save money on municipal bills',
      explanation: 'Official DBE Marking Guidelines (2 Marks):\nSave energy (kWh) / Save water (kℓ) / Save money / Spaar geld / Reduce monthly bills.\n(2A reason)'
    },
    {
      id: 736,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-p1-nov-2021',
      question: '3.2.3 Calculate the range of the number of litres of water used during a 2-minute shower and an 8-minute shower using a normal shower head.',
      category: 'Question 3.2 · Annexure B Statistical Range',
      annexureRef: 'annexure_b_showerheads',
      type: 'text',
      marks: 3,
      steps: [
        {
          stepNumber: 1,
          title: 'Find range between 8 min and 2 min normal shower',
          instruction: '120 ℓ - 30 ℓ',
          formula: '120 - 30',
          marks: 3,
          rubricCode: '1RT 1RT 1CA',
          rubricDescription: '1RT minimum, 1RT maximum, 1CA simplification',
          expectedAnswer: '90',
          acceptableAnswers: ['90', '90 ℓ', '90 litres', '90l', '90L'],
          unit: 'litres'
        }
      ],
      correctAnswer: '90 litres',
      explanation: 'Official DBE Marking Guidelines (3 Marks):\nAt 8 minutes: 120 ℓ\nAt 2 minutes: 30 ℓ\nRange = 120 ℓ - 30 ℓ = 90 ℓ\n(1RT minimum 30ℓ, 1RT maximum 120ℓ, 1CA simplification)'
    },

    // =========================================================================
    // QUESTION 4 [35 MARKS]
    // =========================================================================
    // 4.1 Bobby's Biryani Business (Table 4 & 5)
    {
      id: 737,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-p1-nov-2021',
      question: '4.1.1 TABLE 4 shows estimated ingredient costs for 8 plates of biryani in India. 1 kg of chicken costs Rs200.\n\nDetermine (in Rs) the price of 520 g of chicken.',
      category: 'Question 4.1 · Proportional Mass & Cost',
      annexureRef: 'table_4_5_biryani_costs',
      type: 'text',
      marks: 3,
      steps: [
        {
          stepNumber: 1,
          title: 'Calculate cost of 520 g',
          instruction: '(520 g / 1 000 g) × Rs200',
          formula: '(520 / 1000) × 200',
          marks: 3,
          rubricCode: '1C 1MA 1CA',
          rubricDescription: '1C conversion to grams, 1MA multiplying by correct value, 1CA simplification',
          expectedAnswer: '104',
          acceptableAnswers: ['104', 'Rs104', 'Rs 104', '104,00', '104.00'],
          unit: 'Rs'
        }
      ],
      correctAnswer: 'Rs104',
      explanation: 'Official DBE Marking Guidelines (3 Marks):\n520 g ÷ 1 000 g × Rs200 = Rs104\n(1C conversion, 1MA multiplying by correct value, 1CA simplification)'
    },
    {
      id: 738,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-p1-nov-2021',
      question: '4.1.2 Calculate the total cost to make and package ONE plate of chicken biryani.\n\n(Ingredients for 8 plates: chicken Rs200 + rice Rs120 + masala Rs10 + other Rs62 = Rs392. Disposable food container costs Rs2,43 each).',
      category: 'Question 4.1 · Unit Production Cost',
      annexureRef: 'table_4_5_biryani_costs',
      type: 'text',
      marks: 5,
      steps: [
        {
          stepNumber: 1,
          title: 'Calculate ingredient cost per plate',
          instruction: 'Rs392 ÷ 8 = Rs49',
          formula: '392 / 8',
          marks: 3,
          rubricCode: '1A 1MA 1CA',
          rubricDescription: '1A total ingredients, 1MA divide by 8, 1CA simplification',
          expectedAnswer: '49',
          acceptableAnswers: ['49', 'Rs49', 'Rs 49'],
          unit: 'Rs'
        },
        {
          stepNumber: 2,
          title: 'Add container cost',
          instruction: 'Rs49 + Rs2,43',
          formula: '49 + 2,43',
          marks: 2,
          rubricCode: '1MA 1CA',
          rubricDescription: '1MA adding the container, 1CA simplification',
          expectedAnswer: '51.43',
          acceptableAnswers: ['51,43', '51.43', 'Rs51,43', 'Rs 51,43', 'Rs51.43'],
          unit: 'Rs'
        }
      ],
      correctAnswer: 'Rs51,43',
      explanation: 'Official DBE Marking Guidelines (5 Marks):\nIngredients per plate = (Rs200 + Rs120 + Rs10 + Rs62) ÷ 8 = Rs392 ÷ 8 = Rs49\nTotal cost with container = Rs49 + Rs2,43 = Rs51,43\n(1A total, 1MA div 8, 1CA simp, 1MA add container, 1CA final)'
    },
    {
      id: 739,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-p1-nov-2021',
      question: '4.1.3 Bobby intends selling a plate of chicken biryani for eighty rupees (Rs80).\n\nBobby claims that he can make more than 50% profit on one plate of chicken biryani.\n\nVerify, by showing ALL calculations, if his claim is valid.',
      category: 'Question 4.1 · Profit Margin Verification',
      annexureRef: 'table_4_5_biryani_costs',
      type: 'text',
      marks: 5,
      steps: [
        {
          stepNumber: 1,
          title: 'Calculate profit per plate',
          instruction: 'Rs80 - Rs51,43 = Rs28,57',
          formula: '80 - 51,43',
          marks: 2,
          rubricCode: '1MA 1CA',
          rubricDescription: '1MA subtracting cost from selling price, 1CA simplification',
          expectedAnswer: '28.57',
          acceptableAnswers: ['28,57', '28.57', 'Rs28,57'],
          unit: 'Rs'
        },
        {
          stepNumber: 2,
          title: 'Calculate percentage profit',
          instruction: '(Rs28,57 ÷ Rs51,43) × 100% = 55,55%',
          formula: '(28,57 / 51,43) × 100',
          marks: 2,
          rubricCode: '1M 1CA',
          rubricDescription: '1M percentage calculation, 1CA simplification',
          expectedAnswer: '55.55',
          acceptableAnswers: ['55,55', '55.55', '55,55%', '55.55%'],
          unit: '%'
        },
        {
          stepNumber: 3,
          title: 'Conclude validity',
          instruction: '55,55% > 50% => Claim is VALID',
          formula: '',
          marks: 1,
          rubricCode: '1O',
          rubricDescription: '1O conclusion',
          expectedAnswer: 'VALID',
          acceptableAnswers: ['VALID', 'Valid', 'Correct', 'True', 'Claim is valid'],
          unit: ''
        }
      ],
      correctAnswer: '55,55% > 50% — Bobby\'s claim is VALID',
      explanation: 'Official DBE Marking Guidelines (5 Marks):\nProfit = Rs80 - Rs51,43 = Rs28,57\n% profit = (Rs28,57 / Rs51,43) × 100% = 55,55%\nSince 55,55% > 50%, Bobby\'s claim is VALID.\n(1MA sub, 1CA simp, 1M %, 1CA %, 1O conclusion)'
    },
    {
      id: 740,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-p1-nov-2021',
      question: '4.1.4 The exchange rate between South African rands (ZAR) and Indian rupees (INR) on 3 March 2021 was: 1 ZAR = 4,8346707 INR (or 1 INR = 0,206839 ZAR).\n\nDetermine (in ZAR) the price of masala powder (Rs10).',
      category: 'Question 4.1 · Table 5 Currency Conversion',
      annexureRef: 'table_4_5_biryani_costs',
      type: 'text',
      marks: 3,
      steps: [
        {
          stepNumber: 1,
          title: 'Convert Rs10 to ZAR',
          instruction: 'Rs10 × 0,206839 (or Rs10 ÷ 4,8346707)',
          formula: '10 × 0,206839',
          marks: 3,
          rubricCode: '1RT 1MA 1A',
          rubricDescription: '1RT correct values, 1MA multiplying/dividing, 1A simplification',
          expectedAnswer: '2.07',
          acceptableAnswers: ['2,07', '2.07', 'R2,07', 'R2.07', '2,068', '2.068'],
          unit: 'R'
        }
      ],
      correctAnswer: 'R2,07',
      explanation: 'Official DBE Marking Guidelines (3 Marks):\nPrice = Rs10 × 0,206839 = R2,06839 ≈ R2,07\n(1RT correct values, 1MA multiplying, 1A simplification)'
    },

    // 4.2 Janet's Biryani Business (Table 6 & Graph)
    {
      id: 741,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-p1-nov-2021',
      question: '4.2.1 Janet uses the equation: Total cost = R600,00 + 13p, where p = number of plates.\n\nUse the equation to determine the number of plates sold if the total cost was R1 380,00.',
      category: 'Question 4.2 · Linear Cost Equation Solution',
      annexureRef: 'table_6_biryani_graph',
      type: 'text',
      marks: 4,
      steps: [
        {
          stepNumber: 1,
          title: 'Substitute cost into equation',
          instruction: '1 380 = 600 + 13p',
          formula: '1 380 = 600 + 13p',
          marks: 1,
          rubricCode: '1SF',
          rubricDescription: '1SF correct substitution',
          expectedAnswer: '1380 = 600 + 13p',
          acceptableAnswers: ['1380 = 600 + 13p', '780 = 13p'],
          unit: ''
        },
        {
          stepNumber: 2,
          title: 'Subtract fixed cost',
          instruction: '1 380 - 600 = 780 = 13p',
          formula: '1 380 - 600',
          marks: 1,
          rubricCode: '1MA',
          rubricDescription: '1MA subtracting 600',
          expectedAnswer: '780',
          acceptableAnswers: ['780', 'R780'],
          unit: 'R'
        },
        {
          stepNumber: 3,
          title: 'Divide by variable cost 13',
          instruction: '780 ÷ 13 = 60 plates',
          formula: '780 / 13',
          marks: 2,
          rubricCode: '1CA 1CA',
          rubricDescription: '1CA simplification, 1CA final answer',
          expectedAnswer: '60',
          acceptableAnswers: ['60', '60 plates', 'p = 60'],
          unit: 'plates'
        }
      ],
      correctAnswer: '60 plates',
      explanation: 'Official DBE Marking Guidelines (4 Marks):\n1 380 = 600 + 13p\n1 380 - 600 = 13p\n780 = 13p\np = 60 plates\n(1SF substitution, 1MA sub 600, 1CA simp, 1CA final)'
    },
    {
      id: 742,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-p1-nov-2021',
      question: '4.2.2 TABLE 6 shows Janet\'s total cost and income from selling plates of biryani.\n\nUse TABLE 6 and the grid on the answer sheet to identify the start point, break-even point, and end point of the cost graph.\n\n(Start point at 0 plates, End point at 100 plates).',
      category: 'Question 4.2 · Cost Line Graph Coordinates',
      annexureRef: 'table_6_biryani_graph',
      type: 'text',
      marks: 3,
      correctAnswer: 'Start point (0; 600), Break-even point (50; 1 250), End point (100; 1 900)',
      explanation: 'Official DBE Marking Guidelines (3 Marks):\n1A Start point (0; 600)\n1A End point (100; 1 900)\n1A Correct straight line intersecting income graph at (50; 1 250)'
    },
    {
      id: 743,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-p1-nov-2021',
      question: '4.2.3 Determine the minimum number of plates of biryani that Janet must sell before she starts making a profit.',
      category: 'Question 4.2 · Break-Even Analysis',
      annexureRef: 'table_6_biryani_graph',
      type: 'text',
      marks: 2,
      correctAnswer: '50 plates (or 51 plates)',
      explanation: 'Official DBE Marking Guidelines (2 Marks):\nAt 50 plates, Income = Cost = R1 250 (Break-even point).\nMinimum to make profit is 50 plates (or 51 plates).\n(2RT number of plates)'
    },

    // 4.3 Tourism in India (Annexure C)
    {
      id: 744,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-p1-nov-2021',
      question: '4.3.1 ANNEXURE C shows tourist arrivals in India.\n\nWrite down, as a decimal, the probability of selecting a tourist that comes from "Other" countries (18,7%).',
      category: 'Question 4.3 · Annexure C Decimal Probability',
      annexureRef: 'annexure_c_tourist_arrivals',
      type: 'text',
      marks: 2,
      steps: [
        {
          stepNumber: 1,
          title: 'Convert 18,7% to decimal',
          instruction: '18,7 ÷ 100',
          formula: '18,7 / 100',
          marks: 2,
          rubricCode: '1RT 1CA',
          rubricDescription: '1RT reading 18,7, 1CA simplification',
          expectedAnswer: '0.187',
          acceptableAnswers: ['0,187', '0.187'],
          unit: ''
        }
      ],
      correctAnswer: '0,187',
      explanation: 'Official DBE Marking Guidelines (2 Marks):\n18,7% = 18,7 / 100 = 0,187\n(1RT reading 18,7, 1CA simplification)'
    },
    {
      id: 745,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-p1-nov-2021',
      question: '4.3.2 State the trend in the number of tourist arrivals in India from 2015 to 2019.',
      category: 'Question 4.3 · Annexure C Trend Identification',
      annexureRef: 'annexure_c_tourist_arrivals',
      type: 'text',
      marks: 2,
      correctAnswer: 'Increases / Upward trend year-on-year',
      explanation: 'Official DBE Marking Guidelines (2 Marks):\nAs the time increases, the number of tourists visiting India increases / Toenemend / Upward trend.\n(2A increases)'
    },
    {
      id: 746,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-p1-nov-2021',
      question: '4.3.3 For 2019 the total number of tourist arrivals in India was 10,93 million.\n\nBobby states that more than 4 500 000 tourists who visited India in 2019 came from Bangladesh (37,1%).\n\nVerify, showing ALL calculations, whether his statement is CORRECT.',
      category: 'Question 4.3 · Annexure C Percentage Calculation & Verification',
      annexureRef: 'annexure_c_tourist_arrivals',
      type: 'text',
      marks: 4,
      steps: [
        {
          stepNumber: 1,
          title: 'Calculate 37,1% of 10,93 million',
          instruction: '10 930 000 × 37,1%',
          formula: '10,93 × 0,371',
          marks: 3,
          rubricCode: '1RT 1M 1CA',
          rubricDescription: '1RT correct percentage, 1M multiply with percentage, 1CA simplification',
          expectedAnswer: '4055030',
          acceptableAnswers: ['4055030', '4 055 030', '4,05503 million', '4.05503 million'],
          unit: 'tourists'
        },
        {
          stepNumber: 2,
          title: 'Conclude statement validity',
          instruction: '4 055 030 < 4 500 000 => Statement is NOT CORRECT',
          formula: '',
          marks: 1,
          rubricCode: '1O',
          rubricDescription: '1O conclusion',
          expectedAnswer: 'NOT CORRECT',
          acceptableAnswers: ['NOT CORRECT', 'Not correct', 'Incorrect', 'False', 'Nie korrek nie'],
          unit: ''
        }
      ],
      correctAnswer: '4 055 030 < 4 500 000 — Statement is NOT CORRECT',
      explanation: 'Official DBE Marking Guidelines (4 Marks):\nTourists from Bangladesh = 10,93 million × 37,1% = 4,05503 million = 4 055 030\nSince 4 055 030 < 4 500 000, his statement is NOT CORRECT.\n(1RT %, 1M mult, 1CA simp, 1O conclusion)'
    },
    {
      id: 747,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-p1-nov-2021',
      question: '4.3.4 The pie chart shows the total percentage of tourist arrivals in India for 2019 as 99,8%.\n\nGive a valid reason why this value is not 100%.',
      category: 'Question 4.3 · Statistical Rounding Error',
      annexureRef: 'annexure_c_tourist_arrivals',
      type: 'text',
      marks: 2,
      correctAnswer: 'Due to rounding off of percentage values to one decimal place',
      explanation: 'Official DBE Marking Guidelines (2 Marks):\nDue to the rounding off of individual percentages to one decimal place / Afronding van persentasies.\n(2A stating rounding)'
    },

    // =========================================================================
    // QUESTION 5 [27 MARKS]
    // =========================================================================
    // 5.1 Personal Income Tax: Marius (Table 7 & 8)
    {
      id: 748,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-p1-nov-2021',
      question: '5.1.1 Marius, who is 64 years old, earned an annual taxable income of R551 762,00 for the 2019/20 tax year.\n\nIdentify which tax bracket Marius falls in, based on his taxable income.',
      category: 'Question 5.1 · SARS Tax Bracket Identification',
      annexureRef: 'table_7_8_sars_tax',
      type: 'text',
      marks: 2,
      correctAnswer: 'Tax Bracket 4 (R423 301 – R555 600)',
      explanation: 'Official DBE Marking Guidelines (2 Marks):\nTax Bracket 4 / R423 301 – R555 600\n(2A correct tax bracket)'
    },
    {
      id: 749,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-p1-nov-2021',
      question: '5.1.2 Calculate the amount of tax Marius must pay for the 2019/20 tax year.\n\n(Bracket 4: 100 263 + 36% of taxable income above 423 300. Primary rebate: R14 220).',
      category: 'Question 5.1 · SARS Annual Tax Payable Calculation',
      annexureRef: 'table_7_8_sars_tax',
      type: 'text',
      marks: 5,
      steps: [
        {
          stepNumber: 1,
          title: 'Calculate tax before rebate',
          instruction: 'R100 263 + 36% × (R551 762 - R423 300) = R100 263 + (0,36 × R128 462) = R100 263 + R46 246,32 = R146 509,32',
          formula: '100 263 + (0,36 × 128 462)',
          marks: 3,
          rubricCode: '1SF 1CA 1CA',
          rubricDescription: '1SF substitution, 1CA simplification, 1CA tax before rebate',
          expectedAnswer: '146509.32',
          acceptableAnswers: ['146509,32', '146509.32', '146 509,32', 'R146 509,32'],
          unit: 'R'
        },
        {
          stepNumber: 2,
          title: 'Deduct primary rebate',
          instruction: 'R146 509,32 - R14 220 = R132 289,32',
          formula: '146 509,32 - 14 220',
          marks: 2,
          rubricCode: '1MCA 1CA',
          rubricDescription: '1MCA subtracting rebate, 1CA simplification',
          expectedAnswer: '132289.32',
          acceptableAnswers: ['132289,32', '132289.32', '132 289,32', '132 289.32', 'R132 289,32', 'R132289,32'],
          unit: 'R'
        }
      ],
      correctAnswer: 'R132 289,32',
      explanation: 'Official DBE Marking Guidelines (5 Marks):\nTax before rebate = R100 263 + 36%(R551 762 - R423 300)\n= R100 263 + (36% × R128 462) = R100 263 + R46 246,32 = R146 509,32\nTax payable = R146 509,32 - R14 220 (Primary rebate) = R132 289,32\n(1SF sub, 1CA simp, 1CA tax before rebate, 1MCA sub rebate, 1CA final)'
    },
    {
      id: 750,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-p1-nov-2021',
      question: '5.1.3 Marius stated that if he had been one year older (65 years old), he would have saved more than R600 monthly on taxes paid during the 2019/20 tax year.\n\nVerify, showing ALL calculations, whether his statement is CORRECT.\n\n(Secondary rebate for 65 and older is R7 794).',
      category: 'Question 5.1 · SARS Secondary Rebate & Monthly Savings',
      annexureRef: 'table_7_8_sars_tax',
      type: 'text',
      marks: 6,
      steps: [
        {
          stepNumber: 1,
          title: 'Calculate monthly tax saving from secondary rebate',
          instruction: 'R7 794 ÷ 12 = R649,50 per month',
          formula: '7 794 / 12',
          marks: 4,
          rubricCode: '1RT 2A 1MA',
          rubricDescription: '1RT correct values, 2A correct rebate, 1MA dividing by 12',
          expectedAnswer: '649.50',
          acceptableAnswers: ['649,50', '649.50', 'R649,50', 'R649.50'],
          unit: 'R'
        },
        {
          stepNumber: 2,
          title: 'Compare with R600 and conclude',
          instruction: 'R649,50 > R600 => Statement is CORRECT',
          formula: '',
          marks: 2,
          rubricCode: '1CA 1O',
          rubricDescription: '1CA simplification, 1O conclusion',
          expectedAnswer: 'CORRECT',
          acceptableAnswers: ['CORRECT', 'Correct', 'True', 'Valid', 'Statement is correct'],
          unit: ''
        }
      ],
      correctAnswer: 'R649,50 > R600 — Statement is CORRECT',
      explanation: 'Official DBE Marking Guidelines (6 Marks):\nSecondary rebate = R7 794\nMonthly tax saving = R7 794 ÷ 12 = R649,50\nSince R649,50 > R600, Marius\'s statement is CORRECT.\n(1RT rebate, 2A rebate value, 1MA div 12, 1CA simp, 1O conclusion)'
    },
    {
      id: 751,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-p1-nov-2021',
      question: '5.1.4 Marius is considering joining a medical fund. He plans to include his wife and two grandchildren.\n\nDetermine the total monthly medical credits he would qualify for if he joined a medical fund.\n\n(Main member R310, First dependent R310, Each additional dependent R209).',
      category: 'Question 5.1 · SARS Medical Aid Tax Credits',
      annexureRef: 'table_7_8_sars_tax',
      type: 'text',
      marks: 4,
      steps: [
        {
          stepNumber: 1,
          title: 'Sum medical credits for 4 members',
          instruction: 'R310 (Marius) + R310 (Wife) + (R209 × 2 grandchildren)',
          formula: '310 + 310 + (209 × 2)',
          marks: 4,
          rubricCode: '1RT 1MA 1MA 1CA',
          rubricDescription: '1RT correct values, 1MA multiplying by 2, 1MA adding, 1CA simplification',
          expectedAnswer: '1038',
          acceptableAnswers: ['1038', '1 038', 'R1 038', 'R1038', 'R1 038,00', '1038.00'],
          unit: 'R'
        }
      ],
      correctAnswer: 'R1 038',
      explanation: 'Official DBE Marking Guidelines (4 Marks):\nMedical credits = R310 + R310 + (R209 × 2) = R620 + R418 = R1 038\n(1RT values, 1MA mult 2, 1MA add, 1CA simplification)'
    },

    // 5.2 Laptop Market Share Box-and-Whisker Plots
    {
      id: 752,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-p1-nov-2021',
      question: '5.2.1 (a) Study the box-and-whisker plots in FIGURE 5.2 showing market shares for Huawei, Samsung, and Apple.\n\nWrite down the name of the most popular laptop brand.',
      category: 'Question 5.2 · Box-and-Whisker Plot Interpretation',
      annexureRef: 'box_plot_5_2_laptop_brands',
      type: 'text',
      marks: 2,
      correctAnswer: 'Huawei',
      explanation: 'Official DBE Marking Guidelines (2 Marks):\nHuawei (Highest median 21,5% and upper whisker 23,5%)\n(2RT correct brand)'
    },
    {
      id: 753,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-p1-nov-2021',
      question: '5.2.1 (b) Hence, write down the 50th percentile of the brand identified in QUESTION 5.2.1(a).',
      category: 'Question 5.2 · Median 50th Percentile',
      annexureRef: 'box_plot_5_2_laptop_brands',
      type: 'text',
      marks: 2,
      correctAnswer: '21,5%',
      explanation: 'Official DBE Marking Guidelines (2 Marks):\n50th percentile = Median = 21,5%\n(2RT correct percentage)'
    },
    {
      id: 754,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-p1-nov-2021',
      question: '5.2.2 Calculate the interquartile range (IQR) of the Samsung brand (Q1 = 15,7%, Q3 = 18,75%).',
      category: 'Question 5.2 · Interquartile Range (IQR)',
      annexureRef: 'box_plot_5_2_laptop_brands',
      type: 'text',
      marks: 4,
      steps: [
        {
          stepNumber: 1,
          title: 'Calculate IQR = Q3 - Q1',
          instruction: '18,75% - 15,7%',
          formula: '18,75 - 15,7',
          marks: 4,
          rubricCode: '1MA 1RT 1RT 1CA',
          rubricDescription: '1MA concept of IQR, 1RT Q3, 1RT Q1, 1CA simplification',
          expectedAnswer: '3.05',
          acceptableAnswers: ['3,05', '3.05', '3,05%', '3.05%'],
          unit: '%'
        }
      ],
      correctAnswer: '3,05%',
      explanation: 'Official DBE Marking Guidelines (4 Marks):\nIQR = Q3 - Q1 = 18,75% - 15,7% = 3,05%\n(1MA concept of IQR, 1RT Q3, 1RT Q1, 1CA simplification)'
    },
    {
      id: 755,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-p1-nov-2021',
      question: '5.2.3 A data analyst claims that 75% of the dataset of Apple was less than 16%.\n\nExplain whether or not his statement is valid.',
      category: 'Question 5.2 · Percentile Analysis & Claim Validation',
      annexureRef: 'box_plot_5_2_laptop_brands',
      type: 'text',
      marks: 2,
      correctAnswer: 'VALID — Quartile 3 is 15,95% which is less than 16%',
      explanation: 'Official DBE Marking Guidelines (2 Marks):\nQuartile 3 (75th percentile) is at 15,95%, which includes 75% of the dataset.\nSince 15,95% < 16%, the analyst\'s statement is VALID.\n(1O explanation, 1O conclusion)'
    }
  ]
};
