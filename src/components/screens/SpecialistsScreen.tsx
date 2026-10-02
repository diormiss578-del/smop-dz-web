import React from 'react';
import { Star, MapPin, MessageCircle, ShieldCheck } from 'lucide-react';
import { usePcos } from '../../context/PcosContext';

export const SpecialistsScreen: React.FC = () => {
  const { language, specialists, openChatWith } = usePcos();
  const isAr = language === 'AR';

  return (
    <div className="space-y-6 pb-20 animate-in fade-in duration-150" data-testid="specialists-screen-layout">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-black text-[#1E293B] tracking-tight">
          {isAr ? 'أخصائيات صحة المرأة وتكيس المبايض' : 'Specialist Medical & Wellness Directory'}
        </h2>
        <p className="text-xs sm:text-sm text-[#64748B] mt-1">
          {isAr
            ? 'استشيري نخبة من أخصائيات التغذية العلاجية والمدربات المعتمدات في الجزائر.'
            : 'Connect directly with certified PCOS nutritionists and holistic coaches.'}
        </p>
      </div>

      {/* Specialists Cards */}
      <div className="space-y-4">
        {specialists.map((spec) => {
          const name = isAr ? spec.nameAr : spec.nameEn;
          const title = isAr ? spec.titleAr : spec.titleEn;
          const desc = isAr ? spec.descriptionAr : spec.descriptionEn;
          const loc = isAr ? spec.locationAr : spec.locationEn;

          return (
            <div
              key={spec.id}
              className="bg-white border border-[#E2E8F0] hover:border-[#D81B60]/40 rounded-3xl p-5 shadow-xs transition-all flex flex-col justify-between"
            >
              <div className="flex items-start gap-4">
                <img
                  src={spec.avatarUrl}
                  alt={name}
                  className="w-16 h-16 rounded-2xl object-cover shrink-0 border-2 border-[#FFCEE3]"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <h3 className="font-extrabold text-sm sm:text-base text-[#1E293B]">
                      {name}
                    </h3>
                    <ShieldCheck className="w-4 h-4 text-[#D81B60]" />
                  </div>
                  <p className="text-xs text-[#D81B60] font-semibold mt-0.5">
                    {title}
                  </p>
                  <div className="flex items-center gap-2 mt-1.5 text-xs text-[#64748B]">
                    <span className="flex items-center gap-1 text-amber-500 font-bold">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      {spec.rating}
                    </span>
                    <span>•</span>
                    <span>
                      ({spec.reviewsCount} {isAr ? 'تقييم' : 'reviews'})
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-[#475569] my-3 leading-relaxed">
                {desc}
              </p>

              <div className="flex items-center gap-1.5 text-xs text-[#64748B] mb-4">
                <MapPin className="w-3.5 h-3.5 text-[#D81B60] shrink-0" />
                <span className="font-medium">{loc}</span>
              </div>

              <button
                onClick={() => openChatWith(spec)}
                data-testid={`chat-now-btn-${spec.id}`}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#FFCEE3]/80 hover:bg-[#FFCEE3] text-[#D81B60] rounded-2xl font-bold text-xs sm:text-sm transition-colors shadow-2xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{isAr ? 'دردشي الآن' : 'Chat Now'}</span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Recent Message Threads */}
      <div className="pt-2">
        <h3 className="text-sm sm:text-base font-extrabold text-[#1E293B] mb-2.5">
          {isAr ? 'محادثاتكِ الهرمونية النشطة' : 'Recent Message Threads'}
        </h3>
        <div
          onClick={() => openChatWith(specialists[0])}
          className="bg-white border border-[#FFCEE3]/80 hover:border-[#D81B60] rounded-2xl p-3.5 cursor-pointer shadow-2xs transition-all flex items-center justify-between gap-3 group"
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={specialists[0].avatarUrl}
                alt={specialists[0].nameEn}
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></span>
            </div>
            <div>
              <h4 className="font-bold text-xs sm:text-sm text-[#1E293B] group-hover:text-[#D81B60] transition-colors">
                {isAr ? specialists[0].nameAr : specialists[0].nameEn}
              </h4>
              <p className="text-[11px] text-[#64748B] truncate max-w-[200px] sm:max-w-xs">
                {isAr
                  ? 'اضغطي لقراءة مقترحات الأخصائية الموجهة...'
                  : 'Tap to open and read feedback...'}
              </p>
            </div>
          </div>
          <span className="w-2.5 h-2.5 bg-[#D81B60] rounded-full shrink-0 animate-pulse"></span>
        </div>
      </div>
    </div>
  );
};
