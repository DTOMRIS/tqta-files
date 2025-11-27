'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation'; // ID'yi URL'den almak için
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, FileText, Video, Save, CheckCircle, AlertTriangle } from 'lucide-react';

export default function StudentDetailPage() {
    const params = useParams(); // URL'deki [id] yi alır
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [cthNo, setCthNo] = useState('');

    // 1. Öğrenci Verisini Çek
    useEffect(() => {
        // Burada gerçek API'ye bağlanacağız, şimdilik simüle ediyoruz
        // Normalde: fetch(`/api/students/${params.id}`)...
        console.log("Öğrenci ID:", params.id);

        // Geçici veri (API bağlanana kadar boş kalmasın diye)
        setStudent({
            id: params.id,
            ad: "Yüklənir...",
            soyad: "",
            bolum: "Aşpazlıq L2",
            enrollmentDate: new Date().toISOString()
        });
        setLoading(false);
    }, [params.id]);

    // 2. CTH Numarasını Kaydetme (Süreyi Durdurur)
    const handleSaveCth = async () => {
        if (!cthNo) return alert("Zəhmət olmasa nömrə daxil edin!");

        // API'ye gönderme kodu buraya gelecek
        // await fetch('/api/students/update-cth', { ... })

        alert(`✅ CTH Nömrəsi (${cthNo}) yadda saxlanıldı! 14 Günlük sayğac dayandırıldı.`);
    };

    if (loading) return <div className="p-10">Yüklənir...</div>;

    return (
        <div className="p-6 space-y-6 bg-slate-50 min-h-screen">

            {/* BAŞLIK VE ÖZET */}
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">{student?.ad} {student?.soyad}</h1>
                    <p className="text-slate-500">Tələbə Profili və Kanıt (Evidence) Dosyası</p>
                </div>
                <Button variant="outline" className="gap-2">
                    <User size={16} /> Profil Düzəliş
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* SOL: CTH DURUMU (Kritik Bölge) */}
                <Card className="border-t-4 border-t-purple-600 h-fit">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            CTH Statusu
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="p-3 bg-orange-50 border border-orange-200 rounded text-sm text-orange-800 flex items-start gap-2">
                            <AlertTriangle size={16} className="mt-0.5" />
                            <div>
                                <span className="font-bold">Qeydiyyat Gözlənilir</span>
                                <p className="text-xs mt-1">Dərs başlama: {new Date(student?.enrollmentDate).toLocaleDateString()}</p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>CTH Student Number</Label>
                            <div className="flex gap-2">
                                <Input
                                    placeholder="Örn: 12345678"
                                    value={cthNo}
                                    onChange={(e) => setCthNo(e.target.value)}
                                />
                                <Button onClick={handleSaveCth} size="icon" className="bg-purple-600 hover:bg-purple-700">
                                    <Save size={18} />
                                </Button>
                            </div>
                            <p className="text-xs text-slate-400">
                                * Nömrə girildikdə "Geç Kayıt Cezası" riski aradan qalxır.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* SAĞ: EVIDENCE & PORTFOLIO (CTH Kuralı: Chapter 5) */}
                <div className="lg:col-span-2">
                    <Tabs defaultValue="evidence" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="evidence">📂 Kanıtlar (Evidence)</TabsTrigger>
                            <TabsTrigger value="academic">🎓 Akademik</TabsTrigger>
                            <TabsTrigger value="payments">💰 Ödənişlər</TabsTrigger>
                        </TabsList>

                        {/* EVIDENCE SEKME İÇERİĞİ */}
                        <TabsContent value="evidence" className="space-y-4 mt-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                {/* 1. RECIPE LOG (Mutfakçılar İçin) */}
                                <Card>
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-base flex items-center gap-2">
                                            <FileText size={18} className="text-blue-500" /> Recipe Log (Tariflər)
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-xs text-slate-500 mb-4">
                                            Tələbənin hazırladığı yeməklərin fotosu və resepti. (Zorunlu)
                                        </p>
                                        <Button variant="secondary" className="w-full text-xs">
                                            + Resept Yüklə
                                        </Button>
                                    </CardContent>
                                </Card>

                                {/* 2. VIDEOS (Pratik Sınav) */}
                                <Card>
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-base flex items-center gap-2">
                                            <Video size={18} className="text-red-500" /> Sınav Videoları
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-xs text-slate-500 mb-4">
                                            Praktik imtahanın video qeydiyyatı. (Zorunlu)
                                        </p>
                                        <Button variant="secondary" className="w-full text-xs">
                                            + Video Yüklə
                                        </Button>
                                    </CardContent>
                                </Card>

                                {/* 3. ASSIGNMENTS */}
                                <Card>
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-base flex items-center gap-2">
                                            <FileText size={18} className="text-green-500" /> Assignments (Ödevlər)
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-xs text-slate-500 mb-4">
                                            Yazılı tapşırıqlar (Word formatında).
                                        </p>
                                        <Button variant="secondary" className="w-full text-xs">
                                            + Sənəd Yüklə
                                        </Button>
                                    </CardContent>
                                </Card>

                            </div>
                        </TabsContent>

                        <TabsContent value="academic">
                            <Card>
                                <CardContent className="p-6">
                                    <p className="text-slate-500">İmtahan nəticələri və dərs davamiyyəti burada görünəcək.</p>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>

            </div>
        </div>
    );
}
