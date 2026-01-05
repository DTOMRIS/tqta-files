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
      setError(null);

      // Statistika, aktivitələr və CTH pending-ləri paralel çək
      const [statsRes, activitiesRes, cthRes] = await Promise.all([
        fetch('/api/stats'),
        fetch('/api/activities'),
        fetch('/api/cth/pending-registrations')
      ]);

      if (!statsRes.ok || !activitiesRes.ok || !cthRes.ok) {
        throw new Error('API sorğularında xəta baş verdi');
      }

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
      setError(err instanceof Error ? err.message : 'Məlumatlar yüklənərkən xəta baş verdi');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <span className="text-lg text-muted-foreground font-medium">Yüklənir...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-96 space-y-4">
        <div className="h-16 w-16 rounded-full bg-destructive/10 flex items-center justify-center">
          <AlertCircle className="h-8 w-8 text-destructive" />
        </div>
        <span className="text-lg text-foreground font-semibold">{error}</span>
        <Button onClick={fetchDashboardData} variant="outline" className="mt-2">
          Yenidən cəhd et
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6 md:p-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Ana Panel</h1>
          <p className="text-muted-foreground mt-1">Turan Gastro Egitim Sistemi - CTH Akreditasyon Paneli</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href="/telebe-qeydiyyat">
            <Button>
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

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="card-elevated hover-lift border-l-4 border-l-primary-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-muted-foreground">Bu Ay Yeni Telebe</CardTitle>
            <div className="h-10 w-10 rounded-lg bg-primary-100 flex items-center justify-center">
              <Users className="h-5 w-5 text-primary-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{stats.yeniTelebeler}</div>
            <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-success" /> 
              <span>Canlı məlumat</span>
            </p>
          </CardContent>
        </Card>

        <Card className="card-elevated hover-lift border-l-4 border-l-secondary-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-muted-foreground">Toplam Telebe</CardTitle>
            <div className="h-10 w-10 rounded-lg bg-secondary-100 flex items-center justify-center">
              <Users className="h-5 w-5 text-secondary-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{stats.toplamTelebe}</div>
            <p className="text-xs text-muted-foreground mt-2">Aktiv telebe sayi</p>
          </CardContent>
        </Card>

        <Card className="card-elevated hover-lift border-l-4 border-l-success">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-muted-foreground">Aktiv Kurslar</CardTitle>
            <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center">
              <BookOpen className="h-5 w-5 text-success" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{stats.aktivKurslar}</div>
            <p className="text-xs text-muted-foreground mt-2">Davam eden kurslar</p>
          </CardContent>
        </Card>

        <Card className="card-elevated hover-lift border-l-4 border-l-warning">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-muted-foreground">Ayliq Gelir</CardTitle>
            <div className="h-10 w-10 rounded-lg bg-orange-100 flex items-center justify-center">
              <CreditCard className="h-5 w-5 text-warning" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{stats.aylikGelir} AZN</div>
            <p className="text-xs text-muted-foreground mt-2">Bu ayin geliri</p>
          </CardContent>
        </Card>
      </div>

      {/* Sürətli Giriş */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">Sürətli Giriş</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link href="/telebe-qeydiyyat">
            <Card className="card-elevated hover-lift cursor-pointer group border-2 border-transparent hover:border-primary-200">
              <CardContent className="pt-6 pb-6">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="h-14 w-14 rounded-xl bg-primary-100 flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                    <Users className="h-7 w-7 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Yeni Tələbə</h3>
                    <p className="text-xs text-muted-foreground mt-1">Qeydiyyat formu</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/akademik-takip">
            <Card className="card-elevated hover-lift cursor-pointer group border-2 border-transparent hover:border-secondary-200">
              <CardContent className="pt-6 pb-6">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="h-14 w-14 rounded-xl bg-secondary-100 flex items-center justify-center group-hover:bg-secondary-200 transition-colors">
                    <BookOpen className="h-7 w-7 text-secondary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Akademik Takip</h3>
                    <p className="text-xs text-muted-foreground mt-1">Progress Tutorials</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/qiymetlendirme">
            <Card className="card-elevated hover-lift cursor-pointer group border-2 border-transparent hover:border-green-200">
              <CardContent className="pt-6 pb-6">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="h-14 w-14 rounded-xl bg-green-100 flex items-center justify-center group-hover:bg-green-200 transition-colors">
                    <FileText className="h-7 w-7 text-success" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Qiymətləndirmə</h3>
                    <p className="text-xs text-muted-foreground mt-1">Not girişi</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/iv-panel">
            <Card className="card-elevated hover-lift cursor-pointer group border-2 border-transparent hover:border-orange-200">
              <CardContent className="pt-6 pb-6">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="h-14 w-14 rounded-xl bg-orange-100 flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                    <CreditCard className="h-7 w-7 text-warning" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">IV Panel</h3>
                    <p className="text-xs text-muted-foreground mt-1">Internal Verification</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 card-elevated">
          <CardHeader>
            <CardTitle className="text-xl">Son Aktiviteler</CardTitle>
            <CardDescription>Sistemdeki son islemler</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {sonAktiviteler.length === 0 ? (
                <div className="text-center py-12">
                  <div className="inline-flex h-12 w-12 rounded-full bg-muted items-center justify-center mb-4">
                    <FileText className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground">Hələ aktivitə yoxdur</p>
                </div>
              ) : (
                sonAktiviteler.map((aktivite) => (
                  <div key={aktivite.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border hover:bg-muted transition-colors group">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-lg bg-white border flex items-center justify-center group-hover:scale-110 transition-transform">
                        {aktivite.tip === 'kayit' && <Users className="h-5 w-5 text-primary-600" />}
                        {aktivite.tip === 'odeme' && <CreditCard className="h-5 w-5 text-success" />}
                        {aktivite.tip === 'kurs' && <BookOpen className="h-5 w-5 text-secondary-600" />}
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-foreground">{aktivite.mesaj}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{aktivite.zaman}</p>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" />
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <div className="h-8 w-8 rounded-lg bg-warning/10 flex items-center justify-center">
                <AlertCircle className="h-5 w-5 text-warning" />
              </div>
              CTH Qeydiyyat Deadline-ləri
            </CardTitle>
            <CardDescription>14 gün qaydası - Təcili qeydiyyatlar</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {cthPending.total === 0 ? (
                <div className="text-center py-8">
                  <div className="inline-flex h-12 w-12 rounded-full bg-success/10 items-center justify-center mb-3">
                    <span className="text-2xl">✅</span>
                  </div>
                  <p className="text-sm text-muted-foreground font-medium">Bütün CTH tələbələri qeydiyyatdan keçib</p>
                </div>
              ) : (
                <>
                  {/* URGENT - Gecikmiş və ya 3 gün qalıb */}
                  {cthPending.urgent.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-xs font-bold text-destructive uppercase tracking-wider">🚨 Təcili ({cthPending.urgent.length})</p>
                      {cthPending.urgent.slice(0, 3).map(student => (
                        <div key={student.id} className="p-3 bg-destructive/5 border-l-4 border-l-destructive rounded-lg">
                          <p className="font-semibold text-sm text-foreground">{student.ad} {student.soyad}</p>
                          <p className="text-xs text-destructive mt-1">
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
                      <p className="text-xs font-bold text-warning uppercase tracking-wider">⚠️ Xəbərdarlıq ({cthPending.warning.length})</p>
                      {cthPending.warning.slice(0, 2).map(student => (
                        <div key={student.id} className="p-3 bg-warning/5 border-l-4 border-l-warning rounded-lg">
                          <p className="font-semibold text-sm text-foreground">{student.ad} {student.soyad}</p>
                          <p className="text-xs text-warning mt-1">Son: {student.deadline} ({student.daysLeft} gün)</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* NORMAL - 7+ gün */}
                  {cthPending.normal.length > 0 && (
                    <div className="p-3 bg-success/5 border-l-4 border-l-success rounded-lg">
                      <p className="text-sm text-success font-semibold">
                        ✅ {cthPending.normal.length} tələbə normal deadline-də
                      </p>
                    </div>
                  )}

                  {cthPending.total > 5 && (
                    <Link href="/cth-panel">
                      <Button variant="outline" size="sm" className="w-full mt-3">
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