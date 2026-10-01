import React, { useState, useMemo } from 'react';
import { 
  MapPin, Phone, MessageCircle, Star, ExternalLink, 
  ZoomIn, ZoomOut, RotateCcw, CheckCircle2, ChevronRight,
  Filter, Navigation, Sparkles
} from 'lucide-react';
import { Craftsman } from '../types/craftsman';

interface CraftsmenMapProps {
  craftsmen: Craftsman[];
  selectedCraftsman: Craftsman | null;
  onSelectCraftsman: (craftsman: Craftsman) => void;
  onCall: (craftsman: Craftsman) => void;
}

export const CraftsmenMap: React.FC<CraftsmenMapProps> = ({
  craftsmen,
  selectedCraftsman,
  onSelectCraftsman,
  onCall,
}) => {
  const [activePin, setActivePin] = useState<Craftsman | null>(selectedCraftsman || craftsmen[0] || null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedWilaya, setSelectedWilaya] = useState<string>('all');

  // Algerian bounding box for spatial projection:
  // Lat: ~34.5 to 37.5 (North Algeria populated regions)
  // Lng: ~-1.5 (Tlemcen/Oran) to 8.5 (Annaba/Tebessa)
  const mapBounds = {
    minLat: 34.8,
    maxLat: 37.3,
    minLng: -1.2,
    maxLng: 8.2,
  };

  const filteredCraftsmen = useMemo(() => {
    if (selectedWilaya === 'all') return craftsmen;
    return craftsmen.filter(c => c.wilaya === selectedWilaya);
  }, [craftsmen, selectedWilaya]);

  const uniqueWilayas = useMemo(() => {
    const set = new Set(craftsmen.map(c => c.wilaya));
    return Array.from(set);
  }, [craftsmen]);

  // Convert lat/lng to percentage coordinates on visual map canvas
  const getCoordinatesPercent = (lat: number, lng: number) => {
    const latSpan = mapBounds.maxLat - mapBounds.minLat;
    const lngSpan = mapBounds.maxLng - mapBounds.minLng;

    // Normalizing
    const yPercent = 100 - ((lat - mapBounds.minLat) / latSpan) * 80 - 10;
    const xPercent = ((lng - mapBounds.minLng) / lngSpan) * 85 + 7.5;

    return {
      top: `${Math.max(8, Math.min(92, yPercent))}%`,
      left: `${Math.max(6, Math.min(94, xPercent))}%`,
    };
  };

  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden flex flex-col">
      {/* Top Filter and Info Bar */}
      <div className="p-4 border-b border-stone-200 bg-stone-50 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-sm">
            <MapPin className="w-4 h-4 text-amber-700" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-stone-900">خريطة الحرفيين التفاعلية في الجزائر</h3>
            <p className="text-xs text-stone-500">اضغط على أي موقع للتواصل مع الحرفي أو فتح التوجيه المباشر</p>
          </div>
        </div>

        {/* Wilaya Filter Dropdown */}
        <div className="flex items-center gap-2">
          <label htmlFor="wilaya-map-select" className="text-xs font-semibold text-stone-600">
            تحديد الولاية:
          </label>
          <select
            id="wilaya-map-select"
            value={selectedWilaya}
            onChange={(e) => setSelectedWilaya(e.target.value)}
            className="text-xs font-semibold bg-white border border-stone-300 rounded-lg px-2.5 py-1.5 text-stone-800 focus:ring-2 focus:ring-amber-500 focus:outline-none"
          >
            <option value="all">كل الولايات ({craftsmen.length} حرفي)</option>
            {uniqueWilayas.map((wilaya) => (
              <option key={wilaya} value={wilaya}>
                {wilaya} ({craftsmen.filter(c => c.wilaya === wilaya).length})
              </option>
            ))}
          </select>

          {/* Zoom Controls */}
          <div className="flex items-center gap-1 mr-2 bg-white border border-stone-300 rounded-lg p-0.5">
            <button
              onClick={() => setZoomLevel(prev => Math.min(prev + 0.2, 1.6))}
              className="p-1 hover:bg-stone-100 rounded text-stone-600"
              title="تكبير"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setZoomLevel(prev => Math.max(prev - 0.2, 0.9))}
              className="p-1 hover:bg-stone-100 rounded text-stone-600"
              title="تصغير"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setZoomLevel(1)}
              className="p-1 hover:bg-stone-100 rounded text-stone-600"
              title="إعادة ضبط"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Map Canvas Area */}
      <div className="relative w-full h-[460px] sm:h-[520px] bg-gradient-to-b from-[#e8f1f5] via-[#f4f7f6] to-[#eae8df] overflow-hidden select-none">
        
        {/* Background Stylized Topographic Mediterranean Coast */}
        <div className="absolute inset-0 opacity-40 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#94a3b8" strokeWidth="0.5" strokeOpacity="0.3" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            {/* North Mediterranean Water Representation */}
            <path d="M 0,0 L 1000,0 L 1000,90 Q 750,70 500,85 T 0,70 Z" fill="#bae6fd" opacity="0.35" />
          </svg>
        </div>

        {/* Major Algerian Regions Watermarks & Context */}
        <div className="absolute top-3 left-4 text-xs font-bold text-sky-800/60 pointer-events-none">
          البحر الأبيض المتوسط
        </div>
        <div className="absolute top-24 left-[14%] text-xs font-semibold text-stone-400 pointer-events-none">
          وهران والجهة الغربية
        </div>
        <div className="absolute top-20 left-[48%] text-xs font-semibold text-stone-400 pointer-events-none">
          الجزائر العاصمة والوسط
        </div>
        <div className="absolute top-24 left-[78%] text-xs font-semibold text-stone-400 pointer-events-none">
          قسنطينة وعنابة والشرق
        </div>
        <div className="absolute bottom-6 right-8 text-xs font-semibold text-stone-400 pointer-events-none">
          الهضاب العليا والجنوب
        </div>

        {/* Map Interactive Container with Zoom */}
        <div 
          className="absolute inset-0 transition-transform duration-300 ease-out"
          style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center center' }}
        >
          {/* Pins for each craftsman */}
          {filteredCraftsmen.map((craftsman) => {
            const pos = getCoordinatesPercent(craftsman.coordinates.lat, craftsman.coordinates.lng);
            const isSelected = activePin?.id === craftsman.id;

            return (
              <div
                key={craftsman.id}
                style={{ top: pos.top, left: pos.left }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group"
              >
                {/* Pin Button */}
                <button
                  onClick={() => setActivePin(craftsman)}
                  className={`relative flex items-center justify-center transition-all duration-200 focus:outline-none ${
                    isSelected 
                      ? 'scale-125 z-30' 
                      : 'hover:scale-115 hover:z-20'
                  }`}
                  title={`${craftsman.name} - ${craftsman.trade} (${craftsman.wilaya})`}
                >
                  {/* Pin Body */}
                  <div className={`w-9 h-9 rounded-full shadow-lg flex items-center justify-center text-white font-bold transition-colors border-2 ${
                    isSelected 
                      ? 'bg-amber-600 border-white ring-4 ring-amber-400/40 shadow-amber-900/30' 
                      : 'bg-stone-900 border-white hover:bg-amber-600'
                  }`}>
                    {craftsman.category === 'plumbing' ? '💧' :
                     craftsman.category === 'electrical' ? '⚡' :
                     craftsman.category === 'carpentry' ? '🪵' :
                     craftsman.category === 'masonry' ? '🧱' :
                     craftsman.category === 'mechanic' ? '🔧' :
                     craftsman.category === 'cook' ? '🍲' :
                     craftsman.category === 'painting' ? '🎨' :
                     craftsman.category === 'hvac' ? '❄️' : '🔨'}
                  </div>

                  {/* Rating Tag */}
                  <span className="absolute -bottom-2 bg-stone-900 text-amber-300 text-[10px] font-bold px-1.5 py-0.2 rounded-full border border-stone-700 shadow-sm tabular-nums">
                    ★ {craftsman.rating.toFixed(1)}
                  </span>
                </button>

                {/* Hover Quick Label */}
                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:block bg-stone-900 text-white text-[11px] px-2.5 py-1 rounded shadow-lg whitespace-nowrap pointer-events-none z-40">
                  <span className="font-bold">{craftsman.name}</span>
                  <span className="text-stone-300 mx-1">·</span>
                  <span>{craftsman.commune}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Floating Detail Card for Selected Pin */}
        {activePin && (
          <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-96 bg-white/98 backdrop-blur-md rounded-xl p-4 shadow-xl border border-stone-200 z-30 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-bold text-stone-900 text-base">{activePin.name}</h4>
                  {activePin.verified && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  )}
                </div>
                <p className="text-xs text-stone-600 font-medium">{activePin.trade}</p>
              </div>

              <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded border border-amber-200 text-amber-800 text-xs font-bold tabular-nums">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{activePin.rating.toFixed(1)}</span>
                <span className="text-stone-400 font-normal">({activePin.reviewCount})</span>
              </div>
            </div>

            {/* Address & Commune */}
            <div className="flex items-center gap-1.5 text-xs text-stone-600 mb-3">
              <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span className="font-semibold text-stone-800">{activePin.wilaya}</span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span className="truncate">{activePin.address}</span>
            </div>

            {/* Phone & Direct Call Actions */}
            <div className="grid grid-cols-2 gap-2 mb-2">
              <button
                onClick={() => onCall(activePin)}
                className="flex items-center justify-center gap-1.5 py-2 px-3 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-bold transition-colors shadow-sm"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span className="font-mono tabular-nums">{activePin.phone}</span>
              </button>

              <a
                href={`https://wa.me/${activePin.whatsapp.replace('+', '')}?text=${encodeURIComponent(`السلام عليكم ${activePin.name}، استفسار عبر دليل الحرفيين.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors shadow-sm"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>واتساب</span>
              </a>
            </div>

            {/* Navigation & Full Details Buttons */}
            <div className="flex items-center justify-between gap-2 pt-2 border-t border-stone-100 text-xs">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${activePin.coordinates.lat},${activePin.coordinates.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-600 hover:text-stone-900 font-medium flex items-center gap-1"
              >
                <Navigation className="w-3 h-3 text-amber-600" />
                <span>التوجيه في خرائط Google</span>
              </a>

              <button
                onClick={() => onSelectCraftsman(activePin)}
                className="text-amber-800 font-bold hover:underline flex items-center gap-0.5"
              >
                <span>عرض كامل الملف</span>
                <ChevronRight className="w-3 h-3 rotate-180" />
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Bottom Summary Bar */}
      <div className="px-4 py-3 bg-stone-50 border-t border-stone-200 text-xs text-stone-500 flex items-center justify-between">
        <span>يتم عرض <strong className="text-stone-800 tabular-nums">{filteredCraftsmen.length}</strong> موقع حرفي مسجل بدقة جغرافية</span>
        <span className="hidden sm:inline">جميع الحرفيين متاحون للاتصال المباشر والمعاينة الميدانية</span>
      </div>
    </div>
  );
};
