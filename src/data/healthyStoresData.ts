export interface HealthyStoreProduct {
  id: string;
  nameEn: string;
  nameAr: string;
  categoryEn: string;
  categoryAr: string;
  imageUrl: string;
  descriptionEn?: string;
  descriptionAr?: string;
  storeId: string;
  storeNameEn: string;
  storeNameAr: string;
}

export interface HealthyStore {
  id: string;
  nameEn: string;
  nameAr: string;
  logoUrl: string;
  coverUrl: string;
  categories: string[];
  categoriesAr: string[];
  city: string;
  addressEn: string;
  addressAr: string;
  shortDescEn: string;
  shortDescAr: string;
  fullDescEn: string;
  fullDescAr: string;
  phone: string;
  instagramUrl?: string;
  facebookUrl?: string;
  mapQuery: string;
  isPartner: boolean;
  isFeatured: boolean;
  isHidden?: boolean;
  currentOffersEn?: string;
  currentOffersAr?: string;
  products: HealthyStoreProduct[];
  galleryUrls: string[];
}

export interface PartnerApplicationData {
  storeName: string;
  ownerName: string;
  phone: string;
  city: string;
  categories: string[];
  socialLink: string;
  description: string;
}

export const HEALTHY_STORE_CATEGORIES = [
  {
    id: 'All',
    nameEn: 'All',
    nameAr: 'الكل',
    icon: '✨'
  },
  {
    id: 'Healthy Bakeries',
    nameEn: 'Healthy Bakeries',
    nameAr: 'مخابز صحية',
    icon: '🥖',
    descAr: 'مخابز ومتاجر متخصصة في المخبوزات الصحية، خالية من الجلوتين وبالخميرة البلدية.'
  },
  {
    id: 'Dairy & Cheese',
    nameEn: 'Dairy & Cheese',
    nameAr: 'أجبان وألبان طبيعية',
    icon: '🧀',
    descAr: 'متاجر الأجبان والألبان الطبيعية والكفير العضوي خفيف الدسم.'
  },
  {
    id: 'Organic Honey',
    nameEn: 'Organic Honey',
    nameAr: 'عسل عضوي',
    icon: '🍯',
    descAr: 'متاجر العسل العضوي والطبيعي، الغذاء الملكي ومنتجات النحل الخالصة.'
  },
  {
    id: 'Natural Products',
    nameEn: 'Natural Products',
    nameAr: 'منتجات طبيعية',
    icon: '🌿',
    descAr: 'متاجر المنتجات الطبيعية، الأعشاب النقية، الزيوت العضوية ومستخلصات التغذية.'
  },
  {
    id: 'Healthy Foods',
    nameEn: 'Healthy Foods',
    nameAr: 'أغذية صحية وحبوب',
    icon: '🥜',
    descAr: 'متاجر المكسرات النيئة، البذور الغنية بالأوميغا، الحبوب الكاملة والجرانولا.'
  },
  {
    id: 'Healthy & Low-Sugar',
    nameEn: 'Healthy & Low-Sugar',
    nameAr: 'قليلة السكر وصحية',
    icon: '🍫',
    descAr: 'منتجات صحية وقليلة السكر أو محلاة ببدائل طبيعية كالستيفيا والكاكاو النقي.'
  }
];

export const INITIAL_HEALTHY_STORES: HealthyStore[] = [
  {
    id: 'store_bio_blida',
    nameEn: 'Bio Blida Nature',
    nameAr: 'بيو بليدة ناتور للأعشاب والمنتجات العضوية',
    logoUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=200',
    coverUrl: 'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?auto=format&fit=crop&q=80&w=800',
    categories: ['Natural Products', 'Organic Honey'],
    categoriesAr: ['منتجات طبيعية', 'عسل عضوي'],
    city: 'Blida / البليدة',
    addressEn: '14 Boulevard Mohamed V, Downtown Blida',
    addressAr: '14 شارع محمد الخامس، وسط مدينة البليدة',
    shortDescEn: 'Premium organic store providing medicinal herbs, spearmint tea, cold-pressed oils, and certified mountain honey.',
    shortDescAr: 'متجر متخصص في الأعشاب الطبية النقية، شاي النعناع السنبلي، الزيوت المعصورة على البارد والعسل الجبلي الموثوق لدعم التوازن الهرموني.',
    fullDescEn: 'Bio Blida Nature is your wellness sanctuary in central Blida. We carefully select non-GMO organic natural products, hormone-supportive teas like Spearmint, organic Flaxseed Oil, and 100% pure Algerian mountain honeys.',
    fullDescAr: 'يعد متجر بيو بليدة ناتور وجهتكِ الموثوقة للمنتجات الحيوية بقلب البليدة. نوفر تشكيلة منتقاة بعناية من الأعشاب المفيدة لتكيس المبايض كشاي النعناع السنبلي المنظم للأندروجين، بذور الكتان المعصورة على البارد، وعسل الأطلس الطبيعي.',
    phone: '+213 662 55 66 77',
    instagramUrl: 'https://instagram.com/bioblida.nature',
    facebookUrl: 'https://facebook.com/bioblida.nature',
    mapQuery: 'Boulevard+Mohamed+V,+Blida,+Algeria',
    isPartner: true,
    isFeatured: true,
    currentOffersEn: 'Special PCOS bundle: Free spearmint tea bag with any purchase of 2 cold-pressed seed oils.',
    currentOffersAr: 'باقة التوازن الهرموني: كيس شاي نعناع سنبلي مجاناً عند اقتناء زيتين طبيعيين معصورين على البارد.',
    galleryUrls: [
      'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&q=80&w=600'
    ],
    products: [
      {
        id: 'prod_honey_sidr',
        nameEn: 'Pure Atlas Mountain Honey',
        nameAr: 'عسل السدر الجبلي الحر للأطلس',
        categoryEn: 'Organic Honey',
        categoryAr: 'عسل عضوي',
        imageUrl: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=600',
        descriptionEn: 'Harvested from wild mountain flora in Chréa without sugar feeding.',
        descriptionAr: 'مقطوف من جبال الشريعة الطبيعية بدون أي تغذية سكرية، غني بمضادات الأكسدة.',
        storeId: 'store_bio_blida',
        storeNameEn: 'Bio Blida Nature',
        storeNameAr: 'بيو بليدة ناتور'
      },
      {
        id: 'prod_spearmint',
        nameEn: 'Organic Spearmint Tea',
        nameAr: 'شاي النعناع السنبلي العضوي',
        categoryEn: 'Natural Products',
        categoryAr: 'منتجات طبيعية',
        imageUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=600',
        descriptionEn: 'Clinically studied for lowering excess androgens and regulating ovulation.',
        descriptionAr: 'معتمد علمياً للمساعدة في خفض هرمون الذكورة وتخفيف نمو الشعر غير المرغوب.',
        storeId: 'store_bio_blida',
        storeNameEn: 'Bio Blida Nature',
        storeNameAr: 'بيو بليدة ناتور'
      },
      {
        id: 'prod_flax_oil',
        nameEn: 'Cold-Pressed Flaxseed Oil',
        nameAr: 'زيت بذور الكتان المعصور على البارد',
        categoryEn: 'Natural Products',
        categoryAr: 'منتجات طبيعية',
        imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=600',
        descriptionEn: 'High Omega-3 source to combat chronic follicular inflammation.',
        descriptionAr: 'مصدر غني بأوميغا 3 لمكافحة الالتهابات المزمنة وتحسين حساسية الإنسولين.',
        storeId: 'store_bio_blida',
        storeNameEn: 'Bio Blida Nature',
        storeNameAr: 'بيو بليدة ناتور'
      }
    ]
  },
  {
    id: 'store_fournil_sante',
    nameEn: 'Fournil Santé Blida',
    nameAr: 'مخبزة فورنيل للصحة والخبز الخالي من الغلوتين',
    logoUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=200',
    coverUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800',
    categories: ['Healthy Bakeries', 'Healthy & Low-Sugar'],
    categoriesAr: ['مخابز صحية', 'قليلة السكر وصحية'],
    city: 'Blida / البليدة',
    addressEn: 'Rue Bab Sebt, Blida Center',
    addressAr: 'شارع باب السبت، وسط البليدة',
    shortDescEn: 'Artisanal health bakery offering sourdough whole grain breads, certified gluten-free pastries, and seed crackers.',
    shortDescAr: 'مخبزة حرفية صحية متخصصة في الخبز الحرفي بالخميرة البلدية الطبيعية، مخبوزات خالية تماماً من الغلوتين ومقرمشات البذور.',
    fullDescEn: 'Fournil Santé in Bab Sebt provides delicious bakery solutions without the insulin spikes. Made with high-fiber organic grains, fermented with natural wild yeasts, and free from inflammatory refined white flours.',
    fullDescAr: 'تقدم مخبزة فورنيل سانتي بباب السبت حلولاً مبتكرة للمخبوزات دون التسبب في قفزات مفاجئة بالأنسولين. جميع المخبوزات محضرة من حبوب كاملة، ومخمرة بالخميرة البلدية الحية لسهولة الهضم وصحة الأمعاء.',
    phone: '+213 551 22 33 44',
    instagramUrl: 'https://instagram.com/fournilsante.blida',
    facebookUrl: 'https://facebook.com/fournilsante.blida',
    mapQuery: 'Bab+Sebt,+Blida,+Algeria',
    isPartner: true,
    isFeatured: true,
    currentOffersEn: 'Fresh whole-wheat sourdough loaves available daily starting at 08:00 AM.',
    currentOffersAr: 'خبز طازج بالخميرة البلدية الطبيعية متوفر يومياً ابتداءً من الثامنة صباحاً.',
    galleryUrls: [
      'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=600'
    ],
    products: [
      {
        id: 'prod_sourdough_bread',
        nameEn: 'Whole Grain Sourdough Bread',
        nameAr: 'خبز القمح الكامل بالخميرة البلدية الحية',
        categoryEn: 'Healthy Bakeries',
        categoryAr: 'مخابز صحية',
        imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600',
        descriptionEn: 'Slowly fermented for 24 hours to reduce phytic acid and glycemic impact.',
        descriptionAr: 'تخمير بطيء لمدة 24 ساعة يقلل من مؤشر السكر ويحسن الهضم وامتصاص المعادن.',
        storeId: 'store_fournil_sante',
        storeNameEn: 'Fournil Santé Blida',
        storeNameAr: 'مخبزة فورنيل للصحة'
      },
      {
        id: 'prod_seed_crackers',
        nameEn: 'PCOS Seed Crackers',
        nameAr: 'مقرمشات البذور المنظمة للهرمونات',
        categoryEn: 'Healthy Foods',
        categoryAr: 'أغذية صحية وحبوب',
        imageUrl: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&q=80&w=600',
        descriptionEn: 'Pumpkin, sunflower, and sesame seed crisps with zero added oils or sugar.',
        descriptionAr: 'مقرمشات محضرة من بذور اليقطين والسمسم ودوار الشمس لدعم دورة التبويض.',
        storeId: 'store_fournil_sante',
        storeNameEn: 'Fournil Santé Blida',
        storeNameAr: 'مخبزة فورنيل للصحة'
      }
    ]
  },
  {
    id: 'store_fromagerie_chrea',
    nameEn: 'Fromagerie Artisanale Chréa',
    nameAr: 'ألبان وأجبان الشريعة الطبيعية',
    logoUrl: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&q=80&w=200',
    coverUrl: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&q=80&w=800',
    categories: ['Dairy & Cheese', 'Natural Products'],
    categoriesAr: ['أجبان وألبان طبيعية', 'منتجات طبيعية'],
    city: 'Blida / البليدة',
    addressEn: 'Route de Chréa, Blida Foothills',
    addressAr: 'طريق الشريعة، البليدة',
    shortDescEn: 'Traditional pasture-raised goat dairy, raw artisanal cheeses, and probiotic mountain kefir.',
    shortDescAr: 'أجبان طبيعية حرفية من حليب الماعز الجبلي النقي، كفير طبيعي لدعم صحة الأمعاء، وجبن قريش منخفض الدسم.',
    fullDescEn: 'Fromagerie Artisanale Chréa works directly with mountain shepherds in Blida to produce clean dairy products with lower A1 beta-casein, making them vastly easier to tolerate for women managing insulin resistance and PCOS.',
    fullDescAr: 'تنتج ألبان الشريعة الطبيعية أجباناً تقليدية من مراعي الجبل البليدي. يتميز حليب الماعز بقلة البروتينات الالتهابية وسهولة امتصاصه، مما يجعله مثالياً لمتبعات نمط الحياة الصحي وتوازن الهرمونات.',
    phone: '+213 550 99 88 77',
    instagramUrl: 'https://instagram.com/fromagerie.chrea',
    facebookUrl: 'https://facebook.com/fromagerie.chrea',
    mapQuery: 'Route+de+Chrea,+Blida,+Algeria',
    isPartner: true,
    isFeatured: true,
    currentOffersEn: 'Fresh probiotic live kefir prepared twice weekly (Monday & Thursday).',
    currentOffersAr: 'كفير طبيعي غني بالبكتيريا النافعة مجهز طازجاً مرتين أسبوعياً (الاثنين والخميس).',
    galleryUrls: [
      'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&q=80&w=600'
    ],
    products: [
      {
        id: 'prod_goat_cheese',
        nameEn: 'Pasture Goat Cheese',
        nameAr: 'جبن الماعز الطبيعي الخفيف',
        categoryEn: 'Dairy & Cheese',
        categoryAr: 'أجبان وألبان طبيعية',
        imageUrl: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&q=80&w=600',
        descriptionEn: 'Mild artisanal cheese with high bioavailable calcium and zero chemical additives.',
        descriptionAr: 'جبن ماعز قليل الملوحة بدون أي مواد حافظة أو دهون مهدرجة، خفيف على الهضم.',
        storeId: 'store_fromagerie_chrea',
        storeNameEn: 'Fromagerie Artisanale Chréa',
        storeNameAr: 'ألبان الشريعة الطبيعية'
      },
      {
        id: 'prod_kefir_probiotic',
        nameEn: 'Artisanal Probiotic Kefir',
        nameAr: 'كفير الحليب المخمر الحي',
        categoryEn: 'Dairy & Cheese',
        categoryAr: 'أجبان وألبان طبيعية',
        imageUrl: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&q=80&w=600',
        descriptionEn: 'Living cultures designed to rebalance the gut microbiome and support estrogen clearance.',
        descriptionAr: 'مشروب بروبيوتيك حي يعزز توازن بكتيريا الأمعاء ويساعد الكبد في التخلص من فائض الهرمونات.',
        storeId: 'store_fromagerie_chrea',
        storeNameEn: 'Fromagerie Artisanale Chréa',
        storeNameAr: 'ألبان الشريعة الطبيعية'
      }
    ]
  },
  {
    id: 'store_ruche_royale',
    nameEn: 'Ruche Royale de l’Atlas',
    nameAr: 'الخلية الملكية لعسل الأطلس البليدي',
    logoUrl: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=200',
    coverUrl: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=800',
    categories: ['Organic Honey', 'Natural Products'],
    categoriesAr: ['عسل عضوي', 'منتجات طبيعية'],
    city: 'Blida / البليدة',
    addressEn: 'Avenue Kritli Mokhtar, Blida',
    addressAr: 'شارع كريتلي مختار، البليدة',
    shortDescEn: 'Beekeeping collective producing authentic pure honey, raw royal jelly, and pollen for fertility support.',
    shortDescAr: 'تعاونية لتربية النحل متخصصة في إنتاج العسل الجبلي الصافي، الغذاء الملكي الخام وحبوب اللقاح لدعم صحة التبويض.',
    fullDescEn: 'Ruche Royale brings pure apiculture directly from the pristine mountain apiaries of the Blida Atlas. All products are tested for purity with zero chemical residues or sugar syrup adulteration.',
    fullDescAr: 'تقدم الخلية الملكية منتجات النحل الطبيعية المستخرجة مباشرة من مناحل أعالي الأطلس البليدي. جميع الأعسال مفحوصة ومضمونة النقاء 100% بدون أي إضافات صناعية أو سكرية.',
    phone: '+213 661 78 90 12',
    instagramUrl: 'https://instagram.com/rucheroyale.blida',
    facebookUrl: 'https://facebook.com/rucheroyale.blida',
    mapQuery: 'Avenue+Kritli+Mokhtar,+Blida,+Algeria',
    isPartner: true,
    isFeatured: false,
    currentOffersEn: 'Free laboratory purity certificate included with every jar of Sidr honey.',
    currentOffersAr: 'شهادة نقاء معملية معتمدة مرفقة مع كل قارورة عسل سدر أو جبلي.',
    galleryUrls: [
      'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&q=80&w=600'
    ],
    products: [
      {
        id: 'prod_royal_jelly',
        nameEn: 'Fresh Raw Royal Jelly',
        nameAr: 'غذاء ملكات النحل الخام الطازج',
        categoryEn: 'Organic Honey',
        categoryAr: 'عسل عضوي',
        imageUrl: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&q=80&w=600',
        descriptionEn: 'Pure concentrate of amino acids and B-complex vitamins for ovarian vitality.',
        descriptionAr: 'مركز طبيعي من الأحماض الأمينية وفيتامينات ب لدعم حيوية المبيضين ومقاومة الإجهاد التأكسدي.',
        storeId: 'store_ruche_royale',
        storeNameEn: 'Ruche Royale de l’Atlas',
        storeNameAr: 'الخلية الملكية'
      }
    ]
  },
  {
    id: 'store_noix_zabana',
    nameEn: 'Graines & Noix Zabana',
    nameAr: 'مكسرات وحبوب زبّانة الصحية',
    logoUrl: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&q=80&w=200',
    coverUrl: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&q=80&w=800',
    categories: ['Healthy Foods', 'Healthy & Low-Sugar'],
    categoriesAr: ['أغذية صحية وحبوب', 'قليلة السكر وصحية'],
    city: 'Blida / البليدة',
    addressEn: 'Cité Zabana, Near Lycée Omar Ibn El-Khattab, Blida',
    addressAr: 'حي زبّانة، قرب ثانوية عمر بن الخطاب، البليدة',
    shortDescEn: 'Specialty shop for raw unsalted nuts, seed cycling blends, chia seeds, and whole rolled oats.',
    shortDescAr: 'متجر متخصص في المكسرات النيئة غير المحمصة وغير المملحة، خلطات بذور تنظيم الدورة، بذور الشيا والشوفان الكامل.',
    fullDescEn: 'Providing the essential healthy fats your endocrine system craves. We offer high-quality raw almonds, pumpkin seeds, walnuts rich in polyphenols, and pre-portioned seed cycling sets for hormone rhythm support.',
    fullDescAr: 'يوفر المتجر الدهون الصحية الأساسية التي يحتاجها جهازكِ الهرموني. تشمل منتجاتنا اللوز النيئ، بذور القرع الغنية بالزنك، الجوز الغني بمضادات الأكسدة ومجموعات بذور تدريب الدورة الشهرية (Seed Cycling).',
    phone: '+213 770 12 34 56',
    instagramUrl: 'https://instagram.com/graines.zabana',
    facebookUrl: 'https://facebook.com/graines.zabana',
    mapQuery: 'Cite+Zabana,+Blida,+Algeria',
    isPartner: true,
    isFeatured: false,
    currentOffersEn: '10% discount on hormonal seed-cycling packs for SMOP DZ members.',
    currentOffersAr: 'تخفيض 10% على باقة بذور تنظيم الدورة الشهرية لمشتركات تطبيق SMOP DZ.',
    galleryUrls: [
      'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=600'
    ],
    products: [
      {
        id: 'prod_raw_almonds',
        nameEn: 'Raw Organic Almonds',
        nameAr: 'لوز طبيعي نيئ غير محمص',
        categoryEn: 'Healthy Foods',
        categoryAr: 'أغذية صحية وحبوب',
        imageUrl: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&q=80&w=600',
        descriptionEn: 'Rich in vitamin E and magnesium to calm the nervous system and stabilize fasting glucose.',
        descriptionAr: 'غني بفيتامين E والمغنيسيوم لتهدئة الجهاز العصبي وتحسين ثبات مستويات سكر الدم.',
        storeId: 'store_noix_zabana',
        storeNameEn: 'Graines & Noix Zabana',
        storeNameAr: 'مكسرات زبّانة'
      },
      {
        id: 'prod_chia_seeds',
        nameEn: 'Raw Black Chia Seeds',
        nameAr: 'بذور الشيا السوداء النقية',
        categoryEn: 'Healthy Foods',
        categoryAr: 'أغذية صحية وحبوب',
        imageUrl: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=600',
        descriptionEn: 'High soluble fiber to prevent insulin spikes and promote healthy bowel regularity.',
        descriptionAr: 'ألياف ذائبة عالية تساعد على استقرار الأنسولين والتخلص المنتظم من الإستروجين الزائد.',
        storeId: 'store_noix_zabana',
        storeNameEn: 'Graines & Noix Zabana',
        storeNameAr: 'مكسرات زبّانة'
      }
    ]
  },
  {
    id: 'store_choco_sante',
    nameEn: 'Choco Santé Ouled Yaïch',
    nameAr: 'شوكو-صحة للحلويات الخالية من السكر',
    logoUrl: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&q=80&w=200',
    coverUrl: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&q=80&w=800',
    categories: ['Healthy & Low-Sugar', 'Healthy Foods'],
    categoriesAr: ['قليلة السكر وصحية', 'أغذية صحية وحبوب'],
    city: 'Blida / البليدة',
    addressEn: 'Boulevard Principal, Ouled Yaïch, Blida',
    addressAr: 'الشارع الرئيسي، أولاد يعيش، البليدة',
    shortDescEn: 'Sugar-free sweets, 85%+ raw dark chocolates, natural stevia treats, and pure nut butters.',
    shortDescAr: 'حلويات وشوكولاتة صحية 100% خالية من السكر الأبيض المضاف، محلاة ببدائل طبيعية، وزبدة مكسرات نقية.',
    fullDescEn: 'Craving sweets without derailing your hormones? Choco Santé in Ouled Yaich crafts low-carb treats using high-percentage raw Ecuadorian cocoa, natural plant stevia, and pure roasted peanuts without palm oil or refined syrups.',
    fullDescAr: 'استمتعي بمذاق الشوكولاتة دون قلق على مستويات الأنسولين أو تفاقم أعراض التكيس. نقدم منتجات كاكاو خام بنسبة 85% فما فوق، محلاة بالستيفيا الطبيعية وزبدة فول سوداني نقية 100% خالية من زيوت النخيل.',
    phone: '+213 555 88 77 66',
    instagramUrl: 'https://instagram.com/chocosante.blida',
    facebookUrl: 'https://facebook.com/chocosante.blida',
    mapQuery: 'Ouled+Yaich,+Blida,+Algeria',
    isPartner: true,
    isFeatured: false,
    currentOffersEn: 'Free tasting of stevia-sweetened dark chocolate every Saturday morning.',
    currentOffersAr: 'تذوق مجاني للشوكولاتة الداكنة بالستيفيا كل سبت صباحاً.',
    galleryUrls: [
      'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&q=80&w=600'
    ],
    products: [
      {
        id: 'prod_dark_choco',
        nameEn: '85% Raw Dark Chocolate Bar',
        nameAr: 'شوكولاتة داكنة نقية 85% خالية من السكر',
        categoryEn: 'Healthy & Low-Sugar',
        categoryAr: 'قليلة السكر وصحية',
        imageUrl: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&q=80&w=600',
        descriptionEn: 'High magnesium and theobromine to uplift mood without spiking blood sugar.',
        descriptionAr: 'غنية بالمغنيسيوم ومضادات الأكسدة لتحسين المزاج وكبح اشتهاء السكريات بأمان.',
        storeId: 'store_choco_sante',
        storeNameEn: 'Choco Santé Ouled Yaïch',
        storeNameAr: 'شوكو-صحة'
      },
      {
        id: 'prod_peanut_butter',
        nameEn: '100% Pure Natural Peanut Butter',
        nameAr: 'زبدة فول سوداني طبيعية 100%',
        categoryEn: 'Healthy Foods',
        categoryAr: 'أغذية صحية وحبوب',
        imageUrl: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&q=80&w=600',
        descriptionEn: 'Single ingredient: slow-roasted peanuts. Zero added sugar, salt, or hydrogenated oils.',
        descriptionAr: 'مكون واحد فقط: فول سوداني محمص ببطء، بدون سكر أو زيوت مهدرجة أو مواد حافظة.',
        storeId: 'store_choco_sante',
        storeNameEn: 'Choco Santé Ouled Yaïch',
        storeNameAr: 'شوكو-صحة'
      }
    ]
  }
];

export const SMOP_HEALTHY_PICKS: HealthyStoreProduct[] = [
  {
    id: 'pick_honey',
    nameEn: 'Pure Mountain Sidr Honey',
    nameAr: 'عسل السدر الجبلي الحر',
    categoryEn: 'Organic Honey',
    categoryAr: 'عسل عضوي',
    imageUrl: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=600',
    descriptionEn: 'Harvested from pristine mountain peaks in Blida.',
    descriptionAr: 'مقطوف من قمم جبال الأطلس البليدي بدون أي إضافات.',
    storeId: 'store_bio_blida',
    storeNameEn: 'Bio Blida Nature',
    storeNameAr: 'بيو بليدة ناتور'
  },
  {
    id: 'pick_bread',
    nameEn: 'Whole Grain Sourdough Bread',
    nameAr: 'خبز القمح الكامل بالخميرة البلدية',
    categoryEn: 'Healthy Bakeries',
    categoryAr: 'مخابز صحية',
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600',
    descriptionEn: 'Traditional 24h wild fermentation, gentle on digestion.',
    descriptionAr: 'تخمير طبيعي 24 ساعة بدون خمائر تجارية، سهل الهضم وصديق للأمعاء.',
    storeId: 'store_fournil_sante',
    storeNameEn: 'Fournil Santé Blida',
    storeNameAr: 'مخبزة فورنيل للصحة'
  },
  {
    id: 'pick_cheese',
    nameEn: 'Natural Pasture Goat Cheese',
    nameAr: 'جبن الماعز الطبيعي الخفيف',
    categoryEn: 'Dairy & Cheese',
    categoryAr: 'أجبان وألبان طبيعية',
    imageUrl: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&q=80&w=600',
    descriptionEn: 'Light, traditional goat curd from mountain pastures.',
    descriptionAr: 'جبن خفيف غني بالبروتين من مراعي جبال الشريعة.',
    storeId: 'store_fromagerie_chrea',
    storeNameEn: 'Fromagerie Artisanale Chréa',
    storeNameAr: 'ألبان الشريعة الطبيعية'
  },
  {
    id: 'pick_seeds',
    nameEn: 'Raw Almonds & Seeds Cycling Mix',
    nameAr: 'تشكيلة اللوز والبذور الهرمونية',
    categoryEn: 'Healthy Foods',
    categoryAr: 'أغذية صحية وحبوب',
    imageUrl: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&q=80&w=600',
    descriptionEn: 'Zinc and Omega-rich seeds to nurture hormonal rhythm.',
    descriptionAr: 'لوز نيئ وبذور قرع وشيا غنية بالزنك والدهون الصحية.',
    storeId: 'store_noix_zabana',
    storeNameEn: 'Graines & Noix Zabana',
    storeNameAr: 'مكسرات زبّانة'
  },
  {
    id: 'pick_dark_choco',
    nameEn: '85% Stevia Dark Chocolate',
    nameAr: 'شوكولاتة داكنة بالستيفيا 85%',
    categoryEn: 'Healthy & Low-Sugar',
    categoryAr: 'قليلة السكر وصحية',
    imageUrl: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&q=80&w=600',
    descriptionEn: 'Guilt-free indulgence crafted with raw cocoa.',
    descriptionAr: 'مذاق شوكولاتة غني بدون سكر لدعم المزاج ومقاومة الرغبة بالحلويات.',
    storeId: 'store_choco_sante',
    storeNameEn: 'Choco Santé Ouled Yaïch',
    storeNameAr: 'شوكو-صحة'
  }
];
