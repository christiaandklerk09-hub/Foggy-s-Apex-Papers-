export interface Annexure {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  type: 'table' | 'graph' | 'chart' | 'document';
  source: string;
  applicableQuestions: string[];
  notes?: string;
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
    notes: 'Official DBE NSC Annexure A. Used for Question 2.2 calculations including VAT inclusive/exclusive pricing, discount calculations, and payment due dates.'
  },
  annexure_b: {
    id: 'annexure_b',
    code: 'ANNEXURE B',
    title: 'ANNEXURE B: Water & Energy Conservation (Showerhead Comparison)',
    subtitle: 'Standard vs Low-Flow Showerhead Water Flow Rates (ℓ/min) & Energy Consumed',
    type: 'chart',
    source: 'DBE NSC Mathematical Literacy P1 November 2021 Addendum',
    applicableQuestions: ['3.2.1', '3.2.2', '3.2.3'],
    notes: 'Official DBE NSC Annexure B. Used for Question 3.2 calculations on domestic water savings, volume difference across shower durations, and energy reduction.'
  },
  annexure_c: {
    id: 'annexure_c',
    code: 'ANNEXURE C',
    title: 'ANNEXURE C: Tourist Arrivals in South Africa (India vs Top 10 Markets)',
    subtitle: 'Comparative Charts of Foreign Visitor Volumes, Rankings & Percentage Growth',
    type: 'graph',
    source: 'DBE NSC Mathematical Literacy P1 November 2021 Addendum (South African Tourism)',
    applicableQuestions: ['4.2.1', '4.2.2', '4.2.3', '4.2.4'],
    notes: 'Official DBE NSC Annexure C. Used for Question 4.2 calculations comparing international visitor figures, percentage shares, and trend analysis.'
  },
  table_1: {
    id: 'table_1',
    code: 'TABLE 1',
    title: 'TABLE 1: Fuel Price in Six African Countries & Exchange Rates',
    subtitle: 'Prices in US Dollars on 05/06/2019 vs 01/03/2021 & Currency Conversion',
    type: 'table',
    source: 'DBE NSC Mathematical Literacy P1 November 2021 (Question 1.1)',
    applicableQuestions: ['1.1.1', '1.1.2', '1.1.3', '1.1.4', '1.1.5'],
    notes: 'Used for Question 1.1: Calculate Zimbabwe price increase, Botswana exchange rate conversion (1 ÷ 11.14), ranking, and probability.'
  },
  graph_1_2: {
    id: 'graph_1_2',
    code: 'GRAPH 1.2',
    title: 'GRAPH 1.2: Provincial Energy Sources Used for Cooking in South Africa',
    subtitle: 'Distribution of Households by Energy Type & Paraffin Price Benchmarks',
    type: 'graph',
    source: 'DBE NSC Mathematical Literacy P1 November 2021 (Question 1.2)',
    applicableQuestions: ['1.2.1', '1.2.2', '1.2.3(a)', '1.2.3(b)', '1.2.4'],
    notes: 'Used for Question 1.2: Electricity dominance (83.4%), Limpopo highest wood use (41.2%), and paraffin cost conversion (764.59 c/ℓ = R7.65/ℓ).'
  },
  table_2: {
    id: 'table_2',
    code: 'TABLE 2',
    title: 'TABLE 2: Vehicle Financing Options (Ford Figo vs VW Polo)',
    subtitle: 'Hire Purchase / Instalment Sale Options with Deposits and Balloon Residuals',
    type: 'table',
    source: 'DBE NSC Mathematical Literacy P1 November 2021 (Question 2.1)',
    applicableQuestions: ['2.1.1', '2.1.2', '2.1.3', '2.1.4', '2.1.5', '2.1.6'],
    notes: 'Used for Question 2.1: Deposit calculations, total repayment amounts over 72 vs 48 months, and residual balloon payments.'
  },
  table_7_8: {
    id: 'table_7_8',
    code: 'TABLE 7 & 8',
    title: 'TABLE 7 & 8: SARS Personal Income Tax Rates & Medical Scheme Tax Credits',
    subtitle: '2020/2021 SARS Tax Brackets, Primary Rebates & Medical Aid Credits',
    type: 'table',
    source: 'DBE NSC Mathematical Literacy P1 November 2021 (Question 5.1)',
    applicableQuestions: ['5.1.1', '5.1.2', '5.1.3', '5.1.4'],
    notes: 'Used for Question 5.1: Annual taxable income calculation, tax bracket marginal rate application, primary rebates, and monthly PAYE deductions.'
  }
};
