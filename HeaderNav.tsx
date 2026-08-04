import React from 'react';
import { CEFRLevel, UserProgress } from './types';
import { Sparkles, Trophy, Flame, Coins, Volume2, VolumeX, MessageSquareText, Gamepad2, Info } from 'lucide-react';

interface HeaderNavProps {
  activeTab: 'situaciones' | 'adivina';
  setActiveTab: (tab: 'situaciones' | 'adivina') => void;
  selectedLevel: CEFRLevel;
  setSelectedLevel: (level: CEFRLevel) => void;
  userProgress: UserProgress;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  onOpenInfoModal: () => void;
}

const LEVELS: CEFRLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1'];

export const HeaderNav: React.FC<HeaderNavProps> = ({
  activeTab,
  setActiveTab,
  selectedLevel,
  setSelectedLevel,
  userProgress,
  soundEnabled,
  setSoundEnabled,
  onOpenInfoModal,
}) => {
  return (
    <header className="bg-white/95 backdrop-blur-md text-slate-900 border-b border-slate-200/80 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Title */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center font-extrabold text-xl shadow-lg shadow-orange-500/25 text-white">
              ES
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight bg-gradient-to-r from-orange-600 via-amber-600 to-teal-600 bg-clip-text text-transparent">
                  HablaEspañol
                </span>
                <span className="bg-orange-100 text-orange-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-orange-200 uppercase tracking-wider">
                  AI / 🇦🇲
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block font-medium">
                Գործնական իսպաներեն և խոսակցական խաղ
              </p>
            </div>
          </div>

          {/* Mode Navigation Tabs */}
          <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200/80 shadow-inner">
            <button
              id="tab-situaciones-btn"
              onClick={() => setActiveTab('situaciones')}
              className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                activeTab === 'situaciones'
                  ? 'bg-orange-500 text-white font-bold shadow-md shadow-orange-500/25'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
              }`}
            >
              <MessageSquareText className="w-4 h-4" />
              <span className="hidden md:inline">¿Qué harías tú?</span>
              <span className="md:hidden">Իրավիճակներ</span>
            </button>

            <button
              id="tab-adivina-btn"
              onClick={() => setActiveTab('adivina')}
              className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                activeTab === 'adivina'
                  ? 'bg-teal-600 text-white font-bold shadow-md shadow-teal-600/25'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
              }`}
            >
              <Gamepad2 className="w-4 h-4" />
              <span className="hidden md:inline">Adivina la palabra</span>
              <span className="md:hidden">Գուշակիր</span>
            </button>
          </div>

          {/* User Progress Stats & Level Selector */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* CEFR Level Picker */}
            <div className="flex items-center bg-slate-100 rounded-xl p-1 border border-slate-200 text-xs">
              <span className="text-slate-500 px-1.5 font-bold hidden lg:inline">Մակարդակ:</span>
              <div className="flex space-x-1">
                {LEVELS.map((lvl) => (
                  <button
                    key={lvl}
                    id={`level-btn-${lvl}`}
                    onClick={() => setSelectedLevel(lvl)}
                    className={`px-2 py-1 rounded-lg text-xs font-bold transition-all ${
                      selectedLevel === lvl
                        ? 'bg-orange-500 text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* Streak Counter */}
            <div className="flex items-center space-x-1 bg-orange-50 text-orange-600 px-2.5 py-1.5 rounded-xl border border-orange-200 text-xs font-bold" title="Անընդմեջ ճիշտ պատասխաններ">
              <Flame className="w-4 h-4 fill-orange-500 text-orange-500" />
              <span>{userProgress.currentStreak}</span>
            </div>

            {/* Coins */}
            <div className="hidden sm:flex items-center space-x-1 bg-amber-50 text-amber-700 px-2.5 py-1.5 rounded-xl border border-amber-200 text-xs font-bold" title="Միավորներ">
              <Coins className="w-4 h-4 text-amber-500" />
              <span>{userProgress.coins}</span>
            </div>

            {/* Mute Audio Toggle */}
            <button
              id="audio-toggle-btn"
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2 text-slate-500 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200"
              title={soundEnabled ? 'Ձայնը միացված է' : 'Ձայնն անջատված է'}
            >
              {soundEnabled ? <Volume2 className="w-5 h-5 text-teal-600" /> : <VolumeX className="w-5 h-5 text-slate-400" />}
            </button>

            {/* Info Modal Button */}
            <button
              id="info-modal-btn"
              onClick={onOpenInfoModal}
              className="p-2 text-slate-500 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200"
              title="Մեթոդաբանության մասին"
            >
              <Info className="w-5 h-5" />
            </button>

          </div>

        </div>
      </div>
    </header>
  );
};
