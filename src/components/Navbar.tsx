import React from 'react';
import { Phone, Bookmark, PlusCircle, Wrench, MapPin, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenAddModal: () => void;
  favoritesCount: number;
  onOpenFavorites: () => void;
  activeView: 'list' | 'map';
  setActiveView: (view: 'list' | 'map') => void;
  onSelectEmergencyOnly: () => void;
  isEmergencyOnly: boolean;
  onOpenInstallModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAddModal,
  favoritesCount,
  onOpenFavorites,
  activeView,
  setActiveView,
  onSelectEmergencyOnly,
  isEmergencyOnly,
  onOpenInstallModal,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Zone 1: Single clean text element wordmark */}
          <div className="flex items-center gap-3">
            <a href="#" className="flex items-center gap-2 group">
              <span className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-black text-xl shadow-sm group-hover:bg-amber-600 transition-colors">
                ح
              </span>
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-stone-900 font-['Cairo']">
                حرفي بلادي
              </span>
            </a>
          </div>

          {/* Zone 2: 4 clean text navigation controls */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-stone-600 font-['Cairo']">
            <button
              onClick={() => setActiveView('list')}
              className={`transition-colors hover:text-stone-900 pb-1 border-b-2 ${
                activeView === 'list' && !isEmergencyOnly
                  ? 'border-amber-600 text-stone-900'
                  : 'border-transparent text-stone-600'
              }`}
            >
              دليل الحرفيين
            </button>
            <button
              onClick={() => setActiveView('map')}
              className={`transition-colors hover:text-stone-900 pb-1 border-b-2 ${
                activeView === 'map'
                  ? 'border-amber-600 text-stone-900'
                  : 'border-transparent text-stone-600'
              }`}
            >
              الخريطة والمواقع
            </button>
            <button
              onClick={onSelectEmergencyOnly}
              className={`transition-colors hover:text-stone-900 pb-1 border-b-2 flex items-center gap-1.5 ${
                isEmergencyOnly
                  ? 'border-red-600 text-red-700 font-bold'
                  : 'border-transparent text-stone-600'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              طوارئ 24/7
            </button>
            <button
              onClick={onOpenInstallModal}
              className="transition-colors hover:text-stone-900 pb-1 border-b-2 border-transparent text-stone-600 flex items-center gap-1 text-amber-700 font-bold"
            >
              <span>تحميل على الهاتف</span>
            </button>
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onOpenInstallModal}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-bold text-amber-900 bg-amber-100 hover:bg-amber-200 border border-amber-300 rounded-lg transition-colors whitespace-nowrap shadow-xs"
              title="تحميل وتثبيت التطبيق على الهاتف"
            >
              <span>تثبيت التطبيق 📲</span>
            </button>

            <a
              href="/hirafi-beladi.zip"
              download="hirafi-beladi.zip"
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-stone-700 hover:text-stone-950 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded-lg transition-colors whitespace-nowrap"
              title="تحميل كود المشروع كاملاً بصيغة ZIP"
            >
              <span>تحميل الكود (ZIP) 💾</span>
            </a>

            <button
              onClick={onOpenFavorites}
              className="relative p-2.5 text-stone-600 hover:text-stone-900 rounded-lg hover:bg-stone-100 transition-colors"
              title="الحرفيون المفضلون"
              aria-label="الحرفيون المفضلون"
            >
              <Bookmark className="w-5 h-5" />
              {favoritesCount > 0 && (
                <span className="absolute top-1 left-1 bg-amber-600 text-white text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center tabular-nums">
                  {favoritesCount}
                </span>
              )}
            </button>

            <button
              onClick={onOpenAddModal}
              className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-white bg-stone-900 rounded-lg hover:bg-stone-800 transition-colors whitespace-nowrap shadow-sm"
            >
              <PlusCircle className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">سجّل كحرفي</span>
              <span className="sm:hidden">تسجيل</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
