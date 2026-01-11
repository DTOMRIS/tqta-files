'use client';

import React, { useState, useEffect } from 'react';
import { Cookie, X, Check, Settings } from 'lucide-react';

const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false
  });

  useEffect(() => {
    const consent = localStorage.getItem('tqta-cookie-consent');
    if (!consent) {
      // Show after 2 seconds
      setTimeout(() => setIsVisible(true), 2000);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem('tqta-cookie-consent', JSON.stringify({
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString()
    }));
    setIsVisible(false);
  };

  const acceptSelected = () => {
    localStorage.setItem('tqta-cookie-consent', JSON.stringify({
      ...preferences,
      timestamp: new Date().toISOString()
    }));
    setIsVisible(false);
  };

  const rejectAll = () => {
    localStorage.setItem('tqta-cookie-consent', JSON.stringify({
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString()
    }));
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Main Banner */}
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-[#C5A022]/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <Cookie className="w-6 h-6 text-[#C5A022]" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-[#0A192F] mb-2">🍪 Çərəz Siyasəti</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                TQTA saytı istifadəçi təcrübənizi yaxşılaşdırmaq üçün çərəzlərdən istifadə edir. 
                Saytımızı istifadə etməyə davam etməklə, çərəz siyasətimizi qəbul etmiş olursunuz.
              </p>
            </div>
          </div>

          {/* Settings Panel */}
          {showSettings && (
            <div className="mt-6 pt-6 border-t border-slate-100 space-y-4">
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div>
                  <div className="font-semibold text-[#0A192F] text-sm">Zəruri Çərəzlər</div>
                  <div className="text-xs text-slate-500">Saytın düzgün işləməsi üçün tələb olunur</div>
                </div>
                <div className="w-10 h-6 bg-[#C5A022] rounded-full flex items-center justify-end px-1">
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div>
                  <div className="font-semibold text-[#0A192F] text-sm">Analitik Çərəzlər</div>
                  <div className="text-xs text-slate-500">Sayt istifadə statistikasını toplamaq üçün</div>
                </div>
                <button 
                  onClick={() => setPreferences(p => ({ ...p, analytics: !p.analytics }))}
                  className={`w-10 h-6 rounded-full flex items-center px-1 transition-colors ${
                    preferences.analytics ? 'bg-[#C5A022] justify-end' : 'bg-slate-300 justify-start'
                  }`}
                >
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </button>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div>
                  <div className="font-semibold text-[#0A192F] text-sm">Marketinq Çərəzləri</div>
                  <div className="text-xs text-slate-500">Hədəfli reklamlar üçün istifadə olunur</div>
                </div>
                <button 
                  onClick={() => setPreferences(p => ({ ...p, marketing: !p.marketing }))}
                  className={`w-10 h-6 rounded-full flex items-center px-1 transition-colors ${
                    preferences.marketing ? 'bg-[#C5A022] justify-end' : 'bg-slate-300 justify-start'
                  }`}
                >
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </button>
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
            >
              <Settings size={16} />
              {showSettings ? 'Gizlət' : 'Tənzimləmələr'}
            </button>
            <button
              onClick={rejectAll}
              className="flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
            >
              <X size={16} />
              Rədd Et
            </button>
            {showSettings ? (
              <button
                onClick={acceptSelected}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#0A192F] text-white rounded-lg text-sm font-bold hover:bg-slate-800 transition-colors"
              >
                <Check size={16} />
                Seçilmişləri Qəbul Et
              </button>
            ) : (
              <button
                onClick={acceptAll}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#C5A022] text-white rounded-lg text-sm font-bold hover:bg-[#d4b82e] transition-colors"
              >
                <Check size={16} />
                Hamısını Qəbul Et
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
