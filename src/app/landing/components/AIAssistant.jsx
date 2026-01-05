'use client';

import { useState, useRef, useEffect } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useChat } from '@ai-sdk/react';
import { MessageSquare, X, Send, Loader2, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef(null);
  
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/ai/chat',
    initialMessages: [
      {
        id: 'welcome',
        role: 'assistant',
        content: 'Salam! Mən "Beledçiniz"əm - TQTA-nın rəhbəriniz. Hangi təhsil proqramı sizə uyğundur, birlikdə baxaq? 🌟'
      }
    ],
    onError: (error) => {
      console.error('AI Chat error:', error);
      toast.error('Xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.');
    }
  });

  // Auto scroll to bottom when new message arrives
  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    handleSubmit(e);
  };

  return (
    <>
      {/* Bubble Button (Kapalı durum) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 shadow-lg hover:shadow-2xl hover:shadow-amber-500/50 hover:scale-110 transition-all duration-300 flex items-center justify-center group animate-pulse"
          aria-label="Beledçiniz - AI Assistant"
        >
          <MessageSquare className="h-7 w-7 text-white" />
          
          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-3 hidden group-hover:block animate-in fade-in-0 zoom-in-95 duration-200">
            <div className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap shadow-xl relative">
              Sizə kömək etmək üçün buradayam! 👋
              <div className="absolute top-full right-4 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-slate-900"></div>
            </div>
          </div>

          {/* Notification Badge */}
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
            <Sparkles className="h-3 w-3 text-white" />
          </div>
        </button>
      )}

      {/* Chat Sheet (Açık durum) */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="right" className="w-full sm:max-w-md p-0 flex flex-col h-full">
          {/* Header */}
          <SheetHeader className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 text-white p-4 border-b border-amber-600">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <div>
                  <SheetTitle className="text-white text-lg font-semibold">Beledçiniz 🧭</SheetTitle>
                  <p className="text-xs text-amber-100">Sizə kömək etmək üçün buradayam</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </SheetHeader>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in-0 slide-in-from-bottom-2 duration-300`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl p-4 shadow-sm ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-br from-amber-500 to-amber-600 text-white'
                      : 'bg-white text-slate-900 border border-slate-200'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {msg.role === 'assistant' && (
                      <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Sparkles className="h-3 w-3 text-amber-600" />
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex justify-start animate-in fade-in-0 slide-in-from-bottom-2">
                <div className="max-w-[80%] rounded-2xl p-4 bg-white border border-slate-200 shadow-sm">
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin text-amber-600" />
                    <span className="text-sm text-slate-500">Cavab yazılır...</span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={onSubmit} className="p-4 border-t border-slate-200 bg-white">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={handleInputChange}
                placeholder="Mesajınızı yazın..."
                disabled={isLoading}
                className="flex-1 h-12 border-slate-300 focus:border-amber-500 focus:ring-amber-500 rounded-full px-4"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    onSubmit(e);
                  }
                }}
              />
              <Button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="h-12 w-12 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Send className="h-5 w-5" />
                )}
              </Button>
            </div>
            <p className="text-xs text-slate-500 mt-2 text-center">
              💡 Məsələn: "Aşpaz proqramı haqqında məlumat verin" və ya "Qiymətlər nə qədərdir?"
            </p>
          </form>
        </SheetContent>
      </Sheet>
    </>
  );
}




