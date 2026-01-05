'use client';

// DÜZELTİLEN SATIR BURASI:
import { useChat } from '@ai-sdk/react';
import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Send, User, X, MessageSquare, Loader2, Sparkles } from 'lucide-react';
import { cn } from "@/lib/utils";

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const scrollRef = useRef(null);
  
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
    initialMessages: [
      {
        id: 'welcome',
        role: 'assistant',
        content: 'Salam! Mən TQTA-nın AI asistanıyam. Sizə tədris proqramları, qeydiyyat prosesi və karyera imkanları haqqında necə kömək edə bilərəm?'
      }
    ]
  });

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      {/* Chat Penceresi */}
      <div 
        className={cn(
          "bg-white rounded-2xl shadow-2xl border border-stone-200 w-[380px] mb-4 overflow-hidden transition-all duration-300 pointer-events-auto",
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none h-0"
        )}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/10 p-2 rounded-lg">
              <Bot className="h-5 w-5 text-amber-400" />
            </div>
            <div>
              <h3 className="text-white font-medium text-sm">TQTA AI Asistan</h3>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-white/60 text-xs">Onlayn</span>
              </div>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white/60 hover:text-white hover:bg-white/10 h-8 w-8"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Mesaj Alanı */}
        <div className="h-[400px] bg-stone-50 relative">
          <ScrollArea className="h-full p-4" ref={scrollRef}>
            <div className="space-y-4">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={cn(
                    "flex gap-3 text-sm",
                    m.role === 'user' ? "flex-row-reverse" : "flex-row"
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                    m.role === 'user' ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-700"
                  )}>
                    {m.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                  </div>
                  <div className={cn(
                    "p-3 rounded-2xl max-w-[80%] shadow-sm",
                    m.role === 'user' 
                      ? "bg-amber-600 text-white rounded-tr-none" 
                      : "bg-white text-slate-700 border border-stone-100 rounded-tl-none"
                  )}>
                    {m.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-stone-100 shadow-sm flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin text-amber-600" />
                    <span className="text-xs text-slate-500">Yazır...</span>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>

        {/* Input Alanı */}
        <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-stone-100">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Sualınızı yazın..."
              className="flex-1 focus-visible:ring-amber-500"
            />
            <Button 
              type="submit" 
              disabled={isLoading || !input.trim()}
              className="bg-amber-600 hover:bg-amber-700 text-white"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <div className="mt-2 flex items-center justify-center gap-1.5 text-[10px] text-slate-400">
            <Sparkles className="h-3 w-3" />
            <span>AI powered by Vercel SDK</span>
          </div>
        </form>
      </div>

      {/* Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        size="lg"
        className={cn(
          "h-14 w-14 rounded-full shadow-lg transition-all duration-300 pointer-events-auto",
          isOpen 
            ? "bg-amber-600 rotate-90 scale-0 opacity-0" 
            : "bg-slate-900 hover:bg-slate-800 scale-100 opacity-100"
        )}
      >
        <MessageSquare className="h-6 w-6 text-white" />
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
        </span>
      </Button>
    </div>
  );
}