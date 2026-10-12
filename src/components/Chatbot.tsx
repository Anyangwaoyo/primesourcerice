import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { sendChatMessage } from '../services/api.ts';
import { ChatMessage } from '../types/index.ts';
import {
  X,
  Send,
  Minimize2,
  Phone,
  Wheat,
  Bot,
  Sparkles
} from 'lucide-react';

export const Chatbot: React.FC = () => {
  const { settings, setCurrentPage } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome',
      sender: 'assistant',
      text: 'Good day! 🌾 Welcome to PrimeSource Rice. I am PrimeSource Assistant. As we are currently in our startup MVP stage, I can answer your questions about our rice specifications, de-stoning process, cooking performance, packaging bag sizes, and delivery coverage across Nasarawa and Abuja. How can I assist you today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestions: [
        'Tell me about your 25kg & 50kg rice',
        'How is your rice de-stoned & cleaned?',
        'What makes PrimeSource Rice cook so well?',
        'Do you deliver to Abuja and Lafia?',
      ],
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || loading) return;

    const userMsg: ChatMessage = {
      id: `msg-user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const history = messages.map((m) => ({ sender: m.sender, text: m.text }));
      const response = await sendChatMessage(text, history);

      const botMsg: ChatMessage = {
        id: `msg-bot-${Date.now()}`,
        sender: 'assistant',
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err: any) {
      console.error('Chatbot error:', err);
      const fallbackMsg: ChatMessage = {
        id: `msg-err-${Date.now()}`,
        sender: 'assistant',
        text: `I'm having a brief connection delay. For immediate assistance with specifications, orders, or commercial supplies, please chat directly with our team on WhatsApp at ${settings?.whatsapp || '07030881613'}.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Bubble Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 left-6 z-40 bg-[#174D36] text-white p-2 sm:px-4 sm:py-2.5 rounded-full shadow-2xl hover:bg-[#0F3324] hover:scale-105 active:scale-95 transition-all flex items-center gap-3 cursor-pointer border-2 border-[#C69C48]"
          aria-label="Open PrimeSource Assistant Chatbot"
        >
          <div className="relative w-11 h-11 rounded-full border-2 border-[#C69C48] bg-[#FAF9F6] flex items-center justify-center shrink-0 shadow-xs text-[#174D36]">
            <Wheat className="w-6 h-6 stroke-[2.2] text-[#174D36]" />
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-white animate-pulse" />
          </div>
          <div className="hidden sm:flex flex-col text-left pr-1">
            <span className="font-bold text-xs text-white leading-tight">Ask PrimeSource AI</span>
            <span className="text-[10px] text-[#DFBA6D]">Product Assistant (MVP)</span>
          </div>
        </button>
      )}

      {/* Floating Chat Window */}
      {isOpen && (
        <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-50 w-[calc(100vw-2rem)] sm:w-96 max-h-[85vh] h-[530px] bg-white rounded-3xl shadow-2xl border border-[#EAE6DD] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="bg-[#174D36] text-white px-5 py-3.5 flex items-center justify-between border-b border-[#226B4C]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border-2 border-[#C69C48] bg-[#FAF9F6] flex items-center justify-center shrink-0 shadow-xs text-[#174D36]">
                <Wheat className="w-5 h-5 stroke-[2.2] text-[#174D36]" />
              </div>
              <div>
                <h3 className="font-bold text-xs text-white flex items-center gap-1.5">
                  PrimeSource Assistant
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                </h3>
                <p className="text-[10px] text-[#D5D0C3]">Product & Milling Guide (MVP Stage)</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-md text-white/80 hover:text-white hover:bg-white/10 cursor-pointer"
                title="Minimize chat"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-md text-white/80 hover:text-white hover:bg-white/10 cursor-pointer"
                title="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#FAF9F6] text-xs">
            {messages.map((m) => {
              const isUser = m.sender === 'user';
              return (
                <div
                  key={m.id}
                  className={`flex ${isUser ? 'justify-end' : 'justify-start items-end gap-2'}`}
                >
                  {!isUser && (
                    <div className="w-6 h-6 rounded-full border border-[#C69C48] shrink-0 mb-4 bg-[#174D36] text-[#C69C48] flex items-center justify-center shadow-2xs">
                      <Wheat className="w-3.5 h-3.5" />
                    </div>
                  )}
                  <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-[85%]`}>
                    <div
                      className={`rounded-2xl px-3.5 py-2.5 shadow-2xs leading-relaxed whitespace-pre-wrap ${
                        isUser
                          ? 'bg-[#174D36] text-white rounded-tr-xs'
                          : 'bg-white text-[#242A26] border border-[#EAE6DD] rounded-tl-xs'
                      }`}
                    >
                      {m.text}
                    </div>
                    <span className="text-[9px] text-[#8C948E] px-1 mt-0.5">{m.timestamp}</span>

                    {/* Suggestions pills if present */}
                    {m.suggestions && (
                      <div className="flex flex-wrap gap-1.5 mt-2.5 max-w-[98%]">
                        {m.suggestions.map((s, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleSendMessage(s)}
                            className="text-[11px] px-2.5 py-1 bg-white hover:bg-[#F3EFE6] text-[#174D36] font-medium border border-[#E2DFD8] rounded-md transition-colors text-left cursor-pointer shadow-2xs"
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {loading && (
              <div className="flex items-center gap-2 text-xs text-[#6B726A] bg-white border border-[#EAE6DD] rounded-xl px-3 py-2 w-max shadow-2xs">
                <div className="w-5 h-5 rounded-full border border-[#C69C48] shrink-0 bg-[#174D36] text-[#C69C48] flex items-center justify-center">
                  <Wheat className="w-3 h-3" />
                </div>
                <span>PrimeSource Assistant is checking product specifications...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick External Actions Bar */}
          <div className="px-3 py-1.5 bg-[#F3EFE6] border-t border-[#EAE6DD] flex items-center justify-between text-[11px]">
            <button
              onClick={() => {
                setCurrentPage('shop');
                setIsOpen(false);
              }}
              className="text-[#174D36] font-semibold hover:underline cursor-pointer"
            >
              Shop Rice Catalogue →
            </button>
            <a
              href={`https://wa.me/${(settings?.whatsapp || '07030881613').replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noreferrer"
              className="text-[#128C7E] font-semibold flex items-center gap-1 hover:underline"
            >
              <Phone className="w-3 h-3" />
              <span>Commercial WhatsApp</span>
            </a>
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-white border-t border-[#EAE6DD] flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about grain quality, bag sizes, Abuja delivery..."
              className="flex-1 px-3 py-2 text-xs bg-[#FAF9F6] border border-[#E2DFD8] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#174D36] text-[#242A26]"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={loading || !input.trim()}
              className="p-2 rounded-xl bg-[#174D36] hover:bg-[#0F3324] text-white disabled:opacity-40 transition-colors cursor-pointer shrink-0 shadow-xs"
              aria-label="Send Message"
            >
              <Send className="w-4 h-4 text-[#C69C48]" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
