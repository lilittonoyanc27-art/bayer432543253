import React from 'react';
import { X, Sparkles, MessageSquareText, Gamepad2, HeartHandshake, ShieldCheck } from 'lucide-react';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white border border-slate-200 w-full max-w-2xl rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative animate-fadeIn my-8">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-800 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center space-x-3.5">
          <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 border border-orange-200 flex items-center justify-center shadow-sm">
            <Sparkles className="w-6 h-6 text-orange-500" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              HablaEspañol — Խոսակցական պրակտիկայի մեթոդաբանություն
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Իսպաներեն լեզու կյանքի համար հայերեն թարգմանություններով
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="space-y-4 text-sm text-slate-700 leading-relaxed border-t border-b border-slate-200 py-4">
          
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1.5 shadow-sm">
            <div className="flex items-center space-x-2 text-orange-600 font-extrabold">
              <MessageSquareText className="w-5 h-5" />
              <span>1. Գործնական ռեժիմ․ ¿Qué harías tú? (Դու ինչպե՞ս կվարվեիր)</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              Սա քերականական թեստ չէ։ Դուք սովորում եք մտածել և անմիջապես արձագանքել իրական կյանքի իրավիճակներում (ռեստորանում, հյուրանոցում, օդանավակայանում, բանկում և այլն)։ Յուրաքանչյուր իրավիճակ պարունակում է 4 բնական պատասխան, լավագույն ընտրության վերլուծություն և հայերեն բացատրություն։
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1.5 shadow-sm">
            <div className="flex items-center space-x-2 text-teal-700 font-extrabold">
              <Gamepad2 className="w-5 h-5 text-teal-600" />
              <span>2. Խաղային ռեժիմ․ Adivina la palabra (Գուշակիր բառը)</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              Բառախաղ ըստ թեմաների։ Մուտքագրեք տառեր, գուշակեք բառերը, օգտագործեք հուշումներ և ստացեք մանրամասն ֆիլոլոգիական վերլուծություն ԱԲ-ից գուշակելուց հետո։
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1.5 shadow-sm">
            <div className="flex items-center space-x-2 text-emerald-700 font-extrabold">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>3. Թաքնված հայերեն թարգմանություններ</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              Լռելյայն հայերեն թարգմանությունը թաքցված է։ Սկզբում դուք կարդում եք միայն իսպաներեն տեքստը՝ մարզելով ընկալումը, և անհրաժեշտության դեպքում բացում եք թարգմանությունը մեկ սեղմումով։
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1.5 shadow-sm">
            <div className="flex items-center space-x-2 text-sky-700 font-extrabold">
              <Sparkles className="w-5 h-5 text-sky-600" />
              <span>4. Անսահմանափակ գեներացիա Gemini AI-ով</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              Ներկառուցված արհեստական բանականությունը կարող է գեներացնել հազարավոր նոր իրավիճակներ և բառեր բոլոր մակարդակներում (A1, A2, B1, B2, C1), որպեսզի վարժությունները երբեք չկրկնվեն։
            </p>
          </div>

        </div>

        {/* Action Button */}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-extrabold rounded-2xl shadow-md shadow-orange-500/20 transition-all"
          >
            Պարզ է, սկսել պրակտիկան!
          </button>
        </div>

      </div>
    </div>
  );
};
