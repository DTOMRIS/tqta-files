'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, BrainCircuit } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

const GOLD_BG = 'bg-[#C5A022]';
const NAVY_BLUE = 'bg-[#0A192F]';

const COURSES = [
  { title: 'Peşəkar Aşpazlıq Proqramı', duration: '2-7 Ay', certification: 'CTH Level 3' },
  { title: 'Restoran İdarəçiliyi', duration: '1 Ay', certification: 'Management Diploma' },
];

const Beledchiniz: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([
    { role: 'model', text: 'Salam! Hansı təhsil proqramı sizə uyğundur, gəlin birlikdə baxaq? 👋' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsTyping(true);

    try {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      if (!apiKey) {
        setMessages(prev => [...prev, { 
          role: 'model', 
          text: 'Üzr istəyirəm, AI xidməti hazırda mövcud deyil. Zəhmət olmasa, API açarını təyin edin.' 
        }]);
        setIsTyping(false);
        return;
      }

      const ai = new GoogleGenAI({ apiKey });
      const model = 'gemini-3-flash-preview';
      
      const knowledgeBase = `
        Senin adın "Beledçiniz"dir. Turan Gastro Turizm Akademiyası (TQTA) üçün virtual bələdçisən.
        "Agents as Informed Walkers" prinsipi ilə hərəkət etməlisən. 
        
        MƏQSƏDİN: İstifadəçinin sualına cavab verməklə yanaşı, onun "Qərar İzi"ni (Decision Trace) analiz etməkdir.
        
        KURSLARIMIZ:
        ${COURSES.map(c => `- ${c.title}: ${c.duration}, Sertifikat: ${c.certification}`).join('\n')}
        
        ARXA PLAN ANALİZİ (REASONING):
        İstifadəçi qiymət haqqında soruşursa, "Price Sensitivity" düyünü aktivləşir.
        Karyera haqqında soruşursa, "Career Impact" düyünü aktivləşir.
        
        Həmişə Azərbaycan dilində, səmimi və peşəkar cavab ver. Cavabın sonunda bir cümlə ilə [REASONING: ...] formatında süni intellekt analizi əlavə et (bu qeyd yalnız təlim üçün nəzərdə tutulub, reallıqda adminlərə ötürülür).
      `;

      const response = await ai.models.generateContent({
        model: model,
        contents: [
          { role: 'user', parts: [{ text: knowledgeBase + "\n\nİstifadəçinin sualı: " + userMessage }] }
        ],
        config: {
          temperature: 0.7,
        }
      });

      const aiText = response.text || "Üzr istəyirəm, bir xəta baş verdi.";
      setMessages(prev => [...prev, { role: 'model', text: aiText }]);
    } catch (error) {
      console.error('AI Error:', error);
      setMessages(prev => [...prev, { role: 'model', text: "Hazırda cavab verə bilmirəm. Zəhmət olmasa, daha sonra yenidən cəhd edin." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[120]">
      {!isOpen ? (
        <div className="flex flex-col items-end">
          <div className="bg-white px-4 py-2 rounded-2xl shadow-xl mb-3 border border-slate-100 text-sm font-medium animate-float hidden md:block">
            Sizə kömək edə bilərəm? 👋
          </div>
          <button 
            onClick={() => setIsOpen(true)}
            className={`${GOLD_BG} p-4 rounded-full shadow-2xl hover:scale-110 transition-all chat-glow group`}
          >
            <MessageCircle className="text-white group-hover:rotate-12 transition-transform" size={32} />
          </button>
        </div>
      ) : (
        <div className="bg-white w-[350px] sm:w-[400px] h-[550px] rounded-[2rem] shadow-2xl flex flex-col overflow-hidden border border-slate-100 animate-in slide-in-from-bottom-5 duration-300">
          <div className={`${NAVY_BLUE} p-6 text-white flex items-center justify-between`}>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#C5A022] rounded-xl flex items-center justify-center">
                <BrainCircuit size={24} />
              </div>
              <div>
                <h4 className="font-bold text-sm">Beledçiniz</h4>
                <p className="text-[10px] text-amber-400 font-bold uppercase tracking-widest">Analitik Rejim</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <X size={20} />
            </button>
          </div>

          <div ref={scrollRef} className="flex-grow p-6 overflow-y-auto space-y-4 bg-slate-50/50">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[90%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  msg.role === 'user' ? 'bg-[#C5A022] text-white rounded-tr-none' : 'bg-white text-slate-700 rounded-tl-none border border-slate-100'
                }`}>
                  {msg.text.includes('[REASONING:') ? (
                    <>
                      <p>{msg.text.split('[REASONING:')[0]}</p>
                      <div className="mt-3 pt-3 border-t border-slate-100 text-[10px] text-slate-400 font-mono italic">
                        <Sparkles size={10} className="inline mr-1" />
                        {msg.text.split('[REASONING:')[1].replace(']', '')}
                      </div>
                    </>
                  ) : msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-slate-100 flex space-x-1">
                  <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-white border-t border-slate-100">
            <div className="flex items-center space-x-2 bg-slate-50 p-2 rounded-2xl border border-slate-100 focus-within:border-[#C5A022] transition-colors">
              <input 
                type="text" 
                placeholder="Suallarınızı verin..."
                className="flex-grow bg-transparent px-4 py-2 outline-none text-sm"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && handleSend()}
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className={`${GOLD_BG} p-2.5 rounded-xl text-white disabled:opacity-50 hover:scale-105 transition-transform`}
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Beledchiniz;

