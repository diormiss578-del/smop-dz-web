import React, { useState } from 'react';
import {
  User,
  Mail,
  Lock,
  Phone,
  MapPin,
  Calendar,
  Scale,
  Ruler,
  CheckCircle2,
  Sparkles,
  Heart,
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Activity,
  AlertCircle,
  LogIn,
  UserPlus,
  HelpCircle,
  Stethoscope
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { usePcos } from '../../context/PcosContext';

export const SignUpScreen: React.FC = () => {
  const { language, signUp, signIn, currentUser, signOut, navigateTo, wilayas } = usePcos();
  const isAr = language === 'AR';

  // Toggle between 'signup' and 'signin'
  const [authMode, setAuthMode] = useState<'signup' | 'signin'>('signup');

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [wilaya, setWilaya] = useState('Blida (البليدة)');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Health Profile Fields
  const [age, setAge] = useState(25);
  const [height, setHeight] = useState(165);
  const [weight, setWeight] = useState(70);
  const [pcosStatus, setPcosStatus] = useState<'diagnosed' | 'suspected' | 'seeking_wellness' | 'support'>('diagnosed');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([
    'عدم انتظام الدورة الشهرية',
    'مقاومة الأنسولين'
  ]);

  // Privacy agreement
  const [agreeTerms, setAgreeTerms] = useState(true);

  // Feedback states
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successAnimation, setSuccessAnimation] = useState(false);

  // Calculate BMI
  const heightInMeters = height / 100;
  const bmi = heightInMeters > 0 ? (weight / (heightInMeters * heightInMeters)).toFixed(1) : '24.0';
  const getBmiCategory = (val: number) => {
    if (val < 18.5) return { labelAr: 'نقص في الوزن', labelEn: 'Underweight', color: 'text-amber-600' };
    if (val < 25) return { labelAr: 'وزن مثالي', labelEn: 'Normal weight', color: 'text-emerald-600' };
    if (val < 30) return { labelAr: 'زيادة في الوزن', labelEn: 'Overweight', color: 'text-amber-600' };
    return { labelAr: 'سمنة / مقاومة أنسولين', labelEn: 'Obese / Insulin Resistance', color: 'text-rose-600' };
  };

  const symptomOptions = [
    { id: 'irregular_cycles', ar: 'عدم انتظام الدورة الشهرية', en: 'Irregular cycles' },
    { id: 'insulin_resistance', ar: 'مقاومة الأنسولين وصعوبة نزول الوزن', en: 'Insulin resistance' },
    { id: 'acne_oily_skin', ar: 'حب الشباب والبشرة الدهنية', en: 'Acne & oily skin' },
    { id: 'hair_loss', ar: 'تساقط شعر الرأس (أندروجيني)', en: 'Scalp hair thinning' },
    { id: 'hirsutism', ar: 'زيادة نمو الشعر غير المرغوب', en: 'Hirsutism' },
    { id: 'chronic_fatigue', ar: 'التعب والإرهاق الكظري', en: 'Chronic fatigue' },
    { id: 'sugar_cravings', ar: 'رغبة شديدة في السكريات والنشويات', en: 'Intense sugar cravings' },
    { id: 'fertility_goals', ar: 'دعم الخصوبة والتبويض الطبيعي', en: 'Fertility & ovulation' }
  ];

  const toggleSymptom = (text: string) => {
    setSelectedSymptoms(prev =>
      prev.includes(text) ? prev.filter(s => s !== text) : [...prev, text]
    );
  };

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName.trim()) {
      setErrorMessage(isAr ? 'يرجى إدخال اسمكِ الكامل' : 'Please enter your full name');
      return;
    }

    if (!email.trim() || !email.includes('@')) {
      setErrorMessage(isAr ? 'يرجى إدخال بريد إلكتروني صحيح' : 'Please enter a valid email address');
      return;
    }

    if (password.length < 6) {
      setErrorMessage(isAr ? 'كلمة المرور يجب أن تتكون من 6 أحرف أو أرقام على الأقل' : 'Password must be at least 6 characters');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage(isAr ? 'كلمتا المرور غير متطابقتين' : 'Passwords do not match');
      return;
    }

    if (!agreeTerms) {
      setErrorMessage(isAr ? 'يرجى الموافقة على شروط الاستخدام وحماية الخصوصية' : 'Please accept terms & privacy policy');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const res = signUp({
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        wilaya,
        age: Number(age),
        height: Number(height),
        weight: Number(weight),
        symptoms: selectedSymptoms.join(', '),
        pcosStatus,
        password
      });

      setIsSubmitting(false);

      if (res.success) {
        setSuccessAnimation(true);
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    }, 400);
  };

  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim() || !email.includes('@')) {
      setErrorMessage(isAr ? 'يرجى إدخال البريد الإلكتروني المسجل' : 'Please enter your registered email');
      return;
    }

    if (!password) {
      setErrorMessage(isAr ? 'يرجى إدخال كلمة المرور' : 'Please enter your password');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const res = signIn(email.trim(), password);
      setIsSubmitting(false);
      if (res.success) {
        setSuccessAnimation(true);
        confetti({
          particleCount: 60,
          spread: 60,
          origin: { y: 0.6 }
        });
      }
    }, 300);
  };

  const handleQuickDemoLogin = () => {
    signIn('demo.algeria@smop-dz.com', '123456');
    setSuccessAnimation(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  // If already logged in or registration completed
  if (currentUser || successAnimation) {
    const activeUser = currentUser || {
      fullName: fullName || 'أختي الكريمة',
      email: email || 'user@smop-dz.com',
      wilaya: wilaya || 'Blida (البليدة)',
      joinedDate: new Date().toISOString().split('T')[0]
    };

    return (
      <div className="max-w-xl mx-auto py-8 px-4 animate-in fade-in duration-300">
        <div className="bg-white border border-[#E2E8F0] rounded-3xl p-6 sm:p-8 text-center shadow-md space-y-6">
          <div className="w-20 h-20 rounded-full bg-emerald-50 border-2 border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <span className="bg-[#FFCEE3]/60 text-[#D81B60] text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
              {isAr ? 'حساب نشط ومفعّل' : 'Active Account Verified'}
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-[#1E293B] mt-2">
              {isAr ? `مرحباً بكِ، ${activeUser.fullName}! 🌸` : `Welcome, ${activeUser.fullName}! 🌸`}
            </h2>
            <p className="text-xs sm:text-sm text-[#64748B] mt-1.5 leading-relaxed">
              {isAr
                ? 'تم إنشاء حسابكِ وتخصيص تجربتكِ الصحية بالكامل بنجاح. يمكنكِ الآن استكشاف المطابخ الصحية، ومتابعة دورتكِ، والتواصل مع الأخصائيات.'
                : 'Your personalized hormonal profile is ready. Explore healthy kitchens, track your cycles, and chat with nutritionists.'}
            </p>
          </div>

          {/* Profile Quick Summary Card */}
          <div className="bg-[#FCF8F9] border border-[#E2E8F0] rounded-2xl p-4 text-start text-xs space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[#64748B] font-medium">{isAr ? 'البريد الإلكتروني:' : 'Email:'}</span>
              <span className="font-bold text-[#1E293B] font-mono">{activeUser.email}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#64748B] font-medium">{isAr ? 'الولاية:' : 'Wilaya:'}</span>
              <span className="font-bold text-[#D81B60]">{activeUser.wilaya}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#64748B] font-medium">{isAr ? 'تاريخ الانضمام:' : 'Joined Date:'}</span>
              <span className="font-bold text-[#1E293B] font-mono">{activeUser.joinedDate}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => navigateTo('home')}
              className="flex-1 py-3 bg-[#D81B60] hover:bg-[#C2185B] text-white rounded-xl text-xs sm:text-sm font-bold shadow-xs transition-colors flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isAr ? 'الذهاب للرئيسية والبدء' : 'Go to Home'}</span>
            </button>
            <button
              onClick={() => navigateTo('dashboard')}
              className="flex-1 py-3 bg-white border border-[#E2E8F0] hover:bg-[#FCF8F9] text-[#1E293B] rounded-xl text-xs sm:text-sm font-bold transition-colors"
            >
              <span>{isAr ? 'لوحة تحكم حسابي' : 'Go to Dashboard'}</span>
            </button>
          </div>

          <div className="pt-2">
            <button
              onClick={signOut}
              className="text-xs text-[#94A3B8] hover:text-rose-600 transition-colors underline"
            >
              {isAr ? 'تسجيل الخروج من هذا الحساب' : 'Sign out from this account'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto pb-20 animate-in fade-in duration-200" data-testid="signup-screen">
      {/* Top Brand Banner */}
      <div className="text-center mb-6 space-y-2">
        <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white border border-[#FFCEE3]/60 shadow-sm p-1 overflow-hidden mx-auto">
          <img
            src="/smop_dz_logo.jpg"
            alt="SMOP DZ Logo"
            className="w-full h-full object-cover rounded-xl"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/img_smop_dz_logo_1780509782515.png';
            }}
          />
        </div>

        <div>
          <span className="bg-[#FFCEE3]/50 text-[#D81B60] text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider inline-flex items-center gap-1">
            <Heart className="w-3 h-3 fill-current" />
            {isAr ? 'بوابة المرأة الجزائرية للتوازن الهرموني' : 'Algerian Women PCOS Platform'}
          </span>
          <h1 className="text-xl sm:text-2xl font-black text-[#1E293B] tracking-tight mt-1.5">
            {authMode === 'signup'
              ? (isAr ? 'إنشاء حساب جديد في منصة SMOP DZ' : 'Create an Account on SMOP DZ')
              : (isAr ? 'تسجيل الدخول إلى حسابكِ' : 'Sign in to Your Account')}
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] max-w-md mx-auto leading-relaxed mt-1">
            {authMode === 'signup'
              ? (isAr
                ? 'انضمي مجاناً وسجلي ملفكِ الصحي لتتبّع دورتكِ، وحجز وجبات المطابخ الصحية، ومتابعة برامجكِ الغذائية.'
                : 'Join for free to customize your hormonal profile, track your cycle, and order from healthy kitchens.')
              : (isAr
                ? 'أهلاً بعودتكِ! أدخلي بريدكِ الإلكتروني وكلمة المرور لمتابعة تقدمكِ الصحي.'
                : 'Welcome back! Enter your email and password to access your health dashboard.')}
          </p>
        </div>

        {/* Tab switch between Sign Up and Sign In */}
        <div className="bg-white p-1 rounded-2xl border border-[#E2E8F0] flex max-w-xs mx-auto shadow-2xs mt-3">
          <button
            type="button"
            onClick={() => { setAuthMode('signup'); setErrorMessage(''); }}
            className={`flex-1 py-2 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
              authMode === 'signup'
                ? 'bg-[#D81B60] text-white shadow-xs'
                : 'text-[#64748B] hover:text-[#1E293B]'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>{isAr ? 'إنشاء حساب جديد' : 'Sign Up'}</span>
          </button>

          <button
            type="button"
            onClick={() => { setAuthMode('signin'); setErrorMessage(''); }}
            className={`flex-1 py-2 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
              authMode === 'signin'
                ? 'bg-[#D81B60] text-white shadow-xs'
                : 'text-[#64748B] hover:text-[#1E293B]'
            }`}
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>{isAr ? 'تسجيل الدخول' : 'Sign In'}</span>
          </button>
        </div>
      </div>

      {/* Main Form Container */}
      <div className="bg-white border border-[#E2E8F0] rounded-3xl p-5 sm:p-7 shadow-xs">
        {/* Error message alert */}
        {errorMessage && (
          <div className="mb-5 bg-rose-50 border border-rose-200 text-rose-800 rounded-2xl p-3 text-xs flex items-center gap-2 animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* SIGN UP FORM */}
        {authMode === 'signup' ? (
          <form onSubmit={handleSignUpSubmit} className="space-y-6">
            {/* SECTION 1: Personal Credentials */}
            <div className="space-y-3.5">
              <div className="flex items-center gap-2 pb-1.5 border-b border-[#E2E8F0]">
                <User className="w-4 h-4 text-[#D81B60]" />
                <h3 className="font-extrabold text-sm text-[#1E293B]">
                  {isAr ? '1. البيانات الشخصية والحساب' : '1. Personal Credentials'}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="text-[11px] font-bold text-[#1E293B] block mb-1">
                    {isAr ? 'الاسم واللقب *' : 'Full Name *'}
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#94A3B8] absolute start-3 top-2.5" />
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder={isAr ? 'مثال: أسماء بوزيد' : 'e.g. Asma Bouzid'}
                      className="w-full bg-[#FCF8F9] border border-[#E2E8F0] focus:border-[#D81B60] rounded-xl ps-9 pe-3 py-2 text-xs text-[#1E293B] outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#1E293B] block mb-1">
                    {isAr ? 'البريد الإلكتروني *' : 'Email Address *'}
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#94A3B8] absolute start-3 top-2.5" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full bg-[#FCF8F9] border border-[#E2E8F0] focus:border-[#D81B60] rounded-xl ps-9 pe-3 py-2 text-xs text-[#1E293B] outline-none font-mono transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="text-[11px] font-bold text-[#1E293B] block mb-1">
                    {isAr ? 'رقم الهاتف الجزائري (للتوصيل والتأكيد)' : 'Algerian Phone Number'}
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#94A3B8] absolute start-3 top-2.5" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="0550 12 34 56"
                      className="w-full bg-[#FCF8F9] border border-[#E2E8F0] focus:border-[#D81B60] rounded-xl ps-9 pe-3 py-2 text-xs text-[#1E293B] outline-none font-mono transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#1E293B] block mb-1">
                    {isAr ? 'الولاية *' : 'Wilaya *'}
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-[#D81B60] absolute start-3 top-2.5" />
                    <select
                      value={wilaya}
                      onChange={(e) => setWilaya(e.target.value)}
                      className="w-full bg-[#FCF8F9] border border-[#E2E8F0] focus:border-[#D81B60] rounded-xl ps-9 pe-3 py-2 text-xs text-[#1E293B] outline-none transition-colors"
                    >
                      {wilayas.map((w) => (
                        <option key={w} value={w}>
                          {w}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Password Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="text-[11px] font-bold text-[#1E293B] block mb-1">
                    {isAr ? 'كلمة المرور *' : 'Password *'}
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#94A3B8] absolute start-3 top-2.5" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-[#FCF8F9] border border-[#E2E8F0] focus:border-[#D81B60] rounded-xl ps-9 pe-9 py-2 text-xs text-[#1E293B] outline-none font-mono transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute end-2.5 top-2.5 text-[#94A3B8] hover:text-[#1E293B]"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#1E293B] block mb-1">
                    {isAr ? 'تأكيد كلمة المرور *' : 'Confirm Password *'}
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#94A3B8] absolute start-3 top-2.5" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-[#FCF8F9] border border-[#E2E8F0] focus:border-[#D81B60] rounded-xl ps-9 pe-3 py-2 text-xs text-[#1E293B] outline-none font-mono transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 2: Hormonal Profile & Body Metrics */}
            <div className="space-y-3.5 pt-2">
              <div className="flex items-center gap-2 pb-1.5 border-b border-[#E2E8F0]">
                <Activity className="w-4 h-4 text-[#D81B60]" />
                <h3 className="font-extrabold text-sm text-[#1E293B]">
                  {isAr ? '2. الملف الهرموني ومؤشرات الجسم' : '2. Body Metrics & PCOS Profile'}
                </h3>
              </div>

              {/* Age, Height, Weight & Live BMI */}
              <div className="grid grid-cols-3 gap-2.5">
                <div>
                  <label className="text-[11px] font-bold text-[#64748B] block mb-1 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#D81B60]" />
                    <span>{isAr ? 'العمر' : 'Age'}</span>
                  </label>
                  <input
                    type="number"
                    min={12}
                    max={65}
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="w-full bg-[#FCF8F9] border border-[#E2E8F0] focus:border-[#D81B60] rounded-xl px-2.5 py-2 text-xs text-[#1E293B] text-center font-bold outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#64748B] block mb-1 flex items-center gap-1">
                    <Ruler className="w-3.5 h-3.5 text-[#D81B60]" />
                    <span>{isAr ? 'الطول (سم)' : 'Height (cm)'}</span>
                  </label>
                  <input
                    type="number"
                    min={120}
                    max={220}
                    value={height}
                    onChange={(e) => setHeight(Number(e.target.value))}
                    className="w-full bg-[#FCF8F9] border border-[#E2E8F0] focus:border-[#D81B60] rounded-xl px-2.5 py-2 text-xs text-[#1E293B] text-center font-bold outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#64748B] block mb-1 flex items-center gap-1">
                    <Scale className="w-3.5 h-3.5 text-[#D81B60]" />
                    <span>{isAr ? 'الوزن (كغ)' : 'Weight (kg)'}</span>
                  </label>
                  <input
                    type="number"
                    min={30}
                    max={200}
                    value={weight}
                    onChange={(e) => setWeight(Number(e.target.value))}
                    className="w-full bg-[#FCF8F9] border border-[#E2E8F0] focus:border-[#D81B60] rounded-xl px-2.5 py-2 text-xs text-[#1E293B] text-center font-bold outline-none"
                  />
                </div>
              </div>

              {/* BMI Live Output */}
              <div className="bg-[#FCF8F9] border border-[#E2E8F0] rounded-2xl p-3 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-[#64748B]">
                    {isAr ? 'مؤشر كتلة الجسم التقديري (BMI):' : 'Estimated BMI:'}
                  </span>
                  <span className="font-black text-[#1E293B] font-mono text-sm">{bmi}</span>
                </div>
                <span className={`font-bold ${getBmiCategory(Number(bmi)).color}`}>
                  {isAr ? getBmiCategory(Number(bmi)).labelAr : getBmiCategory(Number(bmi)).labelEn}
                </span>
              </div>

              {/* Diagnosis Status */}
              <div>
                <label className="text-[11px] font-bold text-[#1E293B] block mb-1.5 flex items-center gap-1">
                  <Stethoscope className="w-3.5 h-3.5 text-[#D81B60]" />
                  <span>{isAr ? 'حالة التشخيص الطبي لمتلازمة تكيس المبايض:' : 'PCOS Medical Status:'}</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setPcosStatus('diagnosed')}
                    className={`p-2.5 rounded-xl border text-start transition-all ${
                      pcosStatus === 'diagnosed'
                        ? 'border-[#D81B60] bg-rose-50/50 text-[#D81B60] font-bold'
                        : 'border-[#E2E8F0] text-[#64748B] hover:bg-[#FCF8F9]'
                    }`}
                  >
                    <span className="block font-bold text-[11px]">
                      {isAr ? 'تشخيص طبي مؤكد' : 'Clinically Diagnosed'}
                    </span>
                    <span className="text-[10px] text-[#94A3B8] font-normal">
                      {isAr ? 'بالموجات أو تحاليل الهرمونات' : 'Via ultrasound / blood tests'}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPcosStatus('suspected')}
                    className={`p-2.5 rounded-xl border text-start transition-all ${
                      pcosStatus === 'suspected'
                        ? 'border-[#D81B60] bg-rose-50/50 text-[#D81B60] font-bold'
                        : 'border-[#E2E8F0] text-[#64748B] hover:bg-[#FCF8F9]'
                    }`}
                  >
                    <span className="block font-bold text-[11px]">
                      {isAr ? 'أعراض واضحة بدون فحص' : 'Suspected Symptoms'}
                    </span>
                    <span className="text-[10px] text-[#94A3B8] font-normal">
                      {isAr ? 'انقطاع الدورة أو زيادة الوزن' : 'Delayed cycle or hair loss'}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPcosStatus('seeking_wellness')}
                    className={`p-2.5 rounded-xl border text-start transition-all ${
                      pcosStatus === 'seeking_wellness'
                        ? 'border-[#D81B60] bg-rose-50/50 text-[#D81B60] font-bold'
                        : 'border-[#E2E8F0] text-[#64748B] hover:bg-[#FCF8F9]'
                    }`}
                  >
                    <span className="block font-bold text-[11px]">
                      {isAr ? 'وقاية وعناية هرمونية' : 'Wellness & Prevention'}
                    </span>
                    <span className="text-[10px] text-[#94A3B8] font-normal">
                      {isAr ? 'تغذية ونمط حياة متوازن' : 'Balanced lifestyle & diet'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Symptoms Picker */}
              <div>
                <label className="text-[11px] font-bold text-[#1E293B] block mb-1.5">
                  {isAr ? 'الأعراض التي ترغبين في التركيز عليها وتحسينها:' : 'Symptoms You Want to Focus on:'}
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {symptomOptions.map((s) => {
                    const text = isAr ? s.ar : s.en;
                    const isSelected = selectedSymptoms.includes(text);
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => toggleSymptom(text)}
                        className={`text-xs px-2.5 py-1.5 rounded-xl border transition-all ${
                          isSelected
                            ? 'bg-[#D81B60] text-white border-[#D81B60] shadow-2xs font-bold'
                            : 'bg-[#FCF8F9] text-[#64748B] border-[#E2E8F0] hover:border-[#D81B60]/40'
                        }`}
                      >
                        {isSelected ? '✓ ' : '+ '}
                        {text}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* SECTION 3: Terms & Agreement */}
            <div className="pt-2">
              <label className="flex items-start gap-2.5 cursor-pointer text-xs text-[#64748B] leading-relaxed">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-0.5 rounded text-[#D81B60] focus:ring-[#D81B60]"
                />
                <span>
                  {isAr
                    ? 'أوافق على شروط الاستخدام، وأتفهم أن التطبيق يقدم إرشادات تغذوية ورياضية داعمة ولا يغني عن المتابعة المباشرة مع طبيبتكِ المعالجة.'
                    : 'I agree to the terms of service and acknowledge that SMOP DZ offers nutritional support that complements doctor visits.'}
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-[#D81B60] hover:bg-[#C2185B] text-white rounded-xl text-xs sm:text-sm font-black shadow-xs transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              <span>
                {isSubmitting
                  ? (isAr ? 'جارٍ تسجيل الحساب...' : 'Creating Account...')
                  : (isAr ? 'إنشاء الحساب والبدء الآن' : 'Complete Registration')}
              </span>
            </button>
          </form>
        ) : (
          /* SIGN IN FORM */
          <form onSubmit={handleSignInSubmit} className="space-y-4">
            <div>
              <label className="text-[11px] font-bold text-[#1E293B] block mb-1">
                {isAr ? 'البريد الإلكتروني' : 'Email Address'}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#94A3B8] absolute start-3 top-2.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-[#FCF8F9] border border-[#E2E8F0] focus:border-[#D81B60] rounded-xl ps-9 pe-3 py-2 text-xs text-[#1E293B] outline-none font-mono"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-[#1E293B] block mb-1">
                {isAr ? 'كلمة المرور' : 'Password'}
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#94A3B8] absolute start-3 top-2.5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#FCF8F9] border border-[#E2E8F0] focus:border-[#D81B60] rounded-xl ps-9 pe-9 py-2 text-xs text-[#1E293B] outline-none font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute end-2.5 top-2.5 text-[#94A3B8] hover:text-[#1E293B]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-[#D81B60] hover:bg-[#C2185B] text-white rounded-xl text-xs sm:text-sm font-black shadow-xs transition-colors flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              <span>
                {isSubmitting
                  ? (isAr ? 'جارٍ تسجيل الدخول...' : 'Signing In...')
                  : (isAr ? 'تسجيل الدخول' : 'Sign In')}
              </span>
            </button>
          </form>
        )}

        {/* Quick Demo Access Bar */}
        <div className="mt-6 pt-5 border-t border-[#E2E8F0] text-center space-y-2">
          <p className="text-[11px] text-[#64748B]">
            {isAr ? 'أو يمكنكِ تجربة التطبيق مباشرة بحساب تجريبي بنقرة واحدة:' : 'Or test the app instantly with one-click demo login:'}
          </p>
          <button
            type="button"
            onClick={handleQuickDemoLogin}
            className="px-4 py-2 bg-[#FCF8F9] hover:bg-[#FFCEE3]/30 border border-[#E2E8F0] hover:border-[#D81B60]/40 text-[#1E293B] rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 mx-auto"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D81B60]" />
            <span>{isAr ? 'الدخول كحساب تجريبي (Demo Account)' : 'Quick Demo Access'}</span>
          </button>
        </div>
      </div>

      {/* Feature Highlights beneath */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-3.5 text-center shadow-2xs">
          <span className="text-xl block mb-1">🥘</span>
          <h4 className="font-extrabold text-xs text-[#1E293B]">
            {isAr ? 'مطابخ أكل صحي بالبليدة' : 'Blida Healthy Kitchens'}
          </h4>
          <p className="text-[10px] text-[#64748B] mt-0.5">
            {isAr ? 'أكل متوفر فوري أو بطلب مسبق 7-12 ساعة' : 'Instant ready meals or 7-12h pre-order'}
          </p>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-3.5 text-center shadow-2xs">
          <span className="text-xl block mb-1">👩‍⚕️</span>
          <h4 className="font-extrabold text-xs text-[#1E293B]">
            {isAr ? 'محادثات مع أخصائيات' : 'Specialist Consultations'}
          </h4>
          <p className="text-[10px] text-[#64748B] mt-0.5">
            {isAr ? 'نصائح تغذوية وطبية مخصصة لحالتكِ' : 'Custom medical & nutrition advice'}
          </p>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-3.5 text-center shadow-2xs">
          <span className="text-xl block mb-1">📊</span>
          <h4 className="font-extrabold text-xs text-[#1E293B]">
            {isAr ? 'تتبع الدورة والأعراض' : 'Cycle & Symptom Tracking'}
          </h4>
          <p className="text-[10px] text-[#64748B] mt-0.5">
            {isAr ? 'سجل يومي دقيق للدورة والإباضة والوزن' : 'Daily logs for cycles, ovulation & BMI'}
          </p>
        </div>
      </div>
    </div>
  );
};
