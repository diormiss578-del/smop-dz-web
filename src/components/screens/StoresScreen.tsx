import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Navigation,
  Tag,
  Clock,
  X,
  Map as MapIcon,
  ExternalLink
} from 'lucide-react';
import { usePcos } from '../../context/PcosContext';
import { EcoStore } from '../../types';

const InstagramIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

export const StoresScreen: React.FC = () => {
  const { language, ecoStores, selectedStoreCategory, setStoreCategory } = usePcos();
  const [selectedStoreForMap, setSelectedStoreForMap] = useState<EcoStore | null>(null);
  const isAr = language === 'AR';

  const categories = [
    { en: 'Healthy Bakeries', ar: 'مخابز صحية' },
    { en: 'Organic Dairy & Honey', ar: 'الألبان والعسل العضوي' },
    { en: 'Natural Supplements', ar: 'المكملات الطبيعية' }
  ];

  const filteredStores = ecoStores.filter(store => store.categoryEn === selectedStoreCategory);

  return (
    <div className="space-y-6 pb-20 animate-in fade-in duration-150" data-testid="stores-screen-layout">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-black text-[#1E293B] tracking-tight">
          {isAr ? 'متاجر المنتجات الطبيعية والصحية في الجزائر' : 'Natural Eco-Stores Directory'}
        </h2>
        <p className="text-xs sm:text-sm text-[#64748B] mt-1">
          {isAr
            ? 'متاجر وموردون يوفرون حلولاً غذائية خالية من الجلوتين، أعشاب نقية ومكملات لدعم توازن المبايض.'
            : 'Browse local suppliers offering PCOS-friendly organic and gluten-free ingredients.'}
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 border-b border-[#E2E8F0] pb-2 overflow-x-auto scrollbar-none">
        {categories.map((cat) => {
          const isActive = selectedStoreCategory === cat.en;
          return (
            <button
              key={cat.en}
              onClick={() => setStoreCategory(cat.en)}
              className={`px-4 py-2 text-xs font-bold rounded-2xl whitespace-nowrap transition-all ${
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

      {/* Stores Grid */}
      <div className="space-y-4">
        {filteredStores.map((store) => {
          const name = isAr ? store.nameAr : store.nameEn;
          const loc = isAr ? store.locationAr : store.locationEn;
          const adText = isAr ? store.adTextAr : store.adTextEn;
          const promo = isAr ? store.promoAr : store.promoEn;

          return (
            <div
              key={store.id}
              className="bg-white border border-[#E2E8F0] hover:border-[#D81B60]/40 rounded-3xl overflow-hidden shadow-xs transition-all flex flex-col sm:flex-row group"
            >
              <div className="sm:w-52 h-44 sm:h-auto relative shrink-0 overflow-hidden">
                <img
                  src={store.imageUrl}
                  alt={name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-2.5 start-2.5 bg-white/90 backdrop-blur-xs text-[#1E293B] text-[10px] font-bold px-2 py-0.5 rounded-lg shadow-xs flex items-center gap-1">
                  <Navigation className="w-3 h-3 text-[#D81B60]" />
                  {store.distanceKm} km
                </span>
              </div>

              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-extrabold text-sm sm:text-base text-[#1E293B] group-hover:text-[#D81B60] transition-colors">
                      {name}
                    </h3>
                    <span className="text-[10px] text-[#64748B] bg-[#FCF8F9] px-2 py-0.5 rounded-md border border-[#E2E8F0]">
                      {store.durationMin} {isAr ? 'د' : 'min'}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-xs text-[#64748B] mt-1">
                    <MapPin className="w-3.5 h-3.5 text-[#D81B60] shrink-0" />
                    <span>{loc}</span>
                  </div>

                  {store.hasAd && adText && (
                    <div className="bg-[#FCF8F9] border border-[#FFCEE3]/80 rounded-xl p-2.5 mt-3 text-xs">
                      <p className="text-[#1E293B] font-medium leading-relaxed">
                        {adText}
                      </p>
                      {promo && (
                        <div className="flex items-center gap-1 text-[#D81B60] font-bold text-[11px] mt-1.5">
                          <Tag className="w-3 h-3" />
                          <span>{isAr ? 'كود الخصم:' : 'Promo code:'}</span>
                          <span className="font-mono bg-white px-2 py-0.5 rounded border border-[#FFCEE3]">
                            {promo}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between gap-2 pt-3 mt-3 border-t border-[#E2E8F0]/70 flex-wrap">
                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${store.phone}`}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white border border-[#E2E8F0] hover:border-[#D81B60] text-xs font-semibold text-[#1E293B] transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#D81B60]" />
                      <span className="text-[11px] font-mono">{store.phone}</span>
                    </a>
                    <a
                      href={store.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-xl bg-white border border-[#E2E8F0] hover:text-[#D81B60] text-[#64748B] transition-colors"
                      title="Instagram"
                    >
                      <InstagramIcon className="w-4 h-4" />
                    </a>
                  </div>

                  <button
                    onClick={() => setSelectedStoreForMap(store)}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#FFCEE3]/80 hover:bg-[#FFCEE3] text-[#D81B60] rounded-xl text-xs font-bold transition-colors"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>{isAr ? 'خريطة الطريق' : 'Route HUD'}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Stylized Dynamic Route HUD Map Modal */}
      {selectedStoreForMap && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in"
          onClick={() => setSelectedStoreForMap(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-md w-full p-5 shadow-2xl border border-[#E2E8F0]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
              <div className="flex items-center gap-2">
                <MapIcon className="w-5 h-5 text-[#D81B60]" />
                <h3 className="font-bold text-sm sm:text-base text-[#1E293B]">
                  {isAr ? 'مساعد الطريق والملاحة' : 'Route Navigator'}
                </h3>
              </div>
              <button
                onClick={() => setSelectedStoreForMap(null)}
                className="w-7 h-7 rounded-full bg-[#FCF8F9] hover:bg-[#FFCEE3]/40 text-[#64748B] flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-3 text-center">
              <h4 className="font-extrabold text-sm text-[#1E293B]">
                {isAr ? selectedStoreForMap.nameAr : selectedStoreForMap.nameEn}
              </h4>
              <p className="text-xs text-[#64748B] flex items-center justify-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-[#D81B60]" />
                {isAr ? selectedStoreForMap.locationAr : selectedStoreForMap.locationEn}
              </p>
            </div>

            {/* Stylized Route HUD Visualizer */}
            <div className="my-3 bg-[#F1FDF5] border border-[#DDFFBB] rounded-2xl p-4 flex flex-col justify-between h-44 relative overflow-hidden">
              <div className="flex items-center justify-between z-10">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-blue-600 animate-ping"></span>
                  <span className="text-xs font-bold text-[#1E293B]">
                    {isAr ? 'موقعكِ الحالي (وسط البليدة)' : 'Your Location (Blida Center)'}
                  </span>
                </div>
                <span className="text-[9px] font-black bg-[#FFCEE3] text-[#D81B60] px-2 py-0.5 rounded-full">
                  GPS ACTIVE
                </span>
              </div>

              {/* Graphic Connecting Path */}
              <div className="flex items-center justify-between px-6 py-2 my-auto">
                <div className="flex-1 relative flex items-center">
                  <div className="h-1.5 w-full bg-emerald-200 rounded-full"></div>
                  <div className="absolute inset-0 border-t-2 border-dashed border-emerald-600"></div>
                </div>
                <div className="px-3 text-center">
                  <span className="text-xs font-black text-emerald-800 block">
                    {selectedStoreForMap.distanceKm} km
                  </span>
                  <span className="text-[10px] text-emerald-600 flex items-center justify-center gap-0.5">
                    <Clock className="w-2.5 h-2.5" />
                    ~{selectedStoreForMap.durationMin} {isAr ? 'دقيقة' : 'mins'}
                  </span>
                </div>
                <div className="flex-1 relative flex items-center">
                  <div className="h-1.5 w-full bg-emerald-200 rounded-full"></div>
                  <div className="absolute inset-0 border-t-2 border-dashed border-emerald-600"></div>
                </div>
              </div>

              <div className="flex items-center justify-between z-10 pt-2 border-t border-emerald-200/60">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-red-600" />
                  <span className="text-xs font-bold text-[#1E293B]">
                    {isAr ? selectedStoreForMap.nameAr : selectedStoreForMap.nameEn}
                  </span>
                </div>
                <span className="text-[10px] font-bold text-[#64748B]">
                  {selectedStoreForMap.wilaya}
                </span>
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <a
                href={selectedStoreForMap.mapUrl || `https://maps.google.com/?q=${encodeURIComponent(selectedStoreForMap.nameEn)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-[#D81B60] hover:bg-[#C2185B] text-white rounded-xl font-bold text-xs shadow-xs transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>{isAr ? 'فتح في خرائط Google' : 'Open in Google Maps'}</span>
              </a>
              <button
                onClick={() => setSelectedStoreForMap(null)}
                className="px-4 py-2.5 bg-white border border-[#E2E8F0] hover:bg-[#FCF8F9] text-[#1E293B] rounded-xl font-semibold text-xs transition-colors"
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
