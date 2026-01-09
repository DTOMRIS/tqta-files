
import React, { useState } from 'react';
import { Sparkles, Check, X, RefreshCw, Award, TrendingUp, Users, Heart, Star } from 'lucide-react';
import { ASSESSMENT_QUESTIONS, NAVY_BLUE, GOLD, GOLD_BG } from './landing-constants';
import { AssessmentScores } from './landing-types';

const CareerAssessment: React.FC = () => {
  const [started, setStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scores, setScores] = useState<AssessmentScores>({
    Optimism: 0,
    Leadership: 0,
    Community: 0,
    Craftsmanship: 0,
    Mentorship: 0
  });
  const [isFinished, setIsFinished] = useState(false);

  const handleAnswer = (isMe: boolean) => {
    if (isMe) {
      const question = ASSESSMENT_QUESTIONS[currentIndex];
      setScores(prev => ({
        ...prev,
        [question.category]: prev[question.category] + 1
      }));
    }

    if (currentIndex < ASSESSMENT_QUESTIONS.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const restart = () => {
    setCurrentIndex(0);
    setScores({
      Optimism: 0,
      Leadership: 0,
      Community: 0,
      Craftsmanship: 0,
      Mentorship: 0
    });
    setIsFinished(false);
    setStarted(true);
  };

  const currentQuestion = ASSESSMENT_QUESTIONS[currentIndex];
  const progress = ((currentIndex + 1) / ASSESSMENT_QUESTIONS.length) * 100;

  if (isFinished) {
    const maxScore = Math.max(...Object.values(scores));
    const dominantTrait = Object.keys(scores).find(key => scores[key as keyof AssessmentScores] === maxScore) as keyof AssessmentScores;

    const traitDescriptions = {
      Optimism: "Siz gələcəyə inamla baxan və yeniliklərdən qorxmayan birisiniz.",
      Leadership: "Siz təbii ləidərlik xüsusiyyətlərinə malik, qətiyyətli birisiniz.",
      Community: "Siz komanda ruhu yüksək olan və əməkdaşlığa dəyər verən birisiniz.",
      Craftsmanship: "Siz detallara önəm verən və öz sənətində mükəmməlliyə can atan birisiniz.",
      Mentorship: "Siz başqalarına yol göstərməyi və biliklərinizi paylaşmağı sevən birisiniz."
    };

    const traitIcons = {
      Optimism: <TrendingUp className="text-[#C5A022]" />,
      Leadership: <Award className="text-[#C5A022]" />,
      Community: <Users className="text-[#C5A022]" />,
      Craftsmanship: <Star className="text-[#C5A022]" />,
      Mentorship: <Heart className="text-[#C5A022]" />
    };

    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-[3rem] shadow-2xl p-10 text-center border border-slate-100">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Sparkles className="text-[#C5A022]" size={40} />
          </div>
          <h2 className="text-3xl font-bold text-[#0A192F] mb-4">Sizin Karyera Profiliniz</h2>
          <div className="w-24 h-1 bg-[#C5A022] mx-auto mb-8"></div>
          
          <div className="bg-slate-50 p-8 rounded-3xl mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              {traitIcons[dominantTrait]}
              <h3 className="text-2xl font-bold text-[#0A192F]">{dominantTrait === 'Optimism' ? 'Optimist' : dominantTrait === 'Leadership' ? 'Lider' : dominantTrait === 'Community' ? 'İcmaçı' : dominantTrait === 'Craftsmanship' ? 'Sənətkar' : 'Mentor'}</h3>
            </div>
            <p className="text-slate-600 leading-relaxed max-w-lg mx-auto">
              {traitDescriptions[dominantTrait]} TQTA-da sizin üçün ən uyğun proqramları kəşf edin.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-10">
            {Object.entries(scores).map(([trait, score]) => (
              <div key={trait} className="bg-white p-4 rounded-2xl border border-slate-100">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">{trait}</div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#C5A022]" style={{ width: `${(score / 4) * 100}%` }}></div>
                </div>
                <div className="text-sm font-bold text-[#0A192F] mt-2">{score}/4</div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={restart} className="flex items-center justify-center space-x-2 px-8 py-4 border-2 border-[#0A192F] text-[#0A192F] font-bold rounded-xl hover:bg-[#0A192F] hover:text-white transition-all">
              <RefreshCw size={20} />
              <span>Yenidən Başla</span>
            </button>
            <button className={`${GOLD_BG} text-white px-8 py-4 font-bold rounded-xl shadow-lg hover:shadow-2xl transition-all`}>
              Kurslara Bax
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!started) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-[3rem] shadow-2xl p-10 md:p-16 text-center border border-slate-100">
          <h2 className="text-4xl font-bold text-[#0A192F] mb-6 leading-tight">Mən / Mən Deyil Anket Sistemi</h2>
          <p className="text-slate-500 mb-10 text-lg leading-relaxed max-w-2xl mx-auto">
            60 saniyəlik vizual anketimizlə karyera yolunuzu müəyyən edin. Şəkillərə baxın və özünüzə ən uyğun cavabı seçin.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 text-left">
            <div className="p-6 bg-slate-50 rounded-2xl">
              <div className="text-[#C5A022] font-bold mb-2">1. Vizual Kartlar</div>
              <p className="text-xs text-slate-500">Kulinariya və qonaqpərvərlik mühitini əks etdirən şəkillər.</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-2xl">
              <div className="text-[#C5A022] font-bold mb-2">2. Sürətli Qərarlar</div>
              <p className="text-xs text-slate-500">Cəmi 15 sual ilə psixoloji profilinizin təhlili.</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-2xl">
              <div className="text-[#C5A022] font-bold mb-2">3. Professional Nəticə</div>
              <p className="text-xs text-slate-500">Sizin üçün ən uyğun karyera sahəsinin təyini.</p>
            </div>
          </div>
          <button 
            onClick={() => setStarted(true)}
            className={`${GOLD_BG} text-white px-12 py-5 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all`}
          >
            Anketi Başlat
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-[3rem] shadow-2xl p-8 border border-slate-100 relative overflow-hidden">
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-100">
          <div className="h-full bg-[#C5A022] transition-all duration-300" style={{ width: `${progress}%` }}></div>
        </div>

        <div className="flex justify-between items-center mb-8 mt-4">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Sual {currentIndex + 1} / {ASSESSMENT_QUESTIONS.length}</span>
          <span className="text-xs font-bold text-[#C5A022] uppercase tracking-[0.2em]">{currentQuestion.category}</span>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-full h-[400px] rounded-3xl overflow-hidden mb-8 shadow-inner relative group">
            <img 
              src={currentQuestion.image} 
              alt="Assessment" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-10">
              <h3 className="text-2xl md:text-3xl font-bold text-white text-center w-full leading-tight">
                {currentQuestion.text}
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 w-full max-w-md">
            <button 
              onClick={() => handleAnswer(false)}
              className="flex items-center justify-center space-x-3 py-6 rounded-2xl border-2 border-red-100 text-red-500 font-bold hover:bg-red-50 transition-all group"
            >
              <X size={24} className="group-hover:scale-125 transition-transform" />
              <span className="text-xl">Mən deyil</span>
            </button>
            <button 
              onClick={() => handleAnswer(true)}
              className="flex items-center justify-center space-x-3 py-6 rounded-2xl border-2 border-green-100 text-green-600 font-bold hover:bg-green-50 transition-all group"
            >
              <Check size={24} className="group-hover:scale-125 transition-transform" />
              <span className="text-xl">Mən</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerAssessment;
