import React, { useState } from 'react';
import {
  UserCircle,
  Activity,
  Calendar,
  Bell,
  ShoppingBag,
  Plus,
  Trash2,
  Check,
  AlertCircle,
  Clock,
  Sparkles,
  Heart,
  Scale,
  Pill,
  X,
  Dumbbell,
  Gift,
  UserPlus,
  LogIn,
  LogOut,
  ShieldCheck,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';
import { usePcos } from '../../context/PcosContext';

export const DashboardScreen: React.FC = () => {
  const {
    language,
    navigateTo,
    currentUser,
    signOut,
    userProfile,
    updateProfile,
    cycleLogs,
    addCycleLog,
    deleteCycleLog,
    reminders,
    addReminder,
    deleteReminder,
    reservations,
    cancelReservation,
    fitnessBundles,
    purchasedFitnessBundles,
    isTrialActive,
    getTrialDaysRemaining,
    unlockedRecipeBundle,
    enrolledPrograms
  } = usePcos();
  const isAr = language === 'AR';

  // Profile Edit State
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [age, setAge] = useState(userProfile.age);
  const [height, setHeight] = useState(userProfile.height);
  const [weight, setWeight] = useState(userProfile.weight);
  const [symptoms, setSymptoms] = useState(userProfile.symptoms);
  const [profileSaved, setProfileSaved] = useState(false);

  // New Cycle Log State
  const [showAddCycleModal, setShowAddCycleModal] = useState(false);
  const [cycleDate, setCycleDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [cycleCategory, setCycleCategory] = useState('Period (دورة شهرية)');
  const [cycleNotes, setCycleNotes] = useState('');

  // New Reminder State
  const [showAddReminderModal, setShowAddReminderModal] = useState(false);
  const [remTitle, setRemTitle] = useState('');
  const [remTime, setRemTime] = useState('08:30 AM');
  const [remType, setRemType] = useState('supplement');
  const [remDate, setRemDate] = useState('');

  // BMI Calculation
  const heightInMeters = userProfile.height / 100;
  const bmi = heightInMeters > 0 ? (userProfile.weight / (heightInMeters * heightInMeters)).toFixed(1) : '22.0';
  const bmiVal = parseFloat(bmi);

  let bmiStatusEn = 'Normal';
  let bmiStatusAr = 'وزن طبيعي';
  let bmiColor = 'text-emerald-600 bg-emerald-50 border-emerald-200';

  if (bmiVal < 18.5) {
    bmiStatusEn = 'Underweight';
    bmiStatusAr = 'نقص في الوزن';
    bmiColor = 'text-blue-600 bg-blue-50 border-blue-200';
  } else if (bmiVal >= 25 && bmiVal < 30) {
    bmiStatusEn = 'Overweight';
    bmiStatusAr = 'زيادة في الوزن';
    bmiColor = 'text-amber-600 bg-amber-50 border-amber-200';
  } else if (bmiVal >= 30) {
    bmiStatusEn = 'Obesity (Insulin Risk)';
    bmiStatusAr = 'سمنة (مؤشر مقاومة الإنسولين)';
    bmiColor = 'text-rose-600 bg-rose-50 border-rose-200';
  }

  // Symptom Analysis & PCOS Type indication
  const symptomsLower = userProfile.symptoms.toLowerCase();
  let probableTypeEn = 'Insulin-Resistant PCOS (Most Common)';
  let probableTypeAr = 'تكيس المبايض المقاوم للإنسولين (الأكثر شيوعاً)';

  if (symptomsLower.includes('fatigue') && symptomsLower.includes('hair')) {
    probableTypeEn = 'Inflammatory & Insulin Variant';
    probableTypeAr = 'النمط الالتهابي والمقاوم للإنسولين المشترك';
  } else if (symptomsLower.includes('stress') || symptomsLower.includes('adrenal')) {
    probableTypeEn = 'Adrenal (Cortisol-Driven) PCOS';
    probableTypeAr = 'تكيس المبايض الكظري المرتبط بهرمون التوتر';
  }

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(Number(age), Number(height), Number(weight), symptoms);
    setIsEditingProfile(false);
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2500);
  };

  const handleAddCycle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cycleDate) return;
    addCycleLog(cycleDate, cycleCategory, cycleNotes.trim());
    setCycleNotes('');
    setShowAddCycleModal(false);
  };

  const handleAddReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!remTitle.trim()) return;
    addReminder(remTitle.trim(), remTime, remType, remDate);
    setRemTitle('');
    setShowAddReminderModal(false);
  };

  return (
    <div className="space-y-6 pb-20 animate-in fade-in duration-150" data-testid="dashboard-screen-layout">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-black text-[#1E293B] tracking-tight">
          {isAr ? 'لوحة التحكم والملف الصحي' : 'Personal Health Dashboard'}
        </h2>
        <p className="text-xs sm:text-sm text-[#64748B] mt-1">
          {isAr
            ? 'تتبعي مؤشراتكِ الحيوية، دورتكِ الشهرية، تذكيراتكِ اليومية وسجل حجوزاتكِ.'
            : 'Track your biometrics, menstrual cycle, therapeutic reminders, and meal orders.'}
        </p>
      </div>

      {/* User Account Bar */}
      {currentUser ? (
        <div className="bg-white border border-[#FFCEE3] rounded-3xl p-4 sm:p-5 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-in fade-in">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#FFCEE3]/50 text-[#D81B60] flex items-center justify-center font-black text-lg border border-[#FFCEE3]">
              {currentUser.fullName.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-base text-[#1E293B]">
                  {currentUser.fullName}
                </h3>
                <span className="bg-emerald-100 text-emerald-900 text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  {isAr ? 'حساب مفعّل' : 'Active Account'}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-[11px] text-[#64748B] mt-1">
                <span className="flex items-center gap-1">
                  <Mail className="w-3 h-3 text-[#94A3B8]" />
                  <span className="font-mono">{currentUser.email}</span>
                </span>
                {currentUser.phone && (
                  <span className="flex items-center gap-1">
                    <Phone className="w-3 h-3 text-[#94A3B8]" />
                    <span className="font-mono">{currentUser.phone}</span>
                  </span>
                )}
                {currentUser.wilaya && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#D81B60]" />
                    <span>{currentUser.wilaya}</span>
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center">
            <button
              onClick={() => navigateTo('signup')}
              className="px-3 py-1.5 rounded-xl bg-[#FCF8F9] hover:bg-[#FFCEE3]/30 border border-[#E2E8F0] text-xs font-bold text-[#1E293B] transition-colors"
            >
              {isAr ? 'بيانات الحساب' : 'Account Details'}
            </button>
            <button
              onClick={signOut}
              className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-xs font-bold text-rose-700 flex items-center gap-1 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>{isAr ? 'تسجيل الخروج' : 'Sign Out'}</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-r from-rose-50 to-pink-50 border border-[#FFCEE3] rounded-3xl p-4 sm:p-5 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#D81B60] text-white flex items-center justify-center shadow-xs">
              <UserPlus className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-black text-sm sm:text-base text-[#1E293B]">
                {isAr ? 'لم تقومي بإنشاء حسابكِ بعد' : 'You are browsing as Guest'}
              </h3>
              <p className="text-xs text-[#64748B] mt-0.5">
                {isAr
                  ? 'سجلي حسابكِ الآن لمزامنة قياساتكِ الحيوية، واستشاراتكِ مع الأخصائيات، وطلبات مطابخ البليدة.'
                  : 'Create an account to save and sync your biometrics, consultations, and healthy orders.'}
              </p>
            </div>
          </div>
          <button
            onClick={() => navigateTo('signup')}
            className="w-full sm:w-auto px-5 py-2.5 bg-[#D81B60] hover:bg-[#C2185B] text-white rounded-xl text-xs sm:text-sm font-black shadow-xs transition-colors shrink-0 flex items-center justify-center gap-1.5"
          >
            <UserPlus className="w-4 h-4" />
            <span>{isAr ? 'إنشاء حساب جديد (Sign Up)' : 'Sign Up Free'}</span>
          </button>
        </div>
      )}

      {/* User Bio-Metrics Card */}
      <div className="bg-white border border-[#E2E8F0] rounded-3xl p-5 sm:p-6 shadow-xs relative">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#FFCEE3]/60 flex items-center justify-center text-[#D81B60]">
              <UserCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm sm:text-base text-[#1E293B]">
                {isAr ? 'المؤشرات الحيوية والملف الشخصي' : 'Biometric Profile & Assessment'}
              </h3>
              <p className="text-[11px] text-[#64748B]">
                {isAr ? 'محسوبة بدقة لمتابعة توازن الأنسولين' : 'Calibrated for hormonal evaluation'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsEditingProfile(!isEditingProfile)}
            className="px-3 py-1.5 rounded-full bg-[#FCF8F9] hover:bg-[#FFCEE3]/40 text-[#D81B60] text-xs font-bold border border-[#FFCEE3] transition-colors"
          >
            {isEditingProfile ? (isAr ? 'إلغاء' : 'Cancel') : (isAr ? 'تعديل القياسات' : 'Edit Profile')}
          </button>
        </div>

        {profileSaved && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold p-2.5 rounded-xl mb-4 text-center animate-in fade-in">
            {isAr ? 'تم حفظ التحديثات بنجاح! 💾' : 'Profile bio-metrics updated successfully! 💾'}
          </div>
        )}

        {isEditingProfile ? (
          <form onSubmit={handleSaveProfile} className="space-y-4 pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] font-bold text-[#64748B] block mb-1">
                  {isAr ? 'العمر (سنة)' : 'Age (years)'}
                </label>
                <input
                  type="number"
                  min="12"
                  max="70"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full bg-[#FCF8F9] border border-[#E2E8F0] rounded-xl px-3 py-2 text-xs text-[#1E293B] outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#64748B] block mb-1">
                  {isAr ? 'الطول (سم)' : 'Height (cm)'}
                </label>
                <input
                  type="number"
                  min="100"
                  max="220"
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  className="w-full bg-[#FCF8F9] border border-[#E2E8F0] rounded-xl px-3 py-2 text-xs text-[#1E293B] outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#64748B] block mb-1">
                  {isAr ? 'الوزن (كغ)' : 'Weight (kg)'}
                </label>
                <input
                  type="number"
                  min="30"
                  max="250"
                  step="0.5"
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  className="w-full bg-[#FCF8F9] border border-[#E2E8F0] rounded-xl px-3 py-2 text-xs text-[#1E293B] outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-[#64748B] block mb-1">
                {isAr ? 'الأعراض المسجلة (مفصولة بفاصلة)' : 'Active Symptoms (comma separated)'}
              </label>
              <input
                type="text"
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="Acne, Fatigue, Irregular Periods, Hair Loss"
                className="w-full bg-[#FCF8F9] border border-[#E2E8F0] rounded-xl px-3 py-2 text-xs text-[#1E293B] outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-[#D81B60] text-white rounded-xl text-xs font-bold shadow-xs hover:bg-[#C2185B]"
            >
              {isAr ? 'حفظ القياسات الجديدة' : 'Save Bio-Metrics'}
            </button>
          </form>
        ) : (
          <div className="space-y-4">
            {/* Stat Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-[#FCF8F9] border border-[#E2E8F0] rounded-2xl p-3 text-center">
                <span className="text-[10px] text-[#64748B] block font-semibold">
                  {isAr ? 'العمر' : 'Age'}
                </span>
                <span className="text-base font-black text-[#1E293B]">
                  {userProfile.age} {isAr ? 'سنة' : 'yrs'}
                </span>
              </div>

              <div className="bg-[#FCF8F9] border border-[#E2E8F0] rounded-2xl p-3 text-center">
                <span className="text-[10px] text-[#64748B] block font-semibold">
                  {isAr ? 'الطول' : 'Height'}
                </span>
                <span className="text-base font-black text-[#1E293B]">
                  {userProfile.height} cm
                </span>
              </div>

              <div className="bg-[#FCF8F9] border border-[#E2E8F0] rounded-2xl p-3 text-center">
                <span className="text-[10px] text-[#64748B] block font-semibold">
                  {isAr ? 'الوزن' : 'Weight'}
                </span>
                <span className="text-base font-black text-[#1E293B]">
                  {userProfile.weight} kg
                </span>
              </div>

              <div className="bg-[#FCF8F9] border border-[#E2E8F0] rounded-2xl p-3 text-center">
                <span className="text-[10px] text-[#64748B] block font-semibold">
                  {isAr ? 'مؤشر كتلة الجسم' : 'BMI'}
                </span>
                <span className="text-base font-black text-[#D81B60]">
                  {bmi}
                </span>
              </div>
            </div>

            {/* BMI status and Diagnosis card */}
            <div className={`p-3.5 rounded-2xl border ${bmiColor} flex items-center justify-between gap-3 text-xs`}>
              <div className="flex items-center gap-2">
                <Scale className="w-4 h-4 shrink-0" />
                <span className="font-bold">
                  {isAr ? 'تصنيف الوزن:' : 'Weight Status:'} {isAr ? bmiStatusAr : bmiStatusEn}
                </span>
              </div>
              <span className="text-[10px] opacity-80 font-mono">
                {bmiVal < 25 ? '✔ Optimal' : '⚠ Insulin Vigilance'}
              </span>
            </div>

            {/* PCOS Type & Symptoms breakdown */}
            <div className="bg-[#FCF8F9] border border-[#FFCEE3]/80 rounded-2xl p-3.5 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#64748B] font-bold">
                  {isAr ? 'النمط الهرموني المرجح:' : 'Estimated PCOS Type:'}
                </span>
                <span className="font-extrabold text-[#D81B60]">
                  {isAr ? probableTypeAr : probableTypeEn}
                </span>
              </div>

              <div className="text-xs pt-1.5 border-t border-[#E2E8F0]">
                <span className="text-[#64748B] block text-[11px] mb-1">
                  {isAr ? 'الأعراض المحددة حالياً:' : 'Reported Symptoms:'}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {userProfile.symptoms.split(',').map((sym, i) => (
                    <span
                      key={i}
                      className="bg-white border border-[#E2E8F0] text-[#1E293B] text-[11px] font-medium px-2 py-0.5 rounded-lg shadow-2xs"
                    >
                      {sym.trim()}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Cycle Log Tracker Section */}
      <div className="bg-white border border-[#E2E8F0] rounded-3xl p-5 sm:p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#DDFFBB]/60 flex items-center justify-center text-emerald-800">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm sm:text-base text-[#1E293B]">
                {isAr ? 'سجل الدورة الشهرية والإباضة' : 'Cycle & Ovulation Tracker'}
              </h3>
              <p className="text-[11px] text-[#64748B]">
                {cycleLogs.length} {isAr ? 'تسجيلات مدونة' : 'logged entries'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowAddCycleModal(true)}
            data-testid="add-cycle-log-btn"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#D81B60] text-white text-xs font-bold hover:bg-[#C2185B] shadow-2xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{isAr ? 'تسجيل جديد' : 'Log Day'}</span>
          </button>
        </div>

        {cycleLogs.length === 0 ? (
          <p className="text-xs text-[#64748B] text-center py-4">
            {isAr ? 'لا يوجد سجلات حتى الآن. أضيفي أول تاريخ دورتكِ.' : 'No cycle logs yet. Record your first day.'}
          </p>
        ) : (
          <div className="space-y-2.5">
            {cycleLogs.map((log) => (
              <div
                key={log.id}
                className="bg-[#FCF8F9] border border-[#E2E8F0] rounded-2xl p-3 flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white border border-[#E2E8F0] flex flex-col items-center justify-center text-[10px] font-bold text-[#D81B60]">
                    <span>{log.dateString.split('-')[1]}</span>
                    <span className="font-black text-xs leading-none">{log.dateString.split('-')[2]}</span>
                  </div>
                  <div>
                    <h5 className="font-bold text-[#1E293B]">{log.category}</h5>
                    <p className="text-[#64748B] text-[11px] mt-0.5">{log.notes || '—'}</p>
                  </div>
                </div>

                <button
                  onClick={() => deleteCycleLog(log.id)}
                  className="p-1.5 text-[#94A3B8] hover:text-rose-600 transition-colors"
                  title={isAr ? 'حذف' : 'Delete'}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Daily Reminders Section */}
      <div className="bg-white border border-[#E2E8F0] rounded-3xl p-5 sm:p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#FFCEE3]/60 flex items-center justify-center text-[#D81B60]">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm sm:text-base text-[#1E293B]">
                {isAr ? 'تذكيرات الأدوية والمكملات والاستشارات' : 'Therapeutic Reminders'}
              </h3>
              <p className="text-[11px] text-[#64748B]">
                {reminders.length} {isAr ? 'تنبيهات نشطة' : 'active reminders'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowAddReminderModal(true)}
            data-testid="add-reminder-btn"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#D81B60] text-white text-xs font-bold hover:bg-[#C2185B] shadow-2xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{isAr ? 'إضافة تذكير' : 'Add Reminder'}</span>
          </button>
        </div>

        {reminders.length === 0 ? (
          <p className="text-xs text-[#64748B] text-center py-4">
            {isAr ? 'لا توجد تذكيرات نشطة حالياً.' : 'No reminders active.'}
          </p>
        ) : (
          <div className="space-y-2.5">
            {reminders.map((rem) => (
              <div
                key={rem.id}
                className="bg-[#FCF8F9] border border-[#E2E8F0] rounded-2xl p-3 flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white border border-[#FFCEE3] text-[#D81B60] flex items-center justify-center">
                    <Pill className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-bold text-[#1E293B]">{rem.title}</h5>
                    <div className="flex items-center gap-2 text-[11px] text-[#64748B] mt-0.5">
                      <span className="font-mono text-[#D81B60] font-semibold">{rem.time}</span>
                      <span>•</span>
                      <span className="capitalize">{rem.type}</span>
                      {rem.dateString && (
                        <>
                          <span>•</span>
                          <span>{rem.dateString}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => deleteReminder(rem.id)}
                  className="p-1.5 text-[#94A3B8] hover:text-rose-600 transition-colors"
                  title={isAr ? 'حذف التذكير' : 'Delete reminder'}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Kitchen Reservations History Section */}
      <div className="bg-white border border-[#E2E8F0] rounded-3xl p-5 sm:p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#DDFFBB]/60 flex items-center justify-center text-emerald-800">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm sm:text-base text-[#1E293B]">
                {isAr ? 'حجوزات وطلبات المطابخ الصحية' : 'Kitchen Meal Reservations'}
              </h3>
              <p className="text-[11px] text-[#64748B]">
                {reservations.length} {isAr ? 'طلبات مسجلة' : 'booked orders'}
              </p>
            </div>
          </div>
        </div>

        {reservations.length === 0 ? (
          <div className="text-center py-6 text-xs text-[#64748B] bg-[#FCF8F9] rounded-2xl border border-dashed border-[#E2E8F0]">
            <p>
              {isAr
                ? 'لم تقومي بحجز أي وجبات صحية بعد. تفقدي تبويب "المطابخ" لطلب أشهى الطواجن والحلويات الصحية!'
                : 'No kitchen reservations yet. Explore the Kitchens tab for healthy traditional meals!'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {reservations.map((res) => (
              <div
                key={res.id}
                className="bg-[#FCF8F9] border border-[#E2E8F0] rounded-2xl p-4 text-xs space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h4 className="font-black text-sm text-[#1E293B]">
                      {isAr ? res.cookBrandAr : res.cookBrandEn}
                    </h4>
                    {res.orderType && (
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                        res.orderType === 'available_now' ? 'bg-emerald-100 text-emerald-900' : 'bg-amber-100 text-amber-900'
                      }`}>
                        {res.orderType === 'available_now'
                          ? (isAr ? 'متوفر حالياً' : 'Available Now')
                          : (isAr ? 'طلب مسبق (7-12 س)' : 'Pre-Order 7-12h')}
                      </span>
                    )}
                  </div>
                  <span className="font-black text-[#D81B60]">
                    {res.totalPriceDzd.toLocaleString()} DZD
                  </span>
                </div>

                <p className="text-[#475569] font-medium leading-relaxed">
                  {res.itemsSummary}
                </p>

                {res.address && (
                  <p className="text-[11px] text-[#64748B] flex items-center gap-1">
                    <span className="font-bold text-[#1E293B]">{isAr ? 'العنوان:' : 'Address:'}</span>
                    <span>{res.address}</span>
                  </p>
                )}

                <div className="flex items-center justify-between pt-2 border-t border-[#E2E8F0] text-[11px] text-[#64748B] flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1 font-mono">
                      <Calendar className="w-3 h-3 text-[#D81B60]" />
                      {res.reservationDate}
                    </span>
                    <span className="flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3 text-[#D81B60]" />
                      {res.reservationTime}
                    </span>
                    {res.paymentMethod && (
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded">
                        {res.paymentMethod === 'baridimob' ? 'BaridiMob' : res.paymentMethod === 'cib' ? 'CIB' : (isAr ? 'عند الاستلام' : 'Cash')}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => cancelReservation(res.id)}
                    className="text-rose-600 hover:underline font-bold"
                  >
                    {isAr ? 'إلغاء الحجز' : 'Cancel Reservation'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Active Fitness & Wellness Bundles */}
      <div className="bg-white border border-[#E2E8F0] rounded-3xl p-5 sm:p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#FFCEE3]/50 flex items-center justify-center text-[#D81B60]">
              <Dumbbell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm sm:text-base text-[#1E293B]">
                {isAr ? 'حزم الرياضة والاشتراكات الهرمونية' : 'Active Fitness & Wellness Bundles'}
              </h3>
              <p className="text-[11px] text-[#64748B]">
                {isAr ? 'متابعة حالة الاشتراكات وفترات التجريب المجانية' : 'Track bundle subscriptions and free trials'}
              </p>
            </div>
          </div>
          <button
            onClick={() => navigateTo('fitness')}
            className="text-xs font-bold text-[#D81B60] hover:underline"
          >
            {isAr ? 'استعراض الحزم' : 'Browse Bundles'}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {fitnessBundles.map(bundle => {
            const isPurchased = purchasedFitnessBundles.includes(bundle.id);
            const trialActive = isTrialActive(bundle.id);
            const daysLeft = getTrialDaysRemaining(bundle.id);
            const title = isAr ? bundle.titleAr : bundle.titleEn;

            return (
              <div
                key={bundle.id}
                className="bg-[#FCF8F9] border border-[#E2E8F0] rounded-2xl p-3.5 flex items-center justify-between gap-3"
              >
                <div className="min-w-0">
                  <h4 className="font-bold text-xs text-[#1E293B] truncate">
                    {title}
                  </h4>
                  <div className="mt-1">
                    {isPurchased ? (
                      <span className="text-[10px] font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md inline-flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        {isAr ? 'اشتراك نشط (30 يوماً)' : 'Active (30 Days)'}
                      </span>
                    ) : trialActive ? (
                      <span className="text-[10px] font-black text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md inline-flex items-center gap-1">
                        <Gift className="w-3 h-3 text-amber-600" />
                        {isAr ? `تجربة مجانية نشطة (${daysLeft} أيام متبقية)` : `Trial Active (${daysLeft} days left)`}
                      </span>
                    ) : (
                      <span className="text-[10px] font-semibold text-[#64748B]">
                        {isAr ? '900 دج • 3 أيام تجربة مجانية' : '900 DZD • 3-Day Trial'}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => navigateTo('fitness')}
                  className="px-3 py-1.5 bg-white border border-[#E2E8F0] hover:border-[#D81B60] text-[#1E293B] rounded-xl text-xs font-bold shrink-0 transition-colors"
                >
                  {isPurchased || trialActive ? (isAr ? 'متابعة' : 'Open') : (isAr ? 'تجريب' : 'Try')}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Cycle Log Modal */}
      {showAddCycleModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in"
          onClick={() => setShowAddCycleModal(false)}
        >
          <div
            className="bg-white rounded-3xl max-w-sm w-full p-5 shadow-2xl border border-[#E2E8F0]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
              <h4 className="font-black text-sm text-[#1E293B]">
                {isAr ? 'تسجيل مؤشر دورة هرمونية' : 'Record Cycle Log'}
              </h4>
              <button
                onClick={() => setShowAddCycleModal(false)}
                className="w-7 h-7 rounded-full bg-[#FCF8F9] hover:bg-[#FFCEE3]/40 text-[#64748B] flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddCycle} className="mt-4 space-y-3">
              <div>
                <label className="text-[11px] font-bold text-[#64748B] block mb-1">
                  {isAr ? 'التاريخ *' : 'Date *'}
                </label>
                <input
                  type="date"
                  required
                  value={cycleDate}
                  onChange={(e) => setCycleDate(e.target.value)}
                  className="w-full bg-[#FCF8F9] border border-[#E2E8F0] rounded-xl px-3 py-2 text-xs text-[#1E293B] outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#64748B] block mb-1">
                  {isAr ? 'التصنيف *' : 'Category *'}
                </label>
                <select
                  value={cycleCategory}
                  onChange={(e) => setCycleCategory(e.target.value)}
                  className="w-full bg-[#FCF8F9] border border-[#E2E8F0] rounded-xl px-3 py-2 text-xs text-[#1E293B] outline-none"
                >
                  <option value="Period (دورة شهرية)">Period (دورة شهرية)</option>
                  <option value="Ovulation (إباضة)">Ovulation (إباضة)</option>
                  <option value="Symptom Log (أعراض يومية)">Symptom Log (أعراض يومية)</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#64748B] block mb-1">
                  {isAr ? 'ملاحظات الأعراض أو الألم' : 'Symptoms or Notes'}
                </label>
                <input
                  type="text"
                  value={cycleNotes}
                  onChange={(e) => setCycleNotes(e.target.value)}
                  placeholder={isAr ? 'مثال: صداع، تقلصات، طاقة عالية...' : 'e.g. cramps, fatigue, high energy...'}
                  className="w-full bg-[#FCF8F9] border border-[#E2E8F0] rounded-xl px-3 py-2 text-xs text-[#1E293B] outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#D81B60] text-white rounded-xl text-xs font-bold hover:bg-[#C2185B] shadow-xs mt-2"
              >
                {isAr ? 'إضافة إلى السجل' : 'Add to Log'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Add Reminder Modal */}
      {showAddReminderModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in"
          onClick={() => setShowAddReminderModal(false)}
        >
          <div
            className="bg-white rounded-3xl max-w-sm w-full p-5 shadow-2xl border border-[#E2E8F0]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
              <h4 className="font-black text-sm text-[#1E293B]">
                {isAr ? 'إضافة تذكير يومي جديد' : 'New Therapeutic Reminder'}
              </h4>
              <button
                onClick={() => setShowAddReminderModal(false)}
                className="w-7 h-7 rounded-full bg-[#FCF8F9] hover:bg-[#FFCEE3]/40 text-[#64748B] flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddReminder} className="mt-4 space-y-3">
              <div>
                <label className="text-[11px] font-bold text-[#64748B] block mb-1">
                  {isAr ? 'العنوان / اسم المكمل أو الدواء *' : 'Title / Medication / Supplement *'}
                </label>
                <input
                  type="text"
                  required
                  value={remTitle}
                  onChange={(e) => setRemTitle(e.target.value)}
                  placeholder={isAr ? 'مثال: Myo-Inositol (إينوزيتول)' : 'e.g. Myo-Inositol'}
                  className="w-full bg-[#FCF8F9] border border-[#E2E8F0] rounded-xl px-3 py-2 text-xs text-[#1E293B] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-bold text-[#64748B] block mb-1">
                    {isAr ? 'الوقت *' : 'Time *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={remTime}
                    onChange={(e) => setRemTime(e.target.value)}
                    placeholder="08:30 AM"
                    className="w-full bg-[#FCF8F9] border border-[#E2E8F0] rounded-xl px-3 py-2 text-xs text-[#1E293B] outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#64748B] block mb-1">
                    {isAr ? 'النوع *' : 'Type *'}
                  </label>
                  <select
                    value={remType}
                    onChange={(e) => setRemType(e.target.value)}
                    className="w-full bg-[#FCF8F9] border border-[#E2E8F0] rounded-xl px-3 py-2 text-xs text-[#1E293B] outline-none capitalize"
                  >
                    <option value="supplement">Supplement</option>
                    <option value="medication">Medication</option>
                    <option value="appointment">Appointment</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#64748B] block mb-1">
                  {isAr ? 'تاريخ الموعد (اختياري)' : 'Date (Optional for appointments)'}
                </label>
                <input
                  type="date"
                  value={remDate}
                  onChange={(e) => setRemDate(e.target.value)}
                  className="w-full bg-[#FCF8F9] border border-[#E2E8F0] rounded-xl px-3 py-2 text-xs text-[#1E293B] outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#D81B60] text-white rounded-xl text-xs font-bold hover:bg-[#C2185B] shadow-xs mt-2"
              >
                {isAr ? 'حفظ التذكير' : 'Save Reminder'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
