import React from 'react';
import { FileText, Sparkles, Target, Zap } from 'lucide-react';
import type { ActionType } from '../utils/mockAi';

interface WelcomeScreenProps {
  onSelectAction: (action: ActionType) => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onSelectAction }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 w-full max-w-4xl mx-auto space-y-16 animate-fade-in mb-16 relative">
      {/* Background glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
      
      <div className="text-center space-y-6">
        <div className="mx-auto w-20 h-20 bg-gradient-to-tr from-blue-50 to-indigo-50/50 rounded-[1.5rem] rotate-3 flex items-center justify-center mb-10 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-white">
          <Sparkles className="w-10 h-10 text-blue-600 -rotate-3" />
        </div>
        <h2 className="text-5xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
          Elevate your resume <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">with precision AI</span>
        </h2>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed pt-2">
          Transform your experience into compelling achievements. Get instant suggestions, impactful phrasing, and ATS optimization natively.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full pt-4">
        <button 
          onClick={() => onSelectAction('Improve')}
          className="group flex flex-col items-start p-7 bg-white/70 backdrop-blur-md border border-slate-200/60 rounded-3xl shadow-[0_2px_15px_rgb(0,0,0,0.02)] hover:shadow-xl hover:shadow-blue-900/5 hover:-translate-y-1 hover:border-blue-200 transition-all duration-300 text-left"
        >
          <div className="p-3.5 bg-blue-50 text-blue-600 rounded-2xl mb-6 group-hover:scale-110 group-hover:bg-blue-100 transition-all duration-300">
            <FileText className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-800 text-[19px] mb-2">Improve Bullet</h3>
          <p className="text-slate-500 leading-relaxed text-[15.5px]">Refine a single achievement to be more concrete and actionable.</p>
        </button>

        <button 
          onClick={() => onSelectAction('Add impact')}
          className="group flex flex-col items-start p-7 bg-white/70 backdrop-blur-md border border-slate-200/60 rounded-3xl shadow-[0_2px_15px_rgb(0,0,0,0.02)] hover:shadow-xl hover:shadow-purple-900/5 hover:-translate-y-1 hover:border-purple-200 transition-all duration-300 text-left animate-slide-up"
          style={{ animationDelay: '100ms' }}
        >
          <div className="p-3.5 bg-purple-50 text-purple-600 rounded-2xl mb-6 group-hover:scale-110 group-hover:bg-purple-100 transition-all duration-300">
            <Zap className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-800 text-[19px] mb-2">Rewrite Section</h3>
          <p className="text-slate-500 leading-relaxed text-[15.5px]">Transform descriptions to emphasize results and career impact.</p>
        </button>

        <button 
          onClick={() => onSelectAction('ATS optimize')}
          className="group flex flex-col items-start p-7 bg-white/70 backdrop-blur-md border border-slate-200/60 rounded-3xl shadow-[0_2px_15px_rgb(0,0,0,0.02)] hover:shadow-xl hover:shadow-emerald-900/5 hover:-translate-y-1 hover:border-emerald-200 transition-all duration-300 text-left animate-slide-up"
          style={{ animationDelay: '200ms' }}
        >
          <div className="p-3.5 bg-emerald-50 text-emerald-600 rounded-2xl mb-6 group-hover:scale-110 group-hover:bg-emerald-100 transition-all duration-300">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-800 text-[19px] mb-2">ATS Optimize</h3>
          <p className="text-slate-500 leading-relaxed text-[15.5px]">Infuse industry-standard keywords to pass tracking systems.</p>
        </button>
      </div>
    </div>
  );
};
