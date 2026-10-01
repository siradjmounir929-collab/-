import React from 'react';
import { X, Bookmark, Phone, MessageCircle, Star, MapPin, Trash2, ArrowLeft } from 'lucide-react';
import { Craftsman } from '../types/craftsman';

interface FavoritesModalProps {
  favorites: Craftsman[];
  onClose: () => void;
  onSelectCraftsman: (craftsman: Craftsman) => void;
  onRemoveFavorite: (id: string) => void;
  onCall: (craftsman: Craftsman) => void;
}

export const FavoritesModal: React.FC<FavoritesModalProps> = ({
  favorites,
  onClose,
  onSelectCraftsman,
  onRemoveFavorite,
  onCall,
}) => {
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-stone-200 bg-stone-50">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-amber-600 fill-amber-500" />
            <h3 className="font-bold text-stone-900 text-base">الحرفيون المفضلون لديك</h3>
            <span className="text-xs bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full tabular-nums">
              {favorites.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List */}
        <div className="p-4 overflow-y-auto space-y-3">
          {favorites.length === 0 ? (
            <div className="py-12 text-center text-stone-500 space-y-2">
              <Bookmark className="w-12 h-12 text-stone-300 mx-auto" />
              <p className="font-semibold text-stone-700">لم تقم بحفظ أي حرفي بعد</p>
              <p className="text-xs text-stone-400 max-w-xs mx-auto">
                اضغط على أيقونة الحفظ بجانب اسم الحرفي لحفظ رقمه وملفه والوصول إليه بسرعة عند الحاجة.
              </p>
            </div>
          ) : (
            favorites.map((craftsman) => (
              <div 
                key={craftsman.id}
                className="p-3.5 bg-stone-50 border border-stone-200 rounded-xl flex items-center justify-between gap-3 hover:border-stone-300 transition-colors"
              >
                <div 
                  className="flex-1 min-w-0 cursor-pointer"
                  onClick={() => {
                    onClose();
                    onSelectCraftsman(craftsman);
                  }}
                >
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-bold text-stone-900 text-sm truncate">{craftsman.name}</h4>
                    <span className="text-[11px] text-amber-700 font-bold flex items-center gap-0.5 tabular-nums">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      {craftsman.rating.toFixed(1)}
                    </span>
                  </div>

                  <p className="text-xs text-stone-600 truncate">{craftsman.trade}</p>

                  <div className="flex items-center gap-1 text-[11px] text-stone-400 mt-1">
                    <MapPin className="w-3 h-3 text-stone-400" />
                    <span>{craftsman.wilaya} · {craftsman.commune}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono text-stone-700 font-semibold">{craftsman.phone}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => onCall(craftsman)}
                    className="p-2 bg-stone-900 text-white hover:bg-stone-800 rounded-lg text-xs"
                    title="اتصال هاتفي"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  </button>

                  <button
                    onClick={() => onRemoveFavorite(craftsman.id)}
                    className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="حذف من المفضلة"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-stone-200 bg-stone-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};
