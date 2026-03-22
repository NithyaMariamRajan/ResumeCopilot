import React, { useState } from 'react';
import { User, Sparkles, Check, Copy, AlertCircle, Loader2 } from 'lucide-react';
import type { AIResponse } from '../utils/mockAi';

export type MessageRole = 'user' | 'assistant';

export interface MessageProps {
  id: string;
  role: MessageRole;
  content?: string;
  parsedResponse?: AIResponse | null;
  isLoading?: boolean;
  isError?: boolean;
}

export const MessageBubble: React.FC<MessageProps> = ({ role, content, parsedResponse, isLoading, isError }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isUser = role === 'user';

  return (
    <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} mb-8 mt-4 px-2 sm:px-4`}>
     {isUser ? (
        // User Message
        <div className="flex max-w-[85%] sm:max-w-[75%] flex-row-reverse gap-4">
          <div className="flex-shrink-0 mt-2">
            <div className="w-9 h-9 rounded-full bg-slate-900 flex items-center justify-center shadow-lg text-white font-bold">
              <User className="w-4 h-4" />
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="text-[12px] font-bold text-slate-400 px-1 tracking-widest uppercase">You</div>
            <div className="relative px-6 py-4 rounded-3xl rounded-tr-sm bg-slate-100/80 text-slate-800 border border-slate-200/50 shadow-sm">
              <p className="text-[15.5px] font-medium whitespace-pre-wrap leading-relaxed">{content}</p>
            </div>
          </div>
        </div>
      ) : (
        // Assistant Message
        <div className="flex w-full max-w-full sm:max-w-[95%] flex-row gap-4">
          <div className="flex-shrink-0 mt-2">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-md shadow-blue-500/20 text-white">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          
          <div className="flex flex-col items-start gap-2 w-full min-w-0">
            <div className="text-[12px] font-bold text-slate-400 px-1 tracking-widest uppercase">Copilot</div>
            
            <div className="relative p-7 sm:p-9 w-full rounded-3xl rounded-tl-sm bg-white border border-slate-200/70 shadow-[0_4px_25px_rgb(0,0,0,0.02)] transition-all">
              
              {isLoading && (
                <div className="flex items-center gap-3 text-blue-600 py-3 px-2 w-fit">
                  <Loader2 className="w-5 h-5 animate-spin text-blue-500" />
                  <span className="text-[16px] font-semibold tracking-wide">Improving your resume...</span>
                </div>
              )}

              {isError && (
                <div className="flex items-center gap-2.5 text-red-600 bg-red-50/50 p-4 rounded-2xl border border-red-100/80 shadow-sm w-fit mt-1">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                  <span className="text-[15.5px] font-medium tracking-wide">Something went wrong. Please try again.</span>
                </div>
              )}

              {!isLoading && !isError && parsedResponse && (
                <div className="space-y-8 text-[15px] w-full animate-fade-in">
                  
                  {/* Improved Version */}
                  <div className="space-y-3.5 group">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-slate-900 flex items-center gap-2.5 text-[13px] uppercase tracking-widest">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></span>
                        Top Recommendation
                      </h4>
                      <button 
                        onClick={() => handleCopy(parsedResponse.improved)}
                        className="text-slate-500 hover:text-blue-700 hover:bg-blue-50 focus:text-blue-700 transition-all p-2 rounded-xl opacity-0 group-hover:opacity-100 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider"
                        title="Copy text"
                      >
                        {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                        <span className="hidden sm:inline-block">{copied ? 'Copied!' : 'Copy'}</span>
                      </button>
                    </div>
                    <div className="bg-[#f8fafc] p-6 rounded-2xl border border-slate-200 text-slate-800 leading-relaxed font-semibold text-[16px] shadow-sm">
                      {parsedResponse.improved}
                    </div>
                  </div>

                  {/* Variations grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-3">
                    <div className="space-y-3">
                       <h4 className="font-bold text-slate-400 text-[11.5px] uppercase tracking-widest px-1">Variant 1 • Concise</h4>
                       <div className="bg-white hover:bg-slate-50 transition-colors p-5 rounded-2xl border border-slate-200/80 shadow-sm text-slate-600 font-medium text-[15px] leading-relaxed h-full">
                         {parsedResponse.variation1}
                       </div>
                    </div>
                    <div className="space-y-3">
                       <h4 className="font-bold text-slate-400 text-[11.5px] uppercase tracking-widest px-1">Variant 2 • Impact</h4>
                       <div className="bg-white hover:bg-slate-50 transition-colors p-5 rounded-2xl border border-slate-200/80 shadow-sm text-slate-600 font-medium text-[15px] leading-relaxed h-full">
                         {parsedResponse.variation2}
                       </div>
                    </div>
                  </div>

                  {/* Suggestions list */}
                  {parsedResponse.suggestions && parsedResponse.suggestions.length > 0 && (
                    <div className="pt-8 border-t border-slate-100 mt-8 space-y-5">
                      <h4 className="font-bold text-slate-800 text-[12px] uppercase tracking-widest flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-blue-500" />
                        Strategic Advice
                      </h4>
                      <div className="space-y-4 px-1">
                        {parsedResponse.suggestions.map((suggestion, idx) => (
                          <div key={idx} className="flex gap-4 text-[15.5px] font-medium text-slate-600 items-start hover:bg-slate-50 p-3 -ml-3 rounded-xl transition-colors">
                            <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 border border-blue-100 mt-0.5">
                               <span className="text-[11px] font-bold">{idx + 1}</span>
                            </div>
                            <span className="leading-relaxed pt-px">{suggestion}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
