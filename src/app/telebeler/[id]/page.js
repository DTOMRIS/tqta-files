'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, ArrowLeft, User, Phone, Mail, MapPin, Calendar, Clock, CheckCircle, XCircle, AlertTriangle, FolderArchive, FileText } from 'lucide-react';

export default function StudentProfilePage() {
    const params = useParams();
    const router = useRouter();
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [attendanceStats, setAttendanceStats] = useState({ total: 0, present: 0, absent: 0 });

    useEffect(() => {
        if (params.id) {
            fetchData();
        }
    }, [params.id]);

    const fetchData = async () => {
        try {
            setLoading(true);

            // 1. Öğrenci Bilgileri
            const studentRes = await fetch(`/api/students/${params.id}`);
            const studentData = await studentRes.json();

            if (studentData.success) {
                setStudent(studentData.data);
            }

            // 2. Devamsızlık Bilgileri
            const attendanceRes = await fetch(`/api/attendance?studentId=${params.id}`);
            const attendanceData = await attendanceRes.json();

            if (attendanceData.success) {
                const total = attendanceData.data.length;
                const present = attendanceData.data.filter(r => r.status === 'PRESENT').length;
                const absent = attendanceData.data.filter(r => r.status === 'ABSENT').length;
                setAttendanceStats({ total, present, absent });
            }

        } catch (error) {
            console.error("Veri çekme hatası:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
        );
    }

    if (!student) {
        return <div className="p-8 text-center">Öğrenci bulunamadı.</div>;
    }

    return (
        <div className="space-y-6 p-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" onClick={() => router.back()}>
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        {student.ad} {student.soyad}
                        {student.aktif ? (
                            <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Aktif</Badge>
                        ) : (
                            <Badge variant="destructive">Pasif</Badge>
                        )}
                    </h1>
                    <p className="text-muted-foreground">{student.anaKategoriya} - {student.kursId}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* SOL KOLON: Profil & İletişim */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <User className="h-5 w-5 text-blue-600" />
                                Kişisel Bilgiler
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Mail className="h-4 w-4 text-gray-400" />
                                <span className="text-sm">{student.email}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone className="h-4 w-4 text-gray-400" />
                                <span className="text-sm">{student.telefon}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <MapPin className="h-4 w-4 text-gray-400" />
                                <span className="text-sm">{student.evUnvani || 'Adres girilmemiş'}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Calendar className="h-4 w-4 text-gray-400" />
                                <span className="text-sm">Doğum: {student.dogumTarixi || '-'}</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* DEVAMSIZLIK KARTI */}
                    <Card className="border-t-4 border-t-blue-600">
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Clock className="h-5 w-5 text-blue-600" />
                                Devamsızlık Durumu
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-100">
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="h-5 w-5 text-green-600" />
                                    <span className="font-medium text-green-900">Katıldığı</span>
                                </div>
                                <span className="font-bold text-green-700 text-lg">{attendanceStats.present} Ders</span>
                            </div>

                            <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg border border-red-100">
                                <div className="flex items-center gap-2">
                                    <XCircle className="h-5 w-5 text-red-600" />
                                    <span className="font-medium text-red-900">Gelmediği</span>
                                </div>
                                <span className="font-bold text-red-700 text-lg">{attendanceStats.absent} Ders</span>
                            </div>

                            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                                <div className="flex items-center gap-2">
                                    <AlertTriangle className="h-5 w-5 text-gray-600" />
                                    <span className="font-medium text-gray-900">Toplam</span>
                                </div>
                                <span className="font-bold text-gray-700 text-lg">{attendanceStats.total} Ders</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* SAĞ KOLON: Diğer Detaylar */}
                <div className="md:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Eğitim Detayları</CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-2 gap-4">
                            <div>
                                <span className="text-sm text-gray-500 block">Eğitim Formatı</span>
                                <span className="font-medium">{student.tehsilFormati}</span>
                            </div>
                            <div>
                                <span className="text-sm text-gray-500 block">Eğitim Dili</span>
                                <span className="font-medium">{student.telimDili}</span>
                            </div>
                            <div>
                                <span className="text-sm text-gray-500 block">Başlama Tarihi</span>
                                <span className="font-medium">{student.baslamaTarixi}</span>
                            </div>
                            <div>
                                <span className="text-sm text-gray-500 block">Kayıt Tarihi</span>
                                <span className="font-medium">{new Date(student.kayitTarihi).toLocaleDateString('tr-TR')}</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* ÖRNEK FOLDER YAPISI (HATA BURADAYDI, DÜZELTİLDİ) */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Button variant="ghost" size="icon">
                                    <FolderArchive size={18} />
                                </Button>
                                <span className="flex items-center gap-2">
                                    <FileText size={18} className="text-blue-500" />
                                    Portfolio & Recipe Logs
                                </span>
                            </CardTitle>
                            <CardDescription>Tələbənin hazırladığı yeməklərin fotosu və resept kartları.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="p-4 bg-gray-50 border rounded-lg text-center text-sm text-gray-400">
                                Henüz dosya yüklenmemiş.
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
