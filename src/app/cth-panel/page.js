'use client';
import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, AlertTriangle, CheckCircle, Award, Download } from 'lucide-react';
import * as XLSX from 'xlsx';

export default function CthPanel() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    // Verileri API'den Çek
    useEffect(() => {
        fetch('/api/cth/pending-registrations')
            .then(res => res.json())
            .then(data => {
                console.log("Gelen Veri:", data); // Konsola yaz
                setStudents(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch(err => console.error("Veri çekme hatası:", err));
    }, []);

    // Kalan Gün Hesaplayıcı
    const calculateDaysLeft = (startDateString) => {
        if (!startDateString) return 0;
        const start = new Date(startDateString);
        const deadline = new Date(start);
        deadline.setDate(deadline.getDate() + 14);
        const today = new Date();
        const diffTime = deadline - today;
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    };

    // --- EXCEL İNDİRME FONKSİYONU ---
    const handleExportCTH = () => {
        // 1. KONTROL: Veri var mı?
        if (students.length === 0) {
            alert("⚠️ İndirilecek veri tapılmadı! Listede tələbə yoxdur.");
            return;
        }

        try {
            // 2. Veriyi Hazırla
            const cthData = students.map(s => ({
                "CTH Number": s.cthStudentNumber || "NEW",
                "Title": "Mr/Ms",
                "First Name": s.ad,
                "Surname": s.soyad,
                "Gender": "M/F",
                "DOB (dd/mm/yyyy)": s.dogumTarihi ? new Date(s.dogumTarihi).toLocaleDateString('en-GB') : "",
                "Email": s.email || "",
                "Course": "Culinary L2"
            }));

            // 3. Excel Sayfasını Oluştur (Header Boşluğu ile)
            const emptyRows = Array(21).fill({}); // 21 Satır boşluk
            const finalData = [...emptyRows, ...cthData];

            const ws = XLSX.utils.json_to_sheet(finalData, { skipHeader: true });

            // Başlıkları 22. Satıra Ekle
            XLSX.utils.sheet_add_aoa(ws, [[
                "CTH Number", "Title", "First Name", "Surname", "Gender", "DOB", "Email", "Course"
            ]], { origin: "A22" });

            // Verileri 23. Satırdan Başlat
            XLSX.utils.sheet_add_json(ws, cthData, { origin: "A23", skipHeader: true });

            // 4. Dosyayı Oluştur ve İndir
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Registration Entry");

            const fileName = `CTH_Upload_${new Date().toISOString().slice(0, 10)}.xlsx`;
            XLSX.writeFile(wb, fileName);

            alert("✅ Excel uğurla endirildi!");

        } catch (error) {
            console.error("Excel hatası:", error);
            alert("❌ Xəta baş verdi: " + error.message);
        }
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

                {/* BUTON */}
                <Button
                    onClick={handleExportCTH}
                    className="bg-green-600 hover:bg-green-700 text-white gap-2 shadow-lg"
                >
                    <Download size={20} />
                    CTH Hub Excel İndir
                </Button>
            </div>

            {/* LİSTE GÖRÜNÜMÜ */}
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
                                        <th className="p-3">Tələbə</th>
                                        <th className="p-3">Başlama Tarixi</th>
                                        <th className="p-3">Dil (IELTS)</th>
                                        <th className="p-3">Status / Kalan Gün</th>
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
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
