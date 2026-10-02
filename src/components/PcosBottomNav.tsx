import React from 'react';
import {
  BookOpen,
  Users,
  Store,
  Sparkles,
  Dumbbell,
  UtensilsCrossed,
  UserCircle
} from 'lucide-react';
import { usePcos } from '../context/PcosContext';

export const PcosBottomNav: React.FC = () => {
  const { currentScreen, navigateTo, language } = usePcos();
  const isAr = language === 'AR';

  const navItems = [
    {
      id: 'home',
      icon: BookOpen,
      labelAr: 'تعلّم',
      labelEn: 'Learn'
    },
    {
      id: 'specialists',
      icon: Users,
      labelAr: 'أخصائيات',
      labelEn: 'Specialists'
    },
    {
      id: 'stores',
      icon: Store,
      labelAr: 'المتاجر',
      labelEn: 'Stores'
    },
    {
      id: 'programs',
      icon: Sparkles,
      labelAr: 'البرامج',
      labelEn: 'Programs'
    },
    {
      id: 'fitness',
      icon: Dumbbell,
      labelAr: 'الرياضة',
      labelEn: 'Physical'
    },
    {
      id: 'kitchens',
      icon: UtensilsCrossed,
      labelAr: 'المطابخ',
      labelEn: 'Kitchens'
    },
    {
      id: 'dashboard',
      icon: UserCircle,
      labelAr: 'حسابي',
      labelEn: 'Dashboard'
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E2E8F0] shadow-lg">
      <div className="max-w-4xl mx-auto flex items-center justify-around px-1 py-1.5">
        {navItems.map((item) => {
          const isActive = currentScreen === item.id;
          const Icon = item.icon;
          const label = isAr ? item.labelAr : item.labelEn;

          return (
            <button
              key={item.id}
              onClick={() => navigateTo(item.id)}
              data-testid={`nav-item-${item.id}`}
              className={`flex flex-col items-center justify-center flex-1 py-1 px-1 transition-all rounded-xl ${
                isActive
                  ? 'text-[#D81B60]'
                  : 'text-[#64748B] hover:text-[#1E293B]'
              }`}
            >
              <div
                className={`p-1 rounded-full transition-colors ${
                  isActive ? 'bg-[#FFCEE3]' : 'bg-transparent'
                }`}
              >
                <Icon className="w-5 h-5 transition-transform" />
              </div>
              <span
                className={`text-[10px] tracking-tight mt-0.5 max-w-[54px] truncate ${
                  isActive ? 'font-bold text-[#D81B60]' : 'font-medium'
                }`}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
