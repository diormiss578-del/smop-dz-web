import React from 'react';
import {
  Sparkles,
  ChefHat,
  UtensilsCrossed,
  Store,
  Leaf
} from 'lucide-react';
import { usePcos, NutritionTab } from '../../context/PcosContext';
import { ProgramsScreen } from './ProgramsScreen';
import { HealthyRecipeLibraryScreen } from './HealthyRecipeLibraryScreen';
import { KitchensScreen } from './KitchensScreen';
import { StoresScreen } from './StoresScreen';
import { HEALTHY_RECIPES_DATA } from '../../data/healthyRecipesData';
import { INITIAL_HEALTHY_STORES } from '../../data/healthyStoresData';

export const NutritionScreen: React.FC = () => {
  const {
    language,
    nutritionTab,
    setNutritionTab,
    wellnessPrograms,
    homeCooks
  } = usePcos();

  const isAr = language === 'AR';

  const pillars: {
    id: NutritionTab;
    icon: React.FC<{ className?: string }>;
    titleAr: string;
    titleEn: string;
    subtitleAr: string;
    subtitleEn: string;
    countLabel: string;
  }[] = [
    {
      id: 'programs',
      icon: Sparkles,
      titleAr: 'البرامج الغذائية',
      titleEn: 'Nutrition Programs',
      subtitleAr: 'خطط علاجية ومتابعة',
      subtitleEn: 'Clinical & tailored plans',
      countLabel: `${wellnessPrograms.length}`
    },
    {
      id: 'recipes',
      icon: ChefHat,
      titleAr: 'الوصفات الصحية',
      titleEn: 'Healthy Recipes',
      subtitleAr: 'أطباق متوازنة للهرمونات',
      subtitleEn: 'Hormone-friendly meals',
      countLabel: `${HEALTHY_RECIPES_DATA.length}`
    },
    {
      id: 'providers',
      icon: UtensilsCrossed,
      titleAr: 'مقدمو الأكل الصحي',
      titleEn: 'Food Providers',
      subtitleAr: 'متوفر الآن + طلب مسبق',
      subtitleEn: 'Ready & 7-12h pre-order',
      countLabel: `${homeCooks.length}`
    },
    {
      id: 'stores',
      icon: Store,
      titleAr: 'المتاجر والمنتجات المنزلية',
      titleEn: 'Stores & Home Organic',
      subtitleAr: 'متاجر + صناعة منزلية عضوية',
      subtitleEn: 'Stores & home artisans',
      countLabel: `${INITIAL_HEALTHY_STORES.length}+`
    }
  ];

  return (
    <div className="space-y-6 pb-20 animate-in fade-in duration-150" data-testid="nutrition-screen-layout">
      {/* Unified Nutrition Hero Banner */}
      <div className="bg-gradient-to-br from-[#FFCEE3]/55 via-white to-[#DDFFBB]/35 border border-[#FFCEE3] rounded-3xl p-5 sm:p-6 shadow-xs relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-[#FFCEE3] text-[#D81B60] text-[11px] font-black shadow-2xs">
              <Leaf className="w-3.5 h-3.5 text-emerald-600" />
              <span>{isAr ? 'دليلكِ الشامل للتغذية الصحية' : 'Complete PCOS Nutrition Hub'}</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-[#1E293B] tracking-tight">
              {isAr ? 'قسم التغذية المتكامل' : 'Nutrition & Healthy Living'}
            </h2>

            <p className="text-xs sm:text-sm text-[#475569] max-w-2xl leading-relaxed font-medium">
              {isAr
                ? 'كل ما تحتاجينه لتنظيم الأنسولين وتوازن هرموناتكِ في مكان واحد منظّم: اختاري برنامجكِ الغذائي، تصفّحي الوصفات، اطلبي من مقدمي الأكل الصحي، أو تسوّقي من المتاجر وصانعات المنتجات العضوية من المنزل.'
                : 'Everything for hormone-balancing nutrition in one organized hub: therapeutic programs, healthy recipes, meal providers, and a blend of healthy stores and home-based organic makers.'}
            </p>
          </div>
        </div>
      </div>

      {/* 4 Clear Organized Pillars Switcher */}
      <div
        className="grid grid-cols-2 sm:grid-cols-4 gap-2.5"
        role="tablist"
        aria-label={isAr ? 'أقسام التغذية' : 'Nutrition Sections'}
      >
        {pillars.map((pillar) => {
          const Icon = pillar.icon;
          const isActive = nutritionTab === pillar.id;

          return (
            <button
              key={pillar.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => setNutritionTab(pillar.id)}
              data-testid={`nutrition-tab-${pillar.id}`}
              className={`p-3 sm:p-3.5 rounded-2xl border text-start transition-all flex flex-col justify-between gap-2 relative ${
                isActive
                  ? 'bg-[#D81B60] border-[#D81B60] text-white shadow-md scale-[1.01]'
                  : 'bg-white border-[#E2E8F0] hover:border-[#FFCEE3] text-[#1E293B] shadow-2xs'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-[#FFF0F6] text-[#D81B60]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <span
                  className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-[#FCF8F9] text-[#64748B] border border-[#E2E8F0]'
                  }`}
                >
                  {pillar.countLabel}
                </span>
              </div>

              <div>
                <div className="font-black text-xs sm:text-sm leading-snug">
                  {isAr ? pillar.titleAr : pillar.titleEn}
                </div>
                <div
                  className={`text-[10px] mt-0.5 leading-tight ${
                    isActive ? 'text-white/85 font-medium' : 'text-[#64748B]'
                  }`}
                >
                  {isAr ? pillar.subtitleAr : pillar.subtitleEn}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Pillar Content */}
      <div className="pt-1">
        {nutritionTab === 'programs' && (
          <ProgramsScreen
            embedded={true}
            onOpenRecipes={() => setNutritionTab('recipes')}
          />
        )}

        {nutritionTab === 'recipes' && (
          <HealthyRecipeLibraryScreen embedded={true} />
        )}

        {nutritionTab === 'providers' && (
          <KitchensScreen embedded={true} />
        )}

        {nutritionTab === 'stores' && (
          <StoresScreen embedded={true} />
        )}
      </div>
    </div>
  );
};
