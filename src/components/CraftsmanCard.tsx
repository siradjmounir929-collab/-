import React from 'react';
import { Phone, MessageCircle, Star, MapPin, CheckCircle2, Clock, Bookmark, ChevronLeft } from 'lucide-react';
import { Craftsman } from '../types/craftsman';

interface CraftsmanCardProps {
  craftsman: Craftsman;
  onSelect: (craftsman: Craftsman) => void;
  onCall: (craftsman: Craftsman, e: React.MouseEvent) => void;
  isFavorite: boolean;
  onToggleFavorite: (craftsmanId: string, e: React.MouseEvent) => void;
}

export const CraftsmanCard: React.FC<CraftsmanCardProps> = ({
  craftsman,
  onSelect,
  onCall,
  isFavorite,
  onToggleFavorite,
}) => {
  return (
    <article 
      onClick={() => onSelect(craftsman)}
      className="group relative bg-white rounded-xl border border-stone-200/90 hover:border-stone-400 p-5 sm:p-6 transition-all duration-200 hover:shadow-md cursor-pointer flex flex-col justify-between"
    >
      <div>
        {/* Top Header Row: Name & Bookmark */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h3 className="text-lg sm:text-xl font-bold text-stone-900 truncate tracking-tight">
                {craftsman.name}
              </h3>
              {craftsman.verified && (
                <span className="inline-flex items-center gap-0.5 text-xs font-semibold text-emerald-700" title="حرفي موثق الهوية والشهادة">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 inline" />
                  <span className="text-[11px]">موثق</span>
                </span>
              )}
            </div>
            
            {/* Trade / Specialty */}
            <p className="text-stone-700 font-medium text-sm mt-0.5">
              {craftsman.trade}
            </p>
          </div>

          <button
            onClick={(e) => onToggleFavorite(craftsman.id, e)}
            className="p-1.5 text-stone-400 hover:text-amber-600 transition-colors shrink-0"
            title={isFavorite ? 'إزالة من المفضلة' : 'حفظ في المفضلة'}
            aria-label="حفظ في المفضلة"
          >
            <Bookmark className={`w-5 h-5 ${isFavorite ? 'fill-amber-500 text-amber-500' : ''}`} />
          </button>
        </div>

        {/* Clean Metadata Line (Zero-Pill discipline: unboxed with typographic separators) */}
        <div className="flex items-center flex-wrap gap-2 text-xs text-stone-500 mb-3">
          <div className="flex items-center gap-1 text-stone-700">
            <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
            <span className="font-semibold text-stone-800">{craftsman.wilaya}</span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span>{craftsman.commune}</span>
          </div>

          <span aria-hidden="true" className="text-stone-300">·</span>

          <span className="tabular-nums text-stone-600">
            {craftsman.experienceYears} سنوات خبرة
          </span>

          {craftsman.isAvailable247 && (
            <>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span className="text-red-700 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
                طوارئ 24/7
              </span>
            </>
          )}
        </div>

        {/* Rating and Reviews Line */}
        <div className="flex items-center gap-2 mb-4 bg-stone-50/80 p-2.5 rounded-lg border border-stone-100">
          <div className="flex items-center gap-1 text-amber-500">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span className="font-bold text-stone-900 text-sm tabular-nums">
              {craftsman.rating.toFixed(1)}
            </span>
          </div>
          <span className="text-xs text-stone-400" aria-hidden="true">|</span>
          <span className="text-xs text-stone-600">
            <strong className="text-stone-900 font-semibold tabular-nums">{craftsman.reviewCount}</strong> تقييم زبون حقيقي
          </span>
          <span className="mr-auto text-xs text-stone-500 font-medium">
            {craftsman.priceNote}
          </span>
        </div>

        {/* Brief Bio / Summary */}
        <p className="text-stone-600 text-xs sm:text-sm line-clamp-2 leading-relaxed mb-4">
          {craftsman.bio}
        </p>

        {/* Visual Work Preview / Thumbnail if available */}
        {craftsman.workImages && craftsman.workImages.length > 0 && (
          <div className="mb-4 overflow-hidden rounded-lg aspect-[16/9] bg-stone-100 relative group/img">
            <img 
              src={craftsman.workImages[0]} 
              alt={`أعمال ${craftsman.name}`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-2.5">
              <span className="text-[11px] text-white/95 font-medium flex items-center gap-1">
                معاينة عينة من الأعمال السابقة
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Action Footer: Phone Call & WhatsApp direct buttons */}
      <div className="pt-3 border-t border-stone-100 mt-2">
        <div className="flex items-center justify-between gap-2">
          
          {/* Direct Call Button with phone number displayed */}
          <button
            onClick={(e) => onCall(craftsman, e)}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs sm:text-sm font-semibold transition-colors"
            title={`اتصال هاتفي مباشر مع ${craftsman.name}`}
          >
            <Phone className="w-4 h-4 text-emerald-400" />
            <span className="tabular-nums font-mono text-xs sm:text-sm">{craftsman.phone}</span>
          </button>

          {/* WhatsApp Direct Chat */}
          <a
            href={`https://wa.me/${craftsman.whatsapp.replace('+', '')}?text=${encodeURIComponent(`السلام عليكم ${craftsman.name}، تواصلت معك عبر تطبيق دليل الحرفيين بخصوص استفسار عن خدمة.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="p-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg transition-colors flex items-center justify-center shrink-0 border border-emerald-200"
            title="مراسلة سريعة عبر واتساب"
            aria-label="مراسلة عبر واتساب"
          >
            <MessageCircle className="w-4 h-4" />
          </a>

          {/* View Details affordance */}
          <button
            onClick={() => onSelect(craftsman)}
            className="p-2.5 text-stone-500 hover:text-stone-900 rounded-lg hover:bg-stone-100 transition-colors shrink-0"
            title="عرض كامل التقييمات والتفاصيل"
            aria-label="عرض التفاصيل"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

        </div>
      </div>
    </article>
  );
};
