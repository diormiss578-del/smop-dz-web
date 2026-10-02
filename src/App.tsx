import React from 'react';
import { PcosProvider, usePcos } from './context/PcosContext';
import { PcosTopAppBar } from './components/PcosTopAppBar';
import { PcosBottomNav } from './components/PcosBottomNav';
import { SpecialistChatModal } from './components/SpecialistChatModal';
import { HomeScreen } from './components/screens/HomeScreen';
import { SpecialistsScreen } from './components/screens/SpecialistsScreen';
import { StoresScreen } from './components/screens/StoresScreen';
import { ProgramsScreen } from './components/screens/ProgramsScreen';
import { FitnessScreen } from './components/screens/FitnessScreen';
import { KitchensScreen } from './components/screens/KitchensScreen';
import { DashboardScreen } from './components/screens/DashboardScreen';
import { SignUpScreen } from './components/screens/SignUpScreen';

const MainAppContent: React.FC = () => {
  const { currentScreen } = usePcos();

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen />;
      case 'specialists':
        return <SpecialistsScreen />;
      case 'stores':
        return <StoresScreen />;
      case 'programs':
        return <ProgramsScreen />;
      case 'fitness':
        return <FitnessScreen />;
      case 'kitchens':
        return <KitchensScreen />;
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
