
import React, { useState } from 'react';
import { Network, TrendingUp, HelpCircle, Zap, ArrowRight, BrainCircuit, BarChart3, Settings2 } from 'lucide-react';
import { MOCK_TRAJECTORIES, GOLD, NAVY_BLUE, GOLD_BG } from '../constants';
import { GoogleGenAI } from '@google/genai';

const SuccessSimulator: React.FC = () => {
  const [simulationResult, setSimulationResult] = useState<string | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [scenario, setScenario] = useState('Qiymət artımı %20');

  const runSimulation = async () => {
    setIsSimulating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `
        Sen TQTA-nın "Dünya Modeli" (World Model) simulyatorusan. 
        Mövcud məlumatlar: 1000 tələbə traektoriya analizi.
        Ssenari: ${scenario} tətbiq olunarsa nə olar?
        Counterfactual Reasoning edərək, məzuniyyət, qeydiyyat və gəlir nisbətlərindəki ehtimal olunan dəyişiklikləri izah et.
        Cavabı peşəkar və data-orientasiyalı Azərbaycan dilində ver.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [{ role: 'user', parts: [{ text: prompt }] }]
      });

      setSimulationResult(response.text || "Simulyasiya uğursuz oldu.");
    } catch (e) {
      setSimulationResult("Xəta baş verdi. Verilənlər bazası ilə əlaqə kəsildi.");
    } finally {
      setIsSimulating(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left Side: Trajectory Map */}
        <div className="lg:w-2/3">
          <div className="flex items-center space-x-3 mb-8">
            <div className={`p-2 rounded-xl bg-amber-500/10 ${GOLD}`}>
              <BrainCircuit size={32} />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-[#0A192F]">Context Graph & Trajectory Map</h2>
              <p className="text-sm text-slate-500 italic">"Agents as Informed Walkers" analitikası</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MOCK_TRAJECTORIES.map((tr) => (
              <div key={tr.id} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:border-[#C5A022] transition-all group">
                <div className="flex justify-between items-start mb-4">
                  <div className="px-3 py-1 bg-slate-50 rounded-lg text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    {tr.intent}
                  </div>
                  <div className={`text-xs font-bold ${tr.outcome === 'Converted' ? 'text-green-500' : 'text-amber-500'}`}>
                    {(tr.probability * 100).toFixed(0)}% Sədaqət
                  </div>
                </div>
                <div className="flex items-center space-x-2 mb-4 overflow-x-auto py-1 no-scrollbar">
                  {tr.path.map((step, idx) => (
                    <React.Fragment key={idx}>
                      <span className="text-[10px] bg-slate-100 px-2 py-1 rounded text-slate-600 whitespace-nowrap">{step}</span>
                      {idx < tr.path.length - 1 && <ArrowRight size={10} className="text-slate-300" />}
                    </React.Fragment>
                  ))}
                </div>
                <p className="text-xs text-slate-500 mb-4 leading-relaxed font-medium">
                  <Zap size={12} className="inline mr-1 text-[#C5A022]" />
                  Reasoning: {tr.reasoning}
                </p>
                <div className="flex flex-wrap gap-2">
                  {tr.decisionNodes.map((node, i) => (
                    <span key={i} className="text-[9px] bg-amber-50 text-[#C5A022] px-2 py-0.5 rounded-full border border-amber-200">
                      {node}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Simulator Tool */}
        <div className="lg:w-1/3">
          <div className="bg-[#0A192F] rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden h-full">
            <div className="relative z-10">
              <div className="flex items-center space-x-2 mb-6 text-amber-500">
                <BarChart3 size={20} />
                <h3 className="font-bold uppercase tracking-widest text-xs">Simulyasiya Paneli</h3>
              </div>
              
              <h4 className="text-2xl font-bold mb-6">Counterfactual Engine</h4>
              
              <div className="space-y-6 mb-8">
                <div>
                  <label className="block text-[10px] text-slate-400 uppercase font-bold mb-2">Simulyasiya Ssenarisi</label>
                  <select 
                    value={scenario}
                    onChange={(e) => setScenario(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm focus:border-amber-500 outline-none"
                  >
                    <option className="text-black">Qiymət artımı %20</option>
                    <option className="text-black">Karyera zəmanəti vurğusu</option>
                    <option className="text-black">Beynəlxalq staj paketi</option>
                    <option className="text-black">Yeni 'Beledçiniz' təlimatları</option>
                  </select>
                </div>
                <button 
                  onClick={runSimulation}
                  disabled={isSimulating}
                  className={`w-full ${GOLD_BG} text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-amber-500/30 transition-all flex items-center justify-center space-x-2`}
                >
                  {isSimulating ? <Settings2 className="animate-spin" size={18} /> : <Zap size={18} />}
                  <span>Simulyasiyanı Başlat</span>
                </button>
              </div>

              {simulationResult && (
                <div className="bg-white/5 rounded-2xl p-6 border border-white/10 animate-in fade-in duration-500">
                  <div className="flex items-center space-x-2 mb-3 text-amber-500">
                    <BrainCircuit size={16} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">AI Proqnozu</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed italic">
                    {simulationResult}
                  </p>
                </div>
              )}

              {!simulationResult && !isSimulating && (
                <div className="text-center py-12 border-2 border-dashed border-white/10 rounded-2xl">
                  <HelpCircle className="mx-auto mb-2 text-slate-600" size={32} />
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest">Məlumat gözlənilir</p>
                </div>
              )}
            </div>
            
            {/* Background pattern */}
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-amber-500/5 rounded-full blur-[100px]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessSimulator;
