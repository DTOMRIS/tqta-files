'use client';
import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, AlertTriangle, CheckCircle, Award } from 'lucide-react';

export default function CthPanel() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    // Verileri API'den Çek
    useEffect(() => {
        fetch('/api/cth/pending-registrations')
            .then(res => res.json())
            .then(data => {
                setStudents(Array.isArray(data) ? data : []); // Hata koruması
                setLoading(false);
            })
            .catch(err => console.error("Veri çekme hatası:", err));
    }, []);

    // Kalan Gün Hesaplayıcı (CTH 14 Gün Kuralı)
    const calculateDaysLeft = (startDateString) => {
        if (!startDateString) return 0;
        const start = new Date(startDateString);
        const deadline = new Date(start);
        deadline.setDate(deadline.getDate() + 14); // 2 Hafta ekle 

        const today = new Date();
        const diffTime = deadline - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    return (
        <div className="p-6 space-y-6 bg-slate-50 min-h-screen">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-purple-900 flex items-center gap-2">
                        <Award className="h-8 w-8" /> CTH Operasyon Merkezi
                    </h1>
                    <p className="text-purple-600">London CTH Kayıt ve Sertifikasyon Takibi</p>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm text-center border">
                    <span className="block text-2xl font-bold text-purple-700">{students.length}</span>
                    <span className="text-xs text-gray-500 uppercase">Bekleyen Kayıt</span>
                </div>
            </div>

            {/* 1. ACİL DURUM LİSTESİ (14 GÜN KURALI) */}
            <Card className="border-t-4 border-t-purple-600 shadow-md">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-purple-600" />
                        Kayıt Bekleyenler (14 Gün Kuralı)
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <p>Yüklənir...</p>
                    ) : students.length === 0 ? (
                        <div className="text-center p-8 text-gray-400">
                            <CheckCircle className="h-12 w-12 mx-auto mb-2 opacity-20" />
                            <p>Təbrikler! Bütün tələbələr CTH portalına işlənib.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-purple-50 text-purple-900 font-semibold">
                                    <tr>
                                        <th className="p-3 rounded-tl-lg">Tələbə</th>
                                        <th className="p-3">Başlama Tarixi</th>
                                        <th className="p-3">Dil (IELTS)</th>
                                        <th className="p-3">Status / Kalan Gün</th>
                                        <th className="p-3 text-right rounded-tr-lg">Əməliyyat</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {students.map((student) => {
                                        const daysLeft = calculateDaysLeft(student.enrollmentDate);
                                        let statusColor = "bg-green-100 text-green-800";
                                        let statusText = `${daysLeft} Gün Qalıb`;

                                        if (daysLeft < 0) {
                                            statusColor = "bg-red-100 text-red-800 font-bold";
                                            statusText = `SÜRESİ GEÇTİ (${Math.abs(daysLeft)} gün)`;
                                        } else if (daysLeft <= 3) {
                                            statusColor = "bg-orange-100 text-orange-800 font-bold";
                                            statusText = `KRİTİK: ${daysLeft} Gün!`;
                                        }

                                        return (
                                            <tr key={student.id} className="hover:bg-gray-50">
                                                <td className="p-3">
                                                    <div className="font-medium">{student.ad} {student.soyad}</div>
                                                    <div className="text-xs text-gray-500">{student.telefon}</div>
                                                </td>
                                                <td className="p-3">
                                                    {student.enrollmentDate ? new Date(student.enrollmentDate).toLocaleDateString() : '-'}
                                                </td>
                                                <td className="p-3">
                                                    <span className="px-2 py-1 bg-gray-100 rounded text-xs font-mono">
                                                        {student.englishLevel || 'N/A'}
                                                    </span>
                                                </td>
                                                <td className="p-3">
                                                    <span className={`px-2 py-1 rounded text-xs flex items-center gap-1 w-fit ${statusColor}`}>
                                                        {daysLeft <= 3 && <AlertTriangle size={12} />}
                                                        {statusText}
                                                    </span>
                                                </td>
                                                <td className="p-3 text-right">
                                                    <Button size="sm" variant="outline" className="text-purple-700 border-purple-200 hover:bg-purple-50">
                                                        Qeydiyyat Formu (PDF)
                                                    </Button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* 2. CTH İŞ AKIŞ BİLGİSİ */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <h3 className="font-bold text-blue-800 mb-2">1. Qeydiyyat (Membership)</h3>
                    <p className="text-xs text-blue-600">
                        Dərs başlayandan 14 gün ərzində tələbə CTH portalına düşməlidir. Ömürlük "CTH Number" alınır.
                    </p>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
                    <h3 className="font-bold text-orange-800 mb-2">2. İmtahan Girişi</h3>
                    <p className="text-xs text-orange-600">
                        İmtahan tarixlərinə 6 həftə qalmış "Assessment Registration" edilməlidir.
                    </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                    <h3 className="font-bold text-green-800 mb-2">3. Nəticələr</h3>
                    <p className="text-xs text-green-600">
                        Assignmentlər Turnitin-dən keçirilməli, IV (Daxili Yoxlama) edilməli və CTH-ə göndərilməlidir.
                    </p>
                </div>
            </div>
        </div>
    );
}
