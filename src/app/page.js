'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  FileText,
  BookOpen,
  CreditCard,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  Loader2
} from 'lucide-react';

export default function Home() {
  const [stats, setStats] = useState({
    yeniTelebeler: 0,
    toplamTelebe: 0,
    aktivKurslar: 0,
    aylikGelir: 0
  });
  const [sonAktiviteler, setSonAktiviteler] = useState([]);
  const [cthPending, setCthPending] = useState({ urgent: [], warning: [], normal: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Statistika, aktivitələr və CTH pending-ləri paralel çək
      const [statsRes, activitiesRes, cthRes] = await Promise.all([
        fetch('/api/stats'),
        fetch('/api/activities'),
        fetch('/api/cth/pending-registrations')
      ]);

      const statsData = await statsRes.json();
      const activitiesData = await activitiesRes.json();
      const cthData = await cthRes.json();

      if (statsData.success) {
        setStats(statsData.data);
      }

      if (activitiesData.success) {
        setSonAktiviteler(activitiesData.data);
      }

      if (cthData.success) {
        // CTH Filtresi: Sadece CTH/FOH veya İctimai İaşə olanları göster
        const filterCth = (list) => list.filter(s =>
          (s.kursId && (s.kursId.toLowerCase().includes('cth') || s.kursId.toLowerCase().includes('foh'))) ||
          (s.anaKategoriya === 'İctimai İaşə')
        );

        const filteredCthData = {
          urgent: filterCth(cthData.data.urgent),
          warning: filterCth(cthData.data.warning),
          normal: filterCth(cthData.data.normal),
          total: filterCth(cthData.data.urgent).length + filterCth(cthData.data.warning).length + filterCth(cthData.data.normal).length
        };

        setCthPending(filteredCthData);
      }

    } catch (err) {
      console.error('Dashboard data fetch error:', err);
      setError('Məlumatlar yüklənərkən xəta baş verdi');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <span className="ml-2 text-lg">Yüklənir...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <AlertCircle className="h-8 w-8 text-red-600" />
        <span className="ml-2 text-lg text-red-600">{error}</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Ana Panel (CTH v1.0)</h1>
          <p className="text-muted-foreground">Turan Gastro Egitim Sistemi - CTH Akreditasyon Paneli</p>
        </div>

        <div className="flex gap-3">
          <Link href="/telebe-qeydiyyat">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Users className="mr-2 h-4 w-4" />
              Yeni Telebe
            </Button>
          </Link>
          <Link href="/telebeler">
            <Button variant="outline">
              <Users className="mr-2 h-4 w-4" />
              Telebeler
            </Button>
          </Link>
          <Link href="/sened-idare">
            <Button variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              Senedler
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bu Ay Yeni Telebe</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.yeniTelebeler}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 text-green-500" /> Canlı məlumat
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Telebe</CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.toplamTelebe}</div>
            <p className="text-xs text-muted-foreground">Aktiv telebe sayi</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aktiv Kurslar</CardTitle>
            <BookOpen className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.aktivKurslar}</div>
            <p className="text-xs text-muted-foreground">Davam eden kurslar</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ayliq Gelir</CardTitle>
            <CreditCard className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.aylikGelir} AZN</div>
            <p className="text-xs text-muted-foreground">Bu ayin geliri</p>
          </CardContent>
        </Card>
      </div>

      {/* Sürətli Giriş */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link href="/telebe-qeydiyyat">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-blue-200">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center space-y-2">
                <Users className="h-10 w-10 text-blue-600" />
                <h3 className="font-semibold">Yeni Tələbə</h3>
                <p className="text-xs text-muted-foreground">Qeydiyyat formu</p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/akademik-takip">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-purple-200">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center space-y-2">
                <BookOpen className="h-10 w-10 text-purple-600" />
                <h3 className="font-semibold">Akademik Takip</h3>
                <p className="text-xs text-muted-foreground">Progress Tutorials</p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/qiymetlendirme">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-green-200">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center space-y-2">
                <FileText className="h-10 w-10 text-green-600" />
                <h3 className="font-semibold">Qiymətləndirmə</h3>
                <p className="text-xs text-muted-foreground">Not girişi</p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/iv-panel">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-orange-200">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center space-y-2">
                <CreditCard className="h-10 w-10 text-orange-600" />
                <h3 className="font-semibold">IV Panel</h3>
                <p className="text-xs text-muted-foreground">Internal Verification</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Son Aktiviteler</CardTitle>
            <CardDescription>Sistemdeki son islemler.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sonAktiviteler.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">Hələ aktivitə yoxdur</p>
              ) : (
                sonAktiviteler.map((aktivite) => (
                  <div key={aktivite.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-white rounded-full border">
                        {aktivite.tip === 'kayit' && <Users className="h-5 w-5 text-blue-500" />}
                        {aktivite.tip === 'odeme' && <CreditCard className="h-5 w-5 text-green-500" />}
                        {aktivite.tip === 'kurs' && <BookOpen className="h-5 w-5 text-purple-500" />}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{aktivite.mesaj}</p>
                        <p className="text-xs text-muted-foreground">{aktivite.zaman}</p>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-purple-500" />
              CTH Qeydiyyat Deadline-ləri
            </CardTitle>
            <CardDescription>14 gün qaydası - Təcili qeydiyyatlar</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {cthPending.total === 0 ? (
                <div className="text-center py-4 text-muted-foreground text-sm">
                  ✅ Bütün CTH tələbələri qeydiyyatdan keçib
                </div>
              ) : (
                <>
                  {/* URGENT - Gecikmiş və ya 3 gün qalıb */}
                  {cthPending.urgent.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-red-700 uppercase">🚨 Təcili ({cthPending.urgent.length})</p>
                      {cthPending.urgent.slice(0, 3).map(student => (
                        <div key={student.id} className="p-2 bg-red-50 border border-red-200 rounded text-xs">
                          <p className="font-semibold text-red-800">{student.ad} {student.soyad}</p>
                          <p className="text-red-600">
                            {student.isOverdue
                              ? `⚠️ GECİKMİŞ! (${Math.abs(student.daysLeft)} gün keçib)`
                              : `Son tarix: ${student.deadline} (${student.daysLeft} gün)`
                            }
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* WARNING - 4-7 gün */}
                  {cthPending.warning.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-yellow-700 uppercase">⚠️ Xəbərdarlıq ({cthPending.warning.length})</p>
                      {cthPending.warning.slice(0, 2).map(student => (
                        <div key={student.id} className="p-2 bg-yellow-50 border border-yellow-200 rounded text-xs">
                          <p className="font-semibold text-yellow-800">{student.ad} {student.soyad}</p>
                          <p className="text-yellow-600">Son: {student.deadline} ({student.daysLeft} gün)</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* NORMAL - 7+ gün */}
                  {cthPending.normal.length > 0 && (
                    <div className="p-2 bg-green-50 border border-green-200 rounded text-xs">
                      <p className="text-green-700">
                        ✅ {cthPending.normal.length} tələbə normal deadline-də
                      </p>
                    </div>
                  )}

                  {cthPending.total > 5 && (
                    <Link href="/cth-panel">
                      <Button variant="outline" size="sm" className="w-full mt-2">
                        Hamısını Gör ({cthPending.total})
                      </Button>
                    </Link>
                  )}
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}