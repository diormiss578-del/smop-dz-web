export interface GymGroupClass {
  id: string;
  titleEn: string;
  titleAr: string;
  category: 'Yoga' | 'Pilates' | 'Zumba' | 'Functional Training' | 'Strength Training' | 'Low-Impact Cardio' | 'Stretching & Mobility';
  daysEn: string;
  daysAr: string;
  timeEn: string;
  timeAr: string;
  sessionsPerWeek: number;
  durationMinutes: number;
  coachNameEn: string;
  coachNameAr: string;
  descriptionEn: string;
  descriptionAr: string;
  intensity: 'Low' | 'Moderate' | 'Dynamic';
}

export interface PartnerGym {
  id: string;
  nameEn: string;
  nameAr: string;
  logoUrl: string;
  coverUrl: string;
  galleryUrls: string[];
  locationEn: string;
  locationAr: string;
  neighborhood: string;
  city: string;
  addressEn: string;
  addressAr: string;
  phone: string;
  instagramUrl: string;
  facebookUrl?: string;
  workingHoursEn: string;
  workingHoursAr: string;
  monthlyPriceDzd: number; // 3,000 DA
  totalWeeklyClasses: number;
  activities: Array<'Yoga' | 'Pilates' | 'Zumba' | 'Functional Training' | 'Strength Training' | 'Low-Impact Cardio' | 'Stretching & Mobility'>;
  shortBioEn: string;
  shortBioAr: string;
  fullDescEn: string;
  fullDescAr: string;
  mapQuery: string;
  isPartner: boolean;
  smopClasses: GymGroupClass[];
}

export const GYM_ACTIVITIES_FILTERS = [
  { id: 'All', labelEn: 'All Activities', labelAr: 'جميع الأنشطة', icon: '✨' },
  { id: 'Yoga', labelEn: 'Yoga', labelAr: 'يوغا (Yoga)', icon: '🧘‍♀️' },
  { id: 'Pilates', labelEn: 'Pilates', labelAr: 'بيلاتس (Pilates)', icon: '🌸' },
  { id: 'Zumba', labelEn: 'Zumba', labelAr: 'زومبا (Zumba)', icon: '💃' },
  { id: 'Functional Training', labelEn: 'Functional Training', labelAr: 'تمارين وظيفية (Functional)', icon: '⚡' },
  { id: 'Strength Training', labelEn: 'Strength Training', labelAr: 'تقوية وشد (Strength)', icon: '🏋️‍♀️' },
  { id: 'Low-Impact Cardio', labelEn: 'Low-Impact Cardio', labelAr: 'كارديو خفيف (Low-Impact)', icon: '💓' },
  { id: 'Stretching & Mobility', labelEn: 'Stretching & Mobility', labelAr: 'إطالة ومرونة (Stretching)', icon: '🌿' }
];

export const PARTNER_GYMS_DATA: PartnerGym[] = [
  {
    id: 'gym_lady_club_zabana',
    nameEn: 'Lady Club Sport & Yoga',
    nameAr: 'نادي ليدي كلوب للرياضة واليوجا النسائية',
    logoUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=200',
    coverUrl: 'https://images.unsplash.com/photo-1518481612222-68bbe828ecd1?auto=format&fit=crop&q=80&w=800',
    galleryUrls: [
      'https://images.unsplash.com/photo-1518481612222-68bbe828ecd1?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=600'
    ],
    locationEn: 'Zabana, Downtown Blida',
    locationAr: 'حي زبّانة، وسط البليدة',
    neighborhood: 'زبّانة',
    city: 'البليدة (Blida)',
    addressEn: 'Rue des Frères Zabana, Downtown Blida',
    addressAr: 'شارع الإخوة زبّانة، وسط مدينة البليدة',
    phone: '+213 552 44 33 22',
    instagramUrl: 'https://instagram.com/ladyclub.blida',
    facebookUrl: 'https://facebook.com/ladyclub.blida',
    workingHoursEn: 'Sat – Thu: 08:30 AM – 08:00 PM (100% Women Only)',
    workingHoursAr: 'السبت إلى الخميس: 08:30 صباحاً – 08:00 مساءً (100% نسائي)',
    monthlyPriceDzd: 3000,
    totalWeeklyClasses: 18,
    activities: ['Yoga', 'Pilates', 'Low-Impact Cardio', 'Stretching & Mobility'],
    shortBioEn: 'A serene female-only haven specializing in low-cortisol yoga, therapeutic pilates, and pelvic mobility for hormonal health.',
    shortBioAr: 'فضاء نسائي هادئ ومتخصص في حصص اليوغا المخفضة للكورتيزول، البيلاتس العلاجي، وتمارين مرونة الحوض لتنظيم الهرمونات.',
    fullDescEn: 'Lady Club is a private wellness and fitness center in Zabana designed to nurture women’s mental and hormonal equilibrium. All classes are tailored for PCOS with gentle heart-rate zones, expert female trainers, and zero exhausting high-stress routines.',
    fullDescAr: 'يعد نادي ليدي كلوب وجهة متكاملة للصحة والرشاقة النسائية بوسط البليدة. يتميز ببيئة هادئة ومكيفة ومجهزة بأحدث المعدات مع تركيز كامل على الحصص الآمنة لمتلازمة تكيس المبايض التي تحافظ على توازن هرمون الكورتيزول وتنشط الدورة الدموية.',
    mapQuery: 'Zabana,+Blida,+Algeria',
    isPartner: true,
    smopClasses: [
      {
        id: 'cls_lady_yoga_1',
        titleEn: 'Yoga & Mobility Flow',
        titleAr: 'يوغا ومرونة المفاصل (Yoga & Mobility)',
        category: 'Yoga',
        daysEn: 'Monday & Wednesday',
        daysAr: 'الإثنين والأربعاء',
        timeEn: '18:00 – 19:00',
        timeAr: '18:00 – 19:00',
        sessionsPerWeek: 2,
        durationMinutes: 60,
        coachNameEn: 'Coach Sarah B.',
        coachNameAr: 'كوتش سارة بن عيسى',
        descriptionEn: 'Gentle mindful poses, deep diaphragm breathing, and pelvic hip openers to soothe the nervous system.',
        descriptionAr: 'وضعيات يوغا لطيفة مع تنفس حجابي عميق وفتح مرن للحوض لتهدئة الجهاز العصبي وخفض هرمون التوتر.',
        intensity: 'Low'
      },
      {
        id: 'cls_lady_pilates_1',
        titleEn: 'Core & Pelvic Pilates',
        titleAr: 'بيلاتس وتقوية الجذع (Pilates & Core)',
        category: 'Pilates',
        daysEn: 'Saturday & Tuesday',
        daysAr: 'السبت والثلاثاء',
        timeEn: '17:00 – 18:00',
        timeAr: '17:00 – 18:00',
        sessionsPerWeek: 2,
        durationMinutes: 60,
        coachNameEn: 'Coach Meriem K.',
        coachNameAr: 'كوتش مريم قادري',
        descriptionEn: 'Mat pilates with slow controlled pulses targeting deep abdominal stability and posture without heavy strain.',
        descriptionAr: 'تمارين بيلاتس أرضية مركزة لشد البطن العميق ودعم استقامة الظهر دون إجهاد المفاصل أو رفع نبضات القلب المفرط.',
        intensity: 'Moderate'
      },
      {
        id: 'cls_lady_stretch_1',
        titleEn: 'Stretching & Deep Relaxation',
        titleAr: 'إطالة واسترخاء عميق (Stretching & Mobility)',
        category: 'Stretching & Mobility',
        daysEn: 'Thursday',
        daysAr: 'الخميس',
        timeEn: '16:30 – 17:30',
        timeAr: '16:30 – 17:30',
        sessionsPerWeek: 1,
        durationMinutes: 60,
        coachNameEn: 'Coach Sarah B.',
        coachNameAr: 'كوتش سارة بن عيسى',
        descriptionEn: 'Full-body lymphatic and muscle tension release before the weekend.',
        descriptionAr: 'جلسة إطالة شاملة لتفريغ التوتر العضلي وتنشيط التصريف اللمفاوي قبل عطلة نهاية الأسبوع.',
        intensity: 'Low'
      }
    ]
  },
  {
    id: 'gym_queen_fitness_ouled_yaich',
    nameEn: 'Queen Fitness & Dance Center',
    nameAr: 'قاعة كوين فيتنس ورشاقة المرأة',
    logoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    coverUrl: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&q=80&w=800',
    galleryUrls: [
      'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1524594152303-9fd13543fe6e?auto=format&fit=crop&q=80&w=600'
    ],
    locationEn: 'Boulevard Principal, Ouled Yaïch, Blida',
    locationAr: 'الشارع الرئيسي، أولاد يعيش، البليدة',
    neighborhood: 'أولاد يعيش',
    city: 'البليدة (Blida)',
    addressEn: 'Avenue de la République, Ouled Yaïch',
    addressAr: 'شارع الجمهورية، أولاد يعيش، البليدة',
    phone: '+213 662 88 77 66',
    instagramUrl: 'https://instagram.com/queenfitness.ouledyaich',
    facebookUrl: 'https://facebook.com/queenfitness.dz',
    workingHoursEn: 'Sat – Thu: 09:00 AM – 08:30 PM (Women Only)',
    workingHoursAr: 'السبت إلى الخميس: 09:00 صباحاً – 08:30 مساءً (نسائي بالكامل)',
    monthlyPriceDzd: 3000,
    totalWeeklyClasses: 22,
    activities: ['Zumba', 'Functional Training', 'Low-Impact Cardio', 'Strength Training'],
    shortBioEn: 'A vibrant energetic facility featuring uplifting Zumba rhythms, functional sculpting, and fat-burning cardio for PCOS.',
    shortBioAr: 'قاعة حيوية ومبهجة تقدم حصص زومبا ممتعة، تمارين وظيفية لشد القوام، وكارديو مدروس لتنشيط حرق الدهون والحساسية للأنسولين.',
    fullDescEn: 'Queen Fitness in Ouled Yaich combines infectious positive energy with structured fitness programs. With spacious air-conditioned studios and motivating certified female instructors, you will burn calories, release endorphins, and enjoy working out.',
    fullDescAr: 'توفر قاعة كوين فيتنس بأولاد يعيش قاعات واسعة ومكيفة تجمع بين النشاط الحركي والروح الإيجابية العالية. صممت حصصها الجماعية الشريكة مع SMOP DZ خصيصاً لتفادي الإجهاد المفرط مع تحقيق أعلى درجات النشاط وتحسين المزاج.',
    mapQuery: 'Ouled+Yaich,+Blida,+Algeria',
    isPartner: true,
    smopClasses: [
      {
        id: 'cls_queen_zumba_1',
        titleEn: 'Zumba & Hormonal Rhythm',
        titleAr: 'زومبا ورقص إيقاعي ممتع (Zumba & Dance)',
        category: 'Zumba',
        daysEn: 'Sunday & Thursday',
        daysAr: 'الأحد والخميس',
        timeEn: '18:30 – 19:30',
        timeAr: '18:30 – 19:30',
        sessionsPerWeek: 2,
        durationMinutes: 60,
        coachNameEn: 'Coach Yasmine T.',
        coachNameAr: 'كوتش ياسمين طاهري',
        descriptionEn: 'Fun, moderate-tempo Latin and oriental choreographies that melt stress and boost dopamine safely.',
        descriptionAr: 'حركات ورقصات إيقاعية ممتعة ومعتدلة الكثافة تذيب التوتر وتحفز الدوبامين وتحرق السعرات بجو حماسي أنثوي.',
        intensity: 'Dynamic'
      },
      {
        id: 'cls_queen_func_1',
        titleEn: 'Functional Metabolic Tone',
        titleAr: 'تمارين وظيفية لشد الجسم (Functional Training)',
        category: 'Functional Training',
        daysEn: 'Monday & Thursday',
        daysAr: 'الإثنين والخميس',
        timeEn: '10:00 – 11:00',
        timeAr: '10:00 – 11:00',
        sessionsPerWeek: 2,
        durationMinutes: 60,
        coachNameEn: 'Coach Amina L.',
        coachNameAr: 'كوتش أمينة لعريبي',
        descriptionEn: 'Full-body functional movement using light dumbbells and bands to build insulin-sensitive lean muscle.',
        descriptionAr: 'حركات وظيفية شاملة بأوزان خفيفة وأشرطة مطاطية لبناء كتلة عضلية خفيفة تحسن استهلاك الغلوكوز.',
        intensity: 'Moderate'
      },
      {
        id: 'cls_queen_cardio_1',
        titleEn: 'Low-Impact Step & Cardio',
        titleAr: 'كارديو خفيف متوازن (Low-Impact Cardio)',
        category: 'Low-Impact Cardio',
        daysEn: 'Sunday & Tuesday',
        daysAr: 'الأحد والثلاثاء',
        timeEn: '09:30 – 10:30',
        timeAr: '09:30 – 10:30',
        sessionsPerWeek: 2,
        durationMinutes: 60,
        coachNameEn: 'Coach Amina L.',
        coachNameAr: 'كوتش أمينة لعريبي',
        descriptionEn: 'Low-joint-impact aerobic steps and rhythmic marches for cardiovascular stamina without spiking cortisol.',
        descriptionAr: 'تمارين هوائية ناعمة على المفاصل ترفع اللياقة القلبية وتحرق الدهون دون رفع هرمون التوتر.',
        intensity: 'Moderate'
      }
    ]
  },
  {
    id: 'gym_harmonie_bab_sebt',
    nameEn: 'Harmonie Gym & Pilates Studio',
    nameAr: 'استوديو هارموني للرشاقة والبيلاتس',
    logoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
    coverUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800',
    galleryUrls: [
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1518481612222-68bbe828ecd1?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&q=80&w=600'
    ],
    locationEn: 'Bab Sebt, Blida Center',
    locationAr: 'باب السبت، وسط البليدة',
    neighborhood: 'باب السبت',
    city: 'البليدة (Blida)',
    addressEn: 'Rue Bab Sebt, Commercial Sector, Blida',
    addressAr: 'شارع باب السبت، المجمع التجاري، البليدة',
    phone: '+213 555 12 99 88',
    instagramUrl: 'https://instagram.com/harmonie.blida',
    facebookUrl: 'https://facebook.com/harmonie.blida',
    workingHoursEn: 'Sat – Thu: 09:00 AM – 07:30 PM (Women Only)',
    workingHoursAr: 'السبت إلى الخميس: 09:00 صباحاً – 07:30 مساءً (حصري للنساء)',
    monthlyPriceDzd: 3000,
    totalWeeklyClasses: 16,
    activities: ['Pilates', 'Strength Training', 'Stretching & Mobility', 'Yoga'],
    shortBioEn: 'A boutique wellness studio emphasizing posture correction, hormonal strength conditioning, and clinical Pilates.',
    shortBioAr: 'استوديو بوتيك صحي يركز على تصحيح القوام، تقوية العضلات الداعمة للهرمونات، وتمارين البيلاتس الموجهة.',
    fullDescEn: 'Located near Bab Sebt, Harmonie Gym offers small-group boutique classes where instructors give personal attention to each participant. Designed to reinforce muscular tone, support healthy estrogen-to-progesterone ratios, and relieve pelvic congestion.',
    fullDescAr: 'يقع استوديو هارموني قرب باب السبت بقلب البليدة، ويتميز بأفواج صغيرة محدودة العدد تضمن المتابعة الفردية لكل مشتركة. توفر حصصه بيئة مثالية لتقوية الجذع، تخفيف آلام أسفل الظهر، ودعم الدورة الدموية في منطقة الحوض.',
    mapQuery: 'Bab+Sebt,+Blida,+Algeria',
    isPartner: true,
    smopClasses: [
      {
        id: 'cls_harmonie_strength_1',
        titleEn: 'Hormonal Strength & Tone',
        titleAr: 'تقوية وشد القوام الهرموني (Strength Training)',
        category: 'Strength Training',
        daysEn: 'Saturday & Wednesday',
        daysAr: 'السبت والأربعاء',
        timeEn: '16:30 – 17:30',
        timeAr: '16:30 – 17:30',
        sessionsPerWeek: 2,
        durationMinutes: 60,
        coachNameEn: 'Coach Karima D.',
        coachNameAr: 'كوتش كريمة دريسي',
        descriptionEn: 'Progressive slow resistance training to build metabolic engine and combat stubborn belly fat.',
        descriptionAr: 'تمارين مقاومة تدريجية بطيئة لرفع معدل الحرق اليومي ومحاربة دهون البطن العنيدة المرتبطة بالأنسولين.',
        intensity: 'Moderate'
      },
      {
        id: 'cls_harmonie_pilates_2',
        titleEn: 'Deep Breathing & Mat Pilates',
        titleAr: 'بيلاتس وتنفس عميق (Pilates)',
        category: 'Pilates',
        daysEn: 'Monday & Thursday',
        daysAr: 'الإثنين والخميس',
        timeEn: '18:00 – 19:00',
        timeAr: '18:00 – 19:00',
        sessionsPerWeek: 2,
        durationMinutes: 60,
        coachNameEn: 'Coach Karima D.',
        coachNameAr: 'كوتش كريمة دريسي',
        descriptionEn: 'Core alignment, inner thigh work, and pelvic floor toning.',
        descriptionAr: 'تنسيق عضلات قاع الحوض والأفخاذ الداخلية واستقامة الظهر بتمارين دقيقة ومدروسة.',
        intensity: 'Low'
      }
    ]
  }
];

export interface GymPartnerApplication {
  gymName: string;
  managerName: string;
  phone: string;
  email: string;
  location: string;
  socialMedia: string;
  activities: string[];
  proposedClasses: string;
  monthlyPrice: string;
  classesPerWeek: string;
  message: string;
}
