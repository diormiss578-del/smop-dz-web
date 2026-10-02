import React, { useState } from 'react';
import { Search, X, BookOpen, Clock, User, Sparkles, ChevronRight, ArrowLeft, UserPlus } from 'lucide-react';
import { usePcos } from '../../context/PcosContext';
import { QrCodeCard } from '../QrCodeCard';
import { Article } from '../../types';

export const HomeScreen: React.FC = () => {
  const { language, articles, currentUser, navigateTo } = usePcos();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const isAr = language === 'AR';

  const filteredArticles = articles.filter(art => {
    const title = isAr ? art.titleAr : art.titleEn;
    const content = isAr ? art.contentAr : art.contentEn;
    const cat = isAr ? art.categoryAr : art.categoryEn;
    const q = searchQuery.toLowerCase().trim();
    return (
      title.toLowerCase().includes(q) ||
      content.toLowerCase().includes(q) ||
      cat.toLowerCase().includes(q)
    );
  });

  const spotlightArticle = articles[0];

  return (
    <div className="space-y-6 pb-20 animate-in fade-in duration-150" data-testid="home-screen-layout">
      {/* Welcome & Intro Banner */}
      <div className="bg-[#FFCEE3]/60 border border-[#FFCEE3] rounded-3xl p-5 sm:p-6 shadow-xs relative overflow-hidden">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 z-10">
            <h2 className="text-xl sm:text-2xl font-black text-[#1E293B] tracking-tight">
              {currentUser
                ? (isAr ? `السلام عليكم يا ${currentUser.fullName.split(' ')[0]}! 🌸` : `Assalamu Alaikum, ${currentUser.fullName.split(' ')[0]}! 🌸`)
                : (isAr ? 'السلام عليكم أختي الغالية!' : 'Assalamu Alaikum, Sister!')}
            </h2>
            <p className="text-xs sm:text-sm text-[#475569] mt-1.5 leading-relaxed font-medium">
              {isAr
                ? 'افهمي طبيعة هرموناتك، وتحكمي بأعراض تكيس المبايض بخطوات علمية وتغذوية مدروسة.'
                : 'Understand your body mechanics and tame PCOS symptoms with clinically proven guides.'}
            </p>
          </div>
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/80 p-1 border border-white/60 shadow-xs shrink-0 flex items-center justify-center overflow-hidden">
            <img
              src="/smop_dz_logo.jpg"
              alt="SMOP DZ Logo"
              className="w-full h-full object-cover rounded-xl"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/img_smop_dz_logo_1780509782515.png';
              }}
            />
          </div>
        </div>
      </div>

      {/* Sign Up invitation banner if not logged in */}
      {!currentUser && (
        <div className="bg-white border border-[#FFCEE3] rounded-2xl p-4 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3 animate-in fade-in">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFCEE3]/40 text-[#D81B60] flex items-center justify-center shrink-0">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-xs sm:text-sm text-[#1E293B]">
                {isAr ? 'أنشئي حسابكِ الصحي مجاناً في SMOP DZ' : 'Create Your Free Health Account'}
              </h4>
              <p className="text-[11px] text-[#64748B] mt-0.5">
                {isAr ? 'سجلي بياناتكِ لتخصيص خطتكِ الغذائية وتتبع دورتكِ وحجز وجباتكِ الصحية' : 'Sign up to personalize nutrition, track your cycle, and order meals'}
              </p>
            </div>
          </div>
          <button
            onClick={() => navigateTo('signup')}
            className="w-full sm:w-auto px-4 py-2 bg-[#D81B60] hover:bg-[#C2185B] text-white rounded-xl text-xs font-bold shrink-0 transition-colors shadow-2xs"
          >
            {isAr ? 'إنشاء حساب الآن' : 'Sign Up Now'}
          </button>
        </div>
      )}

      {/* App QR Code Banner Card */}
      <QrCodeCard />

      {/* Search Input Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none text-[#64748B]">
          <Search className="w-4 h-4" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={
            isAr
              ? 'ابحثي عن مقالات، أعراض، أو أطعمة علاجية...'
              : 'Search articles, symptoms, or treatments...'
          }
          className="w-full bg-white border border-[#E2E8F0] focus:border-[#D81B60] focus:ring-1 focus:ring-[#D81B60] rounded-2xl ps-10 pe-10 py-3 text-xs sm:text-sm text-[#1E293B] shadow-2xs outline-none transition-all placeholder:text-[#94A3B8]"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute inset-y-0 end-0 flex items-center pe-3 text-[#64748B] hover:text-[#1E293B]"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* PCOS Types & Mechanics Horizontal Scroll */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base sm:text-lg font-black text-[#1E293B]">
            {isAr ? 'ميكانيكيات وأنواع تكيس المبايض' : 'PCOS Types & Mechanics'}
          </h3>
          <span className="text-xs text-[#D81B60] font-bold">
            {articles.length} {isAr ? 'أنواع' : 'Types'}
          </span>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none snap-x">
          {articles.map((article) => {
            const title = isAr ? article.titleAr : article.titleEn;
            const content = isAr ? article.contentAr : article.contentEn;
            const cat = isAr ? article.categoryAr : article.categoryEn;
            const readTime = isAr ? article.readTimeAr : article.readTimeEn;
            const author = isAr ? article.authorAr : article.authorEn;

            return (
              <div
                key={article.id}
                onClick={() => setSelectedArticle(article)}
                className="min-w-[260px] sm:min-w-[280px] bg-white border border-[#E2E8F0] hover:border-[#D81B60]/40 rounded-3xl overflow-hidden shadow-xs cursor-pointer transition-all flex flex-col snap-start shrink-0 group"
              >
                <div className="relative h-32 w-full overflow-hidden">
                  <img
                    src={article.imageUrl}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-2.5 start-2.5 bg-[#DDFFBB] text-[#1E293B] text-[10px] font-black px-2.5 py-1 rounded-xl shadow-xs">
                    {cat}
                  </span>
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-extrabold text-xs sm:text-sm text-[#1E293B] line-clamp-1 group-hover:text-[#D81B60] transition-colors">
                      {title}
                    </h4>
                    <p className="text-[11px] text-[#64748B] mt-1.5 line-clamp-2 leading-relaxed">
                      {content}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-3 mt-3 border-t border-[#E2E8F0]/60 text-[10px]">
                    <span className="text-[#D81B60] font-bold flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {readTime}
                    </span>
                    <span className="text-[#64748B] truncate max-w-[120px]">
                      {author}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Article of the Day Spotlight */}
      {spotlightArticle && !searchQuery && (
        <div className="bg-white border border-[#E2E8F0] rounded-3xl p-5 sm:p-6 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-extrabold text-[#D81B60] flex items-center gap-1">
              <Sparkles className="w-4 h-4" />
              {isAr ? 'مقال اليوم المتميز' : 'Article of the Day'}
            </span>
            <span className="bg-[#FFCEE3]/50 text-[#D81B60] text-[10px] font-bold px-2 py-0.5 rounded-md">
              {isAr ? 'علمي مراجع' : 'Expert Reviewed'}
            </span>
          </div>

          <div
            onClick={() => setSelectedArticle(spotlightArticle)}
            className="flex flex-col sm:flex-row gap-4 items-center cursor-pointer group"
          >
            <div className="w-full sm:w-44 h-36 rounded-2xl overflow-hidden shrink-0">
              <img
                src={spotlightArticle.imageUrl}
                alt={isAr ? spotlightArticle.titleAr : spotlightArticle.titleEn}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex-1">
              <span className="text-[10px] font-bold text-[#D81B60] bg-[#FFCEE3]/40 px-2 py-0.5 rounded-full">
                {isAr ? spotlightArticle.categoryAr : spotlightArticle.categoryEn}
              </span>
              <h4 className="font-extrabold text-sm sm:text-base text-[#1E293B] mt-2 group-hover:text-[#D81B60] transition-colors">
                {isAr ? spotlightArticle.titleAr : spotlightArticle.titleEn}
              </h4>
              <p className="text-xs text-[#64748B] mt-1.5 line-clamp-3 leading-relaxed">
                {isAr ? spotlightArticle.contentAr : spotlightArticle.contentEn}
              </p>
              <div className="flex items-center justify-between text-xs mt-3 pt-2 text-[#64748B]">
                <span className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-[#D81B60]" />
                  {isAr ? spotlightArticle.authorAr : spotlightArticle.authorEn}
                </span>
                <span className="text-[#D81B60] font-bold flex items-center gap-1">
                  {isAr ? 'قراءة المقال' : 'Read Article'}
                  <ChevronRight className={`w-3.5 h-3.5 ${isAr ? 'rotate-180' : ''}`} />
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Full Articles Directory */}
      <div>
        <h3 className="text-base sm:text-lg font-black text-[#1E293B] mb-3">
          {isAr ? 'جميع مقالات وأبحاث الدعم' : 'Clinical & Nutritional Library'}
        </h3>

        {filteredArticles.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center border border-[#E2E8F0]">
            <BookOpen className="w-8 h-8 text-[#94A3B8] mx-auto mb-2" />
            <p className="text-xs text-[#64748B]">
              {isAr ? 'لم نجد أي مقال يطابق بحثكِ.' : 'No articles match your query.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredArticles.map((article) => {
              const title = isAr ? article.titleAr : article.titleEn;
              const content = isAr ? article.contentAr : article.contentEn;
              const cat = isAr ? article.categoryAr : article.categoryEn;
              const readTime = isAr ? article.readTimeAr : article.readTimeEn;
              const author = isAr ? article.authorAr : article.authorEn;

              return (
                <div
                  key={article.id}
                  onClick={() => setSelectedArticle(article)}
                  className="bg-white border border-[#E2E8F0] hover:border-[#D81B60]/40 rounded-2xl p-4 shadow-2xs cursor-pointer transition-all flex flex-col justify-between group"
                >
                  <div className="flex gap-3">
                    <img
                      src={article.imageUrl}
                      alt={title}
                      className="w-20 h-20 rounded-xl object-cover shrink-0 group-hover:opacity-90 transition-opacity"
                    />
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] font-bold text-[#D81B60] bg-[#FFCEE3]/30 px-2 py-0.5 rounded-full">
                        {cat}
                      </span>
                      <h4 className="font-extrabold text-xs sm:text-sm text-[#1E293B] mt-1.5 line-clamp-2 group-hover:text-[#D81B60] transition-colors leading-tight">
                        {title}
                      </h4>
                      <p className="text-[11px] text-[#64748B] mt-1 line-clamp-2">
                        {content}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-[#64748B] mt-3 pt-2.5 border-t border-[#E2E8F0]/60">
                    <span className="text-[#D81B60] font-semibold">{readTime}</span>
                    <span className="truncate max-w-[150px]">{author}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Article Detail Modal */}
      {selectedArticle && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in"
          onClick={() => setSelectedArticle(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-lg w-full max-h-[85vh] overflow-y-auto p-6 shadow-2xl border border-[#E2E8F0]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-[#D81B60] bg-[#FFCEE3]/40 px-3 py-1 rounded-full">
                {isAr ? selectedArticle.categoryAr : selectedArticle.categoryEn}
              </span>
              <button
                onClick={() => setSelectedArticle(null)}
                className="w-8 h-8 rounded-full bg-[#FCF8F9] hover:bg-[#FFCEE3]/40 text-[#64748B] flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <img
              src={selectedArticle.imageUrl}
              alt={isAr ? selectedArticle.titleAr : selectedArticle.titleEn}
              className="w-full h-52 object-cover rounded-2xl mb-4 shadow-sm"
            />

            <h3 className="text-lg sm:text-xl font-black text-[#1E293B] leading-tight">
              {isAr ? selectedArticle.titleAr : selectedArticle.titleEn}
            </h3>

            <div className="flex items-center justify-between text-xs text-[#64748B] my-3 py-2 border-y border-[#E2E8F0]">
              <span className="flex items-center gap-1 text-[#D81B60] font-bold">
                <Clock className="w-3.5 h-3.5" />
                {isAr ? selectedArticle.readTimeAr : selectedArticle.readTimeEn}
              </span>
              <span>{isAr ? selectedArticle.authorAr : selectedArticle.authorEn}</span>
            </div>

            <div className="text-xs sm:text-sm text-[#334155] leading-relaxed space-y-3 font-normal">
              <p>{isAr ? selectedArticle.contentAr : selectedArticle.contentEn}</p>
              <div className="bg-[#DDFFBB]/30 border border-[#DDFFBB] rounded-2xl p-4 mt-4">
                <h5 className="font-extrabold text-xs text-[#1E293B] mb-1">
                  {isAr ? '💡 نصيحة تطبيق SMOP DZ' : '💡 SMOP DZ Quick Tip'}
                </h5>
                <p className="text-[11px] text-[#475569]">
                  {isAr
                    ? 'احرصي على تسجيل مواعيد دورتك الشهرية وأعراضكِ اليومية في تبويب "حسابي" لمساعدة طبيبتكِ في متابعة استجابتكِ الهرمونية بدقة.'
                    : 'Log your symptoms and cycle days in the Dashboard tab so our specialists can fine-tune your personalized nutritional plan.'}
                </p>
              </div>
            </div>

            <button
              onClick={() => setSelectedArticle(null)}
              className="w-full mt-6 py-2.5 rounded-xl bg-[#D81B60] text-white font-bold text-xs hover:bg-[#C2185B] transition-colors"
            >
              {isAr ? 'إغلاق المقال' : 'Close Article'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
