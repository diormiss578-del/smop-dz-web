import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Stethoscope, ShieldCheck } from 'lucide-react';
import { usePcos } from '../context/PcosContext';

export const SpecialistChatModal: React.FC = () => {
  const { language, activeChatSpecialist, openChatWith, chatMessages, sendChatMessage } = usePcos();
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isAr = language === 'AR';

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  if (!activeChatSpecialist) return null;

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputText.trim()) return;
    sendChatMessage(inputText);
    setInputText('');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={() => openChatWith(null)}
    >
      <div
        className="bg-[#FCF8F9] rounded-3xl max-w-lg w-full h-[85vh] max-h-[620px] flex flex-col shadow-2xl border border-[#E2E8F0] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        data-testid="specialist-chat-modal"
      >
        {/* Header */}
        <div className="bg-white border-b border-[#E2E8F0] px-4 py-3 flex items-center justify-between shrink-0 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={activeChatSpecialist.avatarUrl}
                alt={activeChatSpecialist.nameEn}
                className="w-11 h-11 rounded-full object-cover border-2 border-[#FFCEE3]"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-sm text-[#1E293B]">
                  {isAr ? activeChatSpecialist.nameAr : activeChatSpecialist.nameEn}
                </h3>
                <ShieldCheck className="w-4 h-4 text-[#D81B60]" />
              </div>
              <p className="text-[11px] text-[#64748B]">
                {isAr ? activeChatSpecialist.titleAr : activeChatSpecialist.titleEn}
              </p>
            </div>
          </div>

          <button
            onClick={() => openChatWith(null)}
            className="w-8 h-8 rounded-full bg-[#FCF8F9] hover:bg-[#FFCEE3]/50 text-[#64748B] flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Disclaimer banner */}
        <div className="bg-[#DDFFBB]/40 border-b border-[#DDFFBB] px-4 py-1.5 flex items-center gap-2 text-[11px] text-[#1E293B]">
          <Stethoscope className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
          <span>
            {isAr
              ? 'استشارة سرية مخصصة وموجهة لمتلازمة تكيس المبايض وفق المعايير الطبية المعتمدة.'
              : 'Confidential clinical guidance tailored for PCOS hormonal recovery.'}
          </span>
        </div>

        {/* Messages List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {chatMessages.map((msg) => {
            const isUser = msg.sender === 'user';
            const timeStr = new Date(msg.timestamp).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit'
            });

            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[82%] px-4 py-2.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-xs ${
                    isUser
                      ? 'bg-[#D81B60] text-white rounded-br-xs'
                      : 'bg-white text-[#1E293B] border border-[#E2E8F0] rounded-bl-xs'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                </div>
                <span className="text-[10px] text-[#64748B] mt-1 px-1">
                  {timeStr}
                </span>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <form
          onSubmit={handleSend}
          className="bg-white border-t border-[#E2E8F0] p-3 flex items-center gap-2 shrink-0"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={
              isAr
                ? 'اكتبي رسالتكِ أو استشارتكِ هنا...'
                : 'Type your message or symptom inquiry here...'
            }
            className="flex-1 bg-[#FCF8F9] border border-[#E2E8F0] focus:border-[#D81B60] focus:ring-1 focus:ring-[#D81B60] rounded-2xl px-4 py-2 text-xs sm:text-sm text-[#1E293B] outline-none transition-all"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="w-10 h-10 rounded-2xl bg-[#D81B60] hover:bg-[#C2185B] disabled:opacity-40 text-white flex items-center justify-center transition-all shadow-xs shrink-0"
          >
            <Send className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
          </button>
        </form>
      </div>
    </div>
  );
};
