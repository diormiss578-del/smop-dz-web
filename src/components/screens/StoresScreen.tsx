import React, { useState, useMemo } from 'react';
import {
  Store,
  MapPin,
  Phone,
  ExternalLink,
  Search,
  Sparkles,
  Check,
  CheckCircle2,
  Plus,
  Edit3,
  Trash2,
  Eye,
  EyeOff,
  ShieldCheck,
  Tag,
  Navigation,
  ChevronRight,
  ChevronLeft,
  X,
  ArrowLeft,
  ArrowRight,
  SlidersHorizontal,
  Gift,
  BadgeCheck,
  Send,
  Building,
  User,
  MessageCircle,
  Clock,
  Compass,
  Home
} from 'lucide-react';
import { usePcos } from '../../context/PcosContext';
import {
  HealthyStore,
  HealthyStoreProduct,
  HEALTHY_STORE_CATEGORIES,
  INITIAL_HEALTHY_STORES,
  SMOP_HEALTHY_PICKS,
  PartnerApplicationData
} from '../../data/healthyStoresData';

const InstagramIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const FacebookIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

interface StoresScreenProps {
  embedded?: boolean;
}

export const StoresScreen: React.FC<StoresScreenProps> = ({ embedded = false }) => {
  const { language } = usePcos();
  const isAr = language === 'AR';

  // 1. Stores & Home Organic Makers State (Loaded from LocalStorage or default initial data)
  const [stores, setStores] = useState<HealthyStore[]>(() => {
    const saved = localStorage.getItem('smop_healthy_stores_v3');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return INITIAL_HEALTHY_STORES;
  });

  const saveStores = (updated: HealthyStore[]) => {
    setStores(updated);
    localStorage.setItem('smop_healthy_stores_v3', JSON.stringify(updated));
  };

  // 2. Active View & Selected Store Details
  const [selectedStore, setSelectedStore] = useState<HealthyStore | null>(null);

  // 3. Search, Source Type Filter (All vs Stores vs Home Organic Makers) & Category Filter
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sourceFilter, setSourceFilter] = useState<'all' | 'store' | 'home_maker'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  // 4. Modals
  const [partnerModalOpen, setPartnerModalOpen] = useState<boolean>(false);
  const [partnerSubmitted, setPartnerSubmitted] = useState<boolean>(false);
  const [partnerForm, setPartnerForm] = useState<PartnerApplicationData>({
    storeName: '',
    ownerName: '',
    phone: '',
    city: 'البليدة (Blida)',
    sourceType: 'store',
    categories: ['Natural Products'],
    socialLink: '',
    description: ''
  });

  // 5. Admin Dashboard State
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [editingStore, setEditingStore] = useState<HealthyStore | null>(null);
  const [isAddingStore, setIsAddingStore] = useState<boolean>(false);
  const [adminNotification, setAdminNotification] = useState<string | null>(null);

  // New Store Form State for Admin
  const [storeFormData, setStoreFormData] = useState<Partial<HealthyStore>>({
    sourceType: 'store',
    nameEn: '',
    nameAr: '',
    logoUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=200',
    coverUrl: 'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?auto=format&fit=crop&q=80&w=800',
    categories: ['Healthy Bakeries'],
    categoriesAr: ['مخابز صحية'],
    city: 'Blida / البليدة',
    addressEn: 'Downtown Blida',
    addressAr: 'وسط مدينة البليدة',
    shortDescEn: '',
    shortDescAr: '',
    fullDescEn: '',
    fullDescAr: '',
    phone: '+213 550 00 00 00',
    instagramUrl: 'https://instagram.com/store.blida',
    facebookUrl: 'https://facebook.com/store.blida',
    mapQuery: 'Blida,+Algeria',
    isPartner: true,
    isFeatured: false,
    currentOffersAr: '',
    currentOffersEn: '',
    products: [],
    galleryUrls: []
  });

  // Filtered Stores Logic
  const visibleStores = useMemo(() => {
    return stores.filter((store) => !store.isHidden);
  }, [stores]);

  const storesCount = useMemo(
    () => visibleStores.filter((s) => (s.sourceType || 'store') === 'store').length,
    [visibleStores]
  );

  const homeMakersCount = useMemo(
    () => visibleStores.filter((s) => s.sourceType === 'home_maker').length,
    [visibleStores]
  );

  const filteredStores = useMemo(() => {
    return visibleStores.filter((store) => {
      // 0. Source type filter
      const storeSource = store.sourceType || 'store';
      const matchesSource = sourceFilter === 'all' || storeSource === sourceFilter;

      // 1. Category filter
      const matchesCategory =
        selectedCategory === 'All' ||
        store.categories.includes(selectedCategory);

      // 2. Search query filter (matches store name, category, or product name)
      const q = searchQuery.trim().toLowerCase();
      if (!q) return matchesSource && matchesCategory;

      const matchesStoreName =
        store.nameEn.toLowerCase().includes(q) ||
        store.nameAr.toLowerCase().includes(q) ||
        store.shortDescEn.toLowerCase().includes(q) ||
        store.shortDescAr.toLowerCase().includes(q) ||
        store.addressEn.toLowerCase().includes(q) ||
        store.addressAr.toLowerCase().includes(q);

      const matchesStoreCategory =
        store.categories.some((cat) => cat.toLowerCase().includes(q)) ||
        store.categoriesAr.some((cat) => cat.toLowerCase().includes(q));

      const matchesProduct = store.products.some(
        (p) =>
          p.nameEn.toLowerCase().includes(q) ||
          p.nameAr.toLowerCase().includes(q) ||
          p.categoryEn.toLowerCase().includes(q) ||
          p.categoryAr.toLowerCase().includes(q)
      );

      return matchesSource && matchesCategory && (matchesStoreName || matchesStoreCategory || matchesProduct);
    });
  }, [visibleStores, sourceFilter, selectedCategory, searchQuery]);

  // Featured Stores (for top spotlight)
  const featuredStores = useMemo(() => {
    return visibleStores.filter((store) => store.isFeatured);
  }, [visibleStores]);

  // Handle Partner Application Submit
  const handlePartnerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!partnerForm.storeName || !partnerForm.phone) return;
    setPartnerSubmitted(true);
    setTimeout(() => {
      const newMockStore: HealthyStore = {
        id: 'store_' + Date.now(),
        sourceType: partnerForm.sourceType || 'store',
        nameEn: partnerForm.storeName,
        nameAr: partnerForm.storeName,
        logoUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=200',
        coverUrl: 'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?auto=format&fit=crop&q=80&w=800',
        categories: partnerForm.categories.length ? partnerForm.categories : ['Natural Products'],
        categoriesAr: partnerForm.categories.map(c => {
          const found = HEALTHY_STORE_CATEGORIES.find(hc => hc.id === c);
          return found ? found.nameAr : c;
        }),
        city: 'Blida / البليدة',
        addressEn: partnerForm.sourceType === 'home_maker' ? 'Home Producer — Blida' : 'Blida',
        addressAr: partnerForm.sourceType === 'home_maker' ? 'إنتاج منزلي — البليدة' : 'البليدة',
        shortDescEn: partnerForm.description || 'New partner healthy provider in Blida.',
        shortDescAr: partnerForm.description || 'شريك جديد للمنتجات الصحية والعضوية في البليدة.',
        fullDescEn: partnerForm.description || 'Welcome to our healthy partner in Blida.',
        fullDescAr: partnerForm.description || 'أهلاً بكم لدى شريكنا للمنتجات الطبيعية والعضوية في البليدة.',
        phone: partnerForm.phone,
        instagramUrl: partnerForm.socialLink || '',
        mapQuery: 'Blida,+Algeria',
        isPartner: true,
        isFeatured: false,
        galleryUrls: [],
        products: []
      };

      saveStores([newMockStore, ...stores]);
    }, 400);
  };

  // Admin Actions
  const handleToggleFeatured = (storeId: string) => {
    const updated = stores.map((s) =>
      s.id === storeId ? { ...s, isFeatured: !s.isFeatured } : s
    );
    saveStores(updated);
    notifyAdmin(isAr ? 'تم تحديث حالة المتجر المميز' : 'Updated featured status');
  };

  const handleTogglePartner = (storeId: string) => {
    const updated = stores.map((s) =>
      s.id === storeId ? { ...s, isPartner: !s.isPartner } : s
    );
    saveStores(updated);
    notifyAdmin(isAr ? 'تم تحديث شارة شريك SMOP DZ' : 'Updated partner badge');
  };

  const handleToggleHide = (storeId: string) => {
    const updated = stores.map((s) =>
      s.id === storeId ? { ...s, isHidden: !s.isHidden } : s
    );
    saveStores(updated);
    notifyAdmin(isAr ? 'تم تعديل ظهور المتجر' : 'Updated visibility');
  };

  const handleDeleteStore = (storeId: string) => {
    const updated = stores.filter((s) => s.id !== storeId);
    saveStores(updated);
    setConfirmDeleteId(null);
    if (selectedStore?.id === storeId) {
      setSelectedStore(null);
    }
    notifyAdmin(isAr ? 'تم الحذف بنجاح' : 'Deleted successfully');
  };

  const handleSaveStoreForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!storeFormData.nameAr && !storeFormData.nameEn) return;

    if (editingStore) {
      // Update
      const updated = stores.map((s) =>
        s.id === editingStore.id ? ({ ...s, ...storeFormData } as HealthyStore) : s
      );
      saveStores(updated);
      setEditingStore(null);
      notifyAdmin(isAr ? 'تم التعديل بنجاح' : 'Updated successfully');
    } else {
      // Create new
      const newStore: HealthyStore = {
        id: 'store_' + Date.now(),
        sourceType: storeFormData.sourceType || 'store',
        nameEn: storeFormData.nameEn || storeFormData.nameAr || 'New Store',
        nameAr: storeFormData.nameAr || storeFormData.nameEn || 'متجر جديد',
        logoUrl: storeFormData.logoUrl || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=200',
        coverUrl: storeFormData.coverUrl || 'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?auto=format&fit=crop&q=80&w=800',
        categories: storeFormData.categories?.length ? storeFormData.categories : ['Natural Products'],
        categoriesAr: storeFormData.categoriesAr?.length ? storeFormData.categoriesAr : ['منتجات طبيعية'],
        city: 'Blida / البليدة',
        addressEn: storeFormData.addressEn || 'Blida',
        addressAr: storeFormData.addressAr || 'البليدة',
        shortDescEn: storeFormData.shortDescEn || 'Healthy provider in Blida.',
        shortDescAr: storeFormData.shortDescAr || 'مزود منتجات صحية وطبيعية في ولاية البليدة.',
        fullDescEn: storeFormData.fullDescEn || 'Specialized in organic and natural products in Blida.',
        fullDescAr: storeFormData.fullDescAr || 'متخصص في المنتجات الصحية والطبيعية في ولاية البليدة.',
        phone: storeFormData.phone || '+213 550 00 00 00',
        instagramUrl: storeFormData.instagramUrl || '',
        facebookUrl: storeFormData.facebookUrl || '',
        mapQuery: storeFormData.mapQuery || 'Blida,+Algeria',
        isPartner: storeFormData.isPartner ?? true,
        isFeatured: storeFormData.isFeatured ?? false,
        currentOffersAr: storeFormData.currentOffersAr || '',
        currentOffersEn: storeFormData.currentOffersEn || '',
        galleryUrls: [],
        products: []
      };
      saveStores([newStore, ...stores]);
      setIsAddingStore(false);
      notifyAdmin(isAr ? 'تمت الإضافة بنجاح' : 'Added successfully');
    }
  };

  const startEditStore = (store: HealthyStore) => {
    setEditingStore(store);
    setStoreFormData({ ...store });
    setIsAddingStore(false);
  };

  const notifyAdmin = (msg: string) => {
    setAdminNotification(msg);
    setTimeout(() => setAdminNotification(null), 3000);
  };

  // =========================================================================
  // VIEW: STORE DETAILS FULL PAGE
  // =========================================================================
  if (selectedStore) {
    const store = selectedStore;
    const storeName = isAr ? store.nameAr : store.nameEn;
    const address = isAr ? store.addressAr : store.addressEn;
    const fullDesc = isAr ? store.fullDescAr : store.fullDescEn;
    const currentOffers = isAr ? store.currentOffersAr : store.currentOffersEn;

    return (
      <div className="space-y-6 pb-20 animate-in fade-in duration-200" data-testid="store-details-page">
        {/* Back Button & Top Navigation */}
        <div className="flex items-center justify-between gap-3">
          <button
            onClick={() => setSelectedStore(null)}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white hover:bg-[#FFF0F6] border border-[#FFCEE3] text-[#D81B60] text-xs font-bold transition-colors shadow-2xs group"
          >
            {isAr ? (
              <>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                <span>العودة لدليل المتاجر بالبليدة</span>
              </>
            ) : (
              <>
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                <span>Back to Stores Directory</span>
              </>
            )}
          </button>

          {/* Partner Badge */}
          {store.isPartner && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#DDFFBB] text-emerald-900 border border-emerald-300 text-xs font-black shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>SMOP DZ Partner</span>
            </div>
          )}
        </div>

        {/* Hero Banner with Cover, Logo, and Details */}
        <div className="bg-white rounded-3xl border border-[#E2E8F0] overflow-hidden shadow-xs">
          {/* Cover Image */}
          <div className="relative h-56 sm:h-72 w-full bg-slate-900 overflow-hidden">
            <img
              src={store.coverUrl}
              alt={storeName}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            {/* City & Source Type Badge overlay */}
            <div className="absolute top-4 start-4 flex items-center gap-2 flex-wrap">
              <span className="bg-white/95 backdrop-blur-xs text-[#1E293B] text-xs font-black px-3 py-1 rounded-full shadow-md flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#D81B60]" />
                <span>{store.city}</span>
              </span>
              {store.sourceType === 'home_maker' ? (
                <span className="bg-amber-100/95 text-amber-950 text-xs font-black px-3 py-1 rounded-full shadow-md flex items-center gap-1.5">
                  <Home className="w-3.5 h-3.5 text-amber-700" />
                  <span>{isAr ? 'صانعة منتجات عضوية من المنزل' : 'Home Organic Maker'}</span>
                </span>
              ) : (
                <span className="bg-emerald-100/95 text-emerald-950 text-xs font-black px-3 py-1 rounded-full shadow-md flex items-center gap-1.5">
                  <Store className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{isAr ? 'متجر صحي معتمد' : 'Certified Healthy Store'}</span>
                </span>
              )}
            </div>

            {/* Bottom info on Cover */}
            <div className="absolute bottom-4 start-4 end-4 flex items-end justify-between gap-4 text-white">
              <div className="flex items-center gap-3.5">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white p-1 shadow-lg shrink-0 overflow-hidden border-2 border-white">
                  <img
                    src={store.logoUrl}
                    alt={storeName}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>

                <div>
                  <h1 className="text-lg sm:text-2xl font-black text-white leading-tight">
                    {storeName}
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-200 mt-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                    <span>{address}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Store Meta & Action Buttons */}
          <div className="p-5 sm:p-6 space-y-5">
            {/* Categories */}
            <div className="flex items-center gap-2 flex-wrap">
              {(isAr ? store.categoriesAr : store.categories).map((cat, idx) => (
                <span
                  key={idx}
                  className="bg-[#FFF0F6] text-[#D81B60] text-xs font-black px-3 py-1 rounded-full border border-[#FFCEE3]"
                >
                  {cat}
                </span>
              ))}
            </div>

            {/* Store Description */}
            <div className="space-y-2">
              <h3 className="text-sm font-black text-[#1E293B]">
                {isAr ? 'عن المتجر ورسالته الصحية:' : 'About Store & Mission:'}
              </h3>
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                {fullDesc || store.shortDescAr}
              </p>
            </div>

            {/* Current Offers (إن وجدت) */}
            {currentOffers && (
              <div className="p-4 rounded-2xl bg-[#DDFFBB]/40 border-2 border-[#DDFFBB] text-emerald-950 flex items-start gap-3">
                <div className="p-2 rounded-xl bg-[#DDFFBB] text-emerald-800 shrink-0">
                  <Gift className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-black text-xs sm:text-sm">
                    {isAr ? 'العروض الحالية لمتتبعات SMOP DZ:' : 'Current Offers:'}
                  </h4>
                  <p className="text-xs text-emerald-900 mt-0.5 leading-relaxed font-semibold">
                    {currentOffers}
                  </p>
                </div>
              </div>
            )}

            {/* Contact & Directions Action Buttons (NO CART / NO PAYMENT) */}
            <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
              <a
                href={`tel:${store.phone}`}
                className="flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-[#D81B60] to-[#C2185B] text-white font-black text-xs shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>{isAr ? `اتصال بالمتجر (${store.phone})` : `Call Store (${store.phone})`}</span>
              </a>

              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(store.mapQuery)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 rounded-2xl bg-[#DDFFBB] hover:bg-[#c9f59f] text-emerald-900 border border-emerald-300 font-black text-xs transition-colors flex items-center justify-center gap-2"
              >
                <Navigation className="w-4 h-4 text-emerald-800" />
                <span>{isAr ? 'الاتجاهات عبر الخريطة (Get Directions)' : 'Get Directions'}</span>
              </a>

              {store.instagramUrl && (
                <a
                  href={store.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-2xl bg-white hover:bg-slate-50 text-[#1E293B] border border-[#E2E8F0] font-black text-xs transition-colors flex items-center justify-center gap-2"
                >
                  <InstagramIcon className="w-4 h-4 text-pink-600" />
                  <span>Instagram</span>
                </a>
              )}

              {store.facebookUrl && (
                <a
                  href={store.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-2xl bg-white hover:bg-slate-50 text-[#1E293B] border border-[#E2E8F0] font-black text-xs transition-colors flex items-center justify-center gap-2"
                >
                  <FacebookIcon className="w-4 h-4 text-blue-600" />
                  <span>Facebook</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Featured Products Gallery (المنتجات المميزة بالمتجر) */}
        {store.products && store.products.length > 0 && (
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E2E8F0] shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-black text-base sm:text-lg text-[#1E293B] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#D81B60]" />
                  <span>{isAr ? 'المنتجات المميزة في هذا المتجر' : 'Featured Store Products'}</span>
                </h3>
                <p className="text-xs text-[#64748B] mt-0.5">
                  {isAr ? 'منتجات طبيعية وصحية متوفرة للطلب المباشر أو الشراء من المتجر:' : 'Healthy natural products available at this store:'}
                </p>
              </div>

              <span className="text-xs font-bold text-[#64748B]">
                {store.products.length} {isAr ? 'منتجات' : 'Products'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {store.products.map((prod) => (
                <div
                  key={prod.id}
                  className="p-3.5 rounded-2xl bg-[#FCF8F9] border border-[#FFCEE3]/50 flex gap-3 hover:border-[#D81B60]/40 transition-colors"
                >
                  <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-white border border-[#E2E8F0]">
                    <img
                      src={prod.imageUrl}
                      alt={isAr ? prod.nameAr : prod.nameEn}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-black text-[#D81B60] uppercase tracking-wider block">
                        {isAr ? prod.categoryAr : prod.categoryEn}
                      </span>
                      <h4 className="font-black text-xs sm:text-sm text-[#1E293B] mt-0.5 line-clamp-1">
                        {isAr ? prod.nameAr : prod.nameEn}
                      </h4>
                      <p className="text-[11px] text-[#64748B] line-clamp-2 mt-0.5 leading-snug">
                        {isAr ? prod.descriptionAr : prod.descriptionEn}
                      </p>
                    </div>

                    <div className="mt-1 flex items-center gap-1 text-[10px] font-bold text-emerald-800">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>{isAr ? 'متوفر لدى المتجر' : 'Available in store'}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Store Photo Gallery */}
        {store.galleryUrls && store.galleryUrls.length > 0 && (
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E2E8F0] shadow-xs space-y-3">
            <h3 className="font-black text-base text-[#1E293B]">
              {isAr ? 'صور من داخل المتجر والمنتجات:' : 'Store Gallery:'}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {store.galleryUrls.map((url, idx) => (
                <div key={idx} className="h-36 rounded-2xl overflow-hidden border border-[#E2E8F0]">
                  <img src={url} alt={`Gallery ${idx}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Location & Map Preview */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E2E8F0] shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-base text-[#1E293B] flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#D81B60]" />
              <span>{isAr ? 'الموقع والعنوان في البليدة:' : 'Location & Address:'}</span>
            </h3>
            <span className="text-xs font-bold text-[#64748B]">{store.city}</span>
          </div>

          <p className="text-xs sm:text-sm text-[#475569] font-medium flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-[#D81B60] shrink-0" />
            <span>{address}</span>
          </p>

          <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="space-y-0.5">
              <span className="text-xs font-black text-[#1E293B] block">
                {isAr ? 'هل تودين زيارة المتجر؟' : 'Ready to visit?'}
              </span>
              <span className="text-[11px] text-[#64748B] block">
                {isAr ? 'اضغطي على الزر لفتح خرائط جوجل وبدء الملاحة المباشرة.' : 'Open Google Maps for turn-by-turn navigation.'}
              </span>
            </div>

            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(store.mapQuery)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-[#D81B60] hover:bg-[#C2185B] text-white font-black text-xs transition-colors flex items-center gap-2 shadow-xs shrink-0"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>{isAr ? 'فتح الخريطة (Get Directions)' : 'Get Directions'}</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW: MAIN HEALTHY STORES & HOME ORGANIC MAKERS DIRECTORY
  // =========================================================================
  return (
    <div className={`space-y-6 ${embedded ? 'pb-4' : 'pb-20'} animate-in fade-in duration-200`} data-testid="healthy-stores-screen">
      {/* 1. Header with Blida Tag & Admin Dashboard Link */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
        <div>
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="bg-[#DDFFBB] text-emerald-900 border border-emerald-300 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-700" />
              <span>{isAr ? 'ولاية البليدة • متاجر + إنتاج منزلي' : 'Blida • Stores & Home Makers'}</span>
            </span>

            <span className="bg-[#FFCEE3]/60 text-[#D81B60] text-[10px] font-black px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <Home className="w-3 h-3" />
              <span>{isAr ? 'منتجات عضوية طبيعية' : 'Natural & Organic'}</span>
            </span>
          </div>

          <h2 className="text-lg sm:text-2xl font-black text-[#1E293B] tracking-tight">
            {isAr
              ? 'المتاجر الصحية وصانعو المنتجات العضوية من المنزل'
              : 'Healthy Stores & Home Organic Makers'}
          </h2>

          <p className="text-xs sm:text-sm text-[#64748B] mt-1 max-w-2xl leading-relaxed">
            {isAr
              ? 'مزيج مختار بين المتاجر الصحية المعتمدة والأسر المنتجة للمنتجات العضوية الطبيعية من المنزل لدعم نمط حياتكِ.'
              : 'A curated mix of certified healthy stores and home-based organic & natural product artisans in Blida.'}
          </p>
        </div>

        {/* Admin Dashboard Quick Access Button */}
        <div className="shrink-0 flex items-center gap-2">
          <button
            onClick={() => setIsAdminOpen(true)}
            className="px-3.5 py-2 rounded-2xl bg-white hover:bg-[#FFF0F6] border border-[#FFCEE3] text-[#D81B60] text-xs font-black transition-colors flex items-center gap-1.5 shadow-2xs"
            title="إدارة المتاجر وصانعي المنتجات (لوحة التحكم)"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>{isAr ? 'إدارة الدليل' : 'Manage Directory'}</span>
          </button>
        </div>
      </div>

      {/* 1.5 Source Type Filter (All vs Stores vs Home Organic Makers) */}
      <div className="bg-[#FCF8F9] p-1.5 rounded-2xl border border-[#E2E8F0] grid grid-cols-3 gap-1.5 shadow-2xs">
        <button
          onClick={() => setSourceFilter('all')}
          className={`py-2 px-2.5 rounded-xl text-[11px] sm:text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
            sourceFilter === 'all'
              ? 'bg-[#D81B60] text-white shadow-xs'
              : 'text-[#64748B] hover:text-[#1E293B]'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">
            {isAr ? `الكل (${visibleStores.length})` : `All (${visibleStores.length})`}
          </span>
        </button>

        <button
          onClick={() => setSourceFilter('store')}
          className={`py-2 px-2.5 rounded-xl text-[11px] sm:text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
            sourceFilter === 'store'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-[#64748B] hover:text-emerald-700'
          }`}
        >
          <Store className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">
            {isAr ? `متاجر صحية (${storesCount})` : `Stores (${storesCount})`}
          </span>
        </button>

        <button
          onClick={() => setSourceFilter('home_maker')}
          className={`py-2 px-2.5 rounded-xl text-[11px] sm:text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
            sourceFilter === 'home_maker'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'text-[#64748B] hover:text-amber-700'
          }`}
        >
          <Home className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">
            {isAr ? `إنتاج منزلي عضوي (${homeMakersCount})` : `Home Makers (${homeMakersCount})`}
          </span>
        </button>
      </div>

      {/* 2. Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 start-0 ps-3.5 flex items-center pointer-events-none text-[#64748B]">
          <Search className="w-4 h-4 text-[#D81B60]" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={
            isAr
              ? 'ابحثي باسم المتجر أو الصانعة المنزلية أو المنتج (خل التفاح، عسل، بذور، خميرة بلدية...)'
              : 'Search stores, home makers, or natural products...'
          }
          className="w-full ps-10 pe-10 py-3 rounded-2xl bg-white border border-[#E2E8F0] focus:border-[#D81B60] focus:ring-2 focus:ring-[#FFCEE3]/50 text-xs sm:text-sm font-semibold text-[#1E293B] placeholder-[#94A3B8] shadow-2xs transition-all outline-none"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute inset-y-0 end-0 pe-3.5 flex items-center text-slate-400 hover:text-slate-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* 3. Category Filters (6 Specific Categories) */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs text-[#64748B]">
          <span className="font-bold text-[#1E293B]">
            {isAr ? 'تصنيفات المنتجات:' : 'Product Categories:'}
          </span>
          <span>{filteredStores.length} {isAr ? 'نتائج متوفرة' : 'results'}</span>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {HEALTHY_STORE_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-2xl text-xs font-black transition-all whitespace-nowrap flex items-center gap-1.5 shadow-2xs ${
                  isActive
                    ? 'bg-[#D81B60] text-white shadow-xs'
                    : 'bg-white text-[#64748B] hover:text-[#1E293B] border border-[#E2E8F0] hover:border-[#FFCEE3]'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{isAr ? cat.nameAr : cat.nameEn}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. FEATURED STORES & HOME MAKERS (مختارات مميزة) */}
      {sourceFilter === 'all' && selectedCategory === 'All' && !searchQuery && featuredStores.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-base sm:text-lg text-[#1E293B] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#D81B60]" />
              <span>{isAr ? 'مختارات مميزة (متاجر + إنتاج منزلي)' : 'Featured Stores & Home Makers'}</span>
            </h3>
            <span className="text-xs text-[#64748B] font-bold">
              {isAr ? 'شركاء موثوقون بالبليدة' : 'Curated Blida Partners'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredStores.map((store) => {
              const name = isAr ? store.nameAr : store.nameEn;
              const address = isAr ? store.addressAr : store.addressEn;
              const shortDesc = isAr ? store.shortDescAr : store.shortDescEn;
              const isHomeMaker = store.sourceType === 'home_maker';

              return (
                <div
                  key={store.id}
                  className="bg-white rounded-3xl border-2 border-[#FFCEE3] hover:border-[#D81B60] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
                  data-testid={`featured-store-${store.id}`}
                >
                  <div>
                    {/* Cover image */}
                    <div className="relative h-44 w-full overflow-hidden bg-slate-900">
                      <img
                        src={store.coverUrl}
                        alt={name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                      {/* Top Badges */}
                      <div className="absolute top-3 start-3 flex items-center gap-1.5 flex-wrap">
                        {isHomeMaker ? (
                          <span className="bg-amber-100 text-amber-950 text-[10px] font-black px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                            <Home className="w-3 h-3 text-amber-700" />
                            <span>{isAr ? 'إنتاج منزلي عضوي' : 'Home Organic'}</span>
                          </span>
                        ) : (
                          <span className="bg-[#DDFFBB] text-emerald-950 text-[10px] font-black px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                            <Store className="w-3 h-3 text-emerald-700" />
                            <span>{isAr ? 'متجر صحي' : 'Healthy Store'}</span>
                          </span>
                        )}
                      </div>

                      <div className="absolute top-3 end-3">
                        <span className="bg-white/95 text-[#1E293B] text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-xs flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#D81B60]" />
                          <span>{store.city}</span>
                        </span>
                      </div>

                      {/* Logo & Name on Bottom of Image */}
                      <div className="absolute bottom-3 start-3 end-3 flex items-center gap-2.5 text-white">
                        <div className="w-10 h-10 rounded-xl bg-white p-0.5 shadow-md shrink-0 overflow-hidden border border-white">
                          <img src={store.logoUrl} alt={name} className="w-full h-full object-cover rounded-lg" />
                        </div>
                        <h4 className="font-black text-sm text-white drop-shadow-sm truncate">
                          {name}
                        </h4>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-4 space-y-2">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {(isAr ? store.categoriesAr : store.categories).map((cat, idx) => (
                          <span
                            key={idx}
                            className="bg-[#FFF0F6] text-[#D81B60] text-[10px] font-black px-2 py-0.5 rounded-md"
                          >
                            {cat}
                          </span>
                        ))}
                      </div>

                      <p className="text-xs text-[#64748B] line-clamp-2 leading-relaxed">
                        {shortDesc}
                      </p>

                      <p className="text-[11px] font-semibold text-[#475569] flex items-center gap-1 truncate pt-1">
                        <MapPin className="w-3 h-3 text-[#D81B60] shrink-0" />
                        <span>{address}</span>
                      </p>
                    </div>
                  </div>

                  <div className="p-4 pt-0">
                    <button
                      onClick={() => setSelectedStore(store)}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#D81B60] to-[#C2185B] text-white font-black text-xs shadow-xs hover:opacity-95 transition-all flex items-center justify-center gap-1.5"
                    >
                      <span>{isAr ? 'عرض المتجر (View Store)' : 'View Store'}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 5. SMOP HEALTHY PICKS (منتجات مختارة من المتاجر الشريكة) */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E2E8F0] shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-black text-base sm:text-lg text-[#1E293B] flex items-center gap-2">
              <BadgeCheck className="w-5 h-5 text-emerald-600" />
              <span>SMOP Healthy Picks</span>
            </h3>
            <p className="text-xs text-[#64748B] mt-0.5">
              {isAr
                ? 'منتجات صحية ومغذية مختارة بعناية من المتاجر الشريكة في البليدة (بدون أسعار في هذه المرحلة).'
                : 'Handpicked healthy products from partner stores in Blida:'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {SMOP_HEALTHY_PICKS.map((pick) => {
            const pickName = isAr ? pick.nameAr : pick.nameEn;
            const category = isAr ? pick.categoryAr : pick.categoryEn;
            const storeName = isAr ? pick.storeNameAr : pick.storeNameEn;
            const matchingStore = stores.find((s) => s.id === pick.storeId) || stores[0];

            return (
              <div
                key={pick.id}
                className="bg-[#FCF8F9] rounded-2xl border border-[#FFCEE3]/60 p-3 flex flex-col justify-between hover:border-[#D81B60]/50 transition-colors group"
              >
                <div>
                  <div className="h-28 w-full rounded-xl overflow-hidden bg-white mb-2.5 border border-[#E2E8F0] relative">
                    <img
                      src={pick.imageUrl}
                      alt={pickName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-2 start-2 bg-white/90 text-[#D81B60] text-[9px] font-black px-2 py-0.5 rounded-md shadow-2xs">
                      {category}
                    </span>
                  </div>

                  <h4 className="font-black text-xs text-[#1E293B] line-clamp-1">
                    {pickName}
                  </h4>

                  <span className="text-[11px] font-bold text-[#64748B] block mt-0.5 truncate">
                    {isAr ? `متجر: ${storeName}` : `Store: ${storeName}`}
                  </span>
                </div>

                <div className="mt-3 pt-2 border-t border-[#FFCEE3]/40">
                  <button
                    onClick={() => setSelectedStore(matchingStore)}
                    className="w-full py-1.5 rounded-lg bg-white hover:bg-[#D81B60] text-[#D81B60] hover:text-white border border-[#FFCEE3] font-black text-[11px] transition-colors flex items-center justify-center gap-1"
                  >
                    <span>{isAr ? 'عرض المتجر' : 'View Store'}</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 6. ALL STORES & HOME ORGANIC MAKERS GRID */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-black text-base sm:text-lg text-[#1E293B]">
            {sourceFilter === 'home_maker'
              ? (isAr ? 'صانعو المنتجات العضوية الطبيعية من المنزل' : 'Home-Based Organic & Natural Makers')
              : sourceFilter === 'store'
              ? (isAr ? 'المتاجر الصحية المعتمدة' : 'Certified Healthy Stores')
              : (isAr ? 'كل المتاجر وصانعي المنتجات العضوية المنزلية' : 'All Healthy Stores & Home Organic Makers')}
          </h3>
          <span className="text-xs text-[#64748B] font-semibold">
            {filteredStores.length} {isAr ? 'متاح' : 'available'}
          </span>
        </div>

        {filteredStores.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-3xl border border-[#E2E8F0] p-6 space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#FFF0F6] text-[#D81B60] flex items-center justify-center mx-auto">
              <Store className="w-6 h-6" />
            </div>
            <h4 className="font-black text-sm text-[#1E293B]">
              {isAr ? 'لم نجد أي نتيجة مطابقة لبحثكِ' : 'No results found matching your criteria'}
            </h4>
            <p className="text-xs text-[#64748B]">
              {isAr
                ? 'جربي تغيير كلمات البحث أو اختيار تصنيف آخر مثل «الكل».'
                : 'Try clearing your search or selecting a different category.'}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSourceFilter('all');
              }}
              className="px-4 py-2 rounded-xl bg-[#D81B60] text-white text-xs font-black shadow-xs"
            >
              {isAr ? 'عرض الكل' : 'Show all'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredStores.map((store) => {
              const name = isAr ? store.nameAr : store.nameEn;
              const address = isAr ? store.addressAr : store.addressEn;
              const shortDesc = isAr ? store.shortDescAr : store.shortDescEn;
              const isHomeMaker = store.sourceType === 'home_maker';

              return (
                <div
                  key={store.id}
                  className="bg-white rounded-3xl border border-[#E2E8F0] hover:border-[#FFCEE3] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
                  data-testid={`store-card-${store.id}`}
                >
                  <div>
                    {/* Cover image */}
                    <div className="relative h-44 w-full overflow-hidden bg-slate-900">
                      <img
                        src={store.coverUrl}
                        alt={name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                      {/* Source & Partner badges */}
                      <div className="absolute top-3 start-3 flex items-center gap-1.5 flex-wrap">
                        {isHomeMaker ? (
                          <span className="bg-amber-100 text-amber-950 text-[10px] font-black px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                            <Home className="w-3 h-3 text-amber-700" />
                            <span>{isAr ? 'إنتاج منزلي عضوي' : 'Home Organic Maker'}</span>
                          </span>
                        ) : (
                          <span className="bg-[#DDFFBB] text-emerald-950 text-[10px] font-black px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                            <Store className="w-3 h-3 text-emerald-700" />
                            <span>{isAr ? 'متجر صحي معتمد' : 'Healthy Store'}</span>
                          </span>
                        )}
                      </div>

                      <div className="absolute top-3 end-3">
                        <span className="bg-white/95 text-[#1E293B] text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-xs flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#D81B60]" />
                          <span>{store.city}</span>
                        </span>
                      </div>

                      {/* Logo and Name on image */}
                      <div className="absolute bottom-3 start-3 end-3 flex items-center gap-2.5 text-white">
                        <div className="w-10 h-10 rounded-xl bg-white p-0.5 shadow-md shrink-0 overflow-hidden border border-white">
                          <img src={store.logoUrl} alt={name} className="w-full h-full object-cover rounded-lg" />
                        </div>
                        <h4 className="font-black text-sm text-white drop-shadow-sm truncate">
                          {name}
                        </h4>
                      </div>
                    </div>

                    {/* Body */}
                    <div className="p-4 space-y-2">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {(isAr ? store.categoriesAr : store.categories).map((cat, idx) => (
                          <span
                            key={idx}
                            className="bg-[#FFF0F6] text-[#D81B60] text-[10px] font-black px-2 py-0.5 rounded-md"
                          >
                            {cat}
                          </span>
                        ))}
                      </div>

                      <p className="text-xs text-[#64748B] line-clamp-2 leading-relaxed">
                        {shortDesc}
                      </p>

                      <p className="text-[11px] font-semibold text-[#475569] flex items-center gap-1 truncate pt-1">
                        <MapPin className="w-3 h-3 text-[#D81B60] shrink-0" />
                        <span>{address}</span>
                      </p>
                    </div>
                  </div>

                  <div className="p-4 pt-0">
                    <button
                      onClick={() => setSelectedStore(store)}
                      className="w-full py-2.5 rounded-xl bg-[#FFF0F6] hover:bg-[#D81B60] text-[#D81B60] hover:text-white border border-[#FFCEE3] font-black text-xs transition-colors flex items-center justify-center gap-1.5"
                    >
                      <span>{isAr ? 'عرض المتجر (View Store)' : 'View Store'}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 7. PARTNER APPLICATION CALLOUT */}
      <div className="bg-gradient-to-br from-[#FFF5F9] via-white to-[#F0FFF4] rounded-3xl p-6 sm:p-8 border-2 border-[#FFCEE3] shadow-xs text-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-[#DDFFBB] text-emerald-800 flex items-center justify-center mx-auto shadow-2xs">
          <Store className="w-6 h-6" />
        </div>

        <div className="max-w-xl mx-auto space-y-1.5">
          <span className="text-[11px] font-black uppercase tracking-wider text-[#D81B60] block">
            {isAr ? 'شبكة شركاء التغذية العضوية' : 'Healthy & Organic Partner Network'}
          </span>
          <h3 className="text-lg sm:text-xl font-black text-[#1E293B]">
            {isAr
              ? 'هل لديكِ متجر صحي أو تصنعين منتجات عضوية طبيعية من المنزل؟'
              : 'Do you run a healthy store or craft organic products from home?'}
          </h3>
          <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed font-medium">
            {isAr
              ? 'انضمي إلى شبكة شركاء SMOP DZ وعرّفي بمتجركِ أو منتجاتكِ المنزلية العضوية أمام مجتمع يهتم بالتوازن الهرموني.'
              : 'Join the SMOP DZ partner network and showcase your store or homemade organic products to our community.'}
          </p>
        </div>

        <div>
          <button
            onClick={() => {
              setPartnerSubmitted(false);
              setPartnerModalOpen(true);
            }}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#D81B60] to-[#C2185B] text-white font-black text-xs shadow-md hover:opacity-95 transition-all inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>{isAr ? 'انضمي كشريك (متجر أو إنتاج منزلي)' : 'Join as Partner'}</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODAL: PARTNER APPLICATION FORM                                           */}
      {/* ========================================================================= */}
      {partnerModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in"
          onClick={() => setPartnerModalOpen(false)}
        >
          <div
            className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-[#E2E8F0] max-h-[90vh] overflow-y-auto space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-[#F1F5F9]">
              <div>
                <h3 className="font-black text-base sm:text-lg text-[#1E293B]">
                  {isAr ? 'طلب الانضمام لشبكة شركاء SMOP DZ' : 'Become a SMOP DZ Partner'}
                </h3>
                <p className="text-xs text-[#64748B]">
                  {isAr ? 'خاص بالمتاجر الصحية في ولاية البليدة' : 'Exclusively for healthy stores in Blida'}
                </p>
              </div>
              <button
                onClick={() => setPartnerModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {partnerSubmitted ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-14 h-14 rounded-full bg-[#DDFFBB] text-emerald-800 flex items-center justify-center mx-auto text-2xl">
                  ✓
                </div>
                <h4 className="font-black text-base text-[#1E293B]">
                  {isAr ? 'تم استلام طلبكم بنجاح!' : 'Application Submitted!'}
                </h4>
                <p className="text-xs text-[#64748B] max-w-sm mx-auto leading-relaxed">
                  {isAr
                    ? 'شكراً لاهتمامكم بالانضمام إلى شبكة شركاء SMOP DZ. سيتواصل معكم فريقنا للتحقق من المتجر وإضافته رسمياً إلى الدليل.'
                    : 'Thank you for your interest. Our team in Blida will contact you shortly to verify your store and activate your partner badge.'}
                </p>
                <button
                  onClick={() => setPartnerModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-[#D81B60] text-white font-black text-xs"
                >
                  {isAr ? 'حسناً، فهمت' : 'Done'}
                </button>
              </div>
            ) : (
              <form onSubmit={handlePartnerSubmit} className="space-y-3">
                <div>
                  <label className="text-xs font-black text-[#1E293B] block mb-1">
                    {isAr ? 'نوع النشاط *' : 'Partner Type *'}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setPartnerForm({ ...partnerForm, sourceType: 'store' })}
                      className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                        partnerForm.sourceType === 'store'
                          ? 'bg-emerald-50 border-emerald-600 text-emerald-900'
                          : 'bg-white border-[#E2E8F0] text-[#64748B]'
                      }`}
                    >
                      <Store className="w-3.5 h-3.5" />
                      <span>{isAr ? 'متجر صحي' : 'Healthy Store'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPartnerForm({ ...partnerForm, sourceType: 'home_maker' })}
                      className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                        partnerForm.sourceType === 'home_maker'
                          ? 'bg-amber-50 border-amber-600 text-amber-900'
                          : 'bg-white border-[#E2E8F0] text-[#64748B]'
                      }`}
                    >
                      <Home className="w-3.5 h-3.5" />
                      <span>{isAr ? 'إنتاج عضوي منزلي' : 'Home Organic Maker'}</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-black text-[#1E293B] block mb-1">
                    {isAr ? 'اسم المتجر أو المشروع المنزلي *' : 'Store or Home Brand Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={partnerForm.storeName}
                    onChange={(e) => setPartnerForm({ ...partnerForm, storeName: e.target.value })}
                    placeholder={isAr ? 'مثال: ورشة أمينة العضوية أو مخبزة بيو' : 'e.g., Amina Home Organic or Bio Bakery'}
                    className="w-full text-xs font-bold px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] focus:border-[#D81B60] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-black text-[#1E293B] block mb-1">
                      {isAr ? 'اسم المسؤول / المالك (Owner Name)' : 'Owner / Manager Name'}
                    </label>
                    <input
                      type="text"
                      value={partnerForm.ownerName}
                      onChange={(e) => setPartnerForm({ ...partnerForm, ownerName: e.target.value })}
                      placeholder={isAr ? 'الاسم واللقب' : 'Full Name'}
                      className="w-full text-xs font-bold px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] focus:border-[#D81B60] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-black text-[#1E293B] block mb-1">
                      {isAr ? 'رقم الهاتف (Phone Number) *' : 'Phone Number *'}
                    </label>
                    <input
                      type="tel"
                      required
                      value={partnerForm.phone}
                      onChange={(e) => setPartnerForm({ ...partnerForm, phone: e.target.value })}
                      placeholder="0550 12 34 56"
                      className="w-full text-xs font-bold px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] focus:border-[#D81B60] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-black text-[#1E293B] block mb-1">
                    {isAr ? 'المدينة (City)' : 'City'}
                  </label>
                  <input
                    type="text"
                    disabled
                    value={partnerForm.city}
                    className="w-full text-xs font-bold px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] bg-slate-100 text-[#64748B]"
                  />
                </div>

                <div>
                  <label className="text-xs font-black text-[#1E293B] block mb-1">
                    {isAr ? 'تخصص المتجر (Store Category)' : 'Store Category'}
                  </label>
                  <div className="grid grid-cols-2 gap-1.5 text-xs">
                    {HEALTHY_STORE_CATEGORIES.filter((c) => c.id !== 'All').map((c) => {
                      const isChecked = partnerForm.categories.includes(c.id);
                      return (
                        <label
                          key={c.id}
                          className={`p-2 rounded-xl border flex items-center gap-1.5 cursor-pointer text-[11px] font-bold ${
                            isChecked
                              ? 'bg-[#FFF0F6] border-[#D81B60] text-[#D81B60]'
                              : 'bg-white border-[#E2E8F0] text-[#475569]'
                          }`}
                        >
                          <input
                            type="checkbox"
                            className="hidden"
                            checked={isChecked}
                            onChange={() => {
                              const next = isChecked
                                ? partnerForm.categories.filter((cat) => cat !== c.id)
                                : [...partnerForm.categories, c.id];
                              setPartnerForm({ ...partnerForm, categories: next });
                            }}
                          />
                          <span>{c.icon}</span>
                          <span>{isAr ? c.nameAr : c.nameEn}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-black text-[#1E293B] block mb-1">
                    {isAr ? 'رابط Instagram / Facebook' : 'Social Media Link'}
                  </label>
                  <input
                    type="url"
                    value={partnerForm.socialLink}
                    onChange={(e) => setPartnerForm({ ...partnerForm, socialLink: e.target.value })}
                    placeholder="https://instagram.com/yourstore"
                    className="w-full text-xs font-bold px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] focus:border-[#D81B60] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-black text-[#1E293B] block mb-1">
                    {isAr ? 'وصف قصير للمنتجات والنشاط' : 'Short Description'}
                  </label>
                  <textarea
                    rows={2}
                    value={partnerForm.description}
                    onChange={(e) => setPartnerForm({ ...partnerForm, description: e.target.value })}
                    placeholder={isAr ? 'ما هي أبرز المنتجات الصحية التي تقدمونها؟' : 'Key natural & healthy products you offer...'}
                    className="w-full text-xs font-bold px-3.5 py-2 rounded-xl border border-[#E2E8F0] focus:border-[#D81B60] focus:outline-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#D81B60] to-[#C2185B] text-white font-black text-xs shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isAr ? 'إرسال طلب الانضمام (Submit Application)' : 'Submit Application'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: ADMIN DASHBOARD (إدارة المتاجر)                                     */}
      {/* ========================================================================= */}
      {isAdminOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in"
          onClick={() => {
            setIsAdminOpen(false);
            setEditingStore(null);
            setIsAddingStore(false);
          }}
        >
          <div
            className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-[#E2E8F0] max-h-[92vh] overflow-y-auto space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Admin Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-[#FFF0F6] text-[#D81B60] flex items-center justify-center font-black">
                  <SlidersHorizontal className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-base sm:text-lg text-[#1E293B]">
                    {isAr ? 'لوحة تحكم إدارة المتاجر • Admin' : 'Healthy Stores Admin Dashboard'}
                  </h3>
                  <p className="text-xs text-[#64748B]">
                    {isAr ? 'إضافة وتعديل وحذف المتاجر، تحديد المتاجر المميزة وشارة الشريك' : 'Manage stores, products, featured spots, and partner badges'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsAdminOpen(false);
                  setEditingStore(null);
                  setIsAddingStore(false);
                }}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Notification */}
            {adminNotification && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-in fade-in">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>{adminNotification}</span>
              </div>
            )}

            {/* Add or Edit Store Form */}
            {(isAddingStore || editingStore) ? (
              <form onSubmit={handleSaveStoreForm} className="space-y-4 bg-[#FCF8F9] p-4 sm:p-5 rounded-2xl border border-[#FFCEE3]/60">
                <div className="flex items-center justify-between">
                  <h4 className="font-black text-sm text-[#1E293B]">
                    {editingStore ? (isAr ? 'تعديل بيانات المتجر' : 'Edit Store') : (isAr ? 'إضافة متجر جديد' : 'Add New Store')}
                  </h4>
                  <button
                    type="button"
                    onClick={() => {
                      setEditingStore(null);
                      setIsAddingStore(false);
                    }}
                    className="text-xs text-slate-500 hover:text-slate-800 font-bold"
                  >
                    {isAr ? 'إلغاء' : 'Cancel'}
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setStoreFormData({ ...storeFormData, sourceType: 'store' })}
                    className={`p-2 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 ${
                      (storeFormData.sourceType || 'store') === 'store'
                        ? 'bg-emerald-50 border-emerald-600 text-emerald-900'
                        : 'bg-white border-[#E2E8F0] text-[#64748B]'
                    }`}
                  >
                    <Store className="w-3.5 h-3.5" />
                    <span>{isAr ? 'متجر صحي' : 'Healthy Store'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setStoreFormData({ ...storeFormData, sourceType: 'home_maker' })}
                    className={`p-2 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 ${
                      storeFormData.sourceType === 'home_maker'
                        ? 'bg-amber-50 border-amber-600 text-amber-900'
                        : 'bg-white border-[#E2E8F0] text-[#64748B]'
                    }`}
                  >
                    <Home className="w-3.5 h-3.5" />
                    <span>{isAr ? 'إنتاج عضوي منزلي' : 'Home Organic Maker'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-black text-[#1E293B] block mb-1">اسم المتجر أو المشروع بالعربية *</label>
                    <input
                      type="text"
                      required
                      value={storeFormData.nameAr || ''}
                      onChange={(e) => setStoreFormData({ ...storeFormData, nameAr: e.target.value })}
                      className="w-full text-xs font-bold px-3 py-2 rounded-xl border border-[#E2E8F0] bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-black text-[#1E293B] block mb-1">Store Name (English) *</label>
                    <input
                      type="text"
                      required
                      value={storeFormData.nameEn || ''}
                      onChange={(e) => setStoreFormData({ ...storeFormData, nameEn: e.target.value })}
                      className="w-full text-xs font-bold px-3 py-2 rounded-xl border border-[#E2E8F0] bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-black text-[#1E293B] block mb-1">رقم الهاتف (Phone Number)</label>
                    <input
                      type="text"
                      value={storeFormData.phone || ''}
                      onChange={(e) => setStoreFormData({ ...storeFormData, phone: e.target.value })}
                      className="w-full text-xs font-bold px-3 py-2 rounded-xl border border-[#E2E8F0] bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-black text-[#1E293B] block mb-1">رابط الشعار (Logo URL)</label>
                    <input
                      type="url"
                      value={storeFormData.logoUrl || ''}
                      onChange={(e) => setStoreFormData({ ...storeFormData, logoUrl: e.target.value })}
                      className="w-full text-xs font-bold px-3 py-2 rounded-xl border border-[#E2E8F0] bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-black text-[#1E293B] block mb-1">رابط صورة الغلاف (Cover Image URL)</label>
                  <input
                    type="url"
                    value={storeFormData.coverUrl || ''}
                    onChange={(e) => setStoreFormData({ ...storeFormData, coverUrl: e.target.value })}
                    className="w-full text-xs font-bold px-3 py-2 rounded-xl border border-[#E2E8F0] bg-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-black text-[#1E293B] block mb-1">العنوان بالتفصيل بالبليدة (العربية)</label>
                    <input
                      type="text"
                      value={storeFormData.addressAr || ''}
                      onChange={(e) => setStoreFormData({ ...storeFormData, addressAr: e.target.value })}
                      className="w-full text-xs font-bold px-3 py-2 rounded-xl border border-[#E2E8F0] bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-black text-[#1E293B] block mb-1">Address in Blida (English)</label>
                    <input
                      type="text"
                      value={storeFormData.addressEn || ''}
                      onChange={(e) => setStoreFormData({ ...storeFormData, addressEn: e.target.value })}
                      className="w-full text-xs font-bold px-3 py-2 rounded-xl border border-[#E2E8F0] bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-black text-[#1E293B] block mb-1">Instagram Link</label>
                    <input
                      type="text"
                      value={storeFormData.instagramUrl || ''}
                      onChange={(e) => setStoreFormData({ ...storeFormData, instagramUrl: e.target.value })}
                      className="w-full text-xs font-bold px-3 py-2 rounded-xl border border-[#E2E8F0] bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-black text-[#1E293B] block mb-1">Map Location Query</label>
                    <input
                      type="text"
                      value={storeFormData.mapQuery || ''}
                      onChange={(e) => setStoreFormData({ ...storeFormData, mapQuery: e.target.value })}
                      className="w-full text-xs font-bold px-3 py-2 rounded-xl border border-[#E2E8F0] bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-black text-[#1E293B] block mb-1">العروض الحالية (Current Offers)</label>
                  <input
                    type="text"
                    value={storeFormData.currentOffersAr || ''}
                    onChange={(e) => setStoreFormData({ ...storeFormData, currentOffersAr: e.target.value })}
                    placeholder="مثال: خصم 10% أو تذوق مجاني يوم السبت..."
                    className="w-full text-xs font-bold px-3 py-2 rounded-xl border border-[#E2E8F0] bg-white"
                  />
                </div>

                {/* Toggles */}
                <div className="flex items-center gap-4 pt-1">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-[#1E293B]">
                    <input
                      type="checkbox"
                      checked={storeFormData.isFeatured || false}
                      onChange={(e) => setStoreFormData({ ...storeFormData, isFeatured: e.target.checked })}
                      className="rounded text-[#D81B60]"
                    />
                    <span>{isAr ? 'متجر مميز (Featured Store)' : 'Mark as Featured'}</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-[#1E293B]">
                    <input
                      type="checkbox"
                      checked={storeFormData.isPartner ?? true}
                      onChange={(e) => setStoreFormData({ ...storeFormData, isPartner: e.target.checked })}
                      className="rounded text-emerald-600"
                    />
                    <span>{isAr ? 'شريك SMOP DZ Partner' : 'SMOP DZ Partner'}</span>
                  </label>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-[#D81B60] text-white font-black text-xs shadow-xs"
                  >
                    {editingStore ? (isAr ? 'حفظ التعديلات' : 'Save Changes') : (isAr ? 'إضافة المتجر' : 'Add Store')}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEditingStore(null);
                      setIsAddingStore(false);
                    }}
                    className="px-4 py-2.5 rounded-xl bg-slate-200 text-slate-700 font-bold text-xs"
                  >
                    {isAr ? 'إلغاء' : 'Cancel'}
                  </button>
                </div>
              </form>
            ) : (
              /* Add New Store Button */
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-[#1E293B]">
                  {isAr ? `إجمالي المتاجر المسجلة بالبليدة (${stores.length})` : `Registered Stores in Blida (${stores.length})`}
                </span>
                <button
                  onClick={() => {
                    setIsAddingStore(true);
                    setEditingStore(null);
                    setStoreFormData({
                      nameEn: '',
                      nameAr: '',
                      logoUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=200',
                      coverUrl: 'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?auto=format&fit=crop&q=80&w=800',
                      categories: ['Natural Products'],
                      categoriesAr: ['منتجات طبيعية'],
                      city: 'Blida / البليدة',
                      addressEn: 'Blida',
                      addressAr: 'البليدة',
                      shortDescEn: '',
                      shortDescAr: '',
                      phone: '+213 550 00 00 00',
                      mapQuery: 'Blida,+Algeria',
                      isPartner: true,
                      isFeatured: false,
                      products: [],
                      galleryUrls: []
                    });
                  }}
                  className="px-3.5 py-2 rounded-xl bg-[#D81B60] hover:bg-[#C2185B] text-white font-black text-xs flex items-center gap-1.5 shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{isAr ? 'إضافة متجر جديد' : 'Add Store'}</span>
                </button>
              </div>
            )}

            {/* Existing Stores Management List */}
            <div className="space-y-3 pt-2">
              {stores.map((store) => {
                const name = isAr ? store.nameAr : store.nameEn;
                return (
                  <div
                    key={store.id}
                    className={`p-3.5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      store.isHidden
                        ? 'bg-slate-50 border-slate-200 opacity-60'
                        : 'bg-white border-[#E2E8F0]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-[#E2E8F0]">
                        <img src={store.logoUrl} alt={name} className="w-full h-full object-cover" />
                      </div>

                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-black text-xs sm:text-sm text-[#1E293B]">
                            {name}
                          </h4>
                          {store.isPartner && (
                            <span className="text-[9px] font-black px-2 py-0.5 rounded-md bg-[#DDFFBB] text-emerald-900">
                              Partner
                            </span>
                          )}
                          {store.isFeatured && (
                            <span className="text-[9px] font-black px-2 py-0.5 rounded-md bg-[#FFCEE3] text-[#D81B60]">
                              Featured
                            </span>
                          )}
                          {store.isHidden && (
                            <span className="text-[9px] font-black px-2 py-0.5 rounded-md bg-slate-200 text-slate-700">
                              Hidden
                            </span>
                          )}
                        </div>

                        <p className="text-[11px] text-[#64748B] mt-0.5">
                          {store.city} • {store.phone}
                        </p>
                      </div>
                    </div>

                    {/* Quick Admin Toggles & Actions */}
                    <div className="flex items-center gap-1.5 flex-wrap self-end sm:self-center">
                      <button
                        onClick={() => handleToggleFeatured(store.id)}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-colors ${
                          store.isFeatured
                            ? 'bg-[#FFF0F6] text-[#D81B60] border-[#FFCEE3]'
                            : 'bg-slate-50 text-slate-600 border-slate-200'
                        }`}
                        title="تبديل المتجر كـ مميز"
                      >
                        {store.isFeatured ? '★ المميزة' : '☆ تمييز'}
                      </button>

                      <button
                        onClick={() => handleTogglePartner(store.id)}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-colors ${
                          store.isPartner
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                            : 'bg-slate-50 text-slate-600 border-slate-200'
                        }`}
                        title="تبديل شارة الشريك"
                      >
                        {store.isPartner ? '✓ شريك' : '+ شريك'}
                      </button>

                      <button
                        onClick={() => handleToggleHide(store.id)}
                        className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600"
                        title={store.isHidden ? 'إظهار المتجر' : 'إخفاء المتجر'}
                      >
                        {store.isHidden ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                      </button>

                      <button
                        onClick={() => startEditStore(store)}
                        className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700"
                        title="تعديل المتجر"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>

                      {confirmDeleteId === store.id ? (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleDeleteStore(store.id)}
                            className="px-2 py-1 rounded-lg bg-rose-600 text-white text-[10px] font-bold"
                          >
                            {isAr ? 'تأكيد الحذف' : 'Confirm'}
                          </button>
                          <button
                            onClick={() => setConfirmDeleteId(null)}
                            className="px-2 py-1 rounded-lg bg-slate-200 text-slate-700 text-[10px] font-bold"
                          >
                            {isAr ? 'إلغاء' : 'Cancel'}
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setConfirmDeleteId(store.id)}
                          className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600"
                          title="حذف"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
