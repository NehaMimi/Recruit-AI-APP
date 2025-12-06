import React from 'react';
import { Users, HelpCircle, Bell } from 'lucide-react';
import { AppScreen } from '../types';

interface HeaderProps {
  currentScreen: AppScreen;
  onNavigate: (screen: AppScreen) => void;
}

const Header: React.FC<HeaderProps> = ({ currentScreen, onNavigate }) => {
  const isLanding = currentScreen === 'landing';

  return (
    <header className={`sticky top-0 z-30 border-b transition-colors duration-200 ${isLanding ? 'bg-transparent border-transparent absolute w-full' : 'bg-white border-slate-200 shadow-sm'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
        {/* Logo */}
        <div 
          className="flex items-center space-x-2 cursor-pointer group"
          onClick={() => onNavigate('landing')}
        >
          <div className="bg-indigo-600 p-2 rounded-lg group-hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200">
            <Users className="text-white h-5 w-5" />
          </div>
          <h1 className={`text-xl font-bold tracking-tight ${isLanding ? 'text-slate-900' : 'text-slate-900'}`}>
            Recruit-AI
          </h1>
        </div>

        {/* Navigation */}
        <div className="flex items-center space-x-6">
          {!isLanding && (
            <>
              <button className="text-slate-500 hover:text-indigo-600 transition-colors">
                <HelpCircle className="h-5 w-5" />
              </button>
              <button className="text-slate-500 hover:text-indigo-600 transition-colors relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
              <div className="h-6 w-px bg-slate-200 mx-2"></div>
            </>
          )}
          
          <div className="flex items-center space-x-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-slate-900">Sarah Jenkins</p>
              <p className="text-xs text-slate-500">Talent Acquisition</p>
            </div>
            <div className="h-9 w-9 bg-indigo-100 rounded-full flex items-center justify-center border border-indigo-200 text-indigo-700 font-bold text-sm">
              SJ
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;