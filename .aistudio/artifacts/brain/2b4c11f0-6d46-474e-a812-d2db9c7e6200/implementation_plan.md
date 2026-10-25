# Aligning Examination Tables & Annexures with Every Question

Ensure every question in the DBE Grade 12 Mathematical Literacy Paper 1 (November 2021) is accurately paired with its official exam table, graph, or addendum annexure (Annexure A, B, C, Tables 1–8, Box-and-Whisker Plot, and Janet's Business Graph) displayed directly above the question card with authentic SVG charts and responsive collapsible controls.

## User Review & Critical Decisions

> [!IMPORTANT]
> The following design decisions were confirmed during interactive clarification:
> - **Placement**: Render the matching table/annexure directly above each question card with a smooth collapse/expand toggle.
> - **Sub-Question Scope**: Automatically display the reference table/annexure on **every** sub-question that references the data (e.g. 1.1.1 through 1.1.5 all have Table 1 immediately visible).
> - **Visual Quality**: Implement authentic, high-precision SVG vector charts for all visual diagrams (Graph 1.2 provincial cooking energy, Annexure B shower water/energy charts, Annexure C tourist arrivals bar & pie chart, Question 5.2 triple box plot, and Question 4.2 Janet's break-even graph).

---

## 1. Overview & Core Concept

In official Department of Basic Education (DBE) National Senior Certificate exams, questions rely directly on accompanying Addendum Annexures (Annexure A, B, C) and in-paper Tables (Table 1 through Table 8). 

Students frequently have to flip back and forth between separate question booklets and addendum sheets. In this practice engine, each question will dynamically render its exact required reference material right at the point of focus.

### Exam Asset Alignment Matrix

| Question Range | Marks | Exam Reference | Type | Content / Purpose |
| :--- | :---: | :--- | :--- | :--- |
| **1.1.1 – 1.1.5** | 10 | **Table 1** | Tabular Data | Fuel prices in 6 African countries (SA, Angola, Zimbabwe, Namibia, Swaziland, Botswana) & exchange rates |
| **1.2.1 – 1.2.4** | 10 | **Graph 1.2** | Stacked Bar Chart (SVG) | Provincial energy sources for cooking (Electricity, Gas, Paraffin, Wood, Other) across 9 provinces |
| **1.3.1 – 1.3.5** | 10 | **Sheet 1.3** | Structured Document | Company reading habits survey instrument (Questions A to E) |
| **2.1.1 – 2.1.6** | 16 | **Table 2** | Tabular Comparison | Car financing comparison (Ford Figo vs VW Polo) with deposits, instalments, residual values |
| **2.2.1 – 2.2.5** | 10 | **Annexure A** | Official Invoice Document | Mr SJ Fortune 3-line cellphone contract statement (Made for You S, XS, Choice 5GB, VAT & total) |
| **3.1.1 – 3.1.7** | 18 | **Table 3** | Tabular Data | Dam storage levels across 9 provinces on 5 April 2021 with missing value D |
| **3.2.1 – 3.2.3** | 8 | **Annexure B** | Grouped Bar Chart + Diagram (SVG) | Water (litres) & energy (kWh) per shower (2, 4, 6, 8, 10 min) for normal vs low-flow shower heads |
| **4.1.1 – 4.1.4** | 16 | **Table 4 & 5** | Tabular + Exchange Rate | Estimated ingredients cost for 8 plates of chicken biryani (in Rs) & ZAR/INR exchange rate |
| **4.2.1 – 4.2.3** | 9 | **Table 6 & Answer Sheet** | Table + Coordinate Graph (SVG) | Janet's biryani plates income and cost table ($0$ to $100$ plates) & line graph grid |
| **4.3.1 – 4.3.4** | 10 | **Annexure C** | Bar Chart + Pie Chart (SVG) | India tourist arrivals 2015–2019 (millions) & Country of origin pie chart breakdown |
| **5.1.1 – 5.1.4** | 17 | **Table 7 & 8** | Tabular Tax Schedules | SARS individual income tax brackets (1–7), primary/secondary/tertiary rebates, and medical credits |
| **5.2.1 – 5.2.3** | 8 | **Figure 5.2** | Triple Box-and-Whisker (SVG) | Laptop brand market share comparison (Huawei, Samsung, Apple) with five-number summaries |

---

## 2. User Experience & Visual Design

### Visual Layout & Interaction Hierarchy

```
┌────────────────────────────────────────────────────────────────────────┐
│ QUESTION 2.2.1 OF 55 · FINANCE & TARIFFS (2 MARKS)                     │
├────────────────────────────────────────────────────────────────────────┤
│ ┌────────────────────────────────────────────────────────────────────┐ │
│ │ 📄 ANNEXURE A: Cellphone Contract Invoice          [— Collapse]    │ │
│ ├────────────────────────────────────────────────────────────────────┤ │
│ │ Mr SJ Fortune · 5 Second Avenue, Zone 2, Smelderado, 2463           │ │
│ │ Invoice Date: 17-01-2021 · Account: BA4536782C · Payment: Debit     │ │
│ │ ────────────────────────────────────────────────────────────────── │ │
│ │ Contract Plan          Period                  Amount (excl. VAT)  │ │
│ │ ABC Made For You S     17-12-2020 to 16-01-2021  R 260,87          │ │
│ │ ABC Made For You S     17-01-2021 to 16-02-2021  R  94,78          │ │
│ │ Subtotal (excl. 15% VAT):                        R 355,65          │ │
│ │ ...                                                                │ │
│ │ VAT total 15%:                                   R 142,95          │ │
│ │ Total amount due for current period:             [ Value A ]       │ │
│ └────────────────────────────────────────────────────────────────────┘ │
│                                                                        │
│ 2.2.1 State the number of cellphone contracts shown on this invoice.  │
│                                                                        │
│ ┌────────────────────────────────────────────────────────────────────┐ │
│ │ Type your answer or calculation steps here...                      │ │
│ └────────────────────────────────────────────────────────────────────┘ │
│ [ Check Answer & Working ]                                             │
└────────────────────────────────────────────────────────────────────────┘
```

### Authentic Visual Standards
- **Authentic DBE Styling**:
  - Light red accent motif: Subtle rose canvas (`#fff5f5`), dark mode deep mahogany (`#0f0709`), with crisp `#E11D48` brand touches.
  - Tabular numerals (`tabular-nums font-mono`) for exact vertical alignment of currency, percentages, and dates.
  - Responsive SVG charts with clean hover tooltips and accessibility labels.
  - No bloated virtual keypads; focus remains on legible reading of source data and smooth student input.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Explicit `annexureId` and `tableId` on Question Definitions**
  - *Chosen Approach*: Add a deterministic `annexureRef` metadata property to every question object in `lib/maths-literacy-p1-2021-data.ts`.
  - *Why*: Regex string matching on question text can miss edge cases or match false positives. An explicit key guarantees 100% deterministic pairing across all 55 questions.

- **Decision 2: High-Resolution Native SVG Charts over Pixelated Static Images**
  - *Chosen Approach*: Render Graph 1.2, Annexure B, Annexure C, Figure 5.2, and Answer Sheet 4.2.2 as interactive vector SVGs directly in React.
  - *Why*: SVGs are infinitely sharp on mobile retina screens, zoomable, support dark/light theme switching, and load with 0 network latency.

- **Decision 3: Default Expanded with Individual Collapse Toggle**
  - *Chosen Approach*: The relevant table or annexure opens expanded so the student immediately sees the reference material without an extra click, with a discreet minimize button (`[-]`) to save vertical space once understood.

---

## 4. Technical Architecture & Component Mapping

```
┌────────────────────────────────────────────────────────────────────────┐
│                        QuizAppContent.tsx                              │
│         Manages active paper, question index, and user state           │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                         QuestionCard.tsx                               │
│  Renders current question header, marks, answer area, and navigation   │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                  ┌─────────────────┴─────────────────┐
                  ▼                                   ▼
┌───────────────────────────────────┐ ┌──────────────────────────────────┐
│      MathAnnexureViewer.tsx       │ │      MathScratchpad.tsx          │
│ Maps `annexureRef` to:            │ │ Streamlined student working and  │
│ - Table1FuelPricesView            │ │ answer input with DBE rubric     │
│ - Graph12EnergySourcesSVG         │ │ marking & instant model solution │
│ - Sheet13ReadingSurveyView        │ └──────────────────────────────────┘
│ - Table2CarFinancingView          │
│ - AnnexureACellphoneInvoiceView   │
│ - Table3DamLevelsView             │
│ - AnnexureBShowerheadsSVG         │
│ - Table45BiryaniCostsView         │
│ - Table6BiryaniGraphSVG           │
│ - AnnexureCTouristArrivalsSVG     │
│ - Table78SarsTaxSchedulesView     │
│ - BoxPlotMarketShareSVG           │
└───────────────────────────────────┘
```

### Proposed Changes

1. **Question Data Normalization (`lib/maths-literacy-p1-2021-data.ts`)**:
   - Verify all 55 questions against the DBE November 2021 PDF.
   - Tag each question with its exact `annexureRef` (e.g. `table_1`, `graph_1_2`, `sheet_1_3`, `table_2`, `annexure_a`, `table_3`, `annexure_b`, `table_4_5`, `table_6_graph`, `annexure_c`, `table_7_8`, `box_plot_5_2`).

2. **Component Upgrade (`components/MathAnnexureViewer.tsx`)**:
   - Implement the complete suite of DBE November 2021 visual components:
     - **Table 1**: Fuel prices in 6 African countries with exact values ($1,04, 0,47, 0,80, 0,88, 0,86, 0,84) and exchange rates.
     - **Graph 1.2**: Vector stacked bar chart for provincial cooking energy sources.
     - **Sheet 1.3**: Reading habits survey questions A–E.
     - **Table 2**: Ford Figo vs VW Polo financing comparison.
     - **Annexure A**: Cellphone invoice for Mr SJ Fortune with all 3 contract lines, subtotal, VAT R142,95, and Box A.
     - **Table 3**: Dam storage capacity and levels for all 9 provinces with missing value D.
     - **Annexure B**: Grouped bar chart comparing water (litres) and energy (kWh) for low-flow (8 L/min) vs normal (15 L/min).
     - **Table 4 & 5**: Biryani ingredient costs in Rs and exchange rate table (ZAR to INR).
     - **Table 6 & Grid**: Income and cost schedule ($0$ to $100$ plates) with Answer Sheet 4.2.2 break-even coordinate graph.
     - **Annexure C**: Tourist arrivals 2015–2019 bar chart & country of origin pie chart (Bangladesh, USA, UK, Canada, Australia, Other).
     - **Table 7 & 8**: SARS individual tax brackets (1–7), rebates, and medical tax credits.
     - **Figure 5.2**: Triple horizontal box-and-whisker plot for Huawei, Samsung, and Apple.

3. **Validation & Verification**:
   - Run `lint_applet` to confirm zero lint or import errors.
   - Test question browsing across Questions 1 through 55 to confirm every question displays its correct matching table or annexure.
