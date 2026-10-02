import React, { useState } from 'react';
import {
  Sparkles,
  Check,
  Clock,
  Utensils,
  ChevronDown,
  ChevronUp,
  HeartHandshake,
  X,
  BookOpen,
  CreditCard,
  Smartphone,
  Lock,
  Flame,
  ChevronRight,
  ShieldCheck,
  Download,
  Search,
  CheckCircle2,
  ChefHat
} from 'lucide-react';
import { usePcos } from '../../context/PcosContext';
import { WellnessProgram, RecipeItem } from '../../types';

export const ProgramsScreen: React.FC = () => {
  const {
    language,
    wellnessPrograms,
    specialists,
    recipes,
    unlockedRecipeBundle,
    enrolledPrograms,
    startPayment,
    recipeBundleCount,
    recipeBundlePriceDzd,
    totalRecipesCount
  } = usePcos();

  const isAr = language === 'AR';

  // Section toggle: 'programs' vs 'recipes'
  const [activeMainTab, setActiveMainTab] = useState<'programs' | 'recipes'>('programs');

  // Programs state
  const [selectedProgramType, setSelectedProgramType] = useState<string>('All');
  const [expandedProgramId, setExpandedProgramId] = useState<string | null>('prog_reset_core');
  const [enrollingProgram, setEnrollingProgram] = useState<WellnessProgram | null>(null);
  const [includeFollowUp, setIncludeFollowUp] = useState<boolean>(true);

  // Recipes state
  const [recipeCategory, setRecipeCategory] = useState<string>('All');
  const [recipeSearch, setRecipeSearch] = useState<string>('');
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeItem | null>(null);

  const filterOptions = [
    { id: 'All', labelEn: 'All Programs', labelAr: 'جميع البرامج' },
    { id: 'Standard Programs', labelEn: 'Standard Programs', labelAr: 'برامج عامة هادفة' },
    { id: 'Tailored Programs', labelEn: 'Tailored Protocols', labelAr: 'برامج مخصصة للأنواع' }
  ];

  const recipeCategories = [
    { id: 'All', en: 'All Recipes', ar: 'جميع الوصفات' },
    { id: 'Low-GI Breakfast', en: 'Breakfast', ar: 'فطور الصباح' },
    { id: 'Protein & Mains', en: 'Mains & Protein', ar: 'أطباق رئيسية' },
    { id: 'Smoothies & Drinks', en: 'Smoothies & Teas', ar: 'سموذي ومشروبات' },
    { id: 'Healthy Treats', en: 'Keto Treats', ar: 'حلويات كيتو' },
    { id: 'Soups & Broths', en: 'Soups & Broths', ar: 'حساء علاجي' }
  ];

  const filteredPrograms = wellnessPrograms.filter(prog => {
    if (selectedProgramType === 'All') return true;
    return prog.typeEn === selectedProgramType;
  });

  const filteredRecipes = recipes.filter(rec => {
    const matchesCat = recipeCategory === 'All' || rec.categoryEn === recipeCategory;
    const title = isAr ? rec.titleAr : rec.titleEn;
    const benefit = isAr ? rec.hormonalBenefitAr : rec.hormonalBenefitEn;
    const q = recipeSearch.toLowerCase().trim();
    const matchesSearch = !q || title.toLowerCase().includes(q) || benefit.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  const toggleExpand = (id: string) => {
    setExpandedProgramId(prev => (prev === id ? null : id));
  };

  const handleStartProgramCheckout = (program: WellnessProgram) => {
    const finalPrice = includeFollowUp ? (program.followUpPriceDzd || 3990) : program.basePriceDzd;
    startPayment({
      id: program.id,
      titleEn: `${program.titleEn} ${includeFollowUp ? '(With Specialist Follow-up)' : '(Standard)'}`,
      titleAr: `${program.titleAr} ${includeFollowUp ? '(مع متابعة أخصائية التغذية سارة لونا)' : '(البرنامج الأساسي)'}`,
      descriptionEn: includeFollowUp
        ? 'Full protocol + personal 1-on-1 consultations & nutritional adjustment with Dr. Sarah Louna.'
        : 'Self-guided protocol with clinical dietary manual and meal planner.',
      descriptionAr: includeFollowUp
        ? 'بروتوكول علاجي كامل مع متابعة فردية وتعديلات غذائية دقيقة من أخصائية التغذية سارة لونا.'
        : 'بروتوكول ذاتي متكامل يتضمن الدليل الغذائي وجدول الوجبات المنظم للهرمونات.',
      priceDzd: finalPrice,
      type: includeFollowUp ? 'program_followup' : 'program_base'
    });
    setEnrollingProgram(null);
  };

  const handleBuyRecipeBundle = () => {
    startPayment({
      id: 'bundle_30_recipes',
      titleEn: `Exclusive ${recipeBundleCount} PCOS Therapeutic Recipes Pack`,
      titleAr: `حزمة الـ ${recipeBundleCount} وصفة صحية متوازنة لهرمونات تكيس المبايض`,
      descriptionEn: `Curated pack of ${recipeBundleCount} metabolic meals, hormone-balancing breakfasts, snacks & cortisol elixirs from over ${totalRecipesCount} total recipes.`,
      descriptionAr: `باقة الـ ${recipeBundleCount} وصفة الأكثر طلباً المجهزة بجرعات محسوبة من مضادات الالتهاب والألياف من بين أزيد من ${totalRecipesCount} وصفة.`,
      priceDzd: recipeBundlePriceDzd,
      type: 'recipe_pack'
    });
  };

  return (
    <div className="space-y-6 pb-20 animate-in fade-in duration-150" data-testid="programs-screen-layout">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-black text-[#1E293B] tracking-tight">
          {isAr ? 'البرامج والوصفات الهرمونية المتكاملة' : 'PCOS Wellness Programs & Recipe Suite'}
        </h2>
        <p className="text-xs sm:text-sm text-[#64748B] mt-1">
          {isAr
            ? 'خطط شاملة مصممة علمياً لمعالجة أصل المشكلة مع مكتبة وصفات غنية بخيارات الدفع عبر بريدي موب وCIB.'
            : 'Evidence-based protocols and therapeutic recipe library with BaridiMob & CIB payment.'}
        </p>
      </div>

      {/* Main Top Dual Navigation (Programs vs Recipe Library) */}
      <div className="bg-[#FCF8F9] p-1.5 rounded-2xl border border-[#E2E8F0] flex gap-1.5 shadow-2xs">
        <button
          onClick={() => setActiveMainTab('programs')}
          className={`flex-1 py-2.5 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
            activeMainTab === 'programs'
              ? 'bg-[#D81B60] text-white shadow-xs'
              : 'text-[#64748B] hover:text-[#1E293B]'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>{isAr ? 'البرامج العلاجية المعتمدة' : 'Therapeutic Programs'}</span>
        </button>

        <button
          onClick={() => setActiveMainTab('recipes')}
          className={`flex-1 py-2.5 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
            activeMainTab === 'recipes'
              ? 'bg-[#D81B60] text-white shadow-xs'
              : 'text-[#64748B] hover:text-[#1E293B]'
          }`}
        >
          <ChefHat className="w-4 h-4" />
          <span>
            {isAr ? `خانة الوصفات (+${totalRecipesCount} وصفة)` : `Recipes (+${totalRecipesCount})`}
          </span>
        </button>
      </div>

      {/* Spotlight Promotion Banner for 30-Recipe Bundle (Accessible from either tab) */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-700 to-emerald-800 text-white rounded-3xl p-5 sm:p-6 shadow-md relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1 z-10">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-[#DDFFBB] text-emerald-900 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                {isAr ? 'عرض حصري خاص' : 'Special Offer'}
              </span>
              <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                {isAr ? `أزيد من ${totalRecipesCount} وصفة متوفرة` : `+${totalRecipesCount} Total Library`}
              </span>
            </div>

            <h3 className="text-base sm:text-lg font-black mt-2 leading-snug">
              {isAr
                ? `حزمة الـ ${recipeBundleCount} وصفة صحية لتكيس المبايض بسعر ${recipeBundlePriceDzd} دج فقط!`
                : `PCOS Pack: ${recipeBundleCount} Proven Therapeutic Recipes for only ${recipeBundlePriceDzd} DZD!`}
            </h3>

            <p className="text-xs text-white/90 mt-1 max-w-xl leading-relaxed">
              {isAr
                ? 'تشكيلة متكاملة تشمل فطور الصباح، أطباق رئيسية، مشروبات مضادة للأندروجين وحلويات صحية بدون سكر مصممة لخفض مقاومة الأنسولين والكورتيزول.'
                : 'Complete dietary toolkit with low-GI breakfasts, anti-androgen elixirs, and keto treats designed for hormonal balance.'}
            </p>

            <div className="flex items-center gap-4 mt-3 text-[11px] text-emerald-100 flex-wrap">
              <span className="flex items-center gap-1 font-semibold">
                <Check className="w-3.5 h-3.5 text-[#DDFFBB]" />
                {isAr ? 'دفع عبر بريدي موب (BaridiMob)' : 'BaridiMob Supported'}
              </span>
              <span className="flex items-center gap-1 font-semibold">
                <Check className="w-3.5 h-3.5 text-[#DDFFBB]" />
                {isAr ? 'بطاقات CIB والذهبية' : 'CIB & Edahabia'}
              </span>
            </div>
          </div>

          <div className="shrink-0 w-full sm:w-auto">
            {unlockedRecipeBundle ? (
              <div className="bg-white/20 backdrop-blur-xs border border-white/40 text-white px-4 py-2.5 rounded-2xl flex items-center gap-2 text-xs font-bold">
                <CheckCircle2 className="w-4 h-4 text-[#DDFFBB]" />
                <span>{isAr ? 'الحزمة مفعلة بحسابكِ ✅' : 'Pack Unlocked Active ✅'}</span>
              </div>
            ) : (
              <button
                onClick={handleBuyRecipeBundle}
                data-testid="buy-recipe-pack-btn"
                className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-white hover:bg-emerald-50 text-emerald-900 font-black text-xs sm:text-sm shadow-md hover:scale-105 transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-[#D81B60]" />
                <span>
                  {isAr
                    ? `شراء الحزمة (${recipeBundlePriceDzd} دج)`
                    : `Buy 30-Pack (${recipeBundlePriceDzd} DZD)`}
                </span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ========================================================== */}
      {/* SECTION 1: PROGRAMS VIEW */}
      {/* ========================================================== */}
      {activeMainTab === 'programs' && (
        <div className="space-y-6 animate-in fade-in">
          {/* Filter Chips */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {filterOptions.map(opt => {
              const isActive = selectedProgramType === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => setSelectedProgramType(opt.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-[#D81B60] text-white shadow-xs'
                      : 'bg-white text-[#64748B] hover:text-[#1E293B] border border-[#E2E8F0]'
                  }`}
                >
                  {isAr ? opt.labelAr : opt.labelEn}
                </button>
              );
            })}
          </div>

          {/* Programs List */}
          <div className="space-y-6">
            {filteredPrograms.map((program) => {
              const isExpanded = expandedProgramId === program.id;
              const title = isAr ? program.titleAr : program.titleEn;
              const desc = isAr ? program.descriptionAr : program.descriptionEn;
              const duration = isAr ? program.durationAr : program.durationEn;
              const type = isAr ? program.typeAr : program.typeEn;
              const highlights = isAr ? program.highlightsAr : program.highlightsEn;
              const isEnrolled = !!enrolledPrograms[program.id];

              return (
                <div
                  key={program.id}
                  className="bg-white border border-[#E2E8F0] hover:border-[#D81B60]/30 rounded-3xl overflow-hidden shadow-xs transition-all"
                >
                  {/* Banner with image */}
                  <div className="relative h-48 sm:h-56 w-full">
                    <img
                      src={program.imageUrl}
                      alt={title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent"></div>
                    <div className="absolute top-3 start-3 flex gap-2">
                      <span className="bg-[#DDFFBB] text-[#1E293B] text-[10px] font-black px-2.5 py-1 rounded-xl shadow-xs">
                        {type}
                      </span>
                      <span className="bg-white/90 backdrop-blur-xs text-[#D81B60] text-[10px] font-black px-2.5 py-1 rounded-xl shadow-xs flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {duration}
                      </span>
                    </div>

                    {isEnrolled && (
                      <span className="absolute top-3 end-3 bg-emerald-600 text-white text-[10px] font-black px-2.5 py-1 rounded-xl shadow-xs flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        {isAr ? 'مشتركة بالبرنامج' : 'Enrolled'}
                      </span>
                    )}

                    <div className="absolute bottom-3 start-3 end-3 text-white">
                      <h3 className="text-base sm:text-lg font-black leading-snug">
                        {title}
                      </h3>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5">
                    <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                      {desc}
                    </p>

                    {/* Highlights */}
                    <div className="my-4 bg-[#FCF8F9] border border-[#FFCEE3]/60 rounded-2xl p-3.5 space-y-2">
                      <h4 className="text-[11px] font-bold text-[#D81B60] uppercase tracking-wider">
                        {isAr ? 'أبرز محاور ومخرجات البرنامج:' : 'Key Program Deliverables:'}
                      </h4>
                      <ul className="space-y-1.5">
                        {highlights.map((h, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-[#1E293B]">
                            <span className="w-4 h-4 rounded-full bg-[#DDFFBB] text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                              <Check className="w-3 h-3" />
                            </span>
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Pricing Display matching exact prompt prices */}
                    <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-3.5 mb-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-[#64748B] block font-bold uppercase tracking-wider">
                            {isAr ? 'سعر البرنامج الأساسي:' : 'Base Program Price:'}
                          </span>
                          <span className="text-base font-black text-[#1E293B]">
                            {program.basePriceDzd.toLocaleString()} DZD
                          </span>
                        </div>

                        <div className="text-end">
                          <span className="text-[10px] text-emerald-700 block font-bold uppercase tracking-wider">
                            {isAr ? 'مع المتابعة من أخصائي التغذية:' : 'With Specialist Follow-up:'}
                          </span>
                          <span className="text-lg font-black text-[#D81B60]">
                            {(program.followUpPriceDzd || 3990).toLocaleString()} DZD
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-[#E2E8F0]">
                      <button
                        onClick={() => toggleExpand(program.id)}
                        className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-3.5 py-2 bg-white border border-[#E2E8F0] hover:border-[#D81B60] text-[#1E293B] rounded-xl text-xs font-bold transition-colors"
                      >
                        <Utensils className="w-3.5 h-3.5 text-[#D81B60]" />
                        <span>{isAr ? 'الوصفات المرفقة بالبرنامج' : 'Meal Guide'}</span>
                        {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>

                      <button
                        onClick={() => setEnrollingProgram(program)}
                        data-testid={`enroll-program-btn-${program.id}`}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-[#D81B60] hover:bg-[#C2185B] text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
                      >
                        <CreditCard className="w-4 h-4" />
                        <span>{isAr ? 'اشتراك بالبرنامج (CIB / بريدي موب)' : 'Enroll with CIB / BaridiMob'}</span>
                      </button>
                    </div>

                    {/* Expandable Recipes Section */}
                    {isExpanded && program.recipes.length > 0 && (
                      <div className="mt-5 pt-4 border-t border-[#E2E8F0] space-y-3 animate-in fade-in">
                        <div className="flex items-center justify-between">
                          <h5 className="text-xs font-black text-[#1E293B] flex items-center gap-1.5">
                            <Utensils className="w-3.5 h-3.5 text-[#D81B60]" />
                            <span>
                              {isAr ? 'وجبات نموذجية متضمنة بالبرنامج:' : 'Included Therapeutic Recipes:'}
                            </span>
                          </h5>
                          <button
                            onClick={() => setActiveMainTab('recipes')}
                            className="text-[11px] font-bold text-[#D81B60] hover:underline"
                          >
                            {isAr ? `تصفح المكتبة كاملة (+${totalRecipesCount})` : 'Browse all recipes'}
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {program.recipes.map((recipe, idx) => (
                            <div
                              key={idx}
                              className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-3 flex gap-3 items-start"
                            >
                              <img
                                src={recipe.imageUrl}
                                alt={isAr ? recipe.titleAr : recipe.titleEn}
                                className="w-16 h-16 rounded-xl object-cover shrink-0"
                              />
                              <div className="min-w-0">
                                <h6 className="font-extrabold text-xs text-[#1E293B] leading-tight">
                                  {isAr ? recipe.titleAr : recipe.titleEn}
                                </h6>
                                <p className="text-[10px] text-emerald-800 bg-[#DDFFBB]/60 font-semibold px-1.5 py-0.5 rounded-md mt-1 line-clamp-1">
                                  {isAr ? recipe.benefitAr : recipe.benefitEn}
                                </p>
                                <p className="text-[11px] text-[#64748B] mt-1 line-clamp-2">
                                  {isAr ? recipe.descAr : recipe.descEn}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================== */}
      {/* SECTION 2: DEDICATED RECIPES BOX (+100 RECIPES & 30-PACK) */}
      {/* ========================================================== */}
      {activeMainTab === 'recipes' && (
        <div className="space-y-5 animate-in fade-in" data-testid="recipes-catalog-section">
          {/* Header of Recipes */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base sm:text-lg font-black text-[#1E293B]">
                {isAr
                  ? `خانة ومكتبة الوصفات الصحية لتكيس المبايض (أزيد من ${totalRecipesCount} وصفة)`
                  : `PCOS Therapeutic Recipe Library (+${totalRecipesCount} Recipes)`}
              </h3>
              <p className="text-xs text-[#64748B] mt-0.5">
                {isAr
                  ? 'وجبات منتقاة مخفضة للأنسولين، غنية بمضادات الأكسدة ومحسوبة السعرات لدعم التبويض اليومي.'
                  : 'Calculated nutrient-dense meals supporting insulin sensitivity and ovulation.'}
              </p>
            </div>

            {/* Unlock Status / Buy Button */}
            {!unlockedRecipeBundle ? (
              <button
                onClick={handleBuyRecipeBundle}
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5 shrink-0"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#DDFFBB]" />
                <span>{isAr ? `شراء حزمة 30 وصفة (${recipeBundlePriceDzd} دج)` : `Buy 30-Pack (${recipeBundlePriceDzd} DZD)`}</span>
              </button>
            ) : (
              <span className="text-xs font-black text-emerald-800 bg-[#DDFFBB] px-3 py-1.5 rounded-xl border border-emerald-300 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {isAr ? 'حزمة الـ 30 وصفة مفعلة بالكامل' : '30-Pack Fully Unlocked'}
              </span>
            )}
          </div>

          {/* Search & Categories */}
          <div className="space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute inset-y-0 start-3 my-auto text-[#64748B]" />
              <input
                type="text"
                value={recipeSearch}
                onChange={(e) => setRecipeSearch(e.target.value)}
                placeholder={
                  isAr
                    ? 'ابحثي في أزيد من 100 وصفة: سلمون، بذور الشيا، إكسير النعناع، كيتو...'
                    : 'Search in 100+ recipes: salmon, chia, spearmint tea, keto...'
                }
                className="w-full bg-white border border-[#E2E8F0] focus:border-[#D81B60] rounded-2xl ps-10 pe-4 py-2.5 text-xs text-[#1E293B] shadow-2xs outline-none"
              />
            </div>

            {/* Category tabs */}
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
              {recipeCategories.map((cat) => {
                const isActive = recipeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setRecipeCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
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
          </div>

          {/* Recipes Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredRecipes.map((recipe) => {
              const title = isAr ? recipe.titleAr : recipe.titleEn;
              const cat = isAr ? recipe.categoryAr : recipe.categoryEn;
              const benefit = isAr ? recipe.hormonalBenefitAr : recipe.hormonalBenefitEn;
              const prep = isAr ? recipe.prepTimeAr : recipe.prepTimeEn;

              return (
                <div
                  key={recipe.id}
                  onClick={() => setSelectedRecipe(recipe)}
                  className="bg-white border border-[#E2E8F0] hover:border-[#D81B60]/40 rounded-3xl overflow-hidden shadow-xs cursor-pointer transition-all flex flex-col justify-between group"
                >
                  <div className="relative h-40 w-full overflow-hidden">
                    <img
                      src={recipe.imageUrl}
                      alt={title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-2.5 start-2.5 bg-white/90 backdrop-blur-xs text-[#1E293B] text-[10px] font-bold px-2.5 py-0.5 rounded-lg shadow-xs">
                      {cat}
                    </span>
                    <span className="absolute top-2.5 end-2.5 bg-[#FFCEE3]/90 text-[#D81B60] text-[10px] font-black px-2 py-0.5 rounded-lg shadow-xs flex items-center gap-1">
                      <Flame className="w-3 h-3" />
                      {recipe.calories} kcal
                    </span>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-extrabold text-xs sm:text-sm text-[#1E293B] group-hover:text-[#D81B60] transition-colors line-clamp-1">
                        {title}
                      </h4>
                      <p className="text-[11px] text-emerald-800 bg-[#DDFFBB]/50 rounded-lg p-2 mt-2 font-medium line-clamp-2 leading-relaxed">
                        {benefit}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-3 mt-3 border-t border-[#E2E8F0] text-[11px]">
                      <span className="text-[#64748B] flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#D81B60]" />
                        {prep}
                      </span>

                      <span className="text-xs font-bold text-[#D81B60] flex items-center gap-0.5 group-hover:underline">
                        <span>{isAr ? 'عرض التفاصيل' : 'View Recipe'}</span>
                        <ChevronRight className={`w-3.5 h-3.5 ${isAr ? 'rotate-180' : ''}`} />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================== */}
      {/* PROGRAM ENROLLMENT & TIER CHECKOUT MODAL */}
      {/* ========================================================== */}
      {enrollingProgram && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-xs animate-in fade-in"
          onClick={() => setEnrollingProgram(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-md w-full p-5 sm:p-6 shadow-2xl border border-[#E2E8F0]"
            onClick={(e) => e.stopPropagation()}
            data-testid="program-checkout-modal"
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
              <div className="flex items-center gap-2">
                <HeartHandshake className="w-5 h-5 text-[#D81B60]" />
                <h3 className="font-black text-sm sm:text-base text-[#1E293B]">
                  {isAr ? 'اختيار باقة الاشتراك في البرنامج' : 'Program Enrollment Option'}
                </h3>
              </div>
              <button
                onClick={() => setEnrollingProgram(null)}
                className="w-7 h-7 rounded-full bg-[#FCF8F9] hover:bg-[#FFCEE3]/40 text-[#64748B] flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="my-4 space-y-3">
              <h4 className="font-extrabold text-sm sm:text-base text-[#1E293B]">
                {isAr ? enrollingProgram.titleAr : enrollingProgram.titleEn}
              </h4>
              <p className="text-xs text-[#64748B]">
                {isAr
                  ? 'حددي نوع الاشتراك المرغوب للاستفادة من البروتوكول والمتابعة الشخصية:'
                  : 'Select your preferred enrollment tier below:'}
              </p>

              {/* Tier 1: With Follow-up (3990 DZD) */}
              <div
                onClick={() => setIncludeFollowUp(true)}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                  includeFollowUp
                    ? 'border-[#D81B60] bg-rose-50/60 shadow-xs ring-1 ring-[#D81B60]'
                    : 'border-[#E2E8F0] bg-white hover:border-[#CBD5E1]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full border-2 flex items-center justify-center border-[#D81B60]">
                      {includeFollowUp && <span className="w-2 h-2 rounded-full bg-[#D81B60]"></span>}
                    </span>
                    <span className="font-black text-xs sm:text-sm text-[#1E293B]">
                      {isAr ? 'البرنامج + متابعة أخصائية التغذية سارة لونا' : 'Protocol + Specialist Follow-up'}
                    </span>
                  </div>
                  <span className="font-black text-[#D81B60] text-sm sm:text-base">
                    {(enrollingProgram.followUpPriceDzd || 3990).toLocaleString()} DZD
                  </span>
                </div>
                <p className="text-[11px] text-[#475569] mt-1.5 ms-6 leading-relaxed">
                  {isAr
                    ? 'يشمل الدليل الغذائي الكامل + استشارات متابعة هرمونية فردية دورية مع الدكتورة سارة لونا.'
                    : 'Includes full clinical protocol plus 1-on-1 ongoing assessments with Specialist Sarah Louna.'}
                </p>
              </div>

              {/* Tier 2: Base Program only (3000 DZD) */}
              <div
                onClick={() => setIncludeFollowUp(false)}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                  !includeFollowUp
                    ? 'border-[#D81B60] bg-rose-50/60 shadow-xs ring-1 ring-[#D81B60]'
                    : 'border-[#E2E8F0] bg-white hover:border-[#CBD5E1]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full border-2 flex items-center justify-center border-[#D81B60]">
                      {!includeFollowUp && <span className="w-2 h-2 rounded-full bg-[#D81B60]"></span>}
                    </span>
                    <span className="font-black text-xs sm:text-sm text-[#1E293B]">
                      {isAr ? 'البرنامج الأساسي فقط' : 'Base Program Only'}
                    </span>
                  </div>
                  <span className="font-black text-[#1E293B] text-sm sm:text-base">
                    {enrollingProgram.basePriceDzd.toLocaleString()} DZD
                  </span>
                </div>
                <p className="text-[11px] text-[#64748B] mt-1.5 ms-6 leading-relaxed">
                  {isAr
                    ? 'يشمل تحميل الدليل الغذائي والوصفات وجداول التمارين دون استشارات فردية.'
                    : 'Self-guided dietary manual, workout routines and meal guides without 1-on-1 follow-up.'}
                </p>
              </div>
            </div>

            {/* Payment CTA */}
            <div className="space-y-2 pt-2 border-t border-[#E2E8F0]">
              <button
                onClick={() => handleStartProgramCheckout(enrollingProgram)}
                className="w-full py-3 bg-[#D81B60] hover:bg-[#C2185B] text-white rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <CreditCard className="w-4 h-4" />
                <span>
                  {isAr
                    ? `متابعة الدفع عبر CIB أو بريدي موب (${(includeFollowUp ? (enrollingProgram.followUpPriceDzd || 3990) : enrollingProgram.basePriceDzd).toLocaleString()} دج)`
                    : `Checkout with CIB / BaridiMob (${(includeFollowUp ? (enrollingProgram.followUpPriceDzd || 3990) : enrollingProgram.basePriceDzd).toLocaleString()} DZD)`}
                </span>
              </button>

              <button
                onClick={() => setEnrollingProgram(null)}
                className="w-full py-2 bg-white text-[#64748B] hover:text-[#1E293B] rounded-xl text-xs font-semibold"
              >
                {isAr ? 'إلغاء' : 'Cancel'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================== */}
      {/* RECIPE DETAIL MODAL */}
      {/* ========================================================== */}
      {selectedRecipe && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-xs animate-in fade-in"
          onClick={() => setSelectedRecipe(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-5 sm:p-6 shadow-2xl border border-[#E2E8F0]"
            onClick={(e) => e.stopPropagation()}
            data-testid="recipe-detail-modal"
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
              <span className="text-[11px] font-bold text-[#D81B60] bg-[#FFCEE3]/40 px-3 py-1 rounded-full">
                {isAr ? selectedRecipe.categoryAr : selectedRecipe.categoryEn}
              </span>
              <button
                onClick={() => setSelectedRecipe(null)}
                className="w-7 h-7 rounded-full bg-[#FCF8F9] hover:bg-[#FFCEE3]/40 text-[#64748B] flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <img
              src={selectedRecipe.imageUrl}
              alt={isAr ? selectedRecipe.titleAr : selectedRecipe.titleEn}
              className="w-full h-48 object-cover rounded-2xl my-3 shadow-xs"
            />

            <h3 className="text-base sm:text-lg font-black text-[#1E293B] leading-tight">
              {isAr ? selectedRecipe.titleAr : selectedRecipe.titleEn}
            </h3>

            {/* Macros Bar */}
            <div className="grid grid-cols-4 gap-2 my-3 text-center text-xs">
              <div className="bg-[#FCF8F9] border border-[#E2E8F0] p-2 rounded-xl">
                <span className="text-[9px] text-[#64748B] block font-bold">{isAr ? 'سعرات' : 'Calories'}</span>
                <span className="font-black text-[#D81B60]">{selectedRecipe.calories}</span>
              </div>
              <div className="bg-[#FCF8F9] border border-[#E2E8F0] p-2 rounded-xl">
                <span className="text-[9px] text-[#64748B] block font-bold">{isAr ? 'بروتين' : 'Protein'}</span>
                <span className="font-bold text-[#1E293B]">{selectedRecipe.proteinG}g</span>
              </div>
              <div className="bg-[#FCF8F9] border border-[#E2E8F0] p-2 rounded-xl">
                <span className="text-[9px] text-[#64748B] block font-bold">{isAr ? 'نشويات' : 'Carbs'}</span>
                <span className="font-bold text-[#1E293B]">{selectedRecipe.carbsG}g</span>
              </div>
              <div className="bg-[#FCF8F9] border border-[#E2E8F0] p-2 rounded-xl">
                <span className="text-[9px] text-[#64748B] block font-bold">{isAr ? 'دهون صحية' : 'Fats'}</span>
                <span className="font-bold text-[#1E293B]">{selectedRecipe.fatG}g</span>
              </div>
            </div>

            {/* Hormonal Benefit Box */}
            <div className="bg-[#DDFFBB]/40 border border-[#DDFFBB] rounded-2xl p-3 text-xs">
              <span className="font-black text-emerald-900 block mb-1">
                {isAr ? '🌿 الفائدة الهرمونية الخاصة بتكيس المبايض:' : '🌿 Targeted Hormonal Benefit:'}
              </span>
              <p className="text-emerald-950 font-medium leading-relaxed">
                {isAr ? selectedRecipe.hormonalBenefitAr : selectedRecipe.hormonalBenefitEn}
              </p>
            </div>

            {/* Ingredients */}
            <div className="mt-4">
              <h4 className="font-black text-xs sm:text-sm text-[#1E293B] mb-2 flex items-center gap-1.5">
                <Utensils className="w-4 h-4 text-[#D81B60]" />
                <span>{isAr ? 'المقادير والمكونات:' : 'Ingredients:'}</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-[#334155]">
                {(isAr ? selectedRecipe.ingredientsAr : selectedRecipe.ingredientsEn).map((ing, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D81B60] shrink-0 mt-1.5"></span>
                    <span>{ing}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Preparation Steps */}
            <div className="mt-4">
              <h4 className="font-black text-xs sm:text-sm text-[#1E293B] mb-2 flex items-center gap-1.5">
                <ChefHat className="w-4 h-4 text-[#D81B60]" />
                <span>{isAr ? 'طريقة التحضير خطوة بخطوة:' : 'Preparation Steps:'}</span>
              </h4>
              <ol className="space-y-2 text-xs text-[#334155]">
                {(isAr ? selectedRecipe.stepsAr : selectedRecipe.stepsEn).map((step, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#FCF8F9] border border-[#FFCEE3] text-[#D81B60] font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <button
              onClick={() => setSelectedRecipe(null)}
              className="w-full mt-6 py-2.5 bg-[#D81B60] text-white rounded-xl text-xs font-bold hover:bg-[#C2185B]"
            >
              {isAr ? 'إغلاق الوصفة' : 'Close Recipe'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
