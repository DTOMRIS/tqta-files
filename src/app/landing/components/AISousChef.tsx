'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Loader2, Sparkles, Phone, ExternalLink } from 'lucide-react';

// Hızlı Sorular
const QUICK_QUESTIONS = [
  { text: '🎓 CTH nədir?', query: 'CTH sertifikatı nədir?' },
  { text: '💚 Pulsuz kurslar', query: 'DMA pulsuz proqramlar haqqında məlumat ver' },
  { text: '👨‍🍳 Aşpaz kursu', query: 'Aşpaz kursları haqqında məlumat ver' },
  { text: '☕ Barista kursu', query: 'Barista kursu qiymət və müddət' },
  { text: '🌍 Xaricdə iş', query: 'CTH sertifikatı ilə harada işləyə bilərəm?' },
  { text: '📝 Qeydiyyat', query: 'Necə qeydiyyatdan keçə bilərəm?' },
];

type Message = { id: string; role: 'user' | 'assistant'; content: string };

export default function AISousChef() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Salam! 👋 Mən TQTA Bələdçisiyəm. Proqramlar, qəbul, qiymətlər və sertifikatlarla bağlı suallara cavab verə bilərəm. Necə kömək edə bilərəm?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  // Quick question handler
  const handleQuickQuestion = (query: string) => {
    setInput(query);
    setTimeout(() => {
      handleSubmit(query);
    }, 100);
  };

  // Submit handler - manual fetch
  const handleSubmit = async (queryOverride?: string) => {
    const text = (queryOverride || input).trim();
    if (!text || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(m => ({
            role: m.role,
            content: m.content
          }))
        })
      });

      if (!response.ok) throw new Error('API error');

      // Handle streaming response
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantContent = '';
      const assistantId = `assistant-${Date.now()}`;

      // Add empty assistant message
      setMessages(prev => [...prev, { id: assistantId, role: 'assistant', content: '' }]);

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          const chunk = decoder.decode(value);
          // Parse SSE data
          const lines = chunk.split('\n');
          for (const line of lines) {
            if (line.startsWith('0:')) {
              try {
                const text = JSON.parse(line.slice(2));
                assistantContent += text;
                setMessages(prev => 
                  prev.map(m => 
                    m.id === assistantId ? { ...m, content: assistantContent } : m
                  )
                );
              } catch {}
            }
          }
        }
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: 'Bağışlayın, texniki xəta baş verdi. Zəhmət olmasa WhatsApp-dan yazın: +994 51 769 61 81'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(true)}
        className={`fixed bottom-6 right-6 z-[60] w-16 h-16 rounded-full bg-gradient-to-r from-[#C5A022] to-[#d4b82e] text-white shadow-2xl hover:shadow-amber-500/40 transition-all flex items-center justify-center group ${open ? 'scale-0' : 'scale-100'}`}
        aria-label="TQTA Bələdçisi"
      >
        <div className="relative">
          <Bot className="w-7 h-7" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse"></span>
        </div>
        <div className="absolute -top-12 right-0 bg-[#0A192F] text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl">
          💬 Sualınız var? Kömək edə bilərəm!
        </div>
      </button>

      {/* Chat Panel */}
      {open && (
        <div className="fixed bottom-6 right-6 z-[70] w-[400px] max-w-[95vw] rounded-3xl overflow-hidden shadow-2xl border border-slate-200/50 bg-white animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#0A192F] to-[#1a365d] text-white px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#C5A022] rounded-xl flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-sm">TQTA Bələdçisi</div>
                <div className="text-xs text-slate-300 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  Aktiv
                </div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center transition-colors"
              aria-label="Bağla"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="h-[380px] overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-slate-50 to-white">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center ${
                  m.role === 'user' 
                    ? 'bg-[#C5A022] text-white' 
                    : 'bg-[#0A192F] text-white'
                }`}>
                  {m.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                </div>
                <div
                  className={`text-sm p-4 rounded-2xl max-w-[80%] ${
                    m.role === 'user'
                      ? 'bg-[#C5A022] text-white rounded-tr-none'
                      : 'bg-white text-slate-700 shadow-md border border-slate-100 rounded-tl-none'
                  }`}
                >
                  <div className="whitespace-pre-wrap">{m.content}</div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#0A192F] text-white flex-shrink-0 flex items-center justify-center">
                  <Bot size={16} />
                </div>
                <div className="bg-white text-slate-700 shadow-md border border-slate-100 rounded-2xl rounded-tl-none p-4">
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Cavab hazırlanır...
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          {messages.length <= 2 && (
            <div className="px-4 pb-2">
              <div className="text-xs text-slate-400 mb-2 flex items-center gap-1">
                <Sparkles size={12} />
                Populyar suallar
              </div>
              <div className="flex flex-wrap gap-2">
                {QUICK_QUESTIONS.slice(0, 4).map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleQuickQuestion(q.query)}
                    className="text-xs px-3 py-1.5 bg-slate-100 hover:bg-[#C5A022] hover:text-white rounded-full transition-colors"
                  >
                    {q.text}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="bg-white p-4 border-t border-slate-100">
            <form id="chat-form" onSubmit={handleFormSubmit} className="flex gap-2">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Sualınızı yazın..."
                className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#C5A022]/30 focus:border-[#C5A022] text-sm transition-all"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#0A192F] to-[#1a365d] text-white hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-all"
                aria-label="Göndər"
              >
                {isLoading ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Send size={18} />
                )}
              </button>
            </form>

            {/* Contact Link */}
            <div className="mt-3 text-center">
              <a 
                href="https://wa.me/994517696181" 
                target="_blank"
                className="inline-flex items-center gap-2 text-xs text-slate-500 hover:text-[#25D366] transition-colors"
              >
                <Phone size={12} />
                Canlı dəstək: +994 51 769 61 81
                <ExternalLink size={10} />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
