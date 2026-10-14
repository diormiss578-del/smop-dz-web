import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  ArrowLeft,
  ArrowRight,
  Play,
  CheckCircle2,
  RotateCcw,
  Clock,
  Dumbbell,
  Check,
  ChevronRight,
  ChevronLeft,
  X,
  CreditCard,
  Smartphone,
  ShieldCheck,
  Award,
  Flame,
  Zap,
  Sprout,
  Home,
  Music,
  HeartHandshake,
  Feather,
  SlidersHorizontal,
  Info,
  Maximize2,
  Volume2,
  Pause,
  SkipBack,
  SkipForward,
  Layers,
  Target,
  Calendar,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { usePcos } from '../../context/PcosContext';
import {
  SportsLevel,
  SportsCategory,
  SportsVideo,
  SPORTS_CATEGORIES,
  SPORTS_PROGRAM_TIERS,
  getProgramVideos
} from '../../data/sportsProgramsData';

interface SportsProgramsScreenProps {
  embedded?: boolean;
  onBack?: () => void;
}

export const SportsProgramsScreen: React.FC<SportsProgramsScreenProps> = ({
  embedded = false,
  onBack
}) => {
  const {
    language,
    navigateTo,
    sportsMembershipActive,
    sportsMembershipDaysRemaining,
    activateSportsMembership,
    expireSportsMembership,
    toggleSportsMembership,
    currentSportsLevel,
    setCurrentSportsLevel,
    completedSportsVideos,
    toggleSportsVideoCompletion,
    simulateCompleteAllSportsVideos,
    resetSportsLevelProgress
  } = usePcos();

  const isAr = language === 'AR';

  // Navigation mode within Sports: 'dashboard' | 'levels_overview' | 'program_details'
  const [viewMode, setViewMode] = useState<'dashboard' | 'levels_overview' | 'program_details'>('dashboard');
  const [selectedCategory, setSelectedCategory] = useState<SportsCategory | 'All'>('All');
  const [activeVideo, setActiveVideo] = useState<SportsVideo | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [videoProgressPercent, setVideoProgressPercent] = useState<number>(35);

  // Modals
  const [checkoutModalOpen, setCheckoutModalOpen] = useState<boolean>(false);
  const [checkoutStep, setCheckoutStep] = useState<'select_method' | 'success'>('select_method');
  const [selectedMethod, setSelectedMethod] = useState<'cib' | 'baridimob' | 'edahabia'>('edahabia');
  const [mockCardNumber, setMockCardNumber] = useState<string>('6035 7123 4567 8901');
  const [mockPhoneOrRip, setMockPhoneOrRip] = useState<string>('0770 12 34 56');
  const [mockCardExpiry, setMockCardExpiry] = useState<string>('08/28');
  const [changeProgramModalOpen, setChangeProgramModalOpen] = useState<boolean>(false);
  const [completionModalOpen, setCompletionModalOpen] = useState<boolean>(false);

  // Active level tier
  const activeTier = useMemo(() => {
    return SPORTS_PROGRAM_TIERS.find((t) => t.id === currentSportsLevel) || SPORTS_PROGRAM_TIERS[0];
  }, [currentSportsLevel]);

  // 30 Videos for current level
  const programVideos = useMemo(() => {
    return getProgramVideos(currentSportsLevel, 'integrated');
  }, [currentSportsLevel]);

  // Filtered by category
  const filteredVideos = useMemo(() => {
    if (selectedCategory === 'All') return programVideos;
    return programVideos.filter((v) => v.category === selectedCategory);
  }, [programVideos, selectedCategory]);

  // Unique program key for tracking completions
  const programKey = currentSportsLevel;
  const completedList = completedSportsVideos[programKey] || completedSportsVideos[`${currentSportsLevel}_integrated`] || [];
  const completedCount = completedList.length;
  const progressPercent = Math.round((completedCount / 30) * 100);
  const isAllCompleted = completedCount >= 30;

  // Next workout calculation (first uncompleted video or video 1)
  const nextWorkout = useMemo(() => {
    const uncompleted = programVideos.find((v) => !completedList.includes(v.id));
    return uncompleted || programVideos[0];
  }, [programVideos, completedList]);

  // Last workout (most recently completed or workout 1)
  const lastWorkout = useMemo(() => {
    if (completedList.length === 0) return programVideos[0];
    const lastId = completedList[completedList.length - 1];
    return programVideos.find((v) => v.id === lastId) || programVideos[0];
  }, [programVideos, completedList]);

  // Select a level
  const handleSelectLevel = (level: SportsLevel) => {
    setCurrentSportsLevel(level);
    setSelectedCategory('All');
    setViewMode('program_details');
    setChangeProgramModalOpen(false);
  };

  // Open video player
  const handleWatchWorkout = (video: SportsVideo) => {
    if (!sportsMembershipActive) {
      setCheckoutStep('select_method');
      setCheckoutModalOpen(true);
      return;
    }
    setActiveVideo(video);
    setIsPlaying(true);
    setVideoProgressPercent(35);
  };

  // Navigate video in modal
  const handlePrevVideo = () => {
    if (!activeVideo) return;
    const currentIndex = programVideos.findIndex((v) => v.id === activeVideo.id);
    if (currentIndex > 0) {
      setActiveVideo(programVideos[currentIndex - 1]);
    }
  };

  const handleNextVideo = () => {
    if (!activeVideo) return;
    const currentIndex = programVideos.findIndex((v) => v.id === activeVideo.id);
    if (currentIndex < programVideos.length - 1) {
      setActiveVideo(programVideos[currentIndex + 1]);
    }
  };

  // Toggle completion
  const handleToggleCompleteCurrentVideo = () => {
    if (!activeVideo) return;
    toggleSportsVideoCompletion(programKey, activeVideo.id);

    // If reaching 30, trigger celebration
    if (!completedList.includes(activeVideo.id) && completedCount + 1 >= 30) {
      try {
        confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
      } catch (e) {}
      setCompletionModalOpen(true);
    }
  };

  // Simulation of 30/30 completion
  const handleSimulateAllCompleted = () => {
    simulateCompleteAllSportsVideos(programKey);
    try {
      confetti({ particleCount: 120, spread: 90, origin: { y: 0.6 } });
    } catch (e) {}
    setCompletionModalOpen(true);
  };

  // Confirm membership checkout
  const handleConfirmMembership = () => {
    activateSportsMembership();
    try {
      confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
    } catch (e) {}
    setCheckoutStep('success');
  };

  return (
    <div className="space-y-6 pb-24 animate-in fade-in duration-200" data-testid="smop-sport-screen">
      {/* Top Breadcrumb & Prototype State Controls */}
      <div className="flex items-center justify-between gap-3 pt-1 flex-wrap">
        <div className="flex items-center gap-2">
          {viewMode !== 'dashboard' && (
            <button
              onClick={() => setViewMode('dashboard')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white hover:bg-[#FFF0F6] border border-[#FFCEE3] text-[#D81B60] text-xs font-bold transition-colors shadow-2xs group"
            >
              {isAr ? (
                <>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  <span>لوحة الرياضة الرئيسية</span>
                </>
              ) : (
                <>
                  <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
                  <span>Sports Dashboard</span>
                </>
              )}
            </button>
          )}

          <button
            onClick={() => setViewMode('levels_overview')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
              viewMode === 'levels_overview'
                ? 'bg-[#D81B60] text-white border-[#D81B60] shadow-xs'
                : 'bg-white hover:bg-[#FFF0F6] border-[#E2E8F0] text-[#64748B]'
            }`}
          >
            {isAr ? 'المستويات الثلاثة' : 'All 3 Levels'}
          </button>

          <button
            onClick={() => setViewMode('program_details')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
              viewMode === 'program_details'
                ? 'bg-[#D81B60] text-white border-[#D81B60] shadow-xs'
                : 'bg-white hover:bg-[#FFF0F6] border-[#E2E8F0] text-[#64748B]'
            }`}
          >
            {isAr ? `برنامجي (${activeTier.titleAr})` : `My Program (${activeTier.titleEn})`}
          </button>
        </div>

        {/* Prototype Testing Toggles */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleSportsMembership}
            className={`px-2.5 py-1 rounded-full text-[11px] font-black border transition-all flex items-center gap-1.5 shadow-2xs ${
              sportsMembershipActive
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                : 'bg-rose-50 text-rose-800 border-rose-300 hover:bg-rose-100'
            }`}
            title="تبديل حالة الاشتراك للاختبار"
          >
            <span className={`w-2 h-2 rounded-full ${sportsMembershipActive ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
            <span>
              {sportsMembershipActive
                ? (isAr ? '🟢 اشتراك نشط (انقري للمحاكاة)' : '🟢 Active (Click to toggle)')
                : (isAr ? '🔴 منتهي الصلاحية (محاكاة)' : '🔴 Expired (Click to toggle)')}
            </span>
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 13. MEMBERSHIP EXPIRED BANNER (PROTOTYPE STATE)           */}
      {/* ======================================================== */}
      {!sportsMembershipActive && (
        <div className="bg-gradient-to-r from-rose-950 via-rose-900 to-pink-950 text-white rounded-3xl p-5 sm:p-6 border-2 border-rose-400 shadow-md animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-500/30 text-rose-200 text-[10px] font-black uppercase tracking-wider">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{isAr ? 'تنبيه الاشتراك' : 'Membership Status'}</span>
              </div>
              <h3 className="text-lg sm:text-xl font-black">
                {isAr ? 'انتهت صلاحية اشتراككِ الرياضي' : 'Your Membership Has Expired'}
              </h3>
              <p className="text-xs sm:text-sm text-rose-100/90 max-w-xl">
                {isAr
                  ? 'قومي بتجديد اشتراك SMOP Sport Membership لمواصلة الوصول إلى جميع برامج التمارين وحصص المستويات الثلاثة.'
                  : 'Renew your SMOP Sport Membership to continue accessing your workouts.'}
              </p>
            </div>

            <button
              onClick={() => {
                setCheckoutStep('select_method');
                setCheckoutModalOpen(true);
              }}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-[#D81B60] to-[#E040FB] text-white font-black text-xs shadow-lg hover:brightness-105 transition-all flex items-center justify-center gap-2 shrink-0"
            >
              <CreditCard className="w-4 h-4" />
              <span>{isAr ? 'تجديد الاشتراك — 1,200 دج' : 'Renew Membership — 1,200 DA'}</span>
            </button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 2. HERO: SMOP SPORT MEMBERSHIP (1,200 DA / month)        */}
      {/* ======================================================== */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#FFF5F9] via-white to-[#FFF0F6] rounded-3xl p-5 sm:p-7 border-2 border-[#FFCEE3] shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFCEE3]/60 text-[#D81B60] text-xs font-black uppercase tracking-wider">
              <Dumbbell className="w-3.5 h-3.5" />
              <span>SMOP Sport Membership</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-[#1E293B] tracking-tight">
              SMOP Sport
            </h1>

            <p className="text-sm sm:text-base font-bold text-[#D81B60]">
              Your fitness journey, designed for you.
            </p>

            <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed font-medium">
              {isAr
                ? 'اشتراك شهري واحد شامل يمنحكِ وصولاً غير محدود إلى جميع البرامج والمستويات الرياضية (مبتدئ، متوسط، متقدم) مع تمارين داعمة لتوازن الهرمونات ومناسبة للنساء الجزائريات.'
                : 'One single monthly membership gives you complete, unlimited access to all fitness programs and workouts designed for your hormonal wellbeing.'}
            </p>

            <div className="pt-2 flex items-center gap-3 flex-wrap">
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl sm:text-3xl font-black text-[#1E293B]">1,200 DA</span>
                <span className="text-xs sm:text-sm font-bold text-[#64748B]">/ {isAr ? 'شهر' : 'month'}</span>
              </div>

              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                {isAr ? 'وصول شامل لجميع المستويات' : 'Full Access Included'}
              </span>

              <span className="text-[11px] font-medium text-[#64748B]">
                {isAr ? 'إلغاء في أي وقت (Cancel anytime)' : 'Cancel anytime.'}
              </span>
            </div>
          </div>

          <div className="shrink-0 flex flex-col gap-2.5">
            {!sportsMembershipActive ? (
              <button
                onClick={() => {
                  setCheckoutStep('select_method');
                  setCheckoutModalOpen(true);
                }}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#D81B60] to-[#C2185B] text-white font-black text-sm shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-2 transform hover:scale-101"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isAr ? 'ابدأي اشتراككِ الآن — 1,200 دج' : 'Start My Membership'}</span>
              </button>
            ) : (
              <div className="bg-white/90 backdrop-blur-xs border border-emerald-200 rounded-2xl p-3.5 text-start space-y-1.5 shadow-2xs">
                <div className="flex items-center gap-2 text-xs font-black text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{isAr ? 'اشتراككِ نشط ومفعل' : 'Membership Active'}</span>
                </div>
                <p className="text-[11px] text-[#64748B]">
                  {isAr ? 'متبقي 30 يوماً من الوصول الكامل لجميع المستويات' : '30 days remaining full access'}
                </p>
                <button
                  onClick={() => setViewMode('program_details')}
                  className="w-full mt-2 py-2 px-3 rounded-xl bg-[#D81B60] hover:bg-[#C2185B] text-white font-black text-xs flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{isAr ? 'متابعة التمارين' : 'Continue Workout'}</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Decorative corner accent */}
        <div className="absolute top-0 end-0 w-44 h-44 bg-gradient-to-bl from-[#D81B60]/10 via-[#E040FB]/5 to-transparent rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* ======================================================== */}
      {/* 2. SECTION: YOUR MEMBERSHIP INCLUDES                     */}
      {/* ======================================================== */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E2E8F0] shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-black text-base sm:text-lg text-[#1E293B] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#D81B60]" />
              <span>{isAr ? 'ماذا يتضمن اشتراك SMOP Sport؟' : 'Your Membership Includes'}</span>
            </h3>
            <p className="text-xs text-[#64748B] mt-0.5">
              {isAr ? 'اشتراككِ يمنحكِ وصولاً فورياً لكافة المزايا والبرامج:' : 'Everything included in your 1,200 DA/month membership:'}
            </p>
          </div>
          <span className="text-xs font-black text-[#D81B60]">
            1,200 DA / {isAr ? 'شهر' : 'month'}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {[
            { icon: Sprout, labelEn: 'Beginner Program', labelAr: 'برنامج المبتدئات (Beginner)', color: 'text-emerald-600 bg-emerald-50' },
            { icon: Flame, labelEn: 'Intermediate Program', labelAr: 'البرنامج المتوسط (Intermediate)', color: 'text-amber-600 bg-amber-50' },
            { icon: Zap, labelEn: 'Advanced Program', labelAr: 'البرنامج المتقدم (Advanced)', color: 'text-rose-600 bg-rose-50' },
            { icon: Home, labelEn: 'Home Workouts', labelAr: 'تمارين منزلية (10 فيديوهات)', color: 'text-[#D81B60] bg-[#FFF0F6]' },
            { icon: Music, labelEn: 'Dance & Zumba', labelAr: 'رقص وزومبا (8 فيديوهات)', color: 'text-purple-600 bg-purple-50' },
            { icon: HeartHandshake, labelEn: 'Yoga', labelAr: 'جلسات يوغا (6 فيديوهات)', color: 'text-teal-600 bg-teal-50' },
            { icon: Feather, labelEn: 'Meditation', labelAr: 'جلسات تأمل (6 فيديوهات)', color: 'text-sky-600 bg-sky-50' },
            { icon: Award, labelEn: 'Progress Tracking', labelAr: 'تتبع التقدم والإنجاز (Progress)', color: 'text-indigo-600 bg-indigo-50' },
            { icon: RotateCcw, labelEn: 'Switch Programs Anytime', labelAr: 'تبديل المستوى في أي وقت مجاناً', color: 'text-pink-600 bg-pink-50' },
            { icon: Sparkles, labelEn: 'New Content Over Time', labelAr: 'تحديثات وحصص متجددة باستمرار', color: 'text-fuchsia-600 bg-fuchsia-50' },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-3 rounded-2xl bg-[#FCF8F9] border border-[#FFCEE3]/50 flex items-start gap-2.5 text-xs text-[#1E293B] font-bold hover:border-[#D81B60]/40 transition-colors"
              >
                <div className={`p-1.5 rounded-xl ${item.color} shrink-0`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="leading-snug">
                  <span className="block">{isAr ? item.labelAr : item.labelEn}</span>
                  <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-0.5 mt-0.5">
                    <Check className="w-3 h-3 text-emerald-600" />
                    <span>{isAr ? 'مشمول' : 'Included'}</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="pt-2 flex items-center justify-between text-xs text-[#64748B] border-t border-[#F1F5F9]">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{isAr ? 'لا توجد رسوم إضافية عند الانتقال بين المستويات.' : 'Zero extra fees when switching programs.'}</span>
          </span>
          <span className="font-bold text-[#D81B60]">
            {isAr ? 'إلغاء الاشتراك متاح في أي وقت' : 'Cancel anytime.'}
          </span>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 10. MY SPORTS MEMBERSHIP WIDGET                          */}
      {/* ======================================================== */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-[#FFCEE3] shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#F1F5F9]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#FFF0F6] border border-[#FFCEE3] flex items-center justify-center text-[#D81B60]">
              <Dumbbell className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-base sm:text-lg text-[#1E293B]">
                  My Sports Membership
                </h3>
                <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                  sportsMembershipActive
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-rose-100 text-rose-800'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${sportsMembershipActive ? 'bg-emerald-600' : 'bg-rose-600'}`} />
                  <span>{sportsMembershipActive ? (isAr ? 'نشط 🟢' : 'Active 🟢') : (isAr ? 'منتهي 🔴' : 'Expired 🔴')}</span>
                </span>
              </div>
              <p className="text-xs text-[#64748B] mt-0.5 font-medium">
                SMOP Sport • 1,200 DA / {isAr ? 'شهر' : 'month'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold bg-[#FCF8F9] text-[#475569] px-3 py-1.5 rounded-xl border border-[#E2E8F0] flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#D81B60]" />
              <span>{isAr ? `التجديد: متبقي ${sportsMembershipDaysRemaining} يوماً` : `Renewal: ${sportsMembershipDaysRemaining} days remaining`}</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 py-4">
          <div className="p-3 rounded-2xl bg-[#FCF8F9] border border-[#FFCEE3]/50">
            <span className="text-[11px] font-bold text-[#64748B] block">
              {isAr ? 'البرنامج والمستوى الحالي:' : 'Current Program:'}
            </span>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="text-base">{activeTier.badge}</span>
              <span className="font-black text-sm text-[#1E293B]">
                {isAr ? `${activeTier.titleAr} (30 حصة)` : `${activeTier.titleEn} Program`}
              </span>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-[#FCF8F9] border border-[#FFCEE3]/50">
            <span className="text-[11px] font-bold text-[#64748B] block">
              {isAr ? 'التقدم المنجز:' : 'Progress:'}
            </span>
            <div className="flex items-center justify-between mt-1">
              <span className="font-black text-sm text-[#D81B60]">
                {completedCount} / 30 {isAr ? 'فيديوهات' : 'Workouts'}
              </span>
              <span className="text-xs font-extrabold text-[#1E293B]">
                {progressPercent}%
              </span>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-[#FCF8F9] border border-[#FFCEE3]/50">
            <span className="text-[11px] font-bold text-[#64748B] block">
              {isAr ? 'التمرين التالي:' : 'Next Workout:'}
            </span>
            <span className="font-bold text-xs text-[#1E293B] block truncate mt-1">
              Workout {String(nextWorkout.videoNumber).padStart(2, '0')} — {isAr ? nextWorkout.titleAr : nextWorkout.title}
            </span>
          </div>
        </div>

        {/* Buttons: Continue Workout, Change Program, Explore Sports */}
        <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t border-[#F1F5F9]">
          <button
            onClick={() => handleWatchWorkout(nextWorkout)}
            className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#D81B60] to-[#C2185B] text-white font-black text-xs shadow-xs hover:opacity-95 transition-all flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>{isAr ? 'متابعة التمرين (Continue Workout)' : 'Continue Workout'}</span>
          </button>

          <button
            onClick={() => setChangeProgramModalOpen(true)}
            className="flex-1 py-2.5 px-4 rounded-xl bg-[#FFF0F6] hover:bg-[#FFE5F0] text-[#D81B60] border border-[#FFCEE3] font-black text-xs transition-colors flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>{isAr ? 'تغيير البرنامج (Change Program)' : 'Change Program'}</span>
          </button>

          <button
            onClick={() => setViewMode('levels_overview')}
            className="py-2.5 px-4 rounded-xl bg-white hover:bg-slate-50 border border-[#E2E8F0] text-[#1E293B] font-bold text-xs transition-colors flex items-center justify-center gap-2"
          >
            <Layers className="w-4 h-4 text-[#D81B60]" />
            <span>{isAr ? 'استعراض البرامج (Explore Sports)' : 'Explore Sports'}</span>
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 15. SPORTS DASHBOARD: MY SPORTS JOURNEY                   */}
      {/* ======================================================== */}
      {viewMode === 'dashboard' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E2E8F0] shadow-xs space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-black text-base sm:text-lg text-[#1E293B]">
                  My Sports Journey
                </h3>
                <p className="text-xs text-[#64748B] mt-0.5">
                  {isAr ? 'نظرة عامة على تقدمكِ في التمارين وحصصكِ الحالية' : 'Your fitness momentum and next steps'}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-black px-3 py-1 rounded-full bg-[#FFF0F6] text-[#D81B60] border border-[#FFCEE3]">
                  {activeTier.badge} {isAr ? activeTier.titleAr : activeTier.titleEn}
                </span>
              </div>
            </div>

            {/* Progress Bar & Stats */}
            <div className="bg-[#FCF8F9] p-4 rounded-2xl border border-[#FFCEE3]/60 space-y-3">
              <div className="flex items-center justify-between text-xs font-black">
                <span className="text-[#1E293B]">
                  {completedCount} / 30 {isAr ? 'تمارين مكتملة' : 'Workouts Completed'}
                </span>
                <span className="text-[#D81B60]">{progressPercent}% {isAr ? 'مكتمل' : 'Complete'}</span>
              </div>

              <div className="w-full bg-[#E2E8F0] h-3 rounded-full overflow-hidden border border-[#E2E8F0]">
                <div
                  className="bg-gradient-to-r from-[#D81B60] via-[#E040FB] to-emerald-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, progressPercent)}%` }}
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-center text-xs">
                <div className="p-2 rounded-xl bg-white border border-[#E2E8F0]">
                  <span className="text-[10px] text-[#64748B] block">{isAr ? 'البرنامج الحالي' : 'Current Program'}</span>
                  <span className="font-black text-[#1E293B] mt-0.5 block">{isAr ? activeTier.titleAr : activeTier.titleEn}</span>
                </div>

                <div className="p-2 rounded-xl bg-white border border-[#E2E8F0]">
                  <span className="text-[10px] text-[#64748B] block">{isAr ? 'التتابع اليومي' : 'Current Streak'}</span>
                  <span className="font-black text-amber-600 mt-0.5 block flex items-center justify-center gap-1">
                    <Flame className="w-3.5 h-3.5 text-amber-500" />
                    <span>4 Days</span>
                  </span>
                </div>

                <div className="p-2 rounded-xl bg-white border border-[#E2E8F0]">
                  <span className="text-[10px] text-[#64748B] block">{isAr ? 'آخر تمرين' : 'Last Workout'}</span>
                  <span className="font-bold text-[#1E293B] mt-0.5 block truncate text-[11px]">
                    {isAr ? lastWorkout.titleAr : lastWorkout.title}
                  </span>
                </div>

                <div className="p-2 rounded-xl bg-white border border-[#E2E8F0]">
                  <span className="text-[10px] text-[#64748B] block">{isAr ? 'المدة المقدرة' : 'Duration'}</span>
                  <span className="font-black text-[#D81B60] mt-0.5 block">{nextWorkout.duration}</span>
                </div>
              </div>
            </div>

            {/* Next Workout Spotlight Card */}
            <div className="bg-gradient-to-r from-[#FFF5F9] to-white p-4 sm:p-5 rounded-2xl border-2 border-[#FFCEE3] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden shrink-0 border border-[#FFCEE3]">
                  <img
                    src={nextWorkout.imageUrl}
                    alt={isAr ? nextWorkout.titleAr : nextWorkout.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-white/90 text-[#D81B60] flex items-center justify-center shadow-xs">
                      <Play className="w-4 h-4 fill-current ms-0.5" />
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-[#FFCEE3] text-[#D81B60]">
                      {isAr ? 'التمرين القادم' : 'Next Workout'}
                    </span>
                    <span className="text-xs text-[#64748B] font-semibold flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#D81B60]" />
                      <span>{nextWorkout.duration}</span>
                    </span>
                  </div>

                  <h4 className="font-black text-sm sm:text-base text-[#1E293B] mt-1">
                    Workout {String(nextWorkout.videoNumber).padStart(2, '0')} — {isAr ? nextWorkout.titleAr : nextWorkout.title}
                  </h4>

                  <p className="text-xs text-[#64748B] mt-0.5">
                    {isAr ? nextWorkout.categoryAr : nextWorkout.category} • {isAr ? nextWorkout.levelLabelAr : nextWorkout.levelLabelEn}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleWatchWorkout(nextWorkout)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#D81B60] hover:bg-[#C2185B] text-white font-black text-xs shadow-xs transition-colors flex items-center justify-center gap-2"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{isAr ? 'متابعة التمرين' : 'Continue Workout'}</span>
                </button>
              </div>
            </div>

            {/* Quick Navigation Row */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => setViewMode('program_details')}
                className="text-xs font-black text-[#D81B60] hover:underline flex items-center gap-1"
              >
                <span>{isAr ? 'مشاهدة قائمة الـ 30 تمرين بالكامل' : 'View all 30 Workouts in Program'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setViewMode('levels_overview')}
                className="text-xs font-bold text-[#64748B] hover:text-[#1E293B] flex items-center gap-1"
              >
                <span>{isAr ? 'استعراض المستويات الثلاثة' : 'Explore All 3 Levels'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 3. LEVELS OVERVIEW: 3 LEVELS (NO SEPARATE PRICES)        */}
      {/* ======================================================== */}
      {viewMode === 'levels_overview' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-black text-base sm:text-lg text-[#1E293B] flex items-center gap-2">
                <Target className="w-5 h-5 text-[#D81B60]" />
                <span>{isAr ? 'المستويات الرياضية الثلاثة' : 'Sports Program Levels'}</span>
              </h3>
              <p className="text-xs text-[#64748B] mt-0.5">
                {isAr
                  ? 'جميع المستويات مشمولة بالكامل في اشتراككِ الشهري (1,200 دج/شهر). يمكنكِ اختيار أي مستوى والتبديل متى شئتِ.'
                  : 'All levels are included in your active membership. Switch anytime at zero extra charge.'}
              </p>
            </div>

            <span className="text-xs font-black px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
              {isAr ? 'مشمول في الاشتراك ✓' : 'MEMBERSHIP INCLUDED ✓'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {SPORTS_PROGRAM_TIERS.map((tier) => {
              const isCurrent = currentSportsLevel === tier.id;
              const tierCompletedList = completedSportsVideos[tier.id] || [];
              const tierCompletedCount = tierCompletedList.length;

              return (
                <div
                  key={tier.id}
                  className={`bg-white rounded-3xl border-2 transition-all p-5 sm:p-6 shadow-xs hover:shadow-md flex flex-col justify-between relative overflow-hidden ${
                    isCurrent
                      ? 'border-[#D81B60] ring-2 ring-[#D81B60]/15'
                      : 'border-[#E2E8F0] hover:border-[#FFCEE3]'
                  }`}
                  data-testid={`level-card-${tier.id}`}
                >
                  <div>
                    {/* Badge & Level Title */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl p-2 rounded-2xl bg-[#FCF8F9] border border-[#FFCEE3]/50">
                          {tier.badge}
                        </span>
                        <div>
                          <h4 className="font-black text-base sm:text-lg text-[#1E293B]">
                            {tier.id === 'beginner'
                              ? (isAr ? 'Beginner (مبتدئ)' : 'Beginner')
                              : tier.id === 'intermediate'
                              ? (isAr ? 'Intermediate (متوسط)' : 'Intermediate')
                              : (isAr ? 'Advanced (متقدم)' : 'Advanced')}
                          </h4>
                          <span className="text-xs font-bold text-[#64748B]">
                            30 Workouts
                          </span>
                        </div>
                      </div>

                      {isCurrent && (
                        <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-[#D81B60] text-white">
                          {isAr ? 'المستوى النشط' : 'Active'}
                        </span>
                      )}
                    </div>

                    {/* Short Description */}
                    <p className="text-xs text-[#64748B] leading-relaxed mb-4">
                      {tier.id === 'beginner'
                        ? (isAr ? 'برنامج للمبتدئات، بتمارين تدريجية وسهلة لبناء العادة والنشاط.' : 'Perfect for starting your fitness journey.')
                        : tier.id === 'intermediate'
                        ? (isAr ? 'برنامج للمستوى المتوسط، بتمارين أكثر تحدياً تجمع بين المقاومة والكارديو لشد القوام.' : 'For users ready to increase intensity.')
                        : (isAr ? 'برنامج للمستوى المتقدم، بتمارين أكثر كثافة وتحدياً لصقل اللياقة وبناء القوة والتحمل.' : 'For users looking for more challenging workouts.')}
                    </p>

                    {/* Content breakdown */}
                    <div className="bg-[#FCF8F9] rounded-2xl p-3 border border-[#FFCEE3]/40 space-y-1.5 text-xs text-[#334155] mb-4">
                      <span className="text-[10px] font-black text-[#1E293B] block uppercase tracking-wider mb-1">
                        {isAr ? 'محتويات هذا المستوى:' : 'What is included:'}
                      </span>
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="flex items-center gap-1">
                          <Home className="w-3 h-3 text-[#D81B60]" />
                          <span>Home Workouts</span>
                        </span>
                        <span className="font-bold">10 videos</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="flex items-center gap-1">
                          <Music className="w-3 h-3 text-purple-600" />
                          <span>Dance & Zumba</span>
                        </span>
                        <span className="font-bold">8 videos</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="flex items-center gap-1">
                          <HeartHandshake className="w-3 h-3 text-emerald-600" />
                          <span>Yoga</span>
                        </span>
                        <span className="font-bold">6 videos</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="flex items-center gap-1">
                          <Feather className="w-3 h-3 text-sky-600" />
                          <span>Meditation</span>
                        </span>
                        <span className="font-bold">6 videos</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    {/* Explicitly NO PRICE under each program! Shows "Included in your membership" */}
                    <div className="pt-3 border-t border-[#F1F5F9] mb-3 flex items-center justify-between">
                      <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-200 inline-flex items-center gap-1">
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{isAr ? 'مشمول في الاشتراك' : 'Included in your membership'}</span>
                      </span>

                      {tierCompletedCount > 0 && (
                        <span className="text-[11px] font-bold text-[#D81B60]">
                          {tierCompletedCount}/30 {isAr ? 'مكتمل' : 'done'}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => handleSelectLevel(tier.id)}
                      className={`w-full py-2.5 px-4 rounded-xl font-black text-xs transition-all flex items-center justify-center gap-2 ${
                        isCurrent
                          ? 'bg-[#D81B60] hover:bg-[#C2185B] text-white shadow-xs'
                          : 'bg-[#FFF0F6] hover:bg-[#D81B60] text-[#D81B60] hover:text-white border border-[#FFCEE3]'
                      }`}
                    >
                      <span>{isCurrent ? (isAr ? 'متابعة البرنامج الحالي' : 'View Program') : (isAr ? 'عرض البرنامج والبدء' : 'View Program')}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 6. PROGRAM DETAILS PAGE (30 WORKOUTS LIST)               */}
      {/* ======================================================== */}
      {viewMode === 'program_details' && (
        <div className="space-y-6 animate-in fade-in">
          {/* Program Details Header Card */}
          <div className="bg-white rounded-3xl p-5 sm:p-7 border-2 border-[#FFCEE3] shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{activeTier.badge}</span>
                  <h3 className="font-black text-lg sm:text-2xl text-[#1E293B]">
                    {activeTier.id === 'beginner'
                      ? 'Beginner Program'
                      : activeTier.id === 'intermediate'
                      ? 'Intermediate Program'
                      : 'Advanced Program'}
                  </h3>
                  <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                    MEMBERSHIP INCLUDED
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#64748B] mt-1.5 max-w-2xl">
                  {activeTier.id === 'beginner'
                    ? (isAr ? 'Perfect for starting your fitness journey. بتمارين تدريجية وسهلة.' : 'Perfect for starting your fitness journey.')
                    : activeTier.id === 'intermediate'
                    ? (isAr ? 'For users ready to increase intensity. بتمارين أكثر تحديًا لشد القوام.' : 'For users ready to increase intensity.')
                    : (isAr ? 'For users looking for more challenging workouts. بتمارين أكثر كثافة وتحدياً.' : 'For users looking for more challenging workouts.')}
                </p>

                <div className="flex items-center gap-3 mt-2 text-xs font-bold text-[#1E293B] flex-wrap">
                  <span className="text-[#D81B60] font-black">30 Workouts</span>
                  <span>•</span>
                  <span className="text-emerald-700 font-black">{isAr ? 'مشمول في الاشتراك الشهري' : 'Included in Membership'}</span>
                  <span>•</span>
                  <span className="text-[#64748B]">1,200 DA / month</span>
                </div>
              </div>

              {/* Change Program Button */}
              <div className="shrink-0 flex items-center gap-2">
                <button
                  onClick={() => setChangeProgramModalOpen(true)}
                  className="px-4 py-2.5 rounded-xl bg-[#FFF0F6] hover:bg-[#FFE5F0] text-[#D81B60] border border-[#FFCEE3] font-black text-xs transition-colors flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{isAr ? 'تغيير البرنامج (Change Program)' : 'Change Program'}</span>
                </button>
              </div>
            </div>

            {/* Progress Section */}
            <div className="bg-[#FCF8F9] p-4 rounded-2xl border border-[#FFCEE3]/60 space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#D81B60]" />
                  <span className="font-black text-xs sm:text-sm text-[#1E293B]">
                    {isAr ? 'تقدمكِ في هذا البرنامج:' : 'Your Progress:'}
                  </span>
                  <span className="font-black text-xs text-[#D81B60]">
                    {completedCount} / 30 {isAr ? 'مكتمل' : 'completed'}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-[#1E293B]">{progressPercent}%</span>
                  <button
                    onClick={handleSimulateAllCompleted}
                    className="text-[10px] bg-[#FFF0F6] hover:bg-[#FFCEE3] text-[#D81B60] font-bold px-2 py-1 rounded-lg border border-[#FFCEE3]"
                    title="Simulate 30/30"
                  >
                    {isAr ? 'محاكاة 30/30 🎉' : 'Simulate 30/30 🎉'}
                  </button>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-[#E2E8F0] h-2.5 rounded-full overflow-hidden border border-[#E2E8F0]">
                <div
                  className="bg-gradient-to-r from-[#D81B60] via-[#E040FB] to-emerald-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, progressPercent)}%` }}
                />
              </div>
            </div>

            {/* Category Filter Chips */}
            <div className="pt-2 border-t border-[#F1F5F9]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-black text-[#1E293B]">
                  {isAr ? 'تصفية حسب نوع التمرين:' : 'Filter Workouts by Category:'}
                </span>
                <span className="text-xs text-[#64748B]">
                  {filteredVideos.length} / 30 Workouts
                </span>
              </div>

              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                {[
                  { id: 'All', labelEn: 'All Workouts (30)', labelAr: 'جميع التمارين (30)', icon: Sparkles },
                  { id: 'Home Workouts', labelEn: 'Home Workouts (10)', labelAr: 'تمارين منزلية (10)', icon: Home },
                  { id: 'Dance & Zumba', labelEn: 'Dance & Zumba (8)', labelAr: 'رقص وزومبا (8)', icon: Music },
                  { id: 'Yoga', labelEn: 'Yoga (6)', labelAr: 'يوغا (6)', icon: HeartHandshake },
                  { id: 'Meditation', labelEn: 'Meditation (6)', labelAr: 'تأمل (6)', icon: Feather },
                ].map((cat) => {
                  const Icon = cat.icon;
                  const isActive = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id as SportsCategory | 'All')}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-black transition-all whitespace-nowrap flex items-center gap-1.5 shadow-2xs ${
                        isActive
                          ? 'bg-[#D81B60] text-white shadow-xs'
                          : 'bg-white text-[#64748B] hover:text-[#1E293B] border border-[#E2E8F0]'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{isAr ? cat.labelAr : cat.labelEn}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 30 WORKOUT CARDS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredVideos.map((video) => {
              const isCompleted = completedList.includes(video.id);
              const isNextUp = nextWorkout.id === video.id && !isCompleted;
              const formattedNum = String(video.videoNumber).padStart(2, '0');

              return (
                <div
                  key={video.id}
                  className={`bg-white rounded-3xl border-2 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group ${
                    isNextUp
                      ? 'border-[#D81B60] ring-2 ring-[#D81B60]/20'
                      : isCompleted
                      ? 'border-emerald-200'
                      : 'border-[#E2E8F0] hover:border-[#FFCEE3]'
                  }`}
                  data-testid={`workout-card-${video.id}`}
                >
                  <div>
                    {/* Thumbnail */}
                    <div className="relative h-44 w-full overflow-hidden bg-slate-900">
                      <img
                        src={video.imageUrl}
                        alt={isAr ? video.titleAr : video.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                      {/* Top Badges */}
                      <div className="absolute top-3 start-3 flex items-center gap-1.5 flex-wrap">
                        <span className="bg-black/60 backdrop-blur-xs text-white text-[10px] font-black px-2.5 py-1 rounded-lg">
                          Workout {formattedNum}
                        </span>
                        <span className="bg-[#D81B60] text-white text-[10px] font-black px-2 py-1 rounded-lg">
                          {isAr ? video.categoryAr : video.category}
                        </span>
                      </div>

                      <div className="absolute top-3 end-3">
                        <span className="bg-white/95 text-[#1E293B] text-[10px] font-black px-2 py-0.5 rounded-lg border border-[#E2E8F0]">
                          {video.duration}
                        </span>
                      </div>

                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <button
                          onClick={() => handleWatchWorkout(video)}
                          className="w-12 h-12 rounded-full bg-white/90 hover:bg-white text-[#D81B60] flex items-center justify-center shadow-lg transition-transform hover:scale-110"
                        >
                          <Play className="w-5 h-5 fill-current ms-0.5" />
                        </button>
                      </div>

                      {/* Bottom Title on Image */}
                      <div className="absolute bottom-2.5 start-3 end-3 text-white">
                        <div className="flex items-center gap-1.5 text-[11px] text-white/90">
                          <span className="font-bold">{isAr ? video.levelLabelAr : video.levelLabelEn}</span>
                        </div>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-4 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-black text-sm text-[#1E293B] group-hover:text-[#D81B60] transition-colors leading-snug line-clamp-2">
                          Workout {formattedNum} — {isAr ? video.titleAr : video.title}
                        </h4>
                      </div>

                      <p className="text-xs text-[#64748B] line-clamp-2 leading-relaxed">
                        {isAr ? video.shortDescriptionAr : video.shortDescription}
                      </p>

                      {/* Status Indicator */}
                      <div className="pt-2 flex items-center justify-between text-xs">
                        {isCompleted ? (
                          <span className="text-[11px] font-black text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>✓ Completed</span>
                          </span>
                        ) : isNextUp ? (
                          <span className="text-[11px] font-black text-[#D81B60] bg-[#FFF0F6] px-2.5 py-0.5 rounded-md border border-[#FFCEE3] flex items-center gap-1">
                            <Sparkles className="w-3.5 h-3.5 text-[#D81B60]" />
                            <span>Continue Workout</span>
                          </span>
                        ) : (
                          <span className="text-[11px] font-semibold text-[#64748B] bg-slate-100 px-2.5 py-0.5 rounded-md">
                            Upcoming
                          </span>
                        )}

                        <span className="text-[11px] font-bold text-[#64748B]">
                          {isAr ? video.trainerNameAr : video.trainerName}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Button */}
                  <div className="p-4 pt-0">
                    <button
                      onClick={() => handleWatchWorkout(video)}
                      className={`w-full py-2.5 rounded-xl font-black text-xs transition-colors flex items-center justify-center gap-1.5 ${
                        isNextUp
                          ? 'bg-[#D81B60] hover:bg-[#C2185B] text-white shadow-xs'
                          : isCompleted
                          ? 'bg-slate-100 hover:bg-[#FFF0F6] text-[#475569] hover:text-[#D81B60]'
                          : 'bg-[#FFF0F6] hover:bg-[#D81B60] text-[#D81B60] hover:text-white border border-[#FFCEE3]'
                      }`}
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>{isNextUp ? (isAr ? 'متابعة التمرين' : 'Continue Workout') : (isAr ? 'مشاهدة التمرين' : 'Watch Workout')}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 7. WORKOUT DETAILS & VIDEO PLAYER MODAL                   */}
      {/* ======================================================== */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in"
          onClick={() => {
            setActiveVideo(null);
            setIsPlaying(false);
          }}
          data-testid="workout-details-modal"
        >
          <div
            className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#E2E8F0] max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mock Video Player */}
            <div className="relative aspect-video bg-black flex items-center justify-center shrink-0">
              <img
                src={activeVideo.imageUrl}
                alt={isAr ? activeVideo.titleAr : activeVideo.title}
                className="w-full h-full object-cover opacity-60"
              />

              {/* Player Overlay */}
              <div className="absolute inset-0 flex flex-col justify-between p-4 bg-gradient-to-t from-black/80 via-transparent to-black/50">
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center gap-2">
                    <span className="bg-[#D81B60] text-white text-[10px] font-black px-2 py-0.5 rounded-md">
                      Workout {String(activeVideo.videoNumber).padStart(2, '0')}
                    </span>
                    <span className="text-xs font-bold truncate max-w-xs">
                      {isAr ? activeVideo.titleAr : activeVideo.title}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      setActiveVideo(null);
                      setIsPlaying(false);
                    }}
                    className="w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Center Play/Pause Indicator */}
                <div className="flex items-center justify-center">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-16 h-16 rounded-full bg-[#D81B60] hover:bg-[#C2185B] text-white flex items-center justify-center shadow-2xl transition-transform hover:scale-110"
                  >
                    {isPlaying ? (
                      <Pause className="w-8 h-8 fill-current" />
                    ) : (
                      <Play className="w-8 h-8 fill-current ms-1" />
                    )}
                  </button>
                </div>

                {/* Player Bottom Bar */}
                <div className="space-y-1.5 text-white">
                  <div className="w-full bg-white/30 h-1.5 rounded-full overflow-hidden cursor-pointer">
                    <div
                      className="bg-[#D81B60] h-full rounded-full transition-all"
                      style={{ width: `${videoProgressPercent}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-white/90">
                    <span>07:15 / {activeVideo.duration}</span>
                    <span className="flex items-center gap-2">
                      <Volume2 className="w-3.5 h-3.5" />
                      <Maximize2 className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Body / Workout Details */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#F1F5F9]">
                <div>
                  <h3 className="font-black text-lg sm:text-xl text-[#1E293B]">
                    Workout {String(activeVideo.videoNumber).padStart(2, '0')} — {isAr ? activeVideo.titleAr : activeVideo.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1 text-xs text-[#64748B] flex-wrap">
                    <span className="font-bold text-[#D81B60]">{activeVideo.duration}</span>
                    <span>•</span>
                    <span className="font-bold">{isAr ? activeVideo.levelLabelAr : activeVideo.levelLabelEn}</span>
                    <span>•</span>
                    <span className="font-bold">{isAr ? activeVideo.categoryAr : activeVideo.category}</span>
                    <span>•</span>
                    <span className="font-semibold">{activeVideo.trainerNameAr || activeVideo.trainerName}</span>
                  </div>
                </div>

                {completedList.includes(activeVideo.id) && (
                  <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300 flex items-center gap-1 self-start sm:self-center">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>✓ Completed</span>
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                {isAr ? activeVideo.shortDescriptionAr : activeVideo.shortDescription}
              </p>

              {/* Benefits */}
              <div className="bg-[#FCF8F9] rounded-2xl p-4 border border-[#FFCEE3]/60 space-y-2">
                <span className="text-xs font-black text-[#1E293B] block uppercase tracking-wider">
                  {isAr ? 'الفوائد الصحية لهذا التمرين:' : 'Benefits:'}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    'Improves mobility',
                    'Supports daily activity',
                    'Builds consistency',
                  ].map((benefit, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-xs text-[#334155] font-semibold">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Previous / Next Workout Buttons */}
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={handlePrevVideo}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#1E293B] font-bold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>{isAr ? 'التمرين السابق' : 'Previous Workout'}</span>
                </button>

                <button
                  onClick={handleNextVideo}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#1E293B] font-bold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <span>{isAr ? 'التمرين التالي' : 'Next Workout'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Mark as Completed Button */}
              <div className="pt-2 border-t border-[#F1F5F9] flex flex-col sm:flex-row gap-2.5">
                <button
                  onClick={handleToggleCompleteCurrentVideo}
                  className={`flex-1 py-3 px-4 rounded-xl font-black text-xs transition-colors flex items-center justify-center gap-2 shadow-xs ${
                    completedList.includes(activeVideo.id)
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                      : 'bg-[#D81B60] hover:bg-[#C2185B] text-white'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>
                    {completedList.includes(activeVideo.id)
                      ? (isAr ? 'تم إكمال التمرين بنجاح ✓' : 'Marked as Completed ✓')
                      : (isAr ? 'تحديد كمكتمل (Mark as Completed)' : 'Mark as Completed')}
                  </span>
                </button>

                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#1E293B] font-bold text-xs flex items-center justify-center gap-1.5"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>{isPlaying ? (isAr ? 'إيقاف مؤقت' : 'Pause') : (isAr ? 'بدء التمرين' : 'Start Workout')}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 9. CHANGE PROGRAM MODAL (NO EXTRA PAYMENT!)              */}
      {/* ======================================================== */}
      {changeProgramModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in"
          onClick={() => setChangeProgramModalOpen(false)}
          data-testid="change-program-modal"
        >
          <div
            className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-[#E2E8F0] space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-[#F1F5F9]">
              <div>
                <h3 className="text-lg font-black text-[#1E293B]">
                  {isAr ? 'اختاري برنامجكِ التالي' : 'Choose Your Next Program'}
                </h3>
                <p className="text-xs text-[#64748B] mt-0.5">
                  {isAr ? 'مشمول بالكامل في اشتراككِ الفعّال دون أي دفع إضافي' : 'Included in your active membership — zero extra payment.'}
                </p>
              </div>
              <button
                onClick={() => setChangeProgramModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              {SPORTS_PROGRAM_TIERS.map((tier) => {
                const isSelected = currentSportsLevel === tier.id;
                return (
                  <div
                    key={tier.id}
                    className={`p-4 rounded-2xl border-2 transition-all flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'border-[#D81B60] bg-[#FFF5F9]'
                        : 'border-[#E2E8F0] hover:border-[#FFCEE3] bg-[#FCF8F9]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{tier.badge}</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-black text-sm text-[#1E293B]">
                            {tier.id === 'beginner'
                              ? 'Beginner'
                              : tier.id === 'intermediate'
                              ? 'Intermediate'
                              : 'Advanced'}
                          </h4>
                          {isSelected && (
                            <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-[#D81B60] text-white">
                              {isAr ? 'الحالي' : 'Active'}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-[#64748B]">
                          30 Workouts • <span className="font-bold text-emerald-700">Included in Membership</span>
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleSelectLevel(tier.id)}
                      className={`px-4 py-2 rounded-xl font-black text-xs transition-colors ${
                        isSelected
                          ? 'bg-[#D81B60] text-white'
                          : 'bg-white hover:bg-[#D81B60] text-[#D81B60] hover:text-white border border-[#FFCEE3]'
                      }`}
                    >
                      {isSelected ? (isAr ? 'محدد حالياً' : 'Current') : (isAr ? 'بدء البرنامج' : 'Start Program')}
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 text-center text-xs text-[#64748B]">
              {isAr ? 'يمكنكِ تبديل المستوى في أي وقت من إعدادات حسابكِ.' : 'You can switch programs anytime with no extra fee.'}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 11. SUBSCRIPTION CHECKOUT MODAL (PROTOTYPE)              */}
      {/* ======================================================== */}
      {checkoutModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in"
          onClick={() => setCheckoutModalOpen(false)}
          data-testid="subscription-checkout-modal"
        >
          <div
            className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#E2E8F0] space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            {checkoutStep === 'select_method' ? (
              <>
                <div className="flex items-center justify-between pb-2 border-b border-[#F1F5F9]">
                  <div>
                    <h3 className="text-lg font-black text-[#1E293B]">
                      SMOP Sport Membership
                    </h3>
                    <p className="text-xs text-[#64748B]">
                      {isAr ? 'اشتراك شهري شامل لجميع البرامج' : 'Monthly Membership — Unlimited Access'}
                    </p>
                  </div>
                  <button
                    onClick={() => setCheckoutModalOpen(false)}
                    className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-slate-200"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-3.5 bg-[#FFF5F9] rounded-2xl border border-[#FFCEE3] space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#64748B]">{isAr ? 'نوع الاشتراك:' : 'Plan:'}</span>
                    <span className="font-black text-[#1E293B]">SMOP Sport Monthly Membership</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#64748B]">{isAr ? 'الوصول المتاح:' : 'Access:'}</span>
                    <span className="font-black text-emerald-700">{isAr ? 'جميع المستويات (مبتدئ، متوسط، متقدم)' : 'Beginner + Intermediate + Advanced'}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm pt-2 border-t border-[#FFCEE3]/60">
                    <span className="font-black text-[#1E293B]">{isAr ? 'المجموع الشهري:' : 'Total:'}</span>
                    <span className="font-black text-[#D81B60] text-base">1,200 DA / {isAr ? 'شهر' : 'month'}</span>
                  </div>
                </div>

                {/* Payment Methods: Edahabia / CIB / BaridiMob */}
                <div className="space-y-2">
                  <span className="text-xs font-black text-[#1E293B] block">
                    {isAr ? 'اختاري وسيلة الدفع (تجريبية):' : 'Select Payment Method:'}
                  </span>

                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedMethod('edahabia')}
                      className={`p-2.5 rounded-2xl border-2 text-center transition-all ${
                        selectedMethod === 'edahabia'
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
                      onClick={() => setSelectedMethod('cib')}
                      className={`p-2.5 rounded-2xl border-2 text-center transition-all ${
                        selectedMethod === 'cib'
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
                      onClick={() => setSelectedMethod('baridimob')}
                      className={`p-2.5 rounded-2xl border-2 text-center transition-all ${
                        selectedMethod === 'baridimob'
                          ? 'border-[#D81B60] bg-[#FFF0F6] text-[#D81B60]'
                          : 'border-[#E2E8F0] hover:border-[#FFCEE3] text-[#475569]'
                      }`}
                    >
                      <Smartphone className="w-5 h-5 mx-auto mb-1 text-emerald-600" />
                      <span className="font-black text-xs block">BaridiMob</span>
                      <span className="text-[9px] text-[#64748B] block">بريدي موب</span>
                    </button>
                  </div>

                  {/* Mock Payment Fields */}
                  <div className="p-3 bg-[#FCF8F9] rounded-2xl border border-[#FFCEE3]/60 space-y-2 mt-2">
                    {selectedMethod === 'baridimob' ? (
                      <>
                        <div>
                          <label className="text-[10px] font-black text-[#64748B] block mb-0.5">
                            {isAr ? 'رقم الهاتف أو RIP (تجريبي):' : 'Phone or RIP (Mock):'}
                          </label>
                          <input
                            type="text"
                            value={mockPhoneOrRip}
                            onChange={(e) => setMockPhoneOrRip(e.target.value)}
                            className="w-full text-xs font-bold px-3 py-1.5 rounded-xl border border-[#E2E8F0] bg-white focus:outline-none focus:border-[#D81B60]"
                          />
                        </div>
                        <p className="text-[10px] text-[#64748B]">
                          {isAr ? 'سيتم إرسال رمز OTP تجريبي وتفعيل العضوية فوراً.' : 'A mock OTP will simulate instant confirmation.'}
                        </p>
                      </>
                    ) : (
                      <>
                        <div>
                          <label className="text-[10px] font-black text-[#64748B] block mb-0.5">
                            {isAr ? 'رقم البطاقة (16 رقم تجريبي):' : 'Card Number (Mock):'}
                          </label>
                          <input
                            type="text"
                            value={mockCardNumber}
                            onChange={(e) => setMockCardNumber(e.target.value)}
                            className="w-full text-xs font-bold px-3 py-1.5 rounded-xl border border-[#E2E8F0] bg-white focus:outline-none focus:border-[#D81B60]"
                          />
                        </div>
                        <div className="flex gap-2">
                          <div className="flex-1">
                            <label className="text-[10px] font-black text-[#64748B] block mb-0.5">
                              {isAr ? 'تاريخ الانتهاء:' : 'Expiry:'}
                            </label>
                            <input
                              type="text"
                              value={mockCardExpiry}
                              onChange={(e) => setMockCardExpiry(e.target.value)}
                              className="w-full text-xs font-bold px-3 py-1.5 rounded-xl border border-[#E2E8F0] bg-white focus:outline-none focus:border-[#D81B60]"
                            />
                          </div>
                          <div className="w-20">
                            <label className="text-[10px] font-black text-[#64748B] block mb-0.5">CVV:</label>
                            <input
                              type="text"
                              defaultValue="123"
                              className="w-full text-xs font-bold px-3 py-1.5 rounded-xl border border-[#E2E8F0] bg-white focus:outline-none focus:border-[#D81B60]"
                            />
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleConfirmMembership}
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#D81B60] to-[#C2185B] text-white font-black text-xs shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-2"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>{isAr ? 'تأكيد وبدء الاشتراك — 1,200 دج' : 'Confirm & Start Membership — 1,200 DA'}</span>
                  </button>

                  <p className="text-[10px] text-center text-[#64748B] mt-2">
                    {isAr ? 'هذه محاكاة تجريبية Prototype ولا يتم خصم أي أموال حقيقية.' : 'Interactive Prototype — no real money charged.'}
                  </p>
                </div>
              </>
            ) : (
              /* Success Screen */
              <div className="text-center py-4 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-3xl animate-bounce">
                  🎉
                </div>

                <div>
                  <h3 className="text-xl font-black text-[#1E293B]">
                    Welcome to SMOP Sport!
                  </h3>
                  <p className="text-xs sm:text-sm text-emerald-700 font-bold mt-1">
                    Your membership is now active.
                  </p>
                  <p className="text-xs text-[#64748B] mt-1">
                    1,200 DA / month • {isAr ? 'جميع البرامج والمستويات متاحة الآن بحسابكِ.' : 'All workouts are now available.'}
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      setCheckoutModalOpen(false);
                      setViewMode('program_details');
                      handleWatchWorkout(nextWorkout);
                    }}
                    className="w-full py-3.5 rounded-2xl bg-[#D81B60] hover:bg-[#C2185B] text-white font-black text-xs shadow-md transition-colors flex items-center justify-center gap-2"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>{isAr ? 'ابدأي تمرينكِ الأول الآن' : 'Start Your First Workout'}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 14. COMPLETION EXPERIENCE (30/30 COMPLETED)               */}
      {/* ======================================================== */}
      {completionModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in"
          onClick={() => setCompletionModalOpen(false)}
          data-testid="program-completed-modal"
        >
          <div
            className="bg-white rounded-3xl max-w-md w-full p-6 text-center shadow-2xl border-2 border-[#FFCEE3] space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-16 h-16 rounded-full bg-[#FFF0F6] text-[#D81B60] flex items-center justify-center mx-auto text-3xl">
              🎉
            </div>

            <div>
              <h3 className="text-xl font-black text-[#1E293B]">
                Program Completed!
              </h3>
              <p className="text-xs sm:text-sm text-[#64748B] mt-1">
                You've completed all 30 workouts.
              </p>
              <p className="text-xs text-emerald-700 font-bold mt-1">
                {isAr ? 'مشمول في اشتراككِ الفعّال دون أي دفع إضافي' : 'Included in your active membership.'}
              </p>
            </div>

            <div className="space-y-2 pt-2 text-start">
              <span className="text-xs font-black text-[#1E293B] block text-center">
                {isAr ? 'اختاري تحديكِ التالي:' : 'Choose Your Next Program:'}
              </span>

              {SPORTS_PROGRAM_TIERS.map((tier) => {
                const isCurrent = currentSportsLevel === tier.id;
                return (
                  <div
                    key={tier.id}
                    className="p-3 rounded-2xl bg-[#FCF8F9] border border-[#FFCEE3]/60 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{tier.badge}</span>
                      <div>
                        <span className="font-black text-xs text-[#1E293B] block">
                          {tier.id === 'beginner' ? 'Beginner' : tier.id === 'intermediate' ? 'Intermediate' : 'Advanced'}
                        </span>
                        <span className="text-[10px] text-emerald-700 font-semibold">
                          {isCurrent ? '✓ Completed' : 'Included in Membership'}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        handleSelectLevel(tier.id);
                        setCompletionModalOpen(false);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-[#D81B60] hover:bg-[#C2185B] text-white font-black text-xs"
                    >
                      {isCurrent ? (isAr ? 'إعادة' : 'Restart') : (isAr ? 'بدء المستوى' : 'Start')}
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="pt-2">
              <button
                onClick={() => setCompletionModalOpen(false)}
                className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#1E293B] font-bold text-xs"
              >
                {isAr ? 'إغلاق' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
