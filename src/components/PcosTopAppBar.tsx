import React from 'react';
import { Bell, Globe, User, UserPlus } from 'lucide-react';
import { usePcos } from '../context/PcosContext';

export const PcosTopAppBar: React.FC = () => {
  const { language, toggleLanguage, currentUser, navigateTo, currentScreen } = usePcos();
  const isAr = language === 'AR';

  return (
    <header className="sticky top-0 z-40 bg-[#FCF8F9]/95 backdrop-blur-md border-b border-[#E2E8F0] px-4 py-2.5">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        {/* Brand identity */}
        <div
          onClick={() => navigateTo('home')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-xs border border-[#FFCEE3]/60 bg-white flex items-center justify-center group-hover:scale-105 transition-transform">
            <img
              src="/smop_dz_logo.jpg"
              alt="SMOP DZ Logo"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/img_smop_dz_logo_1780509782515.png';
              }}
            />
          </div>
          <div>
            <h1 className="text-lg font-black tracking-tight text-[#1E293B] leading-tight">
              SMOP DZ
            </h1>
            <p className="text-[10px] font-bold text-[#64748B]">
              {isAr ? 'العافية الهرمونية للجزائريات' : "Algerian Women's Hormonal Vitality"}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Sign Up / Account Action Button */}
          {currentUser ? (
            <button
              onClick={() => navigateTo('dashboard')}
              className="flex items-center gap-1.5 px-3 py-1 text-xs font-bold text-[#D81B60] bg-[#FFCEE3]/50 hover:bg-[#FFCEE3] border border-[#FFCEE3] rounded-full transition-all shadow-2xs"
              title={isAr ? 'الملف الشخصي' : 'User Profile'}
            >
              <User className="w-3.5 h-3.5 text-[#D81B60]" />
              <span className="max-w-[70px] truncate">{currentUser.fullName.split(' ')[0]}</span>
            </button>
          ) : (
            <button
              onClick={() => navigateTo('signup')}
              data-testid="top-signup-btn"
              className={`flex items-center gap-1 px-3 py-1 text-xs font-black rounded-full transition-all shadow-2xs ${
                currentScreen === 'signup'
                  ? 'bg-[#D81B60] text-white'
                  : 'bg-[#D81B60] hover:bg-[#C2185B] text-white'
              }`}
              title={isAr ? 'إنشاء حساب جديد' : 'Sign Up'}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>{isAr ? 'إنشاء حساب' : 'Sign Up'}</span>
            </button>
          )}

          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            data-testid="language-toggle-btn"
            className="flex items-center gap-1.5 px-3 py-1 text-xs font-bold text-[#1E293B] bg-white border border-[#E2E8F0] hover:border-[#D81B60]/40 rounded-full transition-colors shadow-2xs"
            title={isAr ? 'Switch to English' : 'التحويل إلى العربية'}
          >
            <Globe className="w-3.5 h-3.5 text-[#D81B60]" />
            <span>{isAr ? 'English' : 'العربية'}</span>
          </button>

          {/* Notification icon */}
          <button
            className="w-8 h-8 rounded-full bg-white border border-[#E2E8F0] text-[#64748B] flex items-center justify-center hover:text-[#1E293B] transition-colors shadow-2xs"
            title={isAr ? 'الإشعارات' : 'Notifications'}
          >
            <Bell className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
