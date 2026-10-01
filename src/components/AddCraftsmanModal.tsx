import React, { useState } from 'react';
import { X, CheckCircle2, Phone, MapPin, Briefcase, Plus, Sparkles } from 'lucide-react';
import { Craftsman, TradeCategory } from '../types/craftsman';
import { WILAYAS_LIST, CATEGORIES_LIST } from '../data/mockCraftsmen';

interface AddCraftsmanModalProps {
  onClose: () => void;
  onAddCraftsman: (craftsman: Omit<Craftsman, 'id' | 'rating' | 'reviewCount' | 'reviews' | 'verified'>) => void;
}

export const AddCraftsmanModal: React.FC<AddCraftsmanModalProps> = ({
  onClose,
  onAddCraftsman,
}) => {
  const [name, setName] = useState('');
  const [trade, setTrade] = useState('');
  const [category, setCategory] = useState<Exclude<TradeCategory, 'all'>>('plumbing');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [wilaya, setWilaya] = useState(WILAYAS_LIST[0]);
  const [commune, setCommune] = useState('');
  const [address, setAddress] = useState('');
  const [experienceYears, setExperienceYears] = useState(5);
  const [priceNote, setPriceNote] = useState('معاينة وتسعيرة بعد المعاينة');
  const [bio, setBio] = useState('');
  const [specialtiesText, setSpecialtiesText] = useState('');
  const [isAvailable247, setIsAvailable247] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !commune.trim()) return;

    // Clean phone number for tel: protocol
    const cleanDigits = phone.replace(/[^0-9]/g, '');
    let formattedPhoneClean = phone;
    if (cleanDigits.startsWith('0')) {
      formattedPhoneClean = '+213' + cleanDigits.substring(1);
    } else if (cleanDigits.startsWith('213')) {
      formattedPhoneClean = '+' + cleanDigits;
    }

    const formattedWhatsapp = whatsapp.trim() ? (
      whatsapp.startsWith('+') ? whatsapp : '+213' + whatsapp.replace(/[^0-9]/g, '').replace(/^0/, '')
    ) : formattedPhoneClean;

    // Approximate Algerian coordinates based on Wilaya
    let defaultCoords = { lat: 36.7538, lng: 3.0588 }; // Algiers default
    if (wilaya === 'وهران') defaultCoords = { lat: 35.6987, lng: -0.6349 };
    else if (wilaya === 'قسنطينة') defaultCoords = { lat: 36.365, lng: 6.6147 };
    else if (wilaya === 'سطيف') defaultCoords = { lat: 36.1911, lng: 5.4137 };
    else if (wilaya === 'البليدة') defaultCoords = { lat: 36.4700, lng: 2.8300 };
    else if (wilaya === 'عنابة') defaultCoords = { lat: 36.9000, lng: 7.7667 };
    else if (wilaya === 'تيزي وزو') defaultCoords = { lat: 36.7118, lng: 4.0459 };
    else if (wilaya === 'باتنة') defaultCoords = { lat: 35.5558, lng: 6.1741 };

    const parsedSpecialties = specialtiesText
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    onAddCraftsman({
      name: name.trim(),
      trade: trade.trim() || 'حرفي ومهني متخصص',
      category,
      phone: phone.trim(),
      phoneClean: formattedPhoneClean,
      whatsapp: formattedWhatsapp,
      wilaya,
      commune: commune.trim(),
      address: address.trim() || `${commune}، ولاية ${wilaya}`,
      coordinates: defaultCoords,
      experienceYears: Number(experienceYears) || 3,
      isAvailable247,
      priceNote: priceNote.trim() || 'حسب المعاينة',
      bio: bio.trim() || `حرفي معتمد يقدم خدمات عالية الجودة في ولاية ${wilaya} وضواحيها بكل أمانة واحترافية.`,
      specialties: parsedSpecialties.length > 0 ? parsedSpecialties : ['خدمة سريعة في المنازل', 'إتقان وجودة مضمونة'],
      workImages: ['/src/assets/images/hero_craftsmen_tools_1790889019130.jpg'],
      workingHours: isAvailable247 ? 'متوفر 24/24 ساعة للطوارئ' : 'السبت إلى الخميس: 08:00 - 18:00',
      paymentMethods: ['نقداً (Espèce)', 'بريدي موب (BaridiMob)'],
    });

    setSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 1800);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-50 shrink-0">
          <div>
            <h3 className="text-lg font-bold text-stone-900">تسجيل حرفي جديد في الدليل</h3>
            <p className="text-xs text-stone-500">أضف بياناتك وهاتفك ليصلك الزبائن مباشرة في ولايتك</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Form */}
        <div className="p-6 overflow-y-auto">
          {submitted ? (
            <div className="p-8 text-center space-y-3">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-bold text-stone-900">تم تسجيلك بنجاح في الدليل!</h4>
              <p className="text-sm text-stone-600">
                أصبح ملفك متاحاً لجميع المواطنين للاتصال المباشر والتقييم.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Name & Trade */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    الاسم الكامل أو اسم الورشة: <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="مثال: المعلم عبد القادر المرصص"
                    className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    الحرفة / التخصص الرئيسي: <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as Exclude<TradeCategory, 'all'>)}
                    className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  >
                    {CATEGORIES_LIST.filter(c => c.id !== 'all').map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  المسمى المهني التفصيلي:
                </label>
                <input
                  type="text"
                  value={trade}
                  onChange={(e) => setTrade(e.target.value)}
                  placeholder="مثال: سباك وترصيص صحي وكشف التسربات وشوفاج سنترال"
                  className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              {/* Phone Numbers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    رقم الهاتف للاتصال المباشر: <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0550 12 34 56"
                    className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    رقم الواتساب (WhatsApp):
                  </label>
                  <input
                    type="tel"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="0550 12 34 56 (اتركه فارغاً إن كان نفس الهاتف)"
                    className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none font-mono"
                  />
                </div>
              </div>

              {/* Location: Wilaya, Commune, Address */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    الولاية: <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={wilaya}
                    onChange={(e) => setWilaya(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  >
                    {WILAYAS_LIST.map((w) => (
                      <option key={w} value={w}>{w}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    البلدية أو المنطقة: <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={commune}
                    onChange={(e) => setCommune(e.target.value)}
                    placeholder="مثال: باب الزوار، عين البنيان..."
                    className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  عنوان الورشة أو مكان الانطلاق بدقة:
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="مثال: حي النور، بالقرب من محطة الحافلات"
                  className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              {/* Experience and Pricing */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    سنوات الخبرة المهنية:
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={experienceYears}
                    onChange={(e) => setExperienceYears(Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    ملاحظة السعر / بداية التسعيرة:
                  </label>
                  <input
                    type="text"
                    value={priceNote}
                    onChange={(e) => setPriceNote(e.target.value)}
                    placeholder="مثال: كشف من 1500 دج أو حسب المعاينة"
                    className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Bio & Specialties */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  نبذة تعريفية بالخدمات والمهارات:
                </label>
                <textarea
                  rows={2}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="اكتب نبذة عن التخصصات والمعدات التي تستعملها وطرق العمل..."
                  className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  أبرز الخدمات المحددة (خدمة في كل سطر):
                </label>
                <textarea
                  rows={2}
                  value={specialtiesText}
                  onChange={(e) => setSpecialtiesText(e.target.value)}
                  placeholder={"كشف تسربات المياه\nتركيب سخانات الغاز\nتسليك المجاري"}
                  className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              {/* 24/7 Availability */}
              <div className="flex items-center gap-2 p-3 bg-stone-50 rounded-xl border border-stone-200">
                <input
                  type="checkbox"
                  id="avail247"
                  checked={isAvailable247}
                  onChange={(e) => setIsAvailable247(e.target.checked)}
                  className="rounded border-stone-300 text-amber-600 focus:ring-amber-500 w-4 h-4"
                />
                <label htmlFor="avail247" className="text-xs sm:text-sm font-semibold text-stone-800 cursor-pointer">
                  أنا متاح لخدمات الطوارئ الليلية 24/24 ساعة (تسربات مياه، انقطاع كهرباء، أعطال سيارات)
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-stone-900 hover:bg-stone-800 text-white font-bold text-sm rounded-lg transition-colors shadow-sm flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4 text-amber-400" />
                  <span>تأكيد التسجيل وإدراج الملف في الدليل</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
