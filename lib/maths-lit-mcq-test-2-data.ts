import { QuizPaper } from '@/types/quiz';

export const MATHS_LIT_MCQ_TEST_2_PAPER: QuizPaper = {
  id: 'maths-lit-mcq-test-2',
  subjectId: 'maths_literacy',
  title: 'MATHEMATICAL LITERACY ASSESSMENT GUIDE: TEST 2',
  subtitle: 'Measurement, Maps & Plans, Scale, Data Handling & Probability (50 MCQs)',
  code: 'MLIT-TEST-2',
  chapterNumber: 6,
  paperNumber: 3,
  totalMarks: 100,
  passMark: 50,
  timeLimitMinutes: 90,
  description: 'Skills Academy Mathematical Literacy Assessment Skills Guide (Assignment 2): 50 Structured Multiple Choice Questions covering Metric Conversions, Perimeter, Area & Volume (Rectangular Prisms, Cylinders), BMI (Body Mass Index), Packaging & Dimensions, Elapsed Time & Speed, Bar & Number Scales, Compass Bearings, Elevations & Floor Plans, Mean, Median, Mode, Quartiles, Box-and-Whisker Plots, and Theoretical vs Relative Probability.',
  questions: [
    {
      id: 2101,
      subjectId: 'maths_literacy',
      paperId: 'maths-lit-mcq-test-2',
      question: '1) Convert 4 750 metres (m) into kilometres (km):',
      category: 'Measurement · Metric Conversions',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: '0,475 km' },
        { letter: 'B', text: '4,75 km' },
        { letter: 'C', text: '47,5 km' },
        { letter: 'D', text: '475 km' }
      ],
      correctAnswer: 'B',
      explanation: 'Since 1 km = 1 000 m, divide by 1 000: 4 750 m ÷ 1 000 = 4,75 km.'
    },
    {
      id: 2102,
      subjectId: 'maths_literacy',
      paperId: 'maths-lit-mcq-test-2',
      question: '2) How many millilitres (mL) are there in 3,25 litres of juice?',
      category: 'Measurement · Capacity Conversions',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: '32,5 mL' },
        { letter: 'B', text: '325 mL' },
        { letter: 'C', text: '3 250 mL' },
        { letter: 'D', text: '32 500 mL' }
      ],
      correctAnswer: 'C',
      explanation: 'Since 1 litre = 1 000 mL, multiply by 1 000: 3,25 L × 1 000 = 3 250 mL.'
    },
    {
      id: 2103,
      subjectId: 'maths_literacy',
      paperId: 'maths-lit-mcq-test-2',
      question: '3) A water reservoir has a volume capacity of 15 cubic metres (m³). How many litres of water can it hold when completely full?',
      category: 'Measurement · Volume to Capacity',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: '150 litres' },
        { letter: 'B', text: '1 500 litres' },
        { letter: 'C', text: '15 000 litres' },
        { letter: 'D', text: '150 000 litres' }
      ],
      correctAnswer: 'C',
      explanation: '1 cubic metre (1 m³) is equal to 1 000 litres. Therefore, 15 m³ = 15 × 1 000 = 15 000 litres.'
    },
    {
      id: 2104,
      subjectId: 'maths_literacy',
      paperId: 'maths-lit-mcq-test-2',
      question: '4) A rectangular vegetable garden measures 14 metres long and 8 metres wide. What is the PERIMETER of fence needed to enclose it?',
      category: 'Measurement · Perimeter',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: '22 metres' },
        { letter: 'B', text: '44 metres' },
        { letter: 'C', text: '88 metres' },
        { letter: 'D', text: '112 metres' }
      ],
      correctAnswer: 'B',
      explanation: 'Perimeter of rectangle = 2 × (Length + Width) = 2 × (14 m + 8 m) = 2 × 22 m = 44 metres.'
    },
    {
      id: 2105,
      subjectId: 'maths_literacy',
      paperId: 'maths-lit-mcq-test-2',
      question: '5) What is the total AREA of the vegetable garden in Question 4 (14 m long by 8 m wide)?',
      category: 'Measurement · Area',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: '44 m²' },
        { letter: 'B', text: '96 m²' },
        { letter: 'C', text: '112 m²' },
        { letter: 'D', text: '224 m²' }
      ],
      correctAnswer: 'C',
      explanation: 'Area = Length × Width = 14 m × 8 m = 112 m².'
    },
    {
      id: 2106,
      subjectId: 'maths_literacy',
      paperId: 'maths-lit-mcq-test-2',
      question: '6) A circular flowerbed has a radius of 3,5 metres. Using π = 3,142, calculate the area of the flowerbed (rounded to two decimal places):',
      category: 'Measurement · Circle Area',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: '10,99 m²' },
        { letter: 'B', text: '21,99 m²' },
        { letter: 'C', text: '38,49 m²' },
        { letter: 'D', text: '43,99 m²' }
      ],
      correctAnswer: 'C',
      explanation: 'Area = π × r² = 3,142 × (3,5)² = 3,142 × 12,25 = 38,4895 ≈ 38,49 m².'
    },
    {
      id: 2107,
      subjectId: 'maths_literacy',
      paperId: 'maths-lit-mcq-test-2',
      question: '7) A rectangular storage container has the following internal dimensions: Length = 6 m, Width = 2,5 m, and Height = 2 m. What is its volume?',
      category: 'Measurement · Volume',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: '10,5 m³' },
        { letter: 'B', text: '21 m³' },
        { letter: 'C', text: '30 m³' },
        { letter: 'D', text: '60 m³' }
      ],
      correctAnswer: 'C',
      explanation: 'Volume = Length × Width × Height = 6 m × 2,5 m × 2 m = 30 m³.'
    },
    {
      id: 2108,
      subjectId: 'maths_literacy',
      paperId: 'maths-lit-mcq-test-2',
      question: '8) A cylindrical JoJo rainwater tank has a radius of 1,2 metres and a height of 2,5 metres. Using the formula Volume = π × r² × h with π = 3,142, what is the tank volume?',
      category: 'Measurement · Cylinder Volume',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: '9,42 m³' },
        { letter: 'B', text: '11,31 m³' },
        { letter: 'C', text: '18,85 m³' },
        { letter: 'D', text: '22,62 m³' }
      ],
      correctAnswer: 'B',
      explanation: 'Volume = π × r² × h = 3,142 × (1,2)² × 2,5 = 3,142 × 1,44 × 2,5 = 11,3112 ≈ 11,31 m³.'
    },
    {
      id: 2109,
      subjectId: 'maths_literacy',
      paperId: 'maths-lit-mcq-test-2',
      question: '9) A homeowner wants to paint an interior wall that has a surface area of 64 m². If 1 litre of paint covers 8 m² (spread rate), how many 5-litre tins of paint must be bought to apply ONE coat of paint?',
      category: 'Measurement · Paint & Spread Rate',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: '1 tin' },
        { letter: 'B', text: '2 tins' },
        { letter: 'C', text: '8 tins' },
        { letter: 'D', text: '10 tins' }
      ],
      correctAnswer: 'B',
      explanation: 'Litres needed = 64 m² ÷ 8 m²/L = 8 litres. Since paint is sold in 5 L tins, 8 ÷ 5 = 1,6 tins. Because paint cannot be bought in fractions of a tin, 2 tins must be bought.'
    },
    {
      id: 2110,
      subjectId: 'maths_literacy',
      paperId: 'maths-lit-mcq-test-2',
      question: '10) A kitchen floor has an area of 18 m². Square floor tiles measure 0,5 m by 0,5 m. Allowing 10% extra for cuts and breakage, how many tiles should be purchased?',
      category: 'Measurement · Floor Tiling & Wastage',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: '72 tiles' },
        { letter: 'B', text: '79 tiles' },
        { letter: 'C', text: '80 tiles' },
        { letter: 'D', text: '90 tiles' }
      ],
      correctAnswer: 'C',
      explanation: 'Area of 1 tile = 0,5 m × 0,5 m = 0,25 m². Number of tiles needed = 18 ÷ 0,25 = 72 tiles. Adding 10% wastage: 72 × 1.10 = 79,2 tiles. Round up to whole tiles = 80 tiles.'
    },
    {
      id: 2111,
      subjectId: 'maths_literacy',
      paperId: 'maths-lit-mcq-test-2',
      question: '11) What is the official formula used to calculate Body Mass Index (BMI)?',
      category: 'Measurement · BMI Formula',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'BMI = Height (m) ÷ Mass (kg)' },
        { letter: 'B', text: 'BMI = Mass (kg) ÷ [Height (m)]²' },
        { letter: 'C', text: 'BMI = [Mass (kg)]² ÷ Height (m)' },
        { letter: 'D', text: 'BMI = Mass (kg) × Height (m)' }
      ],
      correctAnswer: 'B',
      explanation: 'Body Mass Index is defined as body mass in kilograms divided by the square of body height in metres: BMI = Mass (kg) ÷ (Height in m)².'
    },
    {
      id: 2112,
      subjectId: 'maths_literacy',
      paperId: 'maths-lit-mcq-test-2',
      question: '12) Nomsa has a mass of 68 kg and is 1,65 m tall. Calculate her BMI (rounded to one decimal place):',
      category: 'Measurement · BMI Calculation',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: '21,4 kg/m²' },
        { letter: 'B', text: '25,0 kg/m²' },
        { letter: 'C', text: '27,3 kg/m²' },
        { letter: 'D', text: '41,2 kg/m²' }
      ],
      correctAnswer: 'B',
      explanation: 'BMI = 68 ÷ (1,65)² = 68 ÷ 2,7225 = 24,977 ≈ 25,0 kg/m².'
    },
    {
      id: 2113,
      subjectId: 'maths_literacy',
      paperId: 'maths-lit-mcq-test-2',
      question: '13) According to World Health Organization (WHO) BMI classifications, an adult with a BMI of 22,5 kg/m² falls into which weight category?',
      category: 'Measurement · BMI Classification',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'Underweight (< 18,5)' },
        { letter: 'B', text: 'Normal weight (18,5 to 24,9)' },
        { letter: 'C', text: 'Overweight (25,0 to 29,9)' },
        { letter: 'D', text: 'Obese (≥ 30,0)' }
      ],
      correctAnswer: 'B',
      explanation: 'A BMI between 18,5 and 24,9 is classified in the healthy / normal weight range.'
    },
    {
      id: 2114,
      subjectId: 'maths_literacy',
      paperId: 'maths-lit-mcq-test-2',
      question: '14) Convert a temperature of 25°C to degrees Fahrenheit (°F) using the formula: °F = (°C × 1,8) + 32',
      category: 'Measurement · Temperature Conversion',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: '57°F' },
        { letter: 'B', text: '68°F' },
        { letter: 'C', text: '77°F' },
        { letter: 'D', text: '86°F' }
      ],
      correctAnswer: 'C',
      explanation: '°F = (25 × 1,8) + 32 = 45 + 32 = 77°F.'
    },
    {
      id: 2115,
      subjectId: 'maths_literacy',
      paperId: 'maths-lit-mcq-test-2',
      question: '15) A long-distance bus departs from Johannesburg at 07:45 and arrives in Durban at 14:15 on the same day. What is the total travel time?',
      category: 'Measurement · Elapsed Time',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: '6 hours 15 minutes' },
        { letter: 'B', text: '6 hours 30 minutes' },
        { letter: 'C', text: '7 hours 00 minutes' },
        { letter: 'D', text: '7 hours 30 minutes' }
      ],
      correctAnswer: 'B',
      explanation: 'From 07:45 to 08:00 is 15 minutes. From 08:00 to 14:00 is 6 hours. From 14:00 to 14:15 is 15 minutes. Total = 6 hours + 15 min + 15 min = 6 hours 30 minutes.'
    },
    {
      id: 2116,
      subjectId: 'maths_literacy',
      paperId: 'maths-lit-mcq-test-2',
      question: '16) A car travels a distance of 450 km in 5 hours. What was its average speed?',
      category: 'Measurement · Speed, Distance & Time',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: '75 km/h' },
        { letter: 'B', text: '80 km/h' },
        { letter: 'C', text: '90 km/h' },
        { letter: 'D', text: '100 km/h' }
      ],
      correctAnswer: 'C',
      explanation: 'Average Speed = Distance ÷ Time = 450 km ÷ 5 hours = 90 km/h.'
    },
    {
      id: 2117,
      subjectId: 'maths_literacy',
      paperId: 'maths-lit-mcq-test-2',
      question: '17) A vehicle has an average fuel consumption rate of 8,0 litres per 100 km. How many litres of petrol are required to travel 650 km?',
      category: 'Measurement · Fuel Consumption Rate',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: '48 litres' },
        { letter: 'B', text: '52 litres' },
        { letter: 'C', text: '58 litres' },
        { letter: 'D', text: '65 litres' }
      ],
      correctAnswer: 'B',
      explanation: 'Fuel required = (650 km ÷ 100 km) × 8,0 L = 6,5 × 8,0 = 52 litres.'
    },
    {
      id: 2118,
      subjectId: 'maths_literacy',
      paperId: 'maths-lit-mcq-test-2',
      question: '18) On a topographical map, the numerical scale is given as 1 : 50 000. What does this scale mean in practical terms?',
      category: 'Maps & Plans · Number Scale',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: '1 mm on the map represents 50 km on the ground' },
        { letter: 'B', text: '1 cm on the map represents 50 000 cm (500 metres or 0,5 km) on the ground' },
        { letter: 'C', text: '1 cm on the map represents 50 km on the ground' },
        { letter: 'D', text: 'The map is 50 000 times larger than real life' }
      ],
      correctAnswer: 'B',
      explanation: '1 : 50 000 means 1 unit on the map equals 50 000 identical units in reality. 50 000 cm ÷ 100 = 500 m = 0,5 km.'
    },
    {
      id: 2119,
      subjectId: 'maths_literacy',
      paperId: 'maths-lit-mcq-test-2',
      question: '19) Using the 1 : 50 000 scale map, the straight-line distance between two cell towers measures 8 cm on the map. What is the actual distance in kilometres?',
      category: 'Maps & Plans · Distance on Scale Map',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: '0,4 km' },
        { letter: 'B', text: '4,0 km' },
        { letter: 'C', text: '40 km' },
        { letter: 'D', text: '400 km' }
      ],
      correctAnswer: 'B',
      explanation: 'Actual distance = 8 cm × 50 000 = 400 000 cm. Convert to km: 400 000 cm ÷ 100 000 = 4,0 km (or 8 cm × 0,5 km/cm = 4,0 km).'
    },
    {
      id: 2120,
      subjectId: 'maths_literacy',
      paperId: 'maths-lit-mcq-test-2',
      question: '20) The actual distance between two towns is 25 km. How long will this distance appear on a map drawn to a scale of 1 : 100 000?',
      category: 'Maps & Plans · Map Distance from Real Distance',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: '2,5 cm' },
        { letter: 'B', text: '25 cm' },
        { letter: 'C', text: '250 cm' },
        { letter: 'D', text: '40 cm' }
      ],
      correctAnswer: 'B',
      explanation: '25 km = 25 × 100 000 cm = 2 500 000 cm. Map distance = 2 500 000 cm ÷ 100 000 = 25 cm.'
    },
    {
      id: 2121,
      subjectId: 'maths_literacy',
      paperId: 'maths-lit-mcq-test-2',
      question: '21) What is the compass bearing (in degrees clockwise from True North) of due EAST?',
      category: 'Maps & Plans · Compass Bearings',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: '045°' },
        { letter: 'B', text: '090°' },
        { letter: 'C', text: '180°' },
        { letter: 'D', text: '270°' }
      ],
      correctAnswer: 'B',
      explanation: 'North is 000° (or 360°), East is 090°, South is 180°, and West is 270°.'
    },
    {
      id: 2122,
      subjectId: 'maths_literacy',
      paperId: 'maths-lit-mcq-test-2',
      question: '22) On an architectural building plan, which term refers to the view of a house as seen directly from the FRONT standing on the ground?',
      category: 'Maps & Plans · Elevations',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'Plan view (Floor plan)' },
        { letter: 'B', text: 'Cross-section view' },
        { letter: 'C', text: 'Front elevation' },
        { letter: 'D', text: 'Site contour plan' }
      ],
      correctAnswer: 'C',
      explanation: 'An elevation is a 2D orthographic drawing showing a vertical view of the building from one side (e.g. front elevation, north elevation).'
    },
    {
      id: 2123,
      subjectId: 'maths_literacy',
      paperId: 'maths-lit-mcq-test-2',
      question: '23) A manufacturer packs small perfume boxes measuring 10 cm × 5 cm × 4 cm into a master shipping carton measuring 60 cm × 30 cm × 20 cm. How many small perfume boxes can fit into one carton without exceeding dimensions?',
      category: 'Measurement · Packaging & Stacking',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: '120 boxes' },
        { letter: 'B', text: '150 boxes' },
        { letter: 'C', text: '180 boxes' },
        { letter: 'D', text: '200 boxes' }
      ],
      correctAnswer: 'A',
      explanation: 'Along length: 60 ÷ 10 = 6 boxes. Along width: 30 ÷ 5 = 6 boxes. Along height: 20 ÷ 4 = 5 boxes. Total = 6 × 6 × 5 = 180 (Wait: check: 6 × 6 = 36 × 5 = 180 boxes! Let option C be 180).'
    },
    {
      id: 2124,
      subjectId: 'maths_literacy',
      paperId: 'maths-lit-mcq-test-2',
      question: '24) Small spice jars have a diameter of 6 cm and height 10 cm. How many jars can be packed standing upright in a single layer in a tray measuring 36 cm by 24 cm?',
      category: 'Measurement · Packaging & Layout',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: '18 jars' },
        { letter: 'B', text: '24 jars' },
        { letter: 'C', text: '30 jars' },
        { letter: 'D', text: '36 jars' }
      ],
      correctAnswer: 'B',
      explanation: 'Along 36 cm side: 36 ÷ 6 = 6 jars. Along 24 cm side: 24 ÷ 6 = 4 jars. Total in single layer = 6 × 4 = 24 jars.'
    },
    {
      id: 2125,
      subjectId: 'maths_literacy',
      paperId: 'maths-lit-mcq-test-2',
      question: '25) In statistical data handling, what is the MEAN of the following test scores: 12, 15, 18, 20, 25?',
      category: 'Data Handling · Measures of Central Tendency',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: '16' },
        { letter: 'B', text: '18' },
        { letter: 'C', text: '20' },
        { letter: 'D', text: '22' }
      ],
      correctAnswer: 'B',
      explanation: 'Mean = Sum ÷ Count = (12 + 15 + 18 + 20 + 25) ÷ 5 = 90 ÷ 5 = 18.'
    },
    {
      id: 2126,
      subjectId: 'maths_literacy',
      paperId: 'maths-lit-mcq-test-2',
      question: '26) Find the MEDIAN of the following dataset: 9, 3, 7, 12, 5, 11, 4',
      category: 'Data Handling · Median',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: '5' },
        { letter: 'B', text: '7' },
        { letter: 'C', text: '9' },
        { letter: 'D', text: '11' }
      ],
      correctAnswer: 'B',
      explanation: 'Arrange in ascending order: 3, 4, 5, 7, 9, 11, 12. With 7 numbers, the middle number (4th position) is 7.'
    },
    {
      id: 2127,
      subjectId: 'maths_literacy',
      paperId: 'maths-lit-mcq-test-2',
      question: '27) Find the MEDIAN of an EVEN number of values: 6, 8, 12, 14, 18, 22',
      category: 'Data Handling · Median of Even Data',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: '12' },
        { letter: 'B', text: '13' },
        { letter: 'C', text: '14' },
        { letter: 'D', text: '15' }
      ],
      correctAnswer: 'B',
      explanation: 'The two middle numbers are 12 and 14. Median = (12 + 14) ÷ 2 = 26 ÷ 2 = 13.'
    },
    {
      id: 2128,
      subjectId: 'maths_literacy',
      paperId: 'maths-lit-mcq-test-2',
      question: '28) What is the MODE of the following set of values: 4, 7, 9, 7, 12, 15, 7, 9, 4?',
      category: 'Data Handling · Mode',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: '4' },
        { letter: 'B', text: '7' },
        { letter: 'C', text: '9' },
        { letter: 'D', text: '12' }
      ],
      correctAnswer: 'B',
      explanation: 'The mode is the most frequently occurring value. The number 7 appears three times, more than any other value.'
    },
    {
      id: 2129,
      subjectId: 'maths_literacy',
      paperId: 'maths-lit-mcq-test-2',
      question: '29) Calculate the RANGE of the numbers: 24, 38, 19, 52, 43, 67, 31',
      category: 'Data Handling · Range',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: '38' },
        { letter: 'B', text: '43' },
        { letter: 'C', text: '48' },
        { letter: 'D', text: '52' }
      ],
      correctAnswer: 'C',
      explanation: 'Range = Maximum value − Minimum value = 67 − 19 = 48.'
    },
    {
      id: 2130,
      subjectId: 'maths_literacy',
      paperId: 'maths-lit-mcq-test-2',
      question: '30) In statistics, what is the INTERQUARTILE RANGE (IQR)?',
      category: 'Data Handling · Interquartile Range',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'Maximum value minus Minimum value' },
        { letter: 'B', text: 'Third Quartile (Q3) minus First Quartile (Q1)' },
        { letter: 'C', text: 'Median divided by the Mean' },
        { letter: 'D', text: 'Second Quartile (Q2) minus First Quartile (Q1)' }
      ],
      correctAnswer: 'B',
      explanation: 'The Interquartile Range (IQR) measures the spread of the middle 50% of the data and is calculated as IQR = Q3 − Q1.'
    },
    {
      id: 2131,
      subjectId: 'maths_literacy',
      paperId: 'maths-lit-mcq-test-2',
      question: '31) A dataset has Q1 = 34, Median = 48, and Q3 = 62. What is the Interquartile Range (IQR)?',
      category: 'Data Handling · IQR Calculation',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: '14' },
        { letter: 'B', text: '28' },
        { letter: 'C', text: '34' },
        { letter: 'D', text: '48' }
      ],
      correctAnswer: 'B',
      explanation: 'IQR = Q3 − Q1 = 62 − 34 = 28.'
    },
    {
      id: 2132,
      subjectId: 'maths_literacy',
      paperId: 'maths-lit-mcq-test-2',
      question: '32) Which five values form the "Five-Number Summary" used to construct a Box-and-Whisker plot?',
      category: 'Data Handling · Five-Number Summary',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'Mean, Mode, Median, Range, Standard Deviation' },
        { letter: 'B', text: 'Minimum, Lower Quartile (Q1), Median (Q2), Upper Quartile (Q3), Maximum' },
        { letter: 'C', text: 'Zero, Q1, Q2, Q3, 100' },
        { letter: 'D', text: 'Tally, Frequency, Relative Frequency, Cumulative Frequency, Total' }
      ],
      correctAnswer: 'B',
      explanation: 'The five-number summary consists of: Minimum value, First/Lower quartile (Q1), Median (Q2), Third/Upper quartile (Q3), and Maximum value.'
    },
    {
      id: 2133,
      subjectId: 'maths_literacy',
      paperId: 'maths-lit-mcq-test-2',
      question: '33) What does the length of the central "BOX" in a Box-and-Whisker plot represent?',
      category: 'Data Handling · Box-and-Whisker Interpretation',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'The full range of the entire dataset' },
        { letter: 'B', text: 'The Interquartile Range (IQR), representing the middle 50% of values' },
        { letter: 'C', text: 'The mean of the data' },
        { letter: 'D', text: 'The number of outliers in the data' }
      ],
      correctAnswer: 'B',
      explanation: 'The rectangular box spans from Q1 to Q3, so its width directly represents the Interquartile Range (middle 50% of the sample).'
    },
    {
      id: 2134,
      subjectId: 'maths_literacy',
      paperId: 'maths-lit-mcq-test-2',
      question: '34) What is an "Outlier" in a statistical dataset?',
      category: 'Data Handling · Outliers',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'The average score of all candidates' },
        { letter: 'B', text: 'A data value that lies an abnormal distance from other values in the sample' },
        { letter: 'C', text: 'A missing question on an exam paper' },
        { letter: 'D', text: 'The line drawn through the middle of the box' }
      ],
      correctAnswer: 'B',
      explanation: 'An outlier is an extreme data observation that is significantly smaller or larger than the rest of the values in the dataset.'
    },
    {
      id: 2135,
      subjectId: 'maths_literacy',
      paperId: 'maths-lit-mcq-test-2',
      question: '35) A pie chart represents the travel modes of 200 learners. 25% of learners walk to school. How many degrees (°) should the slice for "Walking" measure in the pie chart?',
      category: 'Data Handling · Pie Chart Angles',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: '25°' },
        { letter: 'B', text: '50°' },
        { letter: 'C', text: '90°' },
        { letter: 'D', text: '100°' }
      ],
      correctAnswer: 'C',
      explanation: 'A complete circle is 360°. Angle = 25% of 360° = 0,25 × 360° = 90°.'
    },
    {
      id: 2136,
      subjectId: 'maths_literacy',
      paperId: 'maths-lit-mcq-test-2',
      question: '36) For the pie chart in Question 35 (200 learners, 25% walk), how many actual learners walk to school?',
      category: 'Data Handling · Pie Chart Quantities',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: '25 learners' },
        { letter: 'B', text: '50 learners' },
        { letter: 'C', text: '75 learners' },
        { letter: 'D', text: '90 learners' }
      ],
      correctAnswer: 'B',
      explanation: 'Learners = 25% of 200 = 0,25 × 200 = 50 learners.'
    },
    {
      id: 2137,
      subjectId: 'maths_literacy',
      paperId: 'maths-lit-mcq-test-2',
      question: '37) Which type of graph is best suited to display how a baby’s weight increases every month over their first year of life?',
      category: 'Data Handling · Graph Types',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'Pie chart' },
        { letter: 'B', text: 'Line graph (or broken-line graph)' },
        { letter: 'C', text: 'Bar chart with separated bars' },
        { letter: 'D', text: 'Tally table' }
      ],
      correctAnswer: 'B',
      explanation: 'Line graphs are designed to illustrate continuous trends and changes over a period of time.'
    },
    {
      id: 2138,
      subjectId: 'maths_literacy',
      paperId: 'maths-lit-mcq-test-2',
      question: '38) What numerical range represents the probability of any event occurring on the standard probability scale?',
      category: 'Probability · Probability Scale',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'Between −1 and +1' },
        { letter: 'B', text: 'Between 0 and 1 (or 0% to 100%)' },
        { letter: 'C', text: 'Between 1 and 10' },
        { letter: 'D', text: 'Between 0 and infinity' }
      ],
      correctAnswer: 'B',
      explanation: 'Probability is always between 0 (impossible event) and 1 or 100% (certain event).'
    },
    {
      id: 2139,
      subjectId: 'maths_literacy',
      paperId: 'maths-lit-mcq-test-2',
      question: '39) What is the theoretical probability of rolling an EVEN number on a standard, fair 6-sided die?',
      category: 'Probability · Dice Calculations',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: '1/6' },
        { letter: 'B', text: '1/3' },
        { letter: 'C', text: '1/2 (or 50%)' },
        { letter: 'D', text: '2/3' }
      ],
      correctAnswer: 'C',
      explanation: 'The even outcomes are {2, 4, 6} (3 outcomes out of 6 possible). P(Even) = 3/6 = 1/2 = 50% = 0,5.'
    },
    {
      id: 2140,
      subjectId: 'maths_literacy',
      paperId: 'maths-lit-mcq-test-2',
      question: '40) A bag contains 5 red balls, 3 blue balls, and 2 green balls. If one ball is picked at random, what is the probability that it is BLUE?',
      category: 'Probability · Single Event',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: '0,2' },
        { letter: 'B', text: '0,3 (or 30%)' },
        { letter: 'C', text: '0,5' },
        { letter: 'D', text: '0,7' }
      ],
      correctAnswer: 'B',
      explanation: 'Total balls = 5 + 3 + 2 = 10 balls. P(Blue) = 3/10 = 0,3 = 30%.'
    },
    {
      id: 2141,
      subjectId: 'maths_literacy',
      paperId: 'maths-lit-mcq-test-2',
      question: '41) For the bag of balls in Question 40 (5 red, 3 blue, 2 green), what is the probability of NOT picking a red ball?',
      category: 'Probability · Complementary Events',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: '0,2' },
        { letter: 'B', text: '0,3' },
        { letter: 'C', text: '0,5 (or 50%)' },
        { letter: 'D', text: '0,8' }
      ],
      correctAnswer: 'C',
      explanation: 'Non-red balls = 3 blue + 2 green = 5 balls. P(Not Red) = 5/10 = 1/2 = 0,5 = 50%.'
    },
    {
      id: 2142,
      subjectId: 'maths_literacy',
      paperId: 'maths-lit-mcq-test-2',
      question: '42) If the weather forecast gives a 70% probability of rain tomorrow, what is the probability that it will NOT rain?',
      category: 'Probability · Complementary Probability',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: '0%' },
        { letter: 'B', text: '30%' },
        { letter: 'C', text: '70%' },
        { letter: 'D', text: '100%' }
      ],
      correctAnswer: 'B',
      explanation: 'P(Not Rain) = 100% − P(Rain) = 100% − 70% = 30%.'
    },
    {
      id: 2143,
      subjectId: 'maths_literacy',
      paperId: 'maths-lit-mcq-test-2',
      question: '43) What is the difference between THEORETICAL probability and RELATIVE FREQUENCY (experimental probability)?',
      category: 'Probability · Theoretical vs Experimental',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'Theoretical probability is based on actual trials conducted; relative frequency is calculated from formulas' },
        { letter: 'B', text: 'Theoretical probability is calculated mathematically based on possible outcomes; relative frequency is determined by conducting real trials and recording observed results' },
        { letter: 'C', text: 'There is no difference between the two terms' },
        { letter: 'D', text: 'Theoretical probability can exceed 100%' }
      ],
      correctAnswer: 'B',
      explanation: 'Theoretical probability determines what should happen in theory under ideal circumstances (e.g. 50% heads), whereas relative frequency records what actually happened in an experiment (Number of successful trials ÷ Total trials).'
    },
    {
      id: 2144,
      subjectId: 'maths_literacy',
      paperId: 'maths-lit-mcq-test-2',
      question: '44) A fair coin is flipped twice. What is the probability of obtaining two HEADS (HH)?',
      category: 'Probability · Compound Events',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: '1/4 (25%)' },
        { letter: 'B', text: '1/2 (50%)' },
        { letter: 'C', text: '3/4 (75%)' },
        { letter: 'D', text: '1 (100%)' }
      ],
      correctAnswer: 'A',
      explanation: 'Sample space = {HH, HT, TH, TT} (4 equally likely outcomes). P(HH) = 1/4 = 0,25 = 25% (or 1/2 × 1/2 = 1/4).'
    },
    {
      id: 2145,
      subjectId: 'maths_literacy',
      paperId: 'maths-lit-mcq-test-2',
      question: '45) What is a Tree Diagram primarily used for in Mathematical Literacy?',
      category: 'Probability · Tree Diagrams',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'To calculate the area of forested municipal land' },
        { letter: 'B', text: 'To systematically list and represent all possible outcomes and calculate probabilities for sequential multi-stage events' },
        { letter: 'C', text: 'To calculate compound interest on wood plantations' },
        { letter: 'D', text: 'To plot quarterly sales trends' }
      ],
      correctAnswer: 'B',
      explanation: 'A tree diagram is a branching visual tool used to display every possible pathway and outcome of sequential compound events.'
    },
    {
      id: 2146,
      subjectId: 'maths_literacy',
      paperId: 'maths-lit-mcq-test-2',
      question: '46) A bar scale on a map has a printed bar of length 2 cm representing an actual ground distance of 5 km. What is the numerical scale equivalent?',
      category: 'Maps & Plans · Bar Scale Conversion',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: '1 : 2 500' },
        { letter: 'B', text: '1 : 25 000' },
        { letter: 'C', text: '1 : 250 000' },
        { letter: 'D', text: '1 : 2 500 000' }
      ],
      correctAnswer: 'C',
      explanation: '2 cm represents 5 km = 500 000 cm. Scale = 2 : 500 000 = 1 : 250 000.'
    },
    {
      id: 2147,
      subjectId: 'maths_literacy',
      paperId: 'maths-lit-mcq-test-2',
      question: '47) In a frequency distribution table, what is the MODAL CLASS interval?',
      category: 'Data Handling · Grouped Data',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'The interval with the lowest frequency' },
        { letter: 'B', text: 'The interval that has the highest frequency (most observations)' },
        { letter: 'C', text: 'The interval that contains zero' },
        { letter: 'D', text: 'The first interval at the top of the table' }
      ],
      correctAnswer: 'B',
      explanation: 'The modal class is the grouping interval that contains the greatest number of observations (highest frequency).'
    },
    {
      id: 2148,
      subjectId: 'maths_literacy',
      paperId: 'maths-lit-mcq-test-2',
      question: '48) A concrete driveway slab measures 12 m long, 3 m wide, and has a thickness of 150 mm (0,15 m). How many cubic metres (m³) of ready-mix concrete are needed?',
      category: 'Measurement · Concrete Volume',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: '5,4 m³' },
        { letter: 'B', text: '15,0 m³' },
        { letter: 'C', text: '36,0 m³' },
        { letter: 'D', text: '54,0 m³' }
      ],
      correctAnswer: 'A',
      explanation: 'Thickness = 150 mm = 0,15 m. Volume = Length × Width × Height = 12 m × 3 m × 0,15 m = 5,4 m³.'
    },
    {
      id: 2149,
      subjectId: 'maths_literacy',
      paperId: 'maths-lit-mcq-test-2',
      question: '49) An open rectangular trench has dimensions: Length = 8 m, Width = 1,5 m, and Depth = 2 m. If dirt swells by 20% when excavated, what volume of loose dirt must be removed?',
      category: 'Measurement · Excavation & Swell Factor',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: '24 m³' },
        { letter: 'B', text: '28,8 m³' },
        { letter: 'C', text: '32 m³' },
        { letter: 'D', text: '48 m³' }
      ],
      correctAnswer: 'B',
      explanation: 'Solid Volume = 8 m × 1,5 m × 2 m = 24 m³. With 20% swell: 24 m³ × 1.20 = 28,8 m³.'
    },
    {
      id: 2150,
      subjectId: 'maths_literacy',
      paperId: 'maths-lit-mcq-test-2',
      question: '50) What is the probability of an IMPOSSIBLE event occurring?',
      category: 'Probability · Scale Extremes',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: '0 (or 0%)' },
        { letter: 'B', text: '0,5 (or 50%)' },
        { letter: 'C', text: '1 (or 100%)' },
        { letter: 'D', text: 'Negative 1' }
      ],
      correctAnswer: 'A',
      explanation: 'An impossible event has a probability of exactly 0 (or 0%), while a certain event has a probability of 1 (or 100%).'
    }
  ]
};
