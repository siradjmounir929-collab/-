import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, MapPin, Filter, Star, Phone, MessageCircle, 
  Sparkles, CheckCircle2, ShieldCheck, Flame, Compass,
  Grid, Map as MapIcon, ArrowUpDown, ChevronDown, Wrench,
  ThumbsUp, Clock, AlertTriangle, Users
} from 'lucide-react';
import { Craftsman, Review, TradeCategory } from './types/craftsman';
import { INITIAL_CRAFTSMEN, WILAYAS_LIST, CATEGORIES_LIST } from './data/mockCraftsmen';
import { Navbar } from './components/Navbar';
import { CraftsmanCard } from './components/CraftsmanCard';
import { CraftsmanDetailModal } from './components/CraftsmanDetailModal';
import { CraftsmenMap } from './components/CraftsmenMap';
import { AddCraftsmanModal } from './components/AddCraftsmanModal';
import { DirectCallModal } from './components/DirectCallModal';
import { FavoritesModal } from './components/FavoritesModal';
import { InstallAppModal } from './components/InstallAppModal';

export default function App() {
  // State for craftsmen with localStorage persistence
  const [craftsmen, setCraftsmen] = useState<Craftsman[]>(() => {
    try {
      const saved = localStorage.getItem('hirafi_beladi_craftsmen');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Failed to parse saved craftsmen', e);
    }
    return INITIAL_CRAFTSMEN;
  });

  // State for favorites
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('hirafi_beladi_favorites');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse favorites', e);
    }
    return ['cr-plumb-1', 'cr-mech-1'];
  });

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('hirafi_beladi_craftsmen', JSON.stringify(craftsmen));
  }, [craftsmen]);

  useEffect(() => {
    localStorage.setItem('hirafi_beladi_favorites', JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  // Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<TradeCategory>('all');
  const [selectedWilaya, setSelectedWilaya] = useState<string>('all');
  const [onlyEmergency, setOnlyEmergency] = useState(false);
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'rating' | 'reviews' | 'experience'>('rating');
  const [activeView, setActiveView] = useState<'list' | 'map'>('list');

  // Modals state
  const [selectedCraftsman, setSelectedCraftsman] = useState<Craftsman | null>(null);
  const [callingCraftsman, setCallingCraftsman] = useState<Craftsman | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);

  // Toggle Favorite
  const handleToggleFavorite = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setFavoriteIds((prev) => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Add Craftsman
  const handleAddCraftsman = (newCraftsmanData: Omit<Craftsman, 'id' | 'rating' | 'reviewCount' | 'reviews' | 'verified'>) => {
    const newCraftsman: Craftsman = {
      ...newCraftsmanData,
      id: `cr-custom-${Date.now()}`,
      rating: 5.0,
      reviewCount: 1,
      verified: true,
      reviews: [
        {
          id: `rev-initial-${Date.now()}`,
          authorName: 'فريق التوثيق والاعتماد',
          rating: 5,
          date: 'اليوم',
          comment: 'تم التحقق من رقم الهاتف والمعلومات المهنية للحرفي وتسجيله في دليل الحرفيين المعتمدين.',
          serviceProvided: newCraftsmanData.trade,
          recommend: true,
          wilaya: newCraftsmanData.wilaya,
        }
      ]
    };

    setCraftsmen(prev => [newCraftsman, ...prev]);
    setSelectedCraftsman(newCraftsman);
  };

  // Add Review
  const handleAddReview = (craftsmanId: string, reviewData: Omit<Review, 'id' | 'date'>) => {
    setCraftsmen(prev => prev.map(c => {
      if (c.id !== craftsmanId) return c;

      const newReview: Review = {
        ...reviewData,
        id: `rev-${Date.now()}`,
        date: 'الآن',
      };

      const updatedReviews = [newReview, ...c.reviews];
      const sum = updatedReviews.reduce((acc, r) => acc + r.rating, 0);
      const newRating = Number((sum / updatedReviews.length).toFixed(1));

      return {
        ...c,
        rating: newRating,
        reviewCount: updatedReviews.length,
        reviews: updatedReviews,
      };
    }));

    // Update selected craftsman if currently open in modal
    if (selectedCraftsman && selectedCraftsman.id === craftsmanId) {
      setSelectedCraftsman(prev => {
        if (!prev) return null;
        const newReview: Review = {
          ...reviewData,
          id: `rev-${Date.now()}`,
          date: 'الآن',
        };
        const updatedReviews = [newReview, ...prev.reviews];
        const sum = updatedReviews.reduce((acc, r) => acc + r.rating, 0);
        return {
          ...prev,
          rating: Number((sum / updatedReviews.length).toFixed(1)),
          reviewCount: updatedReviews.length,
          reviews: updatedReviews,
        };
      });
    }
  };

  // Filtered & Sorted Craftsmen
  const filteredCraftsmen = useMemo(() => {
    return craftsmen.filter(c => {
      // Category filter
      if (selectedCategory !== 'all' && c.category !== selectedCategory) {
        return false;
      }

      // Wilaya filter
      if (selectedWilaya !== 'all' && c.wilaya !== selectedWilaya) {
        return false;
      }

      // Emergency filter
      if (onlyEmergency && !c.isAvailable247) {
        return false;
      }

      // Rating filter
      if (minRating > 0 && c.rating < minRating) {
        return false;
      }

      // Search query filter (matches name, trade, commune, address, specialties, phone)
      if (searchQuery.trim()) {
        const query = searchQuery.trim().toLowerCase();
        const matchesName = c.name.toLowerCase().includes(query);
        const matchesTrade = c.trade.toLowerCase().includes(query);
        const matchesCommune = c.commune.toLowerCase().includes(query);
        const matchesWilaya = c.wilaya.toLowerCase().includes(query);
        const matchesPhone = c.phone.replace(/\s+/g, '').includes(query.replace(/\s+/g, ''));
        const matchesSpecialties = c.specialties?.some(s => s.toLowerCase().includes(query));
        const matchesBio = c.bio.toLowerCase().includes(query);

        if (!matchesName && !matchesTrade && !matchesCommune && !matchesWilaya && !matchesPhone && !matchesSpecialties && !matchesBio) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      }
      if (sortBy === 'reviews') {
        return b.reviewCount - a.reviewCount;
      }
      if (sortBy === 'experience') {
        return b.experienceYears - a.experienceYears;
      }
      return 0;
    });
  }, [craftsmen, selectedCategory, selectedWilaya, onlyEmergency, minRating, searchQuery, sortBy]);

  // Favorites list
  const favoriteCraftsmen = useMemo(() => {
    return craftsmen.filter(c => favoriteIds.includes(c.id));
  }, [craftsmen, favoriteIds]);

  return (
    <div className="min-h-screen bg-[#faf8f5] text-stone-900 flex flex-col font-['Cairo'] selection:bg-amber-500 selection:text-white">
      
      {/* Top Bar Navigation */}
      <Navbar
        onOpenAddModal={() => setIsAddModalOpen(true)}
        favoritesCount={favoriteIds.length}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
        activeView={activeView}
        setActiveView={setActiveView}
        onSelectEmergencyOnly={() => {
          setOnlyEmergency(prev => !prev);
          setActiveView('list');
        }}
        isEmergencyOnly={onlyEmergency}
        onOpenInstallModal={() => setIsInstallModalOpen(true)}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-stone-900 via-stone-900 to-stone-800 text-white overflow-hidden py-12 sm:py-16">
        
        {/* Subtle Background Pattern & Ambient Glow */}
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <img 
            src="/src/assets/images/hero_craftsmen_tools_1790889019130.jpg" 
            alt="أدوات وحرف جزائرية"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-stone-900/80 mix-blend-multiply" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl text-right space-y-4">
            
            {/* Tagline text metadata without pill */}
            <div className="flex items-center gap-2 text-xs sm:text-sm text-amber-400 font-semibold tracking-wide">
              <span>دليل الحرفيين المعتمدين في الجزائر</span>
              <span aria-hidden="true" className="text-stone-500">·</span>
              <span>أرقام الهواتف والمواقع والتقييمات الحقيقية</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-white font-['Cairo'] text-balance">
              ابحث عن أفضل حرفي في ولايتك وتواصل معه مباشرة
            </h1>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
              دليل شامل يجمع أمهر الحرفيين في الجزائر: <strong className="text-white font-bold">بناء، سباك، نجار، ميكانيسيان، طباخ أعراس</strong>، كهربائي، صباغ، وتبريد وتكييف، مع أرقام هواتفهم للتواصل المباشر، مواقعهم الجغرافية، وتقييمات زبائن حقيقية دون أي وسيط.
            </p>

            {/* Quick Metrics Line */}
            <div className="flex items-center flex-wrap gap-4 text-xs text-stone-300 pt-1 font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>اتصال هاتفي مباشر دون وسيط أو عمولة</span>
              </div>
              <span aria-hidden="true" className="text-stone-600">·</span>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>تغطية مختلف ولايات وبلديات الجزائر</span>
              </div>
              <span aria-hidden="true" className="text-stone-600">·</span>
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span>تقييمات وتجارب موثوقة من الزبائن</span>
              </div>
            </div>

          </div>

          {/* Search Box Card */}
          <div className="mt-8 bg-white text-stone-900 rounded-2xl p-3 sm:p-4 shadow-2xl border border-stone-200">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              
              {/* Search Keyword */}
              <div className="md:col-span-6 relative">
                <Search className="w-5 h-5 text-stone-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ابحث بالحرفة، الاسم، المشكل (مثلاً: تسرب، مطبخ، سكانير، كسكسي)..."
                  className="w-full pr-11 pl-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm text-stone-900 focus:bg-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700"
                  >
                    مسح
                  </button>
                )}
              </div>

              {/* Wilaya Dropdown */}
              <div className="md:col-span-3 relative">
                <MapPin className="w-4 h-4 text-stone-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                <select
                  value={selectedWilaya}
                  onChange={(e) => setSelectedWilaya(e.target.value)}
                  className="w-full pr-10 pl-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm font-semibold text-stone-800 focus:bg-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                >
                  <option value="all">كل الولايات ({WILAYAS_LIST.length})</option>
                  {WILAYAS_LIST.map((w) => (
                    <option key={w} value={w}>{w}</option>
                  ))}
                </select>
              </div>

              {/* View & Search Trigger */}
              <div className="md:col-span-3 flex items-center gap-2">
                <button
                  onClick={() => {
                    // Quick reset query if needed or focus
                  }}
                  className="flex-1 py-3 px-4 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-sm font-bold transition-colors shadow-sm flex items-center justify-center gap-2"
                >
                  <Search className="w-4 h-4" />
                  <span>بحث في الدليل</span>
                </button>

                {/* View switcher button (List / Map) */}
                <div className="flex items-center p-1 bg-stone-100 rounded-xl border border-stone-200 shrink-0">
                  <button
                    onClick={() => setActiveView('list')}
                    className={`p-2 rounded-lg transition-colors ${
                      activeView === 'list' 
                        ? 'bg-white text-stone-900 shadow-sm' 
                        : 'text-stone-500 hover:text-stone-900'
                    }`}
                    title="عرض البطاقات"
                    aria-label="عرض البطاقات"
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setActiveView('map')}
                    className={`p-2 rounded-lg transition-colors ${
                      activeView === 'map' 
                        ? 'bg-white text-stone-900 shadow-sm' 
                        : 'text-stone-500 hover:text-stone-900'
                    }`}
                    title="عرض الخريطة التفاعلية"
                    aria-label="عرض الخريطة التفاعلية"
                  >
                    <MapIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Popular Trades Quick Bar (بناء، سباك، نجار، ميكانيسيان، طباخ...) */}
      <section className="bg-white border-b border-stone-200 sticky top-16 sm:top-20 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1.5 py-3 overflow-x-auto no-scrollbar scroll-smooth">
            {CATEGORIES_LIST.map((cat) => {
              const isActive = selectedCategory === cat.id;
              const count = cat.id === 'all' 
                ? craftsmen.length 
                : craftsmen.filter(c => c.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-colors shrink-0 flex items-center gap-1.5 whitespace-nowrap ${
                    isActive 
                      ? 'bg-stone-900 text-white shadow-xs' 
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`text-[11px] font-bold px-1.5 py-0.2 rounded-full tabular-nums ${
                    isActive ? 'bg-stone-800 text-amber-300' : 'bg-stone-100 text-stone-500'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

        {/* Emergency Alert Callout Bar if active or general */}
        {onlyEmergency && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-600 animate-ping"></span>
              <div>
                <h3 className="text-sm font-bold text-red-950">وضع الطوارئ 24/7 مفعّل</h3>
                <p className="text-xs text-red-800">
                  يتم الآن عرض الحرفيين المستعدين للتدخل السريع والإنقاذ الليلي في حالات التسربات المائية، الأعطال الكهربائية، أو تعطل السيارات على الطريق.
                </p>
              </div>
            </div>

            <button
              onClick={() => setOnlyEmergency(false)}
              className="text-xs font-bold text-red-700 hover:underline shrink-0"
            >
              عرض جميع الحرفيين
            </button>
          </div>
        )}

        {/* Secondary Filter & Sort Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
          
          {/* Results Count & Active Filters Indicator */}
          <div className="flex items-center gap-2 text-xs sm:text-sm text-stone-600">
            <span>تم العثور على</span>
            <strong className="text-stone-900 font-bold tabular-nums text-base">{filteredCraftsmen.length}</strong>
            <span>حرفي متخصص</span>

            {selectedWilaya !== 'all' && (
              <>
                <span aria-hidden="true" className="text-stone-300">·</span>
                <span className="font-semibold text-amber-800">في {selectedWilaya}</span>
              </>
            )}

            {searchQuery && (
              <>
                <span aria-hidden="true" className="text-stone-300">·</span>
                <span className="text-stone-500">للبحث: "{searchQuery}"</span>
              </>
            )}
          </div>

          {/* Sort & Rating Filter */}
          <div className="flex items-center flex-wrap gap-3">
            
            {/* Minimum Rating Selector */}
            <div className="flex items-center gap-1.5 text-xs text-stone-600">
              <span>التقييم:</span>
              <select
                value={minRating}
                onChange={(e) => setMinRating(Number(e.target.value))}
                className="bg-white border border-stone-300 rounded-lg px-2 py-1 text-xs font-semibold text-stone-800 focus:outline-none focus:ring-1 focus:ring-amber-500"
              >
                <option value={0}>كل التقييمات</option>
                <option value={4.5}>4.5 نجوم فما فوق ★</option>
                <option value={4.8}>4.8 نجوم فما فوق ★</option>
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 text-xs text-stone-600">
              <ArrowUpDown className="w-3.5 h-3.5 text-stone-400" />
              <span>ترتيب حسب:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'rating' | 'reviews' | 'experience')}
                className="bg-white border border-stone-300 rounded-lg px-2 py-1 text-xs font-semibold text-stone-800 focus:outline-none focus:ring-1 focus:ring-amber-500"
              >
                <option value="rating">الأعلى تقييماً</option>
                <option value="reviews">الأكثر مراجعة وتقييمات</option>
                <option value="experience">الأكثر خبرة بالسنوات</option>
              </select>
            </div>

            {/* 24/7 Filter Toggle Button */}
            <button
              onClick={() => setOnlyEmergency(prev => !prev)}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-colors border ${
                onlyEmergency 
                  ? 'bg-red-600 text-white border-red-600' 
                  : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-50'
              }`}
            >
              طوارئ 24/7
            </button>

          </div>

        </div>

        {/* VIEW 1: MAP VIEW */}
        {activeView === 'map' && (
          <div className="space-y-6">
            <CraftsmenMap
              craftsmen={filteredCraftsmen}
              selectedCraftsman={selectedCraftsman}
              onSelectCraftsman={(craftsman) => setSelectedCraftsman(craftsman)}
              onCall={(craftsman) => setCallingCraftsman(craftsman)}
            />

            {/* Quick cards under map */}
            <div className="pt-4">
              <h3 className="text-base font-bold text-stone-900 mb-4">قائمة الحرفيين في المنطقة المحددة</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredCraftsmen.slice(0, 6).map((craftsman) => (
                  <CraftsmanCard
                    key={craftsman.id}
                    craftsman={craftsman}
                    onSelect={(c) => setSelectedCraftsman(c)}
                    onCall={(c, e) => {
                      e.stopPropagation();
                      setCallingCraftsman(c);
                    }}
                    isFavorite={favoriteIds.includes(craftsman.id)}
                    onToggleFavorite={handleToggleFavorite}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: LIST / GRID VIEW */}
        {activeView === 'list' && (
          <div>
            {filteredCraftsmen.length === 0 ? (
              <div className="py-16 text-center bg-white rounded-2xl border border-stone-200 p-8 space-y-4">
                <Wrench className="w-12 h-12 text-stone-300 mx-auto" />
                <h3 className="text-lg font-bold text-stone-900">لم يتم العثور على حرفي يطابق هذه المعايير</h3>
                <p className="text-sm text-stone-500 max-w-md mx-auto">
                  جرب توسيع نطاق البحث، أو تغيير الولاية أو الحرفة، أو إلغاء تحديد خيار الطوارئ.
                </p>
                <div className="flex items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                      setSelectedWilaya('all');
                      setOnlyEmergency(false);
                      setMinRating(0);
                    }}
                    className="px-4 py-2 bg-stone-900 text-white rounded-lg text-xs font-semibold hover:bg-stone-800 transition-colors"
                  >
                    إعادة ضبط الفلاتر
                  </button>
                  <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="px-4 py-2 bg-amber-600 text-white rounded-lg text-xs font-semibold hover:bg-amber-700 transition-colors"
                  >
                    سجل كحرفي في هذه المنطقة
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCraftsmen.map((craftsman) => (
                  <CraftsmanCard
                    key={craftsman.id}
                    craftsman={craftsman}
                    onSelect={(c) => setSelectedCraftsman(c)}
                    onCall={(c, e) => {
                      e.stopPropagation();
                      setCallingCraftsman(c);
                    }}
                    isFavorite={favoriteIds.includes(craftsman.id)}
                    onToggleFavorite={handleToggleFavorite}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* How it works Section (Proof & Editorial flow) */}
        <section id="how-it-works" className="mt-16 pt-12 border-t border-stone-200">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
              كيف يعمل دليل الحرفيين المعتمدين؟
            </h2>
            <p className="text-stone-500 text-sm">
              ثلاث خطوات بسيطة للحصول على أفضل حرفي بأعلى جودة وسعر عادل
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="p-6 bg-white rounded-xl border border-stone-200/80 space-y-3">
              <span className="text-3xl font-black text-amber-600 font-mono">01.</span>
              <h3 className="text-base font-bold text-stone-900">اختر الحرفة وحدد ولايتك</h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                حدد التخصص المطلوب (بناء، سباكة، نجارة، ميكانيك، طبخ أعراس، كهرباء) واختر ولايتك أو افتح الخريطة التفاعلية لاكتشاف الحرفيين الأقرب إليك.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl border border-stone-200/80 space-y-3">
              <span className="text-3xl font-black text-amber-600 font-mono">02.</span>
              <h3 className="text-base font-bold text-stone-900">اطلع على التقييمات والأعمال السابقة</h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                اقرأ تجارب وتقييمات زبائن حقيقيين، وشاهد صور الأعمال المنجزة والشهادات، واطلع على أسعار المعاينة وأوقات العمل.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl border border-stone-200/80 space-y-3">
              <span className="text-3xl font-black text-amber-600 font-mono">03.</span>
              <h3 className="text-base font-bold text-stone-900">اتصل مباشرة أو عبر واتساب</h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                اتصل برقم هاتف الحرفي بنقرة واحدة دون أي وسيط مالي، اتفق على موعد المعاينة، وقيم الحرفي بعد انتهاء العمل لمساعدة باقي المواطنين.
              </p>
            </div>

          </div>
        </section>

        {/* CTA Banner for Craftsmen to Join */}
        <section className="mt-12 bg-stone-900 text-white rounded-2xl p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
          <div className="space-y-2 max-w-xl text-right">
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              أنت حرفي أو صاحب ورشة؟ سجّل رقمك الآن مجاناً
            </h3>
            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
              احصل على زبائن حقيقيين في بلديتك وولايتك بدون وساطة أو اقتطاعات. يستقبل الحرفيون المسجلون مئات الاتصالات شهرياً.
            </p>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-sm rounded-xl transition-colors shadow-md whitespace-nowrap shrink-0"
          >
            إضافة ملفك ورقم هاتفك في الدليل
          </button>
        </section>

      </main>

      {/* Quiet Footer */}
      <footer className="mt-16 bg-white border-t border-stone-200 py-10 text-stone-600 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-bold text-stone-900 text-sm">حرفي بلادي</span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span>دليل الحرفيين والمهن الحرة في الجزائر</span>
          </div>

          <div className="flex items-center gap-6 text-stone-500">
            <span>الهاتف المباشر</span>
            <span>الموقع الجغرافي</span>
            <span>التقييمات الموثقة</span>
            <a 
              href="/hirafi-beladi.zip" 
              download="hirafi-beladi.zip" 
              className="text-amber-800 font-bold hover:underline flex items-center gap-1"
            >
              <span>💾 تحميل كود المشروع الكامل (ZIP)</span>
            </a>
          </div>

          <p className="text-stone-400">
            © {new Date().getFullYear()} جميع الحقوق محفوظة لخدمة حرفيي الجزائر.
          </p>
        </div>
      </footer>

      {/* MODALS */}
      
      {/* 1. Craftsman Detail & Reviews Modal */}
      {selectedCraftsman && (
        <CraftsmanDetailModal
          craftsman={selectedCraftsman}
          onClose={() => setSelectedCraftsman(null)}
          onAddReview={handleAddReview}
          onCall={(c) => setCallingCraftsman(c)}
        />
      )}

      {/* 2. Direct Call Modal */}
      {callingCraftsman && (
        <DirectCallModal
          craftsman={callingCraftsman}
          onClose={() => setCallingCraftsman(null)}
        />
      )}

      {/* 3. Add Craftsman Modal */}
      {isAddModalOpen && (
        <AddCraftsmanModal
          onClose={() => setIsAddModalOpen(false)}
          onAddCraftsman={handleAddCraftsman}
        />
      )}

      {/* 4. Favorites Modal */}
      {isFavoritesOpen && (
        <FavoritesModal
          favorites={favoriteCraftsmen}
          onClose={() => setIsFavoritesOpen(false)}
          onSelectCraftsman={(c) => setSelectedCraftsman(c)}
          onRemoveFavorite={(id) => handleToggleFavorite(id)}
          onCall={(c) => setCallingCraftsman(c)}
        />
      )}

      {/* 5. Install App on Phone Modal */}
      {isInstallModalOpen && (
        <InstallAppModal
          onClose={() => setIsInstallModalOpen(false)}
        />
      )}

    </div>
  );
}
