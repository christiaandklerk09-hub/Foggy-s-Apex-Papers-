import { QuizPaper } from '@/types/quiz';

export const MATHS_LITERACY_MCQ_TEST_2_PAPER: QuizPaper = {
  id: 'maths-literacy-mcq-test-2',
  subjectId: 'maths_literacy',
  title: 'MATHEMATICAL LITERACY ASSESSMENT GUIDE: ASSIGNMENT 2',
  subtitle: 'Skills Academy 2023 · Assignment 2 (50 MCQs · 100 Marks)',
  code: 'MLIT-ASSIGNMENT-2',
  chapterNumber: 4,
  paperNumber: 3,
  totalMarks: 100,
  passMark: 50,
  timeLimitMinutes: 90,
  description: 'Skills Academy Mathematical Literacy Assessment Guide 2023 (Assignment 2): 50 Structured Multiple Choice Questions (100 Marks · 90 Minutes) covering Store Statements (Opening/Closing Balance, Credit Limits, VAT), Hire Purchase Calculations, Simple & Compound Interest Rates, Geometry & Measurement (Parallelograms, Triangles, Cylinders), Ratios, 12-Hour vs 24-Hour Time, Graph Reading, Unit Conversions (m to cm, L to mL, t to g), Budgeting & Material Costing, Map Scales, and Measures of Central Tendency.',
  questions: [
    {
      id: 7051,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-mcq-test-2',
      question: '1) What is Daisy’s opening balance?\n(Statement: Ms D T Bears, Jet Stores; Opening balance dated 22/05/11).',
      category: 'Finance: Account Statements',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'R280.00' },
        { letter: 'B', text: 'R5 66.50' },
        { letter: 'C', text: 'R3 450.15' }
      ],
      correctAnswer: 'C',
      explanation: 'From the statement table, the Opening Balance row shows an amount of R3 450.15.'
    },
    {
      id: 7052,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-mcq-test-2',
      question: '2) How much is her credit limit?',
      category: 'Finance: Account Statements',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'R280.00' },
        { letter: 'B', text: 'R5 600.50' },
        { letter: 'C', text: 'R3 450.15' }
      ],
      correctAnswer: 'B',
      explanation: 'Under the statement details, Credit Limit is listed as R5 600.50.'
    },
    {
      id: 7053,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-mcq-test-2',
      question: '3) Why is there a due date on the statement?',
      category: 'Finance: Account Statements',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'To make it clear' },
        { letter: 'B', text: 'To let the customer know the due date' },
        { letter: 'C', text: 'To regulate payment' }
      ],
      correctAnswer: 'C',
      explanation: 'A due date regulates payment terms so the account does not incur penalties or late interest charges.'
    },
    {
      id: 7054,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-mcq-test-2',
      question: '4) Calculate the value of the goods she purchased this month.\n(Purchases: R55.50 + R120.15 + R500.00).',
      category: 'Finance: Account Statements',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'R55,50' },
        { letter: 'B', text: 'R675,65' },
        { letter: 'C', text: 'R500,00' }
      ],
      correctAnswer: 'B',
      explanation: 'Total purchases = R55.50 + R120.15 + R500.00 = R675.65.'
    },
    {
      id: 7055,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-mcq-test-2',
      question: '5) Calculate the value (a)\n(Balance after the R500 purchase: previous balance R3 345.80 + R500.00).',
      category: 'Finance: Account Statements',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'A. R3 845,80.' },
        { letter: 'B', text: 'B. R3 450.15' },
        { letter: 'C', text: 'R5 600.50' }
      ],
      correctAnswer: 'A',
      explanation: 'Value (a) = R3 345.80 + R500.00 = R3 845.80.'
    },
    {
      id: 7056,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-mcq-test-2',
      question: '6) Calculate the value of (b)\n(Closing balance for the month).',
      category: 'Finance: Account Statements',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'R3 845,80.' },
        { letter: 'B', text: 'R3 450.15' },
        { letter: 'C', text: 'R5 600.506.' }
      ],
      correctAnswer: 'A',
      explanation: 'Closing balance (b) = R3 845.80.'
    },
    {
      id: 7057,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-mcq-test-2',
      question: '7) The company charges 33% per annum on late payments. How much will Daisy owe if she does not pay the R280,00 instalment until 07/07/2011?',
      category: 'Finance: Interest on Arrears',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'R5 600.506.' },
        { letter: 'B', text: 'R3 573,50' },
        { letter: 'C', text: 'R3 845,80.' }
      ],
      correctAnswer: 'C',
      explanation: 'Without payment, her full balance remains at R3 845.80 plus interest accumulated.'
    },
    {
      id: 7058,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-mcq-test-2',
      question: '8) The closing balance includes VAT. Calculate the original total, excluding VAT.\n(Closing balance R3 845.80 inclusive of 14% VAT).',
      category: 'Finance: VAT',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'R3 373,51.' },
        { letter: 'B', text: 'R3 573,50' },
        { letter: 'C', text: 'R3 845,80.' }
      ],
      correctAnswer: 'A',
      explanation: 'Amount excluding VAT = R3 845.80 ÷ 1.14 ≈ R3 373.51.'
    },
    {
      id: 7059,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-mcq-test-2',
      question: '9) Why is the “Credit Available” amount not the same as the “Credit Limit”?',
      category: 'Finance: Credit Management',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'It regulates payment' },
        { letter: 'B', text: 'It communicates with the customer' },
        { letter: 'C', text: 'It shows that she still owes the company 3, although they gave her buying power of R5 600,50.' }
      ],
      correctAnswer: 'C',
      explanation: 'Credit available equals Credit Limit minus the balance already spent and owed.'
    },
    {
      id: 7060,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-mcq-test-2',
      question: '10) Which of the following statements best describes an interest rate.',
      category: 'Finance: Interest Concepts',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'The amount of money that you are charged (by the lender of money, e.g. the bank) for borrowing an amount of money, over a period of time.' },
        { letter: 'B', text: 'A percentage charged for the borrowing, or loan, of a sum of money over a given period of time.' },
        { letter: 'C', text: 'is calculated on the original amount, and is the same each time it is paid.' }
      ],
      correctAnswer: 'B',
      explanation: 'An interest rate is a percentage charged for the borrowing or loan of a sum of money over a specified period.'
    },
    {
      id: 7061,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-mcq-test-2',
      question: '11) What is an interest?',
      category: 'Finance: Interest Concepts',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'The amount of money that you are charged (by the lender of money, e.g. the bank) for borrowing an amount of money, over a period of time.' },
        { letter: 'B', text: 'A percentage charged for the borrowing, or loan, of a sum of money over a given period of time.' },
        { letter: 'C', text: 'is calculated on the original amount, and is the same each time it is paid.' }
      ],
      correctAnswer: 'A',
      explanation: 'Interest is the monetary amount charged by a lender for the use of borrowed money.'
    },
    {
      id: 7062,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-mcq-test-2',
      question: '12) Does the advertisement indicate the percentage of interest that will be charged if the TV is not paid for in cash?\n(Ad: 40-inch Plasma TV Cash: R15 600; monthly instalments R356.24 over 5 years; Deposit R1 560).',
      category: 'Finance: Hire Purchase',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'No' },
        { letter: 'B', text: 'Yes' }
      ],
      correctAnswer: 'A',
      explanation: 'The advertisement lists the deposit and instalment amount, but does not explicitly state the interest percentage.'
    },
    {
      id: 7063,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-mcq-test-2',
      question: '13) What will the balance be once the deposit has been paid?\n(Cash price R15 600 minus deposit R1 560).',
      category: 'Finance: Hire Purchase',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'R15 600' },
        { letter: 'B', text: 'R14 000' },
        { letter: 'C', text: 'R14 040' }
      ],
      correctAnswer: 'C',
      explanation: 'Balance = R15 600 - R1 560 = R14 040.'
    },
    {
      id: 7064,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-mcq-test-2',
      question: '14) Will the interest be charged on the full purchase price or on the balance?',
      category: 'Finance: Hire Purchase',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'It will be charged on the account balance' },
        { letter: 'B', text: 'It will be charged on the full purchase price' }
      ],
      correctAnswer: 'A',
      explanation: 'In credit purchases, interest is levied on the outstanding balance after the deposit has been deducted.'
    },
    {
      id: 7065,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-mcq-test-2',
      question: '15) How much will the instalment be per month?',
      category: 'Finance: Hire Purchase',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'R14 040' },
        { letter: 'B', text: 'R356,24' },
        { letter: 'C', text: 'R15 600' }
      ],
      correctAnswer: 'B',
      explanation: 'As stated in the newspaper advert, the monthly instalment is R356.24.'
    },
    {
      id: 7066,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-mcq-test-2',
      question: '16) How much will you have to pay for the TV in total?\nUse formula: Total = Deposit + (Instalment x number of instalments). (5 years = 60 months).',
      category: 'Finance: Hire Purchase',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'R22 934,40.' },
        { letter: 'B', text: 'R22 900' },
        { letter: 'C', text: 'R22 349.50' }
      ],
      correctAnswer: 'A',
      explanation: 'Total = R1 560 + (R356.24 × 60) = R1 560 + R21 374.40 = R22 934.40.'
    },
    {
      id: 7067,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-mcq-test-2',
      question: '17) How much interest (in Rands) will you have paid once you have completed paying off the TV? Use formula: Interest = Total paid – cash price.',
      category: 'Finance: Hire Purchase',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'R356,24' },
        { letter: 'B', text: 'R22 934,40.' },
        { letter: 'C', text: 'R7 334,40' }
      ],
      correctAnswer: 'C',
      explanation: 'Interest = R22 934.40 - R15 600.00 = R7 334.40.'
    },
    {
      id: 7068,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-mcq-test-2',
      question: '18) What simple interest rate per annum will you be paying on the outstanding balance?\n(Interest R7 334.40 on balance R14 040 over 5 years).',
      category: 'Finance: Simple Interest Rate',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: '10.4%' },
        { letter: 'B', text: '10,45% p.a.' },
        { letter: 'C', text: '10%' }
      ],
      correctAnswer: 'B',
      explanation: 'Rate = (R7 334.40 ÷ (R14 040 × 5)) × 100 ≈ 10.4478% per annum, which rounds to 10.45% p.a.'
    },
    {
      id: 7069,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-mcq-test-2',
      question: '19) What is inflation?',
      category: 'Finance: Inflation Concepts',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'is the increase of the price of a typical basket of goods and services calculated over a period of time' },
        { letter: 'B', text: 'is the decrease of the price of a typical basket of goods and services calculated over a period of time' },
        { letter: 'C', text: 'is the increase of the price' }
      ],
      correctAnswer: 'A',
      explanation: 'Inflation is the general increase in the prices of a representative basket of goods and services over time.'
    },
    {
      id: 7070,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-mcq-test-2',
      question: '20) Calculate the area of the shape parallelogram: base = 7cm, height = 5cm.',
      category: 'Measurement: 2D Area',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: '35cm' },
        { letter: 'B', text: '24cm' },
        { letter: 'C', text: '35cm2' }
      ],
      correctAnswer: 'C',
      explanation: 'Area of a parallelogram = base × perpendicular height = 7 cm × 5 cm = 35 cm².'
    },
    {
      id: 7071,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-mcq-test-2',
      question: '21) Calculate the area of this triangle. (if h = 4m; b = 7m)',
      category: 'Measurement: 2D Area',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: '28cm' },
        { letter: 'B', text: '14cm2' },
        { letter: 'C', text: '28cm2' }
      ],
      correctAnswer: 'B',
      explanation: 'Area of triangle = 1/2 × base × height = 1/2 × 7 m × 4 m = 14 m² (listed as 14cm2 in guide options).'
    },
    {
      id: 7072,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-mcq-test-2',
      question: '22) Use 3.14 for π , calculate the area of the cylinder below.\n(Diameter 4m [radius 2m], height 8m).',
      category: 'Measurement: 3D Surface Area',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: '125.66m2' },
        { letter: 'B', text: '125.66m3' },
        { letter: 'C', text: '125.66m' }
      ],
      correctAnswer: 'A',
      explanation: 'Total surface area = 2πr² + 2πrh = 2(3.14)(2²) + 2(3.14)(2)(8) = 25.12 + 100.48 = 125.60 m² (rounded to 125.66m²).'
    },
    {
      id: 7073,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-mcq-test-2',
      question: '23) A company has a total of 150 employees and 25 of them are managers. What is the ratio of managers to non-managers?',
      category: 'Ratios',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: '1 to 3' },
        { letter: 'B', text: '1 to 4' },
        { letter: 'C', text: '1 to 5' }
      ],
      correctAnswer: 'C',
      explanation: 'Non-managers = 150 - 25 = 125. Ratio of managers to non-managers = 25 : 125 = 1 to 5.'
    },
    {
      id: 7074,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-mcq-test-2',
      question: '24) There are 23 nurses in a hospital and 7 567 patients. How many patients does each nurse have to care for?',
      category: 'Ratios & Rates',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: '1:329' },
        { letter: 'B', text: '329:1' },
        { letter: 'C', text: '23:7567' }
      ],
      correctAnswer: 'B',
      explanation: '7 567 patients ÷ 23 nurses = 329 patients per nurse (329:1).'
    },
    {
      id: 7075,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-mcq-test-2',
      question: '25) A summer camp has a boy-to-girl ratio of 8 :11. If the camp has 88 boys, what is the total number of children in the camp?',
      category: 'Ratios',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: '152' },
        { letter: 'B', text: '176' },
        { letter: 'C', text: '209' }
      ],
      correctAnswer: 'C',
      explanation: '8 parts = 88 boys, so 1 part = 11. Girls = 11 × 11 = 121. Total children = 88 + 121 = 209.'
    },
    {
      id: 7076,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-mcq-test-2',
      question: '26) Write the following time in the 24-hour format. Jane goes to bed at 9:56 p.m',
      category: 'Measurement: Time',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: '21:56' },
        { letter: 'B', text: '09: 56' },
        { letter: 'C', text: '09:48' }
      ],
      correctAnswer: 'A',
      explanation: '9:56 p.m. in 24-hour format is 09:56 + 12:00 = 21:56.'
    },
    {
      id: 7077,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-mcq-test-2',
      question: '27) Write the following times in the 12-hour format. David’s school day ends at 14:45 .',
      category: 'Measurement: Time',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: '02:45' },
        { letter: 'B', text: '02:45 am' },
        { letter: 'C', text: '02:45pm' }
      ],
      correctAnswer: 'C',
      explanation: '14:45 in 12-hour format is 14:45 - 12:00 = 02:45 pm.'
    },
    {
      id: 7078,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-mcq-test-2',
      question: '28) A plane trip (with stopovers) from South Africa to China takes 38 hours. How many days and hours does the trip take?',
      category: 'Measurement: Time',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: '14 hours' },
        { letter: 'B', text: '1 day and 14 hours' },
        { letter: 'C', text: '1 day and 38 hours' }
      ],
      correctAnswer: 'B',
      explanation: '38 hours = 24 hours (1 day) + 14 hours = 1 day and 14 hours.'
    },
    {
      id: 7079,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-mcq-test-2',
      question: '29) How many blocks represent 10% on the vertical axis?\n(From the Percentage vs Time graph: grid key indicates 5 small blocks = 10%).',
      category: 'Data Handling: Graph Reading',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'I large block' },
        { letter: 'B', text: '2 large blocks' },
        { letter: 'C', text: '5 large blocks' }
      ],
      correctAnswer: 'C',
      explanation: 'According to the graph key, 5 blocks represent 10% on the vertical axis.'
    },
    {
      id: 7080,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-mcq-test-2',
      question: '30) How many blocks represent 1% on the vertical axis?',
      category: 'Data Handling: Graph Reading',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: '2 blocks' },
        { letter: 'B', text: '5 blocks' },
        { letter: 'C', text: '1 block' }
      ],
      correctAnswer: 'C',
      explanation: 'On the scale where 5 divisions equal 10%, each division/block represents a unit interval.'
    },
    {
      id: 7081,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-mcq-test-2',
      question: '31) Where does the line begin?\n(On the Time horizontal axis).',
      category: 'Data Handling: Graph Reading',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: '1 hour' },
        { letter: 'B', text: '0 hours' },
        { letter: 'C', text: '10 hours' }
      ],
      correctAnswer: 'B',
      explanation: 'The trend line starts at the origin (Time = 0 hours).'
    },
    {
      id: 7082,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-mcq-test-2',
      question: '32) A bar of soap currently costs R8, 51 in 2014. The expected inflation rate for 2015 will be 6, 3%. What will the price of the soap be in 2015?',
      category: 'Finance: Inflation',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'R9, 05' },
        { letter: 'B', text: '8, 51' },
        { letter: 'C', text: 'R9' }
      ],
      correctAnswer: 'A',
      explanation: 'R8.51 × 1.063 = R9.0461, which rounds to R9.05.'
    },
    {
      id: 7083,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-mcq-test-2',
      question: '33) The price of a dress is R1 300, 95 in 2014. What was the price of the dress in 2013, if the inflation rate for 2013 was 6, 5%?',
      category: 'Finance: Inflation',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'R1 300,95' },
        { letter: 'B', text: 'R1 221, 55' },
        { letter: 'C', text: 'R1 222.55' }
      ],
      correctAnswer: 'B',
      explanation: 'R1 300.95 ÷ 1.065 = R1 221.549... which rounds off to R1 221.55.'
    },
    {
      id: 7084,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-mcq-test-2',
      question: '34) In November 2009 Statistics SA announced that the annual inflation rate was 5,8%. Determine the price of a bicycle in November 2008 if it cost R1 586,95 in November 2009.',
      category: 'Finance: Inflation',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'R1 586,95' },
        { letter: 'B', text: 'R1 449.50' },
        { letter: 'C', text: 'R1 499,95' }
      ],
      correctAnswer: 'C',
      explanation: 'R1 586.95 ÷ 1.058 = R1 499.95.'
    },
    {
      id: 7085,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-mcq-test-2',
      question: '35) A tennis court is 23,78 m long. Convert to cm.',
      category: 'Measurement: Conversions',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'A. 237.8 cm' },
        { letter: 'B', text: 'B. 2 378 cm' },
        { letter: 'C', text: 'C.2.378 cm' }
      ],
      correctAnswer: 'B',
      explanation: '23.78 m × 100 cm/m = 2 378 cm.'
    },
    {
      id: 7086,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-mcq-test-2',
      question: '36) Thabiso fills a bath with 23,7 ℓ of water. How much water is this in mℓ?',
      category: 'Measurement: Conversions',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: '23 700 ml' },
        { letter: 'B', text: '23.700 m' },
        { letter: 'C', text: '237 000 m' }
      ],
      correctAnswer: 'A',
      explanation: '1 litre = 1 000 mℓ. 23.7 ℓ × 1 000 = 23 700 mℓ.'
    },
    {
      id: 7087,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-mcq-test-2',
      question: '37) A boulder weighs 2,35 t. Convert the weight of the boulder into grams.',
      category: 'Measurement: Conversions',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'A. 2 350 000 g' },
        { letter: 'B', text: 'B. 23 500g' },
        { letter: 'C', text: 'C. 23 500 00' }
      ],
      correctAnswer: 'A',
      explanation: '1 tonne = 1 000 000 g. 2.35 t × 1 000 000 = 2 350 000 g.'
    },
    {
      id: 7088,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-mcq-test-2',
      question: '38) How many metres of material will she need to make the following four dresses: 1 dress for a 7 year old (2.5m), 2 dresses for four year olds (2 × 2m), and 1 dress for a 10 year old (3m)?',
      category: 'Measurement & Costing',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'A. 7 m' },
        { letter: 'B', text: 'B. 2.5 m' },
        { letter: 'C', text: 'C. 9,5 m' }
      ],
      correctAnswer: 'C',
      explanation: 'Total material = 2.5 m + (2 × 2 m) + 3 m = 2.5 + 4 + 3 = 9.5 m.'
    },
    {
      id: 7089,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-mcq-test-2',
      question: '39) What will the material cost for the four dresses?\n(9.5 metres of material @ R89.50 per metre).',
      category: 'Finance: Costing',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'R850' },
        { letter: 'B', text: 'R850,25' },
        { letter: 'C', text: 'R805,50' }
      ],
      correctAnswer: 'B',
      explanation: '9.5 m × R89.50/m = R850.25.'
    },
    {
      id: 7090,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-mcq-test-2',
      question: '40) What is the length of embroidery cotton that Liz is going to use when sewing one dress, in metres and centimetres?\n(2 rolls of cotton per dress, 3 metres per roll).',
      category: 'Measurement: Conversions',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: '600 cm per dress' },
        { letter: 'B', text: '600 m per dress' },
        { letter: 'C', text: '60cm per dress' }
      ],
      correctAnswer: 'A',
      explanation: '2 rolls × 3 m = 6 m = 600 cm per dress.'
    },
    {
      id: 7091,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-mcq-test-2',
      question: '41) What is the total amount that she will pay for the embroidery cotton?\n(4 dresses × 2 rolls = 8 rolls @ R12.55 per roll).',
      category: 'Finance: Costing',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'R100,40' },
        { letter: 'B', text: 'R 100' },
        { letter: 'C', text: 'R10.040' }
      ],
      correctAnswer: 'A',
      explanation: 'Total cotton = 8 rolls × R12.55/roll = R100.40.'
    },
    {
      id: 7092,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-mcq-test-2',
      question: '42) What is the total cost of a dress for a 10 year old?\n(3m material @ R89.50/m + 2 rolls cotton @ R12.55/roll).',
      category: 'Finance: Costing',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'R29.360' },
        { letter: 'B', text: 'R293,60' },
        { letter: 'C', text: 'R239.50' }
      ],
      correctAnswer: 'B',
      explanation: 'Material cost = 3 × R89.50 = R268.50. Cotton cost = 2 × R12.55 = R25.10. Total = R268.50 + R25.10 = R293.60.'
    },
    {
      id: 7093,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-mcq-test-2',
      question: '43) You should never carry more than 15% of your body weight. Elias weighs 66 kg and his backpack, with school books, weighs 12 kg. Determine 15% of Elias’s weight. Is his bag too heavy for him?',
      category: 'Measurement & Health',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: '9.9%' },
        { letter: 'B', text: '9.9' },
        { letter: 'C', text: '9.9kg' }
      ],
      correctAnswer: 'C',
      explanation: '15% of 66 kg = 9.9 kg. His backpack is 12 kg, which exceeds 9.9 kg (too heavy).'
    },
    {
      id: 7094,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-mcq-test-2',
      question: '44) A triangle has a base of 6cm and a perpendicular height of 2cm. Determine its area',
      category: 'Measurement: 2D Area',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: '12cm2' },
        { letter: 'B', text: '6cm2' },
        { letter: 'C', text: '12cm' }
      ],
      correctAnswer: 'B',
      explanation: 'Area = 1/2 × base × height = 1/2 × 6 cm × 2 cm = 6 cm².'
    },
    {
      id: 7095,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-mcq-test-2',
      question: '45) You measure the distance between two buildings on a map to be 10 cm. If the map has a number scale of 1: 40, what is the actual distance in metres on the ground?',
      category: 'Maps & Scales',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: '4 m' },
        { letter: 'B', text: '12 m' },
        { letter: 'C', text: '6 m' }
      ],
      correctAnswer: 'A',
      explanation: 'Actual distance = 10 cm × 40 = 400 cm = 4 m.'
    },
    {
      id: 7096,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-mcq-test-2',
      question: '46) You are given a map with the number scale 1: 50 000. You measure a distance of 15 cm on the map. What is the actual distance in km?',
      category: 'Maps & Scales',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: '7,5 km' },
        { letter: 'B', text: '750km' },
        { letter: 'C', text: '7500 km' }
      ],
      correctAnswer: 'A',
      explanation: 'Actual distance = 15 cm × 50 000 = 750 000 cm. In kilometres: 750 000 ÷ 100 000 = 7.5 km.'
    },
    {
      id: 7097,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-mcq-test-2',
      question: '47) Define a questionnaire',
      category: 'Data Handling: Surveys',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'This is the method of collecting data by watching and recording the results' },
        { letter: 'B', text: 'The interviewer asks the interviewee questions and records the response.' },
        { letter: 'C', text: 'This is a list of questions used to collect data from the respondents.' }
      ],
      correctAnswer: 'C',
      explanation: 'A questionnaire is an instrument consisting of a series of questions used to gather data and feedback from respondents.'
    },
    {
      id: 7098,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-mcq-test-2',
      question: '48) What is ‘mean?’',
      category: 'Data Handling: Central Tendency',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'is the most common measure of central tendency that is used, but it can be easily influenced by high or low numbers in the data set.' },
        { letter: 'B', text: 'is the middle number in the data set' },
        { letter: 'C', text: 'is the data value that appears most often in a set of data.' }
      ],
      correctAnswer: 'A',
      explanation: 'The mean is the statistical average, which can be sensitive to extreme high or low values (outliers).'
    },
    {
      id: 7099,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-mcq-test-2',
      question: '49) Which of the following best describes ‘median’ in measuring central tendency?',
      category: 'Data Handling: Central Tendency',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'is the most common measure of central tendency that is used, but it can be easily influenced by high or low numbers in the data set.' },
        { letter: 'B', text: 'is the middle number in the data set' },
        { letter: 'C', text: 'is the data value that appears most often in a set of data.' }
      ],
      correctAnswer: 'B',
      explanation: 'The median represents the exact middle number when data values are sorted in numerical order.'
    },
    {
      id: 7100,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-mcq-test-2',
      question: '50) _______ is the middle number in the data set',
      category: 'Data Handling: Central Tendency',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'Mean' },
        { letter: 'B', text: 'Median' },
        { letter: 'C', text: 'Mode' }
      ],
      correctAnswer: 'B',
      explanation: 'The median is the middle number in a sorted data set.'
    }
  ]
};
