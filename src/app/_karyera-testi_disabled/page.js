'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, XCircle, Clock, Sparkles, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { ASSESSMENT_CATEGORIES } from '@/constants/career-assessment';

export default function KaryeraTestiPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [suallar, setSuallar] = useState([]);
  const [cariSualIndex, setCariSualIndex] = useState(0);
  const [cavablar, setCavablar] = useState([]);
  const [basladi, setBasladi] = useState(false);
  const [bitdi, setBitdi] = useState(false);
  const [yukleniyor, setYukleniyor] = useState(false);
  const [netice, setNetice] = useState(null);
  const [vaxt, setVaxt] = useState(60);
  const [vaxtBasladi, setVaxtBasladi] = useState(false);

  // Sualları yüklə
  useEffect(() => {
    if (status === 'loading') return;
    
    if (status === 'unauthenticated') {
      router.push('/login?redirect=/karyera-testi');
      return;
    }

    fetch('/api/career-assessment')
      .then(res => res.json())
      .then(data => {
        if (data.ugur && data.melumat) {
          // Sualları qarışdır
          const qarisdirilmis = [...data.melumat].sort(() => Math.random() - 0.5);
          setSuallar(qarisdirilmis.slice(0, 10)); // İlk 10 sual
        }
      })
      .catch(err => {
        console.error('Suallar yüklənərkən xəta:', err);
        toast.error('Suallar yüklənərkən xəta baş verdi');
      });
  }, [status, router]);

  // Vaxt sayğacı
  useEffect(() => {
    if (!vaxtBasladi || vaxt <= 0 || bitdi) return;

    const timer = setInterval(() => {
      setVaxt(prev => {
        if (prev <= 1) {
          handleBitir();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [vaxtBasladi, bitdi]);

  const handleBasla = () => {
    setBasladi(true);
    setVaxtBasladi(true);
  };

  const handleCavab = useCallback((cavab) => {
    if (bitdi) return;

    const sual = suallar[cariSualIndex];
    if (!sual) return;

    const yeniCavab = {
      sual_id: sual.id,
      cavab: cavab,
    };

    setCavablar(prev => [...prev, yeniCavab]);

    // Növbəti suala keç
    if (cariSualIndex < suallar.length - 1) {
      setCariSualIndex(prev => prev + 1);
    } else {
      handleBitir();
    }
  }, [cariSualIndex, suallar, bitdi]);

  const handleBitir = async () => {
    if (bitdi || yukleniyor) return;
    
    setBitdi(true);
    setVaxtBasladi(false);
    setYukleniyor(true);

    try {
      const muddet = 60 - vaxt;
      const res = await fetch('/api/career-assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cavablar,
          muddet,
        }),
      });

      const data = await res.json();

      if (data.ugur) {
        setNetice(data.melumat);
        toast.success('Anket uğurla tamamlandı! 🎉');
      } else {
        toast.error(data.mesaj || 'Xəta baş verdi');
      }
    } catch (error) {
      console.error('Anket göndərilərkən xəta:', error);
      toast.error('Anket göndərilərkən xəta baş verdi');
    } finally {
      setYukleniyor(false);
    }
  };

  const handleYenidenBasla = () => {
    setCariSualIndex(0);
    setCavablar([]);
    setBasladi(false);
    setBitdi(false);
    setNetice(null);
    setVaxt(60);
    setVaxtBasladi(false);
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Yüklənir...</p>
        </div>
      </div>
    );
  }

  if (!basladi) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-6">
        <Card className="max-w-2xl w-full p-8 md:p-12 text-center">
          <div className="mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Sparkles className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 font-serif">
              Karyera Testi
            </h1>
            <p className="text-xl text-slate-600 mb-2">
              "Mən / Mən Deyil" Anketi
            </p>
            <p className="text-slate-500">
              60 saniyəlik vizual anket ilə sizə ən uyğun rolü tapın
            </p>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-8 text-left">
            <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <Clock className="h-5 w-5 text-amber-600" />
              Necə işləyir?
            </h3>
            <ul className="space-y-2 text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-amber-600 font-bold mt-1">•</span>
                <span>Hər sual üçün şəkil və təsvir görəcəksiniz</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 font-bold mt-1">•</span>
                <span>"Mən" və ya "Mən deyil" seçimini edin</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 font-bold mt-1">•</span>
                <span>60 saniyə vaxtınız var</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 font-bold mt-1">•</span>
                <span>Nəticə sizə ən uyğun rolü göstərəcək</span>
              </li>
            </ul>
          </div>

          <Button
            onClick={handleBasla}
            className="w-full md:w-auto px-12 py-6 text-lg bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 hover:from-amber-600 hover:via-amber-700 hover:to-amber-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            Başla
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Card>
      </div>
    );
  }

  if (bitdi && netice) {
    const rolAdlari = {
      aspaz: 'Aşpaz',
      garson: 'Garson',
      barista: 'Barista',
      qonaqlama: 'Qonaqlama',
      idareetme: 'İdarəetmə',
    };

    const kateqoriyaAdlari = {
      optimizm: 'Optimizm',
      liderlik: 'Liderlik',
      icma: 'İcma',
      senetkarlik: 'Sənətkarlıq',
      mentorluq: 'Mentorluq',
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 md:p-12">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="h-10 w-10 text-green-600" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 font-serif">
                Anket Tamamlandı! 🎉
              </h1>
              <p className="text-xl text-slate-600">
                Sizə ən uyğun rol: <span className="font-bold text-amber-600">
                  {rolAdlari[netice.nəticə?.tövsiyəEdilənRol] || netice.nəticə?.tövsiyəEdilənRol}
                </span>
              </p>
            </div>

            {/* Kateqoriya Nəticələri */}
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {Object.entries(netice.nəticə?.təsvir || {}).map(([key, value]) => {
                if (key === 'tövsiyəEdilənRol') return null;
                const faiz = typeof value === 'string' ? parseInt(value.replace('%', '')) : value;
                return (
                  <div key={key} className="bg-slate-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-slate-900">
                        {kateqoriyaAdlari[key] || key}
                      </span>
                      <span className="text-amber-600 font-bold">{faiz}%</span>
                    </div>
                    <Progress value={faiz} className="h-2" />
                  </div>
                );
              })}
            </div>

            {/* Əməliyyatlar */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => router.push(`/proqramlar/${netice.nəticə?.tövsiyəEdilənRol}`)}
                className="px-8 py-6 text-lg bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 hover:from-amber-600 hover:via-amber-700 hover:to-amber-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                Proqrama Bax
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                onClick={handleYenidenBasla}
                variant="outline"
                className="px-8 py-6 text-lg"
              >
                Yenidən Başla
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  const cariSual = suallar[cariSualIndex];
  if (!cariSual) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Suallar yüklənir...</p>
        </div>
      </div>
    );
  }

  const progress = ((cariSualIndex + 1) / suallar.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        {/* Üst Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-slate-600">
              Sual {cariSualIndex + 1} / {suallar.length}
            </span>
            <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
              <Clock className="h-4 w-4" />
              {vaxt} saniyə
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Sual Kartı */}
        <Card className="p-8 md:p-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 font-serif">
              {cariSual.sual_mətni || cariSual.sualMetni}
            </h2>
            {cariSual.şəkil_təsviri && (
              <p className="text-slate-500 italic mb-6">
                {cariSual.şəkil_təsviri}
              </p>
            )}
          </div>

          {/* Şəkil (əgər varsa) */}
          {cariSual.şəkil_url && (
            <div className="mb-8 rounded-lg overflow-hidden">
              <img
                src={cariSual.şəkil_url}
                alt={cariSual.şəkil_təsviri || 'Sual şəkli'}
                className="w-full h-64 object-cover"
              />
            </div>
          )}

          {/* Cavab Düymələri */}
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <button
              onClick={() => handleCavab('men')}
              disabled={bitdi}
              className="group relative p-8 bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl font-bold text-xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="flex items-center justify-center gap-3">
                <CheckCircle2 className="h-8 w-8" />
                <span>Mən</span>
              </div>
            </button>

            <button
              onClick={() => handleCavab('men_deyil')}
              disabled={bitdi}
              className="group relative p-8 bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl font-bold text-xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="flex items-center justify-center gap-3">
                <XCircle className="h-8 w-8" />
                <span>Mən Deyil</span>
              </div>
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}


