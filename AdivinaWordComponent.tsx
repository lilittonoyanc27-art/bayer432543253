import React, { useState, useEffect } from 'react';
import { WordItem, WordCategory, CEFRLevel, WordDeepDive } from './types';
import { INITIAL_WORDS } from './wordGameData';
import { fetchGeneratedWord, fetchWordDeepDive } from './geminiClient';
import { speakSpanishText } from './audioService';
import confetti from 'canvas-confetti';
import { 
  Volume2, 
  Sparkles, 
  Lightbulb, 
  HelpCircle, 
  CheckCircle2, 
  RotateCcw, 
  BookOpen, 
  ListChecks, 
  PenTool, 
  Filter,
  ChevronRight,
  Flame,
  Award
} from 'lucide-react';

interface AdivinaWordComponentProps {
  selectedLevel: CEFRLevel;
  soundEnabled: boolean;
  onWordSolved: () => void;
}

const CATEGORIES: WordCategory[] = [
  'Viajes',
  'Trabajo',
  'Compras',
  'Comida',
  'Transporte',
  'España',
  'Armenia',
  'Animales',
  'Profesiones',
  'Tecnología',
  'Tiempo',
  'Sentimientos',
  'Medicina',
  'Verbos',
  'Adjetivos',
  'Preposiciones',
  'Adverbios',
  'Estructuras fraseales',
  'Expresiones idiomáticas',
];

const SPANISH_ALPHABET = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
  'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
  'Á', 'É', 'Í', 'Ó', 'Ú'
];

export const AdivinaWordComponent: React.FC<AdivinaWordComponentProps> = ({
  selectedLevel,
  soundEnabled,
  onWordSolved,
}) => {
  const [wordsList, setWordsList] = useState<WordItem[]>(INITIAL_WORDS);
  const [selectedCategory, setSelectedCategory] = useState<WordCategory | 'Todas'>('Todas');
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Filtered words
  const filteredWords = wordsList.filter((w) => {
    const matchCat = selectedCategory === 'Todas' || w.category === selectedCategory;
    const matchLvl = w.level === selectedLevel;
    return matchCat && matchLvl;
  });

  const currentWordItem =
    filteredWords[currentIndex % (filteredWords.length || 1)] ||
    wordsList[currentIndex % wordsList.length];

  // Game state
  const targetWord = currentWordItem ? currentWordItem.wordEs.toUpperCase() : '';
  const [guessedLetters, setGuessedLetters] = useState<Set<string>>(new Set());
  const [isWordSolved, setIsWordSolved] = useState<boolean>(false);

  // Hints state
  const [showHyTranslationHint, setShowHyTranslationHint] = useState<boolean>(false);
  const [showDefinitionIntroHint, setShowDefinitionIntroHint] = useState<boolean>(false);
  const [showSentenceContextHint, setShowSentenceContextHint] = useState<boolean>(false);

  // AI Deep Dive state
  const [deepDiveData, setDeepDiveData] = useState<WordDeepDive | null>(null);
  const [isLoadingDeepDive, setIsLoadingDeepDive] = useState<boolean>(false);
  const [activeQuizAnswers, setActiveQuizAnswers] = useState<Record<number, number>>({});
  const [activeExerciseAnswers, setActiveExerciseAnswers] = useState<Record<number, string>>({});

  // AI Generator loading state
  const [isGeneratingWord, setIsGeneratingWord] = useState<boolean>(false);
  const [aiError, setAiError] = useState<string | null>(null);

  // Normalize spanish accented characters for matching if needed
  const normalizeChar = (char: string) => {
    return char.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  // Check if target letter matches
  const isLetterGuessed = (char: string) => {
    if (char === ' ' || char === '-' || char === "'") return true;
    const upperChar = char.toUpperCase();
    if (guessedLetters.has(upperChar)) return true;
    // Also match unaccented version if accent is pressed
    const norm = normalizeChar(upperChar);
    for (let g of guessedLetters) {
      if (normalizeChar(g) === norm) return true;
    }
    return false;
  };

  // Check if word is completely solved
  useEffect(() => {
    if (!targetWord || isWordSolved) return;

    const allSolved = targetWord.split('').every((ch) => isLetterGuessed(ch));
    if (allSolved) {
      setIsWordSolved(true);
      onWordSolved();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });

      if (soundEnabled) {
        speakSpanishText(currentWordItem.wordEs);
      }

      // Auto fetch AI Deep Dive
      loadDeepDive(currentWordItem.wordEs, currentWordItem.translationHy);
    }
  }, [guessedLetters, targetWord]);

  const handleGuessLetter = (letter: string) => {
    if (isWordSolved) return;
    const upperLetter = letter.toUpperCase();
    setGuessedLetters((prev) => new Set([...prev, upperLetter]));
  };

  // Keyboard handler for physical typing
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isWordSolved) return;
      const key = e.key.toUpperCase();
      if (SPANISH_ALPHABET.includes(key)) {
        handleGuessLetter(key);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isWordSolved]);

  const loadDeepDive = async (wordEs: string, translationHy: string) => {
    setIsLoadingDeepDive(true);
    const deepDive = await fetchWordDeepDive(wordEs, translationHy);
    setDeepDiveData(deepDive);
    setIsLoadingDeepDive(false);
  };

  const handleNextWord = () => {
    setGuessedLetters(new Set());
    setIsWordSolved(false);
    setShowHyTranslationHint(false);
    setShowDefinitionIntroHint(false);
    setShowSentenceContextHint(false);
    setDeepDiveData(null);
    setActiveQuizAnswers({});
    setActiveExerciseAnswers({});
    setCurrentIndex((prev) => prev + 1);
  };

  // Hint Functions
  const hintShowFirstLetter = () => {
    if (!targetWord) return;
    const firstChar = targetWord[0];
    if (firstChar) setGuessedLetters((prev) => new Set([...prev, firstChar]));
  };

  const hintShowLastLetter = () => {
    if (!targetWord) return;
    const lastChar = targetWord[targetWord.length - 1];
    if (lastChar) setGuessedLetters((prev) => new Set([...prev, lastChar]));
  };

  const hintRevealRandomLetter = () => {
    if (!targetWord) return;
    const unrevealed = targetWord.split('').filter((ch) => !isLetterGuessed(ch));
    if (unrevealed.length > 0) {
      const randomChar = unrevealed[Math.floor(Math.random() * unrevealed.length)];
      setGuessedLetters((prev) => new Set([...prev, randomChar]));
    }
  };

  const hintPlayAudio = () => {
    if (currentWordItem) {
      speakSpanishText(currentWordItem.wordEs);
    }
  };

  const handleGenerateAiWord = async () => {
    setIsGeneratingWord(true);
    setAiError(null);
    const catToUse = selectedCategory === 'Todas' ? 'Viajes' : selectedCategory;

    const newWord = await fetchGeneratedWord(catToUse, selectedLevel);
    setIsGeneratingWord(false);

    if (newWord) {
      setWordsList((prev) => [newWord, ...prev]);
      setCurrentIndex(0);
      setGuessedLetters(new Set());
      setIsWordSolved(false);
      setShowHyTranslationHint(false);
      setShowDefinitionIntroHint(false);
      setShowSentenceContextHint(false);
      setDeepDiveData(null);
    } else {
      setAiError('Չհաջողվեց ստեղծել նոր բառ ԱԲ-ի միջոցով։ Փորձեք կրկին։');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      
      {/* Category Filter Bar */}
      <div className="bg-white border border-slate-200 rounded-3xl p-4 shadow-sm shadow-slate-200/50">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-2 text-slate-700 font-bold text-sm">
            <Filter className="w-4 h-4 text-teal-600" />
            <span>Բառերի թեմաներ (Categorías):</span>
          </div>

          <div className="flex flex-wrap gap-1.5 overflow-x-auto max-w-full pb-1 sm:pb-0">
            <button
              onClick={() => { setSelectedCategory('Todas'); setCurrentIndex(0); setGuessedLetters(new Set()); setIsWordSolved(false); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === 'Todas'
                  ? 'bg-teal-600 text-white font-bold shadow-md shadow-teal-600/20'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
              }`}
            >
              Բոլոր թեմաները
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => { setSelectedCategory(cat); setCurrentIndex(0); setGuessedLetters(new Set()); setIsWordSolved(false); }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-teal-600 text-white font-bold shadow-md shadow-teal-600/20'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Game Card */}
      {currentWordItem && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/60 space-y-6 relative overflow-hidden">
          
          {/* Header info */}
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 bg-teal-50 text-teal-700 border border-teal-200 text-xs font-extrabold rounded-full uppercase tracking-wider">
                {currentWordItem.category} ({currentWordItem.categoryHy})
              </span>
              <span className="px-2.5 py-1 bg-orange-50 text-orange-700 text-xs font-bold rounded-full border border-orange-200">
                {currentWordItem.level} • {currentWordItem.partOfSpeech}
              </span>
            </div>

            <div className="text-xs text-slate-500 font-bold">
              Adivina la palabra / Գուշակիր բառը
            </div>
          </div>

          {/* Masked Word Display */}
          <div 
            onClick={() => setShowHyTranslationHint(!showHyTranslationHint)}
            className="py-8 bg-slate-50/90 border border-slate-200 rounded-2xl flex flex-col items-center justify-center gap-3 px-4 shadow-inner min-h-[120px] cursor-pointer group hover:border-teal-300 transition-all"
            title="Սեղմեք հայերեն թարգմանությունը ցուցադրելու/թաքցնելու համար"
          >
            <div className="text-[11px] text-slate-500 font-bold bg-white px-3 py-1 rounded-full border border-slate-200 group-hover:bg-teal-50 group-hover:text-teal-700 transition-colors">
              {showHyTranslationHint ? 'Թարգմանությունը ցուցադրված է 🇦🇲' : 'Սեղմեք թարգմանության համար 🇦🇲'}
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              {targetWord.split('').map((char, idx) => {
                const revealed = isLetterGuessed(char);
                const isSpace = char === ' ' || char === '-';

                if (isSpace) {
                  return (
                    <span key={idx} className="w-6 h-12 flex items-center justify-center text-slate-400 font-bold text-2xl">
                      {char}
                    </span>
                  );
                }

                return (
                  <div
                    key={idx}
                    className={`w-10 h-12 sm:w-12 sm:h-14 rounded-xl flex items-center justify-center font-extrabold text-2xl sm:text-3xl transition-all shadow-md ${
                      revealed
                        ? 'bg-gradient-to-t from-teal-600 to-teal-500 text-white border-2 border-teal-400 scale-105 shadow-teal-600/20'
                        : 'bg-slate-100 border-2 border-slate-300 text-transparent border-dashed'
                    }`}
                  >
                    {revealed ? char : '_'}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Hints Panel */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
            <div className="flex items-center space-x-2 text-xs font-extrabold text-orange-600 uppercase tracking-wider">
              <HelpCircle className="w-4 h-4" />
              <span>Օգնություն (Podskazki / Օգնություն):</span>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={hintShowFirstLetter}
                disabled={isWordSolved}
                className="px-3 py-1.5 bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 text-xs font-semibold rounded-lg transition-colors disabled:opacity-40 shadow-sm"
              >
                1-ին տառ
              </button>

              <button
                onClick={hintShowLastLetter}
                disabled={isWordSolved}
                className="px-3 py-1.5 bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 text-xs font-semibold rounded-lg transition-colors disabled:opacity-40 shadow-sm"
              >
                Վերջին տառ
              </button>

              <button
                onClick={hintRevealRandomLetter}
                disabled={isWordSolved}
                className="px-3 py-1.5 bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 text-xs font-semibold rounded-lg transition-colors disabled:opacity-40 shadow-sm"
              >
                Պատահական տառ
              </button>

              <button
                onClick={() => setShowHyTranslationHint(!showHyTranslationHint)}
                className="px-3 py-1.5 bg-orange-100 hover:bg-orange-200 border border-orange-200 text-orange-800 text-xs font-semibold rounded-lg transition-colors shadow-sm"
              >
                {showHyTranslationHint ? 'Թաքցնել թարգմանությունը' : 'Թարգմանություն 🇦🇲'}
              </button>

              <button
                onClick={() => setShowDefinitionIntroHint(!showDefinitionIntroHint)}
                className="px-3 py-1.5 bg-teal-100 hover:bg-teal-200 border border-teal-200 text-teal-800 text-xs font-semibold rounded-lg transition-colors shadow-sm"
              >
                {showDefinitionIntroHint ? 'Թաքցնել սահմանումը' : 'Սահմանում ES'}
              </button>

              <button
                onClick={() => setShowSentenceContextHint(!showSentenceContextHint)}
                className="px-3 py-1.5 bg-sky-100 hover:bg-sky-200 border border-sky-200 text-sky-800 text-xs font-semibold rounded-lg transition-colors shadow-sm"
              >
                {showSentenceContextHint ? 'Թաքցնել օրինակը' : 'Կոնտեքստ նախադասության մեջ'}
              </button>

              <button
                onClick={hintPlayAudio}
                className="px-3 py-1.5 bg-emerald-100 hover:bg-emerald-200 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-lg transition-colors flex items-center space-x-1 shadow-sm"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Արտասանություն</span>
              </button>
            </div>

            {/* Revealed Hint Displays */}
            {showHyTranslationHint && (
              <div className="p-3 bg-orange-50 border-l-4 border-orange-500 text-orange-950 text-sm font-semibold rounded-r-xl animate-fadeIn shadow-sm">
                🇦🇲 Թարգմանություն: <span className="font-bold">{currentWordItem.translationHy}</span>
              </div>
            )}

            {showDefinitionIntroHint && (
              <div className="p-3 bg-teal-50 border-l-4 border-teal-500 text-teal-950 text-sm font-medium rounded-r-xl animate-fadeIn shadow-sm">
                💡 Սահմանում: {currentWordItem.definitionIntroEs}
                <div className="text-xs text-teal-800 mt-1 font-medium">🇦🇲 {currentWordItem.definitionIntroHy}</div>
              </div>
            )}

            {showSentenceContextHint && (
              <div className="p-3 bg-sky-50 border-l-4 border-sky-500 text-sky-950 text-sm font-medium rounded-r-xl animate-fadeIn shadow-sm">
                💬 Օրինակներ: {currentWordItem.exampleEs}
                <div className="text-xs text-sky-800 mt-1 font-medium">🇦🇲 {currentWordItem.exampleHy}</div>
              </div>
            )}
          </div>

          {/* Virtual Keyboard */}
          {!isWordSolved && (
            <div className="space-y-2 pt-2">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider text-center">
                Մուտքագրեք կամ սեղմեք տառը․
              </div>

              <div className="flex flex-wrap justify-center gap-1.5 max-w-2xl mx-auto">
                {SPANISH_ALPHABET.map((letter) => {
                  const isUsed = guessedLetters.has(letter);
                  const isTargetChar = targetWord.includes(letter);

                  let btnStyle = 'bg-slate-100 hover:bg-teal-600 hover:text-white text-slate-800 border-slate-300 hover:border-teal-500 hover:scale-105';

                  if (isUsed) {
                    if (isTargetChar) {
                      btnStyle = 'bg-emerald-500 border-emerald-600 text-white font-bold opacity-90 shadow-sm';
                    } else {
                      btnStyle = 'bg-slate-200 border-slate-300 text-slate-400 opacity-40 cursor-not-allowed';
                    }
                  }

                  return (
                    <button
                      key={letter}
                      onClick={() => handleGuessLetter(letter)}
                      disabled={isUsed}
                      className={`w-9 h-10 sm:w-11 sm:h-12 rounded-xl font-bold text-sm sm:text-base border transition-all shadow-sm ${btnStyle}`}
                    >
                      {letter}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Word Solved Completion Card & Deep Dive Analysis */}
          {isWordSolved && (
            <div className="mt-8 space-y-6 animate-fadeIn">
              
              {/* Solved Banner Card */}
              <div className="p-6 bg-gradient-to-br from-teal-50 via-white to-orange-50 border-2 border-teal-500 rounded-3xl space-y-4 shadow-xl">
                
                <div className="flex items-center justify-between border-b border-teal-200 pb-4">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                    <div>
                      <span className="text-xs text-teal-700 font-extrabold uppercase tracking-wider">
                        Բառը գուշակված է! ¡Palabra adivinada!
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-wide">
                        {currentWordItem.wordEs}
                      </h3>
                    </div>
                  </div>

                  <button
                    onClick={hintPlayAudio}
                    className="p-3 bg-teal-100 hover:bg-teal-200 text-teal-700 rounded-2xl border border-teal-300 transition-all hover:scale-105 shadow-sm"
                    title="Լսել արտասանությունը"
                  >
                    <Volume2 className="w-6 h-6" />
                  </button>
                </div>

                {/* Word Card Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-slate-800 pt-2">
                  <div className="bg-white p-3.5 rounded-2xl border border-teal-200 shadow-sm">
                    <span className="text-xs text-orange-600 font-bold block">🇦🇲 Թարգմանությունը հայերեն:</span>
                    <span className="text-lg font-bold text-slate-900">{currentWordItem.translationHy}</span>
                  </div>

                  <div className="bg-white p-3.5 rounded-2xl border border-teal-200 shadow-sm">
                    <span className="text-xs text-teal-700 font-bold block">🗣 Pronunciación / Ֆոնետիկա:</span>
                    <span className="text-base font-semibold text-teal-800">[{currentWordItem.pronunciation}]</span>
                  </div>

                  <div className="bg-white p-3.5 rounded-2xl border border-teal-200 sm:col-span-2 shadow-sm">
                    <span className="text-xs text-amber-600 font-bold block">💬 Օրինակ նախադասության մեջ:</span>
                    <span className="text-base font-bold text-slate-900">{currentWordItem.exampleEs}</span>
                    <span className="text-sm block text-slate-600 font-medium mt-1">🇦🇲 {currentWordItem.exampleHy}</span>
                  </div>

                  {currentWordItem.synonyms.length > 0 && (
                    <div className="bg-white p-3 rounded-2xl border border-teal-200 shadow-sm">
                      <span className="text-xs text-emerald-700 font-bold block">Հոմանիշներ (Sinónimos):</span>
                      <span className="text-sm font-medium text-slate-700">{currentWordItem.synonyms.join(', ')}</span>
                    </div>
                  )}

                  {currentWordItem.antonyms.length > 0 && (
                    <div className="bg-white p-3 rounded-2xl border border-teal-200 shadow-sm">
                      <span className="text-xs text-rose-700 font-bold block">Հականիշներ (Antónimos):</span>
                      <span className="text-sm font-medium text-slate-700">{currentWordItem.antonyms.join(', ')}</span>
                    </div>
                  )}
                </div>

                {/* Next Word Button */}
                <div className="pt-4 flex justify-end">
                  <button
                    id="next-word-btn"
                    onClick={handleNextWord}
                    className="px-6 py-3 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-extrabold rounded-2xl shadow-lg shadow-teal-600/25 flex items-center space-x-2 transition-all hover:scale-105"
                  >
                    <span>Հաջորդ բառը</span>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

              </div>

              {/* AI Deep Dive Explanation Section */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-6 shadow-sm">
                
                <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                  <div className="flex items-center space-x-2.5">
                    <Sparkles className="w-6 h-6 text-orange-500 animate-bounce" />
                    <div>
                      <h4 className="text-lg font-extrabold text-slate-900">
                        Բառի խորացված վերլուծություն ԱԲ-ից (Análisis de la palabra)
                      </h4>
                      <p className="text-xs text-slate-500 font-medium">
                        Իմաստներ, նրբերանգներ, օգտագործման կոնտեքստ և հաճախակի սխալներ
                      </p>
                    </div>
                  </div>

                  {isLoadingDeepDive && (
                    <span className="text-xs text-orange-700 font-bold bg-orange-100 px-3 py-1 rounded-full border border-orange-200">
                      ԱԲ-ն բեռնվում է...
                    </span>
                  )}
                </div>

                {deepDiveData ? (
                  <div className="space-y-6 text-sm sm:text-base text-slate-800">
                    
                    {/* Meaning & Nuance */}
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                      <h5 className="font-bold text-orange-700 flex items-center space-x-2">
                        <BookOpen className="w-4 h-4 text-orange-500" />
                        <span>Իմաստ և նրբերանգներ (Significado y matices):</span>
                      </h5>
                      <p className="text-slate-700 leading-relaxed font-medium">{deepDiveData.meaningDetailEs}</p>
                      <p className="text-orange-950 font-semibold text-sm pt-2 border-t border-slate-200">
                        🇦🇲 {deepDiveData.meaningDetailHy}
                      </p>
                    </div>

                    {/* When to use */}
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                      <h5 className="font-bold text-teal-700 flex items-center space-x-2">
                        <Lightbulb className="w-4 h-4 text-teal-600" />
                        <span>Երբ է օգտագործվում (Cuándo se utiliza):</span>
                      </h5>
                      <p className="text-slate-700 leading-relaxed font-medium">{deepDiveData.whenToUseEs}</p>
                      <p className="text-teal-950 font-semibold text-sm pt-2 border-t border-slate-200">
                        🇦🇲 {deepDiveData.whenToUseHy}
                      </p>
                    </div>

                    {/* Common Mistakes */}
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                      <h5 className="font-bold text-rose-700 flex items-center space-x-2">
                        <HelpCircle className="w-4 h-4 text-rose-500" />
                        <span>Ուսանողների հաճախակի սխալները (Errores frecuentes):</span>
                      </h5>
                      <p className="text-slate-700 leading-relaxed font-medium">{deepDiveData.commonMistakesEs}</p>
                      <p className="text-rose-950 font-semibold text-sm pt-2 border-t border-slate-200">
                        🇦🇲 {deepDiveData.commonMistakesHy}
                      </p>
                    </div>

                    {/* 5-10 Real Examples */}
                    {deepDiveData.sentenceExamples && deepDiveData.sentenceExamples.length > 0 && (
                      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                        <h5 className="font-bold text-emerald-700 flex items-center space-x-2">
                          <ListChecks className="w-4 h-4 text-emerald-600" />
                          <span>5-10 Կիրառման օրինակներ (Ejemplos reales):</span>
                        </h5>

                        <div className="space-y-2 max-h-72 overflow-y-auto pr-2">
                          {deepDiveData.sentenceExamples.map((ex, idx) => (
                            <div key={idx} className="p-3 bg-white rounded-xl border border-slate-200 shadow-sm">
                              <p className="font-bold text-slate-900 text-sm">{idx + 1}. {ex.es}</p>
                              <p className="text-xs text-orange-950 font-medium mt-0.5">🇦🇲 {ex.hy}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Mini Quiz */}
                    {deepDiveData.miniQuiz && deepDiveData.miniQuiz.length > 0 && (
                      <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                        <h5 className="font-bold text-orange-800 flex items-center space-x-2">
                          <Award className="w-5 h-5 text-orange-600" />
                          <span>Մինի-վիկտորինա բառն ամրապնդելու համար․</span>
                        </h5>

                        {deepDiveData.miniQuiz.map((quiz, qIdx) => {
                          const chosenOption = activeQuizAnswers[qIdx];
                          const isAnswered = chosenOption !== undefined;

                          return (
                            <div key={qIdx} className="p-4 bg-white rounded-2xl border border-slate-200 space-y-3 shadow-sm">
                              <p className="font-bold text-slate-900 text-sm">
                                {qIdx + 1}. {quiz.questionEs}
                              </p>
                              <p className="text-xs text-orange-900 font-medium">🇦🇲 {quiz.questionHy}</p>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                                {quiz.options.map((opt, optIdx) => {
                                  const isCorrect = optIdx === quiz.correctOptionIndex;
                                  const isSelected = chosenOption === optIdx;

                                  let btnStyle = 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200';

                                  if (isAnswered) {
                                    if (isCorrect) btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold';
                                    else if (isSelected) btnStyle = 'bg-rose-50 border-rose-500 text-rose-950 font-semibold';
                                    else btnStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-50';
                                  }

                                  return (
                                    <button
                                      key={optIdx}
                                      onClick={() => setActiveQuizAnswers((prev) => ({ ...prev, [qIdx]: optIdx }))}
                                      disabled={isAnswered}
                                      className={`p-2.5 rounded-xl border text-xs sm:text-sm text-left font-medium transition-all ${btnStyle}`}
                                    >
                                      {opt}
                                    </button>
                                  );
                                })}
                              </div>

                              {isAnswered && (
                                <p className="text-xs text-emerald-900 bg-emerald-50 p-2.5 rounded-xl border border-emerald-300 font-medium">
                                  🇦🇲 {quiz.explanationHy}
                                </p>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}

                  </div>
                ) : (
                  <div className="text-slate-500 text-sm italic py-4">
                    Բառի մանրամասն ֆիլոլոգիական վերլուծության բեռնում ԱԲ-ի միջոցով...
                  </div>
                )}

              </div>

            </div>
          )}

          {/* AI Generator Footer Control */}
          <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-500 font-medium flex items-center space-x-1.5">
              <Sparkles className="w-4 h-4 text-teal-600 animate-pulse" />
              <span>Բառերի անսահմանափակ պաշար տարբեր թեմաներից Gemini AI-ով</span>
            </div>

            <button
              id="generate-ai-word-btn"
              onClick={handleGenerateAiWord}
              disabled={isGeneratingWord}
              className="px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-md shadow-teal-600/20 transition-all flex items-center space-x-2 disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span>{isGeneratingWord ? 'Բառի գեներացում...' : 'Ստեղծել նոր բառ ԱԲ-ով'}</span>
            </button>
          </div>

          {aiError && (
            <div className="mt-3 text-xs text-rose-700 bg-rose-50 p-3 rounded-xl border border-rose-200 font-medium">
              {aiError}
            </div>
          )}

        </div>
      )}

    </div>
  );
};
