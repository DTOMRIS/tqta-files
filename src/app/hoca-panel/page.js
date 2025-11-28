'use client';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FileText, Download, UserCheck } from 'lucide-react';
import { Document, Packer, Paragraph, Table, TableCell, TableRow, WidthType, TextRun, HeadingLevel, AlignmentType } from "docx";
import { saveAs } from "file-saver";

export default function HocaPanel() {
    // Örnek Ders Verisi (Normalde Veritabanından Gelecek)
    const [courseData, setCourseData] = useState({
        qualification: "CTH Level 2 Award in Culinary Skills",
        academicYear: "2025 - 2026",
        unitCode: "PKP, BVSD, BMPFD, BCPBB",
        instructor: "Ramin Hezizade",
        totalHours: "80 Hours (20 Theory / 60 Practical)",

        // 27 Günlük Ders Planı (Senin Excel'deki veriler)
        sessions: [
            { no: 1, topic: "Kitchen Practices & Hygiene (Intro)", dishes: "Personal hygiene, uniform check...", assessment: "Q&A" },
            { no: 2, topic: "Knife Skills & Station Setup", dishes: "Knife handling, basic cuts...", assessment: "Observation" },
            { no: 3, topic: "Kitchen Operations & Closing", dishes: "Opening/closing procedures...", assessment: "Checklist" },
            { no: 4, topic: "Vegetable Prep: Stocks & Sauces", dishes: "White/Brown Chicken Stock...", assessment: "Practical Task" },
            // ... Diğer günler buraya otomatik eklenebilir veya hoca düzenleyebilir
        ]
    });

    // --- WORD BELGESİ OLUŞTURUCU (DOCX ENGINE) ---
    const generateWordDocument = () => {
        // 1. Tablo Başlıkları
        const tableHeader = new TableRow({
            children: [
                new TableCell({ children: [new Paragraph({ text: "Session", bold: true })], width: { size: 10, type: WidthType.PERCENTAGE } }),
                new TableCell({ children: [new Paragraph({ text: "Topic / Unit", bold: true })], width: { size: 30, type: WidthType.PERCENTAGE } }),
                new TableCell({ children: [new Paragraph({ text: "Dishes Produced", bold: true })], width: { size: 40, type: WidthType.PERCENTAGE } }),
                new TableCell({ children: [new Paragraph({ text: "Assessment", bold: true })], width: { size: 20, type: WidthType.PERCENTAGE } }),
            ],
        });

        // 2. Ders Satırları
        const dataRows = courseData.sessions.map(session =>
            new TableRow({
                children: [
                    new TableCell({ children: [new Paragraph(session.no.toString())] }),
                    new TableCell({ children: [new Paragraph(session.topic)] }),
                    new TableCell({ children: [new Paragraph(session.dishes)] }),
                    new TableCell({ children: [new Paragraph(session.assessment)] }),
                ],
            })
        );

        // 3. Belgeyi Oluştur
        const doc = new Document({
            sections: [{
                properties: {},
                children: [
                    new Paragraph({ text: "Scheme of Work for Culinary", heading: HeadingLevel.HEADING_1, alignment: AlignmentType.CENTER }),
                    new Paragraph({ text: "(Template Based on TQTA Standards)", alignment: AlignmentType.CENTER, spacing: { after: 300 } }),

                    // Bölüm 1: Genel Bilgiler
                    new Paragraph({ text: `Qualification: ${courseData.qualification}`, bold: true }),
                    new Paragraph({ text: `Instructor: ${courseData.instructor}` }),
                    new Paragraph({ text: `Academic Year: ${courseData.academicYear}`, spacing: { after: 200 } }),

                    // Bölüm 2: Tablo
                    new Table({
                        rows: [tableHeader, ...dataRows],
                        width: { size: 100, type: WidthType.PERCENTAGE },
                    }),

                    new Paragraph({ text: "\nSigned by Instructor: ___________________", spacing: { before: 500 } }),
                ],
            }],
        });

        // 4. İndir
        Packer.toBlob(doc).then(blob => {
            saveAs(blob, "Culinary_Scheme_of_Work.docx");
            alert("✅ Word Sənədi Hazırlandı!");
        });
    };

    return (
        <div className="p-6 bg-slate-50 min-h-screen space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Eğitmen Paneli (Hoca)</h1>
                    <p className="text-slate-500">Xoş gəldiniz, {courseData.instructor}</p>
                </div>
                <Button variant="outline" className="gap-2 bg-white">
                    <UserCheck size={18} /> Profilim
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* SOL: DERS DETAYLARI */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <FileText className="text-blue-600" /> Aktiv Ders Programı
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs font-bold text-slate-500">Kurs Adı</label>
                                <Input value={courseData.qualification} readOnly />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-500">Akademik İl</label>
                                <Input value={courseData.academicYear} readOnly />
                            </div>
                        </div>

                        <div className="bg-blue-50 p-4 rounded border border-blue-100">
                            <h3 className="font-bold text-blue-800 mb-2">Scheme of Work (Ders Planı)</h3>
                            <p className="text-sm text-slate-600 mb-4">
                                TQTA standartlarına uyğun 27 günlük ders planı sistemdə yüklüdür.
                                Hər tələbə üçün ayrı çıxarmaq əvəzinə, qrup üçün tək sənəd yarada bilərsiniz.
                            </p>
                            <Button onClick={generateWordDocument} className="w-full bg-blue-600 hover:bg-blue-700 gap-2">
                                <Download size={18} />
                                Scheme of Work İndir (.docx)
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* SAĞ: ÖĞRENCİ LİSTESİ (Sadece Görüntüleme) */}
                <Card>
                    <CardHeader>
                        <CardTitle>Qrup Tələbələri</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            {["Orxan Məmmədov", "Aysel Əliyeva", "Nihad Quliyev"].map((student, i) => (
                                <div key={i} className="flex justify-between items-center p-3 bg-white border rounded shadow-sm">
                                    <span className="font-medium">{student}</span>
                                    <div className="flex gap-2">
                                        <Button size="sm" variant="outline" className="text-xs h-7">Yoklama</Button>
                                        <Button size="sm" variant="outline" className="text-xs h-7">Not Ver</Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

            </div>
        </div>
    );
}
