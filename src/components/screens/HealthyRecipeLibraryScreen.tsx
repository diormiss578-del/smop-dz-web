import React, { useState, useMemo } from 'react';
import {
  Search,
  X,
  Clock,
  Flame,
  Dumbbell,
  Wheat,
  Droplet,
  Heart,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  Lock,
  CheckCircle2,
  Share2,
  ChefHat,
  CreditCard,
  Smartphone,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  Layers,
  UtensilsCrossed,
  Info,
  Plus,
  Check,
  Trash2,
  SlidersHorizontal,
  Eye,
  ShoppingBag,
  RotateCcw,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { usePcos } from '../../context/PcosContext';
import {
  HealthyRecipe,
  RecipePack,
  HEALTHY_RECIPES_DATA,
  RECIPE_PACKS
} from '../../data/healthyRecipesData';

interface HealthyRecipeLibraryScreenProps {
  embedded?: boolean;
  onBack?: () => void;
}

export const HealthyRecipeLibraryScreen: React.FC<HealthyRecipeLibraryScreenProps> = ({
  embedded = false,
  onBack
}) => {
  const { language, navigateTo } = usePcos();
  const isAr = language === 'AR';

  // Search & Categories in Main Library
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedRecipe, setSelectedRecipe] = useState<HealthyRecipe | null>(null);
  const [savedRecipeIds, setSavedRecipeIds] = useState<Set<string>>(() => new Set(['hr_b1']));

  // Custom Recipe Pack Selection & Freemium State
  const [unlockedPacks, setUnlockedPacks] = useState<boolean>(false);
  const [unlockedCustomRecipeIds, setUnlockedCustomRecipeIds] = useState<Set<string>>(() => new Set());
  const [selectedPack, setSelectedPack] = useState<RecipePack>(RECIPE_PACKS[0]); // Default 10 recipes (690 DA)
  const [selectedCustomRecipeIds, setSelectedCustomRecipeIds] = useState<Set<string>>(() => new Set());
  
  // Modal & Flow Navigation
  const [paymentModalOpen, setPaymentModalOpen] = useState<boolean>(false);
  const [paymentStep, setPaymentStep] = useState<
    'select_pack' | 'choose_recipes' | 'select_method' | 'checkout' | 'success'
  >('choose_recipes');
  const [selectedMethod, setSelectedMethod] = useState<'cib' | 'baridimob'>('cib');
  const [freeRecipesUsedCount] = useState<number>(7);

  // Builder filters
  const [builderCategory, setBuilderCategory] = useState<string>('All');
  const [builderSearch, setBuilderSearch] = useState<string>('');
  const [showSelectedTray, setShowSelectedTray] = useState<boolean>(false);
  const [feedbackToast, setFeedbackToast] = useState<string | null>(null);

  const categories = useMemo(() => {
    const list = [
      { id: 'All', en: 'All', ar: 'الكل' },
      { id: 'Breakfast', en: 'Breakfast', ar: 'فطور الصباح' },
      { id: 'Lunch', en: 'Lunch', ar: 'الغداء' },
      { id: 'Dinner', en: 'Dinner', ar: 'العشاء' },
      { id: 'Snacks', en: 'Snacks', ar: 'سناك' },
      { id: 'Smoothies', en: 'Smoothies', ar: 'سموذي وعصائر' },
      { id: 'Healthy Desserts', en: 'Healthy Desserts', ar: 'حلويات صحية' }
    ];

    if (unlockedCustomRecipeIds.size > 0) {
      list.unshift({
        id: 'MyCustomPack',
        en: `🌟 My Pack (${unlockedCustomRecipeIds.size})`,
        ar: `🌟 وصفاتي المفعلة (${unlockedCustomRecipeIds.size})`
      });
    }

    return list;
  }, [unlockedCustomRecipeIds.size]);

  // Main list filtering
  const filteredRecipes = useMemo(() => {
    return HEALTHY_RECIPES_DATA.filter((recipe) => {
      let matchesCategory = false;
      if (selectedCategory === 'All') {
        matchesCategory = true;
      } else if (selectedCategory === 'MyCustomPack') {
        matchesCategory = unlockedCustomRecipeIds.has(recipe.id);
      } else {
        matchesCategory = recipe.category === selectedCategory;
      }

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        recipe.title.toLowerCase().includes(query) ||
        recipe.titleAr.toLowerCase().includes(query) ||
        recipe.category.toLowerCase().includes(query) ||
        recipe.ingredients.some((ing) => ing.toLowerCase().includes(query)) ||
        recipe.ingredientsAr.some((ing) => ing.includes(query));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery, unlockedCustomRecipeIds]);

  // Builder list filtering
  const builderFilteredRecipes = useMemo(() => {
    return HEALTHY_RECIPES_DATA.filter((recipe) => {
      const matchesCat = builderCategory === 'All' || recipe.category === builderCategory;
      const query = builderSearch.toLowerCase().trim();
      const matchesSearch =
        !query ||
        recipe.title.toLowerCase().includes(query) ||
        recipe.titleAr.toLowerCase().includes(query) ||
        recipe.category.toLowerCase().includes(query) ||
        recipe.ingredients.some((ing) => ing.toLowerCase().includes(query)) ||
        recipe.ingredientsAr.some((ing) => ing.includes(query));
      return matchesCat && matchesSearch;
    });
  }, [builderCategory, builderSearch]);

  const showToast = (msg: string) => {
    setFeedbackToast(msg);
    setTimeout(() => {
      setFeedbackToast((current) => (current === msg ? null : current));
    }, 3200);
  };

  const isRecipeUnlocked = (recipe: HealthyRecipe): boolean => {
    if (!recipe.isPremium) return true;
    if (unlockedPacks) return true;
    if (unlockedCustomRecipeIds.has(recipe.id)) return true;
    return false;
  };

  // Toggle selection of a recipe in custom pack
  const toggleCustomRecipeSelection = (recipeId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    setSelectedCustomRecipeIds((prev) => {
      const next = new Set(prev);
      if (next.has(recipeId)) {
        next.delete(recipeId);
        showToast(isAr ? 'تمت إزالة الوصفة من الحزمة' : 'Recipe removed from pack');
      } else {
        if (next.size >= selectedPack.recipesCount) {
          showToast(
            isAr
              ? `لقد اكتملت سعة الحزمة (${selectedPack.recipesCount} وصفة). يمكنكِ إزالة وصفة لاستبدالها أو الترقية لباقة أكبر.`
              : `Pack capacity reached (${selectedPack.recipesCount} recipes). Remove one to swap or choose a larger pack.`
          );
          return prev;
        }
        next.add(recipeId);
        showToast(
          isAr
            ? `أُضيفت الوصفة للحزمة (${next.size} / ${selectedPack.recipesCount})`
            : `Added to custom pack (${next.size} / ${selectedPack.recipesCount})`
        );
      }
      return next;
    });
  };

  // Auto-fill balanced selection helper
  const handleAutoFillCustomPack = (targetCount: number = selectedPack.recipesCount) => {
    const selected = new Set<string>();
    const categoriesOrder = ['Breakfast', 'Lunch', 'Dinner', 'Snacks', 'Smoothies', 'Healthy Desserts'];

    // Round-robin balanced distribution
    for (let pass = 0; pass < 20 && selected.size < targetCount; pass++) {
      for (const cat of categoriesOrder) {
        if (selected.size >= targetCount) break;
        const matching = HEALTHY_RECIPES_DATA.filter((r) => r.category === cat);
        if (matching[pass]) {
          selected.add(matching[pass].id);
        }
      }
    }

    // Fill remaining if needed
    for (const r of HEALTHY_RECIPES_DATA) {
      if (selected.size >= targetCount) break;
      selected.add(r.id);
    }

    setSelectedCustomRecipeIds(selected);
    showToast(
      isAr
        ? `تم اختيار ${selected.size} وصفة متوازنة تلقائياً! يمكنكِ مراجعتها وتعديلها.`
        : `Auto-selected ${selected.size} recipes! You can adjust them as you wish.`
    );
  };

  const handleClearSelection = () => {
    setSelectedCustomRecipeIds(new Set());
    showToast(isAr ? 'تم تفريغ اختيارات الحزمة' : 'Pack selection cleared');
  };

  const handleSelectPackTier = (pack: RecipePack) => {
    setSelectedPack(pack);
    // If current selected count exceeds new pack size, trim
    if (selectedCustomRecipeIds.size > pack.recipesCount) {
      const trimmed = new Set(Array.from(selectedCustomRecipeIds).slice(0, pack.recipesCount));
      setSelectedCustomRecipeIds(trimmed);
    }
  };

  const handleOpenBuilderWithPack = (pack: RecipePack) => {
    handleSelectPackTier(pack);
    setPaymentStep('choose_recipes');
    setPaymentModalOpen(true);
  };

  const handleOpenRecipe = (recipe: HealthyRecipe) => {
    if (!isRecipeUnlocked(recipe)) {
      // Prompt user to add to pack or buy custom pack
      if (!selectedCustomRecipeIds.has(recipe.id)) {
        if (selectedCustomRecipeIds.size < selectedPack.recipesCount) {
          setSelectedCustomRecipeIds((prev) => new Set(prev).add(recipe.id));
        }
      }
      setPaymentStep('choose_recipes');
      setPaymentModalOpen(true);
      return;
    }
    setSelectedRecipe(recipe);
  };

  const toggleSaveRecipe = (recipeId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSavedRecipeIds((prev) => {
      const next = new Set(prev);
      if (next.has(recipeId)) {
        next.delete(recipeId);
      } else {
        next.add(recipeId);
      }
      return next;
    });
  };

  // Execution of simulated checkout
  const handleExecutePayment = () => {
    try {
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.6 }
      });
    } catch {
      // Fallback
    }

    // Ensure full allocation
    const finalSet = new Set(selectedCustomRecipeIds);
    if (finalSet.size === 0) {
      HEALTHY_RECIPES_DATA.slice(0, selectedPack.recipesCount).forEach((r) => finalSet.add(r.id));
    } else if (finalSet.size < selectedPack.recipesCount) {
      for (const r of HEALTHY_RECIPES_DATA) {
        if (finalSet.size >= selectedPack.recipesCount) break;
        finalSet.add(r.id);
      }
    }

    setSelectedCustomRecipeIds(finalSet);
    setUnlockedCustomRecipeIds((prev) => {
      const next = new Set(prev);
      finalSet.forEach((id) => next.add(id));
      return next;
    });
    setPaymentStep('success');
  };

  // Selected recipes details for trays/previews
  const selectedRecipesObjects = useMemo(() => {
    const idSet = selectedCustomRecipeIds;
    return HEALTHY_RECIPES_DATA.filter((r) => idSet.has(r.id));
  }, [selectedCustomRecipeIds]);

  return (
    <div className="space-y-6 pb-28 animate-in fade-in duration-300 relative">
      {/* Toast Notification */}
      {feedbackToast && (
        <div className="fixed top-20 start-1/2 -translate-x-1/2 z-50 bg-[#1E293B]/95 text-white backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl border border-white/10 text-xs font-bold animate-in fade-in slide-in-from-top-4 flex items-center gap-2 max-w-sm text-center">
          <Sparkles className="w-4 h-4 text-[#FFCEE3] shrink-0" />
          <span>{feedbackToast}</span>
        </div>
      )}

      {/* Top Navigation & Breadcrumb */}
      <div className="flex items-center justify-between gap-3 pt-1">
        <button
          onClick={onBack ? onBack : () => navigateTo('programs')}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white hover:bg-[#FFF0F6] border border-[#FFCEE3] text-[#D81B60] text-xs font-bold transition-colors shadow-2xs group"
          title={isAr ? 'العودة إلى البرامج' : 'Back to Programs'}
        >
          {isAr ? (
            <>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              <span>العودة إلى البرامج</span>
            </>
          ) : (
            <>
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              <span>Back to Programs</span>
            </>
          )}
        </button>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#FFF0F6] text-[#D81B60] border border-[#FFCEE3]">
            {isAr ? 'نسخة تفاعلية Prototype' : 'Interactive Prototype'}
          </span>
        </div>
      </div>

      {/* Page Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-white via-[#FCF8F9] to-[#FFF0F6] rounded-3xl p-5 sm:p-7 border border-[#FFCEE3] shadow-xs">
        <div className="max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFCEE3]/60 text-[#D81B60] text-xs font-black uppercase tracking-wider mb-2">
            <ChefHat className="w-3.5 h-3.5" />
            <span>SMOP DZ Kitchen Vault</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-[#1E293B] tracking-tight">
            Healthy Recipe Library
          </h2>

          <p className="text-xs sm:text-sm text-[#64748B] mt-1.5 leading-relaxed font-medium">
            {isAr
              ? 'اكتشفي وصفات صحية ولذيذة وسهلة التحضير لكل أوقات يومكِ، متوافقة مع توازن الهرمونات ومقاومة الإنسولين.'
              : 'Discover healthy, delicious and easy-to-make recipes for every moment of your day.'}
          </p>
        </div>

        {/* Decorative corner accent */}
        <div className="absolute top-0 end-0 w-36 h-36 bg-gradient-to-bl from-[#D81B60]/10 via-[#E040FB]/5 to-transparent rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* Freemium & Custom Pack Purchase Banner */}
      <div className="bg-white border-2 border-[#FFCEE3] rounded-3xl p-4 sm:p-5 shadow-xs relative overflow-hidden space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#D81B60] to-[#E040FB] text-white flex items-center justify-center shrink-0 shadow-2xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-extrabold text-sm sm:text-base text-[#1E293B]">
                  10 free recipes available
                </span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  {freeRecipesUsedCount} / 10 free recipes used
                </span>
              </div>
              <p className="text-xs text-[#64748B] mt-0.5">
                {unlockedCustomRecipeIds.size > 0
                  ? (isAr
                      ? `تم تفعيل حزمتكِ المخصصة بنجاح (${unlockedCustomRecipeIds.size} وصفة مفتوحة) ✓`
                      : `Your custom recipe pack is active (${unlockedCustomRecipeIds.size} recipes unlocked) ✓`)
                  : (isAr
                      ? 'استمتعي بـ 10 وصفات مجانية، أو صممي حزمتكِ الخاصة مع اختيار الوصفات التي تناسبك.'
                      : 'Enjoy 10 free recipes, or build your custom bundle with your chosen recipes.')}
              </p>

              {/* Progress bar visual */}
              <div className="w-full max-w-xs bg-[#E2E8F0] h-2 rounded-full mt-2.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#D81B60] to-[#E040FB] h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${unlockedCustomRecipeIds.size > 0 ? 100 : (freeRecipesUsedCount / 10) * 100}%`
                  }}
                />
              </div>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-2 flex-wrap">
            <button
              onClick={() => handleOpenBuilderWithPack(selectedPack)}
              className="w-full sm:w-auto px-4 py-2.5 rounded-2xl bg-gradient-to-r from-[#D81B60] to-[#C2185B] hover:opacity-95 text-white font-black text-xs shadow-xs transition-all flex items-center justify-center gap-2 hover:scale-[1.02]"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>
                {isAr
                  ? 'صممي حزمتكِ حسب الاختيار (من 690 دج)'
                  : 'Build Custom Pack (from 690 DA)'}
              </span>
            </button>
          </div>
        </div>

        {/* Available Packs Quick Selector Strip */}
        <div className="pt-2 border-t border-[#F1F5F9]">
          <p className="text-[11px] font-extrabold text-[#64748B] mb-2 flex items-center gap-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#D81B60]" />
            <span>
              {isAr
                ? 'باقات الوصفات حسب الاختيار (اختاري وجباتكِ المفضلة):'
                : 'Customizable Recipe Packs (Choose your own meals):'}
            </span>
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {RECIPE_PACKS.map((pack) => {
              const isCurrent = selectedPack.id === pack.id;
              return (
                <div
                  key={pack.id}
                  onClick={() => handleOpenBuilderWithPack(pack)}
                  className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-center justify-between gap-2 text-start ${
                    isCurrent
                      ? 'border-[#D81B60] bg-[#FFF5F9] shadow-2xs'
                      : 'border-[#E2E8F0] hover:border-[#FFCEE3] bg-white'
                  }`}
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-black text-xs text-[#1E293B]">
                        {pack.recipesCount} {isAr ? 'وصفات' : 'Recipes'}
                      </span>
                      {pack.popular && (
                        <span className="text-[9px] font-black px-1.5 py-0.2 rounded-full bg-[#D81B60] text-white">
                          {isAr ? 'الأكثر طلباً' : 'Popular'}
                        </span>
                      )}
                      {pack.bestValue && (
                        <span className="text-[9px] font-black px-1.5 py-0.2 rounded-full bg-emerald-600 text-white">
                          {isAr ? 'أفضل قيمة' : 'Value'}
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-[#64748B] truncate mt-0.5">
                      {isAr ? 'اختاري وصفاتكِ بحرية' : 'Pick your own recipes'}
                    </p>
                  </div>
                  <span className="font-black text-xs text-[#D81B60] shrink-0">
                    {pack.priceDzd.toLocaleString()} DA
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none text-[#64748B]">
          <Search className="w-4 h-4" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search recipes..."
          className="w-full ps-11 pe-10 py-3 rounded-2xl bg-white border border-[#E2E8F0] focus:border-[#D81B60] focus:ring-2 focus:ring-[#D81B60]/20 text-xs sm:text-sm text-[#1E293B] shadow-2xs outline-none transition-all placeholder:text-[#94A3B8]"
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

      {/* Categories Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all whitespace-nowrap shadow-2xs ${
                isActive
                  ? 'bg-gradient-to-r from-[#D81B60] to-[#C2185B] text-white shadow-xs scale-102 font-extrabold'
                  : 'bg-white text-[#64748B] hover:text-[#1E293B] border border-[#E2E8F0] hover:border-[#D81B60]/40'
              }`}
            >
              {isAr ? cat.ar : cat.en}
            </button>
          );
        })}
      </div>

      {/* Recipes Count Info */}
      <div className="flex items-center justify-between text-xs text-[#64748B] px-1">
        <span>
          {isAr
            ? `عرض ${filteredRecipes.length} وصفة صحية`
            : `Showing ${filteredRecipes.length} healthy recipes`}
        </span>
        {selectedCategory !== 'All' && (
          <button
            onClick={() => setSelectedCategory('All')}
            className="text-[#D81B60] hover:underline font-bold"
          >
            {isAr ? 'عرض كل التصنيفات' : 'Reset Category'}
          </button>
        )}
      </div>

      {/* Recipe Cards Grid */}
      {filteredRecipes.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-3xl border border-[#E2E8F0] p-6">
          <UtensilsCrossed className="w-10 h-10 text-[#94A3B8] mx-auto mb-2" />
          <h4 className="font-bold text-sm text-[#1E293B]">
            {isAr ? 'لم نجد وصفات مطابقة لبحثكِ' : 'No recipes found'}
          </h4>
          <p className="text-xs text-[#64748B] mt-1">
            {isAr
              ? 'جربي البحث بكلمات أخرى أو اختاري تصنيفاً مختلفاً'
              : 'Try searching with different keywords or reset filters'}
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-[#FFF0F6] text-[#D81B60] font-bold text-xs"
          >
            {isAr ? 'إعادة ضبط البحث' : 'Clear Search'}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {filteredRecipes.map((recipe) => {
            const isSaved = savedRecipeIds.has(recipe.id);
            const isUnlocked = isRecipeUnlocked(recipe);
            const isLocked = recipe.isPremium && !isUnlocked;
            const isInCustomSelection = selectedCustomRecipeIds.has(recipe.id);
            const isPurchasedInCustomPack = unlockedCustomRecipeIds.has(recipe.id);

            return (
              <div
                key={recipe.id}
                className="bg-white rounded-3xl border border-[#E2E8F0] hover:border-[#FFCEE3] shadow-xs hover:shadow-md transition-all flex flex-col overflow-hidden group relative"
              >
                {/* Image and Badges */}
                <div className="relative aspect-4/3 w-full overflow-hidden bg-slate-100">
                  <img
                    src={recipe.imageUrl}
                    alt={recipe.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />

                  {/* Category Chip */}
                  <span className="absolute top-3 start-3 bg-white/90 backdrop-blur-xs text-[#1E293B] text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow-xs">
                    {recipe.category}
                  </span>

                  {/* Status Badges */}
                  <div className="absolute top-3 end-3 flex flex-col items-end gap-1.5">
                    {isPurchasedInCustomPack ? (
                      <span className="bg-emerald-600 text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>{isAr ? 'مفتوحة في حزمتكِ ✓' : 'In Your Pack ✓'}</span>
                      </span>
                    ) : recipe.isPremium ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenBuilderWithPack(selectedPack);
                        }}
                        className="bg-gradient-to-r from-amber-500 to-amber-600 text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1 hover:scale-105 transition-transform"
                      >
                        <Sparkles className="w-3 h-3 fill-current" />
                        <span>Premium</span>
                      </button>
                    ) : null}

                    {isInCustomSelection && !isPurchasedInCustomPack && (
                      <span className="bg-[#D81B60] text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-xs flex items-center gap-1 animate-pulse">
                        <Check className="w-3 h-3" />
                        <span>{isAr ? 'في الحزمة المحددة' : 'Selected in pack'}</span>
                      </span>
                    )}
                  </div>

                  {/* Save button overlay */}
                  <button
                    onClick={(e) => toggleSaveRecipe(recipe.id, e)}
                    className="absolute bottom-3 end-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs text-[#D81B60] hover:bg-white flex items-center justify-center transition-transform hover:scale-110 shadow-xs"
                    title={isSaved ? 'Remove from saved' : 'Save recipe'}
                  >
                    <Heart className={`w-4 h-4 ${isSaved ? 'fill-[#D81B60]' : ''}`} />
                  </button>

                  {/* Prep Time pill */}
                  <div className="absolute bottom-3 start-3 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#FFCEE3]" />
                    <span>{recipe.prepTime}</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-extrabold text-sm sm:text-base text-[#1E293B] group-hover:text-[#D81B60] transition-colors leading-snug">
                      {isAr ? recipe.titleAr : recipe.title}
                    </h3>
                    <p className="text-[11px] text-[#64748B] mt-1 line-clamp-2 leading-relaxed">
                      {isAr ? recipe.shortDescriptionAr : recipe.shortDescription}
                    </p>
                  </div>

                  {/* Macro Strip */}
                  <div className="grid grid-cols-4 gap-1 py-2.5 my-2 border-y border-[#F1F5F9] text-center">
                    <div className="bg-[#FFF5F9] rounded-xl py-1 px-0.5">
                      <span className="block text-[10px] font-bold text-[#D81B60]">
                        {recipe.calories}
                      </span>
                      <span className="block text-[9px] text-[#64748B] font-medium">kcal</span>
                    </div>
                    <div className="bg-[#F8FAFC] rounded-xl py-1 px-0.5">
                      <span className="block text-[10px] font-bold text-[#1E293B]">
                        {recipe.protein}g
                      </span>
                      <span className="block text-[9px] text-[#64748B] font-medium">Protein</span>
                    </div>
                    <div className="bg-[#F8FAFC] rounded-xl py-1 px-0.5">
                      <span className="block text-[10px] font-bold text-[#1E293B]">
                        {recipe.carbs}g
                      </span>
                      <span className="block text-[9px] text-[#64748B] font-medium">Carbs</span>
                    </div>
                    <div className="bg-[#F8FAFC] rounded-xl py-1 px-0.5">
                      <span className="block text-[10px] font-bold text-[#1E293B]">
                        {recipe.fat}g
                      </span>
                      <span className="block text-[9px] text-[#64748B] font-medium">Fat</span>
                    </div>
                  </div>

                  {/* Card Action Buttons */}
                  <div className="pt-1 flex items-center gap-2">
                    {/* View Recipe Button */}
                    <button
                      onClick={() => handleOpenRecipe(recipe)}
                      className="flex-1 py-2.5 px-3 rounded-2xl bg-[#FFF0F6] hover:bg-[#D81B60] text-[#D81B60] hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-2xs group-hover:bg-[#D81B60] group-hover:text-white"
                    >
                      {isLocked ? (
                        <>
                          <Lock className="w-3.5 h-3.5" />
                          <span>{isAr ? 'فتح الوصفة' : 'View Recipe'}</span>
                        </>
                      ) : (
                        <>
                          <span>{isAr ? 'عرض الوصفة' : 'View Recipe'}</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>

                    {/* Quick Add to Custom Pack Toggle Button */}
                    <button
                      onClick={(e) => toggleCustomRecipeSelection(recipe.id, e)}
                      className={`px-3 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-1 shrink-0 ${
                        isInCustomSelection
                          ? 'bg-[#D81B60] text-white shadow-2xs'
                          : 'bg-[#F8FAFC] hover:bg-[#FFCEE3]/50 text-[#1E293B] border border-[#E2E8F0]'
                      }`}
                      title={
                        isInCustomSelection
                          ? isAr
                            ? 'إزالة من الحزمة'
                            : 'Remove from custom pack'
                          : isAr
                            ? 'إضافة للحزمة المخصصة'
                            : 'Add to custom pack'
                      }
                    >
                      {isInCustomSelection ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">{isAr ? 'مضافة' : 'Added'}</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5 text-[#D81B60]" />
                          <span className="hidden sm:inline">{isAr ? 'للحزمة' : 'To Pack'}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Floating Bottom Dock (when user is selecting custom recipes) */}
      {selectedCustomRecipeIds.size > 0 && !paymentModalOpen && (
        <div className="fixed bottom-16 sm:bottom-6 start-4 end-4 max-w-xl mx-auto z-40 animate-in slide-in-from-bottom-5">
          <div className="bg-[#1E293B]/95 text-white backdrop-blur-md rounded-3xl p-3 sm:p-4 shadow-2xl border-2 border-[#FFCEE3]/40 flex items-center justify-between gap-3">
            <div className="min-w-0 flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#D81B60] to-[#E040FB] flex items-center justify-center shrink-0">
                <ShoppingBag className="w-5 h-5 text-white" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-black text-xs sm:text-sm text-white">
                    {isAr ? 'حزمتكِ المخصصة:' : 'Your Custom Pack:'}
                  </span>
                  <span className="text-[11px] font-black px-2 py-0.5 rounded-full bg-[#D81B60] text-white">
                    {selectedCustomRecipeIds.size} / {selectedPack.recipesCount}
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 truncate mt-0.5">
                  {selectedPack.priceDzd.toLocaleString()} DA •{' '}
                  {selectedCustomRecipeIds.size >= selectedPack.recipesCount
                    ? isAr
                      ? '✅ اكتملت سعة الحزمة'
                      : '✅ Capacity complete'
                    : isAr
                      ? `تبقى ${selectedPack.recipesCount - selectedCustomRecipeIds.size} وصفات`
                      : `${selectedPack.recipesCount - selectedCustomRecipeIds.size} slots left`}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => {
                  setPaymentStep('choose_recipes');
                  setPaymentModalOpen(true);
                }}
                className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors"
              >
                {isAr ? 'تعديل الاختيارات' : 'Edit Pack'}
              </button>
              <button
                onClick={() => {
                  setPaymentStep('select_method');
                  setPaymentModalOpen(true);
                }}
                className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#D81B60] to-[#C2185B] hover:opacity-95 text-white font-black text-xs shadow-md transition-all flex items-center gap-1.5"
              >
                <span>{isAr ? 'شراء الحزمة' : 'Checkout'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================== */}
      {/* 4. RECIPE DETAILS MODAL */}
      {/* ========================================================== */}
      {selectedRecipe && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in"
          onClick={() => setSelectedRecipe(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border-2 border-[#FFCEE3] relative my-auto animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Hero Image */}
            <div className="relative aspect-16/9 sm:aspect-21/9 w-full overflow-hidden bg-slate-100">
              <img
                src={selectedRecipe.imageUrl}
                alt={selectedRecipe.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Close Button */}
              <button
                onClick={() => setSelectedRecipe(null)}
                className="absolute top-3 end-3 w-8 h-8 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors shadow-sm"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Badges on hero */}
              <div className="absolute top-3 start-3 flex items-center gap-2">
                <span className="bg-white/90 backdrop-blur-xs text-[#1E293B] text-[10px] font-extrabold px-2.5 py-1 rounded-full">
                  {selectedRecipe.category}
                </span>
                {unlockedCustomRecipeIds.has(selectedRecipe.id) ? (
                  <span className="bg-emerald-600 text-white text-[10px] font-black px-2.5 py-1 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>{isAr ? 'مفتوحة في حزمتكِ' : 'In Your Pack'}</span>
                  </span>
                ) : selectedRecipe.isPremium ? (
                  <span className="bg-amber-500 text-white text-[10px] font-black px-2.5 py-1 rounded-full flex items-center gap-1">
                    <Sparkles className="w-3 h-3 fill-current" />
                    <span>Premium</span>
                  </span>
                ) : null}
              </div>

              {/* Title on hero */}
              <div className="absolute bottom-3 start-3 end-3 text-white">
                <h3 className="text-lg sm:text-xl font-black drop-shadow-sm leading-tight">
                  {isAr ? selectedRecipe.titleAr : selectedRecipe.title}
                </h3>
                <p className="text-xs text-white/90 line-clamp-1 mt-0.5">
                  {isAr ? selectedRecipe.shortDescriptionAr : selectedRecipe.shortDescription}
                </p>
              </div>
            </div>

            <div className="p-5 sm:p-6 space-y-5">
              {/* Macros Strip */}
              <div className="bg-[#FFF5F9] rounded-2xl p-3 border border-[#FFCEE3] grid grid-cols-4 gap-2 text-center">
                <div>
                  <span className="block text-xs font-black text-[#D81B60]">
                    {selectedRecipe.calories}
                  </span>
                  <span className="block text-[10px] text-[#64748B] font-bold">Calories</span>
                </div>
                <div>
                  <span className="block text-xs font-black text-[#1E293B]">
                    {selectedRecipe.protein}g
                  </span>
                  <span className="block text-[10px] text-[#64748B] font-bold">Protein</span>
                </div>
                <div>
                  <span className="block text-xs font-black text-[#1E293B]">
                    {selectedRecipe.carbs}g
                  </span>
                  <span className="block text-[10px] text-[#64748B] font-bold">Carbs</span>
                </div>
                <div>
                  <span className="block text-xs font-black text-[#1E293B]">
                    {selectedRecipe.fat}g
                  </span>
                  <span className="block text-[10px] text-[#64748B] font-bold">Fat</span>
                </div>
              </div>

              {/* Times & Servings */}
              <div className="flex items-center justify-around py-2.5 px-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-semibold text-[#1E293B]">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#D81B60]" />
                  <span>
                    Prep Time: <strong>{selectedRecipe.prepTime}</strong>
                  </span>
                </div>
                <div className="w-px h-4 bg-[#E2E8F0]" />
                <div className="flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-amber-500" />
                  <span>
                    Cook Time: <strong>{selectedRecipe.cookTime}</strong>
                  </span>
                </div>
                <div className="w-px h-4 bg-[#E2E8F0]" />
                <div className="flex items-center gap-1.5">
                  <UtensilsCrossed className="w-3.5 h-3.5 text-emerald-600" />
                  <span>
                    Servings: <strong>{selectedRecipe.servings}</strong>
                  </span>
                </div>
              </div>

              {/* Ingredients */}
              <div>
                <h4 className="text-sm font-black text-[#1E293B] mb-2.5 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#D81B60]" />
                  <span>Ingredients</span>
                </h4>
                <ul className="space-y-2 bg-[#FCF8F9] rounded-2xl p-4 border border-[#FFCEE3]/60">
                  {(isAr ? selectedRecipe.ingredientsAr : selectedRecipe.ingredients).map((ing, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-[#334155] leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D81B60] mt-1.5 shrink-0" />
                      <span>{ing}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Instructions */}
              <div>
                <h4 className="text-sm font-black text-[#1E293B] mb-2.5 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#D81B60]" />
                  <span>Instructions</span>
                </h4>
                <ol className="space-y-3">
                  {(isAr ? selectedRecipe.instructionsAr : selectedRecipe.instructions).map((step, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-xs text-[#334155] leading-relaxed">
                      <span className="w-5 h-5 rounded-full bg-[#D81B60] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Interactive Actions */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-2.5">
                <button
                  onClick={() => toggleSaveRecipe(selectedRecipe.id)}
                  className={`w-full sm:flex-1 py-3 px-4 rounded-2xl font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-xs ${
                    savedRecipeIds.has(selectedRecipe.id)
                      ? 'bg-[#D81B60] text-white'
                      : 'bg-[#FFF0F6] hover:bg-[#FFE5F0] text-[#D81B60] border border-[#FFCEE3]'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${savedRecipeIds.has(selectedRecipe.id) ? 'fill-white' : ''}`} />
                  <span>
                    {savedRecipeIds.has(selectedRecipe.id) ? '♥ Saved in My Recipes' : '♡ Save Recipe'}
                  </span>
                </button>

                {/* Add to Custom Pack Shortcut */}
                <button
                  onClick={(e) => toggleCustomRecipeSelection(selectedRecipe.id, e)}
                  className={`w-full sm:w-auto px-4 py-3 rounded-2xl font-bold text-xs transition-all flex items-center justify-center gap-2 ${
                    selectedCustomRecipeIds.has(selectedRecipe.id)
                      ? 'bg-slate-800 text-white'
                      : 'bg-[#F8FAFC] text-[#1E293B] border border-[#E2E8F0] hover:border-[#D81B60]'
                  }`}
                >
                  {selectedCustomRecipeIds.has(selectedRecipe.id) ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>{isAr ? 'مضافة لحزمتكِ ✓' : 'In Custom Pack ✓'}</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 text-[#D81B60]" />
                      <span>{isAr ? 'إضافة للحزمة المخصصة' : 'Add to Custom Pack'}</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => setSelectedRecipe(null)}
                  className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-[#1E293B] font-bold text-xs transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================== */}
      {/* 5. CUSTOM RECIPE PACK BUILDER & PAYMENT MODAL */}
      {/* ========================================================== */}
      {paymentModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in"
          onClick={() => setPaymentModalOpen(false)}
        >
          <div
            className={`bg-white rounded-3xl w-full shadow-2xl border-2 border-[#FFCEE3] relative my-auto p-4 sm:p-6 animate-in zoom-in-95 duration-200 ${
              paymentStep === 'choose_recipes' ? 'max-w-3xl max-h-[92vh] overflow-y-auto' : 'max-w-md'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#FFF0F6] text-[#D81B60] flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-black text-sm sm:text-base text-[#1E293B]">
                    {paymentStep === 'select_pack' && (isAr ? 'اختيار باقة الوصفات' : 'Select Recipe Pack')}
                    {paymentStep === 'choose_recipes' && (isAr ? 'اختيار الوصفات داخل الحزمة' : 'Pick Recipes for Your Pack')}
                    {paymentStep === 'select_method' && 'Choose your payment method'}
                    {paymentStep === 'checkout' && 'Order Checkout'}
                    {paymentStep === 'success' && 'Payment Successful ✓'}
                  </h3>
                  <p className="text-[10px] text-[#64748B]">
                    {paymentStep === 'success'
                      ? (isAr ? 'تم تفعيل حزمتكِ المخصصة' : 'Recipe pack activated')
                      : (isAr ? 'باقة مخصصة حسب اختياركِ • محاكاة تجريبية' : 'Custom pack prototype • Simulation')}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setPaymentModalOpen(false)}
                className="w-7 h-7 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* STEP 1: Select Pack Tier */}
            {paymentStep === 'select_pack' && (
              <div className="py-4 space-y-4">
                <p className="text-xs text-[#64748B]">
                  {isAr
                    ? 'اختاري باقة الوصفات المناسبة مع كامل الحرية لتحديد الوصفات التي تكون داخل الحزمة:'
                    : 'Choose the recipe pack that works for you with complete freedom to pick your recipes:'}
                </p>

                <div className="space-y-2.5">
                  {RECIPE_PACKS.map((pack) => {
                    const isSelected = selectedPack.id === pack.id;
                    return (
                      <div
                        key={pack.id}
                        onClick={() => handleSelectPackTier(pack)}
                        className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between gap-3 relative ${
                          isSelected
                            ? 'border-[#D81B60] bg-[#FFF5F9] shadow-xs'
                            : 'border-[#E2E8F0] hover:border-[#FFCEE3] bg-white'
                        }`}
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-extrabold text-sm text-[#1E293B]">
                              {pack.recipesCount} {isAr ? 'وصفات حسب الاختيار' : 'Recipes Pack'}
                            </span>
                            {pack.popular && (
                              <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-[#D81B60] text-white">
                                {isAr ? 'الأكثر طلباً' : 'Most Popular'}
                              </span>
                            )}
                            {pack.bestValue && (
                              <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-emerald-600 text-white">
                                {isAr ? 'أفضل قيمة' : 'Best Value'}
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-[#64748B] mt-0.5">
                            {isAr ? pack.descriptionAr : pack.descriptionEn}
                          </p>
                        </div>

                        <div className="text-end shrink-0">
                          <span className="font-black text-sm text-[#D81B60]">
                            {pack.priceDzd.toLocaleString()} DA
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    onClick={() => setPaymentStep('choose_recipes')}
                    className="flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-[#D81B60] to-[#C2185B] text-white font-extrabold text-xs shadow-xs hover:opacity-95 transition-all flex items-center justify-center gap-2"
                  >
                    <span>
                      {isAr
                        ? `اختيار وصفات الحزمة (${selectedPack.recipesCount} وصفة)`
                        : `Select Recipes (${selectedPack.recipesCount} Pack)`}
                    </span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setPaymentModalOpen(false)}
                    className="py-3 px-4 rounded-2xl bg-slate-100 text-slate-700 font-bold text-xs"
                  >
                    {isAr ? 'إلغاء' : 'Cancel'}
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Custom Recipe Selector (مع اختيار الوصفات التي تكون داخل الحزم) */}
            {paymentStep === 'choose_recipes' && (
              <div className="py-3 space-y-4">
                {/* Pack Tier Switcher Tabs */}
                <div className="bg-[#F8FAFC] p-1.5 rounded-2xl border border-[#E2E8F0] grid grid-cols-3 gap-1.5">
                  {RECIPE_PACKS.map((pack) => {
                    const isCurrent = selectedPack.id === pack.id;
                    return (
                      <button
                        key={pack.id}
                        onClick={() => handleSelectPackTier(pack)}
                        className={`py-2 px-1.5 rounded-xl text-xs font-bold transition-all text-center ${
                          isCurrent
                            ? 'bg-[#D81B60] text-white shadow-xs font-black'
                            : 'bg-white text-[#64748B] hover:text-[#1E293B] border border-transparent'
                        }`}
                      >
                        <div className="leading-tight">
                          <span>{pack.recipesCount} {isAr ? 'وصفة' : 'Recipes'}</span>
                        </div>
                        <div className={`text-[10px] font-semibold mt-0.5 ${isCurrent ? 'text-white/90' : 'text-[#D81B60]'}`}>
                          {pack.priceDzd.toLocaleString()} DA
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Selection Capacity & Progress Meter */}
                <div className="bg-[#FFF5F9] p-3.5 rounded-2xl border border-[#FFCEE3] space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-extrabold text-[#1E293B] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#D81B60]" />
                      <span>
                        {isAr
                          ? `الوصفات المختارة: ${selectedCustomRecipeIds.size} من أصل ${selectedPack.recipesCount}`
                          : `Selected: ${selectedCustomRecipeIds.size} / ${selectedPack.recipesCount} recipes`}
                      </span>
                    </span>
                    <span
                      className={`text-[11px] font-black px-2 py-0.5 rounded-full ${
                        selectedCustomRecipeIds.size >= selectedPack.recipesCount
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-[#FFCEE3] text-[#D81B60]'
                      }`}
                    >
                      {selectedCustomRecipeIds.size >= selectedPack.recipesCount
                        ? (isAr ? '✅ اكتملت الحزمة' : '✅ Full Pack')
                        : (isAr
                            ? `متبقي ${selectedPack.recipesCount - selectedCustomRecipeIds.size} وصفات`
                            : `${selectedPack.recipesCount - selectedCustomRecipeIds.size} left`)}
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-white h-2.5 rounded-full overflow-hidden border border-[#FFCEE3]">
                    <div
                      className="bg-gradient-to-r from-[#D81B60] to-[#E040FB] h-full rounded-full transition-all duration-300"
                      style={{
                        width: `${Math.min(
                          100,
                          (selectedCustomRecipeIds.size / selectedPack.recipesCount) * 100
                        )}%`
                      }}
                    />
                  </div>
                </div>

                {/* Helper Tools Strip: Auto-fill, Clear, View selected tray */}
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      onClick={() => handleAutoFillCustomPack(selectedPack.recipesCount)}
                      className="px-3 py-1.5 rounded-xl bg-white hover:bg-[#FFF0F6] border border-[#FFCEE3] text-[#D81B60] text-xs font-bold transition-colors flex items-center gap-1.5 shadow-2xs"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{isAr ? 'اقتراح باقة متوازنة تلقائياً' : 'Auto-Fill Balanced Pack'}</span>
                    </button>

                    {selectedCustomRecipeIds.size > 0 && (
                      <button
                        onClick={handleClearSelection}
                        className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 text-xs font-semibold transition-colors flex items-center gap-1"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>{isAr ? 'مسح' : 'Clear'}</span>
                      </button>
                    )}
                  </div>

                  {selectedCustomRecipeIds.size > 0 && (
                    <button
                      onClick={() => setShowSelectedTray(!showSelectedTray)}
                      className="text-xs font-bold text-[#D81B60] hover:underline flex items-center gap-1 ms-auto"
                    >
                      <span>
                        {isAr
                          ? `الوصفات المختارة (${selectedCustomRecipeIds.size})`
                          : `View Selected (${selectedCustomRecipeIds.size})`}
                      </span>
                      {showSelectedTray ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  )}
                </div>

                {/* Collapsible Selected Recipes Tray */}
                {showSelectedTray && selectedRecipesObjects.length > 0 && (
                  <div className="p-3 bg-[#FCF8F9] rounded-2xl border border-[#FFCEE3] space-y-2 animate-in fade-in">
                    <p className="text-[11px] font-bold text-[#64748B]">
                      {isAr ? 'قائمة الوصفات في حزمتكِ المخصصة:' : 'Recipes currently in your custom pack:'}
                    </p>
                    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                      {selectedRecipesObjects.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-2 p-1.5 pe-2.5 bg-white rounded-xl border border-[#FFCEE3] shrink-0 text-xs shadow-2xs"
                        >
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="w-7 h-7 rounded-lg object-cover"
                          />
                          <span className="font-bold text-[#1E293B] max-w-[120px] truncate">
                            {isAr ? item.titleAr : item.title}
                          </span>
                          <button
                            onClick={() => toggleCustomRecipeSelection(item.id)}
                            className="text-slate-400 hover:text-rose-600 ms-1"
                            title={isAr ? 'إزالة' : 'Remove'}
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Search & Categories inside the builder */}
                <div className="space-y-2">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute inset-y-0 start-3 my-auto" />
                    <input
                      type="text"
                      value={builderSearch}
                      onChange={(e) => setBuilderSearch(e.target.value)}
                      placeholder={isAr ? 'ابحثي في وصفات الحزمة...' : 'Search recipes in pack...'}
                      className="w-full ps-9 pe-8 py-2 text-xs rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] focus:border-[#D81B60] outline-none"
                    />
                    {builderSearch && (
                      <button
                        onClick={() => setBuilderSearch('')}
                        className="absolute inset-y-0 end-2.5 flex items-center text-slate-400 hover:text-slate-700"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                    {[
                      { id: 'All', en: 'All', ar: 'الكل' },
                      { id: 'Breakfast', en: 'Breakfast', ar: 'فطور' },
                      { id: 'Lunch', en: 'Lunch', ar: 'غداء' },
                      { id: 'Dinner', en: 'Dinner', ar: 'عشاء' },
                      { id: 'Snacks', en: 'Snacks', ar: 'سناك' },
                      { id: 'Smoothies', en: 'Smoothies', ar: 'سموذي' },
                      { id: 'Healthy Desserts', en: 'Healthy Desserts', ar: 'حلويات' }
                    ].map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setBuilderCategory(cat.id)}
                        className={`px-3 py-1 text-xs rounded-xl font-bold whitespace-nowrap transition-colors ${
                          builderCategory === cat.id
                            ? 'bg-[#D81B60] text-white'
                            : 'bg-[#F8FAFC] text-[#64748B] hover:text-[#1E293B] border border-[#E2E8F0]'
                        }`}
                      >
                        {isAr ? cat.ar : cat.en}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Scrollable Recipe Picker List */}
                <div className="max-h-[300px] overflow-y-auto space-y-2 pe-1">
                  {builderFilteredRecipes.map((recipe) => {
                    const isSelected = selectedCustomRecipeIds.has(recipe.id);
                    return (
                      <div
                        key={recipe.id}
                        onClick={() => toggleCustomRecipeSelection(recipe.id)}
                        className={`p-2.5 rounded-2xl border-2 transition-all flex items-center justify-between gap-3 cursor-pointer ${
                          isSelected
                            ? 'border-[#D81B60] bg-[#FFF5F9] shadow-2xs'
                            : 'border-[#E2E8F0] hover:border-[#FFCEE3] bg-white'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={recipe.imageUrl}
                            alt={recipe.title}
                            className="w-12 h-12 rounded-xl object-cover shrink-0"
                          />
                          <div className="min-w-0">
                            <h4 className="font-extrabold text-xs text-[#1E293B] truncate">
                              {isAr ? recipe.titleAr : recipe.title}
                            </h4>
                            <div className="flex items-center gap-2 text-[10px] text-[#64748B] mt-0.5">
                              <span className="px-1.5 py-0.2 rounded bg-slate-100 font-semibold">
                                {recipe.category}
                              </span>
                              <span>{recipe.calories} kcal</span>
                              <span>• {recipe.protein}g protein</span>
                            </div>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={(e) => toggleCustomRecipeSelection(recipe.id, e)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all flex items-center gap-1 ${
                            isSelected
                              ? 'bg-[#D81B60] text-white shadow-2xs'
                              : 'bg-white hover:bg-[#FFCEE3]/50 text-[#D81B60] border border-[#FFCEE3]'
                          }`}
                        >
                          {isSelected ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>{isAr ? 'مختارة ✓' : 'Selected ✓'}</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3.5 h-3.5" />
                              <span>{isAr ? 'إضافة' : 'Add'}</span>
                            </>
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Bottom Action Strip */}
                <div className="pt-2 flex gap-2 border-t border-[#E2E8F0]">
                  <button
                    onClick={() => setPaymentStep('select_pack')}
                    className="py-3 px-4 rounded-2xl bg-slate-100 text-slate-700 font-bold text-xs"
                  >
                    {isAr ? 'تغيير الحزمة' : 'Back'}
                  </button>

                  <button
                    onClick={() => {
                      if (selectedCustomRecipeIds.size === 0) {
                        handleAutoFillCustomPack(selectedPack.recipesCount);
                      }
                      setPaymentStep('select_method');
                    }}
                    className="flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-[#D81B60] to-[#C2185B] text-white font-extrabold text-xs shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-2"
                  >
                    <span>
                      {isAr
                        ? `متابعة الدفع (${selectedPack.priceDzd.toLocaleString()} دج)`
                        : `Proceed to Payment (${selectedPack.priceDzd.toLocaleString()} DA)`}
                    </span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Choose Payment Method (CIB / BaridiMob) */}
            {paymentStep === 'select_method' && (
              <div className="py-4 space-y-4">
                <div className="bg-[#FFF5F9] p-3 rounded-2xl border border-[#FFCEE3] flex items-center justify-between text-xs">
                  <div>
                    <span className="font-extrabold text-[#1E293B]">
                      {selectedPack.recipesCount} {isAr ? 'وصفات حسب الاختيار' : 'Recipes Custom Pack'}
                    </span>
                    <p className="text-[10px] text-[#64748B]">
                      {selectedCustomRecipeIds.size} {isAr ? 'وصفة مختارة' : 'recipes selected'}
                    </p>
                  </div>
                  <span className="font-black text-sm text-[#D81B60]">
                    {selectedPack.priceDzd.toLocaleString()} DA
                  </span>
                </div>

                <p className="text-xs text-[#64748B]">
                  Select your preferred payment method:
                </p>

                <div className="space-y-3">
                  {/* CIB Option */}
                  <div
                    onClick={() => setSelectedMethod('cib')}
                    className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-3.5 ${
                      selectedMethod === 'cib'
                        ? 'border-[#0284C7] bg-sky-50/50 shadow-xs'
                        : 'border-[#E2E8F0] hover:border-sky-200 bg-white'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#0284C7] to-[#0369A1] text-white flex items-center justify-center shrink-0 shadow-xs">
                      <CreditCard className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-sm text-[#1E293B]">CIB</span>
                        <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-sky-100 text-sky-800">
                          Carte Bancaire
                        </span>
                      </div>
                      <p className="text-xs text-[#64748B] mt-0.5">
                        Paiement par carte CIB
                      </p>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        selectedMethod === 'cib' ? 'border-[#0284C7] bg-[#0284C7]' : 'border-slate-300'
                      }`}
                    >
                      {selectedMethod === 'cib' && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                  </div>

                  {/* BaridiMob Option */}
                  <div
                    onClick={() => setSelectedMethod('baridimob')}
                    className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-3.5 ${
                      selectedMethod === 'baridimob'
                        ? 'border-emerald-600 bg-emerald-50/50 shadow-xs'
                        : 'border-[#E2E8F0] hover:border-emerald-200 bg-white'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-700 text-white flex items-center justify-center shrink-0 shadow-xs">
                      <Smartphone className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-sm text-[#1E293B]">BaridiMob</span>
                        <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800">
                          Algérie Poste
                        </span>
                      </div>
                      <p className="text-xs text-[#64748B] mt-0.5">
                        Paiement via BaridiMob
                      </p>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        selectedMethod === 'baridimob' ? 'border-emerald-600 bg-emerald-600' : 'border-slate-300'
                      }`}
                    >
                      {selectedMethod === 'baridimob' && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    onClick={() => setPaymentStep('checkout')}
                    className="flex-1 py-3 px-4 rounded-2xl bg-[#D81B60] hover:bg-[#C2185B] text-white font-extrabold text-xs shadow-xs transition-colors"
                  >
                    Continue to Checkout
                  </button>
                  <button
                    onClick={() => setPaymentStep('choose_recipes')}
                    className="py-3 px-4 rounded-2xl bg-slate-100 text-slate-700 font-bold text-xs"
                  >
                    Back to Recipes
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: Checkout Summary */}
            {paymentStep === 'checkout' && (
              <div className="py-4 space-y-4">
                <div className="bg-[#FCF8F9] rounded-2xl p-4 border border-[#FFCEE3] space-y-2.5 text-xs">
                  <div className="flex justify-between items-center text-[#64748B]">
                    <span>Selected Pack</span>
                    <span className="font-bold text-[#1E293B]">
                      {selectedPack.recipesCount} Recipes Custom Pack
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[#64748B]">
                    <span>Number of Recipes</span>
                    <span className="font-bold text-[#1E293B]">
                      {selectedCustomRecipeIds.size || selectedPack.recipesCount} Recipes
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[#64748B]">
                    <span>Price</span>
                    <span className="font-bold text-[#1E293B]">
                      {selectedPack.priceDzd.toLocaleString()} DA
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[#64748B]">
                    <span>Payment Method</span>
                    <span className="font-bold text-[#1E293B]">
                      {selectedMethod === 'cib' ? 'CIB (Carte Bancaire)' : 'BaridiMob (Algérie Poste)'}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-[#FFCEE3] flex justify-between items-center">
                    <span className="font-black text-sm text-[#1E293B]">Total</span>
                    <span className="font-black text-base text-[#D81B60]">
                      {selectedPack.priceDzd.toLocaleString()} DA
                    </span>
                  </div>
                </div>

                {/* Selected recipes brief list */}
                {selectedRecipesObjects.length > 0 && (
                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
                    <span className="font-bold text-[#1E293B] block mb-1.5">
                      {isAr ? 'عينة من وصفاتكِ المختارة:' : 'Included in this order:'}
                    </span>
                    <div className="flex flex-wrap gap-1 max-h-20 overflow-y-auto">
                      {selectedRecipesObjects.slice(0, 8).map((r) => (
                        <span
                          key={r.id}
                          className="px-2 py-0.5 rounded-lg bg-white border border-slate-200 text-[10px] font-semibold text-[#1E293B]"
                        >
                          {isAr ? r.titleAr : r.title}
                        </span>
                      ))}
                      {selectedRecipesObjects.length > 8 && (
                        <span className="px-2 py-0.5 rounded-lg bg-[#FFCEE3] text-[#D81B60] text-[10px] font-bold">
                          +{selectedRecipesObjects.length - 8} {isAr ? 'أخرى' : 'more'}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                <div className="p-2.5 rounded-xl bg-amber-50 text-amber-900 border border-amber-200 text-[11px] flex items-start gap-2">
                  <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>
                    {isAr
                      ? 'هذه شاشة تجريبية Prototype فقط. لن يتم خصم أي مبالغ حقيقية عند الضغط على الدفع.'
                      : 'This is a clickable prototype simulation. No real money or card data is processed.'}
                  </span>
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    onClick={handleExecutePayment}
                    className="flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-black text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Pay Now</span>
                  </button>
                  <button
                    onClick={() => setPaymentStep('select_method')}
                    className="py-3 px-4 rounded-2xl bg-slate-100 text-slate-700 font-bold text-xs"
                  >
                    Back
                  </button>
                </div>
              </div>
            )}

            {/* STEP 5: Success Screen */}
            {paymentStep === 'success' && (
              <div className="py-6 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs animate-bounce">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div>
                  <h3 className="font-black text-lg text-[#1E293B]">
                    Payment Successful ✓
                  </h3>
                  <p className="text-xs text-[#64748B] mt-1">
                    Your recipe pack has been activated.
                  </p>
                </div>

                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3.5 text-emerald-950 text-xs font-semibold text-start space-y-1">
                  <div className="flex items-center gap-1.5 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>
                      {isAr
                        ? `تم تفعيل حزمة الـ ${selectedPack.recipesCount} وصفة التي اخترتها بنجاح!`
                        : `Successfully activated your ${selectedPack.recipesCount} custom recipes pack!`}
                    </span>
                  </div>
                  <p className="text-[11px] text-emerald-800 ps-5">
                    {isAr
                      ? 'الوصفات التي حددتها أصبحت متاحة لكِ بالكامل داخل المنصة مع كافة التفاصيل الغذائية وخطوات التحضير.'
                      : 'All selected recipes are now unlocked with full macros, ingredients and step-by-step instructions.'}
                  </p>
                </div>

                <button
                  onClick={() => {
                    setPaymentModalOpen(false);
                    setSelectedCategory('MyCustomPack');
                  }}
                  className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-[#D81B60] to-[#C2185B] text-white font-black text-xs shadow-md hover:opacity-95 transition-all"
                >
                  Explore My Recipes
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
