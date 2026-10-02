export interface AuthUser {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  wilaya?: string;
  age: number;
  height: number;
  weight: number;
  symptoms: string;
  pcosStatus?: 'diagnosed' | 'suspected' | 'seeking_wellness' | 'support';
  avatarUrl?: string;
  joinedDate: string;
}

export interface UserProfile {
  id: number;
  age: number;
  height: number; // in cm
  weight: number; // in kg
  symptoms: string; // Comma separated list
}

export interface CycleLog {
  id: number;
  dateString: string; // YYYY-MM-DD
  category: string; // "Period", "Ovulation" or "Symptom Log"
  notes: string;
}

export interface Reminder {
  id: number;
  title: string;
  time: string; // e.g. "08:30 AM" or "14:00"
  type: 'medication' | 'supplement' | 'appointment' | string;
  dateString?: string;
}

export interface ChatMessage {
  id: number;
  specialistName: string;
  sender: 'user' | 'specialist';
  text: string;
  timestamp: number;
}

export interface Article {
  id: string;
  titleEn: string;
  titleAr: string;
  categoryEn: string;
  categoryAr: string;
  readTimeEn: string;
  readTimeAr: string;
  contentEn: string;
  contentAr: string;
  imageUrl: string;
  authorEn: string;
  authorAr: string;
}

export interface Specialist {
  id: string;
  nameEn: string;
  nameAr: string;
  titleEn: string;
  titleAr: string;
  locationEn: string;
  locationAr: string;
  wilaya: string;
  rating: number;
  reviewsCount: number;
  avatarUrl: string;
  descriptionEn: string;
  descriptionAr: string;
}

export interface EcoStore {
  id: string;
  nameEn: string;
  nameAr: string;
  categoryEn: string; // "Healthy Bakeries", "Organic Dairy & Honey", "Natural Supplements"
  categoryAr: string;
  locationEn: string;
  locationAr: string;
  wilaya: string;
  phone: string;
  instagramUrl: string;
  imageUrl: string;
  hasAd?: boolean;
  adTextEn?: string;
  adTextAr?: string;
  promoEn?: string;
  promoAr?: string;
  mapUrl?: string;
  distanceKm: number;
  durationMin: number;
}

export interface ProgramRecipe {
  titleEn: string;
  titleAr: string;
  imageUrl: string;
  benefitEn: string;
  benefitAr: string;
  descEn: string;
  descAr: string;
}

export interface WellnessProgram {
  id: string;
  titleEn: string;
  titleAr: string;
  durationEn: string;
  durationAr: string;
  typeEn: string; // "Standard" or "Tailored - " + PCOS type
  typeAr: string;
  descriptionEn: string;
  descriptionAr: string;
  highlightsEn: string[];
  highlightsAr: string[];
  imageUrl: string;
  basePriceDzd: number;
  followUpPriceDzd?: number;
  recipes: ProgramRecipe[];
}

export interface WorkoutVideo {
  id: string;
  bundleId?: string;
  dayNumber?: number;
  isFreePreview?: boolean;
  titleEn: string;
  titleAr: string;
  categoryEn: string; // "Home Workouts", "Yoga & Meditation", "Dance & Zumba", "Pilates & Core"
  categoryAr: string;
  durationEn: string;
  durationAr: string;
  intensityEn: string;
  intensityAr: string;
  trainerEn: string;
  trainerAr: string;
  imageUrl: string;
  descriptionEn?: string;
  descriptionAr?: string;
}

export interface FitnessBundle {
  id: string;
  categoryKey: string;
  titleEn: string;
  titleAr: string;
  categoryEn: string;
  categoryAr: string;
  durationDays: number; // 30
  trialDays: number; // 3
  priceDzd: number; // 900
  imageUrl: string;
  descriptionEn: string;
  descriptionAr: string;
  highlightsEn: string[];
  highlightsAr: string[];
  trainerEn: string;
  trainerAr: string;
  intensityEn: string;
  intensityAr: string;
  sessionsCount: number;
}

export interface GymInfo {
  id: string;
  nameEn: string;
  nameAr: string;
  locationEn: string;
  locationAr: string;
  wilaya: string;
  phone: string;
  featureEn: string;
  featureAr: string;
  imageUrl: string;
}

export interface RecipeItem {
  id: string;
  titleEn: string;
  titleAr: string;
  categoryEn: string;
  categoryAr: string;
  prepTimeEn: string;
  prepTimeAr: string;
  calories: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
  hormonalBenefitEn: string;
  hormonalBenefitAr: string;
  ingredientsEn: string[];
  ingredientsAr: string[];
  stepsEn: string[];
  stepsAr: string[];
  imageUrl: string;
  isPackExclusive?: boolean; // part of the 30-recipe bundle
}

export type PaymentMethod = 'baridimob' | 'cib';

export interface PaymentItem {
  id: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  priceDzd: number;
  type: 'program_base' | 'program_followup' | 'recipe_pack' | 'kitchen_meal' | 'fitness_bundle';
}

export interface FoodMenuItem {
  id: string;
  nameEn: string;
  nameAr: string;
  descriptionEn: string;
  descriptionAr: string;
  priceDzd: number;
  imageUrl: string;
  categoryEn?: string; // "Traditional Tajines", "Keto Bakery", "Anti-Bloat Soups", "Healthy Sweets", "Hormonal Bowls"
  categoryAr?: string;
  calories?: number;
  prepTimeEn?: string;
  prepTimeAr?: string;
  isPopular?: boolean;
  availabilityType?: 'available_now' | 'preorder_7_12h';
}

export interface Reservation {
  id: number;
  cookId: string;
  cookBrandEn: string;
  cookBrandAr: string;
  customerName: string;
  customerPhone: string;
  itemsSummary: string;
  totalPriceDzd: number;
  reservationDate: string;
  reservationTime: string;
  notes: string;
  address?: string;
  paymentMethod?: string;
  orderType?: 'available_now' | 'preorder_7_12h';
  timestamp: number;
}

export interface HomeCook {
  id: string;
  brandEn: string;
  brandAr: string;
  cookNameEn: string;
  cookNameAr: string;
  specialtiesEn: string;
  specialtiesAr: string;
  contactNo?: string;
  instagramUrl?: string;
  deliveryTimeEn: string;
  deliveryTimeAr: string;
  preOrderNoticeEn?: string;
  preOrderNoticeAr?: string;
  imageUrl: string;
  rating: number;
  locationEn: string;
  locationAr: string;
  adTextEn: string;
  adTextAr: string;
  promoEn: string;
  promoAr: string;
  mapUrl: string;
  distanceKm: number;
  durationMin: number;
  menu: FoodMenuItem[];
}
