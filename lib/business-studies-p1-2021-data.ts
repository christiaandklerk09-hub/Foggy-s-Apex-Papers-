import { QuizPaper } from '@/types/quiz';

export const BUSINESS_STUDIES_P1_2021_PAPER: QuizPaper = {
  id: 'business-studies-p1-2021',
  subjectId: 'business_studies',
  title: 'NATIONAL SENIOR CERTIFICATE',
  subtitle: 'Business Studies P1 (2021)',
  code: 'BUS-P1-2021',
  chapterNumber: 1,
  paperNumber: 1,
  totalMarks: 150,
  passMark: 75,
  timeLimitMinutes: 120,
  description: 'Official DBE Grade 12 Senior Certificate / National Senior Certificate Business Studies Paper 1 (2021) examination. Contains Section A (Multiple choice for 1.1, Word bank for 1.2, Matching for 1.3), Section B (Direct/indirect questions, scenario quotations, analysis tables), and Section C (40-mark LASO essays).',
  questions: [
    // =========================================================================
    // SECTION A: OBJECTIVE-TYPE QUESTIONS (COMPULSORY) - 30 Marks
    // =========================================================================
    // 1.1 Multiple-Choice Questions (ONLY 1.1.1 to 1.1.5 have multiple choice options!)
    {
      id: 501,
      subjectId: 'business_studies',
      paperId: 'business-studies-p1-2021',
      question: '1.1.1 Cosmetics Ltd complied with the … by providing the same work opportunities for people who are physically challenged.',
      category: 'Section A · 1.1 Multiple Choice (Legislation)',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'Basic Conditions of Employment Act (BCEA), 1997 (Act 75 of 1997)' },
        { letter: 'B', text: 'Employment Equity Act (EEA), 1998 (Act 55 of 1998)' },
        { letter: 'C', text: 'Labour Relations Act (LRA), 1995 (Act 66 of 1995)' },
        { letter: 'D', text: 'Compensation for Occupational Injuries and Diseases Amendment Act (COIDA), 1997 (Act 61 of 1997)' }
      ],
      correctAnswer: 'B',
      explanation: 'B: The Employment Equity Act (EEA), 1998 (Act 55 of 1998) promotes equal opportunity and fair treatment in employment through the elimination of unfair discrimination and implements affirmative action for designated groups, including people who are physically challenged.'
    },
    {
      id: 502,
      subjectId: 'business_studies',
      paperId: 'business-studies-p1-2021',
      question: '1.1.2 Workers are entitled to a meal break of … minutes after five continuous hours of work.',
      category: 'Section A · 1.1 Multiple Choice (BCEA)',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: '90' },
        { letter: 'B', text: '45' },
        { letter: 'C', text: '60' },
        { letter: 'D', text: '15' }
      ],
      correctAnswer: 'C',
      explanation: 'C: Under Section 14 of the Basic Conditions of Employment Act (BCEA), workers are entitled to a continuous meal break of at least 60 minutes after five continuous hours of work.'
    },
    {
      id: 503,
      subjectId: 'business_studies',
      paperId: 'business-studies-p1-2021',
      question: '1.1.3 Businesses add unrelated products to their existing products which may appeal to new customers. This is an example of a … diversification strategy.',
      category: 'Section A · 1.1 Multiple Choice (Strategies)',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'conglomerate' },
        { letter: 'B', text: 'horizontal' },
        { letter: 'C', text: 'concentric' },
        { letter: 'D', text: 'diagonal' }
      ],
      correctAnswer: 'A',
      explanation: 'A: Conglomerate diversification occurs when a business introduces new, unrelated products or services aimed at appealing to new potential customers.'
    },
    {
      id: 504,
      subjectId: 'business_studies',
      paperId: 'business-studies-p1-2021',
      question: '1.1.4 Mano and Sons used the … recruitment method when they advertised a vacancy on their business noticeboard.',
      category: 'Section A · 1.1 Multiple Choice (Recruitment)',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'agencies' },
        { letter: 'B', text: 'online' },
        { letter: 'C', text: 'internal' },
        { letter: 'D', text: 'external' }
      ],
      correctAnswer: 'C',
      explanation: 'C: Advertising vacancies on staff noticeboards, internal circulars, or intranet emails is an internal recruitment method.'
    },
    {
      id: 505,
      subjectId: 'business_studies',
      paperId: 'business-studies-p1-2021',
      question: '1.1.5 The implementation of change on a wider scale by Themba Constructions is the … step of the PDCA model.',
      category: 'Section A · 1.1 Multiple Choice (TQM)',
      type: 'multiple-choice',
      marks: 2,
      options: [
        { letter: 'A', text: 'plan' },
        { letter: 'B', text: 'do' },
        { letter: 'C', text: 'check' },
        { letter: 'D', text: 'act' }
      ],
      correctAnswer: 'D',
      explanation: 'D: In the Deming PDCA model, \'Act\' is the step where improvements are implemented on a wider scale and standardized across the entire business.'
    },

    // 1.2 Word Bank Completion (NOT MULTIPLE CHOICE - Candidate types/selects from word list)
    {
      id: 506,
      subjectId: 'business_studies',
      paperId: 'business-studies-p1-2021',
      question: '1.2 Complete the following statements by using the word(s) provided in the list below. Write only the word(s) next to the question numbers (1.2.1 to 1.2.5) in the ANSWER BOOK.\n\n[learnership; some control; management; headhunting; internship; opportunity; performance; no control; strength; walk-ins]\n\n1.2.1 The owner of Luke Bed & Breakfast identified a/an … when Mandy Bed & Breakfast closed down.\n1.2.2 Businesses have … over the market environment.\n1.2.3 A/An … agreement includes practical work experience that can lead to a recognised occupational qualification.\n1.2.4 A well-experienced auditor from Zaks Consultants received an employment offer from Zizi\'s Consultants. This is known as …\n1.2.5 Adrian Manufacturers applied quality … when they measured the total output of each department against specified standards.',
      category: 'Section A · 1.2 Word Bank Completion',
      type: 'word_bank',
      marks: 10,
      correctAnswer: '1.2.1 opportunity; 1.2.2 some control; 1.2.3 learnership; 1.2.4 headhunting; 1.2.5 performance',
      explanation: 'DBE Marking Guidelines Solutions:\n• 1.2.1 = opportunity\n• 1.2.2 = some control\n• 1.2.3 = learnership\n• 1.2.4 = headhunting\n• 1.2.5 = performance'
    },

    // 1.3 Column A to Column B Matching (NOT MULTIPLE CHOICE - Candidate matches terms A-J)
    {
      id: 507,
      subjectId: 'business_studies',
      paperId: 'business-studies-p1-2021',
      question: '1.3 Choose a description from COLUMN B that matches a term in COLUMN A. Write only the letter (A–J) next to the question numbers (1.3.1 to 1.3.5) in the ANSWER BOOK.\n\nCOLUMN A:\n1.3.1 Overtime\n1.3.2 Skills development levy\n1.3.3 Screening\n1.3.4 Quality\n1.3.5 Dismissal\n\nCOLUMN B:\nA: termination of an employment contract due to restructuring\nB: number of goods and services that satisfy the needs of customers\nC: workers are allowed to work 11 hours per week outside their normal working hours\nD: employers and employees contribute 1% of their payroll to SARS to train employees\nE: candidates\' skills and abilities are matched with the requirements of the job\nF: workers are allowed to work three hours per day outside their normal working hours\nG: ability of goods to meet the specific needs of customers\nH: employers contribute 1% of their payroll to SARS to train employees\nI: candidates\' application forms are checked against the requirements of the job\nJ: termination of an employment contract due to misconduct',
      category: 'Section A · 1.3 Term Matching',
      type: 'matching',
      marks: 10,
      correctAnswer: '1.3.1 F; 1.3.2 H; 1.3.3 I; 1.3.4 G; 1.3.5 J',
      explanation: 'DBE Official Memo:\n• 1.3.1 Overtime = F (workers allowed max 3 hours/day overtime)\n• 1.3.2 Skills development levy = H (employers contribute 1% of payroll to SARS)\n• 1.3.3 Screening = I (candidates\' applications checked against job requirements)\n• 1.3.4 Quality = G (ability of goods to meet specific needs of customers)\n• 1.3.5 Dismissal = J (termination due to misconduct)'
    },

    // =========================================================================
    // SECTION B: QUESTION 2 — BUSINESS ENVIRONMENTS (40 Marks)
    // =========================================================================
    {
      id: 508,
      subjectId: 'business_studies',
      paperId: 'business-studies-p1-2021',
      question: '2.1 Name any TWO provisions of leave as stipulated in the Basic Conditions of Employment Act (BCEA), 1997 (Act 75 of 1997). (2 Marks)',
      category: 'Question 2 · BCEA Leave Provisions',
      type: 'text',
      marks: 2,
      correctAnswer: 'Annual leave, Sick leave, Maternity leave, Parental leave, Family responsibility leave',
      explanation: 'Provisions of leave under the BCEA (mark any two):\n- Annual leave (21 consecutive days)\n- Sick leave (30 or 36 days in 3-year cycle)\n- Maternity leave (4 consecutive months)\n- Parental leave (10 consecutive days)\n- Family responsibility leave (3 to 5 days)'
    },
    {
      id: 509,
      subjectId: 'business_studies',
      paperId: 'business-studies-p1-2021',
      question: '2.2 Outline the rights of employees in terms of the Labour Relations Act (LRA), 1995 (Act 66 of 1995). (6 Marks)',
      category: 'Question 2 · Labour Relations Act (LRA)',
      type: 'text',
      marks: 6,
      correctAnswer: 'Trade union membership, legal strikes, CCMA dispute referral, Labour Court appeal, union representation in hearings',
      explanation: 'Rights of employees under LRA:\n- Employees may join a trade union of their choice.\n- Embark on legal strikes as a remedy for grievances.\n- Refer unresolved workplace disputes to the CCMA.\n- Refer unresolved CCMA disputes to the Labour Court on appeal.\n- Request trade union representatives to assist/represent employees in grievance/disciplinary hearings.\n- Trade union representatives may take reasonable paid time off to attend to union duties.'
    },
    {
      id: 510,
      subjectId: 'business_studies',
      paperId: 'business-studies-p1-2021',
      question: '2.3 Identify the PESTLE elements that pose a challenge to Berry Farm in EACH of the following statements:\n2.3.1 Employees are unable to operate the modern machinery that has been purchased recently.\n2.3.2 Management received a fine for dumping their waste material in the river.\n2.3.3 Berry Farm can no longer export their products due to the unfavourable exchange rate. (6 Marks)',
      category: 'Question 2 · PESTLE Elements',
      type: 'text',
      marks: 6,
      correctAnswer: '2.3.1 Technological; 2.3.2 Environmental; 2.3.3 Economic',
      explanation: 'PESTLE Elements:\n• 2.3.1 Technological (operating modern machinery)\n• 2.3.2 Environmental (dumping waste material in the river / pollution fine)\n• 2.3.3 Economic (unfavourable exchange rate)'
    },
    {
      id: 511,
      subjectId: 'business_studies',
      paperId: 'business-studies-p1-2021',
      question: '2.4 Explain the purpose of the Compensation for Occupational Injuries and Diseases Amendment Act (COIDA), 1997 (Act 61 of 1997). (6 Marks)',
      category: 'Question 2 · COIDA Purpose',
      type: 'text',
      marks: 6,
      correctAnswer: 'Comprehensive protection and compensation for employees injured or contracting diseases on duty; Compensation Fund establishment; civil lawsuit indemnification for employers',
      explanation: 'Purpose of COIDA:\n- Provides comprehensive protection to employees who get injured or contract diseases in the course of performing duties.\n- Applies to all casual and full-time workers who become ill, injured, disabled, or die due to workplace accidents.\n- Establishes a Compensation Board to advise the Minister of Labour.\n- Pays medical expenses and financial compensation to employees and their families.\n- Employers pay monthly assessments to the Compensation Fund based on risk.\n- Protects employers from civil liability lawsuits.'
    },
    {
      id: 512,
      subjectId: 'business_studies',
      paperId: 'business-studies-p1-2021',
      question: '2.5 Read the scenario below and answer the questions that follow.\n\nMONEY BANK (MB)\nMoney Bank charges the same interest rates regardless of the client\'s level of income. The National Credit Regulator (NCR) imposed a fine on Money Bank for reckless granting of credit. MB was instructed to bear all the costs related to the removal of the names of blacklisted clients from the credit bureau.\n\n2.5.1 Quote TWO penalties imposed on MB for non-compliance with the National Credit Act (NCA), 2005 (Act 34 of 2005) from the scenario above. (2 Marks)',
      category: 'Question 2 · NCA Scenario Penalties (Quote)',
      type: 'text',
      marks: 2,
      correctAnswer: '1. "The National Credit Regulator (NCR) imposed a fine on Money Bank for reckless granting of credit."\n2. "MB was instructed to bear all the costs related to the removal of the names of blacklisted clients from the credit bureau."',
      explanation: 'Exact quotes required from scenario:\n1. "The National Credit Regulator (NCR) imposed a fine on Money Bank for reckless granting of credit."\n2. "MB was instructed to bear all the costs related to the removal of the names of blacklisted clients from the credit bureau."'
    },
    {
      id: 513,
      subjectId: 'business_studies',
      paperId: 'business-studies-p1-2021',
      question: '2.5.2 Describe the positive impact of the National Credit Act (NCA) on businesses. (6 Marks)',
      category: 'Question 2 · Positive Impact of NCA',
      type: 'text',
      marks: 6,
      correctAnswer: 'Transparent credit process, lower bad debts, protection against non-paying consumers, creditworthiness information from bureaus, reckless lending prevention',
      explanation: 'Positive impact of NCA on businesses:\n- The credit process is transparent: both businesses and customers understand rights and obligations.\n- Lower bad debts resulting in better cash flow.\n- Protects businesses against chronic non-paying consumers.\n- Increases cash sales because credit is granted only to qualifying customers.\n- Stamps out reckless lending and prevents businesses from bankruptcy.\n- Credit bureau data enables thorough creditworthiness checks prior to lending.'
    },
    {
      id: 514,
      subjectId: 'business_studies',
      paperId: 'business-studies-p1-2021',
      question: '2.6 Discuss any TWO types of defensive strategies. (6 Marks)',
      category: 'Question 2 · Defensive Strategies',
      type: 'text',
      marks: 6,
      correctAnswer: 'Divestiture / Divestment (selling unproductive assets/divisions), Liquidation (selling all assets to pay creditors), Retrenchment (terminating contracts for operational reasons)',
      explanation: 'Types of defensive strategies (Discuss any two):\n1. Divestiture/Divestment (Strategy: 2, Discussion: 1):\n   - Selling off unproductive assets, divisions, or departments that are no longer profitable.\n   - Paying off debt by selling unprofitable product lines.\n2. Liquidation (Strategy: 2, Discussion: 1):\n   - Selling all assets to pay creditors due to complete lack of capital.\n   - Selling the entire business to pay shareholders a fair price.\n3. Retrenchment (Strategy: 2, Discussion: 1):\n   - Terminating contracts of employees for operational reasons.\n   - Downsizing staff to decrease overhead wage expenses.'
    },
    {
      id: 515,
      subjectId: 'business_studies',
      paperId: 'business-studies-p1-2021',
      question: '2.7 Suggest ways in which businesses could comply with the Consumer Protection Act (CPA), 2008 (Act 68 of 2008). (6 Marks)',
      category: 'Question 2 · CPA Compliance',
      type: 'text',
      marks: 6,
      correctAnswer: 'Disclose product prices, 5-day cooling off period, transparent labeling, standard quality goods, suggestion boxes for complaints, business name on documents',
      explanation: 'Ways businesses comply with CPA:\n- Disclose prices of all products on sale.\n- Provide adequate staff training on CPA requirements.\n- Allow a five-day cooling-off period on direct marketing transactions.\n- Ensure goods and services are standardized and of acceptable merchantable quality.\n- Comply with requirements regarding labels and packaging disclosures.\n- Display registered business name on all invoices and contracts.\n- Implement customer complaint procedures (e.g. suggestion boxes, helpdesks).'
    },

    // =========================================================================
    // SECTION B: QUESTION 3 — BUSINESS OPERATIONS (40 Marks)
    // =========================================================================
    {
      id: 516,
      subjectId: 'business_studies',
      paperId: 'business-studies-p1-2021',
      question: '3.1 State FOUR aspects that should be included in an employment contract. (4 Marks)',
      category: 'Question 3 · Employment Contract Aspects',
      type: 'text',
      marks: 4,
      correctAnswer: 'Personal details of employee/employer, Job title/position, Job description, Remuneration, Hours of work/overtime, Leave entitlements',
      explanation: 'Aspects of an employment contract (Mark first four):\n- Personal details of the employee.\n- Details of the business/employer (name, address).\n- Job title/position.\n- Job description (duties and working conditions).\n- Job specification (qualifications/skills).\n- Date of commencement of employment.\n- Hours of work and overtime rates.\n- Remuneration and fringe benefits/perks.\n- Leave provisions (annual, sick, maternity).\n- Signatures of employer and employee.'
    },
    {
      id: 517,
      subjectId: 'business_studies',
      paperId: 'business-studies-p1-2021',
      question: '3.2 Outline the benefits of induction for businesses. (6 Marks)',
      category: 'Question 3 · Benefits of Induction',
      type: 'text',
      marks: 6,
      correctAnswer: 'Settle in quickly, understand rules, reduce anxiety, build relationships, increase productivity, save production time by knowing building layout',
      explanation: 'Benefits of induction for businesses:\n- Allows new employees to settle in quickly and work effectively.\n- Ensures new employees understand workplace rules and safety restrictions.\n- Reduces anxiety, insecurity, and fear in the workplace.\n- Builds relationships with colleagues and supervisors at different levels.\n- Increases productivity and overall quality of performance.\n- Minimizes the need for ongoing remedial training.\n- Employees learn the layout of facilities, which saves time.'
    },
    {
      id: 518,
      subjectId: 'business_studies',
      paperId: 'business-studies-p1-2021',
      question: '3.3 Read the scenario below and answer the questions that follow.\n\nSIPHO STATIONERS (SS)\nSipho Stationers advertised a vacancy for a bookkeeper in a local newspaper. The advertisement stated that the prospective candidate should have a relevant formal qualification. The bookkeeper must be able to draw up financial statements.\n\n3.3.1 Identify TWO components of a job analysis highlighted by Sipho Stationers. Motivate your answer by quoting from the scenario above.\nUse the table guide: COMPONENTS OF A JOB ANALYSIS (1 & 2) vs MOTIVATIONS. (6 Marks)',
      category: 'Question 3 · Job Analysis Table (SS)',
      type: 'table',
      marks: 6,
      correctAnswer: '1. Job specification: "The advertisement stated that the prospective candidate should have a relevant formal qualification."\n2. Job description: "The bookkeeper must be able to draw up financial statements."',
      explanation: 'DBE Table Format:\n1. Job specification (2 marks): "The advertisement stated that the prospective candidate should have a relevant formal qualification." (1 mark quote)\n2. Job description (2 marks): "The bookkeeper must be able to draw up financial statements." (1 mark quote)'
    },
    {
      id: 519,
      subjectId: 'business_studies',
      paperId: 'business-studies-p1-2021',
      question: '3.3.2 Explain the advantages of external recruitment for businesses. (4 Marks)',
      category: 'Question 3 · Advantages of External Recruitment',
      type: 'text',
      marks: 4,
      correctAnswer: 'Brings new talents and ideas, helps meet affirmative action and BBBEE targets, larger candidate pool, reduces training costs with experienced hires',
      explanation: 'Advantages of external recruitment:\n- New candidates bring new talents, fresh ideas, and specialized skills.\n- Helps the business meet affirmative action and BBBEE targets.\n- Larger pool of applicants to select from.\n- Better chance of hiring candidates with proven competencies, reducing initial training costs.\n- Minimizes internal jealousy and conflict among existing staff.'
    },
    {
      id: 520,
      subjectId: 'business_studies',
      paperId: 'business-studies-p1-2021',
      question: '3.4 Elaborate on the meaning of quality management. (4 Marks)',
      category: 'Question 3 · Meaning of Quality Management',
      type: 'text',
      marks: 4,
      correctAnswer: 'Process of managing activities to produce goods/services of consistently high standards; techniques used to improve quality; accountability across functions',
      explanation: 'Meaning of quality management:\n- The process of managing all activities needed to ensure a business produces goods and services of consistently high standards.\n- Refers to tools and techniques used to design and improve product quality.\n- Establishes accountability within each business function.\n- Focuses on the means to achieve consistency across processes.'
    },
    {
      id: 521,
      subjectId: 'business_studies',
      paperId: 'business-studies-p1-2021',
      question: '3.5 Read the scenario below and answer the questions that follow.\n\nIKHAYA BRICKS MANUFACTURER (IBM)\nThe employees of Ikhaya Bricks Manufacturer are not adequately trained, resulting in the production of poor quality products. IBM is experiencing a decline in sales as more goods are returned by unhappy customers. The management of IBM maintains that the business has a good image regardless of these challenges.\n\n3.5.1 Quote TWO results of poor implementation of TQM by IBM from the scenario above. (2 Marks)',
      category: 'Question 3 · TQM Results (Quote from IBM)',
      type: 'text',
      marks: 2,
      correctAnswer: '1. "resulting in the production of poor quality products."\n2. "IBM is experiencing a decline in sales as more goods are returned by unhappy customers."',
      explanation: 'Direct Quotes from Scenario:\n1. "resulting in the production of poor quality products."\n2. "IBM is experiencing a decline in sales as more goods are returned by unhappy customers."'
    },
    {
      id: 522,
      subjectId: 'business_studies',
      paperId: 'business-studies-p1-2021',
      question: '3.5.2 Advise the management of IBM on the impact of TQM if poorly implemented, except for those quoted in QUESTION 3.5.1. (4 Marks)',
      category: 'Question 3 · Impact of Poor TQM Implementation',
      type: 'text',
      marks: 4,
      correctAnswer: 'Setting unrealistic deadlines, decline in productivity from stoppages, damaged business reputation, high staff turnover, loss of investor confidence, bad publicity',
      explanation: 'Impact of poorly implemented TQM (excluding scenario quotes):\n- Setting unrealistic deadlines that cannot be achieved.\n- Decline in productivity because of frequent production stoppages.\n- Damaged brand reputation due to faulty goods.\n- Bad publicity and negative word-of-mouth.\n- High staff turnover caused by inadequate skills development.\n- Investors withdrawing capital due to lower profits.\n- Undocumented quality processes leading to repeated operational deviations.'
    },
    {
      id: 523,
      subjectId: 'business_studies',
      paperId: 'business-studies-p1-2021',
      question: '3.6 Explain how the quality of performance of the administration function can contribute to the success of the business. (4 Marks)',
      category: 'Question 3 · Administration Function Quality',
      type: 'text',
      marks: 4,
      correctAnswer: 'Fast data capturing, timely management info for quick decision-making, prompt complaints handling, up-to-date financial record-keeping, secure documentation',
      explanation: 'Contribution of administration function to business success:\n- Fast and reliable data capturing and processing systems.\n- Makes reliable, relevant information available to management on time for quick decision-making.\n- Handles customer inquiries and complaints promptly and effectively.\n- Efficient use of modern information technology.\n- Keeps all documentation orderly and secure.\n- Ensures financial documents are updated and recorded accurately.'
    },
    {
      id: 524,
      subjectId: 'business_studies',
      paperId: 'business-studies-p1-2021',
      question: '3.7 Evaluate the impact of adequate financing and capacity as a total quality management (TQM) element on large businesses. (6 Marks)',
      category: 'Question 3 · Adequate Financing & Capacity Evaluation',
      type: 'text',
      marks: 6,
      correctAnswer: 'Positives: Afford quality testing before implementation, purchase grade-A raw materials, fund market research. Negatives: Consumes large amounts of capital, demand surges exceed capital',
      explanation: 'Evaluation of Adequate Financing & Capacity on Large Businesses:\nPositives / Advantages:\n- Sufficient financing allows thorough testing of systems before implementation.\n- Can afford error-prevention systems in machinery and raw materials.\n- Able to fund continuous market and product research.\n- Can afford to purchase high-quality machinery and raw materials.\nAND/OR\nNegatives / Disadvantages:\n- Rapid demand surges can outstrip capital required to produce stock to fill orders.\n- Rapidly growing businesses can consume large amounts of capital trying to balance operations and expansion.'
    },

    // =========================================================================
    // SECTION B: QUESTION 4 — MISCELLANEOUS TOPICS (40 Marks)
    // =========================================================================
    {
      id: 525,
      subjectId: 'business_studies',
      paperId: 'business-studies-p1-2021',
      question: '4.1 Outline the role of SETAs. (4 Marks)',
      category: 'Question 4 · Role of SETAs',
      type: 'text',
      marks: 4,
      correctAnswer: 'Develop sector skills plans, register learnerships, approve workplace skills plans, allocate grants, collect levies, monitor training quality',
      explanation: 'Role of SETAs (Sector Education and Training Authorities):\n- Develop sector skills plans in line with the National Skills Development Strategy.\n- Approve workplace skills plans (WSPs) and annual training reports (ATRs).\n- Allocate and pay out skills training grants to qualifying employers.\n- Promote, establish, and register learnership agreements.\n- Monitor and evaluate the quality of training provided by accredited service providers.\n- Report to the Director-General of Higher Education and Training.'
    },
    {
      id: 526,
      subjectId: 'business_studies',
      paperId: 'business-studies-p1-2021',
      question: '4.2 Read the scenario below and answer the questions that follow.\n\nCAREL TELEVISIONS (CT)\nCarel Televisions specialise in the manufacturing of smart television sets. They signed a contract with Thuli Distributors (TD) to deliver their products to customers. CT wants to implement intensive strategies for sustainable growth in the market.\n\n4.2.1 Identify the type of business sector in which CT and TD operate. Motivate your answer by quoting from the scenario above.\nUse the table guide: BUSINESS SECTORS (CT & TD) vs MOTIVATIONS. (6 Marks)',
      category: 'Question 4 · Business Sectors Table (CT & TD)',
      type: 'table',
      marks: 6,
      correctAnswer: 'Carel Televisions (CT) = Secondary Sector: "Carel Televisions specialise in the manufacturing of smart television sets."\nThuli Distributors (TD) = Tertiary Sector: "They signed a contract with Thuli Distributors (TD) to deliver their products to customers."',
      explanation: 'DBE Table Format:\n• Carel Televisions (CT): Secondary Sector (2 marks) | Motivation: "Carel Televisions specialise in the manufacturing of smart television sets." (1 mark quote)\n• Thuli Distributors (TD): Tertiary Sector (2 marks) | Motivation: "They signed a contract with Thuli Distributors (TD) to deliver their products to customers." (1 mark quote)'
    },
    {
      id: 527,
      subjectId: 'business_studies',
      paperId: 'business-studies-p1-2021',
      question: '4.2.2 Explain the advantages of intensive strategies. (4 Marks)',
      category: 'Question 4 · Advantages of Intensive Strategies',
      type: 'text',
      marks: 4,
      correctAnswer: 'Increased market share, higher sales and profitability, improved service delivery, greater control over prices, loyal customer base through promotions',
      explanation: 'Advantages of intensive strategies:\n- Increased market share reduces vulnerability to competitor actions.\n- Leads to higher sales volumes, revenue, and profitability.\n- Improved service delivery enhances corporate brand image.\n- Enables businesses to exercise greater control over pricing.\n- Builds brand loyalty through effective marketing campaigns.'
    },
    {
      id: 528,
      subjectId: 'business_studies',
      paperId: 'business-studies-p1-2021',
      question: '4.3 Suggest ways in which businesses could apply enterprise and supplier development (ESD) as a BBBEE pillar in the workplace. (6 Marks)',
      category: 'Question 4 · ESD as BBBEE Pillar',
      type: 'text',
      marks: 6,
      correctAnswer: 'Create jobs by promoting local manufacturing, outsource to BBBEE suppliers, invest in black-owned SMMEs, provide loans/donations, offer mentoring and favorable payment terms',
      explanation: 'Ways businesses apply Enterprise and Supplier Development (ESD):\n- Promote local manufacturing to create sustainable jobs.\n- Outsource procurement services to verified BBBEE-compliant suppliers.\n- Invest in and support black-owned SMMEs.\n- Provide monetary contributions (e.g. low-interest loans, grants, investments).\n- Provide non-monetary assistance (e.g. consulting, mentorship, entrepreneurial training).\n- Offer preferential, shorter payment terms to support small supplier cash flow.'
    },
    {
      id: 529,
      subjectId: 'business_studies',
      paperId: 'business-studies-p1-2021',
      question: '4.4 State TWO salary determination methods that businesses could apply to remunerate their employees. (2 Marks)',
      category: 'Question 4 · Salary Determination Methods',
      type: 'text',
      marks: 2,
      correctAnswer: 'Piecemeal, Time-related',
      explanation: 'Salary Determination Methods:\n1. Piecemeal: Workers are paid based on the quantity/units of goods produced.\n2. Time-related: Workers are paid based on the time spent at work (hourly, daily, weekly, or monthly).'
    },
    {
      id: 530,
      subjectId: 'business_studies',
      paperId: 'business-studies-p1-2021',
      question: '4.5 Read the scenario below and answer the questions that follow.\n\nSUKI CONSULTING (SC)\nSuki, the owner of Suki Consulting, will be conducting interviews for a vacant position. She prepared a set of questions that will be asked during the interviews. Suki also booked a suitable venue for the interviews.\n\n4.5.1 Quote TWO roles of Suki, as the interviewer, before the interview, from the scenario above. (2 Marks)',
      category: 'Question 4 · Interviewer Roles (Quote from SC)',
      type: 'text',
      marks: 2,
      correctAnswer: '1. "She prepared a set of questions that will be asked during the interviews."\n2. "Suki also booked a suitable venue for the interviews."',
      explanation: 'Direct Quotes from Scenario:\n1. "She prepared a set of questions that will be asked during the interviews."\n2. "Suki also booked a suitable venue for the interviews."'
    },
    {
      id: 531,
      subjectId: 'business_studies',
      paperId: 'business-studies-p1-2021',
      question: '4.5.2 Explain the purpose of an interview as a human resources activity. (6 Marks)',
      category: 'Question 4 · Purpose of an Interview',
      type: 'text',
      marks: 6,
      correctAnswer: 'Obtains strengths and weaknesses of candidate, helps employer make informed hiring decision, matches candidate info to job requirements, mutual exchange of company and candidate info',
      explanation: 'Purpose of an interview as a human resources activity:\n- Obtains detailed information regarding the applicant\'s strengths, weaknesses, and temperament.\n- Enables the employer to make an objective, informed selection decision.\n- Verifies that candidate qualifications and experience match job requirements.\n- Creates an opportunity for a two-way exchange of information about the company culture and job expectations.\n- Evaluates personal communication skills and cultural fit.'
    },
    {
      id: 532,
      subjectId: 'business_studies',
      paperId: 'business-studies-p1-2021',
      question: '4.6 Discuss the importance of quality circles as part of continuous improvement to processes and systems. (4 Marks)',
      category: 'Question 4 · Quality Circles Importance',
      type: 'text',
      marks: 4,
      correctAnswer: 'Solve quality problems, suggest solutions to management, eliminate duplication, improve morale and motivation, reduce costs of redundancy, create workplace harmony',
      explanation: 'Importance of quality circles:\n- Investigate specific production bottlenecks and suggest practical solutions to management.\n- Eliminate duplication of activities and reduce operational waste.\n- Improve overall product quality and labor productivity through regular reviews.\n- Increase employee morale, sense of ownership, and motivation.\n- Foster workplace harmony and strong communication across operational levels.'
    },
    {
      id: 533,
      subjectId: 'business_studies',
      paperId: 'business-studies-p1-2021',
      question: '4.7 Advise businesses on the benefits of a good quality management system. (6 Marks)',
      category: 'Question 4 · Benefits of Quality Management System',
      type: 'text',
      marks: 6,
      correctAnswer: 'Increased customer satisfaction, efficient use of time and resources, higher productivity, competitive advantage, lower defect and return rates, higher market share',
      explanation: 'Benefits of a good quality management system:\n- Delivers effective customer service, resulting in customer satisfaction and brand loyalty.\n- Optimizes the use of organizational time, machinery, and material resources.\n- Increases labor productivity through clear operational benchmarks.\n- Provides a sustainable competitive edge over rivals.\n- Enhances public image by lowering defect and return rates.\n- Expands market share and overall enterprise profitability.'
    },

    // =========================================================================
    // SECTION C: ESSAY-TYPE QUESTIONS (CHOICE OF ONE - 40 Marks with LASO)
    // =========================================================================
    {
      id: 534,
      subjectId: 'business_studies',
      paperId: 'business-studies-p1-2021',
      question: 'QUESTION 5: BUSINESS ENVIRONMENTS (BUSINESS STRATEGIES)\n\nBusinesses need to develop suitable strategies to deal with challenges in the business environment. Integration strategies could be implemented in response to findings from applying Porter\'s Five Forces model. Businesses need to evaluate their strategies.\n\nWrite an essay on business strategies in which you include the following aspects:\n• Outline the steps in developing a strategy. (8)\n• Discuss THREE types of integration strategies. (16)\n• Explain how businesses could apply the following Porter\'s Five Forces model to analyse their position in the market environment:\n  - Power of suppliers\n  - Power of competitors/Competitive rivalry\n  - Threat of substitution/Substitutes (12)\n• Advise businesses on the steps they should consider when evaluating strategies. (10)\n[LASO Insight: Layout 2, Analysis 2, Synthesis 2, Originality 2 = 8 Marks | Total: 40 Marks]',
      category: 'Section C · Question 5 Essay (Business Strategies)',
      type: 'essay',
      marks: 40,
      correctAnswer: 'Comprehensive 40-mark LASO essay covering strategy development, Forward/Backward/Horizontal integration, Porter\'s Five Forces, evaluation steps, and conclusion.',
      explanation: 'Official DBE Section C Question 5 Essay Memo (40 Marks):\n• Introduction (2 marks):\n  - Environmental turbulence requires proactive strategic planning.\n  - Integration strategies establish control over supply chains and distribution.\n• Steps in Developing a Strategy (Max 8):\n  - Environmental scanning (SWOT/PESTLE/Porter\'s).\n  - Formulate strategic goals and measurable objectives.\n  - Implement strategies using detailed action plans.\n  - Measure performance against targets and execute corrective adjustments.\n• Integration Strategies (Max 16):\n  - Forward integration: Taking over or merging with distributors.\n  - Backward integration: Taking over or merging with suppliers.\n  - Horizontal integration: Taking over or merging with direct competitors.\n• Porter\'s Five Forces Application (Max 12):\n  - Power of suppliers: Assessing supplier influence over raw material prices and availability.\n  - Power of competitors: Evaluating rivalry intensity, price wars, and market concentration.\n  - Threat of substitution: Gauging consumer willingness to switch to alternative goods.\n• Steps when Evaluating Strategies (Max 10):\n  - Examine underlying strategic assumptions.\n  - Compare expected vs actual performance.\n  - Measure deviations and analyze causes.\n  - Implement corrective actions and establish follow-up milestones.\n• Conclusion (2 marks):\n  - Strategic management delivers competitive resilience and long-term profitability.\n• LASO Insight (8 marks): Layout (2), Analysis (2), Synthesis (2), Originality (2).'
    },
    {
      id: 535,
      subjectId: 'business_studies',
      paperId: 'business-studies-p1-2021',
      question: 'QUESTION 6: BUSINESS OPERATIONS (QUALITY OF PERFORMANCE)\n\nA good management system includes the quality control and quality assurance of products. Businesses need to manage the purchasing and marketing functions so that the end product satisfies the customer. A sound knowledge of continuous improvement to processes and systems, as a total quality management (TQM) element, can reduce the cost of quality.\n\nWrite an essay on quality of performance in which you address the following aspects:\n• Outline the differences between quality control and quality assurance. (8)\n• Explain the quality indicators for the following business functions:\n  - Purchasing\n  - Marketing (16)\n• Evaluate the impact of continuous improvement to processes and systems as a TQM element on large businesses. (12)\n• Suggest ways in which TQM can reduce the cost of quality. (10)\n[LASO Insight: Layout 2, Analysis 2, Synthesis 2, Originality 2 = 8 Marks | Total: 40 Marks]',
      category: 'Section C · Question 6 Essay (Quality of Performance)',
      type: 'essay',
      marks: 40,
      correctAnswer: 'Comprehensive 40-mark LASO essay covering Quality Control vs Quality Assurance, Purchasing & Marketing indicators, Continuous improvement impact, and TQM cost reduction.',
      explanation: 'Official DBE Section C Question 6 Essay Memo (40 Marks):\n• Introduction (2 marks):\n  - Quality management ensures operational excellence and consumer trust.\n  - Continuous improvement minimizes defects and operational expenses.\n• Quality Control vs Quality Assurance (Max 8):\n  - Quality Control: Inspection of final finished product; checking for defects; reactive measurement.\n  - Quality Assurance: Inspection carried out during and throughout production; building quality in right first time; proactive defect prevention.\n• Quality Indicators for Functions (Max 16):\n  - Purchasing: Bulk purchasing discounts, reliable suppliers, timely orders, optimum stock levels, secure storage.\n  - Marketing: Customer satisfaction surveys, ethical advertising, product differentiation, aggressive campaigns, pricing techniques.\n• Continuous Improvement Impact (Max 12):\n  - Positives: Ample funding for modern equipment, dedicated quality staff, systematic PDCA execution.\n  - Negatives: Complex large-scale coordination, employee resistance, high initial transformation costs.\n• Ways TQM Reduces Cost of Quality (Max 10):\n  - Quality circles solve bottlenecks, eliminate duplication, train all staff, replace costly post-production inspections with built-in controls, proactive maintenance.\n• Conclusion (2 marks):\n  - Total Quality Management drives down defects and secures long-term market dominance.\n• LASO Insight (8 marks): Layout (2), Analysis (2), Synthesis (2), Originality (2).'
    }
  ]
};
