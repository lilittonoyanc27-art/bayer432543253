import React, { useState } from 'react';
import { Situation, SituationCategory, CEFRLevel } from './types';
import { INITIAL_SITUATIONS } from './situationsData';
import { fetchGeneratedSituation } from './geminiClient';
import { speakSpanishText } from './audioService';
import { 
  Volume2, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  ArrowRight, 
  Eye, 
  EyeOff, 
  Lightbulb, 
  HelpCircle,
  RotateCcw,
  BookOpen,
  Filter
} from 'lucide-react';

interface SituacionesComponentProps {
  selectedLevel: CEFRLevel;
  soundEnabled: boolean;
  onAnswerCorrect: () => void;
  onAnswerIncorrect: () => void;
}

const CATEGORIES: SituationCategory[] = [
  'Restaurante',
  'Aeropuerto',
  'Banco',
  'Tienda',
  'Hotel',
  'Trabajo',
  'Universidad',
  'Autobús',
  'Calle',
  'Entrevista',
  'Vecinos',
  'Viaje',
  'España',
];

export const SituacionesComponent: React.FC<SituacionesComponentProps> = ({
  selectedLevel,
  soundEnabled,
  onAnswerCorrect,
  onAnswerIncorrect,
}) => {
  const [situationsList, setSituationsList] = useState<Situation[]>(INITIAL_SITUATIONS);
  const [selectedCategory, setSelectedCategory] = useState<SituationCategory | 'Todas'>('Todas');
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Hidden/revealed translation states
  const [showQuestionHy, setShowQuestionHy] = useState<boolean>(false);
  const [revealedOptionsHy, setRevealedOptionsHy] = useState<Record<string, boolean>>({});

  // Answer selection state
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);

  // AI loading state
  const [isGeneratingAi, setIsGeneratingAi] = useState<boolean>(false);
  const [aiError, setAiError] = useState<string | null>(null);

  // Filter situations based on category and level
  const filteredSituations = situationsList.filter((s) => {
    const matchCategory = selectedCategory === 'Todas' || s.category === selectedCategory;
    const matchLevel = s.level === selectedLevel;
    return matchCategory && matchLevel;
  });

  // Active current situation or fallback
  const currentSituation =
    filteredSituations[currentIndex % (filteredSituations.length || 1)] ||
    situationsList[currentIndex % situationsList.length];

  const handleSelectOption = (optionId: string) => {
    if (isAnswerSubmitted) {
      // If answer is already submitted, clicking an option toggles its Armenian translation
      setRevealedOptionsHy((prev) => ({
        ...prev,
        [optionId]: !prev[optionId],
      }));
      return;
    }
    setSelectedOptionId(optionId);
    setIsAnswerSubmitted(true);

    // Automatically reveal Armenian translation for selected option & correct option
    const correctOptId = currentSituation?.options.find((o) => o.isCorrect)?.id;
    setRevealedOptionsHy((prev) => ({
      ...prev,
      [optionId]: true,
      ...(correctOptId ? { [correctOptId]: true } : {}),
    }));

    const chosenOption = currentSituation?.options.find((o) => o.id === optionId);
    if (chosenOption?.isCorrect) {
      onAnswerCorrect();
    } else {
      onAnswerIncorrect();
    }

    if (soundEnabled && chosenOption) {
      speakSpanishText(chosenOption.textEs);
    }
  };

  const handleNextSituation = () => {
    setSelectedOptionId(null);
    setIsAnswerSubmitted(false);
    setShowQuestionHy(false);
    setRevealedOptionsHy({});
    setCurrentIndex((prev) => prev + 1);
  };

  const toggleOptionHy = (optionId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // prevent selecting option when clicking translation button
    setRevealedOptionsHy((prev) => ({
      ...prev,
      [optionId]: !prev[optionId],
    }));
  };

  const handleGenerateAiSituation = async () => {
    setIsGeneratingAi(true);
    setAiError(null);
    const categoryToUse = selectedCategory === 'Todas' ? 'Restaurante' : selectedCategory;

    const newSituation = await fetchGeneratedSituation(selectedLevel, categoryToUse);
    setIsGeneratingAi(false);

    if (newSituation) {
      setSituationsList((prev) => [newSituation, ...prev]);
      setCurrentIndex(0);
      setSelectedOptionId(null);
      setIsAnswerSubmitted(false);
      setShowQuestionHy(false);
      setRevealedOptionsHy({});
    } else {
      setAiError('Չհաջողվեց ստեղծել նոր իրավիճակ ԱԲ-ի միջոցով։ Փորձեք կրկին։');
    }
  };

  const playAudio = (text: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    speakSpanishText(text);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      
      {/* Category & Filter Bar */}
      <div className="bg-white border border-slate-200 rounded-3xl p-4 shadow-sm shadow-slate-200/50">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-2 text-slate-700 font-bold text-sm">
            <Filter className="w-4 h-4 text-orange-500" />
            <span>Իրավիճակների կատեգորիաներ․</span>
          </div>

          <div className="flex flex-wrap gap-1.5 overflow-x-auto max-w-full pb-1 sm:pb-0">
            <button
              onClick={() => { setSelectedCategory('Todas'); setCurrentIndex(0); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === 'Todas'
                  ? 'bg-orange-500 text-white font-bold shadow-md shadow-orange-500/20'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
              }`}
            >
              Բոլորը
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => { setSelectedCategory(cat); setCurrentIndex(0); }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-orange-500 text-white font-bold shadow-md shadow-orange-500/20'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Situation Card */}
      {currentSituation && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/60 relative overflow-hidden transition-all space-y-6">
          
          {/* Header Badges */}
          <div className="flex items-center justify-between pb-5 border-b border-slate-200/80">
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 bg-orange-50 text-orange-700 border border-orange-200 text-xs font-extrabold rounded-full uppercase tracking-wider">
                {currentSituation.category} ({currentSituation.categoryHy})
              </span>
              <span className="px-2.5 py-1 bg-teal-50 text-teal-700 text-xs font-bold rounded-full border border-teal-200">
                Nivel {currentSituation.level}
              </span>
            </div>

            <div className="text-xs text-slate-500 font-bold">
              ¿Qué harías tú? / Դու ինչպե՞ս կվարվեիր։
            </div>
          </div>

          {/* Question Box */}
          <div className="py-2">
            <div className="flex items-start justify-between gap-4">
              <div 
                onClick={() => setShowQuestionHy(!showQuestionHy)}
                className="cursor-pointer group flex-1"
                title="Սեղմեք հայերեն թարգմանությունը ցուցադրելու/թաքցնելու համար"
              >
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-xs text-orange-600 font-bold tracking-wide uppercase">
                    Իսպաներեն իրավիճակ
                  </span>
                  <span className="text-[10px] text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full group-hover:bg-orange-100 group-hover:text-orange-700 transition-colors font-medium">
                    {showQuestionHy ? 'Թարգմանությունը ցուցադրված է' : 'Սեղմեք թարգմանության համար 🇦🇲'}
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-orange-600 transition-colors leading-relaxed">
                  {currentSituation.questionEs}
                </h2>

                {/* Click-to-reveal Armenian Translation */}
                {showQuestionHy && (
                  <div className="mt-3 p-3.5 bg-orange-50/80 border-l-4 border-orange-500 text-orange-900 text-base font-semibold rounded-r-2xl animate-fadeIn">
                    🇦🇲 {currentSituation.questionHy}
                  </div>
                )}
              </div>

              {/* Audio button */}
              <button
                onClick={(e) => playAudio(currentSituation.questionEs, e)}
                className="p-3 bg-orange-50 hover:bg-orange-100 text-orange-600 rounded-2xl border border-orange-200 transition-all hover:scale-105 shrink-0 shadow-sm"
                title="Լսել արտասանությունը"
              >
                <Volume2 className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Options Grid (4 Choices) */}
          <div className="space-y-3 pt-1">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Ընտրեք ամենաբնական պատասխանը․
            </div>

            {currentSituation.options.map((option) => {
              const isSelected = selectedOptionId === option.id;
              const isCorrectOption = option.isCorrect;
              const isOptionHyShown = !!revealedOptionsHy[option.id];

              let cardStyles = 'bg-slate-50/80 border-slate-200 text-slate-800 hover:bg-orange-50/50 hover:border-orange-300 shadow-sm';

              if (isAnswerSubmitted) {
                if (isCorrectOption) {
                  cardStyles = 'bg-emerald-50 border-emerald-500 text-emerald-950 shadow-md shadow-emerald-500/10';
                } else if (isSelected && !isCorrectOption) {
                  cardStyles = 'bg-rose-50 border-rose-500 text-rose-950 shadow-md shadow-rose-500/10';
                } else {
                  cardStyles = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                }
              }

              return (
                <div
                  key={option.id}
                  onClick={() => handleSelectOption(option.id)}
                  className={`p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer relative ${cardStyles}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start space-x-3.5 flex-1">
                      
                      {/* Option Letter Badge */}
                      <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 shadow-sm ${
                        isAnswerSubmitted && isCorrectOption
                          ? 'bg-emerald-500 text-white'
                          : isAnswerSubmitted && isSelected && !isCorrectOption
                          ? 'bg-rose-500 text-white'
                          : 'bg-slate-200 text-slate-800 border border-slate-300'
                      }`}>
                        {option.letter}
                      </span>

                      <div className="flex-1">
                        {/* Spanish Option Text */}
                        <p className="text-base sm:text-lg font-bold leading-snug">
                          {option.textEs}
                        </p>

                        {/* Armenian Translation Toggle Button / Display */}
                        <div className="mt-2 flex items-center space-x-2">
                          <button
                            type="button"
                            onClick={(e) => toggleOptionHy(option.id, e)}
                            className="inline-flex items-center space-x-1 text-xs text-orange-700 font-semibold bg-orange-100 hover:bg-orange-200 px-2.5 py-1 rounded-lg border border-orange-200 transition-colors"
                          >
                            {isOptionHyShown ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                            <span>{isOptionHyShown ? 'Թաքցնել 🇦🇲' : 'Թարգմանություն 🇦🇲'}</span>
                          </button>

                          {/* Audio button for option */}
                          <button
                            type="button"
                            onClick={(e) => playAudio(option.textEs, e)}
                            className="text-slate-400 hover:text-orange-600 p-1"
                            title="Լսել տարբերակը"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Armenian Translation line */}
                        {isOptionHyShown && (
                          <p className="mt-2 text-sm text-orange-950 bg-orange-50/90 p-2.5 rounded-xl border-l-4 border-orange-500 font-medium">
                            🇦🇲 {option.textHy}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Status Icon after submission */}
                    {isAnswerSubmitted && (
                      <div className="shrink-0">
                        {isCorrectOption ? (
                          <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                        ) : isSelected ? (
                          <XCircle className="w-6 h-6 text-rose-600" />
                        ) : null}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Feedback & Detailed Explanation Section after Choice */}
          {isAnswerSubmitted && (
            <div className="mt-8 p-6 bg-orange-50/60 border border-orange-200 rounded-3xl space-y-4 animate-fadeIn shadow-sm">
              
              <div className="flex items-center space-x-2 text-orange-800 font-extrabold text-lg border-b border-orange-200 pb-3">
                <Lightbulb className="w-6 h-6 text-orange-600" />
                <span>Իրավիճակի վերլուծություն և ինչու է այս պատասխանը լավագույնը․</span>
              </div>

              {/* Correct Option Explanation */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                  ✓ Ճիշտ պատասխան (Respuesta correcta):
                </div>
                <p className="text-slate-800 text-sm sm:text-base font-medium leading-relaxed bg-emerald-50 p-3.5 rounded-2xl border-l-4 border-emerald-500 shadow-sm">
                  {currentSituation.options.find((o) => o.isCorrect)?.whyBestEs}
                </p>
              </div>

              {/* Armenian Explanation for Armenian Students */}
              <div className="space-y-2 pt-2">
                <div className="text-xs font-bold text-orange-700 uppercase tracking-wider">
                  🇦🇲 Բացատրություն հայերենով․
                </div>
                <p className="text-orange-950 text-sm sm:text-base font-semibold leading-relaxed bg-white p-3.5 rounded-2xl border-l-4 border-orange-500 shadow-sm">
                  {currentSituation.options.find((o) => o.isCorrect)?.explanationHy}
                </p>
              </div>

              {/* Cultural Note if available */}
              {currentSituation.culturalNoteEs && (
                <div className="mt-4 p-3.5 bg-white rounded-2xl border border-orange-200 text-xs sm:text-sm text-slate-700 shadow-sm">
                  <span className="font-bold text-orange-700">💡 Nota cultural / Մշակութային ակնարկ: </span>
                  {currentSituation.culturalNoteEs}
                  {currentSituation.culturalNoteHy && (
                    <div className="mt-1 text-orange-900 font-medium">🇦🇲 {currentSituation.culturalNoteHy}</div>
                  )}
                </div>
              )}

              {/* Next Button */}
              <div className="pt-4 flex justify-end">
                <button
                  id="next-situation-btn"
                  onClick={handleNextSituation}
                  className="px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold rounded-2xl shadow-lg shadow-orange-500/25 flex items-center space-x-2 transition-all hover:scale-105"
                >
                  <span>Հաջորդ իրավիճակը</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>

            </div>
          )}

          {/* AI Generation Footer Control */}
          <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-500 font-medium flex items-center space-x-1.5">
              <Sparkles className="w-4 h-4 text-orange-500 animate-pulse" />
              <span>Հազարավոր իրական իրավիճակների գեներացիա Gemini AI-ի միջոցով</span>
            </div>

            <button
              id="generate-ai-situation-btn"
              onClick={handleGenerateAiSituation}
              disabled={isGeneratingAi}
              className="px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-md shadow-orange-500/20 transition-all flex items-center space-x-2 disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span>{isGeneratingAi ? 'Գեներացվում է ԱԲ-ով...' : 'Ստեղծել նոր իրավիճակ ԱԲ-ով'}</span>
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
