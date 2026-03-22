import React, { useState, useRef, useEffect } from 'react';
import { Send, Building2, Wand2, AlertCircle } from 'lucide-react';
import { MessageBubble } from './MessageBubble';
import type { MessageProps } from './MessageBubble';
import { mockAi } from '../utils/mockAi';
import type { Role, ActionType } from '../utils/mockAi';

interface ChatInterfaceProps {
  initialAction: { role: Role, action: ActionType, text?: string } | null;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ initialAction }) => {
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [input, setInput] = useState(initialAction?.text || '');
  const [role, setRole] = useState<Role>(initialAction?.role || 'Frontend Developer');
  const [action, setAction] = useState<ActionType>(initialAction?.action || 'Improve');
  const [isTyping, setIsTyping] = useState(false);
  const [inputError, setInputError] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSend = async () => {
    if (isTyping) return;
    if (!input.trim()) {
      setInputError(true);
      return;
    }
    setInputError(false);

    const userText = input.trim();
    const newMsgId = Date.now().toString();
    
    const userMsg: MessageProps = { id: newMsgId, role: 'user', content: userText };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const botMsgId = (Date.now() + 1).toString();
    setMessages((prev) => [...prev, { id: botMsgId, role: 'assistant', isLoading: true }]);

    try {
      const response = await mockAi(userText, role, action);
      
      setMessages((prev) => prev.map(msg => 
        msg.id === botMsgId 
          ? { id: botMsgId, role: 'assistant', isLoading: false, parsedResponse: response } 
          : msg
      ));
    } catch (error) {
      setMessages((prev) => prev.map(msg => 
        msg.id === botMsgId 
          ? { id: botMsgId, role: 'assistant', isLoading: false, isError: true } 
          : msg
      ));
    } finally {
      setIsTyping(false);
      setTimeout(() => {
        if (inputRef.current) inputRef.current.focus();
      }, 100);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const roles: Role[] = ['Frontend Developer', 'Backend Developer', 'Product Manager'];
  const actions: ActionType[] = ['Improve', 'Make concise', 'Add impact', 'ATS optimize'];

  const adjustTextareaHeight = (element: HTMLTextAreaElement) => {
    element.style.height = 'auto';
    element.style.height = `${Math.min(element.scrollHeight, 150)}px`;
  };

  return (
    <div className="flex flex-col h-full relative animate-fade-in w-full max-w-4xl mx-auto">
      <div className="flex-1 overflow-y-auto w-full pt-8 pb-56 px-2 sm:px-6 custom-scrollbar relative z-0">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 mt-16 opacity-80 animate-slide-up">
             <div className="text-blue-500 mb-6 bg-white p-5 rounded-2xl shadow-sm border border-slate-100/50">
               <Wand2 className="w-10 h-10" />
             </div>
             <p className="text-slate-600 font-semibold text-lg tracking-wide">Paste your content to begin</p>
             <div className="flex gap-3 mt-8 flex-wrap justify-center">
               {['"Managed a team of 5 engineers"', '"Built the main user dashboard"', '"Increased total sales by 20%"'].map(chip => (
                 <button 
                  key={chip}
                  onClick={() => setInput(chip.replace(/"/g, ''))}
                  className="text-[13px] bg-white text-slate-500 hover:text-blue-700 hover:bg-blue-50/50 px-5 py-2.5 rounded-full border border-slate-200/80 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                 >
                   {chip}
                 </button>
               ))}
             </div>
          </div>
        ) : (
          messages.map((msg) => (
            <MessageBubble key={msg.id} {...msg} />
          ))
        )}
        <div ref={messagesEndRef} className="h-6" />
      </div>

      <div className="absolute bottom-0 w-full px-4 sm:px-6 pb-8 pt-24 bg-gradient-to-t from-[#f8fafc] via-[#f8fafc]/95 to-transparent z-10">
        <div className="w-full bg-white/95 backdrop-blur-xl rounded-[1.75rem] shadow-[0_8px_40px_rgb(0,0,0,0.06)] border border-slate-200/80 overflow-hidden flex flex-col focus-within:ring-4 ring-blue-500/10 focus-within:border-blue-300 transition-all">
          <div className="flex items-center gap-4 bg-slate-50/80 border-b border-slate-100 p-3 px-5 overflow-x-auto no-scrollbar">
            
            <div className="flex items-center gap-2 flex-shrink-0">
              <Building2 className="w-4 h-4 text-slate-400 hidden sm:block" />
              <select 
                value={role} 
                onChange={(e) => setRole(e.target.value as Role)}
                className="text-sm bg-transparent font-bold text-slate-700 outline-none cursor-pointer hover:bg-slate-200/50 py-1.5 px-3 rounded-lg transition-colors border border-transparent hover:border-slate-200 appearance-none pr-8 custom-select"
                style={{ backgroundImage: "url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2364748b%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.4-12.8z%22%2F%3E%3C%2Fsvg%3E')", backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.65rem center', backgroundSize: '0.65em auto' }}
              >
                {roles.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>

            <div className="w-px h-5 bg-slate-200 hidden sm:block flex-shrink-0"></div>
            
            <div className="flex gap-2 flex-nowrap overflow-x-auto no-scrollbar flex-1 pb-1 sm:pb-0 pt-1 sm:pt-0">
              {actions.map(a => (
                <button
                  key={a}
                  onClick={() => setAction(a)}
                  className={`text-[12.5px] px-4 py-1.5 rounded-full font-bold whitespace-nowrap transition-all flex-shrink-0 ${action === a ? 'bg-blue-600 text-white shadow-sm' : 'bg-transparent text-slate-500 hover:bg-slate-100 hover:text-slate-800 border border-transparent hover:border-slate-200'}`}
                >
                  {a}
                </button>
              ))}
            </div>
            
          </div>
          
          <div className="relative flex items-end p-3 px-4 py-4">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                if (e.target.value.trim()) setInputError(false);
                adjustTextareaHeight(e.target);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Paste your bullet point, paragraph, or phrase here... (Press Enter to send)"
              disabled={isTyping}
              className={`w-full bg-transparent resize-none px-2 py-1 outline-none text-slate-800 placeholder:text-slate-400 font-medium leading-relaxed text-[15.5px] min-h-[44px] ${isTyping ? 'opacity-50 cursor-not-allowed' : ''}`}
              rows={1}
            />
            
            <button
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className={`p-3 rounded-2xl ml-3 mb-0.5 transition-all flex items-center justify-center flex-shrink-0
                ${!input.trim() || isTyping 
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                  : 'bg-blue-600 text-white shadow-lg shadow-blue-500/25 hover:bg-blue-700 hover:scale-105 active:scale-95'}`}
            >
              <Send className="w-5 h-5 -ml-0.5 mt-0.5" />
            </button>
          </div>
          {inputError && (
            <div className="px-5 py-2.5 text-[13px] text-red-600 font-medium bg-red-50/80 border-t border-red-100 animate-fade-in flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4" /> Please enter resume content.
            </div>
          )}
        </div>
        <div className="text-center mt-4 text-[11.5px] text-slate-400 font-medium tracking-wide">
          Resume Copilot is powered by AI. Double-check important metrics before updating your resume.
        </div>
      </div>
    </div>
  );
};
