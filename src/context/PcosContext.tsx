import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  AuthUser,
  UserProfile,
  CycleLog,
  Reminder,
  Reservation,
  ChatMessage,
  Specialist,
  EcoStore,
  WellnessProgram,
  WorkoutVideo,
  GymInfo,
  HomeCook,
  Article,
  RecipeItem,
  PaymentItem,
  PaymentMethod,
  FitnessBundle
} from '../types';
import {
  articles as staticArticles,
  specialists as staticSpecialists,
  ecoStores as staticEcoStores,
  wellnessPrograms as staticPrograms,
  workouts as staticWorkouts,
  fitnessBundles as staticFitnessBundles,
  localGyms as staticGyms,
  homeCooks as staticCooks,
  wilayas as staticWilayas,
  pcosRecipesCatalog,
  RECIPE_BUNDLE_COUNT,
  RECIPE_BUNDLE_PRICE_DZD,
  TOTAL_RECIPES_COUNT
} from '../data/mockData';

interface PcosContextType {
  language: 'AR' | 'EN';
  toggleLanguage: () => void;
  currentScreen: string;
  navigateTo: (screen: string) => void;
  selectedWilaya: string;
  setWilayaFilter: (wilaya: string) => void;
  selectedStoreCategory: string;
  setStoreCategory: (category: string) => void;
  currentUser: AuthUser | null;
  isAuthenticated: boolean;
  signUp: (userData: {
    fullName: string;
    email: string;
    phone?: string;
    wilaya?: string;
    age: number;
    height: number;
    weight: number;
    symptoms: string;
    pcosStatus?: 'diagnosed' | 'suspected' | 'seeking_wellness' | 'support';
    password?: string;
  }) => { success: boolean; error?: string };
  signIn: (email: string, password?: string) => { success: boolean; error?: string };
  signOut: () => void;
  userProfile: UserProfile;
  updateProfile: (age: number, height: number, weight: number, symptoms: string) => void;
  cycleLogs: CycleLog[];
  addCycleLog: (dateString: string, category: string, notes: string) => void;
  deleteCycleLog: (id: number) => void;
  reminders: Reminder[];
  addReminder: (title: string, time: string, type: string, dateString?: string) => void;
  deleteReminder: (id: number) => void;
  reservations: Reservation[];
  addReservation: (
    cookId: string,
    cookBrandEn: string,
    cookBrandAr: string,
    customerName: string,
    customerPhone: string,
    itemsSummary: string,
    totalPriceDzd: number,
    reservationDate: string,
    reservationTime: string,
    notes?: string,
    address?: string,
    paymentMethod?: string
  ) => void;
  cancelReservation: (id: number) => void;
  activeChatSpecialist: Specialist | null;
  openChatWith: (specialist: Specialist | null) => void;
  chatMessages: ChatMessage[];
  sendChatMessage: (text: string) => void;
  fitnessBundles: FitnessBundle[];
  purchasedFitnessBundles: string[];
  purchaseFitnessBundle: (bundleId: string, extraVideos?: number) => void;
  fitnessTrials: Record<string, number>;
  startFitnessTrial: (bundleId: string) => void;
  isTrialActive: (bundleId: string) => boolean;
  getTrialDaysRemaining: (bundleId: string) => number;
  isBundleActive: (bundleId: string) => boolean;
  getExtraVideosCount: (bundleId: string) => number;
  qrDialogVisible: boolean;
  setQrDialogVisible: (visible: boolean) => void;
  articles: Article[];
  specialists: Specialist[];
  ecoStores: EcoStore[];
  wellnessPrograms: WellnessProgram[];
  workouts: WorkoutVideo[];
  localGyms: GymInfo[];
  homeCooks: HomeCook[];
  wilayas: string[];
  recipes: RecipeItem[];
  unlockedRecipeBundle: boolean;
  unlockRecipeBundle: () => void;
  enrolledPrograms: Record<string, { withFollowUp: boolean; date: string }>;
  enrollInProgram: (programId: string, withFollowUp: boolean) => void;
  activePaymentItem: PaymentItem | null;
  startPayment: (item: PaymentItem) => void;
  closePayment: () => void;
  completePayment: (method: PaymentMethod, txRef?: string) => void;
  recipeBundleCount: number;
  recipeBundlePriceDzd: number;
  totalRecipesCount: number;
}

const PcosContext = createContext<PcosContextType | undefined>(undefined);

export const PcosProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Language Toggle: Defaults to 'AR' like the Android app
  const [language, setLanguage] = useState<'AR' | 'EN'>(() => {
    return (localStorage.getItem('smop_language') as 'AR' | 'EN') || 'AR';
  });

  const toggleLanguage = () => {
    setLanguage(prev => {
      const next = prev === 'AR' ? 'EN' : 'AR';
      localStorage.setItem('smop_language', next);
      return next;
    });
  };

  // Sync html dir & lang attributes with language state
  useEffect(() => {
    document.documentElement.lang = language === 'AR' ? 'ar' : 'en';
    document.documentElement.dir = language === 'AR' ? 'rtl' : 'ltr';
  }, [language]);

  // 2. Navigation
  const [currentScreen, setCurrentScreen] = useState<string>('home');
  const navigateTo = (screen: string) => {
    setCurrentScreen(screen);
    setSelectedWilaya('Blida (البليدة)');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 3. Filters
  const [selectedWilaya, setSelectedWilaya] = useState<string>('Blida (البليدة)');
  const [selectedStoreCategory, setSelectedStoreCategory] = useState<string>('Healthy Bakeries');

  // 3.5 Authentication & User Account
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => {
    const saved = localStorage.getItem('smop_current_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return null;
  });

  const signUp = (userData: {
    fullName: string;
    email: string;
    phone?: string;
    wilaya?: string;
    age: number;
    height: number;
    weight: number;
    symptoms: string;
    pcosStatus?: 'diagnosed' | 'suspected' | 'seeking_wellness' | 'support';
    password?: string;
  }) => {
    const newUser: AuthUser = {
      id: 'usr_' + Date.now(),
      fullName: userData.fullName,
      email: userData.email.toLowerCase().trim(),
      phone: userData.phone,
      wilaya: userData.wilaya || 'Blida (البليدة)',
      age: userData.age,
      height: userData.height,
      weight: userData.weight,
      symptoms: userData.symptoms,
      pcosStatus: userData.pcosStatus || 'diagnosed',
      joinedDate: new Date().toISOString().split('T')[0]
    };

    // Save active session
    setCurrentUser(newUser);
    localStorage.setItem('smop_current_user', JSON.stringify(newUser));

    // Save to registered list
    try {
      const existingRaw = localStorage.getItem('smop_registered_users');
      const existing = existingRaw ? JSON.parse(existingRaw) : [];
      existing.push({ ...newUser, password: userData.password });
      localStorage.setItem('smop_registered_users', JSON.stringify(existing));
    } catch (e) {
      // ignore
    }

    // Sync with UserProfile
    const updatedProf: UserProfile = {
      id: 1,
      age: userData.age,
      height: userData.height,
      weight: userData.weight,
      symptoms: userData.symptoms
    };
    setUserProfile(updatedProf);
    localStorage.setItem('smop_user_profile', JSON.stringify(updatedProf));

    if (userData.wilaya) {
      setSelectedWilaya(userData.wilaya);
    }

    return { success: true };
  };

  const signIn = (email: string, _password?: string) => {
    const cleanEmail = email.toLowerCase().trim();
    try {
      const existingRaw = localStorage.getItem('smop_registered_users');
      const existing: (AuthUser & { password?: string })[] = existingRaw ? JSON.parse(existingRaw) : [];
      const found = existing.find(u => u.email.toLowerCase() === cleanEmail);
      if (found) {
        const { ...userObj } = found;
        setCurrentUser(userObj);
        localStorage.setItem('smop_current_user', JSON.stringify(userObj));
        // Sync profile
        setUserProfile({
          id: 1,
          age: userObj.age,
          height: userObj.height,
          weight: userObj.weight,
          symptoms: userObj.symptoms
        });
        if (userObj.wilaya) {
          setSelectedWilaya(userObj.wilaya);
        }
        return { success: true };
      }
    } catch (e) {
      // ignore
    }

    // If demo or new email directly login as guest demo account
    const demoUser: AuthUser = {
      id: 'usr_demo',
      fullName: cleanEmail.split('@')[0] || 'أختي الكريمة',
      email: cleanEmail,
      wilaya: 'Blida (البليدة)',
      age: userProfile.age,
      height: userProfile.height,
      weight: userProfile.weight,
      symptoms: userProfile.symptoms,
      pcosStatus: 'diagnosed',
      joinedDate: new Date().toISOString().split('T')[0]
    };
    setCurrentUser(demoUser);
    localStorage.setItem('smop_current_user', JSON.stringify(demoUser));
    return { success: true };
  };

  const signOut = () => {
    setCurrentUser(null);
    localStorage.removeItem('smop_current_user');
  };

  // 4. User Profile
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('smop_user_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return {
      id: 1,
      age: 26,
      height: 165,
      weight: 72,
      symptoms: 'Acne, Fatigue, Irregular Periods, Hair Loss'
    };
  });

  const updateProfile = (age: number, height: number, weight: number, symptoms: string) => {
    const updated: UserProfile = { id: 1, age, height, weight, symptoms };
    setUserProfile(updated);
    localStorage.setItem('smop_user_profile', JSON.stringify(updated));
  };

  // 5. Cycle Logs
  const [cycleLogs, setCycleLogs] = useState<CycleLog[]>(() => {
    const saved = localStorage.getItem('smop_cycle_logs');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return [
      { id: 1, dateString: '2026-05-18', category: 'Period (دورة شهرية)', notes: 'Regular flow, cramps (تدفق عادي، آلام)' },
      { id: 2, dateString: '2026-06-01', category: 'Ovulation (إباضة)', notes: 'High energy, water retention (طاقة عالية، احتباس ماء)' }
    ];
  });

  const addCycleLog = (dateString: string, category: string, notes: string) => {
    const newLog: CycleLog = {
      id: Date.now(),
      dateString,
      category,
      notes
    };
    const nextLogs = [newLog, ...cycleLogs];
    setCycleLogs(nextLogs);
    localStorage.setItem('smop_cycle_logs', JSON.stringify(nextLogs));
  };

  const deleteCycleLog = (id: number) => {
    const nextLogs = cycleLogs.filter(log => log.id !== id);
    setCycleLogs(nextLogs);
    localStorage.setItem('smop_cycle_logs', JSON.stringify(nextLogs));
  };

  // 6. Reminders
  const [reminders, setReminders] = useState<Reminder[]>(() => {
    const saved = localStorage.getItem('smop_reminders');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return [
      { id: 1, title: 'Magnesium Glycinate (مغنيسيوم جليسينات)', time: '08:30 AM', type: 'supplement' },
      { id: 2, title: 'Metformin (ميتفورمين)', time: '13:00 PM', type: 'medication' },
      { id: 3, title: 'Sarah Louna Diet Plan (استشارة التغذية سارة)', time: '16:00 PM', type: 'appointment', dateString: '2026-06-15' }
    ];
  });

  const addReminder = (title: string, time: string, type: string, dateString: string = '') => {
    const newReminder: Reminder = {
      id: Date.now(),
      title,
      time,
      type,
      dateString
    };
    const nextReminders = [...reminders, newReminder];
    setReminders(nextReminders);
    localStorage.setItem('smop_reminders', JSON.stringify(nextReminders));
  };

  const deleteReminder = (id: number) => {
    const nextReminders = reminders.filter(r => r.id !== id);
    setReminders(nextReminders);
    localStorage.setItem('smop_reminders', JSON.stringify(nextReminders));
  };

  // 7. Reservations
  const [reservations, setReservations] = useState<Reservation[]>(() => {
    const saved = localStorage.getItem('smop_reservations');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return [];
  });

  const addReservation = (
    cookId: string,
    cookBrandEn: string,
    cookBrandAr: string,
    customerName: string,
    customerPhone: string,
    itemsSummary: string,
    totalPriceDzd: number,
    reservationDate: string,
    reservationTime: string,
    notes: string = '',
    address?: string,
    paymentMethod?: string
  ) => {
    const newReservation: Reservation = {
      id: Date.now(),
      cookId,
      cookBrandEn,
      cookBrandAr,
      customerName,
      customerPhone,
      itemsSummary,
      totalPriceDzd,
      reservationDate,
      reservationTime,
      notes,
      address,
      paymentMethod,
      timestamp: Date.now()
    };
    const next = [newReservation, ...reservations];
    setReservations(next);
    localStorage.setItem('smop_reservations', JSON.stringify(next));
  };

  const cancelReservation = (id: number) => {
    const next = reservations.filter(r => r.id !== id);
    setReservations(next);
    localStorage.setItem('smop_reservations', JSON.stringify(next));
  };

  // 8. Specialist Chat
  const [activeChatSpecialist, setActiveChatSpecialist] = useState<Specialist | null>(null);
  const [allChatMessages, setAllChatMessages] = useState<Record<string, ChatMessage[]>>(() => {
    const saved = localStorage.getItem('smop_chat_messages');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return {};
  });

  const openChatWith = (specialist: Specialist | null) => {
    setActiveChatSpecialist(specialist);
    if (specialist) {
      setAllChatMessages(prev => {
        const specName = specialist.nameEn;
        if (!prev[specName] || prev[specName].length === 0) {
          const welcomeMessage: ChatMessage = {
            id: Date.now(),
            specialistName: specName,
            sender: 'specialist',
            text: language === 'AR'
              ? `مرحباً بكِ عزيزتي. أنا ${specialist.nameAr}، كيف يمكنني مساعدتك اليوم في إدارة أعراض هرموناتك؟`
              : `Hello dear! I am ${specialist.nameEn}, how can I support your PCOS hormone journey today?`,
            timestamp: Date.now()
          };
          const next = { ...prev, [specName]: [welcomeMessage] };
          localStorage.setItem('smop_chat_messages', JSON.stringify(next));
          return next;
        }
        return prev;
      });
    }
  };

  const currentSpecialistMessages = activeChatSpecialist
    ? allChatMessages[activeChatSpecialist.nameEn] || []
    : [];

  const sendChatMessage = (text: string) => {
    if (!activeChatSpecialist || !text.trim()) return;
    const specName = activeChatSpecialist.nameEn;
    const userMsg: ChatMessage = {
      id: Date.now(),
      specialistName: specName,
      sender: 'user',
      text: text.trim(),
      timestamp: Date.now()
    };

    setAllChatMessages(prev => {
      const list = [...(prev[specName] || []), userMsg];
      const next = { ...prev, [specName]: list };
      localStorage.setItem('smop_chat_messages', JSON.stringify(next));
      return next;
    });

    // Auto-reply after 1000ms delay to simulate responsive specialist feedback
    setTimeout(() => {
      const replyMsg: ChatMessage = {
        id: Date.now() + 1,
        specialistName: specName,
        sender: 'specialist',
        text: language === 'AR'
          ? "شكراً لرسالتكِ. لقد تلقيت استشارتك وسأقوم بمراجعة مؤشراتك المسجلة على لوحة التحكم والرد عليك بالتفصيل خلال دقائق!"
          : "Thank you for your message. I have received your query and will review your logged bio-metrics shortly to reply in detail!",
        timestamp: Date.now()
      };
      setAllChatMessages(prev => {
        const list = [...(prev[specName] || []), replyMsg];
        const next = { ...prev, [specName]: list };
        localStorage.setItem('smop_chat_messages', JSON.stringify(next));
        return next;
      });
    }, 1000);
  };

  // 9. Fitness Bundles & 3-Day Free Trial
  const [purchasedFitnessBundles, setPurchasedFitnessBundles] = useState<string[]>(() => {
    const saved = localStorage.getItem('smop_purchased_bundles');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return [];
  });

  const [fitnessTrials, setFitnessTrials] = useState<Record<string, number>>(() => {
    const saved = localStorage.getItem('smop_fitness_trials');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return {};
  });

  const startFitnessTrial = (bundleId: string) => {
    // 3 days free trial: 3 * 24 * 60 * 60 * 1000 ms
    const expiresAt = Date.now() + 3 * 24 * 60 * 60 * 1000;
    const next = { ...fitnessTrials, [bundleId]: expiresAt };
    setFitnessTrials(next);
    localStorage.setItem('smop_fitness_trials', JSON.stringify(next));

    // Schedule notification/reminder
    const today = new Date().toISOString().split('T')[0];
    addReminder(
      language === 'AR' ? 'تذكير: بدأ سريان تجربة باقة الرياضة المجانية (3 أيام)' : 'Reminder: 3-Day Fitness Trial active',
      '09:00 AM',
      'other',
      today
    );
  };

  const isTrialActive = (bundleId: string): boolean => {
    const expiry = fitnessTrials[bundleId];
    if (!expiry) return false;
    return Date.now() < expiry;
  };

  const getTrialDaysRemaining = (bundleId: string): number => {
    const expiry = fitnessTrials[bundleId];
    if (!expiry) return 0;
    const diff = expiry - Date.now();
    if (diff <= 0) return 0;
    return Math.ceil(diff / (24 * 60 * 60 * 1000));
  };

  const isBundleActive = (bundleId: string): boolean => {
    if (purchasedFitnessBundles.includes(bundleId)) return true;
    return isTrialActive(bundleId);
  };

  const purchaseFitnessBundle = (bundleId: string, extraVideos: number = 0) => {
    if (!purchasedFitnessBundles.includes(bundleId)) {
      const updated = [...purchasedFitnessBundles, bundleId];
      setPurchasedFitnessBundles(updated);
      localStorage.setItem('smop_purchased_bundles', JSON.stringify(updated));
    }
    if (extraVideos > 0) {
      localStorage.setItem(`smop_extra_videos_${bundleId}`, String(extraVideos));
    }
  };

  const getExtraVideosCount = (bundleId: string): number => {
    const val = localStorage.getItem(`smop_extra_videos_${bundleId}`);
    return val ? parseInt(val, 10) : 0;
  };

  // 10. QR Code Dialog
  const [qrDialogVisible, setQrDialogVisible] = useState<boolean>(false);

  // 11. Recipe Bundle State
  const [unlockedRecipeBundle, setUnlockedRecipeBundle] = useState<boolean>(() => {
    return localStorage.getItem('smop_unlocked_recipes') === 'true';
  });

  const unlockRecipeBundle = () => {
    setUnlockedRecipeBundle(true);
    localStorage.setItem('smop_unlocked_recipes', 'true');
  };

  // 12. Enrolled Programs State
  const [enrolledPrograms, setEnrolledPrograms] = useState<Record<string, { withFollowUp: boolean; date: string }>>(() => {
    const saved = localStorage.getItem('smop_enrolled_programs');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return {};
  });

  const enrollInProgram = (programId: string, withFollowUp: boolean) => {
    const today = new Date().toISOString().split('T')[0];
    const next = { ...enrolledPrograms, [programId]: { withFollowUp, date: today } };
    setEnrolledPrograms(next);
    localStorage.setItem('smop_enrolled_programs', JSON.stringify(next));

    // If follow-up requested, automatically add consultation reminder
    if (withFollowUp) {
      addReminder(
        language === 'AR' ? 'استشارة متابعة التغذية (د. سارة لونا)' : 'Dietary Follow-up (Dr. Sarah Louna)',
        '10:00 AM',
        'appointment',
        today
      );
    }
  };

  // 13. Active Payment State for BaridiMob & CIB
  const [activePaymentItem, setActivePaymentItem] = useState<PaymentItem | null>(null);

  const startPayment = (item: PaymentItem) => {
    setActivePaymentItem(item);
  };

  const closePayment = () => {
    setActivePaymentItem(null);
  };

  const completePayment = (method: PaymentMethod, txRef?: string) => {
    if (!activePaymentItem) return;

    if (activePaymentItem.type === 'recipe_pack') {
      unlockRecipeBundle();
    } else if (activePaymentItem.type === 'program_base') {
      enrollInProgram(activePaymentItem.id, false);
    } else if (activePaymentItem.type === 'program_followup') {
      enrollInProgram(activePaymentItem.id, true);
    } else if (activePaymentItem.type === 'fitness_bundle') {
      purchaseFitnessBundle(activePaymentItem.id);
    }

    setActivePaymentItem(null);
  };

  return (
    <PcosContext.Provider
      value={{
        language,
        toggleLanguage,
        currentScreen,
        navigateTo,
        selectedWilaya,
        setWilayaFilter: setSelectedWilaya,
        selectedStoreCategory,
        setStoreCategory: setSelectedStoreCategory,
        currentUser,
        isAuthenticated: !!currentUser,
        signUp,
        signIn,
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
        addReservation,
        cancelReservation,
        activeChatSpecialist,
        openChatWith,
        chatMessages: currentSpecialistMessages,
        sendChatMessage,
        fitnessBundles: staticFitnessBundles,
        purchasedFitnessBundles,
        purchaseFitnessBundle,
        fitnessTrials,
        startFitnessTrial,
        isTrialActive,
        getTrialDaysRemaining,
        isBundleActive,
        getExtraVideosCount,
        qrDialogVisible,
        setQrDialogVisible,
        articles: staticArticles,
        specialists: staticSpecialists,
        ecoStores: staticEcoStores,
        wellnessPrograms: staticPrograms,
        workouts: staticWorkouts,
        localGyms: staticGyms,
        homeCooks: staticCooks,
        wilayas: staticWilayas,
        recipes: pcosRecipesCatalog,
        unlockedRecipeBundle,
        unlockRecipeBundle,
        enrolledPrograms,
        enrollInProgram,
        activePaymentItem,
        startPayment,
        closePayment,
        completePayment,
        recipeBundleCount: RECIPE_BUNDLE_COUNT,
        recipeBundlePriceDzd: RECIPE_BUNDLE_PRICE_DZD,
        totalRecipesCount: TOTAL_RECIPES_COUNT
      }}
    >
      {children}
    </PcosContext.Provider>
  );
};

export const usePcos = () => {
  const context = useContext(PcosContext);
  if (!context) {
    throw new Error('usePcos must be used within a PcosProvider');
  }
  return context;
};
