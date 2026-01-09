'use client';

import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

export default function AISousChef() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([
    { role: 'ai', text: 'Salam! Mən TQTA Bələdçisiyəm. Proqramlar, qəbul və sertifikatlarla bağlı nə soruşmaq istəyirsən?' },
  ]);
  const [loading, setLoading] = useState(false);

  const ask = async () => {
    const text = q.trim();
    if (!text || loading) return;

    setMessages((m) => [...m, { role: 'user', text }]);
    setQ('');
    setLoading(true);

    try {
      // Hələ backend qoşmamışıqsa "demo" cavab
      // Sonra bunu /api/ai/chat və ya /api/ai-sous-chef route-a bağlayarıq
      const demo = 'Qəbul üçün “Qeydiyyatdan keç” düyməsinə kliklə. Hansı istiqamət maraqlıdır: kulinariya, turizm, yoxsa qonaqpərvərlik?';
      await new Promise((r) => setTimeout(r, 450));
      setMessages((m) => [...m, { role: 'ai', text: demo }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Bubble */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-[60] w-14 h-14 rounded-full bg-[#C5A022] text-white shadow-xl hover:bg-[#B38E1A] transition-all flex items-center justify-center"
        aria-label="TQTA Bələdçisi"
      >
        <MessageCircle />
      </button>

      {/* Panel */}
      {open && (
        <div className="fixed bottom-6 right-6 z-[70] w-[360px] max-w-[92vw] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
          <div className="bg-[#0A192F] text-white px-4 py-3 flex items-center justify-between">
            <div className="font-bold text-sm">TQTA Bələdçisi</div>
            <button
              onClick={() => setOpen(false)}
              className="p-1 rounded-md hover:bg-white/10"
              aria-label="Bağla"
            >
              <X size={18} />
            </button>
          </div>

          <div className="bg-slate-50 h-[340px] overflow-y-auto p-3 space-y-2">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`text-sm p-3 rounded-xl max-w-[90%] ${
                  m.role === 'user'
                    ? 'ml-auto bg-[#C5A022] text-white'
                    : 'mr-auto bg-white text-slate-800 border'
                }`}
              >
                {m.text}
              </div>
            ))}
            {loading && (
              <div className="text-xs text-slate-500">Yazır...</div>
            )}
          </div>

          <div className="bg-white p-3 border-t flex gap-2">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') ask();
              }}
              placeholder="Sualını yaz..."
              className="flex-1 px-3 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#C5A022]/30"
            />
            <button
              onClick={ask}
              className="px-3 py-2 rounded-xl bg-[#0A192F] text-white hover:bg-[#0A192F]/90"
              aria-label="Göndər"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
