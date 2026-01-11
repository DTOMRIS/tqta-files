'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trophy, Award, Star, TrendingUp, Users, Crown, Zap, Target } from 'lucide-react';
import { toast } from 'sonner';
import { LEVELS, BADGES } from '@/constants/gamification';

export default function GamifikasiyaPage() {
  const { data: session } = useSession();
  const [xpData, setXpData] = useState(null);
  const [badges, setBadges] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [yukleniyor, setYukleniyor] = useState(true);

  useEffect(() => {
    if (!session?.user?.id) return;

    Promise.all([
      fetch('/api/gamification/xp').then(res => res.json()),
      fetch('/api/gamification/badges').then(res => res.json()),
      fetch('/api/gamification/leaderboard').then(res => res.json()),
    ])
      .then(([xpRes, badgesRes, leaderboardRes]) => {
        if (xpRes.ugur) setXpData(xpRes.melumat);
        if (badgesRes.ugur) setBadges(badgesRes.melumat || []);
        if (leaderboardRes.ugur) setLeaderboard(leaderboardRes.melumat || []);
      })
      .catch(err => {
        console.error('Gamification data yüklənərkən xəta:', err);
        toast.error('Məlumat yüklənərkən xəta baş verdi');
      })
      .finally(() => setYukleniyor(false));
  }, [session]);

  if (yukleniyor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Yüklənir...</p>
        </div>
      </div>
    );
  }

  const cariSeviye = xpData?.seviyye || 1;
  const cariXP = xpData?.xp || 0;
  const seviyeInfo = LEVELS.find(l => l.seviyye === cariSeviye) || LEVELS[0];
  const növbətiSeviye = LEVELS.find(l => l.seviyye === cariSeviye + 1);
  const seviyeProgress = növbətiSeviye
    ? ((cariXP - seviyeInfo.minXP) / (növbətiSeviye.minXP - seviyeInfo.minXP)) * 100
    : 100;

  const alinmisBadges = badges.filter(b => b.alindi);
  const alinmamisBadges = badges.filter(b => !b.alindi);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Başlıq */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-2 font-serif">
            Gamifikasiya
          </h1>
          <p className="text-slate-600">
            İrəliləyişinizi izləyin, rozetlər qazanın və liderlik cədvəlində yer tutun
          </p>
        </div>

        {/* XP və Səviyyə Kartı */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-amber-600" />
                XP və Səviyyə
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-slate-600">
                    Səviyyə {cariSeviye}: {seviyeInfo.ad}
                  </span>
                  <span className="text-sm font-bold text-amber-600">
                    {cariXP} XP
                  </span>
                </div>
                <Progress value={seviyeProgress} className="h-3" />
                {növbətiSeviye && (
                  <p className="text-xs text-slate-500 mt-2">
                    Növbəti səviyyə üçün {növbətiSeviye.minXP - cariXP} XP lazımdır
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-slate-900 mb-1">
                    {xpData?.bugünküXP || 0}
                  </div>
                  <div className="text-sm text-slate-600">Bugünkü XP</div>
                </div>
                <div className="bg-slate-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-slate-900 mb-1">
                    {xpData?.həftəlikXP || 0}
                  </div>
                  <div className="text-sm text-slate-600">Həftəlik XP</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-amber-600" />
                Statistika
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-2xl font-bold text-slate-900 mb-1">
                  {alinmisBadges.length} / {badges.length}
                </div>
                <div className="text-sm text-slate-600">Rozet</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900 mb-1">
                  {xpData?.ümumiVideo || 0}
                </div>
                <div className="text-sm text-slate-600">İzlənilən Video</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900 mb-1">
                  {xpData?.tamamlanmışModul || 0}
                </div>
                <div className="text-sm text-slate-600">Tamamlanmış Modul</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="rozetler" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="rozetler">Rozetlər</TabsTrigger>
            <TabsTrigger value="liderlik">Liderlik</TabsTrigger>
            <TabsTrigger value="irəliləyiş">İrəliləyiş</TabsTrigger>
          </TabsList>

          {/* Rozetlər Tab */}
          <TabsContent value="rozetler" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Alınmış Rozetlər ({alinmisBadges.length})
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {alinmisBadges.map((badge) => {
                  const badgeInfo = BADGES.find(b => b.kod === badge.badgeKod);
                  if (!badgeInfo) return null;
                  
                  return (
                    <Card key={badge.id} className="relative overflow-hidden border-2 border-amber-500">
                      <CardContent className="p-6 text-center">
                        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center">
                          <Award className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="font-bold text-slate-900 mb-2">{badgeInfo.ad}</h3>
                        <p className="text-sm text-slate-600 mb-2">{badgeInfo.təsvir}</p>
                        <Badge className="bg-amber-100 text-amber-800">
                          +{badgeInfo.xp} XP
                        </Badge>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Alınmamış Rozetlər ({alinmamisBadges.length})
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {BADGES.filter(b => !alinmisBadges.find(ab => ab.badgeKod === b.kod)).map((badge) => (
                  <Card key={badge.kod} className="relative overflow-hidden opacity-60">
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-slate-200 rounded-full flex items-center justify-center">
                        <Award className="h-8 w-8 text-slate-400" />
                      </div>
                      <h3 className="font-bold text-slate-900 mb-2">{badge.ad}</h3>
                      <p className="text-sm text-slate-600 mb-2">{badge.təsvir}</p>
                      <Badge variant="outline" className="text-slate-500">
                        +{badge.xp} XP
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Liderlik Tab */}
          <TabsContent value="liderlik" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Users className="h-4 w-4 text-amber-600" />
                    Sinif Sıralaması
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {leaderboard
                      .filter(l => l.tip === 'sinif' || !l.tip)
                      .slice(0, 5)
                      .map((entry, index) => (
                        <div
                          key={entry.id}
                          className={`flex items-center justify-between p-3 rounded-lg ${
                            entry.studentId === parseInt(session?.user?.id) 
                              ? 'bg-amber-50 border-2 border-amber-500' 
                              : 'bg-slate-50'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="font-bold text-slate-900 w-6">
                              {index + 1}
                            </span>
                            <span className="text-slate-700">{entry.adSoyad}</span>
                          </div>
                          <span className="font-bold text-amber-600">{entry.xp} XP</span>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Crown className="h-4 w-4 text-amber-600" />
                    Məktəb Sıralaması
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {leaderboard
                      .filter(l => l.tip === 'məktəb' || !l.tip)
                      .slice(0, 5)
                      .map((entry, index) => (
                        <div
                          key={entry.id}
                          className={`flex items-center justify-between p-3 rounded-lg ${
                            entry.studentId === parseInt(session?.user?.id) 
                              ? 'bg-amber-50 border-2 border-amber-500' 
                              : 'bg-slate-50'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="font-bold text-slate-900 w-6">
                              {index + 1}
                            </span>
                            <span className="text-slate-700">{entry.adSoyad}</span>
                          </div>
                          <span className="font-bold text-amber-600">{entry.xp} XP</span>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <TrendingUp className="h-4 w-4 text-amber-600" />
                    Həftəlik Yarış
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {leaderboard
                      .filter(l => l.tip === 'həftəlik' || !l.tip)
                      .slice(0, 5)
                      .map((entry, index) => (
                        <div
                          key={entry.id}
                          className={`flex items-center justify-between p-3 rounded-lg ${
                            entry.studentId === parseInt(session?.user?.id) 
                              ? 'bg-amber-50 border-2 border-amber-500' 
                              : 'bg-slate-50'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="font-bold text-slate-900 w-6">
                              {index + 1}
                            </span>
                            <span className="text-slate-700">{entry.adSoyad}</span>
                          </div>
                          <span className="font-bold text-amber-600">{entry.xp} XP</span>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* İrəliləyiş Tab */}
          <TabsContent value="irəliləyiş" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-amber-600" />
                  Son Fəaliyyətlər
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-500 text-center py-8">
                  Fəaliyyət tarixçəsi tezliklə əlavə ediləcək
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

