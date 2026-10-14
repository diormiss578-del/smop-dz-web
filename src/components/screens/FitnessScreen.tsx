import React, { useState } from 'react';
import {
  Play,
  Clock,
  Zap,
  User,
  Phone,
  MapPin,
  X,
  Dumbbell,
  Sparkles,
  Building
} from 'lucide-react';
import { usePcos } from '../../context/PcosContext';
import { WorkoutVideo } from '../../types';
import { SportsProgramsScreen } from './SportsProgramsScreen';
import { PartnerGymsSection } from './PartnerGymsSection';

export const FitnessScreen: React.FC = () => {
  const {
    language,
    workouts
  } = usePcos();

  const isAr = language === 'AR';

  // Navigation tab within Fitness: 'sports' (SMOP Sport Programs) | 'partner_gyms' (Partner Gyms) | 'library'
  const [activeTab, setActiveTab] = useState<'sports' | 'partner_gyms' | 'library'>('sports');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeVideo, setActiveVideo] = useState<WorkoutVideo | null>(null);

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

  return (
    <div className="space-y-6 pb-20 animate-in fade-in duration-150" data-testid="fitness-screen-layout">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <span className="bg-[#FFCEE3]/50 text-[#D81B60] text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
            <Dumbbell className="w-3 h-3" />
            {isAr ? 'قسم الرياضة — Sport' : 'Sport Section'}
          </span>
          <span className="bg-[#DDFFBB] text-emerald-900 border border-emerald-300 text-[10px] font-black px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-emerald-700" />
            {isAr ? 'برامج منزلية • قاعات شريكة بالبليدة' : 'Home Programs • Blida Partner Gyms'}
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-[#1E293B] tracking-tight">
          {activeTab === 'sports'
            ? (isAr ? 'SMOP Sport Programs • البرامج الرياضية المنزلية' : 'SMOP Sport Programs')
            : activeTab === 'partner_gyms'
            ? (isAr ? 'قاعات الرياضة الشريكة • Partner Gyms' : 'Partner Gyms — Blida')
            : (isAr ? 'مكتبة الحصص الرياضية' : 'Daily Workout Sessions')}
        </h2>
        <p className="text-xs sm:text-sm text-[#64748B] mt-1">
          {activeTab === 'sports'
            ? (isAr
                ? 'برامج رياضية منزلية مصممة خصيصاً لدعم التوازن الهرموني النسائي لكل المستويات (1,200 دج / شهر).'
                : 'Home workouts designed for your hormonal wellbeing (1,200 DA / month).')
            : activeTab === 'partner_gyms'
            ? (isAr
                ? 'اكتشفي قاعات رياضية شريكة بالبليدة تقدم حصصًا جماعية نسائية لدعم النشاط البدني (3,000 دج / شهر).'
                : 'Discover partner gyms offering group classes in Blida (3,000 DA / month via SMOP DZ).')
            : (isAr
                ? 'تمارين سريعة وموجهة لتحسين حساسية الإنسولين وخفض الكورتيزول.'
                : 'Quick sessions designed to improve insulin sensitivity.')}
        </p>
      </div>

      {/* Main Top Navigation Tabs (Two Primary Sport Options) */}
      <div className="bg-[#FCF8F9] p-1.5 rounded-2xl border border-[#E2E8F0] flex gap-1.5 shadow-2xs">
        <button
          onClick={() => setActiveTab('sports')}
          className={`flex-1 py-2.5 px-3 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all text-center ${
            activeTab === 'sports'
              ? 'bg-[#D81B60] text-white shadow-xs'
              : 'text-[#64748B] hover:text-[#1E293B]'
          }`}
        >
          <Dumbbell className="w-4 h-4 shrink-0" />
          <span>{isAr ? '1. SMOP Sport Programs' : '1. SMOP Sport Programs'}</span>
        </button>

        <button
          onClick={() => setActiveTab('partner_gyms')}
          className={`flex-1 py-2.5 px-3 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all text-center ${
            activeTab === 'partner_gyms'
              ? 'bg-[#D81B60] text-white shadow-xs'
              : 'text-[#64748B] hover:text-[#1E293B]'
          }`}
        >
          <Building className="w-4 h-4 shrink-0" />
          <span>{isAr ? '2. 🏋️ قاعات الرياضة الشريكة' : '2. 🏋️ Partner Gyms'}</span>
        </button>

        <button
          onClick={() => setActiveTab('library')}
          className={`py-2.5 px-3 rounded-xl font-black text-xs flex items-center justify-center gap-1.5 transition-all whitespace-nowrap ${
            activeTab === 'library'
              ? 'bg-[#D81B60] text-white shadow-xs'
              : 'text-[#64748B] hover:text-[#1E293B]'
          }`}
          title="مكتبة الحصص السريعة"
        >
          <Play className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{isAr ? 'مكتبة الحصص' : 'Sessions'}</span>
        </button>
      </div>

      {/* ======================================================== */}
      {/* OPTION 1: SMOP SPORT PROGRAMS (HOME WORKOUTS)             */}
      {/* ======================================================== */}
      {activeTab === 'sports' && (
        <div className="animate-in fade-in" data-testid="sports-programs-section">
          <SportsProgramsScreen embedded={true} />
        </div>
      )}

      {/* ======================================================== */}
      {/* OPTION 2: PARTNER GYMS (قاعات الرياضة الشريكة)             */}
      {/* ======================================================== */}
      {activeTab === 'partner_gyms' && (
        <div className="animate-in fade-in" data-testid="partner-gyms-section">
          <PartnerGymsSection />
        </div>
      )}

      {/* ======================================================== */}
      {/* OPTION 3: WORKOUT LIBRARY / SESSIONS                     */}
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
                        onClick={() => setActiveVideo(workout)}
                        className="w-12 h-12 rounded-full bg-white/90 hover:bg-white text-[#D81B60] flex items-center justify-center shadow-lg transition-transform hover:scale-110"
                      >
                        <Play className="w-5 h-5 fill-current ms-0.5" />
                      </button>
                    </div>

                    <div className="absolute top-3 start-3">
                      <span className="bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-lg">
                        {cat}
                      </span>
                    </div>
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

                      <button
                        onClick={() => setActiveVideo(workout)}
                        className="text-xs font-bold text-[#D81B60] hover:underline"
                      >
                        {isAr ? 'بدء التمرين' : 'Start'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* VIDEO PLAYER MODAL                                       */}
      {/* ======================================================== */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in"
          onClick={() => setActiveVideo(null)}
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
                onClick={() => setActiveVideo(null)}
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
                onClick={() => setActiveVideo(null)}
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
