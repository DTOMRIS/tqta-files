'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Play, 
  CheckCircle2, 
  Clock, 
  BookOpen, 
  Video, 
  Award,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { toast } from 'sonner';
import { ROLES } from '@/constants/roles';

export default function RolProqramlariPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const rolKod = params.rol;
  
  const [modullar, setModullar] = useState([]);
  const [irəliləyiş, setIrəliləyiş] = useState({});
  const [yukleniyor, setYukleniyor] = useState(true);
  const [rolInfo, setRolInfo] = useState(null);

  useEffect(() => {
    const rol = ROLES.find(r => r.kod === rolKod);
    if (!rol) {
      toast.error('Rol tapılmadı');
      router.push('/proqramlar');
      return;
    }
    setRolInfo(rol);

    // Rol ID-ni tap
    fetch('/api/roles')
      .then(res => res.json())
      .then(rolesRes => {
        if (rolesRes.ugur) {
          const rol = rolesRes.melumat.find(r => r.kod === rolKod);
          if (rol) {
            Promise.all([
              fetch(`/api/modules?rolId=${rol.id}`).then(res => res.json()),
              session?.user?.id 
                ? fetch(`/api/student-progress?studentId=${session.user.id}`).then(res => res.json())
                : Promise.resolve({ ugur: true, melumat: {} }),
            ])
              .then(([modulesRes, progressRes]) => {
                if (modulesRes.ugur) {
                  // Yalnız bu rol üçün modulları filtrlə
                  const filteredModules = (modulesRes.melumat || []).filter(m => m.rol?.kod === rolKod);
                  setModullar(filteredModules);
                }
                if (progressRes.ugur) {
                  const progressMap = {};
                  (progressRes.melumat || []).forEach(p => {
                    progressMap[p.modulId] = p;
                  });
                  setIrəliləyiş(progressMap);
                }
              })
              .catch(err => {
                console.error('Məlumat yüklənərkən xəta:', err);
                toast.error('Məlumat yüklənərkən xəta baş verdi');
              })
              .finally(() => setYukleniyor(false));
          }
        }
      })
      .catch(err => {
        console.error('Rol məlumatları yüklənərkən xəta:', err);
        toast.error('Rol məlumatları yüklənərkən xəta baş verdi');
        setYukleniyor(false);
      });
      .then(([modulesRes, progressRes]) => {
        if (modulesRes.ugur) {
          setModullar(modulesRes.melumat || []);
        }
        if (progressRes.ugur) {
          const progressMap = {};
          (progressRes.melumat || []).forEach(p => {
            progressMap[p.modulId] = p;
          });
          setIrəliləyiş(progressMap);
        }
      })
      .catch(err => {
        console.error('Məlumat yüklənərkən xəta:', err);
        toast.error('Məlumat yüklənərkən xəta baş verdi');
      })
      .catch(err => {
        console.error('Rol məlumatları yüklənərkən xəta:', err);
        toast.error('Rol məlumatları yüklənərkən xəta baş verdi');
        setYukleniyor(false);
      });
  }, [rolKod, session, router]);

  if (yukleniyor || !rolInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Yüklənir...</p>
        </div>
      </div>
    );
  }

  const ümumiModul = modullar.length;
  const tamamlanmışModul = Object.values(irəliləyiş).filter(p => p.tamamlanmaFaizi >= 100).length;
  const ümumiProgress = ümumiModul > 0 ? (tamamlanmışModul / ümumiModul) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Geri Dön */}
        <Button
          variant="ghost"
          onClick={() => router.push('/proqramlar')}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Geri
        </Button>

        {/* Başlıq */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-2 font-serif">
                {rolInfo.ad}
              </h1>
              <p className="text-slate-600">{rolInfo.təsvir || ''}</p>
            </div>
          </div>

          {/* Statistika */}
          <div className="grid md:grid-cols-4 gap-4 mt-6">
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-slate-900 mb-1">
                  {rolInfo.muddetHefte} Həftə
                </div>
                <div className="text-sm text-slate-600">Müddət</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-slate-900 mb-1">
                  {rolInfo.videoSayi} Video
                </div>
                <div className="text-sm text-slate-600">Ümumi Video</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-slate-900 mb-1">
                  {rolInfo.modulSayi} Modul
                </div>
                <div className="text-sm text-slate-600">Ümumi Modul</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-amber-600 mb-1">
                  {rolInfo.sertifikatlar?.join(', ') || 'TQTA'}
                </div>
                <div className="text-sm text-slate-600">Sertifikat</div>
              </CardContent>
            </Card>
          </div>

          {/* Ümumi İrəliləyiş */}
          {session?.user?.id && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Ümumi İrəliləyiş</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-slate-600">
                      {tamamlanmışModul} / {ümumiModul} Modul Tamamlandı
                    </span>
                    <span className="text-sm font-bold text-amber-600">
                      {Math.round(ümumiProgress)}%
                    </span>
                  </div>
                  <Progress value={ümumiProgress} className="h-3" />
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Modullar */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-900">Modullar</h2>
          
          {modullar.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-slate-500">Hələ modul əlavə edilməyib</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {modullar.map((modul, index) => {
                const progress = irəliləyiş[modul.id] || { tamamlanmaFaizi: 0, izlənilənVideo: 0 };
                const tamamlanmış = progress.tamamlanmaFaizi >= 100;

                return (
                  <Card 
                    key={modul.id} 
                    className={`relative overflow-hidden transition-all hover:shadow-xl ${
                      tamamlanmış ? 'border-2 border-green-500' : ''
                    }`}
                  >
                    {tamamlanmış && (
                      <div className="absolute top-4 right-4">
                        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                          <CheckCircle2 className="h-6 w-6 text-white" />
                        </div>
                      </div>
                    )}

                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <Badge variant="outline" className="text-xs">
                          Modul {index + 1}
                        </Badge>
                        {modul.sira && (
                          <span className="text-xs text-slate-500">Sıra: {modul.sira}</span>
                        )}
                      </div>
                      <CardTitle className="text-xl mb-2">{modul.adAz || modul.ad || modul.modul?.adAz || 'Modul'}</CardTitle>
                      {(modul.təsvirAz || modul.təsvir || modul.modul?.təsvirAz) && (
                        <p className="text-sm text-slate-600 line-clamp-2">
                          {modul.təsvirAz || modul.təsvir || modul.modul?.təsvirAz}
                        </p>
                      )}
                    </CardHeader>

                    <CardContent>
                      <div className="space-y-4">
                        {/* Müddət və Video */}
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2 text-slate-600">
                            <Clock className="h-4 w-4" />
                            <span>{modul.müddətHəftə || 2} Həftə</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-600">
                            <Video className="h-4 w-4" />
                            <span>{modul.videoSayi || 0} Video</span>
                          </div>
                        </div>

                        {/* İrəliləyiş */}
                        {session?.user?.id && (
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-xs font-medium text-slate-600">
                                İrəliləyiş
                              </span>
                              <span className="text-xs font-bold text-amber-600">
                                {Math.round(progress.tamamlanmaFaizi)}%
                              </span>
                            </div>
                            <Progress value={progress.tamamlanmaFaizi} className="h-2" />
                            <p className="text-xs text-slate-500 mt-1">
                              {progress.izlənilənVideo || 0} / {modul.videoSayi || 0} video izlənilib
                            </p>
                          </div>
                        )}

                        {/* Düymə */}
                        <Link href={`/modullar/${modul.id}`}>
                          <Button 
                            className="w-full bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 hover:from-amber-600 hover:via-amber-700 hover:to-amber-600 text-white"
                            disabled={!modul.aktiv}
                          >
                            {tamamlanmış ? (
                              <>
                                <Award className="h-4 w-4 mr-2" />
                                Yenidən Bax
                              </>
                            ) : (
                              <>
                                <Play className="h-4 w-4 mr-2" />
                                Başla
                              </>
                            )}
                            <ArrowRight className="h-4 w-4 ml-2" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

