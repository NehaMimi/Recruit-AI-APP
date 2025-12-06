import React from 'react';
import { Users, FileText, Search, TrendingUp, Activity } from 'lucide-react';

interface ProcessingScreenProps {
  progress: number;
  log: string;
}

const ProcessingScreen: React.FC<ProcessingScreenProps> = ({ progress, log }) => {
  return (
    <div className="flex-grow flex items-center justify-center p-6 bg-slate-50/50 backdrop-blur-sm">
      <div className="w-full max-w-2xl text-center">
        
        {/* Animated Icon Container */}
        <div className="relative mb-10 inline-block">
           {/* Ripple Effects */}
          <div className="absolute inset-0 bg-indigo-500 rounded-full animate-ping opacity-20"></div>
          <div className="absolute -inset-4 bg-indigo-500 rounded-full animate-pulse opacity-10"></div>
          
          <div className="relative bg-white p-6 rounded-full shadow-xl border border-indigo-50">
            <Activity className="h-16 w-16 text-indigo-600 animate-pulse" />
          </div>
        </div>

        <h2 className="text-3xl font-extrabold text-slate-900 mb-3 animate-fade-in">
          AI Agent Working
        </h2>
        <p className="text-slate-500 mb-10 h-6 font-medium animate-pulse">{log}</p>

        {/* Progress Bar */}
        <div className="relative pt-1 max-w-lg mx-auto mb-12">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-bold inline-block py-1 px-3 uppercase rounded-full text-indigo-600 bg-indigo-100">
                Processing
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold inline-block text-indigo-600">
                {progress}%
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-3 mb-4 text-xs flex rounded-full bg-slate-200">
            <div 
              style={{ width: `${progress}%` }} 
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-600 transition-all duration-500 ease-out rounded-full"
            ></div>
          </div>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto">
          <StepCard 
            icon={<FileText className="h-5 w-5" />}
            label="Extraction"
            active={progress > 10}
            completed={progress > 40}
          />
          <StepCard 
            icon={<Search className="h-5 w-5" />}
            label="Analysis"
            active={progress > 40}
            completed={progress > 80}
          />
          <StepCard 
            icon={<TrendingUp className="h-5 w-5" />}
            label="Ranking"
            active={progress > 80}
            completed={progress === 100}
          />
        </div>

      </div>
    </div>
  );
};

const StepCard = ({ icon, label, active, completed }: { icon: any, label: string, active: boolean, completed: boolean }) => {
  let baseClass = "p-5 rounded-2xl border transition-all duration-300 flex flex-col items-center justify-center gap-3";
  let statusClass = "bg-white border-slate-100 text-slate-400"; // Default
  
  if (completed) {
    statusClass = "bg-green-50 border-green-200 text-green-700 shadow-sm";
  } else if (active) {
    statusClass = "bg-white border-indigo-200 text-indigo-600 shadow-md scale-105 ring-2 ring-indigo-50";
  }

  return (
    <div className={`${baseClass} ${statusClass}`}>
      <div className={`p-2 rounded-full ${completed ? 'bg-green-200 text-green-700' : (active ? 'bg-indigo-100' : 'bg-slate-100')}`}>
        {icon}
      </div>
      <span className="text-xs font-bold tracking-wide uppercase">{label}</span>
    </div>
  );
};

export default ProcessingScreen;