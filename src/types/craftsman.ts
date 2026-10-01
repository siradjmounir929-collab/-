export interface Review {
  id: string;
  authorName: string;
  rating: number; // 1 to 5
  date: string;
  comment: string;
  serviceProvided: string;
  recommend: boolean;
  wilaya?: string;
}

export type TradeCategory = 
  | 'all'
  | 'masonry'      // بناء
  | 'plumbing'     // سباك
  | 'carpentry'    // نجار
  | 'mechanic'     // ميكانيسيان
  | 'cook'         // طباخ
  | 'electrical'   // كهربائي
  | 'painting'     // صباغ ودهان
  | 'hvac'         // تبريد وتكييف
  | 'metal'        // حدادة وألمنيوم
  | 'cleaning';    // تنظيف وغسيل

export interface Craftsman {
  id: string;
  name: string;
  trade: string; // e.g. "سباك وترصيص صحي"
  category: Exclude<TradeCategory, 'all'>;
  phone: string; // e.g. "0550 12 34 56"
  phoneClean: string; // "+213550123456"
  whatsapp: string; // "+213550123456"
  wilaya: string; // e.g. "الجزائر العاصمة"
  commune: string; // e.g. "باب الزوار"
  address: string; // detailed address / zone
  coordinates: {
    lat: number;
    lng: number;
  };
  rating: number; // 4.9
  reviewCount: number;
  reviews: Review[];
  experienceYears: number;
  verified: boolean;
  isAvailable247: boolean;
  priceNote: string; // e.g. "تبدأ من 2,000 دج"
  bio: string;
  specialties: string[];
  workImages: string[];
  avatarUrl?: string;
  workingHours: string;
  paymentMethods: string[];
  isFeatured?: boolean;
}

export interface NewCraftsmanForm {
  name: string;
  trade: string;
  category: Exclude<TradeCategory, 'all'>;
  phone: string;
  whatsapp: string;
  wilaya: string;
  commune: string;
  address: string;
  experienceYears: number;
  bio: string;
  priceNote: string;
  isAvailable247: boolean;
  specialties: string;
}
