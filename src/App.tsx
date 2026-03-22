import { useState } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { ChatInterface } from './components/ChatInterface';
import type { Role, ActionType } from './utils/mockAi';

export type ViewState = 'welcome' | 'chat';

function App() {
  const [view, setViewState] = useState<ViewState>('welcome');
  const [initialAction, setInitialAction] = useState<{ role: Role, action: ActionType, text?: string } | null>(null);

  const handleQuickAction = (action: ActionType) => {
    setInitialAction({ role: 'Frontend Developer', action, text: '' });
    setViewState('chat');
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#f8fafc] font-sans selection:bg-blue-200">
      <header className="w-full bg-white/70 backdrop-blur-xl border-b border-slate-200/50 py-3.5 px-6 sm:px-10 fixed top-0 z-30 flex items-center justify-between transition-all duration-300">
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => setViewState('welcome')}
        >
          <div className="bg-blue-600 p-2 rounded-xl group-hover:bg-blue-700 transition-colors shadow-sm shadow-blue-600/20">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 tracking-tight">
            Resume Copilot
          </h1>
        </div>
        <div className="text-[12px] font-bold tracking-widest text-slate-400 hidden sm:block uppercase">
          AI Assistant
        </div>
      </header>

      <main className="w-full max-w-4xl flex-1 flex flex-col pt-[72px] h-[100dvh]">
        {view === 'welcome' ? (
          <WelcomeScreen onSelectAction={handleQuickAction} />
        ) : (
          <ChatInterface initialAction={initialAction} />
        )}
      </main>
    </div>
  );
}

export default App;
