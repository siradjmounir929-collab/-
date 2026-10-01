import { Craftsman } from '../types/craftsman';

export const WILAYAS_LIST = [
  'الجزائر العاصمة',
  'وهران',
  'قسنطينة',
  'سطيف',
  'البليدة',
  'عنابة',
  'تيزي وزو',
  'باتنة',
  'تلمسان',
  'بجاية',
  'الشلف',
  'بسكرة',
  'بومرداس',
  'جيجل'
];

export const CATEGORIES_LIST: { id: Craftsman['category'] | 'all'; label: string; icon: string; count?: number }[] = [
  { id: 'all', label: 'الكل', icon: 'Sparkles' },
  { id: 'masonry', label: 'بناء وتلبيس وبلاط', icon: 'Hammer' },
  { id: 'plumbing', label: 'سباك وترصيص صحي', icon: 'Droplets' },
  { id: 'carpentry', label: 'نجار خشب وأثاث', icon: 'Layers' },
  { id: 'mechanic', label: 'ميكانيسيان وسكانير', icon: 'Wrench' },
  { id: 'cook', label: 'طباخ أعراس ومناسبات', icon: 'Utensils' },
  { id: 'electrical', label: 'كهربائي منازل وصناعي', icon: 'Zap' },
  { id: 'painting', label: 'صباغ ودهان وديكور', icon: 'Paintbrush' },
  { id: 'hvac', label: 'تبريد وتكييف', icon: 'Wind' },
  { id: 'metal', label: 'حدادة وألمنيوم وPVC', icon: 'Shield' },
  { id: 'cleaning', label: 'تنظيف أفرشة وسجاد', icon: 'Sparkle' },
];

export const INITIAL_CRAFTSMEN: Craftsman[] = [
  // 1. بناء (Mason / Builder)
  {
    id: 'cr-mason-1',
    name: 'المعلم بوعلام القبايلي للبناء',
    trade: 'بناء وتلبيس، وضع البورسلان والفايونس، حجر الواجهات',
    category: 'masonry',
    phone: '0550 44 19 82',
    phoneClean: '+213550441982',
    whatsapp: '+213550441982',
    wilaya: 'الجزائر العاصمة',
    commune: 'بئر خادم',
    address: 'طريق السحاولة، قرب محطة البنزين، بئر خادم',
    coordinates: {
      lat: 36.7167,
      lng: 3.0667
    },
    rating: 4.92,
    reviewCount: 47,
    experienceYears: 22,
    verified: true,
    isAvailable247: false,
    priceNote: 'تسعيرة بالمتر المربع أو حسب المشروع',
    bio: 'مقاول ومعلم بناء معتمد بخبرة 22 سنة في الجزائر العاصمة وضواحيها. مختص في بناء الفيلات، توسيع المنازل، تلبيس الجدران بالليزر، وضع البورسلان الكبير (120x60 و 120x120)، وبناء واجهات الحجر الطبيعي.',
    specialties: ['بناء قواطع وفيلات من الصفر', 'تركيب البورسلان والغرانيت بالليزر', 'تلبيس الواجهات بالحجر والكرينياتور', 'أشغال الهدم والترميم وإعادة التهيئة'],
    workImages: [
      '/src/assets/images/craftsman_builder_mason_1790889177280.jpg',
      '/src/assets/images/hero_craftsmen_tools_1790889019130.jpg'
    ],
    workingHours: 'السبت إلى الخميس: 07:30 - 17:30',
    paymentMethods: ['نقداً (Espèce)', 'شيك بنكي', 'دفعات مرحلية حسب الإنجاز'],
    isFeatured: true,
    reviews: [
      {
        id: 'rev-m1',
        authorName: 'كمال دراجي',
        rating: 5,
        date: 'منذ يومين',
        comment: 'المعلم بوعلام من أندر الحرفيين في الجزائر: كلمة واحدة، موعد محدد، وبلاط مستوي تماماً دون أدنى ميول أو فراغات. بارك الله فيه.',
        serviceProvided: 'تركيب بورسلان صالون 75م²',
        recommend: true,
        wilaya: 'الجزائر العاصمة'
      },
      {
        id: 'rev-m2',
        authorName: 'نور الدين بلعباس',
        rating: 5,
        date: 'منذ أسبوعين',
        comment: 'أتم بناء طابق كامل فيلا في ظرف قياسي مع تلبيس إسمنتي ناعم جداً، فريق عمل محترم ومحترف.',
        serviceProvided: 'بناء طابق وتلبيس جدران',
        recommend: true,
        wilaya: 'الجزائر العاصمة'
      },
      {
        id: 'rev-m3',
        authorName: 'ياسين ق.',
        rating: 4.8,
        date: 'منذ شهر',
        comment: 'سعر معقول جداً مقارنة بجودة الخدمة والنظافة بعد نهاية العمل.',
        serviceProvided: 'ترميم وتلبيس واجهة منزل',
        recommend: true
      }
    ]
  },

  // 2. سباك (Plumber)
  {
    id: 'cr-plumb-1',
    name: 'عمي كمال المرصص',
    trade: 'سباك وترصيص صحي، كشف التسربات المخفية وشوفاج سنترال',
    category: 'plumbing',
    phone: '0555 42 19 80',
    phoneClean: '+213555421980',
    whatsapp: '+213555421980',
    wilaya: 'الجزائر العاصمة',
    commune: 'باب الزوار',
    address: 'حي 8 ماي 1945، عمارة 14، قرب محطة الترامواي',
    coordinates: {
      lat: 36.7214,
      lng: 3.1812
    },
    rating: 4.95,
    reviewCount: 62,
    experienceYears: 18,
    verified: true,
    isAvailable247: true,
    priceNote: 'كشف ومعاينة من 1,500 دج',
    bio: 'حرفي مختص في شبكات التغذية والصرف الصحي، كشف التسربات المائية المخفية بكاميرات حرارية وأجهزة صوتية دون تكسير، وتركيب وصيانة سخانات الغاز المركزية (Chaudière) والمضخات وشبكات الغاز المعتمدة.',
    specialties: ['كشف التسربات بالأشعة والحرارة دون تكسير', 'تسليك مجاري الصرف بالضغط العالي', 'تركيب وصيانة التدفئة المركزية (شوفاج)', 'تثبيت مضخات المياه والخزانات الأوتوماتيكية'],
    workImages: [
      '/src/assets/images/craftsman_plumbing_work_1790889032524.jpg',
      '/src/assets/images/hero_craftsmen_tools_1790889019130.jpg'
    ],
    workingHours: 'طيلة أيام الأسبوع (خدمة الطوارئ متوفرة 24/24)',
    paymentMethods: ['نقداً (Espèce)', 'بريدي موب (BaridiMob)'],
    isFeatured: true,
    reviews: [
      {
        id: 'rev-p1',
        authorName: 'سفيان بلمختار',
        rating: 5,
        date: 'منذ 3 أيام',
        comment: 'ما شاء الله على عمي كمال، أتى في نصف ساعة بعد تسرب مفاجئ في أنبوب رئيسي بالمطبخ، متقن لأبعد حد وأسعاره معقولة جداً.',
        serviceProvided: 'إصلاح تسرب ماء مستعجل ليلاً',
        recommend: true,
        wilaya: 'الجزائر العاصمة'
      },
      {
        id: 'rev-p2',
        authorName: 'نور الهدى ق.',
        rating: 5,
        date: 'منذ أسبوعين',
        comment: 'ركب لنا شبكة التدفئة المركزية والشوف-أو مع ضمان سنة كاملة، عمل نظيف ونظام احترافي بدون أي مشاكل.',
        serviceProvided: 'تركيب تدفئة مركزية كاملة شقة F4',
        recommend: true,
        wilaya: 'الجزائر العاصمة'
      }
    ]
  },

  // 3. نجار (Carpenter)
  {
    id: 'cr-carp-1',
    name: 'المعلم ياسين النجار',
    trade: 'نجارة خشب عصرية، مطابخ مجهزة، غرف نوم ودريسينغ',
    category: 'carpentry',
    phone: '0770 19 88 52',
    phoneClean: '+213770198852',
    whatsapp: '+213770198852',
    wilaya: 'البليدة',
    commune: 'بوفاريك',
    address: 'المنطقة الحرفية طريق الصومعة، ورشة ياسين للخشب الفاخر',
    coordinates: {
      lat: 36.5758,
      lng: 2.9125
    },
    rating: 4.89,
    reviewCount: 38,
    experienceYears: 16,
    verified: true,
    isAvailable247: false,
    priceNote: 'حسب المقاسات ونوع الخشب والتصميم',
    bio: 'ورشة متخصصة في صناعة المطابخ العصرية المجهزة بتصميم 3D مسبق، غرف النوم، الخزائن الحائطية المدمجة (Dressing)، والأبواب الخشبية من الزان والبلوط والشين مع أكسسوارات إيطالية وسوفت كلوز.',
    specialties: ['مطابخ عصرية مجهزة MDF و HPL مقاوم للمياه', 'خزائن حائط ودريسينغ بالمقاس', 'أبواب خشب صلب مع ضمان 5 سنوات', 'ترميم وصيانة الأثاث العتيق'],
    workImages: [
      '/src/assets/images/craftsman_carpentry_work_1790889054994.jpg',
      '/src/assets/images/hero_craftsmen_tools_1790889019130.jpg'
    ],
    workingHours: 'السبت إلى الخميس: 08:00 - 18:30',
    paymentMethods: ['نقداً', 'بريدي موب (BaridiMob)', 'دفعات مرحلية'],
    isFeatured: true,
    reviews: [
      {
        id: 'rev-c1',
        authorName: 'حميد سعيدي',
        rating: 5,
        date: 'منذ 5 أيام',
        comment: 'صنع لي مطبخ أحلامي بدقة متناهية وتشطيبات فائقة الجودة تفوق المستورد، بارك الله في يديه وفي ميعاده.',
        serviceProvided: 'تفصيل مطبخ عصري مجهز',
        recommend: true,
        wilaya: 'البليدة'
      },
      {
        id: 'rev-c2',
        authorName: 'فاطمة الزهراء ح.',
        rating: 5,
        date: 'منذ شهر',
        comment: 'التزام تام بالمواعيد ونظافة تامة أثناء التركيب في المنزل. خامات ممتازة وأسعار واضحة.',
        serviceProvided: 'دريسينغ وغرفة نوم كاملة',
        recommend: true,
        wilaya: 'البليدة'
      }
    ]
  },

  // 4. ميكانيسيان (Mechanic)
  {
    id: 'cr-mech-1',
    name: 'الميكانيسيان رضا للميكانيك المتنقل',
    trade: 'ميكانيك سيارات متنقل، فحص بالكمبيوتر سكانير وأعطال الطرقات',
    category: 'mechanic',
    phone: '0558 10 29 44',
    phoneClean: '+213558102944',
    whatsapp: '+213558102944',
    wilaya: 'الجزائر العاصمة',
    commune: 'زرالدة',
    address: 'خدمة سريعة تغطي العاصمة، تيبازة، البليدة وبومرداس',
    coordinates: {
      lat: 36.7117,
      lng: 2.8428
    },
    rating: 4.96,
    reviewCount: 74,
    experienceYears: 15,
    verified: true,
    isAvailable247: true,
    priceNote: 'سكانير وفحص ميداني من 2,500 دج',
    bio: 'ورشة متنقلة مجهزة بأحدث أجهزة التشخيص الإلكتروني (Scanner OBD2 لجميع أنواع السيارات الفرنسية، الألمانية، والكورية). تصليح الأعطال الميدانية على الطريق السريع أو أمام منزلك: تغيير أحزمة التوزيع، فرامل، دينامو، وبطاريات.',
    specialties: ['سكانير وكشف أعطال الكمبيوتر في مكانك', 'إنقاذ السيارات على الطرقات السريعة 24/24', 'صيانة محركات ديزل وبنزين وتغيير لاشين', 'إصلاح أعطال علبة السرعات والكلاتش'],
    workImages: [
      '/src/assets/images/craftsman_electrical_work_1790889044446.jpg',
      '/src/assets/images/hero_craftsmen_tools_1790889019130.jpg'
    ],
    workingHours: 'متوفر 24 ساعة للإنقاذ على الطرقات وخدمات المنازل',
    paymentMethods: ['نقداً (Cash)', 'بريدي موب (BaridiMob)'],
    isFeatured: true,
    reviews: [
      {
        id: 'rev-mc1',
        authorName: 'هشام لعموري',
        rating: 5,
        date: 'منذ يومين',
        comment: 'توقفت سيارتي فجأة في الطريق السريع بوشاوي ليلاً، اتصلت بالأخ رضا فوصل في 20 دقيقة ومعه القطعة البديلة وشغل السيارة، قمة الرجولة والاحترافية.',
        serviceProvided: 'إنقاذ سيارة على الطريق السريع ليلاً',
        recommend: true,
        wilaya: 'الجزائر العاصمة'
      },
      {
        id: 'rev-mc2',
        authorName: 'مراد بلحاج',
        rating: 5,
        date: 'منذ أسبوع',
        comment: 'عمل سكانير دقيق واكتشف عطل الحساس الذي عجزت عنه 3 ورشات أخرى. أنصح به بشدة.',
        serviceProvided: 'سكانير وتشخيص حساس المحرك',
        recommend: true,
        wilaya: 'الجزائر العاصمة'
      }
    ]
  },

  // 5. طباخ (Chef / Traiteur)
  {
    id: 'cr-cook-1',
    name: 'الشيف الطاهر طباخ الأعراس والولائم',
    trade: 'طباخ أعراس، حفلات، ولائم تقليدية وعصرية ومشاوي',
    category: 'cook',
    phone: '0661 55 90 12',
    phoneClean: '+213661559012',
    whatsapp: '+213661559012',
    wilaya: 'سطيف',
    commune: 'العلمة',
    address: 'شارع دبي، قرب القاعة متعددة الرياضات، العلمة، سطيف',
    coordinates: {
      lat: 36.1528,
      lng: 5.6908
    },
    rating: 4.97,
    reviewCount: 56,
    experienceYears: 20,
    verified: true,
    isAvailable247: false,
    priceNote: 'حساب بالصحن أو بالوليمة كاملة',
    bio: 'شيف طباخ أعراس ذائع الصيت في الشرق والوسط الجزائري. خبرة 20 سنة في إعداد أشهى الأطباق الجزائرية التقليدية في الأعراس والختان والعزائم: الكسكسي الأصيل بلحم الغنم، الشخشوخة السطايفية الحارة، طاجين الزيتون، طاجين الحلو الملكي، والمشاوي على الفحم.',
    specialties: ['طبخ أعراس كبرى حتى 1000 شخص', 'كسكسي سطايفي بلحم الغنم والخضر الطازجة', 'شخشوخة أصيلة وتريدة ورشتة عاصمية', 'طواجن ملكية ومشاوي خروف كامل'],
    workImages: [
      '/src/assets/images/craftsman_chef_cooking_1790889166699.jpg',
      '/src/assets/images/hero_craftsmen_tools_1790889019130.jpg'
    ],
    workingHours: 'طيلة أيام الأسبوع (حجز مسبق للمناسبات)',
    paymentMethods: ['نقداً', 'بريدي موب (BaridiMob)', 'عربون مسبق'],
    isFeatured: true,
    reviews: [
      {
        id: 'rev-ck1',
        authorName: 'الحاج مسعود بوقرة',
        rating: 5,
        date: 'منذ 4 أيام',
        comment: 'طبخ لنا في عرس ابني الأسبوع الماضي، 400 ضيف أثنوا كلهم على المذاق الملكي للكسكسي ولحم الغنم المذوب كالزبدة. الشيف الطاهر شرفنا أمام ضيوفنا.',
        serviceProvided: 'طبخ وليمة عرس كاملة 400 شخص',
        recommend: true,
        wilaya: 'سطيف'
      },
      {
        id: 'rev-ck2',
        authorName: 'سميرة معوش',
        rating: 5,
        date: 'منذ 3 أسابيع',
        comment: 'شخشوخة ولا أروع وطاجين الحلو مسك، قمة النظافة والترتيب وفريق المساعدين معه منظمين جداً.',
        serviceProvided: 'طبخ حفل ختان عائلي',
        recommend: true,
        wilaya: 'سطيف'
      }
    ]
  },

  // 6. طباخة وممونة حفلات (Second Chef in Algiers)
  {
    id: 'cr-cook-2',
    name: 'السيدة فتيحة طباخة المناسبات والبيوت',
    trade: 'طباخة ماهرة للأفراح، الأطباق العاصمية والحلويات التقليدية',
    category: 'cook',
    phone: '0772 38 11 05',
    phoneClean: '+213772381105',
    whatsapp: '+213772381105',
    wilaya: 'الجزائر العاصمة',
    commune: 'القبة',
    address: 'حي قاريدي 1، قرب مسجد الفرقان، القبة',
    coordinates: {
      lat: 36.7258,
      lng: 3.0789
    },
    rating: 4.93,
    reviewCount: 42,
    experienceYears: 17,
    verified: true,
    isAvailable247: false,
    priceNote: 'أسعار مناسبة للولائم والطلبيات الخاصة',
    bio: 'طباخة عاصمية متخصصة في ولائم الخطوبة، الحفلات العائلية، والأعياد. إتقان تام للرشتة العاصمية بالدجاج والقرفة، الشوربة فريك مع البوراك المقرمش، المثوم العاصمي، والكسكسي الفاخر.',
    specialties: ['رشتة عاصمية أصيلة بالدجاج واللفت', 'شوربة فريك عاصمية وبوراك لحم مفروم', 'مثوم عاصمي باللوز والسمن العربي', 'حلويات تقليدية للأفراح (بقلاوة، مقروط)'],
    workImages: [
      '/src/assets/images/craftsman_chef_cooking_1790889166699.jpg'
    ],
    workingHours: 'السبت إلى الخميس: 08:30 - 19:00',
    paymentMethods: ['نقداً', 'بريدي موب'],
    reviews: [
      {
        id: 'rev-ck3',
        authorName: 'أمينة خضر',
        rating: 5,
        date: 'منذ أسبوع',
        comment: 'الرشتة التي حضرتها لخاتم الخطوبة كان طعمها خيالي، الكل سألني عن الطباخة. شكراً لك خالتي فتيحة.',
        serviceProvided: 'طبخ وليمة خطوبة عاصمية',
        recommend: true,
        wilaya: 'الجزائر العاصمة'
      }
    ]
  },

  // 7. كهربائي (Electrician)
  {
    id: 'cr-elec-1',
    name: 'المهندس رفيق للكهرباء',
    trade: 'كهربائي منازل، فيلات، وتحكم صناعي ودوموتيك',
    category: 'electrical',
    phone: '0661 74 33 21',
    phoneClean: '+213661743321',
    whatsapp: '+213661743321',
    wilaya: 'وهران',
    commune: 'بئر الجير',
    address: 'شارع ميلينيوم، حي النور، بالقرب من المركز الصحي',
    coordinates: {
      lat: 35.7051,
      lng: -0.5822
    },
    rating: 4.95,
    reviewCount: 48,
    experienceYears: 12,
    verified: true,
    isAvailable247: true,
    priceNote: 'معاينة وتشخيص من 2,000 دج',
    bio: 'تقني سامي معتمد في كهرباء البناء والذكاء المنزلي (Domotique). تجديد الطبالي الكهربائية، موازنة الأحمال، تركيب أنظمة الطاقة البديلة ومولدات الحماية.',
    specialties: ['تمديد خطوط كهرباء مخفية للفيلات', 'تجديد لوحات الكهرباء (Tableau Schneider)', 'إنارة ليد ديكورية مخفية بالريموت', 'أنظمة الحماية من الصواعق وارتفاع التوتر'],
    workImages: [
      '/src/assets/images/craftsman_electrical_work_1790889044446.jpg'
    ],
    workingHours: 'السبت إلى الخميس: 07:30 - 20:00 (طوارئ متوفرة)',
    paymentMethods: ['نقداً', 'بريدي موب (BaridiMob)', 'حساب CCP'],
    isFeatured: true,
    reviews: [
      {
        id: 'rev-e1',
        authorName: 'طارق زواوي',
        rating: 5,
        date: 'منذ يومين',
        comment: 'الأخ رفيق رجل قمة في الأخلاق والاحترافية. رتب لي كامل أسلاك الفيلا ووضع حماية للأجهزة المنزلية من تذبذب الكهرباء.',
        serviceProvided: 'تجديد شبكة كهرباء شقة كاملة',
        recommend: true,
        wilaya: 'وهران'
      }
    ]
  },

  // 8. صباغ ودهان (Painter)
  {
    id: 'cr-paint-1',
    name: 'سفيان للديكور والصباغة الحديثة',
    trade: 'صباغة عصرية، ستيكو، سابياتو، ورق جدران وبلاكوبلاتر BA13',
    category: 'painting',
    phone: '0665 99 21 04',
    phoneClean: '+213665992104',
    whatsapp: '+213665992104',
    wilaya: 'قسنطينة',
    commune: 'علي منجلي',
    address: 'المدينة الجديدة علي منجلي، الوحدة الجوارية 07',
    coordinates: {
      lat: 36.2482,
      lng: 6.5721
    },
    rating: 4.91,
    reviewCount: 31,
    experienceYears: 14,
    verified: true,
    isAvailable247: false,
    priceNote: 'حساب بالمتر المربع من 400 دج/م²',
    bio: 'أحدث تقنيات الدهانات الديكورية (Sabbiato، Stucco، Velvet، سيلفيو)، معالجة الرطوبة والتشققات نهائياً بضمان، وتركيب أسقف الجبس بورد وإنارة الليد المخفية.',
    specialties: ['دهانات إيطالية فاخرة ومقاومة للغسيل', 'معالجة رطوبة الجدران والتقشير', 'أسقف معلقة بلاكوبلاتر BA13', 'تركيب ورق حائط ثلاثي الأبعاد'],
    workImages: [
      '/src/assets/images/craftsman_carpentry_work_1790889054994.jpg'
    ],
    workingHours: 'السبت إلى الخميس: 08:00 - 19:00',
    paymentMethods: ['نقداً', 'بريدي موب'],
    reviews: [
      {
        id: 'rev-pt1',
        authorName: 'جمال بوقرة',
        rating: 5,
        date: 'منذ أسبوعين',
        comment: 'عمل صباغة الشقة عندي كاملة، ما شاء الله فنان حقيقي، ونظيف جداً لا يترك وراءه أي أوساخ.',
        serviceProvided: 'صباغة ديكورية لشقة كاملة',
        recommend: true,
        wilaya: 'قسنطينة'
      }
    ]
  },

  // 9. تبريد وتكييف (HVAC)
  {
    id: 'cr-hvac-1',
    name: 'حكيم تبريد وتكييف',
    trade: 'صيانة وشحن مكيفات الهواء وغرف التبريد وتصليح الثلاجات',
    category: 'hvac',
    phone: '0552 83 91 14',
    phoneClean: '+213552839114',
    whatsapp: '+213552839114',
    wilaya: 'سطيف',
    commune: 'سطيف وسط',
    address: 'حي طانجة، قرب دار الثقافة، سطيف',
    coordinates: {
      lat: 36.1911,
      lng: 5.4137
    },
    rating: 4.88,
    reviewCount: 36,
    experienceYears: 11,
    verified: true,
    isAvailable247: true,
    priceNote: 'شحن غاز وتنظيف من 3,500 دج',
    bio: 'تقني مختص في تركيب وصيانة جميع أنواع المكيفات المنزلية والصناعية (Inverter، Split). شحن غاز أصلي R410A و R32، كشف التسربات بالنيتروجين، وتعقيم الفلاتر بالموجات.',
    specialties: ['شحن غاز أصلي مضمون', 'كشف تسربات غاز المكيف وإصلاحها', 'تنظيف الفلاتر والمبخر بالموجات', 'تركيب مكيفات جديدة مع ضمان'],
    workImages: [
      '/src/assets/images/craftsman_electrical_work_1790889044446.jpg'
    ],
    workingHours: 'طيلة أيام الأسبوع 08:00 - 21:00 (طوارئ متوفرة)',
    paymentMethods: ['نقداً', 'بريدي موب'],
    reviews: [
      {
        id: 'rev-h1',
        authorName: 'عبد القادر شريفي',
        rating: 5,
        date: 'منذ أسبوع',
        comment: 'أنقذنا في الصيف الحار، المكيف كان يخرج هواء ساخن فقط، فحصه وملأ الغاز وغير المكثف في أقل من ساعة والآن تبريد قطبي.',
        serviceProvided: 'شحن غاز وإصلاح مكثف مكيف',
        recommend: true,
        wilaya: 'سطيف'
      }
    ]
  },

  // 10. حدادة وألمنيوم (Metal / Aluminium)
  {
    id: 'cr-metal-1',
    name: 'ورشة الهدى للألمنيوم والحدادة الفنية',
    trade: 'نوافذ وأبواب ألمنيوم وPVC عازلة، شبابيك حدادة فنية',
    category: 'metal',
    phone: '0772 45 90 18',
    phoneClean: '+213772459018',
    whatsapp: '+213772459018',
    wilaya: 'عنابة',
    commune: 'سيدي عمار',
    address: 'حي واد الفراش، بالقرب من مدخل الجامعة، عنابة',
    coordinates: {
      lat: 36.8044,
      lng: 7.7089
    },
    rating: 4.82,
    reviewCount: 28,
    experienceYears: 13,
    verified: true,
    isAvailable247: false,
    priceNote: 'تسعيرة مجانية حسب المقاس',
    bio: 'تصنيع وتركيب النوافذ العازلة للصوت والحرارة (Double Vitrage TPR)، شبابيك الحماية الحديدية الفنية، سلالم الستانلس ستيل (Inox)، والأبواب المصفحة والستائر الكهربائية (Rideaux électriques).',
    specialties: ['نوافذ عازلة للصوت والحرارة PVC وألمنيوم', 'ستائر نوافذ بمحرك سومفي أوتوماتيكي', 'شبابيك حدادة فنية وقضبان حماية للمنازل', 'درابزين سلالم Inox غير قابلة للصدأ'],
    workImages: [
      '/src/assets/images/hero_craftsmen_tools_1790889019130.jpg'
    ],
    workingHours: 'السبت إلى الخميس: 08:00 - 18:00',
    paymentMethods: ['نقداً', 'بريدي موب'],
    reviews: [
      {
        id: 'rev-mt1',
        authorName: 'سمير قادري',
        rating: 5,
        date: 'منذ أسبوعين',
        comment: 'عزل الصوت في النوافذ التي ركبوها مدهش، اختفى صوت الشارع تماماً، جودة الإطار والزجاج فوق الممتازة.',
        serviceProvided: 'تركيب 6 نوافذ ألمنيوم دبل غلاس',
        recommend: true,
        wilaya: 'عنابة'
      }
    ]
  },

  // 11. نجار إضافي في وهران (Second Carpenter in Oran)
  {
    id: 'cr-carp-2',
    name: 'المعلم مصطفى نجار الباهية',
    trade: 'نجارة أبواب، غرف نوم عصرية، وتلبيس الخشب الديكوري',
    category: 'carpentry',
    phone: '0663 80 14 29',
    phoneClean: '+213663801429',
    whatsapp: '+213663801429',
    wilaya: 'وهران',
    commune: 'السانية',
    address: 'المنطقة الحرفية السانية، مقابل محطة الترامواي، وهران',
    coordinates: {
      lat: 35.6547,
      lng: -0.6272
    },
    rating: 4.87,
    reviewCount: 29,
    experienceYears: 19,
    verified: true,
    isAvailable247: false,
    priceNote: 'معاينة وأخذ المقاسات مجاناً في وهران',
    bio: 'حرفي أثاث وخشب عصري، تلبيس جدران الصالونات بالخشب مع إضاءة ليد مخفية، تفصيل غرف نوم كلاسيكية وعصرية، وطاولات طعام من الخشب الصلب الطبيعي.',
    specialties: ['أبواب داخلية وخارجية خشب صلب', 'ديكورات جدارية خشبية للصالونات', 'طاولات صالون وأثاث مخصص', 'إصلاح وضبط الأبواب والأقفال'],
    workImages: [
      '/src/assets/images/craftsman_carpentry_work_1790889054994.jpg'
    ],
    workingHours: 'السبت إلى الخميس: 08:30 - 19:00',
    paymentMethods: ['نقداً', 'بريدي موب'],
    reviews: [
      {
        id: 'rev-c3',
        authorName: 'فوزي بلعباس',
        rating: 5,
        date: 'منذ 3 أسابيع',
        comment: 'فصل لي 7 أبواب خشبية للشقة، متانة وتشطيب ممتاز وأقفل ناعمة جداً.',
        serviceProvided: 'تفصيل وتركيب أبواب خشبية للشقة',
        recommend: true,
        wilaya: 'وهران'
      }
    ]
  },

  // 12. ميكانيسيان في قسنطينة (Second Mechanic in Constantine)
  {
    id: 'cr-mech-2',
    name: 'الورشة السريعة ميكانيك وسكانير قسنطينة',
    trade: 'ميكانيك سيارات ديزل وبنزين، سكانير وإصلاح الفرامل',
    category: 'mechanic',
    phone: '0559 22 71 83',
    phoneClean: '+213559227183',
    whatsapp: '+213559227183',
    wilaya: 'قسنطينة',
    commune: 'الخروب',
    address: 'المنطقة الصناعية الخروب، بجانب محطة البنزين نفطال، قسنطينة',
    coordinates: {
      lat: 36.2625,
      lng: 6.6917
    },
    rating: 4.90,
    reviewCount: 41,
    experienceYears: 14,
    verified: true,
    isAvailable247: true,
    priceNote: 'فحص سكانير من 2,000 دج',
    bio: 'صيانة كاملة للسيارات السياحية والنفعية. كشف أعطال المحرك، برمجة المفاتيح، تغيير نظام الكبح والفرامل، تغيير الزيوت والفلاتر بأجود الماركات الأصلية.',
    specialties: ['سكانير متطور وبرمجة كمبيوتر السيارة', 'تصليح وتغيير الديسك والفرامل', 'صيانة المحركات وتغيير طقم التوزيع', 'خدمة طوارئ وتصليح في الطريق'],
    workImages: [
      '/src/assets/images/hero_craftsmen_tools_1790889019130.jpg'
    ],
    workingHours: 'طيلة أيام الأسبوع (طوارئ متوفرة 24/24)',
    paymentMethods: ['نقداً', 'بريدي موب'],
    reviews: [
      {
        id: 'rev-mc3',
        authorName: 'عادل مسعودي',
        rating: 5,
        date: 'منذ شهر',
        comment: 'ورشة نظيفة جداً وفريق محترم، غيروا لي سير الكاتينة وسائل الفرامل في وقت قياسي وبسعر ممتاز.',
        serviceProvided: 'صيانة دورية وتغيير سير التوزيع',
        recommend: true,
        wilaya: 'قسنطينة'
      }
    ]
  }
];
