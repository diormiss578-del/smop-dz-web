import React, { useState } from 'react';
import {
  Play,
  Clock,
  Zap,
  User,
  Phone,
  MapPin,
  Lock,
  Unlock,
  CheckCircle2,
  X,
  Dumbbell,
  Sparkles,
  Gift,
  Calendar,
  CreditCard,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { usePcos } from '../../context/PcosContext';
import { WorkoutVideo, FitnessBundle } from '../../types';

export const FitnessScreen: React.FC = () => {
  const {
    language,
    fitnessBundles,
    workouts,
    localGyms,
    purchasedFitnessBundles,
    startFitnessTrial,
    isTrialActive,
    getTrialDaysRemaining,
    isBundleActive,
    startPayment
  } = usePcos();

  const isAr = language === 'AR';

  // Navigation tab within Fitness: 'bundles' | 'library' | 'gyms'
  const [activeTab, setActiveTab] = useState<'bundles' | 'library' | 'gyms'>('bundles');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeVideo, setActiveVideo] = useState<WorkoutVideo | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [expandedBundleId, setExpandedBundleId] = useState<string | null>(null);
  const [trialSuccessModal, setTrialSuccessModal] = useState<FitnessBundle | null>(null);

  const categories = [
    { id: 'All', en: 'All Categories', ar: 'جميع الفئات' },
    { id: 'Home Workouts', en: 'Home Workouts', ar: 'التمارين المنزلية' },
    { id: 'Yoga & Meditation', en: 'Yoga & Meditation', ar: 'اليوجا والتأمل' },
    { id: 'Dance & Zumba', en: 'Dance & Zumba', ar: 'الرقص والزومبا' },
    { id: 'Pilates & Core', en: 'Pilates & Core', ar: 'البيلاتيس وتنسيق القوام' }
  ];

  const filteredWorkouts = workouts.filter(w => {
    if (selectedCategory === 'All') return true;
    return w.categoryEn === selectedCategory;
  });

  const handleStartTrial = (bundle: FitnessBundle) => {
    startFitnessTrial(bundle.id);
    setTrialSuccessModal(bundle);
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleBuyBundle = (bundle: FitnessBundle) => {
    startPayment({
      id: bundle.id,
      titleEn: `${bundle.titleEn} (30-Day Full Access)`,
      titleAr: `${bundle.titleAr} (اشتراك 30 يوم كامل)`,
      descriptionEn: `30-Day structured progressive hormonal fitness plan with ${bundle.sessionsCount} video routines led by ${bundle.trainerEn}.`,
      descriptionAr: `برنامج رياضي هرموني متكامل لمدة 30 يوماً يتضمن ${bundle.sessionsCount} حصة فيديو موجهة من ${bundle.trainerAr}.`,
      priceDzd: bundle.priceDzd,
      type: 'fitness_bundle'
    });
  };

  const toggleExpandBundle = (id: string) => {
    setExpandedBundleId(prev => (prev === id ? null : id));
  };

  return (
    <div className="space-y-6 pb-20 animate-in fade-in duration-150" data-testid="fitness-screen-layout">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="bg-[#FFCEE3]/50 text-[#D81B60] text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
            <Dumbbell className="w-3 h-3" />
            {isAr ? 'اللياقة البدنية الآمنة للهرمونات' : 'Hormone-Safe Fitness'}
          </span>
          <span className="bg-[#DDFFBB] text-emerald-900 text-[10px] font-black px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <Gift className="w-3 h-3" />
            {isAr ? '3 أيام مجانية لكل حزمة' : '3 Days Free Trial'}
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-[#1E293B] tracking-tight">
          {isAr ? 'حزم التمارين الرياضية (30 يوم - 900 دج)' : 'PCOS 30-Day Workout Bundles (900 DZD)'}
        </h2>
        <p className="text-xs sm:text-sm text-[#64748B] mt-1">
          {isAr
            ? 'تم تقسيم الرياضة إلى حزم متخصصة حسب نوع التمارين: كل نوع له حزمة 30 يوم بسعر 900 دج مع 3 أيام تجربة مجانية بدون أي شروط.'
            : 'Structured into 30-day packages by workout type for 900 DZD with a 3-day complimentary trial.'}
        </p>
      </div>

      {/* Main Top Navigation Tabs */}
      <div className="bg-[#FCF8F9] p-1.5 rounded-2xl border border-[#E2E8F0] flex gap-1.5 shadow-2xs">
        <button
          onClick={() => setActiveTab('bundles')}
          className={`flex-1 py-2.5 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
            activeTab === 'bundles'
              ? 'bg-[#D81B60] text-white shadow-xs'
              : 'text-[#64748B] hover:text-[#1E293B]'
          }`}
        >
          <Gift className="w-4 h-4" />
          <span>{isAr ? 'حزم الـ 30 يوم (900 دج)' : '30-Day Bundles (900 DZD)'}</span>
        </button>

        <button
          onClick={() => setActiveTab('library')}
          className={`flex-1 py-2.5 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
            activeTab === 'library'
              ? 'bg-[#D81B60] text-white shadow-xs'
              : 'text-[#64748B] hover:text-[#1E293B]'
          }`}
        >
          <Play className="w-4 h-4" />
          <span>{isAr ? 'مكتبة الحصص اليومية' : 'Daily Sessions'}</span>
        </button>

        <button
          onClick={() => setActiveTab('gyms')}
          className={`flex-1 py-2.5 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
            activeTab === 'gyms'
              ? 'bg-[#D81B60] text-white shadow-xs'
              : 'text-[#64748B] hover:text-[#1E293B]'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>{isAr ? 'نوادي البليدة' : 'Blida Gyms'}</span>
        </button>
      </div>

      {/* ======================================================== */}
      {/* SECTION 1: 30-DAY PACKAGES (900 DZD + 3-DAY FREE TRIAL) */}
      {/* ======================================================== */}
      {activeTab === 'bundles' && (
        <div className="space-y-6 animate-in fade-in" data-testid="fitness-bundles-section">
          {/* Promo Highlight Banner */}
          <div className="bg-gradient-to-r from-rose-900 via-[#880E4F] to-[#4A148C] text-white rounded-3xl p-5 sm:p-6 shadow-md relative overflow-hidden">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex-1">
                <span className="bg-[#DDFFBB] text-emerald-950 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider inline-flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-emerald-700" />
                  {isAr ? 'فرصة التجريب المجاني' : 'Free Trial Offer'}
                </span>
                <h3 className="text-base sm:text-lg font-black mt-2 leading-snug">
                  {isAr
                    ? 'جربي أي نوع من التمارين مجاناً لمدة 3 أيام كاملة!'
                    : 'Try Any Workout Category Free for 3 Full Days!'}
                </h3>
                <p className="text-xs text-rose-100/90 mt-1 max-w-xl leading-relaxed">
                  {isAr
                    ? 'كل نوع من الرياضة (التمارين المنزلية، اليوجا، الزومبا، البيلاتيس) يتوفر بحزمة 30 يوماً متكاملة بسعر 900 دج فقط مع إمكانية الدفع المباشر عبر CIB أو بريدي موب.'
                    : 'Every category provides a targeted 30-day program for 900 DZD with 3 days free trial and local CIB / BaridiMob checkout.'}
                </p>
                <div className="flex items-center gap-3 mt-3 text-[11px] text-rose-200 flex-wrap">
                  <span className="flex items-center gap-1">
                    <Check className="w-3.5 h-3.5 text-[#DDFFBB]" />
                    {isAr ? '30 يوماً من الحصص المصورة' : '30 Daily Video Sessions'}
                  </span>
                  <span className="flex items-center gap-1">
                    <Check className="w-3.5 h-3.5 text-[#DDFFBB]" />
                    {isAr ? 'تمارين مصممة لخفض الكورتيزول' : 'Zero High-Cortisol Spikes'}
                  </span>
                  <span className="flex items-center gap-1">
                    <Check className="w-3.5 h-3.5 text-[#DDFFBB]" />
                    {isAr ? 'دفع آمن بريدي موب و CIB' : 'BaridiMob & CIB Accepted'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bundles Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {fitnessBundles.map(bundle => {
              const isPurchased = purchasedFitnessBundles.includes(bundle.id);
              const trialActive = isTrialActive(bundle.id);
              const daysLeft = getTrialDaysRemaining(bundle.id);
              const isExpanded = expandedBundleId === bundle.id;

              const title = isAr ? bundle.titleAr : bundle.titleEn;
              const desc = isAr ? bundle.descriptionAr : bundle.descriptionEn;
              const cat = isAr ? bundle.categoryAr : bundle.categoryEn;
              const trainer = isAr ? bundle.trainerAr : bundle.trainerEn;
              const intensity = isAr ? bundle.intensityAr : bundle.intensityEn;
              const highlights = isAr ? bundle.highlightsAr : bundle.highlightsEn;

              // Find videos associated with this bundle
              const bundleVideos = workouts.filter(w => w.bundleId === bundle.id || w.categoryEn === bundle.categoryKey);

              return (
                <div
                  key={bundle.id}
                  className="bg-white border border-[#E2E8F0] hover:border-[#D81B60]/40 rounded-3xl overflow-hidden shadow-xs transition-all flex flex-col justify-between"
                  data-testid={`bundle-card-${bundle.id}`}
                >
                  <div>
                    {/* Image Header with Badges */}
                    <div className="relative h-48 w-full overflow-hidden">
                      <img
                        src={bundle.imageUrl}
                        alt={title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

                      <div className="absolute top-3 start-3 flex gap-1.5 flex-wrap">
                        <span className="bg-[#D81B60] text-white text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-xs">
                          {cat}
                        </span>
                        <span className="bg-[#DDFFBB] text-emerald-950 text-[10px] font-black px-2 py-0.5 rounded-full shadow-xs flex items-center gap-1">
                          <Gift className="w-3 h-3" />
                          {isAr ? '3 أيام تجربة مجانية' : '3 Days Free'}
                        </span>
                      </div>

                      <div className="absolute top-3 end-3">
                        <span className="bg-white/95 backdrop-blur-xs text-[#1E293B] text-xs font-black px-3 py-1 rounded-xl shadow-xs border border-[#E2E8F0]">
                          {bundle.durationDays} {isAr ? 'يوماً' : 'Days'} • {bundle.priceDzd} DZD
                        </span>
                      </div>

                      <div className="absolute bottom-3 start-3 end-3 text-white">
                        <h3 className="font-black text-sm sm:text-base leading-tight">
                          {title}
                        </h3>
                        <p className="text-xs text-white/80 mt-0.5 flex items-center gap-2">
                          <span className="flex items-center gap-1">
                            <User className="w-3 h-3 text-[#FFCEE3]" />
                            {trainer}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Zap className="w-3 h-3 text-amber-300" />
                            {intensity}
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 space-y-4">
                      {/* Status Notification */}
                      {isPurchased ? (
                        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl p-3 flex items-center justify-between">
                          <div className="flex items-center gap-2 text-xs font-bold">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span>{isAr ? 'الحزمة مفعلة بحسابكِ بالكامل (30 يوماً) ✅' : 'Pack Fully Unlocked (30 Days) ✅'}</span>
                          </div>
                          <span className="text-[10px] bg-emerald-200/60 font-mono font-bold px-2 py-0.5 rounded-md">
                            CIB/BaridiMob
                          </span>
                        </div>
                      ) : trialActive ? (
                        <div className="bg-amber-50 border border-amber-200 text-amber-900 rounded-2xl p-3 flex items-center justify-between">
                          <div className="flex items-center gap-2 text-xs font-bold">
                            <Clock className="w-4 h-4 text-amber-600 animate-pulse" />
                            <span>
                              {isAr
                                ? `الفترة التجريبية نشطة (متبقي ${daysLeft} أيام مجانية) ⏳`
                                : `Free Trial Active (${daysLeft} days remaining) ⏳`}
                            </span>
                          </div>
                          <button
                            onClick={() => handleBuyBundle(bundle)}
                            className="text-[10px] bg-[#D81B60] hover:bg-[#C2185B] text-white font-black px-2.5 py-1 rounded-lg"
                          >
                            {isAr ? 'تفعيل 30 يوم (900 دج)' : 'Unlock 30-Day (900 DZD)'}
                          </button>
                        </div>
                      ) : (
                        <div className="bg-[#FCF8F9] border border-[#FFCEE3]/60 rounded-2xl p-3 flex items-center justify-between">
                          <div className="flex items-center gap-2 text-xs">
                            <Gift className="w-4 h-4 text-[#D81B60]" />
                            <span className="font-bold text-[#1E293B]">
                              {isAr ? 'تجربة مجانية متاحة فوراً لمدة 3 أيام' : 'Free 3-Day Trial Available'}
                            </span>
                          </div>
                          <span className="text-xs font-black text-[#D81B60]">
                            900 DZD / 30 {isAr ? 'يوم' : 'days'}
                          </span>
                        </div>
                      )}

                      <p className="text-xs text-[#64748B] leading-relaxed">
                        {desc}
                      </p>

                      {/* Highlights */}
                      <div className="space-y-1.5 bg-[#F8FAFC] rounded-2xl p-3 border border-[#E2E8F0]">
                        <span className="text-[10px] font-black text-[#1E293B] block uppercase tracking-wider mb-1">
                          {isAr ? 'مميزات هذا البرنامج الهرموني:' : 'Program Focus & Benefits:'}
                        </span>
                        {highlights.map((h, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-[#334155]">
                            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span className="text-[11px] leading-tight">{h}</span>
                          </div>
                        ))}
                      </div>

                      {/* Expandable Preview Sessions */}
                      <div>
                        <button
                          onClick={() => toggleExpandBundle(bundle.id)}
                          className="w-full flex items-center justify-between py-2 text-xs font-bold text-[#1E293B] hover:text-[#D81B60] border-t border-[#E2E8F0] pt-3"
                        >
                          <span className="flex items-center gap-1.5">
                            <Play className="w-3.5 h-3.5 text-[#D81B60]" />
                            <span>
                              {isAr
                                ? `جلسات وفيديوهات الحزمة (${bundleVideos.length} جلسة نموذجية معروضة)`
                                : `Bundle Video Schedule (${bundleVideos.length} sessions preview)`}
                            </span>
                          </span>
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>

                        {isExpanded && (
                          <div className="mt-3 space-y-2 animate-in fade-in">
                            {bundleVideos.map((video) => {
                              const canWatch = isPurchased || trialActive || video.isFreePreview;
                              return (
                                <div
                                  key={video.id}
                                  className="bg-white border border-[#E2E8F0] rounded-xl p-2.5 flex items-center justify-between gap-3 hover:border-[#D81B60]/40 transition-colors"
                                >
                                  <div className="flex items-center gap-2.5 min-w-0">
                                    <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0">
                                      <img
                                        src={video.imageUrl}
                                        alt={isAr ? video.titleAr : video.titleEn}
                                        className="w-full h-full object-cover"
                                      />
                                      <button
                                        onClick={() => {
                                          if (canWatch) {
                                            setActiveVideo(video);
                                            setIsPlaying(true);
                                          } else {
                                            handleStartTrial(bundle);
                                          }
                                        }}
                                        className="absolute inset-0 bg-black/30 flex items-center justify-center text-white"
                                      >
                                        <Play className="w-3.5 h-3.5 fill-current" />
                                      </button>
                                    </div>
                                    <div className="min-w-0">
                                      <div className="flex items-center gap-1.5">
                                        {video.dayNumber && (
                                          <span className="text-[9px] bg-[#FFCEE3]/50 text-[#D81B60] font-black px-1.5 py-0.2 rounded">
                                            {isAr ? `اليوم ${video.dayNumber}` : `Day ${video.dayNumber}`}
                                          </span>
                                        )}
                                        {video.isFreePreview && (
                                          <span className="text-[9px] bg-[#DDFFBB] text-emerald-900 font-bold px-1.5 py-0.2 rounded">
                                            {isAr ? 'تجربة مجانية' : 'Free Preview'}
                                          </span>
                                        )}
                                      </div>
                                      <h5 className="font-bold text-xs text-[#1E293B] truncate mt-0.5">
                                        {isAr ? video.titleAr : video.titleEn}
                                      </h5>
                                      <span className="text-[10px] text-[#64748B]">
                                        {isAr ? video.durationAr : video.durationEn}
                                      </span>
                                    </div>
                                  </div>

                                  <div>
                                    {canWatch ? (
                                      <button
                                        onClick={() => {
                                          setActiveVideo(video);
                                          setIsPlaying(true);
                                        }}
                                        className="px-2.5 py-1 bg-[#D81B60] hover:bg-[#C2185B] text-white rounded-lg text-[11px] font-bold shrink-0"
                                      >
                                        {isAr ? 'تشغيل' : 'Play'}
                                      </button>
                                    ) : (
                                      <button
                                        onClick={() => handleStartTrial(bundle)}
                                        className="px-2.5 py-1 bg-white border border-[#E2E8F0] hover:border-[#D81B60] text-[#D81B60] rounded-lg text-[11px] font-bold flex items-center gap-1 shrink-0"
                                      >
                                        <Lock className="w-3 h-3" />
                                        <span>{isAr ? 'بدء التجربة' : 'Trial'}</span>
                                      </button>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="p-5 pt-0 border-t border-[#E2E8F0] mt-3">
                    <div className="flex flex-col sm:flex-row items-center gap-2 pt-3">
                      {isPurchased ? (
                        <button
                          onClick={() => {
                            setSelectedCategory(bundle.categoryKey);
                            setActiveTab('library');
                          }}
                          className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                        >
                          <Play className="w-4 h-4" />
                          <span>{isAr ? 'متابعة تمارين الحزمة' : 'Access Workout Sessions'}</span>
                        </button>
                      ) : trialActive ? (
                        <>
                          <button
                            onClick={() => {
                              setSelectedCategory(bundle.categoryKey);
                              setActiveTab('library');
                            }}
                            className="w-full sm:flex-1 py-2.5 bg-white border border-[#E2E8F0] hover:border-[#D81B60] text-[#1E293B] rounded-xl font-bold text-xs flex items-center justify-center gap-1.5"
                          >
                            <Play className="w-3.5 h-3.5 text-[#D81B60]" />
                            <span>{isAr ? 'مشاهدة تمارين التجربة' : 'Watch Trial Sessions'}</span>
                          </button>

                          <button
                            onClick={() => handleBuyBundle(bundle)}
                            data-testid={`buy-bundle-btn-${bundle.id}`}
                            className="w-full sm:flex-1 py-2.5 bg-[#D81B60] hover:bg-[#C2185B] text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                          >
                            <CreditCard className="w-3.5 h-3.5" />
                            <span>{isAr ? `اشتراك 30 يوم (${bundle.priceDzd} دج)` : `Buy 30-Day (${bundle.priceDzd} DZD)`}</span>
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleStartTrial(bundle)}
                            data-testid={`start-trial-btn-${bundle.id}`}
                            className="w-full sm:flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                          >
                            <Gift className="w-3.5 h-3.5" />
                            <span>{isAr ? 'بدء 3 أيام تجربة مجانية' : 'Start 3-Day Free Trial'}</span>
                          </button>

                          <button
                            onClick={() => handleBuyBundle(bundle)}
                            data-testid={`buy-bundle-btn-${bundle.id}`}
                            className="w-full sm:flex-1 py-2.5 bg-[#D81B60] hover:bg-[#C2185B] text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                          >
                            <CreditCard className="w-3.5 h-3.5" />
                            <span>{isAr ? `شراء الحزمة (${bundle.priceDzd} دج)` : `Buy 30-Day (${bundle.priceDzd} DZD)`}</span>
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* SECTION 2: WORKOUT LIBRARY / SESSIONS                    */}
      {/* ======================================================== */}
      {activeTab === 'library' && (
        <div className="space-y-6 animate-in fade-in">
          {/* Category Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-[#D81B60] text-white shadow-xs'
                      : 'bg-white text-[#64748B] hover:text-[#1E293B] border border-[#E2E8F0]'
                  }`}
                >
                  {isAr ? cat.ar : cat.en}
                </button>
              );
            })}
          </div>

          {/* Workouts Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredWorkouts.map((workout) => {
              const title = isAr ? workout.titleAr : workout.titleEn;
              const cat = isAr ? workout.categoryAr : workout.categoryEn;
              const duration = isAr ? workout.durationAr : workout.durationEn;
              const intensity = isAr ? workout.intensityAr : workout.intensityEn;
              const trainer = isAr ? workout.trainerAr : workout.trainerEn;

              // Check if user has unlocked this workout via purchased bundle, trial, or free preview
              const bundle = fitnessBundles.find(b => b.id === workout.bundleId || b.categoryKey === workout.categoryEn);
              const isUnlocked = bundle ? isBundleActive(bundle.id) : false;
              const canPlay = isUnlocked || workout.isFreePreview;

              return (
                <div
                  key={workout.id}
                  className="bg-white border border-[#E2E8F0] hover:border-[#D81B60]/40 rounded-3xl overflow-hidden shadow-xs transition-all flex flex-col justify-between group"
                >
                  <div className="relative h-44 w-full overflow-hidden">
                    <img
                      src={workout.imageUrl}
                      alt={title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
                      <button
                        onClick={() => {
                          if (canPlay) {
                            setActiveVideo(workout);
                            setIsPlaying(true);
                          } else if (bundle) {
                            handleStartTrial(bundle);
                          }
                        }}
                        className="w-12 h-12 rounded-full bg-white/90 hover:bg-white text-[#D81B60] flex items-center justify-center shadow-lg transition-transform hover:scale-110"
                        title={isAr ? 'تشغيل الفيديو' : 'Play video'}
                      >
                        {canPlay ? (
                          <Play className="w-5 h-5 fill-current ms-0.5" />
                        ) : (
                          <Lock className="w-5 h-5 text-gray-700" />
                        )}
                      </button>
                    </div>

                    <div className="absolute top-2.5 start-2.5 flex items-center gap-1.5 flex-wrap">
                      <span className="bg-white/90 backdrop-blur-xs text-[#1E293B] text-[10px] font-bold px-2 py-0.5 rounded-lg shadow-xs">
                        {cat}
                      </span>
                      {workout.dayNumber && (
                        <span className="bg-[#D81B60] text-white text-[10px] font-black px-2 py-0.5 rounded-lg shadow-xs">
                          {isAr ? `اليوم ${workout.dayNumber}` : `Day ${workout.dayNumber}`}
                        </span>
                      )}
                    </div>

                    {workout.isFreePreview && (
                      <span className="absolute top-2.5 end-2.5 bg-[#DDFFBB] text-emerald-950 text-[10px] font-black px-2 py-0.5 rounded-lg shadow-xs">
                        {isAr ? 'تجربة مجانية' : 'Free Preview'}
                      </span>
                    )}
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-extrabold text-xs sm:text-sm text-[#1E293B] group-hover:text-[#D81B60] transition-colors line-clamp-2">
                        {title}
                      </h4>
                      <div className="flex items-center gap-3 text-xs text-[#64748B] mt-2">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-[#D81B60]" />
                          {duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <Zap className="w-3.5 h-3.5 text-amber-500" />
                          {intensity}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 mt-3 border-t border-[#E2E8F0] text-[11px]">
                      <span className="text-[#64748B] flex items-center gap-1 truncate max-w-[150px]">
                        <User className="w-3 h-3 text-[#D81B60]" />
                        {trainer}
                      </span>

                      {canPlay ? (
                        <button
                          onClick={() => {
                            setActiveVideo(workout);
                            setIsPlaying(true);
                          }}
                          className="text-xs font-bold text-[#D81B60] hover:underline"
                        >
                          {isAr ? 'بدء التمرين' : 'Start'}
                        </button>
                      ) : (
                        <button
                          onClick={() => bundle && handleStartTrial(bundle)}
                          className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
                        >
                          <Gift className="w-3 h-3" />
                          <span>{isAr ? 'بدء التجربة (3 أيام)' : 'Start 3-Day Trial'}</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* SECTION 3: LOCAL GYMS DIRECTORY IN BLIDA                */}
      {/* ======================================================== */}
      {activeTab === 'gyms' && (
        <div className="space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-base sm:text-lg font-black text-[#1E293B]">
              {isAr ? 'نوادي وقاعات الرياضة النسائية في البليدة' : 'Local Female Gyms in Blida'}
            </h3>
            <span className="text-xs text-[#64748B] font-semibold">
              {localGyms.length} {isAr ? 'قاعات معتمدة' : 'verified gyms'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {localGyms.map((gym) => {
              const name = isAr ? gym.nameAr : gym.nameEn;
              const loc = isAr ? gym.locationAr : gym.locationEn;
              const feat = isAr ? gym.featureAr : gym.featureEn;

              return (
                <div
                  key={gym.id}
                  className="bg-white border border-[#E2E8F0] hover:border-[#D81B60]/40 rounded-3xl p-4 shadow-xs transition-all flex gap-4 items-center group"
                >
                  <img
                    src={gym.imageUrl}
                    alt={name}
                    className="w-20 h-20 rounded-2xl object-cover shrink-0 border border-[#E2E8F0]"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-extrabold text-xs sm:text-sm text-[#1E293B] group-hover:text-[#D81B60] transition-colors truncate">
                      {name}
                    </h4>
                    <p className="text-[11px] text-[#64748B] flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-[#D81B60] shrink-0" />
                      <span>{loc}</span>
                    </p>
                    <p className="text-[11px] text-emerald-800 bg-[#DDFFBB]/60 font-medium px-2 py-0.5 rounded-lg mt-1.5 truncate">
                      {feat}
                    </p>
                    <a
                      href={`tel:${gym.phone}`}
                      className="inline-flex items-center gap-1 text-[11px] text-[#D81B60] font-bold mt-2 hover:underline"
                    >
                      <Phone className="w-3 h-3" />
                      <span className="font-mono">{gym.phone}</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 1: TRIAL ACTIVATION SUCCESS DIALOG                */}
      {/* ======================================================== */}
      {trialSuccessModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in"
          onClick={() => setTrialSuccessModal(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-md w-full p-6 text-center shadow-2xl border border-[#E2E8F0]"
            onClick={(e) => e.stopPropagation()}
            data-testid="trial-success-modal"
          >
            <div className="w-16 h-16 rounded-full bg-[#DDFFBB] text-emerald-800 flex items-center justify-center mx-auto mb-3">
              <Gift className="w-8 h-8" />
            </div>

            <h3 className="text-lg font-black text-[#1E293B]">
              {isAr ? 'تهانينا! تم تفعيل الـ 3 أيام المجانية بنجاح' : 'Congratulations! 3-Day Free Trial Active'}
            </h3>

            <p className="text-xs text-[#64748B] mt-2 leading-relaxed">
              {isAr
                ? `لقد تم فتح جميع حصص وفيديوهات "${trialSuccessModal.titleAr}" لحسابكِ مجاناً لمدة 3 أيام كاملة للاختبار والتجريب.`
                : `Full access to "${trialSuccessModal.titleEn}" has been unlocked for 3 full days.`}
            </p>

            <div className="my-4 p-3 bg-[#FCF8F9] rounded-2xl border border-[#FFCEE3] text-start text-xs space-y-1.5">
              <div className="flex items-center justify-between text-[#1E293B]">
                <span className="font-bold">{isAr ? 'مدة التجربة:' : 'Trial Duration:'}</span>
                <span className="font-black text-emerald-700">{trialSuccessModal.trialDays} {isAr ? 'أيام مجانية' : 'Days Free'}</span>
              </div>
              <div className="flex items-center justify-between text-[#1E293B]">
                <span className="font-bold">{isAr ? 'سعر الحزمة بعد التجربة:' : 'Post-Trial Price:'}</span>
                <span className="font-black text-[#D81B60]">{trialSuccessModal.priceDzd} DZD / 30 {isAr ? 'يوماً' : 'days'}</span>
              </div>
              <div className="flex items-center justify-between text-[#1E293B]">
                <span className="font-bold">{isAr ? 'وسيلة الدفع:' : 'Supported Payment:'}</span>
                <span className="font-semibold text-[#64748B]">BaridiMob / CIB</span>
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => {
                  setSelectedCategory(trialSuccessModal.categoryKey);
                  setActiveTab('library');
                  setTrialSuccessModal(null);
                }}
                className="w-full py-3 bg-[#D81B60] hover:bg-[#C2185B] text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4" />
                <span>{isAr ? 'بدء مشاهدة التمارين الآن' : 'Start Watching Workouts'}</span>
              </button>

              <button
                onClick={() => setTrialSuccessModal(null)}
                className="w-full py-2 bg-white text-[#64748B] hover:text-[#1E293B] font-semibold text-xs rounded-xl"
              >
                {isAr ? 'إغلاق' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 2: INTERACTIVE VIDEO PLAYER                       */}
      {/* ======================================================== */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in"
          onClick={() => {
            setActiveVideo(null);
            setIsPlaying(false);
          }}
        >
          <div
            className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-[#E2E8F0]"
            onClick={(e) => e.stopPropagation()}
            data-testid="workout-video-player-modal"
          >
            <div className="relative aspect-video bg-black flex items-center justify-center">
              <img
                src={activeVideo.imageUrl}
                alt={isAr ? activeVideo.titleAr : activeVideo.titleEn}
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4 text-center">
                <div className="w-14 h-14 rounded-full bg-[#D81B60] flex items-center justify-center shadow-lg mb-2 animate-pulse">
                  <Play className="w-6 h-6 fill-current ms-0.5" />
                </div>
                <h4 className="font-black text-sm sm:text-base">
                  {isAr ? activeVideo.titleAr : activeVideo.titleEn}
                </h4>
                <p className="text-xs text-white/80 mt-1">
                  {isAr ? activeVideo.trainerAr : activeVideo.trainerEn} •{' '}
                  {isAr ? activeVideo.durationAr : activeVideo.durationEn}
                </p>
              </div>

              <button
                onClick={() => {
                  setActiveVideo(null);
                  setIsPlaying(false);
                }}
                className="absolute top-3 end-3 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5">
              <div className="flex items-center justify-between text-xs text-[#64748B] mb-2">
                <span className="bg-[#FCF8F9] px-2.5 py-1 rounded-md border border-[#E2E8F0] font-bold text-[#D81B60]">
                  {isAr ? activeVideo.categoryAr : activeVideo.categoryEn}
                </span>
                <span className="flex items-center gap-1 text-amber-600 font-semibold">
                  <Zap className="w-3.5 h-3.5" />
                  {isAr ? activeVideo.intensityAr : activeVideo.intensityEn}
                </span>
              </div>

              <h3 className="font-extrabold text-sm sm:text-base text-[#1E293B]">
                {isAr ? activeVideo.titleAr : activeVideo.titleEn}
              </h3>

              {activeVideo.descriptionAr && (
                <p className="text-xs text-[#64748B] mt-1.5 leading-relaxed">
                  {isAr ? activeVideo.descriptionAr : activeVideo.descriptionEn}
                </p>
              )}

              <div className="mt-4 bg-[#DDFFBB]/30 border border-[#DDFFBB] rounded-2xl p-3 text-xs text-[#334155]">
                <p className="font-bold text-[#1E293B] mb-0.5">
                  {isAr ? '🌿 إرشادات التنفس وتجنب ارتفاع الكورتيزول:' : '🌿 Cortisol Preservation Rule:'}
                </p>
                <p className="text-[11px] leading-relaxed text-emerald-950">
                  {isAr
                    ? 'تنفسي من الأنف بهدوء، ولا تكتمي النفس أثناء بذل المجهود، وتوقفي لأخذ قسط من الراحة عند الإحساس بتسارع مفرط في النبض.'
                    : 'Breathe smoothly through your nose without breath-holding to ensure your adrenal glands remain balanced and cortisol remains normal.'}
                </p>
              </div>

              <button
                onClick={() => {
                  setActiveVideo(null);
                  setIsPlaying(false);
                }}
                className="w-full mt-4 py-2.5 rounded-xl bg-[#D81B60] text-white font-bold text-xs hover:bg-[#C2185B] transition-colors"
              >
                {isAr ? 'إنهاء التمرين وإكمال الحصة' : 'Finish Session'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
