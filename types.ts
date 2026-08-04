export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1';

export type SituationCategory = 
  | 'Restaurante'
  | 'Aeropuerto'
  | 'Banco'
  | 'Tienda'
  | 'Hotel'
  | 'Trabajo'
  | 'Universidad'
  | 'Autobús'
  | 'Calle'
  | 'Entrevista'
  | 'Vecinos'
  | 'Viaje'
  | 'España';

export interface SituationOption {
  id: string;
  letter: 'A' | 'B' | 'C' | 'D';
  textEs: string;
  textHy: string;
  isCorrect: boolean;
  whyBestEs: string;
  whyWorseEs: string;
  explanationHy: string;
}

export interface Situation {
  id: string;
  category: SituationCategory;
  categoryHy: string;
  level: CEFRLevel;
  questionEs: string;
  questionHy: string;
  options: SituationOption[];
  culturalNoteEs?: string;
  culturalNoteHy?: string;
}

export type WordCategory =
  | 'Viajes'
  | 'Trabajo'
  | 'Compras'
  | 'Comida'
  | 'Transporte'
  | 'España'
  | 'Armenia'
  | 'Animales'
  | 'Profesiones'
  | 'Tecnología'
  | 'Tiempo'
  | 'Sentimientos'
  | 'Medicina'
  | 'Verbos'
  | 'Adjetivos'
  | 'Preposiciones'
  | 'Adverbios'
  | 'Estructuras fraseales'
  | 'Expresiones idiomáticas';

export interface WordItem {
  id: string;
  wordEs: string;
  translationHy: string;
  pronunciation: string;
  category: WordCategory;
  categoryHy: string;
  level: CEFRLevel;
  partOfSpeech: string;
  partOfSpeechHy: string;
  exampleEs: string;
  exampleHy: string;
  synonyms: string[];
  antonyms: string[];
  definitionIntroEs: string;
  definitionIntroHy: string;
  usageContextEs: string;
}

export interface DeepDiveQuiz {
  questionEs: string;
  questionHy: string;
  options: string[];
  correctOptionIndex: number;
  explanationHy: string;
}

export interface DeepDiveExercise {
  sentenceWithBlank: string;
  options: string[];
  answer: string;
  translationHy: string;
}

export interface WordDeepDive {
  word: string;
  translationHy: string;
  meaningDetailEs: string;
  meaningDetailHy: string;
  whenToUseEs: string;
  whenToUseHy: string;
  commonMistakesEs: string;
  commonMistakesHy: string;
  similarWordsDiffEs: string;
  similarWordsDiffHy: string;
  sentenceExamples: { es: string; hy: string }[];
  miniQuiz: DeepDiveQuiz[];
  exercises: DeepDiveExercise[];
}

export interface UserProgress {
  totalSituacionesAnswered: number;
  correctSituaciones: number;
  wordsGuessed: number;
  currentStreak: number;
  coins: number;
  unlockedLevels: CEFRLevel[];
}
