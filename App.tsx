import React, { useState } from 'react';
import { CEFRLevel, UserProgress } from './types';
import { HeaderNav } from './HeaderNav';
import { SituacionesComponent } from './SituacionesComponent';
import { AdivinaWordComponent } from './AdivinaWordComponent';
import { InfoModal } from './InfoModal';
import { Sparkles, HeartHandshake, Award } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'situaciones' | 'adivina'>('situaciones');
  const [selectedLevel, setSelectedLevel] = useState<CEFRLevel>('A1');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState<boolean>(false);

  const [userProgress, setUserProgress] = useState<UserProgress>({
    totalSituacionesAnswered: 0,
    correctSituaciones: 0,
    wordsGuessed: 0,
    currentStreak: 0,
    coins: 50,
    unlockedLevels: ['A1', 'A2', 'B1', 'B2', 'C1'],
  });

  const handleSituacionCorrect = () => {
    setUserProgress((prev) => ({
      ...prev,
      totalSituacionesAnswered: prev.totalSituacionesAnswered + 1,
      correctSituaciones: prev.correctSituaciones + 1,
      currentStreak: prev.currentStreak + 1,
      coins: prev.coins + 15,
    }));
  };

  const handleSituacionIncorrect = () => {
    setUserProgress((prev) => ({
      ...prev,
      totalSituacionesAnswered: prev.totalSituacionesAnswered + 1,
      currentStreak: 0,
    }));
  };

  const handleWordSolved = () => {
    setUserProgress((prev) => ({
      ...prev,
      wordsGuessed: prev.wordsGuessed + 1,
      currentStreak: prev.currentStreak + 1,
      coins: prev.coins + 25,
    }));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-orange-500 selection:text-white antialiased flex flex-col">
      
      {/* Top Header Navigation */}
      <HeaderNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedLevel={selectedLevel}
        setSelectedLevel={setSelectedLevel}
        userProgress={userProgress}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        onOpenInfoModal={() => setIsInfoModalOpen(true)}
      />

      {/* Main Body View */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Banner Greeting */}
        <div className="mb-6 p-4 rounded-3xl bg-gradient-to-r from-orange-100/70 via-white to-teal-50 border border-slate-200/90 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-orange-500 text-white rounded-2xl shadow-md shadow-orange-500/20 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-sm sm:text-base font-extrabold text-slate-900">
                {activeTab === 'situaciones' 
                  ? 'Գործնական ռեժիմ․ ¿Qué harías tú? / Դու ինչպե՞ս կվարվեիր'
                  : 'Խաղային ռեժիմ․ Adivina la palabra / Գուշակիր բառը'}
              </h1>
              <p className="text-xs text-slate-600 font-medium">
                Մակարդակ․ <span className="font-bold text-orange-600">{selectedLevel}</span> • Խոսակցական իսպաներեն հայերեն բացատրություններով
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-xs text-slate-600 shrink-0">
            <span className="flex items-center space-x-1.5 bg-white px-3.5 py-1.5 rounded-2xl border border-slate-200 shadow-sm font-semibold">
              <Award className="w-4 h-4 text-orange-500" />
              <span>Լուծված է․ <strong className="text-slate-900 font-bold">{userProgress.correctSituaciones + userProgress.wordsGuessed}</strong></span>
            </span>
          </div>
        </div>

        {/* Tab Switch View */}
        {activeTab === 'situaciones' ? (
          <SituacionesComponent
            selectedLevel={selectedLevel}
            soundEnabled={soundEnabled}
            onAnswerCorrect={handleSituacionCorrect}
            onAnswerIncorrect={handleSituacionIncorrect}
          />
        ) : (
          <AdivinaWordComponent
            selectedLevel={selectedLevel}
            soundEnabled={soundEnabled}
            onWordSolved={handleWordSolved}
          />
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>HablaEspañol • Գործնական խոսակցական իսպաներեն ԱԲ-ով (AI)</span>
          <span className="flex items-center space-x-1 text-slate-600 font-medium">
            <span>🇦🇲 + 🇪🇸 Խոսակցական պրակտիկա</span>
          </span>
        </div>
      </footer>

      {/* Info Methodology Modal */}
      <InfoModal
        isOpen={isInfoModalOpen}
        onClose={() => setIsInfoModalOpen(false)}
      />

    </div>
  );
}
