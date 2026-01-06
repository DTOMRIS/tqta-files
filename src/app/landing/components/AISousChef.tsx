
import React, { useState, useRef, useEffect } from 'react';
import { Mic, X, ChefHat, Volume2, Globe, Sparkles, Play } from 'lucide-react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import { GOLD, NAVY_BLUE, GOLD_BG } from '../constants';

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
    try {
      setIsDemo(false);
      setIsActive(true);
      setIsProcessing(true);
      
      const apiKey = process.env.API_KEY;
      if (!apiKey) throw new Error("API Key missing");

      const ai = new GoogleGenAI({ apiKey });
      
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      outputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      sessionPromiseRef.current = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } },
          },
          systemInstruction: 'Siz Turan Gastro Turizm Akademiyası (TQTA) üçün peşəkar AI Sous-Chefsiz. Tələbələrə reseptlərdə addım-addım kömək edir və kulinariya terminlərini (məsələn Fransız dilindən) Azərbaycan dilinə tərcümə edirsiniz.',
          inputAudioTranscription: {},
          outputAudioTranscription: {},
        },
        callbacks: {
          onopen: () => {
            setIsProcessing(false);
            const source = audioContextRef.current!.createMediaStreamSource(stream);
            const scriptProcessor = audioContextRef.current!.createScriptProcessor(4096, 1, 1);
            
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const pcmBlob = createBlob(inputData);
              sessionPromiseRef.current?.then((session) => {
                session.sendRealtimeInput({ media: pcmBlob });
              });
            };

            source.connect(scriptProcessor);
            scriptProcessor.connect(audioContextRef.current!.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            const base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (base64Audio) {
              const ctx = outputAudioContextRef.current!;
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
              const buffer = await decodeAudioData(decode(base64Audio), ctx, 24000, 1);
              const source = ctx.createBufferSource();
              source.buffer = buffer;
              source.connect(ctx.destination);
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += buffer.duration;
              sourcesRef.current.add(source);
            }
            if (message.serverContent?.inputTranscription) setTranscription(message.serverContent.inputTranscription.text);
            if (message.serverContent?.outputTranscription) setModelResponse(message.serverContent.outputTranscription.text);
          },
          onerror: (e) => console.error('Gemini Error:', e),
          onclose: () => stopSession(),
        },
      });
    } catch (err) {
      console.error(err);
      setIsActive(false);
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
