
import React, { useState, useRef, useEffect } from 'react';
import { Mic, X, ChefHat, Volume2, Globe, Sparkles, Play } from 'lucide-react';
// Server proxy will handle GenAI calls; avoid using client-side API key in production.
import { GOLD, NAVY_BLUE, GOLD_BG } from './landing-constants';

// --- Encoding/Decoding Helpers ---
function decode(base64: string) {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

function encode(bytes: Uint8Array) {
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

function createBlob(data: Float32Array): { data: string; mimeType: string } {
  const int16 = new Int16Array(data.length);
  for (let i = 0; i < data.length; i++) {
    int16[i] = data[i] * 32768;
  }
  return {
    data: encode(new Uint8Array(int16.buffer)),
    mimeType: 'audio/pcm;rate=16000',
  };
}
// ---------------------------------

const AISousChef: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isDemo, setIsDemo] = useState(false);
  const [transcription, setTranscription] = useState<string>('');
  const [modelResponse, setModelResponse] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);

  const audioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const sessionPromiseRef = useRef<Promise<any> | null>(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    if (isActive) stopSession();
    setIsDemo(false);
  };

  const startDemo = () => {
    setIsDemo(true);
    setIsActive(true);
    setTranscription("Mise en place nə deməkdir?");
    setTimeout(() => {
      setModelResponse("'Mise en place' fransızca 'yerində qoyulmuş' deməkdir. Kulinariyada bu, yemək bişirməyə başlamazdan əvvəl bütün inqrediyentlərin və avadanlıqların hazırlanması mərhələsidir.");
    }, 2000);
  };

  const startSession = async () => {
    // Secure flow: call server-side proxy (Vercel) which holds the GEMINI key.
    try {
      setIsDemo(false);
      setIsProcessing(true);

      // Vite will replace process.env.PROXY_URL at build-time via vite.config.ts
      // For production set PROXY_URL to your Vercel app root, e.g. "https://my-app.vercel.app"
      const proxyRoot = (process.env.PROXY_URL as unknown as string) || '';
      if (!proxyRoot) {
        console.warn('PROXY_URL not configured — falling back to demo.');
        startDemo();
        return;
      }

      const input = 'Mise en place nə deməkdir?';
      const res = await fetch(`${proxyRoot}/api/gemini`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input }),
      });
      const data = await res.json();

      setTranscription(input);
      setModelResponse(data?.output || 'Xəta: cavab alınamadı');
      setIsActive(true);
      setIsProcessing(false);
    } catch (err) {
      console.error(err);
      startDemo();
    }
  };

  const stopSession = () => {
    sessionPromiseRef.current?.then(s => s.close());
    setIsActive(false);
    setIsProcessing(false);
    setIsDemo(false);
    setTranscription('');
    setModelResponse('');
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-80 md:w-96 bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
          <div className={`${NAVY_BLUE} p-6 text-white flex items-center justify-between`}>
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-xl bg-slate-800 ${GOLD}`}>
                <ChefHat size={24} />
              </div>
              <div>
                <h4 className="font-bold text-sm">AI Sous-Chef</h4>
                <p className="text-[10px] uppercase tracking-widest text-slate-400">Canlı Köməkçi</p>
              </div>
            </div>
            <button onClick={toggleOpen} className="p-2 hover:bg-white/10 rounded-full">
              <X size={20} />
            </button>
          </div>

          <div className="p-6">
            {!isActive ? (
              <div className="text-center space-y-4">
                <p className="text-xs text-slate-500">Mətbəxdə səslə idarə olunan peşəkar köməkçini sınayın.</p>
                <button 
                  onClick={startSession}
                  className={`w-full ${GOLD_BG} text-white font-bold py-4 rounded-xl flex items-center justify-center space-x-2`}
                >
                  <Mic size={18} /> <span>Canlı Bağlan</span>
                </button>
                <button 
                  onClick={startDemo}
                  className="w-full border-2 border-slate-100 text-slate-500 font-bold py-3 rounded-xl flex items-center justify-center space-x-2 hover:bg-slate-50"
                >
                  <Play size={16} /> <span>Demo Simulyasiya</span>
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex justify-center h-10 items-center space-x-1">
                  {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="w-1 bg-[#C5A022] rounded-full animate-bounce" style={{ height: `${Math.random() * 100}%`, animationDelay: `${i * 0.1}s` }}></div>
                  ))}
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Siz deyirsiniz</p>
                  <p className="text-sm font-medium">{transcription || "..."}</p>
                </div>
                <div className={`p-4 rounded-2xl border ${NAVY_BLUE} text-white`}>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">AI Cavabı</p>
                  <p className="text-sm">{modelResponse || "Dinləyirəm..."}</p>
                </div>
                <button onClick={stopSession} className="w-full bg-red-50 text-red-500 font-bold py-3 rounded-xl text-xs">Bağla</button>
              </div>
            )}
          </div>
        </div>
      )}
      <button 
        onClick={toggleOpen}
        className={`${NAVY_BLUE} p-5 rounded-full shadow-2xl border-4 border-white transform transition-all hover:scale-110 active:scale-95`}
      >
        {isOpen ? <X className="text-white" /> : <Mic className={GOLD} />}
      </button>
    </div>
  );
};

export default AISousChef;
