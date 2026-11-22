import React from 'react';
import { PcosProvider, usePcos } from './context/PcosContext';
import { PcosTopAppBar } from './components/PcosTopAppBar';
import { PcosBottomNav } from './components/PcosBottomNav';
import { SpecialistChatModal } from './components/SpecialistChatModal';
import { QrCodeModal } from './components/QrCodeModal';
import { PaymentModal } from './components/PaymentModal';
import { HomeScreen } from './components/screens/HomeScreen';
import { SpecialistsScreen } from './components/screens/SpecialistsScreen';
import { NutritionScreen } from './components/screens/NutritionScreen';
import { FitnessScreen } from './components/screens/FitnessScreen';
import { DashboardScreen } from './components/screens/DashboardScreen';
import { SignUpScreen } from './components/screens/SignUpScreen';
import { SportsProgramsScreen } from './components/screens/SportsProgramsScreen';

const MainAppContent: React.FC = () => {
  const { currentScreen } = usePcos();

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen />;
      case 'specialists':
        return <SpecialistsScreen />;
      case 'nutrition':
      case 'stores':
      case 'programs':
      case 'healthy-recipes':
      case 'kitchens':
        return <NutritionScreen />;
      case 'sports-programs':
        return <SportsProgramsScreen />;
      case 'fitness':
        return <FitnessScreen />;
      case 'dashboard':
        return <DashboardScreen />;
      case 'signup':
        return <SignUpScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FCF8F9] text-[#1E293B] flex flex-col font-sans">
      <PcosTopAppBar />

      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6">
        {renderScreen()}
      </main>

      <PcosBottomNav />
      <SpecialistChatModal />
      <QrCodeModal />
      <PaymentModal />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <PcosProvider>
      <MainAppContent />
    </PcosProvider>
  );
};

export default App;
