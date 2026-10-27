export interface Annexure {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  type: 'table' | 'graph' | 'chart' | 'document';
  source: string;
  applicableQuestions: string[];
  notes?: string;
  aliases?: string[];
}

export const MATH_ANNEXURES: Record<string, Annexure> = {
  annexure_a: {
    id: 'annexure_a',
    code: 'ANNEXURE A',
    title: 'ANNEXURE A: Cellphone Contract Invoice for Mr SJ Fortune',
    subtitle: 'Detailed Monthly Account, Subscription Fee, Itemised Usage & VAT (15%)',
    type: 'document',
    source: 'DBE NSC Mathematical Literacy P1 November 2021 Addendum',
    applicableQuestions: ['2.2.1', '2.2.2', '2.2.3', '2.2.4', '2.2.5'],
    notes: 'Official DBE NSC Annexure A. Used for Question 2.2 calculations including VAT inclusive/exclusive pricing, discount calculations, and payment due dates.',
    aliases: ['annexure_a_cellphone_invoice'],
  },
  annexure_b: {
    id: 'annexure_b',
    code: 'ANNEXURE B',
    title: 'ANNEXURE B: Water & Energy Conservation (Showerhead Comparison)',
    subtitle: 'Standard vs Low-Flow Showerhead Water Flow Rates (ℓ/min) & Energy Consumed',
    type: 'chart',
    source: 'DBE NSC Mathematical Literacy P1 November 2021 Addendum',
    applicableQuestions: ['3.2.1', '3.2.2', '3.2.3'],
    notes: 'Official DBE NSC Annexure B. Used for Question 3.2 calculations on domestic water savings, volume difference across shower durations, and energy reduction.',
    aliases: ['annexure_b_showerheads'],
  },
  annexure_c: {
    id: 'annexure_c',
    code: 'ANNEXURE C',
    title: 'ANNEXURE C: Tourist Arrivals in South Africa (India vs Top 10 Markets)',
    subtitle: 'Comparative Charts of Foreign Visitor Volumes, Rankings & Percentage Growth',
    type: 'graph',
    source: 'DBE NSC Mathematical Literacy P1 November 2021 Addendum (South African Tourism)',
    applicableQuestions: ['4.2.1', '4.2.2', '4.2.3', '4.2.4'],
    notes: 'Official DBE NSC Annexure C. Used for Question 4.2 calculations comparing international visitor figures, percentage shares, and trend analysis.',
    aliases: ['annexure_c_tourist_arrivals'],
  },
  table_1: {
    id: 'table_1',
    code: 'TABLE 1',
    title: 'TABLE 1: Fuel Price in Six African Countries & Exchange Rates',
    subtitle: 'Prices in US Dollars on 05/06/2019 vs 01/03/2021 & Currency Conversion',
    type: 'table',
    source: 'DBE NSC Mathematical Literacy P1 November 2021 (Question 1.1)',
    applicableQuestions: ['1.1.1', '1.1.2', '1.1.3', '1.1.4', '1.1.5'],
    notes: 'Used for Question 1.1: Calculate Zimbabwe price increase, Botswana exchange rate conversion (1 ÷ 11.14), ranking, and probability.',
    aliases: ['table_1_fuel_prices'],
  },
  graph_1_2: {
    id: 'graph_1_2',
    code: 'GRAPH 1.2',
    title: 'GRAPH 1.2: Provincial Energy Sources Used for Cooking in South Africa',
    subtitle: 'Distribution of Households by Energy Type & Paraffin Price Benchmarks',
    type: 'graph',
    source: 'DBE NSC Mathematical Literacy P1 November 2021 (Question 1.2)',
    applicableQuestions: ['1.2.1', '1.2.2', '1.2.3(a)', '1.2.3(b)', '1.2.4'],
    notes: 'Used for Question 1.2: Electricity dominance (83.4%), Limpopo highest wood use (41.2%), and paraffin cost conversion (764.59 c/ℓ = R7.65/ℓ).',
    aliases: ['graph_1_2_energy_sources'],
  },
  sheet_1_3: {
    id: 'sheet_1_3',
    code: 'SHEET 1.3',
    title: 'SHEET 1.3: National Survey on Reading Habits & Book Purchases',
    subtitle: 'Sample Size, Age Demographics, Frequency of Reading & Preferred Formats',
    type: 'document',
    source: 'DBE NSC Mathematical Literacy P1 November 2021 (Question 1.3)',
    applicableQuestions: ['1.3.1', '1.3.2', '1.3.3', '1.3.4', '1.3.5'],
    notes: 'Used for Question 1.3: Sample percentages, demographic breakdowns, reading mediums, and frequency analysis.',
    aliases: ['sheet_1_3_reading_survey'],
  },
  table_2: {
    id: 'table_2',
    code: 'TABLE 2',
    title: 'TABLE 2: Vehicle Financing Options (Ford Figo vs VW Polo)',
    subtitle: 'Hire Purchase / Instalment Sale Options with Deposits and Balloon Residuals',
    type: 'table',
    source: 'DBE NSC Mathematical Literacy P1 November 2021 (Question 2.1)',
    applicableQuestions: ['2.1.1', '2.1.2', '2.1.3', '2.1.4', '2.1.5', '2.1.6'],
    notes: 'Used for Question 2.1: Deposit calculations, total repayment amounts over 72 vs 48 months, and residual balloon payments.',
    aliases: ['table_2_car_financing'],
  },
  table_3: {
    id: 'table_3',
    code: 'TABLE 3',
    title: 'TABLE 3: Western Cape Major Dam Storage Capacity & Current Water Levels',
    subtitle: 'Individual Dam Capacities (m³), Current Water Levels & Percentage Fullness',
    type: 'table',
    source: 'DBE NSC Mathematical Literacy P1 November 2021 (Question 3.1)',
    applicableQuestions: ['3.1.1', '3.1.2', '3.1.3', '3.1.4', '3.1.5'],
    notes: 'Used for Question 3.1: Dam capacity calculations, percentage fullness comparison, total storage volumes, and water restrictions.',
    aliases: ['table_3_dam_levels'],
  },
  table_4_5: {
    id: 'table_4_5',
    code: 'TABLE 4 & 5',
    title: 'TABLE 4 & 5: Chicken Biryani Recipe Ingredients, Unit Costs & Costing Sheet',
    subtitle: 'Ingredient Portions, Bulk Wholesale Prices, Cost per Portion & Total Batch Cost',
    type: 'table',
    source: 'DBE NSC Mathematical Literacy P1 November 2021 (Question 4.1)',
    applicableQuestions: ['4.1.1', '4.1.2', '4.1.3', '4.1.4'],
    notes: 'Used for Question 4.1: Costing calculations per portion, total ingredient batch expenses, selling price determination, and profit margins.',
    aliases: ['table_4_5_biryani_costs'],
  },
  table_6: {
    id: 'table_6',
    code: 'TABLE 6',
    title: 'TABLE 6: Chicken Biryani Income vs Expenditure Breakeven Data',
    subtitle: 'Number of Portions Sold, Total Income, Total Production Cost & Breakeven Graph',
    type: 'graph',
    source: 'DBE NSC Mathematical Literacy P1 November 2021 (Question 4.1.5)',
    applicableQuestions: ['4.1.5', '4.1.6', '4.1.7'],
    notes: 'Used for Question 4.1.5: Income and cost intersection lines, breakeven point in portions, and profit region.',
    aliases: ['table_6_biryani_graph'],
  },
  table_7_8: {
    id: 'table_7_8',
    code: 'TABLE 7 & 8',
    title: 'TABLE 7 & 8: SARS Personal Income Tax Rates & Medical Scheme Tax Credits',
    subtitle: '2020/2021 SARS Tax Brackets, Primary Rebates & Medical Aid Credits',
    type: 'table',
    source: 'DBE NSC Mathematical Literacy P1 November 2021 (Question 5.1)',
    applicableQuestions: ['5.1.1', '5.1.2', '5.1.3', '5.1.4'],
    notes: 'Used for Question 5.1: Annual taxable income calculation, tax bracket marginal rate application, primary rebates, and monthly PAYE deductions.',
    aliases: ['table_7_8_sars_tax'],
  },
  box_plot_5_2: {
    id: 'box_plot_5_2',
    code: 'BOX PLOT 5.2',
    title: 'BOX PLOT 5.2: Comparative Battery Lifespans for Three Laptop Brands',
    subtitle: 'Five-Number Summaries: Minimum, Lower Quartile (Q1), Median (Q2), Upper Quartile (Q3) & Maximum',
    type: 'chart',
    source: 'DBE NSC Mathematical Literacy P1 November 2021 (Question 5.2)',
    applicableQuestions: ['5.2.1', '5.2.2', '5.2.3', '5.2.4'],
    notes: 'Used for Question 5.2: Interquartile range (IQR), median comparison, battery lifespan spread, and brand reliability.',
    aliases: ['box_plot_5_2_laptop_brands'],
  },
};

/**
 * Universal lookup function that resolves any annexure ID, alias, or substring match.
 */
export function getAnnexureById(id?: string): Annexure {
  if (!id) return MATH_ANNEXURES['annexure_a'];
  const cleanId = id.trim().toLowerCase();

  // 1. Direct key match
  if (MATH_ANNEXURES[cleanId]) {
    return MATH_ANNEXURES[cleanId];
  }

  // 2. Check alias arrays
  for (const ann of Object.values(MATH_ANNEXURES)) {
    if (ann.id === cleanId || ann.aliases?.some((a) => a.toLowerCase() === cleanId)) {
      return ann;
    }
  }

  // 3. Substring / Prefix match
  for (const [key, ann] of Object.entries(MATH_ANNEXURES)) {
    if (cleanId.includes(key) || key.includes(cleanId)) {
      return ann;
    }
    if (ann.aliases?.some((a) => cleanId.includes(a) || a.includes(cleanId))) {
      return ann;
    }
  }

  // Fallback default
  return MATH_ANNEXURES['annexure_a'];
}
