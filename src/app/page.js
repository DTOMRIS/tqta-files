'use client';

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
  AlertCircle
} from 'lucide-react';

export default function Home() {
  const stats = {
    yeniTelebeler: 12,
    toplamTelebe: 156,
    aktivKurslar: 8,
    aylikGelir: 4500
  };

  const sonAktiviteler = [
    { id: 1, tip: 'kayit', mesaj: 'Yeni telebe: Ayse Memmedova', zaman: '10 deqiqe evvel' },
    { id: 2, tip: 'odeme', mesaj: 'Odenis alindi: 150 AZN', zaman: '1 saat evvel' },
    { id: 3, tip: 'kurs', mesaj: 'Aspazliq kursu basladi', zaman: '3 saat evvel' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Ana Panel</h1>
          <p className="text-muted-foreground">Turan Gastro Egitim Sistemine hos geldiniz.</p>
        </div>
        
        <div className="flex gap-3">
          <Link href="/telebe-qeydiyyat">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Users className="mr-2 h-4 w-4" />
              Yeni Telebe
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
              <TrendingUp className="inline h-3 w-3 text-green-500" /> 20% artis
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Son Aktiviteler</CardTitle>
            <CardDescription>Sistemdeki son islemler.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sonAktiviteler.map((aktivite) => (
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
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-yellow-500" />
              Bildirisler
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-yellow-50 border border-yellow-100 rounded-md">
                <p className="text-sm text-yellow-800 font-medium">5 telebenin odenis tarixi yaxinlasir</p>
              </div>
              <div className="p-3 bg-blue-50 border border-blue-100 rounded-md">
                <p className="text-sm text-blue-800 font-medium">Sabah baslayacaq 2 kurs var</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}