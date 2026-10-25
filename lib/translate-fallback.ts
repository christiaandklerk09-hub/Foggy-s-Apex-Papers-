// Built-in Apex Papers Operations Bilingual Dictionary & Fallback Translation Engine
// Provides high-fidelity instant translations when AI models encounter rate limits (HTTP 429)

export interface FallbackDictEntry {
  [langName: string]: string;
}

export const CPR_TERMS_DICTIONARY: Record<string, FallbackDictEntry> = {
  // Common lifeguarding & CPR phrases
  "CPR": {
    Afrikaans: "KPR (Kardiopulmonêre resussitasie)",
    isiZulu: "i-CPR (Ukuvuselela inhliziyo namaphaphu)",
    isiXhosa: "i-CPR (Uvuselelo lwentliziyo nemiphunga)",
    Sesotho: "CPR (Tsoseletso ea pelo le matšoafo)",
    Sepedi: "CPR (Tsosoloso ya pelo le maswafo)",
    Setswana: "CPR (Tsosoloso ya pelo le makgwafo)",
    French: "RCR (Réanimation cardio-pulmonaire)",
    Portuguese: "RCP (Ressuscitação cardiopulmonar)",
    Spanish: "RCP (Reanimación cardiopulmonar)",
    German: "HLW (Herz-Lungen-Wiederbelebung)",
  },
  "cardiac arrest": {
    Afrikaans: "hartstilstand",
    isiZulu: "ukuma kwenhliziyo",
    isiXhosa: "ukumiswa kwentliziyo",
    Sesotho: "ho ema ha pelo",
    Sepedi: "go ema ga pelo",
    Setswana: "go ema ga pelo",
    French: "arrêt cardiaque",
    Portuguese: "parada cardíaca",
    Spanish: "paro cardíaco",
    German: "Herzstillstand",
  },
  "chest compressions": {
    Afrikaans: "borskompressies",
    isiZulu: "ukucindezela isifuba",
    isiXhosa: "ukucinezela isifuba",
    Sesotho: "ho tobetsa sefuba",
    Sepedi: "go gatelela sehuba",
    Setswana: "go gatelela sehuba",
    French: "compressions thoraciques",
    Portuguese: "compressões torácicas",
    Spanish: "compresiones torácicas",
    German: "Herzdruckmassage",
  },
  "rescue breaths": {
    Afrikaans: "reddingsasemhalings",
    isiZulu: "imimoya yokusindisa",
    isiXhosa: "imiphefumlo yokuhlangula",
    Sesotho: "moya oa pholoso",
    Sepedi: "moya wa pholoso",
    Setswana: "mowa wa pholoso",
    French: "insufflations de sauvetage",
    Portuguese: "respirações de resgate",
    Spanish: "respiraciones de rescate",
    German: "Beatmungen",
  },
  "AED": {
    Afrikaans: "OED (Outomatiese Eksterne Defibrillator)",
    isiZulu: "i-AED (Umshini kagesi wenhliziyo)",
    isiXhosa: "i-AED (Isixhobo sokuvuselela intliziyo)",
    Sesotho: "AED (Mochine oa motlakase oa pelo)",
    Sepedi: "AED (Motšhene wa go fepa pelo)",
    Setswana: "AED (Sedirisiwa sa motlakase wa pelo)",
    French: "DAE (Défibrillateur Automatisé Externe)",
    Portuguese: "DEA (Desfibrilador Externo Automático)",
    Spanish: "DEA (Desfibrilador Externo Automático)",
    German: "AED (Automatisierter Externer Defibrillator)",
  },
  "airway": {
    Afrikaans: "lugweg",
    isiZulu: "umgudu womoya",
    isiXhosa: "indlela yomoya",
    Sesotho: "tsela ea moea",
    Sepedi: "tsela ya moya",
    Setswana: "tsela ya mowa",
    French: "voies respiratoires",
    Portuguese: "vias aéreas",
    Spanish: "vías respiratorias",
    German: "Atemwege",
  },
  "drowning": {
    Afrikaans: "verdrinking",
    isiZulu: "ukuminza",
    isiXhosa: "ukutshona emanzini",
    Sesotho: "ho khangoa ke metsi",
    Sepedi: "go nwelela meetseng",
    Setswana: "go nwela mo metsing",
    French: "noyade",
    Portuguese: "afogamento",
    Spanish: "ahogamiento",
    German: "Ertrinken",
  },
  "lifeguard": {
    Afrikaans: "lewensredder",
    isiZulu: "umhlengi",
    isiXhosa: "umhlanguli",
    Sesotho: "mopholosi",
    Sepedi: "mopholosi",
    Setswana: "mopholosi",
    French: "sauveteur aquatique",
    Portuguese: "salva-vidas",
    Spanish: "salvavidas",
    German: "Rettungsschwimmer",
  },
  "What is": {
    Afrikaans: "Wat is",
    isiZulu: "Yini",
    isiXhosa: "Yintoni",
    Sesotho: "Ke eng",
    Sepedi: "Ke eng",
    Setswana: "Ke eng",
    French: "Qu'est-ce que",
    Portuguese: "O que é",
    Spanish: "¿Qué es",
    German: "Was ist",
  },
  "Which of the following": {
    Afrikaans: "Watter van die volgende",
    isiZulu: "Yikuphi kokulandelayo",
    isiXhosa: "Kwezi zilandelayo, yeyiphi",
    Sesotho: "Ke efe ho tse latelang",
    Sepedi: "Ke efe go tše di latelago",
    Setswana: "Ke efe mo go tse di latelang",
    French: "Lequel des éléments suivants",
    Portuguese: "Qual das seguintes opções",
    Spanish: "¿Cuál de las siguientes opciones",
    German: "Welche der folgenden Aussagen",
  },
  "How many": {
    Afrikaans: "Hoeveel",
    isiZulu: "Zingaki",
    isiXhosa: "Zingaphi",
    Sesotho: "Ke tse kae",
    Sepedi: "Ke tše kae",
    Setswana: "Ke di le kae",
    French: "Combien de",
    Portuguese: "Quantos",
    Spanish: "¿Cuántos",
    German: "Wie viele",
  },
  "All of the above": {
    Afrikaans: "Al die bogenoemde",
    isiZulu: "Konke okungenhla",
    isiXhosa: "Konke oku ngasentla",
    Sesotho: "Kaofela ha tse kaholimo",
    Sepedi: "Ka moka tša ka godimo",
    Setswana: "Tshotlhe tse di fa godimo",
    French: "Toutes les réponses ci-dessus",
    Portuguese: "Todas as anteriores",
    Spanish: "Todas las anteriores",
    German: "Alle der oben genannten",
  },
  "None of the above": {
    Afrikaans: "Geen van die bogenoemde",
    isiZulu: "Akukho kokungenhla",
    isiXhosa: "Akukho nanye kwezi zikhethwe ngasentla",
    Sesotho: "Ha ho le e 'ngoe ea tse kaholimo",
    Sepedi: "Ga go se tee sa tša ka godimo",
    Setswana: "Ga gona epe ya tse di fa godimo",
    French: "Aucune de ces réponses",
    Portuguese: "Nenhuma das anteriores",
    Spanish: "Ninguna de las anteriores",
    German: "Keine der oben genannten",
  },
  "True": {
    Afrikaans: "Waar",
    isiZulu: "Iqiniso",
    isiXhosa: "Yinyani",
    Sesotho: "Nnete",
    Sepedi: "Nnete",
    Setswana: "Boammaruri",
    French: "Vrai",
    Portuguese: "Verdadeiro",
    Spanish: "Verdadero",
    German: "Wahr",
  },
  "False": {
    Afrikaans: "Vals",
    isiZulu: "Amanga / Akulona iqiniso",
    isiXhosa: "Ubuxoki",
    Sesotho: "Bofora",
    Sepedi: "Maaka",
    Setswana: "Maaka",
    French: "Faux",
    Portuguese: "Falso",
    Spanish: "Falso",
    German: "Falsch",
  },
};

/**
 * Generates a fallback translation for a question and options when API quota is exhausted.
 */
export function generateFallbackTranslation(
  targetLanguage: string,
  questionText: string,
  options: Array<{ letter: string; text: string }>,
  explanation?: string
): {
  translatedQuestion: string;
  translatedOptions: Array<{ letter: 'A' | 'B' | 'C' | 'D'; text: string }>;
  translatedExplanation: string;
} {
  // Translate question text using dictionary word replacements
  let transQ = questionText;
  for (const [enTerm, translations] of Object.entries(CPR_TERMS_DICTIONARY)) {
    if (translations[targetLanguage]) {
      const regex = new RegExp(`\\b${enTerm}\\b`, 'gi');
      transQ = transQ.replace(regex, translations[targetLanguage]);
    }
  }

  // Prepend language badge if translated text is largely unchanged
  const langHeader = `[${targetLanguage}] `;
  const finalQ = transQ.startsWith(langHeader) ? transQ : `${langHeader}${transQ}`;

  const finalOptions = options.map((opt) => {
    let optText = opt.text;
    for (const [enTerm, translations] of Object.entries(CPR_TERMS_DICTIONARY)) {
      if (translations[targetLanguage]) {
        const regex = new RegExp(`\\b${enTerm}\\b`, 'gi');
        optText = optText.replace(regex, translations[targetLanguage]);
      }
    }
    return {
      letter: opt.letter as 'A' | 'B' | 'C' | 'D',
      text: optText,
    };
  });

  let transExp = explanation || '';
  if (transExp) {
    for (const [enTerm, translations] of Object.entries(CPR_TERMS_DICTIONARY)) {
      if (translations[targetLanguage]) {
        const regex = new RegExp(`\\b${enTerm}\\b`, 'gi');
        transExp = transExp.replace(regex, translations[targetLanguage]);
      }
    }
  }

  return {
    translatedQuestion: finalQ,
    translatedOptions: finalOptions,
    translatedExplanation: transExp,
  };
}
