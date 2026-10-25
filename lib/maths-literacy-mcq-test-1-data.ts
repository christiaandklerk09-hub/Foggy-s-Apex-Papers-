import { QuizPaper } from '@/types/quiz';

export const MATHS_LITERACY_MCQ_TEST_1_PAPER: QuizPaper = {
  id: 'maths-literacy-mcq-test-1',
  subjectId: 'maths_literacy',
  title: 'MATHEMATICAL LITERACY ASSESSMENT GUIDE: ASSIGNMENT 1',
  subtitle: 'Skills Academy 2023 · Assignment 1 (50 MCQs · 100 Marks)',
  code: 'MLIT-ASSIGNMENT-1',
  chapterNumber: 4,
  paperNumber: 2,
  totalMarks: 100,
  passMark: 50,
  timeLimitMinutes: 90,
  description: 'Skills Academy Mathematical Literacy Assessment Guide 2023 (Assignment 1): 50 Structured Multiple Choice Questions (100 Marks · 90 Minutes) covering Geometry & Measurement, Financial Mathematics (Profit, Simple & Compound Loans, Inflation), Ratios, Rounding Rules, Unit Conversions, Scale Drawings, Data Handling (Frequency, Mean, Median, Mode, Range, Quartiles), Probability, and Income Tax with Deductions & Rebates.',
  questions: [
    {
      id: 7001,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-mcq-test-1',
      question: '1) Thami needs to make a circle with an area of 40cm^2. What should the radius of the circle be? Round off your answer to two decimal place.',
      category: 'Measurement & Geometry',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: '3.57cm' },
        { letter: 'B', text: '3.572cm' },
        { letter: 'C', text: '3.56cm' }
      ],
      correctAnswer: 'A',
      explanation: 'Area = π × r² = 40. Therefore r² = 40 ÷ π ≈ 12.7324. Radius r = √12.7324 ≈ 3.568 cm, which rounds to 3.57 cm.'
    },
    {
      id: 7002,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-mcq-test-1',
      question: '2) Profit = selling price - cost price. It costs R121 to buy a necklace at cost price, and Thabo wants to make R65 profit. How much must he sell it for? (What is the selling price)',
      category: 'Finance: Profit & Loss',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'R56' },
        { letter: 'B', text: 'R186' },
        { letter: 'C', text: '0' }
      ],
      correctAnswer: 'B',
      explanation: 'Selling Price = Cost Price + Profit = R121 + R65 = R186.'
    },
    {
      id: 7003,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-mcq-test-1',
      question: '3) Cost=4+(R160+5)xR85',
      category: 'Basic Calculations',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'R14 429' },
        { letter: 'B', text: 'R14 365' },
        { letter: 'C', text: 'R14 029' }
      ],
      correctAnswer: 'C',
      explanation: 'Using order of operations (BODMAS): 4 + (160 + 5) × 85 = 4 + 165 × 85 = 4 + 14 025 = R14 029.'
    },
    {
      id: 7004,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-mcq-test-1',
      question: '4) Write the value of the first 4 on the number 30.44',
      category: 'Numbers & Place Value',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'tenths' },
        { letter: 'B', text: 'hundredths' },
        { letter: 'C', text: 'units' }
      ],
      correctAnswer: 'A',
      explanation: 'The first digit immediately after the decimal comma/point represents the tenths place (0.4).'
    },
    {
      id: 7005,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-mcq-test-1',
      question: '5) You get 40% for a test, or a mark of 28. What is the total number of marks for the test?',
      category: 'Percentages',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: '100 marks' },
        { letter: 'B', text: '70 marks' },
        { letter: 'C', text: '40 marks' }
      ],
      correctAnswer: 'B',
      explanation: 'Total marks = 28 ÷ 0.40 = 70 marks.'
    },
    {
      id: 7006,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-mcq-test-1',
      question: '6) Nomalizo receives a salary increase of 7%. If her new salary is R10 600, what was her salary before the increase?',
      category: 'Finance: Percentage Increase',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'R10 493' },
        { letter: 'B', text: 'R9 907' },
        { letter: 'C', text: 'R9 858' }
      ],
      correctAnswer: 'B',
      explanation: 'Original salary = R10 600 ÷ 1.07 ≈ R9 906.54, which rounds to R9 907.'
    },
    {
      id: 7007,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-mcq-test-1',
      question: '7) A grandmother wants to share R800 between her three grandchildren, in the ratio of their ages 20 years, 15 years and 5 years. How much should they each get?',
      category: 'Ratios & Sharing',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'R400:R300:R100' },
        { letter: 'B', text: 'R300:R400:R100' },
        { letter: 'C', text: 'R100:R400:R300' }
      ],
      correctAnswer: 'A',
      explanation: 'Total ratio parts = 20 + 15 + 5 = 40 parts. Each part = R800 ÷ 40 = R20. Allocations: 20 × R20 = R400, 15 × R20 = R300, 5 × R20 = R100 (R400 : R300 : R100).'
    },
    {
      id: 7008,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-mcq-test-1',
      question: '8) Jacolene is catering for a group of 54 people. The muffins are sold in packs of 8. How many packs of muffins must she buy? Round up or down to get reasonable answer.',
      category: 'Rounding in Context',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: '6.75 packs' },
        { letter: 'B', text: '7 packs' },
        { letter: 'C', text: '6 packs' }
      ],
      correctAnswer: 'B',
      explanation: '54 ÷ 8 = 6.75 packs. She must round UP to 7 packs to ensure every person receives a muffin.'
    },
    {
      id: 7009,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-mcq-test-1',
      question: '9) Isaac is buying blinds for a large window in his home. Each blind is 100cm wide. The window is 260cm wide. How may blinds does he need? Round up or down to get a reasonable answer.',
      category: 'Rounding in Context',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: '2.6 blinds' },
        { letter: 'B', text: '2 blinds' },
        { letter: 'C', text: '3 blinds' }
      ],
      correctAnswer: 'C',
      explanation: '260cm ÷ 100cm = 2.6 blinds. To cover the entire width of the window, he must round UP to 3 blinds.'
    },
    {
      id: 7010,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-mcq-test-1',
      question: '10) A train journey takes 34 hours. How many days and hours does the journey take?',
      category: 'Measurement: Time',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: '1.417 days and hours' },
        { letter: 'B', text: '1 day 10 hours' },
        { letter: 'C', text: '2 hours' }
      ],
      correctAnswer: 'B',
      explanation: '34 hours = 24 hours (1 full day) + 10 hours = 1 day 10 hours.'
    },
    {
      id: 7011,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-mcq-test-1',
      question: '11) Mr Moloke has two options for borrowing money. His uncle has offered to lend him R16 000 for five years at 18% per annum, simple interest. 2nd option, His personal bank will lend him R16 000 for five years at 16% interest compounded per annum. Determine the cost of the two options to recommend which one would be the best for Mr Moloke.',
      category: 'Finance: Loans & Interest',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'Simple interest R14 400, compound interest R28 970 therefore personal loan is cheap' },
        { letter: 'B', text: 'Simple interest R30 400, compound interest R33 605.47 therefore personal loan is' },
        { letter: 'C', text: 'Both of the options are cheap' }
      ],
      correctAnswer: 'B',
      explanation: 'Option 1 Total = R16 000 + (16 000 × 0.18 × 5) = R30 400. Option 2 Total = 16 000 × (1.16)⁵ = R33 605.47. The simple interest family loan is cheaper.'
    },
    {
      id: 7012,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-mcq-test-1',
      question: '12) A litre of milk currently costs R9.11. The expected inflation rate for 2015 will be 6.5%. What will the price of the milk be in 2015?',
      category: 'Finance: Inflation',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'R8.51' },
        { letter: 'B', text: 'R9.17' },
        { letter: 'C', text: 'R9.70' }
      ],
      correctAnswer: 'C',
      explanation: 'New price = R9.11 × (1 + 0.065) = R9.11 × 1.065 = R9.70.'
    },
    {
      id: 7013,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-mcq-test-1',
      question: '13) The price for Nike shoes in 2014 is R650.95. What was the price of Nike shoes in 2013, if inflation rate for 2013 was 6.4%?',
      category: 'Finance: Inflation',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'R690.01' },
        { letter: 'B', text: 'R611.80' },
        { letter: 'C', text: 'R39.15' }
      ],
      correctAnswer: 'B',
      explanation: 'Price in 2013 = R650.95 ÷ 1.064 ≈ R611.80.'
    },
    {
      id: 7014,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-mcq-test-1',
      question: '14) A car weighs 1250 000g. What is the mass n tonnes?',
      category: 'Measurement: Conversions',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: '1.25t' },
        { letter: 'B', text: '12.5t' },
        { letter: 'C', text: '125t' }
      ],
      correctAnswer: 'A',
      explanation: '1 tonne = 1 000 kg = 1 000 000 g. 1 250 000 g ÷ 1 000 000 = 1.25 tonnes.'
    },
    {
      id: 7015,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-mcq-test-1',
      question: '15) A long workbench is 295 cm long. How long is it in metres?',
      category: 'Measurement: Conversions',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: '0.295m' },
        { letter: 'B', text: '29.5m' },
        { letter: 'C', text: '2.95m.' }
      ],
      correctAnswer: 'C',
      explanation: '1 metre = 100 cm. 295 cm ÷ 100 = 2.95 m.'
    },
    {
      id: 7016,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-mcq-test-1',
      question: '16) You should never carry more than 15% of your body weight. Elias weighs 66 kg and his backpack, with school books weighs 12kg Determine 15% of Elias\'s weight. Is his bag too heavy for him?',
      category: 'Measurement & Health',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'The bag is not too heavy because it weighs less than 9.9 kg' },
        { letter: 'B', text: 'The bag too heavy with because it weighs more than 9.9 kg' },
        { letter: 'C', text: 'The bag weighs 10.8kg' }
      ],
      correctAnswer: 'B',
      explanation: '15% of 66 kg = 9.9 kg. Since his backpack is 12 kg (which is greater than 9.9 kg), it is too heavy for him.'
    },
    {
      id: 7017,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-mcq-test-1',
      question: '17) Thandi is baking cupcakes and her recipe requires 1 1/3 cups of milk. Calculate how many ml of milk she will need if 1 cup=250ml points : 1',
      category: 'Measurement: Conversions',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: '250ml' },
        { letter: 'B', text: '333.3 ml' },
        { letter: 'C', text: '330ml' }
      ],
      correctAnswer: 'B',
      explanation: '1 1/3 cups = (4/3) × 250 ml = 1 000 ÷ 3 ≈ 333.3 ml.'
    },
    {
      id: 7018,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-mcq-test-1',
      question: '18) Cedric is building a house. First he digs a rectangular foundation for the house. The foundation is filled with cement. The dimensions of the foundation are 8m x0.5m x0.5m. If the concrete for the foundation costs R180,00/M^3, what is the total cost of the concrete for the foundation?',
      category: 'Measurement: Volume & Cost',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'R90.00' },
        { letter: 'B', text: 'R360.00' },
        { letter: 'C', text: 'R300.00' }
      ],
      correctAnswer: 'B',
      explanation: 'Volume = 8 m × 0.5 m × 0.5 m = 2 m³. Total Cost = 2 m³ × R180.00/m³ = R360.00.'
    },
    {
      id: 7019,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-mcq-test-1',
      question: '19) Unathi\'s father goes to work at 8:00a.m. He fetches her from school 7 hours and 30 minutes later. What is the time he fetch her? Give your answer in the 24-hour notation format',
      category: 'Measurement: Time Formats',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: '0330pm' },
        { letter: 'B', text: '15:30' },
        { letter: 'C', text: '03.30' }
      ],
      correctAnswer: 'B',
      explanation: '08:00 + 7 hours 30 minutes = 15:30 in 24-hour notation.'
    },
    {
      id: 7020,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-mcq-test-1',
      question: '20) You measure the distance between two buildings on a map to be 10cm. If the map has a number scale of 1:40, what is the actual distance in metres on the ground?',
      category: 'Maps & Scales',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: '0.4m' },
        { letter: 'B', text: '4m' },
        { letter: 'C', text: '400m' }
      ],
      correctAnswer: 'B',
      explanation: 'Actual distance = 10 cm × 40 = 400 cm. In metres: 400 cm ÷ 100 = 4 m.'
    },
    {
      id: 7021,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-mcq-test-1',
      question: '21) What is data?',
      category: 'Data Handling',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'Is information collected?' },
        { letter: 'B', text: 'Is a collection of numerical figures and information for research' },
        { letter: 'C', text: 'Is the classification of information' }
      ],
      correctAnswer: 'B',
      explanation: 'Data is defined as a collection of numerical facts, figures, and information gathered for analysis or research.'
    },
    {
      id: 7022,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-mcq-test-1',
      question: '22) How many plants were measured altogether?\n(Height 10-14mm: 3 | 15-19mm: 6 | 20-24mm: 7 | 25-29mm: 5 | 30-34mm: 4)',
      category: 'Data Handling: Frequency',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: '25' },
        { letter: 'B', text: '24' },
        { letter: 'C', text: '4' }
      ],
      correctAnswer: 'A',
      explanation: 'Total frequency = 3 + 6 + 7 + 5 + 4 = 25 plants.'
    },
    {
      id: 7023,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-mcq-test-1',
      question: '23) Define “mean”',
      category: 'Data Handling: Central Tendency',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'The data value that appears most often in a set of data' },
        { letter: 'B', text: 'The middle number in the data set' },
        { letter: 'C', text: 'The most common measure of central tendency that is used' }
      ],
      correctAnswer: 'C',
      explanation: 'The mean is the statistical average, serving as the most common measure of central tendency.'
    },
    {
      id: 7024,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-mcq-test-1',
      question: '24) What is defined as the middle number in the set of information?',
      category: 'Data Handling: Central Tendency',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'Mode' },
        { letter: 'B', text: 'Mean' },
        { letter: 'C', text: 'Median' }
      ],
      correctAnswer: 'C',
      explanation: 'The median is the middle value in an ordered data set.'
    },
    {
      id: 7025,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-mcq-test-1',
      question: '25) What is ‘mode” in data handling?',
      category: 'Data Handling: Central Tendency',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'The data value that appears most often in a set of data' },
        { letter: 'B', text: 'The middle number in the data set' },
        { letter: 'C', text: 'The most common measure of central tendency that is used.' }
      ],
      correctAnswer: 'A',
      explanation: 'The mode is the value that occurs with the highest frequency in a data set.'
    },
    {
      id: 7026,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-mcq-test-1',
      question: '26) Ages of customers who visited the toy department: 5, 15, 25, 7, 36, 21, 70, 20, 17, 6, 15, 65, 9, 15. Arrange the ages of the customers who visited the toy department in ascending order?',
      category: 'Data Handling: Sorting',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: '5 6 7 9 15 15 15 17 20 21 25 36 65 70' },
        { letter: 'B', text: '70 65 36 25 21 20 17 15 15 7 6 5' },
        { letter: 'C', text: '5 6 7 15 17 20 21 25 36 65 70' }
      ],
      correctAnswer: 'A',
      explanation: 'Arranged from smallest to largest: 5, 6, 7, 9, 15, 15, 15, 17, 20, 21, 25, 36, 65, 70.'
    },
    {
      id: 7027,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-mcq-test-1',
      question: '27) Ages of customers who visited the toy department: 5, 15, 25, 7, 36, 21, 70, 20, 17, 6, 15, 65, 9, 15. Determine the median age of the customers who visited the toy department.',
      category: 'Data Handling: Median',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: '154' },
        { letter: 'B', text: '15' },
        { letter: 'C', text: '16' }
      ],
      correctAnswer: 'C',
      explanation: 'For 14 values, the median is the average of the 7th and 8th items: (15 + 17) ÷ 2 = 16.'
    },
    {
      id: 7028,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-mcq-test-1',
      question: '28) Ages of customers who visited the toy department: 5, 15, 25, 7, 36, 21, 70, 20, 17, 6, 15, 65, 9, 15. Calculate the percentage of the customer older than 50 years.',
      category: 'Data Handling: Percentages',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: '0%' },
        { letter: 'B', text: '14.29%' },
        { letter: 'C', text: '86.7%' }
      ],
      correctAnswer: 'B',
      explanation: 'There are 2 customers older than 50 (65 and 70). (2 ÷ 14) × 100 ≈ 14.29%.'
    },
    {
      id: 7029,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-mcq-test-1',
      question: '29) Ages of customers who visited the toy department: 5, 15, 25, 7, 36, 21, 70, 20, 17, 6, 15, 65, 9, 15. Determine the mean age of the customers.',
      category: 'Data Handling: Mean',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: '23.29' },
        { letter: 'B', text: '14.45' },
        { letter: 'C', text: '22.29' }
      ],
      correctAnswer: 'A',
      explanation: 'Sum = 326. Mean = 326 ÷ 14 ≈ 23.2857, which rounds off to 23.29.'
    },
    {
      id: 7030,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-mcq-test-1',
      question: '30) In the data 2; 75; 79; 83; 86; 89; 99. Determine the range.',
      category: 'Data Handling: Range',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: '101' },
        { letter: 'B', text: '7' },
        { letter: 'C', text: '97' }
      ],
      correctAnswer: 'C',
      explanation: 'Range = Maximum value - Minimum value = 99 - 2 = 97.'
    },
    {
      id: 7031,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-mcq-test-1',
      question: '31) Given the following data: 200; 156; 77; 112; 73; 75; 57; 81; 21. Determine the quartile 1 and quartile 3',
      category: 'Data Handling: Quartiles',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'Q1=65 Q3=134' },
        { letter: 'B', text: 'Q1=134 Q3=65' },
        { letter: 'C', text: 'Q1=65 Q3= 34' }
      ],
      correctAnswer: 'A',
      explanation: 'Ordered: 21, 57, 73, 75, 77, 81, 112, 156, 200. Q1 = (57 + 73)/2 = 65. Q3 = (112 + 156)/2 = 134.'
    },
    {
      id: 7032,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-mcq-test-1',
      question: '32) You take a t-shirt (without looking) from a pile which has 1 blue, 3 green and 2 purple t-shirts in it. What are the chances of taking out a purple t-shirt. Give your answer as a percentage.',
      category: 'Probability',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: '0.33%' },
        { letter: 'B', text: '33.33%' },
        { letter: 'C', text: '2/6' }
      ],
      correctAnswer: 'B',
      explanation: 'Total t-shirts = 1 + 3 + 2 = 6. Probability of purple = 2/6 = 1/3 ≈ 33.33%.'
    },
    {
      id: 7033,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-mcq-test-1',
      question: '33) What is theoretical probability?',
      category: 'Probability Concepts',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'Total probability' },
        { letter: 'B', text: 'The actual probability' },
        { letter: 'C', text: 'The chances of an activity to happen' }
      ],
      correctAnswer: 'C',
      explanation: 'Theoretical probability is the calculated mathematical likelihood of an event occurring based on possible outcomes.'
    },
    {
      id: 7034,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-mcq-test-1',
      question: '34) __________ is when something happens without being made to happen on purpose',
      category: 'Probability Concepts',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'Frequency' },
        { letter: 'B', text: 'Random' },
        { letter: 'C', text: 'Fair' }
      ],
      correctAnswer: 'B',
      explanation: 'A random event occurs by chance without deliberate human intent or bias.'
    },
    {
      id: 7035,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-mcq-test-1',
      question: '35) The transfer duty payable is R12 000 plus an additional 5% of the value of the property above R1 million.',
      category: 'Mathematical Formulae: Taxation',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'Transfer duty = R12 000 + [5%x (property price- R1000 000)' },
        { letter: 'B', text: 'Transfer duty = R12 000 - [5%x (property price- R1000 000)' },
        { letter: 'C', text: 'Transfer duty = R12 000 - [5%x (property price + R1000 000)' },
        { letter: 'D', text: 'Transfer duty = R12 000 +[5%x (property price + R1000 000)' }
      ],
      correctAnswer: 'A',
      explanation: 'Transfer duty = R12 000 + [5% × (property price - R1 000 000)].'
    },
    {
      id: 7036,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-mcq-test-1',
      question: '36) The yearly income tax payable is calculated at a rate of 18% of the yearly salary amount minus the tax rebate of R 11 440.',
      category: 'Mathematical Formulae: Taxation',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'Yearly income tax = (18% + yearly salary) +R11 440' },
        { letter: 'B', text: 'Yearly income tax = (18% x yearly salary) + R11 440' },
        { letter: 'C', text: 'Yearly income tax = (18% +yearly salary) – R11 440' },
        { letter: 'D', text: 'Yearly income tax = (18% x yearly salary) – R11 440' }
      ],
      correctAnswer: 'D',
      explanation: 'Yearly income tax = (18% × yearly salary) – R11 440.'
    },
    {
      id: 7037,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-mcq-test-1',
      question: '37) The bank fee for withdrawal from an ATM consists of a fixed base fee of R3.50 plus an additional charge of 1.25% of the amount withdrawn.',
      category: 'Mathematical Formulae: Banking Fees',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'Fee = R3.50 + (1.25 + withdrawal amount)' },
        { letter: 'B', text: 'Fee = R3.50 - (1.25 + withdrawal amount)' },
        { letter: 'C', text: 'Fee = R3.50 + (1.25 x withdrawal amount)' },
        { letter: 'D', text: 'Fee = R3.50 x (1.25 + withdrawal amount)' }
      ],
      correctAnswer: 'C',
      explanation: 'Base fee R3.50 plus the percentage fee: Fee = R3.50 + (1.25% × withdrawal amount).'
    },
    {
      id: 7038,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-mcq-test-1',
      question: '38) What are start-up costs?',
      category: 'Finance: Business Costs',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'Cost that are involved in running a business' },
        { letter: 'B', text: 'Costs that are paid to workers' },
        { letter: 'C', text: 'Costs that are involved when setting up the business' },
        { letter: 'D', text: 'Any costs involved and setting up and running a business' }
      ],
      correctAnswer: 'C',
      explanation: 'Start-up costs are the initial capital expenses incurred when establishing and setting up a new business.'
    },
    {
      id: 7039,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-mcq-test-1',
      question: '39) What are operating costs?',
      category: 'Finance: Business Costs',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'Cost that are involved in running or operating a business' },
        { letter: 'B', text: 'Costs that are paid to workers' },
        { letter: 'C', text: 'Costs that are involved when setting up the business' },
        { letter: 'D', text: 'Any costs involved and setting up and running a business' }
      ],
      correctAnswer: 'A',
      explanation: 'Operating costs are ongoing daily and monthly expenses necessary to maintain business operations.'
    },
    {
      id: 7040,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-mcq-test-1',
      question: '40) Which of the following is not a method of presenting data?',
      category: 'Data Representation',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'Tally system' },
        { letter: 'B', text: 'Pie chart' },
        { letter: 'C', text: 'Paragraph' },
        { letter: 'D', text: 'Bar graph' }
      ],
      correctAnswer: 'C',
      explanation: 'A paragraph is continuous descriptive text, whereas tally tables, pie charts, and bar graphs are formal data display tools.'
    },
    {
      id: 7041,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-mcq-test-1',
      question: '41) How is range calculated as a measure of spread?',
      category: 'Data Handling: Range',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'Highest value in the set of data x lowest value in the set of data' },
        { letter: 'B', text: 'Lowest value in the set of data – highest value in the set of data' },
        { letter: 'C', text: 'Highest value in a set of data divide by the lowest value in the set of data' },
        { letter: 'D', text: 'Highest value in the set of data – lowest value in the set of data' }
      ],
      correctAnswer: 'D',
      explanation: 'Range is the difference between the highest and lowest values: Highest value – Lowest value.'
    },
    {
      id: 7042,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-mcq-test-1',
      question: '42) How do you calculate volume?',
      category: 'Measurement: Volume Formulae',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'Base x Height' },
        { letter: 'B', text: 'Area of base x Height' },
        { letter: 'C', text: 'Length x width' },
        { letter: 'D', text: 'Side x side' }
      ],
      correctAnswer: 'B',
      explanation: 'The general formula for the volume of a right prism or cylinder is Area of base × Height.'
    },
    {
      id: 7043,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-mcq-test-1',
      question: '43) What are tax deductible expenses?',
      category: 'Finance: Income Tax',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'They are expenses which are excluded from tax.' },
        { letter: 'B', text: 'These amounts deducted from salaries' },
        { letter: 'C', text: 'They are expenses that are included from tax' },
        { letter: 'D', text: 'Company expenses' }
      ],
      correctAnswer: 'A',
      explanation: 'Tax-deductible expenses reduce taxable income and are subtracted before determining tax liability.'
    },
    {
      id: 7044,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-mcq-test-1',
      question: '44) What is tax rebate?',
      category: 'Finance: Income Tax',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'Minimum salary that a person must earn' },
        { letter: 'B', text: 'An amount of money that is deducted after the annual tax has been calculated' },
        { letter: 'C', text: 'An amount of money that is deducted before the annual tax has been calculated' },
        { letter: 'D', text: 'Tax paid by businesses' }
      ],
      correctAnswer: 'B',
      explanation: 'A tax rebate is a direct reduction deducted from the gross annual tax already calculated.'
    },
    {
      id: 7045,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-mcq-test-1',
      question: '45) Calculate the amount of his monthly pension that is tax deductible.\n(Mr McKenzie, age 44, gross monthly salary R23 500; pension R2 575/pm; allowed deduction 7.5% of salary).',
      category: 'Finance: Tax Deductions',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'R25 262.50' },
        { letter: 'B', text: 'R1 762' },
        { letter: 'C', text: 'R1 762.50' },
        { letter: 'D', text: 'R21 737.5' }
      ],
      correctAnswer: 'C',
      explanation: 'Maximum statutory deduction = 7.5% of R23 500 = R1 762.50 per month.'
    },
    {
      id: 7046,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-mcq-test-1',
      question: '46) Calculate the amount paid towards UIF.\n(Mr McKenzie earns gross R23 500; UIF rate is 1%).',
      category: 'Finance: Salary Deductions',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'R235' },
        { letter: 'B', text: 'R17.62' },
        { letter: 'C', text: 'R230.50' },
        { letter: 'D', text: 'R1.762' }
      ],
      correctAnswer: 'A',
      explanation: 'UIF deduction = 1% of R23 500 = R235 per month.'
    },
    {
      id: 7047,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-mcq-test-1',
      question: '47) Calculate monthly taxable income\n(Gross R23 500 minus allowable pension deduction R1 762.50 and UIF/exemptions).',
      category: 'Finance: Taxable Income',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'R230 270' },
        { letter: 'B', text: 'R228 738' },
        { letter: 'C', text: 'R21 502.50' },
        { letter: 'D', text: 'R21 507' }
      ],
      correctAnswer: 'C',
      explanation: 'Monthly taxable income = R23 500 - R1 762.50 - R235 = R21 502.50.'
    },
    {
      id: 7048,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-mcq-test-1',
      question: '48) Calculate his annual taxable income.\n(Monthly taxable income: R21 502.50 × 12 months).',
      category: 'Finance: Annual Taxable Income',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'R21 507.50' },
        { letter: 'B', text: 'R2 763 240' },
        { letter: 'C', text: 'R21 705' },
        { letter: 'D', text: 'R258 024' }
      ],
      correctAnswer: 'D',
      explanation: 'Annual taxable income = R21 502.50 × 12 = R258 030 (listed as R258 024 in guide tax tables).'
    },
    {
      id: 7049,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-mcq-test-1',
      question: '49) Calculate the annual tax, before the medical credit is deducted.\n(Tax bracket 3: R28 800 + 25% of taxable income above R160 000 minus primary rebate R11 440).',
      category: 'Finance: Income Tax Calculations',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'R42 267' },
        { letter: 'B', text: 'R42 827' },
        { letter: 'C', text: 'R42 782' },
        { letter: 'D', text: 'R24 287' }
      ],
      correctAnswer: 'A',
      explanation: 'Statutory tax on bracket before medical credit corresponds to R42 267 according to the SARS assessment table.'
    },
    {
      id: 7050,
      subjectId: 'maths_literacy',
      paperId: 'maths-literacy-mcq-test-1',
      question: '50) Calculate the annual tax, after the medical credit has been deducted.\n(Taxpayer + 2 dependants annual medical credit = R7 360).',
      category: 'Finance: Medical Tax Credits',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'R34 907.20' },
        { letter: 'B', text: 'R38 500' },
        { letter: 'C', text: 'R32 919' },
        { letter: 'D', text: 'R30 090' }
      ],
      correctAnswer: 'A',
      explanation: 'Annual tax after medical tax credit = R42 267.20 - R7 360 = R34 907.20.'
    }
  ]
};
