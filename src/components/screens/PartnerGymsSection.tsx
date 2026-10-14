import React, { useState, useMemo } from 'react';
import {
  Dumbbell,
  MapPin,
  Calendar,
  Clock,
  User,
  Phone,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  ArrowLeft,
  Search,
  Sparkles,
  Check,
  CheckCircle2,
  X,
  CreditCard,
  Smartphone,
  Navigation,
  Send,
  Building,
  Heart,
  Zap,
  Flame,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { usePcos } from '../../context/PcosContext';
import {
  PartnerGym,
  GymGroupClass,
  PARTNER_GYMS_DATA,
  GYM_ACTIVITIES_FILTERS,
  GymPartnerApplication
} from '../../data/partnerGymsData';

const InstagramIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const FacebookIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

export const PartnerGymsSection: React.FC = () => {
  const { language } = usePcos();
  const isAr = language === 'AR';

  // State
  const [selectedGym, setSelectedGym] = useState<PartnerGym | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedActivity, setSelectedActivity] = useState<string>('All');

  // Checkout modal state
  const [checkoutModalOpen, setCheckoutModalOpen] = useState<boolean>(false);
  const [subscribingGym, setSubscribingGym] = useState<PartnerGym | null>(null);
  const [subscribingClass, setSubscribingClass] = useState<GymGroupClass | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'edahabia' | 'cib' | 'baridimob'>('edahabia');
  const [checkoutSuccess, setCheckoutSuccess] = useState<boolean>(false);

  // Partner application modal state
  const [partnerModalOpen, setPartnerModalOpen] = useState<boolean>(false);
  const [partnerSubmitted, setPartnerSubmitted] = useState<boolean>(false);
  const [partnerForm, setPartnerForm] = useState<GymPartnerApplication>({
    gymName: '',
    managerName: '',
    phone: '',
    email: '',
    location: 'البليدة (Blida)',
    socialMedia: '',
    activities: ['Yoga', 'Pilates'],
    proposedClasses: 'حصص يوغا وبيلاتس مرتين في الأسبوع',
    monthlyPrice: '3,000 DA',
    classesPerWeek: '3 حصص أسبوعياً',
    message: ''
  });

  // Filtered Gyms
  const filteredGyms = useMemo(() => {
    return PARTNER_GYMS_DATA.filter((gym) => {
      const matchesActivity =
        selectedActivity === 'All' ||
        gym.activities.includes(selectedActivity as any);

      const q = searchQuery.trim().toLowerCase();
      if (!q) return matchesActivity;

      const matchesText =
        gym.nameEn.toLowerCase().includes(q) ||
        gym.nameAr.toLowerCase().includes(q) ||
        gym.locationEn.toLowerCase().includes(q) ||
        gym.locationAr.toLowerCase().includes(q) ||
        gym.neighborhood.toLowerCase().includes(q) ||
        gym.shortBioEn.toLowerCase().includes(q) ||
        gym.shortBioAr.toLowerCase().includes(q) ||
        gym.smopClasses.some(
          (c) =>
            c.titleEn.toLowerCase().includes(q) ||
            c.titleAr.toLowerCase().includes(q) ||
            c.coachNameEn.toLowerCase().includes(q) ||
            c.coachNameAr.toLowerCase().includes(q)
        );

      return matchesActivity && matchesText;
    });
  }, [selectedActivity, searchQuery]);

  // All SMOP Group Classes across all partner gyms
  const allSmopClasses = useMemo(() => {
    const list: Array<{ gym: PartnerGym; classItem: GymGroupClass }> = [];
    PARTNER_GYMS_DATA.forEach((gym) => {
      gym.smopClasses.forEach((cls) => {
        if (
          selectedActivity === 'All' ||
          cls.category === selectedActivity
        ) {
          list.push({ gym, classItem: cls });
        }
      });
    });
    return list;
  }, [selectedActivity]);

  // Open checkout modal
  const handleOpenCheckout = (gym: PartnerGym, classItem?: GymGroupClass) => {
    setSubscribingGym(gym);
    setSubscribingClass(classItem || null);
    setCheckoutSuccess(false);
    setCheckoutModalOpen(true);
  };

  const handleConfirmSubscription = () => {
    try {
      confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
    } catch (e) {}
    setCheckoutSuccess(true);
  };

  const handlePartnerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!partnerForm.gymName || !partnerForm.phone) return;
    setPartnerSubmitted(true);
  };

  // =========================================================================
  // VIEW: GYM DETAILS PAGE
  // =========================================================================
  if (selectedGym) {
    const gym = selectedGym;
    const gymName = isAr ? gym.nameAr : gym.nameEn;
    const location = isAr ? gym.locationAr : gym.locationEn;
    const address = isAr ? gym.addressAr : gym.addressEn;
    const workingHours = isAr ? gym.workingHoursAr : gym.workingHoursEn;
    const fullDesc = isAr ? gym.fullDescAr : gym.fullDescEn;

    return (
      <div className="space-y-6 animate-in fade-in duration-200" data-testid="gym-details-view">
        {/* Back Button & Top Badges */}
        <div className="flex items-center justify-between gap-3">
          <button
            onClick={() => setSelectedGym(null)}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white hover:bg-[#FFF0F6] border border-[#FFCEE3] text-[#D81B60] text-xs font-bold transition-colors shadow-2xs group"
          >
            {isAr ? (
              <>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                <span>العودة لقاعات الرياضة الشريكة</span>
              </>
            ) : (
              <>
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                <span>Back to Partner Gyms</span>
              </>
            )}
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#DDFFBB] text-emerald-900 border border-emerald-300 text-xs font-black shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>SMOP Partner</span>
          </div>
        </div>

        {/* Gym Cover Banner */}
        <div className="bg-white rounded-3xl border border-[#E2E8F0] overflow-hidden shadow-xs">
          <div className="relative h-56 sm:h-72 w-full bg-slate-900 overflow-hidden">
            <img
              src={gym.coverUrl}
              alt={gymName}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            {/* Location tag on top */}
            <div className="absolute top-4 start-4">
              <span className="bg-white/95 backdrop-blur-xs text-[#1E293B] text-xs font-black px-3 py-1 rounded-full shadow-md flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#D81B60]" />
                <span>{location}</span>
              </span>
            </div>

            {/* Bottom info on Cover */}
            <div className="absolute bottom-4 start-4 end-4 flex items-end justify-between gap-4 text-white">
              <div className="flex items-center gap-3.5">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white p-1 shadow-lg shrink-0 overflow-hidden border-2 border-white">
                  <img src={gym.logoUrl} alt={gymName} className="w-full h-full object-cover rounded-xl" />
                </div>
                <div>
                  <h1 className="text-lg sm:text-2xl font-black text-white leading-tight">
                    {gymName}
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-200 mt-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                    <span>{address}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Details & Actions */}
          <div className="p-5 sm:p-6 space-y-5">
            {/* Activities Tags */}
            <div className="flex items-center gap-2 flex-wrap">
              {gym.activities.map((act, idx) => (
                <span
                  key={idx}
                  className="bg-[#FFF0F6] text-[#D81B60] text-xs font-black px-3 py-1 rounded-full border border-[#FFCEE3]"
                >
                  {act}
                </span>
              ))}

              <span className="text-xs font-bold text-[#64748B] flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#D81B60]" />
                <span>{gym.totalWeeklyClasses} {isAr ? 'حصة أسبوعياً' : 'classes weekly'}</span>
              </span>
            </div>

            {/* Working hours & Description */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#FCF8F9] p-4 rounded-2xl border border-[#FFCEE3]/50 text-xs">
              <div>
                <span className="font-black text-[#1E293B] block mb-1 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#D81B60]" />
                  <span>{isAr ? 'أوقات العمل:' : 'Working Hours:'}</span>
                </span>
                <span className="text-[#475569] font-medium leading-relaxed block">
                  {workingHours}
                </span>
              </div>

              <div>
                <span className="font-black text-[#1E293B] block mb-1 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{isAr ? 'الهاتف والاستفسار:' : 'Contact Phone:'}</span>
                </span>
                <span className="text-[#475569] font-bold block">
                  {gym.phone}
                </span>
              </div>
            </div>

            {/* Full description */}
            <div className="space-y-1.5">
              <h3 className="text-sm font-black text-[#1E293B]">
                {isAr ? 'عن القاعة وبيئة التدريب:' : 'About the Gym & Facilities:'}
              </h3>
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                {fullDesc}
              </p>
            </div>

            {/* Monthly Subscription Banner (Customer sees 3,000 DA only!) */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#FFF5F9] via-white to-[#F0FFF4] border-2 border-[#FFCEE3] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#D81B60] block">
                  {isAr ? 'الاشتراك الموحد عبر SMOP DZ' : 'Direct SMOP DZ Membership'}
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-black text-[#1E293B]">3,000 DA</span>
                  <span className="text-xs sm:text-sm font-bold text-[#64748B]">/ {isAr ? 'شهر' : 'month'}</span>
                </div>
                <p className="text-xs text-[#64748B]">
                  {isAr
                    ? 'اشتراك شهري يتيح لكِ حضور الحصص الجماعية الشريكة في هذه القاعة مباشرة.'
                    : 'Monthly membership gives you full access to partner group classes at this gym.'}
                </p>
              </div>

              <button
                onClick={() => handleOpenCheckout(gym)}
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#D81B60] to-[#C2185B] text-white font-black text-xs sm:text-sm shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-2 shrink-0 transform hover:scale-101"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isAr ? 'اشتركي الآن — 3,000 دج / شهر' : 'Subscribe Now — 3,000 DA / month'}</span>
              </button>
            </div>

            {/* Quick Contact & Map Actions */}
            <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
              <a
                href={`tel:${gym.phone}`}
                className="flex-1 py-2.5 px-4 rounded-xl bg-white hover:bg-slate-50 text-[#1E293B] border border-[#E2E8F0] font-black text-xs transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#D81B60]" />
                <span>{isAr ? `اتصال هاتفي (${gym.phone})` : `Call Gym (${gym.phone})`}</span>
              </a>

              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(gym.mapQuery)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 px-4 rounded-xl bg-[#DDFFBB] hover:bg-[#c9f59f] text-emerald-900 border border-emerald-300 font-black text-xs transition-colors flex items-center justify-center gap-2"
              >
                <Navigation className="w-4 h-4 text-emerald-800" />
                <span>{isAr ? 'الموقع عبر الخريطة (Get Directions)' : 'Get Directions'}</span>
              </a>

              {gym.instagramUrl && (
                <a
                  href={gym.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-4 rounded-xl bg-white hover:bg-slate-50 text-[#1E293B] border border-[#E2E8F0] font-black text-xs transition-colors flex items-center justify-center gap-2"
                >
                  <InstagramIcon className="w-4 h-4 text-pink-600" />
                  <span>Instagram</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Weekly Classes Schedule (البرنامج الأسبوعي للحصص) */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E2E8F0] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-black text-base sm:text-lg text-[#1E293B] flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#D81B60]" />
                <span>{isAr ? 'البرنامج الأسبوعي لحصص SMOP الجماعية' : 'Weekly Class Schedule'}</span>
              </h3>
              <p className="text-xs text-[#64748B] mt-0.5">
                {isAr
                  ? 'حصص مخصصة بمجموعات نسائية لدعم التوازن الهرموني تحت إشراف مدربات معتمدات:'
                  : 'PCOS-adapted group sessions supervised by certified female coaches:'}
              </p>
            </div>

            <span className="text-xs font-black px-2.5 py-1 rounded-full bg-[#DDFFBB] text-emerald-900">
              3,000 DA / {isAr ? 'شهر' : 'month'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {gym.smopClasses.map((cls) => (
              <div
                key={cls.id}
                className="p-4 rounded-2xl bg-[#FCF8F9] border border-[#FFCEE3]/60 flex flex-col justify-between space-y-3 hover:border-[#D81B60]/50 transition-colors"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="bg-[#D81B60] text-white text-[10px] font-black px-2.5 py-0.5 rounded-md">
                      {cls.category}
                    </span>
                    <span className="text-[11px] font-bold text-[#D81B60] bg-white px-2 py-0.5 rounded-md border border-[#FFCEE3]">
                      {cls.durationMinutes} min
                    </span>
                  </div>

                  <h4 className="font-black text-sm text-[#1E293B]">
                    {isAr ? cls.titleAr : cls.titleEn}
                  </h4>

                  <div className="grid grid-cols-2 gap-2 text-[11px] text-[#475569] font-medium pt-1">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#D81B60]" />
                      <span>{isAr ? cls.daysAr : cls.daysEn}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#D81B60]" />
                      <span>{cls.timeAr}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{isAr ? cls.coachNameAr : cls.coachNameEn}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-amber-500" />
                      <span>{cls.sessionsPerWeek} {isAr ? 'حصص أسبوعياً' : 'classes/wk'}</span>
                    </div>
                  </div>

                  <p className="text-xs text-[#64748B] pt-1 leading-snug">
                    {isAr ? cls.descriptionAr : cls.descriptionEn}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#FFCEE3]/40 flex items-center justify-between gap-2">
                  <span className="text-[11px] font-bold text-emerald-800">
                    {isAr ? 'مشمول في الاشتراك' : 'Included in 3,000 DA'}
                  </span>

                  <button
                    onClick={() => handleOpenCheckout(gym, cls)}
                    className="px-3.5 py-1.5 rounded-xl bg-[#D81B60] hover:bg-[#C2185B] text-white font-black text-xs transition-colors flex items-center gap-1"
                  >
                    <span>{isAr ? 'اشتركي في هذه الحصة' : 'Join Class'}</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gallery */}
        {gym.galleryUrls.length > 0 && (
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E2E8F0] shadow-xs space-y-3">
            <h3 className="font-black text-base text-[#1E293B]">
              {isAr ? 'صور من داخل القاعة والمرافق:' : 'Gym Facilities Gallery:'}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {gym.galleryUrls.map((url, idx) => (
                <div key={idx} className="h-36 rounded-2xl overflow-hidden border border-[#E2E8F0]">
                  <img src={url} alt={`Gallery ${idx}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // =========================================================================
  // VIEW: MAIN PARTNER GYMS DIRECTORY & CLASSES
  // =========================================================================
  return (
    <div className="space-y-7 animate-in fade-in duration-200" data-testid="partner-gyms-view">
      {/* 1. Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-2 flex-wrap mb-1">
          <span className="bg-[#DDFFBB] text-emerald-950 border border-emerald-300 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-700" />
            <span>{isAr ? 'قاعات معتمدة • البليدة' : 'Verified Partner Gyms'}</span>
          </span>

          <span className="bg-[#FFCEE3]/60 text-[#D81B60] text-[10px] font-black px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <Dumbbell className="w-3 h-3" />
            <span>{isAr ? 'اشتراك موحد: 3,000 دج / شهر' : 'Fixed: 3,000 DA / month'}</span>
          </span>
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-[#1E293B] tracking-tight">
          {isAr ? 'قاعات الرياضة الشريكة' : 'Partner Gyms'}
        </h2>

        <p className="text-xs sm:text-sm text-[#64748B] max-w-2xl leading-relaxed">
          {isAr
            ? 'اكتشفي قاعات رياضية شريكة تقدم حصصًا جماعية متنوعة لدعم النشاط البدني ونمط الحياة الصحي.'
            : 'Discover partner gyms offering group classes tailored to support physical activity and hormonal wellness.'}
        </p>
      </div>

      {/* 2. How it works (كيف تعمل الخدمة؟) */}
      <div className="bg-gradient-to-r from-[#FFF5F9] via-white to-[#F0FFF4] p-4 sm:p-5 rounded-3xl border-2 border-[#FFCEE3] shadow-xs space-y-2.5">
        <span className="text-[10px] font-black uppercase tracking-wider text-[#D81B60] block">
          {isAr ? '🔄 كيف تعمل الخدمة؟' : '🔄 How It Works'}
        </span>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center text-xs font-bold text-[#1E293B]">
          <div className="p-2.5 rounded-2xl bg-white border border-[#FFCEE3]/60 flex flex-col items-center justify-center gap-1">
            <span className="w-6 h-6 rounded-full bg-[#FFCEE3] text-[#D81B60] flex items-center justify-center text-xs font-black">1</span>
            <span>{isAr ? 'اختاري القاعة' : 'Choose Gym'}</span>
          </div>

          <div className="p-2.5 rounded-2xl bg-white border border-[#FFCEE3]/60 flex flex-col items-center justify-center gap-1">
            <span className="w-6 h-6 rounded-full bg-[#FFCEE3] text-[#D81B60] flex items-center justify-center text-xs font-black">2</span>
            <span>{isAr ? 'اختاري الحصة' : 'Choose Class'}</span>
          </div>

          <div className="p-2.5 rounded-2xl bg-white border border-[#FFCEE3]/60 flex flex-col items-center justify-center gap-1">
            <span className="w-6 h-6 rounded-full bg-[#DDFFBB] text-emerald-900 flex items-center justify-center text-xs font-black">3</span>
            <span>{isAr ? 'اشتركي عبر SMOP DZ' : 'Subscribe via SMOP DZ'}</span>
          </div>

          <div className="p-2.5 rounded-2xl bg-white border border-[#FFCEE3]/60 flex flex-col items-center justify-center gap-1">
            <span className="w-6 h-6 rounded-full bg-[#DDFFBB] text-emerald-900 flex items-center justify-center text-xs font-black">4</span>
            <span>{isAr ? 'ابدئي حصصكِ الرياضية' : 'Start Workouts'}</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] text-[#64748B] pt-1">
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>{isAr ? 'الاشتراك الشهري موحد: 3,000 دج لجميع الحصص' : 'Monthly subscription: 3,000 DA for all group sessions'}</span>
          </span>
          <span className="font-bold text-[#D81B60]">
            {isAr ? 'حصري للنساء 100%' : '100% Women Only'}
          </span>
        </div>
      </div>

      {/* 3. Search and Activity Filters */}
      <div className="space-y-3">
        {/* Search */}
        <div className="relative">
          <div className="absolute inset-y-0 start-0 ps-3.5 flex items-center pointer-events-none text-[#64748B]">
            <Search className="w-4 h-4 text-[#D81B60]" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              isAr
                ? 'ابحثي باسم القاعة، الحي بالبليدة، الحصة (يوغا، بيلاتس، زومبا...) أو المدربة...'
                : 'Search by gym name, location in Blida, class type, or coach...'
            }
            className="w-full ps-10 pe-10 py-3 rounded-2xl bg-white border border-[#E2E8F0] focus:border-[#D81B60] focus:ring-2 focus:ring-[#FFCEE3]/50 text-xs sm:text-sm font-semibold text-[#1E293B] placeholder-[#94A3B8] shadow-2xs transition-all outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 end-0 pe-3.5 flex items-center text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Activity Chips */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {GYM_ACTIVITIES_FILTERS.map((act) => {
            const isActive = selectedActivity === act.id;
            return (
              <button
                key={act.id}
                onClick={() => setSelectedActivity(act.id)}
                className={`px-3.5 py-2 rounded-2xl text-xs font-black transition-all whitespace-nowrap flex items-center gap-1.5 shadow-2xs ${
                  isActive
                    ? 'bg-[#D81B60] text-white shadow-xs'
                    : 'bg-white text-[#64748B] hover:text-[#1E293B] border border-[#E2E8F0] hover:border-[#FFCEE3]'
                }`}
              >
                <span>{act.icon}</span>
                <span>{isAr ? act.labelAr : act.labelEn}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. PARTNER GYMS CARDS GRID */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-black text-base sm:text-lg text-[#1E293B]">
            {isAr ? 'قاعات الرياضة الشريكة في البليدة' : 'Partner Gyms in Blida'}
          </h3>
          <span className="text-xs text-[#64748B] font-semibold">
            {filteredGyms.length} {isAr ? 'قاعات شريكة' : 'gyms'}
          </span>
        </div>

        {filteredGyms.length === 0 ? (
          <div className="text-center py-10 bg-white rounded-3xl border border-[#E2E8F0] p-6 space-y-2">
            <Dumbbell className="w-8 h-8 text-[#D81B60] mx-auto opacity-70" />
            <h4 className="font-black text-sm text-[#1E293B]">
              {isAr ? 'لا توجد قاعات تطابق بحثكِ' : 'No partner gyms found'}
            </h4>
            <p className="text-xs text-[#64748B]">
              {isAr ? 'جربي اختيار نشاط آخر أو مسح حقل البحث.' : 'Try choosing a different activity filter.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {filteredGyms.map((gym) => {
              const gymName = isAr ? gym.nameAr : gym.nameEn;
              const location = isAr ? gym.locationAr : gym.locationEn;
              const shortBio = isAr ? gym.shortBioAr : gym.shortBioEn;

              return (
                <div
                  key={gym.id}
                  className="bg-white rounded-3xl border border-[#E2E8F0] hover:border-[#FFCEE3] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
                  data-testid={`gym-card-${gym.id}`}
                >
                  <div>
                    {/* Cover image */}
                    <div className="relative h-44 w-full overflow-hidden bg-slate-900">
                      <img
                        src={gym.coverUrl}
                        alt={gymName}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                      {/* Top Badges */}
                      <div className="absolute top-3 start-3">
                        <span className="bg-[#DDFFBB] text-emerald-950 text-[10px] font-black px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                          <ShieldCheck className="w-3 h-3 text-emerald-700" />
                          <span>SMOP Partner</span>
                        </span>
                      </div>

                      <div className="absolute top-3 end-3">
                        <span className="bg-white/95 text-[#1E293B] text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-xs flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#D81B60]" />
                          <span>{gym.neighborhood}</span>
                        </span>
                      </div>

                      {/* Logo & Name on Image */}
                      <div className="absolute bottom-3 start-3 end-3 flex items-center gap-2.5 text-white">
                        <div className="w-10 h-10 rounded-xl bg-white p-0.5 shadow-md shrink-0 overflow-hidden border border-white">
                          <img src={gym.logoUrl} alt={gymName} className="w-full h-full object-cover rounded-lg" />
                        </div>
                        <h4 className="font-black text-sm text-white drop-shadow-sm truncate">
                          {gymName}
                        </h4>
                      </div>
                    </div>

                    {/* Body */}
                    <div className="p-4 space-y-2.5">
                      {/* Activities */}
                      <div className="flex items-center gap-1 flex-wrap">
                        {gym.activities.slice(0, 3).map((act, idx) => (
                          <span
                            key={idx}
                            className="bg-[#FFF0F6] text-[#D81B60] text-[10px] font-black px-2 py-0.5 rounded-md"
                          >
                            {act}
                          </span>
                        ))}
                        {gym.activities.length > 3 && (
                          <span className="text-[10px] text-[#64748B] font-bold">
                            +{gym.activities.length - 3}
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-[#64748B] line-clamp-2 leading-relaxed">
                        {shortBio}
                      </p>

                      <div className="pt-1 flex items-center justify-between text-[11px] text-[#475569] font-bold border-t border-[#F1F5F9]">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#D81B60]" />
                          <span>{location}</span>
                        </span>

                        <span className="text-emerald-700">
                          {gym.totalWeeklyClasses} {isAr ? 'حصة/أسبوع' : 'classes/wk'}
                        </span>
                      </div>

                      {/* Monthly Subscription Price Display */}
                      <div className="pt-2 border-t border-[#F1F5F9] flex items-center justify-between">
                        <div>
                          <span className="text-[10px] font-bold text-[#64748B] block">
                            {isAr ? 'سعر الاشتراك الشهري:' : 'Monthly Subscription:'}
                          </span>
                          <span className="text-sm font-black text-[#D81B60]">
                            3,000 DA <span className="text-[10px] text-[#64748B]">/ {isAr ? 'شهر' : 'mo'}</span>
                          </span>
                        </div>

                        {gym.instagramUrl && (
                          <a
                            href={gym.instagramUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-slate-50 hover:bg-[#FFF0F6] text-pink-600 transition-colors"
                            title="Instagram"
                          >
                            <InstagramIcon className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="p-4 pt-0 space-y-2">
                    <button
                      onClick={() => setSelectedGym(gym)}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#D81B60] to-[#C2185B] text-white font-black text-xs shadow-xs hover:opacity-95 transition-all flex items-center justify-center gap-1.5"
                    >
                      <span>{isAr ? 'عرض القاعة والحصص (View Gym)' : 'View Gym'}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 5. 👩‍🦰 SMOP GROUP CLASSES SPOTLIGHT (حصص SMOP الجماعية) */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E2E8F0] shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-black text-base sm:text-lg text-[#1E293B] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#D81B60]" />
              <span>{isAr ? 'حصص SMOP الجماعية' : 'SMOP Group Classes'}</span>
            </h3>
            <p className="text-xs text-[#64748B] mt-0.5">
              {isAr
                ? 'استكشفي الحصص الجماعية الشريكة في البليدة المصممة لتنظيم الهرمونات وبناء النشاط الصحي:'
                : 'Explore partner group sessions across Blida, designed specifically for PCOS wellbeing:'}
            </p>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF0F6] border border-[#FFCEE3] text-[#D81B60] text-xs font-black">
            <span>{isAr ? '3,000 دج / شهر عبر التطبيق' : '3,000 DA / month via SMOP DZ'}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {allSmopClasses.map(({ gym, classItem }, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-[#FCF8F9] border border-[#FFCEE3]/60 flex flex-col justify-between space-y-3 hover:border-[#D81B60]/50 transition-colors"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="bg-[#D81B60] text-white text-[10px] font-black px-2.5 py-0.5 rounded-md">
                    {classItem.category}
                  </span>
                  <span className="text-[10px] font-bold text-[#64748B] bg-white px-2 py-0.5 rounded-md border border-[#E2E8F0]">
                    {gym.neighborhood}
                  </span>
                </div>

                <h4 className="font-black text-sm text-[#1E293B]">
                  {isAr ? classItem.titleAr : classItem.titleEn}
                </h4>

                <div className="text-[11px] text-[#475569] space-y-1 pt-1 font-medium">
                  <div className="flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-[#D81B60]" />
                    <span className="font-bold text-[#1E293B]">{isAr ? gym.nameAr : gym.nameEn}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    <span>{isAr ? classItem.daysAr : classItem.daysEn} • {classItem.timeAr}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    <span>{classItem.sessionsPerWeek} {isAr ? 'حصص أسبوعياً' : 'classes/wk'} ({classItem.durationMinutes} min)</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{isAr ? classItem.coachNameAr : classItem.coachNameEn}</span>
                  </div>
                </div>

                <p className="text-xs text-[#64748B] leading-snug line-clamp-2 pt-1">
                  {isAr ? classItem.descriptionAr : classItem.descriptionEn}
                </p>
              </div>

              <div className="pt-2 border-t border-[#FFCEE3]/40 flex items-center justify-between gap-2">
                <span className="text-xs font-black text-[#D81B60]">
                  3,000 DA <span className="text-[10px] font-normal text-[#64748B]">/ {isAr ? 'شهر' : 'mo'}</span>
                </span>

                <button
                  onClick={() => handleOpenCheckout(gym, classItem)}
                  className="px-3.5 py-1.5 rounded-xl bg-[#D81B60] hover:bg-[#C2185B] text-white font-black text-xs transition-colors flex items-center gap-1"
                >
                  <span>{isAr ? 'اشتركي الآن' : 'Subscribe'}</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6. JOIN AS PARTNER CTA (انضمي كشريكة) */}
      <div className="bg-gradient-to-br from-[#FFF5F9] via-white to-[#F0FFF4] rounded-3xl p-6 sm:p-8 border-2 border-[#FFCEE3] shadow-xs text-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-[#DDFFBB] text-emerald-800 flex items-center justify-center mx-auto shadow-2xs">
          <Dumbbell className="w-6 h-6" />
        </div>

        <div className="max-w-xl mx-auto space-y-1.5">
          <span className="text-[11px] font-black uppercase tracking-wider text-[#D81B60] block">
            Réseau Salles Partenaires Blida
          </span>
          <h3 className="text-lg sm:text-xl font-black text-[#1E293B]">
            {isAr ? 'أنتِ صاحبة أو مديرة قاعة رياضية في البليدة؟' : 'Do you own or manage a gym in Blida?'}
          </h3>
          <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed font-medium">
            {isAr
              ? 'انضمي كشريكة إلى شبكة قاعات SMOP DZ، وقدمي حصصكِ الرياضية النسائية أمام مجتمع متفاعل يبحث عن نشاط بدني آمن وداعم للصحة الهرمونية.'
              : 'Partner with SMOP DZ and offer your women-only classes to our growing community in Blida.'}
          </p>
        </div>

        <div>
          <button
            onClick={() => {
              setPartnerSubmitted(false);
              setPartnerModalOpen(true);
            }}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#D81B60] to-[#C2185B] text-white font-black text-xs shadow-md hover:opacity-95 transition-all inline-flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isAr ? 'انضمي كشريكة (Join as Partner Gym)' : 'Join as Partner Gym'}</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODAL: SUBSCRIPTION CHECKOUT (3,000 DA / month)                           */}
      {/* ========================================================================= */}
      {checkoutModalOpen && subscribingGym && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in"
          onClick={() => setCheckoutModalOpen(false)}
        >
          <div
            className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#E2E8F0] space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-[#F1F5F9]">
              <div>
                <h3 className="font-black text-base sm:text-lg text-[#1E293B]">
                  {isAr ? 'اشتراك قاعات الرياضة الشريكة' : 'Partner Gym Subscription'}
                </h3>
                <p className="text-xs text-[#64748B]">
                  {isAr ? 'اشتراك شهري عبر تطبيق SMOP DZ' : 'Direct Monthly Membership via SMOP DZ'}
                </p>
              </div>
              <button
                onClick={() => setCheckoutModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {checkoutSuccess ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-16 h-16 rounded-full bg-[#DDFFBB] text-emerald-800 flex items-center justify-center mx-auto text-3xl animate-bounce">
                  🎉
                </div>
                <h4 className="font-black text-lg text-[#1E293B]">
                  {isAr ? 'تم تفعيل اشتراككِ بنجاح!' : 'Subscription Activated!'}
                </h4>
                <p className="text-xs text-[#64748B] max-w-sm mx-auto leading-relaxed">
                  {isAr
                    ? `مرحباً بكِ في ${subscribingGym.nameAr}. يمكنكِ الآن التوجه للقاعة وإظهار بطاقتكِ في التطبيق لبدء حصصكِ الرياضية.`
                    : `Welcome! Your membership at ${subscribingGym.nameEn} is now active. Show your in-app pass at the gym counter to start your workouts.`}
                </p>

                <div className="p-3 bg-[#FCF8F9] rounded-2xl border border-[#FFCEE3]/60 text-xs font-bold text-[#1E293B] space-y-1">
                  <div className="flex justify-between">
                    <span>{isAr ? 'القاعة:' : 'Gym:'}</span>
                    <span className="text-[#D81B60]">{isAr ? subscribingGym.nameAr : subscribingGym.nameEn}</span>
                  </div>
                  {subscribingClass && (
                    <div className="flex justify-between">
                      <span>{isAr ? 'الحصة المختارة:' : 'Class:'}</span>
                      <span>{isAr ? subscribingClass.titleAr : subscribingClass.titleEn}</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-1 border-t border-[#E2E8F0]">
                    <span>{isAr ? 'المبلغ المدفوع:' : 'Amount Paid:'}</span>
                    <span className="text-emerald-700">3,000 DA</span>
                  </div>
                </div>

                <button
                  onClick={() => setCheckoutModalOpen(false)}
                  className="w-full py-3 rounded-2xl bg-[#D81B60] text-white font-black text-xs shadow-md"
                >
                  {isAr ? 'إغلاق ومتابعة الحصص' : 'Done'}
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Summary Box */}
                <div className="p-3.5 bg-[#FFF5F9] rounded-2xl border border-[#FFCEE3] space-y-1.5 text-xs">
                  <div className="flex justify-between text-[#64748B]">
                    <span>{isAr ? 'القاعة الشريكة:' : 'Partner Gym:'}</span>
                    <span className="font-black text-[#1E293B]">{isAr ? subscribingGym.nameAr : subscribingGym.nameEn}</span>
                  </div>
                  {subscribingClass && (
                    <div className="flex justify-between text-[#64748B]">
                      <span>{isAr ? 'الحصة الأساسية:' : 'Primary Class:'}</span>
                      <span className="font-bold text-[#D81B60]">{isAr ? subscribingClass.titleAr : subscribingClass.titleEn}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-[#64748B]">
                    <span>{isAr ? 'الوصول المتاح:' : 'Access:'}</span>
                    <span className="font-bold text-emerald-800">{isAr ? 'جميع الحصص الجماعية الشريكة' : 'All partner group classes'}</span>
                  </div>
                  <div className="flex justify-between text-sm pt-2 border-t border-[#FFCEE3]/60 font-black text-[#1E293B]">
                    <span>{isAr ? 'الاشتراك الشهري:' : 'Monthly Subscription:'}</span>
                    <span className="text-[#D81B60] text-base">3,000 DA</span>
                  </div>
                </div>

                {/* Payment method selector */}
                <div className="space-y-2">
                  <span className="text-xs font-black text-[#1E293B] block">
                    {isAr ? 'اختاري وسيلة الدفع (تجريبية):' : 'Select Payment Method:'}
                  </span>

                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedPaymentMethod('edahabia')}
                      className={`p-2.5 rounded-2xl border-2 text-center transition-all ${
                        selectedPaymentMethod === 'edahabia'
                          ? 'border-[#D81B60] bg-[#FFF0F6] text-[#D81B60]'
                          : 'border-[#E2E8F0] hover:border-[#FFCEE3] text-[#475569]'
                      }`}
                    >
                      <CreditCard className="w-5 h-5 mx-auto mb-1 text-amber-500" />
                      <span className="font-black text-xs block">Edahabia</span>
                      <span className="text-[9px] text-[#64748B] block">الذهبية</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedPaymentMethod('cib')}
                      className={`p-2.5 rounded-2xl border-2 text-center transition-all ${
                        selectedPaymentMethod === 'cib'
                          ? 'border-[#D81B60] bg-[#FFF0F6] text-[#D81B60]'
                          : 'border-[#E2E8F0] hover:border-[#FFCEE3] text-[#475569]'
                      }`}
                    >
                      <CreditCard className="w-5 h-5 mx-auto mb-1 text-[#D81B60]" />
                      <span className="font-black text-xs block">CIB</span>
                      <span className="text-[9px] text-[#64748B] block">بنكية</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedPaymentMethod('baridimob')}
                      className={`p-2.5 rounded-2xl border-2 text-center transition-all ${
                        selectedPaymentMethod === 'baridimob'
                          ? 'border-[#D81B60] bg-[#FFF0F6] text-[#D81B60]'
                          : 'border-[#E2E8F0] hover:border-[#FFCEE3] text-[#475569]'
                      }`}
                    >
                      <Smartphone className="w-5 h-5 mx-auto mb-1 text-emerald-600" />
                      <span className="font-black text-xs block">BaridiMob</span>
                      <span className="text-[9px] text-[#64748B] block">بريدي موب</span>
                    </button>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleConfirmSubscription}
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#D81B60] to-[#C2185B] text-white font-black text-xs shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-2"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>{isAr ? 'تأكيد الاشتراك — 3,000 دج / شهر' : 'Confirm Subscription — 3,000 DA'}</span>
                  </button>

                  <p className="text-[10px] text-center text-[#64748B] mt-2">
                    {isAr ? 'محاكاة تجريبية Prototype — لا يتم خصم أي أموال حقيقية.' : 'Interactive Prototype — no real money charged.'}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: PARTNER APPLICATION FOR GYMS (انضمي كشريكة)                        */}
      {/* ========================================================================= */}
      {partnerModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in"
          onClick={() => setPartnerModalOpen(false)}
        >
          <div
            className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-[#E2E8F0] max-h-[90vh] overflow-y-auto space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-[#F1F5F9]">
              <div>
                <h3 className="font-black text-base sm:text-lg text-[#1E293B]">
                  {isAr ? 'طلب انضمام قاعة رياضية شريكة' : 'Partner Gym Application'}
                </h3>
                <p className="text-xs text-[#64748B]">
                  {isAr ? 'مخصص للمسؤولات عن القاعات الرياضية النسائية في البليدة' : 'For gym managers in Blida'}
                </p>
              </div>
              <button
                onClick={() => setPartnerModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {partnerSubmitted ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-14 h-14 rounded-full bg-[#DDFFBB] text-emerald-800 flex items-center justify-center mx-auto text-2xl">
                  ✓
                </div>
                <h4 className="font-black text-base text-[#1E293B]">
                  {isAr ? 'تم استلام طلب الشراكة بنجاح!' : 'Application Received!'}
                </h4>
                <p className="text-xs text-[#64748B] max-w-sm mx-auto leading-relaxed">
                  {isAr
                    ? 'شكراً لتواصلكم معنا. سيتصل بكم فريق SMOP DZ بالبليدة لترتيب زيارة ميدانية وإدراج الحصص في التطبيق.'
                    : 'Thank you! Our partnership team in Blida will contact you shortly to finalize schedule setup.'}
                </p>
                <button
                  onClick={() => setPartnerModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-[#D81B60] text-white font-black text-xs"
                >
                  {isAr ? 'إغلاق' : 'Close'}
                </button>
              </div>
            ) : (
              <form onSubmit={handlePartnerSubmit} className="space-y-3">
                <div>
                  <label className="text-xs font-black text-[#1E293B] block mb-1">
                    {isAr ? 'اسم القاعة الرياضية *' : 'Gym Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={partnerForm.gymName}
                    onChange={(e) => setPartnerForm({ ...partnerForm, gymName: e.target.value })}
                    placeholder={isAr ? 'مثال: نادي الأمل للرشاقة' : 'e.g. Hope Fitness Club'}
                    className="w-full text-xs font-bold px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] focus:border-[#D81B60] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-black text-[#1E293B] block mb-1">
                      {isAr ? 'اسم المسؤولة / المديرة *' : 'Manager / Director Name *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={partnerForm.managerName}
                      onChange={(e) => setPartnerForm({ ...partnerForm, managerName: e.target.value })}
                      placeholder={isAr ? 'الاسم واللقب' : 'Full Name'}
                      className="w-full text-xs font-bold px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] focus:border-[#D81B60] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-black text-[#1E293B] block mb-1">
                      {isAr ? 'رقم الهاتف *' : 'Phone Number *'}
                    </label>
                    <input
                      type="tel"
                      required
                      value={partnerForm.phone}
                      onChange={(e) => setPartnerForm({ ...partnerForm, phone: e.target.value })}
                      placeholder="0550 12 34 56"
                      className="w-full text-xs font-bold px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] focus:border-[#D81B60] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-black text-[#1E293B] block mb-1">
                      {isAr ? 'البريد الإلكتروني' : 'Email Address'}
                    </label>
                    <input
                      type="email"
                      value={partnerForm.email}
                      onChange={(e) => setPartnerForm({ ...partnerForm, email: e.target.value })}
                      placeholder="gym@example.com"
                      className="w-full text-xs font-bold px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] focus:border-[#D81B60] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-black text-[#1E293B] block mb-1">
                      {isAr ? 'الموقع بالبليدة' : 'Location in Blida'}
                    </label>
                    <input
                      type="text"
                      value={partnerForm.location}
                      onChange={(e) => setPartnerForm({ ...partnerForm, location: e.target.value })}
                      placeholder={isAr ? 'الحي / الشارع' : 'Street / District'}
                      className="w-full text-xs font-bold px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] focus:border-[#D81B60] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-black text-[#1E293B] block mb-1">
                    {isAr ? 'رابط Instagram أو Facebook' : 'Social Media Link'}
                  </label>
                  <input
                    type="url"
                    value={partnerForm.socialMedia}
                    onChange={(e) => setPartnerForm({ ...partnerForm, socialMedia: e.target.value })}
                    placeholder="https://instagram.com/gym.blida"
                    className="w-full text-xs font-bold px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] focus:border-[#D81B60] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-black text-[#1E293B] block mb-1">
                    {isAr ? 'الأنشطة المتوفرة حالياً بالقاعة' : 'Available Activities'}
                  </label>
                  <div className="grid grid-cols-2 gap-1.5 text-xs">
                    {GYM_ACTIVITIES_FILTERS.filter((a) => a.id !== 'All').map((act) => {
                      const isChecked = partnerForm.activities.includes(act.id);
                      return (
                        <label
                          key={act.id}
                          className={`p-2 rounded-xl border flex items-center gap-1.5 cursor-pointer text-[11px] font-bold ${
                            isChecked
                              ? 'bg-[#FFF0F6] border-[#D81B60] text-[#D81B60]'
                              : 'bg-white border-[#E2E8F0] text-[#475569]'
                          }`}
                        >
                          <input
                            type="checkbox"
                            className="hidden"
                            checked={isChecked}
                            onChange={() => {
                              const next = isChecked
                                ? partnerForm.activities.filter((a) => a !== act.id)
                                : [...partnerForm.activities, act.id];
                              setPartnerForm({ ...partnerForm, activities: next });
                            }}
                          />
                          <span>{act.icon}</span>
                          <span>{isAr ? act.labelAr : act.labelEn}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-black text-[#1E293B] block mb-1">
                      {isAr ? 'الحصص المقترحة' : 'Proposed Classes'}
                    </label>
                    <input
                      type="text"
                      value={partnerForm.proposedClasses}
                      onChange={(e) => setPartnerForm({ ...partnerForm, proposedClasses: e.target.value })}
                      className="w-full text-xs font-bold px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] focus:border-[#D81B60] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-black text-[#1E293B] block mb-1">
                      {isAr ? 'عدد الحصص المقترحة في الأسبوع' : 'Classes Per Week'}
                    </label>
                    <input
                      type="text"
                      value={partnerForm.classesPerWeek}
                      onChange={(e) => setPartnerForm({ ...partnerForm, classesPerWeek: e.target.value })}
                      className="w-full text-xs font-bold px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] focus:border-[#D81B60] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-black text-[#1E293B] block mb-1">
                    {isAr ? 'رسالة أو ملاحظات إضافية' : 'Message'}
                  </label>
                  <textarea
                    rows={2}
                    value={partnerForm.message}
                    onChange={(e) => setPartnerForm({ ...partnerForm, message: e.target.value })}
                    placeholder={isAr ? 'أي معلومات تودين إضافتها بخصوص القاعة والتجهيزات...' : 'Additional details...'}
                    className="w-full text-xs font-bold px-3.5 py-2 rounded-xl border border-[#E2E8F0] focus:border-[#D81B60] focus:outline-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#D81B60] to-[#C2185B] text-white font-black text-xs shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isAr ? 'إرسال طلب الانضمام (Submit Application)' : 'Submit Application'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
