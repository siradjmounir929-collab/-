import React, { useState } from 'react';
import { 
  X, Phone, MessageCircle, Star, MapPin, CheckCircle2, Clock, 
  Calendar, ShieldCheck, CreditCard, Share2, Copy, Check, ExternalLink,
  ThumbsUp, Send, Image as ImageIcon
} from 'lucide-react';
import { Craftsman, Review } from '../types/craftsman';

interface CraftsmanDetailModalProps {
  craftsman: Craftsman;
  onClose: () => void;
  onAddReview: (craftsmanId: string, review: Omit<Review, 'id' | 'date'>) => void;
  onCall: (craftsman: Craftsman) => void;
}

export const CraftsmanDetailModal: React.FC<CraftsmanDetailModalProps> = ({
  craftsman,
  onClose,
  onAddReview,
  onCall,
}) => {
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'reviews' | 'quote'>('details');

  // New Review Form State
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewHoverRating, setNewReviewHoverRating] = useState<number | null>(null);
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewService, setNewReviewService] = useState('');
  const [newReviewRecommend, setNewReviewRecommend] = useState(true);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // Quote / Request Service Form State
  const [quoteName, setQuoteName] = useState('');
  const [quotePhone, setQuotePhone] = useState('');
  const [quoteServiceType, setQuoteServiceType] = useState('');
  const [quoteDetails, setQuoteDetails] = useState('');
  const [quoteUrgency, setQuoteUrgency] = useState<'normal' | 'urgent'>('normal');

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(craftsman.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) return;

    onAddReview(craftsman.id, {
      authorName: newReviewAuthor.trim(),
      rating: newReviewRating,
      comment: newReviewComment.trim(),
      serviceProvided: newReviewService.trim() || craftsman.trade,
      recommend: newReviewRecommend,
      wilaya: craftsman.wilaya
    });

    setReviewSubmitted(true);
    setNewReviewAuthor('');
    setNewReviewComment('');
    setNewReviewService('');
    setTimeout(() => {
      setReviewSubmitted(false);
      setActiveTab('reviews');
    }, 1800);
  };

  const handleSendQuoteViaWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quoteName || !quotePhone) return;

    const message = `السلام عليكم ورحمة الله،
أنا: ${quoteName} (${quotePhone})
من ولاية: ${craftsman.wilaya}
أرغب في الاستفسار عن خدمة: ${quoteServiceType || craftsman.trade}
درجة الاستعجال: ${quoteUrgency === 'urgent' ? 'طوارئ مستعجل' : 'موعد عادي'}
تفاصيل الطلب:
${quoteDetails || 'يرجى التواصل لتحديد موعد والمعاينة.'}`;

    const url = `https://wa.me/${craftsman.whatsapp.replace('+', '')}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-50 shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-stone-500">الملف المهني للحرفي</span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span className="text-xs text-amber-700 font-bold">{craftsman.wilaya}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 rounded-lg transition-colors"
            title="إغلاق النافذة"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-6 space-y-6">

          {/* Craftsman Hero Card */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                  {craftsman.name}
                </h2>
                {craftsman.verified && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    حرفي معتمد وموثق
                  </span>
                )}
                {craftsman.isAvailable247 && (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-red-800 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                    <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
                    متوفر للطوارئ 24/7
                  </span>
                )}
              </div>

              <p className="text-stone-700 font-semibold text-base mt-1">
                {craftsman.trade}
              </p>

              <div className="flex items-center flex-wrap gap-2 text-xs sm:text-sm text-stone-500 mt-2">
                <div className="flex items-center gap-1 font-medium text-stone-700">
                  <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>{craftsman.wilaya}</span>
                  <span aria-hidden="true">·</span>
                  <span>{craftsman.commune}</span>
                </div>
                <span aria-hidden="true" className="text-stone-300">·</span>
                <span className="tabular-nums font-semibold text-stone-800">{craftsman.experienceYears} سنوات خبرة</span>
              </div>
            </div>

            {/* Overall Rating Box */}
            <div className="flex sm:flex-col items-center sm:items-end gap-2 sm:gap-1 bg-amber-50/70 border border-amber-200/80 p-3 sm:p-4 rounded-xl shrink-0">
              <div className="flex items-center gap-1 text-amber-500">
                <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                <span className="text-2xl font-black text-stone-900 tabular-nums">
                  {craftsman.rating.toFixed(1)}
                </span>
                <span className="text-stone-400 text-sm">/ 5.0</span>
              </div>
              <span className="text-xs text-stone-600">
                <strong className="text-stone-900 tabular-nums">{craftsman.reviewCount}</strong> تقييم زبون حقيقي
              </span>
            </div>
          </div>

          {/* Primary Quick Contact Bar */}
          <div className="bg-stone-900 text-white p-4 sm:p-5 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-md">
            <div className="text-center md:text-right w-full md:w-auto">
              <span className="text-stone-400 text-xs font-medium block">رقم الهاتف المباشر للحرفي</span>
              <span className="text-xl sm:text-2xl font-mono font-bold tracking-wider text-amber-300 tabular-nums">
                {craftsman.phone}
              </span>
            </div>

            <div className="flex items-center gap-2.5 w-full md:w-auto">
              <a
                href={`tel:${craftsman.phoneClean}`}
                onClick={() => onCall(craftsman)}
                className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold text-sm transition-colors shadow-sm"
              >
                <Phone className="w-4 h-4" />
                <span>اتصال هاتفي</span>
              </a>

              <a
                href={`https://wa.me/${craftsman.whatsapp.replace('+', '')}?text=${encodeURIComponent(`السلام عليكم ${craftsman.name}، تواصلت معك عبر تطبيق دليل الحرفيين بخصوص طلب خدمة.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 rounded-lg font-bold text-sm transition-colors border border-emerald-500/30"
              >
                <MessageCircle className="w-4 h-4" />
                <span>واتساب</span>
              </a>

              <button
                onClick={handleCopyPhone}
                className="p-2.5 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-lg transition-colors"
                title="نسخ رقم الهاتف"
              >
                {copiedPhone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Tab Navigation Controls (Interactive Filter buttons) */}
          <div className="flex items-center gap-2 border-b border-stone-200">
            <button
              onClick={() => setActiveTab('details')}
              className={`pb-3 text-sm font-bold transition-colors border-b-2 px-1 ${
                activeTab === 'details'
                  ? 'border-amber-600 text-stone-900'
                  : 'border-transparent text-stone-500 hover:text-stone-800'
              }`}
            >
              عن الحرفي والأعمال
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-3 text-sm font-bold transition-colors border-b-2 px-1 flex items-center gap-1.5 ${
                activeTab === 'reviews'
                  ? 'border-amber-600 text-stone-900'
                  : 'border-transparent text-stone-500 hover:text-stone-800'
              }`}
            >
              <span>التقييمات والتجارب</span>
              <span className="text-xs bg-stone-100 text-stone-700 font-bold px-1.5 py-0.5 rounded-full tabular-nums">
                {craftsman.reviews.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('quote')}
              className={`pb-3 text-sm font-bold transition-colors border-b-2 px-1 ${
                activeTab === 'quote'
                  ? 'border-amber-600 text-stone-900'
                  : 'border-transparent text-stone-500 hover:text-stone-800'
              }`}
            >
              طلب تسعيرة أو موعد
            </button>
          </div>

          {/* TAB 1: DETAILS & PORTFOLIO */}
          {activeTab === 'details' && (
            <div className="space-y-6">
              
              {/* Location Card with Google Maps Direct Link */}
              <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-stone-900 font-bold text-sm">
                    <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>عنوان الورشة ونطاق التنقل:</span>
                  </div>
                  <p className="text-stone-600 text-sm pr-5">
                    {craftsman.address} ({craftsman.commune}، {craftsman.wilaya})
                  </p>
                </div>

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${craftsman.coordinates.lat},${craftsman.coordinates.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-stone-300 hover:border-stone-400 text-stone-700 hover:text-stone-900 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shadow-sm shrink-0"
                >
                  <span>فتح في خرائط Google</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Bio & Description */}
              <div>
                <h4 className="text-base font-bold text-stone-900 mb-2">نبذة وخبرة الحرفي</h4>
                <p className="text-stone-600 text-sm leading-relaxed whitespace-pre-line">
                  {craftsman.bio}
                </p>
              </div>

              {/* Specialties / Services List */}
              {craftsman.specialties && craftsman.specialties.length > 0 && (
                <div>
                  <h4 className="text-base font-bold text-stone-900 mb-2">التخصصات والخدمات المقدمة</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {craftsman.specialties.map((spec, i) => (
                      <div key={i} className="flex items-center gap-2 p-2.5 bg-stone-50 rounded-lg border border-stone-100 text-xs sm:text-sm text-stone-700">
                        <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Work Images Portfolio Showcase */}
              {craftsman.workImages && craftsman.workImages.length > 0 && (
                <div>
                  <h4 className="text-base font-bold text-stone-900 mb-3 flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-stone-500" />
                    <span>معرض الأعمال والإنجازات السابقة</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {craftsman.workImages.map((imgUrl, idx) => (
                      <div key={idx} className="rounded-xl overflow-hidden aspect-[4/3] bg-stone-100 border border-stone-200 relative group">
                        <img 
                          src={imgUrl} 
                          alt={`عمل ${craftsman.name} رقم ${idx + 1}`}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                          <span className="text-white text-xs font-medium">أشغال سابقة موثقة</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Business Hours & Payment */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                  <div className="flex items-center gap-2 text-stone-900 font-bold text-xs mb-1">
                    <Clock className="w-4 h-4 text-stone-500" />
                    <span>أوقات العمل والتواصل:</span>
                  </div>
                  <p className="text-stone-600 text-xs">{craftsman.workingHours}</p>
                </div>

                <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                  <div className="flex items-center gap-2 text-stone-900 font-bold text-xs mb-1">
                    <CreditCard className="w-4 h-4 text-stone-500" />
                    <span>طرق الدفع المقبولة:</span>
                  </div>
                  <p className="text-stone-600 text-xs">{craftsman.paymentMethods.join(' · ')}</p>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: REVIEWS & ADD REVIEW */}
          {activeTab === 'reviews' && (
            <div className="space-y-6">
              
              {/* Reviews Summary Header */}
              <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="text-3xl font-black text-stone-900 tabular-nums">
                    {craftsman.rating.toFixed(1)}
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-amber-500">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          className={`w-4 h-4 ${star <= Math.round(craftsman.rating) ? 'fill-amber-400 text-amber-400' : 'text-stone-300'}`} 
                        />
                      ))}
                    </div>
                    <span className="text-xs text-stone-500 mt-0.5 block">
                      بناءً على <strong className="text-stone-900 tabular-nums">{craftsman.reviewCount}</strong> تجربة موثقة
                    </span>
                  </div>
                </div>

                <a
                  href="#add-review-form"
                  className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold transition-colors"
                >
                  أضف تقييمك وتجربتك
                </a>
              </div>

              {/* Reviews List */}
              <div className="space-y-4">
                {craftsman.reviews.map((rev) => (
                  <div key={rev.id} className="p-4 rounded-xl border border-stone-200 bg-white space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-stone-900 text-sm">{rev.authorName}</span>
                        {rev.wilaya && (
                          <span className="text-xs text-stone-400">({rev.wilaya})</span>
                        )}
                      </div>
                      <span className="text-xs text-stone-400 tabular-nums">{rev.date}</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs">
                      <div className="flex items-center text-amber-400">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star 
                            key={s} 
                            className={`w-3.5 h-3.5 ${s <= rev.rating ? 'fill-amber-400 text-amber-400' : 'text-stone-200'}`} 
                          />
                        ))}
                      </div>
                      <span className="text-stone-300" aria-hidden="true">·</span>
                      <span className="text-stone-600 font-medium">{rev.serviceProvided}</span>
                    </div>

                    <p className="text-stone-700 text-xs sm:text-sm leading-relaxed pt-1">
                      {rev.comment}
                    </p>

                    {rev.recommend && (
                      <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-medium pt-1">
                        <ThumbsUp className="w-3 h-3 text-emerald-600" />
                        <span>ينصح بالتعامل مع هذا الحرفي</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Add Review Form */}
              <div id="add-review-form" className="p-5 rounded-xl border border-amber-200 bg-amber-50/40 space-y-4 pt-5">
                <h4 className="font-bold text-stone-900 text-base">هل تعاملت مع {craftsman.name}؟ شاركنا رأيك</h4>
                <p className="text-xs text-stone-600">
                  تقييمك يساعد باقي المواطنين في اختيار الحرفي المناسب ويكافئ الحرفيين المتقنين لعملهم.
                </p>

                {reviewSubmitted ? (
                  <div className="p-4 bg-emerald-100 text-emerald-800 rounded-lg text-sm font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>شكراً لك! تم إضافة تقييمك بنجاح وسيتحدث معدل الحرفي فوراً.</span>
                  </div>
                ) : (
                  <form onSubmit={handleReviewSubmit} className="space-y-4">
                    
                    {/* Star Rating Selector */}
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        تقييمك الإجمالي (من 1 إلى 5 نجوم):
                      </label>
                      <div className="flex items-center gap-1.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            type="button"
                            key={star}
                            onClick={() => setNewReviewRating(star)}
                            onMouseEnter={() => setNewReviewHoverRating(star)}
                            onMouseLeave={() => setNewReviewHoverRating(null)}
                            className="p-1 focus:outline-none transition-transform hover:scale-110"
                            title={`${star} نجوم`}
                          >
                            <Star 
                              className={`w-6 h-6 ${(newReviewHoverRating !== null ? star <= newReviewHoverRating : star <= newReviewRating) ? 'fill-amber-400 text-amber-400' : 'text-stone-300'}`} 
                            />
                          </button>
                        ))}
                        <span className="text-xs font-bold text-stone-800 mr-2 tabular-nums">
                          {newReviewHoverRating !== null ? newReviewHoverRating : newReviewRating} من 5 نجوم
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          اسمك الكريم:
                        </label>
                        <input
                          type="text"
                          required
                          value={newReviewAuthor}
                          onChange={(e) => setNewReviewAuthor(e.target.value)}
                          placeholder="مثلاً: محمد العربي"
                          className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          نوع الخدمة التي قدمها لك:
                        </label>
                        <input
                          type="text"
                          value={newReviewService}
                          onChange={(e) => setNewReviewService(e.target.value)}
                          placeholder="مثلاً: إصلاح تسرب أو تركيب مكيف"
                          className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        تعليقك وتجربتك بالتفصيل (الجودة، المواعيد، المعاملة، السعر):
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={newReviewComment}
                        onChange={(e) => setNewReviewComment(e.target.value)}
                        placeholder="اكتب تجربتك الحقيقية بكل أمانة..."
                        className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="recommend"
                        checked={newReviewRecommend}
                        onChange={(e) => setNewReviewRecommend(e.target.checked)}
                        className="rounded border-stone-300 text-amber-600 focus:ring-amber-500 w-4 h-4"
                      />
                      <label htmlFor="recommend" className="text-xs text-stone-700 font-medium">
                        أنصح الآخرين بالتعامل مع هذا الحرفي
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm rounded-lg transition-colors shadow-sm flex items-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>نشر التقييم الآن</span>
                    </button>
                  </form>
                )}
              </div>

            </div>
          )}

          {/* TAB 3: REQUEST A QUOTE / BOOKING */}
          {activeTab === 'quote' && (
            <div className="space-y-4">
              <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl">
                <h4 className="font-bold text-stone-900 text-base mb-1">طلب موعد أو استفسار عن تسعيرة</h4>
                <p className="text-xs text-stone-600">
                  املأ البيانات وسيقوم التطبيق بتجهيز رسالة واتساب دقيقة ترسل مباشرة إلى {craftsman.name} ليتصل بك.
                </p>
              </div>

              <form onSubmit={handleSendQuoteViaWhatsApp} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      اسمك الكامل:
                    </label>
                    <input
                      type="text"
                      required
                      value={quoteName}
                      onChange={(e) => setQuoteName(e.target.value)}
                      placeholder="مثال: يونس قدور"
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      رقم هاتفك للتواصل:
                    </label>
                    <input
                      type="tel"
                      required
                      value={quotePhone}
                      onChange={(e) => setQuotePhone(e.target.value)}
                      placeholder="0550 00 00 00"
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      الخدمة المطلوبة:
                    </label>
                    <input
                      type="text"
                      value={quoteServiceType}
                      onChange={(e) => setQuoteServiceType(e.target.value)}
                      placeholder={`مثلاً: ${craftsman.trade}`}
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      درجة الاستعجال:
                    </label>
                    <select
                      value={quoteUrgency}
                      onChange={(e) => setQuoteUrgency(e.target.value as 'normal' | 'urgent')}
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    >
                      <option value="normal">موعد عادي (خلال الأيام القادمة)</option>
                      <option value="urgent">طوارئ مستعجل (في أقرب وقت ممكن)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    وصف المشكل أو العمل المطلوب وعنوانك:
                  </label>
                  <textarea
                    rows={3}
                    value={quoteDetails}
                    onChange={(e) => setQuoteDetails(e.target.value)}
                    placeholder="مثال: تسرب في حنفية الحمام تحت الحوض في الطابق الثاني بباب الزوار..."
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-lg transition-colors shadow-sm flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>إرسال الطلب للحرفي عبر واتساب مباشرة</span>
                </button>
              </form>
            </div>
          )}

        </div>

        {/* Modal Bottom Actions */}
        <div className="p-4 border-t border-stone-200 bg-stone-50 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-xs text-stone-500">
            <span>التسعيرة التقديرية:</span>
            <strong className="text-stone-900 font-semibold">{craftsman.priceNote}</strong>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-stone-300 hover:bg-stone-200/50 text-stone-700 text-xs font-semibold rounded-lg transition-colors"
            >
              إغلاق
            </button>
            <a
              href={`tel:${craftsman.phoneClean}`}
              onClick={() => onCall(craftsman)}
              className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>اتصال الآن</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
