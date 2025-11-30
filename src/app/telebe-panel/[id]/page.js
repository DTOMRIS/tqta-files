'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
    User, FileText, Video, Save, CheckCircle, AlertTriangle,
    UploadCloud, Trash2, FolderArchive, Clock
} from 'lucide-react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export default function StudentDetailPage() {
    const params = useParams();
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [cthNo, setCthNo] = useState('');

    // ATTENDANCE STATE
    const [attendanceStats, setAttendanceStats] = useState({ total: 0, absent: 0, present: 0 });

    useEffect(() => {
        if (params.id) {
            fetch(`/api/attendance?studentId=${params.id}`)
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        const total = data.data.length;
                        const absent = data.data.filter(r => r.status === 'ABSENT').length;
                        const present = data.data.filter(r => r.status === 'PRESENT').length;
                        setAttendanceStats({ total, absent, present });
                    }
                });
        }
    }, [params.id]);

    // EVIDENCES STATE (Kanıt Dosyaları)
    const [evidence, setEvidence] = useState({
        recipeLogs: [],
        timePlans: [],
        assignments: [],
        videos: []
    });

    // 1. Öğrenci Verisini Simüle Et (Veritabanı bağlanınca burası API olacak)
    useEffect(() => {
        // API Call: fetch(`/api/students/${params.id}`)
        setTimeout(() => {
            setStudent({
                id: params.id,
                ad: "Orxan",
                soyad: "Məmmədov",
                bolum: "Culinary Arts L2",
                enrollmentDate: new Date().toISOString(),
                cthNumber: "12345678" // Varsa gelir
            });
            setCthNo("12345678"); // Varsa doldur
            setLoading(false);
        }, 1000);
    }, [params.id]);

    // DOSYA SEÇME FONKSİYONU
    const handleFileChange = (category, e) => {
        const files = Array.from(e.target.files);
        setEvidence(prev => ({
            ...prev,
            [category]: [...prev[category], ...files]
        }));
    };

    // DOSYA SİLME
    const removeFile = (category, index) => {
        setEvidence(prev => ({
            ...prev,
            [category]: prev[category].filter((_, i) => i !== index)
        }));
    };

    // --- CTH AUTO-ZIP MOTORU (Chapter 5 Kuralı) ---
    const handleGenerateZip = async () => {
        if (!student) return;

        const zip = new JSZip();
        const studentFolderName = `${student.ad}_${student.soyad}_${cthNo || 'NO_ID'}`;
        const root = zip.folder(studentFolderName);

        // 1. Klasör: Recipe Log
        const folder1 = root.folder("Folder 1 - Recipe Log");
        evidence.recipeLogs.forEach((file, i) => {
            // Dosya ismini CTH formatına zorlayabiliriz: 12345_Recipe_1.jpg
            const ext = file.name.split('.').pop();
            folder1.file(`${cthNo}_Recipe_${i + 1}.${ext}`, file);
        });

        // 2. Klasör: Time Plans
        const folder2 = root.folder("Folder 2 - Time plans & costings");
        evidence.timePlans.forEach((file, i) => {
            folder2.file(file.name, file);
        });

        // 3. Klasör: Assignments
        const folder3 = root.folder("Folder 3 - Assignments");
        evidence.assignments.forEach((file) => {
            folder3.file(file.name, file);
        });

        // 4. Klasör: Videos
        const folder4 = root.folder("Folder 4 - Videos");
        evidence.videos.forEach((file) => {
            folder4.file(file.name, file);
        });

        // 5. Klasör: Mark Sheets (Boş klasör oluşturuyoruz, hoca dolduracak)
        root.folder("Folder 5 - Mark sheets");

        // ZIP OLUŞTUR VE İNDİR
        const content = await zip.generateAsync({ type: "blob" });
        saveAs(content, `${studentFolderName}_Evidence.zip`);

        alert("✅ CTH Standartlarına uyğun ZIP paketi hazırlandı!");
    };

    // CTH Numarası Kaydetme
    const handleSaveCth = () => {
        alert(`✅ CTH Nömrəsi (${cthNo}) yeniləndi!`);
        // API call here...
    };

    if (loading) return <div className="p-10 flex justify-center text-purple-600">Yüklənir...</div>;

    return (
        <div className="p-6 space-y-6 bg-slate-50 min-h-screen">

            {/* BAŞLIK */}
            <div className="flex justify-between items-start">
                <div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-3xl font-bold text-slate-900">{student?.ad} {student?.soyad}</h1>
                        <Badge variant="outline" className="bg-purple-100 text-purple-700 border-purple-200">
                            {student?.bolum}
                        </Badge>
                    </div>
                    <p className="text-slate-500 mt-1">CTH Evidence & Portfolio Management System</p>
                </div>
                <Button onClick={handleGenerateZip} className="bg-green-600 hover:bg-green-700 gap-2 shadow-md">
                    <FolderArchive size={18} />
                    CTH ZIP İndir
                </Button>
            </div>

            {/* Folder 1: Recipe Log */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        <span className="flex items-center gap-2"><FileText size={18} className="text-blue-500" /> Folder 1 - Recipe Log</span>
                        <span className="text-xs font-normal text-slate-400">{evidence.recipeLogs.length} fayl</span>
                    </CardTitle>
                    <CardDescription>Tələbənin hazırladığı yeməklərin fotosu və resept kartları.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="border-2 border-dashed border-slate-200 rounded-lg p-6 text-center hover:bg-slate-50 transition-colors relative">
                        <input type="file" multiple accept="image/*,.pdf" onChange={(e) => handleFileChange('recipeLogs', e)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                        <UploadCloud className="mx-auto h-8 w-8 text-slate-400 mb-2" />
                        <p className="text-sm text-slate-600">Faylları bura sürüşdürün və ya seçin</p>
                    </div>
                    {/* Dosya Listesi */}
                    <div className="mt-4 space-y-2">
                        {evidence.recipeLogs.map((file, i) => (
                            <div key={i} className="flex justify-between items-center text-sm p-2 bg-slate-50 rounded border">
                                <span className="truncate max-w-[200px]">{file.name}</span>
                                <button onClick={() => removeFile('recipeLogs', i)} className="text-red-500 hover:text-red-700"><Trash2 size={14} /></button>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* DEVAMSIZLIK KARTI */}
            <Card className="border-t-4 border-t-blue-600 h-fit">
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                        <Clock className="text-blue-600" /> Devamsızlık Durumu
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">Toplam Ders:</span>
                        <span className="font-bold">{attendanceStats.total}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">Katılım:</span>
                        <span className="font-bold text-green-600">{attendanceStats.present}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600">Devamsızlık:</span>
                        <span className="font-bold text-red-600">{attendanceStats.absent}</span>
                    </div>
                </CardContent>
            </Card>

            {/* Folder 2: Time Plans */}
            <Card>
                <CardHeader className="pb-3">
                    <CardTitle className="text-base flex justify-between">
                        <span className="flex items-center gap-2"><Clock size={18} className="text-orange-500" /> Folder 2 - Time Plans</span>
                        <span className="text-xs font-normal text-slate-400">{evidence.timePlans.length} fayl</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="border-2 border-dashed border-slate-200 rounded-lg p-4 text-center hover:bg-slate-50 relative">
                        <input type="file" multiple accept=".pdf,.doc,.docx,.xls,.xlsx" onChange={(e) => handleFileChange('timePlans', e)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                        <p className="text-sm text-slate-500">+ Zaman planı və maliyyət sənədləri</p>
                    </div>
                    <div className="mt-2 space-y-1">
                        {evidence.timePlans.map((file, i) => (
                            <div key={i} className="flex justify-between text-xs p-1 px-2 bg-slate-50 rounded">
                                <span>{file.name}</span>
                                <button onClick={() => removeFile('timePlans', i)} className="text-red-500">x</button>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Folder 3 & 4: Assignments & Videos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center gap-2">
                            <FileText size={18} className="text-green-500" /> Folder 3 - Assignments
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="border-2 border-dashed border-slate-200 rounded-lg p-4 text-center hover:bg-slate-50 relative">
                            <input type="file" multiple accept=".doc,.docx,.pdf" onChange={(e) => handleFileChange('assignments', e)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                            <p className="text-xs text-slate-500">Yazılı tapşırıqlar (Word/PDF)</p>
                        </div>
                        <div className="mt-2 space-y-1">
                            {evidence.assignments.map((file, i) => (
                                <div key={i} className="flex justify-between text-xs p-1 px-2 bg-slate-50 rounded">
                                    <span>{file.name}</span>
                                    <button onClick={() => removeFile('assignments', i)} className="text-red-500">x</button>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center gap-2">
                            <Video size={18} className="text-red-500" /> Folder 4 - Videos
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="border-2 border-dashed border-slate-200 rounded-lg p-4 text-center hover:bg-slate-50 relative">
                            <input type="file" multiple accept="video/*" onChange={(e) => handleFileChange('videos', e)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                            <p className="text-xs text-slate-500">Praktik imtahan videoları</p>
                        </div>
                        <div className="mt-2 space-y-1">
                            {evidence.videos.map((file, i) => (
                                <div key={i} className="flex justify-between text-xs p-1 px-2 bg-slate-50 rounded">
                                    <span>{file.name}</span>
                                    <button onClick={() => removeFile('videos', i)} className="text-red-500">x</button>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

        </div>
    );
}