export type SportsLevel = 'beginner' | 'intermediate' | 'advanced';
export type SportsCategory = 'Home Workouts' | 'Dance & Zumba' | 'Yoga' | 'Meditation';
export type ProgramVariety = 'integrated' | 'yoga' | 'dance' | 'home' | 'meditation';

export interface SportsVideo {
  id: string;
  videoNumber: number;
  title: string;
  titleAr: string;
  category: SportsCategory;
  categoryAr: string;
  level: SportsLevel;
  levelLabelEn: string;
  levelLabelAr: string;
  duration: string;
  durationAr: string;
  durationMinutes: number;
  imageUrl: string;
  shortDescription: string;
  shortDescriptionAr: string;
  benefits: string[];
  benefitsAr: string[];
  trainerName: string;
  trainerNameAr: string;
}

export interface SportsProgramTier {
  id: SportsLevel;
  titleEn: string;
  titleAr: string;
  badge: string;
  taglineEn: string;
  taglineAr: string;
  videosCount: number;
  priceDzd: number;
  shortDescriptionEn: string;
  shortDescriptionAr: string;
  fullDescriptionEn: string;
  fullDescriptionAr: string;
  whatsIncludedEn: string[];
  whatsIncludedAr: string[];
  breakdown: {
    homeWorkouts: number;
    danceZumba: number;
    yoga: number;
    meditation: number;
  };
  accentColor: string;
}

export interface SportsProgramDefinition {
  id: string; // e.g. 'beginner_integrated', 'beginner_yoga', etc.
  level: SportsLevel;
  variety: ProgramVariety;
  titleEn: string;
  titleAr: string;
  badge: string;
  isSpecialized: boolean;
  category?: SportsCategory;
  videosCount: number;
  priceDzd: number;
  shortDescriptionEn: string;
  shortDescriptionAr: string;
  fullDescriptionEn: string;
  fullDescriptionAr: string;
  whatsIncludedEn: string[];
  whatsIncludedAr: string[];
  breakdown?: {
    homeWorkouts: number;
    danceZumba: number;
    yoga: number;
    meditation: number;
  };
  accentColor: string;
}

export const SPORTS_CATEGORIES: {
  id: SportsCategory | 'All';
  en: string;
  ar: string;
  iconName: string;
  variety: ProgramVariety | 'all';
  descriptionAr: string;
  descriptionEn: string;
}[] = [
  {
    id: 'All',
    en: 'All Activities',
    ar: 'كل الأنشطة',
    iconName: 'Sparkles',
    variety: 'all',
    descriptionAr: 'عرض جميع الفيديوهات الـ 30 في البرنامج',
    descriptionEn: 'View all 30 workout sessions in the program'
  },
  {
    id: 'Home Workouts',
    en: 'Home Workouts',
    ar: 'تمارين منزلية',
    iconName: 'Home',
    variety: 'home',
    descriptionAr: 'تمارين منزلية تدريجية بدون أجهزة معقدة',
    descriptionEn: 'Home workouts with zero or light equipment'
  },
  {
    id: 'Dance & Zumba',
    en: 'Dance & Zumba',
    ar: 'الرقص والزومبا',
    iconName: 'Music',
    variety: 'dance',
    descriptionAr: 'تمارين ممتعة وإيقاعية لحرق السعرات ورفع هرمون السعادة',
    descriptionEn: 'High-energy rhythmic dance and zumba cardio sessions'
  },
  {
    id: 'Yoga',
    en: 'Yoga',
    ar: 'اليوغا والمرونة',
    iconName: 'HeartHandshake',
    variety: 'yoga',
    descriptionAr: 'تمارين اليوغا وتخفيف التوتر وتحسين توازن الهرمونات',
    descriptionEn: 'Restorative yoga flows for flexibility and hormonal balance'
  },
  {
    id: 'Meditation',
    en: 'Meditation',
    ar: 'التأمل والاسترخاء',
    iconName: 'Feather',
    variety: 'meditation',
    descriptionAr: 'جلسات التأمل وتمارين التنفس العميق لخفض هرمون الكورتيزول',
    descriptionEn: 'Guided meditation and breathwork to lower cortisol levels'
  }
];

export const SPORTS_PROGRAM_TIERS: SportsProgramTier[] = [
  {
    id: 'beginner',
    titleEn: 'Beginner',
    titleAr: 'المستوى المبتدئ',
    badge: '🌱',
    taglineEn: 'Gentle, low-impact start designed for hormonal harmony',
    taglineAr: 'بداية هادئة وتدريجية لدعم توازن الهرمونات والمبتدئات',
    videosCount: 30,
    priceDzd: 1200,
    shortDescriptionEn: 'A progressive workout program designed to help you build consistency, improve your fitness and enjoy movement at your own pace.',
    shortDescriptionAr: 'برنامج للمبتدئات، بتمارين تدريجية وسهلة لبناء العادة والنشاط دون إجهاد للجسم.',
    fullDescriptionEn: 'A progressive workout program designed to help you build consistency, improve your fitness and enjoy movement at your own pace.',
    fullDescriptionAr: 'برنامج متكامل للمبتدئات مصمم لمساعدتكِ على الانتظام، تحسين لياقتكِ البدنية والاستمتاع بالحركة بالوتيرة التي تناسبكِ تماماً دون ضغط على الغدد الكظرية.',
    whatsIncludedEn: [
      '30 workout videos',
      'Home workouts (10 videos)',
      'Dance & Zumba (8 videos)',
      'Yoga (6 videos)',
      'Meditation (6 videos)',
      'Progressive sessions'
    ],
    whatsIncludedAr: [
      '30 فيديو تمرين تدريبي',
      'تمارين منزلية (10 فيديوهات)',
      'تمارين الرقص والزومبا (8 فيديوهات)',
      'تمارين اليوغا والمرونة (6 فيديوهات)',
      'جلسات التأمل والاسترخاء (6 فيديوهات)',
      'حصص تدريجية ومناسبة للمبتدئات'
    ],
    breakdown: {
      homeWorkouts: 10,
      danceZumba: 8,
      yoga: 6,
      meditation: 6
    },
    accentColor: '#10B981'
  },
  {
    id: 'intermediate',
    titleEn: 'Intermediate',
    titleAr: 'المستوى المتوسط',
    badge: '🔥',
    taglineEn: 'Dynamic challenges to sculpt and boost metabolic rate',
    taglineAr: 'تمارين أكثر حيوية لشد الجسم وتنشيط الحرق ومقاومة الإنسولين',
    videosCount: 30,
    priceDzd: 1200,
    shortDescriptionEn: 'A balanced and dynamic fitness journey offering progressive resistance, moderate cardio and deeper body tone.',
    shortDescriptionAr: 'برنامج للمستوى المتوسط، بتمارين أكثر تحدياً تجمع بين المقاومة والكارديو لشد القوام.',
    fullDescriptionEn: 'Elevate your stamina, build lean strength, and optimize your insulin sensitivity through energizing medium-intensity sessions tailored for Algerian women.',
    fullDescriptionAr: 'طوري قدرتكِ على التحمل، قومي بشد عضلات الجسم وحسني حساسية الإنسولين مع تمارين متوسطة الكثافة مصممة خصيصاً للنساء الجزائريات.',
    whatsIncludedEn: [
      '30 workout videos',
      'Home workouts (10 videos)',
      'Dance & Zumba (8 videos)',
      'Yoga (6 videos)',
      'Meditation (6 videos)',
      'Progressive sessions'
    ],
    whatsIncludedAr: [
      '30 فيديو تمرين تدريبي',
      'تمارين منزلية (10 فيديوهات)',
      'تمارين الرقص والزومبا (8 فيديوهات)',
      'تمارين اليوغا والمرونة (6 فيديوهات)',
      'جلسات التأمل والاسترخاء (6 فيديوهات)',
      'حصص تدريجية متوسطة الشدة'
    ],
    breakdown: {
      homeWorkouts: 10,
      danceZumba: 8,
      yoga: 6,
      meditation: 6
    },
    accentColor: '#F59E0B'
  },
  {
    id: 'advanced',
    titleEn: 'Advanced',
    titleAr: 'المستوى المتقدم',
    badge: '⚡',
    taglineEn: 'Peak athletic conditioning, high energy and functional strength',
    taglineAr: 'تمارين قوية وكثيفة للرياضيات والباحثات عن أعلى مستويات اللياقة',
    videosCount: 30,
    priceDzd: 1200,
    shortDescriptionEn: 'An intense, empowering program for athletic conditioning, muscular endurance and full-body athletic transformation.',
    shortDescriptionAr: 'برنامج للمستوى المتقدم، بتمارين أكثر كثافة وتحدياً لصقل اللياقة وبناء القوة والتحمل.',
    fullDescriptionEn: 'A high-powered program with challenging circuit workouts, fast-paced dance choreographies and deep physical conditioning that respects hormonal health.',
    fullDescriptionAr: 'برنامج قوي يضم تدريبات متقدمة ومسارات حركية سريعة لتعزيز القوة العضلية والأداء الرياضي المتميز مع الحفاظ على التوازن الهرموني.',
    whatsIncludedEn: [
      '30 workout videos',
      'Home workouts (10 videos)',
      'Dance & Zumba (8 videos)',
      'Yoga (6 videos)',
      'Meditation (6 videos)',
      'Progressive sessions'
    ],
    whatsIncludedAr: [
      '30 فيديو تمرين تدريبي',
      'تمارين منزلية (10 فيديوهات)',
      'تمارين الرقص والزومبا (8 فيديوهات)',
      'تمارين اليوغا والمرونة (6 فيديوهات)',
      'جلسات التأمل والاسترخاء (6 فيديوهات)',
      'حصص متقدمة ومكثفة'
    ],
    breakdown: {
      homeWorkouts: 10,
      danceZumba: 8,
      yoga: 6,
      meditation: 6
    },
    accentColor: '#D81B60'
  }
];

// Helper images
const homeWorkoutImages = [
  'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1576678927484-cc907957088c?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=800&auto=format&fit=crop&q=80'
];

const danceZumbaImages = [
  'https://images.unsplash.com/photo-1524594152303-9fd13543fe6e?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1547153760-18fc86324498?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1499364615650-ec38552f4f34?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=800&auto=format&fit=crop&q=80'
];

const yogaImages = [
  'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1510894347713-fc3ed6fdf539?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1552196563-552443329243?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&auto=format&fit=crop&q=80'
];

const meditationImages = [
  'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1528715471579-d1bcf0ba5e83?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&auto=format&fit=crop&q=80'
];

// Titles bank for generating 30 specialized videos
const YOGA_30_TITLES = [
  { en: 'Gentle Morning Hormone Flow', ar: 'يوغا الصباح الهادئة لتوازن الهرمونات' },
  { en: 'Hip Opening & Pelvic Release', ar: 'فتح الحوض وتخفيف الاحتقان الأنثوي' },
  { en: 'Spine & Lower Back Relief', ar: 'تخفيف آلام الظهر والعمود الفقري' },
  { en: 'Sun Salutation Foundations', ar: 'أساسيات تحية الشمس خطوة بخطوة' },
  { en: 'Restorative Bedtime Wind-Down', ar: 'يوغا استرخائية مهدئة قبل النوم' },
  { en: 'Full Body Alignment & Stretch', ar: 'تمدد شامل واستقامة القوام' },
  { en: 'PCOS Adrenal Soothing Sequence', ar: 'تهدئة الغدد الكظرية وخفض التوتر' },
  { en: 'Neck, Shoulders & Upper Back Care', ar: 'علاج تشنج الرقبة والأكتاف' },
  { en: 'Gentle Twist & Digestive Reset', ar: 'التواءات لطيفة لتنشيط الهضم والتخلص من النفخة' },
  { en: 'Balance & Standing Stability', ar: 'وضعيات التوازن والثبات وقوفاً' },
  { en: 'Soothing Moon Salutation', ar: 'تحية القمر لتهدئة الجهاز العصبي' },
  { en: 'Hamstrings & Legs Elasticity', ar: 'مرونة أوتار الركبة والساقين' },
  { en: 'Deep Hip Mobility Flow', ar: 'حركية عميقة لمفصل الورك والحوض' },
  { en: 'Chest & Heart Opening Sequence', ar: 'فتح الصدر وتحسين سعة التنفس' },
  { en: 'Lymphatic Drainage Flow', ar: 'تنشيط التصريف اللمفاوي والدورة الدموية' },
  { en: 'Grounding Root Chakra Yoga', ar: 'يوغا الثبات والاستقرار الداخلي' },
  { en: 'Core Tone Without Pressure', ar: 'شد عضلات البطن بدون إجهاد هرموني' },
  { en: 'Evening Stress Eraser', ar: 'محو إرهاق اليوم وتفريغ الضغوط' },
  { en: 'Gentle Vinyasa for Vitality', ar: 'فينياسا لطيفة لتجديد الحيوية والنشاط' },
  { en: 'Restorative Wall Yoga Flow', ar: 'يوغا مريحة بالاستناد على الجدار' },
  { en: 'Sacral Flow for Cycle Harmony', ar: 'تدفق حركي لدعم انتظام الدورة الشهرية' },
  { en: 'Ankle & Foot Mobility Flow', ar: 'مرونة الكاحلين وتخفيف ثقل القدمين' },
  { en: 'Graceful Flow for Posture', ar: 'تحسين وقفة الجسم ورشاقة الحركة' },
  { en: 'Breath & Asana Integration', ar: 'دمج التنفس العميق مع حركات اليوغا' },
  { en: 'Deep Inner Calm Flow', ar: 'تدفق الهدوء والسكينة الداخلية' },
  { en: 'Gentle Warrior Sequence', ar: 'مسار وضعيات المحارب لتعزيز الثقة بالنفس' },
  { en: 'Mindful Body Restoration', ar: 'إعادة شحن طاقة الجسد بالكامل' },
  { en: 'Evening Gratitude Flow', ar: 'يوغا الامتنان والاسترخاء المسائي' },
  { en: 'Deep Fascia Stretch & Yin Flow', ar: 'ين يوغا لإطالة الأنسجة العميقة' },
  { en: 'Complete Mind-Body Harmony', ar: 'التكامل والتناغم التام بين العقل والجسد' }
];

const DANCE_30_TITLES = [
  { en: 'Upbeat Warm-up & Joyful Groove', ar: 'إحماء إيقاعي مبهج وبداية حيوية' },
  { en: 'Latin Salsa Rhythm Cardio', ar: 'كارديو السالسا اللاتيني لحرق الدهون' },
  { en: 'Merengue Quick Steps & Fun Cardio', ar: 'حركات الميرينغي السريعة والممتعة' },
  { en: 'Oriental Fitness & Hip Shakes', ar: 'فيتنس شرقي وحركات الخصر والورك' },
  { en: 'Reggaeton Energy & Core Burn', ar: 'ريغتون حماسي وشد عضلات الخصر' },
  { en: 'Cumbia Gentle Rhythm Flow', ar: 'كومبيا لاتينية وتناغم حركي سلس' },
  { en: 'Belly Dance Sculpt & Arm Toning', ar: 'شد الذراعين ونحت الخصر بالرقص' },
  { en: 'Pop Party Dance Cardio', ar: 'كارديو الحفلات الغنائية والمرح' },
  { en: 'Flamenco Fusion & Posture', ar: 'فيوجن فلامنكو ورشاقة القوام' },
  { en: 'African Beats Cardio Sweat', ar: 'إيقاعات إفريقية وحرق مكثف للسعرات' },
  { en: 'Samba Bounce & Leg Toning', ar: 'سامبا برازيلية وشد الساقين' },
  { en: 'Retro Disco Groove Cardio', ar: 'كارديو الديسكو الكلاسيكي والحيوية' },
  { en: 'Cardio Dance Intervals', ar: 'فترات الكارديو الإيقاعي المتناوب' },
  { en: 'Waist & Core Dance Circuit', ar: 'دائرة الرقص لشد البطن والخصر' },
  { en: 'Low-Impact Dance Cardio', ar: 'كارديو راقص خفيف الوقع على المفاصل' },
  { en: 'Latin Beat Cardio Blast', ar: 'طاقة الإيقاع اللاتيني لرفع الحرق' },
  { en: 'Sensual Flow & Body Grace', ar: 'حركات ناعمة لتعزيز الأنوثة والمرونة' },
  { en: 'Cardio Dance Celebration', ar: 'احتفالية الرقص ورفع هرمون الدوبامين' },
  { en: 'Hip Hop Groove Foundations', ar: 'أساسيات الهيب هوب الإيقاعي السهل' },
  { en: 'Sweat & Smile Zumba Blast', ar: 'زومبا البهجة والتعرق الإيجابي' },
  { en: 'Full Body Dance Toning', ar: 'نحت كامل الجسم مع الموسيقى' },
  { en: 'Rhythmic Steps & Footwork', ar: 'خطوات إيقاعية لتناسق الأقدام' },
  { en: 'Endorphin High Dance Cardio', ar: 'كارديو هرمونات السعادة القصوى' },
  { en: 'Belly Fit Core Control', ar: 'تحكم عضلات البطن بالحركات الشرقية' },
  { en: 'Latin Carnival Joy', ar: 'كرنفال الرقص اللاتيني والطاقة الإيجابية' },
  { en: 'Calorie Melting Dance Party', ar: 'حرق السعرات مع المتعة والإثارة' },
  { en: 'Smooth Jazz Cardio Movement', ar: 'حركات الجاز السلسة والمرونة' },
  { en: 'Dynamic Dance Coordination', ar: 'تطوير التناسق والتركيز الحركي' },
  { en: 'Non-Stop Zumba Energy', ar: 'طاقة زومبا متواصلة بدون توقف' },
  { en: 'Cool-Down & Stretch Groove', ar: 'تهدئة واستطالة عضلية إيقاعية ختامية' }
];

const HOME_30_TITLES = [
  { en: 'Full Body Hormone-Friendly Activation', ar: 'تنشيط كامل الجسم الداعم للهرمونات' },
  { en: 'Glute Activation & Hip Tone', ar: 'تفعيل عضلات الأرداف ونحت الحوض' },
  { en: 'Core Stability & Gentle Toning', ar: 'ثبات الجذع وشد البطن اللطيف' },
  { en: 'Upper Body & Arm Definition', ar: 'تقوية الذراعين ونحت الجزء العلوي' },
  { en: 'Low-Impact Cardio Sweat', ar: 'كارديو منزلي خفيف الوقع بدون قفز' },
  { en: 'Legs & Thighs Sculpting Routine', ar: 'نحت الفخذين وتقوية الساقين' },
  { en: 'Back & Posture Alignment Workout', ar: 'تقوية عضلات الظهر واستقامة القامة' },
  { en: 'Metabolic Insulin-Friendly Circuit', ar: 'دائرة تدريبية لتنشيط حساسية الإنسولين' },
  { en: 'Inner & Outer Thigh Toning', ar: 'شد الفخذين الداخلي والخارجي' },
  { en: 'Full Body Mobility & Strength', ar: 'قوة وحركية شاملة لكامل الجسم' },
  { en: 'Wall Sit & Isometric Strength', ar: 'تمارين الثبات وتمارين الجدار' },
  { en: 'Gentle Pilates Core Flow', ar: 'بيلاتيس منزلي لتقوية عضلات البطن' },
  { en: 'Arm & Shoulder Sculpt Without Weights', ar: 'شد الأكتاف والذراعين بوزن الجسم' },
  { en: 'Standing Abs & Obliques', ar: 'تمارين البطن والخواصر وقوفاً' },
  { en: 'Low-Impact Step Circuit', ar: 'دائرة الخطوات المنزلية لزيادة الحرق' },
  { en: 'Pelvic Floor & Deep Core Toning', ar: 'تقوية عضلات قاع الحوض والجذع العميق' },
  { en: 'Lower Body Endurance Flow', ar: 'تحمل وقوة الجزء السفلي من الجسم' },
  { en: 'Cardio Resistance Fusion', ar: 'دمج الكارديو مع المقاومة الخفيفة' },
  { en: 'Desk Worker Posture Correction', ar: 'تصحيح وقفة الجلوس وفك تشنجات الظهر' },
  { en: 'Hormone-Safe HIIT Low Impact', ar: 'هيت هرموني آمن بدون رفع الكورتيزول' },
  { en: 'Glute Bridge & Hip Sculpt Mastery', ar: 'تمارين الجسر المتقدمة لشد المؤخرة' },
  { en: 'Full Body Functional Strength', ar: 'قوة وظيفية للمهام اليومية والنشاط' },
  { en: 'Bodyweight Resistance Circuit', ar: 'دائرة المقاومة الشاملة بوزن الجسم' },
  { en: 'Side Body & Waist Definition', ar: 'تنسيق الخصر والجانبين بدون أوزان' },
  { en: 'Gentle Jump-Free Cardio Toning', ar: 'كارديو بدون قفز لحماية الركبتين والمفاصل' },
  { en: 'Balance & Core Endurance', ar: 'تحسين التوازن وقوة التحمل الداخلي' },
  { en: 'Upper Body Grace & Posture', ar: 'رشاقة الجزء العلوي وجمال الظهر' },
  { en: 'Total Body Calorie Burner', ar: 'حرق السعرات المنزلي المتوازن' },
  { en: 'Leg Firming & Circulation Flow', ar: 'تنشيط الدورة الدموية وشد الساقين' },
  { en: 'Complete Strength & Stretch Finish', ar: 'ختام القوة والمرونة الشاملة' }
];

const MEDITATION_30_TITLES = [
  { en: 'Cortisol-Lowering Breathwork', ar: 'تنفس عميق لخفض هرمون الكورتيزول' },
  { en: 'Gentle Body Scan Meditation', ar: 'التأمل بالمسح الجسدي وإرخاء العضلات' },
  { en: 'Peaceful Mind Morning Clarity', ar: 'صفاء الذهن الصباحي وتجديد النوايا' },
  { en: 'Self-Compassion & Body Love', ar: 'التأمل في حب الذات والامتنان للجسد' },
  { en: 'Deep Sleep & Relaxation Guide', ar: 'دليل النوم العميق والاسترخاء الليلي' },
  { en: 'Stress Relief in 10 Minutes', ar: 'تفريغ الضغط النفسي في 10 دقائق' },
  { en: 'Anxiety Release & Nervous System Calm', ar: 'تخفيف القلق وتهدئة الجهاز العصبي' },
  { en: 'Mindful Eating & Satiety Connection', ar: 'التأمل الواعي لعلاقة صحية مع الأكل' },
  { en: 'Hormonal Reset Guided Breath', ar: 'تنفس موجه لإعادة توازن الغدد الصماء' },
  { en: 'Vagus Nerve Activation for Calm', ar: 'تنشيط العصب الحائر لاستعادة السكون' },
  { en: 'Letting Go of Mental Clutter', ar: 'التخلص من تراكم الأفكار والوساوس' },
  { en: 'Deep Emotional Grounding', ar: 'الاتزان العاطفي والهدوء الداخلي' },
  { en: 'Gratitude & Joy Awakening', ar: 'استحضار مشاعر الشكر والبهجة' },
  { en: 'Evening Wind-Down & Tension Melt', ar: 'استرخاء المساء وإذابة التشنجات العضلية' },
  { en: 'Healing Visualization for Hormones', ar: 'تخيل موجّه للشفاء واستعادة التوازن' },
  { en: 'Midday Reset & Mental Energy', ar: 'استراحة منتصف اليوم واستعادة التركيز' },
  { en: 'Sound Frequencies for Cellular Peace', ar: 'ترددات صوتية مهدئة لسكينة الخلايا' },
  { en: 'Self-Worth & Confidence Breath', ar: 'تنفس تعزيز الثقة وتقدير الذات' },
  { en: 'Overcoming Body Frustration', ar: 'التصالح مع تغيرات الوزن والجسد' },
  { en: 'Breath for Deep Restorative Sleep', ar: 'تنفس النوم المهدئ ومحاربة الأرق' },
  { en: 'Releasing Fear & Overthinking', ar: 'التحرر من الخوف والتفكير الزائد' },
  { en: 'Heart-Brain Coherence Flow', ar: 'التناغم بين نبضات القلب وموجات الدماغ' },
  { en: 'Inner Oasis Visualization', ar: 'واحة الهدوء الذهني والراحة التامة' },
  { en: 'Patience & Compassion on PCOS Journey', ar: 'الصبر والرفق بالنفس في رحلة الشفاء' },
  { en: 'Somatic Breath for Gut Calm', ar: 'تنفس لتهدئة القولون واضطرابات البطن' },
  { en: 'Gentle Morning Vitality Breath', ar: 'تنفس صباحي لطيف لإيقاظ الطاقة' },
  { en: 'Subconscious Repatterning for Health', ar: 'برمجة العقل الباطن على الصحة والعافية' },
  { en: 'Night Sky Serenity Meditation', ar: 'تأمل سماء الليل والهدوء الأبدي' },
  { en: 'Deep Wholeness & Self-Acceptance', ar: 'السكينة والتقبل التام للذات' },
  { en: 'The Ultimate Zen Mastery', ar: 'السلام الروحي والسكينة المطلقة' }
];

// Helper to generate the exact 30 videos for integrated program
function generateIntegratedVideos(level: SportsLevel): SportsVideo[] {
  const levelInfo = SPORTS_PROGRAM_TIERS.find((t) => t.id === level)!;
  const list: SportsVideo[] = [];
  let num = 1;

  // 1. Home workouts (10)
  for (let i = 0; i < 10; i++) {
    const item = HOME_30_TITLES[i];
    const duration = level === 'beginner' ? 20 : level === 'intermediate' ? 25 : 30;
    list.push({
      id: `sports_${level}_integrated_v${num}`,
      videoNumber: num,
      title: item.en,
      titleAr: item.ar,
      category: 'Home Workouts',
      categoryAr: 'تمارين منزلية',
      level,
      levelLabelEn: levelInfo.titleEn,
      levelLabelAr: levelInfo.titleAr,
      duration: `${duration} min`,
      durationAr: `${duration} دقيقة`,
      durationMinutes: duration,
      imageUrl: homeWorkoutImages[i % homeWorkoutImages.length],
      shortDescription: 'Gentle, hormone-safe home workout designed for full-body strength and metabolic health.',
      shortDescriptionAr: 'تمرين منزلي آمن هرمونياً لبناء القوة وتحسين الحرق دون إجهاد للجسم.',
      benefits: ['Strength', 'Metabolism', 'Mobility', 'Insulin Sensitivity'],
      benefitsAr: ['القوة العضلية', 'تنشيط الحرق', 'حركية المفاصل', 'حساسية الإنسولين'],
      trainerName: 'Coach Sarah L.',
      trainerNameAr: 'الكوتش سارة ل.'
    });
    num++;
  }

  // 2. Dance & Zumba (8)
  for (let i = 0; i < 8; i++) {
    const item = DANCE_30_TITLES[i];
    const duration = level === 'beginner' ? 20 : level === 'intermediate' ? 25 : 30;
    list.push({
      id: `sports_${level}_integrated_v${num}`,
      videoNumber: num,
      title: item.en,
      titleAr: item.ar,
      category: 'Dance & Zumba',
      categoryAr: 'الرقص والزومبا',
      level,
      levelLabelEn: levelInfo.titleEn,
      levelLabelAr: levelInfo.titleAr,
      duration: `${duration} min`,
      durationAr: `${duration} دقيقة`,
      durationMinutes: duration,
      imageUrl: danceZumbaImages[i % danceZumbaImages.length],
      shortDescription: 'Joyful rhythmic cardio dance to burn calories and boost happy hormones.',
      shortDescriptionAr: 'كارديو راقص مبهج لحرق السعرات ورفع هرمونات السعادة بحيوية ونشاط.',
      benefits: ['Cardio', 'Rhythm', 'Endorphins', 'Coordination'],
      benefitsAr: ['صحة القلب', 'الإيقاع الحركي', 'هرمون السعادة', 'التناسق العصبي'],
      trainerName: 'Coach Maya L.',
      trainerNameAr: 'الكوتش مايا ل.'
    });
    num++;
  }

  // 3. Yoga (6)
  for (let i = 0; i < 6; i++) {
    const item = YOGA_30_TITLES[i];
    const duration = level === 'beginner' ? 18 : level === 'intermediate' ? 22 : 25;
    list.push({
      id: `sports_${level}_integrated_v${num}`,
      videoNumber: num,
      title: item.en,
      titleAr: item.ar,
      category: 'Yoga',
      categoryAr: 'اليوغا والمرونة',
      level,
      levelLabelEn: levelInfo.titleEn,
      levelLabelAr: levelInfo.titleAr,
      duration: `${duration} min`,
      durationAr: `${duration} دقيقة`,
      durationMinutes: duration,
      imageUrl: yogaImages[i % yogaImages.length],
      shortDescription: 'Restorative yoga to improve flexibility, ease back tension, and balance hormones.',
      shortDescriptionAr: 'يوغا هادئة لتعزيز المرونة وتخفيف آلام الظهر ودعم التوازن الهرموني.',
      benefits: ['Flexibility', 'Mobility', 'Relaxation', 'Balance'],
      benefitsAr: ['المرونة العالية', 'حركية المفاصل', 'الاسترخاء', 'التوازن البدني'],
      trainerName: 'Yogi Amira K.',
      trainerNameAr: 'المدربة أميرة ك.'
    });
    num++;
  }

  // 4. Meditation (6)
  for (let i = 0; i < 6; i++) {
    const item = MEDITATION_30_TITLES[i];
    const duration = level === 'beginner' ? 12 : level === 'intermediate' ? 15 : 20;
    list.push({
      id: `sports_${level}_integrated_v${num}`,
      videoNumber: num,
      title: item.en,
      titleAr: item.ar,
      category: 'Meditation',
      categoryAr: 'التأمل والاسترخاء',
      level,
      levelLabelEn: levelInfo.titleEn,
      levelLabelAr: levelInfo.titleAr,
      duration: `${duration} min`,
      durationAr: `${duration} دقيقة`,
      durationMinutes: duration,
      imageUrl: meditationImages[i % meditationImages.length],
      shortDescription: 'Guided meditation and breathwork to reduce cortisol, calm the mind, and improve sleep.',
      shortDescriptionAr: 'جلسة تأمل وتنفس عميق لخفض الكورتيزول وتهدئة العقل وتحسين جودة النوم.',
      benefits: ['Calm', 'Mental Clarity', 'Stress Relief', 'Sleep Quality'],
      benefitsAr: ['الهدوء النفسي', 'صفاء الذهن', 'تخفيف التوتر', 'جودة النوم'],
      trainerName: 'Dr. Yasmine N.',
      trainerNameAr: 'د. ياسمين ن.'
    });
    num++;
  }

  return list;
}

// Helper to generate 30 specialized videos for a single category
function generateSpecializedVideos(
  level: SportsLevel,
  category: SportsCategory
): SportsVideo[] {
  const levelInfo = SPORTS_PROGRAM_TIERS.find((t) => t.id === level)!;
  const list: SportsVideo[] = [];

  let titles = YOGA_30_TITLES;
  let categoryAr = 'اليوغا والمرونة';
  let images = yogaImages;
  let trainerEn = 'Yogi Amira K.';
  let trainerAr = 'المدربة أميرة ك.';
  let defaultDuration = level === 'beginner' ? 20 : level === 'intermediate' ? 25 : 30;
  let benefits = ['Flexibility', 'Mobility', 'Relaxation', 'Hormonal Balance'];
  let benefitsAr = ['المرونة العالية', 'حركية المفاصل', 'الاسترخاء', 'التوازن الهرموني'];

  if (category === 'Dance & Zumba') {
    titles = DANCE_30_TITLES;
    categoryAr = 'الرقص والزومبا';
    images = danceZumbaImages;
    trainerEn = 'Coach Maya L.';
    trainerAr = 'الكوتش مايا ل.';
    benefits = ['Cardio Fitness', 'Rhythm', 'Endorphins', 'Calorie Burn'];
    benefitsAr = ['اللياقة القلبية', 'الإيقاع الحركي', 'هرمونات السعادة', 'حرق السعرات'];
  } else if (category === 'Home Workouts') {
    titles = HOME_30_TITLES;
    categoryAr = 'تمارين منزلية';
    images = homeWorkoutImages;
    trainerEn = 'Coach Sarah L.';
    trainerAr = 'الكوتش سارة ل.';
    benefits = ['Strength', 'Core Toning', 'Metabolism', 'Insulin Sensitivity'];
    benefitsAr = ['القوة العضلية', 'شد البطن', 'تنشيط الحرق', 'حساسية الإنسولين'];
  } else if (category === 'Meditation') {
    titles = MEDITATION_30_TITLES;
    categoryAr = 'التأمل والاسترخاء';
    images = meditationImages;
    trainerEn = 'Dr. Yasmine N.';
    trainerAr = 'د. ياسمين ن.';
    defaultDuration = level === 'beginner' ? 15 : level === 'intermediate' ? 18 : 22;
    benefits = ['Cortisol Lowering', 'Mind Calm', 'Deep Sleep', 'Inner Peace'];
    benefitsAr = ['خفض الكورتيزول', 'هدوء الذهن', 'النوم العميق', 'السكينة الداخلية'];
  }

  for (let i = 0; i < 30; i++) {
    const item = titles[i] || titles[i % titles.length];
    const num = i + 1;
    list.push({
      id: `sports_${level}_${category.toLowerCase().replace(/[^a-z]/g, '')}_v${num}`,
      videoNumber: num,
      title: item.en,
      titleAr: item.ar,
      category,
      categoryAr,
      level,
      levelLabelEn: levelInfo.titleEn,
      levelLabelAr: levelInfo.titleAr,
      duration: `${defaultDuration} min`,
      durationAr: `${defaultDuration} دقيقة`,
      durationMinutes: defaultDuration,
      imageUrl: images[i % images.length],
      shortDescription: `Session ${num} of 30 in the specialized ${category} program tailored for ${levelInfo.titleEn} level.`,
      shortDescriptionAr: `الحصة ${num} من 30 في برنامج ${categoryAr} المخصص للمستوى ${levelInfo.titleAr}.`,
      benefits,
      benefitsAr,
      trainerName: trainerEn,
      trainerNameAr: trainerAr
    });
  }

  return list;
}

// All program definitions per level (1 Integrated + 4 Specialized per level)
export function getProgramDefinitions(level: SportsLevel): SportsProgramDefinition[] {
  const levelTier = SPORTS_PROGRAM_TIERS.find((t) => t.id === level)!;

  return [
    // 1. Integrated Program
    {
      id: `${level}_integrated`,
      level,
      variety: 'integrated',
      titleEn: `${levelTier.titleEn} Integrated Program`,
      titleAr: `برنامج ${levelTier.titleAr} المتكامل`,
      badge: '🌟',
      isSpecialized: false,
      videosCount: 30,
      priceDzd: 1200,
      shortDescriptionEn: 'All-in-one comprehensive program combining home workouts, dance & zumba, yoga, and meditation.',
      shortDescriptionAr: 'برنامج شامل ومتوازن يجمع كل أنواع الرياضة: تمارين منزلية (10)، رقص وزومبا (8)، يوغا (6)، وتأمل (6).',
      fullDescriptionEn: 'Move, feel stronger and enjoy a healthier lifestyle with workouts designed for every level. Includes progressive sessions across 4 sports disciplines.',
      fullDescriptionAr: 'تحركي، كوني أكثر قوة واستمتعي بنمط حياة صحي مع برنامج تدريبي متكامل يجمع بين القوة والمرونة والبهجة والاسترخاء لمساعدتكِ على الانتظام.',
      whatsIncludedEn: [
        '30 workout videos',
        'Home workouts (10 videos)',
        'Dance & Zumba (8 videos)',
        'Yoga (6 videos)',
        'Meditation (6 videos)',
        'Progressive sessions'
      ],
      whatsIncludedAr: [
        '30 فيديو تمرين تدريبي',
        'تمارين منزلية (10 فيديوهات)',
        'تمارين الرقص والزومبا (8 فيديوهات)',
        'تمارين اليوغا والمرونة (6 فيديوهات)',
        'جلسات التأمل والاسترخاء (6 فيديوهات)',
        'حصص تدريجية ومتنوعة'
      ],
      breakdown: {
        homeWorkouts: 10,
        danceZumba: 8,
        yoga: 6,
        meditation: 6
      },
      accentColor: '#D81B60'
    },

    // 2. Specialized Yoga Program
    {
      id: `${level}_yoga`,
      level,
      variety: 'yoga',
      category: 'Yoga',
      titleEn: `${levelTier.titleEn} Yoga & Flexibility Program`,
      titleAr: `برنامج اليوغا والمرونة (${levelTier.titleAr})`,
      badge: '🧘',
      isSpecialized: true,
      videosCount: 30,
      priceDzd: 1200,
      shortDescriptionEn: '30 dedicated restorative yoga and flexibility sessions to relieve tension and support hormones.',
      shortDescriptionAr: '30 فيديو يوغا كامل وتدريجي لتعزيز المرونة وفتح الحوض وتخفيف التوتر وإعادة التوازن الهرموني.',
      fullDescriptionEn: 'A focused 30-day gentle yoga journey designed to relieve stress, enhance hip & spine mobility, and nurture hormonal harmony at your own pace.',
      fullDescriptionAr: 'برنامج مخصص بالكامل لرياضة اليوغا والمرونة يحتوي على 30 حصة متدرجة لتخفيف آلام الظهر، تحسين استقامة القامة وتهدئة التوتر العصبي.',
      whatsIncludedEn: [
        '30 specialized Yoga videos',
        'Morning & evening hormone flows',
        'Pelvic & hip mobility release',
        'Spine & posture alignment',
        'Guided breathwork integration',
        'Zero complex gear needed'
      ],
      whatsIncludedAr: [
        '30 فيديو يوغا متخصص ومتدرج',
        'جلسات يوغا صباحية ومسائية لتنظيم الهرمونات',
        'تمارين فتح الحوض ومرونة المفاصل',
        'تحسين استقامة العمود الفقري وتخفيف الآلام',
        'دمج التنفس العميق والاسترخاء الختامي',
        'مناسبة للمنزل بدون أي معدات معقدة'
      ],
      accentColor: '#8B5CF6'
    },

    // 3. Specialized Dance & Zumba Program
    {
      id: `${level}_dance`,
      level,
      variety: 'dance',
      category: 'Dance & Zumba',
      titleEn: `${levelTier.titleEn} Dance & Zumba Program`,
      titleAr: `برنامج الرقص والزومبا (${levelTier.titleAr})`,
      badge: '💃',
      isSpecialized: true,
      videosCount: 30,
      priceDzd: 1200,
      shortDescriptionEn: '30 high-energy rhythmic dance and zumba workouts to burn calories and boost endorphins.',
      shortDescriptionAr: '30 فيديو كارديو ورقص وزومبا لحرق السعرات ورفع هرمونات السعادة بحيوية ومرح.',
      fullDescriptionEn: 'An exhilarating 30-video dance fitness program featuring Latin rhythms, oriental moves, and upbeat cardio that makes exercise feel like a celebration.',
      fullDescriptionAr: 'برنامج مخصص بالكامل للرقص والزومبا يضم 30 حصة إيقاعية مبهجة تجمع بين السالسا، الزومبا، والرقص الشرقي اللطيف لحرق الدهون ورفع اللياقة.',
      whatsIncludedEn: [
        '30 specialized Dance & Zumba videos',
        'Fun Latin, oriental & pop choreography',
        'Low & medium impact cardio options',
        'Waist & core toning through dance',
        'Endorphin-boosting playlists',
        'Progressive steps for all fitness levels'
      ],
      whatsIncludedAr: [
        '30 فيديو رقص وزومبا متخصص',
        'حركات إيقاعية ممتعة وسهلة المتابعة',
        'كارديو لحرق السعرات مع الحفاظ على المفاصل',
        'شد الخصر ونحت القوام مع الحركة',
        'رفع فوري لهرمونات السعادة والمزاج الإيجابي',
        'خطوات تدريجية تناسب جميع المستويات'
      ],
      accentColor: '#EC4899'
    },

    // 4. Specialized Home Workouts Program
    {
      id: `${level}_home`,
      level,
      variety: 'home',
      category: 'Home Workouts',
      titleEn: `${levelTier.titleEn} Home Workouts Program`,
      titleAr: `برنامج التمارين المنزلية (${levelTier.titleAr})`,
      badge: '🏠',
      isSpecialized: true,
      videosCount: 30,
      priceDzd: 1200,
      shortDescriptionEn: '30 equipment-free bodyweight workouts for muscle tone, insulin sensitivity, and posture.',
      shortDescriptionAr: '30 فيديو تمارين منزلية متكاملة لشد القوام، تقوية العضلات وتنشيط الحرق بدون أجهزة.',
      fullDescriptionEn: 'A targeted 30-workout bodyweight routine that sculpts lean muscle, boosts metabolic rate, and supports insulin balance safely at home.',
      fullDescriptionAr: 'برنامج مخصص للتمارين المنزلية يضم 30 حصة متدرجة تركز على القوة الوظيفية، نحت الأرداف والبطن، وتحفيز حساسية الإنسولين بأمان تام.',
      whatsIncludedEn: [
        '30 specialized Home Workout videos',
        'Zero equipment needed (bodyweight)',
        'Joint-friendly low impact circuits',
        'Glute, core and upper body sculpt',
        'Metabolic resistance routines',
        'Postural alignment & strength'
      ],
      whatsIncludedAr: [
        '30 فيديو تمارين منزلية متخصصة',
        'بدون أي أجهزة (الاعتماد على وزن الجسم)',
        'دوائر تدريبية آمنة على المفاصل والركبتين',
        'نحت عضلات البطن والأرداف والذراعين',
        'تنشيط الحرق ومقاومة الإنسولين',
        'بناء القوة الوظيفية وتحسين النشاط اليومي'
      ],
      accentColor: '#10B981'
    },

    // 5. Specialized Meditation Program
    {
      id: `${level}_meditation`,
      level,
      variety: 'meditation',
      category: 'Meditation',
      titleEn: `${levelTier.titleEn} Meditation & Calm Program`,
      titleAr: `برنامج التأمل والاسترخاء (${levelTier.titleAr})`,
      badge: '🌿',
      isSpecialized: true,
      videosCount: 30,
      priceDzd: 1200,
      shortDescriptionEn: '30 guided meditation and breathwork sessions to lower cortisol, dissolve stress, and restore sleep.',
      shortDescriptionAr: '30 جلسة تأمل وتنفس عميق متخصصة لخفض هرمون الكورتيزول وتفريغ الضغط النفسي وتحسين النوم.',
      fullDescriptionEn: 'A tranquil 30-session mindfulness and breathwork sanctuary scientifically crafted to soothe adrenal stress and enhance mental peace.',
      fullDescriptionAr: 'برنامج مخصص بالكامل للتأمل والاسترخاء يضم 30 جلسة موجهة لتهدئة العصب الحائر، تفريغ القلق اليومي، ومساعدة الجسم على الشفاء الذاتي.',
      whatsIncludedEn: [
        '30 specialized guided Meditation sessions',
        'Cortisol-lowering breathwork exercises',
        'Deep somatic body scans',
        'Bedtime restorative guides for deep sleep',
        'Self-compassion & positive mindset',
        'Short 10-15 minute daily rituals'
      ],
      whatsIncludedAr: [
        '30 جلسة تأمل وتنفس موجهة',
        'تمارين خفض هرمون الكورتيزول والتوتر',
        'تقنيات المسح الجسدي وإرخاء العضلات',
        'جلسات ما قبل النوم لعلاج الأرق والنوم العميق',
        'تعزيز حب الذات والامتنان والراحة النفسية',
        'جلسات يومية مريحة من 10 إلى 15 دقيقة'
      ],
      accentColor: '#06B6D4'
    }
  ];
}

// Map cache for program videos
const VIDEOS_CACHE: Record<string, SportsVideo[]> = {};

export function getProgramVideos(level: SportsLevel, variety: ProgramVariety): SportsVideo[] {
  const key = `${level}_${variety}`;
  if (VIDEOS_CACHE[key]) {
    return VIDEOS_CACHE[key];
  }

  let videos: SportsVideo[] = [];
  if (variety === 'integrated') {
    videos = generateIntegratedVideos(level);
  } else if (variety === 'yoga') {
    videos = generateSpecializedVideos(level, 'Yoga');
  } else if (variety === 'dance') {
    videos = generateSpecializedVideos(level, 'Dance & Zumba');
  } else if (variety === 'home') {
    videos = generateSpecializedVideos(level, 'Home Workouts');
  } else if (variety === 'meditation') {
    videos = generateSpecializedVideos(level, 'Meditation');
  } else {
    videos = generateIntegratedVideos(level);
  }

  VIDEOS_CACHE[key] = videos;
  return videos;
}

// Backwards compatibility dictionary
export const ALL_SPORTS_VIDEOS: Record<SportsLevel, SportsVideo[]> = {
  beginner: getProgramVideos('beginner', 'integrated'),
  intermediate: getProgramVideos('intermediate', 'integrated'),
  advanced: getProgramVideos('advanced', 'integrated')
};
