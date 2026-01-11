import React, { useState, useEffect } from 'react';
import { X, ArrowRight, Sparkles, Gift, Globe, Clock, CheckCircle } from 'lucide-react';

interface WelcomePopupProps {
  onOpenLeadModal: () => void;
}

const WelcomePopup: React.FC<WelcomePopupProps> = ({ onOpenLeadModal }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const shown = sessionStorage.getItem('tqtaWelcomeShown');
      if (!shown) {
        setIsVisible(true);
      }
    }, 5000); // 5 saniyə sonra göstər
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem('tqtaWelcomeShown', 'true');
  };

  const handleCTA = () => {
    handleClose();
    onOpenLeadModal();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-[#0A192F]/70 backdrop-blur-sm animate-in fade-in duration-500">
      <div className="bg-gradient-to-br from-[#8B6B43] via-[#A67C52] to-[#8B6B43] text-white rounded-[2rem] max-w-lg w-full relative overflow-hidden shadow-2xl">
        
        {/* Decorative elements */}
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-amber-300/10 rounded-full blur-2xl"></div>
        
        {/* Close button */}
        <button 
          onClick={handleClose} 
          className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors z-20"
        >
          <X size={20} />
        </button>

        {/* Content */}
        <div className="relative z-10 p-8 sm:p-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium mb-4">
            <Sparkles size={12} className="text-amber-300" />
            <span>Sumqayıtda İlk və Tək</span>
          </div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight">
            Peşəkar Təhsil,<br/>
            <span className="text-amber-200">Zəmanətli İş!</span>
          </h2>

          {/* Features */}
          <div className="space-y-2 mb-6">
            <div className="flex items-center gap-2 text-white/90 text-sm">
              <CheckCircle size={16} className="text-green-400 flex-shrink-0" />
              <span>1-2 aylıq intensiv təhsil proqramları</span>
            </div>
            <div className="flex items-center gap-2 text-white/90 text-sm">
              <CheckCircle size={16} className="text-green-400 flex-shrink-0" />
              <span>Məzunların 90%-i dərhal işlə təmin olunur</span>
            </div>
            <div className="flex items-center gap-2 text-white/90 text-sm">
              <CheckCircle size={16} className="text-green-400 flex-shrink-0" />
              <span>Beynəlxalq CTH diplomu (İngiltərə)</span>
            </div>
          </div>

          {/* Two options */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
              <Gift size={20} className="mx-auto mb-1 text-green-400" />
              <div className="text-xs font-bold text-green-400">PULSUZ</div>
              <div className="text-[10px] text-white/70">Dövlət dəstəkli</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
              <Globe size={20} className="mx-auto mb-1 text-blue-400" />
              <div className="text-xs font-bold text-blue-400">CTH DİPLOM</div>
              <div className="text-[10px] text-white/70">Beynəlxalq</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <button 
            onClick={handleCTA}
            className="w-full bg-white text-[#8B6B43] font-bold py-4 rounded-xl hover:bg-amber-50 transition-all flex items-center justify-center text-base shadow-lg"
          >
            Pulsuz Məsləhət Al
            <ArrowRight size={18} className="ml-2" />
          </button>

          <button 
            onClick={handleClose}
            className="w-full text-white/60 text-xs mt-3 hover:text-white transition-colors"
          >
            Sonra baxaram
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePopup;
