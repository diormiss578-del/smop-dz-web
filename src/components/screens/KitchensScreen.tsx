import React, { useState } from 'react';
import {
  Utensils,
  Star,
  MapPin,
  Clock,
  ShoppingBag,
  Plus,
  Minus,
  CheckCircle2,
  X,
  Calendar,
  Sparkles,
  ChefHat,
  Tag,
  CreditCard,
  Check,
  Zap,
  Timer,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { usePcos } from '../../context/PcosContext';
import { HomeCook, FoodMenuItem } from '../../types';

export const KitchensScreen: React.FC = () => {
  const { language, homeCooks, addReservation, navigateTo, currentUser } = usePcos();
  const isAr = language === 'AR';

  // Per-kitchen active menu tab: 'now' | 'preorder'
  const [kitchenTabs, setKitchenTabs] = useState<Record<string, 'now' | 'preorder'>>({});

  // Global filter: 'all' | 'now' | 'preorder'
  const [globalFilter, setGlobalFilter] = useState<'all' | 'now' | 'preorder'>('all');

  // Modal State
  const [activeCook, setActiveCook] = useState<HomeCook | null>(null);
  const [activeOrderType, setActiveOrderType] = useState<'available_now' | 'preorder_7_12h'>('available_now');
  const [selectedItems, setSelectedItems] = useState<Record<string, number>>({});
  const [customerName, setCustomerName] = useState(currentUser?.fullName || '');
  const [customerPhone, setCustomerPhone] = useState(currentUser?.phone || '');
  const [customerAddress, setCustomerAddress] = useState('');
  const [paymentChoice, setPaymentChoice] = useState<'baridimob' | 'cib' | 'on_delivery'>('on_delivery');

  // Date and Time calculation
  const todayStr = new Date().toISOString().split('T')[0];
  const tomorrowStr = (() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  })();

  const [reservationDate, setReservationDate] = useState(todayStr);
  const [reservationTime, setReservationTime] = useState('13:30');
  const [deliveryTimingMode, setDeliveryTimingMode] = useState<'asap' | 'scheduled'>('asap');
  const [notes, setNotes] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [lastBookingRef, setLastBookingRef] = useState('');

  const getActiveTabForCook = (cookId: string): 'now' | 'preorder' => {
    if (globalFilter === 'now') return 'now';
    if (globalFilter === 'preorder') return 'preorder';
    return kitchenTabs[cookId] || 'now';
  };

  const setTabForCook = (cookId: string, tab: 'now' | 'preorder') => {
    setKitchenTabs(prev => ({ ...prev, [cookId]: tab }));
  };

  const openOrderModal = (cook: HomeCook, orderType: 'available_now' | 'preorder_7_12h', initialItem?: FoodMenuItem) => {
    setActiveCook(cook);
    setActiveOrderType(orderType);

    if (orderType === 'available_now') {
      setReservationDate(todayStr);
      setDeliveryTimingMode('asap');
      setReservationTime('في أقرب وقت (30-45 دقيقة)');
    } else {
      setReservationDate(tomorrowStr);
      setDeliveryTimingMode('scheduled');
      setReservationTime('13:00');
    }

    if (currentUser) {
      if (currentUser.fullName) setCustomerName(currentUser.fullName);
      if (currentUser.phone) setCustomerPhone(currentUser.phone);
    }

    if (initialItem) {
      setSelectedItems({ [initialItem.id]: 1 });
    } else {
      // Pick first item matching that orderType
      const firstMatching = cook.menu.find(m => m.availabilityType === orderType) || cook.menu[0];
      setSelectedItems({ [firstMatching.id]: 1 });
    }

    setBookingSuccess(false);
  };

  const handleQuantityChange = (itemId: string, delta: number) => {
    setSelectedItems(prev => {
      const current = prev[itemId] || 0;
      const next = Math.max(0, current + delta);
      if (next === 0) {
        const copy = { ...prev };
        delete copy[itemId];
        return copy;
      }
      return { ...prev, [itemId]: next };
    });
  };

  const calculateTotal = (cook: HomeCook) => {
    return cook.menu.reduce((sum, item) => {
      const qty = selectedItems[item.id] || 0;
      return sum + item.priceDzd * qty;
    }, 0);
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeCook || !customerName.trim() || !customerPhone.trim()) return;

    const itemsSummaryList = activeCook.menu
      .filter(item => (selectedItems[item.id] || 0) > 0)
      .map(item => `${isAr ? item.nameAr : item.nameEn} (x${selectedItems[item.id]})`)
      .join(', ');

    if (!itemsSummaryList) return;

    const total = calculateTotal(activeCook);
    const refCode = (activeOrderType === 'available_now' ? 'NOW-' : 'PRE-') + Math.floor(100000 + Math.random() * 900000);
    setLastBookingRef(refCode);

    const scheduledTimeText = deliveryTimingMode === 'asap'
      ? (isAr ? 'توصيل فوري بأسرع وقت (اليوم)' : 'ASAP Today (30-45 mins)')
      : reservationTime;

    addReservation(
      activeCook.id,
      activeCook.brandEn,
      activeCook.brandAr,
      customerName.trim(),
      customerPhone.trim(),
      itemsSummaryList,
      total,
      reservationDate,
      scheduledTimeText,
      notes.trim(),
      customerAddress.trim(),
      paymentChoice
    );

    confetti({
      particleCount: 65,
      spread: 70,
      origin: { y: 0.65 }
    });

    setBookingSuccess(true);
  };

  return (
    <div className="space-y-6 pb-20 animate-in fade-in duration-150" data-testid="kitchens-screen-layout">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="bg-[#FFCEE3]/50 text-[#D81B60] text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
            <ChefHat className="w-3 h-3" />
            {isAr ? 'المطابخ الصحية بالبليدة' : 'Healthy Home Kitchens'}
          </span>
          <span className="bg-emerald-100 text-emerald-900 text-[10px] font-black px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <Zap className="w-3 h-3 text-emerald-600" />
            {isAr ? 'متوفر حالياً + طلب مسبق (7-12 ساعة)' : 'Available Now + 7-12h Pre-Order'}
          </span>
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-[#1E293B] tracking-tight">
          {isAr ? 'قائمتان لكل مطبخ: المتوفر حالياً والطلب المسبق' : 'Two Menus: Available Now & 7-12h Pre-Order'}
        </h2>
        <p className="text-xs sm:text-sm text-[#64748B] mt-1">
          {isAr
            ? 'لكل مطبخ قائمتان مستقلتان: القائمة الأولى أطباق ومخبوزات متوفرة حالياً للتوصيل الفوري، والقائمة الثانية وجبات تقليدية على الفخار تتطلب طلباً مسبقاً من 7 إلى 12 ساعة.'
            : 'Each kitchen provides two menus: Items available now for immediate delivery, and heritage slow-cooked meals requiring 7 to 12 hours pre-order.'}
        </p>
      </div>

      {/* Top Filter Buttons */}
      <div className="bg-[#FCF8F9] p-1.5 rounded-2xl border border-[#E2E8F0] flex gap-1.5 shadow-2xs">
        <button
          onClick={() => setGlobalFilter('all')}
          className={`flex-1 py-2 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all ${
            globalFilter === 'all'
              ? 'bg-[#D81B60] text-white shadow-xs'
              : 'text-[#64748B] hover:text-[#1E293B]'
          }`}
        >
          <Utensils className="w-3.5 h-3.5" />
          <span>{isAr ? 'جميع المطابخ والقوائم' : 'All Menus'}</span>
        </button>

        <button
          onClick={() => setGlobalFilter('now')}
          className={`flex-1 py-2 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all ${
            globalFilter === 'now'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-[#64748B] hover:text-emerald-700'
          }`}
        >
          <Zap className="w-3.5 h-3.5 text-amber-300" />
          <span>{isAr ? 'الأكل المتوفر حالياً (جاهز)' : 'Available Now'}</span>
        </button>

        <button
          onClick={() => setGlobalFilter('preorder')}
          className={`flex-1 py-2 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all ${
            globalFilter === 'preorder'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'text-[#64748B] hover:text-amber-700'
          }`}
        >
          <Timer className="w-3.5 h-3.5" />
          <span>{isAr ? 'طلب مسبق (7 - 12 ساعة)' : 'Pre-Order 7-12h'}</span>
        </button>
      </div>

      {/* Kitchen Cards */}
      <div className="space-y-6">
        {homeCooks.map((cook) => {
          const brand = isAr ? cook.brandAr : cook.brandEn;
          const cookName = isAr ? cook.cookNameAr : cook.cookNameEn;
          const specialties = isAr ? cook.specialtiesAr : cook.specialtiesEn;
          const loc = isAr ? cook.locationAr : cook.locationEn;
          const activeTab = getActiveTabForCook(cook.id);

          // Split menu into two lists
          const availableNowDishes = cook.menu.filter(m => m.availabilityType === 'available_now');
          const preorderDishes = cook.menu.filter(m => m.availabilityType === 'preorder_7_12h');

          const currentDishes = activeTab === 'now' ? availableNowDishes : preorderDishes;

          return (
            <div
              key={cook.id}
              className="bg-white border border-[#E2E8F0] hover:border-[#D81B60]/30 rounded-3xl p-5 sm:p-6 shadow-xs transition-all"
              data-testid={`kitchen-card-${cook.id}`}
            >
              {/* Kitchen Profile Header (No phone & No Instagram) */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-[#E2E8F0]">
                <div className="flex items-start gap-3.5">
                  <img
                    src={cook.imageUrl}
                    alt={brand}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover shrink-0 border border-[#E2E8F0] shadow-2xs"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="bg-[#FFCEE3]/50 text-[#D81B60] text-[10px] font-black px-2 py-0.5 rounded-md">
                        {isAr ? 'مطبخ معتمد بالبليدة' : 'Certified Blida Kitchen'}
                      </span>
                      <span className="flex items-center gap-1 text-amber-500 font-bold text-xs">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        {cook.rating}
                      </span>
                    </div>

                    <h3 className="font-black text-base sm:text-lg text-[#1E293B] mt-1 leading-snug">
                      {brand}
                    </h3>
                    <p className="text-xs text-[#D81B60] font-bold mt-0.5">
                      {cookName}
                    </p>
                    <p className="text-xs text-[#64748B] flex items-center gap-1 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-[#D81B60] shrink-0" />
                      <span>{loc}</span>
                    </p>
                  </div>
                </div>

                {/* Pre-Order Quick Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-2 shrink-0">
                  <button
                    onClick={() => openOrderModal(cook, 'available_now')}
                    data-testid={`order-now-${cook.id}`}
                    className="flex items-center justify-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-2xs transition-colors"
                  >
                    <Zap className="w-3.5 h-3.5 text-amber-300" />
                    <span>{isAr ? 'طلب فوري (المتوفر الآن)' : 'Order Ready Items'}</span>
                  </button>

                  <button
                    onClick={() => openOrderModal(cook, 'preorder_7_12h')}
                    data-testid={`order-preorder-${cook.id}`}
                    className="flex items-center justify-center gap-1.5 px-3.5 py-2 bg-[#D81B60] hover:bg-[#C2185B] text-white rounded-xl text-xs font-bold shadow-2xs transition-colors"
                  >
                    <Timer className="w-3.5 h-3.5" />
                    <span>{isAr ? 'طلب مسبق (7 - 12 ساعة)' : 'Pre-Order (7-12h)'}</span>
                  </button>
                </div>
              </div>

              {/* Specialties Description */}
              <div className="mt-3 text-xs text-[#64748B] bg-[#FCF8F9] p-3 rounded-2xl border border-[#E2E8F0]/70 flex items-center gap-2">
                <Utensils className="w-4 h-4 text-[#D81B60] shrink-0" />
                <span className="leading-relaxed">{specialties}</span>
              </div>

              {/* ======================================================== */}
              {/* THE TWO EXPLICIT MENUS TABS FOR THIS KITCHEN            */}
              {/* ======================================================== */}
              <div className="mt-5 space-y-4">
                <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-2 flex-wrap gap-2">
                  <div className="flex gap-2">
                    {/* Tab 1: Available Now */}
                    <button
                      onClick={() => setTabForCook(cook.id, 'now')}
                      className={`px-3.5 py-2 rounded-xl text-xs font-black flex items-center gap-2 transition-all ${
                        activeTab === 'now'
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-[#F8FAFC] text-[#64748B] hover:text-[#1E293B] border border-[#E2E8F0]'
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></span>
                      <span>{isAr ? 'القائمة 1: الأكل المتوفر حالياً' : 'Menu 1: Available Now'}</span>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${activeTab === 'now' ? 'bg-emerald-800 text-white' : 'bg-white text-[#64748B]'}`}>
                        {availableNowDishes.length}
                      </span>
                    </button>

                    {/* Tab 2: Pre-Order 7 to 12 Hours */}
                    <button
                      onClick={() => setTabForCook(cook.id, 'preorder')}
                      className={`px-3.5 py-2 rounded-xl text-xs font-black flex items-center gap-2 transition-all ${
                        activeTab === 'preorder'
                          ? 'bg-[#D81B60] text-white shadow-xs'
                          : 'bg-[#F8FAFC] text-[#64748B] hover:text-[#1E293B] border border-[#E2E8F0]'
                      }`}
                    >
                      <Timer className="w-3.5 h-3.5" />
                      <span>{isAr ? 'القائمة 2: وجبات بالطلب المسبق (7 - 12 ساعة)' : 'Menu 2: Pre-Order (7-12h)'}</span>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${activeTab === 'preorder' ? 'bg-[#880E4F] text-white' : 'bg-white text-[#64748B]'}`}>
                        {preorderDishes.length}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Sub-Banner Explaining Active Menu Policy */}
                {activeTab === 'now' ? (
                  <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-2xl p-3 text-xs flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-emerald-600 shrink-0" />
                      <div>
                        <span className="font-bold">
                          {isAr ? 'أطباق اليوم المتوفرة حالياً:' : 'Ready-to-Eat Stock Today:'}
                        </span>{' '}
                        <span>
                          {isAr
                            ? 'جاهزة في المطبخ للتوصيل الفوري أو الاستلام السريع اليوم (خلال 30 إلى 45 دقيقة).'
                            : 'Ready in the kitchen for instant dispatch or quick pick-up today (30-45 mins).'}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => openOrderModal(cook, 'available_now')}
                      className="px-3 py-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg font-bold text-[11px] shrink-0"
                    >
                      {isAr ? 'طلب الوجبة فوراً' : 'Order Now'}
                    </button>
                  </div>
                ) : (
                  <div className="bg-amber-50 border border-amber-200 text-amber-950 rounded-2xl p-3 text-xs flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <Timer className="w-4 h-4 text-amber-700 shrink-0" />
                      <div>
                        <span className="font-bold">
                          {isAr ? 'وجبات الطهي البطيء بالطلب المسبق (7 - 12 ساعة):' : 'Slow-Cooked Heritage Pre-Order (7-12h):'}
                        </span>{' '}
                        <span>
                          {isAr
                            ? 'تطهى خصيصاً على الفخار وبمكونات طازجة. يرجى تقديم طلبكِ المسبق قبل 7 إلى 12 ساعة مع تحديد توقيت وساعة التوصيل.'
                            : 'Simmered fresh upon request. Please place your order 7 to 12 hours ahead with your scheduled time.'}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => openOrderModal(cook, 'preorder_7_12h')}
                      className="px-3 py-1 bg-[#D81B60] hover:bg-[#C2185B] text-white rounded-lg font-bold text-[11px] shrink-0"
                    >
                      {isAr ? 'حجز طلب مسبق' : 'Schedule Pre-Order'}
                    </button>
                  </div>
                )}

                {/* Grid of Dishes for the Active Tab */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentDishes.map((item) => {
                    const isAvailableNow = item.availabilityType === 'available_now';

                    return (
                      <div
                        key={item.id}
                        className="bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#D81B60]/40 rounded-2xl p-3.5 flex flex-col justify-between transition-all group"
                      >
                        <div className="flex gap-3">
                          <img
                            src={item.imageUrl}
                            alt={isAr ? item.nameAr : item.nameEn}
                            className="w-20 h-20 rounded-xl object-cover shrink-0 border border-[#E2E8F0] group-hover:scale-105 transition-transform"
                          />
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              {isAvailableNow ? (
                                <span className="text-[9px] bg-emerald-100 text-emerald-900 font-black px-2 py-0.5 rounded-full flex items-center gap-1">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                  {isAr ? 'متوفر حالياً' : 'Available Now'}
                                </span>
                              ) : (
                                <span className="text-[9px] bg-amber-100 text-amber-900 font-black px-2 py-0.5 rounded-full flex items-center gap-1">
                                  <Timer className="w-2.5 h-2.5 text-amber-700" />
                                  {isAr ? 'طلب مسبق (7 - 12 ساعة)' : 'Pre-Order 7-12h'}
                                </span>
                              )}

                              {item.categoryAr && (
                                <span className="text-[9px] bg-[#FFCEE3]/50 text-[#D81B60] font-bold px-1.5 py-0.5 rounded">
                                  {isAr ? item.categoryAr : item.categoryEn}
                                </span>
                              )}
                            </div>

                            <h5 className="font-extrabold text-xs sm:text-sm text-[#1E293B] mt-1 leading-snug">
                              {isAr ? item.nameAr : item.nameEn}
                            </h5>

                            <p className="text-[11px] text-[#64748B] mt-1 line-clamp-2 leading-relaxed">
                              {isAr ? item.descriptionAr : item.descriptionEn}
                            </p>
                          </div>
                        </div>

                        {/* Price, Prep Time, and Direct Action Button */}
                        <div className="flex items-center justify-between pt-2.5 mt-2.5 border-t border-[#E2E8F0]">
                          <div className="flex items-center gap-2">
                            <span className="font-black text-sm text-[#D81B60]">
                              {item.priceDzd} DZD
                            </span>
                            {item.calories && (
                              <span className="text-[10px] text-[#64748B] bg-white px-1.5 py-0.5 rounded border border-[#E2E8F0]">
                                {item.calories} {isAr ? 'سعرة' : 'kcal'}
                              </span>
                            )}
                          </div>

                          <button
                            onClick={() => openOrderModal(cook, isAvailableNow ? 'available_now' : 'preorder_7_12h', item)}
                            className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-colors flex items-center gap-1 shadow-2xs ${
                              isAvailableNow
                                ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                                : 'bg-[#D81B60] hover:bg-[#C2185B] text-white'
                            }`}
                          >
                            <ShoppingBag className="w-3 h-3" />
                            <span>
                              {isAvailableNow
                                ? (isAr ? 'طلب فوري' : 'Order Now')
                                : (isAr ? 'طلب مسبق (7-12 س)' : 'Pre-Order')}
                            </span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ======================================================== */}
      {/* ORDER & PRE-ORDER MODAL                                 */}
      {/* ======================================================== */}
      {activeCook && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-xs animate-in fade-in"
          onClick={() => setActiveCook(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-lg w-full max-h-[92vh] overflow-y-auto p-5 sm:p-6 shadow-2xl border border-[#E2E8F0]"
            onClick={(e) => e.stopPropagation()}
            data-testid="kitchen-booking-modal"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
              <div>
                <div className="flex items-center gap-1.5">
                  {activeOrderType === 'available_now' ? (
                    <span className="bg-emerald-100 text-emerald-900 text-[10px] font-black px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <Zap className="w-3 h-3 text-emerald-600" />
                      {isAr ? 'طلب فوري: الأكل المتوفر حالياً' : 'Instant Order: Available Now'}
                    </span>
                  ) : (
                    <span className="bg-amber-100 text-amber-900 text-[10px] font-black px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <Timer className="w-3 h-3 text-amber-700" />
                      {isAr ? 'طلب مسبق: وجبات من 7 إلى 12 ساعة' : 'Pre-Order: 7 to 12 Hours Advance'}
                    </span>
                  )}
                </div>
                <h3 className="font-extrabold text-sm sm:text-base text-[#1E293B] mt-0.5">
                  {isAr ? activeCook.brandAr : activeCook.brandEn}
                </h3>
              </div>
              <button
                onClick={() => setActiveCook(null)}
                className="w-7 h-7 rounded-full bg-[#FCF8F9] hover:bg-[#FFCEE3]/40 text-[#64748B] flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {bookingSuccess ? (
              /* Success / Ticket Screen */
              <div className="py-6 text-center space-y-4 animate-in fade-in">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h4 className="font-black text-base sm:text-lg text-[#1E293B]">
                  {isAr ? 'تم تسجيل وتأكيد طلبكِ بنجاح! 🎉' : 'Order Registered Successfully! 🎉'}
                </h4>
                <p className="text-xs text-[#64748B] max-w-xs mx-auto leading-relaxed">
                  {isAr
                    ? `رقم الوصل: ${lastBookingRef}. تم تحويل طلبكِ إلى المطبخ للتجهيز والتوصيل بدقة حسب الموعد المختار.`
                    : `Order Ref: ${lastBookingRef}. Your healthy order has been dispatched to the kitchen.`}
                </p>

                {/* Pre-order Receipt Card */}
                <div className="bg-[#FCF8F9] border border-[#E2E8F0] rounded-2xl p-4 text-start text-xs space-y-2">
                  <div className="flex items-center justify-between text-[#1E293B]">
                    <span className="font-bold">{isAr ? 'نوع الطلب:' : 'Order Type:'}</span>
                    <span className="font-black text-[#D81B60]">
                      {activeOrderType === 'available_now'
                        ? (isAr ? 'أكل متوفر حالياً (توصيل فوري)' : 'Available Now (Instant)')
                        : (isAr ? 'طلب مسبق (من 7 إلى 12 ساعة)' : 'Pre-Order (7-12h)')}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[#1E293B]">
                    <span className="font-bold">{isAr ? 'الموعد المحدد للتوصيل:' : 'Delivery Timing:'}</span>
                    <span className="font-mono font-bold text-emerald-800">
                      {reservationDate} • {deliveryTimingMode === 'asap' ? (isAr ? 'بأسرع وقت اليوم' : 'ASAP') : reservationTime}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[#1E293B]">
                    <span className="font-bold">{isAr ? 'طريقة الدفع:' : 'Payment Choice:'}</span>
                    <span className="font-semibold text-emerald-700">
                      {paymentChoice === 'baridimob'
                        ? 'بريدي موب (BaridiMob)'
                        : paymentChoice === 'cib'
                        ? 'بطاقة CIB / الذهبية'
                        : (isAr ? 'الدفع عند الاستلام والتوصيل' : 'Cash on Delivery')}
                    </span>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center">
                  <button
                    onClick={() => {
                      setActiveCook(null);
                      navigateTo('dashboard');
                    }}
                    className="w-full sm:w-auto px-5 py-2.5 bg-[#D81B60] hover:bg-[#C2185B] text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
                  >
                    {isAr ? 'متابعة الطلب في لوحة التحكم' : 'View in Dashboard'}
                  </button>
                  <button
                    onClick={() => setActiveCook(null)}
                    className="w-full sm:w-auto px-5 py-2.5 bg-white border border-[#E2E8F0] text-[#1E293B] rounded-xl text-xs font-semibold hover:bg-[#FCF8F9]"
                  >
                    {isAr ? 'إغلاق' : 'Close'}
                  </button>
                </div>
              </div>
            ) : (
              /* Order Form */
              <form onSubmit={handleSubmitOrder} className="mt-4 space-y-4">
                {/* Specific Timing Notice */}
                {activeOrderType === 'available_now' ? (
                  <div className="bg-emerald-50 border border-emerald-200 text-emerald-950 rounded-2xl p-3 text-xs leading-relaxed flex items-start gap-2">
                    <Zap className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block">
                        {isAr ? 'ملاحظة التوصيل الفوري:' : 'Instant Delivery Notice:'}
                      </span>
                      <span>
                        {isAr
                          ? 'هذه الأطباق متوفرة حالياً في المطبخ وسيتم توصيلها مباشرة اليوم خلال 30 إلى 45 دقيقة أو في الساعة التي تختارينها اليوم.'
                          : 'These items are ready in the kitchen and will be delivered today within 30-45 minutes or at your chosen time.'}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="bg-amber-50 border border-amber-200 text-amber-950 rounded-2xl p-3 text-xs leading-relaxed flex items-start gap-2">
                    <Timer className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block">
                        {isAr ? 'شرط الطلب المسبق (من 7 إلى 12 ساعة):' : '7 to 12 Hours Advance Pre-Order Condition:'}
                      </span>
                      <span>
                        {isAr
                          ? 'نظراً لأن هذه الوجبات تحضر على الفخار الطبيعي وبمكونات طازجة على نار هادئة، يرجى تحديد وقت وتاريخ التوصيل بما لا يقل عن 7 إلى 12 ساعة مسبقاً.'
                          : 'Because these heritage meals are simmered fresh in clay pots, orders must be scheduled at least 7 to 12 hours ahead.'}
                      </span>
                    </div>
                  </div>
                )}

                {/* Items selection from the chosen menu */}
                <div>
                  <label className="text-xs font-black text-[#1E293B] block mb-2">
                    {activeOrderType === 'available_now'
                      ? (isAr ? 'اختاري من الأكل المتوفر حالياً:' : 'Select Available Now Items:')
                      : (isAr ? 'اختاري وجبات الطلب المسبق (7 - 12 ساعة):' : 'Select Pre-Order Meals (7-12h):')}
                  </label>

                  <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                    {activeCook.menu
                      .filter(item => item.availabilityType === activeOrderType)
                      .map((item) => {
                        const qty = selectedItems[item.id] || 0;
                        return (
                          <div
                            key={item.id}
                            className="bg-[#FCF8F9] border border-[#E2E8F0] rounded-2xl p-2.5 flex items-center justify-between gap-3"
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <img
                                src={item.imageUrl}
                                alt={isAr ? item.nameAr : item.nameEn}
                                className="w-12 h-12 rounded-xl object-cover shrink-0"
                              />
                              <div className="min-w-0">
                                <h5 className="font-bold text-xs text-[#1E293B] truncate">
                                  {isAr ? item.nameAr : item.nameEn}
                                </h5>
                                <div className="flex items-center gap-2 text-[11px]">
                                  <span className="font-black text-[#D81B60]">
                                    {item.priceDzd} DZD
                                  </span>
                                  {item.categoryAr && (
                                    <span className="text-[#64748B] text-[10px]">
                                      • {isAr ? item.categoryAr : item.categoryEn}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              <button
                                type="button"
                                onClick={() => handleQuantityChange(item.id, -1)}
                                className="w-7 h-7 rounded-lg bg-white border border-[#E2E8F0] text-[#1E293B] flex items-center justify-center hover:bg-[#FFCEE3]/30 transition-colors"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-xs font-black w-5 text-center font-mono">
                                {qty}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleQuantityChange(item.id, 1)}
                                className="w-7 h-7 rounded-lg bg-white border border-[#E2E8F0] text-[#1E293B] flex items-center justify-center hover:bg-[#FFCEE3]/30 transition-colors"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>

                {/* Scheduling Date and Hour */}
                <div className="p-3.5 bg-[#FCF8F9] border border-[#E2E8F0] rounded-2xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-[#1E293B] flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-[#D81B60]" />
                      <span>{isAr ? 'تحديد موعد وساعة التوصيل:' : 'Delivery Date & Time Slot:'}</span>
                    </span>

                    {activeOrderType === 'available_now' && (
                      <div className="flex gap-1 text-[11px]">
                        <button
                          type="button"
                          onClick={() => setDeliveryTimingMode('asap')}
                          className={`px-2 py-0.5 rounded-md font-bold transition-all ${
                            deliveryTimingMode === 'asap'
                              ? 'bg-emerald-600 text-white'
                              : 'bg-white text-[#64748B] border border-[#E2E8F0]'
                          }`}
                        >
                          {isAr ? 'فوري بأسرع وقت' : 'ASAP'}
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeliveryTimingMode('scheduled')}
                          className={`px-2 py-0.5 rounded-md font-bold transition-all ${
                            deliveryTimingMode === 'scheduled'
                              ? 'bg-[#D81B60] text-white'
                              : 'bg-white text-[#64748B] border border-[#E2E8F0]'
                          }`}
                        >
                          {isAr ? 'ساعة محددة' : 'Set Hour'}
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-[#64748B] block mb-1">
                        {isAr ? 'تاريخ التوصيل المطلوب *' : 'Delivery Date *'}
                      </label>
                      <input
                        type="date"
                        required
                        value={reservationDate}
                        min={activeOrderType === 'available_now' ? todayStr : todayStr}
                        onChange={(e) => setReservationDate(e.target.value)}
                        className="w-full bg-white border border-[#E2E8F0] focus:border-[#D81B60] rounded-xl px-3 py-2 text-xs text-[#1E293B] outline-none font-mono"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-[#64748B] block mb-1">
                        {activeOrderType === 'available_now' && deliveryTimingMode === 'asap'
                          ? (isAr ? 'توقيت التوصيل المختار' : 'Timing')
                          : (isAr ? 'ساعة التوصيل المرغوبة *' : 'Preferred Delivery Hour *')}
                      </label>

                      {activeOrderType === 'available_now' && deliveryTimingMode === 'asap' ? (
                        <div className="w-full bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2 text-xs text-emerald-800 font-bold flex items-center gap-1.5">
                          <Zap className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{isAr ? 'توصيل فوري خلال 30-45 دقيقة' : 'Instant (30-45 mins)'}</span>
                        </div>
                      ) : (
                        <input
                          type="time"
                          required
                          value={reservationTime}
                          onChange={(e) => setReservationTime(e.target.value)}
                          className="w-full bg-white border border-[#E2E8F0] focus:border-[#D81B60] rounded-xl px-3 py-2 text-xs text-[#1E293B] outline-none font-mono"
                        />
                      )}
                    </div>
                  </div>

                  {activeOrderType === 'preorder_7_12h' && (
                    <p className="text-[10px] text-amber-700 font-medium">
                      {isAr
                        ? '⏳ تذكري: هذا الطلب يتطلب طهياً هادئاً لمدة 7-12 ساعة لضمان وصوله طازجاً وساخناً في الساعة المحددة.'
                        : '⏳ Reminder: This meal is simmered fresh and requires 7-12 hours prior notice.'}
                    </p>
                  )}
                </div>

                {/* Customer Contact & Address */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-[#64748B] block mb-1">
                      {isAr ? 'اسمكِ الكامل *' : 'Full Name *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder={isAr ? 'مثال: أسماء بوزيد' : 'e.g. Asma Bouzid'}
                      className="w-full bg-[#FCF8F9] border border-[#E2E8F0] focus:border-[#D81B60] rounded-xl px-3 py-2 text-xs text-[#1E293B] outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-[#64748B] block mb-1">
                      {isAr ? 'رقم هاتفكِ للتوصيل والتأكيد *' : 'Phone for Delivery *'}
                    </label>
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="+213 55..."
                      className="w-full bg-[#FCF8F9] border border-[#E2E8F0] focus:border-[#D81B60] rounded-xl px-3 py-2 text-xs text-[#1E293B] font-mono outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#64748B] block mb-1">
                    {isAr ? 'عنوان التوصيل بالبليدة (أو استلام من المطبخ)' : 'Delivery Address in Blida (or Pickup)'}
                  </label>
                  <input
                    type="text"
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    placeholder={isAr ? 'مثال: باب السبت، عمارة 4، البليدة' : 'e.g. Bab Sebt, Blida'}
                    className="w-full bg-[#FCF8F9] border border-[#E2E8F0] focus:border-[#D81B60] rounded-xl px-3 py-2 text-xs text-[#1E293B] outline-none"
                  />
                </div>

                {/* Payment Selection */}
                <div>
                  <label className="text-xs font-black text-[#1E293B] block mb-2">
                    {isAr ? 'اختاري وسيلة الدفع:' : 'Payment Method:'}
                  </label>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setPaymentChoice('on_delivery')}
                      className={`p-2.5 rounded-xl border text-center font-bold transition-all ${
                        paymentChoice === 'on_delivery'
                          ? 'border-[#D81B60] bg-rose-50 text-[#D81B60] ring-1 ring-[#D81B60]'
                          : 'border-[#E2E8F0] bg-white text-[#64748B]'
                      }`}
                    >
                      <span className="block text-[11px]">{isAr ? 'عند الاستلام' : 'On Delivery'}</span>
                      <span className="text-[9px] font-normal text-[#94A3B8]">{isAr ? 'نقداً' : 'Cash'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentChoice('baridimob')}
                      className={`p-2.5 rounded-xl border text-center font-bold transition-all ${
                        paymentChoice === 'baridimob'
                          ? 'border-[#D81B60] bg-rose-50 text-[#D81B60] ring-1 ring-[#D81B60]'
                          : 'border-[#E2E8F0] bg-white text-[#64748B]'
                      }`}
                    >
                      <span className="block text-[11px]">بريدي موب</span>
                      <span className="text-[9px] font-normal text-[#94A3B8]">BaridiMob</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentChoice('cib')}
                      className={`p-2.5 rounded-xl border text-center font-bold transition-all ${
                        paymentChoice === 'cib'
                          ? 'border-[#D81B60] bg-rose-50 text-[#D81B60] ring-1 ring-[#D81B60]'
                          : 'border-[#E2E8F0] bg-white text-[#64748B]'
                      }`}
                    >
                      <span className="block text-[11px]">CIB / الذهبية</span>
                      <span className="text-[9px] font-normal text-[#94A3B8]">Card</span>
                    </button>
                  </div>
                </div>

                {/* Dietary Notes */}
                <div>
                  <label className="text-[11px] font-bold text-[#64748B] block mb-1">
                    {isAr ? 'ملاحظات صحية أو حساسية غذائية (اختياري)' : 'Special Dietary Notes (Optional)'}
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder={
                      isAr
                        ? 'مثال: بدون فلفل حار، استخدام زيت الزيتون البكر فقط...'
                        : 'e.g. Extra olive oil, no spicy additives...'
                    }
                    className="w-full bg-[#FCF8F9] border border-[#E2E8F0] focus:border-[#D81B60] rounded-xl px-3 py-2 text-xs text-[#1E293B] outline-none resize-none"
                  ></textarea>
                </div>

                {/* Total */}
                <div className="bg-[#DDFFBB]/40 border border-[#DDFFBB] rounded-2xl p-3 flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-950">
                    {isAr ? 'المجموع الإجمالي للطلب:' : 'Total Order Amount:'}
                  </span>
                  <span className="text-base font-black text-[#D81B60]">
                    {calculateTotal(activeCook).toLocaleString()} DZD
                  </span>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={calculateTotal(activeCook) === 0}
                  className={`w-full py-3 text-white rounded-xl font-bold text-xs sm:text-sm shadow-xs transition-colors flex items-center justify-center gap-2 ${
                    activeOrderType === 'available_now'
                      ? 'bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40'
                      : 'bg-[#D81B60] hover:bg-[#C2185B] disabled:opacity-40'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>
                    {activeOrderType === 'available_now'
                      ? (isAr ? `تأكيد الطلب الفوري (${calculateTotal(activeCook).toLocaleString()} دج)` : `Confirm Instant Order (${calculateTotal(activeCook).toLocaleString()} DZD)`)
                      : (isAr ? `تأكيد الطلب المسبق للـ 7-12 ساعة (${calculateTotal(activeCook).toLocaleString()} دج)` : `Confirm 7-12h Pre-Order (${calculateTotal(activeCook).toLocaleString()} DZD)`)}
                  </span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
