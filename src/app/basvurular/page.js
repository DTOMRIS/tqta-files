'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  CheckCircle,
  XCircle,
  Clock,
  User,
  Phone,
  Mail,
  Calendar,
  FileText,
  Download,
  Filter,
  TrendingUp,
  Users,
  AlertCircle
} from 'lucide-react';

export default function BasvurularPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Örnek başvuru verileri (gerçekte API'den gelecek)
  const basvurular = [
    {
      id: 1,
      ad: 'Əli',
      soyad: 'Məmmədov',
      telefon: '+994 50 123 45 67',
      email: 'eli@example.com',
      program: 'Aşpaz Bacarıqları',
      tarix: '2025-01-15',
      status: 'pending',
      qeydiyyatTarixi: '2025-01-10'
    },
    {
      id: 2,
      ad: 'Leyla',
      soyad: 'Həsənova',
      telefon: '+994 51 234 56 78',
      email: 'leyla@example.com',
      program: 'Barista Bacarıqları',
      tarix: '2025-01-20',
      status: 'approved',
      qeydiyyatTarixi: '2025-01-12'
    },
    {
      id: 3,
      ad: 'Rəşad',
      soyad: 'Quliyev',
      telefon: '+994 55 345 67 89',
      email: 'rashad@example.com',
      program: 'Restoran Xidməti',
      tarix: '2025-01-25',
      status: 'rejected',
      qeydiyyatTarixi: '2025-01-14'
    }
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-50 text-green-700 border-green-200">Təsdiqlənmiş</Badge>;
      case 'rejected':
        return <Badge className="bg-red-50 text-red-700 border-red-200">Rədd edilmiş</Badge>;
      case 'pending':
        return <Badge className="bg-amber-50 text-amber-700 border-amber-200">Gözləyir</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const filteredBasvurular = basvurular.filter(basvuru => {
    const matchesSearch = 
      basvuru.ad.toLowerCase().includes(searchTerm.toLowerCase()) ||
      basvuru.soyad.toLowerCase().includes(searchTerm.toLowerCase()) ||
      basvuru.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      basvuru.telefon.includes(searchTerm);
    
    const matchesFilter = filterStatus === 'all' || basvuru.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: basvurular.length,
    pending: basvurular.filter(b => b.status === 'pending').length,
    approved: basvurular.filter(b => b.status === 'approved').length,
    rejected: basvurular.filter(b => b.status === 'rejected').length,
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Header - CTH/Escoffier Style */}
      <div className="bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-amber-400 text-sm uppercase tracking-widest mb-2 font-medium">
                Tələbə İdarəetməsi
              </p>
              <h1 className="text-4xl md:text-5xl font-serif mb-3">
                Başvuru Yönetimi
              </h1>
              <p className="text-slate-300 text-lg max-w-2xl">
                Tələbə başvurularını görüntüləyin, dəyərləndirin və qərar verin
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards - Premium Style */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-l-4 border-l-slate-400 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 mb-1">Ümumi Başvuru</p>
                  <p className="text-3xl font-bold text-slate-900">{stats.total}</p>
                </div>
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-slate-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-amber-500 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 mb-1">Gözləyir</p>
                  <p className="text-3xl font-bold text-amber-600">{stats.pending}</p>
                </div>
                <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center">
                  <Clock className="h-6 w-6 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 mb-1">Təsdiqlənmiş</p>
                  <p className="text-3xl font-bold text-green-600">{stats.approved}</p>
                </div>
                <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-red-500 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 mb-1">Rədd edilmiş</p>
                  <p className="text-3xl font-bold text-red-600">{stats.rejected}</p>
                </div>
                <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center">
                  <XCircle className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters - Premium Style */}
        <Card className="mb-6 border-slate-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <Input
                    placeholder="Ad, soyad, email və ya telefon ilə axtar..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-12 border-slate-300 focus:border-amber-500 focus:ring-amber-500"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={filterStatus === 'all' ? 'default' : 'outline'}
                  onClick={() => setFilterStatus('all')}
                  className={filterStatus === 'all' ? 'bg-amber-600 hover:bg-amber-700' : ''}
                >
                  Hamısı
                </Button>
                <Button
                  variant={filterStatus === 'pending' ? 'default' : 'outline'}
                  onClick={() => setFilterStatus('pending')}
                  className={filterStatus === 'pending' ? 'bg-amber-600 hover:bg-amber-700' : ''}
                >
                  <Clock className="h-4 w-4 mr-2" />
                  Gözləyir
                </Button>
                <Button
                  variant={filterStatus === 'approved' ? 'default' : 'outline'}
                  onClick={() => setFilterStatus('approved')}
                  className={filterStatus === 'approved' ? 'bg-green-600 hover:bg-green-700' : ''}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Təsdiqlənmiş
                </Button>
                <Button
                  variant={filterStatus === 'rejected' ? 'default' : 'outline'}
                  onClick={() => setFilterStatus('rejected')}
                  className={filterStatus === 'rejected' ? 'bg-red-600 hover:bg-red-700 text-white' : ''}
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Rədd edilmiş
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Başvurular Listesi - Premium Cards */}
        <div className="space-y-4">
          {filteredBasvurular.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <AlertCircle className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-500 text-lg">Heç bir başvuru tapılmadı</p>
              </CardContent>
            </Card>
          ) : (
            filteredBasvurular.map((basvuru) => (
              <Card key={basvuru.id} className="hover:shadow-lg transition-all border-slate-200">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          {basvuru.ad[0]}{basvuru.soyad[0]}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-bold text-xl text-slate-900">
                              {basvuru.ad} {basvuru.soyad}
                            </h3>
                            {getStatusBadge(basvuru.status)}
                          </div>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
                            <span className="flex items-center gap-2">
                              <Phone className="h-4 w-4" />
                              {basvuru.telefon}
                            </span>
                            <span className="flex items-center gap-2">
                              <Mail className="h-4 w-4" />
                              {basvuru.email}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-slate-200">
                            <FileText className="h-5 w-5 text-slate-600" />
                          </div>
                          <div>
                            <p className="text-xs text-slate-500 mb-1">Proqram</p>
                            <p className="font-semibold text-slate-900">{basvuru.program}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-slate-200">
                            <Calendar className="h-5 w-5 text-slate-600" />
                          </div>
                          <div>
                            <p className="text-xs text-slate-500 mb-1">Qeydiyyat</p>
                            <p className="font-semibold text-slate-900">{basvuru.qeydiyyatTarixi}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-slate-200">
                            <Calendar className="h-5 w-5 text-slate-600" />
                          </div>
                          <div>
                            <p className="text-xs text-slate-500 mb-1">Başlama Tarixi</p>
                            <p className="font-semibold text-slate-900">{basvuru.tarix}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 ml-6">
                      {basvuru.status === 'pending' && (
                        <>
                          <Button 
                            className="bg-green-600 hover:bg-green-700 text-white"
                            onClick={async () => {
                              await fetch('/api/context/events', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                  entityType: 'application',
                                  entityId: basvuru.id.toString(),
                                  eventType: 'decision',
                                  actor: 'current_user',
                                  action: 'approved',
                                  reasoning: `Başvuru təsdiqləndi. Proqram: ${basvuru.program}`,
                                  context: {
                                    program: basvuru.program,
                                    studentName: `${basvuru.ad} ${basvuru.soyad}`
                                  },
                                  outcome: 'application_approved'
                                })
                              });
                            }}
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Təsdiqlə
                          </Button>
                          <Button 
                            variant="outline"
                            className="border-red-300 text-red-600 hover:bg-red-50"
                            onClick={async () => {
                              await fetch('/api/context/events', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                  entityType: 'application',
                                  entityId: basvuru.id.toString(),
                                  eventType: 'decision',
                                  actor: 'current_user',
                                  action: 'rejected',
                                  reasoning: 'Başvuru rədd edildi',
                                  context: {
                                    program: basvuru.program,
                                    studentName: `${basvuru.ad} ${basvuru.soyad}`
                                  },
                                  outcome: 'application_rejected'
                                })
                              });
                            }}
                          >
                            <XCircle className="h-4 w-4 mr-2" />
                            Rədd Et
                          </Button>
                        </>
                      )}
                      <Button variant="outline" size="sm" className="border-slate-300">
                        <Download className="h-4 w-4 mr-2" />
                        Yüklə
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
