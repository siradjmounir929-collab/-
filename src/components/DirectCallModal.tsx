import React, { useState } from 'react';
import { X, Phone, MessageCircle, Copy, Check, ShieldCheck, MapPin, Clock } from 'lucide-react';
import { Craftsman } from '../types/craftsman';

interface DirectCallModalProps {
  craftsman: Craftsman;
  onClose: () => void;
}

export const DirectCallModal: React.FC<DirectCallModalProps> = ({
  craftsman,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(craftsman.phone);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden text-center p-6 space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon & Craftsman Info */}
        <div className="space-y-1 pt-2">
          <div className="w-14 h-14 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center mx-auto mb-2 shadow-inner">
            <Phone className="w-7 h-7 text-amber-600" />
          </div>
          <h3 className="text-xl font-bold text-stone-900">{craftsman.name}</h3>
          <p className="text-xs text-stone-600 font-medium">{craftsman.trade}</p>
          <div className="flex items-center justify-center gap-1 text-xs text-stone-500 pt-1">
            <MapPin className="w-3.5 h-3.5 text-stone-400" />
            <span>{craftsman.wilaya} · {craftsman.commune}</span>
          </div>
        </div>

        {/* Phone Display Box */}
        <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-2">
          <span className="text-xs text-stone-500 block font-medium">رقم الهاتف المباشر</span>
          <div className="text-2xl sm:text-3xl font-mono font-black text-stone-900 tracking-wider tabular-nums">
            {craftsman.phone}
          </div>

          <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-500 pt-1">
            <Clock className="w-3 h-3 text-stone-400" />
            <span>{craftsman.workingHours}</span>
          </div>
        </div>

        {/* Primary Call Actions */}
        <div className="space-y-2.5">
          <a
            href={`tel:${craftsman.phoneClean}`}
            className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm transition-colors shadow-sm flex items-center justify-center gap-2"
          >
            <Phone className="w-4 h-4" />
            <span>إجراء الاتصال الهاتفي الآن</span>
          </a>

          <a
            href={`https://wa.me/${craftsman.whatsapp.replace('+', '')}?text=${encodeURIComponent(`السلام عليكم ${craftsman.name}، تواصلت معك عبر تطبيق دليل الحرفيين بخصوص طلب خدمة.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-4 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-xl font-bold text-sm transition-colors border border-emerald-200 flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600" />
            <span>مراسلة سريعة عبر واتساب</span>
          </a>

          <button
            onClick={handleCopy}
            className="w-full py-2.5 px-4 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl font-semibold text-xs transition-colors flex items-center justify-center gap-2"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span>تم نسخ الرقم إلى الحافظة!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>نسخ رقم الهاتف</span>
              </>
            )}
          </button>
        </div>

        <p className="text-[11px] text-stone-400 leading-normal">
          نوصي دائماً بالاتفاق المسبق على التسعيرة والمعاينة والتأكد من الضمان.
        </p>
      </div>
    </div>
  );
};
